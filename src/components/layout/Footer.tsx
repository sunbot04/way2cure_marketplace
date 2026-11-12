import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Icon from '../Icon';
import AppBadges from '../commerce/AppBadges';
import { languages, useLang, useLoc, useT, type Dict } from '../../i18n/LangContext';
import { categories } from '../../data';
import { SITE } from '../../config/site';
import { LAYOUT } from './copy';

// Footer (p.9 item 9, p.11): deep green, 4 columns, licence line, app badges, socials, language.
const EXTRA: Dict = {
  en: { getApp: 'Get the Way2Cure app', appText: 'Upload prescriptions, track doses and orders.', follow: 'Follow Way2Cure', care: 'Care & support' },
  hi: { getApp: 'Way2Cure ऐप पाएँ', appText: 'पर्चे अपलोड करें, डोज़ और ऑर्डर ट्रैक करें।', follow: 'Way2Cure को फ़ॉलो करें', care: 'देखभाल और मदद' },
  mr: { getApp: 'Way2Cure ॲप मिळवा', appText: 'प्रिस्क्रिप्शन अपलोड करा, डोस आणि ऑर्डर ट्रॅक करा.', follow: 'Way2Cure ला फॉलो करा', care: 'काळजी आणि मदत' },
};

const heading = 'mb-4 font-body text-small font-bold text-mustard';
const link = 'inline-flex min-h-[2.5rem] items-center text-base text-white/90 no-underline transition-colors duration-micro hover:text-white hover:underline';

export default function Footer() {
  const { t, lang, setLang } = useLang();
  const tr = useT(LAYOUT);
  const tx = useT(EXTRA);
  const loc = useLoc();
  const socials = [
    { name: 'Facebook', href: SITE.social.facebook, Ico: Facebook },
    { name: 'Instagram', href: SITE.social.instagram, Ico: Instagram },
    { name: 'YouTube', href: SITE.social.youtube, Ico: Youtube },
    { name: 'LinkedIn', href: SITE.social.linkedin, Ico: Linkedin },
  ];
  return (
    <footer className="bg-green text-mint">
      <div className="container grid gap-12 pb-12 pt-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10 lg:pt-20">
        <div>
          {/* White logo on deep green (p.4). TODO: client: swap in the official reversed logo file. */}
          <img src="/logo.png" alt="Way2Cure" width={150} height={50} className="mb-6 h-11 w-auto [filter:brightness(0)_invert(1)]" />
          <p className="font-head text-h3m font-bold leading-snug text-white">{tr('promise')}</p>
          <p className="text-base">{tr('about')}</p>
          <p className="mb-1 mt-6 text-small font-bold text-white">{tx('getApp')}</p>
          <p className="mb-4 text-small">{tx('appText')}</p>
          <AppBadges dark />
          <p className="sr-only">{tx('follow')}</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ name, href, Ico }) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={name} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors duration-micro hover:bg-white hover:text-green">
                  <Ico size={18} strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{t('shop')}</h2>
          <ul>
            {categories.map(loc).map((c) => <li key={c.slug}><Link to={`/shop/${c.slug}`} className={link}>{c.name}</Link></li>)}
            <li><Link to="/shop/rent" className={link}>{tr('rent')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>{tx('care')}</h2>
          <ul>
            <li><Link to="/care" className={link}>{tr('bookCare')}</Link></li>
            <li><Link to="/subscriptions" className={link}>{tr('manageSubs')}</Link></li>
            <li><Link to="/account" className={link}>{tr('orders')}</Link></li>
            <li><Link to="/help" className={link}>{tr('help')}</Link></li>
            <li><Link to="/safe-zone" className={link}>{tr('safeZone')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>{tr('company')}</h2>
          <ul className="mb-6">
            <li><Link to="/about" className={link}>{tr('aboutUs')}</Link></li>
            <li><Link to="/contact" className={link}>{tr('contactUs')}</Link></li>
            <li><a href={SITE.homeCareUrl} className={link}>{tr('homeCare')}</a></li>
            {SITE.homeCareLocations.map((l) => (
              <li key={l.name}><a href={l.href} className={link}>{tr('homeCareIn', { place: l.name })}</a></li>
            ))}
          </ul>
          <h2 className={heading}>{tr('visit')}</h2>
          <address className="mb-3 text-base not-italic">{SITE.offices[0].address}</address>
          <a href={SITE.phoneHref} className={`${link} gap-2 font-bold text-white`}><Icon name="phone" size={18} /> {SITE.phoneDisplay}</a><br />
          <a href={`mailto:${SITE.email}`} className={`${link} gap-2`}><Icon name="mail" size={18} /> {SITE.email}</a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container grid gap-4 pb-28 pt-6 text-small lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10 lg:pb-8 lg:pr-28">
          <div>
            <p className="mb-2 max-w-none">
              <strong className="text-white">{tr('pharmacy')}</strong> {tr('pharmacyText')} {tr('licence')}
              {/* TODO: client: partner pharmacy names and drug licence numbers */}
            </p>
            <p className="mb-2 max-w-none">{tr('noScheduleX')}</p>
            <p className="m-0 flex max-w-none flex-wrap gap-x-5 gap-y-1">
              <span>{tr('rights', { year: new Date().getFullYear() })}</span>
              <Link to="/privacy" className="text-white">{tr('privacy')}</Link>
              <Link to="/terms" className="text-white">{tr('terms')}</Link>
            </p>
          </div>
          <div role="group" aria-label={t('language')} className="flex items-center gap-1 justify-self-start rounded-full border border-white/20 p-1">
            <Icon name="globe" size={16} className="mx-2 text-mint" />
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                lang={l.code}
                aria-pressed={lang === l.code}
                onClick={() => setLang(l.code)}
                className={`min-h-[2.5rem] rounded-full px-3 text-base transition-colors duration-micro ${lang === l.code ? 'bg-white font-bold text-green' : 'text-white hover:bg-white/10'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
