import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

// Theme is LOCKED to Hand-Drawn (owner decision, June 2026). The toggle UI is
// gone, but the theme plumbing below stays so the Modern token overrides in
// index.css and the per-component `theme` checks remain dormant rather than
// broken — re-enabling later is a change to this file only.
const THEME = 'handdrawn';
const STORAGE_KEY = 'rrc-theme';

const noop = () => {};
// Stable value object: the provider wraps the whole app, so a fresh object per
// render would re-render every theme consumer for nothing.
const LOCKED_VALUE = {
  theme: THEME,
  setTheme: noop,
  toggleTheme: noop,
  selectTheme: noop,
};

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Returning visitors may still carry 'modern' persisted from when the
    // toggle existed; drop the attribute and the stored key so they land on
    // Hand-Drawn like everyone else.
    document.documentElement.removeAttribute('data-theme');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage blocked (private mode) — attribute removal above is enough */
    }
  }, []);

  return (
    <ThemeContext.Provider value={LOCKED_VALUE}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
