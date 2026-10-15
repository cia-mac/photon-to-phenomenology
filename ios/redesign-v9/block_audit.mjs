// The tall blocks on a Lab page (phone 402x874): tag, id/class, top and height, plus where each slider sits.
import { createRequire } from 'node:module';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url)), IOS = resolve(HERE, '..');
const require = createRequire(join(IOS, '..', 'shorts', 'package.json'));
const { chromium } = require('playwright-core');
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const dir = process.env.PIECES_DIR || join(IOS, 'Photon/Pieces'); const b = await chromium.launch({ executablePath: EXEC });
for (const slug of process.argv.slice(2)) {
  const pg = await b.newPage({ viewport: { width: 402, height: 874 }, hasTouch: true });
  await pg.goto(pathToFileURL(join(dir, slug + '.html')).href); await pg.waitForTimeout(700);
  const out = await pg.evaluate(() => {
    const desc = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).join('.') : '');
    const rows = []; const seen = new Set();
    const walk = (e, depth) => { if (depth > 4) return; for (const c of e.children) { if (['SCRIPT','STYLE'].includes(c.tagName)) continue; const r = c.getBoundingClientRect(); if (r.height >= 90 || c.querySelector('input[type=range]')) { rows.push({ d: depth, n: desc(c).slice(0, 60), y: Math.round(r.top + scrollY), h: Math.round(r.height), sl: c.querySelectorAll('input[type=range]').length }); walk(c, depth + 1); } } };
    walk(document.body, 0); return rows;
  });
  console.log('\n==', slug); for (const r of out) console.log('  '.repeat(r.d + 1) + `${r.n}  y=${r.y} h=${r.h}${r.sl ? ' sliders=' + r.sl : ''}`);
  await pg.close();
}
await b.close();
