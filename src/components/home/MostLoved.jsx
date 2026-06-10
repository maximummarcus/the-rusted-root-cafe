import React from 'react';
import { Link } from 'react-router-dom';
import { MOST_LOVED } from '@/lib/cafeData';
import SectionHeading from '@/components/SectionHeading';

export default function MostLoved() {
  // Homepage strip shows photographed items only; null-img items stay in
  // MOST_LOVED (cafeData.js) awaiting their photo swap.
  const items = MOST_LOVED.filter((item) => item.img);

  return (
    <section className="bg-brand-sage/25 py-14 md:py-20">
      <div className="max-w-[120rem] mx-auto px-6">
        <SectionHeading kicker="Most Loved" title="Neighborhood favorites" center />
        <div className="mt-10 flex gap-5 overflow-x-auto no-scrollbar pb-2 md:flex-wrap md:justify-center md:overflow-visible">
          {items.map((item) => (
            <Link
              to="/menu"
              key={item.name}
              className="group shrink-0 w-56 md:w-64 bg-card overflow-hidden shadow-md hover:shadow-xl transition rounded-lg"
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