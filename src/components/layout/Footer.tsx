import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { useLang, useLoc, useT } from '../../i18n/LangContext';
import { categories } from '../../data';
import { SITE } from '../../config/site';
import { LAYOUT } from './copy';

// Footer (guidelines p.9 item 9): Support · Company · Visit us (Vashi) · legal links,
// plus the pharmacy licence line required on p.11.
const heading = 'mb-3 font-body text-small font-bold tracking-wide text-mustard';
const link = 'inline-flex min-h-[2.5rem] items-center gap-2 text-white no-underline hover:underline';

export default function Footer() {
  const { t } = useLang();
  const tr = useT(LAYOUT);
  const loc = useLoc();
  return (
    <footer className="bg-green pt-12 text-mint">
      <div className="container grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div>
          {/* No reversed logo file exists yet, so the official logo sits on a white panel (p.4). TODO: client */}
          <span className="mb-4 inline-block rounded-btn bg-white px-3.5 py-2.5">
            <img src="/logo.png" alt="Way2Cure" width={132} height={44} className="h-10 w-auto" />
          </span>
          <p className="font-head text-h3m font-bold text-white">{tr('promise')}</p>
          <p className="text-base">{tr('about')}</p>
          <div className="flex flex-wrap gap-x-4">
            {Object.entries({ Facebook: SITE.social.facebook, Instagram: SITE.social.instagram, YouTube: SITE.social.youtube, LinkedIn: SITE.social.linkedin }).map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className={link}>{name}</a>
            ))}
          </div>
        </div>

        <div>
          <h2 className={heading}>{t('shop')}</h2>
          <ul>
            {categories.map(loc).map((c) => <li key={c.slug}><Link to={`/shop/${c.slug}`} className={link}>{c.name}</Link></li>)}
            <li><Link to="/shop/rent" className={link}>{tr('rent')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>{tr('support')}</h2>
          <ul>
            <li><Link to="/help" className={link}>{tr('help')}</Link></li>
            <li><Link to="/account" className={link}>{tr('orders')}</Link></li>
            <li><Link to="/subscriptions" className={link}>{tr('manageSubs')}</Link></li>
            <li><Link to="/care" className={link}>{tr('bookCare')}</Link></li>
            <li><Link to="/contact" className={link}>{tr('contactUs')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>{tr('company')}</h2>
          <ul>
            <li><Link to="/about" className={link}>{tr('aboutUs')}</Link></li>
            <li><a href={SITE.homeCareUrl} className={link}>{tr('homeCare')}</a></li>
            {/* Existing home care location pages, so it stays one brand (brief item 10) */}
            {SITE.homeCareLocations.map((l) => (
              <li key={l.name}><a href={l.href} className={link}>{tr('homeCareIn', { place: l.name })}</a></li>
            ))}
            <li><Link to="/safe-zone" className={link}>{tr('safeZone')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>{tr('visit')}</h2>
          <address className="mb-3 text-base not-italic">{SITE.offices[0].address}</address>
          <a href={SITE.phoneHref} className={`${link} flex`}><Icon name="phone" size={18} /> {SITE.phoneDisplay}</a>
          <a href={`mailto:${SITE.email}`} className={`${link} flex`}><Icon name="mail" size={18} /> {SITE.email}</a>
        </div>
      </div>

      <div className="container mt-10 border-t border-mint/30 py-6 text-small text-mint">
        <p className="mb-2 max-w-none">
          <strong className="text-white">{tr('pharmacy')}</strong> {tr('pharmacyText')} {tr('licence')}
          {/* TODO: client: replace with partner pharmacy names and drug licence numbers */}
        </p>
        <p className="mb-2 max-w-none">{tr('noScheduleX')}</p>
        <p className="m-0 flex max-w-none flex-wrap gap-x-5 gap-y-1">
          <span>{tr('rights', { year: new Date().getFullYear() })}</span>
          <Link to="/privacy" className="text-white">{tr('privacy')}</Link>
          <Link to="/terms" className="text-white">{tr('terms')}</Link>
        </p>
      </div>
    </footer>
  );
}
