#!/usr/bin/env python3
"""Audit fixes: remove em dashes from display copy, fix the #about pointer-events
dead-zone, shorten/standardise chapter labels, and minor polish. Idempotent."""
import re, os

G = os.path.expanduser("~/Developer/photon-to-phenomenology/public/photon")
GALLERY = ["kanizsa","motion-aftereffect","afterimage","scintillating-grid","ebbinghaus",
           "cornsweet","cafe-wall","ponzo","muller-lyer"]
BOOK = ["inverse-problem","checker-shadow","aperture-problem","apparent-motion",
        "troxler-fading","motion-induced-blindness","change-blindness"]

def path(name):
    return os.path.join(G, "book", name+".html") if name in BOOK else os.path.join(G, name+".html")

# universal replacements applied to every instrument file
UNIVERSAL = [
    # 1) <title> em dash -> middle dot
    (" — Photon to Phenomenology", " · Photon to Phenomenology"),
    # 2) readout placeholder glyph em dash -> middle dot
    (">—<", ">·<"),
    # 3) #about dead-zone: not clickable until shown
    ("pointer-events:auto;cursor:pointer;opacity:0", "pointer-events:none;cursor:pointer;opacity:0"),
    ("guide.style.opacity='0'; about.style.opacity='1';",
     "guide.style.opacity='0'; about.style.opacity='1'; about.style.pointerEvents='auto';"),
    ("about.addEventListener('click',()=>{guide.style.opacity='1';about.style.opacity='0';});",
     "about.addEventListener('click',()=>{guide.style.opacity='1';about.style.opacity='0';about.style.pointerEvents='none';});"),
]

# per-file exact-string replacements (prose / verdict / state / chapter / title)
PERFILE = {
 "kanizsa": [("lying on top — yet no triangle", "lying on top. Yet no triangle")],
 "motion-aftereffect": [
     ("reads as motion the other way — the <b>motion aftereffect</b>, or waterfall illusion.",
      "reads as motion the other way. This is the <b>motion aftereffect</b>, or waterfall illusion."),
     ("the spiral keeps breathing — outward, or inward, against the way you spun it.",
      "the spiral keeps breathing, outward or inward, against the way you spun it."),
     ("'well adapted — now stop'", "'well adapted, now stop'"),
     ("'hold still — feel it drift back'", "'hold still, feel it drift back'"),
 ],
 "afterimage": [
     ("the balance tips toward its opposite — a <b>negative afterimage</b> made of fatigue, not light.",
      "the balance tips toward its opposite. A <b>negative afterimage</b>, made of fatigue, not light."),
     ("'well adapted — now click'", "'well adapted, now click'"),
 ],
 "muller-lyer": [("make the other look shorter — read as near and far corners.",
                  "make the other look shorter, read as near and far corners.")],
 "ebbinghaus": [("equal — but they", "equal, but they")],  # hits static div + JS literal
 "scintillating-grid": [("they flicker where you don't look", "they flicker where you don’t look")],
 "inverse-problem": [("your visual system picks the simplest cause — a cube.",
                      "your visual system picks the simplest cause: a cube.")],
 "change-blindness": [("hides the instant it happens — without a transient",
                       "hides the instant it happens. Without a transient")],
 # chapter labels: standardise to "Ch. N · <piece name>", shorten the long ones
 "checker-shadow": [('id="chapter">Ch. 3 · Lightness<', 'id="chapter">Ch. 3 · The checker-shadow<')],
 "aperture-problem": [
     ('id="chapter">Ch. 10 · Motion · the aperture problem<', 'id="chapter">Ch. 10 · The aperture problem<'),
     ('id="title">What is it really moving?<', 'id="title">Which way is it really moving?<'),
 ],
 "apparent-motion": [('id="chapter">Ch. 10 · Motion · apparent motion<', 'id="chapter">Ch. 10 · Apparent motion<')],
 "troxler-fading": [('id="chapter">Ch. 11 · Attention · Troxler fading<', 'id="chapter">Ch. 11 · Troxler fading<')],
 "motion-induced-blindness": [('id="chapter">Ch. 11 · Attention · motion-induced blindness<',
                               'id="chapter">Ch. 11 · Motion-induced blindness<')],
 "change-blindness2": [],  # placeholder, change-blindness chapter handled below
}
# change-blindness chapter (separate from its prose fix above)
PERFILE["change-blindness"].append(
    ('id="chapter">Ch. 11 · Attention · change blindness<', 'id="chapter">Ch. 11 · Change blindness<'))

def apply(name):
    p = path(name); s = open(p, encoding="utf-8").read(); orig = s; misses = []
    for a,b in UNIVERSAL:
        if a in s: s = s.replace(a,b)
    for a,b in PERFILE.get(name, []):
        if a in s: s = s.replace(a,b)
        else: misses.append(a[:45])
    if s != orig:
        open(p,"w",encoding="utf-8").write(s)
    return ("changed" if s!=orig else "nochange"), misses

def fix_indexes():
    out=[]
    for rel in ["index.html","book/index.html"]:
        p=os.path.join(G,rel); s=open(p,encoding="utf-8").read(); orig=s
        s=re.sub(r"<title>([^<]*?) — ([^<]*?)</title>", r"<title>\1 · \2</title>", s)
        s=s.replace("chapter by chapter — the inverse problem", "chapter by chapter: the inverse problem")
        if s!=orig: open(p,"w",encoding="utf-8").write(s)
        out.append((rel, "changed" if s!=orig else "nochange"))
    return out

print("== instruments ==")
for n in GALLERY+BOOK:
    st, miss = apply(n)
    print(f"{st:9} {n}" + (f"   MISSED: {miss}" if miss else ""))
print("== indexes ==")
for rel, st in fix_indexes():
    print(f"{st:9} {rel}")
