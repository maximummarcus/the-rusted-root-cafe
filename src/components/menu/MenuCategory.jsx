import React from 'react';
import MenuItem from '@/components/menu/MenuItem';

export default function MenuCategory({ category }) {
  const hasItems = category.items && category.items.length > 0;

  return (
    <section id={category.key} className="scroll-mt-32 py-8 border-b border-border/50 last:border-0">
      <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">{category.name}</h2>

      {hasItems ? (
        <div className="grid gap-3 md:grid-cols-2">
          {category.items.map((item) => (
            <MenuItem key={item.name} item={item} />
          ))}
        </div>
      ) : null}

      {category.note && (
        <p className="mt-4 text-sm italic text-muted-foreground bg-secondary/60 border border-dashed border-border rounded-lg px-4 py-3">
          {hasItems ? category.note : `Menu items coming — ${category.note.replace(/^.*coming — /, '')}`}
        </p>
      )}

      {!hasItems && !category.note && (
        <p className="mt-2 text-sm italic text-muted-foreground bg-secondary/60 border border-dashed border-border rounded-lg px-4 py-3">
          Menu items coming — add from Clover.
        </p>
      )}
    </section>
  );
}