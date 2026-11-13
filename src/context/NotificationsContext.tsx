import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useCart, type Order } from './CartContext';
import { useAuth } from './AuthContext';
import useAccountStore from '../hooks/useAccountStore';
import { demoReadIds } from '../data/demoAccount';
import { getProduct, type PurchaseMode } from '../data';
import { useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

// Notifications are worked out from the family's orders, so nothing has to be scheduled anywhere:
//  · refill    a supply bought for N days runs out soon ("Time to reorder adult diapers")
//  · delivery  a monthly plan's next delivery is coming up (pause or change before it ships)
//  · order     an order was placed / is waiting for the pharmacist
// Refill and delivery reminders appear REMIND_DAYS_BEFORE days before the date.
// TODO: API: the same rules should run on the server and send SMS / WhatsApp / push, so families
// are reminded even when the site is closed. On the web today they show on the account page, the
// notifications page and, if allowed, as a browser alert while the site is open.

export const REMIND_DAYS_BEFORE = 3;
export const SUPPLY_OPTIONS = [15, 30, 60, 90];
export const DEFAULT_SUPPLY_DAYS = 30;
const PLAN_DAYS = 30; // monthly subscription
const DAY = 24 * 60 * 60 * 1000;

const READ_KEY = 'w2c-notif-read';
const PUSHED_KEY = 'w2c-notif-pushed';
const DEMO_KEY = 'w2c-demo-days';
const NO_IDS: string[] = [];

export interface Reminder {
  id: string;
  kind: 'refill' | 'delivery';
  orderId: string;
  productId: string;
  mode: PurchaseMode;
  qty: number;
  supplyDays: number;
  /** When the reminder shows (ms) */
  at: number;
  /** When the supply runs out / the next delivery ships (ms) */
  dueAt: number;
}
export interface OrderNote {
  id: string;
  kind: 'order';
  orderId: string;
  at: number;
  status: Order['status'];
}
export type Note = Reminder | OrderNote;

/** Products that run out and are bought again: regular medicines, diapers, supplements. */
export const isSupply = (productId: string) => {
  const p = getProduct(productId);
  return !!p && (!!p.subscribe || !!p.chronic);
};

function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeStore(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked */ }
}

export function buildNotes(orders: Order[], now: number): { due: Note[]; upcoming: Reminder[] } {
  const due: Note[] = [];
  const upcoming: Reminder[] = [];
  const time = (o: Order) => new Date(o.date).getTime();

  for (const o of orders) {
    const placed = time(o);
    if (placed <= now) due.push({ id: `order-${o.id}`, kind: 'order', orderId: o.id, at: placed, status: o.status });

    for (const item of o.items) {
      if (item.mode === 'rent' || !isSupply(item.id) || item.remind === false) continue;

      if (item.mode === 'subscribe') {
        // Monthly plan: remind before each delivery. Show the latest one that is due and the next one.
        let k = 1;
        while (placed + k * PLAN_DAYS * DAY - REMIND_DAYS_BEFORE * DAY <= now) k++;
        const make = (n: number): Reminder => {
          const dueAt = placed + n * PLAN_DAYS * DAY;
          return { id: `delivery-${o.id}-${item.id}-${n}`, kind: 'delivery', orderId: o.id, productId: item.id, mode: item.mode, qty: item.qty, supplyDays: PLAN_DAYS, at: dueAt - REMIND_DAYS_BEFORE * DAY, dueAt };
        };
        if (k > 1) due.push(make(k - 1));
        upcoming.push(make(k));
        continue;
      }

      // One-off purchase of a supply: remind before it runs out, unless it has been bought again since.
      const days = item.supplyDays ?? DEFAULT_SUPPLY_DAYS;
      const reorderedLater = orders.some((o2) => time(o2) > placed && o2.items.some((x) => x.id === item.id));
      if (reorderedLater) continue;
      const dueAt = placed + days * DAY;
      const r: Reminder = { id: `refill-${o.id}-${item.id}`, kind: 'refill', orderId: o.id, productId: item.id, mode: item.mode, qty: item.qty, supplyDays: days, at: dueAt - REMIND_DAYS_BEFORE * DAY, dueAt };
      (r.at <= now ? due : upcoming).push(r);
    }
  }
  due.sort((a, b) => b.at - a.at);
  upcoming.sort((a, b) => a.at - b.at);
  return { due, upcoming };
}

