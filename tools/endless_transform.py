#!/usr/bin/env python3
"""
Builds the "Endless Nightlord Gauntlet" variant of the DoubleBOSS (Nexus 952) mod.

Takes the author's DarkScript3 sources (mod/event/*.emevd.dcx.js) and rewrites the
two-Nightlord chain into an endless chain, plus a consumable refill every N kills.

The two mechanisms the original mod uses and that we keep:

  flag 7512          "expedition finished" - the results screen. Set by boss death handlers.
  flag 19002951      request to start the chained Nightlord (set when the map boss dies)
  flag 19002952      "players moved to the arena, boss may spawn"
  flag 19002953      "chained boss fight is live"
  flag 19002954      "map boss already defeated" (one-shot latch of the original mod)
  flag 19002955      "chained boss is spawning / playing its entrance"
  flag 19002956/57   "chain initialised" / "map boss died after initialisation"

The original ends the run the first time the chained Nightlord dies. Here the
round manager (event 19002951) and the chained boss' spawn event loop instead, and
the per-boss death handler is replaced by our own event 19309000 which counts the
kill, optionally refills consumables, clears the round flags and disables the
corpse so the next round can spawn it again.

All six Nightlord families are armed at run start (the original arms exactly one,
picked once with RandomAppearLot). For every round the host rolls one of the six
selection flags at random, and both the spawn event and the death handler of a
family only act in rounds where that family was rolled - so each cycle is a
different, randomly rolled Nightlord.
"""

import os
import re
import json
import shutil
import sys

SRC = "DoubleBOSS"
OUT = "EndlessNightreign"
EVENT_DIR = "mod/event"

# ---------------------------------------------------------------------------
# Configuration exposed to the generated scripts
# ---------------------------------------------------------------------------
REFILL_EVERY = 3          # 0 disables the refill entirely
REFILL_SPEFFECT = 509     # the restore the game itself applies on a boss kill

# Show a banner as soon as an expedition map loads, so the mod is obviously active
# before the first kill. Text ids come from the game's own message data: new strings
# would require editing menu.msgbnd.dcx, which is not part of this mod.
BANNER = True
BANNER_TEXT_ID = 6015     # the mod's own "another Nightlord" callout
BANNER_DELAY = 3

# Game flags used by this mod (kept next to the original mod's 190029xx block).
FLAG_DONE_FIRST = 19300002   # "one round already happened" (shortens the interlude)
FLAG_NEVER = 19300999     # never set: used as a "wait forever" guard
COUNTER_FLAGS = [19300101, 19300102, 19300103, 19300104, 19300105]

# Per-round Nightlord lottery. The host sets one random flag of ROLL_FLAGS; the manager
# then resolves it into exactly one RESOLVED_FLAGS entry, so a sloppy roll can never
# spawn two bosses in the same round.
ROLL_FLAGS = [19300010, 19300011, 19300012, 19300013, 19300014, 19300015]
RESOLVED_FLAGS = [19300020, 19300021, 19300022, 19300023, 19300024, 19300025]
SPAWN_ORDER = [19114900, 19114901, 19114902, 19114903, 19114904, 19114905]
SPAWN_SEL = dict(zip(SPAWN_ORDER, RESOLVED_FLAGS))

# which selection flag belongs to which chained Nightlord's death handler
BOSS_SEL = {
    19111803: 19300020,   # 圣牢布
    19110880: 19300021,   # 米塔恩
    19110800: 19300022,   # 王三狼
    19110850: 19300023,   # 王人马
    19110860: 19300024,   # 王冰龙
    19110870: 19300025,   # 垃圾王
}

# chained Nightlord entities per spawn event (used to re-enable the boss each round)
SPAWN_EVENTS = {
    "19114900": [19111803],                # 圣牢布
    "19114901": [19110880],                # 米塔恩
    "19114902": [19110800, 19115801],      # 王三狼
    "19114903": [19110850],                # 王人马
    "19114904": [19110860],                # 王冰龙
    "19114905": [19110870],                # 垃圾王
}

