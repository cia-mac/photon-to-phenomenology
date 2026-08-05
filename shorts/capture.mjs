// Frame-exact capture of a deterministic short page to PNG frames.
// Usage: node capture.mjs <page.html> <framesDir>
import { chromium } from 'playwright-core';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const [page_html, framesDir] = process.argv.slice(2);
if (!page_html || !framesDir) { console.error('usage: node capture.mjs <page.html> <framesDir>'); process.exit(1); }
if (!existsSync(framesDir)) mkdirSync(framesDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EXEC, headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto('file://' + resolve(page_html));
await page.waitForFunction(() => window.SHORT && typeof window.seek === 'function');
await page.evaluate(() => document.fonts.ready);

const { frames } = await page.evaluate(() => window.SHORT);
console.log(`capturing ${frames} frames from ${page_html}`);
const t0 = Date.now();
for (let f = 0; f < frames; f++) {
  await page.evaluate(f => window.seek(f), f);
  await page.screenshot({ path: `${framesDir}/f_${String(f).padStart(5, '0')}.png` });
  if (f % 100 === 0) console.log(`  ${f}/${frames} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
console.log(`done: ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
await browser.close();
