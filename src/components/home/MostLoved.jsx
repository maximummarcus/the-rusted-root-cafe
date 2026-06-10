import React from 'react';
import { Link } from 'react-router-dom';
import { MOST_LOVED } from '@/lib/cafeData';
import SectionHeading from '@/components/SectionHeading';

export default function MostLoved() {
  // Curated home strip: photographed favorites that carry a price, capped at
  // exactly 3 so the row stays balanced (a 4th card orphan-wrapped onto a lone
  // second row). Requiring a price keeps the trio consistent — every card shows
  // one — and intentionally holds back the price-less "Fresh-Baked Cinnamon
  // Rolls" favorite *here only*: it still appears in the Menu's Most Ordered
  // strip and as a menu item (MOST_LOVED is shared, so it is left untouched).
  // The cap also prevents a regression if the photo-less favorites gain photos.
  const items = MOST_LOVED.filter((item) => item.img && item.price).slice(0, 3);

  return (
    <section className="bg-brand-sage/25 py-14 md:py-20">
      <div className="max-w-[120rem] mx-auto px-6">
        <SectionHeading kicker="Most Loved" title="Neighborhood favorites" center />
        {/* Vertical stack below md (one card per row, centered) → balanced 3-col grid at
            md+. No horizontal carousel, so nothing clips off the right edge on phones. */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-sm md:max-w-5xl mx-auto">
          {items.map((item) => (
            <Link
              to="/menu"
              key={item.name}
              className="group bg-card overflow-hidden shadow-md hover:shadow-xl transition rounded-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading text-lg text-foreground">{item.name}</h3>
                {item.price && <p className="text-primary font-semibold mt-1">{item.price}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}