import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import Tag from '../ui/Tag';
import { buttonClass } from '../ui/Button';
import { useLoc, useT, type Dict } from '../../i18n/LangContext';
import { categories, type Product } from '../../data';
import { formatPrice } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { COPY } from '../copy';

// Toast copy for "added to cart": kept short on purpose (the button itself already says "Added",
// and the header cart badge pulses when the count changes).
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

/**
 * Square product image tile until real pack shots arrive (see public/IMAGE_LIST.md): a soft mist
 * panel with the category icon. Flat, no gradient. Inside a `.group` card it zooms to 1.03 on hover.
 */
export function ProductImage({ product, large = false, small = false }: { product: Product; large?: boolean; small?: boolean }) {
  const tr = useT(COPY);
  const loc = useLoc();
  const cat = categories.find((c) => c.slug === product.cat);
  return (
    <div
      role="img"
      aria-label={tr('photoSoon', { name: loc(product).name })}
      className={`grid aspect-square place-items-center overflow-hidden bg-mist text-green ${small ? 'rounded-btn' : 'rounded-tile'}`}
    >
      <span className="grid place-items-center transition-transform duration-slow ease-soft group-hover:scale-[1.03]">
        <span className={`grid place-items-center rounded-full bg-white shadow-card ${small ? 'p-3' : large ? 'p-10' : 'p-6'}`}>
          <Icon name={cat?.icon ?? 'package'} size={small ? 26 : large ? 88 : 44} />
        </span>
      </span>
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

// Product card (guidelines p.7): square image, category, name, pack, price, seller, one action.
// Rx items: "Rx needed" tag + the valid-prescription line, and never an offer or launch badge (p.11).
// Hover: lifts 4px, shadow deepens, image zooms 1.03 inside its frame (transform only).
export default function ProductCard({ product }: { product: Product }) {
  const tr = useT(COPY);
  const loc = useLoc();
  const { add } = useCart();
  const showToast = useCartToast();
  const [added, setAdded] = useState(false);
  const p = loc(product);
  const catRaw = categories.find((c) => c.slug === product.cat);
  const cat = catRaw ? loc(catRaw) : undefined;
  const href = `/product/${product.id}`;
  const needsDetails = product.rx || product.rentOnly;

  // The button says "Added" for a moment, then is ready for another tap.
  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 2500);
    return () => window.clearTimeout(t);
  }, [added]);

  const onAdd = () => {
    add(product.id);
    setAdded(true);
    showToast();
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-tile border border-line bg-white shadow-card transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-1 hover:shadow-raised">
      <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block p-2.5 pb-0">
        {product.launch && !product.rx && (
          <span className="absolute left-5 top-5 z-10 rounded-full bg-mustard px-2.5 py-0.5 text-small font-bold text-green">{tr('launch')}</span>
        )}
        <ProductImage product={product} />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {cat && (
          <p className="m-0 flex items-center gap-1.5 text-small font-semibold text-grey">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: cat.edge }} />
            {cat.name}
          </p>
        )}
        <h3 className="m-0 text-body leading-snug">
          <Link to={href} className="text-green no-underline hover:underline">{p.name}</Link>
        </h3>
        <p className="m-0 text-base text-grey">{p.pack}</p>
        {(product.rx || product.rentPerMonth || (product.subscribe && !product.rx)) && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {product.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
            {product.rentPerMonth && <Tag kind="rent">{tr('rent')}</Tag>}
            {product.subscribe && !product.rx && <Tag kind="subscribe">{tr('subscribe')}</Tag>}
          </div>
        )}
        <p className="m-0 mt-1 font-head text-h3m font-bold text-green">
          {product.rentOnly ? `${formatPrice(product.rentPerMonth ?? 0)} ${tr('perMonth')}` : formatPrice(product.price ?? 0)}
          {product.rentPerMonth && !product.rentOnly && (
            <span className="block font-body text-base font-semibold text-grey">{tr('orRent', { price: formatPrice(product.rentPerMonth) })}</span>
          )}
        </p>
        {product.rx && <p className="m-0 text-small font-bold text-terracotta-deep">{tr('rxShort')}</p>}
        <div className="mb-3 flex-1"><SellerBadge product={product} /></div>
        {needsDetails ? (
          <Link to={href} className={buttonClass('outline', { block: true, compact: true })}>
            {tr('viewDetails')} <Icon name="arrow" size={16} />
          </Link>
        ) : (
          <button type="button" className={buttonClass('primary', { block: true, compact: true })} onClick={onAdd}>
            {added ? <><Icon name="check" size={18} /> {tr('added')}</> : <><Icon name="cart" size={18} /> {tr('addToCart')}</>}
          </button>
        )}
      </div>
    </article>
  );
}
