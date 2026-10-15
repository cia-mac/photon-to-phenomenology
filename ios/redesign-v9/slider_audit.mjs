// Where are the sliders, and what covers them? Phone 402x874 (safe-area bottom 34), three states per page.
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url)), IOS = resolve(HERE, '..');
const require = createRequire(join(IOS, '..', 'shorts', 'package.json'));
const { chromium } = require('playwright-core');
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const dir = process.env.PIECES_DIR || join(IOS, 'Photon/Pieces'); const b = await chromium.launch({ executablePath: EXEC });
const only = process.argv.slice(2);
for (const f of readdirSync(dir).filter(x => x.endsWith('.html')).sort()) {
  const slug = f.replace('.html', ''); if (only.length && !only.includes(slug)) continue;
  const pg = await b.newPage({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 2, hasTouch: true });
  await pg.addInitScript(() => { document.documentElement.style.setProperty('--sat', '59px'); });
  await pg.goto(pathToFileURL(join(dir, f)).href); await pg.waitForTimeout(700);
  const probe = async (state) => pg.evaluate((state) => {
    const rect = e => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), b: Math.round(874 - r.bottom) }; };
    const vis = e => { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden') return false; for (let n = e; n; n = n.parentElement) if (parseFloat(getComputedStyle(n).opacity) < 0.05) return false; const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1; };
    const sliders = [...document.querySelectorAll('input[type=range]')].filter(vis);
    const cover = ['#replay', '#thesis', '#walk'].map(s => document.querySelector(s)).filter(e => e && vis(e));
    return sliders.map(sl => {
      const r = sl.getBoundingClientRect();
      const hit = cover.filter(c => { const q = c.getBoundingClientRect(); return !(q.right < r.left || q.left > r.right || q.bottom < r.top || q.top > r.bottom); }).map(c => c.id);
      return { state, slider: sl.id || sl.name || sl.className || 'range', ...rect(sl), covered_by: hit };
    });
  }, state);
  let rows = await probe('initial');
  if (await pg.$('#replay.on')) { await pg.tap('#replay'); await pg.waitForTimeout(900); rows = rows.concat(await probe('guide open')); await pg.tap('#wskip'); await pg.waitForTimeout(1400); rows = rows.concat(await probe('explained')); }
  if (rows.length) for (const r of rows) console.log(slug.padEnd(26), JSON.stringify(r));
  await pg.close();
}
await b.close();