PLAYERS = [10000, 10001, 10002, 10003, 10004, 10005,
           10006, 10007, 10008, 10009, 10010]

# The original mod's per-map boss death handlers. Their second half is the "expedition
# finished" tail (victory spEffect, kill count, flag 7512) - the thing that rolls the
# results screen after the chained Nightlord dies. It has to go, or the run always ends.
DEATH_HANDLERS = {190075901, 190075904, 290075904}


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------
def find_event_span(text, eid):
    """Return (body_start, body_end) for $Event(<eid>, <Type>, function(...) { ... });"""
    m = re.search(r"\$Event\(%d,\s*\w+,\s*function\([^)]*\)\s*\{" % eid, text)
    if not m:
        return None
    start = m.end()
    depth = 1
    i = start
    n = len(text)
    while i < n:
        c = text[i]
        if text[i:i + 2] == "//":
            j = text.find("\n", i)
            i = n if j < 0 else j + 1
            continue
        if text[i:i + 2] == "/*":
            j = text.find("*/", i)
            i = n if j < 0 else j + 2
            continue
        if c in "\"'":
            q = c
            i += 1
            while i < n and text[i] != q:
                if text[i] == "\\":
                    i += 1
                i += 1
            i += 1
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return start, i
        i += 1
    raise ValueError("unbalanced braces in event %d" % eid)


def replace_event_body(text, eid, new_body, eol):
    span = find_event_span(text, eid)
    if span is None:
        return text, False
    s, e = span
    body = new_body.replace("\n", eol)
    if not body.startswith(eol):
        body = eol + body
    if not body.endswith(eol):
        body += eol
    return text[:s] + body + text[e:], True


EVENT_PARAMS = {}   # event id -> parameter count, filled from the JS sources
ORIGINAL_INITS = {}  # file -> [[instruction, event id, [raw 4-byte args]], ...]


def load_original_inits():
    """Exact init-call arguments read out of the shipped binaries.

    Floats are stored there as their 4-byte patterns (1.0 shows up as 1065353216), which is
    precisely the information a typed init would have recovered from init data. Without it we
    would silently encode such a parameter as the integer 1 and corrupt the call.
    """
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "original_inits.json")
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            ORIGINAL_INITS.update(json.load(f))


def _as_float(bits):
    import struct
    return struct.unpack("<f", struct.pack("<I", bits & 0xFFFFFFFF))[0]


def _is_int_literal(token):
    return re.fullmatch(r"-?\d+", token.strip()) is not None


def _tok_int(t):
    t = t.strip()
    return int(t) if _is_int_literal(t) else None


def _tok_enum_value(t):
    """Trailing number of an enum token, e.g. NPCPartType.Part10 -> 10."""
    m = re.search(r"(\d+)$", t.strip())
    return int(m.group(1)) if m else None


def _compatible(orig_args, js_tokens):
    """Can this binary call be the source of this JS call?

    Enums carry no number here (their values live in init data), and some parameters pack two
    values into one 4-byte slot (10 + Part10 -> 655370), so the two lists are aligned rather
    than compared position by position.
    """
    def packed_pair(a, b):
        return {a | (b << 16), b | (a << 16)}

    def align(i, j):
        if j == len(orig_args):
            # the typed form appends 0 for events that take no parameters
            return all(_tok_int(t) == 0 for t in js_tokens[i:])
        if i >= len(js_tokens):
            return False
        o = orig_args[j]
        a = _tok_int(js_tokens[i])
        if a is None:                       # enum token: matched by position only
            return align(i + 1, j + 1)
        if a == o:
            if align(i + 1, j + 1):
                return True
        # a float parameter stored as its bit pattern (1.0 -> 1065353216)
        if abs(_as_float(o) - float(a)) == 0.0:
            if align(i + 1, j + 1):
                return True
        if i + 1 < len(js_tokens):
            b = _tok_int(js_tokens[i + 1])
            if b is None:
                b = _tok_enum_value(js_tokens[i + 1])
            if b is not None and o in packed_pair(a & 0xFFFF, b & 0xFFFF):
                if align(i + 2, j + 1):
                    return True
        return False

    return align(0, 0)


