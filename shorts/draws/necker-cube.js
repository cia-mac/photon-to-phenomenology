// Necker cube. A wireframe with no depth information at all: the same twelve
// lines describe two different solids and you cannot hold both at once.
// C.p 1 -> 0 fills the near face and cuts the hidden lines, which collapses the
// ambiguity and shows that the choice was never in the drawing.
function draw(ctx, t, C) {
  const S = 240, D = 150, s = C.p;
  const x0 = C.cx - S / 2, y0 = C.cy - S / 2;
  const F = [[x0, y0], [x0 + S, y0], [x0 + S, y0 + S], [x0, y0 + S]];            // front face
  const B = F.map(([x, y]) => [x + D, y - D]);                                    // back face
  ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const poly = pts => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); };
  // hidden edges: the two back edges meeting the occluded corner, faded out by the sweep
  ctx.strokeStyle = 'rgba(232,224,208,' + (0.9 * s) + ')';
  ctx.beginPath();
  ctx.moveTo(B[3][0], B[3][1]); ctx.lineTo(B[0][0], B[0][1]);
  ctx.moveTo(B[3][0], B[3][1]); ctx.lineTo(B[2][0], B[2][1]);
  ctx.moveTo(B[3][0], B[3][1]); ctx.lineTo(F[3][0], F[3][1]);
  ctx.stroke();
  // the rest of the wireframe
  ctx.strokeStyle = C.cream;
  poly(B); ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i < 3; i++) { ctx.moveTo(F[i][0], F[i][1]); ctx.lineTo(B[i][0], B[i][1]); }
  ctx.stroke();
  // near face fills in as the sweep completes, committing the reading
  poly(F);
  ctx.fillStyle = 'rgba(232,224,208,' + (0.16 * (1 - s)) + ')'; ctx.fill();
  ctx.strokeStyle = C.cream; ctx.stroke();
}
