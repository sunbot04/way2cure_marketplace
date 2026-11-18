import { useEffect, useRef, useState, type FormEvent, type TouchEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'motion/react';
import Icon from '../Icon';
import Accent from '../ui/Accent';
import { SITE } from '../../config/site';
import { useT, type Dict } from '../../i18n/LangContext';
import { fadeRise, stagger } from '../../lib/motion';

// Homepage hero (chosen 2026-11-17, "D"): search first, then a banner carousel of the four main
// services, then quick actions. Desktop: headline + search side by side, a wide sliding banner,
// five action tiles. Phones/tablets (below lg): an app-style layout with a peeking carousel,
// a 4 x 2 service grid, a care-advisor card and a trust strip.
// Runs up under the transparent floating header (pt = --header-space).

const T: Dict = {
  en: {
    area: 'Mumbai · Navi Mumbai · Thane', open: 'Open 24/7',
    h1: 'Care at home and medicines, *in one place.*', lead: 'Delivered across Mumbai, Navi Mumbai and Thane.',
    ph: 'Search medicines, devices or care services', phShort: 'Search medicines or care', search: 'Search', popular: 'Popular:',
    pop1: 'Adult diapers', pop2: 'BP monitor', pop3: 'Walker', pop4: 'Nurse at home', pop5: 'Glucometer',
    carousel: 'Way2Cure services', slide: 'Slide {n}', prev: 'Previous slide', next: 'Next slide',
    b1tag: 'Care at home', b1title: "Trained nurses, at your parent's side", b1text: 'Background-checked nurses, matched to your needs, at the time you choose.', b1cta: 'Book a nurse',
    b2tag: 'Prescriptions', b2title: 'Upload a prescription, we do the rest', b2text: 'A pharmacist checks every order and calls you if anything is unclear.', b2cta: 'See how it works',
    b3tag: 'Doctor at home', b3title: 'A doctor visit, without the hospital trip', b3text: 'General physicians and specialists who come to your home.', b3cta: 'Book a visit',
    b4tag: 'Subscriptions', b4title: 'Monthly medicines, never run out', b4text: 'We remind you 3 days before. Pause or change anytime, with no fee.', b4cta: 'See plans',
    a1: 'Upload prescription', a1s: 'A pharmacist checks it', a2: 'Order medicines', a2s: 'Delivered to your door',
    a3: 'Book a nurse', a3s: 'Background-checked, at home', a4: 'Rent equipment', a4s: 'Beds, wheelchairs and more', a5: 'Call us 24/7',
    need: 'What do you need today?', seeAll: 'See all',
    s1: 'Upload Rx', s2: 'Medicines', s3: 'Nurse at home', s4: 'Doctor visit', s5: 'Devices', s6: 'Daily care', s7: 'Dose sachets', s8: 'Monthly refills',
    advTitle: 'Not sure what you need?', advText: 'Talk to a care advisor, free, any time.', call: 'Call now', whatsapp: 'WhatsApp',
    t1: 'Pharmacist verified', t2: 'Background-checked nurses', t3: '15,000+ patients cared for',
    m1: 'Pharmacist', m1s: 'checked orders', m2: 'Verified', m2s: 'nurses & doctors', m3: '24/7', m3s: 'support',
  },
  hi: {
    area: 'मुंबई · नवी मुंबई · ठाणे', open: '24/7 उपलब्ध',
    h1: 'घर पर देखभाल और दवाइयाँ, *एक ही जगह।*', lead: 'मुंबई, नवी मुंबई और ठाणे में डिलिवरी।',
    ph: 'दवाइयाँ, उपकरण या देखभाल सेवाएँ खोजें', phShort: 'दवाइयाँ या देखभाल खोजें', search: 'खोजें', popular: 'लोकप्रिय:',
    pop1: 'एडल्ट डायपर', pop2: 'बीपी मॉनिटर', pop3: 'वॉकर', pop4: 'घर पर नर्स', pop5: 'ग्लूकोमीटर',
    carousel: 'Way2Cure सेवाएँ', slide: 'स्लाइड {n}', prev: 'पिछली स्लाइड', next: 'अगली स्लाइड',
    b1tag: 'घर पर देखभाल', b1title: 'प्रशिक्षित नर्स, आपके अपनों के साथ', b1text: 'जाँचे-परखे नर्स, आपकी ज़रूरत के अनुसार, आपके चुने हुए समय पर।', b1cta: 'नर्स बुक करें',
    b2tag: 'पर्चा', b2title: 'पर्चा अपलोड करें, बाक़ी हम करेंगे', b2text: 'हर ऑर्डर फ़ार्मासिस्ट जाँचते हैं, और कुछ भी साफ़ न हो तो आपको कॉल करते हैं।', b2cta: 'देखें यह कैसे काम करता है',
    b3tag: 'घर पर डॉक्टर', b3title: 'डॉक्टर की विज़िट, अस्पताल जाए बिना', b3text: 'जनरल फ़िज़िशियन और विशेषज्ञ, जो आपके घर आते हैं।', b3cta: 'विज़िट बुक करें',
    b4tag: 'सब्सक्रिप्शन', b4title: 'हर महीने की दवाइयाँ, कभी ख़त्म नहीं', b4text: 'ख़त्म होने से 3 दिन पहले याद दिलाते हैं। जब चाहें रोकें या बदलें, कोई शुल्क नहीं।', b4cta: 'प्लान देखें',
    a1: 'पर्चा अपलोड करें', a1s: 'फ़ार्मासिस्ट इसे जाँचते हैं', a2: 'दवाइयाँ ऑर्डर करें', a2s: 'आपके दरवाज़े तक डिलिवरी',
    a3: 'नर्स बुक करें', a3s: 'जाँचे-परखे, घर पर', a4: 'उपकरण किराये पर', a4s: 'बेड, व्हीलचेयर और भी बहुत कुछ', a5: 'हमें 24/7 कॉल करें',
    need: 'आज आपको क्या चाहिए?', seeAll: 'सभी देखें',
    s1: 'पर्चा भेजें', s2: 'दवाइयाँ', s3: 'घर पर नर्स', s4: 'डॉक्टर विज़िट', s5: 'उपकरण', s6: 'रोज़ की देखभाल', s7: 'डोज़ सैशे', s8: 'मासिक रीफ़िल',
    advTitle: 'पक्का नहीं कि क्या चाहिए?', advText: 'केयर सलाहकार से बात करें, मुफ़्त, कभी भी।', call: 'अभी कॉल करें', whatsapp: 'WhatsApp',
    t1: 'फ़ार्मासिस्ट द्वारा जाँचा गया', t2: 'जाँचे-परखे नर्स', t3: '15,000+ मरीज़ों की देखभाल',
    m1: 'फ़ार्मासिस्ट', m1s: 'द्वारा जाँचे ऑर्डर', m2: 'जाँचे-परखे', m2s: 'नर्स और डॉक्टर', m3: '24/7', m3s: 'मदद',
  },
  mr: {
    area: 'मुंबई · नवी मुंबई · ठाणे', open: '24/7 उपलब्ध',
    h1: 'घरी काळजी आणि औषधे, *एकाच ठिकाणी.*', lead: 'मुंबई, नवी मुंबई आणि ठाण्यात डिलिव्हरी.',
    ph: 'औषधे, उपकरणे किंवा काळजी सेवा शोधा', phShort: 'औषधे किंवा काळजी शोधा', search: 'शोधा', popular: 'लोकप्रिय:',
    pop1: 'अ‍ॅडल्ट डायपर', pop2: 'बीपी मॉनिटर', pop3: 'वॉकर', pop4: 'घरी नर्स', pop5: 'ग्लुकोमीटर',
    carousel: 'Way2Cure सेवा', slide: 'स्लाइड {n}', prev: 'मागील स्लाइड', next: 'पुढील स्लाइड',
    b1tag: 'घरी काळजी', b1title: 'प्रशिक्षित नर्स, तुमच्या आई-वडिलांच्या सोबत', b1text: 'तपासलेल्या नर्स, तुमच्या गरजेनुसार, तुम्ही निवडलेल्या वेळी.', b1cta: 'नर्स बुक करा',
    b2tag: 'प्रिस्क्रिप्शन', b2title: 'प्रिस्क्रिप्शन अपलोड करा, बाकी आम्ही करतो', b2text: 'प्रत्येक ऑर्डर फार्मासिस्ट तपासतात, आणि काही अस्पष्ट असल्यास तुम्हाला कॉल करतात.', b2cta: 'हे कसे चालते ते पाहा',
    b3tag: 'घरी डॉक्टर', b3title: 'डॉक्टरांची भेट, हॉस्पिटलला न जाता', b3text: 'जनरल फिजिशियन आणि तज्ज्ञ, जे तुमच्या घरी येतात.', b3cta: 'भेट बुक करा',
    b4tag: 'सबस्क्रिप्शन', b4title: 'दर महिन्याची औषधे, कधीही संपणार नाहीत', b4text: 'संपण्याच्या 3 दिवस आधी आठवण करून देतो. कधीही थांबवा किंवा बदला, कोणतेही शुल्क नाही.', b4cta: 'प्लॅन पाहा',
    a1: 'प्रिस्क्रिप्शन अपलोड करा', a1s: 'फार्मासिस्ट तपासतात', a2: 'औषधे ऑर्डर करा', a2s: 'तुमच्या दारापर्यंत डिलिव्हरी',
    a3: 'नर्स बुक करा', a3s: 'तपासलेल्या, घरी', a4: 'उपकरणे भाड्याने', a4s: 'बेड, व्हीलचेअर आणि बरेच काही', a5: 'आम्हाला 24/7 कॉल करा',
    need: 'आज तुम्हाला काय हवे आहे?', seeAll: 'सर्व पाहा',
    s1: 'प्रिस्क्रिप्शन', s2: 'औषधे', s3: 'घरी नर्स', s4: 'डॉक्टर भेट', s5: 'उपकरणे', s6: 'रोजची काळजी', s7: 'डोस सॅशे', s8: 'मासिक रिफिल',
    advTitle: 'काय हवे ते नक्की माहीत नाही?', advText: 'केअर सल्लागाराशी बोला, मोफत, कधीही.', call: 'आता कॉल करा', whatsapp: 'WhatsApp',
    t1: 'फार्मासिस्टने तपासलेले', t2: 'तपासलेल्या नर्स', t3: '15,000+ रुग्णांची काळजी',
    m1: 'फार्मासिस्ट', m1s: 'तपासलेल्या ऑर्डर', m2: 'तपासलेले', m2s: 'नर्स आणि डॉक्टर', m3: '24/7', m3s: 'मदत',
  },
};

type Tr = ReturnType<typeof useT>;

// Popular searches: the label is translated, the query stays in English (product names are English).
const POPULAR = [
  { k: 'pop1', q: 'Adult diapers' }, { k: 'pop2', q: 'BP monitor' }, { k: 'pop3', q: 'Walker' },
  { k: 'pop4', q: 'Nurse' }, { k: 'pop5', q: 'Glucometer' },
];

const BANNERS = [
  { n: 1, to: '/care/nurse', img: '/images/hero-care.webp', pos: '60% 30%', bg: 'bg-green', dark: true },
  { n: 2, to: '/prescription', img: '/images/categories/medicines.webp', pos: '50% 50%', bg: 'bg-[#FBEDEF]', dark: false },
  { n: 3, to: '/care/doctor', img: '/images/care-doctor.webp', pos: '50% 40%', bg: 'bg-[#E7F0FA]', dark: false },
  { n: 4, to: '/subscriptions', img: '/images/people/senior-couple-garden.webp', pos: '50% 35%', bg: 'bg-[#FFF6DD]', dark: false },
];

const ACTIONS = [
  { k: 'a1', to: '/prescription', icon: 'upload' },
  { k: 'a2', to: '/shop/medicines', icon: 'pill' },
  { k: 'a3', to: '/care/nurse', icon: 'stethoscope' },
  { k: 'a4', to: '/shop/rent', icon: 'bed' },
];

const SERVICES = [
  { k: 's1', to: '/prescription', icon: 'upload', tint: 'bg-[#FBE7EA] text-terracotta-deep' },
  { k: 's2', to: '/shop/medicines', icon: 'pill', tint: 'bg-[#E3F1EA] text-green' },
  { k: 's3', to: '/care/nurse', icon: 'stethoscope', tint: 'bg-[#E4EEFA] text-sage-deep' },
  { k: 's4', to: '/care/doctor', icon: 'userDoctor', tint: 'bg-[#FFF2CF] text-[#8A6100]' },
  { k: 's5', to: '/shop/devices', icon: 'activity', tint: 'bg-[#E4EEFA] text-sage-deep' },
  { k: 's6', to: '/shop/daily-care', icon: 'handHeart', tint: 'bg-[#FFF2CF] text-[#8A6100]' },
  { k: 's7', to: '/subscriptions/dose-sachets', icon: 'package', tint: 'bg-[#FBE7EA] text-terracotta-deep' },
  { k: 's8', to: '/subscriptions', icon: 'refresh', tint: 'bg-[#E3F1EA] text-green' },
];

// First banner loads first (it is the largest thing on screen); the rest lazily. Lowercase
// fetchpriority: React 18 does not know the camelCase prop and would warn.
const imgPriority = (n: number) => (n === 0 ? ({ fetchpriority: 'high' } as object) : { loading: 'lazy' as const });

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Shared pieces ----------

function Search({ tr, placeholder }: { tr: Tr; placeholder: string }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const go = (e: FormEvent) => { e.preventDefault(); nav(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : '/shop'); };
  return (
    <div>
      <form role="search" onSubmit={go} className="flex items-center gap-2 rounded-tile bg-white p-1.5 pl-4 shadow-raised ring-1 ring-line">
        <Icon name="search" size={22} className="shrink-0 text-grey" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={tr('ph')}
          className="h-12 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-grey [&::-webkit-search-cancel-button]:hidden"
        />
        <button className="h-12 shrink-0 rounded-card bg-terracotta-deep px-5 font-bold text-white transition-colors hover:bg-terracotta-darker">{tr('search')}</button>
      </form>
      <p className="-mx-4 mt-3 flex items-center gap-2 overflow-x-auto px-4 text-small text-grey [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 font-semibold">{tr('popular')}</span>
        {POPULAR.map((p) => (
          <Link key={p.k} to={`/shop?q=${encodeURIComponent(p.q)}`} className="shrink-0 rounded-full bg-white px-3 py-1 font-semibold text-ink no-underline ring-1 ring-line hover:ring-green/40">{tr(p.k)}</Link>
        ))}
      </p>
    </div>
  );
}

function Dots({ count, i, go, tr, onDark = false }: { count: number; i: number; go: (n: number) => void; tr: Tr; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }, (_, n) => (
        <button
          key={n}
          type="button"
          aria-label={tr('slide', { n: n + 1 })}
          aria-current={n === i}
          onClick={() => go(n)}
          // 24px tall hit area around an 8px dot
          className="grid h-6 place-items-center"
        >
          <span className={`block h-2 rounded-full transition-all duration-slow ${n === i ? `w-6 ${onDark ? 'bg-white' : 'bg-green'}` : `w-2 ${onDark ? 'bg-white/50' : 'bg-green/25'}`}`} />
        </button>
      ))}
    </div>
  );
}

