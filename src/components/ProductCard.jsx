import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { categories } from '../data/products.js';
import { formatPrice } from '../config/site.js';
import { useCart } from '../context/CartContext.jsx';
import { SellerTag, Tag } from './ui.jsx';

export function ProductImage({ product, large }) {
  const cat = categories.find((c) => c.slug === product.cat);
  // Placeholder tile until real product photos are added.
  return (
    <div className={`product-img${large ? ' large' : ''}`} role="img" aria-label={`${product.name}, photo coming soon`}>
      <Icon name={cat?.icon || 'package'} size={large ? 96 : 48} />
    </div>
  );
}

export default function ProductCard({ product }) {
  const { add } = useCart();
  const cat = categories.find((c) => c.slug === product.cat);
  const href = `/product/${product.id}`;
  return (
    <article className="card product-card" style={{ '--edge': cat?.edge }}>
      <Link to={href} className="product-card-media" tabIndex={-1} aria-hidden="true">
        {product.launch && !product.rx && <span className="ribbon">Launch</span>}
        <ProductImage product={product} />
      </Link>
      <div className="product-card-body">
        <div className="tag-row">
          {product.rx && <Tag kind="rx">Rx needed</Tag>}
          {product.rentPerMonth && <Tag kind="rent">Rent</Tag>}
          {product.subscribe && !product.rx && <Tag kind="sub">Subscribe</Tag>}
        </div>
        <h3 className="product-name"><Link to={href}>{product.name}</Link></h3>
        <p className="product-pack">{product.pack}</p>
        <p className="product-price">
          {product.rentOnly ? `${formatPrice(product.rentPerMonth)} / month` : formatPrice(product.price)}
          {product.rentPerMonth && !product.rentOnly && (
            <span className="product-rent"> or {formatPrice(product.rentPerMonth)}/month</span>
          )}
        </p>
        <SellerTag product={product} />
        {product.rx || product.rentOnly ? (
          <Link to={href} className="btn btn-outline btn-block">View details</Link>
        ) : (
          <button type="button" className="btn btn-primary btn-block" onClick={() => add(product.id)}>
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}
