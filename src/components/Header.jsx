import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, BRAND } from '@/lib/cafeData';
import ThemeToggle from '@/components/ThemeToggle';
import logoUrl from '@/assets/rusted-root-logo.png';

// Once the background is at least this opaque, dark text reads — flip nav labels back to normal.
const LIGHT_THRESHOLD = 0.6;

// Routes whose first section is a full-bleed photo hero. The header overlays them
// transparently and fades to opaque on scroll; on every other route it starts opaque.
const HERO_OVERLAY_ROUTES = new Set(['/', '/catering']);

// Home lives in the brand lockup (logo + "Home" on the far left), not in the tab
// row — so the row renders every nav link except "/".
const TAB_LINKS = NAV_LINKS.filter((link) => link.to !== '/');

export default function Header() {
  const location = useLocation();
  const isHeroOverlay = HERO_OVERLAY_ROUTES.has(location.pathname);
  const headerRef = useRef(null);
  const [bgOpacity, setBgOpacity] = useState(0);

  // White labels are only needed where the transparent bar overlays a dark image — the
  // home and catering heroes. On every other route the transparent state sits over a
  // light page bg, so dark text reads fine and we leave the labels alone.
  const isLight = isHeroOverlay && bgOpacity < LIGHT_THRESHOLD;

  useEffect(() => {
    let ticking = false;

    const update = () => {
      // On hero-overlay routes, fade in across roughly one viewport (the hero height).
      // On other pages, fade in over ~140px so the bar fills in quickly.
      const threshold = isHeroOverlay
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
  }, [isHeroOverlay]);

  // Expose the rendered header height as --header-h so page wrappers and sticky bars
  // (Layout main, Menu tabs, Order back-bar) can clear / pin against it without magic numbers.
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
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      {/* Scroll-aware background: transparent at top, fades to cream + blur + border as you
          scroll. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/95 backdrop-blur-md border-b border-border pointer-events-none"
        style={{ opacity: bgOpacity }}
      />
      <div className="relative max-w-[120rem] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-3 py-2">
          {/* Brand lockup — logo badge + "Home" label as ONE link (YouTube-style),
              replacing the old wordmark and the Home tab. Single hover state for the
              whole unit; 44px touch target kept on the link. The label reuses the
              nav-tab type + color tokens so it restyles with the tabs in both themes;
              a subtle drop-shadow is added only over the transparent-on-hero state,
              where the photo behind can run dark. The logo drops from 32px to 28px
              below 360px so the tab row keeps as much room as possible. */}
          <Link
            to="/"
            aria-label={`${BRAND.name}, Home`}
            className="shrink-0 inline-flex items-center gap-2 min-h-[44px] transition-opacity hover:opacity-80"
          >
            <img
              src={logoUrl}
              alt=""
              width="169"
              height="160"
              className="h-8 max-[359px]:h-7 md:h-10 w-auto object-contain"
              style={{
                filter: isLight ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' : 'none',
              }}
            />
            <span
              className={`text-sm md:text-base font-semibold whitespace-nowrap ${
                isLight ? 'text-white' : 'text-foreground/70'
              }`}
              style={{
                textShadow: isLight ? '0 1px 3px rgba(0,0,0,0.45)' : 'none',
                transition: 'color 200ms ease, text-shadow 200ms ease',
              }}
            >
              Home
            </span>
          </Link>

          {/* Full tab nav — every width, no hamburger. Horizontal scroll if the row
              is tight. */}
          <nav className="relative flex-1 min-w-0">
            <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
              {TAB_LINKS.map((link) => {
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
          </nav>

          {/* Right cluster: theme toggle (compact below md to leave the tab row room). */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="md:hidden">
              <ThemeToggle compact />
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