def collect_event_params(text):
    """event id -> number of declared parameters, for typed-init expansion."""
    for m in re.finditer(r"\$Event\((\d+),\s*\w+,\s*function\s*\(([^)]*)\)", text):
        params = [x for x in m.group(2).split(",") if x.strip()]
        EVENT_PARAMS.setdefault(int(m.group(1)), len(params))
    for m in re.finditer(r"\$Event\((\d+),\s*\w+,\s*function\s*\(\s*\)", text):
        EVENT_PARAMS.setdefault(int(m.group(1)), 0)


def plain_inits(text, own_events, orig_calls):
    """Expand typed inits that have no init data available, keeping the exact arguments.

    Events declared in this same file keep the typed form - the compiler resolves those from
    the shipped binary. Common events live in common_func, which is not decompiled here, so
    their calls are written out with the byte-exact argument list taken from the binary.
    """
    warnings = []
    collect_event_params(text)
    used = [False] * len(orig_calls)

    def repl(m):
        name, slot, eid, args = m.group(1), m.group(2), int(m.group(3)), m.group(4).strip()
        js_tokens = [t for t in args.split(",")] if args else []
        for i, (iname, ieid, iargs) in enumerate(orig_calls):
            if used[i] or ieid != eid or iname != name:
                continue
            if _compatible(iargs, js_tokens):
                used[i] = True
                return "%s(%s, %d%s)" % (name, slot, eid, "".join(", %d" % a for a in iargs))
        if eid in own_events:
            return m.group(0)   # typed form resolves fine for same-file events
        warnings.append("no binary match for %s(%s, %d)" % (name, slot, eid))
        # a vararg instruction always carries at least one parameter; the typed form emits 0
        # for an event that takes none, so mirror that here
        return "%s(%s, %d%s)" % (name, slot, eid, (", " + args) if args else ", 0")

    text = re.sub(r"\$(InitializeEvent|InitializeCommonEvent)\((\d+),\s*(\d+)\s*(?:,\s*([^)]*))?\)",
                  lambda m: repl(_InitMatch(m)), text)
    return text, warnings


class _InitMatch:
    """Adapter so the replacement can see the optional argument list."""
    def __init__(self, m):
        self.m = m

    def group(self, i):
        if i == 0:
            return self.m.group(0)
        return self.m.group(i) if self.m.group(i) is not None else ""


def set_event_type(text, eid, kind):
    """Retag an event as Default/Restart. Restart events loop by themselves."""
    pat = re.compile(r"(\$Event\(%d, )(Default|Restart|End)(,)" % eid)
    return pat.subn(lambda m: m.group(1) + kind + m.group(3), text)


def sp_effects(indent):
    out = []
    for p in PLAYERS:
        out.append("%sSetSpEffect(%d, %d);" % (indent, p, REFILL_SPEFFECT))
    return "\n".join(out)


def refill_block(indent):
    """Nested flag counter: refill on every Nth kill."""
    if REFILL_EVERY <= 0:
        return "%s// consumable refill disabled (REFILL_EVERY = 0)" % indent

    flags = COUNTER_FLAGS[:max(REFILL_EVERY - 1, 0)]
    lines = []

    def emit(level):
        pad = indent + "    " * level
        if level == len(flags):
            lines.append("%s// %d bosses defeated: replenish consumables" % (pad, REFILL_EVERY))
            lines.append(sp_effects(pad))
            for f in flags:
                lines.append("%sSetNetworkconnectedEventFlagID(%d, OFF);" % (pad, f))
            return
        f = flags[level]
        lines.append("%sif (EventFlag(%d)) {" % (pad, f))
        emit(level + 1)
        lines.append("%s} else {" % pad)
        lines.append("%s    SetNetworkconnectedEventFlagID(%d, ON);" % (pad, f))
        lines.append("%s}" % pad)

    emit(0)
    return "\n".join(lines)


