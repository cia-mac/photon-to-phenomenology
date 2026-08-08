// Visual search and pop-out. Two ways of finding one thing among many. When the
// target differs in a single feature it arrives free, with no search at all,
// however many distractors there are. When it differs only in the COMBINATION
// of two features you have to check items one at a time and the time it takes
// scales with the count.
//
// C.p 1 -> 0 hands the target a unique colour, converting the same array from a
// conjunction search into a pop-out. Nothing else about the display changes,
// which is the point: the difficulty was never in the image.
function draw(ctx, t, C) {
  const COLS = 6, ROWS = 7, TARGET = 25;
  const teal = '#1ba29a';
  for (let i = 0; i < COLS * ROWS; i++) {
    const cx = 140 + (i % COLS) * 160;
    const cy = 560 + Math.floor(i / COLS) * 128;
    const isTarget = i === TARGET;
    // distractors: cream verticals and teal horizontals. The target is a cream
    // horizontal, so it shares a feature with every distractor and pops out on
    // neither colour nor orientation alone.
    const vertical = isTarget ? false : (i % 2 === 0);
    let col = isTarget ? C.cream : (vertical ? C.cream : teal);
    if (isTarget && C.p < 0.5) col = '#e86a4d';   // unique colour = pop-out
    ctx.strokeStyle = col; ctx.lineWidth = 11; ctx.lineCap = 'round';
    ctx.beginPath();
    if (vertical) { ctx.moveTo(cx, cy - 38); ctx.lineTo(cx, cy + 38); }
    else { ctx.moveTo(cx - 38, cy); ctx.lineTo(cx + 38, cy); }
    ctx.stroke();
  }
}
