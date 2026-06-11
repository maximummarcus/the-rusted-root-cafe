import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, MENU, CLOVER_ORDER_URL, DOORDASH_ORDER_URL } from '@/lib/cafeData';
import Seo from '@/components/Seo';
import { Phone, ArrowLeft, ShoppingBag, Bike } from 'lucide-react';

// Ordering provider links live in src/lib/cafeData.js (single source of truth).
// Both are hosted ordering pages that block iframe embedding (X-Frame-Options),
// so they must always open in a new tab.

export default function Order() {
  return (
    <>
      <Seo
        title="Order Online: The Rusted Root Cafe, Windsor VA"
        description="Order pickup online from The Rusted Root Cafe in Windsor, VA. Scratch-made café & bakery favorites, ready when you are."
      />

      {/* Native wrapper bar — pinned just under the fixed header. */}
      <div className="sticky top-[var(--header-h)] z-40 bg-brand-forest text-brand-cream">
        <div className="max-w-[120rem] mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm font-semibold min-h-[44px]">
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </Link>
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold bg-brand-sunflower text-brand-forest px-3 rounded-full min-h-[44px]"
          >
            <Phone className="w-4 h-4" /> Need help? Call
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <ShoppingBag className="w-4 h-4" /> Order Online
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mt-3">Ready when you are</h1>
          <p className="mt-4 text-muted-foreground">
            Choose how you&apos;d like to order: pickup straight from the café or
            delivery through DoorDash.
          </p>
        </div>

        {/* Order-link buttons — equal weight; side by side on desktop, stacked
            full-width on mobile. */}
        <div className="mt-10 mx-auto max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <a
                href={CLOVER_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full min-h-[56px] px-6 rounded-full bg-brand-forest text-brand-cream text-lg font-bold shadow-lg hover:opacity-90 transition"
              >
                <ShoppingBag className="w-5 h-5" /> Order Pickup
              </a>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Direct from the café.
              </p>
            </div>

            <div>
              <a
                href={DOORDASH_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full min-h-[56px] px-6 rounded-full bg-brand-forest text-brand-cream text-lg font-bold shadow-lg hover:opacity-90 transition"
              >
                <Bike className="w-5 h-5" /> Order Delivery
              </a>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Delivered via DoorDash.
              </p>
            </div>
          </div>

          {/* Call fallback */}
          <p className="mt-6 text-center">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 text-primary font-semibold underline-offset-4 hover:underline min-h-[44px]"
            >
              <Phone className="w-4 h-4" /> Or call us to order: {BRAND.phone}
            </a>
          </p>
        </div>

        {/* Quick menu glance */}
        <div className="mt-12">
          <h2 className="font-heading text-2xl text-foreground mb-4 text-center">Popular picks</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {MENU.flatMap((c) => c.items)
              .filter((i) => i.popular)
              .map((item) => (
                <div key={item.name} className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                  <span className="font-heading text-lg text-foreground">{item.name}</span>
                  <span className="text-primary font-semibold">{item.price}</span>
                </div>
              ))}
          </div>
          <p className="text-center mt-6">
            <Link to="/menu" className="text-primary font-semibold underline-offset-4 hover:underline">
              See the full menu →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
