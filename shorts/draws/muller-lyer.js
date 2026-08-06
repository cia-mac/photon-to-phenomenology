// Müller-Lyer. Two shafts of identical length; the upper has outward fins and
// looks longer. C.p 1 -> 0 retracts the fins and the shafts visibly match.
function draw(ctx, t, C) {
  const L = 620, finLen = 108, ANG = 35 * Math.PI / 180, fin = C.p;
  const topY = C.cy - 190, botY = C.cy + 190;
  const shaft = (y, m) => {
    const x0 = C.cx - L / 2, x1 = C.cx + L / 2, fl = finLen * fin;
    ctx.strokeStyle = C.cream; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    for (const [ex, sx] of [[x0, -1], [x1, 1]]) {
      const dx = sx * m;
      ctx.beginPath();
      ctx.moveTo(ex + fl * dx * Math.cos(ANG), y - fl * Math.sin(ANG));
      ctx.lineTo(ex, y);
      ctx.lineTo(ex + fl * dx * Math.cos(ANG), y + fl * Math.sin(ANG));
      ctx.stroke();
    }
  };
  shaft(topY, +1);   // fins out, reads longer
  shaft(botY, -1);   // fins in,  reads shorter
}
