import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// Reads menu_item_availability (keyed by item name) and polls every 60s so a SOLD OUT
// toggle in the admin reflects on the customer side within a minute. Items with no row
// default to available.
export function useAvailability(pollMs = 60000) {
  const [soldOut, setSoldOut] = useState(() => new Set());

  useEffect(() => {
    let active = true;

    const load = () => {
      base44.entities.menu_item_availability
        .list()
        .then((rows) => {
          if (!active) return;
          const next = new Set();
          for (const r of rows) {
            if (r.available === false) next.add(r.menu_item_id);
          }
          setSoldOut(next);
        })
        .catch(() => {
          /* keep last known state on transient errors */
        });
    };

    load();
    const id = setInterval(load, pollMs);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [pollMs]);

  return {
    soldOut,
    isSoldOut: (name) => soldOut.has(name),
  };
}
