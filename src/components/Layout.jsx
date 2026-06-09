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
    <div className="min-h-screen flex flex-col bg-background paper-texture">
      <Header />
      <main
        className={`flex-1 ${isOrder ? '' : 'pb-[64px] md:pb-0'} ${
          isHeroFullBleed ? '' : 'pt-[var(--header-h)]'
        }`}
      >
        <Outlet />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
