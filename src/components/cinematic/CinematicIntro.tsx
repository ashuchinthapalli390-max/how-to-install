import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Smartphone,
  Apple,
  Monitor,
  Laptop,
  Terminal,
  Subtitles
} from 'lucide-react';

interface CinematicIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
  initialMode?: 'short' | 'expanded';
}

// Gentle Web Audio API synthesizer harmonic chime (CreaXa signature audio)
function playIntroChime(muted: boolean) {
  if (muted || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const t = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, t);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);
    masterGain.connect(ctx.destination);

    // Fundamental note: D5 (587.33 Hz)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, t);
    osc1.connect(masterGain);

    // Harmonic fifth: A5 (880 Hz)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, t);
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.03, t);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.9);
    osc2.stop(t + 0.7);
  } catch {
    // Autoplay restrictions or headless environments fail silently
  }
}

const EXPANDED_SCENES = [
  { id: 1, title: 'The Dark Canvas', duration: 800, caption: 'In 2026, real-time communication demands sovereign cross-platform precision.' },
  { id: 2, title: 'The ChatXa Symbol', duration: 1000, caption: 'ChatXa 4.0 emerges: three synchronized core telemetry engines.' },
  { id: 3, title: 'First Conversation', duration: 1200, caption: 'Demonstrating instant message dispatch with local cryptographic persistence.' },
  { id: 4, title: 'Five Platforms', duration: 1500, caption: 'One unified code base. Five independent hardware ecosystems.' },
  { id: 5, title: 'Android World', duration: 1500, caption: 'Android: High-speed APK sideloading and zero-configuration USB ADB transfer.' },
  { id: 6, title: 'Apple World', duration: 1500, caption: 'iPhone: Seamless Sideloadly free Apple ID signing and TestFlight distribution.' },
  { id: 7, title: 'Desktop World', duration: 1800, caption: 'Windows & macOS: Standalone 64-bit binaries and Apple Silicon native runtime.' },
  { id: 8, title: 'Linux World', duration: 1500, caption: 'Linux: GTK3 release builds and accelerated Waydroid LXC containers.' },
  { id: 9, title: 'One App. Five Worlds.', duration: 1500, caption: 'Five devices synchronized into a single unified communication layer.' },
  { id: 10, title: 'Enter The Atlas', duration: 1200, caption: 'Welcome to the ChatXa 4.0 Installation Experience.' }
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  forceShow = false,
  initialMode = 'short'
}) => {
  const [mode, setMode] = useState<'short' | 'expanded'>(initialMode);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);

  // Short mode scene index (0-4)
  const [shortScene, setShortScene] = useState(0);

  // Expanded mode scene index (1-10)
  const [expandedScene, setExpandedScene] = useState(1);

  const soundPlayedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissIntro = useCallback(() => {
    try {
      sessionStorage.setItem('chatxa_intro_seen_v4', '1');
    } catch {
      // ignore
    }
    setIsVisible(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    onComplete?.();
  }, [onComplete]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismissIntro]);

  // Listen to custom event to launch expanded mode anytime
  useEffect(() => {
    const handleLaunchExpanded = () => {
      setMode('expanded');
      setExpandedScene(1);
      setIsPaused(false);
      setIsVisible(true);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
      playIntroChime(muted);
    };

    window.addEventListener('chatxa_launch_expanded_intro', handleLaunchExpanded);
    return () => window.removeEventListener('chatxa_launch_expanded_intro', handleLaunchExpanded);
  }, [muted]);

  // Initialize short intro for first-time session visitors
  useEffect(() => {
    try {
      const alreadySeen = sessionStorage.getItem('chatxa_intro_seen_v4');
      if (alreadySeen && !forceShow && initialMode !== 'expanded') {
        onComplete?.();
        return;
      }
    } catch {
      // ignore
    }

    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        dismissIntro();
        return;
      }
    }

    setIsVisible(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    if (initialMode === 'short') {
      // Short automatic intro sequence (~3.6s)
      const t1 = setTimeout(() => {
        setShortScene(1);
        if (!soundPlayedRef.current) {
          soundPlayedRef.current = true;
          playIntroChime(muted);
        }
      }, 500);
      const t2 = setTimeout(() => setShortScene(2), 1200);
      const t3 = setTimeout(() => setShortScene(3), 2100);
      const t4 = setTimeout(() => setShortScene(4), 3100);
      const t5 = setTimeout(() => {
        dismissIntro();
      }, 3700);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [dismissIntro, forceShow, initialMode, muted, onComplete]);

  // Expanded mode timeline driver
  useEffect(() => {
    if (!isVisible || mode !== 'expanded' || isPaused) return;

    const currentSceneDef = EXPANDED_SCENES[expandedScene - 1];
    if (!currentSceneDef) return;

    timerRef.current = setTimeout(() => {
      if (expandedScene < EXPANDED_SCENES.length) {
        setExpandedScene((prev) => prev + 1);
      } else {
        dismissIntro();
      }
    }, currentSceneDef.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissIntro, expandedScene, isPaused, isVisible, mode]);

  if (!isVisible) return null;

  return (
    <div
      className="cinematic-intro-stage"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: (mode === 'short' && shortScene >= 4) ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: (mode === 'short' && shortScene >= 4) ? 'scale(1.02)' : 'scale(1)'
      }}
      aria-label="ChatXa 4.0 Cinematic Experience"
    >
      {/* Top Header Controls: Mode Indicator, Audio Mute, Captions, & Skip Button */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          left: '5%',
          right: '5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="live-dot" />
          <span
            style={{
              fontFamily: 'var(--heading)',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)'
            }}
          >
            {mode === 'expanded' ? `CINEMATIC EXPERIENCE · SCENE 0${expandedScene}/10` : 'CHATXA 4.0 / LAUNCH SEQUENCE'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Captions Toggle (for Expanded Mode) */}
          {mode === 'expanded' && (
            <button
              onClick={() => setShowCaptions((prev) => !prev)}
              className="icon-btn"
              style={{
                fontSize: 10,
                gap: 6,
                padding: '6px 12px',
                minHeight: 32,
                color: showCaptions ? 'var(--accent)' : 'var(--muted)'
              }}
              title="Toggle Captions"
            >
              <Subtitles size={14} />
              <span>{showCaptions ? 'CC ON' : 'CC OFF'}</span>
            </button>
          )}

          {/* Audio Chime Toggle */}
          <button
            onClick={() => setMuted((prev) => !prev)}
            className="icon-btn"
            style={{ fontSize: 10, gap: 6, padding: '6px 12px', minHeight: 32 }}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{muted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>

          {/* Skip Intro Button */}
          <button
            onClick={dismissIntro}
            className="button secondary sm"
            style={{ minHeight: 32, padding: '6px 14px', fontSize: 11, gap: 8 }}
          >
            Skip Intro
            <span className="kbd" style={{ fontSize: 9 }}>ESC</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MODE A: SHORT AUTOMATIC INTRO (3.5s - 4.5s)
          ========================================================================= */}
      {mode === 'short' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: 720,
            padding: '0 24px',
            position: 'relative'
          }}
        >
          {/* Brand Mark Reveal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 28,
              opacity: shortScene >= 0 ? 1 : 0,
              transform: shortScene >= 0 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.92)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="logo-symbol" style={{ width: 32, height: 36 }}>
              <span style={{ width: 7, height: 28, left: 2 }} />
              <span style={{ width: 7, height: 28, left: 12 }} />
              <span style={{ width: 7, height: 28, left: 22 }} />
            </div>
            <span
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 34,
                fontWeight: 800,
                letterSpacing: '-1.5px',
                color: 'var(--text)'
              }}
            >
              ChatXa<span className="logo-period" style={{ fontSize: 14 }}>.</span>
            </span>
          </div>

          {/* Identity & Tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              opacity: shortScene >= 1 ? 1 : 0,
              transform: shortScene >= 1 ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div
              style={{
                width: 60,
                height: 1,
                backgroundColor: 'var(--accent)',
                marginBottom: 8,
                transform: shortScene >= 1 ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 11,
                fontWeight: 650,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--accent)'
              }}
            >
              04 / INSTALLATION ATLAS
            </span>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 14,
                color: 'var(--muted)',
                margin: '6px 0 0',
                letterSpacing: '0.02em'
              }}
            >
              Five operating systems. One unified communication core.
            </p>
          </div>

          {/* Platform Choreography */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              marginTop: 36,
              flexWrap: 'wrap',
              opacity: shortScene >= 2 ? 1 : 0,
              transform: shortScene >= 2 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {['ANDROID', 'iOS', 'WINDOWS', 'macOS', 'LINUX'].map((plat, idx) => (
              <div
                key={plat}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius)',
                  backgroundColor: shortScene === 2 && idx === 0 ? 'var(--raised)' : 'transparent',
                  border: `1px solid ${shortScene === 2 && idx === 0 ? 'var(--accent)' : 'var(--line)'}`,
                  fontFamily: 'var(--heading)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: shortScene === 2 && idx === 0 ? 'var(--accent)' : 'var(--muted)'
                }}
              >
                {plat}
              </div>
            ))}
          </div>

          {/* Headline Preview */}
          <div
            style={{
              marginTop: 40,
              opacity: shortScene >= 3 ? 1 : 0,
              transform: shortScene >= 3 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--text)'
              }}
            >
              ONE APP. <em>FIVE WORLDS.</em>
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE B: EXPANDED 10-SCENE CINEMATIC INTRO (14s - 16s)
          ========================================================================= */}
      {mode === 'expanded' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: 880,
            padding: '0 24px',
            position: 'relative'
          }}
        >
          {/* Scene 1 & 2: The Dark Canvas & Assembling Brand Mark */}
          {expandedScene <= 2 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="logo-symbol" style={{ width: 48, height: 54 }}>
                <span style={{ width: 10, height: 42, left: 2, transform: 'rotate(35deg)' }} />
                <span style={{ width: 10, height: 42, left: 18, transform: 'rotate(-35deg)' }} />
                <span style={{ width: 10, height: 42, left: 34, transform: 'rotate(35deg)' }} />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--heading)',
                  fontSize: 42,
                  fontWeight: 800,
                  letterSpacing: '-2px',
                  margin: 0
                }}
              >
                ChatXa<span className="logo-period" style={{ fontSize: 16 }}>.</span>
              </h2>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)'
                }}
              >
                VERSION 4.0.0 · CINEMATIC ATLAS
              </span>
            </div>
          )}

          {/* Scene 3: The First Conversation Demo Screen */}
          {expandedScene === 3 && (
            <div
              className="surface-card"
              style={{
                width: 340,
                padding: '24px 20px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--line)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                boxShadow: 'var(--shadow)',
                animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="live-dot" />
                  <span style={{ fontFamily: 'var(--heading)', fontSize: 12, fontWeight: 700 }}>ChatXa Core</span>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)' }}>E2EE ACTIVE</span>
              </div>

              {/* Chat bubbles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
                <div style={{ alignSelf: 'flex-start', padding: '8px 12px', borderRadius: 8, backgroundColor: 'var(--raised)', fontSize: 12 }}>
                  Hey! Are you there?
                  <span style={{ display: 'block', fontSize: 8, color: 'var(--muted)', marginTop: 2 }}>10:42 AM</span>
                </div>
                <div style={{ alignSelf: 'flex-end', padding: '8px 12px', borderRadius: 8, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', fontSize: 12, fontWeight: 500 }}>
                  Always connected.
                  <span style={{ display: 'block', fontSize: 8, color: 'var(--on-accent)', opacity: 0.7, marginTop: 2 }}>10:42 AM · Read ✓✓</span>
                </div>
                <div style={{ alignSelf: 'flex-start', padding: '8px 12px', borderRadius: 8, backgroundColor: 'var(--raised)', fontSize: 12 }}>
                  Welcome to ChatXa 4.0 across all 5 worlds.
                </div>
              </div>
            </div>
          )}

          {/* Scene 4: The Five Platforms Editorial Sequence */}
          {expandedScene === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, animation: 'fadeInUp 0.5s ease' }}>
              <span className="eyebrow">UNIFIED CORE · FIVE PLATFORMS</span>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { name: 'ANDROID', icon: <Smartphone size={16} />, detail: 'Direct APK / ADB' },
                  { name: 'iOS', icon: <Apple size={16} />, detail: 'IPA / Sideloadly' },
                  { name: 'WINDOWS', icon: <Monitor size={16} />, detail: 'x64 Standalone' },
                  { name: 'macOS', icon: <Laptop size={16} />, detail: 'Apple Silicon Cocoa' },
                  { name: 'LINUX', icon: <Terminal size={16} />, detail: 'GTK3 / Waydroid' }
                ].map((item) => (
                  <div
                    key={item.name}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius)',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--line)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      minWidth: 140
                    }}
                  >
                    <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                    <span style={{ fontFamily: 'var(--heading)', fontSize: 14, fontWeight: 700 }}>{item.name}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)' }}>{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scene 5: Android World Walkthrough */}
          {expandedScene === 5 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, animation: 'fadeInUp 0.5s ease', textAlign: 'left' }}>
              <div style={{ width: 280, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)', backgroundColor: 'var(--surface)' }}>
                <img src="/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png" alt="Android World" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
                <div style={{ padding: 16 }}>
                  <div style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 14 }}>Android APK Pipeline</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>1-Tap package sideload & USB ADB streaming</div>
                </div>
              </div>
              <div style={{ maxWidth: 360 }}>
                <span className="badge badge-accent" style={{ marginBottom: 12 }}>SCENE 05 / ANDROID</span>
                <h3 style={{ fontFamily: 'var(--heading)', fontSize: 28, fontWeight: 700, margin: '8px 0 12px' }}>
                  Open APK. Allow Source. Done.
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
                  Android users bypass store approval bottlenecks. Direct offline runtime bundles include the entire WebRTC calling stack.
                </p>
              </div>
            </div>
          )}

          {/* Scene 6: Apple World Walkthrough */}
          {expandedScene === 6 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, animation: 'fadeInUp 0.5s ease', textAlign: 'left' }}>
              <div style={{ width: 280, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)', backgroundColor: 'var(--surface)' }}>
                <img src="/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_09 AM-2.png" alt="iOS World" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
                <div style={{ padding: 16 }}>
                  <div style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 14 }}>Apple iPhone Ecosystem</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Sideloadly free Apple ID & TestFlight Beta</div>
                </div>
              </div>
              <div style={{ maxWidth: 360 }}>
                <span className="badge badge-accent" style={{ marginBottom: 12 }}>SCENE 06 / IPHONE</span>
                <h3 style={{ fontFamily: 'var(--heading)', fontSize: 28, fontWeight: 700, margin: '8px 0 12px' }}>
                  Precision IPA Sideloading.
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
                  Detailed step-by-step guidance for trusting developer profiles in iOS Settings and enabling Developer Mode on iOS 16–18+.
                </p>
              </div>
            </div>
          )}

          {/* Scene 7: Desktop World Walkthrough */}
          {expandedScene === 7 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, animation: 'fadeInUp 0.5s ease', textAlign: 'left' }}>
              <div style={{ width: 320, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)', backgroundColor: 'var(--surface)' }}>
                <img src="/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_16 AM-6.png" alt="Windows Desktop" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
                <div style={{ padding: 16 }}>
                  <div style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 14 }}>Windows & macOS Native</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>High-framerate x64 binary & Apple Silicon M-series</div>
                </div>
              </div>
              <div style={{ maxWidth: 360 }}>
                <span className="badge badge-accent" style={{ marginBottom: 12 }}>SCENE 07 / DESKTOP</span>
                <h3 style={{ fontFamily: 'var(--heading)', fontSize: 28, fontWeight: 700, margin: '8px 0 12px' }}>
                  Native Workstation Muscle.
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
                  Standalone executables with zero browser overhead, native notifications, and Gatekeeper quarantine clearing.
                </p>
              </div>
            </div>
          )}

          {/* Scene 8: Linux Terminal Build */}
          {expandedScene === 8 && (
            <div style={{ width: '100%', maxWidth: 580, animation: 'fadeInUp 0.5s ease' }}>
              <div className="code-block" style={{ textAlign: 'left', padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, borderBottom: '1px solid var(--line)', paddingBottom: 10 }}>
                  <Terminal size={14} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>bash — chatxa-workstation:~/build</span>
                </div>
                <div style={{ color: 'var(--accent)', marginBottom: 8 }}>
                  $ flutter build linux --release
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 11, lineHeight: 1.6 }}>
                  Building Linux desktop application...<br />
                  ✓ Compiled GTK3 host runtime [x86_64]<br />
                  ✓ Linked libayatana-appindicator3.so<br />
                  ✓ Created binary: build/linux/x64/release/bundle/chatxa<br />
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>[SUCCESS] Application ready for launcher creation.</span>
                </div>
              </div>
            </div>
          )}

          {/* Scene 9 & 10: One App, Five Worlds Final Reveal */}
          {expandedScene >= 9 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, animation: 'fadeInUp 0.6s ease' }}>
              <span className="eyebrow">
                <span className="live-dot" />
                THE INSTALLATION EXPERIENCE
              </span>
              <h1
                style={{
                  fontFamily: 'var(--heading)',
                  fontSize: 'clamp(44px, 6vw, 76px)',
                  fontWeight: 700,
                  letterSpacing: '-0.06em',
                  lineHeight: 1.05,
                  margin: 0
                }}
              >
                ONE APP. <br />
                <em>FIVE WORLDS.</em>
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 520, margin: '8px 0 0' }}>
                Your conversations, your people, your world. Entering the interactive installation studio.
              </p>
            </div>
          )}

          {/* Live Captions Display Bar */}
          {showCaptions && (
            <div
              style={{
                marginTop: 40,
                padding: '10px 24px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'color-mix(in srgb, var(--surface), transparent 10%)',
                border: '1px solid var(--line)',
                fontSize: 12,
                color: 'var(--text)',
                maxWidth: 620,
                backdropFilter: 'blur(8px)',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              {EXPANDED_SCENES[expandedScene - 1]?.caption}
            </div>
          )}
        </div>
      )}

      {/* Expanded Mode Playback Controls & Scene Timeline Scrubber */}
      {mode === 'expanded' && (
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '5%',
            right: '5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
            zIndex: 20
          }}
        >
          {/* Play / Pause / Replay Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="icon-btn"
              style={{ minHeight: 32, minWidth: 32 }}
              title={isPaused ? 'Resume Playback' : 'Pause'}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>

            <button
              onClick={() => {
                setExpandedScene(1);
                setIsPaused(false);
              }}
              className="icon-btn"
              style={{ minHeight: 32, minWidth: 32 }}
              title="Restart Intro"
            >
              <RotateCcw size={13} />
            </button>

            <span>SCENE {expandedScene} OF 10</span>
          </div>

          {/* Timeline Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {EXPANDED_SCENES.map((s) => (
              <button
                key={s.id}
                onClick={() => setExpandedScene(s.id)}
                style={{
                  width: expandedScene === s.id ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: expandedScene === s.id ? 'var(--accent)' : 'var(--line)',
                  border: 0,
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                title={s.title}
              />
            ))}
          </div>

          <div>
            <span>FULL EXPERIENCE MODE</span>
          </div>
        </div>
      )}

      {/* Short Mode Bottom Progress Bar */}
      {mode === 'short' && (
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '5%',
            right: '5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 10,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)'
          }}
        >
          <span>INITIALIZING INTERACTION ENGINE</span>
          <div
            style={{
              width: 140,
              height: 2,
              backgroundColor: 'var(--line)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: 'var(--accent)',
                width: `${(shortScene / 4) * 100}%`,
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>
          <span>VERSION 4.0.0</span>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
