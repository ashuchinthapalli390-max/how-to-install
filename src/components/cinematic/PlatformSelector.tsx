import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import type { PlatformId } from '../../types';
import { PLATFORMS_DATA } from '../../data/platforms';
import { Smartphone, Apple, Monitor, Laptop, Terminal, ArrowRight } from 'lucide-react';

export const PlatformSelector: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('android');

  const currentPlatform = PLATFORMS_DATA[selectedPlatform];

  const platformsList: Array<{ id: PlatformId; name: string; icon: React.ReactNode }> = [
    { id: 'android', name: 'Android', icon: <Smartphone size={18} /> },
    { id: 'ios', name: 'iPhone (iOS)', icon: <Apple size={18} /> },
    { id: 'windows', name: 'Windows', icon: <Monitor size={18} /> },
    { id: 'macos', name: 'macOS', icon: <Laptop size={18} /> },
    { id: 'linux', name: 'Linux', icon: <Terminal size={18} /> }
  ];

  const getPlatformArtwork = (id: PlatformId) => {
    switch (id) {
      case 'android':
        return '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png';
      case 'ios':
        return '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_09 AM-2.png';
      case 'windows':
        return '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_16 AM-6.png';
      case 'macos':
        return '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_18 AM-7.png';
      case 'linux':
        return '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_19 AM-8.png';
      default:
        return '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png';
    }
  };

  return (
    <section id="platform-selector" style={{ position: 'relative', padding: '60px 0 100px', zIndex: 2 }}>
      <div className="container">
        {/* Floating Capsule Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px var(--accent-subtle)',
              maxWidth: '100%',
              overflowX: 'auto'
            }}
            className="capsule-bar"
          >
            {platformsList.map((p) => {
              const isActive = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 14,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? 'var(--accent-bright)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 4px 15px var(--accent-glow)' : 'none',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  <span style={{ color: isActive ? '#FFFFFF' : 'var(--accent-bright)' }}>{p.icon}</span>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Platform Showcase Chapter */}
        <div
          className="surface-card"
          style={{
            padding: '40px',
            border: '1px solid var(--border-highlight)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 48,
            alignItems: 'center'
          }}
        >
          {/* Left Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge badge-accent">
                {currentPlatform.label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                {currentPlatform.methods.length} Installation Methods Available
              </span>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                lineHeight: 1.15,
                fontWeight: 700
              }}
            >
              {currentPlatform.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7 }}>
              {currentPlatform.description}
            </p>

            {/* Methods Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                Supported Methods for {currentPlatform.name}:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {currentPlatform.methods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => navigate(`/install/${currentPlatform.id}?method=${method.id}`)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-bright)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-muted)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                        {method.name}
                      </span>
                      <ArrowRight size={13} style={{ color: 'var(--accent-text)' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                      ⏱ {method.estimatedTime} • {method.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to open full interactive guide */}
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <button
                onClick={() => navigate(`/install/${currentPlatform.id}`)}
                className="btn btn-primary"
              >
                Launch {currentPlatform.name} Master Guide
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/download')}
                className="btn btn-outline"
              >
                View Release Checksums
              </button>
            </div>
          </div>

          {/* Right Preview Card */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-muted)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'var(--bg-primary)'
            }}
          >
            <img
              src={getPlatformArtwork(selectedPlatform)}
              alt={`${currentPlatform.name} Experience`}
              style={{
                width: '100%',
                height: 380,
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(8, 9, 11, 0.95) 40%, transparent 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-text)' }}>
                  PACKAGE TARGET
                </span>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14, color: '#FFFFFF' }}>
                  {currentPlatform.releaseFileName || 'Release Bundle'}
                </div>
              </div>
              <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                {currentPlatform.releaseFileSize || 'VERIFIED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .surface-card {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};
