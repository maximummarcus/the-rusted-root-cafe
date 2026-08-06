import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import Seo from '@/components/Seo';
import AdminLogin from '@/components/admin/AdminLogin';
import SpecialsTab from '@/components/admin/SpecialsTab';
import OutOfStockTab from '@/components/admin/OutOfStockTab';
import OrdersTab from '@/components/admin/OrdersTab';
import HammyStatsCard from '@/components/admin/HammyStatsCard';
import { isAdminAuthorized } from '@/lib/adminConfig';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut } from 'lucide-react';

// Auth model: the admin opens for any signed-in Base44 account (Google or
// email/password — see AdminLogin.jsx) for now, per isAdminAuthorized() in
// src/lib/adminConfig.js — that's the one place to tighten later (e.g. back
// to role === 'admin'). An anonymous visitor sees the login prompt; a
// signed-in but unauthorized account sees an access notice. Entity writes
// (and some reads) are independently enforced by the admin-only RLS on the
// underlying entities, so this client gate is defense-in-depth, not the only
// lock — an account without the Base44 'admin' role can still fail to load
// or save data inside the dashboard even after passing this gate. No backend
// functions are used (this app's Base44 plan does not run them).
export default function AdminDashboard() {
  // 'checking' | 'anon' | 'forbidden' | 'admin'
  const [status, setStatus] = useState('checking');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let active = true;
    base44.auth
      .me()
      .then((user) => {
        if (!active) return;
        setEmail(user?.email || '');
        setStatus(isAdminAuthorized(user) ? 'admin' : 'forbidden');
      })
      .catch(() => {
        // No valid session — treat as anonymous and show the login prompt.
        if (active) setStatus('anon');
      });
    return () => {
      active = false;
    };
  }, []);

  // Logout returns to the public home. (Login is handled inline by AdminLogin via
  // base44.auth, not redirectToLogin, which would bounce to an unrouted /login.)
  const logout = () => base44.auth.logout(`${window.location.origin}/`);

  // Never index the admin, and keep the tab title generic regardless of state.
  const seo = <Seo title="The Rusted Root Cafe" description="" noindex />;

  if (status === 'checking') {
    return (
      <>
        {seo}
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (status === 'anon') {
    return (
      <>
        {seo}
        <AdminLogin />
      </>
    );
  }

  if (status === 'forbidden') {
    return (
      <>
        {seo}
        <div className="min-h-screen flex items-center justify-center px-6 bg-background">
          <div className="w-full max-w-sm text-center">
            <h1 className="font-heading text-2xl text-foreground">Not an admin account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {email ? `${email} is signed in but does not have admin access.` : 'This account does not have admin access.'}{' '}
              Log in with the café’s admin account to continue.
            </p>
            <Button onClick={logout} className="mt-6 gap-2 min-h-[48px]">
              <LogOut className="w-4 h-4" /> Log out &amp; switch account
            </Button>
          </div>
        </div>
      </>
    );
  }

  // status === 'admin'
  return (
    <>
      {seo}
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-brand-forest text-brand-cream">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <h1 className="font-heading text-base sm:text-xl tracking-wide truncate">THE RUSTED ROOT: ADMIN</h1>
            <Button
              onClick={logout}
              variant="secondary"
              size="sm"
              className="gap-1.5 shrink-0 min-h-[44px]"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-6">
          {/* Hammy Awards vote-click engagement — read-only campaign stats. */}
          <HammyStatsCard />
          <Tabs defaultValue="specials">
            <TabsList className="w-full h-auto grid grid-cols-3 gap-1">
              <TabsTrigger value="specials" className="py-2 min-h-[44px]">Specials</TabsTrigger>
              <TabsTrigger value="stock" className="py-2 min-h-[44px]">Out of Stock</TabsTrigger>
              <TabsTrigger value="orders" className="py-2 min-h-[44px]">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="specials" className="mt-6">
              <SpecialsTab />
            </TabsContent>
            <TabsContent value="stock" className="mt-6">
              <OutOfStockTab />
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <OrdersTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
