# SESSION_STATE — Photon to Phenomenology

Last Updated: 2026-08-05 (shorts engine + 9 pieces staged; release-gated)

Interactive vision-science series after Stephen Palmer, *Vision Science: Photons
to Phenomenology* (MIT Press, 1999). Repo: `~/Developer/photon-to-phenomenology`.

---

## 2026-08-05 EXIT (4 of 4) - sound, voice, end card; series at 19 with audio

Commit `5e06c08`. Trigger: Cia, "lets work on the presentation / music so the
viewer knows it has started / a voice that says what to do / at the end we want
people to go to the page".

### Done
- **photon.ciamac.com is LIVE** and is the destination on every end card.
  `ciamac.com/photon/` was 404, so an end card pointing there would have been a
  dead link on 19 videos. Domain added to the Vercel project and verified 200
  BEFORE anything rendered against it.
- **Procedural music bed** (`engine/music.py`): open bell at t=0 (the
  it-has-started signal), quiet breathing fifth, reveal bell, close lift.
  Synthesised, so zero Content ID exposure and it regenerates at any length.
  Nothing rhythmic by design: a pulse would pull the eye off the figure.
- **Voice = Cia's local clone** (`engine/vo.py`, Qwen3-TTS + ref/voice_cia.wav,
  `.venv-mlx`, sandbox OFF). NOT ElevenLabs (being cancelled). Verified as his
  voice by F0: 135 Hz ref vs 124 Hz generated. 42 lines. The `Voice: af_heart`
  log line is cosmetic, not a fallback.
- **Timing inverted, and this caught a real defect.** Authoring end/dur by hand
  put 12 of 19 reveal lines PAST their own end card. Now the build derives end
  and dur from the measured VO. The 3 constants are duplicated in short.mjs and
  music.py and are compared BY PARSING BOTH FILES (an earlier check re-typed the
  numbers and only proved its own arithmetic, while music.py was still at 1.3).
- **Progress hairline** at the bottom edge: music cannot be the only start
  signal when most short-form is watched muted.
- All 19 re-rendered as **v4, h264/aac 1080x1920 48k stereo, 5.7 min, 20.3 MB**,
  every track matching picture to within 20ms. Staged both lanes as master v4.0
  (v3 archived). Photos album **"Photon Shorts v4 sound"**. Contact sheet now
  plays with sound and reports true durations.

### Judgement calls Cia may want to reverse
- **The close VO does not speak the URL.** The type carries it for ~6s and a
  spoken domain risks mispronouncing his name; whisper could not resolve the
  three takes. Alternates in `audio/vo/_alt/`.
- **Pieces got longer** (12s to ~17s typical) because the voice needs the room.
  That is a retention cost on Shorts. Shortening the close line only bought 0.5s,
  so the padding was trimmed instead.

### Pending (all Cia gates)
- NOTHING UPLOADED, NOTHING POSTED. X still needs lane activation AND a per-piece go.
- Cia's felt-effect verdict, now including whether the voice and bed are right.
- Part VII of the spine (attention) is the only gap: change blindness,
  inattentional blindness, pop-out.

---

## 2026-08-05 EXIT (3 of 3) — ten more pieces, series at 19 (NOTHING POSTED)

Commit `8986825`. Trigger: Cia, "make 10 more if you can".

### Done
- **19 shorts.** New: simultaneous-contrast, whites-illusion, mach-bands,
  contrast-sensitivity, troxler, peripheral-drift, shepard-tables, necker-cube,
  rubin-vase, barber-pole. Picked to widen TOC coverage (parts I, II, IV, V, VI,
  VIII) and to favour what a phone is better apparatus for: fixation, periphery,
  bistability. Each is a draw function plus a config entry; no page authored.
- **All 19 PASS verify_layout** with the engine untouched. That is the return on
  the extraction.
- **Four defects caught by eye before rendering:** contrast-sensitivity was not a
  chirp (aliased past Nyquist; phase is now the integral of frequency, closed
  form, capped at 120 cycles/1080px); simultaneous-contrast clipped both panels;
  the Rubin profile read only as a vase until it was rebuilt as an actual face;
  Shepard's legs rendered as detached stubs, removed.
- **Rendered + staged:** 19 x 1080x1920 yuv420p, 12.6 MB. YT
  `to-be-released/Photon to Phenomenology - <Piece> - master v3.0.mp4`; X
  `to-post/Photon_-_<Piece>_-_20260805_v3/` + POSTING_METADATA.json, all copy
  under 280 chars. Photos album **"Photon Shorts"** holds all 19.

### Notes that matter later
- troxler and peripheral-drift have NO sweep by design: the frame genuinely does
  not change, which is the claim.
