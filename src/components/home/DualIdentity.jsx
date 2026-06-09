import React from 'react';
import { IMG } from '@/lib/cafeData';
import { Coffee, Leaf } from 'lucide-react';

const cards = [
  {
    icon: Coffee,
    title: 'Café & Bakery',
    img: IMG.cinnamonRollsTray,
    alt: 'Tray of freshly iced scratch-made cinnamon rolls',
    body: 'Scratch-made bagels, paninis, salads, homemade chicken salad, cinnamon rolls, almond croissants. Fresh every day.',
  },
  {
    icon: Leaf,
    title: 'Plants & Home Decor',
    img: IMG.diningArea,
    alt: 'Dining area with houseplants and decor for sale at The Rusted Root Cafe',
    body: 'Browse leafy houseplants and cozy home goods while you sip. Take a little something green home with you.',
  },
];

export default function DualIdentity() {
  return (
    <section className="max-w-[120rem] mx-auto px-6 py-14 md:py-20">
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.title}
            className="relative overflow-hidden shadow-lg rounded-lg"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={c.img} alt={c.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/30 to-transparent" />
            <div className="absolute bottom-0 p-6 text-brand-cream">
              <div className="flex items-center gap-2 mb-2">
                <c.icon className="w-6 h-6 text-brand-sunflower" />
                <h3 className="font-heading text-2xl md:text-3xl">{c.title}</h3>
              </div>
              <p className="text-brand-cream/90 max-w-md">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}