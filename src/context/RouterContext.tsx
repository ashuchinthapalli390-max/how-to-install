import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  path: string;
  searchParams: URLSearchParams;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  setSearchParam: (key: string, value: string | null) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState<string>(() => window.location.pathname + window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const path = currentUrl.split('?')[0] || '/';
  const queryString = currentUrl.includes('?') ? currentUrl.split('?')[1] : '';
  const searchParams = new URLSearchParams(queryString);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setCurrentUrl(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setSearchParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const newSearch = params.toString() ? `?${params.toString()}` : '';
    const newUrl = window.location.pathname + newSearch;
    window.history.replaceState({}, '', newUrl);
    setCurrentUrl(newUrl);
  }, []);

  return (
    <RouterContext.Provider value={{ path, searchParams, navigate, setSearchParam }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
