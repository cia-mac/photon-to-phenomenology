# REA Illusions audit, v1 (2026-10-15)

Read-only audit of what the Illusions app ships against its source and against the live web gallery. Tooling: REA (D-0784) MCP server, plus shell hashing and a small static parameter extractor where REA's coverage stopped (named below). Nothing in source, builds, uploads or deploys was changed by this audit. Whether any illusion *lands* is Cia's call and is not judged here.

Labels: **observed** = read from the artifact at the time of writing; **inferred** = reasoned from observed facts (the basis is given); **unknown** = not established.

## 1. Targets

| Target | Identity | Evidence |
|---|---|---|
| Shipped app | `ios/release-audit-2026-10-06/claude-final-10-v101/Illusions.xcarchive`, Photon.app, 1.0.1 (5), bundle id com.ciamac.illusions. This is the archive the other session exported and uploaded at 12:56 PDT (its SESSION_STATE block). Executable sha256 `a66e3bd762da3de9...`, re-hashed after the upload: unchanged. | REA inspect_artifact `ev_2b16e02f...a780d` (118 nodes, 112 files, 0 integrity contradictions); open_binary sha256 a66e3bd7... |
| Source | `ios/Photon/Pieces` at HEAD 0cf826f (`ios/Photon` clean against HEAD) | `diff -rq` archive Pieces vs source: no output (observed, byte-identical, 103 files) |
| Live web | https://photon.ciamac.com/photon (+ /photon/book) | REA capture_browser_scenario `ev_1f219ba3...b3f1d1` (Chromium 155, index DOM sha256 66802cf0...); curl byte hashes of all 20 files |
| Web source | `public/photon/*.html`, `public/photon/book/*.html`, chrome.js, chrome.css | sha256 per file, see §4 |
| Lab source | `~/Developer/ciamac-gallery-stage/experiments/photon-to-phenomenology/<piece>/index.html` (the sandbox the port tool reads, `ios/tools/port_swarm_v2.js:13`) | static extractor |

## 2. Shipped app: bundle, Mach-O, plist, privacy

| Item | Finding | Label | Evidence |
|---|---|---|---|
| Version | CFBundleShortVersionString 1.0.1, CFBundleVersion 5, display name "Illusions", MinimumOSVersion 18.0, UIDeviceFamily [1,2] | observed | inspect_plist `ev_caa07cab...239b` |
| Toolchain | Xcode 27A266a, SDK 24A430: the same as the approved 1.0 (4) archive (claude-final-8-build4) | observed | inspect_plist; plutil on build4 |
| Orientation | iPhone portrait only; iPad all four orientations (satisfies iPad multitasking without UIRequiresFullScreen) | observed | inspect_plist |
| Encryption | ITSAppUsesNonExemptEncryption = false | observed | inspect_plist |
| Usage strings | No NS*UsageDescription keys; none needed: no camera, mic, location, photos or contacts API is imported | observed (keys), inferred (no need; from the import list) | inspect_plist; `nm -u` import scan |
| Privacy manifest | NSPrivacyTracking false, no tracking domains, no collected data types, one required-reason API: UserDefaults, reason CA92.1 | observed | inspect_plist `ev_2ab5ff28...03e8` |
| Required-reason API use | Imports include NSUserDefaults and AVAudioSession; no stat/fstat/getattrlist, systemUptime/mach_absolute_time, disk-space or active-keyboard APIs found among undefined symbols. The manifest matches what is imported. | observed (import scan; REA notes imports are not exhaustive for stripped binaries) | inspect_macho `ev_a8b63d36...3466` (778 imports, flagged non-exhaustive) + `nm -u` |
| Frameworks | 30 dylibs: Foundation, SwiftUI, UIKit, WebKit, AVFAudio, CoreTransferable, Combine, CoreGraphics; weak Swift overlays incl. libswiftCoreLocation (auto-linked overlay, no CoreLocation framework load and no CLLocation import) | observed | inspect_analysis_view dependencies `ev_49652a98...b766` |
| Network | Only URL in the binary: https://photon.ciamac.com/privacy (a Link, `ios/Photon/LibraryView.swift:285`). chrome_app.js and the 21 pieces contain no fetch, XHR, external URL, localStorage or analytics; the web pages' a.ciamac.com tracker is stripped in the app copies | observed | `strings`, grep of bundle; REA analyze_javascript_application `ev_14f637ea...9c79` (request family: 0 relations) |
| Web view | WKWebView loads `Pieces/<slug>.html` by loadFileURL with read access limited to Pieces; one script bridge "photon" (`PieceScreen.swift:216`); `isInspectable` only under `#if DEBUG` (`PieceScreen.swift:227`) | observed (source), inferred for the binary (no `setInspectable` string in the Release binary) | Swift source; strings |
| Test hooks | skipGuide, forceVoiceOver, silentVoice, dumpShare are all inside `#if DEBUG` blocks; the archive was built `-configuration Release` (archive.log line 2) | observed | Swift source; archive.log |
| Signing | Archive signed "Apple Development", get-task-allow true. Expected for an archive; the App Store export re-signs it. | observed (archive); inferred (export re-sign, from the successful upload) | inspect_signature `ev_f7619f06...49cd` |
| Inventory | 21 piece pages, catalog.json (21 entries), chrome_app.css, chrome_app.js, 79 narration .m4a, two app icon PNGs, Assets.car, PrivacyInfo.xcprivacy. No dead assets: every page is in the catalog and every catalog entry has a page. | observed | REA inventory; script over catalog and folder |

