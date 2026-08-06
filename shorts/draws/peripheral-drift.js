// Peripheral drift. Rings of repeating asymmetric luminance steps
// (dark, black, light, white) with the phase rotating ring to ring. In the
// periphery the ordered luminance ramps are read as motion and the field
// crawls. Every pixel is static.
//
// Original staging, deliberately: the famous drifting arrangements are
// Kitaoka's artwork. The phenomenon is public scientific record; his particular
// images are not, and are never reproduced here.
function draw(ctx, t, C) {
  const RINGS = 5, PER = 16;
  const steps = ['#3a382f', '#0c0b09', '#a49c88', '#e8e0d0'];
  for (let r = 0; r < RINGS; r++) {
    const rad = 130 + r * 92;
    const phase = r * 0.42;
    const tile = 2 * Math.PI / PER;
    for (let i = 0; i < PER; i++) {
      const a0 = i * tile + phase;
      for (let s = 0; s < 4; s++) {
        ctx.beginPath();
        ctx.arc(C.cx, C.cy, rad + 42, a0 + s * tile / 4, a0 + (s + 1) * tile / 4);
        ctx.arc(C.cx, C.cy, rad - 42, a0 + (s + 1) * tile / 4, a0 + s * tile / 4, true);
        ctx.closePath();
        ctx.fillStyle = steps[s]; ctx.fill();
      }
    }
  }
}
