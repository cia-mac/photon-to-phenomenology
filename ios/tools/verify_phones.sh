#!/bin/bash
# Run the measuring script at the other phone sizes (iPhone 15, SE class, Pro Max) on every piece.
cd "$(dirname "$0")/.." || exit 1
mkdir -p build/verify_phones
for f in Photon/Pieces/*.html; do
  s=$(basename "$f" .html)
  ONLY_SIZES=phone15,phoneSE,phoneMax node tools/verify_piece.mjs "$s" > "build/verify_phones/$s.json" 2> "build/verify_phones/$s.err"
  python3 - "$s" <<'PY'
import json,sys
s=sys.argv[1]
try: d=json.load(open('build/verify_phones/'+s+'.json'))
except Exception: print('ERR ',s, open('build/verify_phones/'+s+'.err').read()[-160:]); sys.exit()
for f in d['findings'][:6]: print('FAIL',s.ljust(26),f['detail'][:170])
PY
done
echo phones-done
