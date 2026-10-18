import type { TroubleshootingItem } from '../types';

export const TROUBLESHOOTING_DATA: TroubleshootingItem[] = [
  // Android
  {
    id: 'android-play-protect',
    platform: 'android',
    category: 'Installation',
    title: 'Google Play Protect: "Blocked by Play Protect" or "Unrecognized App"',
    symptom: 'A full-screen or popup warning appears with a red shield or grey dialog stating that the app is from an unknown developer.',
    rootCause: 'Google Play Protect automatically flags any newly compiled .apk build worldwide that has not yet been registered and indexed in Google cloud application catalog.',
    verification: 'Check the dialog for "More details" with a downward arrow.',
    solutionSteps: [
      'Do NOT tap "OK" or "Uninstall".',
      'Tap the small text that says "More details" (or the dropdown arrow).',
      'Tap "Install anyway" (or "Install anyway (unsafe)").',
      'The package manager will proceed with the installation immediately.'
    ]
  },
  {
    id: 'android-signature-conflict',
    platform: 'android',
    category: 'Installation',
    title: '"App not installed" or "App not compatible with your device"',
    symptom: 'The package installer reaches near 100% and then reports "App not installed".',
    rootCause: 'An older test build or debug build of ChatXa is already installed on the phone with a different cryptographic keystore signature.',
    verification: 'Check your phone app drawer or Settings → Apps to see if an older ChatXa icon already exists.',
    solutionSteps: [
      'Locate the old version of ChatXa on your phone.',
      'Long-press the icon and select "Uninstall".',
      'Return to your Downloads or file manager and tap "ChatXa-Android-Release.apk" again.',
      'Tap "Install". The fresh release package will install smoothly.'
    ]
  },
  {
    id: 'android-parse-error',
    platform: 'android',
    category: 'Installation',
    title: '"There was a problem parsing the package" (Parse Error)',
    symptom: 'Android immediately aborts when opening the APK and says "Parse Error".',
    rootCause: 'The APK file was incompletely downloaded or corrupted during transfer. The file size should be approximately 549.7 MB.',
    verification: 'Open your file manager, check file details, and verify the file size is ~549 MB, not a few megabytes.',
    solutionSteps: [
      'Delete the partial or corrupted APK file from your phone storage.',
      'Download or copy the full ChatXa-Android-Release.apk file again over high-speed Wi-Fi or USB cable.',
      'Ensure your phone has at least 1.5 GB of free internal storage.',
      'Open the newly downloaded APK and install.'
    ]
  },
  {
    id: 'android-samsung-auto-blocker',
    platform: 'android',
    category: 'Installation',
    title: 'Samsung One UI 6.0+ "Auto Blocker" Blocks APK Installation',
    symptom: 'On Samsung Galaxy phones running Android 14 / One UI 6, tapping the APK shows "Installation blocked by Auto Blocker".',
    rootCause: 'Samsung introduced Auto Blocker in One UI 6 to prevent sideloading from non-Galaxy Store / non-Play Store sources by default.',
    verification: 'Look for the Samsung shield icon with the label "Auto Blocker".',
    solutionSteps: [
      'Open Samsung phone Settings.',
      'Scroll down to "Security and privacy".',
      'Tap "Auto Blocker".',
      'Temporarily toggle Auto Blocker to OFF (you may need to confirm with fingerprint/PIN).',
      'Return to your APK file and tap Install. Once installed, you may toggle Auto Blocker back on.'
    ]
  },

  // iOS
  {
    id: 'ios-unsupported-file',
    platform: 'ios',
    category: 'Installation',
    title: 'iPhone displays "Unsupported file type" inside WhatsApp, Telegram, or Files',
    symptom: 'Tapping ChatXa-iOS-Release.ipa displays a black screen with a zip icon and the alert "Unsupported file type".',
    rootCause: 'Unlike Android, Apple iOS strictly prevents direct execution of raw .ipa files. iOS considers .ipa files to be standard compressed ZIP archives. iOS requires a signed profile or an OTA installation manifest to install apps.',
    verification: 'You tapped the raw .ipa directly inside a messaging app or iCloud Files.',
    solutionSteps: [
      'Do not attempt to tap the .ipa directly inside WhatsApp or Files.',
      'Use METHOD 1 (InstallOnAir) to generate a wireless OTA installation manifest for Safari.',
      'Or use METHOD 2 (Scarlet) to sign and install directly on device.',
      'Or use METHOD 3 (Sideloadly) to connect your iPhone to a computer and install with 100% reliability.'
    ]
  },
  {
    id: 'ios-untrusted-developer',
    platform: 'ios',
    category: 'Permissions',
    title: '"Untrusted Enterprise Developer" or "Untrusted Developer" Popup',
    symptom: 'The ChatXa icon is on your iPhone home screen, but tapping it displays an alert stating the developer has not been trusted.',
    rootCause: 'Apple requires manual approval for any sideloaded application signed with a personal Apple ID or enterprise profile.',
    verification: 'The app icon is installed, but the system blocks opening it.',
    solutionSteps: [
      'Open the iPhone "Settings" app.',
      'Tap "General".',
      'Scroll down and tap "VPN & Device Management" (or "Profiles & Device Management").',
      'Under "Developer App", tap your Apple ID email or certificate profile name.',
      'Tap "Trust [Your Apple ID / Profile]".',
      'Tap "Trust" again on the confirmation prompt. Return to Home Screen and open ChatXa.'
    ]
  },
  {
    id: 'ios-developer-mode',
    platform: 'ios',
    category: 'Gatekeeper',
    title: 'App crashes immediately on launch on iOS 16, 17, or 18+ (Developer Mode Required)',
    symptom: 'On modern iOS versions, ChatXa closes immediately upon tapping or says Developer Mode is required.',
    rootCause: 'Beginning with iOS 16, Apple introduced Developer Mode as an extra security gate before sideloaded apps can execute.',
    verification: 'Your iPhone is running iOS 16.0 or newer.',
    solutionSteps: [
      'Open iPhone "Settings".',
      'Scroll down and tap "Privacy & Security".',
      'Scroll to the bottom of the page and tap "Developer Mode".',
      'Toggle "Developer Mode" to ON.',
      'Tap "Restart" when prompted. After reboot, unlock your phone and tap "Turn On", then enter your passcode.'
    ]
  },
  {
    id: 'ios-sideloadly-7-days',
    platform: 'ios',
    category: 'Installation',
    title: 'Free Apple ID Sideload Expires After 7 Days',
    symptom: 'After exactly 7 days of use, tapping ChatXa shows "ChatXa is no longer available".',
    rootCause: 'Apple free personal developer accounts issue signing certificates that expire after 7 days.',
    verification: 'Check whether 7 days have passed since you sideloaded via Sideloadly.',
    solutionSteps: [
      'Connect your iPhone to your PC or Mac with your USB cable.',
      'Open Sideloadly and ensure ChatXa-iOS-Release.ipa is selected.',
      'Click "Start".',
      'Sideloadly will re-sign the app for another 7 days without losing any of your chats, settings, or login session!'
    ]
  },

  // Windows
  {
    id: 'windows-missing-dll',
    platform: 'windows',
    category: 'Dependencies',
    title: '"The code execution cannot proceed because flutter_windows.dll was not found"',
    symptom: 'Double-clicking chatxa.exe produces a system error stating flutter_windows.dll is missing.',
    rootCause: 'chatxa.exe was moved or copied out of its release folder onto the desktop alone.',
    verification: 'Check if chatxa.exe is sitting alone on your desktop without the accompanying DLLs and data\\ directory.',
    solutionSteps: [
      'Keep the entire ChatXa release folder intact.',
      'Ensure chatxa.exe, flutter_windows.dll, and the data\\ folder remain together in the same directory.',
      'To have a clean desktop icon: Right-click chatxa.exe → Send to → Desktop (create shortcut).'
    ]
  },
  {
    id: 'windows-smartscreen',
    platform: 'windows',
    category: 'Gatekeeper',
    title: 'Windows Defender SmartScreen: "Windows protected your PC"',
    symptom: 'A blue popup banner appears blocking the application from starting.',
    rootCause: 'Microsoft Defender SmartScreen warns users about any newly released executable that lacks extended EV code-signing reputation.',
    verification: 'The blue window has a small text link saying "More info".',
    solutionSteps: [
      'Click the small underlined text link: "More info".',
      'A new button labelled "Run anyway" will appear at the bottom right.',
      'Click "Run anyway".',
      'ChatXa will launch immediately and Windows will remember your approval for future launches.'
    ]
  },
  {
    id: 'windows-visual-c',
    platform: 'windows',
    category: 'Dependencies',
    title: 'Missing MSVCP140.dll or VCRUNTIME140.dll on Windows',
    symptom: 'Application fails to start with an error mentioning MSVCP140.dll or VCRUNTIME140.dll.',
    rootCause: 'The computer lacks the standard Microsoft Visual C++ 2015-2022 runtime redistributable.',
    verification: 'Error dialog specifies a missing VC runtime DLL.',
    solutionSteps: [
      'Download the official Microsoft Visual C++ x64 redistributable: https://aka.ms/vs/17/release/vc_redist.x64.exe.',
      'Run the installer and complete setup.',
      'Launch chatxa.exe again.'
    ]
  },

  // macOS
  {
    id: 'macos-quarantine-damaged',
    platform: 'macos',
    category: 'Gatekeeper',
    title: 'macOS: "ChatXa.app is damaged and cannot be opened. You should move it to the Trash"',
    symptom: 'macOS displays a damaged app warning when attempting to open a downloaded app bundle.',
    rootCause: 'Apple Gatekeeper attaches an extended attribute (com.apple.quarantine) to all internet-downloaded binaries that are not notarized through an active paid Apple Developer ID.',
    verification: 'App was downloaded outside the Mac App Store.',
    solutionSteps: [
      'Open Terminal (Command + Space, type "Terminal").',
      'Run this single command:',
      'sudo xattr -rd com.apple.quarantine /Applications/ChatXa.app',
      'Enter your Mac administrator password when prompted (characters will not show while typing, which is normal).',
      'Double-click ChatXa in Applications — it will now launch smoothly!'
    ]
  },
  {
    id: 'macos-unidentified-developer',
    platform: 'macos',
    category: 'Gatekeeper',
    title: 'macOS: "ChatXa.app cannot be opened because Apple cannot check it for malicious software"',
    symptom: 'Gatekeeper stops launch with only "OK" and "Move to Trash" buttons.',
    rootCause: 'Gatekeeper default policy prevents launching apps from unidentified developers.',
    verification: 'App is in /Applications but refuses to open with a double-click.',
    solutionSteps: [
      'Hold down the CONTROL key on your keyboard and click ChatXa.app in Finder (or Right-Click).',
      'Select "Open" from the context menu.',
      'A dialog will appear containing an "Open" button.',
      'Click "Open". macOS will permanently record your permission in its security database.'
    ]
  },

  // Linux
  {
    id: 'linux-cannot-open-display',
    platform: 'linux',
    category: 'Installation',
    title: 'Linux: "Gtk-WARNING: cannot open display"',
    symptom: 'Launching ./chatxa in terminal outputs Gtk-WARNING: cannot open display and exits.',
    rootCause: 'The DISPLAY environment variable is either unset or running in an SSH or detached environment.',
    verification: 'Check "echo $DISPLAY" in terminal.',
    solutionSteps: [
      'If running in a local desktop terminal: ensure DISPLAY is set to :0 (export DISPLAY=:0).',
      'If running on Wayland: verify WAYLAND_DISPLAY is set (echo $WAYLAND_DISPLAY).',
      'Launch ChatXa again: ./chatxa'
    ]
  },
  {
    id: 'linux-missing-gtk-libs',
    platform: 'linux',
    category: 'Dependencies',
    title: 'Linux: Missing libgtk-3.so.0 or liblzma.so.5',
    symptom: 'Terminal reports error while loading shared libraries: libgtk-3.so.0: cannot open shared object file.',
    rootCause: 'The minimal distribution install lacks the GTK3 runtime libraries.',
    verification: 'Check if GTK3 packages are installed.',
    solutionSteps: [
      'For Ubuntu / Debian / Linux Mint: sudo apt install -y libgtk-3-0 liblzma5',
      'For Fedora / RHEL: sudo dnf install -y gtk3 xz-libs',
      'For Arch Linux / Manjaro: sudo pacman -S gtk3 xz',
      'Re-run ./chatxa.'
    ]
  },
  {
    id: 'linux-audio-permissions',
    platform: 'linux',
    category: 'Audio/Video',
    title: 'Linux: Microphone or Webcam not detected during calls',
    symptom: 'Voice and video calls connect but no audio or camera input is detected.',
    rootCause: 'User lacks permissions for Linux audio and video device nodes (/dev/snd and /dev/video*).',
    verification: 'Check groups using command "groups".',
    solutionSteps: [
      'Add your user account to the audio and video groups:',
      'sudo usermod -aG audio,video $USER',
      'Log out of your Linux desktop session and log back in for group changes to take effect.'
    ]
  }
];
