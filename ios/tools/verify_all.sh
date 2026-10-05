#!/bin/bash
# Run the measuring script on every piece; writes build/verify/<slug>.json and prints a summary.
cd "$(dirname "$0")/.." || exit 1
mkdir -p build/verify; fail=0
for f in Photon/Pieces/*.html; do
  s=$(basename "$f" .html)
  node tools/verify_piece.mjs "$s" > "build/verify/$s.json" 2> "build/verify/$s.err" || { fail=$((fail+1)); echo "FAIL $s"; python3 -c "
import json
try:
    d=json.load(open('build/verify/$s.json'))
    [print('   ',f['detail'][:200]) for f in d['findings'][:6]]
except Exception as e: print('    no json:', open('build/verify/$s.err').read()[-200:])"; }
done
echo "failures: $fail of $(ls Photon/Pieces/*.html | wc -l)"
