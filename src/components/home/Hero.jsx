import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/cafeData';
import { useTheme } from '@/lib/ThemeContext';
import { ShoppingBag, BookOpen } from 'lucide-react';

export default function Hero() {
  const { theme } = useTheme();
  const isModern = theme === 'modern';

  return (
    // Section fills the viewport edge-to-edge, never shorter than the URL-bar-hidden viewport.
    // Pure white in BOTH themes: the logo art sits on a #FFFFFF field, so any
    // off-white tone would show a visible square seam around the image.
    <section className="relative overflow-hidden min-h-[100lvh] bg-white">
      {/* Content is centered in the URL-bar-VISIBLE viewport (svh) so everything */}
      {/* fits on first paint, while the section itself extends to lvh below. */}
      <div
        className="relative min-h-[100svh] max-w-[120rem] mx-auto w-full px-4 pb-10 flex flex-col items-center justify-center text-center"
        style={{ paddingTop: 'calc(var(--header-h, 64px) + 1.25rem)' }}
      >
        {/* Owner's logo IS the hero centerpiece — a contained <img>, never a
            background-cover layer (cover would crop the circular mark on mobile
            portrait). object-contain + max-w/max-h keep it whole at every size;
            the max-height shrinks before the slogan + CTAs below can overflow a
            390px viewport. */}
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          src="/images/rusted-root-logo-hero.jpg"
          alt="The Rusted Root Cafe"
          loading="eager"
          className="block object-contain w-auto max-w-[88vw] max-h-[min(62svh,640px)]"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-5 md:mt-6 text-brand-forest max-w-full break-words px-4 ${
            isModern
              ? 'font-heading font-semibold uppercase tracking-wide'
              : 'font-script'
          }`}
          style={{ fontSize: 'clamp(1.65rem, 7.5vw, 4rem)', lineHeight: 1.05 }}
        >
          {BRAND.slogan}
        </motion.h1>

        <p className="mt-3 text-brand-forest/80 text-base md:text-lg max-w-2xl px-4">
          A from-scratch café &amp; bakery with a cozy small-town welcome in Windsor, VA.
        </p>

        <div className="mt-5 md:mt-6 flex flex-wrap items-center justify-center gap-3 px-4">
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
      </div>
    </section>
  );
}