import { Link } from 'react-router-dom';
import Icon from './Icon';
import { categories } from '../data';
import { formatPrice } from '../config/site';
import { useCart } from '../context/CartContext';
import { useLoc, useT } from '../i18n/LangContext';
import { SellerTag, Tag } from './legacy-ui';

const T = {
  en: {
    photoSoon: '{name}, photo coming soon',
    launch: 'Launch',
    rx: 'Rx needed',
    rent: 'Rent',
    subscribe: 'Subscribe',
    perMonth: '{price} / month',
    orPerMonth: 'or {price}/month',
    details: 'View details',
    add: 'Add to cart',
  },
  hi: {
    photoSoon: '{name}, फ़ोटो जल्द आएगी',
    launch: 'नया',
    rx: 'पर्चा ज़रूरी',
    rent: 'किराये पर',
    subscribe: 'सब्सक्राइब करें',
    perMonth: '{price} / महीना',
    orPerMonth: 'या {price}/महीना',
    details: 'पूरी जानकारी देखें',
    add: 'कार्ट में डालें',
  },
  mr: {
    photoSoon: '{name}, फोटो लवकरच',
    launch: 'नवीन',
    rx: 'प्रिस्क्रिप्शन आवश्यक',
    rent: 'भाड्याने',
    subscribe: 'सदस्यता घ्या',
    perMonth: '{price} / महिना',
    orPerMonth: 'किंवा {price}/महिना',
    details: 'संपूर्ण माहिती पाहा',
    add: 'कार्टमध्ये टाका',
  },
};

export function ProductImage({ product, large }) {
  const tr = useT(T);
  const loc = useLoc();
  const cat = categories.find((c) => c.slug === product.cat);
  // Placeholder tile until real product photos are added.
  return (
    <div className={`product-img${large ? ' large' : ''}`} role="img" aria-label={tr('photoSoon', { name: loc(product).name })}>
      <Icon name={cat?.icon || 'package'} size={large ? 96 : 48} />
    </div>
  );
}

export default function ProductCard({ product }) {
  const { add } = useCart();
  const tr = useT(T);
  const loc = useLoc();
  const p = loc(product);
  const cat = categories.find((c) => c.slug === product.cat);
  const href = `/product/${product.id}`;
  return (
    <article className="card product-card" style={{ '--edge': cat?.edge }}>
      <Link to={href} className="product-card-media" tabIndex={-1} aria-hidden="true">
        {product.launch && !product.rx && <span className="ribbon">{tr('launch')}</span>}
        <ProductImage product={product} />
      </Link>
      <div className="product-card-body">
        <div className="tag-row">
          {product.rx && <Tag kind="rx">{tr('rx')}</Tag>}
          {product.rentPerMonth && <Tag kind="rent">{tr('rent')}</Tag>}
          {product.subscribe && !product.rx && <Tag kind="sub">{tr('subscribe')}</Tag>}
        </div>
        <h3 className="product-name"><Link to={href}>{p.name}</Link></h3>
        <p className="product-pack">{p.pack}</p>
        <p className="product-price">
          {product.rentOnly ? tr('perMonth', { price: formatPrice(product.rentPerMonth) }) : formatPrice(product.price)}
          {product.rentPerMonth && !product.rentOnly && (
            <span className="product-rent"> {tr('orPerMonth', { price: formatPrice(product.rentPerMonth) })}</span>
          )}
        </p>
        <SellerTag product={product} />
        {product.rx || product.rentOnly ? (
          <Link to={href} className="btn btn-outline btn-block">{tr('details')}</Link>
        ) : (
          <button type="button" className="btn btn-primary btn-block" onClick={() => add(product.id)}>
            {tr('add')}
          </button>
        )}
      </div>
    </article>
  );
}
