import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { MENU } from '@/lib/cafeData';
import { adminSetAvailability } from '@/api/adminApi';
import { timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Loader2, Check, Ban } from 'lucide-react';
import { toast } from 'sonner';

// Only categories that actually have items can be toggled.
const CATEGORIES = MENU.filter((c) => c.items && c.items.length > 0);

export default function OutOfStockTab() {
  const [loading, setLoading] = useState(true);
  // Map: menu_item_id (item name) -> { available, updated_date }
  const [availability, setAvailability] = useState({});
  const [pending, setPending] = useState({}); // name -> true while a write is in-flight

  useEffect(() => {
    base44.entities.menu_item_availability
      .list()
      .then((rows) => {
        const map = {};
        for (const r of rows) {
          map[r.menu_item_id] = { available: r.available !== false, updated_date: r.updated_date };
        }
        setAvailability(map);
      })
      .catch(() => setAvailability({}))
      .finally(() => setLoading(false));
  }, []);

  const isAvailable = (name) => availability[name]?.available !== false; // default available

  const toggle = async (name) => {
    if (pending[name]) return;
    const next = !isAvailable(name);
    const prev = availability;
    // Optimistic
    setAvailability((m) => ({ ...m, [name]: { available: next, updated_date: new Date().toISOString() } }));
    setPending((p) => ({ ...p, [name]: true }));
    try {
      const saved = await adminSetAvailability(name, next);
      setAvailability((m) => ({
        ...m,
        [name]: { available: saved?.available !== false, updated_date: saved?.updated_date || new Date().toISOString() },
      }));
    } catch (err) {
      setAvailability(prev); // rollback
      toast.error(err.message);
    } finally {
      setPending((p) => {
        const { [name]: _omit, ...rest } = p;
        return rest;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Tap a button to flip an item between <span className="font-semibold text-green-700">Available</span> and{' '}
        <span className="font-semibold text-red-700">Sold Out</span>. Changes show on the customer menu within a minute.
      </p>

      {CATEGORIES.map((category) => (
        <section key={category.key}>
          <h2 className="font-heading text-lg text-foreground mb-3">{category.name}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {category.items.map((item) => {
              const available = isAvailable(item.name);
              const updated = availability[item.name]?.updated_date;
              const busy = !!pending[item.name];
              return (
                <div key={item.name} className="bg-card border border-border rounded-2xl p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-foreground min-w-0 truncate">{item.name}</span>
                    <button
                      type="button"
                      onClick={() => toggle(item.name)}
                      disabled={busy}
                      aria-pressed={!available}
                      className={cn(
                        'shrink-0 inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full text-sm font-bold uppercase tracking-wide transition-colors disabled:opacity-60',
                        available
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-red-600 text-white hover:bg-red-700',
                      )}
                    >
                      {busy ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : available ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Ban className="w-4 h-4" />
                      )}
                      {available ? 'Available' : 'Sold Out'}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {updated ? `Last updated: ${timeAgo(updated)}` : 'Last updated: never'}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
