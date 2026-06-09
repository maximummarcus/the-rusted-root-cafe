import React from 'react';
import { Link } from 'react-router-dom';
import { MOST_LOVED } from '@/lib/cafeData';
import SectionHeading from '@/components/SectionHeading';
import { useTheme } from '@/lib/ThemeContext';

export default function MostLoved() {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  return (
    <section className="bg-brand-sage/25 py-14 md:py-20">
      <div className="max-w-[120rem] mx-auto px-6">
        <SectionHeading kicker="Most Loved" title="Neighborhood favorites" center />
        <div className="mt-10 flex gap-5 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-5 md:overflow-visible">
          {MOST_LOVED.map((item) => (
            <Link
              to="/menu"
              key={item.name}
              className={`group shrink-0 w-56 md:w-auto bg-card overflow-hidden shadow-md hover:shadow-xl transition ${
                isModern ? 'rounded-md' : 'rounded-3xl'
              }`}
            >
              <div className="aspect-square overflow-hidden">
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary/40 border-2 border-dashed border-border flex flex-col items-center justify-center p-4 text-center gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Image coming soon
                    </span>
                    <span className={`leading-tight text-primary ${isModern ? 'font-heading font-semibold text-base' : 'font-script text-xl'}`}>
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading text-lg text-foreground">{item.name}</h3>
                <p className="text-primary font-semibold mt-1">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}