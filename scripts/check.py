#!/usr/bin/env python3
"""Repo gate for the photon instruments. Run: python3 scripts/check.py
Verifies every instrument parses, links the shared chrome, and carries no dead code.
Exit 0 = clean; nonzero = findings printed."""
import re, os, subprocess, sys, tempfile

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'photon')
PAGES = ["kanizsa","motion-aftereffect","afterimage","scintillating-grid","ebbinghaus","cornsweet",
         "cafe-wall","ponzo","muller-lyer","book/inverse-problem","book/checker-shadow",
         "book/aperture-problem","book/apparent-motion","book/troxler-fading",
         "book/motion-induced-blindness","book/change-blindness"]

DEAD = ["interacted", "thesisShown", "function first(", "function firstTouch(",
        'id="guide"', 'id="about"', "redesign v1", "walk me through it",
        'id="menubtn"',  # chrome DOM is injected by chrome.js, never inline
        ]

errs = []

def node_check(src, label):
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as t:
        t.write(src); path = t.name
    r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
    os.unlink(path)
    if r.returncode != 0:
        errs.append(f"{label}: JS parse error\n{r.stderr.strip()[:300]}")

# 1. shared chrome
cj = open(os.path.join(ROOT, 'chrome.js')).read()
node_check(cj, 'chrome.js')
cc = open(os.path.join(ROOT, 'chrome.css')).read()
for sel in ['#menubtn', '#overlay', '#walk', '#replay', 'prefers-reduced-motion', 'focus-visible', 'body.guiding #thesis']:
    if sel not in cc: errs.append(f"chrome.css: missing '{sel}'")

# 2. NAV registry <-> files on disk, 1:1
nav_slugs = re.findall(r"slug:'([^']+)'", cj)
disk_slugs = [p.split('/')[-1] for p in PAGES]
if sorted(nav_slugs) != sorted(disk_slugs):
    errs.append(f"NAV/disk mismatch: nav-only={set(nav_slugs)-set(disk_slugs)} disk-only={set(disk_slugs)-set(nav_slugs)}")
for slug, href in re.findall(r"slug:'([^']+)'|h:'([^']+)'", cj):
    pass
for href in re.findall(r"h:'(/photon/[^']+)'", cj):
    if not os.path.exists(os.path.join(ROOT, '..', href.lstrip('/'))):
        errs.append(f"NAV href has no file: {href}")

# 3. each page
for p in PAGES:
    path = os.path.join(ROOT, p + '.html')
    s = open(path).read()
    slug = p.split('/')[-1]
    if s.count('<link rel="stylesheet" href="/photon/chrome.css">') != 1:
        errs.append(f"{p}: chrome.css link count != 1")
    if s.count('<script src="/photon/chrome.js"></script>') != 1:
        errs.append(f"{p}: chrome.js script count != 1")
    inits = re.findall(r"PhotonChrome\.init\(\{here:'([^']+)'", s)
    if inits != [slug]:
        errs.append(f"{p}: init slug {inits} != '{slug}'")
    if 'const WALK=[' not in s:
        errs.append(f"{p}: WALK array missing")
    for d in DEAD:
        if d in s: errs.append(f"{p}: dead marker present: {d!r}")
    m = re.search(r"<script>(.*)</script>", s, re.S)
    if m: node_check(m.group(1), p)
    else: errs.append(f"{p}: no inline script")

if errs:
    print(f"FAIL - {len(errs)} finding(s):")
    for e in errs: print("  " + e)
    sys.exit(1)
print(f"PASS - {len(PAGES)} pages + shared chrome all clean")
