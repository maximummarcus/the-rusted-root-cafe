import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallBar from '@/components/StickyCallBar';

export default function Layout() {
  const location = useLocation();
  const isOrder = location.pathname === '/order';
  // Header is fixed/overlay. Home full-bleeds behind it (Hero owns its own top
  // spacing); every other route needs explicit clearance equal to header height.
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background paper-texture">
      <Header />
      <main
        className={`flex-1 ${isOrder ? '' : 'pb-[64px] md:pb-0'} ${
          isHome ? '' : 'pt-[var(--header-h)]'
        }`}
      >
        <Outlet />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
