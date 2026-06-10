import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

export default function MenuItem({ item, soldOut = false }) {
  const { theme } = useTheme();
  const isModern = theme === 'modern';
  const hasPrice = item.price != null && item.price !== '' && item.price !== '-';

  return (
    <div
      className={`flex items-center gap-4 p-3 ${
        isModern ? 'bg-card border border-border rounded-md shadow-sm' : ''
      } ${soldOut ? 'opacity-70' : ''}`}
    >
      {'img' in item && (
        <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-lg">
          {item.img ? (
            <img src={item.img} alt={item.imgAlt || item.name} loading="lazy" className={`w-full h-full object-cover ${soldOut ? 'grayscale' : ''}`} />
          ) : (
            <div className="w-full h-full bg-secondary/40 border border-dashed border-border flex items-center justify-center p-1 text-center">
              <span className="text-[8px] font-semibold uppercase tracking-tight text-muted-foreground leading-[1.15]">
                Image<br />coming<br />soon
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {/* Below md: name (max 2 lines) stacks above the price, so a long name no longer
            wraps to 3 squeezed lines beside the thumbnail; the dotted leader is dropped.
            md+ keeps the single baseline row (name · leader · price) unchanged. */}
        <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
          <span className="font-heading text-lg text-foreground line-clamp-2 md:line-clamp-none">{item.name}</span>
          {hasPrice && !isModern && <span className="hidden md:block flex-1 dotted-leader translate-y-[-4px]" />}
          {hasPrice && <span className="font-semibold text-primary whitespace-nowrap mt-0.5 md:mt-0">{item.price}</span>}
        </div>
        {item.desc && <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>}
        <div className="flex items-center gap-2 mt-1">
          {soldOut && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-white bg-red-600 px-2 py-0.5 rounded-full">
              Sold Out
            </span>
          )}
          {item.popular && !soldOut && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-brand-coffee bg-brand-sunflower/30 px-2 py-0.5 rounded-full">
              Popular
            </span>
          )}
        </div>
      </div>
      {soldOut ? (
        <span
          aria-label={`${item.name} is sold out`}
          className="shrink-0 inline-flex items-center justify-center px-3 h-11 rounded-full bg-muted text-muted-foreground text-xs font-semibold uppercase cursor-not-allowed"
        >
          Sold Out
        </span>
      ) : (
        <Link
          to="/order"
          role="button"
          aria-label={`Order ${item.name}`}
          onKeyDown={(e) => {
            // role="button" implies Space activates it; anchors only do so on
            // Enter, so bridge Space to a click without disturbing Enter/click.
            if (e.key === ' ') {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}
