import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { PLATFORMS_DATA } from '../../data/platforms';
import { TROUBLESHOOTING_DATA } from '../../data/troubleshooting';
import {
  Search,
  X,
  Smartphone,
  Apple,
  Monitor,
  Laptop,
  Terminal,
  Download,
  LifeBuoy,
  HelpCircle,
  Palette,
  ArrowRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: 'Commands' | 'Platforms' | 'Methods' | 'Troubleshooting' | 'Themes';
  title: string;
  subtitle: string;
  action: () => void;
  badge?: string;
  icon: React.ReactNode;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const { setTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Build commands pool
  const allCommands: CommandItem[] = [
    // Core Quick Actions
    {
      id: 'cmd-android',
      category: 'Commands',
      title: 'Install on Android',
      subtitle: 'Direct APK sideloading, USB ADB, and vendor guides',
      action: () => { navigate('/install/android'); onClose(); },
      badge: 'NAVIGATION',
      icon: <Smartphone size={16} />
    },
    {
      id: 'cmd-ios',
      category: 'Commands',
      title: 'Install on iPhone',
      subtitle: 'Sideloadly IPA signing, InstallOnAir, and TestFlight',
      action: () => { navigate('/install/ios'); onClose(); },
      badge: 'NAVIGATION',
      icon: <Apple size={16} />
    },
    {
      id: 'cmd-windows',
      category: 'Commands',
      title: 'Install on Windows',
      subtitle: 'Standalone 64-bit installer, SmartScreen bypass, and emulators',
      action: () => { navigate('/install/windows'); onClose(); },
      badge: 'NAVIGATION',
      icon: <Monitor size={16} />
    },
    {
      id: 'cmd-macos',
      category: 'Commands',
      title: 'Install on macOS',
      subtitle: 'Apple Silicon iOS IPA run and Gatekeeper quarantine removal',
      action: () => { navigate('/install/macos'); onClose(); },
      badge: 'NAVIGATION',
      icon: <Laptop size={16} />
    },
    {
      id: 'cmd-linux',
      category: 'Commands',
      title: 'Install on Linux',
      subtitle: 'GTK3 native binary, Waydroid container, and desktop launcher',
      action: () => { navigate('/install/linux'); onClose(); },
      badge: 'NAVIGATION',
      icon: <Terminal size={16} />
    },
    {
      id: 'cmd-download',
      category: 'Commands',
      title: 'Download ChatXa',
      subtitle: 'Access verified APK (549.7 MB) and IPA (47.8 MB) releases',
      action: () => { navigate('/download'); onClose(); },
      badge: 'RELEASE',
      icon: <Download size={16} />
    },
    {
      id: 'cmd-troubleshooting',
      category: 'Commands',
      title: 'View troubleshooting',
      subtitle: 'Inspect solutions for Play Protect, Gatekeeper, untrusted certs',
      action: () => { navigate('/troubleshooting'); onClose(); },
      badge: 'DIAGNOSTIC',
      icon: <LifeBuoy size={16} />
    },
    {
      id: 'cmd-search-doc',
      category: 'Commands',
      title: 'Search documentation',
      subtitle: 'Read comprehensive FAQ and architectural guides',
      action: () => { navigate('/faq'); onClose(); },
      badge: 'DOCS',
      icon: <HelpCircle size={16} />
    },

    // Theme Switchers
    {
      id: 'theme-original',
      category: 'Themes',
      title: 'Change theme: CreaXa Original',
      subtitle: 'Dark Olive Charcoal background with Lime accent (#c6ef6a)',
      action: () => { setTheme('original'); onClose(); },
      badge: 'THEME',
      icon: <Palette size={16} />
    },
    {
      id: 'theme-dark',
      category: 'Themes',
      title: 'Change theme: CreaXa Dark Editorial',
      subtitle: 'Obsidian Black surface with Cyber Lime accent (#dcff37)',
      action: () => { setTheme('dark'); onClose(); },
      badge: 'THEME',
      icon: <Palette size={16} />
    },
    {
      id: 'theme-light',
      category: 'Themes',
      title: 'Change theme: CreaXa Light Editorial',
      subtitle: 'Warm Sand Paper surface with Deep Forest Moss accent (#244132)',
      action: () => { setTheme('light'); onClose(); },
      badge: 'THEME',
      icon: <Palette size={16} />
    }
  ];

  // Specific installation methods
  Object.values(PLATFORMS_DATA).forEach((p) => {
    p.methods.forEach((m) => {
      allCommands.push({
        id: `meth-${p.id}-${m.id}`,
        category: 'Methods',
        title: `${p.name}: ${m.name}`,
        subtitle: m.subtitle,
        action: () => { navigate(`/install/${p.id}?method=${m.id}`); onClose(); },
        badge: p.name.toUpperCase(),
        icon: <ArrowRight size={15} />
      });
    });
  });

  // Troubleshooting items
  TROUBLESHOOTING_DATA.forEach((t) => {
    allCommands.push({
      id: `trouble-${t.id}`,
      category: 'Troubleshooting',
      title: t.title,
      subtitle: t.symptom,
      action: () => { navigate(`/troubleshooting#${t.id}`); onClose(); },
      badge: t.category.toUpperCase(),
      icon: <LifeBuoy size={15} />
    });
  });

  // Filter based on query
  const filtered = query.trim() === ''
    ? allCommands.slice(0, 11) // Default top commands & themes
    : allCommands.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.title.toLowerCase().includes(q) ||
          cmd.subtitle.toLowerCase().includes(q) ||
          cmd.category.toLowerCase().includes(q)
        );
      });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="command-dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="command-dialog-modal" role="dialog" aria-modal="true" aria-label="Command Palette">
        {/* Search Input Bar */}
        <div className="command-search-header">
          <Search size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search documentation..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="icon-btn"
              style={{ minHeight: 28, minWidth: 28 }}
            >
              <X size={14} />
            </button>
          ) : (
            <span className="kbd">ESC</span>
          )}
        </div>

        {/* Results List */}
        <div className="command-results-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No commands or guides found matching "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  className={`command-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="command-item-left">
                    <span style={{ color: isSelected ? 'var(--accent)' : 'var(--muted)' }}>
                      {item.icon}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, color: isSelected ? 'var(--accent)' : 'var(--text)' }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  {item.badge && (
                    <span className="command-item-badge">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Command Footer with Keyboard Navigation Hints */}
        <div className="command-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span><span className="kbd">↑</span> <span className="kbd">↓</span> navigate</span>
            <span><span className="kbd">↵</span> select</span>
            <span><span className="kbd">esc</span> close</span>
          </div>
          <span>ChatXa 4.0 Command System</span>
        </div>
      </div>
    </div>
  );
};
