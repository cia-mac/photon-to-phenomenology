// DOM audit of the 21 pages after the piece-chrome redesign: heading, names, labelled canvases, header grouping.
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url)), IOS = resolve(HERE, '..');
const require = createRequire(join(IOS, '..', 'shorts', 'package.json'));
const { chromium } = require('playwright-core');
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const dir = join(IOS, 'Photon/Pieces'); const b = await chromium.launch({ executablePath: EXEC });
let bad = 0;
for (const f of readdirSync(dir).filter(x => x.endsWith('.html')).sort()) {
  const pg = await b.newPage({ viewport: { width: 402, height: 874 } });
  const errs = []; pg.on('pageerror', e => errs.push(String(e)));
  await pg.goto(pathToFileURL(join(dir, f)).href); await pg.waitForTimeout(700);
  const r = await pg.evaluate(() => {
    const q = s => [...document.querySelectorAll(s)];
    const name = e => (e.getAttribute('aria-label') || e.textContent || e.title || '').trim();
    const head = document.querySelector('.photon-head');
    const order = head ? [...head.children].map(e => e.id).join('>') : null;
    const t = document.getElementById('title'), h1 = document.querySelector('h1');
    return {
      slug: document.documentElement.dataset.piece || null,
      unnamed: q('button,a,[role=button],input,select').filter(e => !name(e) && !e.labels?.length).length,
      unlabeledCanvas: q('canvas').filter(c => c.getAttribute('aria-hidden') !== 'true' && !c.getAttribute('aria-label')).length,
      headingOK: !!((t && t.getAttribute('role') === 'heading') || h1),
      order,
    };
  });
  const tmpl = !f.match(/contrast|gestalt|opponent|receptive|trichromatic/);
  const ok = r.slug && !r.unnamed && !r.unlabeledCanvas && r.headingOK && !errs.length && (!tmpl || r.order === 'chapter>title>readout');
  if (!ok) bad++;
  console.log((ok ? 'ok  ' : 'BAD ') + f.padEnd(30), JSON.stringify(r), errs.join(' | '));
  await pg.close();
}
await b.close(); console.log('bad:', bad);
