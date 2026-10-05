# Photon app: App Store listing draft v2

Written 2026-10-04 (v2; v1 kept). v2 adds the narration. Every line below is a proposal for Cia to change. Nothing here has been entered in App Store Connect.

## Decisions only Cia can make

| Item | Working value | Note |
| --- | --- | --- |
| App name (30 characters max) | Photon | Name availability can only be confirmed in App Store Connect. Fallback: "Photon: Visual Illusions". |
| Price | Free | A showpiece, no ads, no purchases, no accounts. |
| Icon | Candidate A, the Kanizsa triangle | B (spiral) and C (Ponzo rails) are in `ios/icon_candidates/`. |
| Bundle id | com.ciamac.photon | Registering it touches the Apple developer account. |

## Listing text

**Subtitle (30 max):** Vision is construction

**Promotional text (170 max):** Twenty-one touch demonstrations of what your visual system builds that is not on the screen. Drag, stare, look away. Narrated, and mutable. Works offline.

**Description:**

Your eyes do not record the world. They build it.

Photon is twenty-one small, touchable demonstrations of that idea. Each one shows you a physical stimulus and lets your own visual system do the rest. A triangle appears where nothing is drawn. Two equal bars look unequal. A colour shows up that no screen displayed. Dots vanish while you stare at them.

Every piece opens with a short guided walk, then hands it over to you: drag the notches until the triangle snaps into view, slide the bar across the seam, hold your gaze on the cross and watch the ring leave. A readout beside each figure shows what is physically on the screen, so you can see the gap between the stimulus and what you perceive.

Five lab pages go further: contrast sensitivity, Gestalt grouping, opponent afterimages, a receptive field, and additive colour mixing, each with controls you can turn.

A voice reads each guide aloud, and you can mute it with one tap.

Made for iPhone and iPad. Works offline. No accounts, no ads, no tracking, nothing collected.

Concepts follow Stephen Palmer's "Vision Science: Photons to Phenomenology" (MIT Press, 1999). Photon is an independent project and is not affiliated with or endorsed by the author or publisher.

**Keywords (100 max):** optical illusion,vision,perception,neuroscience,psychology,visual science,brain,eye,afterimage

**Primary category:** Education. **Secondary:** Entertainment (or Reference).

**Age rating:** 4+. No objectionable content, no web access, no user content.

**Support URL / Marketing URL:** needs an address. photon.ciamac.com exists; a privacy policy page does not (see below).

**Copyright:** 2026 Ciamac Parhizi

## Privacy

- App Privacy answers: Data Not Collected; no tracking.
- The app contains no network code. The page bundle has no external URL, which the measuring script checks on every piece.
- A privacy manifest (`Photon/PrivacyInfo.xcprivacy`) is bundled: no tracking, no collected data. It declares one restricted API, UserDefaults (reason CA92.1), used only to remember whether narration is muted.
- **Needs doing, outward-facing:** App Store Connect requires a privacy policy URL. A one-page policy on photon.ciamac.com would be a deploy, so it waits for Cia's go.

## Notes for App Review

Photon is not a web wrapper around a website. All 21 interactive pieces are bundled and run offline in the app. The native app adds: a library of the pieces, native previous and next navigation, haptic feedback at the moment an illusion appears or breaks, keeping the screen awake during the stare-and-wait exercises (the system sleep timer is released when the exercise ends), and iPad layouts. Each piece's guide is read aloud with the system speech voice (a mute button is always on screen; the app starts muted if VoiceOver is on, so the two voices never overlap). There is no login and no purchase. Navigation away from the bundled pages is blocked.

## Things to know before submitting

- **Flashing content:** the apparent-motion piece blinks two small dots, adjustable from about 4 to 14 flashes per second, and change blindness flashes a grid of tiles. The flashing area in each is small, well under the general flash-safety area threshold, but a short line in the description or on first launch is a reasonable precaution. Cia's call.
- **Stare-and-wait pieces** (afterimage, motion aftereffect, Troxler fading, motion-induced blindness) rely on holding the screen awake. The message reaches the native side (checked); the effect itself needs a real iPhone to confirm.
- **Real device:** haptics and screen-hold have not been tried on hardware.
- **Screenshots:** drafts are generated at 1320 by 2868 (iPhone 6.9 inch) and 2064 by 2752 (iPad 13 inch) in `ios/build/store/`. Plain frames, no captions.
- **The voice is the system speech voice for now.** A recorded voice can replace it line by line: drop `<piece>-<step>.m4a` files into `Pieces/audio/` and the app plays them instead. The shorts re-voicing session is choosing a voice for the videos; the same voice could narrate the app.
