import React from 'react';
import { BRAND, IMG } from '@/lib/cafeData';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import { useTheme } from '@/lib/ThemeContext';

export default function About() {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  return (
    <>
      <Seo
        title="About — The Rusted Root Cafe, Windsor VA"
        description="The Rusted Root Cafe is a Windsor, VA local spot combining a from-scratch café & bakery with a houseplant & home-decor shop. Gather. Grow. Get Rooted!"
      />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <SectionHeading kicker="The Root Way" title="Our Story" center />
        </div>

        <div className={`grid md:grid-cols-2 gap-8 items-center`}>
          <div className={`overflow-hidden shadow-lg ${isModern ? 'rounded-md' : 'rounded-[2rem] hd-tilt'}`}>
            {/* PLACEHOLDER IMAGE: replace with real photo */}
            <img src={IMG.storefront} alt="The welcoming storefront of The Rusted Root café" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              The Rusted Root café is a little corner of Windsor, Virginia where good
              coffee, from-scratch food, and a room full of greenery come together.
            </p>
            <p>
              We&apos;re a café and scratch bakery <em>and</em> a houseplant &amp; home-decor
              shop — because we believe the best places are the ones where you can linger.
              Order a panini, browse the plants, catch up with a friend, and take a little
              something green home with you.
            </p>
            <p>
              Everything we make starts from scratch — bagels, chicken salad, cinnamon
              rolls, croissants and more. Come hungry, stay a while, and become a regular.
            </p>
            <p className={isModern ? 'text-primary font-semibold text-xl' : 'font-script text-3xl text-primary'}>
              {BRAND.slogan}
            </p>
          </div>
        </div>

        <div className="mt-14 text-center bg-brand-sage/25 rounded-[2rem] py-10 px-6">
          <p className="font-script text-3xl md:text-4xl text-primary">{BRAND.tagline}</p>
          <p className="mt-3 text-muted-foreground">
            That&apos;s the heart of {BRAND.name} — and the whole reason we opened our doors.
          </p>
        </div>
      </div>
    </>
  );
}