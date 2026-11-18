# DoubleBOSS - Any Mode build

The original **DoubleBOSS** (Nexus #952, "DoubleBossAndExtraBoss") event scripts, rebuilt so
that its content no longer depends on the mod's two custom arena enemies, and split into
separately loadable me3 packages so the parts that clash with another mod can be left out.

Nothing about the fights themselves was designed here: the extra Nightlord, the invading
Nightlord at 70 % HP, the map files, params and text are the original author's work. Two things
were changed, both in the event scripts, and one thing in the delivery.

| | DoubleBOSS | This build |
|---|---|---|
| Chained Nightlord after the arena's boss | yes | yes, unchanged |
| Invading Nightlord below 70 % HP | yes, but only after killing the **scarab** | yes, no scarab needed |
| Chain unlocked | only after killing the **golem** | from arena load, no golem needed |
| Scarab / golem | present, mandatory | removed |
| Delivery | one `mod/` folder, 25 overrides | six packages in one profile, see below |
| Works where those two NPCs are missing/unreachable | ends the expedition instead | works the same |

## Why this is the "any mode" build

The stock scripts gate the content behind two enemies that only exist because this mod's map
files put them there:

* the golem (`19110888`) must die before the chained Nightlord may start (flag `19002957`), and
* the scarab (`19214191`) must die before the invading Nightlord may enter (flag `19002973`).

Both are optional set dressing in this build: at arena load the two entities are disabled and
both gates are opened as soon as the arena has armed a chained Nightlord. The rest of the flow
is untouched - the chained Nightlord still starts when the arena's Nightlord dies, the invader
still arrives below 70 % HP, and killing the chained Nightlord still ends the expedition through
the game's own handler.

The mod then no longer waits on anything a particular expedition variant may not spawn, so it
behaves the same in every mode that loads one of the four arenas it ships: `m18` (final-boss
Nightlord arena), `m19` (other-Nightlord arena) and `m16_00` / `m16_10` (DLC arenas). That
covers standard expeditions, Everdark Sovereigns, Deep of Night and the DLC, as well as
single-player and co-op, because the mode is not read anywhere in these scripts - the arena and
its Nightlord are chosen before the map loads.

What it does **not** do: it does not add new arenas, scale anything, or change rewards. If a
future game update routes Nightlords to an arena this mod has no script for, that arena keeps
the stock behaviour.

## Install

1. Copy this whole folder next to your other mods.
2. Put Seamless Co-op in `DoubleBOSS-AnyMode/SeamlessCoop/` so that `nrsc.dll` sits at
   `DoubleBOSS-AnyMode/SeamlessCoop/nrsc.dll`.
3. Launch through **me3** and pick `DoubleBOSS-AnyMode.me3`.

`savefile = "NR0000.co2"` and `start_online = false` are unchanged from the original profile.

## Packages

| Package | Overrides | Needed? |
|---|---|---|
| `01-events` | `event/m16_00_00_00`, `m16_10_00_00`, `m18_00_00_00`, `m19_00_00_00` `.emevd.dcx` | yes - this is the mod |
| `02-maps` | `map/mapstudio/m18_00_00_00.msb.dcx` and the other three | yes - places the extra Nightlords and the invader |
| `03-params` | `regulation.bin` | yes for the added NPCs; must be merged if you run another regulation mod |
| `04-text` | `msg/{engus,zhocn}/{item,menu}_dlc01.msgbnd.dcx` | cosmetic - boss names |
| `05-lights` | `map/m16,m18,m19/**/*.btl.dcx` | cosmetic - arena lights |
| `06-common-func` | `event/common_func.emevd.dcx` | off by default - it is the stock file and the one other mods most often replace |

Set `enabled = false` on a package in `DoubleBOSS-AnyMode.me3` to leave it out. What to turn off
for which kind of mod, and what cannot be solved by turning things off, is in
[CONFLICTS.md](CONFLICTS.md).

## Rebuild

The sources in `sources/` are generated from the untouched `DoubleBOSS/` folder and then
compiled:

```bash
# once: build the headless toolchain, see tools/compiler/README.md
bash tools/build_doubleboss_any_mode.sh
```

The script decompresses the retail event files (they are the compiler's init data), runs
`tools/doubleboss_any_mode.py`, compiles the four sources with DarkScript3 and installs the
`.dcx` into `packages/01-events/mod/event/`. The generator has two switches:

```python
ARM_CHAIN_WITHOUT_GOLEM = True      # False restores the "kill the golem first" gate
ARM_INVASION_WITHOUT_SCARAB = True  # False restores the "kill the scarab first" gate
```

The shipped `.dcx` are DCX **DFLT** (zlib), because Oodle compression is Windows-only. Same DCX
container, different codec; opening the `.js` in DarkScript3 on Windows and pressing Ctrl+S
writes DCX_KRAK again.

## What was verified

* Rebuilding the **unmodified** DoubleBOSS sources with this pipeline reproduces the four retail
  `.emevd` payloads **byte for byte** (56096 / 60144 / 70944 / 136864 bytes), so the compiler
  and the init-data expansion are not a variable.
* Decompiling the four shipped `.dcx` and diffing them against the retail payloads shows
  **only** the two intended edits: the golem gate block and the five scarab registrations per
  map. Event counts are unchanged (41 / 47 / 61 / 79), no event was added or removed, and
  nothing else in the scripts differs.
* The golem/scarab entities are still in the map files (checked in the MSB): they are disabled
  by the scripts rather than removed from the map, so the maps stay the author's.

**Not verified:** actual in-game behaviour - this was written by reading the decompiled scripts,
not by playing. The one environmental risk is the DFLT compression (see above); if the game
refuses to load the arena, recompile the four `.js` in DarkScript3 on Windows.

## Rollback

The untouched original is the `DoubleBOSS/` folder in this repository (`DoubleBOSS.me3`), and the
endless variant is `EndlessNightreign/`.
