import { useEffect } from 'react';
import { BRAND, LOGO_URL } from '@/lib/cafeData';

export default function LocalBusinessSchema() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'CafeOrCoffeeShop',
      name: 'The Rusted Root Cafe',
      // Schema images must be absolute URLs; LOGO_URL is a root-relative path.
      image: new URL(LOGO_URL, location.origin).href,
      telephone: BRAND.phone,
      email: BRAND.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '11409 Windsor Blvd, Unit C',
        addressLocality: 'Windsor',
        addressRegion: 'VA',
        postalCode: '23487',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BRAND.geo.lat,
        longitude: BRAND.geo.lng,
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '16:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '08:00', closes: '18:00' },
      ],
      sameAs: [BRAND.instagram, BRAND.facebook],
      slogan: BRAND.slogan,
      url: 'https://rooted-cafe-co.base44.app',
      priceRange: '$',
      servesCuisine: ['American', 'Coffee', 'Baked Goods'],
      hasMenu: 'https://rooted-cafe-co.base44.app/menu',
      acceptsReservations: false,
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'rrc-localbusiness';
    script.text = JSON.stringify(data);
    document.getElementById('rrc-localbusiness')?.remove();
    document.head.appendChild(script);
    return () => document.getElementById('rrc-localbusiness')?.remove();
  }, []);
  return null;
}