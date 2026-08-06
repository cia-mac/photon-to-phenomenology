// Scintillating grid. Identical pale discs at every crossing of a grey lattice;
// phantom dark dots appear in the periphery. C.p tightens the spacing, which
// strengthens the shimmer, then the copy delivers the answer.
function draw(ctx, t, C) {
  const S = C.lerp(134, 106, 1 - C.p), bw = S * 0.16, dr = bw * 0.62;
  ctx.fillStyle = '#5f5848';
  for (let x = S; x < C.W + S; x += S) ctx.fillRect(x - bw / 2, 0, bw, C.H);
  for (let y = S; y < C.H + S; y += S) ctx.fillRect(0, y - bw / 2, C.W, bw);
  ctx.fillStyle = C.cream;
  for (let x = S; x < C.W + S; x += S)
    for (let y = S; y < C.H + S; y += S) { ctx.beginPath(); ctx.arc(x, y, dr, 0, Math.PI * 2); ctx.fill(); }
}
