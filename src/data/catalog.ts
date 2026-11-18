// The catalogue and the rules that price it, with no React or browser code, so the website
// (src/data/index.ts) and the customer app (../customer-app, which copies it with npm run sync-shared) share one copy.
// TODO: API: replace the JSON with the catalogue service.
import categoriesJson from './categories.json';
import productsJson from './products.json';
import servicesJson from './services.json';
import plansJson from './plans.json';
import faqsJson from './faqs.json';
import type { Category, Faq, Lang, Plan, Product, PurchaseMode, Service } from './types';

export const categories = categoriesJson as Category[];
export const products = productsJson as Product[];
export const services = servicesJson as Service[];
export const subscriptionPlans = plansJson as Plan[];
export const faqs = faqsJson as Faq[];

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
