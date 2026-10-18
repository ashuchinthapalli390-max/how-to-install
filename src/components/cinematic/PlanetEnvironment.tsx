import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const PlanetEnvironment: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        minHeight: 880,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* Layer 1: Cosmic Starfield / Space Dust */}
      <div
        className="cosmic-dust"
        style={{
          position: 'absolute',
          inset: 0
        }}
      />

      {/* Layer 2: Gigantic Crimson Eclipse / Celestial Sphere */}
      <div
        className="animate-pulse-glow"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: 'clamp(380px, 50vw, 750px)',
          height: 'clamp(380px, 50vw, 750px)',
          borderRadius: '50%',
          background: 'var(--planet-glow)',
          filter: 'blur(10px)',
          opacity: theme === 'ivory' ? 0.35 : 0.85,
          transition: 'all 0.8s ease'
        }}
      />

      {/* Sharp Eclipse Corona Ring */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '8%',
          width: 'clamp(340px, 45vw, 680px)',
          height: 'clamp(340px, 45vw, 680px)',
          borderRadius: '50%',
          border: theme === 'crimson'
            ? '2px solid rgba(220, 24, 44, 0.45)'
            : theme === 'obsidian'
            ? '2px solid rgba(212, 216, 226, 0.4)'
            : '2px solid rgba(150, 21, 38, 0.25)',
          boxShadow: theme === 'crimson'
            ? '0 0 50px rgba(220, 24, 44, 0.5), inset 0 0 30px rgba(220, 24, 44, 0.3)'
            : theme === 'obsidian'
            ? '0 0 50px rgba(212, 216, 226, 0.4), inset 0 0 30px rgba(212, 216, 226, 0.2)'
            : '0 0 30px rgba(150, 21, 38, 0.2)',
          transition: 'all 0.8s ease'
        }}
      />

      {/* Layer 3: Glowing Crimson Horizon Lines */}
      <div
        style={{
          position: 'absolute',
          top: '65%',
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--horizon-line)',
          opacity: 0.7
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '78%',
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--horizon-line)',
          opacity: 0.35
        }}
      />

      {/* Layer 4: Volcanic Rock Silhouette Bottom Gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '280px',
          background: `linear-gradient(to top, var(--bg-primary) 30%, transparent 100%)`
        }}
      />
    </div>
  );
};
