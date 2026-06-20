# Photon to Phenomenology

A series of interactive vision-science pieces after Stephen E. Palmer,
*Vision Science: Photons to Phenomenology* (MIT Press, 1999).

Two surfaces, both static, both deployed by this repo's own Vercel project:

- **Gallery** — `public/photon/` — standalone phenomena in impact order.
- **Reading companion** — `public/photon/book/` — follows the book's real
  13-chapter structure. Landing page: `public/photon/book/index.html`.

## Standards (non-negotiable)

- Single-file HTML, **zero dependencies**. No framework. This is the design, not
  a limitation.
- @ciamac register: near-black `#0c0b09`, cream `#e8e0d0`, anti-decorative, no
  glow. Colour only where the concept *is* colour.
- "Full-bleed instrument": the figure is full-bleed, you touch the figure itself
  (not a labelled slider in a box), eased motion on everything, minimal chrome,
  ends with a one-line thesis.
- The thesis in every piece: **vision is not recording, it is construction.**
- The differentiator: the viewer measures their *own* visual system.

## Built so far in this repo

All four were built fresh from the brief (the original bundle never arrived; see
provenance note). The `inverse-problem` piece is a fresh reconstruction of the
reference figure the brief names as the model for the others.

- `public/photon/book/inverse-problem.html` — **The inverse problem** (ch.1).
  A wireframe cube that is really eight edges hanging at unrelated depths; from
  the head-on viewpoint they align into a solid, turn it and the cube comes apart
  into "just wires in space," release and it eases home. One flat image, endless
  3D arrangements, one perceived solid.
- `public/photon/book/checker-shadow.html` — **The checker-shadow** (ch.3). Drag
  the shadow off square B; while shadowed it sends the eye the same light as A
  (pixel-identical by construction) yet looks lighter. Drag the shadow away and
  its true value is revealed.
- `public/photon/book/apparent-motion.html` — **Apparent motion** (ch.10). Two
  lamps flash in alternation; scrub the rhythm and move the dots to find your own
  threshold where two blinking lights fuse into one moving thing.
- `public/photon/book/aperture-problem.html` — **The aperture problem** (ch.10,
  Perceiving Motion and Events). Drag the bar field to set its true motion; grab
  the rim and pull to open the aperture. Through the closed aperture only the
  motion across the bars is visible, so wildly different true motions look
  identical. The numeric readout shows the gap between the true motion and what
  you see. Open the aperture and the line-ends (terminators) reveal the truth.

## Provenance note (read before merging the bundle)

This repo was bootstrapped on 2026-06-20 **without** the original
`photon-to-phenomenology.tar.gz`. That bundle (9 gallery pieces, the reading
companion, and `docs/HANDOFF.md` with the craft lessons and build queue) was
referenced as an attachment but never landed on the filesystem, so it could not
be unpacked. Rather than fabricate the missing pieces or invent a "ground truth"
HANDOFF, the aperture problem was built fresh from the spec.

**When the real bundle is supplied:** unpack it, then reconcile —
`public/photon/book/index.html` here is a clean standalone contents page and
should be replaced (or merged) with the bundle's real index, with the aperture
problem kept under ch.10. The bundle's `docs/HANDOFF.md` is the authoritative
craft reference once present.

## Deploy

Static. Vercel serves `public/` as the site root, so the figures live at
`/photon/...` and `/photon/book/...`. This repo has its own Vercel project and
does not depend on any other project's deployment.
