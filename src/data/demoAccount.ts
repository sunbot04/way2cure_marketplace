import type { User } from './types';
import { DEMO_HOME, DEMO_PARENTS, DEMO_PHONE, demoOrders } from './demoSeed';

// Demo account, so the signed-in pages can be shown before the backend exists.
//
//   Mobile 98765 43210 · code 123456   (or the "Log in to the demo account" button on /login)
//
// It is a family member (Rohan) who looks after his parents in Thane. The first time it signs in
// on a browser it gets sample orders, family members and addresses. Order dates are counted back
// from that moment, so a refill reminder is already due. Changes stay in that browser; "Reset demo
// data" on the account page puts the samples back.
//
// Switch it off for launch with VITE_DEMO_ACCOUNT=off: the account and the button disappear.
// TODO: API: remove once real accounts exist.

export const DEMO_ENABLED = import.meta.env.VITE_DEMO_ACCOUNT !== 'off';
// The phone, code, sample orders and addresses live in demoSeed.ts (no React), shared with the customer app (../customer-app).
export { DEMO_CODE, DEMO_PHONE, demoOrders, formatPhone } from './demoSeed';
export const DEMO_USER: User = { name: 'Rohan Patil', phone: DEMO_PHONE, since: '2024-06-10T10:00:00.000Z' };

export const isDemoPhone = (phone?: string | null) => DEMO_ENABLED && phone === DEMO_PHONE;
const DAY = 24 * 60 * 60 * 1000;

/** Older "order placed" notes start as read, so the bell shows only what is new. */
export const demoReadIds = (): string[] =>
  demoOrders().filter((o) => Date.now() - Date.parse(o.date) > 3 * DAY).map((o) => `order-${o.id}`);

const demoFamily = () => [
  { id: 'demo-asha', name: 'Asha Patil', relation: 'mother', age: '72', phone: '9876500011', notes: 'Type 2 diabetes and high blood pressure. Takes her medicines morning and night.' },
  { id: 'demo-vinod', name: 'Vinod Patil', relation: 'father', age: '76', phone: '', notes: 'Uses adult diapers (medium). Needs help walking since his knee surgery.' },
];

const demoAddresses = () => [
  { id: 'demo-parents', label: 'parents', forWhom: 'Asha and Vinod Patil', ...DEMO_PARENTS },
  { id: 'demo-home', label: 'home', forWhom: '', ...DEMO_HOME },
];

/** Sample lists by storage key (see hooks/useStoredList). */
export const DEMO_LISTS: Record<string, () => object[]> = {
  'w2c-family': demoFamily,
  'w2c-addresses': demoAddresses,
};

/** Forget everything the demo account changed in this browser. Reload afterwards. */
export function resetDemoData() {
  try {
    Object.keys(localStorage).filter((k) => k.endsWith(`:${DEMO_PHONE}`)).forEach((k) => localStorage.removeItem(k));
  } catch {
    /* storage blocked: nothing was saved */
  }
}
