// Troxler fading. Soft low-contrast blobs around a fixation cross. Hold the
// cross and the periphery quietly dissolves: steady retinal input with no sharp
// edge stops being reported. Nothing on the frame changes, which is the point,
// so this piece has no sweep. The countdown carries the hold.
function draw(ctx, t, C) {
  const N = 8, R = 330;
  const hues = ['#6f7f8d', '#8d7f6f', '#7d8d6f', '#8d6f7f', '#6f8d85', '#856f8d', '#8d856f', '#6f758d'];
  for (let i = 0; i < N; i++) {
    const a = i / N * Math.PI * 2 - Math.PI / 2;
    const x = C.cx + Math.cos(a) * R, y = C.cy + Math.sin(a) * R;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 150);
    g.addColorStop(0, hues[i]);
    g.addColorStop(1, 'rgba(61,59,54,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, 150, 0, Math.PI * 2); ctx.fill();
  }
  // fixation cross
  ctx.strokeStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(C.cx - 18, C.cy); ctx.lineTo(C.cx + 18, C.cy);
  ctx.moveTo(C.cx, C.cy - 18); ctx.lineTo(C.cx, C.cy + 18);
  ctx.stroke();
}
