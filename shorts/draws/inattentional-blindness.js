// Inattentional blindness. The viewer is given a counting task, and while they
// are busy with it something large and plainly visible crosses the frame. Many
// people do not see it at all, and the ones who do cannot believe the ones who
// did not.
//
// The task has to be real or the effect does not happen: the discs genuinely
// need counting, at a rate that takes effort. No sweep here, because nothing
// about the frame is hidden. It is fully visible the entire time, which is
// exactly the claim.
function draw(ctx, t, C) {
  const top = 470, bot = 1450;
  ctx.save();
  ctx.beginPath(); ctx.rect(0, top, C.W, bot - top); ctx.clip();

  // the intruder: a large teal bar crossing left to right, 5.5s to 9.5s
  const u = (t - 5.5) / 4.0;
  if (u > 0 && u < 1) {
    ctx.fillStyle = '#1ba29a';
    ctx.fillRect(-260 + u * (C.W + 520), C.cy - 130, 240, 260);
  }

  // the task: pale discs crossing a marked line, staggered so they must be counted
  ctx.strokeStyle = 'rgba(232,224,208,0.28)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(C.cx, top + 40); ctx.lineTo(C.cx, bot - 40); ctx.stroke();
  const starts = [0.4, 1.5, 2.4, 3.6, 4.6, 5.9, 7.1, 8.4, 9.6, 10.8];
  ctx.fillStyle = C.cream;
  for (let i = 0; i < starts.length; i++) {
    const k = (t - starts[i]) / 2.6;
    if (k < 0 || k > 1) continue;
    const y = top + 110 + ((i * 97) % (bot - top - 220));
    ctx.beginPath(); ctx.arc(-60 + k * (C.W + 120), y, 34, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
