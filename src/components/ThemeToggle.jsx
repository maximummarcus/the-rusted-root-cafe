import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { Feather, Square } from 'lucide-react';

export default function ThemeToggle({ compact = false }) {
  const { theme, selectTheme } = useTheme();
  const isModern = theme === 'modern';

  // Compact (mobile header): the two-segment pill costs ~96px that the tab row
  // can't spare below md, so it collapses to ONE icon-only button that flips to
  // the other theme — the second segment is redundant there since a single tap
  // target reaches both states. Fixed 44x44 in BOTH themes (>=44px tap target,
  // zero layout shift on flip); the icon shows the current theme, the label
  // names the action.
  if (compact) {
    return (
      <button
        type="button"
        onClick={() => selectTheme(isModern ? 'handdrawn' : 'modern')}
        aria-label={isModern ? 'Switch to Hand-Drawn theme' : 'Switch to Modern theme'}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground select-none"
      >
        {isModern ? <Square className="w-4 h-4" /> : <Feather className="w-4 h-4" />}
      </button>
    );
  }

  // Each side is its OWN real <button> with an explicit target theme (no toggle-only or
  // hover/mousedown logic), so a tap always SETS that theme — reliable on touch, not just
  // mouse. Tap area is >= 44px tall (min-h) via the button's own sizing, while the bar
  // stays the same 44px height.
  const sideBase =
    'relative z-10 inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full text-xs font-semibold transition-colors w-[88px]';

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="relative inline-flex items-center rounded-full border border-border bg-card px-1 shadow-sm select-none"
    >
      {/* Sliding pill — purely decorative; pointer-events-none so it can never swallow a
          tap meant for the buttons sitting above it (z-10). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ease-out"
        style={{
          width: 'calc(50% - 4px)',
          left: isModern ? 'calc(50%)' : '4px',
        }}
      />
      <button
        type="button"
        onClick={() => selectTheme('handdrawn')}
        aria-pressed={!isModern}
        aria-label="Hand-Drawn theme"
        className={`${sideBase} ${!isModern ? 'text-primary-foreground' : 'text-muted-foreground'}`}
      >
        <Feather className="w-3.5 h-3.5" />
        Hand-Drawn
      </button>
      <button
        type="button"
        onClick={() => selectTheme('modern')}
        aria-pressed={isModern}
        aria-label="Modern theme"
        className={`${sideBase} ${isModern ? 'text-primary-foreground' : 'text-muted-foreground'}`}
      >
        <Square className="w-3.5 h-3.5" />
        Modern
      </button>
    </div>
  );
}
