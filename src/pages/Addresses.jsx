import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { Field, HelpBox, InfoBand, PageHead } from '../components/ui.jsx';
import useStoredList from '../hooks/useStoredList.js';
import { isServiceablePincode, SITE } from '../config/site.js';

const EMPTY = { label: 'Home', forWhom: '', house: '', area: '', pincode: '' };

const PAYMENTS = [
  { icon: 'phoneApp', title: 'UPI', text: 'GPay, PhonePe, Paytm or any UPI app' },
  { icon: 'lock', title: 'Credit and debit cards', text: 'Visa, Mastercard, RuPay' },
  { icon: 'verified', title: 'Net banking', text: 'All major Indian banks' },
];

export default function Addresses() {
  const { list, add, remove } = useStoredList('w2c-addresses');
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.house.trim()) er.house = 'Please add the flat or house number and building.';
    if (!f.area.trim()) er.area = 'Please add the area or street.';
    if (!/^\d{6}$/.test(f.pincode)) er.pincode = 'Please enter a 6-digit pincode.';
    else if (!isServiceablePincode(f.pincode)) er.pincode = `We do not deliver to this pincode yet. We serve ${SITE.cities}.`;
    setErrors(er);
    if (Object.keys(er).length) return;
    add(f);
    setSaved(true);
    setF(EMPTY);
    setOpen(false);
  };

  return (
    <>
      <PageHead eyebrow="Account" title="Addresses & payments">
        <p>Save the addresses you order to, including your parents' home, so checkout takes one tap.</p>
      </PageHead>

      <div className="container section-sm two-col">
        <div className="stack">
          <h2>Saved addresses</h2>
          {saved && (
            <p className="added-note" role="status"><Icon name="check" size={18} /> Address saved.</p>
          )}

          {list.length ? (
            <ul className="stack">
              {list.map((a) => (
                <li key={a.id} className="card card-edge-left" style={{ '--edge': 'var(--green)' }}>
                  <div className="order-head">
                    <h3>{a.label}</h3>
                    {a.forWhom && <span className="tag tag-rent">For {a.forWhom}</span>}
                  </div>
                  <p className="small">{a.house}, {a.area}, {a.pincode}</p>
                  <button type="button" className="link-btn" onClick={() => remove(a.id)}>
                    <Icon name="trash" size={18} /> Remove this address
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty card">
              <Icon name="pin" size={40} />
              <h3>No saved addresses yet.</h3>
              <p>Add one now, or we will save it the first time you check out.</p>
            </div>
          )}

          {!open && (
            <button type="button" className="btn btn-primary" onClick={() => { setOpen(true); setSaved(false); }}>
              <Icon name="plus" /> Add an address
            </button>
          )}

          {open && (
            <div className="card form-card">
              <form onSubmit={submit} noValidate>
                <h3>Add an address</h3>
                <div className="field-row">
                  <label className="select-label">Save as
                    <select value={f.label} onChange={set('label')}>
                      {['Home', "Parents' home", 'Work', 'Other'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <Field id="ad-for" label="For whom (optional)">
                    <input id="ad-for" value={f.forWhom} onChange={set('forWhom')} placeholder="e.g. Mother" />
                  </Field>
                </div>
                <Field id="ad-house" label="Flat / house no. and building" error={errors.house}>
                  <input id="ad-house" autoComplete="address-line1" value={f.house} onChange={set('house')} aria-invalid={!!errors.house} />
                </Field>
                <Field id="ad-area" label="Area and street" error={errors.area}>
                  <input id="ad-area" autoComplete="address-line2" value={f.area} onChange={set('area')} aria-invalid={!!errors.area} />
                </Field>
                <Field id="ad-pin" label="Pincode" error={errors.pincode}>
                  <input id="ad-pin" inputMode="numeric" maxLength={6} autoComplete="postal-code" value={f.pincode}
                    onChange={(e) => setF({ ...f, pincode: e.target.value.replace(/\D/g, '') })} aria-invalid={!!errors.pincode} />
                </Field>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Save address</button>
                  <button type="button" className="btn btn-outline" onClick={() => { setOpen(false); setErrors({}); }}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="stack">
          <h2>How you can pay</h2>
          <ul className="stack">
            {PAYMENTS.map((p) => (
              <li key={p.title} className="card tile">
                <span className="tile-icon"><Icon name={p.icon} size={28} /></span>
                <span className="tile-text"><strong>{p.title}</strong><span>{p.text}</span></span>
              </li>
            ))}
          </ul>
          <InfoBand icon="lock">
            <strong>We never store your card or UPI PIN.</strong> Payments go through a secure payment partner. You see the full price, including delivery, before you pay.
          </InfoBand>
          <HelpBox />
        </div>
      </div>
    </>
  );
}
