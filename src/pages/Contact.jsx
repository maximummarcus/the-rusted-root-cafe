import React from 'react';
import { BRAND } from '@/lib/cafeData';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import HoursLocationCard from '@/components/HoursLocationCard';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';

export default function Contact() {
  const mapsQuery = encodeURIComponent(BRAND.address);

  return (
    <>
      <Seo
        title="Contact & Hours: The Rusted Root Cafe, Windsor VA"
        description="Visit The Rusted Root Cafe, a café and plant shop in Windsor, VA, at 11409 Windsor Blvd, Unit C. Call (757) 241-0075 for hours, directions, and more."
      />
      <LocalBusinessSchema />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <SectionHeading kicker="Stop By" title="Visit Us" center />
        </div>

        <div className="grid gap-3 sm:grid-cols-3 mb-8">
          <a href={`tel:${BRAND.phoneRaw}`} className="flex flex-col items-center gap-2 bg-card border border-border rounded-lg p-5 min-h-[44px] hover:shadow-md transition">
            <Phone className="w-6 h-6 text-primary" />
            <span className="font-semibold text-foreground">{BRAND.phone}</span>
          </a>
          <a href={`mailto:${BRAND.email}`} className="flex flex-col items-center gap-2 bg-card border border-border rounded-lg p-5 min-h-[44px] hover:shadow-md transition">
            <Mail className="w-6 h-6 text-primary" />
            <span className="font-semibold text-foreground text-sm break-all text-center">{BRAND.email}</span>
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 bg-card border border-border rounded-lg p-5 min-h-[44px] hover:shadow-md transition"
          >
            <MapPin className="w-6 h-6 text-primary" />
            <span className="font-semibold text-foreground text-sm text-center">{BRAND.addressShort}</span>
          </a>
        </div>

        <HoursLocationCard />

        {/* Map */}
        <div className="mt-8 overflow-hidden shadow-lg rounded-lg">
          <iframe
            title="Map to The Rusted Root Cafe"
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          />
        </div>

        {/* Social */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full bg-brand-forest text-brand-cream font-semibold">
            <Instagram className="w-5 h-5" /> {BRAND.instagramHandle}
          </a>
          <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full bg-brand-forest text-brand-cream font-semibold">
            <Facebook className="w-5 h-5" /> Facebook
          </a>
        </div>
      </div>
    </>
  );
}