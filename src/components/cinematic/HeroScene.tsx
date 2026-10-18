import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Download, Compass, Smartphone, Layers, CheckCircle2 } from 'lucide-react';

export const HeroScene: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '92vh',
        paddingTop: 'calc(var(--nav-height) + 40px)',
        paddingBottom: 60,
        display: 'flex',
        alignItems: 'center',
        zIndex: 1
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 1fr)',
            gap: 48,
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Hero Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Small uppercase label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge badge-accent">
                <Layers size={12} />
                CHATXA 4.0 / INSTALLATION ATLAS
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                PRODUCTION RELEASE
              </span>
            </div>

            {/* Display Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(46px, 6.2vw, 84px)',
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: '-0.03em'
              }}
            >
              <span style={{ color: 'var(--text-primary)', display: 'block' }}>One App.</span>
              <span
                style={{
                  color: 'var(--accent-text)',
                  display: 'block',
                  textShadow: '0 0 40px var(--accent-glow)'
                }}
              >
                Five Worlds.
              </span>
            </h1>

            {/* Subtitle & Supporting Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(18px, 2.2vw, 24px)',
                  fontWeight: 500,
                  color: 'var(--text-primary)'
                }}
              >
                Install ChatXa across all your devices.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: 540
                }}
              >
                Your conversations, your people, your world. Discover step-by-step installation guides for Android, iPhone, Windows, macOS and Linux.
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
              <button
                onClick={() => navigate('/download')}
                className="btn btn-primary btn-lg"
              >
                <Download size={18} />
                Get ChatXa 4.0
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('platform-selector');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/install/android');
                  }
                }}
                className="btn btn-secondary btn-lg"
              >
                <Compass size={18} />
                Explore Installation Guide
              </button>
            </div>

            {/* Subtle verification row */}
            <div
              style={{
                marginTop: 20,
                paddingTop: 24,
                borderTop: '1px solid var(--border-muted)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: 16
              }}
            >
              {[
                { label: 'Five Supported Platforms', desc: 'Android, iOS, PC, Mac, Linux' },
                { label: 'Step-by-Step Walkthroughs', desc: 'Tested on real hardware' },
                { label: 'Direct Release Downloads', desc: 'SHA-256 verified binaries' },
                { label: 'Interactive Problem Solver', desc: 'Instant issue resolution' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--accent-bright)' }} />
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Cinematic Device Composition */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Ambient Red Lighting Halo behind Device */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 70%)',
                filter: 'blur(35px)',
                zIndex: 0
              }}
            />

            {/* Central Cinematic Mockup Showcase */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: 480,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-highlight)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px var(--accent-subtle)',
                backgroundColor: 'var(--bg-surface)',
                transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg)',
                transition: 'transform 0.5s ease'
              }}
              className="hero-device-card"
            >
              {/* Device Header Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  backgroundColor: 'var(--bg-elevated)',
                  borderBottom: '1px solid var(--border-muted)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', marginLeft: 8 }}>
                    ChatXa 4.0 // Multi-Platform Preview
                  </span>
                </div>
                <span className="badge" style={{ fontSize: 10 }}>LIVE</span>
              </div>

              {/* Main Artwork Preview Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png"
                  alt="ChatXa running on devices against volcanic landscape"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />

                {/* Glassmorphic Overlay Pill at Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(8, 9, 11, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border-highlight)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}
                    >
                      <Smartphone size={18} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>
                        Android & iOS Native
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-text)' }}>
                        Realtime WebSockets + LiveKit Calls
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/install/android')}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '6px 12px', fontSize: 12 }}
                  >
                    Install Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-device-card {
            transform: none !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
