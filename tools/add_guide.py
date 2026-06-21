#!/usr/bin/env python3
"""Add a 'what this is / what to do' guide panel to every instrument, replacing
the old one-line hint. Idempotent-ish: run once on the fresh files."""
import re, os, sys

ROOT = os.path.expanduser("~/Developer/photon-to-phenomenology/public/photon")

# per-file copy: WHAT (explanation, <b> for key term) and DO (instruction)
COPY = {
 "kanizsa": ("Three discs, each with a wedge cut out. When the wedges point inward you see a solid <b>triangle with sharp, bright edges</b> lying on top — yet no triangle, no edge and no brighter surface is ever drawn.",
             "Drag to rotate the wedges. Watch the triangle sharpen into being, then dissolve."),
 "motion-aftereffect": ("Adapt to steady motion and the detectors tuned to it tire out. When it stops, their silence reads as motion the other way — the <b>motion aftereffect</b>, or waterfall illusion.",
             "Drag sideways to spin the spiral for ~20s while you fixate the centre, then drag it back to a stop and keep looking."),
 "afterimage": ("Stare at a strong colour and the cones that absorb it fatigue. On a neutral field the balance tips toward its opposite — a <b>negative afterimage</b> made of fatigue, not light.",
             "Fixate the dot on the teal disc for ~15s, then click and keep your eyes on the dot."),
 "scintillating-grid": ("Every disc is the same pale grey, yet <b>black dots flash at the crossings</b> you are not looking at. Retinal cells suppressing their bright neighbours (lateral inhibition) overshoot into phantom darkness.",
             "Let your eyes roam across the grid and watch the crossings flicker. Drag to change the spacing."),
 "ebbinghaus": ("The two centre discs are <b>exactly the same size</b>, but the one ringed by giants looks smaller than the one ringed by dwarves. Size is judged against the neighbours, not measured.",
             "Drag to grow and shrink the surrounding rings. The centre discs never change."),
 "cornsweet": ("Both halves are the identical grey everywhere except a faint light-to-dark cusp at the seam. Your visual system reads that <b>edge</b> and repaints the whole surface to match.",
             "Drag right to slide a bar over the seam. The two halves fuse into one flat grey."),
 "cafe-wall": ("Offset rows of light and dark tiles with thin grey mortar make the <b>perfectly level lines</b> look sloped and wedged. The contrast at each tile edge tugs the perceived line.",
             "Drag sideways to change the row offset. Slide it to zero and every row snaps level."),
 "ponzo": ("The two bars are the <b>same length</b>, but the one near the converging rails looks longer. The rails read as depth, so your brain enlarges the 'farther' bar to keep size constant.",
             "Drag to open and close the converging rails. The bars never change length."),
 "muller-lyer": ("The two shafts are the <b>same length</b>. Fins splayed outward make one look longer; fins folded inward make the other look shorter — read as near and far corners.",
             "Drag to fold the fins in and out. Flatten them and the shafts line up."),
 "inverse-problem": ("One flat retinal image fits countless 3-D scenes. This 'cube' is really <b>eight edges at unrelated depths</b> that align only from one viewpoint; your visual system picks the simplest cause — a cube.",
             "Drag to turn the wireframe. Let go and it eases home, snapping back into a cube."),
 "checker-shadow": ("Squares A and B send your eye the <b>identical grey</b>. Because B lies in shadow, your visual system discounts the shadow and judges B a lighter surface (Adelson's checker-shadow).",
             "Drag the shadow off B and watch its value jump apart from A in the readout."),
 "aperture-problem": ("Through a small opening a moving edge shows only motion <b>across</b> itself, so countless true directions look the same. Only the line ends can reveal which way it really moves.",
             "Drag the bars to set their true motion, then grab the rim and pull to open the aperture."),
 "apparent-motion": ("Two lamps flashing in turn, with nothing between them, are seen as <b>one object crossing the gap</b>. At the right rhythm your visual system builds motion no object ever made (phi).",
             "Drag across to change the rhythm and drag a dot to move it. Find where two blinks become one motion."),
 "troxler-fading": ("Hold your gaze still and unchanging things in the periphery <b>fade from awareness</b>. Steady, unvarying input stops being reported (Troxler fading).",
             "Stare at the centre cross without moving your eyes. Drag to widen the ring; flick your eyes to bring it back."),
 "motion-induced-blindness": ("While a pattern turns around them, bright and obvious dots <b>vanish from awareness</b> for seconds at a time. Salience does not guarantee being seen.",
             "Stare at the centre cross and watch the amber dots blink out. Drag to change the mask's speed."),
 "change-blindness": ("A large, repeating change is <b>easy to miss</b> when a blank flash hides the instant it happens — without a transient to grab attention, you never stored the scene to compare.",
             "Find the tile that keeps changing. Drag to shrink the blank (at zero it pops out), then click your guess."),
}