- peripheral-drift is an ORIGINAL staging. Kitaoka owns the famous drifting
  images; the phenomenon is public record, his pictures are not. Same rule as
  Adelson's checker shadow (TOC rule 1).
- 19 of the TOC's 40 now exist as shorts. The remaining build list is mostly one
  draw function each.

---

## 2026-08-05 EXIT (2 of 2) — shorts engine extracted, series at 9 (NOTHING POSTED)

Snapshot: `SESSION_STATE_v_2026-08-05_pre_engine.md`. Commit `f8c2c42`.
Trigger: Cia, "re render / we need many more".

### Two sessions in this repo today
The **Release pipeline lane** (ciamac-gallery-stage worktree) built v2 (`10430b7`)
and caught a real v1 defect: the MAE countdown sat on the rotating spiral arms.
This session then took the engine extraction that lane had proposed, and told it
so via send_message, to avoid both lanes writing shorts/ at once. That lane keeps
the release side (staging conventions, X gating, copy, YT workbench).

### Done (evidence)
- **`shorts/engine/short.mjs` + `shorts.config.json` + `draws/<slug>.js`.** Engine
  owns layout law, beat runner, countdown, end card, veil. A piece is a draw
  function plus a config entry. v2's band law and field-coloured veil carried over
  unchanged; `verify_layout.mjs` is the pre-render gate.
- **9 pieces, up from 3.** New: cafe-wall, cornsweet, ebbinghaus, kanizsa,
  muller-lyer, ponzo, lifted from the live pages so stimulus params are the tuned
  ones. The engine's sweep scalar IS the parameter the viewer drags there.
- **3 defects caught by eye before rendering** (all new pieces): cafe wall had no
  wedge (square tiles + 0.6-tile shift), cafe wall's clipped top row floated,
  Ebbinghaus ran off the left edge at 1080. All fixed and re-verified.
- **All 9 PASS `verify_layout.mjs`**; all 9 rendered 1080x1920 yuv420p, 9.2 MB
  total; reveal frames spot-checked from the ENCODED files.
- **Staged both lanes as master v3.0**, v2 archived not deleted:
  `~/Movies/ciamac-youtube/to-be-released/Photon to Phenomenology - <Piece> - master v3.0.mp4`
  (v2 -> `_superseded_photon_v2/`), and
  `~/Movies/ciamac-x/to-post/Photon_-_<Piece>_-_20260805_v3/` with
  POSTING_METADATA.json, copy drafted, all under 280 chars (v2 -> `_superseded_v2/`).
- **Photos album "Photon Shorts v3"** holds all 9 for phone review. Earlier albums
  from today hold superseded cuts; the v3 album is the one to watch.

### Pending (all Cia gates)
- **NOTHING UPLOADED, NOTHING POSTED.** YT release via the workbench; X needs BOTH
  lane activation (X is still parked in canon) AND per-piece go.
- Cia's felt-effect verdict on the 9. That verdict is the input to which pieces
  ship and in what order.
- Standing: D-0071 port of the 4 sandbox graphs; the 2026-06-23 nav/type pass is
  still NOT deployed; AUDIT.html pass.
- BOOK_OF_ILLUSIONS_TOC_v1 designs 40 pieces; 9 shorts exist against it.

### Fragile
- capture.mjs and verify_layout.mjs pin the chromium-1228 path under
  ~/Library/Caches/ms-playwright. Chrome needs the sandbox OFF (singleton socket).
- `shorts/build/` and `shorts/stills/` are generated and gitignored. The v2 HTML
  pages remain on disk untouched; the engine does not read them.

---

## 2026-08-05 EXIT — three 9:16 shorts built, verified, staged (NOTHING POSTED)

Snapshot before this block: `SESSION_STATE_v_2026-08-05_pre_shorts.md`.
Trigger: Cia's go on the series test (three shorts from already-built pieces,
YT Shorts + X, felt-effect audit run by strangers instead of the click-through).

### Done (evidence)
- **Series consolidation read agreed:** the ITDs (archive/idt-blog-itds, 9 generic)
  and Photon are one series, two tracks (the instrument / the eye). Shorts test
  the eye track first.
- **`shorts/` pipeline in this repo** (commit `efdcf24`): deterministic 1080x1920
  stimulus pages (window.seek(frame)) + playwright-core frame capture (needs
  sandbox OFF: Chrome singleton socket bind) + ffmpeg H.264 yuv420p. Frames/out
  gitignored; source committed.
