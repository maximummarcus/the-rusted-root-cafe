import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function SectionHeading({ kicker, title, center = false, className = '', as: Tag = 'h2' }) {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  return (
    <div className={`${center ? 'text-center mx-auto' : ''} ${className}`}>
      {kicker && (
        <p
          className={
            isModern
              ? 'text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2'
              : 'font-script text-2xl md:text-3xl text-primary mb-1'
          }
        >
          {kicker}
        </p>
      )}
      <Tag
        className={`font-heading text-3xl md:text-5xl text-foreground tracking-tight ${
          isModern ? 'font-semibold uppercase tracking-wide' : 'font-light'
        }`}
      >
        {title}
      </Tag>
    </div>
  );
}