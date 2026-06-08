import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallBar from '@/components/StickyCallBar';

export default function Layout() {
  const location = useLocation();
  const isOrder = location.pathname === '/order';

  return (
    <div className="min-h-screen flex flex-col bg-background paper-texture">
      <Header />
      <main className={`flex-1 ${isOrder ? '' : 'pb-[64px] md:pb-0'}`}>
        <Outlet />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}