# Shorts release contract v1

Written 2026-08-05 by the release-pipeline lane (LinkedIn / YouTube / X) for the
session extracting the shorts engine. The engine and the new pieces are theirs;
staging, copy and posting are this lane's. This file is the handoff between them,
left here because a direct cross-session message would not reach.

**Hand finished MP4s over rather than staging them.** There is a specific reason,
in point 1. Ping the release lane when masters exist.

---

## 1. One master per piece in `to-be-released/`. Always.

The YT workbench treats every file in `~/Movies/ciamac-youtube/to-be-released/`
as a draft. Two files for one piece becomes two drafts becomes two uploads.

This is not hypothetical. On 2026-08-05 the release lane found **95 Theodore
Svenningsen uploads on @ciamac covering 44 distinct pieces**, from four upload
passes on 07-27 and 07-28. 51 were duplicates. They are now private (Cia approved
private-then-delete; the delete is still pending). Four of the 44 turned out to be
genuine recuts rather than copies, so the newest was kept in every case.

`upload.py` has **no idempotency guard**. Nothing at the tool level will stop a
20-piece batch from doing the same thing at four times the scale. Until that guard
exists, the invariant is enforced by hand: one file per piece in the folder.

## 2. Naming, exactly

- **YouTube:** `Photon to Phenomenology - The <Piece> - master v2.0.mp4`
- **Superseded masters:** move to `to-be-released/old-masters/photon-shorts-v1/`.
  Never delete. Versioning law, root CLAUDE.md.
- **X:** `~/Movies/ciamac-x/to-post/Photon_-_<Name>_-_<YYYYMMDD>_v<n>/` holding the
  media plus `POSTING_METADATA.json`. Superseded staging dirs go to
  `to-post/_superseded_v1/`.

All three v1 stagings were migrated to v2 on 2026-08-05 and the v1 copies archived
under both conventions above. Durations in the X metadata were corrected to the
real encoded values (22, 20, 13).

## 3. X is not activated

The X lane is still parked in canon. `visibility` stays `"staged"` in
`POSTING_METADATA.json`. Nothing goes out without **both** a lane-activation
decision and a per-piece go from Cia.

## 4. Copy standard is locked. Do not re-derive it.

`~/Developer/ciamac-gallery-stage/docs/YOUTUBE_MASTER_v3.md`. Pipe-delimited
titles, terse first-person factual voice, no mythology or hype, comma tags never
hashtags, close with `More work: https://ciamac.com`. No em dashes anywhere.

## 5. Root CLAUDE.md is stale on the staging path

It says YT staging is `to-upload/`. That directory does not exist and never did.
The real convention on disk is `to-be-released/` then `released/`, confirmed by the
`README.txt` there and by YOUTUBE_MASTER v3.

---

## Two things worth settling before building far

**Not every illusion survives as passive phone video.** The blind spot needs one
eye closed at a controlled viewing distance and will fail for most viewers. Several
BUILD entries in the TOC are interactive by nature. Others are ideal: Troxler
fading, peripheral drift, the barber pole, phi motion, the spinning dancer, the
hollow face. Worth running all 39 TOC pieces against one test, *does it work with
no interaction, on a phone, in under 20 seconds*, before committing to a batch
size. Cheapest six to start are the ones whose interactive pages already carry
working canvas draw code: `cafe-wall`, `cornsweet`, `ebbinghaus`, `kanizsa`,
`muller-lyer`, `ponzo`.

**Nothing from this series has been posted.** The three staged shorts are a field
test whose results are not in. Building deep before the first batch lands is
inventory on an untested assumption. Cia's call, not this lane's, but he should be
making it knowingly.

---

## What v2 established, for the engine to inherit

Committed at `10430b7`. The band law: header 0-470, stimulus 470-1450 centred on
cy=960, foot below 1450. `verify_layout.mjs` as the gate, stepping every frame and
failing on any text box crossing the ceiling. `render_v2.sh` encode settings
(libx264, preset slow, crf 18, yuv420p, faststart, 30fps). The afterimage's
field-coloured veil, which exists because a dark end card would wipe the
afterimage the viewer is still holding.
