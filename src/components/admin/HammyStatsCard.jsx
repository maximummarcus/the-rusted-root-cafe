import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';

// Hammy Awards engagement card for the admin dashboard. Reads the VoteClick
// entity (admin-only read RLS — this component only mounts inside the authed
// admin subtree) and shows how many visitors clicked through to the ballot,
// broken down by placement. Read-only; stays after voting closes so the final
// numbers remain visible.

const SOURCE_LABELS = {
  home_section: 'Home page section',
  popup: 'Popup',
  nav_tab: 'Vote tab',
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function HammyStatsCard() {
  // 'loading' | 'error' | 'ready'
  const [status, setStatus] = useState('loading');
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    let active = true;
    base44.entities.VoteClick.list('-created_date', 1000)
      .then((rows) => {
        if (!active) return;
        setClicks(Array.isArray(rows) ? rows : []);
        setStatus('ready');
      })
      .catch(() => {
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, []);

  const now = Date.now();
  const last7 = clicks.filter((c) => {
    const t = Date.parse(c.created_date);
    return Number.isFinite(t) && now - t < SEVEN_DAYS_MS;
  }).length;

  const bySource = clicks.reduce((acc, c) => {
    acc[c.source] = (acc[c.source] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mb-6 rounded-lg border border-border bg-secondary/40 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-lg text-foreground">Hammy Awards</h2>
        <span className="text-xs text-muted-foreground">Vote link clicks</span>
      </div>

      {status === 'loading' && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading clicks...
        </div>
      )}

      {status === 'error' && (
        <p className="mt-3 text-sm text-muted-foreground">
          Could not load vote clicks. Refresh to retry.
        </p>
      )}

      {status === 'ready' &&
        (clicks.length === 0 ? (
          <p className="mt-3 text-sm italic text-muted-foreground">No vote clicks yet.</p>
        ) : (
          <>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-md bg-background border border-border px-3 py-2">
                <p className="text-2xl font-heading text-foreground leading-none">{clicks.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Total clicks</p>
              </div>
              <div className="rounded-md bg-background border border-border px-3 py-2">
                <p className="text-2xl font-heading text-foreground leading-none">{last7}</p>
                <p className="mt-1 text-xs text-muted-foreground">Last 7 days</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {Object.entries(SOURCE_LABELS).map(([key, label]) => (
                <li key={key} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{bySource[key] || 0}</span>
                </li>
              ))}
            </ul>
          </>
        ))}
    </section>
  );
}
