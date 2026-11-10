# Headless compiler (optional)

The `.emevd.dcx` files in `mod/event/` are already built. This folder is how they were
produced on Linux, so the build can be repeated without Windows / Oodle.

## What is involved

1. **DarkScript3** (AinTunez/DarkScript3, master) - the JS -> EMEVD compiler, Nightreign
   emedf support included. Only its non-GUI sources are used.
2. **SoulsFormatsNEXT** (thefifthmatt/SoulsFormatsNEXT) - EMEVD reader/writer.
3. **ooz** (powzix/ooz) - open-source Oodle Kraken decoder. Needed to decompress the
   original `*.emevd.dcx`, which serve as the init data the compiler needs.
4. A tiny console wrapper (`App.csproj` + `Program.cs`) that calls
   `RoundTripTool.CommandLine`, plus `dcxkrak` (`dcxkrak.cpp`) to unwrap DCX_KRAK.

## Steps

```bash
# 1. toolchain
curl -sSL https://dot.net/v1/dotnet-install.sh | bash -s -- --channel 8.0 --install-dir /tmp/dotnet
git clone --depth 1 https://github.com/AinTunez/DarkScript3      /tmp/ds3
git clone --depth 1 https://github.com/thefifthmatt/SoulsFormatsNEXT /tmp/sfn
git clone --depth 1 https://github.com/powzix/ooz               /tmp/ooz

# 2. decompress the shipped event files (they are DCX_KRAK)
g++ -O2 -std=c++17 -include stdafx.h dcxkrak.cpp kraken.o bitknit.o lzna.o -o dcxkrak
./dcxkrak ../../DoubleBOSS/mod/event/m19_00_00_00.emevd.dcx /tmp/m19_00_00_00.emevd

# 3. compile (the plain .emevd files in the input dir are the init data)
/tmp/dotnet/dotnet bin/Release/net8.0/emevdc.dll -compile -game nr \
    -indir <dir with mXX.emevd + the .js> -outdir out -force
```

The `.dcx` files written here are DCX_DFLT (zlib) because Oodle compression is Windows-only.
The container is the same DCX format, only the compression codec differs.

## Notes

- **ooz on Linux.** `ooz/stdafx.h` is a Windows header. Compile from a directory that has a
  linux-friendly copy of `stdafx.h` next to `kraken.cpp`/`bitknit.cpp`/`lzna.cpp`: include
  `<emmintrin.h>`/`<smmintrin.h>`, drop the Windows includes, add `_BitScanReverse`,
  `_BitScanForward`, `_rotl`, `_rotr`, `_byteswap_*` shims, `#define __forceinline inline`,
  `#define WINAPI`, and strip the Windows test harness below `Kraken_Decompress` (keep it,
  drop everything after it). Build with `-msse4.1`.
- **Header matters.** SoulsFormats picks the output codec from the `// @compress` line in the
  `.js`, so it must say `DCX_DFLT_10000_44_9` here; `DCX_DFLT` alone is not a valid name and
  `DCX_KRAK` makes the writer look for Oodle. `tools/endless_transform.py` rewrites that line.
- **Only the map files.** Compile the four `m*.emevd.dcx.js`; do not put
  `common_func.emevd.dcx.js` in the input directory (it still says KRAK and would be
  recompiled). The map scripts' `$InitializeCommonEvent` calls are expanded to explicit
  numeric arguments from `tools/original_inits.json`, so `common_func` definitions are not
  needed at compile time.
- `common_func.emevd.dcx` is unchanged and is shipped as the original KRAK file.
- If a future edit needs to be recompiled on Windows, open the shipped `.dcx` in
  DarkScript3 and press Ctrl+S; that writes KRAK again, which is what the retail files use.
