import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, LogIn } from 'lucide-react';

// Unauthenticated visitors see ONLY this prompt. Login is delegated to Base44's
// hosted auth (Google or email/password); access is then granted only to a user
// whose role is 'admin' (checked in AdminDashboard) and enforced again by the
// entities' admin-only write RLS. No password is entered into or stored by this app.
export default function AdminLogin({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
            <Lock className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="font-heading text-2xl text-foreground">The Rusted Root Cafe: Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Log in with the café’s admin account to continue.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <Button onClick={onLogin} className="w-full gap-2 min-h-[48px]">
            <LogIn className="w-4 h-4" /> Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
