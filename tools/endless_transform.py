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

# Game flags used by this mod (kept next to the original mod's 190029xx block).
FLAG_DONE_FIRST = 19300002   # "one round already happened" (shortens the interlude)
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
        "%sif (HasMultiplayerState(MultiplayerState.Host) || PlayerIsInOwnWorld()) {" % pad,
        "%s    RandomlySetNetworkconnectedEventFlagInRange(%d, %d, ON);"
        % (pad, ROLL_FLAGS[0], ROLL_FLAGS[-1]),
        "%s}" % pad,
        "%sWaitFor(AnyBatchEventFlags(%d, %d));" % (pad, ROLL_FLAGS[0], ROLL_FLAGS[-1]),
    ]
    for i, flag in enumerate(ROLL_FLAGS):
        if i == 0:
            lines.append("%sif (EventFlag(%d)) {" % (pad, flag))
        else:
            lines.append("%s} else if (EventFlag(%d)) {" % (pad, flag))
        lines.append("%s    SetNetworkconnectedEventFlagID(%d, ON);" % (pad, RESOLVED_FLAGS[i]))
    lines.append("%s}" % pad)
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# generated event bodies
# ---------------------------------------------------------------------------
def manager_body(warp_block):
    return """    // ===== ENDLESS GAUNTLET: round manager =====
    // Replaces the original one-shot transition. Each round: warp the team into the
    // arena, let the chained Nightlord spawn (flag 19002952), then wait until the
    // fight is over (the death handler clears 19002952) and start the next round.
    WaitFor(EventFlag(19002951));
    while (true) {
        if (EventFlag(7512)) {
            EndEvent();
        }

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

        // the death handler clears 19002952 when the current boss is dead
        WaitFor(!EventFlag(19002952));
        WaitFixedTimeSeconds(2);
    }
""" % (FLAG_DONE_FIRST, FLAG_DONE_FIRST, warp_block, roll_block("        "))


def spawn_body(original_body, entities, eol, sel_flag):
    body = original_body.replace("\r\n", "\n").strip()
    # the loop already waits for 19002952 and the gauntlet keeps 19002951 on
    body = re.sub(r'^WaitFor\(EventFlag\(19002952\)\);\s*', '', body)
    body = re.sub(r'^if \(!EventFlag\(19002951\)\) \{\s*EndEvent\(\);\s*\}\s*', '', body)
    # drop the trailing EndEvent(); the loop keeps the event alive
    if body.endswith("EndEvent();"):
        body = body[: -len("EndEvent();")].rstrip()
    body = "\n".join(("    " + line) if line.strip() else line for line in body.split("\n"))
    enables = "\n".join("        EnableCharacter(%d);" % e for e in entities)
    return """    WaitFor(EventFlag(19002951));
    while (true) {
        // wait until the round manager rolls this Nightlord
        WaitFor(EventFlag(19002952) && EventFlag(%d));
        if (EventFlag(7512)) {
            EndEvent();
        }

        // bring the boss back for this round (it was disabled by the death handler)
%s

%s

        // round finished - wait for the death handler to clear the fight flag
        WaitFor(!EventFlag(19002952));
    }
""" % (sel_flag, enables, body)


def death_handler_body():
    return """    // ===== ENDLESS GAUNTLET: chained Nightlord death handler =====
    // Same defeat feedback as common_func 90075901, but it never sets flag 7512
    // (expedition finished). Instead it counts the kill, optionally replenishes
    // consumables, and re-arms the round so the gauntlet continues.
    while (true) {
        // only the family that was rolled this round is hunted
        WaitFor(EventFlag(19002953) && EventFlag(selectionFlagId));
        if (EventFlag(7512)) {
            EndEvent();
        }
        WaitFor(HPRatio(chrEntityId) <= 0);
        if (EventFlag(7512)) {
            EndEvent();
        }

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
    }
""" % (sp_effects("        "), refill_block("        "))


# ---------------------------------------------------------------------------
# per-file transform
# ---------------------------------------------------------------------------
def transform(text, name):
    eol = "\r\n" if "\r\n" in text else "\n"
    report = []

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
    report.append("19002951 round manager")

    # 2. looping spawn events ------------------------------------------------
    for eid_s, entities in SPAWN_EVENTS.items():
        eid = int(eid_s)
        span = find_event_span(text, eid)
        if not span:
            continue
        body = text[span[0]:span[1]]
        text, ok = replace_event_body(text, eid,
                                      spawn_body(body, entities, eol, SPAWN_SEL[int(eid_s)]), eol)
        report.append("%d looping spawn" % eid)

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

    # 4. append the new death handler ---------------------------------------
    text = text.rstrip() + eol + eol + eol + \
        "$Event(19309000, Default, function(chrEntityId, bgmBossConvParamId, logObjectId, selectionFlagId) {" + eol + \
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
            for f in COUNTER_FLAGS:
                add += "\n    SetNetworkconnectedEventFlagID(%d, OFF);   // endless: kill counter" % f
            for f in ROLL_FLAGS + RESOLVED_FLAGS:
                add += "\n    SetNetworkconnectedEventFlagID(%d, OFF);   // endless: round pick" % f
            body = body.replace(anchor, add.lstrip("\n") + "\n    " + anchor, 1)
            report.append("counter reset in 19110900")

        text = text[:s] + body.replace("\n", eol) + text[e:]
    return text, report


def main():
    if not os.path.isdir(SRC):
        raise SystemExit("run me from the folder that contains %s/" % SRC)

    # refresh the mod payload but keep README/COMPILE notes that live next to it
    shutil.copytree(SRC, OUT, dirs_exist_ok=True)
    src_me3 = os.path.join(OUT, "DoubleBOSS.me3")
    if os.path.exists(src_me3):
        os.replace(src_me3, os.path.join(OUT, "EndlessNightreign.me3"))

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
