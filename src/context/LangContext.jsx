import { createContext, useContext, useEffect, useState } from 'react';

// English, Hindi and Marathi across the whole site (Brand guidelines p.6, p.8, p.12).
// - Shared UI words live in `strings` below and are read with t('key').
// - Each page keeps its own copy in a local { en, hi, mr } object and reads it with useT(dict).
// - Data items (products, services, plans, FAQs) carry `hi` / `mr` objects with translated
//   fields; render them through loc(item) from useLoc().
// NOTE: Hindi and Marathi copy should be reviewed by a native speaker (and medical wording by
// the pharmacy partner) before launch.
const strings = {
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

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
];

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      if (['en', 'hi', 'mr'].includes(fromUrl)) return fromUrl;
      return localStorage.getItem('w2c-lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('w2c-lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = (key, vars) => fill(strings[lang]?.[key] ?? strings.en[key] ?? key, vars);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// Replaces {name} placeholders: fill('Hello {name}', { name: 'Asha' }).
const fill = (s, vars) =>
  vars && typeof s === 'string' ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m)) : s;

// Page-level copy: const tr = useT(T) where T = { en: {...}, hi: {...}, mr: {...} }.
// Missing Hindi/Marathi keys fall back to English, so nothing ever shows blank.
export function useT(dict) {
  const { lang } = useLang();
  return (key, vars) => fill(dict[lang]?.[key] ?? dict.en?.[key] ?? key, vars);
}

// Data items: loc(item) returns the item with its `hi` / `mr` fields laid over the English ones.
export const localize = (item, lang) =>
  item && lang !== 'en' && item[lang] ? { ...item, ...item[lang] } : item;

export function useLoc() {
  const { lang } = useLang();
  return (item) => localize(item, lang);
}

// Dates in the reader's language, e.g. formatDate('2026-12-02', lang).
export const formatDate = (d, lang, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(d).toLocaleDateString(lang === 'en' ? 'en-IN' : `${lang}-IN`, opts);
