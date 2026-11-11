import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import RxNotice from '../components/commerce/RxNotice';
import { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { formatPrice, SITE } from '../config/site';
import { useCart } from '../context/CartContext';
import { useT, useLoc, type Dict } from '../i18n/LangContext';
import { QtyStepper } from '../components/commerce/Choice';

const T: Dict = {
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

/** Itemised total, delivery as its own line, no hidden fees (guidelines p.11). Shared with Checkout. */
export function OrderSummary({ children }: { children?: ReactNode }) {
  const tr = useT(T);
  const loc = useLoc();
  const { lines, subtotal, deliveryFee, total } = useCart();
  return (
    <aside aria-labelledby="summary-heading" className="self-start rounded-card bg-white p-6 shadow-card lg:sticky lg:top-24">
      <h2 id="summary-heading" className="mb-4 font-body text-h3m">{tr('orderSummary')}</h2>
      <ul className="grid gap-2 border-b border-mint pb-4 text-base">
        {lines.map((l) => (
          <li key={`${l.id}-${l.mode}`} className="flex justify-between gap-4">
            <span>
              {loc(l.product).name} × {l.qty}
              {l.mode !== 'buy' && <span className="text-grey"> ({l.mode === 'rent' ? tr('rentMonth') : tr('monthly')})</span>}
            </span>
            <span className="shrink-0">{formatPrice(l.total)}</span>
          </li>
        ))}
      </ul>
      <dl className="my-4 grid gap-2">
        <div className="flex justify-between"><dt>{tr('items')}</dt><dd className="m-0">{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between">
          <dt>{tr('delivery')}</dt>
          <dd className="m-0">{deliveryFee ? formatPrice(deliveryFee) : <strong className="text-green">{tr('free')}</strong>}</dd>
        </div>
        <div className="flex justify-between border-t border-mint pt-3 text-h3m font-bold text-green">
          <dt>{tr('totalToPay')}</dt><dd className="m-0">{formatPrice(total)}</dd>
        </div>
      </dl>
      {deliveryFee > 0 && <p className="mb-2 text-base">{tr('freeAbove', { amount: formatPrice(SITE.delivery.freeAbove) })}</p>}
      <p className="text-small text-grey">{tr('noHidden')}</p>
      {children}
    </aside>
  );
}

export default function Cart() {
  const tr = useT(T);
  const loc = useLoc();
  const { lines, setQty, remove, hasRx, count } = useCart();
  const seo = <Seo title={tr('yourCart')} description={tr('empty')} noindex />;

  if (!count) {
    return (
      <>
        {seo}
        <PageHeader title={tr('yourCart')} />
        <div className="container py-10">
          <div className="max-w-2xl rounded-card bg-white p-8 shadow-card">
            <Icon name="cart" size={40} className="mb-3 text-sage" />
            <h2 className="font-body text-h3m">{tr('empty')}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/shop/medicines">{tr('orderMedicines')}</Button>
              <Button to="/account" variant="outline">{tr('reorder')}</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {seo}
      <PageHeader title={tr('yourCart')} />
      <div className="container grid gap-8 py-8 md:py-12 lg:grid-cols-[1fr_380px]">
        <div className="grid content-start gap-6">
          {hasRx && <RxNotice />}
          <ul className="grid gap-3" aria-live="polite">
            {lines.map((l) => {
              const p = loc(l.product);
              return (
                <li key={`${l.id}-${l.mode}`} className="grid gap-4 rounded-card bg-white p-5 shadow-card sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <Link to={`/product/${l.id}`} className="text-h3m font-bold text-green no-underline hover:underline">{p.name}</Link>
                    <p className="mb-2 text-base text-grey">{p.pack}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
                      {l.mode === 'rent' && <Tag kind="rent">{tr('rentMonthly')}</Tag>}
                      {l.mode === 'subscribe' && <Tag kind="subscribe">{tr('monthlyPlan')}</Tag>}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
                    <QtyStepper
                      value={l.qty}
                      label={tr('quantityOf', { name: p.name })}
                      lessLabel={tr('oneLess')}
                      moreLabel={tr('oneMore')}
                      onLess={() => setQty(l.id, l.mode, l.qty - 1)}
                      onMore={() => setQty(l.id, l.mode, l.qty + 1)}
                    />
                    <strong className="min-w-[5rem] text-h3m text-green">{formatPrice(l.total)}</strong>
                    <button
                      type="button"
                      className="inline-flex min-h-tap items-center gap-1.5 font-bold text-terracotta-deep underline-offset-4 hover:underline"
                      onClick={() => remove(l.id, l.mode)}
                    >
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
          <Button to="/checkout" block className="mt-4">{tr('continue')}</Button>
        </OrderSummary>
      </div>
    </>
  );
}
