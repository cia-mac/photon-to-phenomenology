// Build the contact sheet: one page showing every short in the series.
//
// Generated from shorts.config.json, never hand-written, so it cannot drift
// from what actually exists. Adding a piece and re-running this is the whole
// maintenance story.
//
//   node engine/sheet.mjs        -> public/shorts/index.html + media/*
//
// It builds STRAIGHT INTO the deployed site (public/shorts) rather than into a
// local-only folder that then has to be copied. One location, so the served page
// can never lag behind the built one.
//
// The page carries noindex/nofollow and nothing links to it: it is a private
// review surface at a public URL, not a release.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, statSync } from 'fs';
import { execFileSync } from 'child_process';

// Real duration, probed from the encoded file. The config's `dur` is only the
// authored floor now: engine/short.mjs stretches each piece to fit its measured
// voice-over, so reading `dur` here reported 4.3 min for a 5.7 min series.
const realDur = f => parseFloat(execFileSync('ffprobe',
  ['-v','error','-show_entries','format=duration','-of','csv=p=0', f]).toString().trim());
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(resolve(ROOT, 'shorts.config.json'), 'utf8'));

// The TOC's spine. A piece's part is what the argument needs it for, which is
// the only ordering that means anything here; alphabetical would hide the shape.
const PARTS = [
  { n: 'I',    title: 'The eye is not a camera',
    blurb: 'What actually arrives, and how little of it there is.',
    slugs: ['troxler', 'contrast-sensitivity'] },
  { n: 'II',   title: 'Edges and lightness are invented',
    blurb: 'The first place the brain is caught manufacturing.',
    slugs: ['mach-bands', 'cornsweet', 'simultaneous-contrast', 'whites-illusion', 'scintillating-grid'] },
  { n: 'III',  title: 'Colour is in you',
    blurb: 'The part that changes how people talk about seeing.',
    slugs: ['afterimage'] },
  { n: 'IV',   title: 'A flat image becomes a world',
    blurb: 'The inverse problem, felt rather than argued.',
    slugs: ['muller-lyer', 'ponzo', 'ebbinghaus', 'shepard-tables'] },
  { n: 'V',    title: 'Motion where none exists',
    blurb: 'The richest territory, and the hardest to fake.',
    slugs: ['motion-aftereffect', 'barber-pole', 'peripheral-drift'] },
  { n: 'VI',   title: 'Parts become wholes',
    blurb: 'Grouping, completion, the invented object.',
    slugs: ['kanizsa', 'cafe-wall', 'rubin-vase'] },
  { n: 'VIII', title: 'The construction becomes your world',
    blurb: 'Where it stops being a trick and starts being unnerving.',
    slugs: ['necker-cube'] },
];

const bySlug = Object.fromEntries(cfg.pieces.map(p => [p.slug, p]));
const placed = new Set(PARTS.flatMap(p => p.slugs));
const orphans = cfg.pieces.filter(p => !placed.has(p.slug)).map(p => p.slug);
if (orphans.length) {
  // Loud rather than silent: a new piece with no home in the spine is a real
  // editorial question, not a layout bug to paper over.
  PARTS.push({ n: '?', title: 'Not yet placed in the spine',
    blurb: 'These exist as shorts but have no part assigned. Decide where the argument needs them.',
    slugs: orphans });
}

const SHEET = resolve(ROOT, '..', 'public', 'shorts');
const MEDIA = resolve(SHEET, 'media');
mkdirSync(MEDIA, { recursive: true });

let totalSec = 0, totalBytes = 0, n = 0;
const card = slug => {
  const p = bySlug[slug];
  if (!p) return `<div class="card missing"><div class="pad">Missing from config: ${slug}</div></div>`;
  const src = resolve(ROOT, 'out', `${slug}_short_v4.mp4`);
  if (!existsSync(src)) return `<div class="card missing"><div class="pad">Not rendered: ${slug}</div></div>`;
  copyFileSync(src, resolve(MEDIA, `${slug}.mp4`));
  // A poster per card. Without one every tile is black until it is played, and
  // a contact sheet you cannot read at a glance is not a contact sheet. The
  // frame is pulled from the ENCODED master so the card cannot show something
  // the video does not, and it is taken before the reveal so the sheet poses
  // the question rather than spoiling it.
  const posterAt = (p.sweep ? p.sweep.at : (p.countdown ? p.countdown.until : p.end)) * 0.45;
  const poster = resolve(MEDIA, `${slug}.jpg`);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(posterAt.toFixed(2)),
    '-i', src, '-frames:v', '1', '-vf', 'scale=540:-1', '-q:v', '4', poster]);
  const bytes = statSync(src).size;
  const secs = realDur(src);
  totalSec += secs; totalBytes += bytes; n++;
  const ask = (p.beats.find(b => b.line) || {}).line || '';
  const rev = [...p.beats].reverse().find(b => b.line && b.line !== ask);
  const sub = [...p.beats].reverse().find(b => b.sub);
  return `
      <figure class="card" data-slug="${slug}">
        <div class="frame">
          <video src="media/${slug}.mp4" poster="media/${slug}.jpg" playsinline
                 preload="none" loop tabindex="0" aria-label="${p.piece}"></video>
          <button class="play" aria-label="Play ${p.piece}"><span></span></button>
          <span class="dur">${secs.toFixed(0)}s</span>
        </div>
        <figcaption>
          <h3>${p.piece}</h3>
          <p class="beats"><span class="ask">${ask}</span><span class="rev">${rev ? rev.line : ''}</span></p>
          ${sub ? `<p class="sub">${sub.sub}</p>` : ''}
          ${p.note ? `<p class="note">${p.note}</p>` : ''}
        </figcaption>
      </figure>`;
};

