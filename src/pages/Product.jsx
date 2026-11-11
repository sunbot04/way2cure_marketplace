import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { ProductImage } from '../components/ProductCard.jsx';
import { getProduct, categories, deliveryLabel, productFaq } from '../data/products.js';
import { formatPrice, isServiceablePincode, SITE } from '../config/site.js';
import { useCart } from '../context/CartContext.jsx';
import { FaqList, HelpBox, RxNotice, SellerTag, Tag, AppQR } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const [mode, setMode] = useState(() => (product?.rentOnly ? 'rent' : 'buy'));
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState('');
  const [pinResult, setPinResult] = useState(null);
  const [added, setAdded] = useState(false);

  if (!product) return <NotFound />;
  const cat = categories.find((c) => c.slug === product.cat);

  const options = [
    !product.rentOnly && { id: 'buy', label: 'Buy', price: formatPrice(product.price) },
    product.rentPerMonth && { id: 'rent', label: 'Rent', price: `${formatPrice(product.rentPerMonth)} / month` },
    product.subscribe && { id: 'subscribe', label: 'Subscribe monthly', price: `${formatPrice(product.price)} each month` },
  ].filter(Boolean);

  const checkPin = (e) => {
    e.preventDefault();
    setPinResult(isServiceablePincode(pin) ? 'ok' : /^\d{6}$/.test(pin) ? 'no' : 'invalid');
  };

  const addToCart = () => {
    add(product.id, mode, qty);
    setAdded(true);
  };

  return (
    <div className="container section-sm">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link> <Icon name="chevron" size={16} />
        <Link to={`/shop/${cat.slug}`}>{cat.name}</Link> <Icon name="chevron" size={16} />
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-layout">
        <div className="product-media card">
          <ProductImage product={product} large />
        </div>

        <div className="product-info">
          <div className="tag-row">
            {product.rx && <Tag kind="rx">Rx needed</Tag>}
            {product.rx && <Tag kind="pharm">Pharmacist verified</Tag>}
            {product.seller !== 'Way2Cure' && <Tag kind="seller">Verified seller</Tag>}
            {product.rentPerMonth && <Tag kind="rent">Rent</Tag>}
          </div>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-pack">{product.brand} · {product.pack}</p>
          <SellerTag product={product} />
          <p>{product.desc}</p>

          {product.rx && <RxNotice />}

          {options.length > 1 && (
            <fieldset className="option-group">
              <legend>How would you like it?</legend>
              {options.map((o) => (
                <label key={o.id} className={`option${mode === o.id ? ' selected' : ''}`}>
                  <input type="radio" name="mode" value={o.id} checked={mode === o.id} onChange={() => setMode(o.id)} />
                  <span><strong>{o.label}</strong><span>{o.price}</span></span>
                </label>
              ))}
            </fieldset>
          )}
          {options.length === 1 && <p className="product-price big">{options[0].price}</p>}
          {mode === 'subscribe' && <p className="small">We remind you before each delivery. Pause or change anytime.</p>}
          {mode === 'rent' && <p className="small">We deliver, set it up and collect it when you are done. A refundable deposit may apply.</p>}

          <form className="pin-check" onSubmit={checkPin}>
            <label htmlFor="pin">Check delivery to your pincode</label>
            <div className="input-row">
              <input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setPinResult(null); }} placeholder="e.g. 400703" aria-describedby="pin-result" />
              <button className="btn btn-outline" type="submit">Check</button>
            </div>
            <p id="pin-result" aria-live="polite" className={`pin-result ${pinResult || ''}`}>
              {pinResult === 'ok' && <><Icon name="truck" size={18} /> Arriving {deliveryLabel(product.deliveryHours).toLowerCase()}. Share the OTP with the rider.</>}
              {pinResult === 'no' && <>We do not deliver to this pincode yet. We serve {SITE.cities}.</>}
              {pinResult === 'invalid' && <>Please enter a 6-digit pincode.</>}
            </p>
          </form>

          {product.rx ? (
            <div className="rx-buy">
              <p><strong>To order this medicine, upload your prescription in the app.</strong> You can also add it to your cart now. Our pharmacist will match your prescription before packing.</p>
              <div className="btn-row">
                <button type="button" className="btn btn-primary" onClick={addToCart}>Add to cart</button>
                <Link to="/prescription" className="btn btn-urgent">Upload prescription</Link>
              </div>
            </div>
          ) : (
            <div className="buy-row">
              <div className="qty" role="group" aria-label="Quantity">
                <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="One less"><Icon name="minus" /></button>
                <span aria-live="polite">{qty}</span>
                <button type="button" onClick={() => setQty((n) => n + 1)} aria-label="One more"><Icon name="plus" /></button>
              </div>
              <button type="button" className="btn btn-primary grow" onClick={addToCart}>
                {mode === 'rent' ? 'Rent this' : mode === 'subscribe' ? 'Start monthly plan' : 'Add to cart'}
              </button>
            </div>
          )}
          {added && (
            <p className="added-note" role="status">
              <Icon name="check" size={18} /> Added to your cart. <Link to="/cart">Go to cart</Link>
            </p>
          )}
        </div>
      </div>

      <div className="two-col section-sm">
        <div>
          <h2>Questions about this item</h2>
          <FaqList items={productFaq(product)} />
        </div>
        <div className="stack">
          {product.rx && <AppQR title="Upload your prescription" />}
          <HelpBox />
        </div>
      </div>
    </div>
  );
}
