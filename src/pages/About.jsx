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
        title="About | The Rusted Root Cafe - Windsor, VA"
        description="The story behind The Rusted Root Cafe, a homey cafe, scratch bakery, and houseplant shop in Windsor, VA. Gather. Grow. Get Rooted!"
      />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <SectionHeading as="h1" kicker="The Root Way" title="Our Story" center />
        </div>

        <div className={`grid md:grid-cols-2 gap-8 items-center`}>
          <div className="overflow-hidden shadow-lg rounded-lg hd-tilt">
            <img src={IMG.storefront} alt="The Rusted Root Cafe storefront with its green awning in Windsor, VA" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              At The Rusted Root Cafe, we believe great food has a way of bringing people
              together.
            </p>
            <p>
              What started as a dream to create a welcoming gathering place has grown into a
              café where friends meet over coffee, families share meals, and neighbors become
              familiar faces. From our homemade pastries and fresh-brewed coffee to our hearty
              breakfast and lunch specials, everything we serve is made with care and a passion
              for quality.
            </p>
            <p>
              More than just a café, The Rusted Root Cafe is a place to &quot;Gather, Grow, and
              Get Rooted!&quot; We strive to create an atmosphere that feels like home, where
              everyone is greeted with a smile and every visit leaves you feeling a little
              brighter than when you arrived.
            </p>
            <p>
              Whether you&apos;re stopping by for your morning coffee, grabbing lunch with
              coworkers, or treating yourself to one of our fresh-baked desserts, we&apos;re
              grateful to be part of your day.
            </p>
            <p>
              Thank you for supporting local, sharing in our journey, and becoming part of The
              Rusted Root Cafe family. We can&apos;t wait to serve you.
            </p>
            <p className={isModern ? 'text-primary font-semibold text-xl' : 'font-script text-3xl text-primary'}>
              {BRAND.slogan}
            </p>
          </div>
        </div>

        <div className="mt-14 text-center bg-brand-sage/25 rounded-lg py-10 px-6">
          <p className="font-script text-3xl md:text-4xl text-primary">{BRAND.tagline}</p>
          <p className="mt-3 text-muted-foreground">
            That&apos;s the heart of {BRAND.name}, and the whole reason we opened our doors.
          </p>
        </div>
      </div>
    </>
  );
}