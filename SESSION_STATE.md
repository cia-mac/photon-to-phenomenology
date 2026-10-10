# SESSION_STATE — Photon to Phenomenology

Last Updated: 2026-08-05 (shorts engine + 9 pieces staged; release-gated)

Interactive vision-science series after Stephen Palmer, *Vision Science: Photons
to Phenomenology* (MIT Press, 1999). Repo: `~/Developer/photon-to-phenomenology`.

---

## 2026-10-10 EXIT - Apple Vision Pro availability switched off (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, turn off Vision Pro", after he signed in to App Store Connect again (Chrome had been signed out).

### Done
- [observed] App Store Connect, Pricing and Availability, read after a reload: "Make this app available on Apple Vision Pro" unticked; Apple silicon Mac still unticked; page header still shows "1.0 Waiting for Review".

### Previous pending
- done: Apple Vision Pro availability.
- carried: Apple's review; manual release on Cia's go.
- carried: Cia's ear on the Heart voice; feel of haptics; screen staying lit.
- carried: VoiceOver never run against the pieces; British spelling in the description.
- carried: build 2 held locally; the other session's shorts work stays uncommitted.

### Pending / open
- ios/APP_STORE_LISTING_DRAFT_v9.md still says Vision Pro availability is on; this block supersedes that line.
- Uncommitted: SESSION_STATE.md.

### Operational notes
- App Store Connect signed Chrome out twice within a day; expect a fresh sign-in each session.

### Durable thought
none, reason: single setting.

### Repo state

Computed by `exit-stamp` at 2026-10-10T17:38:22-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `136cd31 Build 2 prep: fix the Ebbinghaus layout, align version numbers` (committed 2026-10-10)
- tree: **21 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished; waiting on Apple and on Cia.

---

## 2026-10-10 EXIT - build 2 prepared (not uploaded); promotional text fixed; Mac availability off; LANES row updated (OPEN)

Snapshot before this block: none (append only).
On Cia's "do all", after the list of four things the session could start.