// ---------- Desktop (lg and up) ----------

// Auto-advances every 5 s; pauses on hover or keyboard focus; no autoplay with reduced motion.
function useAutoplay(count: number) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setTimeout(() => setI((x) => (x + 1) % count), 5000);
    return () => clearTimeout(t);
  }, [i, paused, count]);
  const go = (n: number) => setI(((n % count) + count) % count);
  const startX = useRef<number | null>(null);
  const bind = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
    onTouchStart: (e: TouchEvent) => { startX.current = e.touches[0].clientX; setPaused(true); },
    onTouchEnd: (e: TouchEvent) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      startX.current = null;
    },
  };
  return { i, go, bind };
}

function Arrow({ dir, label, onClick, className }: { dir: 'prev' | 'next'; label: string; onClick: () => void; className: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick}
      className={`grid h-11 w-11 place-items-center rounded-full bg-white text-green shadow-raised transition-transform hover:scale-105 ${className}`}>
      <Icon name="arrow" size={18} className={dir === 'prev' ? 'rotate-180' : ''} />
    </button>
  );
}

function BannerCarousel({ tr }: { tr: Tr }) {
  const { i, go, bind } = useAutoplay(BANNERS.length);
  return (
    <div className="relative" {...bind} role="region" aria-roledescription="carousel" aria-label={tr('carousel')}>
      <div className="overflow-hidden rounded-panel shadow-card">
        <div className="flex transition-transform duration-[600ms] ease-soft" style={{ transform: `translateX(-${i * 100}%)` }}>
          {BANNERS.map((b, n) => (
            <div key={b.n} className={`grid w-full shrink-0 grid-cols-[1.1fr_0.9fr] ${b.bg}`} aria-hidden={n !== i} {...(n !== i ? { inert: '' } : {})}>
              <div className="flex flex-col justify-center p-12">
                <p className={`mb-2 text-small font-bold uppercase tracking-wide ${b.dark ? 'text-mustard' : 'text-terracotta-deep'}`}>{tr(`b${b.n}tag`)}</p>
                <h2 className={`mb-3 font-head text-[clamp(1.75rem,1.1rem+1.4vw,2.4rem)] font-semibold leading-[1.15] ${b.dark ? 'text-white' : 'text-green'}`}>{tr(`b${b.n}title`)}</h2>
                <p className={`mb-6 text-base ${b.dark ? 'text-mint' : 'text-ink/80'}`}>{tr(`b${b.n}text`)}</p>
                <Link to={b.to} className={`group inline-flex w-fit items-center gap-2 rounded-btn px-5 py-2.5 font-bold no-underline transition-colors ${b.dark ? 'bg-white text-green hover:bg-mint' : 'bg-green text-white hover:bg-green-dark'}`}>
                  {tr(`b${b.n}cta`)} <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <img src={b.img} alt="" className="h-full min-h-[21rem] w-full object-cover" style={{ objectPosition: b.pos }} {...imgPriority(n)} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-12"><Dots count={BANNERS.length} i={i} go={go} tr={tr} onDark={BANNERS[i].dark} /></div>
      <Arrow dir="prev" label={tr('prev')} onClick={() => go(i - 1)} className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Arrow dir="next" label={tr('next')} onClick={() => go(i + 1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
    </div>
  );
}

const tileClass = 'group flex h-full items-center gap-3 rounded-tile bg-white px-3.5 py-4 text-ink no-underline shadow-card transition-[transform,box-shadow] duration-slow hover-mouse:hover:-translate-y-0.5 hover-mouse:hover:shadow-raised';
function TileBody({ icon, title, sub, urgent = false }: { icon: string; title: string; sub: string; urgent?: boolean }) {
  return (
    <>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${urgent ? 'bg-terracotta-deep text-white' : 'bg-mint/60 text-green'}`}><Icon name={icon} size={20} /></span>
      <span className="min-w-0">
        <span className="block font-bold leading-tight">{title}</span>
        <span className="mt-0.5 block text-small text-grey">{sub}</span>
      </span>
    </>
  );
}

function Desktop({ tr }: { tr: Tr }) {
  return (
    <m.div initial="hidden" animate="show" variants={stagger(0.06)} className="container hidden pb-8 pt-8 lg:block">
      <m.div variants={fadeRise} className="mb-8 grid grid-cols-2 items-end gap-10">
        <div>
          <h1 className="mb-2 font-head text-[clamp(2rem,1.2rem+1.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-green">
            <Accent text={tr('h1')} />
          </h1>
          <p className="text-base text-ink/80">{tr('lead')}</p>
        </div>
        <div className="min-w-0"><Search tr={tr} placeholder={tr('ph')} /></div>
      </m.div>
      <m.div variants={fadeRise}><BannerCarousel tr={tr} /></m.div>
      <m.ul variants={fadeRise} className="mt-8 grid grid-cols-5 gap-3">
        {ACTIONS.map((a) => (
          <li key={a.k}><Link to={a.to} className={tileClass}><TileBody icon={a.icon} title={tr(a.k)} sub={tr(`${a.k}s`)} /></Link></li>
        ))}
        <li><a href={SITE.phoneHref} className={tileClass}><TileBody icon="phone" title={tr('a5')} sub={SITE.phoneDisplay} urgent /></a></li>
      </m.ul>
      <m.ul variants={fadeRise} className="mt-6 flex justify-center gap-x-6 text-small font-semibold text-ink">
        {(['t1', 't2', 't3'] as const).map((k, n) => (
          <li key={k} className="flex items-center gap-1.5"><Icon name={n === 2 ? 'heart' : 'check'} size={16} className="text-green" /> {tr(k)}</li>
        ))}
      </m.ul>
    </m.div>
  );
}

// ---------- Phones and tablets (below lg) ----------

// Peeking carousel on native scroll-snap (follows the finger); the next banner shows at the edge.
// Auto-advances every 5 s until the person touches it.
function PeekCarousel({ tr }: { tr: Tr }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const step = () => ((ref.current?.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1) + 12; // slide + gap-3
  const goTo = (n: number) => ref.current?.scrollTo({ left: n * step(), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  useEffect(() => {
    if (touched || prefersReducedMotion()) return;
    const t = setTimeout(() => goTo((i + 1) % BANNERS.length), 5000);
    return () => clearTimeout(t);
  }, [i, touched]);
  return (
    <div role="region" aria-roledescription="carousel" aria-label={tr('carousel')}>
      <div
        ref={ref}
        onScroll={(e) => setI(Math.min(BANNERS.length - 1, Math.round(e.currentTarget.scrollLeft / step())))}
        onTouchStart={() => setTouched(true)}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {BANNERS.map((b, n) => (
          <Link key={b.n} to={b.to} className="relative block h-[13.5rem] w-[86%] shrink-0 snap-start overflow-hidden rounded-panel no-underline shadow-card sm:h-[15rem] sm:w-[60%]">
            <img src={b.img} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: b.pos }} {...imgPriority(n)} />
            {/* Dark wash from the bottom so the white text always reads, whatever the photo */}
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_40_30/0.92)_0%,rgb(10_40_30/0.55)_45%,rgb(10_40_30/0)_75%)]" />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-terracotta-deep">{tr(`b${b.n}tag`)}</span>
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="mb-2 block font-head text-[1.3rem] font-semibold leading-[1.2] text-white">{tr(`b${b.n}title`)}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-small font-bold text-green">{tr(`b${b.n}cta`)} <Icon name="arrow" size={15} /></span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex justify-center"><Dots count={BANNERS.length} i={i} go={(n) => { setTouched(true); goTo(n); }} tr={tr} /></div>
    </div>
  );
}

function ServiceGrid({ tr }: { tr: Tr }) {
  return (
    <div className="rounded-panel bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-body text-base font-extrabold text-ink">{tr('need')}</h2>
        <Link to="/care" className="text-small font-bold text-terracotta-deep no-underline">{tr('seeAll')}</Link>
      </div>
      <ul className="grid grid-cols-4 gap-x-2 gap-y-4">
        {SERVICES.map((s) => (
          <li key={s.k}>
            <Link to={s.to} className="group flex flex-col items-center gap-1.5 text-center no-underline">
              <span className={`grid h-14 w-14 place-items-center rounded-tile transition-transform group-active:scale-95 ${s.tint}`}><Icon name={s.icon} size={24} /></span>
              <span className="text-[0.78rem] font-semibold leading-tight text-ink">{tr(s.k)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdvisorCard({ tr }: { tr: Tr }) {
  return (
    <div className="relative overflow-hidden rounded-panel bg-green p-4 text-white shadow-card">
      <span aria-hidden="true" className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/[0.06]" />
      <span aria-hidden="true" className="absolute -bottom-12 right-10 h-24 w-24 rounded-full bg-white/[0.05]" />
      <div className="relative flex items-center gap-3">
        <img src="/images/nurse-portrait.webp" alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-2 ring-white/30" />
        <div className="min-w-0">
          <p className="font-bold leading-tight">{tr('advTitle')}</p>
          <p className="text-small text-mint">{tr('advText')}</p>
        </div>
      </div>
      <div className="relative mt-3 grid grid-cols-2 gap-2">
        <a href={SITE.phoneHref} className="flex min-h-tap items-center justify-center gap-2 rounded-btn bg-white text-small font-bold text-green no-underline"><Icon name="phone" size={17} /> {tr('call')}</a>
        <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="flex min-h-tap items-center justify-center gap-2 rounded-btn bg-whatsapp text-small font-bold text-white no-underline"><Icon name="whatsapp" size={17} /> {tr('whatsapp')}</a>
      </div>
    </div>
  );
}

function TrustStrip({ tr }: { tr: Tr }) {
  const items = [{ k: 'm1', icon: 'verified' }, { k: 'm2', icon: 'userCheck' }, { k: 'm3', icon: 'clock' }];
  return (
    <ul className="grid grid-cols-3 divide-x divide-line rounded-panel bg-white py-3 shadow-card">
      {items.map((t) => (
        <li key={t.k} className="flex flex-col items-center gap-1 px-1 text-center">
          <Icon name={t.icon} size={20} className="text-green" />
          <span className="text-[0.78rem] font-bold leading-tight text-ink">{tr(t.k)}<span className="block font-semibold text-grey">{tr(`${t.k}s`)}</span></span>
        </li>
      ))}
    </ul>
  );
}

function Mobile({ tr }: { tr: Tr }) {
  return (
    <m.div initial="hidden" animate="show" variants={stagger(0.05)} className="container space-y-5 pb-8 pt-2 lg:hidden">
      <m.div variants={fadeRise} className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-1.5 text-small">
          <Icon name="pin" size={16} className="shrink-0 text-terracotta-deep" />
          <span className="truncate font-semibold text-ink">{tr('area')}</span>
        </p>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.72rem] font-bold text-green ring-1 ring-green/15">
          <span className="h-1.5 w-1.5 rounded-full bg-whatsapp motion-safe:animate-pulse" /> {tr('open')}
        </span>
      </m.div>
      <m.div variants={fadeRise}>
        <h1 className="mb-4 font-head text-[1.7rem] font-semibold leading-[1.2] tracking-[-0.01em] text-green sm:text-[2rem]">
          <Accent text={tr('h1')} />
        </h1>
        <Search tr={tr} placeholder={tr('phShort')} />
      </m.div>
      <m.div variants={fadeRise}><PeekCarousel tr={tr} /></m.div>
      <m.div variants={fadeRise}><ServiceGrid tr={tr} /></m.div>
      <m.div variants={fadeRise}><AdvisorCard tr={tr} /></m.div>
      <m.div variants={fadeRise}><TrustStrip tr={tr} /></m.div>
    </m.div>
  );
}

export default function Hero() {
  const tr = useT(T);
  return (
    <section className="relative bg-[linear-gradient(to_bottom,#EEF5F1,#F4F7F6_60%,#FFFFFF)] pt-[var(--header-space)] lg:bg-none lg:bg-[#EEF5F1]">
      <Mobile tr={tr} />
      <Desktop tr={tr} />
    </section>
  );
}
