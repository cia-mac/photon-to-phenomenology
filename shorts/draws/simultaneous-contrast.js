// Simultaneous contrast. Two identical grey patches, one on a dark surround and
// one on a light surround. The left reads lighter. C.p 1 -> 0 converges the two
// surrounds to a common mid grey and the patches are plainly the same.
function draw(ctx, t, C) {
  // half=250 with 240px panel half-width keeps both panels inside 1080 with a
  // gap between them. The first pass used 300/270 and clipped both outer edges.
  const half = 250, s = C.p;
  const mix = (a, b, u) => {
    const p = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const A = p(a), B = p(b);
    return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',') + ')';
  };
  const NEUTRAL = '#9a9488', PATCH = '#7d786c';
  const panels = [
    [C.cx - half, mix(NEUTRAL, '#171614', s)],   // dark surround
    [C.cx + half, mix(NEUTRAL, '#ded7c7', s)],   // light surround
  ];
  for (const [x, bg] of panels) {
    ctx.fillStyle = bg; ctx.fillRect(x - 240, C.cy - 240, 480, 480);
    ctx.fillStyle = PATCH; ctx.fillRect(x - 98, C.cy - 98, 196, 196);
  }
}
