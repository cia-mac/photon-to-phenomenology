// Photon app piece verifier. Usage: node ios/tools/verify_piece.mjs <slug> [--json]
// Measures CONSTITUTION_APP_v10 Articles B, C, D from file://. Exit 0 = pass.
import { createRequire } from 'node:module';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const IOS = resolve(HERE, '..');
const require = createRequire(join(IOS, '..', 'shorts', 'package.json'));
const { chromium } = require('playwright-core');
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const slug = process.argv[2];
if (!slug) { console.error('usage: verify_piece.mjs <slug>'); process.exit(2); }
const file = join(IOS, 'Photon', 'Pieces', `${slug}.html`);
const findings = [];
const add = (severity, detail, fix) => findings.push({ severity, detail, fix });
// Article D1 (v3): pieces whose percept has no discrete moment carry no haptic.
const NO_REVEAL = ['contrast-sensitivity'];
const FIXATION = ['afterimage', 'motion-aftereffect', 'troxler-fading', 'motion-induced-blindness', 'opponent-afterimage'];

if (!existsSync(file)) { add('blocker', `missing ${file}`, 'write the piece'); done(); }
const src = readFileSync(file, 'utf8');

// ---- static (Articles B, C1, D) ----
const code = src.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"])\/\/[^\n]*/g, '$1');
if (/(?:src|href)\s*=\s*["'](?:https?:)?\/\//i.test(code) || /url\(\s*["']?(?:https?:)?\/\//i.test(code) || /\bfetch\s*\(|\bXMLHttpRequest\b|\bimport\s*\(/.test(code))
  add('blocker', 'network reference in the page (URL in src/href/url(), fetch, XHR or dynamic import)', 'remove it; the bundle is the whole world (B1)');
if (/a\.ciamac\.com/.test(src)) add('blocker', 'analytics tag still present', 'delete the a.ciamac.com script tag (B1)');
if (/["'(]\/photon\//.test(code)) add('blocker', 'site-absolute /photon/ path', 'use sibling chrome_app.css / chrome_app.js (B2)');
if (!/href=["']chrome_app\.css["']/.test(src)) add('blocker', 'chrome_app.css not linked', 'add <link rel="stylesheet" href="chrome_app.css"> (B2)');
if (!/src=["']chrome_app\.js["']/.test(src)) add('blocker', 'chrome_app.js not loaded', 'add <script src="chrome_app.js"></script> before the piece script (B2)');
if (!/viewport-fit=cover/.test(src)) add('major', 'viewport meta lacks viewport-fit=cover', 'add it (C1)');
if (/—|&mdash;|&#8212;|&#x2014;/i.test(code)) add('major', 'em dash in reader-visible text or strings', 'use a comma, colon, period or middot (parent constitution III)');
if (NO_REVEAL.includes(slug) ? /PhotonApp\.haptic\(/.test(code) && (add('major', 'haptic call in a piece with no discrete reveal', 'remove it (D1, v3)'), false) : !/PhotonApp\.haptic\(/.test(code)) add('major', 'no PhotonApp.haptic call', "fire PhotonApp.haptic('reveal') once at the percept threshold (D1)");
if (FIXATION.includes(slug) && !((/PhotonApp\.hold\(\s*true\s*\)/.test(code) && /PhotonApp\.hold\(\s*false\s*\)/.test(code)) || /PhotonApp\.hold\(\s*[A-Za-z_$][\w$.]*\s*\)/.test(code.replace(/PhotonApp\.hold\(\s*(true|false)\s*\)/g, ''))))
  add('major', 'fixation piece without paired PhotonApp.hold(true)/hold(false)', 'hold during fixation, release after (D2)');

// ---- runtime at both sizes (Articles B, C, D) ----
const ALL_SIZES = [{ key: 'phone', width: 402, height: 874 }, { key: 'pad', width: 1032, height: 1376 }, { key: 'padL', width: 1376, height: 1032 },   // iPhone 16 Pro, iPad portrait and landscape
  { key: 'phone15', width: 393, height: 852 }, { key: 'phoneSE', width: 375, height: 667 }, { key: 'phoneMax', width: 440, height: 956 }];   // iPhone 15 (Cia's), SE class, Pro Max
const ONLY = (process.env.ONLY_SIZES || '').split(',').filter(Boolean);
const SIZES = ONLY.length ? ALL_SIZES.filter(z => ONLY.includes(z.key)) : ALL_SIZES.slice(0, 3);
const shots = join(IOS, 'build', 'verify'); mkdirSync(shots, { recursive: true });
const browser = await chromium.launch({ executablePath: EXEC, headless: true });
let haptics = 0;
for (const size of SIZES) {
  const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  await ctx.route(/^https?:/, r => r.abort());            // measure the attempt, never send it
  const page = await ctx.newPage();
  const errors = [], net = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  page.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) net.push(r.url()); });
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(1800);                      // guide is open by now
  const measure = (state) => page.evaluate((state) => {
    const out = [];
    const vis = el => { const s = getComputedStyle(el), r = el.getBoundingClientRect();
      if (s.display === 'none' || s.visibility === 'hidden' || r.width < 1 || r.height < 1) return false;
      for (let e = el; e && e.nodeType === 1; e = e.parentElement) if (parseFloat(getComputedStyle(e).opacity) < 0.05) return false;
      return true; };
    const hasText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    const name = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '');
    if (document.documentElement.scrollWidth > innerWidth + 1) out.push(['major', `${state}: horizontal scroll (${document.documentElement.scrollWidth}px > ${innerWidth}px)`, 'make the layout fit the viewport (C3)']);
    const texts = [...document.body.querySelectorAll('*')].filter(el => !['SCRIPT', 'STYLE', 'CANVAS'].includes(el.tagName) && vis(el) && hasText(el));
    const controls = [...document.body.querySelectorAll('button,a[href],input,select,[role=button],[role=slider]')].filter(vis);
    for (const el of [...texts, ...controls]) {
      const r = el.getBoundingClientRect();
      if (r.top < 56) out.push(['major', `${state}: ${name(el)} sits at y=${Math.round(r.top)}, under the native button row`, 'position it at or below var(--shell-top) (C2)']);
      let scrolls = document.documentElement.scrollHeight > innerHeight + 1;   // a page that scrolls may run below the fold
      for (let e = el.parentElement; e && !scrolls; e = e.parentElement) { const oy = getComputedStyle(e).overflowY; if ((oy === 'auto' || oy === 'scroll') && e.scrollHeight > e.clientHeight + 1) scrolls = true; }
      if (r.right > innerWidth + 1 || r.left < -1 || (!scrolls && r.bottom > innerHeight + 1)) out.push(['major', `${state}: ${name(el)} is clipped by the viewport edge`, 'keep it inside the viewport (C3)']);
    }
    for (const el of controls) {
      const r = el.getBoundingClientRect();
      if (r.width < 43.5 || r.height < 43.5) out.push(['major', `${state}: control ${name(el)} is ${Math.round(r.width)}x${Math.round(r.height)}, under 44x44`, 'give it min-width/min-height 44px or padding (C4)']);
    }
    const blocks = texts.filter(el => !texts.some(o => o !== el && el.contains(o)));
    for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) {
      const a = blocks[i], b = blocks[j];
      if (a.contains(b) || b.contains(a)) continue;
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      const ox = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left), oy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      if (ox > 4 && oy > 4) out.push(['major', `${state}: text ${name(a)} overlaps ${name(b)} by ${Math.round(ox)}x${Math.round(oy)}px`, 'separate them at this size (C3)']);
    }
    return out;
  }, state);
  const tag = s => `${size.key} ${size.width}x${size.height}, ${s}`;
  // Article C5: a full-bleed figure must leave the text bands clear. Hide every text block,
  // photograph the page, and ask whether the pixels under each text box are flat ground.
  // Article C8: the open guide card may not cover the figure. At every step of the guide, hide the
  // card, photograph the page, and test the pixels under the card's box.
  const walkCheck = async (state) => {
    const fixed = await page.evaluate(() => [...document.querySelectorAll('canvas')].some(c => { const r = c.getBoundingClientRect(); return getComputedStyle(c).position === 'fixed' && r.width * r.height > 0.25 * innerWidth * innerHeight; }));
    if (!fixed) return;
    const steps = await page.evaluate(() => document.querySelectorAll('#wdots .dot').length);
    let worst = { frac: 0, step: 0 };
    for (let i = 0; i < steps; i++) {
      await page.waitForTimeout(650);
      if (!(await page.$('#walk.on'))) break;
      const rect = await page.evaluate(() => { const w = document.getElementById('walk'), r = w.getBoundingClientRect(); const st = document.createElement('style'); st.id = '__hidewalk'; st.textContent = '#walk,#walk *{visibility:hidden !important;transition:none !important}'; document.head.appendChild(st); void w.offsetHeight; return { left: r.left, top: r.top - 10, width: r.width, height: r.height + 10 }; });   // 10 points of clear air above the card
      const b64 = (await page.screenshot()).toString('base64');
      await page.evaluate(() => { const st = document.getElementById('__hidewalk'); if (st) st.remove(); });
      const frac = await page.evaluate(async ({ b64, r, dpr }) => {
        const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0);
        const sx = Math.max(0, Math.floor(r.left * dpr)), sy = Math.max(0, Math.floor(r.top * dpr));
        const w = Math.min(c.width - sx, Math.ceil(r.width * dpr)), h = Math.min(c.height - sy, Math.ceil(r.height * dpr));
        const d = x.getImageData(sx, sy, w, h).data, n = w * h, hist = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
        for (let k = 0; k < n; k++) { hist[0][d[k * 4]]++; hist[1][d[k * 4 + 1]]++; hist[2][d[k * 4 + 2]]++; }
        const med = hist.map(h2 => { let a = 0; for (let v = 0; v < 256; v++) { a += h2[v]; if (a >= n / 2) return v; } return 0; });
        let off = 0; for (let k = 0; k < n; k++) if (Math.max(Math.abs(d[k * 4] - med[0]), Math.abs(d[k * 4 + 1] - med[1]), Math.abs(d[k * 4 + 2] - med[2])) > 24) off++;
        return off;
      }, { b64, r: rect, dpr: 2 });
      if (frac > worst.frac) worst = { frac, step: i + 1 };
      if (i < steps - 1) await page.tap('#wnext');
    }
    if (worst.frac >= 40) add('major', `${state}: the guide card covers the figure at step ${worst.step} (${worst.frac} figure pixels under it)`, 'keep the figure out from under the guide card: size it with PhotonApp.fit, which reserves the card (C8)');
  };
  const figCheck = async (state) => {
    const fixed = await page.evaluate(() => [...document.querySelectorAll('canvas')].some(c => { const r = c.getBoundingClientRect(); return getComputedStyle(c).position === 'fixed' && r.width * r.height > 0.25 * innerWidth * innerHeight; }));
    if (!fixed) return;
    const rects = await page.evaluate(() => {
      const hasText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
      const nm = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '');
      const els = [...document.body.querySelectorAll('*')].filter(el => !['SCRIPT', 'STYLE', 'CANVAS'].includes(el.tagName) && !el.closest('#walk') && el.id !== 'replay' && hasText(el))
        .filter(el => { const st = getComputedStyle(el), r = el.getBoundingClientRect(); return st.display !== 'none' && st.visibility !== 'hidden' && r.width >= 1 && r.height >= 1; });
      window.__hid = [...els, ...document.querySelectorAll('#walk,#replay')].map(el => [el, el.style.visibility]);
      window.__hid.forEach(([el]) => { el.style.visibility = 'hidden'; });
      return els.map(el => { const r = el.getBoundingClientRect(); return { name: nm(el), left: r.left, top: r.top, width: r.width, height: r.height }; });
    });
    const b64 = (await page.screenshot()).toString('base64');
    await page.evaluate(() => { window.__hid.forEach(([el, v]) => { el.style.visibility = v; }); });
    const stats = await page.evaluate(async ({ b64, rects, dpr }) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0);
      return rects.map(r => {
        const sx = Math.max(0, Math.floor(r.left * dpr)), sy = Math.max(0, Math.floor(r.top * dpr));
        const w = Math.min(c.width - sx, Math.ceil(r.width * dpr)), h = Math.min(c.height - sy, Math.ceil(r.height * dpr));
        if (w < 2 || h < 2) return null;
        const d = x.getImageData(sx, sy, w, h).data, n = w * h, hist = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
        for (let i = 0; i < n; i++) { hist[0][d[i * 4]]++; hist[1][d[i * 4 + 1]]++; hist[2][d[i * 4 + 2]]++; }
        const med = hist.map(h2 => { let a = 0; for (let v = 0; v < 256; v++) { a += h2[v]; if (a >= n / 2) return v; } return 0; });
        let off = 0; for (let i = 0; i < n; i++) if (Math.max(Math.abs(d[i * 4] - med[0]), Math.abs(d[i * 4 + 1] - med[1]), Math.abs(d[i * 4 + 2] - med[2])) > 24) off++;
        return { name: r.name, frac: off / n };
      });
    }, { b64, rects, dpr: 2 });
    const bad = stats.filter(s => s && s.frac > 0.01).sort((a, b) => b.frac - a.frac).slice(0, 3);
    for (const b of bad) add('major', `${state}: figure runs under text ${b.name} (${(b.frac * 100).toFixed(1)}% of its box is not flat ground)`, 'draw the figure inside the box PhotonApp.box() returns, clear of the top and bottom text (C5)');
  };
  for (const [sev, d, f] of await measure(tag('guide open'))) add(sev, d, f);
  await page.screenshot({ path: join(shots, `${slug}_${size.key}_guide.png`) });
  await walkCheck(tag('guide open'));
  await page.reload(); await page.waitForTimeout(1800);
  // Narration: with the voice on, each guide step must produce one clean spoken line, and a page with no
  // guide must offer its introduction. Native speech is simulated by answering each line with _done.
  if (size.key === 'phone') {
    await page.reload(); await page.waitForTimeout(400);
    const nar = await page.evaluate(async () => {
      const wait = ms => new Promise(r => setTimeout(r, ms));
      window.__photonLog = []; PhotonApp._voice(true);
      await wait(1700);
      const dots = document.querySelectorAll('#wdots .dot').length, seen = [];
      const say = () => (window.__photonLog || []).filter(m => m.t === 'say');
      for (let k = 0; k < Math.max(dots, 1) + 1; k++) {
        const last = say().slice(-1)[0];
        if (last && !seen.find(x => x.id === last.id)) seen.push(last);
        if (!last || dots === 0) break;
        PhotonApp._done(last.id); await wait(1100);
      }
      return { dots, seen: seen.map(x => ({ id: x.id, len: (x.text || '').length, markup: /[<>]/.test(x.text || '') })) };
    });
    if (nar.dots > 0) {
      if (nar.seen.length !== nar.dots) add('major', `narration: ${nar.seen.length} of ${nar.dots} guide steps were spoken`, 'every guide step must call PhotonApp.say (chrome_app.js speakStep) and the guide must advance on _done');
    } else if (!nar.seen.length || nar.seen[0].len < 60) add('major', 'narration: a page with no guide has no introduction to read (p.instruction)', 'give the page a p.instruction paragraph');
    for (const x of nar.seen) { if (x.markup) add('major', `narration: line ${x.id} still contains markup`, 'speak plain text'); if (x.len < 20) add('major', `narration: line ${x.id} is nearly empty`, 'speak the whole step'); }
    await page.reload(); await page.waitForTimeout(1800);
  }
  if (await page.$('#walk.on')) await page.tap('#wskip');   // lab pieces have no guide: nothing to close
  await page.waitForTimeout(2400);
  for (const [sev, d, f] of await measure(tag('guide closed'))) add(sev, d, f);
  await figCheck(tag('guide closed'));
  // iOS applies the top safe-area inset after the page script has run. Simulate it arriving late.
  if (size.height >= 800) {   // a phone with no notch (SE class) has no large inset to arrive late
    await page.addStyleTag({ content: ':root{--shell-top:121px !important;--shell-bottom:52px !important}' });
    await page.waitForTimeout(500);
    await figCheck(tag('inset applied late'));
  }
  // exercise by touch: drag across the figure, sweep every slider, tap every piece button
  const y0 = await page.evaluate(() => scrollY);
  const scrollsByDesign = await page.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1);
  const cx = size.width / 2, cy = size.height / 2;
  const cdp = await ctx.newCDPSession(page);
  const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    await touch('touchStart', cx, cy);
    for (let k = 1; k <= 14; k++) { await touch('touchMove', cx + dx * k * 12, cy + dy * k * 12); await page.waitForTimeout(16); }
    await touch('touchEnd', 0, 0); await page.waitForTimeout(250);
  }
  await page.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    for (const el of document.querySelectorAll('input[type=range]')) {
      const lo = parseFloat(el.min || 0), hi = parseFloat(el.max || 100);
      for (let k = 0; k <= 20; k++) { el.value = lo + (hi - lo) * k / 20; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); await wait(30); }
    }
    for (const el of document.querySelectorAll('button')) { if (el.closest('#walk') || el.id === 'replay') continue; el.click(); await wait(200); }
  });
  await page.waitForTimeout(1200);
  await figCheck(tag('after touch'));
  if ((!scrollsByDesign && await page.evaluate(() => scrollY) !== y0) || await page.evaluate(() => window.visualViewport ? visualViewport.scale : 1) !== 1)
    add('major', `${tag('after touch')}: a drag on the figure scrolled or zoomed the page`, 'set touch-action:none on the figure and preventDefault in non-passive touch handlers (C4)');
  const log = await page.evaluate(() => window.__photonLog || []);
  haptics += log.filter(m => m.t === 'haptic').length;
  if (log.filter(m => m.t === 'haptic').length > 40) add('major', `${size.key}: ${log.filter(m => m.t === 'haptic').length} haptics during a short exercise`, 'fire only on the threshold crossing, not continuously (D1)');
  if (!await page.evaluate(() => !!(window.PhotonApp && window.PhotonApp.haptic && window.PhotonApp.hold))) add('blocker', `${size.key}: window.PhotonApp missing at runtime`, 'load chrome_app.js (B2)');
  await page.screenshot({ path: join(shots, `${slug}_${size.key}.png`) });
  for (const e of [...new Set(errors)]) add('blocker', `${size.key}: console error: ${e.slice(0, 200)}`, 'fix the error (parent constitution VI)');
  for (const u of [...new Set(net)]) add('blocker', `${size.key}: network request to ${u.slice(0, 120)}`, 'remove it (B1)');
  await ctx.close();
}
await browser.close();
done();

function done() {
  const seen = new Set();
  const uniq = findings.filter(f => !seen.has(f.detail) && seen.add(f.detail));
  const pass = !uniq.some(f => f.severity !== 'minor');
  console.log(JSON.stringify({ slug, pass, haptics_during_exercise: typeof haptics === 'number' ? haptics : 0, screenshots: `ios/build/verify/${slug}_{phone,pad}[_guide].png`, findings: uniq }, null, 1));
  process.exit(pass ? 0 : 1);
}
