import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useCart } from '../context/CartContext.jsx';
import { OrderSummary } from './Cart.jsx';
import { Field, PageHead, Steps, AppQR, InfoBand } from '../components/ui.jsx';
import { isServiceablePincode, formatPrice } from '../config/site.js';

const STEPS = [
  { title: 'Phone', text: 'Verify with OTP', color: 'var(--green)' },
  { title: 'Address', text: 'Where to deliver', color: 'var(--sage)' },
  { title: 'Delivery time', text: 'Pick a slot', color: 'var(--mustard)' },
  { title: 'Pay', text: 'UPI, card or net banking', color: 'var(--terracotta-deep)' },
];

const SLOTS = ['Today, by 6 pm', 'Today, 6 pm to 9 pm', 'Tomorrow, 9 am to 1 pm', 'Tomorrow, 2 pm to 6 pm'];
const DRAFT_KEY = 'w2c-checkout-draft';

const loadDraft = () => {
  try { return JSON.parse(sessionStorage.getItem(DRAFT_KEY)) || {}; } catch { return {}; }
};

export default function Checkout() {
  const { count, hasRx, placeOrder, total } = useCart();
  const draft = loadDraft();
  const [step, setStep] = useState(draft.step || 0);
  const [form, setForm] = useState({
    phone: '', otp: '', otpSent: false, name: '', house: '', area: '', pincode: '', forFamily: false,
    slot: SLOTS[0], pay: 'upi', ...draft.form,
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
    return (
      <div className="container section">
        <div className="card confirm">
          <span className="confirm-icon"><Icon name="check" size={40} /></span>
          <h1>Thank you. Your order is placed.</h1>
          <p className="lead">Order number <strong>{order.id}</strong> · {formatPrice(order.total)}</p>
          {hasRx || order.status.startsWith('Waiting') ? (
            <InfoBand icon="rx">
              A pharmacist will check your prescription first. If anything is unclear, they will call you on {form.phone}.
              We will send updates on SMS and WhatsApp.
            </InfoBand>
          ) : (
            <InfoBand icon="truck">Arriving {form.slot.toLowerCase()}. Share the OTP with the rider. Updates come on SMS and WhatsApp.</InfoBand>
          )}
          <div className="btn-row">
            <Link to="/account" className="btn btn-primary">Track my order</Link>
            <Link to="/shop" className="btn btn-outline">Keep shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!count) {
    return (
      <div className="container section">
        <div className="empty card">
          <h1 className="h2">Your cart is empty. Start with your regular medicines.</h1>
          <Link to="/shop/medicines" className="btn btn-primary">Order medicines</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Please enter a 10-digit mobile number.';
      else if (form.otpSent && !/^\d{4}$/.test(form.otp)) e.otp = 'Please enter the 4-digit code we sent by SMS.';
    }
    if (step === 1) {
      if (!form.name.trim()) e.name = 'Please tell us who will receive the order.';
      if (!form.house.trim()) e.house = 'Please add the flat or house number and building.';
      if (!form.area.trim()) e.area = 'Please add the area or street.';
      if (!isServiceablePincode(form.pincode)) e.pincode = 'We deliver in Mumbai, Navi Mumbai and Thane. Please check the 6-digit pincode.';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

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
      setOrder(placeOrder({ slot: form.slot, phone: form.phone, address: `${form.house}, ${form.area}, ${form.pincode}` }));
    }
  };

  return (
    <>
      <PageHead title="Checkout">
        <p>Four short steps. No account needed, just your phone number.</p>
      </PageHead>
      <div className="container section-sm">
        <Steps steps={STEPS} current={step} />
        <div className="checkout-layout">
          <form className="card form-card" onSubmit={next} noValidate>
            {failed && (
              <div className="alert" role="alert">
                <Icon name="warning" /> That did not go through. Your money is safe. Please try again.
              </div>
            )}

            {step === 0 && (
              <>
                <h2 className="h3">Your phone number</h2>
                <Field id="phone" label="Mobile number" hint="We send a one-time code by SMS. We use it for delivery updates only." error={errors.phone}>
                  <input id="phone" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, ''), otpSent: false, otp: '' }))}
                    aria-invalid={!!errors.phone} aria-describedby="phone-hint" />
                </Field>
                {form.otpSent && (
                  <Field id="otp" label="4-digit code from SMS" hint="Demo: type any 4 digits." error={errors.otp}>
                    <input id="otp" inputMode="numeric" autoComplete="one-time-code" maxLength={4} value={form.otp}
                      onChange={(e) => setForm((f) => ({ ...f, otp: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.otp} />
                  </Field>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="h3">Delivery address</h2>
                <label className="check">
                  <input type="checkbox" checked={form.forFamily} onChange={set('forFamily')} />
                  I am ordering for a parent or family member
                </label>
                <Field id="name" label={form.forFamily ? 'Their full name' : 'Full name'} error={errors.name}>
                  <input id="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} />
                </Field>
                <Field id="house" label="Flat / house no. and building" error={errors.house}>
                  <input id="house" autoComplete="address-line1" value={form.house} onChange={set('house')} aria-invalid={!!errors.house} />
                </Field>
                <Field id="area" label="Area and street" error={errors.area}>
                  <input id="area" autoComplete="address-line2" value={form.area} onChange={set('area')} aria-invalid={!!errors.area} />
                </Field>
                <Field id="pincode" label="Pincode" error={errors.pincode}>
                  <input id="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={form.pincode}
                    onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.pincode} />
                </Field>
              </>
            )}

            {step === 2 && (
              <fieldset className="option-group">
                <legend className="h3">When should we deliver?</legend>
                {SLOTS.map((s) => (
                  <label key={s} className={`option${form.slot === s ? ' selected' : ''}`}>
                    <input type="radio" name="slot" value={s} checked={form.slot === s} onChange={set('slot')} />
                    <span><strong>{s}</strong></span>
                  </label>
                ))}
              </fieldset>
            )}

            {step === 3 && (
              <>
                <fieldset className="option-group">
                  <legend className="h3">How would you like to pay?</legend>
                  {[
                    ['upi', 'UPI', 'GPay, PhonePe, Paytm or any UPI app'],
                    ['card', 'Debit or credit card', 'Visa, Mastercard, RuPay'],
                    ['netbanking', 'Net banking', 'All major Indian banks'],
                  ].map(([v, l, d]) => (
                    <label key={v} className={`option${form.pay === v ? ' selected' : ''}`}>
                      <input type="radio" name="pay" value={v} checked={form.pay === v} onChange={set('pay')} />
                      <span><strong>{l}</strong><span>{d}</span></span>
                    </label>
                  ))}
                </fieldset>
                {hasRx && <AppQR title="Prescription needed" text="Your cart has prescription medicines. Upload the prescription in the Way2Cure app. A pharmacist will check it before packing, and will call you if anything is unclear." />}
                <p className="small muted"><Icon name="lock" size={16} /> Secure payment. Your card details are never stored by Way2Cure.</p>
              </>
            )}

            <div className="form-actions">
              {step > 0 && <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>}
              <button type="submit" className="btn btn-primary grow">
                {step === 0 && !form.otpSent ? 'Send code' : step === 3 ? `Pay ${formatPrice(total)}` : 'Continue'}
              </button>
            </div>
          </form>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
