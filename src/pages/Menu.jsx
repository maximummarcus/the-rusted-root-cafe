import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MENU, MOST_LOVED, IMG } from '@/lib/cafeData';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import MenuCategory from '@/components/menu/MenuCategory';
import MenuItem from '@/components/menu/MenuItem';
import SpecialCard from '@/components/specials/SpecialCard';
import { useAvailability } from '@/hooks/useAvailability';

export default function Menu() {
  const [specials, setSpecials] = useState([]);
  const { isSoldOut } = useAvailability();

  useEffect(() => {
    base44.entities.Special.filter({ active: true }, 'sort_order')
      .then(setSpecials)
      .catch(() => setSpecials([]));
  }, []);

  // Build category list including Most Ordered (top) and Specials (bottom)
  const tabs = [
    { key: 'most-ordered', name: 'Most Ordered' },
    ...MENU.map((c) => ({ key: c.key, name: c.name })),
    { key: 'specials', name: 'Specials' },
  ];

  const scrollTo = (key) => {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Seo
        title="Menu — The Rusted Root Cafe, Windsor VA"
        description="Browse the menu at The Rusted Root Cafe in Windsor, VA: breakfast, paninis, sandwiches, wraps, salads, scratch-made pastries, specialty drinks, limeade and more."
      />
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6 text-center">
        <SectionHeading kicker="The Root Way" title="Our Menu" center />
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Made from scratch, served with a smile. Tap the&nbsp;+ to add an item through online ordering.
        </p>
      </div>

      {/* Sticky category tabs */}
      <div className="sticky top-[112px] md:top-[120px] z-30 bg-background/95 backdrop-blur-md border-y border-border">
        <div className="max-w-5xl mx-auto px-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => scrollTo(t.key)}
                className="shrink-0 min-h-[40px] px-4 rounded-full text-sm font-semibold whitespace-nowrap bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Most Ordered */}
        <section id="most-ordered" className="scroll-mt-32 py-8 border-b border-border/50">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Most Ordered</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {MOST_LOVED.map((item) => (
              <MenuItem key={item.name} item={{ ...item, popular: true }} soldOut={isSoldOut(item.name)} />
            ))}
          </div>
        </section>

        {MENU.map((c) => (
          <React.Fragment key={c.key}>
            <MenuCategory category={c} isSoldOut={isSoldOut} />
            {c.key === 'limeade' && (
              <div className="pb-6 -mt-3 flex justify-center">
                <img
                  src={IMG.lemonadeMenu}
                  alt="Homemade Lemonade flavor menu — strawberry, peach, blackberry, lavender and more"
                  loading="lazy"
                  className="block w-full max-w-[220px] h-auto object-contain rounded-lg shadow-sm"
                />
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Specials pulled from entity */}
        <section id="specials" className="scroll-mt-32 py-8">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Specials</h2>
          {specials.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specials.map((s) => (
                <SpecialCard key={s.id} special={s} />
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-muted-foreground bg-secondary/60 border border-dashed border-border rounded-lg px-4 py-3">
              Check back for this month&apos;s specials.
            </p>
          )}
        </section>
      </div>
    </>
  );
}