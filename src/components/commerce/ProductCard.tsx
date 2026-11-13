import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { useLoc, useT, type Dict } from '../../i18n/LangContext';
import { categories, type Product } from '../../data';
import { formatPrice } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { useSaved } from '../../context/SavedContext';
import { useToast } from '../../context/ToastContext';
import { COPY } from '../copy';
import ProductArt from './ProductArt';

// Toast copy for "added to cart" on the product page: kept short on purpose (the header cart badge
// pulses when the count changes). Product cards use the shop's cart bar instead.
export const CART_TOAST: Dict = {
  en: { added: 'Added to cart', view: 'View cart' },
  hi: { added: 'कार्ट में डाला', view: 'कार्ट देखें' },
  mr: { added: 'कार्टमध्ये टाकले', view: 'कार्ट पाहा' },
};

/** Show the short "Added to cart" toast with a View cart link. */
export function useCartToast() {
  const toast = useToast();
  const tt = useT(CART_TOAST);
  return () => toast({ message: tt('added'), action: { label: tt('view'), to: '/cart' } });
}

// Soft round light behind the product drawings (two tones that alternate in the grid)
const LIGHT_SKY = 'bg-[radial-gradient(circle_at_50%_45%,#fff_0%,rgb(var(--c-sage-tint))_75%)]';
const LIGHT_MIST = 'bg-[radial-gradient(circle_at_50%_45%,#fff_0%,rgb(var(--c-mist))_75%)]';

/**
 * Square product tile (product page, cart) until real pack shots arrive (see public/IMAGE_LIST.md):
 * the product's drawing on a soft round light. Inside a `.group` it zooms to 1.03 on hover.
 */
export function ProductImage({ product, large = false, small = false }: { product: Product; large?: boolean; small?: boolean }) {
  const tr = useT(COPY);
  const loc = useLoc();
  return (
    <div
      role="img"
      aria-label={tr('photoSoon', { name: loc(product).name })}
      className={`grid aspect-square place-items-center overflow-hidden ${LIGHT_SKY} ${small ? 'rounded-btn' : 'rounded-tile'}`}
    >
      <ProductArt
        product={product}
        className={`h-auto drop-shadow-[0_12px_14px_rgb(38_52_69/0.16)] transition-transform duration-slow ease-soft group-hover:scale-[1.03] ${small ? 'w-[82%]' : large ? 'w-[70%]' : 'w-[74%]'}`}
      />
    </div>
  );
}

export function SellerBadge({ product }: { product: Product }) {
  const tr = useT(COPY);
  return (
    <p className="m-0 flex items-start gap-1.5 text-small text-grey">
      <Icon name="verified" size={18} className="mt-px shrink-0 text-sage" />
      {product.seller === 'Way2Cure' ? tr('soldByUs') : tr('soldBy', { seller: product.seller })}
    </p>
  );
}

