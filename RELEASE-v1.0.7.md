Endless Nightlord Gauntlet - endless chained Nightlords for Nightreign (DoubleBOSS #952 variant)

**Install:** copy the `EndlessNightreign` folder out of the zip, put Seamless Co-op for
Nightreign in `EndlessNightreign/SeamlessCoop/` (`nrsc.dll`), then launch with
`me3 launch -p EndlessNightreign.me3`. Nothing to compile.

**1.0.7 fixes the night-3 test.** All three symptoms - the "night has not ended" text at the
grace, an extra boss next to the real one, and nothing happening after the kills - had the same
cause: the map's own boss-death handler waits for the boss's HP to hit 0, and a boss that has not
spawned yet reports HP 0 as well. On night 3 the boss only appears when the team walks in, so the
handler fired at map load and treated the real boss as already dead: it armed the chain (extra
boss appears beside the untouched one) and the actual kill was then ignored.

- The handler now requires the boss to be on the field with HP before it waits for the death, so
  the first chained round can only start after the map's Nightlord really dies.
- The five "night has not ended" callouts on map load are removed; that text now only appears in
  the interlude between chained rounds.

**What it does:** kill the Nightlord and the team stays in the arena; a different, randomly
rolled Nightlord spawns, over and over, until the team dies. Consumables are replenished every
3 chained kills. One boss at a time - the original mod's 70 %-HP second-Nightlord invasion is off.
The scarab and golem are gone.

**Verified on the built files:** the boss-death handler in all four maps now contains
`IfCharacterHPRatio(boss, Greater, 0)` immediately before `IfCharacterHPRatio(boss, Equal, 0)`;
0 registrations of the invasion event `19210900`, 0 writes of flag `7512`, no
`FinalizeExpedition`, death handler `19309000` present in every map, six spawn events looping,
round manager with no fade-out and no player teleport but one guaranteed fade-in, and exactly one
`6015` callout per map (the interlude).

**Known limit:** still not played end to end by me. If night 3 still misbehaves, the next place to
look is the arena's own multi-boss variation, which registers several `190075901` copies.

Original mod: DoubleBOSS (Nexus #952). Roll back with `DoubleBOSS.me3` from the `DoubleBOSS/`
folder in the repository.
