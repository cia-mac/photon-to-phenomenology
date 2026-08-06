// Shepard tables. Two parallelogram table tops, congruent, one rotated.
// The upper reads long and narrow, the lower wide and squat. Nobody believes
// the overlay until it happens, which is why the reveal is the overlay:
// C.p 1 -> 0 rotates and translates the lower top onto the upper one, where it
// lands exactly, edge for edge.
function draw(ctx, t, C) {
  // one shape, in its own local frame: a skewed rectangle
  const W = 200, H = 470, SK = 96;
  const shape = [[-W / 2 - SK, -H / 2], [W / 2 - SK, -H / 2], [W / 2 + SK, H / 2], [-W / 2 + SK, H / 2]];
  const top = (x, y, rot, fill) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(shape[0][0], shape[0][1]);
    for (let i = 1; i < 4; i++) ctx.lineTo(shape[i][0], shape[i][1]);
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = C.cream; ctx.lineWidth = 4; ctx.stroke();
    ctx.restore();
  };
  const AX = C.cx, AY = 760, AR = 0;
  const BX = C.cx, BY = 1210, BR = Math.PI / 2;
  const u = 1 - C.p;                       // 0 apart, 1 overlaid
  const bx = C.lerp(BX, AX, u), by = C.lerp(BY, AY, u), br = C.lerp(BR, AR, u);
  top(AX, AY, AR, 'rgba(232,224,208,0.22)');
  top(bx, by, br, u > 0.5 ? 'rgba(255,120,120,0.30)' : 'rgba(232,224,208,0.22)');
}
