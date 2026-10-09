#!/bin/bash
# Verify an App Store IPA for Ciamac's Book of Illusions. Read-only; unpacks into a temp dir.
# usage: verify_ipa.sh /path/to/Illusions.ipa
IPA="$1"; [ -f "$IPA" ] || { echo "no such file: $IPA"; exit 1; }
HERE="$(cd "$(dirname "$0")/../.." && pwd)"          # .../ios
W=$(mktemp -d); trap 'rm -rf "$W"' EXIT
unzip -q "$IPA" -d "$W" || exit 1
APP=$(ls -d "$W"/Payload/*.app); echo "IPA: $IPA ($(du -h "$IPA" | cut -f1))"; shasum -a 256 "$IPA"
echo "== signature"
codesign -dvv "$APP" 2>&1 | egrep "Identifier|Authority|TeamIdentifier|Timestamp"
codesign --verify --deep --strict "$APP" && echo SIGNATURE-VALID
echo "== profile"
security cms -D -i "$APP/embedded.mobileprovision" 2>/dev/null > "$W/p.plist"
plutil -p "$W/p.plist" | egrep "\"Name\"|TeamIdentifier|application-identifier|get-task-allow|ProvisionsAllDevices|ProvisionedDevices|ExpirationDate|Platform"
echo "== entitlements"; codesign -d --entitlements :- "$APP" 2>/dev/null | plutil -p - 2>/dev/null
echo "== info"
plutil -p "$APP/Info.plist" | egrep "ShortVersion|CFBundleVersion|CFBundleIdentifier|MinimumOS|DisplayName|ITSApps"
echo "== contents"
diff -rq "$HERE/Photon/Pieces" "$APP/Pieces" && echo PIECES-IDENTICAL
echo "pages: $(ls "$APP"/Pieces/*.html | wc -l)"
ls "$APP/PrivacyInfo.xcprivacy" "$APP/Assets.car"
echo "debug hooks: $(strings -a "$APP/Photon" | egrep -c 'PHOTON-BRIDGE|NARRATOR say|skipGuide|silentVoice')"
echo "privacy url strings: $(strings -a "$APP/Photon" | grep -c 'photon.ciamac.com/privacy')"
ARC="$HERE/release-audit-2026-10-06/claude-final-3/Illusions.xcarchive/Products/Applications/Photon.app"
cmp "$APP/Photon" "$ARC/Photon" && echo "BINARY-BYTE-IDENTICAL-TO-ARCHIVE" || echo "binary differs from archive (a re-sign can change it)"
