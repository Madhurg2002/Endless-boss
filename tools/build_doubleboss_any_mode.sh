#!/usr/bin/env bash
# Rebuilds DoubleBOSS-AnyMode/ from DoubleBOSS/ and compiles its four event scripts.
#
# The toolchain (dotnet 8, DarkScript3, SoulsFormatsNEXT, ooz) is the one documented in
# tools/compiler/README.md; this script only drives it. Override the paths with
# DOTNET / EMEVDC / DCXKRAK when yours live elsewhere.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
DOTNET=${DOTNET:-/tmp/dotnet/dotnet}
EMEVDC=${EMEVDC:-$ROOT/tools/compiler/bin/Release/net8.0/emevdc.dll}
DCXKRAK=${DCXKRAK:-/tmp/oozbuild/dcxkrak}
WORK=${WORK:-/tmp/nrwork/anymode}

MAPS="m16_00_00_00 m16_10_00_00 m18_00_00_00 m19_00_00_00"

cd "$ROOT"
rm -rf "$WORK"
mkdir -p "$WORK/inits" "$WORK/src" "$WORK/out"

echo "== decompressing the retail event files (init data for the compiler)"
for m in $MAPS; do
    "$DCXKRAK" "DoubleBOSS/mod/event/$m.emevd.dcx" "$WORK/inits/$m.emevd"
done


echo "== generating sources and packages"
python3 tools/doubleboss_any_mode.py

echo "== compiling"
cp "$WORK"/inits/*.emevd "$WORK/src/"
cp DoubleBOSS-AnyMode/sources/*.js "$WORK/src/"
"$DOTNET" "$EMEVDC" -compile -game nr -indir "$WORK/src" -outdir "$WORK/out" -force

echo "== installing the compiled files into the events package"
for m in $MAPS; do
    test -s "$WORK/out/$m.emevd.dcx"
    cp "$WORK/out/$m.emevd.dcx" "DoubleBOSS-AnyMode/packages/01-events/mod/event/$m.emevd.dcx"
done

echo "== done: DoubleBOSS-AnyMode/packages/01-events/mod/event/"
