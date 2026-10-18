import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import type { PlatformId } from '../../types';
import { PLATFORMS_DATA } from '../../data/platforms';
import {
  Smartphone,
  Apple,
  Monitor,
  Laptop,
  Terminal,
  ArrowRight,
  Download,
  ShieldCheck
} from 'lucide-react';

export const PlatformSelector: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('android');

  const currentPlatform = PLATFORMS_DATA[selectedPlatform];

  const platformsList: Array<{ id: PlatformId; name: string; tag: string; icon: React.ReactNode }> = [
    { id: 'android', name: 'Android', tag: 'APK / ADB', icon: <Smartphone size={16} /> },
    { id: 'ios', name: 'iPhone / iOS', tag: 'IPA / Sideload', icon: <Apple size={16} /> },
    { id: 'windows', name: 'Windows', tag: 'Native x64', icon: <Monitor size={16} /> },
    { id: 'macos', name: 'macOS', tag: 'Cocoa / ARM', icon: <Laptop size={16} /> },
    { id: 'linux', name: 'Linux', tag: 'GTK3 / Waydroid', icon: <Terminal size={16} /> }
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
    <section id="platforms" className="section" style={{ position: 'relative' }}>
      {/* Section Eyebrow & Numbered Editorial Header */}
      <div className="section-heading" style={{ marginBottom: 40 }}>
        <div>
          <div className="eyebrow">
            <span className="live-dot" />
            <span>01 / CHOOSE YOUR PLATFORM</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--heading)',
              fontSize: 'clamp(36px, 4.4vw, 64px)',
              lineHeight: 1.08,
              letterSpacing: '-0.05em'
            }}
          >
            FIVE DEVICES. <br />
            <em>ONE EXPERIENCE.</em>
          </h2>
        </div>
        <p
          className="large-copy"
          style={{ maxWidth: 480, margin: 0, fontSize: 15, color: 'var(--muted)' }}
        >
          Explore dedicated installation journeys tailored to each ecosystem. Every platform features verified packages, direct sideloading methods, and step-by-step guidance.
        </p>
      </div>

      {/* Platform Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          borderBottom: '1px solid var(--line)',
          paddingBottom: 20,
          marginBottom: 44,
          overflowX: 'auto'
        }}
      >
        {platformsList.map((p) => {
          const isActive = selectedPlatform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 20px',
                borderRadius: 'var(--radius)',
                backgroundColor: isActive ? 'var(--surface)' : 'transparent',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--line)'}`,
                color: isActive ? 'var(--text)' : 'var(--muted)',
                fontFamily: 'var(--heading)',
                fontSize: 13,
                fontWeight: 650,
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span style={{ color: isActive ? 'var(--accent)' : 'inherit' }}>
                {p.icon}
              </span>
              <span>{p.name}</span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 9,
                  padding: '2px 6px',
                  borderRadius: 3,
                  backgroundColor: isActive ? 'color-mix(in srgb, var(--accent), transparent 85%)' : 'var(--raised)',
                  color: isActive ? 'var(--accent)' : 'var(--muted)'
                }}
              >
                {p.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Platform Curated Editorial Showcase */}
      <div
        className="surface-card"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.15fr',
          gap: 50,
          alignItems: 'center',
          padding: '44px 40px',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)'
        }}
      >
        {/* Left: Device Visual Showcase */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--line)',
              aspectRatio: '16/11',
              backgroundColor: 'var(--raised)',
              position: 'relative'
            }}
          >
            <img
              src={getPlatformArtwork(currentPlatform.id)}
              alt={`${currentPlatform.name} Installation Showcase`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Platform Tag Badge Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                padding: '6px 12px',
                borderRadius: 4,
                backgroundColor: 'var(--accent)',
                color: 'var(--on-accent)',
                fontFamily: 'var(--heading)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.08em'
              }}
            >
              {currentPlatform.name.toUpperCase()} CORE
            </div>

            {/* Release Status Overlay */}
            {currentPlatform.releaseFileName && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                  right: 14,
                  padding: '10px 14px',
                  borderRadius: 4,
                  backgroundColor: 'color-mix(in srgb, var(--surface), transparent 10%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  fontFamily: 'var(--mono)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                  <span>{currentPlatform.releaseFileName}</span>
                </div>
                <span style={{ color: 'var(--accent)' }}>{currentPlatform.releaseFileSize}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Platform Details & Installation Methods */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              <span>{currentPlatform.label}</span>
              <span>•</span>
              <span style={{ color: 'var(--accent)' }}>
                {currentPlatform.methods.length} INSTALLATION PATHS
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 'clamp(28px, 3.2vw, 40px)',
                fontWeight: 650,
                letterSpacing: '-0.04em',
                marginBottom: 14
              }}
            >
              {currentPlatform.title}
            </h3>

            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
              {currentPlatform.description}
            </p>
          </div>

          {/* Installation Methods List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)'
              }}
            >
              AVAILABLE INSTALLATION METHODS:
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
              {currentPlatform.methods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => navigate(`/install/${currentPlatform.id}?method=${method.id}`)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--raised)',
                    border: '1px solid var(--line)',
                    cursor: 'pointer',
                    transition: 'border-color var(--transition-fast), transform var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--heading)', fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
                      {method.name}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontFamily: 'var(--mono)',
                        padding: '1px 5px',
                        borderRadius: 3,
                        backgroundColor: 'var(--surface)',
                        color: method.difficulty === 'Beginner' ? 'var(--accent)' : 'var(--muted)'
                      }}
                    >
                      {method.difficulty}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>
                    {method.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Requirements Preview */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'color-mix(in srgb, var(--surface), var(--bg) 50%)',
              border: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              fontSize: 11
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>SUPPORTED OS</span>
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>
                {currentPlatform.systemRequirements[0]?.value || 'Latest verified'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>ARCHITECTURE</span>
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>
                {currentPlatform.systemRequirements[1]?.value || '64-bit'}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
            <button
              onClick={() => navigate(`/install/${currentPlatform.id}`)}
              className="button"
            >
              Open {currentPlatform.name} Guide
              <ArrowRight size={15} />
            </button>

            {currentPlatform.releaseFileName && (
              <button
                onClick={() => navigate('/download')}
                className="button secondary"
              >
                Download Package
                <Download size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #platforms .surface-card {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};
