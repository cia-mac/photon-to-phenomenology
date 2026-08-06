// Campbell-Robson chart. Spatial frequency rises left to right, contrast rises
// downward. Every column runs the full contrast range, so if the eye were
// uniform the bars would die along a straight horizontal line. They do not: the
// boundary is an inverted arc peaking in the mid frequencies. That arc is your
// own contrast sensitivity envelope, and it is not in the image.
//
// The grating must be a true chirp: phase is the INTEGRAL of frequency, not
// frequency times position. The naive sin(2*pi*f(x)*x) form gives the wrong
// local frequency everywhere and beats badly at the right edge. With c(x) the
// cycle count at x, phase(x) = 2*pi * integral(c(u)/W du), which for an
// exponential sweep c = 10^(k x / W) closes to (10^(k x/W) - 1) / (k ln10).
//
// Max frequency is held at 120 cycles across 1080px, about 9px per cycle. The
// first pass ran to ~500 cycles, past Nyquist, and rendered as moire.
let CSF_CACHE = null;
function draw(ctx, t, C) {
  const top = 470, bot = 1450, h = bot - top;
  if (!CSF_CACHE) {
    const K = Math.log10(120), LN10 = Math.log(10);
    const img = ctx.createImageData(C.W, h);
    const d = img.data;
    const phase = new Float64Array(C.W);
    for (let x = 0; x < C.W; x++) phase[x] = 2 * Math.PI * (Math.pow(10, K * x / C.W) - 1) / (K * LN10);
    for (let y = 0; y < h; y++) {
      const contrast = Math.pow(10, -2.6 * (1 - y / h));   // faint at top, full at bottom
      for (let x = 0; x < C.W; x++) {
        const v = 0.5 + 0.5 * contrast * Math.sin(phase[x]);
        const i = (y * C.W + x) * 4;
        d[i]     = Math.round(20 + (232 - 20) * v);
        d[i + 1] = Math.round(17 + (224 - 17) * v);
        d[i + 2] = Math.round(12 + (208 - 12) * v);
        d[i + 3] = 255;
      }
    }
    CSF_CACHE = img;
  }
  ctx.putImageData(CSF_CACHE, 0, top);
  // At the reveal, a rule at one constant contrast. The bars die at different
  // heights along it although the chart is identical across its whole length.
  if (C.p > 0.02) {
    ctx.globalAlpha = C.p;
    ctx.strokeStyle = 'rgba(255,90,90,0.9)'; ctx.lineWidth = 3; ctx.setLineDash([16, 13]);
    const y = top + h * 0.56;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(C.W, y); ctx.stroke();
    ctx.setLineDash([]); ctx.globalAlpha = 1;
  }
}
