import { InfoBand, PageHead } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { SITE } from '../config/site.js';

const STEPS = [
  ['Set the safe zone', 'Family marks the boundary around home in the app.'],
  ['Wear the band', 'A light arm band with built-in location tracking.'],
  ['Instant alert', 'Family phones are alerted when the boundary is crossed.'],
  ['Find quickly', 'Live location is shown on the map.'],
];

export default function SafeZone() {
  return (
    <>
      <PageHead eyebrow="Coming soon · Dementia care" title="Safe-zone band">
        <p>Peace of mind for families caring for a loved one with dementia. Inside the zone: no alert. Outside: an instant alert.</p>
      </PageHead>
      <section className="section-sm">
        <div className="container two-col">
          <svg viewBox="0 0 360 300" className="safezone-art" role="img" aria-label="A dashed safe zone circle around a home. A dot outside the circle triggers an alert to family.">
            <circle cx="150" cy="150" r="120" fill="#C8D8D5" stroke="#70A9A1" strokeWidth="4" strokeDasharray="14 10" />
            <text x="150" y="70" textAnchor="middle" fill="#114D4A" fontWeight="700" fontSize="18">Safe zone</text>
            <path d="M120 150 L150 122 L180 150 V190 H120 Z" fill="#114D4A" />
            <circle cx="105" cy="215" r="12" fill="#70A9A1" stroke="#fff" strokeWidth="3" />
            <circle cx="310" cy="190" r="12" fill="#B8472A" stroke="#fff" strokeWidth="3" />
            <rect x="250" y="120" width="104" height="32" rx="6" fill="#B8472A" />
            <text x="302" y="141" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">Alert to family</text>
          </svg>
          <ol className="number-list big">
            {STEPS.map(([t, d]) => (
              <li key={t}><strong>{t}</strong><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section-white">
        <div className="container narrow">
          <InfoBand icon="lock">Used only with the family's consent. Location data is private and never shared. Band features will be finalised with the device supplier.</InfoBand>
          <h2>Want to know when it is ready?</h2>
          <p>Send us a WhatsApp message and we will tell you as soon as the band is available in your area.</p>
          <a className="btn btn-primary" href={SITE.whatsappHref} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Tell me when it is ready</a>
        </div>
      </section>
    </>
  );
}
