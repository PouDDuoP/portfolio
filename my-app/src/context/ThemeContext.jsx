import { createContext, use, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

function getInitialTheme() {
  try {
    return localStorage.getItem('portfolio-theme') || 'dark';
  } catch {
    return 'dark';
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('portfolio-theme', next);
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    // Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = theme === 'dark' ? '#0a0a0b' : '#fafafa';
    }
  }, [theme]);

  const isDark = theme === 'dark';

  const value = useMemo(() => ({ theme, toggleTheme, isDark }), [theme, toggleTheme, isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
