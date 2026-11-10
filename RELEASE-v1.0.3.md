Endless Nightlord Gauntlet - endless chained Nightlords for Nightreign (DoubleBOSS #952 variant)

**Install:** copy the `EndlessNightreign` folder out of the zip, put Seamless Co-op for
Nightreign in `EndlessNightreign/SeamlessCoop/` (`nrsc.dll`), then launch it with
`me3 launch -p EndlessNightreign.me3`. Nothing to compile - the four map scripts are included
as finished `.emevd.dcx`.

**What it does:** after you kill the expedition's Nightlord the team is warped back into the
arena and a **different, randomly rolled Nightlord** spawns, over and over, until the team is
actually wiped or aborts. Consumables are replenished every 3 chained kills. The scarab and the
golem are gone from the day-3 map; the second Nightlord invasion is unlocked directly when the
boss drops below 70 % HP. Three seconds after an expedition map loads the game's own
"another Nightlord" callout appears - that callout only ever plays when a chained fight starts,
so seeing it on arrival confirms these scripts are running.

**New in 1.0.3:** this is a packaging release, the scripts are the same as 1.0.2. The download
now contains only what the game loads - the decompiled `.js` sources stay in the repository -
so the zip is smaller and has no build files to get confused by.

**Verified before publishing:**
- Regenerating the sources and recompiling all four maps from scratch reproduces the shipped
  `.dcx` files **byte for byte** (identical SHA-256).
- Event-level diff of each map against the untouched original: exactly one event added
  (`19309000`), none removed, the same 15 events modified - nothing else moved.
- Round manager `19002951` and all six spawn events `19114900`-`19114905` end in
  `GotoUnconditionally` back to their label; the death handler `19309000` never sets `7512`
  (the "expedition finished" flag), so the run cannot wind down by itself.
- The golem and scarab are disabled at map load, the chain gate `19002957` and the invasion
  flag `19002973` are set directly, and no longer referenced handler (`90075901`,
  `190017580`) is registered anywhere.
- Every non-event file (maps, messages, `regulation.bin`, `common_func.emevd.dcx`) is
  byte-identical to the original DoubleBOSS mod - this is purely an event-script mod.

**Not verified:** the mod has never been played. The loop, the per-round roll and the refill are
reasoned from the decompiled scripts, not observed in game. `README.md` section 5 lists what to
check first and how to tune it; `CAPABILITIES.md` describes every mechanism.

Original mod: DoubleBOSS (Nexus #952). Roll back by launching `DoubleBOSS.me3` from the
`DoubleBOSS/` folder in the repository.
