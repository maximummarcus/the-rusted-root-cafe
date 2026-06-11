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

  // Build category list. Specials sits between Sprouts (Kids) and Grab N Go
  // on the page; insert the matching tab in the same slot so smooth-scroll
  // matches the visible order.
  const tabs = [
    { key: 'most-ordered', name: 'Most Ordered' },
    ...MENU.flatMap((c) => {
      const tab = { key: c.key, name: c.name };
      return c.key === 'sprouts' ? [tab, { key: 'specials', name: 'Specials' }] : [tab];
    }),
  ];

  const scrollTo = (key) => {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Seo
        title="Menu | The Rusted Root Cafe"
        description="Breakfast sandwiches, paninis, salads, scratch-baked pastries, and espresso drinks at The Rusted Root Cafe in Windsor, VA. See the full menu and prices."
      />
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6 text-center">
        <SectionHeading as="h1" kicker="The Root Way" title="Our Menu" center />
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Made from scratch, served with a smile. Tap the&nbsp;+ on any item to start an order.
        </p>
      </div>

      {/* Sticky category tabs — pinned just under the fixed header. */}
      <div className="sticky top-[var(--header-h)] z-30 bg-background/95 backdrop-blur-md border-y border-border">
        <div className="max-w-5xl mx-auto px-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => scrollTo(t.key)}
                className="shrink-0 min-h-[44px] px-4 rounded-full text-sm font-semibold whitespace-nowrap bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
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

            {/* Specials slot — rendered between Sprouts (Kids) and Grab N Go.
                Pulled from the Base44 Special entity so the owner can rotate
                monthly without a code change. */}
            {c.key === 'sprouts' && (
              <section id="specials" className="scroll-mt-32 py-8 border-b border-border/50">
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
            )}

            {/* Homemade Lemonade sub-section, rendered inside Specialty Drinks. */}
            {c.key === 'specialty-drinks' && c.lemonade && (
              <div className="-mt-4 pb-8 border-b border-border/50">
                <h3 className="font-heading text-xl text-foreground mb-3">{c.lemonade.heading}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-semibold text-foreground">Flavors:</span>{' '}
                  {c.lemonade.flavors.join(', ')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  {c.lemonade.addOns.map((a) => (
                    <li key={a.name}>
                      <span className="font-semibold text-foreground">{a.name}</span>{' '}
                      <span className="text-primary font-semibold">{a.price}</span>
                      {a.detail && <span> ({a.detail})</span>}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <img
                    src={IMG.lemonadeMenu}
                    alt="Homemade Lemonade flavor menu: strawberry, blackberry, lavender, watermelon and more"
                    loading="lazy"
                    className="block w-full max-w-[220px] h-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}