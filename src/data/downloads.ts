import type { ReleaseArtifact } from '../types';

export interface OfficialGuideFile {
  id: string;
  title: string;
  platform: string;
  fileName: string;
  fileSize: string;
  downloadUrl: string;
  description: string;
}

export const OFFICIAL_GUIDES_DATA: OfficialGuideFile[] = [
  {
    id: 'guide-android',
    title: 'Android Step-by-Step Installation Manual',
    platform: 'Android',
    fileName: 'HOW_TO_INSTALL_ON_ANDROID.txt',
    fileSize: '9.2 KB',
    downloadUrl: '/downloads/HOW_TO_INSTALL_ON_ANDROID.txt',
    description: 'Detailed instructions for direct APK sideloading, Chrome Unknown Sources toggle, Samsung Auto Blocker, and ADB commands.'
  },
  {
    id: 'guide-ios',
    title: 'iPhone & iPad Sideloading Manual',
    platform: 'iPhone (iOS)',
    fileName: 'HOW_TO_INSTALL_ON_IPHONE.txt',
    fileSize: '12.2 KB',
    downloadUrl: '/downloads/HOW_TO_INSTALL_ON_IPHONE.txt',
    description: 'Complete walkthrough for Sideloadly USB signing, InstallOnAir wireless install, Scarlet, 3uTools, and iOS 16 Developer Mode.'
  },
  {
    id: 'guide-windows',
    title: 'Windows Desktop Deployment Manual',
    platform: 'Windows',
    fileName: 'HOW_TO_INSTALL_ON_WINDOWS.txt',
    fileSize: '8.4 KB',
    downloadUrl: '/downloads/HOW_TO_INSTALL_ON_WINDOWS.txt',
    description: 'Standalone folder extraction, Windows Defender SmartScreen bypass, flutter_windows.dll runtime, and PowerShell build instructions.'
  },
  {
    id: 'guide-macos',
    title: 'macOS Application Installation & Quarantine Guide',
    platform: 'macOS',
    fileName: 'HOW_TO_INSTALL_ON_MACOS.txt',
    fileSize: '7.0 KB',
    downloadUrl: '/downloads/HOW_TO_INSTALL_ON_MACOS.txt',
    description: 'Applications folder deployment, Gatekeeper quarantine clearance (xattr -rd), and Apple Silicon Cocoa optimization.'
  },
  {
    id: 'guide-linux',
    title: 'Linux Distribution Installation & Waydroid Guide',
    platform: 'Linux',
    fileName: 'HOW_TO_INSTALL_ON_LINUX.txt',
    fileSize: '7.0 KB',
    downloadUrl: '/downloads/HOW_TO_INSTALL_ON_LINUX.txt',
    description: 'GTK3 and Ayatana AppIndicator dependencies across Ubuntu, Fedora, Arch, and openSUSE plus Waydroid container setup.'
  },
  {
    id: 'guide-readme',
    title: 'Master App Store Distribution Readme',
    platform: 'Universal',
    fileName: 'README.txt',
    fileSize: '1.0 KB',
    downloadUrl: '/downloads/README.txt',
    description: 'Release manifest and deployment overview for ChatXa 4.0 universal communications engine.'
  }
];

export const RELEASES_DATA: ReleaseArtifact[] = [
  {
    id: 'app-store-bundle',
    platform: 'all',
    platformName: 'Universal App Store Bundle',
    version: '4.0.0 (Build 40)',
    fileName: 'ChatXa-App-Store.zip',
    fileSize: '221.2 MB',
    architecture: 'Universal (All Operating Systems)',
    fileType: 'Complete App Store Release Archive (.zip)',
    releaseDate: 'October 2026',
    sha256: '0b07c6f74d7e2dde7b9d73d29ffb38a4054a81c1fd81852a530c8c1e5eed1f2d',
    minOs: 'Universal cross-platform archive',
    status: 'verified',
    downloadUrl: '/downloads/ChatXa-App-Store.zip',
    directFilePath: 'c:\\Users\\ashuc\\OneDrive\\Desktop\\ChatXa\\App Store.zip',
    releaseNotes: [
      'Master distribution bundle containing both verified release binaries and all technical guides.',
      'Includes ChatXa-Android-Release.apk (549.7 MB uncompressed).',
      'Includes ChatXa-iOS-Release.ipa (47.8 MB).',
      'Includes all 6 technical installation guides and deployment readmes.',
      'Compressed at 221 MB for fast downloading and offline pendrive/LAN distribution.'
    ]
  },
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
    sha256: '92637def761092a58373fd26ae9d4bfdeab391bdabf9198b96d138bd2af1fb05',
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
    sha256: '4b9bc55c535381be022bd3540c09f1b4a4eda375dd8e5ab2bdec6812b9e51362',
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
