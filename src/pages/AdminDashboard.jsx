import React, { useEffect, useState } from 'react';
import { adminVerify, adminLogout } from '@/api/adminApi';
import Seo from '@/components/Seo';
import AdminLogin from '@/components/admin/AdminLogin';
import SpecialsTab from '@/components/admin/SpecialsTab';
import OutOfStockTab from '@/components/admin/OutOfStockTab';
import OrdersTab from '@/components/admin/OrdersTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  // null = checking, false = not authed, true = authed. The dashboard subtree is only
  // mounted when authed === true, so no admin controls exist in the DOM otherwise.
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    let active = true;
    adminVerify().then((ok) => {
      if (active) setAuthed(ok);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    await adminLogout();
    setAuthed(false);
    window.location.href = '/';
  };

  // Never index the admin, regardless of auth state.
  const seo = <Seo title="Admin: The Rusted Root Cafe" description="" noindex />;

  if (authed === null) {
    return (
      <>
        {seo}
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!authed) {
    return (
      <>
        {seo}
        <AdminLogin onSuccess={() => setAuthed(true)} />
      </>
    );
  }

  return (
    <>
      {seo}
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-brand-forest text-brand-cream">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <h1 className="font-heading text-base sm:text-xl tracking-wide truncate">THE RUSTED ROOT: ADMIN</h1>
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
              className="gap-1.5 shrink-0 min-h-[44px]"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-6">
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
