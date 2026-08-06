// Café wall. Rows of alternating tiles with a thin mid-grey mortar, every other
// row shifted. The mortar lines look wedged; they are dead parallel.
// C.p is the shift as a fraction of a tile: 0.5 -> 0 collapses the effect.
//
// Geometry matters here. The mortar must be thin and its luminance must sit
// BETWEEN the two tile luminances, and the relative shift between adjacent rows
// wants to be about a quarter of the period. Square tiles with a 0.6-tile
// relative shift (the first pass) produced a plain brick wall with no wedge.
// The pattern is banded into the stimulus zone so the header sits on clean ink
// rather than on a gradient over the tiles.
function draw(ctx, t, C) {
  const T = 120, rowH = 78, mortar = 9, off = C.p;
  const top = 470, bot = 1450;
  const period = 2 * T;
  ctx.save();
  ctx.beginPath(); ctx.rect(0, top, C.W, bot - top); ctx.clip();
  // Mortar as a ground fill, then tiles on top. Drawing mortar per row left the
  // clipped top row sitting on nothing, so the band's first row read as tiles
  // floating on ink instead of as a wall running past the frame.
  ctx.fillStyle = '#6f6757'; ctx.fillRect(0, top, C.W, bot - top);
  // Phase the rows half a row above the band so the clip cuts through a row
  // rather than landing on a row boundary, which read as a floating strip.
  const y0 = top - Math.round((rowH + mortar) / 2);
  const rows = Math.ceil((bot - top) / (rowH + mortar)) + 2;
  for (let r = -1; r < rows; r++) {
    const y = y0 + r * (rowH + mortar);
    const shift = (r % 2 === 0 ? 0 : off * T);
    for (let c = -1; c <= Math.ceil(C.W / period) + 1; c++) {
      const x = c * period + shift - T;
      ctx.fillStyle = C.cream; ctx.fillRect(x, y, T, rowH);
      ctx.fillStyle = C.ink;   ctx.fillRect(x + T, y, T, rowH);
    }
  }
  ctx.restore();
}