def roll_block(indent):
    """Pick one Nightlord family at random for the coming round."""
    pad = indent
    lines = [
        "%s// ===== ENDLESS GAUNTLET: roll the Nightlord for this round =====" % pad,
        "%s// The host sets one random flag of the six; they are network-connected, so" % pad,
        "%s// every co-op peer sees the same pick." % pad,
        "%sBatchSetNetworkconnectedEventFlags(%d, %d, OFF);" % (pad, ROLL_FLAGS[0], ROLL_FLAGS[-1]),
        "%sBatchSetNetworkconnectedEventFlags(%d, %d, OFF);" % (pad, RESOLVED_FLAGS[0], RESOLVED_FLAGS[-1]),
        "%sRandomlySetNetworkconnectedEventFlagInRange(%d, %d, ON);"
        % (pad, ROLL_FLAGS[0], ROLL_FLAGS[-1]),
        "%s// resolve the roll to exactly one family - never two in the same round" % pad,
    ]
    for i, flag in enumerate(ROLL_FLAGS):
        if i == 0:
            lines.append("%sif (EventFlag(%d)) {" % (pad, flag))
        else:
            lines.append("%s} else if (EventFlag(%d)) {" % (pad, flag))
        lines.append("%s    SetNetworkconnectedEventFlagID(%d, ON);" % (pad, RESOLVED_FLAGS[i]))
    lines.append("%s} else {" % pad)
    lines.append("%s    SetNetworkconnectedEventFlagID(%d, ON);   // roll failed - default family"
                 % (pad, RESOLVED_FLAGS[0]))
    lines.append("%s}" % pad)
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# generated event bodies
# ---------------------------------------------------------------------------
def neutralise_finalisers(text, eol):
    """Make sure the expedition cannot reach the results screen on its own."""
    report = []

    # 1. "chain not armed" branch: arm the chain instead of finishing the expedition
    pat = re.compile(r"else \{\s*SetNetworkconnectedEventFlagID\(7512, ON\);\s*EndEvent\(\);\s*\}")
    text, k = pat.subn("else {" + eol +
                       "            // Endless: the chain is always armed - never end the run here" + eol +
                       "            SetNetworkconnectedEventFlagID(19002951, ON);" + eol +
                       "            EndEvent();" + eol +
                       "        }", text)
    if k:
        report.append("chain-not-armed branch arms the chain x%d" % k)

    # 2. the "next round never started within 30 s" fallback used to end the run
    pat = re.compile(r"[ \t]*WaitFixedTimeSeconds\(30\);\s*if\(!EventFlag\(19002953\)\)\{\s*"
                     r"SetNetworkconnectedEventFlagID\(7512, ON\);\s*\}")
    text, k = pat.subn("", text)
    if k:
        report.append("removed the 30 s run-ending fallback x%d" % k)

    # 3. drop the stock victory tail of the map's own death handlers. After the first
    #    kill they re-arm on the (still dead) map boss and ran the tail immediately,
    #    setting 7512 - that is what rolled the results screen mid-gauntlet.
    lines = text.splitlines(keepends=True)
    out = []
    i = 0
    n = 0
    cur = None
    seen_chain = False
    while i < len(lines):
        ln = lines[i]
        m = re.match(r"\$Event\((\d+),", ln)
        if m:
            cur, seen_chain = int(m.group(1)), False
        if cur in DEATH_HANDLERS and "SetNetworkconnectedEventFlagID(19002954, ON);" in ln:
            seen_chain = True
        if (cur in DEATH_HANDLERS and seen_chain
                and re.match(r"^ {4}SetSpEffect\(10000, 509\);\s*$", ln)):
            while i < len(lines) and not re.match(r"^\}\);", lines[i]):
                i += 1
            i += 1
            out.append("    // Endless: the stock \"expedition finished\" tail (victory spEffect," + eol)
            out.append("    // kill count, flag 7512) is removed. Once the chain runs, this handler" + eol)
            out.append("    // only parks here so it can never end the run." + eol)
            out.append("    WaitFor(!EventFlag(19002954));" + eol)
            out.append("});" + eol)
            n += 1
            continue
        out.append(ln)
        i += 1
    if n:
        text = "".join(out)
        report.append("stock victory tail removed x%d" % n)

    # 4. any write of 7512 left over (map-specific "boss down" events)
    pat = re.compile(r"^([ \t]*)SetNetworkconnectedEventFlagID\(7512, ON\);\s*$", re.M)
    text, k = pat.subn(lambda m: m.group(1) + "// Endless: 7512 (expedition finished) is never set",
                       text)
    if k:
        report.append("7512 writes neutralised x%d" % k)

    # 5. m18 finishes the expedition directly, not through 7512
    pat = re.compile(r"^( *)FinalizeExpedition\(\);\s*$", re.M)
    text, k = pat.subn(lambda m: m.group(1) + "// Endless: the expedition never finalises on its own",
                       text)
    if k:
        report.append("FinalizeExpedition removed x%d" % k)

    return text, report