- **Three finals rendered + frame-verified from the ENCODED files:**
  afterimage 24s (13s adapt, teal disc, in-field close), scintillating grid 15s
  (top gradient band for text), motion aftereffect 30s (analytic rotation, dead
  stop at 17s). Photon palette (cream/ink, afterimage neutral field), Helvetica
  Neue 300 + mono labels, every frame carries PHOTON TO PHENOMENOLOGY.
- **Staged YT:** ~/Movies/ciamac-youtube/to-be-released/
  "Photon to Phenomenology - The {Negative Afterimage,Scintillating Grid,Motion
  Aftereffect} - master v1.0.mp4" (workbench will pick them up as drafts).
- **Staged X per X_LANE_v1 schema:** ~/Movies/ciamac-x/to-post/
  Photon_-_{Afterimage,Scintillating_Grid,Motion_Aftereffect}_-_20260805_v1/
  each with media + POSTING_METADATA.json, visibility "staged", copy drafted
  (140-280 chars, More work: https://ciamac.com).

### Pending (all Cia gates)
- **NOTHING UPLOADED, NOTHING POSTED.** YT release via workbench "Release now";
  X needs BOTH the lane activation decision (X still parked in canon) AND
  per-piece go. Copy drafts sit in POSTING_METADATA.json title fields.
- Prior pending stands: 2026-06-23 nav/type pass still NOT deployed; D-0071 port
  of the 4 sandbox graphs still open; AUDIT.html felt-effect pass (the shorts
  are the field test of exactly this).

### Fragile
- capture.mjs pins the chromium-1228 executable path in ~/Library/Caches/ms-playwright.
- Root CLAUDE.md still says YT staging is to-upload/; real convention on disk is
  to-be-released/ (README.txt there confirms).

---

## 2026-06-23 EXIT — clearer nav + refined walk-card type across all 16 (LOCAL ONLY, awaiting review)

Snapshot before this block: `SESSION_STATE_v_2026-06-23_pre_nav_type.md`.
Trigger: user found the prev/next phenomenon arrows too faint to notice and the
click-drag interaction unclear; liked the glass walk-card and asked to refine its
text. One local commit `6933839`. **Not deployed** — user wants to review in
preview first.

### Done (all 16 instruments, verified in preview, console-clean)
- **Navigation arrows made obvious.** Faint `.arrow` circles → brighter frosted
  buttons (opacity 0.95, border 0.45, 60px, font 26px), hover scale, and a
  one-time `@keyframes navhint` attention pulse (3 cycles) on load. Each arrow now
  carries an always-on frosted **label naming the prev/next phenomenon**
  (`.alabel`, leading "The " stripped), populated in `buildNav()`. Arrows
  restructured into `.nav.prev`/`.nav.next` wrappers (was bare `<a>`). Labels
  hidden under 680px.
- **Walk-card typography refined** (`#walk`): body `.wt` → light **font-weight 300**,
  21px, line-height 1.62, slight negative tracking, brighter `#f4efe4`; added
  `.wt b{font-weight:700;color:#fff}` and switched `wt.textContent` → `wt.innerHTML`
  so emphasis renders; finer kicker `.wk`. Each WALK step now has **exactly one
  bold key phrase** (the conceptual punchline), added across all 16. Verified
  balanced tags, one per step, no wording changed (emphasis wraps existing words).
- **Scintillating Grid** additionally got an explicit `⇆ drag to change spacing`
  hint under the readout (fades on first drag) — its specific click-drag affordance.
- Frosted-glass aesthetic preserved throughout (explicit user ask).
- Rollout done via an idempotent string-replace script (shared blocks were
  byte-identical across files) + a subagent for the per-instrument bold emphasis.

### Pending
- **NOT DEPLOYED.** User reviewing in local preview (server `photon`, was on
  :4317). Say "publish" → `vercel deploy --prod --yes` from repo root.
- **Bold-phrase choices are editorial** (my picks, one per step). Open to per-page
  re-picks if any read wrong.
- **Interaction/affordance hint is explicit only on scintillating-grid.** The other
  15 interact differently (stare, hold gaze, watch a gap). Offered to add a
  tailored one-line hint per instrument — not yet done, awaiting user go.
- Carried from 2026-06-22: dead-code cleanup chip `task_dee0357f` (strip unused
  `interacted` var); unbuilt book chapters (6 of 13); optional Vercel gate.

### Operational notes (this session)
- Same deploy/preview facts as the 2026-06-22 block below still hold.
- zsh heredocs mangle `!` (`!=` → `\!=`) — write Python scripts via the Write tool,
  not `python3 - <<EOF`, or avoid `!` (use `a-b` truthiness).
- The shared nav/walk CSS+markup blocks are identical across all 16 files, so a
  single string-replace script edits them uniformly. Per-instrument content (WALK
  copy) must be edited individually.

### Why we stopped
User realised they had mixed up sessions and invoked the exit ritual. The nav +
type work is complete, committed locally, and verified in preview; nothing is
deployed, so the live site is unchanged and the work is safe to resume or publish.

---

## 2026-06-22 — build + guide panels + audit/debug

### Done
- **Bootstrapped the lane from nothing.** The original `photon-to-phenomenology.tar.gz`
  bundle was never delivered to disk (see Open Blockers); built everything FRESH
  from the in-message spec instead.
- **16 single-file instruments + 2 index pages, all live.**
  - Gallery (`public/photon/`, impact order, 9): kanizsa (illusory contours),
    motion-aftereffect (spiral), afterimage (negative afterimage), scintillating-grid,
    ebbinghaus, cornsweet, cafe-wall, ponzo, muller-lyer. Landing `index.html`.
  - Reading companion (`public/photon/book/`, 7): inverse-problem (ch.1, the
    reference piece), checker-shadow (ch.3), aperture-problem + apparent-motion
    (ch.10), troxler-fading + motion-induced-blindness + change-blindness (ch.11).
    Landing `book/index.html`.
- **Guide panels** added to every piece: "what this is" (phenomenon explained,
  key term bolded) + "what to do" (instructions); eases out on first interaction,
  collapses to an "ⓘ about" toggle that reopens it; thesis still fades in after.
- **Audit + debug pass** (two independent reviewers). Fixed: aperture-problem's
  unstyled/half-wired guide panel; the `#about` pointer-events dead-zone (all 16);
  scintillating-grid resize bug; change-blindness phase-jump; removed em dashes
  from ALL display copy (18 titles, prose, verdict, state strings, `—` placeholders
  → `·`); standardised book chapter labels to `Ch. N · <piece>`; fixed aperture
  title grammar. Verified console-clean, all 18 routes 200.
- Standards held: single-file, zero-dep, @ciamac register (near-black #0c0b09 /
  cream #e8e0d0, anti-decorative), full-bleed instrument, every piece ends on
  "vision is not recording, it is construction," viewer measures their own system.
- Repo on GitHub `cia-mac/photon-to-phenomenology` (private, `main`); own
  independent Vercel project, live at `photon-to-phenomenology.vercel.app/photon/`.
- Lane recorded in auto-memory (`project_photon_to_phenomenology`).

### Pending
- **Spawned cleanup chip `task_dee0357f`** ("Remove dead code from Photon
  instruments"): strip the unused `interacted` var from all 16 files + a no-op
  line in kanizsa. Not yet started (user's to launch/dismiss).
- **Bundle merge** (only if the real tarball ever lands on disk): unpack, merge
  the original 9 gallery + companion pieces + `docs/HANDOFF.md`, reconcile the
  indexes (keep current pieces under their chapters), align craft to the HANDOFF.
- Reading companion has 7 of the book's 13 chapters wired; the other chapters are
  listed but unbuilt (intentional, room to grow).
- Optional: gate the live site (Vercel deployment protection) if it should not be
  public while refining. Currently fully public.

### Operational notes
- **Deploy:** `vercel deploy --prod --yes` from repo root (CLI-linked, NOT
  git-connected). Alias is auto. Scope `ciamacparhizi-9083`. `vercel.json` sets
  `outputDirectory: public`, `cleanUrls`.
- `gh` is authenticated (account `cia-mac`, has `repo` scope) after a re-auth this
  session.
- Preview gotcha: the Claude preview tab's emulated `innerWidth` often desyncs
  from layout width, rendering canvases tiny/top-left. Harness quirk, not a
  `resize()` bug. Set an explicit viewport + dispatch a resize, or trust the live
  deploy as the real visual check.
- Bash is zsh: quote globs (`'*.html'`) and avoid `!` / unquoted `$var` word-split.
- Fix scripts kept in `tools/` (`add_guide.py`, `audit_fixes.py`) so changes stay
  uniform across all 16 files.

### Why we stopped
User invoked the exit ritual after the audit/debug pass shipped and the dead-code
cleanup was spun off to a chip. Series is complete, live, and clean.

### Open Blockers
- **Original bundle is unrecoverable.** `photon-to-phenomenology.tar.gz` was
  referenced as a chat attachment but never reached the filesystem; confirmed
  absent across local disk, GitHub, Google Drive, and Gmail. Chat attachments do
  not reach this machine. The ONLY way to supply it is a real file saved to disk
  (e.g. `~/Downloads/`), then say so. Until then everything stands as a fresh build.
