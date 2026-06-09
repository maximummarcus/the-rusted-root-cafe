import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, MENU, CLOVER_ORDER_URL, DOORDASH_ORDER_URL } from '@/lib/cafeData';
import Seo from '@/components/Seo';
import { Phone, ArrowLeft, ShoppingBag } from 'lucide-react';

// Ordering provider links live in src/lib/cafeData.js (single source of truth).
// While a link is blank the button below renders disabled ("coming soon");
// pasting the real URL there makes it go live automatically.
const isLiveUrl = (url) => Boolean(url) && url !== '#';

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
            Choose how you&apos;d like to order: pick up direct from the café or get it
            through DoorDash.
          </p>
        </div>

        {/* Order-link buttons — stack full-width on mobile */}
        <div className="mt-10 mx-auto max-w-md flex flex-col gap-6">
          {/* Primary — order direct via Clover */}
          <div>
            {isLiveUrl(CLOVER_ORDER_URL) ? (
              <a
                href={CLOVER_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full min-h-[56px] px-8 rounded-full bg-brand-forest text-brand-cream text-lg font-bold shadow-lg hover:opacity-90 transition"
              >
                <ShoppingBag className="w-5 h-5" /> Order for Pickup
              </a>
            ) : (
              <div
                aria-disabled="true"
                className="flex items-center justify-center gap-3 w-full min-h-[56px] px-8 rounded-full bg-muted text-muted-foreground text-lg font-bold cursor-not-allowed select-none"
              >
                <ShoppingBag className="w-5 h-5" /> Online ordering coming soon
              </div>
            )}
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Order direct from The Rusted Root.
            </p>
          </div>

          {/* Secondary — DoorDash (red accent, text-only, no trademarked logo) */}
          <div>
            {isLiveUrl(DOORDASH_ORDER_URL) ? (
              <a
                href={DOORDASH_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#FF3008' }}
                className="flex items-center justify-center gap-3 w-full min-h-[56px] px-8 rounded-full text-white text-lg font-bold shadow-lg hover:opacity-90 transition"
              >
                Order on DoorDash
              </a>
            ) : (
              <div
                aria-disabled="true"
                className="flex items-center justify-center gap-3 w-full min-h-[56px] px-8 rounded-full bg-muted text-muted-foreground text-lg font-bold cursor-not-allowed select-none"
              >
                Online ordering coming soon
              </div>
            )}
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Pickup or delivery via DoorDash.
            </p>
          </div>

          {/* Call fallback */}
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 text-primary font-semibold underline-offset-4 hover:underline min-h-[44px]"
          >
            <Phone className="w-4 h-4" /> Or call us to order: {BRAND.phone}
          </a>
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
