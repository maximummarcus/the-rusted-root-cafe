import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { Coffee, UtensilsCrossed } from 'lucide-react';

export default function SpecialCard({ special }) {
  const { theme } = useTheme();
  const isModern = theme === 'modern';
  const Icon = special.type === 'drink' ? Coffee : UtensilsCrossed;

  return (
    <div
      className={`bg-card overflow-hidden shadow-md border-2 border-brand-sunflower ${
        isModern ? 'rounded-md' : 'rounded-3xl hd-tilt'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        {special.image_url ? (
          /* PLACEHOLDER IMAGE: replace with real photo */
          <img src={special.image_url} alt={special.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Icon className="w-10 h-10" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-coffee bg-brand-sunflower/30 px-2 py-0.5 rounded-full">
            {special.type === 'drink' ? 'Drink Special' : 'Food Special'}
          </span>
          {special.month_label && (
            <span className="text-xs text-muted-foreground">{special.month_label}</span>
          )}
        </div>
        <h3 className="font-heading text-xl text-foreground">{special.title}</h3>
        {special.description && (
          <p className="text-sm text-muted-foreground mt-1">{special.description}</p>
        )}
        {special.price && <p className="text-primary font-semibold mt-2">{special.price}</p>}
      </div>
    </div>
  );
}