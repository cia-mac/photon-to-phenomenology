# SESSION_STATE — Photon to Phenomenology

Last Updated: 2026-06-22 (v1, first snapshot for this lane)

Interactive vision-science series after Stephen Palmer, *Vision Science: Photons
to Phenomenology* (MIT Press, 1999). Repo: `~/Developer/photon-to-phenomenology`.

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
