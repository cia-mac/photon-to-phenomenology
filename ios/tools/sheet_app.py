#!/usr/bin/env python3
"""Contact sheets from build/app screenshots. usage: sheet_app.py <phone|pad> <open|closed> <w> <h> <cols>"""
import json, subprocess, sys, os, tempfile
dev, st, w, h, cols = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
slugs = [p['slug'] for p in json.load(open(os.path.join(root, 'Photon/Pieces/catalog.json')))]
tmp = tempfile.mkdtemp()
for i, s in enumerate(slugs, 1):
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'{root}/build/app/{dev}_{s}_{st}.png','-vf',f'scale={w}:{h}',f'{tmp}/{i:02d}.png'], check=True)
rows = -(-len(slugs)//int(cols))
out = f'{root}/build/app/SHEET_{dev}_{st}.png'
subprocess.run(['ffmpeg','-v','error','-y','-framerate','1','-start_number','1','-i',f'{tmp}/%02d.png','-vf',f'tile={cols}x{rows}:padding=6:margin=6:color=0x333333','-frames:v','1',out], check=True)
print(out)
