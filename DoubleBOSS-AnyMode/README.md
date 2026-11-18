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
| Scarab / golem | present, mandatory | disabled |
| Delivery | one `mod/` folder, 25 overrides | five packages in one profile, see below |
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

1. Copy this whole folder next to your other mods - or drop `DoubleBOSS-AnyMode.zip` (or the
   folder) into **ME3 Manager**, which installs it as one mod. Enabling that mod switches its
   five package entries on in the profile the manager writes.
2. Seamless Co-op: if you launch `DoubleBOSS-AnyMode.me3` itself, put `nrsc.dll` at
   `DoubleBOSS-AnyMode/SeamlessCoop/nrsc.dll` and uncomment its `[[natives]]` block (it ships
   commented out, because me3 fails to launch a profile whose native is missing). If the profile
   you already play loads `nrsc` - the manager's own entry - keep that one and leave ours out.
3. Launch through **me3**: `DoubleBOSS-AnyMode.me3`, or the profile you enabled the mod in.

`savefile = "NR0000.co2"` and `start_online = false` are unchanged from the original profile.

### Using it inside your own me3 profile

me3 launches **one profile per run**, so if you already have a profile with Seamless Co-op and
your other mods, do not launch `DoubleBOSS-AnyMode.me3` alongside it - paste these blocks into
*your* profile instead (paths are relative to the `.me3` file, this example assumes the folder
sits next to it):

```toml
[[packages]]
id = "db-events"
path = "./DoubleBOSS-AnyMode/mod/01-events"

[[packages]]
id = "db-maps"
path = "./DoubleBOSS-AnyMode/mod/02-maps"

[[packages]]
id = "db-params"
path = "./DoubleBOSS-AnyMode/mod/03-params"

[[packages]]
id = "db-text"
path = "./DoubleBOSS-AnyMode/mod/04-text"
```

Leave your own `savefile`, `start_online` and `[[natives]]` lines alone - do not add `nrsc.dll` a
second time. There is nothing to install through a manager: each package already is a plain
folder of overrides, so a path entry is the whole install.

Keep the same profile for your `regulation.bin` mod, but merge it first (see
[CONFLICTS.md](CONFLICTS.md)) - `db-params` and another regulation package are the one pair that
really cannot both be loaded.

## First run: what you should see

Load a Nightlord expedition in any mode. In order:

1. **The golem is gone.** The original put a golem in the arena and only opened the chain after
you killed it; here it is disabled at load, so an empty arena is your proof that these scripts
are the ones running. If the golem is standing there, they are not loading.
2. **A banner while the arena loads** (`DisplayTextEffectId(6016)`), and the scarab is gone too.
The original showed the banner only after the scarab died. This step only happens on runs where
an invading Nightlord was rolled (see below).
3. **When the arena's Nightlord drops below 70 % HP**, the text effect `6019` plays and the
invading Nightlord enters with a second boss health bar.
4. **After the arena's Nightlord dies**: fade to black, the camera swings, and the chained
Nightlord spawns with its own health bar. The original required the golem to be dead first.
5. **Killing the chained Nightlord ends the expedition** through the game's own handler, so the
normal reward screen follows.

Both extra bosses are per-expedition rolls (`RandomAppearLot` in the scripts), so a run with the
chained boss but no invader - or with neither - is possible and is not a load failure. Step 1 is
the reliable check: the golem is either gone because the scripts ran, or it is not.

## Packages

All five folders live under `mod/`, one folder per package (the layout me3 documents: subfolders
of `mod/` referenced by separate `[[packages]]` entries).

| Package | Overrides | Needed? |
|---|---|---|
| `01-events` | `event/m16_00_00_00`, `m16_10_00_00`, `m18_00_00_00`, `m19_00_00_00` `.emevd.dcx` | yes - this is the mod |
| `02-maps` | `map/mapstudio/*.msb.dcx` (placements) and `map/m16,m18,m19/**/*.btl.dcx` (lights) | yes - places the extra Nightlords and the invader |
| `03-params` | `regulation.bin` | yes for the added NPCs; must be merged if you run another regulation mod |
| `04-text` | `msg/{engus,zhocn}/{item,menu}_dlc01.msgbnd.dcx` | cosmetic - boss names |
| `05-common-func` | `event/common_func.emevd.dcx` | off by default - it is the stock file and the one other mods most often replace |

Set `enabled = false` on a package in `DoubleBOSS-AnyMode.me3` to leave it out; no two packages
share a game path, so their order does not matter. What to turn off for which kind of mod, and
what cannot be solved by turning things off, is in [CONFLICTS.md](CONFLICTS.md).

`enabled = false` is only honoured from **me3 v0.9.0** on (`Don't load mods which are not enabled`
in the v0.9.0 release notes). On anything older, `05-common-func` would be loaded anyway - update
with `me3 update`, or delete the `mod/05-common-func` folder if you are loading another
mod's `common_func.emevd.dcx`.

If your me3 predates v0.4.0 it may only know the old key name: replace `path =` with `source =`.
Both are accepted since v0.4.0.

## Rebuild

The sources in `sources/` are generated from the untouched `DoubleBOSS/` folder and then
compiled:

```bash
# once: build the headless toolchain, see tools/compiler/README.md
bash tools/build_doubleboss_any_mode.sh
```

The script decompresses the retail event files (they are the compiler's init data), runs
`tools/doubleboss_any_mode.py`, compiles the four sources with DarkScript3 and installs the
`.dcx` into `mod/01-events/event/`. The generator has two switches:

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
