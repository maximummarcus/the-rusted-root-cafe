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

const gallery = [
  {
    src: '/images/catering-baked-ziti-tray.jpg',
    alt: 'Catering tray of scratch-made baked ziti',
    caption: 'Hot entrée trays',
  },
  {
    src: '/images/catering-boxed-lunch.jpg',
    alt: 'Individual boxed lunch with a wrap, side and dessert',
    caption: 'Boxed lunches',
  },
  {
    src: '/images/catering-wings-tray.jpg',
    alt: 'Catering tray of saucy party wings',
    caption: 'Party wings',
  },
  {
    src: '/images/catering-dessert-cups.jpg',
    alt: 'Platter of banana pudding dessert cups',
    caption: 'Dessert cups',
  },
  {
    src: '/images/catering-jalapeno-biscuits.jpg',
    alt: 'Tray of scratch-made jalapeño cheddar biscuits',
    caption: 'Scratch biscuits',
  },
  {
    src: '/images/catering-cheese-bites.jpg',
    alt: 'Tray of golden, savory cheese bites',
    caption: 'Cheesy bites',
  },
  {
    src: '/images/catering-mac-and-cheese.jpg',
    alt: 'Pan of creamy baked mac and cheese',
    caption: 'Mac & cheese',
  },
];

export default function Catering() {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  // On desktop the gallery is a 3-column grid. When the photo count leaves a
  // single tile alone in the final row, center that orphan in the middle column
  // so it reads as intentional. Count-agnostic: derived from grid math, so it
  // keeps working if photos are added/removed. Only the lone-orphan case is
  // affected — full rows and the 2-up mobile layout are left untouched.
  const desktopColumns = 3;
  const hasLoneTrailingTile = gallery.length % desktopColumns === 1;

  return (
    <>
      <Seo
        title="Catering: The Rusted Root Cafe, Windsor VA"
        description="Catering from The Rusted Root Cafe in Windsor, VA. Scratch-made trays, chicken salad, pastries and more for your gathering. Call or email to inquire."
      />

      {/* Photo-forward hero — full-bleeds under the transparent fixed header (same
          treatment as Home). Mobile gets a taller aspect so the heading sits well
          clear of the floating header chrome. */}
      <section className="relative overflow-hidden">
        <div className="aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src={IMG.catering}
            alt="A platter of fresh-baked croissant sandwiches catered by The Rusted Root café"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Top-down dim keeps the white nav labels readable while the header is transparent. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[var(--header-h)] bg-gradient-to-b from-black/35 to-transparent pointer-events-none"
        />
        {/* Existing bottom-up forest wash carries the eyebrow + heading. */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 via-brand-forest/30 to-transparent flex items-end justify-center text-center px-6 pb-8 md:pb-14">
          <div>
            <p className={isModern ? 'text-sm uppercase tracking-[0.2em] text-brand-sunflower font-semibold' : 'font-script text-3xl text-brand-sunflower'}>
              The Root Way
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-brand-cream mt-2">Catering</h1>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pt-14 text-center">
        <SectionHeading title="Let us feed your gathering" center />
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          From morning meetings to family celebrations, we&apos;ll bring the from-scratch
          goodness to you. Tell us the date, the headcount, and what you&apos;re dreaming
          of. We&apos;ll take care of the rest.
        </p>
      </div>

      <section aria-label="Recent catering spreads" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {gallery.map((g, index) => (
            <figure
              key={g.src}
              className={`group bg-card overflow-hidden shadow-md ${isModern ? 'rounded-md' : 'rounded-2xl'} ${
                hasLoneTrailingTile && index === gallery.length - 1 ? 'md:col-start-2' : ''
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <figcaption className="px-3 py-2 md:py-3 text-center font-heading text-sm md:text-base text-foreground">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-14 text-center">
        <ul className="grid sm:grid-cols-2 gap-3 text-left">
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