def manager_body(warp_block):
    return """    // ===== ENDLESS GAUNTLET: round manager =====
    // The loop is written out explicitly (label + Goto) because an event body that
    // simply reaches its end does NOT start over - only RestartEvent() or Goto loop.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(%d));   // expedition finished - stop the gauntlet
    }
L0:
    SetNetworkconnectedEventFlagID(19002952, OFF);
    SetNetworkconnectedEventFlagID(19002953, OFF);
    SetNetworkconnectedEventFlagID(19002955, OFF);

    if (!EventFlag(%d)) {
        WaitFixedTimeSeconds(8);
        DisplayTextEffectId(6015);
        WaitFixedTimeSeconds(3);
        SetNetworkconnectedEventFlagID(%d, ON);
    } else {
        WaitFixedTimeSeconds(4);
    }

    FadeToBlack(1, 1, true, -1);
    WaitFor(ElapsedSeconds(1));

%s

%s

    SetNetworkconnectedEventFlagID(19002952, ON);

    // the death handler clears 19002952 when this round's Nightlord is dead
    WaitFor(!EventFlag(19002952));
    WaitFixedTimeSeconds(2);
    Goto(L0);
""" % (FLAG_NEVER, FLAG_DONE_FIRST, FLAG_DONE_FIRST, warp_block, roll_block("    "))


def spawn_body(original_body, entities, eol, sel_flag):
    body = original_body.replace("\r\n", "\n").strip()
    # the loop already waits for 19002952 and the gauntlet keeps 19002951 on
    body = re.sub(r'^WaitFor\(EventFlag\(19002952\)\);\s*', '', body)
    body = re.sub(r'^if \(!EventFlag\(19002951\)\) \{\s*EndEvent\(\);\s*\}\s*', '', body)
    # drop the trailing EndEvent(); the Restart behaviour keeps the event alive
    if body.endswith("EndEvent();"):
        body = body[: -len("EndEvent();")].rstrip()
    body = "\n".join(("    " + line) if line.strip() else line for line in body.split("\n"))
    enables = "\n".join("    EnableCharacter(%d);" % e for e in entities)
    return """    // ===== ENDLESS GAUNTLET: one spawn per round =====
    // Explicit loop: each pass arms this Nightlord for one round of the gauntlet.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(%d));   // expedition finished - stop spawning
    }
L0:
    // wait until the round manager rolls this Nightlord
    WaitFor(EventFlag(19002952) && EventFlag(%d));

    // bring the boss back for this round (it was disabled by the death handler)
%s

%s

    // round finished - the death handler clears the fight flag
    WaitFor(!EventFlag(19002952));
    Goto(L0);
""" % (FLAG_NEVER, sel_flag, enables, body)


