// Render every enabled piece: build -> frames -> H.264. Sandbox must be OFF.
import { execFileSync } from 'child_process';
import { readFileSync, rmSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(resolve(ROOT, 'shorts.config.json'), 'utf8'));
const only = process.argv.slice(2);
const run = (c, a) => execFileSync(c, a, { cwd: ROOT, stdio: 'inherit' });
if (!existsSync(resolve(ROOT, 'out'))) mkdirSync(resolve(ROOT, 'out'));
for (const p of cfg.pieces) {
  if (p.enabled === false) continue;
  if (only.length && !only.includes(p.slug)) continue;
  const fr = resolve(ROOT, 'frames', p.slug);
  rmSync(fr, { recursive: true, force: true });
  run('node', ['capture.mjs', `build/${p.slug}.html`, `frames/${p.slug}`]);
  run('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '30',
    '-i', `frames/${p.slug}/f_%05d.png`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    `out/${p.slug}_short_v3.mp4`]);
  console.log(`>>> out/${p.slug}_short_v3.mp4\n`);
}
