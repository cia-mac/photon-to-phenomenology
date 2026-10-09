// Render actual bundled experiments for the native catalog. No source-page edits.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
const here = dirname(fileURLToPath(import.meta.url));
const ios = resolve(here, '..');
const require = createRequire(join(ios, '..', 'shorts', 'package.json'));
const { chromium } = require('playwright-core');
const browser = await chromium.launch({ executablePath: '/Users/ciamac/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell', headless: true });
const catalog = JSON.parse(readFileSync(join(ios, 'Photon/Pieces/catalog.json')));
const provenance = [];
try {
  for (const piece of catalog) {
    const context = await browser.newContext({ viewport: { width: 600, height: 800 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await context.route(/^https?:/, route => route.abort());
    const page = await context.newPage();
    const errors = []; page.on('pageerror', e => errors.push(String(e)));
    const source = join(ios, 'Photon/Pieces', piece.slug + '.html');
    await page.goto(pathToFileURL(source).href);
    // Wait for the existing guided introduction, then choose an informative real state.
    await page.waitForTimeout(1250);
    const steps = piece.slug === 'kanizsa' || piece.slug === 'change-blindness' ? 2 : 0;
    for (let i = 0; i < steps; i++) await page.locator('#wnext').click();
    if (piece.slug === 'opponent-afterimage') await page.locator('#start').click();
    if (await page.locator('#walk.on').count()) await page.locator('#wskip').click();
    await page.waitForTimeout(450);
    let png;
    if (piece.slug === 'gestalt-grouping') png = await page.locator('svg.field').screenshot();
    else if (piece.slug === 'opponent-afterimage') png = await page.locator('#stage').screenshot();
    else {
      const data = await page.locator('canvas').first().evaluate(c => c.toDataURL('image/png'));
      png = Buffer.from(data.split(',')[1], 'base64');
    }
    // Uniform presentation: preserve the complete rendered figure, trim empty margins,
    // then fit (never stretch) into a 3:2 plate. The thumbnail is not a test stimulus.
    const normalized = await page.evaluate(async data => {
      const image = new Image(); image.src = data; await image.decode();
      const source = document.createElement('canvas'); source.width = image.width; source.height = image.height;
      const g = source.getContext('2d'); g.fillStyle = '#0c0b09'; g.fillRect(0, 0, source.width, source.height); g.drawImage(image, 0, 0);
      const pixels = g.getImageData(0, 0, source.width, source.height).data;
      const bg = [pixels[0], pixels[1], pixels[2]];
      let x0 = source.width, y0 = source.height, x1 = 0, y1 = 0;
      for (let y = 0; y < source.height; y++) for (let x = 0; x < source.width; x++) {
        const i = (y * source.width + x) * 4;
        if (Math.max(...bg.map((v, k) => Math.abs(pixels[i + k] - v))) > 12) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
      }
      if (x1 <= x0 || y1 <= y0) throw new Error('Blank preview');
      const pad = 12; x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(source.width, x1 + pad); y1 = Math.min(source.height, y1 + pad);
      const out = document.createElement('canvas'); out.width = 600; out.height = 400;
      const o = out.getContext('2d'); o.fillStyle = `rgb(${bg.join(',')})`; o.fillRect(0, 0, 600, 400);
      const sw = x1 - x0, sh = y1 - y0, scale = Math.min(540 / sw, 340 / sh);
      o.drawImage(source, x0, y0, sw, sh, (600 - sw * scale) / 2, (400 - sh * scale) / 2, sw * scale, sh * scale);
      return out.toDataURL('image/png');
    }, 'data:image/png;base64,' + png.toString('base64'));
    const asset = join(ios, 'Photon/Assets.xcassets', 'preview-' + piece.slug + '.imageset'); mkdirSync(asset, { recursive: true });
    writeFileSync(join(asset, 'preview.png'), Buffer.from(normalized.split(',')[1], 'base64'));
    writeFileSync(join(asset, 'Contents.json'), JSON.stringify({images:[{filename:'preview.png', idiom:'universal'}],info:{author:'xcode',version:1}}, null, 2) + '\n');
    provenance.push({ slug:piece.slug, sourceSHA256:createHash('sha256').update(readFileSync(source)).digest('hex'), guideStep:steps, errors });
    console.log(piece.slug, errors.length ? errors : 'OK');
    await context.close();
  }
} finally { await browser.close(); }
writeFileSync(join(here, 'preview-provenance.json'), JSON.stringify(provenance, null, 2) + '\n');
if (provenance.some(p => p.errors.length)) process.exitCode = 1;
