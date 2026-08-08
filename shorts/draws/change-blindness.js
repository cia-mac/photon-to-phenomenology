// Change blindness. Two versions of a scene alternate, differing in one large,
// central, obvious element. With a brief BLANK between them you cannot find it.
// Remove the blank and it is impossible to miss.
//
// The blank is the whole mechanism: a change normally announces itself with a
// local motion transient, and the blank floods the visual field with transients
// everywhere at once, so the one that matters stops standing out. C.p 1 -> 0
// shrinks the blank to nothing, which is why the reveal feels like a trick being
// taken away rather than an answer being given.
//
// The layout is seeded, not random: window.seek must return the same frame for
// the same index or frame-exact capture is meaningless.
function draw(ctx, t, C) {
  const rnd = (s => () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)(20260808);
  const items = [];
  for (let i = 0; i < 14; i++) {
    items.push({ x: 90 + rnd() * 900, y: 540 + rnd() * 840,
                 w: 70 + rnd() * 120, h: 60 + rnd() * 110, g: 0.28 + rnd() * 0.5 });
  }
  const CYCLE = 1.5, blank = 0.16 * C.p;
  const ph = t % CYCLE;
  const showB = ph > CYCLE / 2;
  const inBlank = (ph % (CYCLE / 2)) > (CYCLE / 2 - blank);
  if (inBlank) return;                       // the flicker gap

  for (let i = 0; i < items.length; i++) {
    const o = items[i];
    let g = o.g;
    // ONE item changes: a large block near the centre, the last place anyone
    // expects to miss something.
    if (i === 6) g = showB ? 0.92 : 0.18;
    const v = Math.round(20 + (232 - 20) * g);
    ctx.fillStyle = `rgb(${v},${Math.round(17 + (224 - 17) * g)},${Math.round(12 + (208 - 12) * g)})`;
    ctx.fillRect(o.x, o.y, o.w, o.h);
  }
}
