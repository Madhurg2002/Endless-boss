# Changelog

## v1.0.4

**The run no longer ends by itself.** 1.0.0-1.0.3 looped correctly, but the results screen still
rolled a few seconds after the second chained kill, because the loop was not the only thing that
could finish an expedition:

- Every map's own boss-death handler (`190075901`, and `290075904` in `m16_10`, plus the
  `190075904` copies) is written as "first kill arms the chain, later kills finish the run". Its
  second half applies the victory spEffect, increments the team kill count and sets flag `7512`
  ("expedition finished"). After the map boss died that handler re-armed on the still-dead boss
  and ran the tail immediately, ending the run between rounds - and the 30 s
  "no next round started" fallback inside the same branch set `7512` too. The tail is now
  removed and the handler parks once the chain is live; the 30 s fallback is gone, and the
  "chain not armed" branch arms the chain instead of ending the run.
- `m18` has an extra direct `FinalizeExpedition()` call (event `18002620`, gated by `18002800`)
  that bypasses `7512` completely. It is gone, as are the `7512` writes in `18002800` (m18) and
  `19002870` (m19).
- Verified on the compiled files, not just the sources: decompiling the four shipped `.dcx`
  shows **zero** instructions writing `7512` and no `FinalizeExpedition` left; the round manager
  and all six spawn events still loop, and the only added event is the death handler `19309000`.
- Rebuilding 1.0.3's sources with the same toolchain reproduces 1.0.3's `.dcx` byte for byte, so
  the compiler itself is unchanged.

Nothing else changed: same refill, same per-round roll, same golem/scarab removal.

## v1.0.3

Packaging and verification release; the event scripts are unchanged from v1.0.2.

- **The download is now only what the game loads.** The decompiled `.js` sources and the
  "compile me first" note are no longer shipped in the release archive; they stay in the
  repository (`mod/event/`, `tools/`). The archive drops from 43 to 37 entries
  (21 real files, the rest are folders).
- **The bundled copy of the original mod and the previous release archives were removed from the
  repository**, so the repository holds this mod's own files plus the untouched `DoubleBOSS/`
  reference folder.
- README corrected: it now says where the sources live and how to return to the original mod,
  instead of pointing at siblings of the release folder that a download does not contain.
- Full rebuild verification (see below). Regenerating the sources and recompiling from scratch
  reproduces the four shipped `.dcx` files **byte for byte**, and an event-level diff against the
  untouched original shows exactly one added event (`19309000`), no removed events and the same
  15 modified events in every map.

## v1.0.2

- **On-screen confirmation.** Three seconds after an expedition map loads, the game's own
  "another Nightlord" callout (text `6015`) is shown. DoubleBOSS only shows it when a chained
  fight starts, so seeing it on map load proves these scripts are running. Toggle with
  `BANNER`, `BANNER_TEXT_ID`, `BANNER_DELAY` in `tools/endless_transform.py`.
- Nothing else changed; the endless loop, per-round roll, refill and the scarab/golem removal
  are as in 1.0.1.


## v1.0.1

**The endless loop now actually loops.** v1.0.0 was behaviourally identical to plain
DoubleBOSS: kill the chained Nightlord and the run ended. The cause was a wrong assumption
about event types — the scripts let a `Restart`-typed event body run to its end and expected
the engine to start it over. It does not: `Restart` only means the event is restarted when the
map loads, so every "loop" in 1.0.0 executed exactly once.

- Round manager `19002951`, all six spawn events `19114900`–`19114905` and death handler
  `19309000` now loop explicitly with a `L0:` label and `Goto(L0)`, the same primitive the
  game's own scripts use. One pass = one round / one kill.
- The per-round lottery no longer blocks on a host-only condition and no longer waits on the
  rolled flags: it resolves the roll immediately, with the first family as a fallback, so a
  round can never stall waiting for a flag that never arrives.
- **Scarab and golem removed from the arena.** The dung beetle (`19214191`) and the golem
  (`19110888`) are disabled at map load instead of being spawned. Both were gates in
  DoubleBOSS's flow, so their jobs are now done directly: `19002957` (chain may start) is set
  when the chain is armed, and `19002973` (invading second Nightlord unlocked) is set when the
  boss drops below 70 % HP — the invasion still happens, just without the beetle.
- Toolchain re-verified: rebuilding the unmodified originals with the same compiler still
  reproduces all four retail `.emevd` payloads byte-for-byte.

## v1.0.0

First release: compiled event scripts, endless-chain attempt, per-round Nightlord lottery,
consumable refill every 3 kills, scarab and golem still present. The loop did not work — see
1.0.1.
