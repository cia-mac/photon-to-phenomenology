# Photon App Constitution v7

**Written:** 2026-10-03 (v7). **Supersedes:** v1 to v6, preserved beside this file. **Scope:** every piece bundled in the Photon iOS and iPadOS app
(`ios/Photon/Pieces/<slug>.html`). **Parent:** `PHOTON_CONSTITUTION_v2.md` (thesis,
accuracy, register, no em dashes) stays in force; this document adds what the app needs.
Where the two disagree on technical form, this one wins inside `ios/`.

## Article A: an app piece is a port, never a rewrite

1. The source page is the truth. Copy it, then change ONLY what this constitution names.
2. **The stimulus is frozen.** Do not alter figure geometry, colours, luminances, timings,
   thresholds, the physics of the demonstration, or any reader-visible sentence. A port
   that changes what the eye is shown is a failed port even if it looks fine.
   **One exception, input words only:** an instruction that names a mouse or keyboard
   action the device does not have may swap that word for the touch equivalent
   ("click" to "tap", "arrow keys" to "drag"). Nothing else in the sentence changes, and
   every such swap is listed in the worker's report for Ciamac to read.
   **Second exception, a named starting state:** trichromatic-mixing opens with red at 100%
   (the source opens with every light at 0, a blank screen on first launch). Only the
   initial slider value differs; the page's behaviour and wording are unchanged. Any further
   starting-state change needs an entry here.
3. Write exactly one file: `ios/Photon/Pieces/<slug>.html`. Never edit `chrome_app.js`,
   `chrome_app.css`, `catalog.json`, any Swift file, or anything under `public/`.

## Article B: the bundle is the whole world

1. No network. No `http://`, `https://` or protocol-relative URL in any `src`, `href`,
   `url()`, `fetch` or `import`. Remove the analytics tag (`a.ciamac.com/t.js`).
2. No site-absolute paths (`/photon/...`). Shared assets are siblings: `chrome_app.css`
   and `chrome_app.js`, both required in every piece.
3. Remove all page-to-page navigation (menus, prev/next arrows, index overlays, links to
   other pieces or to ciamac.com). The native shell owns navigation.

## Article C: the shell frame

1. Viewport meta includes `viewport-fit=cover`, `maximum-scale=1`, `user-scalable=no`.
2. The native shell draws a button row across the top. Nothing a reader must read or touch
   may sit above `var(--shell-top)`. Side margins use `var(--shell-side)`. Bottom-anchored
   text sits above the walk card and replay pill: at least `calc(var(--shell-bottom) + 62px)`.
3. At 402 x 874 (iPhone) and 1032 x 1376 (iPad) there is no horizontal scroll, no clipped
   text (a page or panel that scrolls vertically may run below the fold), and no two text blocks overlapping, with the guide open and with it closed.
4. **The figure is inset, never under the words.** A full-bleed canvas is sized to the
   clear box between the top text (chapter, title, readout) and the bottom text (thesis):
   call `PhotonApp.fit(canvas)` from `resize()` and draw into the returned width and height.
   The figure is drawn exactly as before, only smaller; its geometry, colours and timings
   are unchanged (Article A). Nothing drawn may leave the screen: a figure wider than the
   box is scaled to fit and centred by its extent. The verifier hides all text, photographs
   the page, and fails any text box whose pixels are not flat ground.
5. **A larger screen gets the same figure, enlarged.** A figure tuned in fixed pixels (bar
   widths, dot radii, speeds) is laid out on a phone-sized logical canvas and scaled up:
   `K = max(1, min(width, height) / 402)`, `W = innerWidth / K`, transform `DPR * K`, and
   every pointer coordinate divided by K. On a phone K is 1 and nothing changes. A figure
   that stays full-viewport clips its drawing to `PhotonApp.bands()` so nothing is drawn
   under the text.
8. **The open guide card never covers the figure.** The guide card has one constant height,
   the tallest of its steps. A figure the card would cover calls `PhotonApp.fit(canvas,
   {reserveGuide:true})`, which keeps the figure's box above the card. The verifier steps
   through every guide step, hides the card, and fails if any visible figure (40 or more device pixels) is under it; a thin line counts, a
   percentage of the card's area does not.
