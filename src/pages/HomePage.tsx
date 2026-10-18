import React from 'react';
import { HeroScene } from '../components/cinematic/HeroScene';
import { PlanetEnvironment } from '../components/cinematic/PlanetEnvironment';
import { PlatformSelector } from '../components/cinematic/PlatformSelector';
import { useRouter } from '../context/RouterContext';
import { Download, ArrowRight, Smartphone, Apple, Monitor, Laptop, Terminal, Wrench, CheckCircle2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Celestial & Planetary Environment */}
      <PlanetEnvironment />

      {/* Main Hero Scene */}
      <HeroScene />

      {/* Phase 06: Floating Platform Selector & Active Device Showcase */}
      <PlatformSelector />

      {/* Phase 07: Choose Your World Chapter Sections */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge badge-accent" style={{ marginBottom: 12 }}>
              CINEMATIC ARCHITECTURE
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 4.2vw, 54px)',
                lineHeight: 1.15,
                fontWeight: 700,
                marginBottom: 16
              }}
            >
              Choose Your World.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
              Different devices. One ChatXa experience. Explore dedicated installation journeys tailored to each ecosystem.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24
            }}
          >
            {[
              {
                id: 'android',
                title: 'Android Experience',
                tagline: '1-Tap APK sideloading & USB ADB',
                image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png',
                features: ['Direct WhatsApp / Drive download', 'USB ADB streaming', 'Brand-specific guides (Vivo, Samsung, Xiaomi)'],
                icon: <Smartphone size={20} />
              },
              {
                id: 'ios',
                title: 'iPhone (iOS) Experience',
                tagline: 'Sideloadly, InstallOnAir & TestFlight',
                image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_09 AM-2.png',
                features: ['Unsupported file type explained', 'Free Apple ID signing via Sideloadly', 'Developer Mode & Certificate trust'],
                icon: <Apple size={20} />
              },
              {
                id: 'windows',
                title: 'Windows Desktop Experience',
                tagline: 'High-framerate 64-bit native app',
                image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_16 AM-6.png',
                features: ['Standalone executable package', 'SmartScreen approval walkthrough', 'BlueStacks / LDPlayer emulator paths'],
                icon: <Monitor size={20} />
              },
              {
                id: 'macos',
                title: 'macOS Workstation Experience',
                tagline: 'Native Cocoa & Apple Silicon ARM64',
                image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_18 AM-7.png',
                features: ['M1-M4 Apple Silicon direct iOS IPA run', 'Gatekeeper quarantine clearing', 'FaceTime HD & native gestures'],
                icon: <Laptop size={20} />
              },
              {
                id: 'linux',
                title: 'Linux Workstation Experience',
                tagline: 'GTK3 native binary & Waydroid container',
                image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_19 AM-8.png',
                features: ['Interactive terminal simulation', 'Waydroid LXC container integration', 'Interactive .desktop file generator'],
                icon: <Terminal size={20} />
              }
            ].map((chapter) => (
              <div
                key={chapter.id}
                className="surface-card surface-card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 24,
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/install/${chapter.id}`)}
              >
                <div>
                  <div
                    style={{
                      height: 200,
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      marginBottom: 20,
                      position: 'relative'
                    }}
                  >
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-highlight)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-bright)'
                      }}
                    >
                      {chapter.icon}
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                    {chapter.title}
                  </h3>
                  <p style={{ color: 'var(--accent-text)', fontSize: 13, fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
                    {chapter.tagline}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    {chapter.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--accent-bright)', flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 16,
                    borderTop: '1px solid var(--border-muted)'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    View {chapter.title}
                  </span>
                  <ArrowRight size={16} style={{ color: 'var(--accent-bright)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Releases Banner */}
      <section style={{ padding: '60px 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div
            className="surface-card"
            style={{
              padding: '48px',
              border: '1px solid var(--border-highlight)',
              background: 'linear-gradient(135deg, rgba(25, 27, 32, 0.95) 0%, rgba(16, 17, 20, 0.98) 100%)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 32
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <span className="badge badge-accent" style={{ marginBottom: 12 }}>
                VERIFIED RELEASE HUB
              </span>
              <h3 className="font-display" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 700, marginBottom: 12 }}>
                Official Production Binaries.
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
                Download ChatXa 4.0 production packages with SHA-256 checksums, architecture tags, and complete offline WebRTC calling runtimes.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <button onClick={() => navigate('/download')} className="btn btn-primary btn-lg">
                <Download size={18} />
                Explore All Releases
              </button>
              <button onClick={() => navigate('/troubleshooting')} className="btn btn-secondary btn-lg">
                <Wrench size={18} />
                Troubleshooting Solver
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
