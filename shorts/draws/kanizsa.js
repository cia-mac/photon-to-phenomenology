// Kanizsa triangle. Three notched discs whose mouths point at a common centre.
// A bright triangle with crisp edges appears; it is never drawn. C.p 1 -> 0
// rotates the wedges away and the figure dissolves into three notched discs.
function draw(ctx, t, C) {
  const Rt = 330, discR = Rt * 0.34, turn = (1 - C.p) * 1.25;
  for (let i = 0; i < 3; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / 3;
    const x = C.cx + Math.cos(a) * Rt, y = C.cy + Math.sin(a) * Rt;
    const toC = Math.atan2(C.cy - y, C.cx - x) + turn;
    const half = 38 * Math.PI / 180;
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.arc(x, y, discR, toC + half, toC - half + 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = C.cream; ctx.fill();
  }
  // The illusory triangle is deliberately NOT drawn. The viewer supplies it.
}