6. **Nothing scrolls under the native buttons.** A page that scrolls (the lab pages) gets a
   solid band behind the native button row that ends where the page's own content begins
   (`--shell-top`), so scrolled content never shows through or sits beneath a button.
7. Every touchable control (button, link, input, slider) has a hit area of at least
   44 x 44 CSS px. No control depends on hover. Mouse-only handlers gain touch or pointer
   equivalents; a drag on the figure must not scroll or zoom the page.

## Article D: the bridge (what the app adds)

1. `PhotonApp.haptic('reveal')` fires once at the moment the percept appears or breaks
   (the threshold the page already computes for its readout). Never on a timer for
   decoration, never every frame, never on plain taps. `'tick'` is allowed for a detent.
   Where the percept needs time to build (adaptation, fixation), the haptic is gated on
   the page's own readiness threshold, not on the mode switch: a tap before the eye has
   adapted is silent, and so is the guided walk advancing on its timer.
   **A piece with no discrete moment carries no haptic.** Where the percept is a
   continuous boundary the reader traces (contrast-sensitivity), a buzz would be
   ornament, which the parent constitution forbids. The verifier names these pieces.
2. Fixation pieces (afterimage, motion-aftereffect, troxler-fading,
   motion-induced-blindness, opponent-afterimage) call `PhotonApp.hold(true)` when the
   fixation period begins and `PhotonApp.hold(false)` when it ends.
3. Keep the guided walk. Pages that used `PhotonChrome.init({here, walk})` keep the call
   unchanged. Pages with no walk do not invent one.

## Article E: verification (machines measure, they do not judge)

`node ios/tools/verify_piece.mjs <slug>` must exit 0. It measures Articles B, C and D by
loading the piece from `file://` at both sizes with touch emulation. A checker also diffs
the port against its source to enforce Article A. Whether the illusion lands on a real
device is Ciamac's call and no checker decides it.

## Article F: versioning

Never replace, always version. Amendments bump this file and say what changed.

*Amendments log:*
- v1 (2026-10-03): initial.
- v2 (2026-10-03): after the audition port. (1) Article A2 gains the input-word exception:
  three source pages tell the reader to "click" or use "arrow keys", which a phone does
  not have. (2) Article D1 names the gating rule for timed percepts: the audition worker
  fired the reveal haptic on the mode switch, so an early tap and the walk timer both
  buzzed with no afterimage present.
- v3 (2026-10-03): after the first full measuring pass. (1) D1: no haptic for a piece
  with no discrete reveal; the checker and worker disagreed on contrast-sensitivity and
  the orchestrator ruled for the worker. (2) C3: vertical scrolling is not clipping; the
  verifier had failed four long-form lab pages for content below the fold.
- v4 (2026-10-03): Cia ruled for the inset after the first contact sheet showed text over
  the figure on five pieces and a ring leaving the screen on a sixth. C4 is the new inset rule
  (the old C4 is now C5); the verifier gained the figure-under-text check.
- v5 (2026-10-04): Cia asked for the iPad figure sizes and the button overlap to be fixed. C5 is
  the new enlarge-the-phone-figure rule (used for aperture-problem, motion-induced-blindness,
  troxler-fading); C6 is the scrim behind the native buttons on scrolling pages. The old C5
  (touch targets) is now C7.
- v6 (2026-10-04): C8, the guide card (cafe-wall, cornsweet and scintillating-grid were covered at
  step one; the other 18 were not). A2: trichromatic-mixing starts with red at 100%.
- v7 (2026-10-04): C8 tightened after Cia asked again for the guide card fix. The first check used a
  1 percent threshold and missed thin figures. Strict result: 5 of 21 pieces were covered
  (cafe-wall, cornsweet, scintillating-grid, motion-aftereffect, motion-induced-blindness); all
  five now reserve the card. Two false alarms from the test itself (lingering step dots, and a
  display:none that made the re-fit watcher move the figure) are fixed in the verifier.