REA coverage limit, stated once: analyze_javascript_application parsed chrome_app.js fully but reports each piece's inline `<script>` as "not analyzed" (21 limitations in `ev_14f637ea...9c79`). The per-piece parameter comparison in §3 therefore uses a static extractor (strings and comments stripped, named numeric assignments and code-line diff), not REA.

## 3. Illusion by illusion: app vs web vs source

"Stimulus params" = every named numeric assignment in the piece's script (count shown as web/app). "Code diff" = code lines that differ once strings and comments are removed. Guide copy differs on all 16 web pieces by design (app copy v5); it is not counted as drift. All 16 web pieces: live bytes equal `public/photon` bytes (§4).

### Gallery (app section "Gallery", web /photon)

| # | Piece | App | Web | Source | Stimulus params | What differs (code) | Verdict | Label |
|---|---|---|---|---|---|---|---|---|
| 1 | kanizsa | yes | yes | = app | 12/12, identical | shell fit box (PhotonApp.fit), reveal haptic at al>0.93 | match | observed |
| 2 | motion-aftereffect | yes | yes | = app | 16/16, identical | fit box; hold() while spinning; haptic after 6 s adaptation | match | observed |
| 3 | afterimage | yes | yes | = app | 8/8; adaptMs resets moved into setMode() | hold(true) at load and during adapt; haptic when leaving adapt after >15 s | match (refactor only; adaptation still 15000 ms, `public/photon/afterimage.html:77`) | observed |
| 4 | scintillating-grid | yes | yes | = app | 7/7, identical | fit box; haptic at tight spacing | match | observed |
| 5 | ebbinghaus | yes | yes | = app | 12/13; app adds an auto-fit loop | app shrinks r0 and gap together until the widest ring fits and recentres (`ios/Photon/Pieces/ebbinghaus.html:71`); ratios kept, absolute size can be smaller on a phone | layout drift, ratios match | observed (code), inferred (ratios kept: r0 and gap scale by the same k) |
| 6 | cornsweet | yes | yes | = app | 12/12, identical | fit box; haptic on cover | match | observed |
| 7 | cafe-wall | yes | yes | = app | 11/11, identical | fit box; haptic when level | match | observed |
| 8 | ponzo | yes | yes | = app | 12/12, identical | fit box; haptic | match | observed |
| 9 | muller-lyer | yes | yes | = app | 14/14, identical | fit box; haptic | match | observed |

