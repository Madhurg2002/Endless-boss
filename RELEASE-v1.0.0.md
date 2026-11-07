# Endless Nightreign v1.0.0

An unlimited Nightlord gauntlet for **ELDEN RING NIGHTREIGN**, built on
**DoubleBOSS** (Nexus mod 952). Kill the Nightlord and the expedition does not end — the team
is warped straight into another fight, against a **different, randomly rolled Nightlord**, with
**consumables refilled every 3 kills**, until the run is actually lost.

## Download

**`EndlessNightreign-v1.0.0.zip`** (3.4 MB, 42 files) — includes the four compiled
`.emevd.dcx` event files, so **nothing needs compiling**.

SHA-256:
```
aa37688935b153aa92d2115b45f2263081a8e364531a15b7d346d0a154b4f701
```

## Install

1. Unzip anywhere (e.g. next to your game folder).
2. Install [me3](https://github.com/garyttierney/me3).
3. Get **Seamless Co-op for Nightreign** and copy `nrsc.dll` to
   `EndlessNightreign-v1.0.0/SeamlessCoop/nrsc.dll`.
   *(It is not bundled here — download it from its own Nexus page.)*
4. Launch: `me3 launch -p EndlessNightreign-v1.0.0/EndlessNightreign.me3`

The profile already sets `savefile = "NR0000.co2"` and `start_online = false`. Nothing else in
the game is modified — `regulation.bin`, `map/`, `msg/` and `common_func.emevd.dcx` are the
original files.

## What it does

- **Endless chain** — the stock death handler that ends the expedition for the chained Nightlord
  is replaced by one that never sets the "Nightlord is down" latch `7512`; the round manager and
  all six spawn events are `Restart` events, so the arena keeps running.
- **Different boss every round** — all six families are armed at run start; each round the host
  rolls one of `19300010`–`19300015`, resolved to exactly one of `19300020`–`19300025`, so two
  bosses can never spawn. The flags are network-connected: every co-op peer fights the same boss.
- **Refill every 3 kills** — spEffect `509` (the game's own boss-kill restore) applied to all
  player slots. Change `REFILL_EVERY` / `REFILL_SPEFFECT` in `tools/endless_transform.py`.
- **Fresh fight each round** — boss corpse disabled and re-enabled at full HP, entrance sequence
  replayed, health bar and BGM reset.

Full mechanism-by-mechanism breakdown: `EndlessNightreign-v1.0.0/CAPABILITIES.md`.

## Status — read before reporting a bug

- The scripts compile cleanly, and rebuilding the **unmodified** original scripts with the same
  toolchain reproduces all four retail `.emevd` files **byte for byte**, so the compiler path is
  exact.
- The shipped `.dcx` files use DCX **DFLT** (zlib) compression instead of retail **KRAK**,
  because Oodle compression is Windows-only. Same container, different codec. If the map fails to
  load at all, recompile the four `.js` in DarkScript3 on Windows (Ctrl+S — the shipped `.dcx`
  can be opened directly) and use those instead.
- **Not play-tested.** The endless loop, refill and rotation are correct as compiled event data,
  not as observed behaviour. Known things to watch: boss re-enabling after a kill, 垃圾王's phase
  transition fighting the loop, BGM/health-bar leftovers between rounds, and a 4 s interlude that
  may be too short while looting.

## Rollback

The untouched original DoubleBOSS is included in the repository (`DoubleBOSS/`); launching its
own profile restores the two-boss version.

## Credits

DoubleBOSS by its original Nexus author. This variant only rewrites the four map event scripts
and ships them compiled.
