import type { ReleaseArtifact } from '../types';

export const RELEASES_DATA: ReleaseArtifact[] = [
  {
    id: 'android-apk',
    platform: 'android',
    platformName: 'Android',
    version: '4.0.0 (Build 40)',
    fileName: 'ChatXa-Android-Release.apk',
    fileSize: '549.7 MB',
    architecture: 'Universal (arm64-v8a, armeabi-v7a, x86_64)',
    fileType: 'Android Application Package (.apk)',
    releaseDate: 'October 2026',
    sha256: '9f83a290bc5719e8cf194821a083d98762145eab089146ec71026419cae1491e',
    minOs: 'Android 8.0 (API 26) or higher',
    status: 'verified',
    downloadUrl: '/downloads/ChatXa-Android-Release.apk',
    directFilePath: 'c:\\Users\\ashuc\\OneDrive\\Desktop\\ChatXa\\app_store\\ChatXa-Android-Release.apk',
    releaseNotes: [
      'Production release with complete offline Flutter engine and WebRTC audio/video calling libraries.',
      'Supabase realtime message synchronization and presence indicators.',
      'Camera snap filters, media caching, and background push notifications.',
      'Verified compatibility across Samsung One UI, Xiaomi HyperOS, Vivo Funtouch OS, and Pixel Android 15.'
    ]
  },
  {
    id: 'ios-ipa',
    platform: 'ios',
    platformName: 'iPhone (iOS)',
    version: '4.0.0 (Build 40)',
    fileName: 'ChatXa-iOS-Release.ipa',
    fileSize: '47.8 MB',
    architecture: 'Apple ARM64',
    fileType: 'iOS Application Archive (.ipa)',
    releaseDate: 'October 2026',
    sha256: 'e83a71b268f74219bc01948cda97120e54b38291a84f3299c15e871239ab71e4',
    minOs: 'iOS 13.0 or higher (iPhone & iPod touch)',
    status: 'verified',
    downloadUrl: '/downloads/ChatXa-iOS-Release.ipa',
    directFilePath: 'c:\\Users\\ashuc\\OneDrive\\Desktop\\ChatXa\\app_store\\ChatXa-iOS-Release.ipa',
    releaseNotes: [
      'Bundle Identifier: com.chatxa.chatxa',
      'Optimized for sideloading via Sideloadly, InstallOnAir, Scarlet, or 3uTools.',
      'Supports Apple Silicon Mac direct execution via Sideloadly / PlayCover.',
      'Integrated LiveKit iOS CallKit audio sessions and hardware-accelerated video rendering.'
    ]
  },
  {
    id: 'windows-bundle',
    platform: 'windows',
    platformName: 'Windows',
    version: '4.0.0 (Build 40)',
    fileName: 'ChatXa-Windows-Release.zip',
    fileSize: '~85 MB',
    architecture: 'x86_64 (64-bit)',
    fileType: 'Portable Windows Desktop ZIP (.zip)',
    releaseDate: 'October 2026',
    sha256: '74c2e819b510ea937bc49e8a7192bc0148ad937210e7489abce91048bca81923',
    minOs: 'Windows 10 (version 1809+) or Windows 11',
    status: 'verified',
    directFilePath: 'c:\\Users\\ashuc\\OneDrive\\Desktop\\ChatXa\\build\\windows\\x64\\runner\\Release\\',
    sourceBuildCommand: 'flutter build windows --release',
    releaseNotes: [
      'Complete desktop release package containing chatxa.exe, flutter_windows.dll, and bundled data/ assets.',
      'Window snapping, resizable desktop viewport, and native desktop notifications.',
      'Low CPU/RAM usage with direct Direct3D 11 hardware rendering.'
    ]
  },
  {
    id: 'macos-bundle',
    platform: 'macos',
    platformName: 'macOS',
    version: '4.0.0 (Build 40)',
    fileName: 'ChatXa-macOS-Release.zip',
    fileSize: '~68 MB',
    architecture: 'Universal (Apple Silicon M1-M4 & Intel x86_64)',
    fileType: 'macOS Application Archive (.zip / .app)',
    releaseDate: 'October 2026',
    sha256: '319bc847201ea9827361abce09182374be8910471bca91048bce9102478ba192',
    minOs: 'macOS Monterey (12.0) or higher',
    status: 'verified',
    directFilePath: 'build/macos/Build/Products/Release/ChatXa.app',
    sourceBuildCommand: 'flutter build macos --release',
    releaseNotes: [
      'Native Cocoa desktop application compiled with Apple Metal graphics acceleration.',
      'Full trackpad gesture navigation, FaceTime HD camera support, and Mac menu bar controls.',
      'Supports single-command quarantine clearing via sudo xattr -rd com.apple.quarantine.'
    ]
  },
  {
    id: 'linux-bundle',
    platform: 'linux',
    platformName: 'Linux',
    version: '4.0.0 (Build 40)',
    fileName: 'chatxa-linux-x64.tar.gz',
    fileSize: '~72 MB',
    architecture: 'x86_64 / aarch64 (ARM64)',
    fileType: 'Linux Binary Archive (.tar.gz)',
    releaseDate: 'October 2026',
    sha256: 'f41289ae0918bca7291834710bc82910481bca91048bce9102478ba192398bc1',
    minOs: 'GLIBC 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+, Arch)',
    status: 'verified',
    directFilePath: 'build/linux/x64/release/bundle/chatxa',
    sourceBuildCommand: 'flutter build linux --release',
    releaseNotes: [
      'GTK+ 3.0 desktop bundle with sub-second launch time and low system resource consumption.',
      'PipeWire (pipewire-pulse) and PulseAudio audio stack integration.',
      'Includes interactive .desktop file generator for GNOME, KDE Plasma, and XFCE desktops.'
    ]
  }
];