def death_handler_body():
    return """    // ===== ENDLESS GAUNTLET: chained Nightlord death handler =====
    // Same defeat feedback as common_func 90075901, but it never sets flag 7512
    // (expedition finished). Instead it counts the kill, optionally replenishes
    // consumables, and lets the round manager start the next round.
    // Explicit loop: one pass of this body is one kill.
L0:
    if (EventFlag(7512)) {
        WaitFor(EventFlag(%d));   // expedition finished - stop counting
    }

    // only the family that was rolled this round is hunted
    WaitFor(EventFlag(19002953) && EventFlag(selectionFlagId));
    WaitFor(HPRatio(chrEntityId) <= 0);

    SetNetworkconnectedEventFlagID(19002953, OFF);
    SetNetworkconnectedEventFlagID(19002955, OFF);
    SetNetworkconnectedEventFlagID(19002952, OFF);

    DisplayBossHealthBar(Disabled, chrEntityId, 0, 0);
    LinkToBossHealthBar(Disabled, logObjectId, 0);

%s

    if (BossBGMPlaying(bgmBossConvParamId)) {
        SetBossBGM(bgmBossConvParamId, BossBGMState.Stop2);
    }

    IncrementTeamBossesKilled(1);
    PlaySE(chrEntityId, SoundType.SFX, 888880000);
    RecordUserDispLog(10111, 10000, LogObjectType.NpcName, logObjectId);

    if (PlayerInMap(16, 0, 0, 0)) {
        DisplayTextEffectId(1052);
    }
    if (PlayerInMap(16, 10, 0, 0)) {
        DisplayTextEffectId(1053);
    }
    if (PlayerInMap(18, 0, 0, 0)) {
        DisplayTextEffectId(1040);
    }
    if (PlayerInMap(19, 0, 0, 0)) {
        DisplayTextEffectId(1051);
    }

    WaitFixedTimeSeconds(2);

%s

    // leave a clean corpse so the next round spawns the boss at full health
    DisableCharacterAI(chrEntityId);
    DisableCharacterCollision(chrEntityId);
    DisableCharacter(chrEntityId);

    WaitFixedTimeSeconds(1);
    Goto(L0);
""" % (FLAG_NEVER, sp_effects("    "), refill_block("    "))


