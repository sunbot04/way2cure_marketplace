import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { Reveal } from '../components/motion/Reveal';
import { ProductImage } from '../components/commerce/ProductCard';
import Seo from '../components/layout/Seo';
import { formatPrice, SITE } from '../config/site';
import { useCart, type CartItem, type CartLine } from '../context/CartContext';
import { useSaved } from '../context/SavedContext';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';
import { categories, deliveryLabel, products, type Product } from '../data';
import { useLang, useT, useLoc, type Dict } from '../i18n/LangContext';
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

// ---------------------------------------------------------------------------------------------
// Cart page (client design: Main / Mobile / Empty cart), in the site's fonts and colours.
// Desktop: checkout progress, then items on the left (free-delivery bar, item rows with quantity,
// save for later and remove, a delivery check, "You may also need") and the order summary on the
// right (coupon, totals, Proceed to checkout, payment methods, trust notes).
// Phones: the same blocks stacked, with a checkout bar fixed to the bottom of the screen.
// ---------------------------------------------------------------------------------------------

const C: Dict = {
  en: {
    progressAria: 'Checkout progress', stepCart: 'Cart', stepDelivery: 'Delivery', stepPay: 'Payment',
    cartH1: 'Shopping cart', item1: '1 item', itemsN: '{n} items', continueShopping: 'Continue shopping',
    freeUnlocked: "You've unlocked free delivery", ordersAbove: 'Orders above {amount}',
    addMore: 'Add {amount} more for free delivery',
    itemsHead: 'Items', arrives: 'Usually arrives: {when}', noReminder: 'No refill reminder',
    each: '{price} each', perMonth: '/ month',
    saveLater: 'Save for later', saveName: 'Save {name} for later', savedMsg: 'Saved for later', viewSaved: 'View saved',
    remove: 'Remove', removeName: 'Remove {name}', removedMsg: 'Removed {name}.', undo: 'Undo',
    quantityOf: 'Quantity of {name}', oneLess: 'One less', oneMore: 'One more',
    alsoNeed: 'You may also need', addName: 'Add {name} to cart', added: 'Added to your cart', viewCart: 'View cart',
    summary: 'Order summary', couponLabel: 'Coupon code', couponPh: 'Enter code', apply: 'Apply',
    couponNo: 'This code cannot be applied. Coupons will be available soon.',
    itemsCount: 'Items ({n})', delivery: 'Delivery', free: 'Free', total: 'Total',
    noHidden: 'No hidden fees. This is the full amount.',
    proceed: 'Proceed to checkout', payWith: 'Pay with', upi: 'UPI', cards: 'Cards', netbanking: 'Net banking',
    trust1t: 'Licensed partner pharmacies', trust1d: 'A registered pharmacist checks every prescription order.',
    trust2t: 'Secure payments', trust2d: 'UPI, cards and net banking.',
    trust3t: 'Returns', trust3d: 'Unopened items within 7 days. Medicines cannot be returned, for your safety.',
    viewBill: 'View bill', rxNeeded: 'Rx needed', rentMonthly: 'Rent · monthly', monthlyPlan: 'Monthly plan', lasts: 'Lasts {n} days · reminder set',
    emptyTitle: 'Your cart is empty', emptyText: 'Browse medicines, health devices and daily care. Delivery is free on orders above {amount}.',
    confirmTitle: 'Remove this item?', confirmText: 'Are you sure you want to remove {name} from your cart?', confirmYes: 'Yes, remove', confirmNo: 'Keep it',
    startShopping: 'Start shopping', popularCats: 'Popular categories', removedEmpty: 'Item removed. Changed your mind?', undoRemove: 'Undo remove',
  },
  hi: {
    progressAria: 'चेकआउट की प्रगति', stepCart: 'कार्ट', stepDelivery: 'डिलिवरी', stepPay: 'भुगतान',
    cartH1: 'शॉपिंग कार्ट', item1: '1 सामान', itemsN: '{n} सामान', continueShopping: 'ख़रीदारी जारी रखें',
    freeUnlocked: 'आपको मुफ़्त डिलिवरी मिल गई है', ordersAbove: '{amount} से ज़्यादा के ऑर्डर',
    addMore: 'मुफ़्त डिलिवरी के लिए {amount} का सामान और जोड़ें',
    itemsHead: 'सामान', arrives: 'आमतौर पर पहुँचता है: {when}', noReminder: 'रीफ़िल रिमाइंडर नहीं',
    each: '{price} प्रति नग', perMonth: '/ महीना',
    saveLater: 'बाद के लिए रखें', saveName: '{name} बाद के लिए रखें', savedMsg: 'बाद के लिए रख लिया', viewSaved: 'रखे हुए देखें',
    remove: 'हटाएँ', removeName: '{name} हटाएँ', removedMsg: '{name} हटा दिया।', undo: 'वापस लाएँ',
    quantityOf: '{name} की मात्रा', oneLess: 'एक कम करें', oneMore: 'एक और जोड़ें',
    alsoNeed: 'आपको ये भी चाहिए हो सकते हैं', addName: '{name} कार्ट में जोड़ें', added: 'कार्ट में जोड़ दिया', viewCart: 'कार्ट देखें',
    summary: 'ऑर्डर का सारांश', couponLabel: 'कूपन कोड', couponPh: 'कोड डालें', apply: 'लगाएँ',
    couponNo: 'यह कोड नहीं लग सकता। कूपन जल्द उपलब्ध होंगे।',
    itemsCount: 'सामान ({n})', delivery: 'डिलिवरी', free: 'मुफ़्त', total: 'कुल',
    noHidden: 'कोई छिपा हुआ शुल्क नहीं। यही पूरी रकम है।',
    proceed: 'चेकआउट पर आगे बढ़ें', payWith: 'भुगतान करें', upi: 'UPI', cards: 'कार्ड', netbanking: 'नेट बैंकिंग',
    trust1t: 'लाइसेंस वाली पार्टनर फ़ार्मेसी', trust1d: 'हर पर्चे वाले ऑर्डर को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    trust2t: 'सुरक्षित भुगतान', trust2d: 'UPI, कार्ड और नेट बैंकिंग।',
    trust3t: 'वापसी', trust3d: 'बिना खुला सामान 7 दिन में। आपकी सुरक्षा के लिए दवाइयाँ वापस नहीं होतीं।',
    viewBill: 'बिल देखें', rxNeeded: 'पर्चा ज़रूरी', rentMonthly: 'किराये पर · प्रति माह', monthlyPlan: 'मासिक प्लान', lasts: '{n} दिन चलेगा · रिमाइंडर सेट',
    emptyTitle: 'आपका कार्ट खाली है', emptyText: 'दवाइयाँ, हेल्थ डिवाइस और रोज़ की देखभाल का सामान देखें। {amount} से ज़्यादा के ऑर्डर पर डिलिवरी मुफ़्त है।',
    confirmTitle: 'यह सामान हटाएँ?', confirmText: 'क्या आप सच में {name} को अपने कार्ट से हटाना चाहते हैं?', confirmYes: 'हाँ, हटाएँ', confirmNo: 'रहने दें',
    startShopping: 'ख़रीदारी शुरू करें', popularCats: 'लोकप्रिय श्रेणियाँ', removedEmpty: 'सामान हटा दिया। मन बदल गया?', undoRemove: 'वापस लाएँ',
  },
  mr: {
    progressAria: 'चेकआउटची प्रगती', stepCart: 'कार्ट', stepDelivery: 'डिलिव्हरी', stepPay: 'पेमेंट',
    cartH1: 'शॉपिंग कार्ट', item1: '1 वस्तू', itemsN: '{n} वस्तू', continueShopping: 'खरेदी सुरू ठेवा',
    freeUnlocked: 'तुम्हाला मोफत डिलिव्हरी मिळाली आहे', ordersAbove: '{amount} पेक्षा जास्त ऑर्डर',
    addMore: 'मोफत डिलिव्हरीसाठी आणखी {amount} ची खरेदी करा',
    itemsHead: 'वस्तू', arrives: 'सहसा पोहोचते: {when}', noReminder: 'रिफिल आठवण नाही',
    each: '{price} प्रत्येकी', perMonth: '/ महिना',
    saveLater: 'नंतरसाठी ठेवा', saveName: '{name} नंतरसाठी ठेवा', savedMsg: 'नंतरसाठी ठेवले', viewSaved: 'ठेवलेले पाहा',
    remove: 'काढा', removeName: '{name} काढा', removedMsg: '{name} काढले.', undo: 'परत आणा',
    quantityOf: '{name} ची संख्या', oneLess: 'एक कमी करा', oneMore: 'आणखी एक',
    alsoNeed: 'तुम्हाला हेही लागू शकते', addName: '{name} कार्टमध्ये जोडा', added: 'कार्टमध्ये जोडले', viewCart: 'कार्ट पाहा',
    summary: 'ऑर्डरचा सारांश', couponLabel: 'कूपन कोड', couponPh: 'कोड टाका', apply: 'लावा',
    couponNo: 'हा कोड लागू होऊ शकत नाही. कूपन लवकरच उपलब्ध होतील.',
    itemsCount: 'वस्तू ({n})', delivery: 'डिलिव्हरी', free: 'मोफत', total: 'एकूण',
    noHidden: 'कोणतेही लपलेले शुल्क नाही. हीच पूर्ण रक्कम आहे.',
    proceed: 'चेकआउटकडे पुढे जा', payWith: 'पेमेंट', upi: 'UPI', cards: 'कार्ड', netbanking: 'नेट बँकिंग',
    trust1t: 'परवानाधारक भागीदार फार्मसी', trust1d: 'प्रत्येक प्रिस्क्रिप्शन ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात.',
    trust2t: 'सुरक्षित पेमेंट', trust2d: 'UPI, कार्ड आणि नेट बँकिंग.',
    trust3t: 'परतावा', trust3d: 'न उघडलेल्या वस्तू 7 दिवसांत. तुमच्या सुरक्षिततेसाठी औषधे परत घेतली जात नाहीत.',
    viewBill: 'बिल पाहा', rxNeeded: 'प्रिस्क्रिप्शन आवश्यक', rentMonthly: 'भाड्याने · दरमहा', monthlyPlan: 'मासिक प्लॅन', lasts: '{n} दिवस पुरेल · आठवण ठरली',
    emptyTitle: 'तुमचे कार्ट रिकामे आहे', emptyText: 'औषधे, हेल्थ डिव्हाइस आणि दैनंदिन काळजीच्या वस्तू पाहा. {amount} पेक्षा जास्त ऑर्डरवर डिलिव्हरी मोफत आहे.',
    confirmTitle: 'ही वस्तू काढायची?', confirmText: 'तुम्हाला खरंच {name} तुमच्या कार्टमधून काढायचे आहे का?', confirmYes: 'हो, काढा', confirmNo: 'राहू द्या',
    startShopping: 'खरेदी सुरू करा', popularCats: 'लोकप्रिय श्रेणी', removedEmpty: 'वस्तू काढली. विचार बदलला?', undoRemove: 'परत आणा',
  },
};

