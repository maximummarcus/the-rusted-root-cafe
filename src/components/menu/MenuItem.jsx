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
      className={`flex items-center gap-4 p-3 min-h-[88px] ${
        isModern ? 'bg-card border border-border rounded-md shadow-sm' : ''
      } ${soldOut ? 'opacity-70' : ''}`}
    >
      {/* Photo thumbnail only when the item has one; items without a photo are
          text-only — no placeholder tile. min-h-[88px] above (64px thumb + p-3)
          keeps both variants on the same height rhythm in the grid. The fixed
          w-16 h-16 box plus the intrinsic width/height attrs mean the image can
          never cause layout shift while it lazy-loads. */}
      {item.img && (
        <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-lg">
          <img
            src={item.img}
            alt={item.imgAlt || item.name}
            loading="lazy"
            decoding="async"
            width={800}
            height={800}
            className={`w-full h-full object-cover ${soldOut ? 'grayscale' : ''}`}
          />
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
