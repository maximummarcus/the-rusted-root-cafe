import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallBar from '@/components/StickyCallBar';

// Routes whose first section is a full-bleed photo hero — they own their own top
// spacing and the header overlays them transparently. Every other route gets
// explicit header-height clearance below.
const HERO_FULL_BLEED_ROUTES = new Set(['/', '/catering']);

export default function Layout() {
  const location = useLocation();
  const isOrder = location.pathname === '/order';
  const isHeroFullBleed = HERO_FULL_BLEED_ROUTES.has(location.pathname);

  return (
    // Mobile call-bar clearance lives on the page wrapper (below the footer), not on
    // <main>, so the footer © line also clears the fixed bar; includes the iOS
    // home-indicator inset, matching the bar's own safe-area padding.
    <div
      className={`min-h-screen flex flex-col bg-background paper-texture ${
        isOrder ? '' : 'pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0'
      }`}
    >
      <Header />
      <main className={`flex-1 ${isHeroFullBleed ? '' : 'pt-[var(--header-h)]'}`}>
        <Outlet />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
