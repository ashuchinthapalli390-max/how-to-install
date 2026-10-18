import React, { useState } from 'react';
import { HeroScene } from '../components/cinematic/HeroScene';
import { PlatformSelector } from '../components/cinematic/PlatformSelector';
import { InstallationEngine } from '../components/installation/InstallationEngine';
import { CinematicIntro } from '../components/cinematic/CinematicIntro';
import { PLATFORMS_DATA } from '../data/platforms';
import { useRouter } from '../context/RouterContext';
import {
  Download,
  ArrowRight,
  Wrench,
  HelpCircle,
  Smartphone,
  Apple,
  Monitor,
  Copy,
  Check
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Branded Editorial Startup Intro Sequence (Session-persisted / Skippable) */}
      <CinematicIntro />

      {/* Main CreaXa-Style Hero */}
      <HeroScene />

      {/* Section 01: Choose Your Platform (Curated Platform Showcase) */}
      <PlatformSelector />

      {/* Section 02: The Installation Engine (Interactive Workflow Demonstration) */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="section-heading" style={{ marginBottom: 36 }}>
          <div>
            <div className="eyebrow">
              <span className="live-dot" />
              <span>02 / THE INSTALLATION ENGINE</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 'clamp(36px, 4.4vw, 64px)',
                lineHeight: 1.08,
                letterSpacing: '-0.05em'
              }}
            >
              INTERACTIVE JOURNEY. <br />
              <em>STEP-BY-STEP.</em>
            </h2>
          </div>
          <p
            className="large-copy"
            style={{ maxWidth: 480, margin: 0, fontSize: 15, color: 'var(--muted)' }}
          >
            Test-drive the real installation workflow below. Every step tracks your verification state, provides copyable terminal commands, and prevents installation pitfalls.
          </p>
        </div>

        {/* Embedded Interactive Engine with Android as Default Showcase */}
        <InstallationEngine platform={PLATFORMS_DATA.android} />
      </section>

      {/* Section 03: Verified Releases Hub */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="section-heading" style={{ marginBottom: 40 }}>
          <div>
            <div className="eyebrow">
              <span className="live-dot" />
              <span>03 / VERIFIED RELEASES</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 'clamp(36px, 4.4vw, 64px)',
                lineHeight: 1.08,
                letterSpacing: '-0.05em'
              }}
            >
              PRODUCTION BINARIES. <br />
              <em>CRYPTOGRAPHIC INTEGRITY.</em>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <button
              onClick={() => navigate('/download')}
              className="button"
            >
              Explore Full Release Hub
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Release Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24
          }}
        >
          {/* Android Release Card */}
          <div
            className="surface-card"
            style={{
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 24
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className="badge" style={{ gap: 6 }}>
                  <Smartphone size={12} />
                  ANDROID 8.0+
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)' }}>
                  VERIFIED APK
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--heading)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                ChatXa-Android-Release.apk
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Universal arm64-v8a / armeabi-v7a bundle containing the complete offline Flutter runtime and WebRTC calling engine.
              </p>

              <div
                style={{
                  marginTop: 20,
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--line)',
                  fontSize: 11,
                  fontFamily: 'var(--mono)'
                }}
              >
                <div style={{ color: 'var(--muted)', marginBottom: 4 }}>FILE SIZE & CHECKSUM</div>
                <div style={{ color: 'var(--text)', fontWeight: 600 }}>549.7 MB (Direct Download)</div>
                <div
                  onClick={() => handleCopyHash('92637def761092a58373fd26ae9d4bfdeab391bdabf9198b96d138bd2af1fb05', 'apk')}
                  style={{
                    color: 'var(--accent)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 6,
                    fontSize: 10
                  }}
                >
                  {copiedHash === 'apk' ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedHash === 'apk' ? 'Checksum Copied' : 'SHA-256: 92637def...fb05'}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a
                href="https://github.com/ashuchinthapalli390-max/how-to-install/releases/download/v4.0.0/ChatXa-Android-Release.zip"
                download="ChatXa-Android-Release.zip"
                className="button full"
                style={{ margin: 0, justifyContent: 'center' }}
              >
                <Download size={15} />
                Download Compressed APK (165 MB · Fast)
              </a>

              <a
                href="https://github.com/ashuchinthapalli390-max/how-to-install/releases/download/v4.0.0/ChatXa-Android-Release.apk"
                download="ChatXa-Android-Release.apk"
                className="button secondary sm full"
                style={{ margin: 0, justifyContent: 'center', fontSize: 11 }}
              >
                <span>Direct Standalone APK (549 MB)</span>
              </a>
            </div>
          </div>

          {/* iOS Release Card */}
          <div
            className="surface-card"
            style={{
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 24
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className="badge" style={{ gap: 6 }}>
                  <Apple size={12} />
                  iOS 15.0+
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)' }}>
                  VERIFIED IPA
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--heading)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                ChatXa-iOS-Release.ipa
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Signed iOS application bundle ready for Sideloadly installation with free Apple ID or direct TestFlight beta enrollment.
              </p>

              <div
                style={{
                  marginTop: 20,
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--line)',
                  fontSize: 11,
                  fontFamily: 'var(--mono)'
                }}
              >
                <div style={{ color: 'var(--muted)', marginBottom: 4 }}>FILE SIZE & CHECKSUM</div>
                <div style={{ color: 'var(--text)', fontWeight: 600 }}>47.8 MB (Direct Download)</div>
                <div
                  onClick={() => handleCopyHash('4b9bc55c535381be022bd3540c09f1b4a4eda375dd8e5ab2bdec6812b9e51362', 'ipa')}
                  style={{
                    color: 'var(--accent)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 6,
                    fontSize: 10
                  }}
                >
                  {copiedHash === 'ipa' ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedHash === 'ipa' ? 'Checksum Copied' : 'SHA-256: 4b9bc55c...1362'}</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/ashuchinthapalli390-max/how-to-install/releases/download/v4.0.0/ChatXa-iOS-Release.ipa"
              download="ChatXa-iOS-Release.ipa"
              className="button full"
              style={{ margin: 0, justifyContent: 'center' }}
            >
              <Download size={15} />
              Download IPA (47.8 MB)
            </a>
          </div>

          {/* Desktop & Linux Card */}
          <div
            className="surface-card"
            style={{
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 24
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className="badge" style={{ gap: 6 }}>
                  <Monitor size={12} />
                  WIN / MAC / LINUX
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>
                  STANDALONE
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--heading)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                Workstation Runtimes
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Native 64-bit binaries for Windows 10/11, macOS Apple Silicon Cocoa container, and Linux GTK3 terminal compilation scripts.
              </p>

              <div
                style={{
                  marginTop: 20,
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--line)',
                  fontSize: 11,
                  fontFamily: 'var(--mono)'
                }}
              >
                <div style={{ color: 'var(--muted)', marginBottom: 4 }}>COMPATIBILITY MATRIX</div>
                <div style={{ color: 'var(--text)' }}>Windows x64 · macOS M1-M4 · Linux GTK3</div>
                <div style={{ color: 'var(--accent)', marginTop: 4 }}>Zero-configuration terminal generator</div>
              </div>
            </div>

            <button
              onClick={() => navigate('/install/windows')}
              className="button secondary full"
              style={{ margin: 0 }}
            >
              View Desktop Setup Guides
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Section 04: Troubleshooting Solver & FAQ Quick Matrix */}
      <section className="section" style={{ position: 'relative' }}>
        <div
          className="surface-card"
          style={{
            padding: '48px',
            border: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 36
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              <span className="live-dot" />
              <span>04 / SOLVER MATRIX</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                marginBottom: 14
              }}
            >
              Encountered a platform block? <br />
              <em>We have verified solutions.</em>
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
              Step-by-step unblocking tutorials for Play Protect warnings, iOS Untrusted Developer certificates, macOS Gatekeeper quarantine, and Linux missing GTK dependencies.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/troubleshooting')}
              className="button"
            >
              <Wrench size={15} />
              Open Solver Matrix
            </button>
            <button
              onClick={() => navigate('/faq')}
              className="button secondary"
            >
              <HelpCircle size={15} />
              Read FAQ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
