import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { Feather, Square } from 'lucide-react';

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const isModern = theme === 'modern';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Switch between Hand-Drawn and Modern themes"
      className="group relative inline-flex items-center rounded-full border border-border bg-card p-1 shadow-sm min-h-[44px] select-none"
    >
      {/* sliding pill */}
      <span
        className="absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ease-out"
        style={{
          width: 'calc(50% - 4px)',
          left: isModern ? 'calc(50%)' : '4px',
        }}
      />
      <span
        className={`relative z-10 flex items-center justify-center gap-1.5 w-[88px] py-1.5 rounded-full text-xs font-semibold transition-colors ${
          !isModern ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Feather className="w-3.5 h-3.5" />
        {!compact && 'Hand-Drawn'}
      </span>
      <span
        className={`relative z-10 flex items-center justify-center gap-1.5 w-[88px] py-1.5 rounded-full text-xs font-semibold transition-colors ${
          isModern ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Square className="w-3.5 h-3.5" />
        {!compact && 'Modern'}
      </span>
    </button>
  );
}