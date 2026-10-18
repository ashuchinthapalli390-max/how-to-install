import React, { useState } from 'react';
import { TROUBLESHOOTING_DATA } from '../data/troubleshooting';
import { useRouter } from '../context/RouterContext';
import type { PlatformId } from '../types';
import { DecisionTreeSolver } from '../components/troubleshooting/DecisionTreeSolver';
import {
  Wrench,
  Search,
  CheckCircle2,
  Smartphone,
  Apple,
  Monitor,
  Laptop,
  Terminal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const TroubleshootingPage: React.FC = () => {
  const { searchParams } = useRouter();

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
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 12 }}>
            <span className="live-dot" />
            <span>INTERACTIVE ISSUE SOLVER & DIAGNOSTICS</span>
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
            Something not working? <br />
            <em>Follow verified resolutions.</em>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
            Interactive decision tree and comprehensive error catalog verified against real Android, iOS, Windows, Mac, and Linux hardware.
          </p>
        </div>

        {/* Feature 1: Interactive Diagnostic Decision Tree */}
        <DecisionTreeSolver />

        {/* Feature 2: Searchable Issue Catalog */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>ERROR CATALOG</div>
              <h3 style={{ fontFamily: 'var(--heading)', fontSize: 24, fontWeight: 700, margin: 0 }}>
                Common Installation Blockers
              </h3>
            </div>

            {/* Platform filter tabs */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', maxWidth: '100%' }}>
              {[
                { id: 'all', name: 'All' },
                { id: 'android', name: 'Android' },
                { id: 'ios', name: 'iOS' },
                { id: 'windows', name: 'Windows' },
                { id: 'macos', name: 'macOS' },
                { id: 'linux', name: 'Linux' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedOs(tab.id)}
                  className="button secondary sm"
                  style={{
                    minHeight: 32,
                    padding: '6px 14px',
                    fontSize: 11,
                    borderColor: selectedOs === tab.id ? 'var(--accent)' : 'var(--line)',
                    color: selectedOs === tab.id ? 'var(--accent)' : 'var(--muted)'
                  }}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 18px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line)'
            }}
          >
            <Search size={18} style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by error string (e.g. 'Play Protect', 'Unsupported file type', 'SmartScreen', 'Quarantine', 'GTK')..."
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text)',
                fontSize: 14
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-link" style={{ fontSize: 11, border: 0 }}>
                Clear
              </button>
            )}
          </div>

          {/* Issues Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredIssues.map((issue) => {
              const isExpanded = expandedId === issue.id;

              return (
                <div
                  key={issue.id}
                  id={issue.id}
                  className="surface-card"
                  style={{
                    padding: 22,
                    border: `1px solid ${isExpanded ? 'var(--accent)' : 'var(--line)'}`,
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      gap: 16
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ color: 'var(--accent)' }}>{getPlatformIcon(issue.platform)}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span className="badge" style={{ fontSize: 9 }}>{issue.category}</span>
                          <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase' }}>
                            {issue.platform.toUpperCase()}
                          </span>
                        </div>
                        <h4 style={{ fontFamily: 'var(--heading)', fontSize: 16, fontWeight: 700, margin: 0 }}>
                          {issue.title}
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      style={{
                        marginTop: 20,
                        paddingTop: 18,
                        borderTop: '1px solid var(--line)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16
                      }}
                    >
                      <div>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#f59e0b', textTransform: 'uppercase' }}>
                          OBSERVED SYMPTOM:
                        </span>
                        <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 2 }}>{issue.symptom}</div>
                      </div>

                      <div>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>
                          ROOT CAUSE:
                        </span>
                        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginTop: 2 }}>{issue.rootCause}</div>
                      </div>

                      <div>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase' }}>
                          RESOLUTION CHECKLIST:
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                          {issue.solutionSteps.map((step, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text)' }}>
                              <CheckCircle2 size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
