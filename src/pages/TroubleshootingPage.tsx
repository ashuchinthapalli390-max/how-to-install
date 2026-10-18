import React, { useState } from 'react';
import { TROUBLESHOOTING_DATA } from '../data/troubleshooting';
import { useRouter } from '../context/RouterContext';
import type { PlatformId } from '../types';
import { Wrench, Search, CheckCircle2, ArrowRight, Smartphone, Apple, Monitor, Laptop, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

export const TroubleshootingPage: React.FC = () => {
  const { navigate, searchParams } = useRouter();

  const initialOs = (searchParams.get('os') as PlatformId) || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [selectedOs, setSelectedOs] = useState<string>(initialOs);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [expandedId, setExpandedId] = useState<string | null>(searchParams.get('id') || null);

  const filteredIssues = TROUBLESHOOTING_DATA.filter((issue) => {
    const matchesOs = selectedOs === 'all' || issue.platform === selectedOs || issue.platform === 'all';
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      issue.title.toLowerCase().includes(q) ||
      issue.symptom.toLowerCase().includes(q) ||
      issue.rootCause.toLowerCase().includes(q);
    return matchesOs && matchesSearch;
  });

  const getPlatformIcon = (platform: PlatformId | 'all') => {
    switch (platform) {
      case 'android': return <Smartphone size={16} />;
      case 'ios': return <Apple size={16} />;
      case 'windows': return <Monitor size={16} />;
      case 'macos': return <Laptop size={16} />;
      case 'linux': return <Terminal size={16} />;
      default: return <Wrench size={16} />;
    }
  };

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 40px)', paddingBottom: 100, minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge badge-accent" style={{ marginBottom: 12 }}>
            INTERACTIVE ISSUE SOLVER
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 700, marginBottom: 12 }}>
            Something not working?
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Find your issue. Follow the fix. Diagnoses and resolutions verified against real Android, iOS, Windows, Mac, and Linux hardware.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: 680, margin: '0 auto 36px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 20px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-highlight)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px var(--accent-subtle)'
            }}
          >
            <Search size={20} style={{ color: 'var(--accent-bright)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by error message (e.g. 'Play Protect', 'Unsupported file', 'SmartScreen', 'Quarantine')..."
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                fontSize: 15
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Operating System Filter Tabs */}
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
              { id: 'all', name: 'All Issues' },
              { id: 'android', name: 'Android' },
              { id: 'ios', name: 'iPhone (iOS)' },
              { id: 'windows', name: 'Windows' },
              { id: 'macos', name: 'macOS' },
              { id: 'linux', name: 'Linux' }
            ].map((os) => {
              const isActive = selectedOs === os.id;
              return (
                <button
                  key={os.id}
                  onClick={() => setSelectedOs(os.id)}
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
                  {os.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Issues List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filteredIssues.length === 0 ? (
            <div className="surface-card" style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
              No issues found matching "{searchQuery}" under the selected operating system.
            </div>
          ) : (
            filteredIssues.map((issue) => {
              const isExpanded = expandedId === issue.id;

              return (
                <div
                  key={issue.id}
                  className="surface-card"
                  style={{
                    padding: 24,
                    border: isExpanded ? '1px solid var(--border-highlight)' : '1px solid var(--border-muted)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {/* Issue Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          backgroundColor: 'var(--accent-subtle)',
                          color: 'var(--accent-bright)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {getPlatformIcon(issue.platform)}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                          <span className="badge" style={{ fontSize: 10 }}>
                            {issue.platform.toUpperCase()}
                          </span>
                          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            {issue.category}
                          </span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
                          {issue.title}
                        </h3>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 12, color: 'var(--accent-text)', fontFamily: 'var(--font-mono)' }}>
                        {isExpanded ? 'Hide Solution' : 'View Fix'}
                      </span>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-muted)', display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {/* What it means */}
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                          1. WHAT THE ERROR MEANS & SYMPTOM:
                        </span>
                        <p style={{ color: 'var(--text-primary)', fontSize: 14, marginTop: 4 }}>
                          {issue.symptom}
                        </p>
                      </div>

                      {/* Likely Cause */}
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                          2. LIKELY CAUSE:
                        </span>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
                          {issue.rootCause}
                        </p>
                      </div>

                      {/* Verification */}
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                          3. HOW TO VERIFY:
                        </span>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
                          {issue.verification}
                        </p>
                      </div>

                      {/* Step-by-Step Resolution */}
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                          4. STEP-BY-STEP RESOLUTION:
                        </span>
                        <div
                          style={{
                            marginTop: 8,
                            padding: '16px 20px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border-muted)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10
                          }}
                        >
                          {issue.solutionSteps.map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-primary)' }}>
                              <CheckCircle2 size={15} style={{ color: 'var(--accent-bright)', marginTop: 2, flexShrink: 0 }} />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Return to guide button */}
                      {issue.platform !== 'all' && (
                        <div style={{ marginTop: 8 }}>
                          <button
                            onClick={() => navigate(`/install/${issue.platform}`)}
                            className="btn btn-secondary btn-sm"
                          >
                            Return to {issue.platform.toUpperCase()} Installation Guide
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
