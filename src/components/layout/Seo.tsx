import { useEffect } from 'react';
import { SITE } from '../../config/site';

// Per-page <title>, meta description and optional JSON-LD, without an extra library.
interface Props {
  title: string;
  description: string;
  jsonLd?: object;
  noindex?: boolean;
}

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

export default function Seo({ title, description, jsonLd, noindex = false }: Props) {
  useEffect(() => {
    document.title = title.includes('Way2Cure') ? title : `${title} | Way2Cure`;
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex' : 'index, follow');
    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => { script?.remove(); };
  }, [title, description, jsonLd, noindex]);
  return null;
}

/** MedicalBusiness structured data for Home and Contact (address and phone from config). */
export const medicalBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Way2Cure',
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  telephone: '+91-7400400908',
  email: SITE.email,
  areaServed: ['Mumbai', 'Navi Mumbai', 'Thane'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: `${SITE.address.locality}, ${SITE.address.city}`,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  openingHours: 'Mo-Su 00:00-23:59',
  sameAs: Object.values(SITE.social),
};
