import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, LOGO_URL, BRAND } from '@/lib/cafeData';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-[120rem] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {/* PLACEHOLDER IMAGE: replace with real logo */}
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
          {/* gradient fade hint on right edge */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent md:hidden" />
        </nav>
      </div>
    </header>
  );
}