const sections = PARTS.map(part => `
    <section class="part">
      <header class="parthead">
        <span class="num">${part.n}</span>
        <h2>${part.title}</h2>
        <p>${part.blurb}</p>
      </header>
      <div class="grid">${part.slugs.map(card).join('')}</div>
    </section>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Photon to Phenomenology · the shorts</title>
<style>
  :root{
    --ink:#0c0b09; --ink2:#131210; --cream:#e8e0d0;
    --dim:rgba(232,224,208,0.52); --faint:rgba(232,224,208,0.30);
    --rule:rgba(232,224,208,0.10);
    --sans:"Helvetica Neue",Helvetica,Arial,sans-serif;
    --mono:"SF Mono",ui-monospace,Menlo,monospace;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:var(--ink);color:var(--cream);font-family:var(--sans);font-weight:300;
       -webkit-font-smoothing:antialiased;padding:0 0 120px}
  .wrap{max-width:1280px;margin:0 auto;padding:0 32px}

  header.top{padding:88px 0 44px;border-bottom:1px solid var(--rule);margin-bottom:56px}
  .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:0.30em;text-transform:uppercase;
           color:var(--faint);margin-bottom:20px}
  h1{font-size:clamp(34px,5vw,58px);font-weight:200;letter-spacing:-0.015em;line-height:1.08}
  .thesis{margin-top:22px;max-width:62ch;font-size:19px;line-height:1.62;color:var(--dim)}
  .tally{display:flex;flex-wrap:wrap;gap:36px;margin-top:34px;font-family:var(--mono);font-size:12px;
         letter-spacing:0.10em;color:var(--faint);text-transform:uppercase}
  .tally b{display:block;font-family:var(--sans);font-size:30px;font-weight:200;letter-spacing:0;
           color:var(--cream);text-transform:none;margin-bottom:4px}

  .part{margin-bottom:76px}
  .parthead{display:grid;grid-template-columns:56px 1fr;gap:0 18px;align-items:baseline;
            padding-bottom:16px;border-bottom:1px solid var(--rule);margin-bottom:28px}
  .parthead .num{font-family:var(--mono);font-size:13px;letter-spacing:0.14em;color:var(--faint);
                 padding-top:6px}
  .parthead h2{font-size:26px;font-weight:300;letter-spacing:-0.01em}
  .parthead p{grid-column:2;font-size:16px;color:var(--dim);margin-top:5px}

  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:34px 26px}
  .card{display:flex;flex-direction:column}
  .frame{position:relative;background:var(--ink2);border:1px solid var(--rule);border-radius:6px;
         overflow:hidden;aspect-ratio:9/16}
  .frame video{width:100%;height:100%;object-fit:cover;display:block;cursor:pointer}
  .frame:hover{border-color:rgba(232,224,208,0.26)}
  .dur{position:absolute;right:9px;bottom:9px;font-family:var(--mono);font-size:11px;
       letter-spacing:0.06em;color:var(--cream);background:rgba(12,11,9,0.72);
       padding:3px 7px;border-radius:3px;pointer-events:none}
  .play{position:absolute;inset:0;display:grid;place-items:center;border:0;cursor:pointer;
        background:rgba(12,11,9,0.30);transition:opacity .18s ease}
  .play span{width:0;height:0;border-left:19px solid rgba(232,224,208,0.94);
             border-top:12px solid transparent;border-bottom:12px solid transparent;
             margin-left:5px;filter:drop-shadow(0 1px 6px rgba(0,0,0,.6))}
  .card.playing .play{opacity:0;pointer-events:none}

  figcaption{padding-top:13px}
  figcaption h3{font-size:16px;font-weight:400;letter-spacing:0.01em;text-transform:capitalize}
  .beats{margin-top:7px;font-size:14px;line-height:1.5}
  .beats .ask{color:var(--dim)}
  .beats .rev{display:block;color:var(--cream)}
  .sub{margin-top:5px;font-size:13px;color:var(--faint);line-height:1.5}
  .note{margin-top:9px;font-size:12px;line-height:1.55;color:var(--faint);
        border-left:1px solid var(--rule);padding-left:10px}
  .card.missing .frame{aspect-ratio:9/16;display:grid;place-items:center}
  .card.missing .pad{font-family:var(--mono);font-size:12px;color:var(--faint);text-align:center;padding:16px}

  .bar{position:fixed;left:0;right:0;bottom:0;background:rgba(12,11,9,0.94);
       border-top:1px solid var(--rule);backdrop-filter:blur(8px);z-index:10}
  .bar .wrap{display:flex;gap:22px;align-items:center;padding:13px 32px;
             font-family:var(--mono);font-size:12px;letter-spacing:0.08em;color:var(--faint)}
  .bar button{font:inherit;letter-spacing:inherit;color:var(--cream);background:transparent;
              border:1px solid var(--rule);border-radius:4px;padding:7px 14px;cursor:pointer}
  .bar button:hover{border-color:rgba(232,224,208,0.34)}
  .bar .spacer{margin-left:auto}

  @media (max-width:640px){
    .wrap{padding:0 18px} .bar .wrap{padding:11px 18px;gap:12px}
    header.top{padding:52px 0 30px}
    .grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:24px 14px}
    .parthead{grid-template-columns:38px 1fr;gap:0 10px}
    .note{display:none}
  }
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <p class="eyebrow">Photon to Phenomenology</p>
    <h1>The shorts</h1>
    <p class="thesis">Every piece here catches your visual system in the act of manufacturing
      something that is not on the screen. Ordered by the argument, not by date: light arrives,
      the eye invents edges, colour turns out to be in you, a flat image becomes a world, motion
      appears where none exists, parts become wholes, and the construction becomes your experience.</p>
    <div class="tally">
      <div><b>__N__</b>pieces</div>
      <div><b>__MIN__</b>minutes total</div>
      <div><b>__MB__ MB</b>all masters</div>
      <div><b>__PARTS__ of 8</b>parts of the spine</div>
      <div><b>1080&times;1920</b>every piece</div>
    </div>
  </header>
${sections}
</div>

<nav class="bar"><div class="wrap">
  <button id="all">Play all</button>
  <button id="stop">Stop</button>
  <span class="spacer">Tap any piece to play. Sound on: each piece has a voice.</span>
</div></nav>

<script>
// One player at a time: two illusions running side by side compete for the same
// eye and neither lands. Playing one stops the rest.
const cards = [...document.querySelectorAll('.card[data-slug]')];
const stopAll = except => cards.forEach(c => {
  const v = c.querySelector('video');
  if (v && v !== except) { v.pause(); v.currentTime = 0; c.classList.remove('playing'); }
});
const play = c => {
  const v = c.querySelector('video');
  stopAll(v); c.classList.add('playing'); v.play();
};
for (const c of cards) {
  const v = c.querySelector('video');
  c.querySelector('.play').addEventListener('click', () => play(c));
  v.addEventListener('click', () => {
    if (v.paused) play(c);
    else { v.pause(); c.classList.remove('playing'); }
  });
  v.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); play(c); } });
}
document.getElementById('stop').addEventListener('click', () => stopAll(null));
// Play all: run the series in spine order, one after another, no loop.
document.getElementById('all').addEventListener('click', () => {
  let i = 0;
  const next = () => {
    if (i >= cards.length) return;
    const c = cards[i++], v = c.querySelector('video');
    v.loop = false;
    v.addEventListener('ended', function done() { v.removeEventListener('ended', done); v.loop = true; next(); });
    play(c);
    c.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  next();
});
</script>
</body>
</html>
`;

writeFileSync(resolve(SHEET, 'index.html'), html
  .replace('__N__', n)
  .replace('__MIN__', (totalSec / 60).toFixed(1))
  .replace('__MB__', (totalBytes / 1048576).toFixed(1))
  .replace('__PARTS__', PARTS.filter(p => p.n !== '?').length));

console.log(`sheet/index.html  ${n} pieces, ${(totalSec / 60).toFixed(1)} min, ${(totalBytes / 1048576).toFixed(1)} MB`);
if (orphans.length) console.log(`UNPLACED in the spine: ${orphans.join(', ')}`);
