import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, BRAND } from '@/lib/cafeData';
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
  const tabRowRef = useRef(null);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [tabFade, setTabFade] = useState({ left: false, right: false });

  // The transparent-bar state needs route-aware label colors. The home hero is now a
  // pure-WHITE field (the owner logo), so white labels would vanish there — it gets
  // Forest labels instead. The catering hero is still a dark photo, so it keeps the
  // white labels + drop-shadow. Every other route starts opaque, so this only matters
  // while the bar is still mostly transparent (bgOpacity below the light threshold).
  const overHero = isHeroOverlay && bgOpacity < LIGHT_THRESHOLD;
  const overWhiteHero = overHero && location.pathname === '/'; // Forest labels
  const overDarkHero = overHero && location.pathname !== '/'; // white labels

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

  // Edge-fade hint for the scrollable tab row: fade a side only while more tabs sit
  // off-screen on that side, so cut-off routes read as "swipe for more" instead of
  // looking truncated — and the last tab is never veiled once you reach it. Recomputed
  // on scroll/resize/font-load. Applied as a CSS mask (.header-tab-fade, mobile-only
  // via media query) rather than a color overlay so it works over BOTH header states:
  // transparent-on-hero and opaque cream.
  useEffect(() => {
    const el = tabRowRef.current;
    if (!el) return;
    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const left = el.scrollLeft > 2;
      const right = el.scrollLeft < maxScroll - 2;
      setTabFade((prev) =>
        prev.left === left && prev.right === right ? prev : { left, right }
      );
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    // Tab label widths shift when the webfont swaps in; re-measure then.
    document.fonts?.ready?.then(update);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  // Bring the active tab fully into view on route change — otherwise landing on
  // (or tapping) a tab past the fold leaves the active pill clipped behind the
  // edge fade on mobile. 'nearest' makes it a no-op when the pill is already
  // fully visible, and on desktop, where the row never overflows. Layout effect
  // so the row is aligned before paint (no visible jump).
  useLayoutEffect(() => {
    tabRowRef.current
      ?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [location.pathname]);

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

  // Mask stops for the tab-row fade: solid everywhere except a 24px ramp on each
  // side that still has overflow. "black, black" (no fade) when fully in view.
  const tabFadeMask = `linear-gradient(to right, ${
    tabFade.left ? 'transparent, black 24px' : 'black'
  }, ${tabFade.right ? 'black calc(100% - 24px), transparent' : 'black'})`;

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
              where the photo behind can run dark. The logo fills the link's 44px
              touch target so the small "café" lettering in the badge stays legible —
              header height is unchanged. It drops to 36px below 360px so the tab
              row keeps as much room as possible. */}
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
              className="h-11 max-[359px]:h-9 md:h-12 w-auto object-contain"
              style={{
                filter: overDarkHero ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' : 'none',
              }}
            />
            <span
              className={`text-sm md:text-base font-semibold whitespace-nowrap ${
                overDarkHero
                  ? 'text-white'
                  : overWhiteHero
                    ? 'text-brand-forest'
                    : 'text-foreground/70'
              }`}
              style={{
                textShadow: overDarkHero ? '0 1px 3px rgba(0,0,0,0.45)' : 'none',
                transition: 'color 200ms ease, text-shadow 200ms ease',
              }}
            >
              Home
            </span>
          </Link>

          {/* Full tab nav — every width, no hamburger. Below md the row scrolls
              horizontally (snap per tab, edge fade as the "more tabs" hint) so every
              route stays reachable with a swipe even at 360px. */}
          <nav className="relative flex-1 min-w-0">
            <ul
              ref={tabRowRef}
              className="header-tab-fade flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar max-md:snap-x"
              style={{ '--tab-fade-mask': tabFadeMask }}
            >
              {TAB_LINKS.map((link) => {
                const active = location.pathname === link.to;
                const inactiveClasses = overDarkHero
                  ? 'text-white hover:bg-white/15'
                  : overWhiteHero
                    ? 'text-brand-forest hover:bg-brand-forest/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary';
                return (
                  <li key={link.to} className="shrink-0 max-md:snap-start">
                    <Link
                      to={link.to}
                      aria-current={active ? 'page' : undefined}
                      className={`inline-flex items-center min-h-[44px] px-2.5 md:px-4 rounded-full text-sm md:text-base font-semibold whitespace-nowrap ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : inactiveClasses
                      }`}
                      style={{
                        textShadow:
                          !active && overDarkHero ? '0 1px 3px rgba(0,0,0,0.45)' : 'none',
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
        </div>
      </div>
    </header>
  );
}
