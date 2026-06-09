import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallBar from '@/components/StickyCallBar';

export default function Layout() {
  const location = useLocation();
  const isOrder = location.pathname === '/order';
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background paper-texture">
      <Header />
      {/* Header is fixed/overlay; non-home pages need top clearance equal to header height. */}
      {/* Home is handled inside the Hero (it intentionally full-bleeds behind the header). */}
      <main
        className={`flex-1 ${isOrder ? '' : 'pb-[64px] md:pb-0'} ${
          isHome ? '' : 'pt-[64px]'
        }`}
      >
        <Outlet />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}