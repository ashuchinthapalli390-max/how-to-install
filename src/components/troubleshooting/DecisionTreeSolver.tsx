import React, { useState } from 'react';
import type { PlatformId, DecisionTreeNode } from '../../types';
import {
  Wrench,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';

const DECISION_TREES: DecisionTreeNode[] = [
  // Android Trees
  {
    id: 'tree-android-playprotect',
    platform: 'android',
    symptom: 'Blocked by Play Protect / Unrecognized app warning',
    question: 'When does the warning appear on your Android device?',
    options: [
      {
        label: 'During direct APK installation from Chrome or WhatsApp',
        solution: {
          title: 'Bypass Play Protect Sideload Notice',
          explanation: 'Play Protect displays a caution because ChatXa is directly signed rather than published through Google Play Store.',
          steps: [
            '1. In the Play Protect dialog, tap the small "More details" dropdown arrow.',
            '2. Tap "Install anyway" (do NOT tap OK or Uninstall).',
            '3. The package manager will proceed with the verified installation.'
          ]
        }
      },
      {
        label: 'Samsung Auto Blocker prevents tapping the APK entirely',
        solution: {
          title: 'Disable Samsung One UI 6 Auto Blocker Temporarily',
          explanation: 'One UI 6 introduces an Auto Blocker feature that blocks third-party APK execution by default.',
          steps: [
            '1. Open Samsung Settings → Security and privacy.',
            '2. Scroll down to "Auto Blocker".',
            '3. Toggle Auto Blocker OFF temporarily.',
            '4. Return to your file manager and tap ChatXa-Android-Release.apk.'
          ]
        }
      }
    ]
  },
  {
    id: 'tree-android-parse',
    platform: 'android',
    symptom: '"Problem parsing the package" or "App not installed"',
    question: 'What is your Android version and download state?',
    options: [
      {
        label: 'The APK download might have paused or corrupted',
        solution: {
          title: 'Verify APK Size & Re-Download',
          explanation: 'The full ChatXa APK bundle is ~549.7 MB. If the file is incomplete, Android cannot read the package manifest.',
          steps: [
            '1. Open your Downloads folder and check the exact file size.',
            '2. If it is less than 540 MB, delete the partial file and re-download.',
            '3. Ensure your phone has at least 1.2 GB of free internal storage.'
          ]
        }
      },
      {
        label: 'Running an older Android version below Android 8.0',
        solution: {
          title: 'Minimum OS Requirement: Android 8.0 (Oreo)+',
          explanation: 'ChatXa 4.0 relies on Modern WebRTC and Android NDK arm64 runtime.',
          steps: [
            '1. Check Settings → About Phone → Android Version.',
            '2. Devices running Android 7.1 or older cannot execute ChatXa 4.0.'
          ]
        }
      }
    ]
  },

  // iOS Trees
  {
    id: 'tree-ios-unsupported',
    platform: 'ios',
    symptom: 'iPhone displays "Unsupported file type" when receiving IPA',
    question: 'How are you opening the IPA on your iPhone?',
    options: [
      {
        label: 'Tapping directly inside WhatsApp, Telegram, or Safari',
        solution: {
          title: 'iOS Security Architecture Explained',
          explanation: 'iOS does not natively execute .ipa archives tapped inside chat apps. You must sign the IPA or use Sideloadly.',
          steps: [
            '1. Do not expect iOS to open .ipa files directly like Android opens APKs.',
            '2. Use Sideloadly on your PC/Mac with your free Apple ID.',
            '3. Or open an official TestFlight beta invitation.'
          ]
        }
      }
    ]
  },
  {
    id: 'tree-ios-untrusted',
    platform: 'ios',
    symptom: '"Untrusted Developer" or "Developer Mode Required"',
    question: 'Which alert is blocking ChatXa from opening?',
    options: [
      {
        label: '"Untrusted Enterprise / Personal Developer"',
        solution: {
          title: 'Trust Certificate in iOS Settings',
          explanation: 'Apple requires manual user trust for free developer accounts before the sandbox executes.',
          steps: [
            '1. Open iOS Settings → General → VPN & Device Management.',
            '2. Under "Developer App", tap your Apple ID email.',
            '3. Tap "Trust [Your Apple ID]" and confirm.'
          ]
        }
      },
      {
        label: '"Developer Mode Required" (iOS 16, 17, 18+)',
        solution: {
          title: 'Enable iOS Developer Mode',
          explanation: 'Apple introduced mandatory Developer Mode activation for sideloaded apps in iOS 16+.',
          steps: [
            '1. Open iOS Settings → Privacy & Security.',
            '2. Scroll to the very bottom and tap "Developer Mode".',
            '3. Toggle Developer Mode ON → Tap Restart.',
            '4. After reboot, unlock your phone and tap "Turn On" when prompted.'
          ]
        }
      }
    ]
  },

  // macOS Trees
  {
    id: 'tree-macos-quarantine',
    platform: 'macos',
    symptom: '"ChatXa.app is damaged and cannot be opened"',
    question: 'Did you download the app bundle from the web?',
    options: [
      {
        label: 'Yes, downloaded from browser or cloud link',
        solution: {
          title: 'Strip Apple Gatekeeper Quarantine Flag',
          explanation: 'macOS Gatekeeper tags internet downloads with extended security attributes.',
          commands: ['sudo xattr -rd com.apple.quarantine /Applications/ChatXa.app'],
          steps: [
            '1. Open Terminal on your Mac (⌘ + Space → Terminal).',
            '2. Paste: sudo xattr -rd com.apple.quarantine /Applications/ChatXa.app',
            '3. Press Enter and enter your Mac administrator password.',
            '4. Launch ChatXa from Applications.'
          ]
        }
      }
    ]
  },

  // Windows Trees
  {
    id: 'tree-windows-smartscreen',
    platform: 'windows',
    symptom: 'Microsoft Defender SmartScreen "Windows protected your PC"',
    question: 'Did you download the standalone ZIP release?',
    options: [
      {
        label: 'Yes, downloaded ChatXa-Windows-x64-Release.zip',
        solution: {
          title: 'Allow Execution in SmartScreen Dialog',
          explanation: 'Because ChatXa is distributed directly, SmartScreen flags the standalone executable.',
          steps: [
            '1. Extract the full ZIP file into a folder (do not run from inside the archive).',
            '2. In the SmartScreen prompt, click the small "More info" text link.',
            '3. Click the "Run anyway" button that appears at the bottom right.'
          ]
        }
      }
    ]
  },

  // Linux Trees
  {
    id: 'tree-linux-gtk',
    platform: 'linux',
    symptom: 'error while loading shared libraries: libgtk-3.so.0 or libayatana',
    question: 'Which distribution are you running?',
    options: [
      {
        label: 'Ubuntu, Debian, Linux Mint, or Pop!_OS',
        solution: {
          title: 'Install GTK3 & Ayatana Prerequisites',
          explanation: 'ChatXa Flutter native desktop requires standard GTK3 and tray libraries.',
          commands: ['sudo apt-get update && sudo apt-get install -y libgtk-3-0 libayatana-appindicator3-1'],
          steps: [
            '1. Run the command above in your terminal.',
            '2. Ensure permissions: chmod +x chatxa_linux.',
            '3. Launch with: ./chatxa_linux'
          ]
        }
      },
      {
        label: 'Fedora, Arch Linux, or openSUSE',
        solution: {
          title: 'Install Distribution Dependencies',
          explanation: 'Install the native GUI dependencies via your system package manager.',
          commands: [
            'Fedora: sudo dnf install -y gtk3 libayatana-appindicator-gtk3',
            'Arch: sudo pacman -S --needed gtk3 libayatana-appindicator'
          ],
          steps: [
            '1. Run the appropriate package manager command for your distribution.',
            '2. Re-run ChatXa binary.'
          ]
        }
      }
    ]
  }
];

export const DecisionTreeSolver: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | 'all'>('all');
  const [activeTreeId, setActiveTreeId] = useState<string | null>(null);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const filteredTrees = DECISION_TREES.filter(
    (t) => selectedPlatform === 'all' || t.platform === selectedPlatform
  );

  const activeTree = DECISION_TREES.find((t) => t.id === activeTreeId);
  const activeSolution = selectedOptionIdx !== null && activeTree ? activeTree.options[selectedOptionIdx]?.solution : null;

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleReset = () => {
    setActiveTreeId(null);
    setSelectedOptionIdx(null);
  };

  return (
    <div
      className="surface-card"
      style={{
        padding: '36px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            <span className="live-dot" />
            <span>INTERACTIVE DECISION TREE</span>
          </div>
          <h3 style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 700, margin: 0 }}>
            Troubleshooting Solver Engine
          </h3>
        </div>

        {/* Platform filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'android', label: 'Android' },
            { id: 'ios', label: 'iOS' },
            { id: 'windows', label: 'Windows' },
            { id: 'macos', label: 'macOS' },
            { id: 'linux', label: 'Linux' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPlatform(p.id as any);
                handleReset();
              }}
              className="button secondary sm"
              style={{
                minHeight: 28,
                padding: '4px 10px',
                fontSize: 11,
                borderColor: selectedPlatform === p.id ? 'var(--accent)' : 'var(--line)',
                color: selectedPlatform === p.id ? 'var(--accent)' : 'var(--muted)'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 1: Select Symptom */}
      {!activeTree && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
            SELECT YOUR ERROR SYMPTOM:
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {filteredTrees.map((tree) => (
              <div
                key={tree.id}
                onClick={() => {
                  setActiveTreeId(tree.id);
                  setSelectedOptionIdx(null);
                }}
                className="surface-card"
                style={{
                  padding: 18,
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Wrench size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase' }}>
                      {tree.platform.toUpperCase()}
                    </span>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>
                      {tree.symptom}
                    </div>
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Diagnostic Question */}
      {activeTree && selectedOptionIdx === null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="badge" style={{ textTransform: 'uppercase' }}>
              {activeTree.platform.toUpperCase()} · DIAGNOSIS
            </span>
            <button onClick={handleReset} className="text-link" style={{ fontSize: 11, border: 0 }}>
              <RotateCcw size={12} /> Choose Another Issue
            </button>
          </div>

          <h4 style={{ fontSize: 18, fontFamily: 'var(--heading)', fontWeight: 700, margin: 0 }}>
            {activeTree.question}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activeTree.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOptionIdx(idx)}
                className="surface-card"
                style={{
                  padding: 16,
                  textAlign: 'left',
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text)'
                }}
              >
                <span>{opt.label}</span>
                <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Targeted Verified Solution */}
      {activeTree && activeSolution && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent)', fontWeight: 700 }}>
                VERIFIED DIAGNOSTIC RESOLUTION
              </span>
            </div>
            <button onClick={handleReset} className="text-link" style={{ fontSize: 11, border: 0 }}>
              <RotateCcw size={12} /> Solve Another Issue
            </button>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--raised)',
              border: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}
          >
            <h4 style={{ fontSize: 20, fontFamily: 'var(--heading)', fontWeight: 700, margin: 0, color: 'var(--text)' }}>
              {activeSolution.title}
            </h4>

            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--muted)', margin: 0 }}>
              {activeSolution.explanation}
            </p>

            {/* Terminal Commands if any */}
            {activeSolution.commands && activeSolution.commands.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  RUN IN TERMINAL:
                </span>
                {activeSolution.commands.map((cmd, i) => (
                  <div key={i} className="code-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <code>$ {cmd}</code>
                    <button
                      onClick={() => handleCopy(cmd)}
                      className="button secondary sm"
                      style={{ minHeight: 26, padding: '2px 8px', fontSize: 10 }}
                    >
                      {copiedCmd === cmd ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedCmd === cmd ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Step-by-step checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeSolution.steps.map((st, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>•</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
