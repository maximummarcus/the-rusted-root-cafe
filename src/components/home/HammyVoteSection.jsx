import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/SectionHeading';
import { hammyIsLive, openVote } from '@/lib/hammy';

// Home page Hammy Awards promo — sits directly under the hero so it's the first
// thing after the fold. Renders nothing once voting closes (hammyIsLive), which
// restores the pre-campaign layout with no gap.
export default function HammyVoteSection() {
  if (!hammyIsLive()) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <div className="rounded-2xl border-2 border-brand-sunflower bg-secondary/40 px-6 py-10 md:py-12 text-center">
        <SectionHeading kicker="The Hammy Awards" title="Vote Us Best Bakery" center />
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          We&apos;re nominated for Best Bakery in the Smithfield Times Hammy Awards.
          Voting is quick - help us bring it home!
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openVote('home_section')}
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Vote for Us
          </button>
          <Link
            to="/menu#pastries"
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full border-2 border-brand-forest text-brand-forest font-semibold text-base hover:bg-brand-forest/10 transition-colors"
          >
            See Our Bakery
          </Link>
        </div>
      </div>
    </section>
  );
}
