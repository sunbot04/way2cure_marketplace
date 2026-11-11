import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang } from '../data/types';

export type { Lang };
type Vars = Record<string, string | number>;
/** Page-level copy: one object per language. English is complete; others may fall back. */
export type Dict = { en: Record<string, string> } & Partial<Record<Lang, Record<string, string>>>;

// English, Hindi and Marathi across the whole site (Brand guidelines p.6, p.8, p.12).
// - Shared UI words live in `strings` below and are read with t('key').
// - Each page keeps its own copy in a local { en, hi, mr } object and reads it with useT(dict).
// - Data items (products, services, plans, FAQs) carry `hi` / `mr` objects with translated
//   fields; render them through loc(item) from useLoc().
// NOTE: Hindi and Marathi copy should be reviewed by a native speaker (and medical wording by
// the pharmacy partner) before launch.
const strings: Dict = {
  en: {
    home: 'Home', shop: 'Shop', care: 'Care Services', subscriptions: 'Subscriptions',
    uploadRx: 'Upload Prescription', about: 'About', contact: 'Contact', account: 'Account',
    rx: 'Rx', homeCareSite: 'Home care site', login: 'Login', cart: 'Cart', search: 'Search', menu: 'Menu',
    searchPlaceholder: 'Search medicines, devices, care...', callUs: 'Call us', whatsapp: 'WhatsApp',
    heroTitle: 'Care at home, now with everything seniors need.',
    heroText: 'Nurses, doctors and ICU care at home. Medicines, devices and daily care delivered to your door in Mumbai, Navi Mumbai and Thane.',
    orderMedicines: 'Order medicines', bookNurse: 'Book a nurse', language: 'Language',
  },
  hi: {
    home: 'होम', shop: 'खरीदारी', care: 'देखभाल सेवाएँ', subscriptions: 'सब्सक्रिप्शन',
    uploadRx: 'पर्चा अपलोड करें', about: 'हमारे बारे में', contact: 'संपर्क', account: 'खाता',
    rx: 'पर्चा', homeCareSite: 'होम केयर साइट', login: 'लॉग इन', cart: 'कार्ट', search: 'खोजें', menu: 'मेनू',
    searchPlaceholder: 'दवाइयाँ, उपकरण, देखभाल खोजें...', callUs: 'कॉल करें', whatsapp: 'व्हाट्सऐप',
    heroTitle: 'घर पर देखभाल, अब बुज़ुर्गों की हर ज़रूरत के साथ।',
    heroText: 'घर पर नर्स, डॉक्टर और आईसीयू देखभाल। मुंबई, नवी मुंबई और ठाणे में दवाइयाँ, उपकरण और रोज़ की ज़रूरतें आपके दरवाज़े तक।',
    orderMedicines: 'दवाइयाँ मँगाएँ', bookNurse: 'नर्स बुक करें', language: 'भाषा',
  },
  mr: {
    home: 'मुख्यपृष्ठ', shop: 'खरेदी', care: 'काळजी सेवा', subscriptions: 'सदस्यता',
    uploadRx: 'प्रिस्क्रिप्शन अपलोड करा', about: 'आमच्याबद्दल', contact: 'संपर्क', account: 'खाते',
    rx: 'प्रिस्क्रिप्शन', homeCareSite: 'होम केअर साइट', login: 'लॉग इन', cart: 'कार्ट', search: 'शोधा', menu: 'मेनू',
    searchPlaceholder: 'औषधे, उपकरणे, काळजी शोधा...', callUs: 'कॉल करा', whatsapp: 'व्हॉट्सॲप',
    heroTitle: 'घरी काळजी, आता ज्येष्ठांना लागणाऱ्या सर्व गोष्टींसह.',
    heroText: 'घरी नर्स, डॉक्टर आणि आयसीयू काळजी. मुंबई, नवी मुंबई आणि ठाणे येथे औषधे, उपकरणे आणि रोजच्या गरजा तुमच्या दारात.',
    orderMedicines: 'औषधे मागवा', bookNurse: 'नर्स बुक करा', language: 'भाषा',
  },
};

export const languages: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
];

const isLang = (v: unknown): v is Lang => v === 'en' || v === 'hi' || v === 'mr';

interface LangValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Shared UI words from `strings`. */
  t: (key: string, vars?: Vars) => string;
}

const LangContext = createContext<LangValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      if (isLang(fromUrl)) return fromUrl;
      const saved = localStorage.getItem('w2c-lang');
      return isLang(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('w2c-lang', lang);
    } catch {
      /* storage unavailable: language still works for this visit */
    }
  }, [lang]);

  const t = (key: string, vars?: Vars) => fill(strings[lang]?.[key] ?? strings.en[key] ?? key, vars);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}

// Replaces {name} placeholders: fill('Hello {name}', { name: 'Asha' }).
const fill = (s: string, vars?: Vars) =>
  vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => String(vars[k] ?? m)) : s;

// Page-level copy: const tr = useT(T) where T = { en: {...}, hi: {...}, mr: {...} }.
// Missing Hindi/Marathi keys fall back to English, so nothing ever shows blank.
export function useT(dict: Dict) {
  const { lang } = useLang();
  return (key: string, vars?: Vars) => fill(dict[lang]?.[key] ?? dict.en[key] ?? key, vars);
}

type WithLangs = { hi?: object; mr?: object };

// Data items: loc(item) returns the item with its `hi` / `mr` fields laid over the English ones.
export function localize<T extends WithLangs>(item: T, lang: Lang): T;
export function localize<T extends WithLangs>(item: T | undefined, lang: Lang): T | undefined;
export function localize<T extends WithLangs>(item: T | undefined, lang: Lang) {
  if (!item || lang === 'en') return item;
  const over = item[lang];
  return over ? { ...item, ...over } : item;
}

/** loc(item) for defined items, e.g. list.map(loc). Use localize(item, lang) when it may be undefined. */
export function useLoc() {
  const { lang } = useLang();
  return <T extends WithLangs>(item: T): T => localize(item, lang);
}

// Dates in the reader's language, e.g. formatDate('2026-12-02', lang).
export const formatDate = (
  d: string | number | Date,
  lang: Lang,
  opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' },
) => new Date(d).toLocaleDateString(lang === 'en' ? 'en-IN' : `${lang}-IN`, opts);
