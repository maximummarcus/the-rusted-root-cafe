import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import SpecialCard from '@/components/specials/SpecialCard';
import { Loader2 } from 'lucide-react';

// Balance the specials grid by item count so a lone special never sits in a row
// with empty columns: 1 centers at a card's natural width; 2 (and 4) fill a
// centered 2-col block, so 4 lays out 2x2 instead of orphaning a 4th card on a
// lone second row in the 3-up grid at desktop (1280px); 3 and 5+ fill the
// standard responsive grid. Card size stays consistent across counts, and the
// classes are theme-agnostic (SpecialCard owns theming).
function specialsGridClass(count) {
  if (count === 1) return 'grid grid-cols-1 max-w-sm mx-auto';
  if (count === 2 || count === 4) return 'grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto';
  return 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3';
}

export default function Specials() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only active specials, ordered by the admin's manual sort_order (ascending).
    base44.entities.Special.filter({ active: true }, 'sort_order')
      .then(setSpecials)
      .catch(() => setSpecials([]))
      .finally(() => setLoading(false));
  }, []);

  const food = specials.filter((s) => s.type !== 'drink');
  const drinks = specials.filter((s) => s.type === 'drink');

  return (
    <>
      <Seo
        title="Monthly Specials: The Rusted Root Cafe, Windsor VA"
        description="See this month's food and drink specials at The Rusted Root Cafe in Windsor, VA. Limited-time, made-from-scratch favorites."
      />
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <SectionHeading kicker="Limited Time" title="This Month's Specials" center />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : specials.length === 0 ? (
          <p className="text-center text-muted-foreground bg-secondary/60 border border-dashed border-border rounded-lg px-6 py-10 max-w-lg mx-auto">
            Check back for this month&apos;s specials. We change them up often!
          </p>
        ) : (
          <div className="space-y-12">
            {food.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl text-foreground mb-5">Food Specials</h2>
                <div className={specialsGridClass(food.length)}>
                  {food.map((s) => (
                    <SpecialCard key={s.id} special={s} />
                  ))}
                </div>
              </div>
            )}
            {drinks.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl text-foreground mb-5">Drink Specials</h2>
                <div className={specialsGridClass(drinks.length)}>
                  {drinks.map((s) => (
                    <SpecialCard key={s.id} special={s} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}