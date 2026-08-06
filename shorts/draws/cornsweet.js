// Cornsweet edge. Two halves of one field are the SAME grey everywhere except a
// soft cusp at the seam. The cusp alone repaints both whole surfaces.
// C.p drives an ink occluder over the seam: 0 -> 1 covers the cusp and the two
// halves snap into one flat grey. The figure is banded into the stimulus zone so
// the header type sits on plain field, not on the gradient.
function draw(ctx, t, C) {
  const BASE = 0.46, AMP = 0.34, cw = 240;
  const top = 500, bot = 1420, h = bot - top;
  const chan = (v, d, l) => Math.round(d + (l - d) * v);
  const grey = v => 'rgb(' + chan(v, 20, 232) + ',' + chan(v, 17, 224) + ',' + chan(v, 12, 208) + ')';
  const lumAt = x => {
    const d = x - C.cx;
    if (Math.abs(d) > cw) return BASE;
    const f = Math.pow(1 - Math.abs(d) / cw, 1.7);
    return d < 0 ? BASE + AMP * f : BASE - AMP * f;
  };
  for (let x = 0; x < C.W; x += 2) { ctx.fillStyle = grey(lumAt(x + 1)); ctx.fillRect(x, top, 3, h); }
  const occ = C.p * cw * 1.08;
  if (occ > 1) { ctx.fillStyle = C.ink; ctx.fillRect(C.cx - occ, top, occ * 2, h); }
}
