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
      <section className="max-w-[120rem] mx-auto px-6 pb-16 md:pb-24">
        <SectionHeading kicker="Stop By" title="Hours & Location" center className="mb-8" />
        <HoursLocationCard />
      </section>
    </>
  );
}