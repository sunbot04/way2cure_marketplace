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
