import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useLang, useT } from '../context/LangContext.jsx';
import { OrderSummary } from './Cart.jsx';
import { Field, PageHead, Steps, AppQR, InfoBand } from '../components/ui.jsx';
import { isServiceablePincode, formatPrice } from '../config/site.js';

const STEPS = [
  { title: 'Phone', text: 'Verify with OTP', color: 'var(--green)',
    hi: { title: 'फ़ोन', text: 'OTP से पुष्टि करें' }, mr: { title: 'फोन', text: 'OTP ने पडताळणी करा' } },
  { title: 'Address', text: 'Where to deliver', color: 'var(--sage)',
    hi: { title: 'पता', text: 'कहाँ पहुँचाना है' }, mr: { title: 'पत्ता', text: 'कुठे पोहोचवायचे' } },
  { title: 'Delivery time', text: 'Pick a slot', color: 'var(--mustard)',
    hi: { title: 'डिलिवरी का समय', text: 'समय चुनें' }, mr: { title: 'डिलिव्हरीची वेळ', text: 'वेळ निवडा' } },
  { title: 'Pay', text: 'UPI, card or net banking', color: 'var(--terracotta-deep)',
    hi: { title: 'भुगतान करें', text: 'UPI, कार्ड या नेट बैंकिंग' }, mr: { title: 'पैसे भरा', text: 'UPI, कार्ड किंवा नेट बँकिंग' } },
];

// The chosen slot is saved by its stable id (form state, sessionStorage, order record);
// only the label shown on screen changes with the language.
const SLOTS = [
  { id: 'today-6pm', en: 'Today, by 6 pm', hi: 'आज, शाम 6 बजे तक', mr: 'आज, संध्याकाळी 6 पर्यंत' },
  { id: 'today-6-9pm', en: 'Today, 6 pm to 9 pm', hi: 'आज, शाम 6 से रात 9 बजे', mr: 'आज, संध्याकाळी 6 ते रात्री 9' },
  { id: 'tomorrow-9am-1pm', en: 'Tomorrow, 9 am to 1 pm', hi: 'कल, सुबह 9 से दोपहर 1 बजे', mr: 'उद्या, सकाळी 9 ते दुपारी 1' },
  { id: 'tomorrow-2-6pm', en: 'Tomorrow, 2 pm to 6 pm', hi: 'कल, दोपहर 2 से शाम 6 बजे', mr: 'उद्या, दुपारी 2 ते संध्याकाळी 6' },
];
const slotById = (id) => SLOTS.find((s) => s.id === id) || SLOTS[0];
const slotLabel = (id, lang) => slotById(id)[lang] || slotById(id).en;

const PAY = [
  { id: 'upi', en: ['UPI', 'GPay, PhonePe, Paytm or any UPI app'], hi: ['UPI', 'GPay, PhonePe, Paytm या कोई भी UPI ऐप'], mr: ['UPI', 'GPay, PhonePe, Paytm किंवा कोणतेही UPI ॲप'] },
  { id: 'card', en: ['Debit or credit card', 'Visa, Mastercard, RuPay'], hi: ['डेबिट या क्रेडिट कार्ड', 'Visa, Mastercard, RuPay'], mr: ['डेबिट किंवा क्रेडिट कार्ड', 'Visa, Mastercard, RuPay'] },
  { id: 'netbanking', en: ['Net banking', 'All major Indian banks'], hi: ['नेट बैंकिंग', 'सभी बड़े भारतीय बैंक'], mr: ['नेट बँकिंग', 'सर्व प्रमुख भारतीय बँका'] },
];

