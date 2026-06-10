import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, WORDMARK_URL, BRAND } from '@/lib/cafeData';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';

// Once the background is at least this opaque, dark text reads — flip nav labels back to normal.
const LIGHT_THRESHOLD = 0.6;

// Routes whose first section is a full-bleed photo hero. The header overlays them
// transparently and fades to opaque on scroll; on every other route it starts opaque.
const HERO_OVERLAY_ROUTES = new Set(['/', '/catering']);

export default function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isHeroOverlay = HERO_OVERLAY_ROUTES.has(location.pathname);
  const headerRef = useRef(null);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // White labels are only needed where the transparent bar overlays a dark image — the
  // home and catering heroes. On every other route the transparent state sits over a
  // light page bg, so dark text reads fine and we leave the labels alone. While the
  // mobile drawer is open the bar is forced opaque (below), so dark labels read then too.
  const isLight = isHeroOverlay && bgOpacity < LIGHT_THRESHOLD && !drawerOpen;

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

  // Close the mobile drawer on navigation and whenever the viewport grows to desktop
  // (so a drawer left open while rotating to md+ never lingers off-screen).
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  // While the drawer is open: lock body scroll (restored exactly on close) and close on Escape.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
        {/* Scroll-aware background: transparent at top, fades to cream + blur + border as you
            scroll. Forced fully opaque while the mobile drawer is open so the bar and the
            slide-down panel both read as one solid surface, even over the hero. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-background/95 backdrop-blur-md border-b border-border pointer-events-none"
          style={{ opacity: drawerOpen ? 1 : bgOpacity }}
        />
        <div className="relative max-w-[120rem] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 md:gap-3 py-2">
            {/* Brand wordmark — sized to the existing bar height (44px touch target kept
                on the link). Cream mark + dark outline reads on both themes; a subtle
                drop-shadow is added only over the transparent-on-hero state, where the
                photo behind can run light. */}
            <Link
              to="/"
              aria-label={`${BRAND.name}, Home`}
              className="shrink-0 inline-flex items-center justify-center min-h-[44px]"
            >
              <img
                src={WORDMARK_URL}
                alt="The Rusted Root Cafe"
                className="h-6 md:h-10 w-auto"
                style={{
                  filter: isLight ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' : 'none',
                }}
              />
            </Link>

            {/* Full tab nav — desktop (md+) ONLY; below md the hamburger drawer replaces it.
                Unchanged at md+: horizontal scroll if the row is tight. */}
            <nav className="relative flex-1 min-w-0 hidden md:block">
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
            </nav>

            {/* Right cluster: theme toggle (ALWAYS in the bar, never inside the drawer) plus
                the mobile hamburger. ml-auto pushes it right once the nav is hidden below md. */}
            <div className="flex items-center gap-1.5 sm:gap-2 ml-auto md:ml-0 shrink-0">
              <div className="md:hidden">
                <ThemeToggle compact />
              </div>
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Hamburger — mounted below md ONLY (not merely CSS-hidden). 44x44 target,
                  animated 3-lines-to-X, color follows the bar's label treatment so it reads
                  white over the hero and dark on the solid bar, in both themes. */}
              {isMobile && (
                <button
                  type="button"
                  onClick={() => setDrawerOpen((o) => !o)}
                  aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={drawerOpen}
                  aria-controls="mobile-nav-drawer"
                  className={`relative inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors ${
                    isLight ? 'text-white hover:bg-white/15' : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <span className="sr-only">Menu</span>
                  <span aria-hidden="true" className="relative block w-5 h-3.5">
                    <span
                      className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                        drawerOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-5 rounded bg-current transition-opacity duration-300 ${
                        drawerOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <span
                      className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                        drawerOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'
                      }`}
                    />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-down nav drawer — mounted below md ONLY. Sits above the page and the
          sticky CTA bar (z-40) but below the header bar (z-50) so the wordmark, theme toggle
          and the hamburger-turned-X stay visible and tappable to dismiss it. */}
      {isMobile && (
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              key="mobile-nav-drawer"
              id="mobile-nav-drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[45] md:hidden"
            >
              {/* Backdrop — tap anywhere to close. */}
              <div
                className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
                onClick={closeDrawer}
              />
              {/* Panel slides down from under the header bar (cleared via --header-h). */}
              <motion.nav
                aria-label="Site"
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
                className="absolute left-0 right-0 top-0 overflow-y-auto bg-background border-b border-border shadow-2xl"
                style={{ paddingTop: 'var(--header-h, 56px)', maxHeight: '100dvh' }}
              >
                <ul className="px-3 py-3">
                  {NAV_LINKS.map((link) => {
                    const active = location.pathname === link.to;
                    return (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          onClick={closeDrawer}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center min-h-[48px] px-4 my-0.5 rounded-full text-base font-semibold transition-colors ${
                            active
                              ? 'bg-primary text-primary-foreground'
                              : 'text-foreground hover:bg-secondary'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
