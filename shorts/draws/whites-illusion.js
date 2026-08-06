// White's illusion. Two identical grey bars, one sitting in place of a segment
// of a dark stripe and one in place of a light stripe. The grey on the dark
// stripe looks LIGHTER, which is the opposite of what simultaneous contrast
// predicts, and is why the piece is a better puzzle than it looks.
// C.p 1 -> 0 fades the grating to uniform and the two greys match.
function draw(ctx, t, C) {
  const top = 470, bot = 1450, P = 120, GREY = '#8a8478';
  const s = C.p;
  const mid = 'rgba(138,132,120,1)';
  ctx.save();
  ctx.beginPath(); ctx.rect(0, top, C.W, bot - top); ctx.clip();
  // vertical grating, contrast fading with the sweep
  for (let x = 0; x < C.W; x += P) {
    ctx.fillStyle = 'rgb(' + [20, 18, 14].map(v => Math.round(v + (138 - v) * (1 - s))).join(',') + ')';
    ctx.fillRect(x, top, P / 2, bot - top);
    ctx.fillStyle = 'rgb(' + [232, 224, 208].map(v => Math.round(v + (138 - v) * (1 - s))).join(',') + ')';
    ctx.fillRect(x + P / 2, top, P / 2, bot - top);
  }
  // two identical grey bars, each replacing part of one stripe
  ctx.fillStyle = GREY;
  ctx.fillRect(3 * P, 640, P / 2, 300);            // on a dark stripe
  ctx.fillRect(5 * P + P / 2, 1000, P / 2, 300);   // on a light stripe
  ctx.restore();
}
