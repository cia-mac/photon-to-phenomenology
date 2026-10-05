# Photon App Constitution v2

**Written:** 2026-10-03 (v2). **Supersedes:** v1, preserved beside this file. **Scope:** every piece bundled in the Photon iOS and iPadOS app
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
   text, and no two text blocks overlapping, with the guide open and with it closed.
4. Every touchable control (button, link, input, slider) has a hit area of at least
   44 x 44 CSS px. No control depends on hover. Mouse-only handlers gain touch or pointer
   equivalents; a drag on the figure must not scroll or zoom the page.

## Article D: the bridge (what the app adds)

1. `PhotonApp.haptic('reveal')` fires once at the moment the percept appears or breaks
   (the threshold the page already computes for its readout). Never on a timer for
   decoration, never every frame, never on plain taps. `'tick'` is allowed for a detent.
   Where the percept needs time to build (adaptation, fixation), the haptic is gated on
   the page's own readiness threshold, not on the mode switch: a tap before the eye has
   adapted is silent, and so is the guided walk advancing on its timer.
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
