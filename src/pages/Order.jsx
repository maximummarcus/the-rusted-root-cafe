import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLOVER_ORDER_URL, BRAND, MENU } from '@/lib/cafeData';
import Seo from '@/components/Seo';
import { Phone, ArrowLeft, ExternalLink, ShoppingBag } from 'lucide-react';

export default function Order() {
  const [frameFailed, setFrameFailed] = useState(false);
  const hasUrl = Boolean(CLOVER_ORDER_URL);

  const showFallback = !hasUrl || frameFailed;

  return (
    <>
      <Seo
        title="Order Online — The Rusted Root Cafe, Windsor VA"
        description="Order pickup online from The Rusted Root Cafe in Windsor, VA. Scratch-made café & bakery favorites, ready when you are."
      />

      {/* Native wrapper bar */}
      <div className="sticky top-[112px] md:top-[120px] z-30 bg-brand-forest text-brand-cream">
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

      {!showFallback ? (
        <div className="w-full bg-background">
          <iframe
            title="Online Ordering Portal"
            src={CLOVER_ORDER_URL}
            onError={() => setFrameFailed(true)}
            className="w-full border-0"
            style={{ height: 'calc(100vh - 170px)' }}
          />
        </div>
      ) : (
        <OrderFallback />
      )}
    </>
  );
}

function OrderFallback() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <ShoppingBag className="w-4 h-4" /> Order for Pickup
        </span>
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mt-3">Ready when you are</h1>
        <p className="mt-4 text-muted-foreground">
          Online ordering is powered by Clover. The quickest way to order right now is to
          give us a ring — we&apos;ll have it fresh and waiting.
        </p>

        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="mt-8 inline-flex items-center justify-center gap-3 min-h-[64px] w-full sm:w-auto px-10 rounded-full bg-primary text-primary-foreground text-xl font-bold shadow-lg hover:opacity-90 transition"
        >
          <Phone className="w-6 h-6" /> Tap to Call · {BRAND.phone}
        </a>

        {CLOVER_ORDER_URL && (
          <div className="mt-4">
            <a
              href={CLOVER_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold underline-offset-4 hover:underline"
            >
              Open online ordering <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Quick menu glance */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl text-foreground mb-4 text-center">Popular picks</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MENU.flatMap((c) => c.items)
            .filter((i) => i.popular)
            .map((item) => (
              <div key={item.name} className="flex items-center justify-between bg-card border border-border rounded-2xl px-4 py-3">
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

      {/* Config note for owner */}
      {!CLOVER_ORDER_URL && (
        <p className="mt-10 text-xs text-center text-muted-foreground italic">
          Setup note: add your Clover Online Ordering link to enable inline ordering.
        </p>
      )}
    </div>
  );
}