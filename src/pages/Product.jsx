import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { ProductImage } from '../components/ProductCard';
import { getProduct, categories, deliveryLabel, productFaq } from '../data';
import { formatPrice, isServiceablePincode } from '../config/site';
import { useCart } from '../context/CartContext';
import { useLang, useT, useLoc } from '../i18n/LangContext';
import { FaqList, HelpBox, RxNotice, SellerTag, Tag, AppQR } from '../components/legacy-ui';
import NotFound from './NotFound';

const T = {
  en: {
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

export default function Product() {
  const { lang } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const { id } = useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const [mode, setMode] = useState(() => (product?.rentOnly ? 'rent' : 'buy'));
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState('');
  const [pinResult, setPinResult] = useState(null);
  const [added, setAdded] = useState(false);

  if (!product) return <NotFound />;
  const p = loc(product);
  const cat = loc(categories.find((c) => c.slug === product.cat));

  const options = [
    !product.rentOnly && { id: 'buy', label: tr('buy'), price: formatPrice(product.price) },
    product.rentPerMonth && { id: 'rent', label: tr('rent'), price: tr('perMonth', { price: formatPrice(product.rentPerMonth) }) },
    product.subscribe && { id: 'subscribe', label: tr('subscribeMonthly'), price: tr('eachMonth', { price: formatPrice(product.price) }) },
  ].filter(Boolean);

  const checkPin = (e) => {
    e.preventDefault();
    setPinResult(isServiceablePincode(pin) ? 'ok' : /^\d{6}$/.test(pin) ? 'no' : 'invalid');
  };

  const addToCart = () => {
    add(product.id, mode, qty);
    setAdded(true);
  };

  const when = deliveryLabel(product.deliveryHours, lang);

  return (
    <div className="container section-sm">
      <nav className="breadcrumb" aria-label={tr('breadcrumb')}>
        <Link to="/shop">{tr('shop')}</Link> <Icon name="chevron" size={16} />
        <Link to={`/shop/${cat.slug}`}>{cat.name}</Link> <Icon name="chevron" size={16} />
        <span aria-current="page">{p.name}</span>
      </nav>

      <div className="product-layout">
        <div className="product-media card">
          <ProductImage product={product} large />
        </div>

        <div className="product-info">
          <div className="tag-row">
            {product.rx && <Tag kind="rx">{tr('rxNeeded')}</Tag>}
            {product.rx && <Tag kind="pharm">{tr('pharmVerified')}</Tag>}
            {product.seller !== 'Way2Cure' && <Tag kind="seller">{tr('verifiedSeller')}</Tag>}
            {product.rentPerMonth && <Tag kind="rent">{tr('rent')}</Tag>}
          </div>
          <h1 className="product-title">{p.name}</h1>
          <p className="product-pack">{p.brand} · {p.pack}</p>
          <SellerTag product={product} />
          <p>{p.desc}</p>

          {product.rx && <RxNotice />}

          {options.length > 1 && (
            <fieldset className="option-group">
              <legend>{tr('howLike')}</legend>
              {options.map((o) => (
                <label key={o.id} className={`option${mode === o.id ? ' selected' : ''}`}>
                  <input type="radio" name="mode" value={o.id} checked={mode === o.id} onChange={() => setMode(o.id)} />
                  <span><strong>{o.label}</strong><span>{o.price}</span></span>
                </label>
              ))}
            </fieldset>
          )}
          {options.length === 1 && <p className="product-price big">{options[0].price}</p>}
          {mode === 'subscribe' && <p className="small">{tr('subNote')}</p>}
          {mode === 'rent' && <p className="small">{tr('rentNote')}</p>}

          <form className="pin-check" onSubmit={checkPin}>
            <label htmlFor="pin">{tr('checkPin')}</label>
            <div className="input-row">
              <input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setPinResult(null); }} placeholder={tr('pinPlaceholder')} aria-describedby="pin-result" />
              <button className="btn btn-outline" type="submit">{tr('check')}</button>
            </div>
            <p id="pin-result" aria-live="polite" className={`pin-result ${pinResult || ''}`}>
              {pinResult === 'ok' && <><Icon name="truck" size={18} /> {tr('pinOk', { when: lang === 'en' ? when.toLowerCase() : when })}</>}
              {pinResult === 'no' && <>{tr('pinNo')}</>}
              {pinResult === 'invalid' && <>{tr('pinInvalid')}</>}
            </p>
          </form>

          {product.rx ? (
            <div className="rx-buy">
              <p><strong>{tr('rxBuyStrong')}</strong> {tr('rxBuyText')}</p>
              <div className="btn-row">
                <button type="button" className="btn btn-primary" onClick={addToCart}>{tr('addToCart')}</button>
                <Link to="/prescription" className="btn btn-urgent">{tr('uploadRx')}</Link>
              </div>
            </div>
          ) : (
            <div className="buy-row">
              <div className="qty" role="group" aria-label={tr('quantity')}>
                <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label={tr('oneLess')}><Icon name="minus" /></button>
                <span aria-live="polite">{qty}</span>
                <button type="button" onClick={() => setQty((n) => n + 1)} aria-label={tr('oneMore')}><Icon name="plus" /></button>
              </div>
              <button type="button" className="btn btn-primary grow" onClick={addToCart}>
                {mode === 'rent' ? tr('rentThis') : mode === 'subscribe' ? tr('startPlan') : tr('addToCart')}
              </button>
            </div>
          )}
          {added && (
            <p className="added-note" role="status">
              <Icon name="check" size={18} /> {tr('added')} <Link to="/cart">{tr('goToCart')}</Link>
            </p>
          )}
        </div>
      </div>

      <div className="two-col section-sm">
        <div>
          <h2>{tr('questions')}</h2>
          <FaqList items={productFaq(product, lang)} />
        </div>
        <div className="stack">
          {product.rx && <AppQR title={tr('uploadYourRx')} />}
          <HelpBox />
        </div>
      </div>
    </div>
  );
}
