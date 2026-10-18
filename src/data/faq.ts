import type { FaqItem } from '../types';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-sync',
    platform: 'general',
    tags: ['Sync', 'Realtime', 'Multi-device'],
    question: 'Does my chat history, media, and login sync across all five devices?',
    answer: 'Yes! ChatXa uses our unified cloud backend with realtime WebSockets. Any message sent from your iPhone appears instantly on your Android phone, Windows PC, MacBook, or Linux workstation in milliseconds.'
  },
  {
    id: 'faq-updates',
    platform: 'general',
    tags: ['Updates', 'Data Safety'],
    question: 'How do I update ChatXa without losing my existing chats and media?',
    answer: 'Simply download and install the new release version directly over the existing app. Do not uninstall the old app first (unless you are switching between a debug signature and a production release signature). All local login sessions, database caches, and settings are preserved intact.'
  },
  {
    id: 'faq-file-sizes',
    platform: 'general',
    tags: ['Android', 'iOS', 'Performance'],
    question: 'Why is the Android APK ~549 MB while the iOS IPA is ~48 MB?',
    answer: 'The Android release package includes universal offline pre-compiled binaries for arm64-v8a, armeabi-v7a, and x86_64 CPU architectures along with bundled WebRTC dynamic calling engines. The iOS package contains a targeted ARM64 slice utilizing iOS native system frameworks.'
  },
  {
    id: 'faq-apple-id-cost',
    platform: 'ios',
    tags: ['iPhone', 'Sideloadly', 'Apple ID'],
    question: 'Do I need a paid $99/year Apple Developer account to install on iPhone?',
    answer: 'No! You can sideload ChatXa using any completely free personal Apple ID via Sideloadly or 3uTools. Apple grants all free accounts personal 7-day development certificates at zero cost. After 7 days, a 1-click refresh in Sideloadly renews the certificate without data loss.'
  },
  {
    id: 'faq-play-protect-safety',
    platform: 'android',
    tags: ['Android', 'Play Protect', 'Security'],
    question: 'Why does Google Play Protect display a warning for the APK?',
    answer: 'Google displays the "Unrecognized app" prompt for ANY newly compiled .apk build worldwide that is distributed directly rather than through Google Play Store indexing. ChatXa is 100% clean, contains no malware, and simply requests standard camera/mic permissions for calling.'
  },
  {
    id: 'faq-windows-portable',
    platform: 'windows',
    tags: ['Windows', 'Standalone', 'Portable'],
    question: 'Can I run ChatXa on Windows as a portable app without administrator rights?',
    answer: 'Yes! ChatXa for Windows is distributed as a portable standalone folder. You can extract it anywhere—such as your Documents or a USB flash drive—and launch chatxa.exe directly without requiring system administrator installation permissions.'
  },
  {
    id: 'faq-apple-silicon-m-series',
    platform: 'macos',
    tags: ['macOS', 'M1', 'M2', 'M3', 'M4'],
    question: 'Can I run ChatXa on an Apple Silicon Mac using the iPhone IPA?',
    answer: 'Yes! Because Apple Silicon Macs (M1, M2, M3, M4) share the identical ARM64 architecture as iPhones, you can install ChatXa-iOS-Release.ipa directly on macOS using Sideloadly or PlayCover.'
  },
  {
    id: 'faq-linux-desktop-entry',
    platform: 'linux',
    tags: ['Linux', 'Desktop Launcher', 'GNOME', 'KDE'],
    question: 'How do I pin ChatXa to my Linux dock or application menu?',
    answer: 'Use our interactive Linux .desktop Generator on the Linux installation page to generate a standard freedesktop launcher file at ~/.local/share/applications/chatxa.desktop. ChatXa will immediately appear in your GNOME / KDE / XFCE app launcher!'
  }
];
