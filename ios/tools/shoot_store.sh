#!/bin/bash
# App Store screenshots: let each guide play out to its final state, close it, photograph.
# usage: shoot_store.sh <udid> <name> ; writes build/store/<name>_<NN>_<slug>.png. Debug build only.
cd "$(dirname "$0")/.." || exit 1
d=$1; n=$2; mkdir -p build/store
xcrun simctl status_bar "$d" override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3 >/dev/null 2>&1
xcrun simctl terminate "$d" com.ciamac.photon 2>/dev/null
xcrun simctl launch "$d" com.ciamac.photon >/dev/null; sleep 3
xcrun simctl io "$d" screenshot "build/store/${n}_00_library.png" >/dev/null 2>&1
i=0
for s in kanizsa ebbinghaus cornsweet cafe-wall checker-shadow motion-induced-blindness receptive-field; do
  i=$((i+1))
  xcrun simctl terminate "$d" com.ciamac.photon 2>/dev/null
  xcrun simctl launch "$d" com.ciamac.photon -piece "$s" -skipGuide YES -skipGuideAfter 33 >/dev/null
  sleep 38; xcrun simctl io "$d" screenshot "build/store/${n}_0${i}_${s}.png" >/dev/null 2>&1
done
echo "$n done"
