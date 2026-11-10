Endless Nightlord Gauntlet - endless chained Nightlords for Nightreign (DoubleBOSS #952 variant)

**This release fixes the run still ending.** In 1.0.0-1.0.3 the chain looped, but the results
screen rolled anyway right after the second chained kill: each map's own boss-death handler ran
its stock "expedition finished" tail (victory spEffect, kill count, flag `7512`), and `m18` even
called `FinalizeExpedition()` directly. All of those paths are now dead code. The compiled files
contain **no instruction that writes `7512` at all**, and no `FinalizeExpedition`, so the only
thing that can end an expedition is the team dying.

**Install:** copy the `EndlessNightreign` folder out of the zip, put Seamless Co-op for
Nightreign in `EndlessNightreign/SeamlessCoop/` (`nrsc.dll`), then launch it with
`me3 launch -p EndlessNightreign.me3`. Nothing to compile - the four map scripts are included
as finished `.emevd.dcx`.

**What it does:** after you kill the expedition's Nightlord the team is warped back into the
arena and a **different, randomly rolled Nightlord** spawns, over and over, until the team is
actually wiped or aborts. Consumables are replenished every 3 chained kills. The scarab and the
golem are gone from the day-3 map; the second Nightlord invasion is unlocked directly when the
boss drops below 70 % HP. Three seconds after an expedition map loads the game's own
"another Nightlord" callout appears, confirming these scripts are running.

**Verified before publishing:**
- Decompiled the four shipped `.dcx` again after building: **0** writes of flag `7512`
  (the "expedition finished" flag) and **0** remaining `FinalizeExpedition` calls.
- The round manager (`19002951`), all six spawn events (`19114900`-`19114905`) and the death
  handler (`19309000`) still loop through explicit labels; the handler still counts kills,
  refills consumables every 3 and never sets `7512`.
- Event-level diff against 1.0.3: no events added or removed, and only the intended ones changed
  (`190075901`, `190075904`, `290075904`, `18002620`, `18002800`, `19002870`, `190017580`).
- Rebuilding 1.0.3's sources with the same toolchain reproduces 1.0.3's binaries byte for byte,
  so the compiler produces identical output for identical input.
- Everything that is not an event script (maps, messages, `regulation.bin`,
  `common_func.emevd.dcx`) is byte-identical to the original DoubleBOSS mod.

**Known limit:** the mod has still not been played end to end by me. The scripts now have no
code path that asks the game to finish the expedition, but if the game itself ends a run after a
fixed number of team kills, the chain would stop there. `README.md` section 5 covers that and
the other things to watch.

Original mod: DoubleBOSS (Nexus #952). Roll back by launching `DoubleBOSS.me3` from the
`DoubleBOSS/` folder in the repository.
