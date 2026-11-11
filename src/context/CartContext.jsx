import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, unitPrice } from '../data/products.js';
import { SITE } from '../config/site.js';

const CartContext = createContext(null);
const CART_KEY = 'w2c-cart';
const ORDERS_KEY = 'w2c-orders';

// Browser storage can be blocked (private mode etc.), so every access is guarded.
const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: cart still works for this visit */
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => read(CART_KEY, []));
  const [orders, setOrders] = useState(() => read(ORDERS_KEY, []));

  useEffect(() => write(CART_KEY, items), [items]);
  useEffect(() => write(ORDERS_KEY, orders), [orders]);

  const same = (a, id, mode) => a.id === id && a.mode === mode;

  const add = (id, mode = 'buy', qty = 1) =>
    setItems((prev) => {
      const found = prev.find((x) => same(x, id, mode));
      if (found) return prev.map((x) => (same(x, id, mode) ? { ...x, qty: x.qty + qty } : x));
      return [...prev, { id, mode, qty }];
    });

  const setQty = (id, mode, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((x) => !same(x, id, mode)) : prev.map((x) => (same(x, id, mode) ? { ...x, qty } : x)),
    );

  const value = useMemo(() => {
    const lines = items
      .map((x) => ({ ...x, product: getProduct(x.id) }))
      .filter((x) => x.product)
      .map((x) => ({ ...x, unit: unitPrice(x.product, x.mode), total: unitPrice(x.product, x.mode) * x.qty }));
    const subtotal = lines.reduce((s, x) => s + x.total, 0);
    const deliveryFee = subtotal === 0 || subtotal >= SITE.delivery.freeAbove ? 0 : SITE.delivery.fee;
    return {
      lines,
      count: items.reduce((s, x) => s + x.qty, 0),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      hasRx: lines.some((x) => x.product.rx),
      add,
      setQty,
      remove: (id, mode) => setQty(id, mode, 0),
      clear: () => setItems([]),
      orders,
      placeOrder: (details) => {
        const order = {
          id: `W2C${Date.now().toString().slice(-6)}`,
          date: new Date().toISOString(),
          items: items,
          total: subtotal + deliveryFee,
          status: lines.some((x) => x.product.rx) ? 'Waiting for pharmacist check' : 'Packed, arriving today',
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

export const useCart = () => useContext(CartContext);