# ---------------------------------------------------------------------------
# per-file transform
# ---------------------------------------------------------------------------
def transform(text, name):
    eol = "\r\n" if "\r\n" in text else "\n"
    report = []

    # 0. the container we can write on Linux is zlib, not Oodle -------------
    # SoulsFormats picks the writer from this header, and Oodle only exists on Windows.
    if "@compress    DCX_KRAK" in text:
        text = text.replace("@compress    DCX_KRAK", "@compress    DCX_DFLT_10000_44_9")
        report.append("header DCX_DFLT")

    # 1. round manager -------------------------------------------------------
    span = find_event_span(text, 19002951)
    if not span:
        raise SystemExit("%s: event 19002951 not found" % name)
    orig = text[span[0]:span[1]].replace("\r\n", "\n")
    m = re.search(r"( *)if \(IsPlayerNo\(1\)\)", orig)
    if not m:
        raise SystemExit("%s: warp block not found in 19002951" % name)
    warp_start = m.start()
    tail = orig.find("SetNetworkconnectedEventFlagID(19002952, ON);", warp_start)
    if tail < 0:
        raise SystemExit("%s: warp block end not found" % name)
    warp_block = orig[warp_start:tail].rstrip()
    text, ok = replace_event_body(text, 19002951, manager_body(warp_block), eol)
    text, _ = set_event_type(text, 19002951, "Restart")
    report.append("19002951 round manager (Restart)")

    # 2. looping spawn events ------------------------------------------------
    for eid_s, entities in SPAWN_EVENTS.items():
        eid = int(eid_s)
        span = find_event_span(text, eid)
        if not span:
            continue
        body = text[span[0]:span[1]]
        text, ok = replace_event_body(text, eid,
                                      spawn_body(body, entities, eol, SPAWN_SEL[int(eid_s)]), eol)
        text, _ = set_event_type(text, eid, "Restart")
        report.append("%d looping spawn (Restart)" % eid)

    # 3. replace stock run-ending death handler with ours --------------------
    n = 0
    for boss, sel in BOSS_SEL.items():
        if boss == 19110870:
            continue
        pat = re.compile(r"\$InitializeCommonEvent\(0, 90075901, %d,\s*([^)]*?)\)\s*;" % boss)
        text, k = pat.subn(lambda m, b=boss, s=sel:
                           "$InitializeEvent(0, 19309000, %d, %s, %d);" % (b, m.group(1).strip(), s),
                           text)
        n += k
    report.append("90075901 -> 19309000 x%d" % n)

    # 垃圾王 uses its own copy of the death handler
    pat = re.compile(r"\$InitializeEvent\(0, 190075904, 19110870,\s*([^,]+?,\s*[^,]+?),\s*7,\s*60517,\s*4\)\s*;")
    text, k = pat.subn(lambda m: "$InitializeEvent(0, 19309000, 19110870, %s, %d);"
                       % (m.group(1).strip(), BOSS_SEL[19110870]), text)
    if k:
        report.append("190075904 -> 19309000 (垃圾王)")

    # 圣牢布 has an extra death handler that ends the run - drop it
    pat = "$InitializeEvent(0, 190017580, 19111803);"
    if pat in text:
        text = text.replace(pat, "// Endless: 190017580 removed (it ends the run on death)")
        report.append("removed 190017580 (圣牢布)")

    # 3b. no path may end the run by itself ----------------------------------
    text, finalisers = neutralise_finalisers(text, eol)
    report.extend(finalisers)

    # 4. append the new death handler ---------------------------------------
    text = text.rstrip() + eol + eol + eol + \
        "$Event(19309000, Restart, function(chrEntityId, bgmBossConvParamId, logObjectId, selectionFlagId) {" + eol + \
        death_handler_body().replace("\n", eol) + "});" + eol
    report.append("appended 19309000")

    # 5. reset the mod's own counters on run start --------------------------
    span = find_event_span(text, 19110900)
    if span:
        s, e = span
        body = text[s:e].replace("\r\n", "\n")

        def unguard(m):
            ind, inner = m.group(1), m.group(2)
            lines = [ln[4:] if ln.startswith(ind + "    ") else ln for ln in inner.split("\n")]
            return "".join(ln + "\n" for ln in lines).rstrip("\n")

        # arm every family - the original only arms the one RandomAppearLot picked
        body, k = re.subn(r"(?m)^( *)if \(RandomAppearLot\(1911\d{4}\)\) \{\n((?:.*\n)*?)\1\}\n",
                          lambda m: unguard(m) + "\n", body)
        if k:
            report.append("all %d families armed" % k)

        anchor = "SetNetworkconnectedEventFlagID(19002957, OFF);"
        if anchor in body:
            add = ("\n    SetNetworkconnectedEventFlagID(%d, OFF);   // endless: first round done"
                   % FLAG_DONE_FIRST)
            add += "\n    SetNetworkconnectedEventFlagID(%d, OFF);   // endless: never set (loop stop)" % FLAG_NEVER
            for f in COUNTER_FLAGS:
                add += "\n    SetNetworkconnectedEventFlagID(%d, OFF);   // endless: kill counter" % f
            for f in ROLL_FLAGS + RESOLVED_FLAGS:
                add += "\n    SetNetworkconnectedEventFlagID(%d, OFF);   // endless: round pick" % f
            body = body.replace(anchor, add.lstrip("\n") + "\n    " + anchor, 1)
            report.append("counter reset in 19110900")

        text = text[:s] + body.replace("\n", eol) + text[e:]

    # 6. scarab (dung beetle) and golem removed from the arena -----------------
    n = text.count("$InitializeEvent(0, 19219920, 19214191);")
    if n:
        text = text.replace("$InitializeEvent(0, 19219920, 19214191);",
                            ("DisableCharacter(19214191);" + eol +
                             "        DisableCharacterAI(19214191);" + eol +
                             "        DisableCharacterCollision(19214191);   // scarab removed"))
        report.append("scarab 19214191 disabled x%d" % n)

    pat = re.compile(r"if \(EventFlag\(19002973\)\) \{\s*DisplayTextEffectId\(6019\);\s*"
                     r"SetNetworkconnectedEventFlagID\(19002975, ON\);\s*\}")
    def unlock(m):
        return ("SetNetworkconnectedEventFlagID(19002973, ON);   // scarab removed: invasion unlocked" + eol +
                "        DisplayTextEffectId(6019);" + eol +
                "        SetNetworkconnectedEventFlagID(19002975, ON);")
    text, k = pat.subn(unlock, text)
    if k:
        report.append("invasion unlocked (no scarab) x%d" % k)

    pat = re.compile(r"// 连战开关：魔像\s*WaitFor\(HPRatio\(19110888\) <= 0\);\s*"
                     r"WaitFixedTimeSeconds\(1\);\s*if \(EventFlag\(19002956\)\) \{\s*"
                     r"if \(!EventFlag\(19002954\)\) \{\s*"
                     r"SetNetworkconnectedEventFlagID\(19002957, ON\);\s*"
                     r"DisplayTextEffectId\(6017\);\s*\}\s*\}")
    golem = ("// 连战开关：魔像 removed - the golem never spawns, so the gate opens at once" + eol +
             "    DisableCharacter(19110888);" + eol +
             "    DisableCharacterAI(19110888);" + eol +
             "    DisableCharacterCollision(19110888);" + eol +
             "    SetNetworkconnectedEventFlagID(19002957, ON);")
    if BANNER:
        golem += (eol + eol +
                  "    // ===== ENDLESS GAUNTLET: banner on map load =====" + eol +
                  "    // Proof the mod's scripts are live, before the first kill." + eol +
                  "    WaitFixedTimeSeconds(%d);" % BANNER_DELAY + eol +
                  "    DisplayTextEffectId(%d);" % BANNER_TEXT_ID)
    text, k = pat.subn(golem, text)
    if k:
        report.append("golem 19110888 removed")
    else:
        report.append("WARNING: golem block not matched")

    own_events = {int(m) for m in re.findall(r"\$Event\((\d+)", text)}
    orig_calls = ORIGINAL_INITS.get(name.rsplit(".", 3)[0], [])
    text, init_warnings = plain_inits(text, own_events, orig_calls)
    report.append("typed inits expanded (%d binary matches)" % (len(orig_calls) - len(init_warnings)))
    if init_warnings:
        report.append("UNMATCHED inits: " + ", ".join(init_warnings[:4]))
    return text, report


