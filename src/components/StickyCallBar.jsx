import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND } from '@/lib/cafeData';
import { Phone, ShoppingBag } from 'lucide-react';

export default function StickyCallBar() {
  const location = useLocation();
  // Suppress on /order — the order CTA is that page's job (no double fixed bars).
  if (location.pathname === '/order') return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur-md">
      <div className="flex items-stretch gap-2 p-2">
        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full border-2 border-brand-forest text-brand-forest font-semibold text-sm"
        >
          <Phone className="w-4 h-4" /> Call Shop
        </a>
        <Link
          to="/order"
          className="flex-[1.4] inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full bg-primary text-primary-foreground font-semibold text-sm"
        >
          <ShoppingBag className="w-4 h-4" /> Order Now
        </Link>
      </div>
    </div>
  );
}