import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer
      className="footer"
      style={{
        borderTop: '1px solid var(--line)',
        backgroundColor: 'var(--bg)',
        padding: '80px 5% 30px',
        marginTop: 60,
        position: 'relative'
      }}
    >
      {/* Editorial Closing Statement Banner */}
      <div
        style={{
          borderBottom: '1px solid var(--line)',
          paddingBottom: 60,
          marginBottom: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 32
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            <span className="live-dot" />
            <span>THE UNIFIED COMMUNICATOR</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--heading)',
              fontSize: 'clamp(40px, 5.5vw, 76px)',
              lineHeight: 1.05,
              letterSpacing: '-0.06em',
              fontWeight: 650,
              margin: 0
            }}
          >
            EVERY SCREEN. <br />
            <em>EVERY CONVERSATION.</em>
          </h2>
        </div>

        <div style={{ maxWidth: 440 }}>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 24 }}>
            Experience seamless, real-time messaging, encrypted file exchange, and WebRTC low-latency calling natively configured on every device in your daily workflow.
          </p>
          <button
            onClick={() => navigate('/download')}
            className="button"
          >
            Download Verified Binaries
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* 4-Column Directory Layout */}
      <div
        className="footer-top"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
          gap: 40,
          marginBottom: 60
        }}
      >
        {/* Col 1: Brand & Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div className="logo-symbol" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span>ChatXa</span>
            <span className="logo-period">.</span>
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--muted)', maxWidth: 300, margin: 0 }}>
            Cinematic installation atlas for ChatXa 4.0. Precision technical step-by-step guidance for Android, iPhone, Windows, macOS, and Linux.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <span className="live-dot" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)' }}>
              All 5 Platforms Operational
            </span>
          </div>
        </div>

        {/* Col 2: Operating Systems */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="eyebrow" style={{ fontSize: 9 }}>OPERATING SYSTEMS</span>
          {[
            { name: 'Android APK / ADB', path: '/install/android' },
            { name: 'iPhone iOS Sideloadly', path: '/install/ios' },
            { name: 'Windows x64 Native', path: '/install/windows' },
            { name: 'macOS Apple Silicon', path: '/install/macos' },
            { name: 'Linux GTK & Waydroid', path: '/install/linux' }
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => { e.preventDefault(); navigate(item.path); }}
              style={{ fontSize: 13, color: 'var(--muted)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Col 3: Atlas Documentation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="eyebrow" style={{ fontSize: 9 }}>ATLAS RESOURCES</span>
          {[
            { name: 'Verified Releases', path: '/download' },
            { name: 'Troubleshooting Solver', path: '/troubleshooting' },
            { name: 'Frequently Asked Questions', path: '/faq' },
            { name: 'Play Protect Walkthrough', path: '/troubleshooting' },
            { name: 'Gatekeeper Quarantine', path: '/troubleshooting' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => { e.preventDefault(); navigate(item.path); }}
              style={{ fontSize: 13, color: 'var(--muted)', transition: 'color var(--transition-fast)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Col 4: Verification & Integrity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="eyebrow" style={{ fontSize: 9 }}>SECURITY & INTEGRITY</span>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            SHA-256 cryptographically verified builds with zero external telemetry and local data persistence.
          </div>
          <div style={{ marginTop: 8 }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                padding: '4px 8px',
                borderRadius: 4,
                backgroundColor: 'var(--raised)',
                border: '1px solid var(--line)',
                color: 'var(--accent)'
              }}
            >
              VERSION 4.0.0-RELEASE
            </span>
          </div>
        </div>
      </div>

      {/* Giant CreaXa Typography Wordmark */}
      <div
        className="footer-wordmark"
        style={{
          fontFamily: 'var(--heading)',
          fontSize: 'clamp(72px, 18vw, 260px)',
          letterSpacing: '-0.075em',
          fontWeight: 700,
          lineHeight: 0.95,
          padding: '24px 0 16px',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)',
          color: 'var(--text)',
          userSelect: 'none'
        }}
      >
        <span>CHATXA</span>
        <span style={{ color: 'var(--accent)', fontSize: '0.65em' }}>.</span>
      </div>

      {/* Footer Bottom Row */}
      <div
        className="footer-bottom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          color: 'var(--muted)',
          fontSize: 10,
          paddingTop: 24,
          fontFamily: 'var(--mono)',
          letterSpacing: '0.06em',
          flexWrap: 'wrap'
        }}
      >
        <span>© 2026 CHATXA 4.0 · CREAXA DESIGN SYSTEM MIGRATION</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>PRIVACY FIRST</span>
          <span>OFFLINE RUNTIME</span>
          <span>STANDALONE ARCHITECTURE</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr 1fr !important;
            gap: 30px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-top {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
