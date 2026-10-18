import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import type { PlatformId } from '../types';
import { PLATFORMS_DATA } from '../data/platforms';
import { InstallationEngine } from '../components/installation/InstallationEngine';
import { Smartphone, Apple, Monitor, Laptop, Terminal, Download, ShieldAlert, HardDrive, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface InstallPageProps {
  platformId: PlatformId;
}

export const InstallPage: React.FC<InstallPageProps> = ({ platformId }) => {
  const { navigate } = useRouter();
  const platform = PLATFORMS_DATA[platformId] || PLATFORMS_DATA['android'];
  const [activeBrandIndex, setActiveBrandIndex] = useState<number | null>(0);

  const platformsList: Array<{ id: PlatformId; name: string; icon: React.ReactNode }> = [
    { id: 'android', name: 'Android', icon: <Smartphone size={16} /> },
    { id: 'ios', name: 'iPhone (iOS)', icon: <Apple size={16} /> },
    { id: 'windows', name: 'Windows', icon: <Monitor size={16} /> },
    { id: 'macos', name: 'macOS', icon: <Laptop size={16} /> },
    { id: 'linux', name: 'Linux', icon: <Terminal size={16} /> }
  ];

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 24px)', paddingBottom: 100, minHeight: '90vh' }}>
      <div className="container">
        {/* Platform Switching Header Capsule */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-muted)',
              overflowX: 'auto',
              maxWidth: '100%'
            }}
          >
            {platformsList.map((p) => {
              const isActive = p.id === platformId;
              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/install/${p.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? 'var(--accent-bright)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ color: isActive ? '#FFFFFF' : 'var(--accent-bright)' }}>{p.icon}</span>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Header for Selected Platform */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span className="badge badge-accent">MASTER INSTALLATION ATLAS</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
              VERSION 4.0.0
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 60px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 16
            }}
          >
            {platform.title}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 760, lineHeight: 1.6 }}>
            {platform.tagline} {platform.description}
          </p>

          {/* System Requirements Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginTop: 28,
              padding: '20px 24px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-muted)'
            }}
          >
            {platform.systemRequirements.map((req, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {req.label}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {req.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Interactive Guided Installation Engine */}
        <InstallationEngine platform={platform} />

        {/* Platform-Specific Sections */}

        {/* 1. Android Specific: Manufacturer Compatibility & Play Protect */}
        {platformId === 'android' && (
          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 36 }}>
            {/* Manufacturer Accordion */}
            <div className="surface-card" style={{ padding: 32 }}>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
                Manufacturer-Specific Sideloading Instructions
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                Android skins (Samsung One UI, Vivo Funtouch OS, Xiaomi HyperOS, OnePlus OxygenOS) employ custom permission dialogs:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {platform.brandNotes?.map((brand, idx) => {
                  const isOpen = activeBrandIndex === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-muted)',
                        backgroundColor: 'var(--bg-surface)',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        onClick={() => setActiveBrandIndex(isOpen ? null : idx)}
                        style={{
                          padding: '16px 20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          backgroundColor: isOpen ? 'var(--accent-subtle)' : 'transparent'
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15 }}>
                          {brand.brand}
                        </span>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>

                      {isOpen && (
                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-muted)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {brand.instructions.map((inst, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                              <CheckCircle2 size={14} style={{ color: 'var(--accent-bright)', marginTop: 2, flexShrink: 0 }} />
                              <span>{inst}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Play Protect & Update Safety */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              <div className="surface-card" style={{ padding: 28 }}>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldAlert size={18} style={{ color: 'var(--warning-color)' }} />
                  Bypassing Google Play Protect
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                  Because ChatXa 4.0 is distributed directly rather than published on Google Play Store, Play Protect may display "Blocked by Play Protect" or "Unrecognized app".
                </p>
                <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  1. Do NOT tap OK or Uninstall.<br />
                  2. Tap "More details" (small arrow).<br />
                  3. Tap "Install anyway".
                </div>
              </div>

              <div className="surface-card" style={{ padding: 28 }}>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HardDrive size={18} style={{ color: 'var(--accent-bright)' }} />
                  Updating Without Losing Data
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                  When future ChatXa releases are distributed, simply install the new APK directly over your existing installation.
                </p>
                <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  ✓ Preserves login sessions<br />
                  ✓ Preserves local chat history and cached media<br />
                  ✓ Seamless in-place binary upgrade
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. iOS Specific: Why Unsupported File Type Appears & Critical Settings */}
        {platformId === 'ios' && (
          <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 36 }}>
            {/* Visual breakdown of why WhatsApp shows unsupported file */}
            <div
              className="surface-card"
              style={{
                padding: 32,
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 320px) 1fr',
                gap: 36,
                alignItems: 'center'
              }}
            >
              <img
                src="/assets/screenshots/iphone-unsupported-file.png"
                alt="iPhone Unsupported File Type Alert"
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-muted)',
                  display: 'block'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span className="badge badge-accent">TECHNICAL EXPLANATION</span>
                <h3 className="font-display" style={{ fontSize: 26, fontWeight: 700 }}>
                  Why does iPhone display "Unsupported file type"?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                  When you receive <code>ChatXa-iOS-Release.ipa</code> via WhatsApp, Telegram, or Files and tap it directly, iOS treats the file as a raw zipped package rather than an executable app.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                  Apple iOS strictly prohibits direct execution of raw IPA binaries without a signed mobileprovision profile or an OTA installation manifest (.plist). To install, simply use <strong>Method 1 (InstallOnAir)</strong> or <strong>Method 3 (Sideloadly)</strong> detailed above.
                </p>
              </div>
            </div>

            {/* Critical iOS Steps: Certificate Trust & Developer Mode */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              <div className="surface-card" style={{ padding: 28 }}>
                <span className="badge badge-accent" style={{ marginBottom: 8 }}>CRITICAL STEP 1</span>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                  Trust the Developer Certificate
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                  Before opening ChatXa on your iPhone for the first time:
                </p>
                <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  1. Open iPhone Settings → General.<br />
                  2. Tap "VPN & Device Management".<br />
                  3. Tap your Apple ID email or profile.<br />
                  4. Tap "Trust" and confirm.
                </div>
              </div>

              <div className="surface-card" style={{ padding: 28 }}>
                <span className="badge badge-accent" style={{ marginBottom: 8 }}>CRITICAL STEP 2 (iOS 16, 17, 18+)</span>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                  Enable Developer Mode
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                  Apple requires Developer Mode to run sideloaded apps on iOS 16 and newer:
                </p>
                <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  1. Go to Settings → Privacy & Security.<br />
                  2. Scroll to bottom → Tap "Developer Mode".<br />
                  3. Toggle ON and tap "Restart".<br />
                  4. After reboot, unlock and tap "Turn On".
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Windows Specific: SmartScreen & VC++ */}
        {platformId === 'windows' && (
          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            <div className="surface-card" style={{ padding: 28 }}>
              <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                Bypassing Windows Defender SmartScreen
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                When running chatxa.exe for the first time, Windows Defender may display a blue dialog: "Windows protected your PC".
              </p>
              <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                1. Click the small text link: "More info".<br />
                2. Click the new button: "Run anyway".<br />
                3. ChatXa will launch immediately.
              </div>
            </div>

            <div className="surface-card" style={{ padding: 28 }}>
              <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                Microsoft Visual C++ Redistributable
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                If your PC reports missing MSVCP140.dll or VCRUNTIME140.dll:
              </p>
              <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                Download & install the official Microsoft x64 package:<br />
                https://aka.ms/vs/17/release/vc_redist.x64.exe
              </div>
            </div>
          </div>
        )}

        {/* 4. macOS Specific: Gatekeeper Quarantine Fix */}
        {platformId === 'macos' && (
          <div style={{ marginTop: 64 }}>
            <div className="surface-card" style={{ padding: 32 }}>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                macOS Gatekeeper & Quarantine Removal
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                If macOS reports "ChatXa.app is damaged and cannot be opened" or "Cannot be opened because Apple cannot check it for malicious software", clear the Gatekeeper quarantine flag with this command:
              </p>
              <pre className="code-block" style={{ marginBottom: 16 }}>
                sudo xattr -rd com.apple.quarantine /Applications/ChatXa.app
              </pre>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                Alternatively, hold down the Control key and click ChatXa.app in Applications → choose "Open" from the menu.
              </p>
            </div>
          </div>
        )}

        {/* Direct Link to Release and Troubleshooting */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid var(--border-muted)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={() => navigate('/download')} className="btn btn-primary">
              <Download size={16} />
              Download {platform.name} Artifacts
            </button>
            <button onClick={() => navigate('/troubleshooting')} className="btn btn-secondary">
              Solve {platform.name} Issues
            </button>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-outline btn-sm">
            Top of Guide ↑
          </button>
        </div>
      </div>
    </div>
  );
};