interface NotificationsValue {
  due: Note[];
  upcoming: Reminder[];
  unread: number;
  isRead: (id: string) => boolean;
  markRead: (id: string) => void;
  markAllRead: () => void;
  now: number;
  /** Demo only: pretend this many days have passed, to see reminders without waiting. */
  demoDays: number;
  setDemoDays: (n: number) => void;
}

const Ctx = createContext<NotificationsValue | null>(null);

// Browser alert text (short, in the reader's language).
const PUSH: Dict = {
  en: { refill: 'Time to reorder {name}', delivery: 'Next delivery soon: {name}', body: 'Open Way2Cure to see your reminders.' },
  hi: { refill: '{name} दोबारा मँगाने का समय', delivery: 'जल्द अगली डिलिवरी: {name}', body: 'अपने रिमाइंडर देखने के लिए Way2Cure खोलें।' },
  mr: { refill: '{name} पुन्हा मागवण्याची वेळ', delivery: 'लवकरच पुढील डिलिव्हरी: {name}', body: 'तुमच्या आठवणी पाहण्यासाठी Way2Cure उघडा.' },
};

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { orders } = useCart();
  const { user } = useAuth();
  const { lang } = useLang();
  const loc = useLoc();
  const tp = useT(PUSH);
  const [read, setRead] = useAccountStore<string[]>(READ_KEY, NO_IDS, demoReadIds);
  const [demoDays, setDemoDaysState] = useState<number>(() => readStore(DEMO_KEY, 0));
  const [tick, setTick] = useState(() => Date.now());

  // Re-check every minute so a reminder appears without a reload.
  useEffect(() => {
    const t = window.setInterval(() => setTick(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  const now = tick + demoDays * DAY;
  // Reminders belong to the signed-in account: none (and no browser alerts) while signed out.
  const { due, upcoming } = useMemo(() => (user ? buildNotes(orders, now) : { due: [], upcoming: [] }), [user, orders, now]);
  const unread = due.filter((n) => !read.includes(n.id)).length;

  // Browser alerts for new refill / delivery reminders, once each, if the family allowed them.
  useEffect(() => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const pushed = readStore<string[]>(PUSHED_KEY, []);
    const fresh = due.filter((n): n is Reminder => n.kind !== 'order' && !pushed.includes(n.id) && !read.includes(n.id));
    fresh.forEach((n) => {
      const p = getProduct(n.productId);
      if (!p) return;
      try {
        new Notification(tp(n.kind, { name: loc(p).name }), { body: tp('body'), icon: '/logo.png', tag: n.id });
      } catch { /* some browsers only allow alerts from a service worker */ }
    });
    if (fresh.length) writeStore(PUSHED_KEY, [...pushed, ...fresh.map((n) => n.id)]);
  }, [due, read, lang, loc, tp]);

  const value: NotificationsValue = {
    due,
    upcoming,
    unread,
    isRead: (id) => read.includes(id),
    markRead: (id) => setRead((r) => (r.includes(id) ? r : [...r, id])),
    markAllRead: () => setRead((r) => Array.from(new Set([...r, ...due.map((n) => n.id)]))),
    now,
    demoDays,
    setDemoDays: (n) => { setDemoDaysState(n); writeStore(DEMO_KEY, n); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNotifications(): NotificationsValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useNotifications must be used inside <NotificationsProvider>');
  return ctx;
}
