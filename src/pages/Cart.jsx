import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { formatPrice, SITE } from '../config/site.js';
import { useCart } from '../context/CartContext.jsx';
import { PageHead, RxNotice, HelpBox, Tag } from '../components/ui.jsx';

export function OrderSummary({ children }) {
  const { lines, subtotal, deliveryFee, total } = useCart();
  return (
    <aside className="card summary" aria-label="Order summary">
      <h2 className="h3">Order summary</h2>
      <ul className="summary-lines">
        {lines.map((l) => (
          <li key={`${l.id}-${l.mode}`}>
            <span>{l.product.name} × {l.qty}{l.mode !== 'buy' && <em> ({l.mode === 'rent' ? 'rent, 1 month' : 'monthly'})</em>}</span>
            <span>{formatPrice(l.total)}</span>
          </li>
        ))}
      </ul>
      <dl className="summary-totals">
        <div><dt>Items</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div>
          <dt>Delivery</dt>
          <dd>{deliveryFee ? formatPrice(deliveryFee) : 'Free'}</dd>
        </div>
        <div className="grand"><dt>Total to pay</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
      {deliveryFee > 0 && <p className="small">Free delivery on orders above {formatPrice(SITE.delivery.freeAbove)}.</p>}
      <p className="small muted">No hidden fees. This is the full amount.</p>
      {children}
    </aside>
  );
}

export default function Cart() {
  const { lines, setQty, remove, hasRx, count } = useCart();

  if (!count) {
    return (
      <>
        <PageHead title="Your cart" />
        <div className="container section-sm">
          <div className="empty card">
            <Icon name="cart" size={40} />
            <h2 className="h3">Your cart is empty. Start with your regular medicines.</h2>
            <div className="btn-row">
              <Link to="/shop/medicines" className="btn btn-primary">Order medicines</Link>
              <Link to="/account" className="btn btn-outline">Reorder from past orders</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHead title="Your cart" />
      <div className="container section-sm checkout-layout">
        <div className="stack">
          {hasRx && <RxNotice />}
          <ul className="cart-lines">
            {lines.map((l) => (
              <li key={`${l.id}-${l.mode}`} className="card cart-line">
                <div>
                  <Link to={`/product/${l.id}`} className="cart-name">{l.product.name}</Link>
                  <p className="small">{l.product.pack}</p>
                  <div className="tag-row">
                    {l.product.rx && <Tag kind="rx">Rx needed</Tag>}
                    {l.mode === 'rent' && <Tag kind="rent">Rent · monthly</Tag>}
                    {l.mode === 'subscribe' && <Tag kind="sub">Monthly plan</Tag>}
                  </div>
                </div>
                <div className="cart-controls">
                  <div className="qty" role="group" aria-label={`Quantity of ${l.product.name}`}>
                    <button type="button" onClick={() => setQty(l.id, l.mode, l.qty - 1)} aria-label="One less"><Icon name="minus" /></button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => setQty(l.id, l.mode, l.qty + 1)} aria-label="One more"><Icon name="plus" /></button>
                  </div>
                  <strong>{formatPrice(l.total)}</strong>
                  <button type="button" className="link-btn" onClick={() => remove(l.id, l.mode)}>
                    <Icon name="trash" size={18} /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <HelpBox />
        </div>
        <OrderSummary>
          <Link to="/checkout" className="btn btn-primary btn-block">Continue to checkout</Link>
        </OrderSummary>
      </div>
    </>
  );
}