// Product card (client design products.html, in the site palette). Two across on phones, three on
// tablets, four on desktop.
//  · Drawing panel with one badge (Rx needed / Rent or buy / Subscribe / Launch) and a heart to save.
//  · Category, name (two lines at most), pack, one note line, then the price and one action:
//    "+ Add", which becomes a − 1 + counter once the item is in the cart (the shop's cart bar shows
//    the total), or "View" for prescription and rent-only items, which are ordered from their page.
//  · Rx items: "Rx needed" and the valid-prescription line, never an offer or launch badge (p.11).
//    Partner sellers are named; Way2Cure's own items are not.
//  · Hover: the card lifts 3px and the drawing rises a little (transform only).
export default function ProductCard({ product, alt = false }: { product: Product; alt?: boolean }) {
  const tr = useT(COPY);
  const loc = useLoc();
  const { lines, add, setQty } = useCart();
  const { has, toggle } = useSaved();
  const p = loc(product);
  const catRaw = categories.find((c) => c.slug === product.cat);
  const cat = catRaw ? loc(catRaw) : undefined;
  const href = `/product/${product.id}`;
  const needsDetails = product.rx || product.rentOnly;
  const qty = lines.find((l) => l.id === product.id && l.mode === 'buy')?.qty ?? 0;
  const saved = has(product.id);

  // Keyboard focus moves to the control that replaces the one just pressed (Add <-> counter).
  const addRef = useRef<HTMLButtonElement>(null);
  const plusRef = useRef<HTMLButtonElement>(null);
  const focusNext = useRef<'add' | 'plus' | null>(null);
  useEffect(() => {
    if (focusNext.current === 'plus') plusRef.current?.focus();
    if (focusNext.current === 'add') addRef.current?.focus();
    focusNext.current = null;
  }, [qty]);

  const badge = product.rx
    ? { text: tr('rxNeeded'), cls: 'bg-terracotta-deep text-white' }
    : product.rentPerMonth
      ? { text: product.rentOnly ? tr('rent') : tr('rentOrBuy'), cls: 'bg-terracotta-deep text-white' }
      : product.subscribe
        ? { text: tr('subscribe'), cls: 'bg-green text-white' }
        : product.launch
          ? { text: tr('launch'), cls: 'bg-mustard text-ink' }
          : null;

  const note = product.rx
    ? { text: tr('rxShort'), cls: 'text-terracotta-deep' }
    : product.rentPerMonth && !product.rentOnly
      ? { text: tr('orRent', { price: formatPrice(product.rentPerMonth) }), cls: 'text-terracotta-deep' }
      : product.subscribe
        ? { text: tr('monthly'), cls: 'text-sage-deep' }
        : null;

  const price: ReactNode = product.rentOnly ? (
    <>{formatPrice(product.rentPerMonth ?? 0)}<span className="ml-1 text-[0.75rem] font-bold text-grey">{tr('perMonth')}</span></>
  ) : (
    formatPrice(product.price ?? 0)
  );

  const btn = 'inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl text-[0.875rem] font-extrabold transition-[background-color,transform] duration-micro ease-soft active:scale-95';
  let action: ReactNode;
  if (needsDetails) {
    action = (
      <Link to={href} aria-label={tr('viewItem', { name: p.name })} className={`${btn} w-10 border-2 border-green text-green no-underline hover:bg-mist md:w-auto md:px-3`}>
        <span className="hidden md:inline">{tr('view')}</span>
        <Icon name="arrow" size={18} />
      </Link>
    );
  } else if (qty > 0) {
    action = (
      <div role="group" aria-label={`${p.name}: ${tr('inCart', { n: qty })}`} className="inline-flex h-10 shrink-0 items-center overflow-hidden rounded-xl bg-sage-tint">
        <button
          type="button"
          aria-label={tr('less', { name: p.name })}
          onClick={() => { if (qty === 1) focusNext.current = 'add'; setQty(product.id, 'buy', qty - 1); }}
          className="grid h-10 w-8 place-items-center text-green transition-colors duration-micro hover:bg-mint"
        >
          <Icon name="minus" size={16} />
        </button>
        <span aria-hidden="true" className="min-w-[1.375rem] text-center text-[0.9375rem] font-extrabold text-green">{qty}</span>
        <button
          ref={plusRef}
          type="button"
          aria-label={tr('more', { name: p.name })}
          onClick={() => add(product.id, 'buy', 1)}
          className="grid h-10 w-8 place-items-center text-green transition-colors duration-micro hover:bg-mint"
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
    );
  } else {
    action = (
      <button
        ref={addRef}
        type="button"
        aria-label={tr('addItem', { name: p.name })}
        onClick={() => { focusNext.current = 'plus'; add(product.id, 'buy', 1); }}
        className={`${btn} w-10 bg-green text-white hover:bg-green-dark md:w-auto md:px-3.5`}
      >
        <Icon name="plus" size={18} />
        <span className="hidden md:inline">{tr('add')}</span>
      </button>
    );
  }

  return (
    <article className="group relative flex h-full flex-col rounded-[1.125rem] border border-line bg-white p-1.5 transition-[transform,box-shadow,border-color] duration-slow ease-soft hover:-translate-y-[3px] hover:border-transparent hover:shadow-[0_20px_40px_-22px_rgb(38_52_69/0.45)] md:rounded-[1.375rem] md:p-2.5">
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`flex h-[8.75rem] items-center justify-center overflow-hidden rounded-[0.875rem] md:h-[12.5rem] md:rounded-tile ${alt ? LIGHT_MIST : LIGHT_SKY}`}
      >
        <ProductArt
          product={product}
          className="h-[6.5rem] w-auto max-w-[88%] drop-shadow-[0_12px_14px_rgb(38_52_69/0.16)] transition-transform duration-slow ease-soft group-hover:-translate-y-1 group-hover:scale-105 md:h-[9.375rem]"
        />
      </Link>
      {badge && (
        <span className={`absolute left-3.5 top-3.5 rounded-[0.4375rem] px-[0.4375rem] py-1 text-[0.625rem] font-extrabold uppercase leading-none tracking-[0.04em] md:left-5 md:top-5 md:rounded-lg md:px-2 md:py-[0.3125rem] md:text-[0.6875rem] ${badge.cls}`}>
          {badge.text}
        </span>
      )}
      <button
        type="button"
        aria-pressed={saved}
        aria-label={tr('save', { name: p.name })}
        onClick={() => toggle(product.id)}
        className={`absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white shadow-[0_4px_10px_-4px_rgb(38_52_69/0.3)] transition-transform duration-micro ease-soft hover:scale-110 md:right-3.5 md:top-3.5 ${saved ? 'text-terracotta-deep' : 'text-green'}`}
      >
        <Icon name="heart" size={17} filled={saved} />
      </button>

      <div className="flex flex-1 flex-col px-1 pb-0.5 pt-2.5 md:px-1.5 md:pb-1 md:pt-3">
        {cat && <p className="m-0 mb-[3px] text-[0.6875rem] font-extrabold uppercase leading-snug tracking-[0.06em] text-sage-deep md:mb-1 md:text-[0.71875rem]">{cat.name}</p>}
        <h3 className="m-0 mb-0.5 font-body text-[0.9375rem] font-extrabold leading-[1.3] md:text-[0.96875rem]">
          <Link to={href} className="line-clamp-2 text-green no-underline hover:underline">{p.name}</Link>
        </h3>
        <p className="m-0 text-[0.8125rem] font-semibold text-grey">{p.pack}</p>
        {note && <p className={`m-0 mt-1 text-[0.75rem] font-bold leading-[1.35] md:mt-1.5 md:text-[0.78125rem] ${note.cls}`}>{note.text}</p>}
        {product.seller !== 'Way2Cure' && <p className="m-0 mt-1 text-[0.75rem] leading-[1.35] text-grey">{tr('seller', { seller: product.seller })}</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2.5 md:flex-nowrap md:pt-3">
          <p className="m-0 text-[1.0625rem] font-extrabold leading-[1.1] text-ink md:text-[1.1875rem]">{price}</p>
          {action}
        </div>
      </div>
    </article>
  );
}