### Done
- [observed] ios/Photon/Pieces/ebbinghaus.html: the fit now allows for the right ring group at its widest (rings matched), which used to run off the right edge. Seen fitting in both states on the iPhone 17 (6.3 inch), iPhone 17e and iPad Pro 13 portrait simulators: ios/release-audit-2026-10-06/claude-verify/ebbfix/sheet.png. tools/verify_piece.mjs ebbinghaus: 0 findings.
- [observed] Versions aligned: project.yml and Photon.xcodeproj now say MARKETING_VERSION 1.0 and CURRENT_PROJECT_VERSION 2; Info.plist CFBundleVersion 2.
- [observed] Build 2 archived, not uploaded: ios/release-audit-2026-10-06/claude-final-4-build2/Illusions.xcarchive, 1.0 (2), 21 pages and 79 audio files identical to source, no debug hooks, codesign verify passes. Ignored by git.
- [observed] App Store Connect, read back after reloads: promotional text now "...Narrated, with a mute button. Works offline." (161 characters; the suggested wording, applied under "do all"); Pricing and Availability: Apple silicon Mac "Make this app available" unticked. Status still Waiting for Review; release still MANUAL.
- [observed] ~/Developer/LANES.md Photon row extended with the iOS app, its ids, release state, the API-key upload route and the public-repo caution; committed alone (other sessions' edits in that repo left untouched) and pushed.
- [observed] ios/APP_STORE_LISTING_DRAFT_v9.md written.

### Previous pending
- done: promotional text; Mac availability; Ebbinghaus layout; version mismatch; LANES row.
- carried: Apple's review; manual release on Cia's go.
- carried: Cia's ear on the Heart voice; feel of haptics; screen staying lit.
- carried: VoiceOver never run against the pieces; British spelling in the description.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Apple Vision Pro availability is still on (Apple's default) and the app has never been run there; not in the approved list, left for Cia.
- Build 2 goes up only if Apple rejects build 1 or Cia wants the Ebbinghaus fix shipped; the phone still carries build 1.
- The two Ebbinghaus store screenshots show build 1's slightly larger figure; they match the build in review.
- Uncommitted in this repo: SESSION_STATE.md, ebbinghaus.html, project.yml, Photon.xcodeproj/project.pbxproj, Info.plist, listing v9. Commit on Cia's word.

### Operational notes
- App Store Connect pages render below-the-fold controls lazily; scroll before querying checkboxes.
- A click by element ref can miss a textarea's focus; click by coordinate and confirm document.activeElement before typing.

### Durable thought
none, reason: routine fixes.

### Repo state

Computed by `exit-stamp` at 2026-10-10T17:24:24-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `a2f1beb SESSION_STATE: Ciamac's Optical Illusions 1.0 (1) submitted to App Review` (committed 2026-10-10)
- tree: **27 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished the four items; commit of this repo and anything further are Cia's go.

---

## 2026-10-10 EXIT - first on-device evidence for narration, haptics and screen-awake messages; list of what is still worth doing (OPEN)

Snapshot before this block: none (append only).
Cia asked "really? nothing to do?". The session had said nothing was left; that was too quick.

### Done
- [observed] iPhone 15, unlocked, debug build of the current source launched on Troxler fading with the silent flag (ios/release-audit-2026-10-06/claude-verify/device-console-troxler-2.txt): hold on at load; four lines each go say, file, done from the bundled recordings; a haptic message per step. This is the first run on hardware. It shows the messages arrive and the recordings play to completion on the device; it does not show that the haptic is felt, that the voice sounds right, or that the display stays lit.
- [observed] The submitted Release build (claude-final-3) was reinstalled on the phone afterwards (devicectl "App installed").

### Previous pending
- carried: Apple's review; manual release on Cia's go.
- carried: Cia's ear on the Heart voice; feel of haptics; screen staying lit.
- carried: Apple silicon Mac availability default; the other session's shorts work.

### Pending / open
- Promotional text says "Narrated, and mutable": "mutable" means changeable, not "can be muted". Editable any time without review; wording is Cia's.
- iPhone app offered on Apple silicon Macs by default and never run there.
- Ebbinghaus ring group runs off the right edge in the guide's "equal" step on iPad portrait and iPhone 6.3 inch; fix belongs in build 2.
- VoiceOver never run against the pieces; the pages are canvas drawings.
- Description uses British spelling (colour) under an English (U.S.) listing.
- LANES.md row for Photon does not mention the iOS app or its release state.
- project.yml MARKETING_VERSION 0.1.0 disagrees with Info.plist 1.0.
- Uncommitted: SESSION_STATE.md. Canon repo local copy is behind its remote.

### Operational notes
- devicectl process launch --console works when the phone is unlocked; launch arguments go after "--".

### Durable thought
none, reason: device evidence recorded above.

### Repo state

Computed by `exit-stamp` at 2026-10-10T17:12:29-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `a2f1beb SESSION_STATE: Ciamac's Optical Illusions 1.0 (1) submitted to App Review` (committed 2026-10-10)
- tree: **20 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
reported the open list to Cia; next steps are his choice.

---

## 2026-10-10 EXIT - Ciamac's Optical Illusions 1.0 (1) submitted to App Review (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, submit for review" and "go, use the same contact". Submitted about 10:01 EDT. D-0719.

### Done
- [observed] App Review contact: first name, last name, phone and email copied from Cia's other app record in the same account, inside the browser, without the values entering this session's output; version page after reload shows the four fields filled (6, 7, 12 and 12 characters), notes 735 characters, sign-in required off, release MANUAL, build 1 attached.
- [observed] Add for Review opened a draft submission listing "iOS App 1.0, 1.0 (1)". Submit for Review returned "1 Item Submitted. It can take up to 48 hours to be reviewed." The app's status reads "1.0 Waiting for Review". Screenshot: ios/release-audit-2026-10-06/asc_submitted_2026-10-10.jpg.
- [observed] D-0719 appended via canon-append.

### Previous pending
- done: App Review contact; submit for review.
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake. Now a risk on a submitted build, not a gate.
- carried: decide whether to offer the app on Apple silicon Macs (default yes).
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Apple's review, up to 48 hours; the result goes to Cia's email.
- On approval: release is MANUAL, so releasing the app is a separate go from Cia.
- If rejected or if the voice is wrong: build 2 (bump CFBundleVersion), new archive, upload with the API-key route, resubmit.
- Uncommitted: SESSION_STATE.md, two App Store Connect screenshots. Canon repo: D-0719 committed locally, not pushed.

### Operational notes
- Contact details can be carried between app records with sessionStorage plus a native value setter and input event; the Save button enabling confirms React took the values.

### Durable thought
none, reason: milestone recorded in D-0719.

### Repo state

Computed by `exit-stamp` at 2026-10-10T10:02:44-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `c1dcf5b App Store Connect: record, upload, listing and forms for Ciamac's Optical Illusions` (committed 2026-10-10)
- tree: **21 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished: submitted; waiting on Apple.

---

## IN FLIGHT 2026-10-10 - about to submit version 1.0 (build 1) for App Review

### Done
- [observed] Cia, in chat: "go, submit for review".
- [observed] State before: build 1 attached, listing, screenshots, privacy (published), age rating 4+, price free, content rights set, release type MANUAL. App Review contact name, phone and email are empty and required.
- [proposed] Next: check the contact fields; if still empty, they are Cia's personal data and need his values or his say-so before entry. Then Add for Review and Submit. With MANUAL release, approval does not put the app live.
- [observed] Not verified by Cia before this go, as far as this session knows: how the Heart voice sounds, haptics, screen staying awake on the phone.

### Previous pending
- carried: all items of the 2026-10-10 build EXIT block below.

### Pending / open
- Outcome of the submission.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-10 EXIT - build 1 attached to version 1.0; content rights set (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, attach build 1 and set content rights". Both saved and re-read after reloads. Nothing submitted.

### Done
- [observed] App Information, after reload: Content Rights reads "No, this app does not contain, show, or access third-party content."
- [observed] Version page, after reload: Build section lists build 1, version 1.0, no App Clip, Included Assets: App Icon. Release type still MANUAL. The "Add for Review" button is now enabled; it was not clicked.
- [observed] Apps list now shows the Kanizsa icon beside "Ciamac's Optical Illusions, iOS 1.0 Prepare for Submission".

### Previous pending
- done: content rights; attach build 1.
- carried: App Review contact name, phone and email; submit for review.
- carried: decide whether to offer the app on Apple silicon Macs (default yes).
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Before submission: App Review contact details (Cia's). Then Add for Review and Submit, each on Cia's go.
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist, listing v8, store-v3-63, store-v3-rgb, App Store Connect screenshots. Canon repo: D-0708 not pushed.

### Operational notes
- none new

### Durable thought
none, reason: routine form entry.

### Repo state

Computed by `exit-stamp` at 2026-10-10T09:36:12-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **25 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished; contact details and submission are Cia's go.

---

## 2026-10-10 EXIT - App Privacy answers published (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, publish the privacy answers".

### Done
- [observed] App Store Connect, App Privacy, read after a reload: "Published a few seconds ago by Ciamac Parhizi"; Privacy Policy URL https://photon.ciamac.com/privacy; Product Page Preview "Data Not Collected"; no Publish button remains. The page read "Data Not Collected" immediately before the click.
- [observed] The publish dialog's attestation (answers accurate, compliant with the guidelines and law, to be updated if practices change) was accepted on Cia's explicit go.

### Previous pending
- done: publish the privacy answers.
- carried: content rights answer; App Review contact name, phone and email; attach build 1; submit for review.
- carried: decide whether to offer the app on Apple silicon Macs (default yes).
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Each on Cia's go: content rights; contact details (his to type or dictate); attach build 1; submit.
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist, listing v8, store-v3-63, store-v3-rgb, two App Store Connect screenshots. Canon repo: D-0708 not pushed.

### Operational notes
- none new

### Durable thought
none, reason: single confirmed click.

### Repo state

Computed by `exit-stamp` at 2026-10-10T09:33:38-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **25 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished; the remaining steps are Cia's go.

---

## 2026-10-10 EXIT - age rating and price entered; privacy answers entered but not published (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, fill in the privacy, age rating and price", in his signed-in Chrome (he had to sign in again; the session had expired overnight).

### Done
- [observed] App Privacy: privacy policy URL https://photon.ciamac.com/privacy saved; data collection answered "No, we do not collect data from this app"; the page shows "Data Not Collected". NOT published: the Publish dialog is an attestation ("you agree that your responses are accurate, in compliance with App Store Review Guidelines and applicable law"), so the session cancelled it and left that click for Cia's explicit go.
- [observed] Age rating: seven-step questionnaire answered No or None on every item (features, mature themes, medical, sexuality, violence, chance-based); override left at "Not Applicable" (not Made for Kids). App Information now shows 4+ in 172 countries or regions, with Brazil ALL, Korea ALL, Vietnam 00+.
- [observed] Pricing: base United States, price $0.00, confirmed; Price Schedule shows a current price for 175 countries or regions. Availability: all countries or regions, confirmed; page shows "175 Available". Both take effect only when the app is released.
- [observed] Icon: TestFlight, iOS builds, Version 1.0 shows build 1 with the Kanizsa icon beside it, "Ready to Submit". The app header still shows a blank placeholder because no build is attached to the version.
- [observed] Left at defaults, not asked for: "Make this app available" on Apple silicon Macs is ticked by default; distribution method Public.

### Previous pending
- done: age rating; price.
- carried: App Privacy needs Publish (Cia's go).
- carried: App Review contact name, phone and email; content rights; attach build 1; submit.
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Cia's go for: Publish the privacy answers; content rights answer (no third-party content); attach build 1; his contact details; submit for review.
- Decide whether the iPhone app should be offered on Apple silicon Macs (default is yes).
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist, listing v8, store-v3-63, store-v3-rgb. Canon repo: D-0708 not pushed.

### Operational notes
- App Store Connect signs Chrome out overnight; expect a fresh sign-in each day.
- The age rating wizard's radios respond to a scripted click per group; the price picker is a custom list, click the option.

### Durable thought
none, reason: routine form entry.

### Repo state

Computed by `exit-stamp` at 2026-10-10T09:29:35-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **24 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished age rating and price; the privacy Publish click and the rest are Cia's go.

---

## IN FLIGHT 2026-10-10 - about to enter App Privacy, age rating and price in App Store Connect

### Done
- [observed] Cia, in chat: "go, fill in the privacy, age rating and price".
- [proposed] Next, app 6821128475 in his signed-in Chrome: App Privacy: privacy policy URL https://photon.ciamac.com/privacy and "Data Not Collected"; age rating questionnaire answered None or No throughout (no user content, no web access inside the app, no gambling, no contests), expected result 4+; price Free in all territories. Publishing the privacy answers and confirming the price are saves, not a submission. Not in scope: content rights, App Review contact, attaching the build, submitting.

### Previous pending
- carried: all items of the 2026-10-09 listing EXIT block below.

### Pending / open
- Outcome of the entry.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-09 EXIT - listing text and 16 screenshots entered in App Store Connect (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, fill in the listing and screenshots". Entered in his signed-in Chrome, saved, and re-read after a reload. Nothing submitted.

### Done
- [observed] Version page (app 6821128475, iOS 1.0), read back after reload: promotional text 154 chars, description 1232, keywords 94, support URL, marketing URL, copyright "2026 Ciamac Parhizi", App Review notes 735 chars, Sign-in required unticked, release type MANUAL. All from ios/APP_STORE_LISTING_DRAFT_v7.md.
- [observed] App Information page showed "Saved": subtitle "Illusions you can touch", primary category Education, secondary Entertainment.
- [observed] Media Manager after reload: iPhone medium display "8 of 10 App Screenshots", iPad 13 inch "8 of 10 App Screenshots", eight thumbnails each.
- [observed] App Store Connect's required iPhone slot is the 6.1/6.3 inch display (1206x2622 and similar); the session's 6.9 inch set (1320x2868) fits only an optional slot. A new set was taken on the iPhone 17 simulator from the Heart-voice debug build: ios/release-audit-2026-10-06/store-v3-63/ (8 files, 1206x2622, each viewed; ebbinghaus retaken at the early-skip timing). Upload copies, flattened to RGB: store-v3-rgb/ (24 files).
- [observed] Release type changed by the session from the default "Automatically release" to "Manually release this version", so approval alone cannot put the app live (Cia's standing rule that release needs an explicit go). Reversible on the same page.
- [observed] ios/APP_STORE_LISTING_DRAFT_v8.md written with what was entered.

### Previous pending
- done: listing text and screenshots.
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Before submission, each on Cia's go: App Review contact name, phone and email (his personal data, left empty); App Privacy "Data Not Collected"; age rating questionnaire; content rights; price free; attach build 1; submit.
- The 6.9 inch set was not uploaded (optional slot).
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist, listing v8, store-v3-63, store-v3-rgb. Canon repo: D-0708 not pushed.

### Operational notes
- App Store Connect file inputs accept file_upload directly; a one-time info dialog appears after the first upload per device family.
- Chrome's App Store Connect session persisted between tabs once Cia had signed in.

### Durable thought
none, reason: the size requirement is recorded in listing v8.

### Repo state

Computed by `exit-stamp` at 2026-10-09T22:40:37-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **24 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished the listing and screenshots; the remaining forms and submission are Cia's go.

---

## IN FLIGHT 2026-10-09 - about to enter the listing text and screenshots in App Store Connect

### Done
- [observed] Cia, in chat: "go, fill in the listing and screenshots". Scope read as: listing text from ios/APP_STORE_LISTING_DRAFT_v7.md and the 16 screenshots from ios/release-audit-2026-10-06/store-v3. Not in scope: App Privacy answers, age rating, price, attaching the build, submitting.
- [proposed] Next, in Cia's signed-in Chrome, app 6821128475: subtitle on App Information; promotional text, description, keywords, support URL, marketing URL, copyright and review notes on the iOS 1.0 version page; screenshots for iPhone 6.9 inch and iPad 13 inch; Save. No Submit. Contact name, phone and email for App Review are Cia's personal data and are left for him.

### Previous pending
- carried: all items of the 2026-10-09 upload EXIT block below.

### Pending / open
- Outcome of the entry.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-09 EXIT - build 1.0 (1) uploaded to App Store Connect and processed: Ready to Submit (OPEN)

Snapshot before this block: none (append only).
On Cia's "go" (option A, the API key) the upload went through on the first run.

### Done
- [observed] xcodebuild -exportArchive with ios/ExportOptions_AppStore_Upload.plist and the three -authenticationKey arguments: "Upload succeeded", "EXPORT SUCCEEDED" at 18:07 (ios/release-audit-2026-10-06/claude-final-3/upload-9.log; key id and issuer id scrubbed from the log, grep count 0).
- [observed] App Store Connect, app 6821128475 (Ciamac's Optical Illusions), TestFlight, iOS builds: Version 1.0, Build 1, "Ready to Submit", expires in 90 days. Read at about 18:09; two minutes earlier the Build Uploads list showed it as Processing.
- [observed] The key file is the single AuthKey in ~/.appstoreconnect/private_keys; the ids were read from pointfield-ios/SESSION_STATE.md into shell variables and never printed. This is the Pointfield iOS lane's documented route.
- [observed] Not submitted for review. No listing text, screenshots, privacy answers, age rating or price entered.

### Previous pending
- done: upload of build 1.0 (1).
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Each on Cia's go: enter the listing in App Store Connect from ios/APP_STORE_LISTING_DRAFT_v7.md (name, subtitle, description, keywords, URLs, copyright, review notes), 16 screenshots from ios/release-audit-2026-10-06/store-v3, App Privacy "Data Not Collected", age rating questionnaire, price free, attach build 1, then submit for review.
- Build 1 is the build with the system-voice fallback and Heart recordings as verified; any change now needs build 2.
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist. Canon repo: D-0708 not pushed.

### Operational notes
- For this lane, upload with the API key arguments; the Xcode-account route failed eight times at IDEDistributionUploadAccountStep for a reason never established.
- A new build takes about two minutes to move from Processing to Ready to Submit.

### Durable thought
none, reason: the API-key route is already documented in the Pointfield lane.

### Repo state

Computed by `exit-stamp` at 2026-10-09T18:09:11-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **21 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished the upload; the listing and submission are Cia's go.

---

## IN FLIGHT 2026-10-09 - about to upload build 1.0 (1) with the App Store Connect API key

### Done
- [observed] Cia, in chat: "go", in reply to the choice "A: go, use the API key (recommended) / B: upload by hand". Read as A.
- [observed] The Pointfield iOS lane's documented route (pointfield-ios/SESSION_STATE.md): xcodebuild -exportArchive with -authenticationKeyPath ~/.appstoreconnect/private_keys/AuthKey_<id>.p8, -authenticationKeyID and -authenticationKeyIssuerID, used there for the same "Failed to Use Accounts" failure. Key and issuer ids are taken from that file into shell variables and not printed.
- [proposed] Next, from ios/: xcodebuild -exportArchive -archivePath release-audit-2026-10-06/claude-final-3/Illusions.xcarchive -exportOptionsPlist ExportOptions_AppStore_Upload.plist -exportPath release-audit-2026-10-06/claude-final-3/upload -allowProvisioningUpdates plus the three key arguments. Uploads build 1.0 (1) of com.ciamac.illusions. Cannot be withdrawn; submits nothing for review.

### Previous pending
- carried: all items of the 2026-10-09 STOP block below.

### Pending / open
- Outcome of the upload; then confirm the build in App Store Connect.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-09 EXIT - upload fails at Xcode's account step for the eighth time; an API-key route exists on this Mac (OPEN, STOP 1)

Snapshot before this block: none (append only).
Two more upload attempts after Cia reported re-signing in to Xcode; both failed identically. Stopped.

### Done
- [observed] upload-7.log (15:57) and upload-8.log (16:10): 'Failed to Use Accounts. App Store Connect access for "3AUT8DTWP3" is required.' Verbose log: fails at IDEDistributionUploadAccountStep in under a second; DVTITunesSoftwareService.log is empty (0 bytes), so no App Store Connect call is even attempted.
- [observed] At 15:57 Xcode was not running (quit by the session at 15:48), so the first reported sign-out and sign-in cannot have happened in Xcode on this Mac. A full-screen approval prompt also timed out. At 16:10 Xcode was running (started 15:57 by the session) with only the welcome window open; whether a sign-in happened before upload-8 is unverified.
- [observed] A plain export still succeeds. The signing side of the Xcode account works; only the App Store Connect account check fails.
- [observed] At 16:10 another Claude Code session on this Mac was running altool --validate-app on another lane's package with --apiKey and --apiIssuer (values not read, redacted on screen). So an App Store Connect API key is set up on this machine and in use by the Pointfield lane. This session has not read or used it.
- [observed] Nothing uploaded; build 1.0 (1) unused.

### Previous pending
- carried: upload of build 1.0 (1).
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Cia decides the upload route: (a) authorise this lane to upload with the existing App Store Connect API key, the way the Pointfield lane does; or (b) fix Xcode's account by hand and upload from the Organizer himself.
- [inferred] The Xcode-account route is unreliable here for a reason not established; eight failures, six identical.
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist. Canon repo: D-0708 not pushed.

### Operational notes
- Do not rerun the Xcode-account upload again without new evidence.
- Xcode at click tier cannot be sent menu commands in the background; opening Settings needs full-screen control, which needs Cia at the Mac to approve.

### Durable thought
none, reason: cause not established.

### Repo state

Computed by `exit-stamp` at 2026-10-09T16:11:12-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **21 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
STOP condition 1; the next step needs Cia's decision on using the API key.

---

## 2026-10-09 EXIT - icon A confirmed (D-0708); upload still blocked at Xcode's account step (OPEN, STOP 1)

Snapshot before this block: none (append only).
Cia: "keep A, upload the build". The upload failed again at the account step, after an Xcode restart. STOP condition 1.

### Done
- [observed] D-0708 appended (icon A; also records the App Store Connect record creation).
- [observed] upload-6.log (15:51, Xcode quit beforehand): 'Failed to Use Accounts. App Store Connect access for "3AUT8DTWP3" is required.' Detailed log (IDEDistribution.standard.log): "Failed to find an account with App Store Connect access for team ... teamID='3AUT8DTWP3', teamName='(null)'". It fails within the same second, at IDEDistributionUploadAccountStep, before any contact with the app record.
- [observed] A plain export (no upload) run right after still succeeds, so the signing side of the account works.
- [observed] Timeline: uploads at about 10:20 and later reached "App record not found" (account step passed); from 15:35 every upload fails at the account step. In between, Cia made several App Store Connect sign-in attempts in browsers, three of which the session saw end in authResult=FAILED.
- [inferred] Xcode's stored App Store Connect session for this Apple ID is no longer valid and needs the password again, from the timeline above and the Organizer's "Couldn't communicate with a helper application" at 15:48. Not confirmed.
- [observed] Nothing uploaded; build 1.0 (1) unused; app record exists in App Store Connect.

### Previous pending
- done: icon pick (A, D-0708).
- carried: upload of build 1.0 (1).
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- BLOCKED on Cia: Xcode, Settings, Apple Accounts, open the account, Sign Out, then Sign In again with password and two-factor. Then the session reruns the upload command.
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist. Canon repo: D-0708 committed locally, not pushed.

### Operational notes
- Do not rerun the upload until Cia has re-signed in to Xcode; six failures, the last four identical.
- The xcdistributionlogs bundle named in the xcodebuild output holds the real reason; read IDEDistribution.standard.log.

### Durable thought
none, reason: cause inferred, not confirmed.

### Repo state

Computed by `exit-stamp` at 2026-10-09T15:52:11-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **21 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
STOP condition 1: upload failed repeatedly at the account step; blocked on Cia re-signing in to Xcode.

---

## 2026-10-09 EXIT - app record created in App Store Connect; upload paused on Cia's icon question (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, create the record and upload" the record was created; the upload has not gone through; Cia then wrote "we need an icon".

### Done
- [observed] App Store Connect, New App, created by the session in Cia's signed-in Chrome: platform iOS, name Ciamac's Optical Illusions (accepted, so the name was free), primary language English (U.S.), bundle id com.ciamac.illusions, SKU illusions-ios-001, Full Access. Apps list after reload shows "Ciamac's Optical Illusions, iOS 1.0, Prepare for Submission".
- [observed] Upload attempt after that (claude-final-3/upload-5.log, 15:44) failed: 'Failed to Use Accounts. App Store Connect access for "3AUT8DTWP3" is required.' Nothing uploaded; build 1 unused.
- [observed] Xcode Organizer at 15:48: "An error occurred preventing Xcode from downloading version information from App Store Connect for account ... Couldn't communicate with a helper application." Xcode quit by menu click at 15:48 to clear the helper. Not yet retried.
- [observed] The build's icon is candidate A, the Kanizsa triangle: ios/Photon/Assets.xcassets/AppIcon.appiconset/AppIcon.png is byte-identical to ios/icon_candidates/icon_A_kanizsa.png (1024 square, no alpha). Candidates B (spiral) and C (Ponzo) exist. The icon pick was never signed off (open since 2026-10-04).
- [observed] While clicking Xcode's menu bar the Settings window changed pane twice (to Navigation, then Notifications) without a click aimed at it. No toggle was aimed at or seen changed; cause unknown.

### Previous pending
- done: App Store Connect app record.
- carried: upload of build 1.0 (1), now waiting on the icon answer and a retry after the Xcode restart.
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Cia: which icon (A as built, B, C, or a new one). A different icon means a new archive and export before upload.
- Then retry the upload; if "Failed to Use Accounts" persists, Cia re-enters his password via Xcode, Settings, Apple Accounts, Sign In.
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist.

### Operational notes
- App Store Connect's React selects ignore form_input; click the select, type the option's visible text, press Return.
- The first click on Xcode's menu bar after another app was frontmost only activates Xcode; the menu opens on the second.

### Durable thought
none, reason: nothing new that generalises beyond the notes above.

### Repo state

Computed by `exit-stamp` at 2026-10-09T15:49:21-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **21 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
Cia raised the icon mid-upload; waiting on his pick.

---

## IN FLIGHT 2026-10-09 - about to create the App Store Connect app record and upload build 1.0 (1)

### Done
- [observed] App Store Connect Apps list read in Chrome: four other apps of Cia's (details withheld from this public file). No record for com.ciamac.illusions; that is why every upload was refused.
- [observed] Cia, in chat: "go, create the record and upload", after being shown the values: platform iOS; name Ciamac's Optical Illusions; primary language English (U.S.); bundle id com.ciamac.illusions; SKU illusions-ios-001; full access. Told that a record cannot be truly deleted and a SKU cannot be reused.
- [proposed] Next: New App form in App Store Connect with exactly those values, Create; stop if the name is taken. Then the upload command of the earlier in-flight block.

### Previous pending
- carried: all items of the 2026-10-09 STOP block below.

### Pending / open
- Outcome of the record creation and the upload.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-09 EXIT - upload still refused; error changed to "App Store Connect access required" (OPEN, STOP 1)

Snapshot before this block: none (append only).
Four upload attempts today, none sent anything. STOP condition 1: the same step failed twice in a row with the same error.

### Done
- [observed] upload-2.log (after Cia reported the record created): 'App record with bundle identifier "com.ciamac.illusions" not found on App Store Connect.'
- [observed] upload-3.log and upload-4.log (15:35): 'Failed to Use Accounts. App Store Connect access for "3AUT8DTWP3" is required. Ensure that your Apple Account usernames and passwords are correct in Accounts settings.'
- [observed] Xcode, Settings, Apple Accounts at 15:35: the account is listed, team "ciamac parhizi", role Admin; teams load.
- [observed] Chrome (the session's tab group): appstoreconnect.apple.com/apps redirects to the login page with authResult=FAILED on three visits, including two after Cia reported signing in. The session never saw the Apps list, so the app record is unverified.
- [observed] Nothing uploaded; build 1.0 (1) unused. IPA unchanged at ios/release-audit-2026-10-06/claude-final-3/export/Photon.ipa.

### Previous pending
- carried: BLOCKED on Cia, App Store Connect app record (unverified).
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- BLOCKED on Cia: get into App Store Connect in a browser and read what it shows on arrival (a terms or agreement banner, a setup step, or an error), then confirm the Apps list holds a record with bundle id com.ciamac.illusions.
- [inferred] Likely cause: this Apple ID cannot currently reach App Store Connect for the team (pending agreement, or the session needs re-authentication), from the changed xcodebuild error plus the repeated authResult=FAILED in Chrome. Not confirmed.
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist.

### Operational notes
- Do not rerun the upload until Cia reports what App Store Connect shows; two identical failures.

### Durable thought
none, reason: cause not yet established.

### Repo state

Computed by `exit-stamp` at 2026-10-09T15:35:43-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **20 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
STOP condition 1: the upload failed twice in a row with the same error; blocked on Cia's App Store Connect access.

---

## 2026-10-09 EXIT - upload refused: no app record in App Store Connect yet (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, upload the IPA to App Store Connect" the upload was attempted once and refused by Apple before anything was sent.

### Done
- [observed] xcodebuild -exportArchive with ios/ExportOptions_AppStore_Upload.plist (destination upload) failed: 'App record with bundle identifier "com.ciamac.illusions" not found on App Store Connect. Create an app record on App Store Connect, or distribute the app from Xcode, and then try again.' Log: ios/release-audit-2026-10-06/claude-final-3/upload.log. Nothing was uploaded; build number 1 is unused.
- [observed] The verified IPA is unchanged: ios/release-audit-2026-10-06/claude-final-3/export/Photon.ipa.

### Previous pending
- carried: Cia listens to the Heart voice; hands-on haptics and screen-awake.
- carried: the other session's shorts work stays uncommitted.
- done: upload attempted on Cia's go (refused, see above).

### Pending / open
- BLOCKED on Cia: create the app record in App Store Connect (his login): Apps, plus, New App; platform iOS; name Ciamac's Optical Illusions; primary language English (U.S.); bundle id com.ciamac.illusions (now in the list); SKU of his choice, for example illusions-ios-1. Then the same upload command is rerun.
- If the name is taken, fallback Ciamac's Book of Illusions (D-0695).
- Uncommitted: SESSION_STATE.md, ios/ExportOptions_AppStore_Upload.plist.

### Operational notes
- Xcode is granted at click tier, so the session cannot type the app name into the Organizer's create-record form; the record has to be made by Cia.

### Durable thought
none, reason: expected refusal, recorded here.

### Repo state

Computed by `exit-stamp` at 2026-10-09T10:23:50-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `be97e61 Record the verified App Store export; fix the IPA check's archive path` (committed 2026-10-09)
- tree: **20 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
blocked on Cia: App Store Connect app record.

---

## IN FLIGHT 2026-10-09 - about to upload build 1.0 (1) to App Store Connect

### Done
- [observed] Cia, in chat: "go, upload the IPA to App Store Connect". The verified IPA is ios/release-audit-2026-10-06/claude-final-3/export/Photon.ipa (sha256 b561ebf5...).
- [proposed] Next command, from ios/: xcodebuild -exportArchive -archivePath release-audit-2026-10-06/claude-final-3/Illusions.xcarchive -exportOptionsPlist ExportOptions_AppStore_Upload.plist -exportPath release-audit-2026-10-06/claude-final-3/upload -allowProvisioningUpdates. It re-exports the same archive and uploads it through the account signed in to Xcode. No credentials handled by the session. manageAppVersionAndBuildNumber is off so the build stays 1.0 (1).
- [observed] An upload cannot be withdrawn; a build number can be used once. It does not submit for review and does not make anything public.
- [inferred] It may fail if no app record exists in App Store Connect for com.ciamac.illusions; creating that record is Cia's step.

### Previous pending
- carried: all items of the 2026-10-09 export EXIT block below stand unchanged.

### Pending / open
- Outcome of the upload.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-09 EXIT - App Store IPA exported and verified (OPEN)

Snapshot before this block: none (append only).
After Cia signed in to Xcode (account seen listed in Settings, Apple Accounts), the command-line export succeeded on the first run.

### Done
- [observed] xcodebuild -exportArchive: "EXPORT SUCCEEDED" (ios/release-audit-2026-10-06/claude-final-3/export.log). IPA: ios/release-audit-2026-10-06/claude-final-3/export/Photon.ipa, 5.6 MB, sha256 b561ebf5adfe7813ad8777da597a9fd7370675e9b45596077f4c2ff14f2eb4fb. Beside it: DistributionSummary.plist, ExportOptions.plist, Packaging.log.
- [observed] verify_ipa.sh on that file: signed "Apple Distribution: ciamac parhizi (3AUT8DTWP3)", codesign verify passes; profile "iOS Team Store Provisioning Profile: com.ciamac.illusions", get-task-allow false, expires 2027-03-26; bundle id com.ciamac.illusions, version 1.0 (1), minimum iOS 18.0, arm64; 21 pages and 79 audio files, Pieces byte-identical to source; 21 preview images; privacy manifest present; "Optical Illusions" in the binary, no old name, no debug hooks; ITSAppUsesNonExemptEncryption false.
- [inferred] The export created the App ID com.ciamac.illusions, an Apple Distribution certificate and the store profile on team 3AUT8DTWP3 (from the profile and certificate now present; automatic signing with -allowProvisioningUpdates). The bundle id is now permanent.
- [observed] verify_ipa.sh compared the binary against the old claude-final archive; path corrected to claude-final-3. The binaries differ by signing in any case.
- [observed] Nothing uploaded, nothing submitted.

### Previous pending
- done: Apple ID sign-in in Xcode (Cia), export, IPA verification.
- carried: Cia listens to the Heart voice on the phone.
- carried: hands-on haptics and screen-awake; name availability in App Store Connect.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- Cia, each step his go: App Store Connect record named Ciamac's Optical Illusions (listing from ios/APP_STORE_LISTING_DRAFT_v7.md, screenshots from ios/release-audit-2026-10-06/store-v3), upload of this IPA, submission.
- The IPA and archive are ignored by git and exist only on this Mac.
- Uncommitted: SESSION_STATE.md, the Xcode screenshot, the verify_ipa.sh path fix.

### Operational notes
- With an account signed in to Xcode, xcodebuild launched from the Claude app exports normally.

### Durable thought
Captured to Open Brain on 2026-10-09: when xcodebuild says "No Accounts", look at Xcode's Apple Accounts pane before theorising; the cached team list in Xcode's preferences survives a sign-out.

### Repo state

Computed by `exit-stamp` at 2026-10-09T10:20:20-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `9c6e79b SESSION_STATE: rename and Heart narration committed and pushed` (committed 2026-10-09)
- tree: **21 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished the export and verification; the upload is Cia's go.

---

## 2026-10-09 EXIT - root cause of the missing IPA: Xcode has no Apple account signed in (OPEN)

Snapshot before this block: none (append only).
On Cia's "go, run the export yourself" the session opened Xcode's Organizer by clicks. The export could not start: Xcode shows no Apple account.

### Done
- [observed] Xcode 27 Organizer, Overview: "Error Downloading App Information. A developer account is required to download app information. Add an account in Xcode Settings." Settings, Apple Accounts shows only "Sign in to your Apple Account" and a Sign In button, no account listed. Screenshot: ios/release-audit-2026-10-06/xcode_no_account_2026-10-09.jpg.
- [inferred] This is the cause of all four command-line "No Accounts" failures and of every Organizer export that left no file: from the screenshot above plus export.log to export-4.log. The earlier guess that xcodebuild launched from the Claude app could not see the account was wrong.
- [observed] Stopped at the sign-in step. No credentials typed, no Keychain access. Xcode left open on the Apple Accounts pane. Nothing registered with Apple; no export; no upload.
- [observed] The archive copy in ~/Library/Developer/Xcode/Archives/2026-10-09/ is in place for the Organizer.

### Previous pending
- carried: Cia listens to the Heart voice on the phone.
- carried: App Store export of claude-final-3, now blocked on the sign-in below, then verify_ipa.sh.
- carried: hands-on haptics and screen-awake; name availability in App Store Connect.
- carried: the other session's shorts work stays uncommitted.

### Pending / open
- BLOCKED on Cia: Xcode, Settings, Apple Accounts, Sign In with the Apple ID that owns team 3AUT8DTWP3 (password and two-factor are his). Then the session reruns the export from the command line, which should now work, or by clicks in the Organizer.
- Uncommitted: SESSION_STATE.md and the screenshot above.

### Operational notes
- Xcode is granted to computer use at click tier only: app_menu is refused, so menus need full-screen control and plain clicks.
- defaults read com.apple.dt.Xcode IDEProvisioningTeamByIdentifier still lists team 3AUT8DTWP3 with no account signed in; it is a stale cache and not evidence of a signed-in account.

### Durable thought
When xcodebuild says "No Accounts", look at Xcode's Settings, Apple Accounts pane before theorising: the cached team list in Xcode's preferences survives a sign-out and falsely suggests an account is present.

### Repo state

Computed by `exit-stamp` at 2026-10-09T10:00:12-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `9c6e79b SESSION_STATE: rename and Heart narration committed and pushed` (committed 2026-10-09)
- tree: **20 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
blocked on Cia: Apple ID sign-in in Xcode.

---

## IN FLIGHT 2026-10-09 - about to run the App Store export in Xcode's Organizer by clicks

### Done
- [observed] Cia, in chat: "go, run the export yourself", after being told the export registers bundle id com.ciamac.illusions with Apple (permanent) and creates an Apple Distribution certificate and App Store profile on team 3AUT8DTWP3. No upload, no submission.
- [observed] Before this: no IPA anywhere on the Mac, Xcode not running, six reported Organizer exports left no file. The archive was copied (byte-identical) to ~/Library/Developer/Xcode/Archives/2026-10-09/Optical Illusions 1.0 (1) Heart.xcarchive so the Organizer lists it under "Photon".
- [proposed] Next: open Xcode, Window, Organizer, Photon archive of 2026-10-08, Distribute App, App Store Connect, Export, automatic signing. Stop at any password, two-factor or Keychain prompt.

### Previous pending
- carried: all items of the 2026-10-09 commit EXIT block below stand unchanged.

### Pending / open
- Verify the IPA with ios/release-audit-2026-10-06/claude-verify/verify_ipa.sh.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-09 EXIT - committed and pushed 902b5a5 (rename, Heart narration, audit records) (OPEN)

Snapshot before this block: none (append only).
Cia: "go, commit and push". One commit of this lane's work, pushed; the canon repo was already level with its remote.

### Done
- [observed] Commit 902b5a5 on main, pushed to origin (push output fc8d927..902b5a5). 173 files: ios/Photon (header, 79 audio files, 21 previews, Swift edits), ios/tools/narrate_heart.py and manifest, listing drafts v3 to v7, ExportOptions_AppStore.plist, release-audit-2026-10-06 write-ups, store-v3 and scripts, redesign-v1 and -v2, ios/.gitignore, public/privacy.html, SESSION_STATE.md.
- [observed] ios/.gitignore now keeps DerivedData, archives, claude-final*, logs, store/ and store-v2/ and verify scratch out of git; they remain on disk.
- [observed] Staged diff scanned for the signing email and identity id: none.
- [observed] Canon repo: git status after fetch shows main level with origin/main; D-0694, D-0695 and D-0696 are on origin.
- [observed] A push does not deploy this site; the live site was already deployed by CLI earlier today.

### Previous pending
- carried: Cia listens to the Heart voice on the phone.
- carried: Organizer export of claude-final-3/Illusions.xcarchive, then verify_ipa.sh. No IPA exists on disk.
- done: commit and push of this work and the canon repo.
- carried: hands-on haptics and screen-awake; name availability in App Store Connect.

### Pending / open
- Left uncommitted on purpose: the other session's shorts work (shorts/engine edits, shorts/audio, build_v5, galleries and the rest) and SESSION_STATE.md.lock.
- The archives are not in git (ignored); claude-final-3 exists only on this Mac. It is rebuildable from 902b5a5.

### Operational notes
- none new

### Durable thought
none, reason: routine commit.

### Repo state

Computed by `exit-stamp` at 2026-10-09T09:29:21-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `902b5a5 Rename the app to Ciamac's Optical Illusions; narrate it in the Heart voice` (committed 2026-10-09)
- tree: **18 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished; blocked on Cia for listening and the Organizer export.

---

## 2026-10-09 EXIT - privacy page live with the narration sentence; Heart build on the iPhone (OPEN)

Snapshot before this block: none (append only).
Deployed public/privacy.html on Cia's "go, deploy the privacy page".

### Done
- [observed] vercel deploy --prod --yes; production is now photon-to-phenomenology-mx366xfo2-ciamacparhizi-9083s-projects.vercel.app (vercel ls --prod).
- [observed] Live https://photon.ciamac.com/privacy carries "recordings stored inside the app", h1 "Ciamac's Optical Illusions", no a.ciamac.com tag. /privacy, /photon, /photon/book, /shorts, /photon/kanizsa answer 200; / answers 307.
- [observed] ROLLBACK: vercel rollback photon-to-phenomenology-7sqme0r2e-ciamacparhizi-9083s-projects.vercel.app.
- [observed] claude-final-3 (Heart voice) installed on the iPhone 15 on 2026-10-09 (devicectl "App installed").
- [observed] Narration speeds from tools/narration_manifest.json: 77 lines at 0.88, change-blindness-2 at 0.92, muller-lyer-1 at 0.90. An earlier chat message naming checker-shadow-3 at 0.94 was wrong.

### Previous pending
- done: live check after the deploy (lines above).
- done: install claude-final-3 on the iPhone.
- done: deploy of the privacy page's narration sentence.

### Pending / open
- Cia listens to the Heart voice on the phone; nothing about how it sounds is verified.
- Cia: Organizer export of ios/release-audit-2026-10-06/claude-final-3/Illusions.xcarchive, then verify_ipa.sh. No IPA exists on disk.
- Uncommitted: all of this work, including public/privacy.html (live, ahead of git). Canon repo push held: D-0694, D-0695, D-0696.
- Hands-on: haptics and screen staying awake; name availability in App Store Connect.

### Operational notes
- none new

### Durable thought
none, reason: routine deploy.

### Repo state

Computed by `exit-stamp` at 2026-10-09T09:27:25-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `fc8d927 Rename the app to Ciamac's Book of Illusions; add the privacy policy page` (committed 2026-10-05)
- tree: **58 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished the deploy; blocked on Cia for listening and the Organizer export.

---

## IN FLIGHT 2026-10-09 - about to deploy public/privacy.html (narration sentence) to production

### Done
- [observed] Cia, in chat: "go, deploy the privacy page". Inside public/ only privacy.html differs from HEAD. Change since the last deploy: one sentence, narration is recordings stored in the app with the system voice as fallback (D-0696).
- [proposed] Next command: vercel deploy --prod --yes from the repo root. No git operation.
- [observed] Production before the deploy: https://photon-to-phenomenology-7sqme0r2e-ciamacparhizi-9083s-projects.vercel.app. ROLLBACK: vercel rollback <that URL>.

### Previous pending
- carried: all items of the 2026-10-08 narration EXIT block below stand unchanged.

### Pending / open
- Live check after the deploy.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-08 EXIT - App narration re-voiced in Kokoro Heart (D-0696); archive claude-final-3; waiting on Cia's ear and an Organizer export (OPEN)

Snapshot before this block: none (append only).
Cia: "still the same audio", then "yes, use the Heart voice". All 79 narration lines are now bundled recordings in the shorts voice.

### Done
- [observed] D-0696 appended (canon-append printed the ID).
- [observed] 79 lines collected from the pages themselves (ios/release-audit-2026-10-06/claude-verify/extract_lines.mjs to narration_lines.json: 74 guide steps, 5 lab introductions, 1981 words).
- [observed] ios/tools/narrate_heart.py rendered 79 of 79 to ios/Photon/Pieces/audio/<id>.m4a (AAC mono 24 kHz, 5.4 MB, 11.8 min; 77 at speed 0.88, one each at 0.90 and 0.92). Manifest with duration, gate result and phonemes: ios/tools/narration_manifest.json. Gate failures: none on the final run.
- [observed] Found and fixed a real mispronunciation: mid-sentence "A" (the square's name in checker-shadow) was phonemised as the article; the script now forces the letter, phonemes read back as the letter in checker-shadow-0, -2, -3. "hold time" respelled "hold-time" (phonemes unchanged in substance, transcriber stops hearing "whole time"). motion-aftereffect-1 accepted on phonemes; the transcriber hears "reads a steady" for "reads as steady".
- [observed] Simulator log (claude-verify/heart-checker-shadow.txt, heart-receptive-field.txt): every line goes say, file, done, and the guide advances through all five steps; the lab page plays its introduction file.
- [observed] Release archive ios/release-audit-2026-10-06/claude-final-3/Illusions.xcarchive: 21 pages and 79 audio files byte-identical to source, no missing or extra audio ids, new header, no debug hooks, codesign verify passes, app 6.4 MB. Apple Development signed.
- [observed] ios/Photon/Narrator.swift: debug-only silent flag now covers recorded audio and logs "NARRATOR file". ios/APP_STORE_LISTING_DRAFT_v7.md written. public/privacy.html narration sentence changed locally, NOT deployed.
- [observed] iPhone install of claude-final-3 failed twice (device "unavailable", CoreDevice error 4016). The phone still has the claude-final-2 build: new name, system voice.
- [observed] Audition page for Cia: ios/release-audit-2026-10-06/claude-verify/audition_heart.html (79 players).

### Previous pending
- done: live check after the privacy deploy (closed in the block below).
- carried: public/privacy.html is ahead of git; now also ahead of the live site by one sentence about narration.
- carried: Organizer export, now of claude-final-3; hands-on iPhone pass; name availability; canon repo push held (D-0694, D-0695, D-0696 committed locally).

### Pending / open
- Cia listens: the assistant cannot hear. Nothing about how the voice sounds is verified, only the words and phonemes.
- Install claude-final-3 on the iPhone when it is reachable.
- Deploy of the privacy page's narration sentence needs Cia's go; the live page still says narration uses the built-in voice, which is no longer true of this build.
- Guide text and audio are now coupled: changing a guide line means re-rendering its file.

### Operational notes
- Kokoro venv is in the session scratchpad and will be gone. Rebuild: uv venv -p 3.11; uv pip install "kokoro>=0.9" "transformers>=4.44" "tokenizers>=0.19" soundfile numpy; run with VIRTUAL_ENV set to that venv and its bin first on PATH (kokoro shells out to uv to fetch a spaCy model and dies without it), HF_HUB_DISABLE_XET=1, sandbox off.
- The shorts gate compares exact words, and whisper writes American spellings; narrate_heart.py carries a British-to-American map. It cannot tell the letter A from the article.

### Durable thought
none, reason: the reusable facts are in Operational notes and in the script's comments.

### Repo state

Computed by `exit-stamp` at 2026-10-08T14:18:14-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `fc8d927 Rename the app to Ciamac's Book of Illusions; add the privacy policy page` (committed 2026-10-05)
- tree: **58 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
blocked on Cia: his ear on the voice, then the Organizer export.

---

## 2026-10-08 EXIT - privacy page live with the new app name (OPEN)

Snapshot before this block: none (append only).
Deployed public/privacy.html on Cia's "go, deploy the privacy page".

### Done
- [observed] vercel deploy --prod --yes; production is now photon-to-phenomenology-7sqme0r2e-ciamacparhizi-9083s-projects.vercel.app (vercel ls --prod).
- [observed] Live https://photon.ciamac.com/privacy: h1 and title read "Ciamac's Optical Illusions", no a.ciamac.com tag. /privacy, /photon, /photon/book, /shorts, /photon/kanizsa, /photon/book/troxler-fading answer 200; / answers 307.
- [observed] ROLLBACK: vercel rollback photon-to-phenomenology-op3t6hisg-ciamacparhizi-9083s-projects.vercel.app (production read just before this deploy).

### Previous pending
- done: live check of /privacy and the other routes after the deploy (lines above).

### Pending / open
- public/privacy.html is live but uncommitted: the site is ahead of git. Commit on Cia's word.
- Everything in the 2026-10-08 rename EXIT block below still stands (Organizer export, hands-on iPhone pass, name availability, canon repo push held).

### Operational notes
- none

### Durable thought
none, reason: routine deploy.

### Repo state

Computed by `exit-stamp` at 2026-10-08T13:52:37-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `fc8d927 Rename the app to Ciamac's Book of Illusions; add the privacy policy page` (committed 2026-10-05)
- tree: **54 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished the deploy; blocked on Cia for the Organizer export.

---

## IN FLIGHT 2026-10-08 - about to deploy public/privacy.html (new app name) to production

### Done
- [observed] Cia, in chat: "go, deploy the privacy page". Only public/privacy.html differs from HEAD inside public/ (git diff --stat: 1 file, 3 lines: title, description, h1 now "Ciamac's Optical Illusions"). .vercelignore keeps ios/, /shorts/, scripts, tools and *.md out of the upload.
- [proposed] Next command: vercel deploy --prod --yes from the repo root. The file is uncommitted; no git operation is part of this.
- [observed] Production before the deploy: https://photon-to-phenomenology-op3t6hisg-ciamacparhizi-9083s-projects.vercel.app. ROLLBACK: vercel rollback <that URL>.

### Previous pending
- carried: all items of the 2026-10-08 EXIT block above this one stand unchanged.

### Pending / open
- Live check of /privacy and the other routes after the deploy.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-08 EXIT - App renamed Ciamac's Optical Illusions (D-0695); new archive; App Store export still not verified (OPEN)

Snapshot before this block: none (append only).
Cia renamed the app twice in one day: App of Illusions (D-0694), then, after a Codex consult, Ciamac's Optical Illusions (D-0695, which stands). Source, listing, library screenshots and archive follow the final name. No App Store IPA has ever been seen by this session.

### Done
- [observed] D-0694 and D-0695 appended via canon-append (it printed both IDs). Consult log: ~/Developer/agent-notes/consults/20261008_134713.md.
- [observed] ios/Photon/LibraryView.swift header reads "CIAMAC'S" over "Optical Illusions"; seen on the iPhone 17e simulator at normal and accessibility-extra-large text (ios/release-audit-2026-10-06/claude-verify/name2_sheet.png).
- [observed] New Release archive ios/release-audit-2026-10-06/claude-final-2/Illusions.xcarchive: 21 pages byte-identical to source, 21 previews, "Optical Illusions" in the binary, no old name, no debug hooks, codesign verify passes, Apple Development signed. Installed on the iPhone 15 (devicectl "App installed").
- [observed] ios/release-audit-2026-10-06/store-v3/: 16 screenshots; 14 experiment shots copied from store-v2, both library shots retaken with the new header.
- [observed] ios/APP_STORE_LISTING_DRAFT_v5.md (App of Illusions, superseded) and v6 (final name). public/privacy.html title, description and h1 changed locally; NOT deployed, so the live page still says Ciamac's Book of Illusions.
- [observed] xcodebuild -exportArchive from this app failed four times in all with "No Accounts" (claude-final/export.log, export-2, -3, -4), including after Cia added the Apple ID, restarted Xcode and accepted agreements. Cia reported Organizer exports three times; no IPA was ever found on disk by ls, find or Spotlight.
- [observed] ios/release-audit-2026-10-06/claude-verify/verify_ipa.sh written: read-only IPA check Cia can run himself.

### Previous pending
- carried: hands-on iPhone pass (voice, haptics, screen stays awake) with the phone unlocked.
- carried: uncommitted work, now also the rename edits, listing v5 and v6, store-v3, claude-final-2, public/privacy.html. Commit only on Cia's word.
- carried: screenshots are RGBA PNGs with an opaque alpha channel; flatten if App Store Connect refuses them.
- carried: Ebbinghaus, iPad portrait, right ring group runs off the edge in the guide's "equal" step.
- carried: project.yml MARKETING_VERSION 0.1.0 disagrees with Info.plist 1.0.

### Pending / open
- Cia: Organizer export of claude-final-2/Illusions.xcarchive (Distribute App, App Store Connect, Export), then run verify_ipa.sh on the result and paste the output. Any earlier export is stale (old header).
- Deploy of public/privacy.html needs Cia's go; until then the live privacy page shows the old name.
- Name availability is unknown until typed into App Store Connect. Fallback: Ciamac's Book of Illusions.
- Listing v6 keyword "optical illusion" now repeats the name; a swap is Cia's call.
- BOOK_OF_ILLUSIONS_TOC_v1.md and the 40-piece plan still say Book of Illusions; not touched.

### Operational notes
- xcodebuild launched from the Claude app cannot see the Xcode account; do not retry the command-line export, use Organizer.
- zsh does not word-split "set -- $pair"; use a function for per-device loops.
- Portrait iPad Pro 13 simulator is B3C4DCC2 (shut down after use).

### Durable thought
none, reason: the naming outcome is in D-0695; nothing else generalises.

### Repo state

Computed by `exit-stamp` at 2026-10-08T13:50:58-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `fc8d927 Rename the app to Ciamac's Book of Illusions; add the privacy policy page` (committed 2026-10-05)
- tree: **54 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
blocked on Cia: Organizer export of the new archive.

---

## 2026-10-06 EXIT - Book of Illusions: Codex release handoff audited; screenshots retaken; export still blocked on the Apple ID (OPEN)

Snapshot before this block: none (append only).
Independent audit of ios/release-audit-2026-10-06/RELEASE_STATUS.md (Codex). The app and archive check out; the staged experiment screenshots were stale and were retaken; two small app fixes; the App Store export stops at "No Accounts" as before. Full write-up: ios/release-audit-2026-10-06/RELEASE_STATUS_v2.md.

### Done
- [observed] New Release archive ios/release-audit-2026-10-06/claude-final/Illusions.xcarchive (com.ciamac.illusions, 1.0 (1), Apple Development signed, codesign verify passes). Pieces/ byte-identical to ios/Photon/Pieces (21 pages); Assets.car has 21 preview images; binary has the privacy URL and zero debug-hook strings. Log: claude-final/archive.log.
- [observed] xcodebuild -exportArchive failed: "No Accounts", "No profiles for 'com.ciamac.illusions'" (claude-final/export.log). Not worked around.
- [observed] tools/verify_all.sh, six sizes: failures 0 of 21 (ios/build/verify/).
- [observed] Simulator (iPhone 17e, taps): Lab filter shows 5, card opens, next, mute toggles, back. Library reflows at accessibility-extra-large text. Troxler log shows hold on, four say/done pairs, a haptic per step (claude-verify/phone-log.txt).
- [observed] The 14 experiment screenshots in release-audit-2026-10-06/store/ had no narration button, so they did not match the app. Retaken from the current build into store-v2/ (16 files, 1320x2868 and 2064x2752), each viewed.
- [observed] Edits: ios/Photon/LibraryView.swift (cover over the top safe area; scrolled content was showing behind the clock), ios/Photon/PieceScreen.swift (back button label "All experiments"), ios/Photon/Narrator.swift (debug-only -silentVoice flag). New: ios/APP_STORE_LISTING_DRAFT_v4.md, release-audit-2026-10-06/RELEASE_STATUS_v2.md, claude-verify/shoot_store_v2.sh.
- [observed] iPhone 15 was locked all session: launch refused ("Locked"). A debug build was installed for a console test that could not run, then replaced; the final Release build from claude-final is installed (devicectl "App installed").
- [observed] https://photon.ciamac.com/privacy answers 200.

### Previous pending
- carried: BLOCKED on Cia: Xcode, Settings, Accounts, add the Apple ID that owns team 3AUT8DTWP3; then rerun the export against claude-final/Illusions.xcarchive.
- carried: Cia in App Store Connect: new app record, listing (now from ios/APP_STORE_LISTING_DRAFT_v4.md, screenshots from ios/release-audit-2026-10-06/store-v2), upload, submit; each step his go.
- carried: ios/ExportOptions_AppStore.plist is uncommitted (Cia asked for no git operations this session).

### Pending / open
- Hands-on iPhone pass (voice, haptics, screen stays awake) with the phone unlocked. Still never done on hardware.
- Uncommitted: the three Swift edits, 21 preview imagesets, listing v3 and v4, release-audit-2026-10-06/, redesign-v1, redesign-v2. Commit only on Cia's word.
- Screenshots are RGBA PNGs with a fully opaque alpha channel; flatten to RGB if App Store Connect refuses them.
- Ebbinghaus, iPad portrait: in the guide's "equal" step the right ring group runs off the right edge. Cosmetic, not fixed.
- project.yml MARKETING_VERSION 0.1.0 disagrees with Info.plist 1.0 (plist wins).

### Operational notes
- Screenshot timing: with the voice on, the guide waits for each line, so the old 33 s skip lands mid-guide on some pieces. Good states: skip after 4 s for cornsweet, cafe-wall, receptive-field and iPad ebbinghaus; after 33 s for kanizsa, ebbinghaus (iPhone), checker-shadow, motion-induced-blindness. Launch with -silentVoice YES.
- The booted iPad Pro 13 simulator 6246D73A is in landscape; B3C4DCC2 is portrait (shut down again after use).
- devicectl launch arguments for the app go after "--".
- Narration uses the playback category: it speaks with the ringer switch silent.

### Durable thought
none, reason: findings are specific to this release and recorded in RELEASE_STATUS_v2.md.

### Repo state
### Repo state

Computed by `exit-stamp` at 2026-10-06T22:44:21-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `fc8d927 Rename the app to Ciamac's Book of Illusions; add the privacy policy page` (committed 2026-10-05)
- tree: **51 uncommitted change(s)**
- upstream: origin/main (ahead 0, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
blocked on Cia: Apple ID in Xcode for the App Store export, and an unlocked iPhone for the hands-on pass.

---

## IN FLIGHT 2026-10-05 (2) - privacy page live; App Store archive built; export blocked on an Apple ID in Xcode

### Done
- [observed] Cia said "Go" to the listed next steps. Committed and pushed fc8d927 (rename, listing v3, public/privacy.html). Deployed production photon-to-phenomenology-op3t6hisg-ciamacparhizi-9083s-projects.vercel.app (CLI). Live: https://photon.ciamac.com/privacy answers 200 with no analytics tag; /photon, /photon/book, /shorts, /photon/kanizsa 200; all 17 index links 200. ROLLBACK: `vercel rollback photon-to-phenomenology-hpvpf6wlt-ciamacparhizi-9083s-projects.vercel.app` (previous production, 2026-10-04).
- [observed] Release archive for iOS built: ios/build/Illusions.xcarchive (signed with the Apple Development identity), bundle id com.ciamac.illusions.
- [observed] `xcodebuild -exportArchive` (method app-store-connect, destination export, ios/ExportOptions_AppStore.plist) FAILED: "No Accounts" and "No profiles for com.ciamac.illusions". Xcode has no Apple ID signed in, so it cannot create the App ID or the App Store provisioning profile. Not worked around: entering Apple credentials is Cia's.

### Previous pending
- carried: how the voice sounds on the phone; price (free) and icon (A) sign-off.

### Pending / open
- BLOCKED on Cia: Xcode, Settings, Accounts, add the Apple ID that owns team 3AUT8DTWP3. Then rerun the export (and the upload).
- Cia, in App Store Connect (needs his login and agreements): My Apps, New App: name "Ciamac's Book of Illusions", bundle id com.ciamac.illusions, subtitle "Illusions you can touch", privacy URL https://photon.ciamac.com/privacy, price free, App Privacy "Data Not Collected", age rating 4+, screenshots from ios/build/store/final, text from ios/APP_STORE_LISTING_DRAFT_v3.md. Upload the build, then submit for review (each step Cia's go).
- ios/ExportOptions_AppStore.plist is new and uncommitted.

### Durable thought
none, reason: in-flight checkpoint.

---

## IN FLIGHT 2026-10-05 - app renamed Ciamac's Book of Illusions (D-0644)

### Done
- [observed] Cia confirmed the app is about optical illusions and said "go" to the proposed rename. Display name Illusions, App Store name Ciamac's Book of Illusions, subtitle Illusions you can touch, bundle id com.ciamac.illusions. Changed in ios/project.yml, ios/Photon/LibraryView.swift (header), tools/shoot_*.sh (bundle id). New ios/APP_STORE_LISTING_DRAFT_v3.md (v1, v2 kept).
- [observed] Release build for the iPhone installed as com.ciamac.illusions and launched; the old com.ciamac.photon was uninstalled from the phone (its saved mute choice went with it). Library header fits in the simulator.

### Previous pending
- carried: how the voice sounds on the phone and the screen staying awake (Cia); price, icon pick; privacy policy page; App Store Connect steps (sign, archive, TestFlight, upload, submit) need Cia's go.
- Uncommitted and unpushed: the rename and listing v3 (Cia has not asked for a commit).

### Pending / open
- The App Store name is not confirmed available until App Store Connect.
- photon.ciamac.com and the pieces still say Photon to Phenomenology on purpose (the series name).

### Durable thought
none, reason: in-flight checkpoint.

---

## IN FLIGHT 2026-10-04 (11) - Photon app: narration with a mute button; small-phone guide card fixes; on Cia's iPhone

### Done
- [observed] Cia (after trying it on his phone): "is good the guidebox overlaps the illusion" (a negation looks missing; read as the card still covering the figure) and "add a voice to each that can be muted". Measured the guide card at his iPhone 15 size (393 by 852) and Pro Max (440 by 956): no overlap on any piece. The SE class (375 by 667) failed on kanizsa, muller-lyer and checker-shadow; fixed (those pieces and ponzo, ebbinghaus now reserve the card; the card is smaller on short screens).
- [observed] Narration: ios/Photon/Narrator.swift (AVSpeechSynthesizer, best installed English voice, duckOthers, mute kept in UserDefaults, starts muted if VoiceOver is on, a recorded Pieces/audio/<id>.m4a overrides the voice); page side in chrome_app.js (say, _voice, _done; the guide waits for each line, 45 s rescue); speaker button in PieceScreen. Simulator log shows kanizsa speaking steps 0 to 3 in turn (say, done, advance), mute stopping speech and persisting across launch, unmute speaking the current step, and the two lab pages reading their p.instruction intro.
- [observed] Verifier: narration check (one clean line per guide step; lab pages offer an introduction; negative control fails as it should), scroll-by-design exception, late-inset test only for notch phones, new sizes phone15, phoneSE, phoneMax. tools/verify_all.sh with ONLY_SIZES=phone,pad,padL,phone15,phoneSE,phoneMax: failures 0 of 21.
- [observed] PrivacyInfo.xcprivacy now declares UserDefaults (CA92.1) for the mute choice. ios/CONSTITUTION_APP_v10.md and ios/APP_STORE_LISTING_DRAFT_v2.md written (v1 files kept).
- [observed] Release build with narration installed and launched on Cia's iPhone 15 (devicectl); release binary has no debug hook strings. Not committed or pushed: these changes are local only.

### Previous pending
- carried: whether the on-device voice sounds right and the screen stays awake in stare pieces (Cia to report); name, price, icon pick; privacy policy page; App Store Connect steps need Cia's go; the shorts re-voicing session may choose a voice that the app could reuse.

### Pending / open
- The voice is the iOS system voice. Pronunciation of names (Muller-Lyer, Ebbinghaus, Kanizsa, Cornsweet) is untested on device.
- If Cia still sees the card over a figure on his phone: need the piece name or a screenshot; my measurements say none at 393 by 852.

### Durable thought
none, reason: in-flight checkpoint.

---

## IN FLIGHT 2026-10-04 (10) - Photon app installed on Cia's iPhone (development signing)

### Done
- [observed] Cia asked to check it on his phone. Built Release for the iPhone 15 (iOS 27.2, Developer Mode on, paired) with automatic signing: identity Apple Development ciamacparhizi@gmail.com, profile "iOS Team Provisioning Profile: *" (a team wildcard profile, no explicit app id was created). Installed com.ciamac.photon with devicectl; install succeeded.
- [observed] Launch from the Mac failed because the phone was locked (FBSOpenApplicationErrorDomain 7, Locked). Cia opens it by hand. If iOS says untrusted developer: Settings, General, VPN and Device Management, trust the Apple Development profile.

### Previous pending
- carried: what Cia sees on the phone (haptics, screen staying awake during stare-and-wait pieces); name, price, icon pick; privacy policy page; App Store Connect steps need Cia's go.

### Pending / open
- Release build for device lives in ios/build-device (gitignored, uncommitted .gitignore line).

### Durable thought
none, reason: in-flight checkpoint.

---

## IN FLIGHT 2026-10-04 (9) - pushed and deployed; the index link fix is live (see the decision entry just appended)

### Done
- [observed] Pushed main to origin (036fc60 iOS app, 9775a14 .vercelignore). Deployed production with `vercel deploy --prod --yes`: new production deployment photon-to-phenomenology-hpvpf6wlt-ciamacparhizi-9083s-projects.vercel.app. Live check: 17 of 17 index links return 200; /photon, /photon/book, /shorts, /photon/kanizsa, /photon/book/troxler-fading return 200; / is 307 to /photon.
- [observed] CORRECTION to the 2026-10-01 runbook above: a git push does NOT deploy this site (no git integration; GitHub shows no deployment or status). Deploy is the CLI only. The earlier "git push ... auto-deploys" lines are wrong.
- [observed] ROLLBACK now: `vercel rollback photon-to-phenomenology-33chpn7xl-ciamacparhizi-9083s-projects.vercel.app` (the 2026-09-04 production deployment), or `vercel promote` of it.

### Previous pending
- done: live deploy of the index link fix (needed Cia's go; given 2026-10-04 in chat).
- carried: real-device check; Cia's name, price, icon pick, listing sign-off; privacy policy page and App Store Connect steps (signing, archive, TestFlight, upload, submit) need Cia's go; the other session's shorts work is uncommitted in this checkout.

### Pending / open
- On this Mac: signing identities exist for team 3AUT8DTWP3 (Apple Development, Apple Distribution) and Cia's iPhone is connected; the unsigned Release archive for arm64 builds (ios/build/Photon.xcarchive).

### Durable thought
none, reason: the correction is recorded in the decision log.

---

## IN FLIGHT 2026-10-04 (8) - about to push main (Cia said "push commit, do whatever you need")

### Done
- [observed] Cia gave the go in chat to commit and push. Local main is 23 commits ahead of origin and 0 behind (fetched). Added lines scanned for secrets: none.
- [observed] What goes live: git auto-deploys photon.ciamac.com. /shorts already answers 200 on the current production deployment, so the media and the root redirect in the earlier commits are already live; the new live change is the index link fix (082fede). My commit adds ios/ only, which is not under public/ and is not served.
- [observed] Not committed on purpose: the other session's unfinished shorts work in this checkout (shorts/engine edits, shorts/audio, build_v5, vo_v5.py, gallery_v5 to v7 and the rest of the untracked shorts files), plus shorts/gallery_v4.html and shorts/CONTACT_SHEET_v4.png from this session, and SESSION_STATE.md.lock.

### Previous pending
- carried: all earlier items; the push below executes "live deploy of the index link fix awaits Cia's go".

### Pending / open
- ROLLBACK if the live site is wrong after the push: `vercel rollback photon-to-phenomenology-33chpn7xl-ciamacparhizi-9083s-projects.vercel.app` from ~/Developer/photon-to-phenomenology (that is the production deployment read just before the push, 30 days old). Source rollback: `git revert 082fede` then push.
- After the push: verify /photon, /photon/book and all 17 index links return 200 on photon.ciamac.com.

### Durable thought
none, reason: pre-push checkpoint.

---

## IN FLIGHT 2026-10-04 (7) - Photon iOS app: iPad landscape, privacy manifest, store screenshots, listing draft (D-0624)

### Done
- [observed] iPad landscape (1376 by 1032) added to ios/tools/verify_piece.mjs; it found troxler-fading, change-blindness and inverse-problem failing. All three fixed (fit box with the guide reserved; change-blindness measures taps from the box, tap tested in the app: "not that one" and the marker lands on the tapped tile). tools/verify_all.sh: failures 0 of 21 at phone, iPad portrait and iPad landscape. ios/CONSTITUTION_APP_v9.md (v1 to v8 kept).
- [observed] Privacy manifest Photon/PrivacyInfo.xcprivacy (no tracking, no collected data, no restricted APIs) is bundled in the built app. UserDefaults appears only in DEBUG test hooks.
- [observed] App Store screenshot drafts, exact sizes 1320 by 2868 (iPhone 6.9 inch, simulator iPhone 17 Pro Max) and 2064 by 2752 (iPad 13 inch): 8 each in ios/build/store/final/ (kanizsa, ebbinghaus, cornsweet, cafe-wall in their illusion states, checker-shadow, motion-induced-blindness, receptive-field, library), contact sheets SHEET_iphone69.png and SHEET_ipad13.png. Scripts: tools/shoot_store.sh. build/ is gitignored.
- [observed] ios/APP_STORE_LISTING_DRAFT_v1.md: name, subtitle, description, keywords, category, age rating, privacy answers, review notes, things to know. All proposals; nothing entered anywhere.

### Previous pending
- done: iPad landscape; privacy manifest; store screenshots draft; listing draft.
- carried: real-device check (haptics, screen hold); Cia's name, price, icon pick, listing sign-off; privacy policy page (needs a deploy, so needs Cia's go); live deploy of the index link fix awaits Cia's go; apparent-motion keeps a small dot on iPad.

### Pending / open
- Needs Cia's go (account or outward-facing): signing and archiving (registers com.ciamac.photon on team 3AUT8DTWP3), TestFlight, App Store Connect record and upload, privacy policy page on photon.ciamac.com, submission.
- Cia to decide: whether to add a short flashing-content line (apparent-motion blinks two small dots up to about 14 per second; area is small, under the general flash-safety area threshold).

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## IN FLIGHT 2026-10-04 (6) - Photon iOS app: iPad touch verified, clearance rule, icon candidates (D-0624)

### Done
- [observed] iPad touch by hand on the iPad Pro 13 simulator for the three enlarged pieces: aperture-problem rim drag widened the aperture; troxler-fading drag moved the ring outward and reset the still timer; motion-induced-blindness drag raised the mask speed to 0.76 rad/s and the lattice rotated across three screenshots (build/app/ipt_all.png, ipt_mib_seq.png).
- [observed] Guide card clearance: verifier now requires 10 points of clear air above the card; all 21 pieces pass at phone and iPad size. ios/CONSTITUTION_APP_v8.md (v1 to v7 kept).
- [observed] App icon: three candidates in ios/icon_candidates/ (A Kanizsa triangle, B spiral, C Ponzo rails; preview icons_preview.png). Candidate A installed as the working icon in Assets.xcassets/AppIcon.appiconset; it shows on the simulator home screen (build/app/home_s.png). The choice of icon is Cia's.

### Previous pending
- done: iPad touch for the enlarged pieces; tight clearance above the guide card.
- carried: real-device check (haptics, screen hold); Cia's name, price, icon pick, listing text, privacy answers; live deploy of the index link fix awaits Cia's go; apparent-motion keeps a small dot on iPad.

### Pending / open
- NOT started, each needs Cia's go because it touches his Apple account or is outward-facing: signing and archiving (automatic signing registers the app id com.ciamac.photon on team 3AUT8DTWP3), a TestFlight build, App Store Connect record, screenshots upload, submission.
- Working bundle id com.ciamac.photon and display name Photon are placeholders.

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## IN FLIGHT 2026-10-04 (5) - Photon iOS app: guide card no longer covers any figure (D-0624)

### Done
- [observed] Cia asked again for the guide card fix. The earlier check (1 percent of the card's box) missed thin figures. Tightened to any visible figure (40 or more device pixels) under the card at any guide step, at phone and iPad size.
- [observed] Two false alarms from the test fixed in ios/tools/verify_piece.mjs: the guide's step dots fade out slowly (counted as figure), and hiding the card with display:none made the page re-fit the figure under it. The card is now hidden with a style that changes no layout.
- [observed] Strict result before the fix: 5 of 21 covered (cafe-wall, cornsweet, scintillating-grid at first; then motion-aftereffect, motion-induced-blindness once the false alarms were removed). Fixed: motion-aftereffect uses PhotonApp.fit(cv,{reserveGuide:true}); motion-induced-blindness uses PhotonApp.bands({reserveGuide:true}). All 21 pass at both sizes.
- [observed] Seen in the running app, guide open, all 21 pieces on the iPhone 18 Pro and iPad Pro 13 simulators: CONTACT_SHEET_guide_phone.png and CONTACT_SHEET_guide_pad.png in ios/. Tools: ios/tools/shoot_guide.sh.
- [observed] ios/CONSTITUTION_APP_v7.md written (v1 to v6 kept).

### Previous pending
- done: guide card covers the figure (strict).
- carried: real-device check (haptics, screen hold); touch on the iPad for the enlarged pieces; Cia's name, price, icon, listing; live deploy of the index link fix awaits Cia's go; apparent-motion keeps a small dot on iPad.

### Pending / open
- Tight but not overlapping on a phone: the lower arrow of the Muller-Lyer figure and the checker-shadow board sit a few points above the card with the guide open.

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## IN FLIGHT 2026-10-04 (4) - Shorts: Cia named v7 the master

### Done
- [observed] Cia in chat: "v7 is the master". Recorded in the decision log this session (see CANON line in the session report).

### Previous pending
- done: master pick among v5, v6, v7.
- carried: release lane needs new copy and durations, nothing staged; Photon repo changes uncommitted; new audio and build folders not in .gitignore; index link fix deploy awaits Cia's go; iOS items.

### Pending / open
- Handover to the release lane needs Cia's explicit go; v7 masters are a single copy on this disk (shorts/out, gitignored).

### Operational notes
- none

### Durable thought
none, reason: a pick, recorded in the decision log.

---

## IN FLIGHT 2026-10-04 (4) - Photon iOS app: guide card and blank start fixed, Release build checked (D-0624)

### Done
- [observed] New verifier check (ios/tools/verify_piece.mjs): steps through every guide step, hides the card, tests the pixels under it. It found 3 of 21 pieces covered: cafe-wall, cornsweet, scintillating-grid. The other 18 were not.
- [observed] Fix: the guide card now has one constant height (the tallest step) set in chrome_app.js init, and PhotonApp.fit(cv,{reserveGuide:true}) keeps the figure box above it; used by those three. All 21 pass the verifier. Seen in the running app on the iPhone 18 Pro simulator (build/app/fix_sheet.png): figures end above the card.
- [observed] trichromatic-mixing now opens with red at 100 percent (source opened blank). One attribute; recorded as a named exception in ios/CONSTITUTION_APP_v6.md.
- [observed] Release build (build-release/) contains none of PHOTON-BRIDGE, skipGuide or wskip; the Debug build contains all three. So the test hooks do not ship.

### Previous pending
- done: guide card covers the figure; trichromatic blank start; DEBUG hooks excluded from Release.
- carried: real-device check (haptics, screen hold); Cia's name, price, icon, listing; live deploy of the index link fix awaits Cia's go; apparent-motion keeps a small dot on iPad.

### Pending / open
- Not yet checked: touch on the iPad for the enlarged pieces; the Release build was built for the simulator unsigned, not archived.

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## IN FLIGHT 2026-10-04 (3) - Photon iOS app: iPad figure sizes and button overlap fixed (D-0624)

### Done
- [observed] aperture-problem, motion-induced-blindness and troxler-fading now lay out on a phone-sized logical canvas and enlarge it (K = max(1, min(w,h)/402), pointer divided by K). On a phone K is 1. On the iPad Pro 13 simulator all three fill the screen (build/app/new_pad_trio.png, CONTACT_SHEET_app_v4_pad.png).
- [observed] motion-induced-blindness clips its drawing to PhotonApp.bands() (new, chrome_app.js) so the scaled lattice stays out from under the thesis text.
- [observed] Native scrim behind the button row on scrolling pages (Piece.scrolls = the Lab section; PieceScreen.swift). On the phone, contrast-sensitivity scrolled: content is hidden behind the band and the buttons sit clear; at scroll zero the first line is not dimmed. On the iPad the lab pages barely scroll in portrait, so the overlap rarely arises there.
- [observed] node ios/tools/verify_piece.mjs exits 0 for all 21 pieces. ios/CONSTITUTION_APP_v5.md written (v1 to v4 kept).

### Previous pending
- done: iPad figure sizes; button overlap on scrolled lab pages.
- carried: guide card covers the lowest part of the figure on a phone while open; trichromatic-mixing opens blank (source starts all lights at zero); apparent-motion keeps a small dot on iPad (its size is already proportional); real-device check of haptics and screen hold; Release build must exclude the DEBUG hooks; Cia's name, price, icon, listing; live deploy of the index link fix awaits Cia's go.

### Pending / open
- Interaction on the iPad (drag on the enlarged aperture, troxler and mask pieces) not exercised by touch; only measured and photographed.

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## 2026-10-04 EXIT (3) - Shorts v7: raised to -14 LUFS (CLOSED)

Snapshot before this block: none (append only).
Cia asked for -14. v7 is the v5 picture (stream copy) with audio at -14 LUFS; v6, v5, v4 kept.

### Done
- [observed] audio/mix_v7/*.wav from audio/mix_v5_raw: per-file gain +3.1 to +7.7 dB (most: motion-aftereffect), alimiter ceiling -1.5 dBFS; loudness.json holds each gain.
- [observed] 22 files shorts/out/<slug>_short_v7.mp4. VER=v7 python3 shorts/verify_v5.py: ALL CHECKS PASS, loudness -14.2 to -14.0 LUFS, peaks -1.5 to -0.8 dBFS, lengths and timing identical to v5. File counts in out/: v4 22, v5 22, v6 22, v7 22.
- [observed] shorts/gallery_v7.html written and opened in Chrome.

### Previous pending
- done: the -14 option noted in the previous block.
- carried: Cia's ear on the set (now v7); release lane needs new copy and durations, nothing staged; Photon repo changes uncommitted; new audio and build folders not in .gitignore; index link fix deploy awaits Cia's go; iOS items.

### Pending / open
- Limiter strain is unjudged by ear: up to 7.7 dB of gain into the limiter on motion-aftereffect. If it sounds squashed, v6 (-16) is the fallback.
- Which of v5, v6, v7 is the master for release is Cia's call; only one may go to the release folder (RELEASE_CONTRACT_v1.md point 1).

### Operational notes
- v6 and v7 are level passes on the v5 picture. A wording or timing change means re-rendering from the v5 recipe, then repeating the level step.

### Durable thought
none, reason: a level pass.

### Repo state
### Repo state

Computed by `exit-stamp` at 2026-10-04T09:07:36-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `dfd03f0 exit ritual: ship and rollback runbook for index link fix` (committed 2026-10-01)
- tree: **20 uncommitted change(s)**
- upstream: origin/main (ahead 23, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1
- test: `python3 shorts/verify_v5.py` -> exit 0: ALL CHECKS PASS

### Why we stopped
finished

---

## 2026-10-04 EXIT (2) - Shorts v6: v5 raised to -16 LUFS through a limiter (CLOSED)

Snapshot before this block: none (append only).
Cia asked for the limiter pass and more volume. v6 is the v5 picture (stream copy) with louder audio; v5 and v4 kept.

### Done
- [observed] audio/mix_v6/*.wav made from audio/mix_v5_raw: per-file gain +1.0 to +5.2 dB, then ffmpeg alimiter, ceiling -2 dBFS; loudness.json holds each gain.
- [observed] 22 files shorts/out/<slug>_short_v6.mp4. VER=v6 python3 shorts/verify_v5.py: ALL CHECKS PASS, loudness -16.1 to -16.0 LUFS, peaks -2.2 to -1.6 dBFS, lengths, VO gaps and timing identical to v5. 22 v5 and 22 v4 files still present.
- [observed] shorts/gallery_v6.html written and opened in Chrome. verify_v5.py now takes VER (default v5).

### Previous pending
- done: limiter pass (was offered in the previous block).
- carried: Cia's ear on the set (now v6); release lane needs new copy and durations, nothing staged; Photon repo changes uncommitted; new audio and build folders not in .gitignore; index link fix deploy awaits Cia's go; iOS items.

### Pending / open
- Target was my choice: -16 LUFS. Platforms normalise near -14; going there means about 2 dB more limiting on the voice. Not done.

### Operational notes
- v6 = v5 picture. Any future wording or timing change must re-render from the v5 recipe, then repeat the level step.

### Durable thought
none, reason: a level pass; nothing new beyond the previous block's thought.

### Repo state
### Repo state

Computed by `exit-stamp` at 2026-10-04T08:57:47-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `dfd03f0 exit ritual: ship and rollback runbook for index link fix` (committed 2026-10-01)
- tree: **19 uncommitted change(s)**
- upstream: origin/main (ahead 23, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1
- test: `python3 shorts/verify_v5.py` -> exit 0: ALL CHECKS PASS

### Why we stopped
finished

---

## 2026-10-04 EXIT - Shorts v5: all 22 re-voiced (Heart) with simpler wording, measured, gallery built (CLOSED)

Snapshot before this block: none (append only).
Cia picked the Kokoro Heart voice (D-0625) and approved the simpler wording, end card kept (D-0628). All 22 shorts rendered as v5; v4 untouched.

### Done
- [observed] shorts/shorts.config.v5.json: approved wording (41 screen-text replacements, 31 spoken lines changed); shorts.config.json unchanged.
- [observed] 44 VO lines in shorts/audio/vo_v5/ (manifest.json with measured durations), voice af_heart speed 0.88; 44 of 44 passed the word-content gate (base.en exact).
- [observed] verify_layout.mjs on build_v5/*.html: all pages PASS (header max 441 of 470).
- [observed] 22 files shorts/out/<slug>_short_v5.mp4. python3 shorts/verify_v5.py: ALL CHECKS PASS: audio stream in every file, audio and video lengths agree, smallest gap between VO lines 1.06 s, every last line ends 0.50 s or more before the end card, loudness -21.0 to -20.9 LUFS across the set, countdown, sweep, authored end and every VO start time identical to v4 config.
- [observed] Assembled-piece check: audio of each finished mp4 transcribed by whisper large-v3-turbo, 22 of 22 match the script exactly.
- [observed] 22 v4 files still in out/ (kanizsa v4 mtime Aug 8). shorts/gallery_v5.html written and opened in Chrome.
- [observed] Mixes: audio/mix_v5_raw (as mixed, -17.0 to -20.9 LUFS) and audio/mix_v5 (levelled by attenuation to -20.9; loudness.json).

### Previous pending
- done: wording approval and the v5 render (this block).
- carried: live deploy of the index link fix (082fede) awaits Cia's explicit go; main is ahead of origin.
- carried: iOS app items from the 2026-10-03 IN FLIGHT blocks (not this session's scope; ios/ untouched).

### Pending / open
- Cia's ear on the v5 set (gallery_v5.html). The set sits at -20.9 LUFS, about 1.5 LU quieter than v4; raising it needs a limiter pass, offered not done.
- Release lane: v5 lengths and wording differ from v4, so any staged copy or durations need redoing before release. Nothing was staged or uploaded (RELEASE_CONTRACT_v1.md).
- Uncommitted in the Photon repo: engine/short.mjs, music.py, render.mjs (env switches, defaults reproduce v4), new engine/vo_v5.py, engine/vo_gate.py, verify_v5.py, shorts.config.v5.json, gallery_v5.html, audition_v5.html, WORDING_v5_PROPOSAL_v1.md. Cia said no commits this session.
- shorts/audio/vo_v5, mix_v5, mix_v5_raw, audition_v5_2026-10-03, build_v5 are NOT covered by .gitignore patterns (only audio/vo and audio/mix are); decide ignore versus track before the next commit.

### Operational notes
- Run recipe: SHORTS_CONFIG=shorts.config.v5.json SHORTS_VO_DIR=audio/vo_v5 SHORTS_MIX_DIR=audio/mix_v5 SHORTS_BUILD=build_v5 SHORTS_FRAMES=frames/v5 SHORTS_VER=v5, then vo_v5.py, music.py (to mix_v5_raw, then level), short.mjs, verify_layout.mjs, render.mjs, verify_v5.py. Sandbox off.
- Kokoro venv lived in the session scratchpad and is gone after this session. Rebuild: uv venv -p 3.11; uv pip install "kokoro>=0.9" "transformers>=4.44" "tokenizers>=0.19" soundfile numpy; HF_HUB_DISABLE_XET=1; needs Homebrew espeak-ng (vo_v5.py points at it).

### Durable thought
Captured to Open Brain: for a non-clone narrator, Kokoro-82M stock voices run locally and free, and passed the word gate 44 of 44; see the exit report.

### Repo state
### Repo state

Computed by `exit-stamp` at 2026-10-04T00:33:50-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `dfd03f0 exit ritual: ship and rollback runbook for index link fix` (committed 2026-10-01)
- tree: **18 uncommitted change(s)**
- upstream: origin/main (ahead 23, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1
- test: `python3 shorts/verify_v5.py` -> exit 0: ALL CHECKS PASS

### Why we stopped
finished

---

## IN FLIGHT 2026-10-04 (2) - Photon iOS app: all 21 pieces opened and inspected inside the app (D-0624)

### Done
- [observed] All 21 pieces launched inside the app on iPhone 18 Pro and iPad Pro 13 simulators via debug launch hooks (`-piece <slug> -skipGuide YES`, DEBUG builds only) and photographed guide open and guide closed; contact sheets ios/build/app/SHEET_{phone,pad}_{open,closed}.png. Scripts: ios/tools/shoot_app.sh, ios/tools/sheet_app.py.
- [observed] Touch checks in the running app: contrast-sensitivity scrolls to its end and a slider drag changes viewing distance without scrolling; kanizsa drag rotates the discs (153 to 239 degrees) without scrolling; receptive-field light drag flips EXCITED to SUPPRESSED without scrolling.
- [observed] Bridge reaches the native side from a real web view (NSLog under DEBUG): kanizsa sent 2 reveal haptics in 24 s of the guided walk, afterimage sent hold on then off, troxler-fading sent hold on. The device-side effect (haptic, idle timer) cannot be seen in the simulator.
- [observed] Fixed: a test hook clicked a skip button lab pages lack, which showed a stray "guide me again" pill on lab pages (artifact of the test only).

### Previous pending
- done: remaining pieces opened and inspected in the app.
- carried: real-device check (haptics, screen hold); Cia's name, price, icon, listing; live deploy of the index link fix (082fede) awaits Cia's go.

### Pending / open
- Minor, not fixed: (1) on a phone the guide card covers the lowest part of the figure while it is open (worst on cafe-wall); (2) on long lab pages the floating native buttons sit over scrolled content, including a slider; (3) on the 13-inch iPad aperture-problem, motion-induced-blindness and troxler-fading keep phone-sized figures and look sparse; (4) trichromatic-mixing starts blank because the source starts all lights at 0.
- The debug hooks (LibraryView .onAppear, PieceScreen didFinish and NSLog) sit under #if DEBUG; confirm a Release build excludes them before any submission.

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## IN FLIGHT 2026-10-04 - Shorts v5: voice picked (Heart), wording proposal waiting on Cia

### Done
- [observed] Cia picked voice A, Kokoro af_heart, and "simplify, show me first" (AskUserQuestion answers, 2026-10-04). Recorded in the decision log this session.
- [observed] shorts/WORDING_v5_PROPOSAL_v1.md written: before and after for all 22, spoken and on-screen. shorts.config.json NOT changed.
- [observed] v5 pipeline built and dry-run on kanizsa and troxler into test folders (since removed): engine/vo_v5.py (new), engine/vo_gate.py (copied from branch claude/quizzical-meitner-afa864), env switches SHORTS_CONFIG, SHORTS_VO_DIR, SHORTS_MIX_DIR, SHORTS_BUILD, SHORTS_FRAMES, SHORTS_VER added to short.mjs, music.py, render.mjs (defaults reproduce v4). Test result: 4 of 4 lines passed the word gate; kanizsa 8.24 s video and audio, -19.0 LUFS; troxler 11.73 s, -20.3 LUFS. 22 v4 files still present in out/.

### Previous pending
- done: voice pick (A, Heart).
- carried: everything else in the 2026-10-03 EXIT block below.

### Pending / open
- WAITING ON CIA: approve, edit or reject the wording list, and the optional end card line.
- THEN: write shorts.config.v5.json (copy plus approved wording; never edit shorts.config.json), run with SHORTS_CONFIG=shorts.config.v5.json SHORTS_VO_DIR=audio/vo_v5 SHORTS_MIX_DIR=audio/mix_v5 SHORTS_BUILD=build_v5 SHORTS_FRAMES=frames/v5 SHORTS_VER=v5: vo_v5.py, music.py, short.mjs, verify_layout.mjs, render.mjs. Then loudness-normalise the set to one target, measure, gallery_v5.html.
- Loudness varies about 1.3 LU between pieces as mixed; add a per-file normalise step for v5.

### Operational notes
- Kokoro venv is still in the session scratchpad (temp). See the block below for the rebuild recipe. short.mjs log line still prints "build/" regardless of SHORTS_BUILD (cosmetic).

### Durable thought
none, reason: in-flight checkpoint.

---

## IN FLIGHT 2026-10-04 - Photon iOS app: inset rule applied, 21 of 21 pass, runs on iPhone and iPad simulators (D-0624)

### Done
- [observed] Cia ruled for the inset. PhotonApp.fit() added to ios/Photon/Pieces/chrome_app.js and applied to scintillating-grid, cafe-wall, cornsweet, ponzo, ebbinghaus, checker-shadow. Ebbinghaus also scaled and centred by extent so no ring leaves the screen.
- [observed] ios/tools/verify_piece.mjs gained a figure-under-text check (hide text, photograph, test pixels under each text box) and a late-safe-area test. Without the watcher the late-inset test fails cornsweet; with it, it passes. `verify_piece.mjs` exits 0 for all 21 pieces.
- [observed] Two bugs found by using the running app: PieceScreen did not reload the page on next/previous (fixed with .id(piece.slug)), and the figure was fitted before iOS applied the top inset (fixed with a re-fit watcher). Checked on iPhone 18 Pro (Ebbinghaus, next to Cornsweet) and iPad Pro 13 (Ebbinghaus).
- [observed] ios/CONSTITUTION_APP_v4.md written (v1 to v3 kept). Contact sheet ios/CONTACT_SHEET_app_v2.png.

### Previous pending
- carried: live deploy of the index link fix (082fede) awaits Cia's explicit go; main is 22 commits ahead of origin.
- done: figure-versus-text collisions (the NEXT item of the previous block).
- carried: not yet checked on a real device (haptics, screen hold); not yet checked: the other 19 pieces opened inside the app (only 3 opened there; all 21 measured in a browser at both sizes).

### Pending / open
- Open the remaining pieces inside the app on both simulators and look at each, especially the five lab pieces (long scrolling pages) and the fixation pieces.
- Cia's: app name, price, icon (placeholder set, no image), App Store listing, privacy details. Nothing signed, uploaded, committed, pushed or deployed.
- Minor open: a drag must start on the figure box (not the text bands); motion-aftereffect releases the screen hold when the spiral stops; about 10 shorts-only pieces have no interactive page.

### Operational notes
- xcodegen, xcodebuild, simctl and the verifier need the sandbox off. Simulator screenshot: pass the UDID (iPhone 18 Pro 88000C4C-0FFA-497C-B9EA-5502F27929CA, iPad Pro 13 6246D73A-FCF1-45E5-A8BA-5EDE185DD7D0).
- The audio re-voicing of the shorts runs in a separate session (spawned 2026-10-03); this lane does not touch shorts/.

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## 2026-10-03 EXIT - Shorts v5 re-voice for children: audition delivered, waiting on Cia's voice pick (OPEN)

Snapshot before this block: none (append only).
Cia asked for a voice that appeals to children and young people on the 22 v4 shorts. Step 1 (measure the current voice) and step 2 (audition on kanizsa) are done; bulk re-voice has NOT started and must not start before he picks.

### Done
- [observed] Engine question settled from canon: the "redo on ElevenLabs" note in shorts/engine/vo.py is stale. D-0334 (2026-09-08) keeps the local engine; primary ElevenLabs account is payg with cloning off; second plan ends 2026-10-19 (D-0469).
- [observed] Current v4 voice measured over all 44 lines in shorts/audio/vo: median pitch 91 Hz (low adult male), pace 1.31 to 4.36 words/s across lines (mean 156 wpm), "Do you see a triangle?" spoken in 1.15 s. v4 loudness on three files: kanizsa -19.6, afterimage -19.4, troxler -20.7 LUFS.
- [observed] Five audition takes on kanizsa with Kokoro-82M stock voices (local, free, no real person cloned), speed 0.88: A af_heart (about 210 Hz), B am_puck (122 Hz), C bf_emma (183 Hz), D af_bella (200 Hz), E af_heart with simpler wording. All ten lines transcribed word-for-word correct by whisper large-v3-turbo. Files: shorts/audio/audition_v5_2026-10-03/ (wavs, manifest.json, kanizsa_<X>.mp4 = v4 picture + voice only, render_audition.py). Page: shorts/audition_v5.html.
- [proposed] Simpler-wording list for children (see Pending); nothing in shorts.config.json was changed.

### Previous pending
- carried: live deploy of the index link fix (082fede) awaits Cia's explicit go; main is 22 commits ahead of origin.
- carried: iOS app items (figure-versus-text collisions on six pieces, iPad and device checks, app name, price, icon, listing). Not this session's scope; ios/ untouched.

### Pending / open
- WAITING ON CIA: pick a voice (A, B, C, D, or ask for other stock voices), and say yes or no to simpler wording.
- THEN: re-voice all 22 to shorts/audio/vo_v5/ (new folder, own manifest.json), mix to shorts/audio/mix_v5/, render shorts/out/<slug>_short_v5.mp4, measure (audio stream, no VO overlap, LUFS per file, countdown timing unchanged on afterimage, motion-aftereffect, troxler), build gallery_v5.html.
- music.py and short.mjs read audio/vo/manifest.json by fixed path; v5 needs a path switch (env var), not an overwrite.
- The word-content gate (vo_gate.py, verify_vo.py, commit e21ed7b) exists only on branch claude/quizzical-meitner-afa864, not on main. Bring it over (as files, no merge) for the v5 pass.
- Wording a child may not follow: "Congruent" (shepard-tables), "You supplied it" (kanizsa), "One contour, two objects" (rubin-vase), "Dead level" (cafe-wall), "shaft", "fins" (muller-lyer), "seam" (cornsweet). The on-screen beats carry the same words, so a wording change touches picture as well as voice.

### Operational notes
- Kokoro runs from a throwaway venv in the session scratchpad (kk/, with HF_HOME and UV_CACHE_DIR also there); it is temp and will vanish. Rebuild: uv venv -p 3.11, uv pip install "kokoro>=0.9" "transformers>=4.44" "tokenizers>=0.19" soundfile numpy. Three fixes needed: point espeakng_loader at /opt/homebrew/lib/libespeak-ng.dylib and /opt/homebrew/share/espeak-ng-data (the bundled path hard-exits the process), set UV_CACHE_DIR and HF_HOME to a writable dir, set HF_HUB_DISABLE_XET=1. All in render_audition.py.
- Writing into shorts/ from a worktree session needs the sandbox off. whisper-cli prints nothing inside the sandbox without -ng (Metal blocked).
- The fresh worktree branch (claude/competent-wiles-11277d at 69c3077) has no shorts/ at all; all work is by absolute path in the main checkout.

### Durable thought
none, reason: audition only; nothing learned yet that changes a future action beyond the operational notes above.

### Repo state
### Repo state

Computed by `exit-stamp` at 2026-10-03T23:56:23-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `dfd03f0 exit ritual: ship and rollback runbook for index link fix` (committed 2026-10-01)
- tree: **7 uncommitted change(s)**
- upstream: origin/main (ahead 23, behind 0)
- merged into HEAD: 1 auto-named claude/* branch
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
Blocked on Cia's voice pick (his taste call, by instruction).

---

## IN FLIGHT 2026-10-03 (2) - Photon iOS app: 21 pieces ported, measured, in the simulator build (D-0615)

### Done
- [observed] 21 pieces in ios/Photon/Pieces; `node ios/tools/verify_piece.mjs <slug>` exits 0 for all 21 (run 23:2x, failures: 0 of 21). App rebuilt (BUILD SUCCEEDED) with 21 pages in the bundle; library screen seen on iPhone 18 Pro and iPad Pro 13 simulators.
- [observed] Swarm run 1 (haiku workers, wf_3219fd66-4e7) halted at the audition: the worker fired the reveal haptic on every tap and did not fix it on rework. Run 2 (sonnet workers, wf_96ad927f-e09): 18 passed the fidelity check, 1 disputed (contrast-sensitivity, no haptic), 0 unverified. Token use is in the workflow run record.
- [observed] Orchestrator rulings: contrast-sensitivity carries no haptic (no discrete reveal); vertical scrolling is not clipping. Both written into ios/CONSTITUTION_APP_v3.md (v1, v2 kept). Verifier corrected four times against its own false failures (guide-close step, scroll pages, inner scroll panels, hold(variable)).
- [observed] Hand fixes by the orchestrator: afterimage haptic gated on the page own adaptation threshold and "now click" changed to "now tap"; receptive-field label margin widened (overlap existed in the source).
- [inferred] from ios/CONTACT_SHEET_app_v1.png (phone size, guide closed): text collides with the FIGURE on scintillating-grid, cafe-wall, cornsweet, ponzo, checker-shadow, and the Ebbinghaus rings clip at the left edge. The verifier measures text against text, not text against canvas, so it passed them.

### Previous pending
- carried: live deploy of the index link fix (082fede) awaits Cia's explicit go; main is 22 commits ahead of origin.
- done: port swarm returned and was measured.

### Pending / open
- NEXT: figure-versus-text collisions on the six pieces above. Needs a rule (figure inset or a text backing) and a verifier check that samples the canvas under each text block. Taste call on the rule is Cia's.
- Not yet checked: opening pieces on the iPad simulator, the native previous/next buttons, haptics and screen-hold on a real device (the simulator has neither).
- Open minor findings in the swarm output (tasks/w52b1lgft.output): #readout 2px above shell-top on iPad in several gallery pieces; motion-aftereffect releases the screen hold when the spiral stops, which is when the viewer is watching.
- Cia's: app name, price, icon (placeholder set, no image), App Store listing. Nothing signed, uploaded, committed, pushed or deployed.
- About 10 shorts-only pieces have no interactive page yet.

### Operational notes
- xcodegen, xcodebuild, simctl and the verifier all need the sandbox off.
- Swarm v2 script: /private/tmp/claude-501/-Users-ciamac/5881f877-6da0-4028-9ba3-f1cac9376027/scratchpad/swarm_v2.js (temp; copy before reuse).

### Durable thought
none, reason: in-flight checkpoint; capture at exit.

---

## IN FLIGHT 2026-10-03 - Photon iOS app: shell built, port swarm running (D-0615)

### Done
- [observed] Native shell written at ios/ (project.yml, Photon/*.swift, Pieces/chrome_app.{js,css}, catalog.json). `xcodebuild ... -sdk iphonesimulator` returned BUILD SUCCEEDED on Xcode 27.0.
- [observed] Pilot piece kanizsa ported by hand; opens from the app bundle on the iPhone 18 Pro simulator (screenshot seen: guide card, native back button clear of text).
- [observed] ios/tools/verify_piece.mjs: kanizsa passes with 0 findings and 2 haptic messages; an unported copy of ponzo fails with 30+ findings. Must run outside the sandbox (it launches a browser).
- [observed] ios/CONSTITUTION_APP_v1.md written. Decision recorded as D-0615.
- [observed] Inventory corrected: 21 interactive pages (9 gallery, 7 book, 5 sandbox), not 23; 22 shorts at v4 in shorts/out (gitignored, this disk only).

### Previous pending
- carried: live deploy of the index link fix (082fede) awaits Cia's explicit go; main is 22 commits ahead of origin.

### Pending / open
- Port swarm in flight: Workflow run wf_3219fd66-4e7, 20 pieces, haiku workers, fidelity checker per piece. Script path is in the session transcript. After it returns: run `node ios/tools/verify_piece.mjs <slug>` for every piece (outside the sandbox), send findings back for rework, adjudicate disputes, rebuild, check on iPhone and iPad simulators.
- Not started: app icon (placeholder set, no image), App Store listing, privacy details, TestFlight. All need Cia. Nothing is signed or uploaded.
- About 10 shorts-only pieces have no interactive page yet (later update).

### Operational notes
- xcodegen and xcodebuild need the sandbox off (Info.plist write and CoreSimulator are blocked inside it).
- The simulator screenshot tool defaults to another booted device; pass the UDID (iPhone 18 Pro 88000C4C-0FFA-497C-B9EA-5502F27929CA).
- New untracked files in the Photon repo: ios/, shorts/gallery_v4.html, shorts/CONTACT_SHEET_v4.png. Nothing committed, pushed or deployed.

### Durable thought
none, reason: in-flight checkpoint.

---

## 2026-10-01 EXIT - Ship and rollback runbook for the index link fix (CLOSED, NOT DEPLOYED)

Snapshot before this block: none (append only).

### Done
- [observed] Fix is commit 082fede (public/photon/index.html, public/photon/book/index.html). Tested locally (17 of 17 hrefs resolve) and on a stage preview (all 17 links 200). NOT deployed live; no Cia go exists.

### Previous pending
- carried: live deploy awaits Cia's explicit go. main is 22 commits ahead of origin, so a push ships all of them, not only 082fede.

### Pending / open
- DEPLOY (needs Cia's go): `git -C ~/Developer/photon-to-phenomenology push origin main` (auto-deploys photon.ciamac.com, ships all unpushed commits). Verify: `curl -sIL https://photon.ciamac.com/photon/kanizsa | grep -i '^HTTP'` and open /photon and /photon/book links.
- FIX-ONLY alternative (needs Cia's go): branch from origin/main, `git cherry-pick 082fede`, push the branch for a preview, then merge.
- ROLLBACK: current live production deployment before this ship is photon-to-phenomenology-33chpn7xl-ciamacparhizi-9083s-projects.vercel.app (read 2026-10-01 via `vercel ls --prod`). Run `vercel rollback photon-to-phenomenology-33chpn7xl-ciamacparhizi-9083s-projects.vercel.app` (or `vercel promote` of the same URL) from the repo dir. Source rollback: `git revert 082fede` then push. Re-run `vercel ls --prod` first; the live URL may have changed.

### Operational notes
- Two preview deploys from 2026-09-29 exist (target null); harmless.

### Durable thought
none, reason: runbook only.

### Repo state

Computed by `exit-stamp` at 2026-10-01T00:28:47-04:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `b7c1933 exit ritual: index link fix` (committed 2026-09-29)
- tree: **1 uncommitted change(s)**
- upstream: origin/main (ahead 22, behind 0)
- merged into HEAD: none
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished; live deploy gated on Cia's go

---

## 2026-09-29 EXIT - Fix 404s on gallery and book index links (CLOSED)

Snapshot before this block: none (append only).

### Done
- [observed] Root cause: bare domain 307s to /photon (no trailing slash), so relative hrefs on public/photon/index.html and public/photon/book/index.html resolved against /, /photon/book/x.html became /photon/x.html etc. Pieces and chrome.js already use root-absolute paths, so only these two indexes were affected (book index had the same bug, not in the report).
- [observed] 082fede: 10 hrefs in photon/index.html and 7 in photon/book/index.html rewritten to /photon/<slug>, /photon/book, /photon/book/<slug> (clean URLs).
- [observed] Local: script resolved all 17 hrefs from their real page URL against public/ with cleanUrls semantics, 0 bad.
- [observed] Stage: preview deploy photon-to-phenomenology-q0rh8tbhd-ciamacparhizi-9083s-projects.vercel.app (SSO-protected, read with vercel curl); / 307 to /photon, /photon and /photon/book 200, all 17 index links 200.

### Previous pending
- carried: 19 local commits unpushed, now 21; push is a live deploy and needs Cia's go.

### Pending / open
- Live NOT deployed. Push of main ships ALL 21 unpushed commits (shorts sheet, audio, analytics beacon, this fix), not just the fix. Needs Cia's explicit go.

### Operational notes
- Two preview deploys were created by this session (first output was truncated). Previews only, target null.

### Durable thought
none, reason: routine relative-link bug; already captured by the cleanUrls/redirect config in vercel.json.

### Repo state

Computed by `exit-stamp` at 2026-09-29T01:47:48-07:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `082fede Fix 404s from the gallery and book indexes: root-absolute links` (committed 2026-09-29)
- tree: **1 uncommitted change(s)**
- upstream: origin/main (ahead 21, behind 0)
- merged into HEAD: none
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished; live deploy gated on Cia's go

---

## 2026-09-27 EXIT - Reconciliation: ten commits since 2026-08-05 recorded from git (CLOSED)

Snapshot before this block: none (append only).
Written by the harness session (D-0495 follow-up) because harness-check flagged this lane; it records what the files and git show, not a work session.

### Done
- [observed] cfdc037 2026-09-04 "photon: report page engagement to a.ciamac.com"
- [observed] 235045e 2026-08-08 "Frame-level audit: catch overlapping graphics by measurement, not by eye"
- [observed] 2a53f8d 2026-08-08 "Halve the runtime for X, and close the spine at 8 of 8"
- [observed] ce340a7 2026-08-08 "Faster voice, and a validator so bad TTS takes cannot ship"
- [observed] a766084 2026-08-08 "Fix the black tiles: absolute media paths on the published sheet"
- [observed] c389874 2026-08-08 "Publish the review sheet at photon.ciamac.com/shorts"
- [observed] a8f0259 2026-08-08 "Make the bare domain resolve, and stop uploading the render pipeline"
- [observed] d2e03cd 2026-08-07 "exit ritual: audio pass, series at 19 with sound"
- [observed] 5e06c08 2026-08-07 "Sound, voice, and an end card that goes somewhere"
- [observed] 6da819e 2026-08-07 "Contact sheet: one page for the whole series"
- [observed] main is 19 commits ahead of origin (not pushed); pushing this repo deploys photon.ciamac.com.

### Previous pending
- carried: the 2026-08-05 block's pending items are not re-assessed here; read that block.

### Pending / open
- 19 local commits not pushed; a push is a live deploy and needs Cia's go.

### Operational notes
- none

### Durable thought
none, reason: reconciliation only.

### Repo state

Computed by `exit-stamp` at 2026-09-27T00:47:24-07:00. Do not edit by hand; re-run it.

- repo: `~/Developer/photon-to-phenomenology`
- branch: `main`
- HEAD: `cfdc037 photon: report page engagement to a.ciamac.com` (committed 2026-09-04)
- tree: clean
- upstream: origin/main (ahead 19, behind 0)
- merged into HEAD: none
- NOT merged into HEAD: `claude/quizzical-meitner-afa864 (+2)`
- extra worktrees: 1

### Why we stopped
finished

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
