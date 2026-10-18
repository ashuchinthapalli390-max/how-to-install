import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { Search, Moon, Sun, Download, Menu, X, Smartphone, Apple, Monitor, Laptop, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { path, navigate } = useRouter();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (targetPath: string) => {
    navigate(targetPath);
    setMobileMenuOpen(false);
    setPlatformsDropdownOpen(false);
  };

  const logoSrc = theme === 'obsidian'
    ? '/assets/logos/ChatXa_04_Obsidian_Gold_Right.png'
    : theme === 'ivory'
    ? '/assets/logos/ChatXa_05_Arctic_Light_Right.png'
    : '/assets/logos/ChatXa_01_Crimson_Noir_Right.png';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-height)',
          zIndex: 100,
          transition: 'all var(--transition-normal)',
          backgroundColor: isScrolled ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-muted)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Brand Logo & Wordmark */}
          <div
            onClick={() => handleNav('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            <img
              src={logoSrc}
              alt="ChatXa 4.0"
              style={{
                height: 38,
                width: 'auto',
                objectFit: 'contain',
                filter: theme === 'crimson' ? 'drop-shadow(0 0 10px rgba(220, 24, 44, 0.4))' : 'none',
                transition: 'filter var(--transition-normal)'
              }}
              onError={(e) => {
                // fallback if image not loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Chat<span style={{ color: 'var(--accent-text)' }}>Xa</span>
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--accent-subtle)',
                  color: 'var(--accent-text)',
                  border: '1px solid var(--border-highlight)'
                }}
              >
                4.0
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32
            }}
            className="desktop-nav"
          >
            <button
              onClick={() => handleNav('/')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 600,
                color: path === '/' ? 'var(--accent-text)' : 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px 0',
                transition: 'color var(--transition-fast)'
              }}
            >
              Home
              {path === '/' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: 'var(--accent-bright)',
                    borderRadius: 2
                  }}
                />
              )}
            </button>

            {/* Platforms Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setPlatformsDropdownOpen(true)}
              onMouseLeave={() => setPlatformsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('/install/android')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: path.startsWith('/install') ? 'var(--accent-text)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '6px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                Platforms
                <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
                {path.startsWith('/install') && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: 'var(--accent-bright)',
                      borderRadius: 2
                    }}
                  />
                )}
              </button>

              {platformsDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: -10,
                    width: 210,
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-muted)',
                    borderRadius: 'var(--radius-md)',
                    padding: 8,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    zIndex: 110
                  }}
                >
                  {[
                    { name: 'Android', path: '/install/android', icon: <Smartphone size={15} /> },
                    { name: 'iPhone (iOS)', path: '/install/ios', icon: <Apple size={15} /> },
                    { name: 'Windows', path: '/install/windows', icon: <Monitor size={15} /> },
                    { name: 'macOS', path: '/install/macos', icon: <Laptop size={15} /> },
                    { name: 'Linux', path: '/install/linux', icon: <Terminal size={15} /> }
                  ].map((p) => (
                    <div
                      key={p.path}
                      onClick={() => handleNav(p.path)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 13,
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 500,
                        color: path === p.path ? 'var(--accent-text)' : 'var(--text-primary)',
                        backgroundColor: path === p.path ? 'var(--accent-subtle)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = path === p.path ? 'var(--accent-subtle)' : 'transparent')
                      }
                    >
                      <span style={{ color: 'var(--accent-bright)' }}>{p.icon}</span>
                      {p.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/download')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 600,
                color: path === '/download' ? 'var(--accent-text)' : 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px 0'
              }}
            >
              Releases
              {path === '/download' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: 'var(--accent-bright)',
                    borderRadius: 2
                  }}
                />
              )}
            </button>

            <button
              onClick={() => handleNav('/troubleshooting')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 600,
                color: path === '/troubleshooting' ? 'var(--accent-text)' : 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px 0'
              }}
            >
              Troubleshooting
              {path === '/troubleshooting' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: 'var(--accent-bright)',
                    borderRadius: 2
                  }}
                />
              )}
            </button>

            <button
              onClick={() => handleNav('/faq')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 600,
                color: path === '/faq' ? 'var(--accent-text)' : 'var(--text-secondary)',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px 0'
              }}
            >
              FAQ
              {path === '/faq' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: 'var(--accent-bright)',
                    borderRadius: 2
                  }}
                />
              )}
            </button>
          </nav>

          {/* Right: Search, Theme Switcher, Download CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-muted)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                cursor: 'pointer',
                transition: 'border-color var(--transition-fast)'
              }}
              title="Search Installation Guides (Ctrl + K)"
            >
              <Search size={15} style={{ color: 'var(--text-secondary)' }} />
              <span className="search-label">Search guides</span>
              <span className="kbd" style={{ marginLeft: 4 }}>Ctrl K</span>
            </button>

            {/* Theme Switcher Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '3px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-muted)'
              }}
            >
              <button
                onClick={() => setTheme('crimson')}
                title="CreaXa Crimson Theme"
                style={{
                  background: theme === 'crimson' ? 'var(--accent-bright)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: theme === 'crimson' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', backgroundColor: theme === 'crimson' ? '#FFFFFF' : '#DC182C' }} />
                Crimson
              </button>

              <button
                onClick={() => setTheme('obsidian')}
                title="Obsidian Theme"
                style={{
                  background: theme === 'obsidian' ? 'var(--accent-primary)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: theme === 'obsidian' ? '#000000' : 'var(--text-secondary)',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Moon size={12} />
                Obsidian
              </button>

              <button
                onClick={() => setTheme('ivory')}
                title="CreaXa Ivory Theme"
                style={{
                  background: theme === 'ivory' ? 'var(--accent-primary)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: theme === 'ivory' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Sun size={12} />
                Ivory
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={() => handleNav('/download')}
              className="btn btn-primary btn-sm download-btn"
            >
              <Download size={14} />
              <span>Get ChatXa</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: 6
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-glass-heavy)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Navigation
            </span>
            {[
              { name: 'Home', path: '/' },
              { name: 'Releases & Downloads', path: '/download' },
              { name: 'Troubleshooting Solver', path: '/troubleshooting' },
              { name: 'Frequently Asked Questions', path: '/faq' }
            ].map((item) => (
              <div
                key={item.path}
                onClick={() => handleNav(item.path)}
                style={{
                  fontSize: 18,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  color: path === item.path ? 'var(--accent-bright)' : 'var(--text-primary)',
                  padding: '8px 0',
                  cursor: 'pointer'
                }}
              >
                {item.name}
              </div>
            ))}
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--border-muted)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Operating Systems
            </span>
            {[
              { name: 'Android Master Guide', path: '/install/android', icon: <Smartphone size={18} /> },
              { name: 'iPhone (iOS) Master Guide', path: '/install/ios', icon: <Apple size={18} /> },
              { name: 'Windows Master Guide', path: '/install/windows', icon: <Monitor size={18} /> },
              { name: 'macOS Master Guide', path: '/install/macos', icon: <Laptop size={18} /> },
              { name: 'Linux Workstation Guide', path: '/install/linux', icon: <Terminal size={18} /> }
            ].map((p) => (
              <div
                key={p.path}
                onClick={() => handleNav(p.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 16,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  color: path === p.path ? 'var(--accent-bright)' : 'var(--text-secondary)',
                  padding: '8px 0',
                  cursor: 'pointer'
                }}
              >
                <span style={{ color: 'var(--accent-bright)' }}>{p.icon}</span>
                {p.name}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => handleNav('/download')}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Download size={16} />
              Download ChatXa 4.0
            </button>
          </div>
        </div>
      )}

      {/* Responsive Styles for Navbar */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .search-label, .kbd {
            display: none !important;
          }
        }
        @media (max-width: 580px) {
          .download-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
