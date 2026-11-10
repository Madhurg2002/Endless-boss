Endless Nightlord Gauntlet - endless chained Nightlords for Nightreign (DoubleBOSS #952 variant)

**Install:** copy the `EndlessNightreign` folder out of the zip, put Seamless Co-op for
Nightreign in `EndlessNightreign/SeamlessCoop/` (`nrsc.dll`), then launch it with
`me3 launch -p EndlessNightreign.me3`. Nothing to compile - the four map scripts are included
as finished `.emevd.dcx`.

**New in 1.0.5: the map-load banner is now visible.** The previous single callout was fired
3 seconds after the map loaded, while the map is still fading in, so it was never seen. It now
fires five times - at +5 s and then every 4 s - so at least one lands once the HUD is up. It is
the game's own "another Nightlord" callout (text effect `6015`), which DoubleBOSS only shows when
a chained fight begins, so seeing it on arrival is proof this mod's scripts are running.

**Everything from 1.0.4 is unchanged:** the expedition no longer ends by itself. The maps' stock
boss-death tails, the 30 s "no next round" fallback and `m18`'s direct `FinalizeExpedition()` call
are all gone, so the compiled scripts contain **no instruction that writes flag `7512`** and none
that finalises an expedition. The chain ends only when the team is wiped or aborts.

**What it does:** after you kill the expedition's Nightlord the team is warped back into the
arena and a **different, randomly rolled Nightlord** spawns, over and over, until the team dies.
Consumables are replenished every 3 chained kills. The scarab and the golem are gone from the
day-3 map; the second Nightlord invasion is unlocked directly when the boss drops below 70 % HP.

**Verified before publishing:**
- Decompiled the four shipped `.dcx` after building: each map has exactly 5 banner callouts, the
  round manager and all six spawn events still loop, the death handler `19309000` is present in
  every map, and there are **0** writes of `7512` and **0** `FinalizeExpedition` calls.
- Event-level diff against 1.0.3: no events added or removed, only the intended handlers changed.
- Rebuilding 1.0.3's sources with the same toolchain reproduces 1.0.3's binaries byte for byte.
- Everything that is not an event script (maps, messages, `regulation.bin`,
  `common_func.emevd.dcx`) is byte-identical to the original DoubleBOSS mod.

**Known limit:** not played end to end by me. If the game ends a run by itself after a fixed
number of team kills, the chain would stop there; `README.md` section 5 lists that and the rest.

Original mod: DoubleBOSS (Nexus #952). Roll back by launching `DoubleBOSS.me3` from the
`DoubleBOSS/` folder in the repository.
