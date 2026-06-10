import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'rrc-theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'handdrawn';
    return localStorage.getItem(STORAGE_KEY) || 'handdrawn';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'modern') {
      root.setAttribute('data-theme', 'modern');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // The global 250ms theme transition (index.css) only applies while
  // .theme-transitioning is on <html>, so the morph animates on an actual
  // toggle/select but never on initial load.
  const transitionTimer = useRef(null);
  const beginMorph = () => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
      transitionTimer.current = null;
    }, 300);
  };

  const toggleTheme = () => {
    beginMorph();
    setTheme((t) => (t === 'modern' ? 'handdrawn' : 'modern'));
  };

  // Set a specific theme. The two-button toggle uses this so each side is an
  // explicit target ("make it Modern"), which is reliable on touch in a way that
  // toggle-only logic is not.
  const selectTheme = (next) => {
    if (next !== 'modern' && next !== 'handdrawn') return;
    beginMorph();
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, selectTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}