# Conflicts: what clashes, what can be fixed, what cannot

Nightreign mods are **file overrides**, not patches. me3 builds a virtual file system from the
packages listed in a profile; for a given game path, one file wins. me3 supports several
packages, `load_after` / `load_before` ordering and `enabled = false`, but it does not merge the
contents of two files - load order only decides which version you get
([me3 profile reference](https://me3.help/en/latest/configuration-reference)). Two mods that
replace the same file are therefore in conflict no matter what order they load in.

This build splits the mod into packages so that everything that *can* be dropped is droppable.
The table below is the complete list of paths it overrides.

| Path | Package | Collides with |
|---|---|---|
| `event/m16_00_00_00.emevd.dcx`, `m16_10_00_00`, `m18_00_00_00`, `m19_00_00_00` | `01-events` | any mod that edits the Day-3 arena scripts: boss randomizers, "more map variations", boss-rush / extra-boss mods, 6-player event fixes |
| `map/mapstudio/{m16_00_00_00,m16_10_00_00,m18_00_00_00,m19_00_00_00}.msb.dcx` | `02-maps` | any mod that edits the same arena maps (enemy/placement mods) |
| `regulation.bin` | `03-params` | **every** other `regulation.bin` mod (weapons, scaling, shops, skins with params, DLC unlocks) |
| `msg/{engus,zhocn}/{item,menu}_dlc01.msgbnd.dcx` | `04-text` | text/translation mods for those two files |
| `map/m16,m18,m19/**/*.btl.dcx` | `05-lights` | arena lighting mods |
| `event/common_func.emevd.dcx` | `06-common-func` (off by default) | almost every gameplay mod, including Seamless Co-op add-ons |

## Recipes, easiest first

**1. The other mod only changes `regulation.bin`** (weapons, scaling, relics, drops, DLC
unlocks, most "gameplay" mods). This is the most common case and it is fully solvable. Do not
stack two `regulation.bin` files - the last package simply wins and the other mod's edits
disappear. Merge instead:

* [ERBM - Easy regulation bin Merger](https://www.nexusmods.com/eldenringnightreign/mods/565)
  takes two modded `regulation.bin` files, applies both deltas onto the vanilla base and lets you
  review conflicts row by row. It is the Nightreign-native tool.
* Smithbox's param delta / CSV import does the same job manually
  ([Smithbox](https://github.com/vawser/Smithbox); CSV workflow explained in the
  [DSMapStudio regulation-merge guide](https://dsmapstudio.com/guides/merge-regulation-bin-elden-ring)).

Then put the merged file in `packages/03-params/mod/` - or set `enabled = false` on `db-params`
and load the merged file from your own package, which is cleaner if you keep a merged build
anyway.

**2. The other mod ships its own `common_func.emevd.dcx`.** `db-common-func` is off by default
exactly for this. The author's copy is the stock file for this build: it contains none of the
chain's events or its `190029xx` flags, and the game's own copy is equivalent. Only set
`enabled = true` if you run this mod alone and the chain never starts.

**3. The other mod only changes text, lighting, or other maps** (`m60_*` overworld tiles,
Limveld, POIs). Turn off `db-text` / `db-lights` if they collide. Different paths never conflict,
so a Limveld map mod, a weapon mod you merged params for, and a UI mod can all run together.

**4. The other mod replaces the same arena events or the same `.msb.dcx`.** Nothing merges these
automatically - there is no EMEVD or MSB merge tool, and me3 cannot compose two versions of one
file. Your options, in order of effort:

* Use a compatibility build if the other author publishes one.
* Merge by hand and keep one file. For the event scripts this is small: this build's whole
  change is two event-id-local edits in `19110900` and `19210900` (see `sources/` and
  `tools/doubleboss_any_mode.py`), which can be pasted into the other mod's script for the same
  map. Recompile with DarkScript3 (open the `.js`, Ctrl+S) or with
  `tools/build_doubleboss_any_mode.sh` and the toolchain in `tools/compiler/README.md`.
* For maps, open both `.msb.dcx` in Smithbox and copy the missing placements across
  (`19111803`, `19110880`, `19110800`, `19110850`, `19110860`, `19110870`, `19110888`,
  `19214191`, and the invader entities `192108xx`). Then drop `02-maps` from this profile and
  use the merged map.
* Ask the other author for a merge - the community norm is a compatibility variant rather than
  self-merging, because references and entity IDs are easy to get wrong.

**5. DLL mods** (Seamless Co-op, camera, UI, input) do not collide with any of this. They are
`[[natives]]`, a different mechanism entirely; keep them listed above the packages as the
original profile does.

## What is not possible (as of this writing)

* **Automatic EMEVD merging.** DarkScript3 compiles and decompiles event scripts; it does not
  merge two edited versions of one file.
* **Automatic MSB merging.** Smithbox / DSMapStudio edit maps and merge *params*; they do not
  merge two complete edited map files.
* **Runtime param patching**, which would let several mods patch params in memory without
  producing a merged `regulation.bin`. ERBM/Smithbox produce one merged file instead.
* **Loading two versions of the same file.** Load order picks a winner; it does not combine.

The structural fix - and what most "any mode" builds in this community actually mean - is to
override as little as possible and merge the rest. That is why `common_func`, text and lighting
are now separate, optional packages rather than part of one monolith.

## Sources

* [me3 mod profile reference](https://me3.help/en/latest/configuration-reference) - packages,
  `enabled`, `load_after` / `load_before`, natives.
* [ERBM](https://www.nexusmods.com/eldenringnightreign/mods/565) - regulation.bin merger.
* [Smithbox](https://github.com/vawser/Smithbox) - map/param editing and param deltas.
* [DSMapStudio - merging regulation.bin](https://dsmapstudio.com/guides/merge-regulation-bin-elden-ring) -
  why whole-file replacement loses the other mod's edits, and the CSV alternative.
* [How to merge .dll mods (Nexus article)](https://www.nexusmods.com/eldenringnightreign/articles/29) -
  native mods are combined in the profile, not by merging files.
* [Nexus forum: one regulation.bin mod at a time](https://forums.nexusmods.com/topic/13529564-nightreign-cant-load-more-than-one-regulationbin-mod-at-once) -
  the same problem from the user's side.
