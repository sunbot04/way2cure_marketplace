import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import RxNotice from '../components/commerce/RxNotice';
import { ProductImage } from '../components/commerce/ProductCard';
import { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { formatPrice, SITE } from '../config/site';
import { useCart } from '../context/CartContext';
import { categories } from '../data';
import { useLang, useT, useLoc, type Dict } from '../i18n/LangContext';
import { QtyStepper } from '../components/commerce/Choice';
import { crossfade, tReveal } from '../lib/motion';

const T: Dict = {
  en: {
    lasts: 'Lasts {n} days · reminder set',
    orderSummary: 'Order summary', rentMonth: 'rent, 1 month', monthly: 'monthly',
    items: 'Items', delivery: 'Delivery', free: 'Free', totalToPay: 'Total to pay',
    freeAbove: 'Free delivery on orders above {amount}.',
    addMore: 'Add {amount} more for free delivery.', freeUnlocked: 'Your order gets free delivery.',
    noHidden: 'No hidden fees. This is the full amount.',
    yourCart: 'Your cart', cartTitle: 'Your cart, *ready when you are.*',
    lead: 'Check the items and quantities, then continue. Delivery is free above {amount}.',
    empty: 'Your cart is empty. Start with your regular medicines.',
    emptyHelp: 'Or call {phone} and we will place the order for you.',
    startWith: 'Popular places to start',
    orderMedicines: 'Order medicines', reorder: 'Reorder from past orders',
    rxNeeded: 'Rx needed', rentMonthly: 'Rent · monthly', monthlyPlan: 'Monthly plan',
    quantityOf: 'Quantity of {name}', oneLess: 'One less', oneMore: 'One more',
    remove: 'Remove', removeName: 'Remove {name}', continue: 'Continue to checkout',
    pharmacist: 'A pharmacist checks every prescription order.',
  },
  hi: {
    lasts: '{n} दिन चलेगा · रिमाइंडर सेट',
    orderSummary: 'ऑर्डर का सारांश', rentMonth: 'किराया, 1 महीना', monthly: 'हर महीने',
    items: 'सामान', delivery: 'डिलिवरी', free: 'मुफ़्त', totalToPay: 'कुल भुगतान',
    freeAbove: '{amount} से ज़्यादा के ऑर्डर पर डिलिवरी मुफ़्त।',
    addMore: 'मुफ़्त डिलिवरी के लिए {amount} का सामान और जोड़ें।', freeUnlocked: 'आपके ऑर्डर पर डिलिवरी मुफ़्त है।',
    noHidden: 'कोई छिपा हुआ शुल्क नहीं। यही पूरी रकम है।',
    yourCart: 'आपका कार्ट', cartTitle: 'आपका कार्ट, *जब आप तैयार हों।*',
    lead: 'सामान और मात्रा जाँच लें, फिर आगे बढ़ें। {amount} से ज़्यादा पर डिलिवरी मुफ़्त है।',
    empty: 'आपका कार्ट खाली है। अपनी रोज़ की दवाइयों से शुरू करें।',
    emptyHelp: 'या {phone} पर कॉल करें, हम आपके लिए ऑर्डर कर देंगे।',
    startWith: 'यहाँ से शुरू करें',
    orderMedicines: 'दवाइयाँ मँगाएँ', reorder: 'पिछले ऑर्डर फिर से मँगाएँ',
    rxNeeded: 'पर्चा ज़रूरी', rentMonthly: 'किराये पर · प्रति माह', monthlyPlan: 'मासिक प्लान',
    quantityOf: '{name} की मात्रा', oneLess: 'एक कम करें', oneMore: 'एक और जोड़ें',
    remove: 'हटाएँ', removeName: '{name} हटाएँ', continue: 'चेकआउट पर आगे बढ़ें',
    pharmacist: 'हर पर्चे वाले ऑर्डर को फ़ार्मासिस्ट जाँचते हैं।',
  },
  mr: {
    lasts: '{n} दिवस पुरेल · आठवण ठरली',
    orderSummary: 'ऑर्डरचा सारांश', rentMonth: 'भाडे, 1 महिना', monthly: 'दरमहा',
    items: 'वस्तू', delivery: 'डिलिव्हरी', free: 'मोफत', totalToPay: 'एकूण भरायची रक्कम',
    freeAbove: '{amount} पेक्षा जास्त ऑर्डरवर डिलिव्हरी मोफत.',
    addMore: 'मोफत डिलिव्हरीसाठी आणखी {amount} ची खरेदी करा.', freeUnlocked: 'तुमच्या ऑर्डरवर डिलिव्हरी मोफत आहे.',
    noHidden: 'कोणतेही लपलेले शुल्क नाही. हीच पूर्ण रक्कम आहे.',
    yourCart: 'तुमचे कार्ट', cartTitle: 'तुमचे कार्ट, *तुम्ही तयार असाल तेव्हा.*',
    lead: 'वस्तू आणि संख्या तपासा, मग पुढे जा. {amount} पेक्षा जास्त ऑर्डरवर डिलिव्हरी मोफत आहे.',
    empty: 'तुमचे कार्ट रिकामे आहे. तुमच्या नेहमीच्या औषधांपासून सुरुवात करा.',
    emptyHelp: 'किंवा {phone} वर कॉल करा, आम्ही तुमच्यासाठी ऑर्डर करू.',
    startWith: 'इथून सुरुवात करा',
    orderMedicines: 'औषधे मागवा', reorder: 'मागील ऑर्डर पुन्हा मागवा',
    rxNeeded: 'प्रिस्क्रिप्शन आवश्यक', rentMonthly: 'भाड्याने · दरमहा', monthlyPlan: 'मासिक प्लॅन',
    quantityOf: '{name} ची संख्या', oneLess: 'एक कमी करा', oneMore: 'आणखी एक',
    remove: 'काढा', removeName: '{name} काढा', continue: 'चेकआउटकडे पुढे जा',
    pharmacist: 'प्रत्येक प्रिस्क्रिप्शन ऑर्डर फार्मासिस्ट तपासतात.',
  },
};

/** Itemised total, delivery as its own line, no hidden fees (guidelines p.11). Shared with Checkout. */
export function OrderSummary({ children }: { children?: ReactNode }) {
  const tr = useT(T);
  const loc = useLoc();
  const { lines, subtotal, deliveryFee, total, hasRx } = useCart();
  const freeAbove = SITE.delivery.freeAbove;
  // Progress towards free delivery: a plain fact, not a countdown or a push to spend.
  const progress = Math.min(1, subtotal / freeAbove);
  return (
    <aside aria-labelledby="summary-heading" className="self-start rounded-panel bg-white p-6 shadow-card lg:sticky lg:top-28 md:p-7">
      <h2 id="summary-heading" className="mb-5 font-body text-h3m md:text-h3">{tr('orderSummary')}</h2>
      <ul className="grid gap-2.5 border-b border-line pb-5 text-base">
        {lines.map((l) => (
          <li key={`${l.id}-${l.mode}`} className="flex justify-between gap-4">
            <span>
              {loc(l.product).name} <span className="text-grey">× {l.qty}</span>
              {l.mode !== 'buy' && <span className="text-grey"> ({l.mode === 'rent' ? tr('rentMonth') : tr('monthly')})</span>}
            </span>
            <span className="shrink-0 tabular-nums">{formatPrice(l.total)}</span>
          </li>
        ))}
      </ul>
      <dl className="my-5 grid gap-2.5">
        <div className="flex justify-between"><dt>{tr('items')}</dt><dd className="m-0 tabular-nums">{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between">
          <dt>{tr('delivery')}</dt>
          <dd className="m-0 tabular-nums">{deliveryFee ? formatPrice(deliveryFee) : <strong className="text-green">{tr('free')}</strong>}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-4 font-head text-h3 font-bold text-green">
          <dt>{tr('totalToPay')}</dt><dd className="m-0 tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
      {subtotal > 0 && (
        <div className="mb-4 rounded-tile bg-mist p-4">
          <p aria-live="polite" className="mb-2 flex items-center gap-2 text-base font-semibold text-green">
            <Icon name="truck" size={18} className="shrink-0" />
            {deliveryFee > 0 ? tr('addMore', { amount: formatPrice(freeAbove - subtotal) }) : tr('freeUnlocked')}
          </p>
          <span aria-hidden="true" className="block h-1.5 overflow-hidden rounded-full bg-white">
            <m.span
              className="block h-full origin-left rounded-full bg-sage"
              initial={false}
              animate={{ scaleX: progress }}
              transition={tReveal}
            />
          </span>
        </div>
      )}
      <p className="mb-1 flex items-center gap-2 text-small text-grey"><Icon name="lock" size={15} className="shrink-0 text-sage" /> {tr('noHidden')}</p>
      {hasRx && <p className="m-0 flex items-center gap-2 text-small text-grey"><Icon name="verified" size={15} className="shrink-0 text-sage" /> {tr('pharmacist')}</p>}
      {children}
    </aside>
  );
}

export default function Cart() {
  const { t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const { lines, setQty, remove, hasRx, count } = useCart();
  const seo = <Seo title={tr('yourCart')} description={tr('empty')} noindex />;
  const crumbs = [{ label: t('home'), to: '/' }, { label: tr('yourCart') }];

  if (!count) {
    const starts = ['medicines', 'daily-care', 'devices'].map((slug) => categories.find((c) => c.slug === slug)).filter((c): c is NonNullable<typeof c> => !!c);
    return (
      <>
        {seo}
        <PageHeader title={tr('yourCart')} crumbs={crumbs} />
        <section className="pb-20">
          <div className="container">
            <Reveal className="grid gap-8 rounded-panel bg-white p-8 shadow-card md:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-mist text-green"><Icon name="cart" size={30} /></span>
                <h2 className="mb-3 font-head text-h2m md:text-h2">{tr('empty')}</h2>
                <p className="text-ink/80">{tr('emptyHelp', { phone: SITE.phone })}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button to="/shop/medicines"><Icon name="pill" size={18} /> {tr('orderMedicines')}</Button>
                  <Button to="/account" variant="outline"><Icon name="refresh" size={18} /> {tr('reorder')}</Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-small font-semibold text-grey">{tr('startWith')}</p>
                <Stagger as="ul" className="grid gap-3">
                  {starts.map(loc).map((c) => (
                    <StaggerItem as="li" key={c.slug}>
                      <Link
                        to={`/shop/${c.slug}`}
                        className="group flex min-h-tap items-center gap-4 rounded-tile border border-line p-4 text-ink no-underline transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-0.5 hover:shadow-raised"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name={c.icon} size={22} /></span>
                        <span className="grid flex-1"><strong className="text-green">{c.name}</strong><span className="text-small text-grey">{c.blurb}</span></span>
                        <Icon name="arrow" size={18} className="text-terracotta-deep" />
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {seo}
      <PageHeader title={tr('cartTitle')} lead={tr('lead', { amount: formatPrice(SITE.delivery.freeAbove) })} crumbs={crumbs} />
      <section className="pb-20">
        <div className="container grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
          <div className="grid content-start gap-5">
            {hasRx && <RxNotice />}
            <ul className="grid gap-3" aria-live="polite">
              <AnimatePresence initial={false}>
                {lines.map((l) => {
                  const p = loc(l.product);
                  return (
                    <m.li
                      key={`${l.id}-${l.mode}`}
                      {...crossfade}
                      className="grid grid-cols-[4.5rem_1fr] gap-4 rounded-tile border border-line bg-white p-4 shadow-card sm:grid-cols-[5.5rem_1fr_auto] sm:items-center md:p-5"
                    >
                      <Link to={`/product/${l.id}`} tabIndex={-1} aria-hidden="true" className="group block">
                        <ProductImage product={l.product} small />
                      </Link>
                      <div className="min-w-0">
                        <Link to={`/product/${l.id}`} className="text-body font-bold leading-snug text-green no-underline hover:underline">{p.name}</Link>
                        <p className="mb-2 text-base text-grey">{p.pack}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
                          {l.mode === 'rent' && <Tag kind="rent">{tr('rentMonthly')}</Tag>}
                          {l.mode === 'subscribe' && <Tag kind="subscribe">{tr('monthlyPlan')}</Tag>}
                          {l.mode === 'buy' && l.supplyDays && <Tag kind="status">{tr('lasts', { n: l.supplyDays })}</Tag>}
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-line pt-3 sm:col-span-1 sm:justify-end sm:border-0 sm:pt-0">
                        <QtyStepper
                          value={l.qty}
                          label={tr('quantityOf', { name: p.name })}
                          lessLabel={tr('oneLess')}
                          moreLabel={tr('oneMore')}
                          onLess={() => setQty(l.id, l.mode, l.qty - 1)}
                          onMore={() => setQty(l.id, l.mode, l.qty + 1)}
                        />
                        <strong className="min-w-[5rem] text-right font-head text-h3m text-green tabular-nums">{formatPrice(l.total)}</strong>
                        <button
                          type="button"
                          aria-label={tr('removeName', { name: p.name })}
                          className="inline-flex min-h-tap items-center gap-1.5 rounded-btn px-2 font-bold text-terracotta-deep transition-colors duration-micro hover:bg-cream"
                          onClick={() => remove(l.id, l.mode)}
                        >
                          <Icon name="trash" size={18} /> <span className="sm:sr-only xl:not-sr-only">{tr('remove')}</span>
                        </button>
                      </div>
                    </m.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            <HelpBox />
          </div>
          <OrderSummary>
            <Button to="/checkout" block className="mt-5">{tr('continue')} <Icon name="arrow" size={18} /></Button>
          </OrderSummary>
        </div>
      </section>
    </>
  );
}
