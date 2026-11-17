// Types for the sample data in /src/data/*.json.
// Text fields may carry Hindi / Marathi overrides in `hi` / `mr`; render through loc(item).

export type Lang = 'en' | 'hi' | 'mr';
export type Localized<T> = T & { hi?: Partial<T>; mr?: Partial<T> };

/** A CSS colour reference used for a card's category edge, e.g. "var(--terracotta)". */
export type Edge = string;

export interface CategoryText { name: string; blurb: string }
export type Category = Localized<CategoryText> & {
  slug: string;
  icon: string;
  /** Card photo (4:3, 640x480; a 320x240 copy sits beside it as <name>-sm.webp). Stock until the product shoot. */
  image?: string;
  edge: Edge;
  launch?: boolean;
};

export interface ProductText { name: string; pack: string; desc: string }
export type Product = Localized<ProductText> & {
  id: string;
  cat: string;
  brand: string;
  /** Sample price in rupees. TODO: API (final prices agreed with pharmacy partners). */
  price?: number;
  rentPerMonth?: number;
  rentOnly?: boolean;
  /** Product photo (square WebP, with a -sm.webp twin at 400px). Without one, a drawing is shown. */
  image?: string;
  /** Needs a valid prescription. Rx items never carry offer or discount badges (guidelines p.11). */
  rx: boolean;
  chronic?: boolean;
  subscribe?: boolean;
  launch?: boolean;
  seller: string;
  sellerVerified?: boolean;
  deliveryHours: number;
  popular: number;
};

export interface ServiceText { name: string; short: string; includes: string[]; duration: string }
export type Service = Localized<ServiceText> & {
  id: string;
  image?: string;
  icon: string;
  edge: Edge;
  specialised?: boolean;
  /** Newly launched: shown with a "New" tag and a yellow outline so it stands out. */
  isNew?: boolean;
  /** A related page shown as a secondary link on the card (dementia care -> Safe-zone band). */
  related?: string;
};

export interface PlanText { name: string; often: string; points: string[] }
export type Plan = Localized<PlanText> & { id: string; icon: string; edge: Edge };

export interface FaqText { q: string; a: string }
export type Faq = Localized<FaqText>;

export interface TeamText { role: string }
export type TeamMember = Localized<TeamText> & { name: string; photo?: string };

/** Real family stories only, shared with written permission (guidelines p.9). */
export interface TestimonialText { quote: string; relation: string }
export type Testimonial = Localized<TestimonialText> & { name: string; city: string; consentOnFile: true };

export type PurchaseMode = 'buy' | 'rent' | 'subscribe';

// Accounts, carts and orders. Kept here (not in the React contexts) so the app in mobile/ can share them.
export interface User { name: string; phone: string; since: string }

/** supplyDays: how long this order should last. Used for refill reminders (see NotificationsContext).
 *  remind: false when the family chose "No" to a refill reminder on the product page. */
export interface CartItem { id: string; mode: PurchaseMode; qty: number; supplyDays?: number; remind?: boolean }

/** Stored as a code, shown in the reader's language. */
export type OrderStatus = 'awaiting-pharmacist' | 'packed' | 'delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  [detail: string]: unknown;
}
