import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { PLATFORMS_DATA } from '../../data/platforms';
import { TROUBLESHOOTING_DATA } from '../../data/troubleshooting';
import { RELEASES_DATA } from '../../data/downloads';
import { Search, X, Smartphone, Apple, Monitor, Laptop, Terminal, AlertTriangle, Download, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  category: 'Platform' | 'Method' | 'Troubleshooting' | 'Release';
  title: string;
  subtitle: string;
  path: string;
  icon: React.ReactNode;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].path);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen) return null;

  // Build searchable index
  const allItems: SearchResult[] = [];

  // 1. Platforms
  Object.values(PLATFORMS_DATA).forEach((p) => {
    const icon = p.id === 'android' ? <Smartphone size={16} /> :
                 p.id === 'ios' ? <Apple size={16} /> :
                 p.id === 'windows' ? <Monitor size={16} /> :
                 p.id === 'macos' ? <Laptop size={16} /> : <Terminal size={16} />;

    allItems.push({
      id: `plat-${p.id}`,
      category: 'Platform',
      title: `${p.name} Installation Guide`,
      subtitle: p.tagline,
      path: `/install/${p.id}`,
      icon
    });

    // 2. Methods
    p.methods.forEach((m) => {
      allItems.push({
        id: `meth-${p.id}-${m.id}`,
        category: 'Method',
        title: `${p.name}: ${m.name}`,
        subtitle: m.subtitle,
        path: `/install/${p.id}?method=${m.id}`,
        icon
      });
    });
  });

  // 3. Troubleshooting
  TROUBLESHOOTING_DATA.forEach((t) => {
    allItems.push({
      id: `trouble-${t.id}`,
      category: 'Troubleshooting',
      title: t.title,
      subtitle: `${t.platform.toUpperCase()} — ${t.symptom}`,
      path: `/troubleshooting?id=${t.id}`,
      icon: <AlertTriangle size={16} />
    });
  });

  // 4. Releases
  RELEASES_DATA.forEach((r) => {
    allItems.push({
      id: `rel-${r.id}`,
      category: 'Release',
      title: `${r.fileName} (${r.platformName})`,
      subtitle: `${r.fileSize} • ${r.architecture} • ${r.version}`,
      path: '/download',
      icon: <Download size={16} />
    });
  });

  const q = query.toLowerCase().trim();
  const results = q
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
    : allItems.slice(0, 8); // show popular initial shortcuts

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px var(--accent-subtle)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-muted)',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <Search size={20} style={{ color: 'var(--accent-bright)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search all 5 platforms, methods, commands, issues..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)',
              fontSize: 16
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
          <span className="kbd">ESC</span>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: 420, overflowY: 'auto', padding: 8 }}>
          {results.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No installation guides or issues found matching "{query}"
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--accent-subtle)' : 'transparent',
                    border: isSelected ? '1px solid var(--border-highlight)' : '1px solid transparent',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        padding: 8,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface)',
                        color: isSelected ? 'var(--accent-bright)' : 'var(--text-secondary)'
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontWeight: 600,
                            fontSize: 14,
                            color: isSelected ? 'var(--accent-text)' : 'var(--text-primary)'
                          }}
                        >
                          {item.title}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 10,
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--text-muted)'
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  {isSelected && <ArrowRight size={16} style={{ color: 'var(--accent-bright)' }} />}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 20px',
            borderTop: '1px solid var(--border-muted)',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span>Use ↑ ↓ to navigate</span>
          <span>Press ENTER to view guide</span>
        </div>
      </div>
    </div>
  );
};
