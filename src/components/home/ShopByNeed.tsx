import { useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import Accent from '../ui/Accent';
import { Stagger, StaggerItem } from '../motion/Reveal';
import { categories } from '../../data';
import { SITE } from '../../config/site';
import { useLang, useLoc, useT, type Dict } from '../../i18n/LangContext';
import { DailyArt, DevicesArt, HelpArt, MedArt, MobilityArt, NutritionArt, SafetyArt } from '../brand/Illustrations';
import './ShopByNeed.css';

// "Shop by need" cards on the homepage: the client's design (shop-by-need-v4.html) in the site palette.
//  · Desktop: Medicines is the tall dark card (prescription upload, two floating notes), Medical
//    devices the wide card, then Daily care, Mobility, Nutrition, Safety and a "Not sure what to buy?"
//    card. Tablet: two columns. Phones: compact rows, text on the left and the drawing on the right.
//  · Cards reveal one after another as they scroll in. On hover a card lifts, its drawing rises and
//    the round button grows into a "Shop" pill. Category names and descriptions come from the data.

const T: Dict = {
  en: {
    badge: 'Pharmacist-checked',
    medTitle: 'Medicines,\n*without the queue.*',
    medLead: 'Prescription and over-the-counter medicines delivered to your door. Set up refills once and never run out.',
    toast1: 'Prescription verified', toast1Sub: 'by our pharmacist',
    toast2: 'Monthly refill on', toast2Sub: 'Delivered automatically',
    upload: 'Upload prescription', shopMeds: 'or shop medicines',
    devTagline: 'Check vitals at home, the way the doctor does.',
    rentOrBuy: 'Rent or buy', oxygenRent: 'Oxygen on rent',
    shop: 'Shop', shopNow: 'Shop now',
    helpTitle: 'Not sure what to buy?',
    helpText: "Tell our care team about the patient and we'll suggest the right products.",
    chat: 'Chat on WhatsApp',
  },
  hi: {
    badge: 'फ़ार्मासिस्ट द्वारा जाँचा गया',
    medTitle: 'दवाइयाँ,\n*बिना लाइन में लगे।*',
    medLead: 'पर्चे वाली और बिना पर्चे वाली दवाइयाँ आपके दरवाज़े तक। एक बार रीफ़िल सेट करें, फिर दवा कभी ख़त्म नहीं होगी।',
    toast1: 'पर्चा जाँचा गया', toast1Sub: 'हमारे फ़ार्मासिस्ट ने',
    toast2: 'मासिक रीफ़िल चालू', toast2Sub: 'अपने-आप डिलिवरी',
    upload: 'पर्चा अपलोड करें', shopMeds: 'या दवाइयाँ ख़रीदें',
    devTagline: 'डॉक्टर की तरह घर पर ही जाँच करें।',
    rentOrBuy: 'किराये पर या ख़रीदें', oxygenRent: 'ऑक्सीजन किराये पर',
    shop: 'ख़रीदें', shopNow: 'अभी ख़रीदें',
    helpTitle: 'समझ नहीं आ रहा क्या लें?',
    helpText: 'हमारी केयर टीम को मरीज़ के बारे में बताइए, हम सही प्रोडक्ट सुझाएँगे।',
    chat: 'WhatsApp पर बात करें',
  },
  mr: {
    badge: 'फार्मासिस्टने तपासलेले',
    medTitle: 'औषधे,\n*रांगेत न थांबता.*',
    medLead: 'प्रिस्क्रिप्शनची आणि विना-प्रिस्क्रिप्शन औषधे तुमच्या दारात. एकदा रिफिल सेट करा, मग औषधे कधीच संपणार नाहीत.',
    toast1: 'प्रिस्क्रिप्शन तपासले', toast1Sub: 'आमच्या फार्मासिस्टने',
    toast2: 'मासिक रिफिल चालू', toast2Sub: 'आपोआप डिलिव्हरी',
    upload: 'प्रिस्क्रिप्शन अपलोड करा', shopMeds: 'किंवा औषधे खरेदी करा',
    devTagline: 'डॉक्टरांप्रमाणे घरीच तपासणी करा.',
    rentOrBuy: 'भाड्याने किंवा खरेदी', oxygenRent: 'ऑक्सिजन भाड्याने',
    shop: 'खरेदी', shopNow: 'आता खरेदी करा',
    helpTitle: 'काय घ्यावे कळत नाही?',
    helpText: 'आमच्या केअर टीमला रुग्णाबद्दल सांगा, आम्ही योग्य उत्पादने सुचवू.',
    chat: 'WhatsApp वर बोला',
  },
};

const category = (slug: string) => categories.find((c) => c.slug === slug)!;

/** The round button in a card's corner; grows into a "Shop" pill when the card is hovered or focused. */
function Go({ label }: { label: string }) {
  return (
    <span className="sbn-go" aria-hidden="true">
      <span className="sbn-go__label">{label}</span>
      <Icon name="arrow" size={16} />
    </span>
  );
}

const SMALL = [
  { slug: 'daily-care', area: 'day', alt: false, Art: DailyArt, ribbon: '' },
  { slug: 'mobility', area: 'mob', alt: true, Art: MobilityArt, ribbon: 'rentOrBuy' },
  { slug: 'nutrition', area: 'nut', alt: true, Art: NutritionArt, ribbon: '' },
  { slug: 'safety', area: 'saf', alt: false, Art: SafetyArt, ribbon: 'oxygenRent' },
];

export default function ShopByNeed() {
  const tr = useT(T);
  const { t } = useLang();
  const loc = useLoc();
  const medRef = useRef<HTMLDivElement>(null);
  const devices = loc(category('devices'));
  // The device chips are the category's own list: "BP monitors, glucometers, oximeters"
  const chips = devices.blurb.split(/,\s*/).map((s) => s.charAt(0).toUpperCase() + s.slice(1));

  // Medicines card: the drawing and its two notes drift a little with the mouse (not on touch
  // screens, and not when the visitor asks for reduced motion).
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = medRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    medRef.current?.style.setProperty('--mx', '0');
    medRef.current?.style.setProperty('--my', '0');
  };

  return (
    <>
      <Stagger as="ul" className="sbn-grid">
        {/* Medicines */}
        <StaggerItem as="li" className="sbn-cell sbn-cell--med">
          <div ref={medRef} className="sbn-card sbn-med" onMouseMove={onMove} onMouseLeave={onLeave}>
            <span className="sbn-badge">{tr('badge')}</span>
            <h3 className="sbn-med__title"><Accent text={tr('medTitle')} /></h3>
            <p className="sbn-med__lead">{tr('medLead')}</p>
            <svg className="sbn-glow" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="50" r="50" fill="url(#art-glow)" /></svg>
            <MedArt className="sbn-med__art" />
            <div className="sbn-toast sbn-toast--1" aria-hidden="true">
              <span className="sbn-toast__icon sbn-toast__icon--ok"><Icon name="check" size={16} /></span>
              <span><b>{tr('toast1')}</b><small>{tr('toast1Sub')}</small></span>
            </div>
            <div className="sbn-toast sbn-toast--2" aria-hidden="true">
              <span className="sbn-toast__icon sbn-toast__icon--refill"><Icon name="refresh" size={16} /></span>
              <span><b>{tr('toast2')}</b><small>{tr('toast2Sub')}</small></span>
            </div>
            <div className="sbn-med__cta">
              <Link to="/prescription" className="sbn-btn sbn-btn--crimson"><Icon name="upload" size={18} /> {tr('upload')}</Link>
              <Link to="/shop/medicines" className="sbn-btn sbn-btn--link">{tr('shopMeds')} <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </StaggerItem>

        {/* Medical devices (wide) */}
        <StaggerItem as="li" className="sbn-cell sbn-cell--dev">
          <Link to="/shop/devices" className="sbn-card sbn-cat sbn-dev sbn-card--alt">
            <Go label={tr('shop')} />
            <span className="sbn-dev__copy">
              <h3 className="sbn-cat__title">{devices.name}</h3>
              <span className="sbn-cat__sub">{tr('devTagline')}<span className="sbn-more" aria-hidden="true">{tr('shopNow')} →</span></span>
              <ul className="sbn-chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
            </span>
            <span className="sbn-art"><DevicesArt /></span>
          </Link>
        </StaggerItem>

        {/* Daily care, Mobility, Nutrition, Safety */}
        {SMALL.map(({ slug, area, alt, Art, ribbon }) => {
          const c = loc(category(slug));
          return (
            <StaggerItem as="li" key={slug} className={`sbn-cell sbn-cell--${area}`}>
              <Link to={`/shop/${slug}`} className={`sbn-card sbn-cat${alt ? ' sbn-card--alt' : ''}`}>
                <Go label={tr('shop')} />
                <h3 className="sbn-cat__title">{c.name}</h3>
                <span className="sbn-cat__sub">
                  {c.blurb}
                  {!ribbon && <span className="sbn-more" aria-hidden="true">{tr('shopNow')} →</span>}
                </span>
                {ribbon && <span className="sbn-ribbon">{tr(ribbon)}</span>}
                <span className="sbn-art"><Art /></span>
              </Link>
            </StaggerItem>
          );
        })}

        {/* Not sure what to buy? */}
        <StaggerItem as="li" className="sbn-cell sbn-cell--help">
          <div className="sbn-card sbn-help">
            <div className="sbn-help__copy">
              <h3 className="sbn-cat__title">{tr('helpTitle')}</h3>
              <p>{tr('helpText')}</p>
              <div className="sbn-help__actions">
                <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="sbn-btn sbn-btn--dark">
                  <Icon name="whatsapp" size={20} className="sbn-wa" /> {tr('chat')}
                </a>
                <a href={SITE.phoneHref} className="sbn-btn sbn-btn--outline"><Icon name="phone" size={18} /> {t('callUs')}</a>
              </div>
            </div>
            <span className="sbn-art"><HelpArt /></span>
          </div>
        </StaggerItem>
      </Stagger>
    </>
  );
}