### The Book (app section "The Book", web /photon/book)

| # | Piece | App | Web | Source | Stimulus params | What differs (code) | Verdict | Label |
|---|---|---|---|---|---|---|---|---|
| 10 | inverse-problem | yes | yes | = app | 13/13, identical | fit box; haptic when the cube reading locks | match | observed |
| 11 | checker-shadow | yes | yes | = app | 18/18, identical (R_LIGHT 0.78, R_DARK 0.20, 8 by 6 board, A [1,4], B [5,1]) | board sizing: web `T=min(W*0.80/COLS, H*0.60/ROWS)` (`public/photon/book/checker-shadow.html:112`), app `T=min(W*0.80/COLS, H*0.94/(ROWS+1.17))` and vertical centring (`ios/Photon/Pieces/checker-shadow.html:114`) | layout drift (board larger in the app), luminances match | observed |
| 12 | aperture-problem | yes | yes | = app | 20/21; app adds K | app lays out on a 402 pt canvas and scales by K=max(1, min(w,h)/402) (`ios/Photon/Pieces/aperture-problem.html:88`); identical on a phone, enlarged on iPad | scale drift on iPad only | observed (code), inferred (K=1 on phones: min side is at most 402 on current iPhones) |
| 13 | apparent-motion | yes | yes | = app | 12/13 (userT bookkeeping) | haptic when SOA enters the motion band after a user drag | match | observed |
| 14 | troxler-fading | yes | yes | = app | 12/14; app adds K and oy | same 402 pt scale K (`troxler-fading.html:65`); hold() while fixating | scale drift on iPad only | observed / inferred as row 12 |
| 15 | motion-induced-blindness | yes | yes | = app | 12/17; app adds K, clip band, adapt timer | 402 pt scale K (`motion-induced-blindness.html:65`); field clipped to the band between the text; haptic after 6 s of user-driven fixation | scale and clip drift on iPad; spin limit 1.4 and drag gain 0.004 unchanged | observed / inferred as row 12 |
| 16 | change-blindness | yes | yes | = app | 24/26 (oy, lastDragT) | hit test corrected for the fit box offset; haptic | match | observed |

### The Lab (app only; source is the gallery-stage sandbox)

| # | Piece | App | Web | Sandbox | Stimulus params | Sliders (id: min to max, start) | What differs | Verdict | Label |
|---|---|---|---|---|---|---|---|---|---|
| 17 | contrast-sensitivity | yes | no (404) | yes | 29/29, identical | gain, fmin, fmax, dist (30 to 120, 60) identical | code: none; aria-label "centimetres" became "centimeters" | match | observed |
| 18 | gestalt-grouping | yes | no (404) | yes | 10/10, identical | proximity, similarity identical | haptic at the ambiguous point | match | observed |
| 19 | opponent-afterimage | yes | no (404) | yes | 3/3, identical | dur identical | hold() during adaptation; haptic on reveal after a full adaptation | match | observed |
| 20 | receptive-field | yes | no (404) | yes | 46/46, identical | sizeSlider, intSlider, orientSlider identical | haptic | match | observed |
| 21 | trichromatic-mixing | yes | no (404) | yes | 11/11, identical | r starts at **100** in the app, **0** in the sandbox; g, b identical | default start differs; static aria-valuetext still says "0 percent" (`ios/Photon/Pieces/trichromatic-mixing.html:274`), corrected at boot by upd() (`:472`) | drift (start state) | observed |

Lab pieces are not on the web gallery: /photon/contrast-sensitivity and /photon/book/contrast-sensitivity return 404 (observed). D-0742 put "all 16 web pieces" on ciamac.com, so this is the recorded scope, not an omission.

## 4. Live web vs repo

