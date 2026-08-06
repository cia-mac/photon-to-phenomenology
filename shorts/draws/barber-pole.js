// Barber pole and the aperture problem. One field of diagonal stripes, moving
// in one fixed direction the whole time. Seen through a tall aperture it reads
// as moving DOWN; through a wide one, as moving SIDEWAYS. The true motion of an
// edge seen through a hole is genuinely ambiguous, and you commit to one answer
// without being asked. C.p 1 -> 0 changes only the aperture shape.
function draw(ctx, t, C) {
  const s = C.p;
  const w = C.lerp(900, 300, s), h = C.lerp(300, 900, s);
  const x0 = C.cx - w / 2, y0 = C.cy - h / 2;
  ctx.save();
  ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip();
  ctx.fillStyle = '#151412'; ctx.fillRect(x0, y0, w, h);
  // stripes at 45 degrees, translating along their normal at a constant rate
  const P = 96, shift = (t * 150) % P;
  ctx.strokeStyle = C.cream; ctx.lineWidth = P / 2;
  ctx.beginPath();
  for (let k = -20; k < 40; k++) {
    const d = k * P + shift;
    ctx.moveTo(x0 - 400 + d, y0 - 400);
    ctx.lineTo(x0 - 400 + d + 1400, y0 - 400 + 1400);
  }
  ctx.stroke();
  ctx.restore();
  ctx.strokeStyle = 'rgba(232,224,208,0.5)'; ctx.lineWidth = 3;
  ctx.strokeRect(x0, y0, w, h);
}
