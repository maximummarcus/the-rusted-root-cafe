import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, LOGO_URL } from '@/lib/cafeData';
import ThemeToggle from '@/components/ThemeToggle';

// Scroll distance over which the header background fades from transparent → opaque.
const FILL_AT = 200;
// Once the background is at least this opaque, dark text reads — flip labels back to normal.
const LIGHT_THRESHOLD = 0.6;

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const headerRef = useRef(null);
  const [scrollY, setScrollY] = useState(() =>
    typeof window === 'undefined' ? 0 : window.scrollY
  );

  // Only the home hero needs the transparent overlay. Everywhere else, start opaque
  // so dark nav labels read against the page bg from scrollY=0.
  const bgOpacity = isHome ? Math.min(1, scrollY / FILL_AT) : 1;
  const isLight = bgOpacity < LIGHT_THRESHOLD;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Re-read scroll on route change so home renders transparent immediately after
  // ScrollToTop snaps the page back to y=0.
  useEffect(() => {
    setScrollY(window.scrollY);
  }, [location.pathname]);

  // Expose the actual rendered header height as --header-h so page wrappers and
  // sticky bars can clear / pin against it without magic numbers.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () => {
      const h = el.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty('--header-h', `${h}px`);
      }
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setVar);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: `hsl(var(--background) / ${bgOpacity * 0.9})`,
        backdropFilter: bgOpacity > 0.1 ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: bgOpacity > 0.1 ? 'blur(12px)' : 'none',
        borderBottom: `1px solid hsl(var(--border) / ${bgOpacity})`,
        // bg/border must follow scroll instantly — a transition would chase/jitter.
        transition: 'none',
      }}
    >
      <div className="max-w-[120rem] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={LOGO_URL}
              alt="The Rusted Root café logo"
              className="w-[100px] md:w-[120px] h-auto rounded-full"
            />
          </Link>

          {/* Theme toggle (always reachable) */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Full tab nav — never a hamburger. Horizontal scroll on tiny screens. */}
        <nav className="relative pb-2">
          <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              const inactiveClasses = isLight
                ? 'text-white hover:bg-white/15'
                : 'text-foreground/70 hover:text-foreground hover:bg-secondary';
              return (
                <li key={link.to} className="shrink-0">
                  <Link
                    to={link.to}
                    className={`inline-flex items-center min-h-[44px] px-3 md:px-4 rounded-full text-sm md:text-base font-semibold whitespace-nowrap ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : inactiveClasses
                    }`}
                    style={{
                      textShadow:
                        !active && isLight ? '0 1px 3px rgba(0,0,0,0.45)' : 'none',
                      transition:
                        'color 200ms ease, background-color 200ms ease, text-shadow 200ms ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* gradient fade hint on right edge — tracks header opacity so it disappears over the hero */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 md:hidden"
            style={{
              background: `linear-gradient(to left, hsl(var(--background) / ${
                bgOpacity * 0.9
              }), transparent)`,
            }}
          />
        </nav>
      </div>
    </header>
  );
}
