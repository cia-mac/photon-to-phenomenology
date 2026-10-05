#!/bin/bash
# Photograph every piece inside the running app on one simulator (debug build, test hooks).
# usage: shoot_app.sh <udid> <name>     writes build/app/<name>_<slug>_{open,closed}.png
cd "$(dirname "$0")/.." || exit 1
d=$1; n=$2; mkdir -p build/app
for s in $(python3 -c "import json;[print(p['slug']) for p in json.load(open('Photon/Pieces/catalog.json'))]"); do
  xcrun simctl terminate "$d" com.ciamac.illusions 2>/dev/null
  xcrun simctl launch "$d" com.ciamac.illusions -piece "$s" -skipGuide YES >/dev/null
  sleep 3;   xcrun simctl io "$d" screenshot "build/app/${n}_${s}_open.png"   >/dev/null 2>&1
  sleep 5.5; xcrun simctl io "$d" screenshot "build/app/${n}_${s}_closed.png" >/dev/null 2>&1
done
echo "$n done"
