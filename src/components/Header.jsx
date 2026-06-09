import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, LOGO_URL, BRAND } from '@/lib/cafeData';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      // On Home, fade in across roughly one viewport (the hero height).
      // On other pages, fade in over ~140px so the bar fills in quickly.
      const threshold = isHome
        ? Math.max(window.innerHeight * 0.9, 320)
        : 140;
      const next = Math.min(Math.max(window.scrollY / threshold, 0), 1);
      setBgOpacity(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Scroll-aware background: transparent at top, fades to cream + blur + border as you scroll. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/95 backdrop-blur-md border-b border-border pointer-events-none"
        style={{ opacity: bgOpacity }}
      />
      <div className="relative max-w-[120rem] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-3 py-2">
          {/* Inline logo — matches the nav button height so the bar reads as one row. */}
          <Link
            to="/"
            aria-label={`${BRAND.name} — Home`}
            className="shrink-0 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
          >
            <img
              src={LOGO_URL}
              alt="The Rusted Root café logo"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover"
            />
          </Link>

          {/* Full tab nav — never a hamburger. Horizontal scroll if the row is tight. */}
          <nav className="relative flex-1 min-w-0">
            <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <li key={link.to} className="shrink-0">
                    <Link
                      to={link.to}
                      className={`inline-flex items-center min-h-[44px] px-3 md:px-4 rounded-full text-sm md:text-base font-semibold whitespace-nowrap transition-colors ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme toggle — always reachable. */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
