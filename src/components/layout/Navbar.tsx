import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Search,
  Download,
  Menu,
  X,
  Palette,
  Check,
  ChevronDown,
  ArrowRight,
  Smartphone,
  Apple,
  Monitor,
  Laptop,
  Terminal
} from 'lucide-react';
import type { ThemeMode } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { path, navigate } = useRouter();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePopoverOpen, setThemePopoverOpen] = useState(false);
  const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setThemePopoverOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPlatformsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (targetPath: string) => {
    navigate(targetPath);
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Discover', path: '/' },
    { label: 'Platforms', path: '#platforms', isDropdown: true },
    { label: 'Install', path: '/install/android' },
    { label: 'Troubleshooting', path: '/troubleshooting' },
    { label: 'FAQ', path: '/faq' }
  ];

  const platformItems = [
    { id: 'android', name: 'Android', path: '/install/android', icon: <Smartphone size={15} /> },
    { id: 'ios', name: 'iPhone / iOS', path: '/install/ios', icon: <Apple size={15} /> },
    { id: 'windows', name: 'Windows', path: '/install/windows', icon: <Monitor size={15} /> },
    { id: 'macos', name: 'macOS', path: '/install/macos', icon: <Laptop size={15} /> },
    { id: 'linux', name: 'Linux', path: '/install/linux', icon: <Terminal size={15} /> }
  ];

  const themesList: Array<{ id: ThemeMode; label: string; swatchClass: string; desc: string }> = [
    {
      id: 'original',
      label: 'CreaXa Original',
      swatchClass: 'swatch-original',
      desc: 'Dark Olive Charcoal & Lime Accent'
    },
    {
      id: 'dark',
      label: 'CreaXa Dark Editorial',
      swatchClass: 'swatch-dark',
      desc: 'Obsidian Black & Cyber Lime'
    },
    {
      id: 'light',
      label: 'CreaXa Light Editorial',
      swatchClass: 'swatch-light',
      desc: 'Warm Sand Paper & Deep Forest Moss'
    }
  ];

  return (
    <>
      <header className="header">
        {/* Left Side: Brand Wordmark with 3 Slanted Accent Bars */}
        <div
          onClick={() => handleNav('/')}
          className="logo"
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <div className="logo-symbol" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span>ChatXa</span>
          <span className="logo-period">.</span>
        </div>

        {/* Center: Editorial Navigation Links */}
        <nav className="nav" aria-label="Main Navigation">
          {navLinks.map((item) => {
            if (item.isDropdown) {
              return (
                <div key={item.label} ref={dropdownRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setPlatformsDropdownOpen((prev) => !prev)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 500,
                      color: path.startsWith('/install') ? 'var(--text)' : 'var(--muted)',
                      padding: '8px 0'
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={13} style={{ transform: platformsDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  {platformsDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 42,
                        left: 0,
                        width: 220,
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)',
                        padding: 8,
                        zIndex: 100
                      }}
                    >
                      <div className="eyebrow" style={{ padding: '8px 12px 4px', fontSize: 8 }}>
                        SELECT PLATFORM
                      </div>
                      {platformItems.map((plat) => (
                        <button
                          key={plat.id}
                          onClick={() => handleNav(plat.path)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            textAlign: 'left',
                            fontSize: 12,
                            color: path === plat.path ? 'var(--accent)' : 'var(--text)',
                            backgroundColor: path === plat.path ? 'var(--raised)' : 'transparent',
                            transition: 'background var(--transition-fast)'
                          }}
                        >
                          <span style={{ color: 'var(--accent)' }}>{plat.icon}</span>
                          <span>{plat.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = path === item.path || (item.path !== '/' && path.startsWith(item.path));
            return (
              <a
                key={item.label}
                href={item.path.startsWith('#') ? item.path : undefined}
                onClick={(e) => {
                  if (!item.path.startsWith('#')) {
                    e.preventDefault();
                    handleNav(item.path);
                  }
                }}
                className={isActive ? 'active' : ''}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side Actions: Theme Selector, Search, Download CTA */}
        <div className="header-actions">
          {/* Theme Selector Popover Button */}
          <div className="theme-menu" ref={popoverRef}>
            <button
              onClick={() => setThemePopoverOpen((prev) => !prev)}
              className="icon-btn"
              title="Change Theme"
              aria-label="Change Theme"
              style={{ gap: 8, padding: '0 10px', minWidth: 38 }}
            >
              <span className={`swatch swatch-${theme}`} />
              <Palette size={14} />
            </button>

            {themePopoverOpen && (
              <div className="theme-popover">
                <div className="eyebrow">
                  <span>DESIGN SYSTEM THEMES</span>
                </div>
                {themesList.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setThemePopoverOpen(false);
                    }}
                    className={theme === t.id ? 'active' : ''}
                  >
                    <span className={`swatch ${t.swatchClass}`} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>{t.label}</span>
                      <span style={{ fontSize: 10, color: 'var(--muted)' }}>{t.desc}</span>
                    </div>
                    {theme === t.id && <Check size={14} style={{ color: 'var(--accent)' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Search / Command Palette Trigger */}
          <button
            onClick={onOpenSearch}
            className="icon-btn"
            title="Command Palette (Ctrl + K / ⌘K)"
            aria-label="Search and Commands"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px' }}
          >
            <Search size={14} />
            <span className="kbd" style={{ fontSize: 9 }}>⌘K</span>
          </button>

          {/* Primary CTA: Download ChatXa */}
          <button
            onClick={() => handleNav('/download')}
            className="button"
          >
            Download ChatXa
            <Download size={14} />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="icon-btn mobile-toggle"
            aria-label="Toggle Mobile Menu"
            style={{ display: 'none' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '88px 0 0 0',
            backgroundColor: 'var(--bg)',
            zIndex: 90,
            padding: '36px 6%',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            overflowY: 'auto'
          }}
        >
          <div className="eyebrow">NAVIGATION</div>
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.path.startsWith('#')) {
                  const el = document.getElementById(item.path.slice(1));
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                } else {
                  handleNav(item.path);
                }
              }}
              style={{
                textAlign: 'left',
                fontSize: 22,
                fontFamily: 'var(--heading)',
                fontWeight: 650,
                color: path === item.path ? 'var(--accent)' : 'var(--text)',
                padding: '6px 0'
              }}
            >
              {item.label}
            </button>
          ))}

          <div className="eyebrow" style={{ marginTop: 20 }}>CHOOSE PLATFORM</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {platformItems.map((p) => (
              <button
                key={p.id}
                onClick={() => handleNav(p.path)}
                className="surface-card"
                style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}
              >
                <span style={{ color: 'var(--accent)' }}>{p.icon}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNav('/download')}
            className="button full"
            style={{ marginTop: 24 }}
          >
            Download ChatXa 4.0
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
};
