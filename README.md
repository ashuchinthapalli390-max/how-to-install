# ChatXa 4.0 — Installation Atlas

> **One App. Five Worlds.**  
> A cinematic installation experience and verified distribution hub for ChatXa 4.0 across Android, iPhone (iOS), Windows, macOS, and Linux.

---

## Overview

ChatXa 4.0 is engineered with the **CreaXa Cinematic Crimson** design language—combining a sci-fi product launch atmosphere with an interactive, verified technical installation manual.

### Supported Operating Systems & Guides

1. **Android**:
   - Direct 1-Tap APK installation (WhatsApp, Telegram, Google Drive, Chrome)
   - High-speed USB cable transfer from PC
   - Developer USB ADB stream (`adb install -r ChatXa-Android-Release.apk`)
   - Manufacturer-specific guides: Samsung (One UI 6 Auto Blocker), Vivo/iQOO (Funtouch OS), Xiaomi/Redmi/POCO (HyperOS), OnePlus/Oppo (OxygenOS/ColorOS), Pixel/Nothing
   - Google Play Protect bypass guide
   - In-place updating with zero data loss

2. **iPhone (iOS)**:
   - Explanation & resolution of iOS *"Unsupported file type"* alert
   - Sideloadly (100% reliable free Apple ID signing for PC/Mac)
   - InstallOnAir (Over-The-Air wireless Safari install link)
   - Scarlet (On-device sideloading manager)
   - Official Apple TestFlight beta invitations
   - Critical Post-Install Step 1: Trusting Developer Certificate in iOS Settings
   - Critical Post-Install Step 2: Enabling Developer Mode on iOS 16, 17, and 18+

3. **Windows**:
   - Native 64-bit desktop application (`chatxa.exe`, `flutter_windows.dll`, `data/`)
   - Android Emulator workflows (BlueStacks 5, LDPlayer 9)
   - Archival Windows Subsystem for Android (WSA) reference
   - Windows Defender SmartScreen bypass (*"More info"* → *"Run anyway"*)
   - Microsoft Visual C++ Redistributable (x64) and GPU driver prerequisites
   - Webcam and microphone privacy permissions

4. **macOS**:
   - Native Cocoa desktop application (`ChatXa.app` in `/Applications`)
   - Apple Silicon M1-M4 direct iOS IPA execution via Sideloadly & PlayCover
   - Apple Gatekeeper quarantine clearance (`sudo xattr -rd com.apple.quarantine /Applications/ChatXa.app`)
   - Native trackpad gestures, FaceTime HD webcam, and system audio permissions

5. **Linux**:
   - Interactive Terminal Simulator with animated typing and command execution previews
   - Distribution selector (Ubuntu, Debian, Linux Mint, Pop!_OS, Fedora, Arch Linux, Manjaro, openSUSE)
   - Architecture selector (x86_64, aarch64 / ARM64)
   - Native GTK3 release build instructions
   - Waydroid LXC container near-native Android integration on Wayland
   - Interactive `.desktop` application launcher generator
   - PipeWire and PulseAudio hardware permissions

---

## Three Cinematic Themes

- **CreaXa Crimson** (Default): Cinematic black/charcoal world with a massive glowing crimson celestial eclipse and volcanic rock horizons.
- **Obsidian**: Monochromatic black, graphite, and silver with metallic lighting and cold white highlights.
- **CreaXa Ivory**: Warm editorial cream background (`#F7F5EE`), dark charcoal typography, and deep burgundy accents.

Persisted via `localStorage` with zero theme flash on page load.

---

## Typography System

- **Cinematic Display**: Bodoni Moda / Cormorant Garamond
- **Interface & Headings**: Space Grotesk
- **Instructional Body**: Manrope
- **Technical Commands & Metadata**: IBM Plex Mono

---

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Vanilla CSS Design Tokens (CreaXa Crimson Design System)
- **Icons**: Lucide React
- **Animations**: GSAP + Canvas Confetti + CSS Transitions
- **Routing**: Deep-linking client router supporting query params (e.g. `?method=adb`, `?os=windows`, `?q=play+protect`)

---

## Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## License

© 2026 ChatXa 4.0. Powered by CreaXa Cinematic Architecture. All rights reserved.
