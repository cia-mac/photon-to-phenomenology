// Collect every narration line the pages ask the app to speak: {id, text}. Read-only.
import { createRequire } from 'node:module';
import { readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const IOS = resolve(HERE, '..', '..');
const require = createRequire(join(IOS, '..', 'shorts', 'package.json'));
const { chromium } = require('playwright-core');
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const dir = join(IOS, 'Photon', 'Pieces');
const slugs = readdirSync(dir).filter(f => f.endsWith('.html')).map(f => f.replace('.html', '')).sort();
const browser = await chromium.launch({ executablePath: EXEC });
const out = [];
for (const s of slugs) {
  const page = await browser.newPage({ viewport: { width: 393, height: 852 } });
  await page.goto(pathToFileURL(join(dir, s + '.html')).href);
  await page.waitForTimeout(1500);
  await page.evaluate(() => { window.__photonLog = []; PhotonApp._voice(true); });
  for (let i = 0; i < 12; i++) {
    const more = await page.evaluate(() => {
      const w = document.getElementById('walk'), n = document.getElementById('wnext');
      if (!w || !w.classList.contains('on') || !n || n.textContent.trim() === 'done') return false;
      n.click(); return true;
    });
    if (!more) break;
    await page.waitForTimeout(150);
  }
  const says = await page.evaluate(() => (window.__photonLog || []).filter(m => m.t === 'say').map(m => ({ id: m.id, text: m.text })));
  const seen = new Set();
  for (const m of says) if (!seen.has(m.id)) { seen.add(m.id); out.push(m); }
  console.error(s, [...seen].length);
  await page.close();
}
await browser.close();
writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
console.error('lines', out.length);
