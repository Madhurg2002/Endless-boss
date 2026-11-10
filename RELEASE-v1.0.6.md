Endless Nightlord Gauntlet - endless chained Nightlords for Nightreign (DoubleBOSS #952 variant)

**Install:** copy the `EndlessNightreign` folder out of the zip, put Seamless Co-op for
Nightreign in `EndlessNightreign/SeamlessCoop/` (`nrsc.dll`), then launch with
`me3 launch -p EndlessNightreign.me3`. Nothing to compile - the four map scripts are finished
`.emevd.dcx`.

**1.0.6 fixes the two things the 1.0.5 test hit:**

1. **One boss at a time.** The original mod's "dual boss" system - an invading second Nightlord
   that joined the fight once the boss dropped below 70 % HP - is switched off. Only the
   Nightlord you are fighting is on the field. (Generator switch: `DUAL_BOSS`.)
2. **No more black screen after a kill.** The banner appeared, then the screen went black and
   stayed black. Cause: the round manager faded to black and teleported the team before the next
   boss was armed, so if that hand-off did not finish there was nothing left to fade back in. The
   fade-out and the teleport are gone; the next Nightlord's spawn event warps it in and fades the
   screen back, and the manager fades in unconditionally 8 s after arming the round as a
   guarantee.

**What it does:** after the expedition's Nightlord dies the team stays in the arena and a
**different, randomly rolled Nightlord** spawns, over and over, until the team dies. Consumables
are replenished every 3 chained kills. The scarab and the golem are gone from the arena.

**Verified before publishing:**
- Rebuilt with a toolchain that reproduces 1.0.5's shipped binaries byte for byte, so the
  compiler is not a variable.
- Decompiled the four new `.dcx` after building: 0 registrations of the invasion event
  `19210900`, 0 writes of `7512`, no `FinalizeExpedition`, the death handler `19309000` present
  in every map, all six spawn events looping, manager with no fade-out and no player teleport but
  one unconditional fade-in, 5 banner callouts per map, scarab and golem still disabled.
- Event counts unchanged from 1.0.5 (42 / 48 / 62 / 80).
- Everything that is not an event script (maps, messages, `regulation.bin`,
  `common_func.emevd.dcx`) is byte-identical to the original DoubleBOSS mod.

**Known limit:** still not played end to end by me. If a chained round fails to bring its boss
back, you will now at least see the arena; `README.md` section 5 lists the rest.

Original mod: DoubleBOSS (Nexus #952). Roll back with `DoubleBOSS.me3` from the `DoubleBOSS/`
folder in the repository.
