import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faq';
import { useRouter } from '../context/RouterContext';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { navigate } = useRouter();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-sync': true,
    'faq-updates': true
  });

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 40px)', paddingBottom: 100, minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <span className="badge badge-accent" style={{ marginBottom: 12 }}>
            KNOWLEDGE BASE
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 700, marginBottom: 12 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>
            Everything you need to know about ChatXa 4.0 architecture, multi-device synchronization, and security.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {FAQ_DATA.map((item) => {
            const isOpen = Boolean(openIds[item.id]);

            return (
              <div
                key={item.id}
                className="surface-card"
                style={{
                  padding: 24,
                  border: isOpen ? '1px solid var(--border-highlight)' : '1px solid var(--border-muted)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div
                  onClick={() => toggleOpen(item.id)}
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
                      <HelpCircle size={16} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                        {item.tags.map((tag) => (
                          <span key={tag} className="badge" style={{ fontSize: 9, padding: '1px 5px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {isOpen && (
                  <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border-muted)', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Troubleshooting */}
        <div
          className="surface-card"
          style={{
            marginTop: 48,
            padding: 32,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 700 }}>
            Have a technical installation problem?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 500 }}>
            Our interactive problem solver diagnoses specific error messages for Android, iOS, Windows, Mac, and Linux.
          </p>
          <button onClick={() => navigate('/troubleshooting')} className="btn btn-primary">
            Open Interactive Problem Solver
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
