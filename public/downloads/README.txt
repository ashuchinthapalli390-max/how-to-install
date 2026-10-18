# ChatXa 4.0 — App Store / Distribution Files

### 1. Android Installation File:
- File: ChatXa-Android-Release.apk
- Installation:
  1. Transfer to any Android phone (via USB cable, WhatsApp, Telegram, or Google Drive).
  2. Open the file on the phone and tap Install.
  3. Or install via ADB: adb install -r ChatXa-Android-Release.apk.

### 2. iOS Installation File:
- File: ChatXa-iOS-Release.ipa
- Bundle ID: com.chatxa.chatxa
- Installation & Testing:
  - Option A (AltStore / Sideloadly): Open AltStore or Sideloadly on PC/Mac, select ChatXa-iOS-Release.ipa, connect iPhone via USB, and click Start/Sideload.
  - Option B (TestFlight / App Store): Open ios/Runner.xcworkspace in Xcode on a Mac, select your Team under Signing & Capabilities, and click Product -> Archive -> Distribute App -> TestFlight.
  - Option C (Cloud GitHub Actions): Push code to GitHub repository; the automated .github/workflows/ios_build.yml workflow builds and signs automatically on cloud macOS runner.
