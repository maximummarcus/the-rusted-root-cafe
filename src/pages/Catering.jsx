import React from 'react';
import { BRAND, IMG } from '@/lib/cafeData';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import { Phone, Mail, Check } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

const offerings = [
  'Scratch-made bagel & pastry trays',
  'Homemade chicken salad',
  'Sandwich & panini platters',
  'Fresh salads & sides',
  'Cinnamon rolls & assorted baked goods',
  'Drink & limeade service',
];

export default function Catering() {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  return (
    <>
      <Seo
        title="Catering — The Rusted Root Cafe, Windsor VA"
        description="Catering from The Rusted Root Cafe in Windsor, VA. Scratch-made trays, chicken salad, pastries and more for your gathering. Call or email to inquire."
      />
      <section className="relative overflow-hidden">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img src={IMG.catering} alt="A Rusted Root catering buffet spread with trays of food and pastries" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-brand-forest/50 flex items-center justify-center text-center px-6">
          <div>
            <p className={isModern ? 'text-sm uppercase tracking-[0.2em] text-brand-sunflower font-semibold' : 'font-script text-3xl text-brand-sunflower'}>
              The Root Way
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-brand-cream mt-2">Catering</h1>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14 text-center">
        <SectionHeading title="Let us feed your gathering" center />
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          From morning meetings to family celebrations, we&apos;ll bring the from-scratch
          goodness to you. Tell us the date, the headcount, and what you&apos;re dreaming
          of — we&apos;ll take care of the rest.
        </p>

        <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-left">
          {offerings.map((o) => (
            <li key={o} className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="text-foreground">{o}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition"
          >
            <Phone className="w-5 h-5" /> Call {BRAND.phone}
          </a>
          <a
            href={`mailto:${BRAND.email}?subject=Catering%20Inquiry`}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-full bg-brand-sunflower text-brand-forest font-semibold shadow-lg hover:opacity-90 transition"
          >
            <Mail className="w-5 h-5" /> Email Us
          </a>
        </div>
      </div>
    </>
  );
}