| Check | Result | Label |
|---|---|---|
| 18 pages + chrome.js + chrome.css on photon.ciamac.com vs `public/photon` | all 20 sha256 identical (e.g. afterimage be3576d47221, checker-shadow 23571d77de69, book index b310ad1c97f3); HTTP 200 each | observed |
| Third-party scripts on the web | a.ciamac.com/t.js (+ POST /e ping) and Cloudflare insights beacon (+ /cdn-cgi/rum), the latter injected at the edge, not in the repo | observed (REA capture `ev_1f219ba3...`) |
| `public/photon/book/.claude/` | not deployed (404); `.vercelignore` excludes `.claude/` | observed |
| /privacy vs `public/privacy.html` | identical except Cloudflare Email Obfuscation: the contact address is served as "[email protected]" plus a decoding script | observed |

## 5. Order

| Surface | Order | Label |
|---|---|---|
| App (catalog.json) | Gallery: kanizsa, motion-aftereffect, afterimage, scintillating-grid, ebbinghaus, cornsweet, cafe-wall, ponzo, muller-lyer; Book: inverse-problem, checker-shadow, aperture-problem, apparent-motion, troxler-fading, motion-induced-blindness, change-blindness; Lab: contrast-sensitivity, gestalt-grouping, opponent-afterimage, receptive-field, trichromatic-mixing | observed |
| Web index + book index | the same 16 in the same order | observed |
| BOOK_OF_ILLUSIONS_TOC_v1.md | a different, eight-part spine (e.g. Troxler #2, receptive field #4, contrast sensitivity #5, Cornsweet #7, checker #10, scintillating #11, afterimage #12 "the book's opener", Kanizsa #30); the app follows none of it | observed |

App and web agree with each other. Both disagree with the TOC. The TOC is "a proposal, not a decision" (its line 3) and D-0742 records the series identity, and with it the order, as undecided. Nothing to fix until Cia rules on that question in ciamac-site-stage.

## 6. Source vs TOC drift (superseded, recorded)

| TOC v1 says | App ships | Which governs | Label |
|---|---|---|---|
| Trichromatic mixing CUT (`BOOK_OF_ILLUSIONS_TOC_v1.md:72`) | ships it (Lab) | D-0615 scopes v1 to "the 21 pages", trichromatic included. DECISION_LOG beats a proposal. | observed |
| Ship one of afterimage / opponent-afterimage, "Do not ship both" (`:144`) | ships both | D-0615, as above | observed |
| Checker shadow: "credit and link, never copy the artwork" (`:58`, rule 1 at `:150`) | an original staging (flat 8 by 6 board, draggable vertical shadow band, no cylinder) with no Adelson credit on app or web (0 mentions in either file) | the rule never reached a constitution or the listing (0 mentions in CONSTITUTION_APP_v10, PHOTON_CONSTITUTION_v2, listing v9) | observed (no credit; staging); inferred (original staging meets the rule's first branch) |

## 7. Narration

| Check | Result | Label |
|---|---|---|
| Files | 79 = 74 guide steps on the 16 guided pieces + 5 Lab intros; steps per piece equal files per piece, numbered 0..n-1 with no gaps | observed |
| Orphans | none: every audio slug is in the catalog | observed |
| Text | all 74 step texts equal `ios/tools/narration_manifest.json` text; all 5 Lab intro texts equal the page's `.instruction` block exactly | observed |

## 8. App Store risks, ranked

1. **Guideline 4.2 (minimum functionality: a web-view wrapper).** The pieces are local HTML in WKWebView. Mitigated by the native shell (SwiftUI library, native narration with bundled audio, haptics, share card, accessibility hooks) and by Apple's approval of 1.0 (4) on the same architecture (D-0780). Low for an update; it would only come back if a reviewer re-reads the whole app. Inferred.
2. **Privacy policy contact shows as "[email protected]" without JavaScript** (Cloudflare Email Obfuscation on /privacy). A reviewer or crawler that does not run JS sees no contact address. Low. Observed.
3. **Checker-shadow without credit.** Not a review rule (the staging is original), but App Review 5.2 complaints come from rights holders, and the TOC's own rule asks for a credit. Low. Inferred.
4. **Static aria-valuetext mismatch on trichromatic red** ("0 percent" in markup, value 100). Fixed at boot, so VoiceOver reads "100 percent" once JS runs. Accessibility nit, not a review risk. Observed.
5. **Archive is development-signed with get-task-allow.** Normal; the App Store export re-signs it, and the upload succeeded. Informational. Observed.

No finding for: privacy manifest vs imports (consistent), usage strings (none needed), encryption flag, orientations, toolchain (same as approved build), debug-only code (gated), network use in the app (none).

## 9. Suggested fixes (none applied; each is the active session's or Cia's call)

| # | Fix | Where | Why |
|---|---|---|---|
| F1 | Set the red slider's markup to `aria-valuetext="100 percent"` to match `value="100"` | `ios/Photon/Pieces/trichromatic-mixing.html:274` | markup and value agree before JS runs |
| F2 | Turn off Cloudflare Email Obfuscation for photon.ciamac.com, or wrap the address in `<!--email_off-->...<!--/email_off-->` | `public/privacy.html:51` (or the Cloudflare dashboard) | contact address readable without JS |
| F3 | Add a one-line credit ("After Edward H. Adelson's checker-shadow illusion, 1995") to the thesis block, app and web | `ios/Photon/Pieces/checker-shadow.html:57`, `public/photon/book/checker-shadow.html:56` | the TOC's own originality rule; courtesy to the rights holder |
| F4 | Write `BOOK_OF_ILLUSIONS_TOC_v2.md` (do not edit v1) that records D-0615: trichromatic and opponent-afterimage ship; the CUT and DEDUP lines are superseded | new file | a later session reading v1 would otherwise "fix" the app by cutting two shipped pieces |
| F5 | Decide whether iPad should magnify aperture, Troxler and MIB (K scale) while the web leaves them at native size; no change if intended | `aperture-problem.html:88`, `troxler-fading.html:65`, `motion-induced-blindness.html:65` | the only stimulus-scale drift found between app and web |
| F6 | Decide whether trichromatic should open with red at 100 (app) or 0 (sandbox); align the sandbox or note the choice | `ios/Photon/Pieces/trichromatic-mixing.html:273` | the only start-state drift found |

## 10. Unknowns

- App Store Connect processing state of 1.0.1 (5): not checked (outside this audit).
- Runtime behaviour on device (VoiceOver, iPad landscape) was not exercised here; this audit is static plus one web capture.
- REA did not analyze inline piece scripts; parameter equality rests on the static extractor, which catches named numeric assignments and code-line differences, not values computed at runtime.

## 11. Fix status (added 2026-10-15, same day, on Cia's "do the fixes")

| # | Status | Detail |
|---|---|---|
| F1 | applied, not shipped | `ios/Photon/Pieces/trichromatic-mixing.html:274` now reads `aria-valuetext="100 percent"`. verify_piece.mjs: pass, 0 findings. Reaches users only in a new build (1.0.1 (5) is already uploaded without it). |
| F2 | applied, not live | `public/privacy.html:51` wraps the address in `<!--email_off-->...<!--/email_off-->`. Takes effect only after a site deploy (`vercel deploy --prod --yes`, Cia's go). |
| F3 | applied, not shipped or live | Credit line "After Edward H. Adelson's checker-shadow illusion (1995)." added as `#thesis .credit` in `ios/Photon/Pieces/checker-shadow.html` and `public/photon/book/checker-shadow.html`. App piece verify_piece.mjs: pass, 0 findings. The web page's layout with the extra line was not checked in a browser. |
| F4 | applied | `BOOK_OF_ILLUSIONS_TOC_v2.md` written from v1 (v1 unchanged): status only; spine and order untouched. |
| F5 | not applied | A decision, not a fix: whether iPad should magnify aperture, Troxler and MIB. |
| F6 | not applied | A decision, not a fix: whether trichromatic opens with red at 100 or 0. |
