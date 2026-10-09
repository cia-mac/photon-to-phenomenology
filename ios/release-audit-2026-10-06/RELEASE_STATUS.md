# Book of Illusions release status — 2026-10-06

## Verified

- Current `LibraryView.swift` includes a visible, accessible **Privacy & support** link to `https://photon.ciamac.com/privacy`. It was opened from the iPad simulator and displayed the published policy.
- Current-source Release archive succeeded: `Illusions.xcarchive`, bundle ID `com.ciamac.illusions`, version 1.0 (1). The archive is **unsigned** and cannot be uploaded as-is.
- Current-source iOS Simulator Debug build and physical iPhone Release build succeeded. The Release build was installed and launched on the connected iPhone 15 with an Apple Development identity. Physical interaction, haptics, narration, and screen-awake behavior remain unverified.
- Eight screenshots each for iPhone 6.9-inch (1320 × 2868) and iPad 13-inch (2064 × 2752) are staged in `store/`. The new library screenshots show the redesigned home and privacy link; the seven experiment screenshots per device size are from unchanged experiment pages.
- iPad portrait home, iPad landscape home, Lab filter and a landscape Lab detail were visually checked in the simulator. The privacy link opened the live policy. Earlier redesign-v2 review covers smaller iPhone, extra-large text, filters, card navigation, and previous/next in simulator.
- `APP_STORE_LISTING_DRAFT_v3.md` now has the privacy/support URLs and describes the external browser link accurately.

## Still required for App Store release

1. Ciamac signs into Xcode's Apple account for team `3AUT8DTWP3`. Xcode showed **No Accounts**. Do not handle credentials or Keychain in this lane.
2. Create a new distribution-signed archive and export an App Store IPA with that account; verify signing and provisioning. The current unsigned archive is only a reproducible local build.
3. Ciamac signs into App Store Connect. The open Connect page remains at sign-in, so the app record, bundle ID registration, pricing, age questionnaire, privacy answers, and upload status are unverified. Do not claim the listing is live.
4. With the iPhone unlocked and idle, complete hands-on navigation, narration, haptics, and screen-awake checks. The latest build is installed and launched, but other phone activity prevented an undisturbed pass.
5. Compare screenshots with the final signed binary, enter the listing, upload the build, and review the resulting App Store Connect state. Public App Review submission/release needs Ciamac's specific authorization.

No App Store upload or public release was performed. No git, canon, credential, or media moves/deletes were performed.
