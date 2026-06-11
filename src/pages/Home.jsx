import React from 'react';
import Seo from '@/components/Seo';
import Hero from '@/components/home/Hero';
import RootWayIntro from '@/components/home/RootWayIntro';
import MostLoved from '@/components/home/MostLoved';
import HoursLocationCard from '@/components/HoursLocationCard';
import SectionHeading from '@/components/SectionHeading';

export default function Home() {
  return (
    <>
      <Seo
        title="The Rusted Root Cafe | Café & Scratch Bakery in Windsor, VA"
        description="The Rusted Root Cafe in Windsor, VA: a homey from-scratch café & bakery. Gather. Grow. Get Rooted! Order online, dine in, or grab & go."
      />
      <Hero />
      <RootWayIntro />
      <MostLoved />
      {/* pt carries the gap below the MostLoved band (sections above each bring
          their own py-14 md:py-20). pb stays small: the footer's global mt-16
          (64px) supplies most of the bottom gap; pb-0/md:pb-4 brings the total
          to ~64px mobile / 80px desktop, matching the same rhythm. */}
      <section className="max-w-[120rem] mx-auto px-6 pt-14 md:pt-20 pb-0 md:pb-4">
        <SectionHeading kicker="Stop By" title="Hours & Location" center className="mb-8" />
        <HoursLocationCard showMap />
      </section>
    </>
  );
}