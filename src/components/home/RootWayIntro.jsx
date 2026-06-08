import React from 'react';
import { BRAND } from '@/lib/cafeData';
import SectionHeading from '@/components/SectionHeading';

export default function RootWayIntro() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-14 md:py-20 text-center">
      <SectionHeading kicker="The Root Way" title="Welcome, neighbor" center />
      <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
        We&apos;re the friendly little spot where regulars are known by name. Pull up a
        chair, order something scratch-made, browse the plants, and stay a while.
      </p>
      <p className="mt-4 font-script text-2xl md:text-3xl text-primary">
        {BRAND.tagline}
      </p>
    </section>
  );
}