import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import Tag from '../ui/Tag';
import { buttonClass } from '../ui/Button';
import { useLoc, useT } from '../../i18n/LangContext';
import { categories, type Product } from '../../data';
import { formatPrice } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { COPY } from '../copy';

/** Neutral tile until real pack shots arrive (see public/IMAGE_LIST.md). Flat, no gradient. */
export function ProductImage({ product, large = false }: { product: Product; large?: boolean }) {
  const tr = useT(COPY);
  const loc = useLoc();
  const cat = categories.find((c) => c.slug === product.cat);
  return (
    <div
      role="img"
      aria-label={tr('photoSoon', { name: loc(product).name })}
      className={`grid place-items-center rounded-btn bg-cream text-green ${large ? 'aspect-square' : 'aspect-[4/3]'}`}
    >
      <span className="grid place-items-center rounded-full bg-white p-5 shadow-card">
        <Icon name={cat?.icon ?? 'package'} size={large ? 72 : 40} />
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

// Product card (guidelines p.7): category colour on the top edge, name, price, seller, one action.
// Rx items: "Rx needed" tag + the valid-prescription line, and never an offer badge (p.11).
export default function ProductCard({ product }: { product: Product }) {
  const tr = useT(COPY);
  const loc = useLoc();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const p = loc(product);
  const cat = categories.find((c) => c.slug === product.cat);
  const href = `/product/${product.id}`;
  const needsDetails = product.rx || product.rentOnly;

  return (
    <article className="flex flex-col overflow-hidden rounded-card bg-white shadow-card" style={{ borderTop: `5px solid ${cat?.edge ?? 'var(--green)'}` }}>
      <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block p-3 pb-0">
        {product.launch && !product.rx && (
          <span className="absolute left-5 top-5 z-10 rounded px-2 py-0.5 text-small font-bold text-green bg-mustard">{tr('launch')}</span>
        )}
        <ProductImage product={product} />
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <div className="mb-1 flex min-h-0 flex-wrap gap-2">
          {product.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
          {product.rentPerMonth && <Tag kind="rent">{tr('rent')}</Tag>}
          {product.subscribe && !product.rx && <Tag kind="subscribe">{tr('subscribe')}</Tag>}
        </div>
        <h3 className="m-0 text-body leading-snug sm:text-h3m">
          <Link to={href} className="text-green no-underline hover:underline">{p.name}</Link>
        </h3>
        <p className="m-0 text-base text-grey">{p.pack}</p>
        <p className="my-1 text-h3m font-bold text-terracotta-deep">
          {product.rentOnly ? `${formatPrice(product.rentPerMonth ?? 0)} ${tr('perMonth')}` : formatPrice(product.price ?? 0)}
          {product.rentPerMonth && !product.rentOnly && (
            <span className="block text-base font-semibold text-grey">{tr('orRent', { price: formatPrice(product.rentPerMonth) })}</span>
          )}
        </p>
        {product.rx && <p className="m-0 text-small font-bold text-terracotta-deep">{tr('rxShort')}</p>}
        <div className="mb-3 flex-1"><SellerBadge product={product} /></div>
        {needsDetails ? (
          <Link to={href} className={buttonClass('outline', { block: true, compact: true })}>{tr('viewDetails')}</Link>
        ) : (
          <button
            type="button"
            className={buttonClass('primary', { block: true, compact: true })}
            onClick={() => { add(product.id); setAdded(true); }}
          >
            {added ? <><Icon name="check" size={18} /> {tr('added')}</> : tr('addToCart')}
          </button>
        )}
      </div>
    </article>
  );
}
