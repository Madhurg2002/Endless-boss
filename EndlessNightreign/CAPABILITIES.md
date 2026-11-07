# Endless Nightreign — capabilities

What this build of the mod actually does, how each capability is implemented, and what it
deliberately does **not** do. Written from the generated scripts and the shipped binaries.

---

## 1. The Nightlord chain never ends on a kill

**Capability:** after a Nightlord dies the expedition does not roll the results screen. The
team is warped back into the arena and a new Nightlord spawns. This repeats indefinitely —
until the run genuinely ends (team wipe, abort, or the game's own end-of-expedition path).

**How:** the stock per-boss death handler (`common_func` event `90075901`, and `190075904` for
垃圾王) is no longer registered for the chained Nightlords; that handler is what sets the
"Nightlord is down" latch `7512` and finalises the expedition. Our replacement `19309000` plays
the same defeat feedback but deliberately **never sets `7512`**, so the stock arena events that
wind themselves down on it (`EndIfEventFlag … 7512 …`) simply keep running. The round manager
`19002951` and the six spawn events `19114900`–`19114905` are typed `Restart` instead of
one-shot, so the engine re-runs their bodies once per round.

| Event | Role after the change |
|---|---|
| `19002951` | round manager: clear round flags → interlude → fade → warp → roll → wait for the boss to die |
| `19114900`–`19114905` | per-family spawn: wait for this round's pick → re-enable the boss → entrance → fight live |
| `19309000` | death handler: kill counter, refill, clear round flags, disable corpse, re-arm |
| `7512` | never set by the chain; the stock setters are untouched (field-boss deaths, `190075901`), and if one of those ever fires mid-chain the arena does wind down normally |

## 2. A different, randomly rolled Nightlord every round

**Capability:** each round picks one of the six Nightlord families at random. The pick is
shared with the whole co-op team, so everyone fights the same boss.

**How:** all six families are armed at run start (the original DoubleBOSS arms only the single
family picked once by `RandomAppearLot`, which is why it always repeats that one). At the start
of every round the host sets one random flag in `19300010`–`19300015`
(`RandomlySetNetworkconnectedEventFlagInRange`); the manager resolves that into exactly one of
`19300020`–`19300025`, and only the matching family's spawn event and death handler act that
round. Because the resolution is a single-winner fallback, a duplicated or sloppy roll can
never spawn two bosses at once.

| Family | Spawn event | Boss entity | Pick flag |
|---|---|---|---|
| 圣牢布 | `19114900` | `19111803` | `19300020` |
| 米塔恩 | `19114901` | `19110880` | `19300021` |
| 王三狼 | `19114902` | `19110800` (`+19115801`) | `19300022` |
| 王人马 | `19114903` | `19110850` | `19300023` |
| 王冰龙 | `19114904` | `19110860` | `19300024` |
| 垃圾王 | `19114905` | `19110870` | `19300025` |

Every family has the same chance; the roll does not avoid repeats, so the same Nightlord can
come back two rounds in a row.

## 3. Consumables refilled every 3 kills

**Capability:** every third chained kill restores the team's consumables.

**How:** the death handler increments a kill counter (`19300101`), and when it reaches
`REFILL_EVERY` (3) it applies spEffect `509` to all eleven player slots (`10000`–`10010`) and
resets the counter. `509` is the same restore the game itself applies on a boss kill.

Configurable in `tools/endless_transform.py`:

```python
REFILL_EVERY   = 3     # 0 disables the refill entirely
REFILL_SPEFFECT = 509  # spEffect applied to every player on a refill
```

## 4. Per-round encounter reset

**Capability:** each new round is a fresh, full-health fight, not a continuation.

**How:** on death the handler disables the boss corpse, hides its health bar, stops its BGM and
clears `19002952`/`19002953`/`19002955`; the spawn event then `EnableCharacter`s the boss again
and replays the original entrance sequence before setting the fight-live flag `19002953`.

## 5. Pacing between rounds

| Round | Interlude |
|---|---|
| first | 8 s → text `6015` ("a Nightlord approaches"-style callout) → 3 s |
| later | 4 s |

Both are followed by a fade, a warp, and a 2 s settle after the previous boss is confirmed dead.
`19002951` stays set for the whole gauntlet; flag `19300002` records "one round already
happened" and is what switches the interlude to the short form. All of these flags are cleared
in `19110900` at run start, so a new expedition starts clean.

## 6. Co-op behaviour

**Capability:** designed for Seamless Co-op, host-authoritative.

- The roll is executed only on the host (`HasMultiplayerState(MultiplayerState.Host) ||
  PlayerIsInOwnWorld()`); all round flags are *network-connected*, so clients see the same pick
  and the same round state.
- Refill spEffect `509` is applied to every player slot, not just the host.
- Delivery format is unchanged from DoubleBOSS: `mod/` folder + `EndlessNightreign.me3` profile,
  `savefile = "NR0000.co2"`, Seamless Co-op `nrsc.dll` in `SeamlessCoop/`.

## 7. Reproducible, editable build

**Capability:** the scripts are generated and compiled by tooling in this repository, not
hand-edited binaries.

- `tools/endless_transform.py` regenerates the four `.js` sources from the original DoubleBOSS
  scripts; the two knobs above plus the flag tables are the only configuration.
- `tools/compiler/` documents the headless build (DarkScript3 + SoulsFormatsNEXT + an
  open-source Oodle Kraken decoder) that produced the shipped `.emevd.dcx` files.
- Validation: rebuilding the **unmodified** original scripts with that toolchain reproduces all
  four retail `.emevd` files **byte-for-byte** — so the compile path is exact.
- `.dcx` files are edited normally by opening a `.js` in DarkScript3 and pressing Ctrl+S.

## 8. Rollback

The original `DoubleBOSS/` folder (compiled two-boss version, untouched) sits next to this one;
launching `DoubleBOSS.me3` restores the original mod. Nothing here modifies
`regulation.bin`, `map/`, `msg/` or `common_func.emevd.dcx`.

---

## What it does **not** do

- **No difficulty or HP scaling** — every round is a fresh full-HP Nightlord, not a tougher one.
- **No new bosses or arenas** — it only re-uses the six Nightlord families the mod already
  supports, in their existing arenas.
- **No reward/loot changes** — kill counting is for the refill only; it does not add drops.
- **No save-file format changes** — only in-memory event flags are used.
- **No custom rules for team wipe** — dying still ends the run the normal way.
- **Not play-tested.** The scripts compile cleanly and the shipped binaries were verified by
  decompiling them back out (new handler registered 6×, stock handler absent, manager and spawn
  events `Restart`, roll present). Actual in-game behaviour is unverified — see the risk list in
  `README.md`, first item: the shipped `.dcx` use DCX **DFLT** (zlib) compression instead of the
  retail KRAK, because Oodle compression is Windows-only.