/** Cart, Delivery, Payment: where you are in the checkout. */
function Progress({ tr }: { tr: (k: string) => string }) {
  const steps = [tr('stepCart'), tr('stepDelivery'), tr('stepPay')];
  return (
    <nav aria-label={tr('progressAria')}>
      <ol className="m-0 flex list-none items-center gap-2 p-0 text-small font-bold sm:gap-3 sm:text-base">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2 sm:gap-3" aria-current={i === 0 ? 'step' : undefined}>
            {i > 0 && <span aria-hidden="true" className={`h-0.5 w-6 rounded-full sm:w-10 ${i === 1 ? 'bg-terracotta-deep' : 'bg-line'}`} />}
            <span className={`flex items-center gap-2 ${i === 0 ? 'text-terracotta-deep' : 'text-grey'}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[12px] ${i === 0 ? 'bg-terracotta-deep text-white' : 'border-[1.5px] border-mint'}`}>{i + 1}</span>
              {s}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Quantity box from the design: minus, number, plus, in one bordered box. */
function Stepper({ value, label, lessLabel, moreLabel, onLess, onMore }: {
  value: number; label: string; lessLabel: string; moreLabel: string; onLess: () => void; onMore: () => void;
}) {
  const b = 'grid h-11 w-11 place-items-center bg-white transition-colors duration-micro hover:bg-mist';
  return (
    <div role="group" aria-label={label} className="inline-flex h-11 items-center overflow-hidden rounded-[0.625rem] border border-mint">
      <button type="button" aria-label={lessLabel} onClick={onLess} className={`${b} ${value > 1 ? 'text-ink' : 'text-grey/60'}`}><Icon name="minus" size={16} /></button>
      <span aria-live="polite" className="min-w-[2.5rem] border-x border-line text-center font-bold leading-[2.75rem] tabular-nums">{value}</span>
      <button type="button" aria-label={moreLabel} onClick={onMore} className={`${b} text-ink`}><Icon name="plus" size={16} /></button>
    </div>
  );
}

export default function Cart() {
  const { lang } = useLang();
  const tr = useT(C);
  const loc = useLoc();
  const { lines, setQty, remove, add, count, subtotal, deliveryFee, total } = useCart();
  const saved = useSaved();
  const toast = useToast();
  const confirm = useConfirm();
  const [removed, setRemoved] = useState<(CartItem & { name: string }) | null>(null);
  const [coupon, setCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState(false);
  const freeAbove = SITE.delivery.freeAbove;
  const amount = formatPrice(freeAbove);

  // Phones: the checkout bar sits at the bottom of the screen, so lift the floating Call/WhatsApp
  // buttons above it (same --fab-lift as the shop's cart bar).
  useEffect(() => {
    const root = document.documentElement.style;
    const set = () => root.setProperty('--fab-lift', count > 0 && window.innerWidth < 1024 ? '5.75rem' : '0px');
    set();
    window.addEventListener('resize', set);
    return () => { window.removeEventListener('resize', set); root.setProperty('--fab-lift', '0px'); };
  }, [count]);

  const removeLine = (l: CartLine) => {
    setRemoved({ id: l.id, mode: l.mode, qty: l.qty, supplyDays: l.supplyDays, remind: l.remind, name: loc(l.product).name });
    remove(l.id, l.mode);
  };
  // "Are you sure?" first; remove only if the reader says yes.
  const askRemove = async (l: CartLine) => {
    const name = loc(l.product).name;
    const yes = await confirm({
      title: tr('confirmTitle'),
      message: tr('confirmText', { name }),
      confirmLabel: tr('confirmYes'),
      cancelLabel: tr('confirmNo'),
    });
    if (yes) removeLine(l);
  };
  const undo = () => {
    if (!removed) return;
    add(removed.id, removed.mode, removed.qty, removed.supplyDays, removed.remind);
    setRemoved(null);
  };
  const saveForLater = (l: CartLine) => {
    if (!saved.has(l.id)) saved.toggle(l.id);
    remove(l.id, l.mode);
    toast({ message: tr('savedMsg'), action: { label: tr('viewSaved'), to: '/shop?saved=1' } });
  };

  // Delivery estimate for the whole order: the slowest item decides it.
  const slowest = lines.reduce((h, l) => Math.max(h, l.product.deliveryHours), 0);
  const when = deliveryLabel(slowest || 6, lang);

  // "You may also need": everyday items from the same categories, not already in the cart.
  const inCart = new Set(lines.map((l) => l.id));
  const cats = new Set(lines.map((l) => l.product.cat));
  const ok = (p: Product) => !inCart.has(p.id) && !p.rx && !p.rentOnly && p.price != null;
  const recs = [...products.filter((p) => ok(p) && cats.has(p.cat)), ...products.filter((p) => ok(p) && !cats.has(p.cat)).sort((a, b) => b.popular - a.popular)].slice(0, 3);

  const seo = <Seo title={tr('cartH1')} description={tr('emptyText', { amount })} noindex />;

  // ---------- Empty cart ----------
  if (!count) {
    const chips = ['medicines', 'devices', 'daily-care', 'nutrition'].map((slug) => categories.find((c) => c.slug === slug)).filter((c): c is NonNullable<typeof c> => !!c);
    return (
      <>
        {seo}
        <section className="bg-mist py-10 md:py-16">
          <div className="container">
            <Reveal className="mx-auto flex max-w-[40rem] flex-col items-center rounded-[1.25rem] border border-line bg-white px-6 py-12 text-center shadow-card md:px-10 md:py-14">
              <span className="mb-6 grid h-[5.5rem] w-[5.5rem] place-items-center rounded-full bg-[#FDF2F4] text-terracotta-deep"><Icon name="cart" size={40} /></span>
              <h1 className="mb-2.5 font-body text-h2m font-extrabold text-green md:text-[1.75rem]">{tr('emptyTitle')}</h1>
              {removed ? (
                <>
                  <p className="mb-7 max-w-[26rem] text-ink/70">{tr('removedEmpty')}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="outline" onClick={undo}><Icon name="refresh" size={18} /> {tr('undoRemove')}</Button>
                    <Button to="/shop" variant="urgent">{tr('startShopping')} <Icon name="arrow" size={18} /></Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-7 max-w-[26rem] text-ink/70">{tr('emptyText', { amount })}</p>
                  <Button to="/shop" variant="urgent">{tr('startShopping')} <Icon name="arrow" size={18} /></Button>
                </>
              )}
              <div className="mt-9 w-full border-t border-line pt-7">
                <p className="mb-3.5 text-small font-bold uppercase tracking-[0.06em] text-grey">{tr('popularCats')}</p>
                <ul className="m-0 flex list-none flex-wrap justify-center gap-2.5 p-0">
                  {chips.map(loc).map((c) => (
                    <li key={c.slug}>
                      <Link to={`/shop/${c.slug}`} className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-mint px-4 text-base font-semibold text-ink no-underline transition-colors duration-micro hover:border-terracotta-deep hover:text-terracotta-deep">
                        <Icon name={c.icon} size={16} className="text-sage" /> {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  // ---------- Cart with items ----------
  const unlocked = deliveryFee === 0;
  const progress = Math.min(1, subtotal / freeAbove);
  return (
    <>
      {seo}
      <section className="bg-mist pb-28 pt-6 md:pt-8 lg:pb-16">
        <div className="container">
          {/* Progress, title, continue shopping */}
          <div className="mb-6 grid gap-5 md:mb-8">
            <Progress tr={tr} />
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h1 className="m-0 text-section">
                {tr('cartH1')} <span className="font-body text-lead font-medium text-grey">({count === 1 ? tr('item1') : tr('itemsN', { n: count })})</span>
              </h1>
              <Link to="/shop" className="group inline-flex min-h-tap items-center gap-1.5 font-bold no-underline hover:underline">
                <Icon name="arrow" size={16} className="rotate-180" /> {tr('continueShopping')}
              </Link>
            </div>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
            {/* LEFT */}
            <div className="grid min-w-0 gap-4">
              {/* Free delivery */}
              <div className={`flex items-center gap-3.5 rounded-xl border px-4 py-3.5 sm:px-5 ${unlocked ? 'border-[#BBF7D0] bg-[#ECFDF3]' : 'border-sage/25 bg-sage-tint'}`}>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white ${unlocked ? 'text-[#15803D]' : 'text-sage-deep'}`}><Icon name="truck" size={18} /></span>
                <div className="min-w-0 flex-1">
                  <p aria-live="polite" className={`m-0 mb-1.5 text-base font-bold ${unlocked ? 'text-[#14532D]' : 'text-green'}`}>
                    {unlocked ? tr('freeUnlocked') : tr('addMore', { amount: formatPrice(freeAbove - subtotal) })}
                  </p>
                  <span aria-hidden="true" className={`block h-1.5 overflow-hidden rounded-full ${unlocked ? 'bg-[#D1FAE5]' : 'bg-white'}`}>
                    <m.span className={`block h-full origin-left rounded-full ${unlocked ? 'bg-[#16A34A]' : 'bg-sage'}`} initial={false} animate={{ scaleX: progress }} transition={tReveal} />
                  </span>
                </div>
                <span className={`hidden whitespace-nowrap text-small font-semibold sm:block ${unlocked ? 'text-[#166534]' : 'text-sage-deep'}`}>{tr('ordersAbove', { amount })}</span>
              </div>

              {/* Undo after removing an item */}
              <AnimatePresence initial={false}>
                {removed && (
                  <m.p key="undo" {...crossfade} role="status" className="m-0 flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-2.5 text-base">
                    <span className="text-ink/80">{tr('removedMsg', { name: removed.name })}</span>
                    <button type="button" onClick={undo} className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-btn px-2 font-bold text-terracotta-deep hover:bg-mist">
                      <Icon name="refresh" size={16} /> {tr('undo')}
                    </button>
                  </m.p>
                )}
              </AnimatePresence>

              {/* Items */}
              <section aria-labelledby="items-head" className="rounded-2xl border border-line bg-white">
                <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
                  <h2 id="items-head" className="m-0 font-body text-small font-bold uppercase tracking-[0.04em] text-grey">{tr('itemsHead')}</h2>
                  <span className="flex items-center gap-1.5 text-small text-grey"><Icon name="truck" size={15} className="text-sage" /> {tr('arrives', { when })}</span>
                </div>
                <ul className="m-0 list-none divide-y divide-line p-0" aria-live="polite">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => {
                      const p = loc(l.product);
                      const price = (
                        <>
                          <p className="m-0 font-head text-h3m font-bold text-green tabular-nums md:text-[1.2rem]">
                            {formatPrice(l.total)}{l.mode === 'rent' && <span className="ml-1 font-body text-small font-semibold text-grey">{tr('perMonth')}</span>}
                          </p>
                          {l.qty > 1 && <p className="m-0 mt-1 text-small text-grey">{tr('each', { price: formatPrice(l.unit) })}</p>}
                        </>
                      );
                      return (
                        <m.li key={`${l.id}-${l.mode}`} {...crossfade} className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:gap-5 sm:p-6">
                          <Link to={`/product/${l.id}`} tabIndex={-1} aria-hidden="true" className="block self-start overflow-hidden rounded-xl border border-line">
                            <ProductImage product={l.product} small />
                          </Link>
                          <div className="grid min-w-0 content-start gap-1.5">
                            <Link to={`/product/${l.id}`} className="text-body font-bold leading-snug text-green no-underline hover:underline">{p.name}</Link>
                            <p className="m-0 text-base text-grey">{p.pack}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {p.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
                              {l.mode === 'rent' && <Tag kind="rent">{tr('rentMonthly')}</Tag>}
                              {l.mode === 'subscribe' && <Tag kind="subscribe">{tr('monthlyPlan')}</Tag>}
                              {l.mode === 'buy' && l.supplyDays && <Tag kind="status">{tr('lasts', { n: l.supplyDays })}</Tag>}
                              {l.mode === 'buy' && l.remind === false && <Tag kind="status">{tr('noReminder')}</Tag>}
                            </div>
                            <div className="sm:hidden">{price}</div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <Stepper
                                value={l.qty}
                                label={tr('quantityOf', { name: p.name })}
                                lessLabel={tr('oneLess')}
                                moreLabel={tr('oneMore')}
                                onLess={() => (l.qty > 1 ? setQty(l.id, l.mode, l.qty - 1) : askRemove(l))}
                                onMore={() => setQty(l.id, l.mode, l.qty + 1)}
                              />
                              <span aria-hidden="true" className="hidden h-5 w-px bg-line sm:block" />
                              {saved.enabled && (
                                <button type="button" aria-label={tr('saveName', { name: p.name })} onClick={() => saveForLater(l)} className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-btn px-1.5 text-base font-semibold text-grey transition-colors duration-micro hover:text-green">
                                  <Icon name="heart" size={16} /> {tr('saveLater')}
                                </button>
                              )}
                              <button type="button" aria-label={tr('removeName', { name: p.name })} onClick={() => askRemove(l)} className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-btn px-1.5 text-base font-semibold text-grey transition-colors duration-micro hover:text-terracotta-deep">
                                <Icon name="trash" size={16} /> {tr('remove')}
                              </button>
                            </div>
                          </div>
                          <div className="hidden text-right sm:block">{price}</div>
                        </m.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

              </section>

              {/* You may also need */}
              {recs.length > 0 && (
                <section aria-labelledby="recs-head" className="rounded-2xl border border-line bg-white px-4 pb-5 pt-5 sm:px-6 sm:pb-6">
                  <h2 id="recs-head" className="mb-4 font-body text-body font-bold">{tr('alsoNeed')}</h2>
                  <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] sm:gap-4">
                    {recs.map((r) => {
                      const x = loc(r);
                      return (
                        <li key={r.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                          <Link to={`/product/${r.id}`} tabIndex={-1} aria-hidden="true" className="block w-14 shrink-0 overflow-hidden rounded-[0.625rem]"><ProductImage product={r} small /></Link>
                          <div className="min-w-0 flex-1">
                            <Link to={`/product/${r.id}`} className="block text-base font-semibold leading-snug text-ink no-underline hover:underline">{x.name}</Link>
                            <p className="m-0 mt-1 text-small text-grey tabular-nums">{formatPrice(r.price ?? 0)}</p>
                          </div>
                          <button
                            type="button"
                            aria-label={tr('addName', { name: x.name })}
                            onClick={() => { add(r.id, 'buy', 1); toast({ message: tr('added') }); }}
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.625rem] border border-mint bg-white text-ink transition-colors duration-micro hover:border-terracotta-deep hover:text-terracotta-deep"
                          >
                            <Icon name="plus" size={16} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </div>

            {/* RIGHT: summary */}
            <aside id="summary" aria-labelledby="summary-head" className="grid scroll-mt-28 gap-4 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
                <h2 id="summary-head" className="mb-5 font-body text-h3m font-extrabold">{tr('summary')}</h2>

                <form onSubmit={(e) => { e.preventDefault(); setCouponMsg(!!coupon.trim()); }} noValidate className="mb-5">
                  <label htmlFor="coupon" className="mb-2 block text-small font-semibold text-green">{tr('couponLabel')}</label>
                  <div className="flex gap-2">
                    <input
                      id="coupon"
                      value={coupon}
                      onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponMsg(false); }}
                      placeholder={tr('couponPh')}
                      aria-describedby="coupon-msg"
                      className="h-11 min-w-0 flex-1 rounded-[0.625rem] border border-dashed border-grey/50 bg-white px-3.5 text-base uppercase text-ink placeholder:normal-case placeholder:text-grey/80 focus:border-green"
                    />
                    <button type="submit" className="h-11 rounded-[0.625rem] bg-mist px-4 text-base font-bold text-green transition-colors duration-micro hover:bg-mint">{tr('apply')}</button>
                  </div>
                  <p id="coupon-msg" aria-live="polite" className="m-0 mt-2 text-small font-semibold text-terracotta-deep empty:hidden">{couponMsg ? tr('couponNo') : ''}</p>
                </form>

                <dl className="m-0 grid gap-3 text-base">
                  <div className="flex justify-between gap-4"><dt className="text-grey">{tr('itemsCount', { n: count })}</dt><dd className="m-0 tabular-nums">{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-grey">{tr('delivery')}</dt>
                    <dd className={`m-0 tabular-nums ${deliveryFee ? '' : 'font-bold text-[#15803D]'}`}>{deliveryFee ? formatPrice(deliveryFee) : tr('free')}</dd>
                  </div>
                </dl>
                <div className="my-4 border-t border-dashed border-mint" />
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-body font-bold text-green">{tr('total')}</span>
                  <span className="font-head text-[1.75rem] font-bold leading-none text-green tabular-nums">{formatPrice(total)}</span>
                </div>
                <p className="mb-5 mt-2 flex items-center justify-end gap-1.5 text-small text-grey"><Icon name="lock" size={13} className="text-sage" /> {tr('noHidden')}</p>

                <Button to="/checkout" variant="urgent" block>{tr('proceed')} <Icon name="arrow" size={18} /></Button>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-small text-grey">{tr('payWith')}</span>
                  {(['upi', 'cards', 'netbanking'] as const).map((k) => (
                    <span key={k} className="rounded-md border border-line px-2 py-1 text-[0.72rem] font-bold text-green">{tr(k)}</span>
                  ))}
                </div>
              </div>

              <ul className="m-0 grid list-none gap-3.5 rounded-2xl border border-line bg-white p-5 sm:p-6">
                {([['verified', 'trust1'], ['lock', 'trust2'], ['refresh', 'trust3']] as const).map(([icon, k]) => (
                  <li key={k} className="flex items-start gap-3">
                    <Icon name={icon} size={20} className="mt-0.5 shrink-0 text-green" />
                    <span><strong className="block text-base text-green">{tr(`${k}t`)}</strong><span className="text-small text-grey">{tr(`${k}d`)}</span></span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Phones: checkout bar fixed to the bottom of the screen */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3.5 border-t border-line bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgb(15_23_42/0.06)] lg:hidden">
        <div>
          <p className="m-0 font-head text-h3m font-bold leading-tight text-green tabular-nums">{formatPrice(total)}</p>
          <a href="#summary" className="text-small font-semibold no-underline">{tr('viewBill')}</a>
        </div>
        <Button to="/checkout" variant="urgent" className="flex-1">{tr('proceed')} <Icon name="arrow" size={18} /></Button>
      </div>
    </>
  );
}
