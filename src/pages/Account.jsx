import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getProduct } from '../data/products.js';
import { formatPrice } from '../config/site.js';
import { PageHead } from '../components/ui.jsx';

const sections = [
  { to: '/prescription', icon: 'rx', title: 'Prescriptions', text: 'Upload and see past prescriptions in the app' },
  { to: '/subscriptions#manage', icon: 'refresh', title: 'Subscriptions', text: 'Pause, change or cancel your plans' },
  { to: '/contact', icon: 'users', title: 'Family profiles', text: 'Order for parents with their own address and medicines' },
  { to: '/contact', icon: 'pin', title: 'Addresses & payments', text: 'Saved addresses, UPI and cards' },
  { to: '/help', icon: 'support', title: 'Help centre / FAQ', text: 'Answers and support, 24/7' },
  { to: '/safe-zone', icon: 'watch', title: 'Safe-zone band', text: 'For dementia care (coming soon)' },
];

export default function Account() {
  const { orders, reorder } = useCart();
  return (
    <>
      <PageHead eyebrow="Account" title="My orders & tracking">
        <p>See your orders, reorder in one tap, and manage your family's care.</p>
      </PageHead>
      <div className="container section-sm">
        {orders.length ? (
          <ul className="order-list">
            {orders.map((o) => (
              <li key={o.id} className="card order">
                <div className="order-head">
                  <div>
                    <strong>Order {o.id}</strong>
                    <span className="small muted"> · {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <span className="tag tag-pharm">{o.status}</span>
                </div>
                <p className="small">{o.items.map((i) => `${getProduct(i.id)?.name ?? i.id} × ${i.qty}`).join(', ')}</p>
                <div className="order-foot">
                  <strong>{formatPrice(o.total)}</strong>
                  <Link to="/cart" className="btn btn-primary btn-sm" onClick={() => reorder(o)}>
                    <Icon name="refresh" size={18} /> Reorder
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty card">
            <Icon name="package" size={40} />
            <h2 className="h3">No orders yet.</h2>
            <p>When you place an order, it shows here with live tracking. Next time, reorder in one tap.</p>
            <Link to="/shop/medicines" className="btn btn-primary">Order medicines</Link>
          </div>
        )}

        <h2 className="section-title">Your account</h2>
        <div className="grid grid-3">
          {sections.map((s) => (
            <Link key={s.title} to={s.to} className="card tile">
              <span className="tile-icon"><Icon name={s.icon} size={28} /></span>
              <span className="tile-text"><strong>{s.title}</strong><span>{s.text}</span></span>
              <Icon name="chevron" className="tile-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
