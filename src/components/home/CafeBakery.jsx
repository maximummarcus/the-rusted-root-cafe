import React from 'react';
import { IMG } from '@/lib/cafeData';
import { Coffee } from 'lucide-react';

export default function CafeBakery() {
  return (
    <section className="max-w-[120rem] mx-auto px-6 py-14 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden shadow-lg rounded-lg">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={IMG.cinnamonRollsTray}
              alt="Tray of freshly iced scratch-made cinnamon rolls"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/30 to-transparent" />
          <div className="absolute bottom-0 p-6 text-brand-cream">
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="w-6 h-6 text-brand-sunflower" />
              <h3 className="font-heading text-2xl md:text-3xl">Café &amp; Bakery</h3>
            </div>
            <p className="text-brand-cream/90 max-w-md">
              Scratch-made bagels, paninis, salads, homemade chicken salad, cinnamon rolls,
              almond croissants. Fresh every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
