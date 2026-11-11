import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { Field, PageHead } from '../components/ui.jsx';
import { SITE } from '../config/site.js';

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', topic: 'Order medicines for me', time: 'As soon as possible' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Please add your name.';
    if (!/^[6-9]\d{9}$/.test(f.phone)) er.phone = 'Please enter a 10-digit mobile number.';
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  };

  return (
    <>
      <PageHead eyebrow="Contact" title="We're family, not just care">
        <p>Call, WhatsApp or ask us to call you. We can place an order or book care for you over the phone.</p>
      </PageHead>
      <div className="container section-sm two-col">
        <div className="stack">
          <a href={SITE.phoneHref} className="card contact-card">
            <Icon name="phone" size={32} />
            <span><strong>Call us, 24/7</strong><span>{SITE.phoneDisplay}</span></span>
          </a>
          <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="card contact-card">
            <Icon name="whatsapp" size={32} />
            <span><strong>WhatsApp</strong><span>Message us any time</span></span>
          </a>
          <a href={`mailto:${SITE.email}`} className="card contact-card">
            <Icon name="mail" size={32} />
            <span><strong>Email</strong><span>{SITE.email}</span></span>
          </a>
          {SITE.offices.map((o) => (
            <div key={o.name} className="card contact-card">
              <Icon name="pin" size={32} />
              <span><strong>{o.name}</strong><span>{o.address}</span></span>
            </div>
          ))}
        </div>

        <div className="card form-card">
          {sent ? (
            <div role="status">
              <h2 className="h3"><Icon name="check" /> Thank you, {f.name.split(' ')[0]}.</h2>
              <p>We will call you on {f.phone} ({f.time.toLowerCase()}).</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 className="h3">Call me back</h2>
              <p>Leave your number. A care advisor will call you.</p>
              <Field id="c-name" label="Your name" error={errors.name}>
                <input id="c-name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-invalid={!!errors.name} />
              </Field>
              <Field id="c-phone" label="Mobile number" error={errors.phone}>
                <input id="c-phone" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '') })} aria-invalid={!!errors.phone} />
              </Field>
              <label className="select-label">How can we help?
                <select value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
                  {['Order medicines for me', 'Book a nurse or doctor', 'ICU or specialised care', 'Rent equipment', 'Subscriptions', 'Something else'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="select-label">When should we call?
                <select value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}>
                  {['As soon as possible', 'Morning', 'Afternoon', 'Evening'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-block">Call me back</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
