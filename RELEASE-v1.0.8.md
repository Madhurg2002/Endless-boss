Endless Nightlord Gauntlet - endless chained Nightlords for Nightreign (DoubleBOSS #952 variant)

**Install:** copy the `EndlessNightreign` folder out of the zip, put Seamless Co-op for
Nightreign in `EndlessNightreign/SeamlessCoop/` (`nrsc.dll`), then launch with
`me3 launch -p EndlessNightreign.me3`. Nothing to compile.

**1.0.8 fixes the night-3 test of 1.0.7.** Two boss health bars appeared as soon as the team
entered the arena (and none before entering): the chain was still arming itself before the real
fight began. Waiting for the boss's HP to be above 0 was not enough, because a boss that has not
been brought in yet does not always report HP 0 - while it exists but is still disabled it can
report full HP, and during its intro it can drop to 0 for a frame. Either way the map's own
boss-death handler saw "full HP, then 0 HP" and treated the untouched boss as dead: it marked it
defeated, armed the chain, and a chained Nightlord spawned next to it.

The handler now waits for the stock "boss fight started" flag `7511` first. The arena trigger sets
that flag at the same moment the boss's health bar is displayed at full HP, so the death wait can
only start from a fight that is actually running - and can therefore only end on a real kill.

**What it does:** kill the Nightlord and the team stays in the arena; a different, randomly
rolled Nightlord spawns, over and over, until the team dies. Consumables are replenished every
3 chained kills. One boss at a time - the original mod's 70 %-HP second-Nightlord invasion is off.
The scarab and golem are gone.

**Verified on the built files (all four maps):** `190075901` now begins `EndIf 7512`,
`EndIf 18002800`, `If 7511 ON`, `If HPRatio > 0`, `If HPRatio == 0`; 0 registrations of the
invasion event `19210900`, 0 writes of flag `7512`, no `FinalizeExpedition`, death handler
`19309000` registered for every chained Nightlord, six spawn events looping, round manager with no
fade-out and no player teleport but one guaranteed fade-in, exactly one `6015` callout per map
(interlude only), scarab and golem disabled.

**Known limit:** still not played end to end by me. If a second bar still shows up on night 3,
tell me which two bosses they are (or whether one of the bars is empty) - the next suspect is the
arena's own multi-boss variation, which registers several `190075901` copies.

Original mod: DoubleBOSS (Nexus #952). Roll back with `DoubleBOSS.me3` from the `DoubleBOSS/`
folder in the repository.
