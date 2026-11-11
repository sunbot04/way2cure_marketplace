import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { formatPrice, SITE } from '../config/site.js';
import { useCart } from '../context/CartContext.jsx';
import { useT, useLoc } from '../context/LangContext.jsx';
import { PageHead, RxNotice, HelpBox, Tag } from '../components/ui.jsx';

const T = {
  en: {
    orderSummary: 'Order summary', rentMonth: 'rent, 1 month', monthly: 'monthly',
    items: 'Items', delivery: 'Delivery', free: 'Free', totalToPay: 'Total to pay',
    freeAbove: 'Free delivery on orders above {amount}.',
    noHidden: 'No hidden fees. This is the full amount.',
    yourCart: 'Your cart',
    empty: 'Your cart is empty. Start with your regular medicines.',
    orderMedicines: 'Order medicines', reorder: 'Reorder from past orders',
    rxNeeded: 'Rx needed', rentMonthly: 'Rent · monthly', monthlyPlan: 'Monthly plan',
    quantityOf: 'Quantity of {name}', oneLess: 'One less', oneMore: 'One more',
    remove: 'Remove', continue: 'Continue to checkout',
  },
  hi: {
    orderSummary: 'ऑर्डर का सारांश', rentMonth: 'किराया, 1 महीना', monthly: 'हर महीने',
    items: 'सामान', delivery: 'डिलिवरी', free: 'मुफ़्त', totalToPay: 'कुल भुगतान',
    freeAbove: '{amount} से ज़्यादा के ऑर्डर पर डिलिवरी मुफ़्त।',
    noHidden: 'कोई छिपा हुआ शुल्क नहीं। यही पूरी रकम है।',
    yourCart: 'आपका कार्ट',
    empty: 'आपका कार्ट खाली है। अपनी रोज़ की दवाइयों से शुरू करें।',
    orderMedicines: 'दवाइयाँ मँगाएँ', reorder: 'पिछले ऑर्डर फिर से मँगाएँ',
    rxNeeded: 'पर्चा ज़रूरी', rentMonthly: 'किराये पर · प्रति माह', monthlyPlan: 'मासिक प्लान',
    quantityOf: '{name} की मात्रा', oneLess: 'एक कम करें', oneMore: 'एक और जोड़ें',
    remove: 'हटाएँ', continue: 'चेकआउट पर आगे बढ़ें',
  },
  mr: {
    orderSummary: 'ऑर्डरचा सारांश', rentMonth: 'भाडे, 1 महिना', monthly: 'दरमहा',
    items: 'वस्तू', delivery: 'डिलिव्हरी', free: 'मोफत', totalToPay: 'एकूण भरायची रक्कम',
    freeAbove: '{amount} पेक्षा जास्त ऑर्डरवर डिलिव्हरी मोफत.',
    noHidden: 'कोणतेही लपलेले शुल्क नाही. हीच पूर्ण रक्कम आहे.',
    yourCart: 'तुमचे कार्ट',
    empty: 'तुमचे कार्ट रिकामे आहे. तुमच्या नेहमीच्या औषधांपासून सुरुवात करा.',
    orderMedicines: 'औषधे मागवा', reorder: 'मागील ऑर्डर पुन्हा मागवा',
    rxNeeded: 'प्रिस्क्रिप्शन आवश्यक', rentMonthly: 'भाड्याने · दरमहा', monthlyPlan: 'मासिक प्लॅन',
    quantityOf: '{name} ची संख्या', oneLess: 'एक कमी करा', oneMore: 'आणखी एक',
    remove: 'काढा', continue: 'चेकआउटकडे पुढे जा',
  },
};

export function OrderSummary({ children }) {
  const tr = useT(T);
  const loc = useLoc();
  const { lines, subtotal, deliveryFee, total } = useCart();
  return (
    <aside className="card summary" aria-label={tr('orderSummary')}>
      <h2 className="h3">{tr('orderSummary')}</h2>
      <ul className="summary-lines">
        {lines.map((l) => (
          <li key={`${l.id}-${l.mode}`}>
            <span>{loc(l.product).name} × {l.qty}{l.mode !== 'buy' && <em> ({l.mode === 'rent' ? tr('rentMonth') : tr('monthly')})</em>}</span>
            <span>{formatPrice(l.total)}</span>
          </li>
        ))}
      </ul>
      <dl className="summary-totals">
        <div><dt>{tr('items')}</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div>
          <dt>{tr('delivery')}</dt>
          <dd>{deliveryFee ? formatPrice(deliveryFee) : tr('free')}</dd>
        </div>
        <div className="grand"><dt>{tr('totalToPay')}</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
      {deliveryFee > 0 && <p className="small">{tr('freeAbove', { amount: formatPrice(SITE.delivery.freeAbove) })}</p>}
      <p className="small muted">{tr('noHidden')}</p>
      {children}
    </aside>
  );
}

export default function Cart() {
  const tr = useT(T);
  const loc = useLoc();
  const { lines, setQty, remove, hasRx, count } = useCart();

  if (!count) {
    return (
      <>
        <PageHead title={tr('yourCart')} />
        <div className="container section-sm">
          <div className="empty card">
            <Icon name="cart" size={40} />
            <h2 className="h3">{tr('empty')}</h2>
            <div className="btn-row">
              <Link to="/shop/medicines" className="btn btn-primary">{tr('orderMedicines')}</Link>
              <Link to="/account" className="btn btn-outline">{tr('reorder')}</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHead title={tr('yourCart')} />
      <div className="container section-sm checkout-layout">
        <div className="stack">
          {hasRx && <RxNotice />}
          <ul className="cart-lines">
            {lines.map((l) => {
              const p = loc(l.product);
              return (
                <li key={`${l.id}-${l.mode}`} className="card cart-line">
                  <div>
                    <Link to={`/product/${l.id}`} className="cart-name">{p.name}</Link>
                    <p className="small">{p.pack}</p>
                    <div className="tag-row">
                      {p.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
                      {l.mode === 'rent' && <Tag kind="rent">{tr('rentMonthly')}</Tag>}
                      {l.mode === 'subscribe' && <Tag kind="sub">{tr('monthlyPlan')}</Tag>}
                    </div>
                  </div>
                  <div className="cart-controls">
                    <div className="qty" role="group" aria-label={tr('quantityOf', { name: p.name })}>
                      <button type="button" onClick={() => setQty(l.id, l.mode, l.qty - 1)} aria-label={tr('oneLess')}><Icon name="minus" /></button>
                      <span>{l.qty}</span>
                      <button type="button" onClick={() => setQty(l.id, l.mode, l.qty + 1)} aria-label={tr('oneMore')}><Icon name="plus" /></button>
                    </div>
                    <strong>{formatPrice(l.total)}</strong>
                    <button type="button" className="link-btn" onClick={() => remove(l.id, l.mode)}>
                      <Icon name="trash" size={18} /> {tr('remove')}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <HelpBox />
        </div>
        <OrderSummary>
          <Link to="/checkout" className="btn btn-primary btn-block">{tr('continue')}</Link>
        </OrderSummary>
      </div>
    </>
  );
}
