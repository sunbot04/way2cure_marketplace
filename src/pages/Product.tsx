import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import FAQAccordion from '../components/ui/FAQAccordion';
import { Reveal } from '../components/motion/Reveal';
import { ProductImage, SellerBadge, useCartToast } from '../components/commerce/ProductCard';
import RxNotice from '../components/commerce/RxNotice';
import AppPanel, { HelpBox } from '../components/commerce/AppPanel';
import Seo from '../components/layout/Seo';
import { getProduct, categories, deliveryLabel, productFaq, type PurchaseMode } from '../data';
import { formatPrice, isServiceablePincode } from '../config/site';
import { useCart } from '../context/CartContext';
import { useLang, useT, useLoc, type Dict } from '../i18n/LangContext';
import { COPY } from '../components/copy';
import { ChoiceList, QtyStepper, type Choice } from '../components/commerce/Choice';
import { Field, Input, Select } from '../components/ui/Field';
import { DEFAULT_SUPPLY_DAYS, REMIND_DAYS_BEFORE, SUPPLY_OPTIONS, isSupply } from '../context/NotificationsContext';
import NotFound from './NotFound';

const T: Dict = {
  en: {
    usually: 'Usually arrives {when}', area: 'Mumbai, Navi Mumbai & Thane', about: 'About this item', rentFrom: 'or {price} / month to rent',
    eachMonthShort: 'every month', buyBox: 'Your order',
    lastFor: 'How long should this order last?', days: '{n} days', remindNote: 'We will remind you {n} days before it runs out, in your account.',
    shop: 'Shop', breadcrumb: 'Breadcrumb',
    rxNeeded: 'Rx needed', pharmVerified: 'Pharmacist verified', verifiedSeller: 'Verified seller', rent: 'Rent',
    buy: 'Buy', subscribeMonthly: 'Subscribe monthly', perMonth: '{price} / month', eachMonth: '{price} each month',
    howLike: 'How would you like it?',
    subNote: 'We remind you before each delivery. Pause or change anytime.',
    rentNote: 'We deliver, set it up and collect it when you are done. A refundable deposit may apply.',
    checkPin: 'Check delivery to your pincode', pinPlaceholder: 'e.g. 400703', check: 'Check',
    pinOk: 'Arriving {when}. Share the OTP with the rider.',
    pinNo: 'We do not deliver to this pincode yet. We serve Mumbai, Navi Mumbai & Thane.',
    pinInvalid: 'Please enter a 6-digit pincode.',
    rxBuyStrong: 'To order this medicine, upload your prescription in the app.',
    rxBuyText: 'You can also add it to your cart now. Our pharmacist will match your prescription before packing.',
    addToCart: 'Add to cart', uploadRx: 'Upload prescription',
    quantity: 'Quantity', oneLess: 'One less', oneMore: 'One more',
    rentThis: 'Rent this', startPlan: 'Start monthly plan',
    added: 'Added to your cart.', goToCart: 'Go to cart',
    questions: 'Questions about this item', uploadYourRx: 'Upload your prescription',
  },
  hi: {
    usually: 'आमतौर पर {when} पहुँचता है', area: 'मुंबई, नवी मुंबई और ठाणे', about: 'इस सामान के बारे में', rentFrom: 'या किराये पर {price} / माह',
    eachMonthShort: 'हर महीने', buyBox: 'आपका ऑर्डर',
    lastFor: 'यह ऑर्डर कितने दिन चलना चाहिए?', days: '{n} दिन', remindNote: 'ख़त्म होने से {n} दिन पहले हम आपके खाते में याद दिलाएँगे।',
    shop: 'खरीदारी', breadcrumb: 'आप यहाँ हैं',
    rxNeeded: 'पर्चा ज़रूरी', pharmVerified: 'फ़ार्मासिस्ट द्वारा जाँचा गया', verifiedSeller: 'सत्यापित विक्रेता', rent: 'किराये पर',
    buy: 'ख़रीदें', subscribeMonthly: 'हर महीने के लिए सब्सक्राइब करें', perMonth: '{price} / प्रति माह', eachMonth: '{price} हर महीने',
    howLike: 'आप इसे कैसे लेना चाहेंगे?',
    subNote: 'हर डिलिवरी से पहले हम आपको याद दिलाते हैं। कभी भी रोकें या बदलें।',
    rentNote: 'हम पहुँचाते हैं, लगाकर देते हैं, और आपका काम पूरा होने पर वापस ले जाते हैं। वापस मिलने वाली डिपॉज़िट राशि लग सकती है।',
    checkPin: 'अपने पिनकोड पर डिलिवरी देखें', pinPlaceholder: 'जैसे 400703', check: 'देखें',
    pinOk: '{when} पहुँचेगा। राइडर को OTP बताएँ।',
    pinNo: 'इस पिनकोड पर अभी हमारी डिलिवरी नहीं है। हम मुंबई, नवी मुंबई और ठाणे में सेवा देते हैं।',
    pinInvalid: 'कृपया 6 अंकों का पिनकोड डालें।',
    rxBuyStrong: 'यह दवा मँगाने के लिए, ऐप में अपना पर्चा अपलोड करें।',
    rxBuyText: 'आप इसे अभी कार्ट में भी डाल सकते हैं। पैक करने से पहले हमारे फ़ार्मासिस्ट आपका पर्चा मिलाकर देखेंगे।',
    addToCart: 'कार्ट में डालें', uploadRx: 'पर्चा अपलोड करें',
    quantity: 'मात्रा', oneLess: 'एक कम करें', oneMore: 'एक और जोड़ें',
    rentThis: 'किराये पर लें', startPlan: 'मासिक प्लान शुरू करें',
    added: 'आपके कार्ट में डाल दिया गया।', goToCart: 'कार्ट पर जाएँ',
    questions: 'इस सामान के बारे में सवाल', uploadYourRx: 'अपना पर्चा अपलोड करें',
  },
  mr: {
    usually: 'साधारणपणे {when} पोहोचते', area: 'मुंबई, नवी मुंबई आणि ठाणे', about: 'या वस्तूबद्दल', rentFrom: 'किंवा भाड्याने {price} / महिना',
    eachMonthShort: 'दरमहा', buyBox: 'तुमची ऑर्डर',
    lastFor: 'ही ऑर्डर किती दिवस पुरावी?', days: '{n} दिवस', remindNote: 'संपण्याच्या {n} दिवस आधी आम्ही तुमच्या खात्यात आठवण करून देऊ.',
    shop: 'खरेदी', breadcrumb: 'तुम्ही इथे आहात',
    rxNeeded: 'प्रिस्क्रिप्शन आवश्यक', pharmVerified: 'फार्मासिस्टने तपासलेले', verifiedSeller: 'पडताळलेले विक्रेते', rent: 'भाड्याने',
    buy: 'विकत घ्या', subscribeMonthly: 'मासिक सदस्यता घ्या', perMonth: '{price} / दरमहा', eachMonth: '{price} दरमहा',
    howLike: 'तुम्हाला हे कसे हवे आहे?',
    subNote: 'प्रत्येक डिलिव्हरीपूर्वी आम्ही तुम्हाला आठवण करून देतो. कधीही थांबवा किंवा बदला.',
    rentNote: 'आम्ही पोहोचवतो, बसवून देतो आणि तुमचे काम झाल्यावर परत घेऊन जातो. परत मिळणारी अनामत रक्कम लागू शकते.',
    checkPin: 'तुमच्या पिनकोडवर डिलिव्हरी तपासा', pinPlaceholder: 'उदा. 400703', check: 'तपासा',
    pinOk: '{when} पोहोचेल. रायडरला OTP सांगा.',
    pinNo: 'या पिनकोडवर अजून आमची डिलिव्हरी नाही. आम्ही मुंबई, नवी मुंबई आणि ठाणे येथे सेवा देतो.',
    pinInvalid: 'कृपया 6 अंकी पिनकोड टाका.',
    rxBuyStrong: 'हे औषध मागवण्यासाठी, ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा.',
    rxBuyText: 'तुम्ही आत्ताच हे कार्टमध्येही टाकू शकता. पॅक करण्यापूर्वी आमचे फार्मासिस्ट तुमचे प्रिस्क्रिप्शन जुळवून पाहतील.',
    addToCart: 'कार्टमध्ये टाका', uploadRx: 'प्रिस्क्रिप्शन अपलोड करा',
    quantity: 'संख्या', oneLess: 'एक कमी करा', oneMore: 'आणखी एक',
    rentThis: 'भाड्याने घ्या', startPlan: 'मासिक प्लॅन सुरू करा',
    added: 'तुमच्या कार्टमध्ये टाकले.', goToCart: 'कार्टवर जा',
    questions: 'या वस्तूबद्दल प्रश्न', uploadYourRx: 'तुमचे प्रिस्क्रिप्शन अपलोड करा',
  },
};

