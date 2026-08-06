// Mach bands. A luminance staircase: every step is flat, yet a bright scallop
// appears on the light side of each edge and a dark one on the dark side.
// C.p 1 -> 0 opens ink gaps between the steps. Isolated, each step is visibly
// uniform and the scallops vanish, which is the proof.
function draw(ctx, t, C) {
  const top = 520, bot = 1400, N = 7, gap = (1 - C.p) * 26;
  const w = C.W / N;
  for (let i = 0; i < N; i++) {
    const v = 0.14 + (i / (N - 1)) * 0.78;
    const r = Math.round(20 + (232 - 20) * v), g = Math.round(17 + (224 - 17) * v), b = Math.round(12 + (208 - 12) * v);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(i * w + gap / 2, top, w - gap, bot - top);
  }
}
