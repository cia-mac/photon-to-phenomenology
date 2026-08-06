// Ebbinghaus. Two identical centre discs, one ringed by giants and one by
// dwarves. C.p 1 -> 0 evens the surrounds out and the centres visibly match.
//
// Sized to the 1080 frame: with r0=52 and gap=248 the large ring spans roughly
// x=22..562 and the small ring x=668..908, so neither runs off the edge and the
// two groups do not touch. The first pass used the desktop page's numbers and
// the left ring bled off frame.
function draw(ctx, t, C) {
  const r0 = 52, gap = 248, s = C.p;
  const disc = (x, y, r, fill) => {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = C.cream; ctx.fill(); }
    else { ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(232,224,208,0.55)'; ctx.stroke(); }
  };
  const ring = (x, y, sr, n) => {
    const d = r0 + sr + Math.max(14, r0 * 0.5);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2 - Math.PI / 2;
      disc(x + Math.cos(a) * d, y + Math.sin(a) * d, sr, false);
    }
  };
  ring(C.cx - gap, C.cy, C.lerp(r0, r0 * 1.85, s), 7);
  ring(C.cx + gap, C.cy, C.lerp(r0, r0 * 0.40, s), 7);
  disc(C.cx - gap, C.cy, r0, true);
  disc(C.cx + gap, C.cy, r0, true);
}
