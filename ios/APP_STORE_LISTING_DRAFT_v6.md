# Ciamac's Optical Illusions: App Store listing draft v6

Written 2026-10-08 (v6; v1 to v5 kept). v6 names the app **Ciamac's Optical Illusions** (D-0695, after a Codex consult; supersedes v5's App of Illusions). Listing text otherwise unchanged from v4. Every line is a proposal for Cia to change. Nothing here has been entered in App Store Connect.

## Decided, 2026-10-05 ("go" to the recommendation)

| Item | Value | Note |
| --- | --- | --- |
| App Store name (30 max) | Ciamac's Optical Illusions | 26 characters. Chosen 2026-10-08 (D-0695). Availability can only be confirmed in App Store Connect. Fallback if taken: Ciamac's Book of Illusions (26). |
| Home screen name | Illusions | The full name is too long to fit under an icon. |
| Subtitle (30 max) | Illusions you can touch | 23 characters. |
| Bundle id | com.ciamac.illusions | Registration in App Store Connect has not been verified. Permanent once created there. |

## Still open

| Item | Working value | Note |
| --- | --- | --- |
| Price | Free | A showpiece, no ads, no purchases, no accounts. |
| Icon | Candidate A, the Kanizsa triangle | B (spiral) and C (Ponzo rails) are in `ios/icon_candidates/`. |

## Listing text

**Subtitle (30 max):** Illusions you can touch

**Promotional text (170 max):** Twenty-one touch demonstrations of what your visual system builds that is not on the screen. Drag, stare, look away. Narrated, and mutable. Works offline.

**Description:**

Your eyes do not record the world. They build it.

This app is twenty-one small, touchable demonstrations of that idea. Each one shows you a physical stimulus and lets your own visual system do the rest. A triangle appears where nothing is drawn. Two equal bars look unequal. A colour shows up that no screen displayed. Dots vanish while you stare at them.

Every piece opens with a short guided walk, then hands it over to you: drag the notches until the triangle snaps into view, slide the bar across the seam, hold your gaze on the cross and watch the ring leave. A readout beside each figure shows what is physically on the screen, so you can see the gap between the stimulus and what you perceive.

Five lab pages go further: contrast sensitivity, Gestalt grouping, opponent afterimages, a receptive field, and additive colour mixing, each with controls you can turn.

A voice reads each guide aloud, and you can mute it with one tap.

Made for iPhone and iPad. Works offline. No accounts, no ads, no tracking, nothing collected.

Concepts follow Stephen Palmer's "Vision Science: Photons to Phenomenology" (MIT Press, 1999). This app is an independent project and is not affiliated with or endorsed by the author or publisher.

**Keywords (100 max):** optical illusion,vision,perception,neuroscience,psychology,visual science,brain,eye,afterimage

**Primary category:** Education. **Secondary:** Entertainment (or Reference).

**Proposed age rating:** 4+, subject to the App Store Connect questionnaire. No user-generated content or in-app browsing; the privacy and support link opens the system browser.

**Support URL:** https://photon.ciamac.com/privacy (includes the support email). **Marketing URL:** https://photon.ciamac.com/photon.

**Copyright:** 2026 Ciamac Parhizi

## Privacy

- App Privacy answers: Data Not Collected; no tracking.
- The 21 experiment pages are bundled and work offline. They have no external URL, which the measuring script checks on every piece. The native privacy and support link opens the published page in the system browser.
- A privacy manifest (`Photon/PrivacyInfo.xcprivacy`) is bundled: no tracking, no collected data. It declares one restricted API, UserDefaults (reason CA92.1), used only to remember whether narration is muted.
- **Privacy policy URL:** https://photon.ciamac.com/privacy. The page is published; the native library now has a "Privacy & support" link to it.

## Notes for App Review

This app is not a web wrapper around a website. All 21 interactive pieces are bundled and run offline in the app. The native app adds: a library of the pieces, native previous and next navigation, haptic feedback at the moment an illusion appears or breaks, keeping the screen awake during the stare-and-wait exercises (the system sleep timer is released when the exercise ends), and iPad layouts. Each piece's guide is read aloud with the system speech voice (a mute button is always on screen; the app starts muted if VoiceOver is on, so the two voices never overlap). There is no login and no purchase. Navigation away from the bundled pages is blocked.

## Things to know before submitting

- **Flashing content:** the apparent-motion piece blinks two small dots, adjustable from about 4 to 14 flashes per second, and change blindness flashes a grid of tiles. The flashing area in each is small, well under the general flash-safety area threshold, but a short line in the description or on first launch is a reasonable precaution. Cia's call.
- **Stare-and-wait pieces** (afterimage, motion aftereffect, Troxler fading, motion-induced blindness) rely on holding the screen awake. The message reaches the native side (checked); the effect itself needs a real iPhone to confirm.
- **Real device:** haptics, the voice and the screen staying awake have still not been tried by hand on the iPhone. On 2026-10-06 the phone was locked, so nothing could be launched on it. In the simulator the pieces do send the hold, haptic and narration messages to the app (log in `ios/release-audit-2026-10-06/claude-verify/phone-log.txt`).
- **Screenshots:** use `ios/release-audit-2026-10-06/store-v3/`, eight per device size at 1320 by 2868 (iPhone 6.9 inch) and 2064 by 2752 (iPad 13 inch), all taken from the current build on 2026-10-06. The older set in `store/` is superseded: its 14 experiment shots were taken before the narration button existed, so they do not show the app as it ships. The library shot shows the simulator status bar at 9:41.
- **The voice is the system speech voice for now.** A recorded voice can replace it line by line: drop `<piece>-<step>.m4a` files into `Pieces/audio/` and the app plays them instead. The shorts re-voicing session is choosing a voice for the videos; the same voice could narrate the app.

- **Keywords and the name:** the name now holds "optical" and "illusions", so the keyword "optical illusion" repeats it. Swapping that slot for another term (for example "visual illusion" or "mind tricks") would use the 100 characters better. Cia's call.
