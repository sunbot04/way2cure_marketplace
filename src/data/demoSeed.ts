// Sample data for the demo account, with no React or browser code, so the website
// (data/demoAccount.ts) and the customer app (../customer-app, which copies it with npm run sync-shared) sign in to the same account and see the
// same orders.
//
//   Mobile 98765 43210 · code 123456
//
// TODO: API: remove once real accounts exist.
import type { CartItem, Order, OrderStatus } from './types';
import { getProduct, unitPrice } from './catalog';
import { SITE } from '../config/site';

export const DEMO_PHONE = '9876543210';
/** Until SMS codes are switched on, this is the one-time code for every account. */
export const DEMO_CODE = '123456';

/** 9876543210 -> 98765 43210 */
export const formatPhone = (phone: string) => `${phone.slice(0, 5)} ${phone.slice(5)}`;

const DAY = 24 * 60 * 60 * 1000;
export const DEMO_PARENTS = { house: 'B-4, Shanti Niwas, Ram Maruti Road', area: 'Naupada, Thane West', pincode: '400602' };
export const DEMO_HOME = { house: 'Flat 1203, Sai Krupa Towers, Sector 17', area: 'Vashi, Navi Mumbai', pincode: '400703' };
const where = (a: typeof DEMO_PARENTS) => `${a.house}, ${a.area}, ${a.pincode}`;

/** Item total plus the delivery fee, by the same rule as the cart. */
export function orderTotal(items: CartItem[]) {
  const subtotal = items.reduce((s, i) => {
    const p = getProduct(i.id);
    return s + (p ? unitPrice(p, i.mode) * i.qty : 0);
  }, 0);
  return subtotal + deliveryFeeFor(subtotal);
}

/** Delivery is always its own line before payment: no hidden fees (guidelines p.11). */
export const deliveryFeeFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= SITE.delivery.freeAbove ? 0 : SITE.delivery.fee;

function order(id: string, daysAgo: number, items: CartItem[], status: OrderStatus, address = DEMO_PARENTS): Order {
  return {
    id,
    date: new Date(Date.now() - daysAgo * DAY).toISOString(),
    items,
    total: orderTotal(items),
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
  ], 'delivered', DEMO_HOME),
];
