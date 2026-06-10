import React from 'react';
import Seo from '@/components/Seo';
import Hero from '@/components/home/Hero';
import RootWayIntro from '@/components/home/RootWayIntro';
import MostLoved from '@/components/home/MostLoved';
import DualIdentity from '@/components/home/DualIdentity';
import HoursLocationCard from '@/components/HoursLocationCard';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import SectionHeading from '@/components/SectionHeading';

export default function Home() {
  return (
    <>
      <Seo
        title="The Rusted Root Cafe: Café, Scratch Bakery & Plant Shop in Windsor, VA"
        description="The Rusted Root Cafe in Windsor, VA: a from-scratch café & bakery and houseplant & home-decor shop. Gather. Grow. Get Rooted! Order online, dine in, or grab & go."
      />
      <LocalBusinessSchema />
      <Hero />
      <RootWayIntro />
      <MostLoved />
      <DualIdentity />
      {/* pb stays small here: the footer's global mt-16 supplies the rest of the
          gap, keeping the total at the same py-16/24 rhythm as the sections above. */}
      <section className="max-w-[120rem] mx-auto px-6 pb-0 md:pb-8">
        <SectionHeading kicker="Stop By" title="Hours & Location" center className="mb-8" />
        <HoursLocationCard showMap />
      </section>
    </>
  );
}