import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { HomePage } from './pages/HomePage';
import { InstallPage } from './pages/InstallPage';
import { DownloadPage } from './pages/DownloadPage';
import { TroubleshootingPage } from './pages/TroubleshootingPage';
import { FaqPage } from './pages/FaqPage';

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderCurrentPage = () => {
    if (path === '/' || path === '') {
      return <HomePage />;
    }
    if (path === '/download') {
      return <DownloadPage />;
    }
    if (path === '/troubleshooting') {
      return <TroubleshootingPage />;
    }
    if (path === '/faq') {
      return <FaqPage />;
    }
    if (path.startsWith('/install/android')) {
      return <InstallPage platformId="android" />;
    }
    if (path.startsWith('/install/ios')) {
      return <InstallPage platformId="ios" />;
    }
    if (path.startsWith('/install/windows')) {
      return <InstallPage platformId="windows" />;
    }
    if (path.startsWith('/install/macos')) {
      return <InstallPage platformId="macos" />;
    }
    if (path.startsWith('/install/linux')) {
      return <InstallPage platformId="linux" />;
    }

    // Default fallback to home
    return <HomePage />;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
};

export default App;
