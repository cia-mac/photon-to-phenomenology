# Book of Illusions: home redesign v1

Requested by Ciamac on 2026-10-05. Local app redesign, no publishing or physical-device installation.

The opening now demonstrates the premise before presenting a catalog. A Kanizsa-style triangle can be broken by restoring the three cut circles. The native gallery uses illustrated cards, an adaptive grid, and filters for All, Gallery, The Book, and The Lab. Charcoal, warm paper, and a lime accent retain the quiet character while giving controls a clear visual role.

Changed: ios/Photon/LibraryView.swift only. Original preserved here as LibraryView.original.swift. No changes to bundled experiment HTML, catalog, narration, timing, haptics, signing, or app metadata. No git operations.

Accessibility: system text styles, wrapping card titles, one-column layout at accessibility text sizes, 44-point filter targets, 48-point reveal target, descriptive experiment links, selected filter semantics. Static drawings avoid decorative motion. Gallery drawings are navigation illustrations rather than calibrated experiment stimuli.

Review the opening on a phone, the full catalog scroll, each section filter, triangle toggle, and navigation into and out of a full experiment. This version redesigns discovery; existing experiment presentation is preserved pending an actual experience review.

## Verification

Xcode Debug build for iPhone 17 simulator passed on 2026-10-06. Installed and launched in that simulator; home.png is an actual capture of the native app. Opening layout visually inspected: heading, Kanizsa drawing, reveal action, full-experiment link, and gallery heading visible without horizontal clipping. Filters and all experiment navigation have not been exercised manually. Physical-device installation and App Store assets remain pending. The sandbox initially blocked Swift macro plugins and CoreSimulator; the same build succeeded with approved local Xcode access.
