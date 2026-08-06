// Layout gate for the v2 shorts. Asserts the band law at every text beat:
//   no visible header text may cross y=470 (the stimulus ceiling)
//   the countdown must sit below y=1450
// Catches the exact v1 defect (a reveal line wrapping onto the figure) before
// anyone spends twenty minutes rendering frames.
import { chromium } from 'playwright-core';
import { resolve } from 'path';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const CEIL = 470, FLOOR = 1450;

const browser = await chromium.launch({ executablePath: EXEC, headless: true });
let bad = 0;
for (const page_html of process.argv.slice(2)) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + resolve(page_html));
  await page.waitForFunction(() => window.SHORT && typeof window.seek === 'function');
  await page.evaluate(() => document.fonts.ready);
  const { frames, fps } = await page.evaluate(() => window.SHORT);
  const worst = await page.evaluate(({ frames, CEIL, FLOOR }) => {
    const out = { headerMax: 0, headerAt: null, headerText: '', countMin: 1e9, countAt: null, lines: {} };
    for (let f = 0; f < frames; f++) {
      window.seek(f);
      for (const id of ['chapter', 'piece', 'line', 'sub']) {
        const e = document.getElementById(id);
        if (!e || +getComputedStyle(e).opacity < 0.05 || !e.textContent.trim()) continue;
        const r = e.getBoundingClientRect();
        if (id === 'line') out.lines[e.textContent] = Math.round(r.height);
        if (r.bottom > out.headerMax) { out.headerMax = r.bottom; out.headerAt = f; out.headerText = e.textContent; }
      }
      const c = document.getElementById('count');
      if (c && +getComputedStyle(c).opacity > 0.05 && c.textContent.trim()) {
        const r = c.getBoundingClientRect();
        if (r.top < out.countMin) { out.countMin = r.top; out.countAt = f; }
      }
    }
    return out;
  }, { frames, CEIL, FLOOR });

  const name = page_html.split('/').pop();
  const okHead = worst.headerMax <= CEIL;
  const okCount = worst.countMin === 1e9 || worst.countMin >= FLOOR;
  console.log(`\n${name}  (${frames} frames, ${(frames / fps).toFixed(1)}s)`);
  console.log(`  header bottom max ${Math.round(worst.headerMax)} (ceiling ${CEIL})  ${okHead ? 'PASS' : 'FAIL'}  @f${worst.headerAt} "${worst.headerText}"`);
  console.log(`  count top min     ${worst.countMin === 1e9 ? 'n/a' : Math.round(worst.countMin)} (floor ${FLOOR})  ${okCount ? 'PASS' : 'FAIL'}`);
  for (const [txt, h] of Object.entries(worst.lines)) {
    const n = Math.round(h / 77);
    console.log(`    ${n === 1 ? '1 line ' : n + ' LINES'}  ${h}px  "${txt}"`);
  }
  if (!okHead || !okCount) bad++;
  await page.close();
}
await browser.close();
console.log(bad ? `\n${bad} page(s) FAILED` : `\nall pages PASS`);
process.exit(bad ? 1 : 0);
