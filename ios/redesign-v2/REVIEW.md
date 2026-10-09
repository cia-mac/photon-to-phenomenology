# Book of Illusions: independent audit and refinement v2

Date: 2026-10-06. Requested after Ciamac switched to Astra and asked to continue auditing and improving the app.

## Audit judgment

The first redesign made the concept visible but let the opening swallow the phone screen. It also reused generic drawings across unrelated experiments, which misrepresented their stimuli. Its iPad layout stretched the opening illustration into a wide empty card and compressed the collection into five narrow columns. A successful compile and one opening screenshot did not establish that filters, navigation or text resizing worked.

## Changes

- Reworked the native library entrance so the first gallery row is visible on a normal-size phone. The triangle is built from three notched discs and the toggle turns the notches, matching the premise of the original experiment. The iPad has a horizontal feature and a three-column gallery.
- Replaced generic code-drawn cards with 21 stills rendered from the bundled HTML experiments. The original source is untouched. `render-previews.mjs` blocks network access, captures the original page canvas/SVG or stage in a representative state, and fits the rendered pixels into each native asset without stretching. `preview-provenance.json` records each source hash and any page errors. Every entry reported zero page errors.
- Kept native navigation and the existing full experiments, guide, narration and haptics. Updated the gallery filters to preserve position near the selected results. Added accessibility labels and selected-filter traits.

Changed app source: `ios/Photon/LibraryView.swift` and 21 `ios/Photon/Assets.xcassets/preview-*.imageset` assets. The prior v1 source is `LibraryView.before.swift` in this folder. No project signing, app metadata, experiment HTML, git, or release configuration changes.

## Verification

- Xcode Debug simulator build: passed. Log: `build.log`.
- Native simulator interaction on iPhone 18 Pro: triangle toggle and restoration; All 21, Gallery 9, The Book 7, The Lab 5; opening and returning from a lab experiment with filter preserved; opening the first gallery experiment and moving to the next. Accessibility identifiers and counts verified through Device Hub.
- Native screenshots inspected: `home-phone.png`, `home-small-phone.png` (iPhone 17e), `home-ipad.png` (iPad Pro 13-inch), and `home-large-text.png` (iPhone 18 Pro at Accessibility Extra Large). The accessibility size was restored to its original Large setting after capture.
- Preview contact sheet: `previews.png`. All 21 source-derived previews present.

Limits: iPad landscape and the full experiment interactions were not retested beyond representative navigation. No physical iPhone installation or App Store submission. The thumbnails are still images from a particular state of each interactive piece; they are navigation previews, not calibrated stimuli or a substitute for trying the experiment.

## Physical iPhone installation, 2026-10-06

Ciamac asked to deploy after the redesign. Device identified by CoreDevice as "iPhone Ciamac", physical iPhone 15, UDID 00008120-000A1C810A44A01E. Built Release for that destination using existing Apple Development identity and wildcard development provisioning profile; Xcode reported BUILD SUCCEEDED. Installed the same `com.ciamac.illusions` bundle ID using devicectl and launched it successfully. `phone-installed.png` was captured directly from the physical device after launch and visibly shows the redesigned home, feature, filters, and first two gallery cards. iPhone Mirroring remained interrupted, so interaction was not re-tested on the physical screen; the on-device screenshot establishes visual launch. This was a local development installation, not an App Store submission or website deployment.
