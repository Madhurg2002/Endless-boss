#!/usr/bin/env python3
"""Builds the "any mode" variant of the DoubleBOSS (Nexus #952) mod.

Two things are changed, nothing else:

1. **The content no longer depends on the mod's two custom enemies.** The stock
   scripts gate everything behind them: the golem (entity 19110888) has to die
   before the chained Nightlord may start (flag 19002957), and the dung beetle /
   scarab (19214191) has to die before the invading Nightlord may enter (flag
   19002973). Both gates are opened as soon as the arena arms a chained
   Nightlord, so nothing in the mod waits for an enemy that may not exist, or may
   not be reachable, in the expedition variant that is being played.

2. **The payload is split into me3 packages** (events / maps / params / text /
   lights / common_func) so a part that collides with another mod can be switched
   off in `DoubleBOSS-AnyMode.me3` instead of removing the whole mod.

Everything else - the dual-boss invasion, the chained Nightlord, and the map,
param, message and lighting files - is the original author's work, copied as is.

Run from the repository root, then compile the generated sources with
`tools/build_doubleboss_any_mode.sh`.
"""

import glob
import os
import re
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import endless_transform as et   # reuse the init-data expansion the endless variant uses

SRC = "DoubleBOSS"
OUT = "DoubleBOSS-AnyMode"
EVENT_DIR = "mod/event"
MAP_DIR = "mod/map"

# The two gate changes. Set either to False to keep the original requirement.
ARM_CHAIN_WITHOUT_GOLEM = True
ARM_INVASION_WITHOUT_SCARAB = True

# The Linux toolchain writes DCX_DFLT (zlib); Oodle is Windows-only. The header
# comment is what SoulsFormats uses to pick the output codec.
DFLT_COMPRESS = True

GOLEM = 19110888          # 魔像 - must die before the chained Nightlord may start
SCARAB = 19214191         # 粪金龟 - must die before the invading Nightlord may enter
GOLEM_GATE = 19002957     # "chain may start"
CHAIN_ARMED = 19002956    # set by the per-family init events when a chain exists
SCARAB_GATE = 19002973    # "scarab defeated" - unlocks the invasion
MAP_BOSS_DONE = 19002954  # one-shot latch of the original mod

# Packages, in the order the profile loads them.
PACKAGES = [
    ("01-events", "event"),        # the four recompiled map scripts (build output)
    ("02-maps", "map"),            # the extra Nightlord / invader placements
    ("03-params", "params"),       # regulation.bin
    ("04-text", "text"),           # boss name strings
    ("05-lights", "lights"),       # arena lighting
    ("06-common-func", "common"),  # stock common_func (profile disables it by default)
]


def dflt_header(text):
    return text.replace("@compress    DCX_KRAK", "@compress    DCX_DFLT_10000_44_9")


def arm_chain_without_golem(text, eol):
    """Open 19002957 as soon as the map has armed a chained Nightlord.

    The stock body is: wait for the golem to die, then open the gate if a chain
    exists. Here the golem is simply removed and the gate opens on the chain
    being armed (19002956, set by the family init events a few lines above).
    """
    pat = re.compile(
        r"// 连战开关：魔像\s*WaitFor\(HPRatio\(%d\) <= 0\);\s*"
        r"WaitFixedTimeSeconds\(1\);\s*if \(EventFlag\(%d\)\) \{\s*"
        r"if \(!EventFlag\(%d\)\) \{\s*"
        r"SetNetworkconnectedEventFlagID\(%d, ON\);\s*"
        r"DisplayTextEffectId\(6017\);\s*\}\s*\}"
        % (GOLEM, CHAIN_ARMED, MAP_BOSS_DONE, GOLEM_GATE)
    )
    body = (
        "// 连战开关：魔像 - Any Mode: the golem is not present in every expedition" + eol +
        "    // mode and is no longer a gate. It is removed and the chain opens as soon" + eol +
        "    // as this map has armed a chained Nightlord." + eol +
        "    DisableCharacter(%d);" % GOLEM + eol +
        "    DisableCharacterAI(%d);" % GOLEM + eol +
        "    DisableCharacterCollision(%d);" % GOLEM + eol +
        "    WaitFor(EventFlag(%d));" % CHAIN_ARMED + eol +
        "    if (!EventFlag(%d)) {" % MAP_BOSS_DONE + eol +
        "        SetNetworkconnectedEventFlagID(%d, ON);" % GOLEM_GATE + eol +
        "        DisplayTextEffectId(6017);" + eol +
        "    }"
    )
    return pat.subn(body, text)


