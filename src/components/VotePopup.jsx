import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { hammyIsLive, openVote } from '@/lib/hammy';

// Hammy Awards vote nudge — a NON-BLOCKING slide-in, not an arrival modal.
//
// Why the change: session replays showed the old 2s full-screen modal getting
// reflex-dismissed (X / "Maybe later") almost every time. An interstitial that
// interrupts a cold visitor before they care about the cafe trains people to
// kill it on sight. This version instead waits until the visitor has actually
// engaged, then slides a small card up from the corner that never locks scroll
// or covers the page — it asks a warm visitor, and it's easy to ignore rather
// than demanding to be dismissed.
//
// Triggers (whichever fires first, once per visit): desktop exit-intent (cursor
// leaves toward the tab bar), ~50% scroll depth, or 30s dwell. Shows once per
// 24h per browser. Auto-retires after HAMMY_VOTING_CLOSES via hammyIsLive().
//
// Mounted once in Layout (wraps every public route; admin route has no Layout,
// so it never appears there). Positioned ABOVE the z-40 mobile sticky call bar
// so the two never overlap — see StickyCallBar / mobile dual-bottom-bar rule.

const SEEN_KEY = 'rrc_hammy_popup_seen';
const SHOW_AGAIN_AFTER_MS = 24 * 60 * 60 * 1000;
const DWELL_MS = 30 * 1000;
const SCROLL_TRIGGER = 0.5; // fraction of the page scrolled
const ANIM_MS = 300;

const readSeen = () => {
  try {
    const v = localStorage.getItem(SEEN_KEY);
    return v ? Number(v) : 0;
  } catch {
    // Storage blocked (private mode): treat as unseen. Worst case it reappears
    // on a future full reload.
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
  const [entered, setEntered] = useState(false); // drives the slide/fade in

  // Guards so the nudge can only trigger once per mount, no matter which of the
  // racing listeners (exit-intent / scroll / timer) fires first.
  const firedRef = useRef(false);

  // Arm the triggers on mount (only if voting is live and we haven't nudged in
  // the last 24h). Whichever condition hits first opens the card, then all
  // listeners are torn down.
  useEffect(() => {
    if (!hammyIsLive()) return undefined;
    if (Date.now() - readSeen() < SHOW_AGAIN_AFTER_MS) return undefined;

    let dwellTimer;

    const trigger = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      cleanup();
      setOpen(true);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return; // nothing to scroll — leave it to the timer
      if (window.scrollY / scrollable >= SCROLL_TRIGGER) trigger();
    };

    // Desktop only: cursor exiting the top of the viewport reads as leaving.
    const onMouseOut = (e) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    function cleanup() {
      window.clearTimeout(dwellTimer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onMouseOut);
    }

    dwellTimer = window.setTimeout(trigger, DWELL_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseout', onMouseOut);

    return cleanup;
  }, []);

  // Animate in on the frame after we mount the card.
  useEffect(() => {
    if (!open) return undefined;
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  // Close on Escape while showing. No scroll lock, no focus trap — this is a
  // non-blocking toast, not a modal; it must never hijack the page.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Animate out, then unmount. markSeen() starts the 24h cooldown.
  const dismiss = () => {
    markSeen();
    setEntered(false);
    window.setTimeout(() => setOpen(false), ANIM_MS);
  };

  const vote = () => {
    // Logs the click (tagged 'popup') and opens the ballot in a new tab.
    openVote('popup');
    dismiss();
  };

  if (!open) return null;

  return (
    // Above the z-40 sticky call bar; below the z-50 header. On mobile it sits
    // clear of the call bar (64px + safe-area); on desktop it tucks bottom-right.
    <div
      className={`fixed z-[45] left-4 right-4 md:left-auto md:right-6 md:max-w-sm
        bottom-[calc(64px+env(safe-area-inset-bottom)+12px)] md:bottom-6
        transition-all ease-out
        ${entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      style={{ transitionDuration: `${ANIM_MS}ms` }}
      role="dialog"
      aria-modal="false"
      aria-label="Vote for The Rusted Root in the Hammy Awards"
    >
      <div className="relative rounded-2xl border-2 border-brand-sunflower bg-background paper-texture shadow-xl px-5 pt-5 pb-5 pr-10">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-1.5 right-1.5 inline-flex items-center justify-center w-11 h-11 rounded-full text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="font-script text-xl text-primary leading-none mb-1">The Hammy Awards</p>
        <h2 className="font-heading text-lg md:text-xl text-foreground tracking-tight">
          Enjoying The Rusted Root?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          We&apos;re nominated for Best Bakery in the Smithfield Times Hammy Awards. A quick
          vote would mean a lot &mdash; it only takes a minute.
        </p>

        <button
          type="button"
          onClick={vote}
          className="mt-4 w-full inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Vote for Us
        </button>
      </div>
    </div>
  );
}
