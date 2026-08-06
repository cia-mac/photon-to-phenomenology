// Motion aftereffect. A rotating spiral reads as steady expansion; stopped, the
// frozen frame appears to contract. Rotation is analytic (never accumulated) so
// any frame can be seeded directly, which is what frame-exact capture requires.
// maxR 470 puts the top edge at 960-470-12 = 478, clear of the 470 ceiling.
function draw(ctx, t, C) {
  const P = C.cfg.params, T_STOP = P.stop, OMEGA = P.omega;
  const R0 = P.ramp0, R1 = P.ramp1, maxR = 470;
  const tc = Math.min(t, T_STOP);
  let rot;
  if (tc <= R0) rot = 0;
  else if (tc <= R1) { const u = tc - R0; rot = OMEGA * u * u / (2 * (R1 - R0)); }
  else rot = OMEGA * (R1 - R0) / 2 + OMEGA * (tc - R1);

  const ARMS = 2, TURNS = 5.2, k = maxR / (TURNS * 2 * Math.PI);
  ctx.lineWidth = maxR * 0.05; ctx.lineCap = 'round'; ctx.strokeStyle = C.cream;
  for (let a0 = 0; a0 < ARMS; a0++) {
    const base = rot + a0 * Math.PI;
    ctx.beginPath();
    let first = true;
    for (let th = 0; th <= TURNS * 2 * Math.PI; th += 0.08) {
      const r = k * th, ang = th + base;
      const x = C.cx + Math.cos(ang) * r, y = C.cy + Math.sin(ang) * r;
      if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(C.cx, C.cy, 7, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
  ctx.beginPath(); ctx.arc(C.cx, C.cy, 7, 0, Math.PI * 2);
  ctx.lineWidth = 2.5; ctx.strokeStyle = C.cream; ctx.stroke();
}
