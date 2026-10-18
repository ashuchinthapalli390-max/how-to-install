import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from '../../context/RouterContext';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface DeviceShowcase {
  id: string;
  name: string;
  osBadge: string;
  type: 'mobile' | 'desktop' | 'terminal';
  headline: string;
  summary: string;
  image: string;
  methodHighlight: string;
  status: string;
  route: string;
}

const HERO_DEVICES: DeviceShowcase[] = [
  {
    id: 'android',
    name: 'Android Phone',
    osBadge: 'ANDROID 10+',
    type: 'mobile',
    headline: 'ChatXa Mobile APK',
    summary: 'Direct APK sideloading & USB ADB high-speed packet transfer.',
    image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png',
    methodHighlight: 'APK · 549.7 MB · Direct Sideload',
    status: 'Verified Release',
    route: '/install/android'
  },
  {
    id: 'ios',
    name: 'Apple iPhone',
    osBadge: 'iOS 15.0 - 18.x',
    type: 'mobile',
    headline: 'ChatXa iOS Experience',
    summary: 'Sideloadly IPA signing, InstallOnAir OTA link, or TestFlight beta.',
    image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_09 AM-2.png',
    methodHighlight: 'IPA · 47.8 MB · Sideloadly / TestFlight',
    status: 'Ready for Signing',
    route: '/install/ios'
  },
  {
    id: 'windows',
    name: 'Windows Workstation',
    osBadge: 'WIN 10 / 11 64-BIT',
    type: 'desktop',
    headline: 'ChatXa Desktop x64',
    summary: 'Native standalone binary with high-framerate rendering and SmartScreen guide.',
    image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_16 AM-6.png',
    methodHighlight: 'Native x64 / Emulator / WSA Legacy',
    status: 'Standalone Executable',
    route: '/install/windows'
  },
  {
    id: 'macos',
    name: 'Apple Mac',
    osBadge: 'macOS 12+ (ARM & INTEL)',
    type: 'desktop',
    headline: 'ChatXa macOS Cocoa',
    summary: 'Apple Silicon direct iOS IPA execution & native Gatekeeper quarantine handling.',
    image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_18 AM-7.png',
    methodHighlight: 'Apple Silicon M1-M4 / Native Cocoa',
    status: 'Universal Architecture',
    route: '/install/macos'
  },
  {
    id: 'linux',
    name: 'Linux Terminal',
    osBadge: 'UBUNTU / FEDORA / ARCH',
    type: 'terminal',
    headline: 'ChatXa GTK3 & Waydroid',
    summary: 'Direct native GTK compilation and LXC Waydroid container acceleration.',
    image: '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_19 AM-8.png',
    methodHighlight: 'GTK3 / Waydroid / .desktop Generator',
    status: 'Kernel 5.15+ Verified',
    route: '/install/linux'
  }
];

// Interactive marquee of operating system capabilities
const MARQUEE_ITEMS = [
  'Android Direct APK Sideload',
  'iOS Sideloadly Signing',
  'Windows x64 Native Desktop',
  'macOS Apple Silicon Compatibility',
  'Linux GTK3 Terminal Engine',
  'SHA-256 Checksum Verification',
  'Waydroid LXC Container',
  'SmartScreen Authorization Walkthrough'
];

