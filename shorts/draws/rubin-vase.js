// Rubin vase. One contour, two objects. Nothing in the image says which side is
// the thing and which is the gap, and you cannot hold both readings at once.
// C.p 1 -> 0 swaps which side carries the figure colour, and the same contour
// stops being a vase and becomes two profiles facing each other.
//
// The profile has to be an actual face or the second reading never arrives: a
// generic lumpy curve reads only as a vase. dx is measured outward from the
// centre line, so the nose is the MINIMUM dx (it protrudes inward, toward the
// other face) and the neck is the maximum. Between the two faces that produces
// a goblet: wide at the rim, pinched at the noses, wide again at the base.
function draw(ctx, t, C) {
  const cy = C.cy, s = C.p, gap = 150;
  const prof = [
    [ 60, -330], [ 30, -286], [ 14, -244], [  6, -206], [ 26, -178], [ 20, -150],
    [ -6, -120], [-34,  -92], [  4,  -68], [ 10,  -48], [ -6,  -28], [  2,  -8],
    [ -4,   14], [ 16,   42], [ -2,   72], [ 24,  112], [ 90,  162], [120,  250],
    [130,  330],
  ];
  const side = dir => {
    ctx.beginPath();
    ctx.moveTo(C.cx + dir * (gap + prof[0][0]), cy + prof[0][1]);
    for (const [dx, dy] of prof) ctx.lineTo(C.cx + dir * (gap + dx), cy + dy);
    ctx.lineTo(C.cx + dir * 470, cy + 330);
    ctx.lineTo(C.cx + dir * 470, cy - 330);
    ctx.closePath();
  };
  const mix = u => 'rgb(' + [20, 18, 14].map((v, i) => Math.round(v + ([232, 224, 208][i] - v) * u)).join(',') + ')';
  ctx.fillStyle = mix(1 - s); ctx.fillRect(C.cx - 470, cy - 340, 940, 680);
  ctx.fillStyle = mix(s);
  side(-1); ctx.fill();
  side(+1); ctx.fill();
}
