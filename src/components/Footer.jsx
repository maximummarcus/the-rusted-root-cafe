import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, LOGO_URL, HOURS, NAV_LINKS } from '@/lib/cafeData';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-forest text-brand-cream mt-16">
      <div className="max-w-[120rem] mx-auto px-6 md:px-10 py-12 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="inline-block bg-white rounded-2xl p-2">
            <img src={LOGO_URL} alt="The Rusted Root café logo" className="w-24 h-auto rounded-full" />
          </div>
          <p className="font-script text-2xl text-brand-sunflower">{BRAND.slogan}</p>
          <p className="text-sm text-brand-cream/70">{BRAND.tagline}</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3">Explore</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-brand-cream/80 hover:text-brand-sunflower transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Hours
          </h4>
          <ul className="space-y-1 text-sm text-brand-cream/80">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-3">
                <span>{h.day}</span>
                <span className={h.time === 'Closed' ? 'text-brand-cream/50' : ''}>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3">Visit Us</h4>
          <ul className="space-y-3 text-sm text-brand-cream/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-sunflower" />
              <span>{BRAND.addressShort}<br />{BRAND.cityState}</span>
            </li>
            <li>
              <a href={`tel:${BRAND.phoneRaw}`} className="flex items-center gap-2 hover:text-brand-sunflower transition-colors">
                <Phone className="w-4 h-4 text-brand-sunflower" /> {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-brand-sunflower transition-colors break-all">
                <Mail className="w-4 h-4 shrink-0 text-brand-sunflower" /> {BRAND.email}
              </a>
            </li>
            <li className="flex items-center gap-4 pt-1">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-sunflower transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-sunflower transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-cream/15 py-4 text-center text-xs text-brand-cream/50">
        © {new Date().getFullYear()} {BRAND.name} · {BRAND.cityState}
      </div>
    </footer>
  );
}