def arm_invasion_without_scarab(text, eol):
    """Drop the scarab watchers and open 19002973 at arena load.

    The stock lines register 19219920, which keeps the scarab asleep until the
    player is within 30 m of it and sets 19002973 when it dies. Without the
    beetle the invasion is unlocked from the start instead.
    """
    pat = re.compile(r"^([ \t]*)\$InitializeEvent\(0, 19219920, %d\);[ \t]*\r?$" % SCARAB, re.M)

    def repl(m):
        pad = m.group(1)
        return eol.join([
            "%s// Any Mode: the scarab is not required for the invasion" % pad,
            "%sDisableCharacter(%d);" % (pad, SCARAB),
            "%sDisableCharacterAI(%d);" % (pad, SCARAB),
            "%sDisableCharacterCollision(%d);" % (pad, SCARAB),
            "%sSetNetworkconnectedEventFlagID(%d, ON);" % (pad, SCARAB_GATE),
        ])

    return pat.subn(repl, text)


def transform(text, name):
    eol = "\r\n" if "\r\n" in text else "\n"
    report = []

    if DFLT_COMPRESS and "@compress    DCX_KRAK" in text:
        text = dflt_header(text)
        report.append("header DCX_DFLT")

    if ARM_CHAIN_WITHOUT_GOLEM:
        text, n = arm_chain_without_golem(text, eol)
        if not n:
            raise SystemExit("%s: golem gate block not found" % name)
        report.append("golem gate opened x%d" % n)

    if ARM_INVASION_WITHOUT_SCARAB:
        text, n = arm_invasion_without_scarab(text, eol)
        if not n:
            raise SystemExit("%s: scarab registrations not found" % name)
        report.append("scarab requirement removed x%d" % n)

    # common_func.emevd.dcx cannot be decompressed here (its stream is not one the
    # open-source Kraken decoder handles), so the typed init calls are written out with
    # the exact byte arguments taken from tools/original_inits.json - the same trick the
    # endless variant uses. The scripts then compile without common_func as init data.
    own_events = {int(m) for m in re.findall(r"\$Event\((\d+)", text)}
    orig_calls = et.ORIGINAL_INITS.get(name.rsplit(".", 3)[0], [])
    text, warnings = et.plain_inits(text, own_events, orig_calls)
    report.append("typed inits expanded (%d/%d binary matches)"
                  % (len(orig_calls) - len(warnings), len(orig_calls)))
    if warnings:
        report.append("UNMATCHED inits: " + ", ".join(warnings[:4]))

    return text, report


def copy(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)


def build_packages():
    """Copy the untouched payload into its own package per file family."""
    shutil.rmtree(os.path.join(OUT, "packages"), ignore_errors=True)
    pkg = {name: os.path.join(OUT, "packages", name, "mod") for name, _ in PACKAGES}

    # 02-maps: the extra Nightlord / invader placements live in the map files
    for p in glob.glob(os.path.join(SRC, MAP_DIR, "mapstudio", "*.msb.dcx")):
        copy(p, os.path.join(pkg["02-maps"], "map", "mapstudio", os.path.basename(p)))

    # 03-params: regulation.bin (merge with other regulation mods, see CONFLICTS.md)
    copy(os.path.join(SRC, "mod", "regulation.bin"),
         os.path.join(pkg["03-params"], "regulation.bin"))

    # 04-text: boss names for the added NPCs
    for p in glob.glob(os.path.join(SRC, "mod", "msg", "**", "*.dcx"), recursive=True):
        copy(p, os.path.join(pkg["04-text"], os.path.relpath(p, os.path.join(SRC, "mod"))))

    # 05-lights: the per-arena .btl point-light files
    for p in glob.glob(os.path.join(SRC, MAP_DIR, "*", "*", "*.btl.dcx")):
        copy(p, os.path.join(pkg["05-lights"], os.path.relpath(p, os.path.join(SRC, "mod"))))

    # 06-common-func: stock common_func.emevd.dcx, as shipped by the author
    copy(os.path.join(SRC, EVENT_DIR, "common_func.emevd.dcx"),
         os.path.join(pkg["06-common-func"], "event", "common_func.emevd.dcx"))

    # 01-events: compiled build output, written by the build script
    os.makedirs(os.path.join(pkg["01-events"], "event"), exist_ok=True)


def main():
    if not os.path.isdir(SRC):
        raise SystemExit("run me from the folder that contains %s/" % SRC)

    et.load_original_inits()
    build_packages()

    sources = os.path.join(OUT, "sources")
    os.makedirs(sources, exist_ok=True)

    for js in sorted(os.listdir(os.path.join(SRC, EVENT_DIR))):
        if not js.endswith(".js") or not js.startswith("m"):
            continue   # common_func is shipped as is and is not recompiled
        path = os.path.join(SRC, EVENT_DIR, js)
        text = open(path, encoding="utf-8", newline="").read()
        new, report = transform(text, js)
        open(os.path.join(sources, js), "w", encoding="utf-8", newline="").write(new)
        print("%-28s %s" % (js, ", ".join(report)))

    print("sources  -> %s" % sources)
    print("packages -> %s" % os.path.join(OUT, "packages"))


if __name__ == "__main__":
    main()
