#!/bin/bash
# Render the v2 shorts: frames via capture.mjs, then H.264 yuv420p at 30fps.
# Needs the sandbox OFF (Chrome binds a singleton socket).
set -euo pipefail
cd "$(dirname "$0")"
for p in motion-aftereffect afterimage scintillating-grid; do
  rm -rf "frames/${p}_v2"
  node capture.mjs "${p}_short_v2.html" "frames/${p}_v2"
  ffmpeg -y -loglevel error -framerate 30 -i "frames/${p}_v2/f_%05d.png" \
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart \
    "out/${p}_short_v2.mp4"
  echo "encoded out/${p}_short_v2.mp4"
done