export const HeroScene: React.FC = () => {
  const { navigate } = useRouter();
  const [activeDeviceIdx, setActiveDeviceIdx] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeDevice = HERO_DEVICES[activeDeviceIdx];

  // Subtle spring-damped mouse parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMouseOffset({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section
      ref={containerRef}
      className="hero"
      style={{
        padding: '36px 5% 0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Editorial Row */}
      <div
        className="hero-top"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--line)',
          paddingBottom: 20
        }}
      >
        <div className="eyebrow" style={{ margin: 0 }}>
          <span className="live-dot" />
          <span>CHATXA 4.0 / THE INSTALLATION EXPERIENCE</span>
        </div>
        <div
          className="hero-note"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            textTransform: 'uppercase'
          }}
        >
          CROSS-PLATFORM DEPLOYMENT MATRIX · 2026 VERIFIED
        </div>
      </div>

      {/* Hero 2-Column Grid */}
      <div
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 60,
          alignItems: 'center',
          minHeight: '620px',
          padding: '48px 0 40px'
        }}
      >
        {/* Left Column: Asymmetric Editorial Display Typography */}
        <div className="hero-copy" style={{ position: 'relative', zIndex: 2 }}>
          <h1
            style={{
              fontFamily: 'var(--heading)',
              fontSize: 'clamp(54px, 6.4vw, 98px)',
              lineHeight: 1.02,
              letterSpacing: '-0.075em',
              fontWeight: 650,
              marginBottom: 24,
              color: 'var(--text)'
            }}
          >
            <span style={{ display: 'block' }}>ONE APP.</span>
            <span style={{ display: 'block' }}>
              <em>FIVE WORLDS.</em>
            </span>
          </h1>

          {/* Secondary Heading & Description */}
          <h2
            style={{
              fontFamily: 'var(--heading)',
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: 16
            }}
          >
            Your conversations. Every device.
          </h2>

          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 15,
              lineHeight: 1.85,
              maxWidth: 520,
              color: 'var(--muted)',
              marginBottom: 36
            }}
          >
            Install ChatXa on Android, iPhone, Windows, macOS and Linux with interactive, step-by-step guidance.
          </p>

          {/* Dual CTAs */}
          <div
            className="hero-ctas"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              flexWrap: 'wrap'
            }}
          >
            <a
              href="#platforms"
              className="button"
              style={{
                gap: 16,
                padding: '16px 26px',
                fontSize: 13,
                fontWeight: 650
              }}
            >
              Find your installation
              <ArrowRight size={16} />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('platforms');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="button secondary"
              style={{
                gap: 12,
                padding: '16px 24px',
                fontSize: 13
              }}
            >
              Explore all platforms
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Technical Verification Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid var(--line)',
              fontSize: 11,
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
              <span>OFFICIAL 4.0 BUILDS</span>
            </div>
            <div>•</div>
            <div>ANDROID APK (549.7 MB)</div>
            <div>•</div>
            <div>iOS IPA (47.8 MB)</div>
          </div>
        </div>

        {/* Right Column: Layered Editorial Visual Showcase */}
        <div
          className="hero-media-container"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 0)`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Main Visual Display Card */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--line)',
              backgroundColor: 'var(--surface)',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)'
            }}
          >
            {/* Top Toolbar of Device Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid var(--line)',
                backgroundColor: 'color-mix(in srgb, var(--surface), var(--bg) 40%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="live-dot" />
                <span
                  style={{
                    fontFamily: 'var(--heading)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {activeDevice.name}
                </span>
                <span className="badge" style={{ fontSize: 9 }}>
                  {activeDevice.osBadge}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  color: 'var(--accent)'
                }}
              >
                {activeDevice.status}
              </span>
            </div>

            {/* Device Media Preview */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/10',
                backgroundColor: 'var(--raised)',
                overflow: 'hidden'
              }}
            >
              <img
                src={activeDevice.image}
                alt={`${activeDevice.name} installation preview`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.04) brightness(0.96)',
                  transition: 'opacity 0.3s ease, transform 0.4s ease'
                }}
              />

              {/* Overlay Glass Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'color-mix(in srgb, var(--surface), transparent 15%)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--heading)',
                      fontSize: 13,
                      fontWeight: 650,
                      color: 'var(--text)'
                    }}
                  >
                    {activeDevice.headline}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      color: 'var(--muted)',
                      marginTop: 2
                    }}
                  >
                    {activeDevice.methodHighlight}
                  </div>
                </div>

                <button
                  onClick={() => navigate(activeDevice.route)}
                  className="button sm"
                  style={{ minHeight: 34, padding: '6px 14px', fontSize: 11, gap: 8 }}
                >
                  Guide
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Platform Switcher Tab Strip below showcase */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 8
            }}
          >
            {HERO_DEVICES.map((dev, idx) => {
              const isSelected = activeDeviceIdx === idx;
              return (
                <button
                  key={dev.id}
                  onClick={() => setActiveDeviceIdx(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 6px',
                    borderRadius: 'var(--radius)',
                    backgroundColor: isSelected ? 'var(--raised)' : 'var(--surface)',
                    border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}`,
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--heading)',
                      fontSize: 11,
                      fontWeight: 700,
                      color: isSelected ? 'var(--accent)' : 'var(--text)',
                      lineHeight: 1.2
                    }}
                  >
                    {dev.name.split(' ')[0]}
                  </span>
                  <span
                    style={{
                      fontSize: 8,
                      fontFamily: 'var(--mono)',
                      color: 'var(--muted)',
                      marginTop: 2
                    }}
                  >
                    {dev.id.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Strip (CreaXa Signature Discipline Strip) */}
      <div
        className="discipline-strip"
        style={{
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          padding: '18px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
        aria-label="Platform Highlights"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            animation: 'marqueeScroll 32s linear infinite'
          }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 11,
                fontFamily: 'var(--heading)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)'
              }}
            >
              <span style={{ color: 'var(--accent)', fontSize: 16, lineHeight: 1 }}>◆</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};
