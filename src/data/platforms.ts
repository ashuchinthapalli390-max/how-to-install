import type { PlatformInfo } from '../types';

export const PLATFORMS_DATA: Record<string, PlatformInfo> = {
  android: {
    id: 'android',
    name: 'Android',
    label: 'Android OS',
    title: 'Install ChatXa on Android',
    tagline: 'Direct APK sideloading with zero fees, no computer required.',
    description: 'Android allows direct installation of application packages (.apk files). Choose between effortless 1-tap installation directly on your phone, fast USB transfer from PC, or developer ADB streaming.',
    iconName: 'Smartphone',
    fileExtension: '.apk',
    releaseFileName: 'ChatXa-Android-Release.apk',
    releaseFileSize: '~549.7 MB',
    previewImage: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png',
    systemRequirements: [
      { label: 'Supported OS', value: 'Android 8.0 (Oreo) up to Android 15 & newer' },
      { label: 'Architecture', value: 'arm64-v8a, armeabi-v7a, x86_64' },
      { label: 'Free Storage', value: '1.2 GB recommended (engine + cached media)' },
      { label: 'Hardware', value: 'Camera & Microphone for LiveKit calling' }
    ],
    troubleshootingShortcuts: [
      'Bypassing Google Play Protect warning',
      'Resolving "App not installed" or signature conflict',
      'Fixing "Problem parsing the package" error',
      'Enabling Camera and Microphone permissions'
    ],
    brandNotes: [
      {
        brand: 'Vivo / iQOO (Funtouch OS / OriginOS)',
        osName: 'Funtouch OS / OriginOS',
        instructions: [
          'For ADB installation: You must enable "Install via USB" in Developer Options.',
          'When prompted with a 5-second security countdown, tap "Continue".',
          'If Vivo Security displays a warning, tap "Continue with Install".'
        ]
      },
      {
        brand: 'Samsung (One UI)',
        osName: 'One UI 4 / 5 / 6',
        instructions: [
          'Go to Settings → Apps → Three dots menu (top right) → Special access → Install unknown apps → Allow for "My Files" and "Chrome".',
          'If Auto Blocker is enabled (One UI 6.0+): Go to Settings → Security and privacy → Auto Blocker → Temporarily turn OFF to allow sideloading.'
        ]
      },
      {
        brand: 'Xiaomi / Redmi / POCO (MIUI / HyperOS)',
        osName: 'HyperOS & MIUI',
        instructions: [
          'When the MIUI Security Scan runs, tap the gear icon in the top right and toggle off "Scan apps from third-party sources".',
          'For USB ADB: Enable "USB Debugging", "Install via USB", and "USB Debugging (Security settings)" (requires Mi account login).'
        ]
      },
      {
        brand: 'OnePlus / Oppo / Realme (ColorOS / OxygenOS)',
        osName: 'OxygenOS & ColorOS',
        instructions: [
          'Go to Settings → Apps → Special app access → Install unknown apps → Toggle ON.',
          'If Private Safe or Security Center warns you, tap "Install Anyway".'
        ]
      },
      {
        brand: 'Google Pixel / Motorola / Nothing (Stock Android)',
        osName: 'Stock Android 13/14/15',
        instructions: [
          'Tap Settings on the system prompt → Toggle "Allow from this source" → Tap Install.'
        ]
      }
    ],
    methods: [
      {
        id: 'direct-apk',
        name: 'Direct 1-Tap APK Install',
        subtitle: 'Fastest method — No PC required',
        description: 'Download the verified APK directly to your phone using Chrome, WhatsApp, Telegram, or Google Drive and install with 1 tap.',
        estimatedTime: '1 - 2 Minutes',
        difficulty: 'Beginner',
        requiresPc: false,
        isOfficial: true,
        toolsNeeded: ['Android Phone', 'Chrome, WhatsApp, or File Manager'],
        compatibility: 'All Android devices (Android 8.0+)',
        steps: [
          {
            stepNumber: 1,
            title: 'Download or Receive the APK',
            instruction: 'Download "ChatXa-Android-Release.apk" on your phone from our verified download center or receive it via WhatsApp / Drive.',
            detail: 'The file size is approximately 549.7 MB as it bundles the complete offline Flutter runtime and WebRTC calling libraries.'
          },
          {
            stepNumber: 2,
            title: 'Open the APK File',
            instruction: 'Open your phone Downloads or tap the received file inside WhatsApp / Telegram / Files app.',
            detail: 'Android will read the APK package header and prepare the package installer.'
          },
          {
            stepNumber: 3,
            title: 'Allow Installation From This Source',
            instruction: 'If prompted with "For your security, your phone is not allowed to install unknown apps from this source", tap Settings.',
            detail: 'Toggle ON "Allow from this source" (or "Allow app installs") and tap the Back button.'
          },
          {
            stepNumber: 4,
            title: 'Handle Google Play Protect (If Prompted)',
            instruction: 'If Play Protect warns "Unrecognized app", tap "More details" and select "Install anyway".',
            detail: 'This is standard for pre-release software not yet indexed in Google Cloud.'
          },
          {
            stepNumber: 5,
            title: 'Tap Install & Launch ChatXa',
            instruction: 'Tap "Install". In a few moments, the screen will confirm "App Installed". Tap Open to launch ChatXa!',
            tip: 'When ChatXa opens, grant Camera and Microphone access to enable voice & video calling.'
          }
        ]
      },
      {
        id: 'usb-transfer',
        name: 'USB File Transfer from PC',
        subtitle: 'Direct high-speed cable copy',
        description: 'Transfer the APK file from your Windows, Mac, or Linux computer to your phone storage over a USB-C or Micro-USB cable.',
        estimatedTime: '2 - 3 Minutes',
        difficulty: 'Beginner',
        requiresPc: true,
        toolsNeeded: ['Computer', 'USB Cable', 'Android Phone'],
        compatibility: 'Any computer and Android device',
        steps: [
          {
            stepNumber: 1,
            title: 'Connect Phone to PC',
            instruction: 'Connect your phone to your computer using a USB cable.',
            detail: 'Swipe down the notification shade on your phone, tap the USB notification, and switch from "Charging only" to "File Transfer" (MTP).'
          },
          {
            stepNumber: 2,
            title: 'Copy APK to Phone Storage',
            instruction: 'On your PC, open File Explorer, navigate to your phone internal storage, and paste ChatXa-Android-Release.apk into the Download folder.',
            detail: 'Copying over USB 3.0 / USB-C takes approximately 10 to 15 seconds.'
          },
          {
            stepNumber: 3,
            title: 'Open Files App on Phone',
            instruction: 'Open your phone built-in Files / File Manager app, navigate to Downloads or the APK category, and tap ChatXa-Android-Release.apk.',
            detail: 'Allow "Install unknown apps" if requested by your file manager.'
          },
          {
            stepNumber: 4,
            title: 'Complete Installation',
            instruction: 'Tap Install and open ChatXa once completed.',
            tip: 'You can now safely disconnect the USB cable.'
          }
        ]
      },
      {
        id: 'adb',
        name: 'USB ADB Developer Stream',
        subtitle: 'One-command instant install',
        description: 'Stream and install the release APK directly over Android Debug Bridge (ADB) without interacting with file managers.',
        estimatedTime: '30 Seconds',
        difficulty: 'Advanced',
        requiresPc: true,
        toolsNeeded: ['PC with Android SDK Platform Tools', 'USB Cable with USB Debugging enabled'],
        compatibility: 'Windows, macOS, Linux',
        steps: [
          {
            stepNumber: 1,
            title: 'Enable USB Debugging on Phone',
            instruction: 'Go to Settings → About Phone → Tap "Build Number" 7 times to unlock Developer Options.',
            detail: 'Go to Settings → System / Additional Settings → Developer Options → Turn ON "USB Debugging". For Vivo, Xiaomi, or iQOO, also turn ON "Install via USB".'
          },
          {
            stepNumber: 2,
            title: 'Authorize Computer',
            instruction: 'Connect your phone to your PC via USB. Unlock the phone screen and check "Always allow from this computer" on the USB Debugging prompt.',
            command: 'adb devices'
          },
          {
            stepNumber: 3,
            title: 'Execute ADB Installation Command',
            instruction: 'Run the adb install command in your terminal. The APK will stream directly to your device.',
            command: 'adb install -r "ChatXa-Android-Release.apk"'
          },
          {
            stepNumber: 4,
            title: 'Verify Success',
            instruction: 'The terminal will output "Success". ChatXa is now installed on your phone home screen and app drawer!',
            tip: 'For security, remember to disable USB Debugging when you are finished testing.'
          }
        ]
      }
    ]
  },

  ios: {
    id: 'ios',
    name: 'iPhone (iOS)',
    label: 'Apple iOS',
    title: 'Install ChatXa on iPhone (iOS)',
    tagline: 'Step-by-step sideloading, OTA distribution, and TestFlight invitations.',
    description: 'Unlike Android, Apple iOS blocks direct execution of raw .ipa files inside messaging apps (which displays "Unsupported file type"). Choose from verified methods: InstallOnAir (No PC OTA), Scarlet, Sideloadly (100% reliable free Apple ID), 3uTools, or TestFlight.',
    iconName: 'Apple',
    fileExtension: '.ipa',
    releaseFileName: 'ChatXa-iOS-Release.ipa',
    releaseFileSize: '~47.8 MB',
    previewImage: '/assets/screenshots/iphone-unsupported-file.png',
    systemRequirements: [
      { label: 'Supported OS', value: 'iOS 13.0, 14, 15, 16, 17, 18 and newer' },
      { label: 'Architecture', value: 'Apple ARM64 (A-series & M-series chips)' },
      { label: 'Free Storage', value: '300 MB recommended' },
      { label: 'Special Setting', value: 'Developer Mode required on iOS 16, 17, 18+' }
    ],
    troubleshootingShortcuts: [
      'Understanding why WhatsApp shows "Unsupported file type"',
      'Trusting the Enterprise / Developer Certificate in iOS Settings',
      'Enabling Developer Mode on iOS 16, 17, and 18+',
      'Bypassing "Unable to Install ChatXa - Integrity could not be verified"'
    ],
    methods: [
      {
        id: 'sideloadly',
        name: 'Sideloadly (PC / Mac to iPhone)',
        subtitle: '100% Guaranteed Success — Free Apple ID',
        description: 'The most dependable method worldwide. Uses your personal free Apple ID (no paid $99/yr account needed) to sign and install directly onto your iPhone.',
        estimatedTime: '3 - 5 Minutes',
        difficulty: 'Intermediate',
        requiresPc: true,
        isOfficial: false,
        toolsNeeded: ['Windows PC or Mac', 'Lightning or USB-C Cable', 'Free Apple ID', 'Sideloadly app'],
        compatibility: 'All iPhones (iOS 13 through iOS 18+)',
        steps: [
          {
            stepNumber: 1,
            title: 'Download Sideloadly on PC or Mac',
            instruction: 'Visit the official Sideloadly website (https://sideloadly.io) and install the application for Windows or macOS.',
            detail: 'If prompted on Windows, allow Sideloadly to install the standard Apple iTunes / iCloud device drivers.'
          },
          {
            stepNumber: 2,
            title: 'Connect iPhone and Trust Computer',
            instruction: 'Connect your iPhone to your PC using your charging cable. Unlock your iPhone screen and tap "Trust This Computer", then enter your passcode.',
            tip: 'Check that your iPhone appears in the "Connected Device" dropdown inside Sideloadly.'
          },
          {
            stepNumber: 3,
            title: 'Load ChatXa IPA & Enter Apple ID',
            instruction: 'Drag and drop "ChatXa-iOS-Release.ipa" into Sideloadly. In the Apple ID box, enter your regular Apple ID email address.',
            detail: 'Sideloadly securely communicates with Apple official authentication servers (gsa.apple.com) over SSL to issue a personal 7-day development certificate.'
          },
          {
            stepNumber: 4,
            title: 'Click Start & Approve 2FA',
            instruction: 'Click "Start". Enter your Apple ID password and the 6-digit two-factor authentication code that appears on your iPhone.',
            detail: 'Sideloadly will log: "Signing... Connecting to device... Installing... Done!".'
          },
          {
            stepNumber: 5,
            title: 'Trust Certificate & Enable Developer Mode',
            instruction: 'On your iPhone, go to Settings → General → VPN & Device Management → Tap your Apple ID → Tap "Trust". If on iOS 16+, go to Privacy & Security → Developer Mode → Turn ON and reboot.',
            tip: 'ChatXa is now ready to open and use on your iPhone Home Screen!'
          }
        ]
      },
      {
        id: 'installonair',
        name: 'InstallOnAir (No PC — Direct in Safari)',
        subtitle: 'Wireless Over-The-Air install link',
        description: 'Creates a temporary wireless Over-The-Air (OTA) installation manifest recognized natively by Apple Safari without requiring a computer.',
        estimatedTime: '2 Minutes',
        difficulty: 'Beginner',
        requiresPc: false,
        isOfficial: false,
        toolsNeeded: ['iPhone', 'Safari Browser', 'ChatXa IPA in iPhone Files'],
        compatibility: 'iPhones with compatible provisioning profiles',
        steps: [
          {
            stepNumber: 1,
            title: 'Open Safari on iPhone',
            instruction: 'Open Safari on your iPhone (must use Safari, not Chrome or Firefox) and navigate to https://www.installonair.com.',
            detail: 'InstallOnAir hosts an OTA distribution manifest (.plist) that triggers the native iOS app installer.'
          },
          {
            stepNumber: 2,
            title: 'Upload ChatXa IPA',
            instruction: 'Tap "Choose File" or "Upload IPA" and select "ChatXa-iOS-Release.ipa" from your iPhone Files, Downloads, or iCloud Drive.',
            detail: 'Wait 30 seconds for upload completion.'
          },
          {
            stepNumber: 3,
            title: 'Tap Install App',
            instruction: 'Tap the green "Install App" button on the generated page.',
            detail: 'A system popup will display: "installonair.com would like to install ChatXa".'
          },
          {
            stepNumber: 4,
            title: 'Confirm Installation',
            instruction: 'Tap "Install" and return to your iPhone Home Screen. You will see the circular progress icon as ChatXa downloads and installs.',
            warning: 'InstallOnAir generates the distribution link, but the IPA must possess a valid certificate or provisioning profile for installation to verify.'
          },
          {
            stepNumber: 5,
            title: 'Trust Enterprise / Developer Profile',
            instruction: 'Go to Settings → General → VPN & Device Management → Tap the signing certificate name → Tap "Trust".',
            tip: 'Once trusted, tap the ChatXa icon on your home screen to launch!'
          }
        ]
      },
      {
        id: 'scarlet',
        name: 'Scarlet (On-Device iOS Sideloading)',
        subtitle: 'Direct on-device signing manager',
        description: 'Scarlet is a popular on-device sideloading manager for iOS that imports and installs .ipa files without needing a PC.',
        estimatedTime: '2 - 3 Minutes',
        difficulty: 'Intermediate',
        requiresPc: false,
        isOfficial: false,
        warning: 'Third-party sideloading service. Enterprise certificates may be revoked periodically by Apple.',
        toolsNeeded: ['iPhone', 'Safari Browser'],
        compatibility: 'iOS 14 through iOS 17 (Certificate availability dependent)',
        steps: [
          {
            stepNumber: 1,
            title: 'Install Scarlet from Safari',
            instruction: 'On your iPhone, open Safari and navigate to https://usescarlet.com. Scroll down and tap "Install" → "Direct Install".',
            detail: 'Wait for the 10-second countdown and tap "Open in iTunes" / "Install".'
          },
          {
            stepNumber: 2,
            title: 'Trust Scarlet Certificate',
            instruction: 'Go to iPhone Settings → General → VPN & Device Management → Tap the Enterprise profile → Tap "Trust".',
            detail: 'This enables the Scarlet utility app to launch on your device.'
          },
          {
            stepNumber: 3,
            title: 'Import ChatXa IPA',
            instruction: 'Open Scarlet, tap the Import icon in the top-right corner, and select "ChatXa-iOS-Release.ipa" from your Files app.',
            detail: 'Scarlet will sign the IPA locally on your device.'
          },
          {
            stepNumber: 4,
            title: 'Confirm Install Prompt',
            instruction: 'When the iOS popup appears, tap "Install". ChatXa will install directly onto your home screen!',
            tip: 'If on iOS 16+, make sure Developer Mode is turned on in Privacy & Security.'
          }
        ]
      },
      {
        id: 'testflight',
        name: 'Apple TestFlight (Official Beta)',
        subtitle: 'Official Apple beta distribution',
        description: 'The official Apple distribution system for beta testing with automated updates and zero certificate expiration headaches.',
        estimatedTime: '1 Minute',
        difficulty: 'Beginner',
        requiresPc: false,
        isOfficial: true,
        toolsNeeded: ['iPhone', 'Apple ID', 'TestFlight app from App Store'],
        compatibility: 'All iOS versions supported by TestFlight',
        steps: [
          {
            stepNumber: 1,
            title: 'Install TestFlight from App Store',
            instruction: 'Open the Apple App Store on your iPhone, search for "TestFlight", and install the free official app from Apple.',
            detail: 'TestFlight manages beta builds, crash reporting, and automatic updates directly from Apple servers.'
          },
          {
            stepNumber: 2,
            title: 'Open Verified Invitation Link',
            instruction: 'Tap the verified ChatXa TestFlight public invitation link provided by your team administrator or beta program.',
            detail: 'If the beta build is currently in review or full, check back when slots reopen.'
          },
          {
            stepNumber: 3,
            title: 'Accept Invitation & Tap Install',
            instruction: 'TestFlight will display the ChatXa release notes and version details. Tap "Accept" and then tap "Install".',
            tip: 'TestFlight builds update automatically whenever a new version is pushed by the development team.'
          }
        ]
      }
    ]
  },

  windows: {
    id: 'windows',
    name: 'Windows',
    label: 'Windows 10 / 11',
    title: 'Install ChatXa on Windows',
    tagline: 'High-performance 64-bit native desktop application & Android emulator support.',
    description: 'Run ChatXa on Windows with high-framerate rendering, native desktop notifications, and direct access to your PC webcam and microphone. Choose between the native 64-bit executable bundle or running the APK via BlueStacks / LDPlayer.',
    iconName: 'Monitor',
    fileExtension: '.exe / .zip',
    releaseFileName: 'ChatXa-Windows-Release.zip',
    releaseFileSize: '~85 MB (Complete release folder with runtime DLLs & assets)',
    previewImage: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_16 AM-6.png',
    systemRequirements: [
      { label: 'Supported OS', value: 'Windows 11 (all editions), Windows 10 (version 1809+, 64-bit)' },
      { label: 'Architecture', value: 'x86_64 (64-bit Intel / AMD)' },
      { label: 'Dependencies', value: 'Microsoft Visual C++ 2015-2022 Redistributable (x64)' },
      { label: 'Hardware Access', value: 'Webcam & Microphone permissions in Windows Settings' }
    ],
    troubleshootingShortcuts: [
      'Bypassing Windows Defender SmartScreen ("Windows Protected Your PC")',
      'Fixing "flutter_windows.dll was not found" error',
      'Installing Microsoft Visual C++ Redistributable (MSVCP140.dll fix)',
      'Configuring Windows Camera and Microphone privacy permissions'
    ],
    methods: [
      {
        id: 'native-windows',
        name: 'Native Windows Desktop App',
        subtitle: 'High Performance 64-Bit Desktop Executable',
        description: 'Runs directly on your Windows PC hardware without any emulator overhead. Features full desktop window resizing, multi-monitor support, and native notifications.',
        estimatedTime: '1 - 2 Minutes',
        difficulty: 'Beginner',
        requiresPc: true,
        isOfficial: true,
        toolsNeeded: ['Windows 10/11 64-bit PC'],
        compatibility: 'Windows 10 (1809+) & Windows 11',
        steps: [
          {
            stepNumber: 1,
            title: 'Download & Extract the Windows Release Package',
            instruction: 'Download the complete ChatXa-Windows-Release.zip package and extract all files into a folder (e.g., C:\\ChatXa or your user folder).',
            warning: 'CRITICAL: You must extract the entire folder! Do NOT move chatxa.exe out of its directory, as it requires flutter_windows.dll and the data\\ folder in the same path.'
          },
          {
            stepNumber: 2,
            title: 'Launch chatxa.exe',
            instruction: 'Double-click chatxa.exe inside the extracted release folder.',
            detail: 'Flutter will load the desktop engine, initialize the local cache, and connect to Supabase.'
          },
          {
            stepNumber: 3,
            title: 'Handle Windows Defender SmartScreen (If Prompted)',
            instruction: 'If Windows SmartScreen displays "Windows protected your PC", click the small "More info" text link and then click "Run anyway".',
            tip: 'Windows will remember your choice and will not prompt on future launches.'
          },
          {
            stepNumber: 4,
            title: 'Create Desktop Shortcut (Optional)',
            instruction: 'Right-click chatxa.exe → Send to → Desktop (create shortcut) for easy 1-click access from your desktop or pin to taskbar.',
            tip: 'Webcam, microphone, and desktop notifications work out of the box.'
          }
        ]
      },
      {
        id: 'emulator',
        name: 'Android Emulator (BlueStacks / LDPlayer)',
        subtitle: 'Easiest mobile experience on PC',
        description: 'Drag and drop the verified ChatXa Android APK directly into a free emulator like BlueStacks 5 or LDPlayer 9.',
        estimatedTime: '2 Minutes',
        difficulty: 'Beginner',
        requiresPc: true,
        toolsNeeded: ['BlueStacks 5 or LDPlayer 9', 'ChatXa Android APK'],
        compatibility: 'Any Windows PC with Virtualization enabled (VT-x / AMD-V)',
        steps: [
          {
            stepNumber: 1,
            title: 'Download & Launch Emulator',
            instruction: 'Download and install BlueStacks 5 (https://www.bluestacks.com) or LDPlayer 9 (https://www.ldplayer.net).',
            detail: 'Ensure hardware virtualization (VT-x or AMD-V) is enabled in your PC BIOS/UEFI for optimal frame rates.'
          },
          {
            stepNumber: 2,
            title: 'Drag & Drop ChatXa APK',
            instruction: 'Locate "ChatXa-Android-Release.apk" on your computer and drag it into the emulator window, or click the "Install APK" button on the toolbar.',
            detail: 'The emulator installs the package within 15 seconds.'
          },
          {
            stepNumber: 3,
            title: 'Launch & Enjoy',
            instruction: 'Click the ChatXa icon on the emulator desktop. Full keyboard typing, mouse gestures, and audio pass-through work automatically.',
            tip: 'All chat messages, media, and contacts sync in realtime with your phone!'
          }
        ]
      },
      {
        id: 'wsa',
        name: 'Windows Subsystem for Android (WSA)',
        subtitle: 'Discontinued — Legacy reference only',
        description: 'Archival instructions for Windows 11 users who already have WSA installed and configured with ADB.',
        estimatedTime: '2 Minutes',
        difficulty: 'Advanced',
        requiresPc: true,
        isArchival: true,
        warning: 'Microsoft officially deprecated Windows Subsystem for Android. We do not recommend WSA for new installations.',
        toolsNeeded: ['Windows 11 with existing WSA installation', 'ADB'],
        compatibility: 'Windows 11 with legacy WSA',
        steps: [
          {
            stepNumber: 1,
            title: 'Enable Developer Mode in WSA Settings',
            instruction: 'Open Windows Subsystem for Android Settings on your PC and turn ON Developer mode.',
            detail: 'Note the IP address and port (typically 127.0.0.1:58526).'
          },
          {
            stepNumber: 2,
            title: 'Connect ADB to WSA',
            instruction: 'Open PowerShell and connect ADB to your WSA instance.',
            command: 'adb connect 127.0.0.1:58526'
          },
          {
            stepNumber: 3,
            title: 'Install ChatXa APK',
            instruction: 'Install the APK via ADB command.',
            command: 'adb install "ChatXa-Android-Release.apk"'
          },
          {
            stepNumber: 4,
            title: 'Launch from Windows Start Menu',
            instruction: 'ChatXa will appear directly in your Windows Start Menu as a native windowed app.',
            tip: 'For active long-term use, we recommend the Native Windows Desktop App.'
          }
        ]
      }
    ]
  },

  macos: {
    id: 'macos',
    name: 'macOS',
    label: 'Apple Mac',
    title: 'Install ChatXa on macOS',
    tagline: 'Native Cocoa desktop build & Apple Silicon direct iOS IPA execution.',
    description: 'Experience ChatXa on macOS Monterey, Ventura, Sonoma, and Sequoia. Run natively on Apple Silicon (M1/M2/M3/M4) or Intel Macs with full trackpad gestures, FaceTime HD webcam calling, and native notifications.',
    iconName: 'Laptop',
    fileExtension: '.app / .dmg',
    releaseFileName: 'ChatXa-macOS-Release.zip',
    releaseFileSize: '~68 MB',
    previewImage: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_18 AM-7.png',
    systemRequirements: [
      { label: 'Supported OS', value: 'macOS Monterey (12), Ventura (13), Sonoma (14), Sequoia (15)' },
      { label: 'Architecture', value: 'Apple Silicon (M1/M2/M3/M4) & Intel x86_64' },
      { label: 'Security Setting', value: 'Gatekeeper bypass (Right-click Open or remove quarantine)' },
      { label: 'Permissions', value: 'Camera & Microphone authorization in System Settings' }
    ],
    troubleshootingShortcuts: [
      'Bypassing "App is damaged and cannot be opened" Gatekeeper quarantine',
      'Fixing "App cannot be opened because developer cannot be verified"',
      'Allowing Camera and Microphone access in System Settings',
      'Running iOS IPA on Apple Silicon with Sideloadly or PlayCover'
    ],
    methods: [
      {
        id: 'native-macos',
        name: 'Native macOS Application (.app)',
        subtitle: 'Compiled Cocoa Flutter Desktop App',
        description: 'Native Mac desktop binary that runs directly in your Applications folder with native Mac menu bar integration and notifications.',
        estimatedTime: '2 Minutes',
        difficulty: 'Beginner',
        requiresPc: true,
        isOfficial: true,
        toolsNeeded: ['Mac running macOS 12+'],
        compatibility: 'Apple Silicon & Intel Macs',
        steps: [
          {
            stepNumber: 1,
            title: 'Download and Extract the macOS Bundle',
            instruction: 'Download ChatXa-macOS-Release.zip and extract "ChatXa.app".',
            detail: 'Drag ChatXa.app into your Mac /Applications folder for permanent installation.'
          },
          {
            stepNumber: 2,
            title: 'Bypass Gatekeeper on First Launch (Control + Click)',
            instruction: 'In Finder, go to Applications, hold down the CONTROL key, click ChatXa.app, and select "Open" from the menu.',
            detail: 'A confirmation dialog will appear with an "Open" button. Click "Open". macOS will permanently whitelist ChatXa.'
          },
          {
            stepNumber: 3,
            title: 'Terminal Quarantine Fix (If Damaged Alert Appears)',
            instruction: 'If macOS displays an alert saying the file is damaged, open Terminal and remove the Gatekeeper quarantine flag.',
            command: 'sudo xattr -rd com.apple.quarantine /Applications/ChatXa.app',
            tip: 'Enter your Mac login password when prompted. The app will launch immediately afterwards.'
          },
          {
            stepNumber: 4,
            title: 'Grant Camera & Microphone Permissions',
            instruction: 'When ChatXa opens, tap OK on the system permission prompts for Camera and Microphone to enable LiveKit calling.',
            tip: 'You can verify permissions anytime in System Settings → Privacy & Security.'
          }
        ]
      },
      {
        id: 'apple-silicon-ipa',
        name: 'Run iOS IPA on Apple Silicon (M1/M2/M3/M4)',
        subtitle: 'Shared ARM64 binary architecture',
        description: 'Because Apple Silicon Macs share the exact ARM64 instruction set as iPhones, you can run ChatXa-iOS-Release.ipa directly using Sideloadly or PlayCover.',
        estimatedTime: '3 Minutes',
        difficulty: 'Intermediate',
        requiresPc: true,
        toolsNeeded: ['Mac with M1, M2, M3, or M4 chip', 'Sideloadly for Mac or PlayCover'],
        compatibility: 'Apple Silicon Macs only (Not compatible with Intel Macs)',
        steps: [
          {
            stepNumber: 1,
            title: 'Download Sideloadly for Mac',
            instruction: 'Download and install Sideloadly for macOS from https://sideloadly.io.',
            detail: 'Launch Sideloadly on your Mac.'
          },
          {
            stepNumber: 2,
            title: 'Select "This Mac" as Target',
            instruction: 'Under the "Target Device" dropdown inside Sideloadly, select "This Mac".',
            detail: 'This instructs Sideloadly to target the local macOS application environment.'
          },
          {
            stepNumber: 3,
            title: 'Drag IPA & Sign with Apple ID',
            instruction: 'Drag "ChatXa-iOS-Release.ipa" into Sideloadly, enter your Apple ID, and click "Start".',
            detail: 'Sideloadly signs and automatically places ChatXa directly into your /Applications folder.'
          },
          {
            stepNumber: 4,
            title: 'Open from Launchpad',
            instruction: 'Open Launchpad or Applications and click ChatXa. The mobile UI runs smoothly in a resizable window with trackpad gesture support!',
            tip: 'Alternatively, you can use PlayCover (https://playcover.io) for customizable mouse and keyboard mapping.'
          }
        ]
      }
    ]
  },

  linux: {
    id: 'linux',
    name: 'Linux',
    label: 'Linux Workstation',
    title: 'Install ChatXa on Linux',
    tagline: 'Native GTK3 desktop binary, Waydroid container, and interactive terminal workflows.',
    description: 'Run ChatXa on Ubuntu, Debian, Linux Mint, Fedora, Arch Linux, Pop!_OS, and openSUSE. Choose between compiling a native GTK3 release binary with zero virtualization overhead or running the APK at near-native speeds with Waydroid LXC containers.',
    iconName: 'Terminal',
    fileExtension: '.tar.gz / binary',
    releaseFileName: 'chatxa-linux-x64.tar.gz',
    releaseFileSize: '~72 MB (Native GTK3 bundle)',
    previewImage: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_19 AM-8.png',
    systemRequirements: [
      { label: 'Distributions', value: 'Ubuntu, Debian, Fedora, Arch, Manjaro, Pop!_OS, Linux Mint, openSUSE' },
      { label: 'Architecture', value: 'x86_64, aarch64 (ARM64 including Raspberry Pi 5)' },
      { label: 'GUI Toolkit', value: 'GTK+ 3.0 (libgtk-3-0, liblzma5)' },
      { label: 'Audio Engine', value: 'PipeWire (pipewire-pulse) or PulseAudio' }
    ],
    troubleshootingShortcuts: [
      'Resolving "Gtk-WARNING: cannot open display" (export DISPLAY=:0)',
      'Fixing missing libgtk-3.so.0 or liblzma.so.5 runtime libraries',
      'Configuring audio and video user groups (usermod -aG audio,video $USER)',
      'Troubleshooting Waydroid session initialization on Wayland'
    ],
    methods: [
      {
        id: 'native-linux',
        name: 'Native Linux Desktop Application',
        subtitle: 'GTK3 High-Performance Release Bundle',
        description: 'Zero virtualization overhead, sub-second startup time, native GTK theme integration, and direct hardware audio/video pipeline.',
        estimatedTime: '3 - 5 Minutes',
        difficulty: 'Intermediate',
        requiresPc: true,
        isOfficial: true,
        toolsNeeded: ['Linux terminal', 'C/C++ build tools (clang, cmake, ninja, gtk3)'],
        compatibility: 'All modern Linux distributions (x86_64 & ARM64)',
        steps: [
          {
            stepNumber: 1,
            title: 'Install Build Dependencies',
            instruction: 'Install required compiler and GTK3 development headers for your distribution.',
            codeBlock: '# Ubuntu / Debian / Mint / Pop!_OS:\nsudo apt update && sudo apt install -y clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev\n\n# Fedora / RHEL:\nsudo dnf install clang cmake ninja-build pkgconf-pkg-config gtk3-devel xz-devel\n\n# Arch Linux / Manjaro:\nsudo pacman -S clang cmake ninja pkgconf gtk3 xz'
          },
          {
            stepNumber: 2,
            title: 'Initialize Platform & Compile Release',
            instruction: 'In your ChatXa directory, generate platform files if needed and compile the release binary.',
            command: 'flutter build linux --release',
            detail: 'Flutter compiles native C++ and Dart code into an optimized ELF binary inside build/linux/x64/release/bundle/.'
          },
          {
            stepNumber: 3,
            title: 'Set Executable Permissions & Launch',
            instruction: 'Navigate to the bundle folder, grant execution permission, and launch ChatXa.',
            command: 'cd build/linux/x64/release/bundle/ && chmod +x chatxa && ./chatxa',
            tip: 'ChatXa will launch instantly as a responsive desktop window integrated with your desktop theme!'
          },
          {
            stepNumber: 4,
            title: 'Create Desktop Entry (.desktop Launcher)',
            instruction: 'Use our interactive generator below to create ~/.local/share/applications/chatxa.desktop so ChatXa appears in your App Drawer and Dock!',
            tip: 'Run "update-desktop-database ~/.local/share/applications/" to refresh your desktop environment.'
          }
        ]
      },
      {
        id: 'waydroid',
        name: 'Waydroid Container (Android APK on Wayland)',
        subtitle: 'Near-native speed via LXC container namespaces',
        description: 'If you run Wayland (default on Ubuntu 22.04+, Fedora, Debian 12), Waydroid runs the release APK with direct GPU pass-through at 60+ FPS.',
        estimatedTime: '4 Minutes',
        difficulty: 'Intermediate',
        requiresPc: true,
        toolsNeeded: ['Linux running Wayland', 'Waydroid package', 'ChatXa Android APK'],
        compatibility: 'Wayland desktop sessions (GNOME, KDE Plasma 6, Sway)',
        steps: [
          {
            stepNumber: 1,
            title: 'Install Waydroid for Your Distribution',
            instruction: 'Install Waydroid via your package manager.',
            codeBlock: '# Ubuntu / Debian:\nsudo apt install curl ca-certificates -y\ncurl -s https://repo.waydro.id | sudo bash\nsudo apt install waydroid -y\n\n# Fedora:\nsudo dnf copr enable alefc/waydroid && sudo dnf install waydroid\n\n# Arch Linux:\nsudo pacman -S waydroid'
          },
          {
            stepNumber: 2,
            title: 'Initialize & Start Waydroid Service',
            instruction: 'Initialize the Android image and start the container session.',
            command: 'sudo waydroid init && sudo systemctl start waydroid-container && waydroid session start &'
          },
          {
            stepNumber: 3,
            title: 'Install ChatXa APK into Container',
            instruction: 'Install the verified release APK into your Waydroid instance.',
            command: 'waydroid app install "ChatXa-Android-Release.apk"'
          },
          {
            stepNumber: 4,
            title: 'Launch from Application Menu',
            instruction: 'ChatXa will now appear directly in your GNOME / KDE Application Menu just like any native app!',
            tip: 'You can also launch from terminal: waydroid app launch com.chatxa.chatxa'
          }
        ]
      }
    ]
  }
};
