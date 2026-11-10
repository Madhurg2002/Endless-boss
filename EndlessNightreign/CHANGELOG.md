# Changelog

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
