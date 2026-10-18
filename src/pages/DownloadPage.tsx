import React, { useState } from 'react';
import { RELEASES_DATA } from '../data/downloads';
import { useRouter } from '../context/RouterContext';
import type { PlatformId } from '../types';
import { Download, Copy, Check, ShieldCheck, ArrowRight, Smartphone, Apple, Monitor, Laptop, Terminal } from 'lucide-react';

export const DownloadPage: React.FC = () => {
  const { navigate } = useRouter();
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filteredReleases = filterPlatform === 'all'
    ? RELEASES_DATA
    : RELEASES_DATA.filter((r) => r.platform === filterPlatform);

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedHash(sha);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getPlatformIcon = (platform: PlatformId) => {
    switch (platform) {
      case 'android': return <Smartphone size={18} />;
      case 'ios': return <Apple size={18} />;
      case 'windows': return <Monitor size={18} />;
      case 'macos': return <Laptop size={18} />;
      case 'linux': return <Terminal size={18} />;
    }
  };

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 40px)', paddingBottom: 100, minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="badge badge-accent">
              <ShieldCheck size={14} />
              VERIFIED RELEASE ARTIFACTS
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
              BUILD 4.0.0 (OFFICIAL)
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 4.8vw, 64px)', fontWeight: 700, marginBottom: 16 }}>
            Download ChatXa 4.0
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
            Direct release binaries, verified SHA-256 signatures, and offline engine packages. Every build is cryptographically signed and ready for immediate deployment.
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-flex',
              gap: 8,
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-muted)',
              overflowX: 'auto',
              maxWidth: '100%'
            }}
          >
            {[
              { id: 'all', name: 'All Ecosystems' },
              { id: 'android', name: 'Android' },
              { id: 'ios', name: 'iPhone (iOS)' },
              { id: 'windows', name: 'Windows' },
              { id: 'macos', name: 'macOS' },
              { id: 'linux', name: 'Linux' }
            ].map((f) => {
              const isActive = filterPlatform === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilterPlatform(f.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    fontWeight: 600,
                    backgroundColor: isActive ? 'var(--accent-bright)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Releases Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {filteredReleases.map((release) => (
            <div
              key={release.id}
              className="surface-card"
              style={{
                padding: 32,
                border: '1px solid var(--border-highlight)',
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 1.8fr) minmax(280px, 1.2fr)',
                gap: 32,
                alignItems: 'center'
              }}
            >
              {/* Left Column: Artifact Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent-bright)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getPlatformIcon(release.platform)}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
                      {release.fileName}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-text)' }}>
                      {release.platformName} • {release.architecture}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-muted)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>FILE SIZE</span>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{release.fileSize}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>VERSION</span>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{release.version}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>MINIMUM OS</span>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{release.minOs}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>RELEASE DATE</span>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{release.releaseDate}</div>
                  </div>
                </div>

                {/* Release Notes */}
                <div>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    Package Notes & Inclusions:
                  </span>
                  <ul style={{ paddingLeft: 18, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
                    {release.releaseNotes.map((note, idx) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Checksum & Action Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* SHA-256 Box */}
                <div
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-muted)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                      SHA-256 CHECKSUM
                    </span>
                    <button
                      onClick={() => handleCopySha(release.sha256)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: copiedHash === release.sha256 ? 'var(--success-color)' : 'var(--accent-text)',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      {copiedHash === release.sha256 ? <Check size={12} /> : <Copy size={12} />}
                      {copiedHash === release.sha256 ? 'Copied' : 'Copy Hash'}
                    </button>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#A6ACCD', wordBreak: 'break-all', lineHeight: 1.4 }}>
                    {release.sha256}
                  </div>
                </div>

                {/* Local verified repository path */}
                {release.directFilePath && (
                  <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    📂 Build Location: <span style={{ color: 'var(--text-secondary)' }}>{release.directFilePath}</span>
                  </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {release.downloadUrl ? (
                    <a
                      href={release.downloadUrl}
                      download={release.fileName}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', textDecoration: 'none' }}
                    >
                      <Download size={18} />
                      Download {release.fileName}
                    </a>
                  ) : (
                    <button
                      onClick={() => navigate(`/install/${release.platform}`)}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%' }}
                    >
                      <Download size={18} />
                      View Build Instructions
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/install/${release.platform}`)}
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                  >
                    View {release.platformName} Step-by-Step Guide
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
