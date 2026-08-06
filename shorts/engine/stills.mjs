// Grab one frame per named time from a built page. Cheap composition check
// before committing to a full render.
//   node engine/stills.mjs build/ponzo.html 2 8.5
import { chromium } from 'playwright-core';
import { resolve } from 'path';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const [pageHtml, ...times] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: EXEC, headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto('file://' + resolve(pageHtml));
await page.waitForFunction(() => window.SHORT && typeof window.seek === 'function');
await page.evaluate(() => document.fonts.ready);
const { fps } = await page.evaluate(() => window.SHORT);
const slug = pageHtml.split('/').pop().replace('.html', '');
for (const t of times) {
  await page.evaluate(f => window.seek(f), Math.round(parseFloat(t) * fps));
  await page.screenshot({ path: `stills/${slug}_t${t}.png` });
  console.log(`stills/${slug}_t${t}.png`);
}
await browser.close();
