import React, { useState } from 'react';
import { adminLogin } from '@/api/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Loader2 } from 'lucide-react';

// Unauthenticated visitors see ONLY this prompt. There is no server check on this
// plan: the password is hashed in the browser and compared to the stored SHA-256
// hash, and a localStorage flag keeps the session (see src/lib/adminConfig.js for
// the full security note + launch TODO). The dashboard subtree is not mounted
// until that check passes, so no admin controls exist in the DOM before login.
export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const result = await adminLogin(password);
      if (result?.success) {
        setPassword('');
        onSuccess();
      } else {
        setError(result?.error || 'Incorrect password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
            <Lock className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="font-heading text-2xl text-foreground">The Rusted Root: Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter the admin password to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          <Button type="submit" disabled={submitting || !password} className="w-full gap-2 min-h-[48px]">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
