// Typed access to the sample data. Prices and the launch range are illustrative and are to
// be agreed with pharmacy partners (pitch deck p.3). TODO: API: replace JSON with the catalogue service.
import categoriesJson from './categories.json';
import shopViewsJson from './shop-views.json';
import productsJson from './products.json';
import servicesJson from './services.json';
import plansJson from './plans.json';
import faqsJson from './faqs.json';
import teamJson from './team.json';
import testimonialsJson from './testimonials.json';
import { localize } from '../i18n/LangContext';
import type { Category, Faq, Lang, Plan, Product, PurchaseMode, Service, TeamMember, Testimonial } from './types';

export type * from './types';

export const categories = categoriesJson as Category[];
/** Extra shop views from the site map: Rent equipment and Marketplace sellers. */
export const shopViews = shopViewsJson as Category[];
export const products = productsJson as Product[];
export const services = servicesJson as Service[];
export const subscriptionPlans = plansJson as Plan[];
export const faqs = faqsJson as Faq[];
export const team = teamJson as TeamMember[];
/** Empty until real stories are collected with written consent. TODO: client */
export const testimonials = testimonialsJson as Testimonial[];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getService = (id: string) => services.find((s) => s.id === id);

export const unitPrice = (p: Product, mode: PurchaseMode) => (mode === 'rent' ? p.rentPerMonth ?? 0 : p.price ?? 0);

const DELIVERY: Record<Lang, [string, string, string]> = {
  en: ['Today by 6 pm', 'Tomorrow', 'In 2 days'],
  hi: ['आज शाम 6 बजे तक', 'कल', '2 दिन में'],
  mr: ['आज संध्याकाळी 6 पर्यंत', 'उद्या', '2 दिवसांत'],
};

export const deliveryLabel = (hours: number, lang: Lang = 'en') =>
  DELIVERY[lang][hours <= 6 ? 0 : hours <= 24 ? 1 : 2];

const FAQ: Record<Lang, Record<string, string>> = {
  en: {
    whenQ: 'When will it arrive?',
    whenA: '{when} in Mumbai, Navi Mumbai and Thane. Share the OTP with the rider at the door.',
    returnQ: 'Can I return it?',
    returnA: 'Unopened items can be returned within 7 days. Medicines cannot be returned once delivered, for your safety.',
    rxQ: 'Why do I need a prescription?',
    rxA: "By law this medicine is sold only with a valid doctor's prescription. A registered pharmacist checks it before we pack your order. If anything is unclear, the pharmacist will call you.",
    rentQ: 'How does renting work?',
    rentA: 'Pay month by month. We deliver, set it up and pick it up when you are done. A refundable deposit may apply.',
    subQ: 'How does subscribe work?',
    subA: 'We deliver every month on the same date. You get a reminder before each order and can pause or change anytime.',
  },
  hi: {
    whenQ: 'यह कब पहुँचेगा?',
    whenA: 'मुंबई, नवी मुंबई और ठाणे में {when} पहुँचेगा। दरवाज़े पर राइडर को OTP बताएँ।',
    returnQ: 'क्या मैं इसे लौटा सकता/सकती हूँ?',
    returnA: 'बिना खोला सामान 7 दिनों के अंदर लौटाया जा सकता है। आपकी सुरक्षा के लिए, डिलिवरी के बाद दवाइयाँ वापस नहीं ली जातीं।',
    rxQ: 'मुझे पर्चे की ज़रूरत क्यों है?',
    rxA: 'क़ानून के अनुसार यह दवा सिर्फ़ डॉक्टर के वैध पर्चे पर ही मिलती है। आपका ऑर्डर पैक करने से पहले रजिस्टर्ड फ़ार्मासिस्ट पर्चा जाँचते हैं। कुछ भी साफ़ न हो, तो फ़ार्मासिस्ट आपको कॉल करेंगे।',
    rentQ: 'किराये पर लेना कैसे काम करता है?',
    rentA: 'किराया हर महीने भरें। हम पहुँचाते हैं, लगाकर देते हैं, और आपका काम पूरा होने पर वापस ले जाते हैं। वापस मिलने वाली डिपॉज़िट राशि लग सकती है।',
    subQ: 'सब्सक्रिप्शन कैसे काम करता है?',
    subA: 'हम हर महीने उसी तारीख़ को डिलिवरी करते हैं। हर ऑर्डर से पहले आपको याद दिलाया जाता है, और आप कभी भी रोक या बदल सकते हैं।',
  },
  mr: {
    whenQ: 'हे कधी पोहोचेल?',
    whenA: 'मुंबई, नवी मुंबई आणि ठाणे येथे {when} पोहोचेल. दारात रायडरला OTP सांगा.',
    returnQ: 'मी हे परत करू शकतो/शकते का?',
    returnA: 'न उघडलेल्या वस्तू 7 दिवसांच्या आत परत करता येतात. तुमच्या सुरक्षिततेसाठी, डिलिव्हरीनंतर औषधे परत घेतली जात नाहीत.',
    rxQ: 'मला प्रिस्क्रिप्शन का लागेल?',
    rxA: 'कायद्यानुसार हे औषध फक्त डॉक्टरांच्या वैध प्रिस्क्रिप्शनवरच मिळते. तुमची ऑर्डर पॅक करण्यापूर्वी नोंदणीकृत फार्मासिस्ट ते तपासतात. काही स्पष्ट नसल्यास, फार्मासिस्ट तुम्हाला कॉल करतील.',
    rentQ: 'भाड्याने घेणे कसे चालते?',
    rentA: 'भाडे दर महिन्याला भरा. आम्ही पोहोचवतो, बसवून देतो आणि तुमचे काम झाल्यावर परत घेऊन जातो. परत मिळणारी अनामत रक्कम लागू शकते.',
    subQ: 'सदस्यता कशी चालते?',
    subA: 'आम्ही दर महिन्याला त्याच तारखेला डिलिव्हरी करतो. प्रत्येक ऑर्डरपूर्वी तुम्हाला आठवण करून दिली जाते, आणि तुम्ही कधीही थांबवू किंवा बदलू शकता.',
  },
};

export const productFaq = (p: Product, lang: Lang = 'en') => {
  const item = localize(p, lang);
  const f = FAQ[lang];
  const faq = [
    { q: f.whenQ, a: f.whenA.replace('{when}', deliveryLabel(item.deliveryHours, lang)) },
    { q: f.returnQ, a: f.returnA },
  ];
  if (item.rx) faq.unshift({ q: f.rxQ, a: f.rxA });
  if (item.rentPerMonth) faq.push({ q: f.rentQ, a: f.rentA });
  if (item.subscribe) faq.push({ q: f.subQ, a: f.subA });
  return faq;
};