def main():
    if not os.path.isdir(SRC):
        raise SystemExit("run me from the folder that contains %s/" % SRC)

    # refresh the mod payload but keep README/COMPILE notes that live next to it
    shutil.copytree(SRC, OUT, dirs_exist_ok=True)
    src_me3 = os.path.join(OUT, "DoubleBOSS.me3")
    if os.path.exists(src_me3):
        os.replace(src_me3, os.path.join(OUT, "EndlessNightreign.me3"))

    load_original_inits()
    for js in sorted(os.listdir(os.path.join(SRC, EVENT_DIR))):
        if js.endswith(".js"):
            collect_event_params(open(os.path.join(SRC, EVENT_DIR, js), encoding="utf-8").read())
    print("collected parameter counts for %d events, binary init data for %d files"
          % (len(EVENT_PARAMS), len(ORIGINAL_INITS)))

    for js in sorted(os.listdir(os.path.join(OUT, EVENT_DIR))):
        if not js.endswith(".js"):
            continue
        path = os.path.join(OUT, EVENT_DIR, js)
        text = open(path, encoding="utf-8", newline="").read()
        if "连战夜王系统" not in text and "夜王连战系统" not in text:
            print("%-28s unchanged (no chain system)" % js)
            continue
        new, report = transform(text, js)
        open(path, "w", encoding="utf-8", newline="").write(new)
        print("%-28s %s" % (js, ", ".join(report)))

    # the compiled originals would silently keep the old two-boss behaviour
    for eid in ("m16_00_00_00", "m16_10_00_00", "m18_00_00_00", "m19_00_00_00"):
        p = os.path.join(OUT, EVENT_DIR, eid + ".emevd.dcx")
        if os.path.exists(p):
            os.remove(p)
    print("removed stale compiled event files (must be recompiled)")
    for stray in ("DoubleBOSS.me3",):
        p = os.path.join(OUT, stray)
        if os.path.exists(p):
            os.remove(p)


if __name__ == "__main__":
    main()
