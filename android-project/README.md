# IELTS PA — Android/TWA build files

This folder lets anyone regenerate the IELTS PA Android app (a Trusted Web Activity) and, crucially, **keep the same package name and signing key** so the app updates in place.

## What was done (2026-09-13)

The shipped `../android/IELTS-PA-release.apk` was rebuilt from the original Google Play package:

- Replaced **all launcher icons** with the new Palestine-flag + gold "PA" design:
  - `ic_launcher` (mdpi 48 / hdpi 72 / xhdpi 96 / xxhdpi 144 / xxxhdpi 192)
  - `ic_maskable` (used by the adaptive icon on Android 8+)
  - `splash` images (5 densities)
- Re-aligned with `zipalign -p -f 4`.
- Re-signed with the **original keystore** (`com.bood68155tech.ielts`, alias `ielts-pa-key`, cert SHA-256 `b9c9e208…c293`).

Result: same package, same version, same certificate → installing the new APK updates the existing app **without uninstalling** and without losing user data. The launcher icon now shows the Palestinian flag design.

## Signing files

Original unsigned/old copies and the keystore live in `../android-package/extracted/`:

- `signing.keystore` (+ `signing-key-info.txt`) — **do not commit to Git.**
- `IELTS-PA-release.aab` / original `IELTS-PA-release.apk` — untouched originals.

## Building a future version

Requires Node.js + `@bubblewrap/cli` (or Android Studio). With a JDK and the keystore:

```bash
npm install -g @bubblewrap/cli
cd ../android-project
bubblewrap init --manifest twa-manifest.json
bubblewrap build
```

Then sign the produced APK/AAB with the original key:

```bash
apksigner sign \
  --ks signing.keystore \
  --ks-key-alias ielts-pa-key \
  --ks-pass pass:XXX --key-pass pass:XXX \
  --out IELTS-PA-release.apk unsigned.apk
```

Always bump `appVersionCode` above the current installed version when releasing.