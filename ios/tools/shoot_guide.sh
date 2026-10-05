#!/bin/bash
# Photograph every piece with its guide OPEN (no skip hook). usage: shoot_guide.sh <udid> <name>
cd "$(dirname "$0")/.." || exit 1
d=$1; n=$2; mkdir -p build/app
for s in $(python3 -c "import json;[print(p['slug']) for p in json.load(open('Photon/Pieces/catalog.json'))]"); do
  xcrun simctl terminate "$d" com.ciamac.photon 2>/dev/null
  xcrun simctl launch "$d" com.ciamac.photon -piece "$s" >/dev/null
  sleep 3.4; xcrun simctl io "$d" screenshot "build/app/${n}_${s}_guide.png" >/dev/null 2>&1
done
echo "$n done"
