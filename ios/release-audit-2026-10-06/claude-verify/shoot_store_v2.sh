#!/bin/bash
# Store screenshots from the current build, silent voice. usage: shoot_store_v2.sh <udid> <name> <outdir>
d=$1; n=$2; o=$3; mkdir -p "$o"
xcrun simctl status_bar "$d" override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3 >/dev/null 2>&1
i=0
for s in kanizsa ebbinghaus cornsweet cafe-wall checker-shadow motion-induced-blindness receptive-field; do
  i=$((i+1)); case " ${ONLY:-$s} " in *" $s "*) ;; *) continue;; esac
  xcrun simctl terminate "$d" com.ciamac.illusions 2>/dev/null
  xcrun simctl launch "$d" com.ciamac.illusions -narrationMuted NO -silentVoice YES -piece "$s" -skipGuide YES -skipGuideAfter ${AFTER:-33} >/dev/null
  sleep $(( ${AFTER:-33} + 6 )); xcrun simctl io "$d" screenshot "$o/${n}_0${i}_${s}.png" >/dev/null 2>&1
done
xcrun simctl terminate "$d" com.ciamac.illusions 2>/dev/null
xcrun simctl launch "$d" com.ciamac.illusions -narrationMuted NO >/dev/null; sleep 4
xcrun simctl io "$d" screenshot "$o/${n}_08_library.png" >/dev/null 2>&1
echo "$n done"
