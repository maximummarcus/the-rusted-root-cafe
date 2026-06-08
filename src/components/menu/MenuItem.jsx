import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

export default function MenuItem({ item }) {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  return (
    <div
      className={`flex items-center gap-4 p-3 ${
        isModern ? 'bg-card border border-border rounded-md shadow-sm' : ''
      }`}
    >
      {item.img && (
        <div className={`w-16 h-16 shrink-0 overflow-hidden ${isModern ? 'rounded-md' : 'rounded-2xl'}`}>
          {/* PLACEHOLDER IMAGE: replace with real photo */}
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-lg text-foreground">{item.name}</span>
          {!isModern && <span className="flex-1 dotted-leader translate-y-[-4px]" />}
          <span className="font-semibold text-primary whitespace-nowrap">{item.price}</span>
        </div>
        {item.desc && <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>}
        {item.popular && (
          <span className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-wide text-brand-coffee bg-brand-sunflower/30 px-2 py-0.5 rounded-full">
            Popular
          </span>
        )}
      </div>
      <Link
        to="/order"
        aria-label={`Add ${item.name} via online ordering`}
        className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
      >
        <Plus className="w-5 h-5" />
      </Link>
    </div>
  );
}