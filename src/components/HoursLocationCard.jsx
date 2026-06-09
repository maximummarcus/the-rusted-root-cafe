import React from 'react';
import { BRAND, HOURS } from '@/lib/cafeData';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function HoursLocationCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 bg-card shadow-lg overflow-hidden rounded-lg">
      <div className="p-7">
        <h3 className="font-heading text-2xl text-foreground flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" /> Hours
        </h3>
        <ul className="space-y-2">
          {HOURS.map((h) => (
            <li key={h.day} className="flex justify-between border-b border-border/60 pb-1.5 text-foreground">
              <span className="font-medium">{h.day}</span>
              <span className={h.time === 'Closed' ? 'text-muted-foreground' : ''}>{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-7 bg-brand-sage/20 flex flex-col justify-center">
        <h3 className="font-heading text-2xl text-foreground flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary" /> Find Us
        </h3>
        <p className="text-foreground">{BRAND.addressShort}</p>
        <p className="text-foreground mb-4">{BRAND.cityState}</p>
        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="inline-flex items-center gap-2 min-h-[48px] w-fit px-5 rounded-full bg-brand-forest text-brand-cream font-semibold"
        >
          <Phone className="w-4 h-4" /> {BRAND.phone}
        </a>
      </div>
    </div>
  );
}