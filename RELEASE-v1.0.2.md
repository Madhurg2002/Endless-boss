# Endless Nightreign v1.0.2

Fixes the endless loop, and removes the scarab and the golem from the arena.

**If you tried v1.0.0 and it behaved exactly like plain DoubleBOSS, that was the bug.**
The chain never looped because the scripts assumed a `Restart`-typed event restarts itself
when its body ends — it does not (that type only restarts the event on map load). Every loop
in 1.0.0 ran exactly once. The loops are now written explicitly with a `L0:` label and
`Goto(L0)`, which is how the game's own event scripts loop.

## New in v1.0.2

- **You can see the mod is loaded**: three seconds after an expedition map loads, the game's own
  "another Nightlord" callout appears. Plain DoubleBOSS only shows it when a chained fight
  starts, so it is on-screen proof before the first kill.

## What changed in v1.0.1

- **Endless chain actually loops**: round manager `19002951`, all six spawn events
  `19114900`–`19114905` and the death handler `19309000` loop explicitly. Kill a Nightlord and
  another one is warped in, indefinitely — no results screen.
- **Scarab and golem removed.** The dung beetle (`19214191`) and the golem (`19110888`) no
  longer spawn. Both were gates in DoubleBOSS's flow, so their jobs are done directly now: the
  chain can start without the golem, and the invading second Nightlord still arrives when the
  boss drops below 70 % HP — just without a beetle to hunt first.
- **Lottery hardened**: the per-round roll resolves immediately with a fallback family, so a
  round can't stall waiting for a flag.
- Unchanged: a different Nightlord every round, consumables refilled every 3 kills, same me3
  profile and folder layout as the original mod.

## Download

`EndlessNightreign-v1.0.2.zip` — includes the four compiled `.emevd.dcx` event files, so
nothing needs compiling.

## Install

1. Unzip anywhere.
2. Copy `nrsc.dll` (Seamless Co-op for Nightreign) to `EndlessNightreign-v1.0.2/SeamlessCoop/nrsc.dll`.
   It is not bundled — get it from its own Nexus page.
3. `me3 launch -p EndlessNightreign-v1.0.1/EndlessNightreign.me3`, or pick that profile in me3.

Exactly the same procedure as the original DoubleBOSS mod: same folder shape, same
`savefile = "NR0000.co2"`, same `start_online = false`. All non-event files (`regulation.bin`,
`map/`, `msg/`, `common_func.emevd.dcx`) are the original, untouched files.

## Verification

- The four map payloads were decompiled back out of the shipped `.dcx`: the death handler is
  registered 6× per map, the `Goto` loops are present in manager / spawn / handler, the scarab
  and golem are disabled, and no stock run-ending handler (`90075901`, `190075904`,
  `190017580`) is registered any more.
- Rebuilding the **unmodified** original scripts with the same compiler reproduces all four
  retail `.emevd` payloads byte-for-byte, so the compile path is exact.
- Still not play-tested by the author of this variant. The one environmental risk is the
  container: the shipped `.dcx` use DCX **DFLT** (zlib) instead of retail DCX_KRAK, because
  Oodle compression is Windows-only. If the map fails to load, recompile the four `.js` in
  DarkScript3 on Windows and swap those `.dcx` in.

Full details: `EndlessNightreign-v1.0.2/CAPABILITIES.md`, `CHANGELOG.md`, and the risk list in
`README.md`.

## Rollback

The untouched original DoubleBOSS is in the repository (`DoubleBOSS/`); launch its own profile
to restore the two-boss version.
