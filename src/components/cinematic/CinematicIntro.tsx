import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface CinematicIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
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

const PLATFORMS_SEQUENCE = [
  { id: 'android', name: 'ANDROID', sub: 'APK / ADB' },
  { id: 'ios', name: 'iOS', sub: 'IPA / SIDELOAD' },
  { id: 'windows', name: 'WINDOWS', sub: 'STANDALONE x64' },
  { id: 'macos', name: 'macOS', sub: 'ARM64 & INTEL' },
  { id: 'linux', name: 'LINUX', sub: 'GTK3 / WAYDROID' }
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, forceShow = false }) => {
  // Scenes:
  // 0: Initial clean dark stage & logo mark reveal (0.0s - 0.5s)
  // 1: Brand wordmark & "04 / INSTALLATION ATLAS" (0.5s - 1.2s)
  // 2: Platform choreography (1.2s - 2.1s)
  // 3: Hero reveal & curtain wipe (2.1s - 3.1s)
  // 4: Settling & unmount (3.1s - 3.8s)
  // 5: Complete
  const [scene, setScene] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activePlatformIdx, setActivePlatformIdx] = useState(0);
  const [muted, setMuted] = useState(false);
  const soundPlayedRef = useRef(false);

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

  useEffect(() => {
    // Session check: only play once per browser session
    try {
      const alreadySeen = sessionStorage.getItem('chatxa_intro_seen_v4');
      if (alreadySeen && !forceShow) {
        onComplete?.();
        return;
      }
    } catch {
      // ignore
    }

    // Prefers reduced motion check
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

    // Timeline Choreography (Total duration ~ 3.6s)
    // 0.5s: Scene 1 - Wordmark & "04 / INSTALLATION ATLAS"
    const t1 = setTimeout(() => {
      setScene(1);
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        playIntroChime(muted);
      }
    }, 500);

    // 1.2s: Scene 2 - Platform choreography
    const t2 = setTimeout(() => {
      setScene(2);
    }, 1200);

    // Platform name cycling during Scene 2 (1.2s to 2.1s)
    const p1 = setTimeout(() => setActivePlatformIdx(1), 1400);
    const p2 = setTimeout(() => setActivePlatformIdx(2), 1600);
    const p3 = setTimeout(() => setActivePlatformIdx(3), 1800);
    const p4 = setTimeout(() => setActivePlatformIdx(4), 2000);

    // 2.1s: Scene 3 - Hero reveal transition
    const t3 = setTimeout(() => {
      setScene(3);
    }, 2100);

    // 3.1s: Scene 4 - Final settling
    const t4 = setTimeout(() => {
      setScene(4);
    }, 3100);

    // 3.7s: Scene 5 - Dismount & release page
    const t5 = setTimeout(() => {
      setScene(5);
      dismissIntro();
    }, 3700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [dismissIntro, forceShow, muted, onComplete]);

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
        opacity: scene >= 4 ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: scene >= 4 ? 'scale(1.02)' : 'scale(1)'
      }}
      aria-label="ChatXa 4.0 Brand Introduction"
    >
      {/* Top Header Controls: Audio Mute & Skip Button */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          left: '5%',
          right: '5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
            CHATXA 4.0 / LAUNCH SEQUENCE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setMuted((prev) => !prev)}
            className="icon-btn"
            style={{ fontSize: 11, gap: 6, padding: '6px 12px', minHeight: 32 }}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span style={{ fontSize: 10 }}>{muted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>

          <button
            onClick={dismissIntro}
            className="button secondary sm"
            style={{ minHeight: 34, padding: '7px 14px', fontSize: 11, gap: 8 }}
          >
            Skip Intro
            <span className="kbd" style={{ fontSize: 9 }}>ESC</span>
          </button>
        </div>
      </div>

      {/* Central Visual Choreography */}
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
        {/* Scene A: Brand Mark Reveal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
            opacity: scene >= 0 ? 1 : 0,
            transform: scene >= 0 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.92)',
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

        {/* Scene B: Identity Reveal & Tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            opacity: scene >= 1 ? 1 : 0,
            transform: scene >= 1 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div
            style={{
              width: 60,
              height: 1,
              backgroundColor: 'var(--accent)',
              marginBottom: 8,
              transform: scene >= 1 ? 'scaleX(1)' : 'scaleX(0)',
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

        {/* Scene C: Platform Choreography */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            marginTop: 40,
            flexWrap: 'wrap',
            opacity: scene >= 2 ? 1 : 0,
            transform: scene >= 2 ? 'translateY(0)' : 'translateY(18px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {PLATFORMS_SEQUENCE.map((plat, idx) => {
            const isActive = activePlatformIdx === idx;
            return (
              <div
                key={plat.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius)',
                  backgroundColor: isActive ? 'var(--raised)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--line)'}`,
                  transform: isActive ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--heading)',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: isActive ? 'var(--accent)' : 'var(--muted)'
                  }}
                >
                  {plat.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    color: 'var(--muted)',
                    marginTop: 3,
                    letterSpacing: '0.06em'
                  }}
                >
                  {plat.sub}
                </span>
              </div>
            );
          })}
        </div>

        {/* Scene D: Headline Preview Reveal */}
        <div
          style={{
            marginTop: 44,
            opacity: scene >= 3 ? 1 : 0,
            transform: scene >= 3 ? 'translateY(0)' : 'translateY(16px)',
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

      {/* Bottom Progress Bar & Indicator */}
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
              width: `${(scene / 4) * 100}%`,
              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>
        <span>VERSION 4.0.0</span>
      </div>
    </div>
  );
};
