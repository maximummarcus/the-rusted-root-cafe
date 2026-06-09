import React from 'react';
import { CLOVER_DASHBOARD_URL } from '@/lib/adminConfig';
import { ExternalLink, ShoppingBag } from 'lucide-react';

// Honest scope: online orders are taken through Clover, not this site. There is no in-site
// order capture, so an in-site orders table would always be empty. This tab simply points
// the owner to her Clover dashboard.
//
// TODO: If the owner later wants orders shown inside this dashboard, that's a separate
// Clover-API integration add-on.
export default function OrdersTab() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
        <ShoppingBag className="w-6 h-6 text-foreground" />
      </div>
      <h2 className="font-heading text-2xl text-foreground">Online orders are managed in Clover</h2>
      <p className="mt-2 text-muted-foreground">
        The café takes online orders through your Clover dashboard, not this website — so they
        won&apos;t appear here. Open Clover to view and manage incoming orders.
      </p>

      {CLOVER_DASHBOARD_URL ? (
        <a
          href={CLOVER_DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full bg-primary text-primary-foreground text-base font-bold shadow hover:opacity-90 transition w-full sm:w-auto"
        >
          Open Clover Dashboard <ExternalLink className="w-5 h-5" />
        </a>
      ) : (
        <p className="mt-6 text-xs italic text-muted-foreground">
          Setup note: add your Clover dashboard link (CLOVER_DASHBOARD_URL in
          src/lib/adminConfig.js) to enable the button.
        </p>
      )}
    </div>
  );
}
