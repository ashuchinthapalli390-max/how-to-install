import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { Smartphone, Apple, Monitor, Laptop, Terminal, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { theme } = useTheme();

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-muted)',
        marginTop: 100,
        padding: '80px 0 40px',
        position: 'relative'
      }}
      className="crimson-horizon"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 48,
            marginBottom: 60
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 22, color: 'var(--text-primary)' }}>
                Chat<span style={{ color: 'var(--accent-text)' }}>Xa</span>
              </span>
              <span className="badge badge-accent">v4.0.0</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}>
              Cinematic installation atlas for the next generation social and realtime communication experience.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--success-color)',
                  boxShadow: '0 0 8px var(--success-color)'
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
                All Release Artifacts Verified
              </span>
            </div>
          </div>

          {/* Platforms Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Operating Systems
            </h4>
            {[
              { name: 'Android Master Guide', path: '/install/android', icon: <Smartphone size={14} /> },
              { name: 'iPhone (iOS) Master Guide', path: '/install/ios', icon: <Apple size={14} /> },
              { name: 'Windows Desktop Guide', path: '/install/windows', icon: <Monitor size={14} /> },
              { name: 'macOS Workstation Guide', path: '/install/macos', icon: <Laptop size={14} /> },
              { name: 'Linux Terminal Guide', path: '/install/linux', icon: <Terminal size={14} /> }
            ].map((p) => (
              <span
                key={p.path}
                onClick={() => navigate(p.path)}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <span style={{ opacity: 0.7 }}>{p.icon}</span>
                {p.name}
              </span>
            ))}
          </div>

          {/* Documentation & Resources */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Atlas Resources
            </h4>
            {[
              { name: 'Verified Releases & Checksums', path: '/download' },
              { name: 'Interactive Issue Solver', path: '/troubleshooting' },
              { name: 'Frequently Asked Questions', path: '/faq' },
              { name: 'Android Play Protect Guide', path: '/troubleshooting?q=play+protect' },
              { name: 'iOS Developer Mode Setup', path: '/troubleshooting?q=developer+mode' },
              { name: 'macOS Gatekeeper Resolution', path: '/troubleshooting?q=quarantine' }
            ].map((r) => (
              <span
                key={r.name}
                onClick={() => navigate(r.path)}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {r.name}
              </span>
            ))}
          </div>

          {/* Technical Policy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Integrity & Trust
            </h4>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Shield size={16} style={{ color: 'var(--accent-bright)', marginTop: 2, flexShrink: 0 }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>
                No fake download counts or fabricated certificates. All commands, checksums, and package manifests reflect authentic build outputs.
              </p>
            </div>
            <div style={{ marginTop: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                Active Theme: {theme.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            borderTop: '1px solid var(--border-muted)',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
            © 2026 ChatXa 4.0 — Powered by CreaXa Cinematic Architecture. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            <span
              onClick={() => navigate('/download')}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-text)', cursor: 'pointer' }}
            >
              Direct Releases (.apk / .ipa / .zip)
            </span>
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Back to Top ↑
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
