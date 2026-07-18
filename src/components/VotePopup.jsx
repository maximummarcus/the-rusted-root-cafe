import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { hammyIsLive, openVote } from '@/lib/hammy';

// Hammy Awards vote popup — shows on a visitor's FIRST page view, whatever page
// they land on (mounted once in Layout, which wraps every public route; the
// admin route doesn't use Layout so it can never appear there). Re-shows after
// 24h so a repeat visitor gets one gentle nudge per day, never per page.
// Auto-retires after HAMMY_VOTING_CLOSES via hammyIsLive().

const SEEN_KEY = 'rrc_hammy_popup_seen';
const SHOW_AGAIN_AFTER_MS = 24 * 60 * 60 * 1000;
const OPEN_DELAY_MS = 2000;

const readSeen = () => {
  try {
    const v = localStorage.getItem(SEEN_KEY);
    return v ? Number(v) : 0;
  } catch {
    // Storage blocked (private mode): treat as unseen. SPA navigation won't
    // retrigger it — worst case it reappears on a full reload.
    return 0;
  }
};

const markSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    /* storage blocked — nothing to persist */
  }
};

export default function VotePopup() {
  const [open, setOpen] = useState(false);
  const voteBtnRef = useRef(null);

  // Decide once on mount whether this visit earns the popup.
  useEffect(() => {
    if (!hammyIsLive()) return undefined;
    if (Date.now() - readSeen() < SHOW_AGAIN_AFTER_MS) return undefined;
    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // While open: lock page scroll, close on Escape, focus the primary action.
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    voteBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    markSeen();
    setOpen(false);
  };

  const vote = () => {
    // openVote logs the click and opens the ballot; count this as seen so the
    // popup doesn't chase someone who already voted.
    openVote('popup');
    dismiss();
  };

  if (!open) return null;

  return (
    // Above the header (z-50) and the sticky call bar (z-40).
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Vote for The Rusted Root in the Hammy Awards"
    >
      {/* Backdrop — click anywhere outside the card to dismiss. */}
      <button
        type="button"
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 bg-brand-forest/60 backdrop-blur-[2px] cursor-default"
      />

      <div className="relative w-full max-w-sm rounded-2xl border-2 border-brand-sunflower bg-background paper-texture shadow-xl px-6 pt-10 pb-6 text-center">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-2 right-2 inline-flex items-center justify-center w-11 h-11 rounded-full text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="font-script text-2xl md:text-3xl text-primary mb-1">The Hammy Awards</p>
        <h2 className="font-heading text-2xl md:text-3xl text-foreground tracking-tight">
          Help Us Win Best Bakery
        </h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          The Rusted Root is nominated for Best Bakery in the Smithfield Times Hammy
          Awards. Voting only takes a minute!
        </p>

        <button
          type="button"
          ref={voteBtnRef}
          onClick={vote}
          className="mt-5 w-full inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Vote for Us
        </button>

        <button
          type="button"
          onClick={dismiss}
          className="mt-3 inline-flex items-center justify-center min-h-[44px] px-4 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
