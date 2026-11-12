import type { User } from '../context/AuthContext';
import type { CartItem, Order, OrderStatus } from '../context/CartContext';
import { getProduct, unitPrice } from '.';
import { SITE } from '../config/site';

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
export const DEMO_PHONE = '9876543210';
/** Until SMS codes are switched on, this is the one-time code for every account. */
export const DEMO_CODE = '123456';
export const DEMO_USER: User = { name: 'Rohan Patil', phone: DEMO_PHONE, since: '2024-06-10T10:00:00.000Z' };

export const isDemoPhone = (phone?: string | null) => DEMO_ENABLED && phone === DEMO_PHONE;
/** 9876543210 -> 98765 43210 */
export const formatPhone = (phone: string) => `${phone.slice(0, 5)} ${phone.slice(5)}`;

const DAY = 24 * 60 * 60 * 1000;
const PARENTS = { house: 'B-4, Shanti Niwas, Ram Maruti Road', area: 'Naupada, Thane West', pincode: '400602' };
const HOME = { house: 'Flat 1203, Sai Krupa Towers, Sector 17', area: 'Vashi, Navi Mumbai', pincode: '400703' };
const where = (a: typeof PARENTS) => `${a.house}, ${a.area}, ${a.pincode}`;

function order(id: string, daysAgo: number, items: CartItem[], status: OrderStatus, address = PARENTS): Order {
  const subtotal = items.reduce((s, i) => {
    const p = getProduct(i.id);
    return s + (p ? unitPrice(p, i.mode) * i.qty : 0);
  }, 0);
  const fee = subtotal >= SITE.delivery.freeAbove ? 0 : SITE.delivery.fee;
  return {
    id,
    date: new Date(Date.now() - daysAgo * DAY).toISOString(),
    items,
    total: subtotal + fee,
    status,
    slotId: 'today-6pm',
    slot: 'Today, by 6 pm',
    phone: DEMO_PHONE,
    address: where(address),
  };
}

/** Newest first, like the order list. */
export const demoOrders = (): Order[] => [
  // Just placed, prescription medicine: waiting for the pharmacist
  order('W2C731842', 0.125, [{ id: 'telmisartan-40', mode: 'buy', qty: 2, supplyDays: 30 }], 'awaiting-pharmacist'),
  order('W2C729305', 1, [{ id: 'glucometer-kit', mode: 'buy', qty: 1, supplyDays: 30 }], 'packed'),
  order('W2C724118', 9, [
    { id: 'metformin-500', mode: 'buy', qty: 4, supplyDays: 30 },
    { id: 'amlodipine-5', mode: 'buy', qty: 2, supplyDays: 30 },
  ], 'delivered'),
  // Monthly plan: the next delivery reminder comes up on its own
  order('W2C719560', 20, [{ id: 'multivitamin', mode: 'subscribe', qty: 1 }], 'delivered'),
  // A 30-day supply bought 28 days ago: the refill reminder is due now
  order('W2C716204', 28, [
    { id: 'adult-diapers-m', mode: 'buy', qty: 3, supplyDays: 30 },
    { id: 'underpads', mode: 'buy', qty: 2, supplyDays: 30 },
  ], 'delivered'),
  order('W2C702957', 52, [
    { id: 'bp-monitor', mode: 'buy', qty: 1 },
    { id: 'walking-stick', mode: 'buy', qty: 1 },
  ], 'delivered', HOME),
];

/** Older "order placed" notes start as read, so the bell shows only what is new. */
export const demoReadIds = (): string[] =>
  demoOrders().filter((o) => Date.now() - Date.parse(o.date) > 3 * DAY).map((o) => `order-${o.id}`);

const demoFamily = () => [
  { id: 'demo-asha', name: 'Asha Patil', relation: 'mother', age: '72', phone: '9876500011', notes: 'Type 2 diabetes and high blood pressure. Takes her medicines morning and night.' },
  { id: 'demo-vinod', name: 'Vinod Patil', relation: 'father', age: '76', phone: '', notes: 'Uses adult diapers (medium). Needs help walking since his knee surgery.' },
];

const demoAddresses = () => [
  { id: 'demo-parents', label: 'parents', forWhom: 'Asha and Vinod Patil', ...PARENTS },
  { id: 'demo-home', label: 'home', forWhom: '', ...HOME },
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
