import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import { hammyIsLive, openVote } from '@/lib/hammy';

// Dedicated Hammy Awards page behind the "Vote" nav tab (owner request). The
// tab itself disappears from the nav once voting closes (see NAV_LINKS in
// cafeData.js); this route stays live for bookmarks and swaps to a thank-you.
// Layout supplies the fixed-header clearance for this route automatically.
export default function Vote() {
  const live = hammyIsLive();

  return (
    <>
      <Seo
        title="Vote | The Rusted Root Cafe - Windsor, VA"
        description="The Rusted Root Cafe is nominated for Best Bakery in the Smithfield Times Hammy Awards. Cast your vote for our scratch bakery in Windsor, VA."
      />
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 text-center">
        {live ? (
          <>
            <SectionHeading as="h1" kicker="The Hammy Awards" title="Vote Us Best Bakery" center />
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              The Rusted Root Cafe is nominated for Best Bakery in the Smithfield Times
              Hammy Awards, the paper&apos;s annual reader-voted celebration of local
              favorites. Winners are chosen by readers like you - find the Best Bakery
              category on the ballot and cast your vote for The Rusted Root!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openVote('nav_tab')}
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
              >
                Vote for Us Now
              </button>
              <Link
                to="/menu#pastries"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border-2 border-brand-forest text-brand-forest font-semibold text-base hover:bg-brand-forest/10 transition-colors"
              >
                See Our Bakery
              </Link>
            </div>
            <p className="mt-8 font-script text-2xl md:text-3xl text-primary">
              Every vote counts. Thank you!
            </p>
          </>
        ) : (
          <>
            <SectionHeading as="h1" kicker="The Hammy Awards" title="Thank You for Voting" center />
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Voting for this year&apos;s Hammy Awards has closed. Thank you to everyone
              who cast a vote for our scratch bakery - it means the world to us!
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/menu#pastries"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
              >
                See Our Bakery
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