GUIDE_CSS = (
 "#guide{bottom:30px;left:30px;max-width:min(38ch,76vw);transition:opacity .7s ease}\n"
 "  #guide .gk{font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;color:var(--faint);margin-bottom:5px}\n"
 "  #guide .gw{font-size:13px;line-height:1.5;color:var(--dim);margin-bottom:14px}\n"
 "  #guide .gw b{color:var(--cream);font-weight:400}\n"
 "  #guide .gd{font-size:13.5px;line-height:1.5;color:var(--cream)}\n"
 "  #about{bottom:30px;left:30px;font-size:11px;letter-spacing:0.06em;color:var(--dim);pointer-events:auto;cursor:pointer;opacity:0;transition:opacity .6s ease}\n"
 "  #about:hover{color:var(--cream)}"
)

def guide_html(what, do):
    return (f'<div class="chrome" id="guide">\n'
            f'  <div class="gk">what this is</div>\n'
            f'  <div class="gw">{what}</div>\n'
            f'  <div class="gk">what to do</div>\n'
            f'  <div class="gd">{do}</div>\n'
            f'</div>\n'
            f'<div class="chrome" id="about">&#9432; about</div>')

def process(path, key):
    s = open(path, encoding="utf-8").read()
    what, do = COPY[key]
    orig = s

    # 1) main #hint CSS rule -> guide+about CSS (anchored on bottom:30px;left:30px;)
    s = re.sub(r'#hint\{bottom:30px;left:30px;[^}]*\}', GUIDE_CSS, s, count=1)
    # 2) mobile media: relax guide width + lift thesis above the about line
    s = re.sub(r'#hint\{bottom:\d+px\}', '#guide{max-width:none}', s)
    s = s.replace('#thesis{left:30px;text-align:left;max-width:none}',
                  '#thesis{left:30px;text-align:left;max-width:none;bottom:66px}')
    # 3) HTML hint div -> guide + about
    s = re.sub(r'<div class="chrome" id="hint">.*?</div>', guide_html(what, do), s, count=1)
    # 4) JS ref: hint -> guide, about
    s = re.sub(r"hint\s*=\s*document\.getElementById\('hint'\)",
               "guide=document.getElementById('guide'), about=document.getElementById('about')", s, count=1)
    # 5) first(): swap the hint-collapse line for guide-collapse (runs every interaction)
    s = re.sub(r"if\(!interacted\)\{\s*interacted=true;\s*hint\.style\.opacity='0';\s*\}",
               "guide.style.opacity='0'; about.style.opacity='1';", s, count=1)
    # 6) wire the about toggle (re-open the guide)
    s = s.replace("window.addEventListener('resize',resize);",
                  "window.addEventListener('resize',resize);\n  about.addEventListener('click',()=>{guide.style.opacity='1';about.style.opacity='0';});", 1)

    if s == orig:
        return False, "no change"
    # sanity: hint should be gone, guide present
    if 'id="hint"' in s or 'id="guide"' not in s or "getElementById('hint')" in s:
        return False, "FAILED markers"
    open(path, "w", encoding="utf-8").write(s)
    return True, "ok"

def main():
    results = []
    for key in COPY:
        sub = "book" if key in ("inverse-problem","checker-shadow","aperture-problem","apparent-motion","troxler-fading","motion-induced-blindness","change-blindness") else ""
        path = os.path.join(ROOT, sub, key + ".html")
        if not os.path.exists(path):
            results.append((key, "MISSING")); continue
        ok, msg = process(path, key)
        results.append((key, msg))
    for k, m in results:
        print(f"{m:14} {k}")
    bad = [k for k,m in results if m not in ("ok",)]
    print("\nALL OK" if not bad else f"\nPROBLEMS: {bad}")

if __name__ == "__main__":
    main()
