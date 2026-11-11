import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProduct, unitPrice, type Product, type PurchaseMode } from '../data';
import { SITE } from '../config/site';

export interface CartItem { id: string; mode: PurchaseMode; qty: number }
export interface CartLine extends CartItem { product: Product; unit: number; total: number }

/** Stored as a code, shown in the reader's language. */
export type OrderStatus = 'awaiting-pharmacist' | 'packed';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  [detail: string]: unknown;
}

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  hasRx: boolean;
  add: (id: string, mode?: PurchaseMode, qty?: number) => void;
  setQty: (id: string, mode: PurchaseMode, qty: number) => void;
  remove: (id: string, mode: PurchaseMode) => void;
  clear: () => void;
  orders: Order[];
  /** TODO: API: create the order server-side and start payment. */
  placeOrder: (details: Record<string, unknown>) => Order;
  reorder: (order: Order) => void;
}

const CartContext = createContext<CartValue | null>(null);
const CART_KEY = 'w2c-cart';
const ORDERS_KEY = 'w2c-orders';

// Browser storage can be blocked (private mode etc.), so every access is guarded.
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: cart still works for this visit */
  }
}

// Orders saved by earlier versions stored the status as English text.
const normaliseOrder = (o: Order): Order => ({
  ...o,
  status: o.status === 'awaiting-pharmacist' || String(o.status).startsWith('Waiting') ? 'awaiting-pharmacist' : 'packed',
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => read(CART_KEY, []));
  const [orders, setOrders] = useState<Order[]>(() => read<Order[]>(ORDERS_KEY, []).map(normaliseOrder));

  useEffect(() => { write(CART_KEY, items); }, [items]);
  useEffect(() => { write(ORDERS_KEY, orders); }, [orders]);

  const value = useMemo<CartValue>(() => {
    const same = (a: CartItem, id: string, mode: PurchaseMode) => a.id === id && a.mode === mode;

    const add = (id: string, mode: PurchaseMode = 'buy', qty = 1) =>
      setItems((prev) => {
        const found = prev.find((x) => same(x, id, mode));
        if (found) return prev.map((x) => (same(x, id, mode) ? { ...x, qty: x.qty + qty } : x));
        return [...prev, { id, mode, qty }];
      });

    const setQty = (id: string, mode: PurchaseMode, qty: number) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((x) => !same(x, id, mode)) : prev.map((x) => (same(x, id, mode) ? { ...x, qty } : x)),
      );

    const lines: CartLine[] = items.flatMap((x) => {
      const product = getProduct(x.id);
      if (!product) return [];
      const unit = unitPrice(product, x.mode);
      return [{ ...x, product, unit, total: unit * x.qty }];
    });
    const subtotal = lines.reduce((s, x) => s + x.total, 0);
    // Delivery is always shown as its own line before payment: no hidden fees (guidelines p.11).
    const deliveryFee = subtotal === 0 || subtotal >= SITE.delivery.freeAbove ? 0 : SITE.delivery.fee;
    const hasRx = lines.some((x) => x.product.rx);

    return {
      lines,
      count: items.reduce((s, x) => s + x.qty, 0),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      hasRx,
      add,
      setQty,
      remove: (id, mode) => setQty(id, mode, 0),
      clear: () => setItems([]),
      orders,
      placeOrder: (details) => {
        const order: Order = {
          id: `W2C${Date.now().toString().slice(-6)}`,
          date: new Date().toISOString(),
          items,
          total: subtotal + deliveryFee,
          status: hasRx ? 'awaiting-pharmacist' : 'packed',
          ...details,
        };
        setOrders((prev) => [order, ...prev]);
        setItems([]);
        return order;
      },
      reorder: (order) => order.items.forEach((x) => add(x.id, x.mode, x.qty)),
    };
  }, [items, orders]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
