import React, { useState } from 'react';
import { RELEASES_DATA, OFFICIAL_GUIDES_DATA } from '../data/downloads';
import { useRouter } from '../context/RouterContext';
import type { PlatformId } from '../types';
import {
  Download,
  Copy,
  Check,
  ArrowRight,
  Smartphone,
  Apple,
  Monitor,
  Laptop,
  Terminal,
  FileText,
  Package
} from 'lucide-react';

export const DownloadPage: React.FC = () => {
  const { navigate } = useRouter();
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filteredReleases = filterPlatform === 'all'
    ? RELEASES_DATA
    : RELEASES_DATA.filter((r) => r.platform === filterPlatform || (filterPlatform === 'all' && r.platform === 'all'));

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedHash(sha);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getPlatformIcon = (platform: PlatformId | 'all') => {
    switch (platform) {
      case 'android': return <Smartphone size={18} />;
      case 'ios': return <Apple size={18} />;
      case 'windows': return <Monitor size={18} />;
      case 'macos': return <Laptop size={18} />;
      case 'linux': return <Terminal size={18} />;
      default: return <Package size={18} />;
    }
  };

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 40px)', paddingBottom: 100, minHeight: '90vh' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 12 }}>
            <span className="live-dot" />
            <span>VERIFIED APP STORE RELEASES & BINARIES</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--heading)',
              fontSize: 'clamp(36px, 4.8vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 1.1,
              marginBottom: 16
            }}
          >
            Download ChatXa 4.0 <br />
            <em>Authentic Distribution Engine</em>
          </h1>

          <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 680, margin: '0 auto', lineHeight: 1.7 }}>
            Direct release binaries synchronized directly from the local App Store repository. Every package has verified cryptographic SHA-256 signatures and high-speed HTTP downloads.
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              gap: 8,
              padding: '6px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line)',
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
                  className="button secondary sm"
                  style={{
                    minHeight: 32,
                    padding: '6px 16px',
                    fontSize: 12,
                    fontWeight: 650,
                    borderColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    backgroundColor: isActive ? 'var(--raised)' : 'transparent'
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
                border: '1px solid var(--line)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 32,
                alignItems: 'center'
              }}
            >
              {/* Left Column: Artifact Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'var(--raised)',
                      border: '1px solid var(--line)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getPlatformIcon(release.platform)}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--heading)', fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                      {release.fileName}
                    </h3>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)' }}>
                      {release.platformName} · {release.architecture}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--raised)',
                    border: '1px solid var(--line)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>FILE SIZE</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{release.fileSize}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>VERSION</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{release.version}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>MINIMUM OS</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{release.minOs}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>STATUS</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
                      {release.status === 'verified' ? 'Verified Official' : 'Build Target'}
                    </div>
                  </div>
                </div>

                {/* Release Notes */}
                <div>
                  <span style={{ fontFamily: 'var(--heading)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                    Package Notes & Capabilities:
                  </span>
                  <ul style={{ paddingLeft: 18, color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
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
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--raised)',
                    border: '1px solid var(--line)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>
                      SHA-256 VERIFIED CHECKSUM
                    </span>
                    <button
                      onClick={() => handleCopySha(release.sha256)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: copiedHash === release.sha256 ? 'var(--accent)' : 'var(--muted)',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontFamily: 'var(--mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      {copiedHash === release.sha256 ? <Check size={12} /> : <Copy size={12} />}
                      {copiedHash === release.sha256 ? 'Copied' : 'Copy Hash'}
                    </button>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                    {release.sha256}
                  </div>
                </div>

                {/* Local verified repository path */}
                {release.directFilePath && (
                  <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--raised)', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                    📂 Master Source: <span style={{ color: 'var(--text)' }}>{release.directFilePath}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {release.downloadUrl ? (
                    <a
                      href={release.downloadUrl}
                      download={release.fileName}
                      className="button"
                      style={{ width: '100%', textDecoration: 'none', justifyContent: 'center' }}
                    >
                      <Download size={16} />
                      <span>Download {release.fileName} ({release.fileSize})</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => navigate(`/install/${release.platform}`)}
                      className="button"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <Download size={16} />
                      <span>View Build Instructions</span>
                    </button>
                  )}

                  <button
                    onClick={() => navigate(release.platform === 'all' ? '/install/android' : `/install/${release.platform}`)}
                    className="button secondary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>View {release.platformName} Walkthrough Guide</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section: Official Platform Installation Text Guides */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>OFFICIAL DOCUMENTATION FILES</div>
              <h3 style={{ fontFamily: 'var(--heading)', fontSize: 24, fontWeight: 700, margin: 0 }}>
                Platform Installation Manuals (.txt)
              </h3>
            </div>
            <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              From App Store Directory
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16
            }}
          >
            {OFFICIAL_GUIDES_DATA.map((guide) => (
              <div
                key={guide.id}
                className="surface-card"
                style={{
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <FileText size={16} style={{ color: 'var(--accent)' }} />
                    <span className="badge" style={{ fontSize: 9 }}>{guide.platform}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>
                      {guide.fileSize}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--heading)', fontSize: 15, fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text)' }}>
                    {guide.title}
                  </h4>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                    {guide.description}
                  </p>
                </div>

                <a
                  href={guide.downloadUrl}
                  download={guide.fileName}
                  className="button secondary sm"
                  style={{ textDecoration: 'none', justifyContent: 'center', width: '100%', gap: 6 }}
                >
                  <Download size={12} />
                  <span>Download {guide.fileName}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
