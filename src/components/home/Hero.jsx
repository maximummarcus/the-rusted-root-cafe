import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND, IMG, LOGO_URL } from '@/lib/cafeData';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { ShoppingBag, BookOpen } from 'lucide-react';

// Mobile shows only ONE full-bleed photo (the squished side-by-side split
// looks bad on phones). Owner: to flip which photo shows on mobile, swap
// IMG.bakery for IMG.plants on the line marked below. Desktop keeps the split.

export default function Hero() {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  return (
    <section className="relative overflow-hidden min-h-[100lvh] flex flex-col">
      {/* Background photos */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        {/* Mobile single photo lives here. Owner: swap IMG.bakery → IMG.plants to flip. */}
        <img
          src={IMG.bakery}
          alt="The Rusted Root café scratch bakery counter"
          className="w-full h-full object-cover object-center"
        />
        {/* Desktop-only right half of the split. */}
        <img
          src={IMG.plants}
          alt="Houseplants and home decor corner at the café"
          className="hidden md:block w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-brand-forest/55" />

      {/* Content — centered vertically inside the visible area below the fixed header. */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center text-center px-4 max-w-[120rem] mx-auto w-full"
        style={{
          paddingTop: 'calc(var(--header-h, 120px) + 1rem)',
          paddingBottom: '2rem',
        }}
      >
        {/* Center logo card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`bg-brand-cream p-4 md:p-6 shadow-2xl ${isModern ? 'rounded-md' : 'rounded-[2rem]'}`}
        >
          <img
            src={LOGO_URL}
            alt="The Rusted Root café logo"
            className="h-auto rounded-full mx-auto"
            style={{ width: 'clamp(110px, 24vw, 220px)' }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-8 text-brand-cream max-w-full break-words px-4 ${
            isModern
              ? 'font-heading font-semibold uppercase tracking-wide'
              : 'font-script'
          }`}
          style={{ fontSize: 'clamp(1.85rem, 9vw, 5rem)', lineHeight: 1.05 }}
        >
          {BRAND.slogan}
        </motion.h1>

        <p className="mt-4 text-brand-cream/90 text-base md:text-xl max-w-2xl px-4">
          A from-scratch café &amp; bakery and a houseplant &amp; home-decor shop — all under one cozy roof in Windsor, VA.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 px-4">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 min-h-[48px] min-w-[140px] justify-center px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition"
          >
            <ShoppingBag className="w-5 h-5" /> Order
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 min-h-[48px] min-w-[140px] justify-center px-6 rounded-full bg-brand-sunflower text-brand-forest font-semibold shadow-lg hover:opacity-90 transition"
          >
            <BookOpen className="w-5 h-5" /> See the Menu
          </Link>
        </div>

        {/* Prominent style toggle */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <span className="text-brand-cream/80 text-sm">Play with our look —</span>
          <div className="rounded-full bg-brand-cream/95 p-1 shadow-lg">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>
  );
}
