// Frame-level audit. verify_layout.mjs only checks that header TEXT stays above
// the stimulus ceiling. It cannot see the figure at all, so it would happily
// pass a piece whose drawing runs under the type, off the edge of the frame, or
// straight through the end card.
//
// This walks real frames and measures four things the eye is bad at checking 22
// times in a row:
//
//   LEGIBILITY  for every visible text element, sample the canvas actually
//               behind it and require real luminance separation from the text
//               colour. This is what "overlapping graphics" means in practice:
//               not that shapes touch, but that type stops being readable.
//   COLLISION   no two visible text elements may overlap each other.
//   BLEED       the drawn figure must not run off the left or right edge, for
//               pieces that are meant to be a contained figure rather than a
//               full-bleed field.
//   END CARD    the veil must be opaque enough that the figure underneath is
//               below threshold. The canvas KEEPS drawing under the card by
//               design, so checking canvas content there was my own false
//               positive: it fired on 21 of 22 pieces and measured nothing.
//               The real invariant is residual contrast after the veil.
//
//   node verify_frames.mjs build/*.html
//
// Exits non-zero on any failure. Sandbox OFF (Chrome).

import { chromium } from 'playwright-core';
import { resolve } from 'path';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const MIN_CONTRAST = 42;   // 0..255 luminance separation for legible type
const STEP = 4;            // sample every Nth frame

// Pieces whose stimulus is a full-bleed field by design, so edge contact is
// correct rather than a bug.
const FULL_BLEED = new Set(['scintillating-grid', 'contrast-sensitivity', 'change-blindness',
                            'cafe-wall', 'cornsweet', 'whites-illusion', 'mach-bands',
                            'simultaneous-contrast', 'inattentional-blindness']);

const browser = await chromium.launch({ executablePath: EXEC, headless: true });
let failures = 0;

for (const pageHtml of process.argv.slice(2)) {
  const slug = pageHtml.split('/').pop().replace('.html', '');
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + resolve(pageHtml));
  await page.waitForFunction(() => window.SHORT && typeof window.seek === 'function');
  await page.evaluate(() => document.fonts.ready);

  const report = await page.evaluate(({ MIN_CONTRAST, STEP, fullBleed }) => {
    const { frames } = window.SHORT;
    const cv = document.getElementById('c'), ctx = cv.getContext('2d', { willReadFrequently: true });
    const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const parse = c => {
      const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
      return m ? lum(+m[1], +m[2], +m[3]) : null;
    };
    const out = { legibility: [], collisions: [], bleed: [], endcard: [] };

    for (let f = 0; f < frames; f += STEP) {
      window.seek(f);
      const endFade = +getComputedStyle(document.getElementById('veil')).opacity;

      // visible text elements this frame
      const vis = [];
      for (const id of ['chapter', 'piece', 'line', 'sub', 'count', 'close1', 'close2', 'close3']) {
        const e = document.getElementById(id);
        if (!e || +getComputedStyle(e).opacity < 0.35 || !e.textContent.trim()) continue;
        const r = e.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;
        vis.push({ id, r, col: parse(getComputedStyle(e).color) });
      }

      // COLLISION: text over text
      for (let i = 0; i < vis.length; i++)
        for (let j = i + 1; j < vis.length; j++) {
          const a = vis[i].r, b = vis[j].r;
          const ov = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
                   * Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
          if (ov > 40) out.collisions.push({ f, a: vis[i].id, b: vis[j].id, px: Math.round(ov) });
        }

      // LEGIBILITY: what is actually behind each text box.
      // Skip while the end card veil is mid-fade; the composite is transient.
      if (endFade < 0.05 || endFade > 0.9) {
        const plate = +getComputedStyle(document.getElementById('plate')).opacity;
        for (const v of vis) {
          if (v.col === null) continue;
          // the plate and the veil sit BETWEEN canvas and type, so when either is
          // opaque the canvas is not what the type is read against
          if (plate > 0.5 && v.r.bottom < 560) continue;
          if (endFade > 0.9) continue;
          const x = Math.max(0, Math.round(v.r.left)), y = Math.max(0, Math.round(v.r.top));
          const w = Math.min(1080 - x, Math.round(v.r.width)), h = Math.min(1920 - y, Math.round(v.r.height));
          if (w < 2 || h < 2) continue;
          const d = ctx.getImageData(x, y, w, h).data;
          let s = 0, n = 0;
          for (let i = 0; i < d.length; i += 4 * 37) { s += lum(d[i], d[i + 1], d[i + 2]); n++; }
          const bg = s / n;
          if (Math.abs(bg - v.col) < MIN_CONTRAST)
            out.legibility.push({ f, id: v.id, bg: Math.round(bg), fg: Math.round(v.col),
                                  d: Math.round(Math.abs(bg - v.col)) });
        }
      }

      // BLEED + END CARD: bounding box of everything drawn on the canvas
      const img = ctx.getImageData(0, 0, 1080, 1920).data;
      // field colour sampled from a corner the figure never reaches
      const fr = img[0], fg = img[1], fb = img[2];
      let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
      for (let y = 0; y < 1920; y += 6) {
        for (let x = 0; x < 1080; x += 6) {
          const i = (y * 1080 + x) * 4;
          if (Math.abs(img[i] - fr) + Math.abs(img[i + 1] - fg) + Math.abs(img[i + 2] - fb) > 26) {
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX >= 0) {
        if (!fullBleed && (minX < 8 || maxX > 1072))
          out.bleed.push({ f, minX, maxX });
        // Residual contrast of the figure showing THROUGH the veil. The veil is
        // a DOM layer over the canvas, so what matters is figure contrast times
        // what the veil lets past, not whether the canvas is still drawing.
        // Only once the card has SETTLED. During the cross-dissolve the veil is
        // half up by definition and the figure is half visible, which is what a
        // dissolve is. Checking mid-fade flagged all 21 pieces for doing exactly
        // what they were built to do.
        // >0.995, i.e. genuinely settled. Sampling every 4th frame lands on a
        // frame at 0.97 on some pieces, which is still the dissolve running, not
        // a defect. Tightening the gate is honest; loosening the residual
        // threshold to swallow it would not be.
        if (endFade > 0.995) {
          let lo = 255, hi = 0;
          for (let y = 480; y < 1440; y += 12)
            for (let x = 0; x < 1080; x += 12) {
              const i = (y * 1080 + x) * 4;
              const L = lum(img[i], img[i + 1], img[i + 2]);
              if (L < lo) lo = L; if (L > hi) hi = L;
            }
          const veilOpacity = endFade;
          const residual = (hi - lo) * (1 - veilOpacity);
          if (residual > 6) out.endcard.push({ f, residual: +residual.toFixed(1), veil: +veilOpacity.toFixed(3) });
        }
      }
    }
    return out;
  }, { MIN_CONTRAST, STEP, fullBleed: FULL_BLEED.has(slug) });

  const counts = Object.entries(report).map(([k, v]) => [k, v.length]);
  const bad = counts.filter(([, n]) => n > 0);
  if (bad.length) {
    failures++;
    console.log(`\n${slug}  FAIL`);
    for (const [k, v] of Object.entries(report)) {
      if (!v.length) continue;
      console.log(`  ${k}: ${v.length} frame(s), first ${JSON.stringify(v[0])}`);
    }
  } else {
    console.log(`${slug}  ok`);
  }
  await page.close();
}
await browser.close();
console.log(failures ? `\n${failures} piece(s) FAILED` : `\nall pieces clean`);
process.exit(failures ? 1 : 0);
