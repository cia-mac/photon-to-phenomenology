// Renders three library concepts as phone-size images from the real preview assets. Mockups only.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url)), IOS = resolve(HERE, '../..');
const require = createRequire(join(IOS, '..', 'shorts', 'package.json'));
const { chromium } = require('playwright-core');
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const cat = JSON.parse(readFileSync(join(IOS, 'Photon/Pieces/catalog.json'), 'utf8'));
const img = s => pathToFileURL(join(IOS, `Photon/Assets.xcassets/preview-${s}.imageset/preview.png`)).href;
const short = t => t.startsWith('The ') ? t[4].toUpperCase() + t.slice(5) : t;
const n = i => String(i + 1).padStart(2, '0');
const base = `*{margin:0;padding:0;box-sizing:border-box}body{width:402px;font-family:"Helvetica Neue",Helvetica,sans-serif;-webkit-font-smoothing:antialiased}
.m{font-family:"SF Mono",ui-monospace,Menlo,monospace;text-transform:uppercase;letter-spacing:.16em;font-size:10px;font-weight:500}
.sb{height:62px;display:flex;align-items:flex-end;justify-content:space-between;padding:0 34px 8px;font-weight:600;font-size:16px}`;
const sb = `<div class="sb"><span>9:41</span><span style="font-size:11px;letter-spacing:.1em">●●●● ▮</span></div>`;

// A. PAPER: the library is a printed page; the pieces stay dark, like stepping into the darkroom.
const A = `<style>${base}body{background:#e8e0d0;color:#0c0b09}
h1{font-size:76px;line-height:.86;letter-spacing:-4.2px;font-weight:700;margin:14px 0 0 -4px}
.pad{padding:0 22px}.bar{height:4px;background:#0c0b09;margin:22px 0 0}
.tabs{display:flex;gap:22px;font-size:17px;font-weight:700;padding:14px 0 12px;border-bottom:1px solid #0c0b09}.tabs span{opacity:.32}.tabs b{opacity:1;box-shadow:0 13px 0 -10px #0c0b09}
.plate{background:#0c0b09;display:block;width:100%}.hero{aspect-ratio:1.5}
.cap{display:flex;gap:12px;align-items:baseline;padding:10px 0 2px}.cap b{font-size:25px;letter-spacing:-.6px}.cap .m{opacity:.55}
.ln{font-size:15px;opacity:.62;padding-bottom:22px}
.g{display:grid;grid-template-columns:1fr 1fr;gap:14px}.g b{display:block;font-size:16px;letter-spacing:-.2px;padding-top:8px}.g .ln{font-size:13px;padding-bottom:18px}.g .m{display:block;padding:0 0 5px;opacity:.55}
</style>${sb}<div class="pad"><div style="display:flex;justify-content:space-between;padding-top:20px" class="m"><span>Ciamac’s</span><span>21 experiments</span></div>
<h1>Optical<br>Illusions</h1><div class="bar"></div>
<div class="tabs"><b>All</b><span>Gallery</span><span>The Book</span><span>The Lab</span></div>
<div style="padding-top:16px"><img class="plate hero" src="${img(cat[0].slug)}"><div class="cap"><span class="m">01</span><b>${short(cat[0].title)}</b></div><div class="ln">${cat[0].line}</div></div>
<div class="g">${cat.slice(1,5).map((p,i)=>`<div><span class="m">${n(i+1)}</span><img class="plate" src="${img(p.slug)}"><b>${short(p.title)}</b><div class="ln">${p.line}</div></div>`).join('')}</div></div>`;

// B. INDEX: dark, extreme scale. One enormous figure, then a typographic table of contents.
const B = `<style>${base}body{background:#0c0b09;color:#e8e0d0}
.hero{position:relative;height:400px;overflow:hidden}.hero img{position:absolute;width:150%;left:-25%;top:-36px}
h1{position:absolute;left:20px;bottom:10px;font-size:64px;line-height:.86;letter-spacing:-3.4px;font-weight:700}
.pad{padding:0 22px}.top{display:flex;justify-content:space-between;padding:14px 0 12px;border-bottom:1px solid rgba(232,224,208,.9)}
.tabs{display:flex;gap:20px}.tabs span{opacity:.4}
.row{display:grid;grid-template-columns:38px 1fr 96px;align-items:center;border-bottom:1px solid rgba(232,224,208,.18);padding:9px 0}
.row .m{color:#4d7fe0;font-size:11px;align-self:start;padding-top:7px}.row b{font-size:25px;font-weight:500;letter-spacing:-.7px;line-height:1.05;display:block}.row i{font-style:normal;font-size:13.5px;opacity:.55;display:block;padding-top:4px}.row img{width:96px;display:block}
</style><div class="hero">${sb.replace('class="sb"','class="sb" style="position:relative;z-index:2"')}<img src="${img('kanizsa')}"><h1>Optical<br>Illusions</h1></div>
<div class="pad"><div class="top m"><div class="tabs"><b>All 21</b><span>Gallery</span><span>The Book</span><span>The Lab</span></div><span>Ciamac’s</span></div>
${cat.slice(0,6).map((p,i)=>`<div class="row"><span class="m">${n(i)}</span><div><b>${short(p.title)}</b><i>${p.line}</i></div><img src="${img(p.slug)}"></div>`).join('')}</div>`;

// C. COLOR FIELDS: Swiss poster blocks. Each plate is a flat field of color with the figure knocked out of it.
const cols = ['#4d7fe0','#e8e0d0','#e2442f','#e0b23c','#e8e0d0','#4d7fe0','#e2442f','#e0b23c'];
const C = `<style>${base}body{background:#0c0b09;color:#e8e0d0}
h1{font-size:46px;line-height:.9;letter-spacing:-2.2px;font-weight:700}.pad{padding:18px 14px 0}
.head{display:flex;justify-content:space-between;align-items:flex-end;padding:0 8px 16px}
.g{display:grid;grid-template-columns:1fr 1fr;gap:6px}.t{position:relative;aspect-ratio:.86;color:#0c0b09;overflow:hidden}.t.w{grid-column:span 2;aspect-ratio:1.5}
.t img{position:absolute;left:0;top:6%;width:100%;mix-blend-mode:multiply;filter:invert(1) grayscale(1) contrast(1.6)}
.t.w img{top:-4%;width:76%;left:12%}
.t .m{position:absolute;left:12px;top:12px;font-size:11px}.t b{position:absolute;left:12px;right:10px;bottom:11px;font-size:21px;line-height:1;letter-spacing:-.6px}
.t.w b{font-size:30px;letter-spacing:-1px}
</style>${sb}<div class="pad"><div class="head"><h1>Optical<br>Illusions</h1><div class="m" style="text-align:right;line-height:1.8">Ciamac’s<br>21 experiments</div></div>
<div class="g">${[0,1,3,4,6,7,8].map((k,j)=>{const p=cat[k];return `<div class="t ${j==0?'w':''}" style="background:${cols[j]}"><span class="m">${n(k)}</span><img src="${img(p.slug)}"><b>${short(p.title)}</b></div>`}).join('')}</div></div>`;

const b = await chromium.launch({ executablePath: EXEC });
for (const [k, html] of Object.entries({ A_paper: A, B_index: B, C_color: C })) {
  const pg = await b.newPage({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 3 });
  writeFileSync(join(HERE, `${k}.html`), `<!doctype html><meta charset="utf-8">${html}`);
  await pg.goto(pathToFileURL(join(HERE, `${k}.html`)).href); await pg.waitForTimeout(400);
  await pg.screenshot({ path: join(HERE, `${k}.png`) }); await pg.close();
}
await b.close();
