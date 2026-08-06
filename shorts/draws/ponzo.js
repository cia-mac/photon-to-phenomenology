// Ponzo. Two identical bars on converging rails; the upper bar sits where the
// rails pinch and reads as longer. C.p 1 -> 0 straightens the rails, draining
// the depth cue, and the bars are plainly equal.
function draw(ctx, t, C) {
  const barLen = 420, conv = C.p;
  const topY = C.cy - 300, botY = C.cy + 300;
  const yTop = 500, yBot = 1420;
  const spreadBot = 620, spreadTop = spreadBot * (1 - 0.82 * conv);
  ctx.strokeStyle = 'rgba(232,224,208,0.45)'; ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(C.cx - spreadTop / 2, yTop); ctx.lineTo(C.cx - spreadBot / 2, yBot);
  ctx.moveTo(C.cx + spreadTop / 2, yTop); ctx.lineTo(C.cx + spreadBot / 2, yBot);
  ctx.stroke();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(C.cx - barLen / 2, topY); ctx.lineTo(C.cx + barLen / 2, topY);
  ctx.moveTo(C.cx - barLen / 2, botY); ctx.lineTo(C.cx + barLen / 2, botY);
  ctx.stroke();
}