type PinResult = 'ok' | 'no' | 'invalid' | null;

export default function Product() {
  const { lang } = useLang();
  const tr = useT(T);
  const tc = useT(COPY);
  const loc = useLoc();
  const { id = '' } = useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const showToast = useCartToast();
  const [mode, setMode] = useState<PurchaseMode>(() => (product?.rentOnly ? 'rent' : 'buy'));
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState('');
  const [pinResult, setPinResult] = useState<PinResult>(null);
  const [supplyDays, setSupplyDays] = useState(DEFAULT_SUPPLY_DAYS);

  if (!product) return <NotFound />;
  const p = loc(product);
  const catRaw = categories.find((c) => c.slug === product.cat);
  const cat = catRaw ? loc(catRaw) : undefined;

  const options: (Choice & { id: PurchaseMode })[] = [];
  if (!product.rentOnly) options.push({ id: 'buy', label: tr('buy'), detail: formatPrice(product.price ?? 0) });
  if (product.rentPerMonth) options.push({ id: 'rent', label: tr('rent'), detail: tr('perMonth', { price: formatPrice(product.rentPerMonth) }) });
  if (product.subscribe) options.push({ id: 'subscribe', label: tr('subscribeMonthly'), detail: tr('eachMonth', { price: formatPrice(product.price ?? 0) }) });

  // TODO: API: serviceability check by pincode.
  const checkPin = (e: FormEvent) => {
    e.preventDefault();
    setPinResult(isServiceablePincode(pin) ? 'ok' : /^\d{6}$/.test(pin) ? 'no' : 'invalid');
  };

  // Adds to the cart and confirms with a toast (with a "View cart" link); the cart badge pulses.
  const addToCart = () => {
    add(product.id, mode, qty, mode === 'buy' && isSupply(product.id) ? supplyDays : undefined);
    showToast();
  };

  const when = deliveryLabel(product.deliveryHours, lang);
  const whenText = lang === 'en' ? when.toLowerCase() : when;

  return (
    <>
      <Seo title={p.name} description={`${p.desc} ${product.rx ? tr('rxNeeded') + '.' : ''}`.trim()} />
      <section className="pb-14 pt-4 md:pb-20 md:pt-6">
        <div className="container">
          <nav aria-label={tr('breadcrumb')} className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-small">
              <li><Link to="/shop" className="inline-flex min-h-[2.75rem] items-center">{tr('shop')}</Link></li>
              {cat && (
                <li className="inline-flex items-center gap-1">
                  <Icon name="chevron" size={14} className="text-grey" />
                  <Link to={`/shop/${cat.slug}`} className="inline-flex min-h-[2.75rem] items-center">{cat.name}</Link>
                </li>
              )}
              <li className="inline-flex items-center gap-1">
                <Icon name="chevron" size={14} className="text-grey" />
                <span aria-current="page" className="text-grey">{p.name}</span>
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
            {/* Big square image panel, pinned while the details scroll on desktop */}
            <Reveal className="self-start md:sticky md:top-28">
              <div className="rounded-panel bg-white p-4 shadow-card md:p-6">
                <ProductImage product={product} large />
              </div>
              <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-small font-semibold text-green">
                {[
                  { icon: 'verified', text: tc('pharmacies') },
                  { icon: 'lock', text: tc('payments') },
                  { icon: 'support', text: tc('support') },
                ].map((x) => (
                  <li key={x.icon} className="grid justify-items-center gap-1.5 rounded-tile bg-white/70 px-2 py-3">
                    <Icon name={x.icon} size={20} className="text-sage" />
                    {x.text}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.07} className="grid content-start gap-6">
              <div className="flex flex-wrap gap-2">
                {product.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
                {product.rx && <Tag kind="pharmacist">{tr('pharmVerified')}</Tag>}
                {product.seller !== 'Way2Cure' && <Tag kind="seller">{tr('verifiedSeller')}</Tag>}
                {product.rentPerMonth && <Tag kind="rent">{tr('rent')}</Tag>}
              </div>
              <div>
                <h1 className="mb-2 text-section md:text-[2.75rem] md:leading-[1.1]">{p.name}</h1>
                <p className="mb-3 text-lead text-grey">{product.brand} · {p.pack}</p>
                <SellerBadge product={product} />
              </div>

              {/* Price and delivery, side by side */}
              <div className="flex flex-wrap items-end justify-between gap-4 border-y border-line py-5">
                <p className="m-0 font-head text-[2.25rem] font-bold leading-none text-green">
                  {product.rentOnly ? formatPrice(product.rentPerMonth ?? 0) : formatPrice(product.price ?? 0)}
                  {product.rentOnly && <span className="ml-1 font-body text-body font-semibold text-grey">{tc('perMonth')}</span>}
                  {product.rentPerMonth && !product.rentOnly && (
                    <span className="mt-2 block font-body text-base font-semibold text-grey">{tr('rentFrom', { price: formatPrice(product.rentPerMonth) })}</span>
                  )}
                </p>
                <p className="m-0 flex items-center gap-2 text-base font-semibold text-green">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-mist"><Icon name="truck" size={18} /></span>
                  <span className="grid leading-tight">{tr('usually', { when: whenText })}<span className="text-small font-normal text-grey">{tr('area')}</span></span>
                </p>
              </div>

              <p className="m-0 text-ink/85">{p.desc}</p>

              {product.rx && <RxNotice />}

              {/* Purchase panel */}
              <div className="grid gap-5 rounded-panel bg-white p-5 shadow-card md:p-7">
                <h2 className="sr-only">{tr('buyBox')}</h2>
                {options.length > 1 && (
                  <ChoiceList name="mode" legend={tr('howLike')} choices={options} value={mode} onChange={(v) => setMode(v as PurchaseMode)} />
                )}
                {mode === 'subscribe' && <p className="m-0 flex items-start gap-2 text-base text-grey"><Icon name="refresh" size={18} className="mt-1 shrink-0 text-sage" /> {tr('subNote')}</p>}
                {mode === 'rent' && <p className="m-0 flex items-start gap-2 text-base text-grey"><Icon name="info" size={18} className="mt-1 shrink-0 text-sage" /> {tr('rentNote')}</p>}
                {mode === 'buy' && isSupply(product.id) && (
                  <Field id="supply" label={tr('lastFor')} hint={tr('remindNote', { n: REMIND_DAYS_BEFORE })}>
                    <Select id="supply" value={supplyDays} onChange={(e) => setSupplyDays(Number(e.target.value))} aria-describedby="supply-hint" className="max-w-[14rem]">
                      {SUPPLY_OPTIONS.map((d) => <option key={d} value={d}>{tr('days', { n: d })}</option>)}
                    </Select>
                  </Field>
                )}

                <form onSubmit={checkPin} noValidate className="rounded-tile bg-mist p-4">
                  <label htmlFor="pin" className="mb-1.5 block font-bold text-green">{tr('checkPin')}</label>
                  <div className="flex gap-2">
                    <Input
                      id="pin"
                      inputMode="numeric"
                      maxLength={6}
                      value={pin}
                      invalid={pinResult === 'invalid'}
                      onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setPinResult(null); }}
                      placeholder={tr('pinPlaceholder')}
                      aria-describedby="pin-result"
                      className="max-w-[12rem]"
                    />
                    <Button type="submit" variant="outline">{tr('check')}</Button>
                  </div>
                  <p
                    id="pin-result"
                    aria-live="polite"
                    className={`m-0 mt-2 flex items-start gap-1.5 text-base font-bold empty:hidden ${pinResult === 'ok' ? 'text-green' : 'text-terracotta-deep'}`}
                  >
                    {pinResult === 'ok' && <><Icon name="truck" size={18} className="mt-0.5 shrink-0" /> {tr('pinOk', { when: whenText })}</>}
                    {pinResult === 'no' && <><Icon name="warning" size={18} className="mt-0.5 shrink-0" /> {tr('pinNo')}</>}
                    {pinResult === 'invalid' && <><Icon name="warning" size={18} className="mt-0.5 shrink-0" /> {tr('pinInvalid')}</>}
                  </p>
                </form>

                {product.rx ? (
                  <div className="rounded-tile border-2 border-terracotta-deep bg-white p-5">
                    <p><strong>{tr('rxBuyStrong')}</strong> {tr('rxBuyText')}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={addToCart}><Icon name="cart" size={18} /> {tr('addToCart')}</Button>
                      <Button to="/prescription" variant="urgent"><Icon name="rx" size={18} /> {tr('uploadRx')}</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <QtyStepper
                      value={qty}
                      label={tr('quantity')}
                      lessLabel={tr('oneLess')}
                      moreLabel={tr('oneMore')}
                      onLess={() => setQty((n) => Math.max(1, n - 1))}
                      onMore={() => setQty((n) => n + 1)}
                    />
                    <Button onClick={addToCart} className="flex-1">
                      <Icon name="cart" size={18} />
                      {mode === 'rent' ? tr('rentThis') : mode === 'subscribe' ? tr('startPlan') : tr('addToCart')}
                    </Button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal as="section">
            <h2 id="pq" className="mb-6 text-section">{tr('questions')}</h2>
            <FAQAccordion items={productFaq(product, lang)} />
          </Reveal>
          <Reveal delay={0.07} className="grid content-start gap-4">
            {product.rx && <AppPanel title={tr('uploadYourRx')} />}
            <HelpBox />
          </Reveal>
        </div>
      </section>
    </>
  );
}
