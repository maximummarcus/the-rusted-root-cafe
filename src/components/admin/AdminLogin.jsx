import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Loader2, LogIn } from 'lucide-react';
import GoogleIcon from '@/components/GoogleIcon';

// Unauthenticated visitors see ONLY this prompt. Login is delegated to Base44's
// auth (Google or email/password) right here on the admin page — we do NOT use
// redirectToLogin, because that bounces to an in-app /login route this app does
// not register (it 404s). Access is then granted only to a user whose role is
// 'admin' (checked in AdminDashboard) and enforced again by the entities'
// admin-only write RLS. No password is stored by this app.
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Return to this exact admin URL after auth so the dashboard mounts logged in.
  const callbackUrl = typeof window !== 'undefined' ? window.location.href : '/';

  const handleGoogle = () => {
    base44.auth.loginWithProvider('google', callbackUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      // Reload so the SDK picks up the new session; AdminDashboard then re-checks
      // the role and renders the dashboard for an admin account.
      window.location.reload();
    } catch (err) {
      setError(err?.message || 'Invalid email or password.');
      setLoading(false);
    }
  };

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
          <Button variant="outline" onClick={handleGoogle} className="w-full gap-2 min-h-[48px]">
            <GoogleIcon className="w-5 h-5" /> Continue with Google
          </Button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">or</span>
            </div>
          </div>

          {error && <p className="mb-3 text-sm text-destructive" role="alert">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full gap-2 min-h-[48px]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
