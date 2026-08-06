// The negative afterimage. Saturated teal disc on a neutral field; the viewer
// fixates, the disc is removed, and a rose disc appears that is not on screen.
// C.p goes 1 -> 0 at the reveal: 1 draws the adapting disc, 0 draws bare field.
function draw(ctx, t, C) {
  const R = 330, ADAPT = C.cfg.sweep.at;
  if (C.p > 0.5) {
    ctx.beginPath(); ctx.arc(C.cx, C.cy, R, 0, Math.PI * 2);
    ctx.fillStyle = '#1ba29a';
    ctx.globalAlpha = C.fadeIn(t, 0, 0.5); ctx.fill(); ctx.globalAlpha = 1;
    // progress ring at R+22 = 352; top edge 608, clear of the 470 ceiling
    const p = Math.min(t / ADAPT, 1);
    ctx.beginPath(); ctx.arc(C.cx, C.cy, R + 22, -Math.PI / 2, -Math.PI / 2 + p * 2 * Math.PI);
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(12,11,9,0.35)'; ctx.stroke();
  }
  // fixation dot on both phases: it is the anchor the afterimage hangs on
  ctx.beginPath(); ctx.arc(C.cx, C.cy, 7, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
}
