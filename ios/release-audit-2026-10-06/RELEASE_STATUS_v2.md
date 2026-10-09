# Book of Illusions release status v2 (2026-10-06, late)

Independent audit of the Codex handoff in `RELEASE_STATUS.md` (kept). Everything below was checked in this session unless it says otherwise.

## Passed

- **Archive is current and complete.** `claude-final/Illusions.xcarchive`, Release, `com.ciamac.illusions`, version 1.0 (1), minimum iOS 18.0. Its `Pieces/` folder is byte-identical to `ios/Photon/Pieces` (21 pages plus catalog and chrome). `Assets.car` holds 21 `preview-*` images, the icon and the accent colour. The binary carries the privacy URL and none of the debug test hooks. `codesign --verify --deep --strict` passes. The Codex archive (`Illusions.xcarchive`, unsigned) also matched the sources it was built from.
- **Catalog:** 21 entries (Gallery 9, The Book 7, The Lab 5); every entry has its page and its preview image.
- **Piece verifier:** `tools/verify_all.sh` at six sizes (phone, pad, padL, phone15, phoneSE, phoneMax): failures 0 of 21.
- **Privacy link:** `LibraryView.swift` opens `https://photon.ciamac.com/privacy` in the system browser, 44 pt tall, with an accessibility hint. The page answers 200 and its text matches what the app does.
- **Navigation (iPhone 17e simulator, by tapping):** filter to The Lab (count reads 5), open a card, next piece, mute (icon and state change), back to the library.
- **Accessibility:** the library reflows to one column at accessibility-extra-large text with nothing clipped. Buttons carry labels. VoiceOver itself cannot be run in the simulator and was not tried.
- **Narration, haptics, screen-awake (simulator log):** Troxler fading sent `hold on`, then four `say` lines each answered by `done`, and a haptic per step. Log: `claude-verify/phone-log.txt`.
- **Listing draft:** promotional text 154 of 170, keywords 94 of 100, name 26 of 30, subtitle 23 of 30. "Twenty-one" and "five lab pages" match the catalog. App icon is 1024 square with no alpha.

## Changed

1. `Photon/LibraryView.swift`: scrolled content showed through behind the clock (the featured card's last row sat under the time after choosing a filter). A ground-coloured cover now sits over the top safe area. Checked on the simulator.
2. `Photon/PieceScreen.swift`: the back button's VoiceOver label said "All phenomena", a word the redesigned library no longer uses. Now "All experiments".
3. `Photon/Narrator.swift`: debug-only launch flag `-silentVoice YES` (keeps the guide timing, makes no sound) so screenshots can be taken quietly. Not in Release.
4. **Screenshots retaken:** `store-v2/`, 16 files. The 14 experiment shots in `store/` were taken before the narration button existed, so they did not show the shipping app. Sizes 1320 by 2868 and 2064 by 2752. Script: `claude-verify/shoot_store_v2.sh`.
5. `APP_STORE_LISTING_DRAFT_v4.md` (v3 kept): screenshot and real-device notes corrected; listing text unchanged.

## Not done, and why

- **App Store IPA: blocked.** `xcodebuild -exportArchive` failed again with "No Accounts" and "No profiles for 'com.ciamac.illusions'" (`claude-final/export.log`). The new archive is signed with the Apple Development identity only. Nothing was worked around.
- **Hands-on iPhone pass: blocked.** The iPhone 15 was locked for the whole session, so nothing could be launched on it. The final Release build is installed on it. Haptics, the voice and the screen staying awake are still unverified on hardware.

## Findings left for Cia

- Screenshots are PNGs with an (all opaque) alpha channel. If App Store Connect refuses them, flatten to RGB; nothing else needs to change.
- Ebbinghaus on iPad portrait: in the guide's "now they look equal" step the right-hand ring group runs off the right edge. Cosmetic, one transient step, not touched.
- Narration uses the playback audio category, so it speaks even when the ringer switch is silent. The mute button is the control. A choice, not a bug.
- `project.yml` says MARKETING_VERSION 0.1.0 while `Info.plist` ships 1.0. The plist wins in the build. Tidy before the next version.
- The iPad library screenshot shows the app name in the system status bar (iPadOS windowing). It is real system chrome.

## What Cia must do

1. Xcode, Settings, Accounts: add the Apple ID that owns team 3AUT8DTWP3.
2. Say so, and the export is rerun: `xcodebuild -exportArchive -archivePath release-audit-2026-10-06/claude-final/Illusions.xcarchive -exportPath release-audit-2026-10-06/claude-final/export -exportOptionsPlist ExportOptions_AppStore.plist -allowProvisioningUpdates` (from `ios/`).
3. Unlock the iPhone and try a stare piece by hand: voice, haptic at the reveal, screen stays on.
4. App Store Connect record, upload and submission each remain his go.

No upload, submission, publish, media move or git operation was performed.