const T = {
  en: {
    thanks: 'Thank you. Your order is placed.', orderNo: 'Order number',
    rxCheck: 'A pharmacist will check your prescription first. If anything is unclear, they will call you on {phone}. We will send updates on SMS and WhatsApp.',
    arriving: 'Arriving {slot}. Share the OTP with the rider. Updates come on SMS and WhatsApp.',
    track: 'Track my order', keepShopping: 'Keep shopping',
    empty: 'Your cart is empty. Start with your regular medicines.', orderMedicines: 'Order medicines',
    errPhone: 'Please enter a 10-digit mobile number.',
    errOtp: 'Please enter the 4-digit code we sent by SMS.',
    errName: 'Please tell us who will receive the order.',
    errHouse: 'Please add the flat or house number and building.',
    errArea: 'Please add the area or street.',
    errPin: 'We deliver in Mumbai, Navi Mumbai and Thane. Please check the 6-digit pincode.',
    title: 'Checkout', intro: 'Four short steps. No account needed, just your phone number.',
    failed: 'That did not go through. Your money is safe. Please try again.',
    phoneHead: 'Your phone number', mobile: 'Mobile number',
    mobileHint: 'We send a one-time code by SMS. We use it for delivery updates only.',
    otpLabel: '4-digit code from SMS', otpHint: 'Demo: type any 4 digits.',
    addressHead: 'Delivery address', forFamily: 'I am ordering for a parent or family member',
    theirName: 'Their full name', fullName: 'Full name',
    house: 'Flat / house no. and building', area: 'Area and street', pincode: 'Pincode',
    whenDeliver: 'When should we deliver?', howPay: 'How would you like to pay?',
    rxNeededTitle: 'Prescription needed',
    rxNeededText: 'Your cart has prescription medicines. Upload the prescription in the Way2Cure app. A pharmacist will check it before packing, and will call you if anything is unclear.',
    secure: 'Secure payment. Your card details are never stored by Way2Cure.',
    back: 'Back', sendCode: 'Send code', pay: 'Pay {amount}', continue: 'Continue',
  },
  hi: {
    thanks: 'धन्यवाद। आपका ऑर्डर हो गया है।', orderNo: 'ऑर्डर नंबर',
    rxCheck: 'फ़ार्मासिस्ट पहले आपका पर्चा जाँचेंगे। कुछ भी साफ़ न हो, तो वे आपको {phone} पर कॉल करेंगे। हम SMS और WhatsApp पर जानकारी भेजते रहेंगे।',
    arriving: '{slot} पहुँचेगा। राइडर को OTP बताएँ। जानकारी SMS और WhatsApp पर मिलती रहेगी।',
    track: 'मेरा ऑर्डर ट्रैक करें', keepShopping: 'खरीदारी जारी रखें',
    empty: 'आपका कार्ट खाली है। अपनी रोज़ की दवाइयों से शुरू करें।', orderMedicines: 'दवाइयाँ मँगाएँ',
    errPhone: 'कृपया 10 अंकों का मोबाइल नंबर डालें।',
    errOtp: 'कृपया SMS से भेजा गया 4 अंकों का कोड डालें।',
    errName: 'कृपया बताएँ कि ऑर्डर कौन लेगा।',
    errHouse: 'कृपया फ़्लैट या घर नंबर और बिल्डिंग का नाम डालें।',
    errArea: 'कृपया इलाका या सड़क का नाम डालें।',
    errPin: 'हम मुंबई, नवी मुंबई और ठाणे में डिलिवरी करते हैं। कृपया 6 अंकों का पिनकोड जाँच लें।',
    title: 'चेकआउट', intro: 'चार छोटे कदम। खाता बनाने की ज़रूरत नहीं, बस आपका फ़ोन नंबर।',
    failed: 'यह पूरा नहीं हुआ। आपके पैसे सुरक्षित हैं। कृपया फिर से कोशिश करें।',
    phoneHead: 'आपका फ़ोन नंबर', mobile: 'मोबाइल नंबर',
    mobileHint: 'हम SMS से एक बार का कोड भेजते हैं। नंबर का इस्तेमाल सिर्फ़ डिलिवरी की जानकारी के लिए होगा।',
    otpLabel: 'SMS से मिला 4 अंकों का कोड', otpHint: 'डेमो: कोई भी 4 अंक डालें।',
    addressHead: 'डिलिवरी का पता', forFamily: 'मैं अपने माता-पिता या परिवार के किसी सदस्य के लिए ऑर्डर कर रहा/रही हूँ',
    theirName: 'उनका पूरा नाम', fullName: 'पूरा नाम',
    house: 'फ़्लैट / घर नंबर और बिल्डिंग', area: 'इलाका और सड़क', pincode: 'पिनकोड',
    whenDeliver: 'हम कब पहुँचाएँ?', howPay: 'आप कैसे भुगतान करना चाहेंगे?',
    rxNeededTitle: 'पर्चा ज़रूरी है',
    rxNeededText: 'आपके कार्ट में पर्चे वाली दवाइयाँ हैं। Way2Cure ऐप में पर्चा अपलोड करें। पैक करने से पहले फ़ार्मासिस्ट इसे जाँचेंगे, और कुछ भी साफ़ न हो तो आपको कॉल करेंगे।',
    secure: 'सुरक्षित भुगतान। Way2Cure आपके कार्ड की जानकारी कभी सेव नहीं करता।',
    back: 'पीछे', sendCode: 'कोड भेजें', pay: '{amount} का भुगतान करें', continue: 'आगे बढ़ें',
  },
  mr: {
    thanks: 'धन्यवाद. तुमची ऑर्डर झाली आहे.', orderNo: 'ऑर्डर नंबर',
    rxCheck: 'फार्मासिस्ट आधी तुमचे प्रिस्क्रिप्शन तपासतील. काही स्पष्ट नसल्यास, ते तुम्हाला {phone} वर कॉल करतील. आम्ही SMS आणि WhatsApp वर माहिती पाठवत राहू.',
    arriving: '{slot} पोहोचेल. रायडरला OTP सांगा. माहिती SMS आणि WhatsApp वर मिळत राहील.',
    track: 'माझी ऑर्डर ट्रॅक करा', keepShopping: 'खरेदी सुरू ठेवा',
    empty: 'तुमचे कार्ट रिकामे आहे. तुमच्या नेहमीच्या औषधांपासून सुरुवात करा.', orderMedicines: 'औषधे मागवा',
    errPhone: 'कृपया 10 अंकी मोबाइल नंबर टाका.',
    errOtp: 'कृपया SMS ने पाठवलेला 4 अंकी कोड टाका.',
    errName: 'कृपया ऑर्डर कोण घेणार ते सांगा.',
    errHouse: 'कृपया फ्लॅट किंवा घर नंबर आणि इमारतीचे नाव टाका.',
    errArea: 'कृपया परिसर किंवा रस्त्याचे नाव टाका.',
    errPin: 'आम्ही मुंबई, नवी मुंबई आणि ठाणे येथे डिलिव्हरी करतो. कृपया 6 अंकी पिनकोड तपासा.',
    title: 'चेकआउट', intro: 'चार छोट्या पायऱ्या. खाते लागत नाही, फक्त तुमचा फोन नंबर.',
    failed: 'हे पूर्ण झाले नाही. तुमचे पैसे सुरक्षित आहेत. कृपया पुन्हा प्रयत्न करा.',
    phoneHead: 'तुमचा फोन नंबर', mobile: 'मोबाइल नंबर',
    mobileHint: 'आम्ही SMS ने एक वेळचा कोड पाठवतो. नंबर फक्त डिलिव्हरीच्या माहितीसाठी वापरला जाईल.',
    otpLabel: 'SMS मधील 4 अंकी कोड', otpHint: 'डेमो: कोणतेही 4 अंक टाका.',
    addressHead: 'डिलिव्हरीचा पत्ता', forFamily: 'मी माझ्या आई-वडिलांसाठी किंवा कुटुंबातील व्यक्तीसाठी ऑर्डर करत आहे',
    theirName: 'त्यांचे पूर्ण नाव', fullName: 'पूर्ण नाव',
    house: 'फ्लॅट / घर नंबर आणि इमारत', area: 'परिसर आणि रस्ता', pincode: 'पिनकोड',
    whenDeliver: 'आम्ही कधी पोहोचवू?', howPay: 'तुम्हाला पैसे कसे भरायचे आहेत?',
    rxNeededTitle: 'प्रिस्क्रिप्शन आवश्यक',
    rxNeededText: 'तुमच्या कार्टमध्ये प्रिस्क्रिप्शनची औषधे आहेत. Way2Cure ॲपमध्ये प्रिस्क्रिप्शन अपलोड करा. पॅक करण्यापूर्वी फार्मासिस्ट ते तपासतील, आणि काही स्पष्ट नसल्यास तुम्हाला कॉल करतील.',
    secure: 'सुरक्षित पेमेंट. Way2Cure तुमच्या कार्डची माहिती कधीच साठवत नाही.',
    back: 'मागे', sendCode: 'कोड पाठवा', pay: '{amount} भरा', continue: 'पुढे चला',
  },
};

