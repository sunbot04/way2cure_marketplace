import { createContext, useContext, useEffect, useState } from 'react';

// English, Hindi and Marathi for the navigation, hero and key actions.
// NOTE: Hindi and Marathi strings are a first draft - have a native speaker review before launch.
// Page body copy falls back to English until full translations are added.
const strings = {
  en: {
    home: 'Home', shop: 'Shop', care: 'Care Services', subscriptions: 'Subscriptions',
    uploadRx: 'Upload Prescription', about: 'About', contact: 'Contact', account: 'Account',
    rx: 'Rx', login: 'Login', cart: 'Cart', search: 'Search', menu: 'Menu',
    searchPlaceholder: 'Search medicines, devices, care...', callUs: 'Call us', whatsapp: 'WhatsApp',
    heroTitle: 'Care at home, now with everything seniors need.',
    heroText: 'Nurses, doctors and ICU care at home. Medicines, devices and daily care delivered to your door in Mumbai, Navi Mumbai and Thane.',
    orderMedicines: 'Order medicines', bookNurse: 'Book a nurse', language: 'Language',
  },
  hi: {
    home: 'होम', shop: 'खरीदारी', care: 'देखभाल सेवाएँ', subscriptions: 'सब्सक्रिप्शन',
    uploadRx: 'पर्चा अपलोड करें', about: 'हमारे बारे में', contact: 'संपर्क', account: 'खाता',
    rx: 'पर्चा', login: 'लॉग इन', cart: 'कार्ट', search: 'खोजें', menu: 'मेनू',
    searchPlaceholder: 'दवाइयाँ, उपकरण, देखभाल खोजें...', callUs: 'कॉल करें', whatsapp: 'व्हाट्सऐप',
    heroTitle: 'घर पर देखभाल, अब बुज़ुर्गों की हर ज़रूरत के साथ।',
    heroText: 'घर पर नर्स, डॉक्टर और आईसीयू देखभाल। मुंबई, नवी मुंबई और ठाणे में दवाइयाँ, उपकरण और रोज़ की ज़रूरतें आपके दरवाज़े तक।',
    orderMedicines: 'दवाइयाँ मँगाएँ', bookNurse: 'नर्स बुक करें', language: 'भाषा',
  },
  mr: {
    home: 'मुख्यपृष्ठ', shop: 'खरेदी', care: 'काळजी सेवा', subscriptions: 'सदस्यता',
    uploadRx: 'प्रिस्क्रिप्शन अपलोड करा', about: 'आमच्याबद्दल', contact: 'संपर्क', account: 'खाते',
    rx: 'प्रिस्क्रिप्शन', login: 'लॉग इन', cart: 'कार्ट', search: 'शोधा', menu: 'मेनू',
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

  const t = (key) => strings[lang]?.[key] ?? strings.en[key] ?? key;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