const DRAFT_KEY = 'w2c-checkout-draft';

const loadDraft = () => {
  try { return JSON.parse(sessionStorage.getItem(DRAFT_KEY)) || {}; } catch { return {}; }
};

export default function Checkout() {
  const { lang } = useLang();
  const tr = useT(T);
  const { count, hasRx, placeOrder, total } = useCart();
  const draft = loadDraft();
  const [step, setStep] = useState(draft.step || 0);
  const [form, setForm] = useState(() => {
    const f = {
      phone: '', otp: '', otpSent: false, name: '', house: '', area: '', pincode: '', forFamily: false,
      slot: SLOTS[0].id, pay: 'upi', ...draft.form,
    };
    // Older drafts stored the English slot label; map anything unknown back to a valid id.
    if (!SLOTS.some((s) => s.id === f.slot)) f.slot = (SLOTS.find((s) => s.en === f.slot) || SLOTS[0]).id;
    return f;
  });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  const [failed, setFailed] = useState(false);

  // Save progress so a call or a slow network does not lose the order.
  useEffect(() => {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, form })); } catch { /* ignore */ }
  }, [step, form]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  if (order) {
    const slot = slotLabel(order.slotId || form.slot, lang);
    return (
      <div className="container section">
        <div className="card confirm">
          <span className="confirm-icon"><Icon name="check" size={40} /></span>
          <h1>{tr('thanks')}</h1>
          <p className="lead">{tr('orderNo')} <strong>{order.id}</strong> · {formatPrice(order.total)}</p>
          {hasRx || order.status.startsWith('Waiting') ? (
            <InfoBand icon="rx">{tr('rxCheck', { phone: form.phone })}</InfoBand>
          ) : (
            <InfoBand icon="truck">{tr('arriving', { slot: lang === 'en' ? slot.toLowerCase() : slot })}</InfoBand>
          )}
          <div className="btn-row">
            <Link to="/account" className="btn btn-primary">{tr('track')}</Link>
            <Link to="/shop" className="btn btn-outline">{tr('keepShopping')}</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!count) {
    return (
      <div className="container section">
        <div className="empty card">
          <h1 className="h2">{tr('empty')}</h1>
          <Link to="/shop/medicines" className="btn btn-primary">{tr('orderMedicines')}</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'errPhone';
      else if (form.otpSent && !/^\d{4}$/.test(form.otp)) e.otp = 'errOtp';
    }
    if (step === 1) {
      if (!form.name.trim()) e.name = 'errName';
      if (!form.house.trim()) e.house = 'errHouse';
      if (!form.area.trim()) e.area = 'errArea';
      if (!isServiceablePincode(form.pincode)) e.pincode = 'errPin';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };
  // Errors are stored as keys so they follow a language switch.
  const err = (k) => (errors[k] ? tr(errors[k]) : undefined);

  const next = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (step === 0 && !form.otpSent) {
      setForm((f) => ({ ...f, otpSent: true }));
      return;
    }
    if (step < 3) setStep(step + 1);
    else {
      // Demo: payment gateway goes here. On failure, show the plain "money is safe" message.
      if (form.name.trim().toLowerCase() === 'fail') { setFailed(true); return; }
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      setOrder(placeOrder({
        slotId: form.slot, slot: slotLabel(form.slot, 'en'),
        phone: form.phone, address: `${form.house}, ${form.area}, ${form.pincode}`,
      }));
    }
  };

  return (
    <>
      <PageHead title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>
      <div className="container section-sm">
        <Steps steps={STEPS} current={step} />
        <div className="checkout-layout">
          <form className="card form-card" onSubmit={next} noValidate>
            {failed && (
              <div className="alert" role="alert">
                <Icon name="warning" /> {tr('failed')}
              </div>
            )}

            {step === 0 && (
              <>
                <h2 className="h3">{tr('phoneHead')}</h2>
                <Field id="phone" label={tr('mobile')} hint={tr('mobileHint')} error={err('phone')}>
                  <input id="phone" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, ''), otpSent: false, otp: '' }))}
                    aria-invalid={!!errors.phone} aria-describedby="phone-hint" />
                </Field>
                {form.otpSent && (
                  <Field id="otp" label={tr('otpLabel')} hint={tr('otpHint')} error={err('otp')}>
                    <input id="otp" inputMode="numeric" autoComplete="one-time-code" maxLength={4} value={form.otp}
                      onChange={(e) => setForm((f) => ({ ...f, otp: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.otp} />
                  </Field>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="h3">{tr('addressHead')}</h2>
                <label className="check">
                  <input type="checkbox" checked={form.forFamily} onChange={set('forFamily')} />
                  {tr('forFamily')}
                </label>
                <Field id="name" label={form.forFamily ? tr('theirName') : tr('fullName')} error={err('name')}>
                  <input id="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} />
                </Field>
                <Field id="house" label={tr('house')} error={err('house')}>
                  <input id="house" autoComplete="address-line1" value={form.house} onChange={set('house')} aria-invalid={!!errors.house} />
                </Field>
                <Field id="area" label={tr('area')} error={err('area')}>
                  <input id="area" autoComplete="address-line2" value={form.area} onChange={set('area')} aria-invalid={!!errors.area} />
                </Field>
                <Field id="pincode" label={tr('pincode')} error={err('pincode')}>
                  <input id="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={form.pincode}
                    onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.pincode} />
                </Field>
              </>
            )}

            {step === 2 && (
              <fieldset className="option-group">
                <legend className="h3">{tr('whenDeliver')}</legend>
                {SLOTS.map((s) => (
                  <label key={s.id} className={`option${form.slot === s.id ? ' selected' : ''}`}>
                    <input type="radio" name="slot" value={s.id} checked={form.slot === s.id} onChange={set('slot')} />
                    <span><strong>{s[lang] || s.en}</strong></span>
                  </label>
                ))}
              </fieldset>
            )}

            {step === 3 && (
              <>
                <fieldset className="option-group">
                  <legend className="h3">{tr('howPay')}</legend>
                  {PAY.map((o) => {
                    const [l, d] = o[lang] || o.en;
                    return (
                      <label key={o.id} className={`option${form.pay === o.id ? ' selected' : ''}`}>
                        <input type="radio" name="pay" value={o.id} checked={form.pay === o.id} onChange={set('pay')} />
                        <span><strong>{l}</strong><span>{d}</span></span>
                      </label>
                    );
                  })}
                </fieldset>
                {hasRx && <AppQR title={tr('rxNeededTitle')} text={tr('rxNeededText')} />}
                <p className="small muted"><Icon name="lock" size={16} /> {tr('secure')}</p>
              </>
            )}

            <div className="form-actions">
              {step > 0 && <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>{tr('back')}</button>}
              <button type="submit" className="btn btn-primary grow">
                {step === 0 && !form.otpSent ? tr('sendCode') : step === 3 ? tr('pay', { amount: formatPrice(total) }) : tr('continue')}
              </button>
            </div>
          </form>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
