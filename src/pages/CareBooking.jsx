import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { getService, services } from '../data/services.js';
import { Field, InfoBand, PageHead, Steps, HelpBox } from '../components/ui.jsx';
import { isServiceablePincode, SITE } from '../config/site.js';
import NotFound from './NotFound.jsx';

const STEPS = [
  { title: 'Service', text: 'Who needs care', color: 'var(--green)' },
  { title: 'Date & time', text: 'When to start', color: 'var(--sage)' },
  { title: 'Location', text: 'Where to come', color: 'var(--mustard)' },
  { title: 'Confirm', text: 'We call to confirm', color: 'var(--terracotta-deep)' },
];
const TIMES = ['Morning (8 am to 12 pm)', 'Afternoon (12 pm to 4 pm)', 'Evening (4 pm to 8 pm)', 'Night shift (8 pm to 8 am)'];

const today = () => new Date().toISOString().slice(0, 10);

export default function CareBooking() {
  const { serviceId } = useParams();
  const initial = getService(serviceId);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [f, setF] = useState({
    service: serviceId, patient: '', age: '', relation: 'Parent', date: today(), time: TIMES[0],
    area: '', pincode: '', name: '', phone: '', contactBy: 'call', notes: '',
  });

  if (!initial) return <NotFound />;
  const service = getService(f.service);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (step === 0 && !f.patient.trim()) e.patient = 'Please add the patient\'s name.';
    if (step === 1 && f.date < today()) e.date = 'Please choose today or a later date.';
    if (step === 2) {
      if (!f.area.trim()) e.area = 'Please add the area or address.';
      if (!isServiceablePincode(f.pincode)) e.pincode = 'We serve Mumbai, Navi Mumbai and Thane. Please check the 6-digit pincode.';
    }
    if (step === 3) {
      if (!f.name.trim()) e.name = 'Please add your name.';
      if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Please enter a 10-digit mobile number.';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="container section">
        <div className="card confirm">
          <span className="confirm-icon"><Icon name="check" size={40} /></span>
          <h1>Request received for {service.name.toLowerCase()}.</h1>
          <p className="lead">
            Our care team will {f.contactBy === 'whatsapp' ? 'message you on WhatsApp' : 'call you'} at {f.phone} to confirm the nurse or doctor, the timing and the price.
          </p>
          <p>Nothing is charged until you confirm. Need us sooner? Call <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
          <Link to="/" className="btn btn-primary">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHead eyebrow="Book care at home" title={service.name}>
        <p>{service.short}</p>
      </PageHead>
      <div className="container section-sm">
        <Steps steps={STEPS} current={step} />
        <div className="checkout-layout">
          <form className="card form-card" onSubmit={next} noValidate>
            {step === 0 && (
              <>
                <label className="select-label">Service
                  <select value={f.service} onChange={set('service')}>
                    {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </label>
                <Field id="patient" label="Patient's name" error={errors.patient}>
                  <input id="patient" value={f.patient} onChange={set('patient')} aria-invalid={!!errors.patient} />
                </Field>
                <div className="field-row">
                  <Field id="age" label="Age (optional)">
                    <input id="age" inputMode="numeric" maxLength={3} value={f.age} onChange={set('age')} />
                  </Field>
                  <label className="select-label">The patient is my
                    <select value={f.relation} onChange={set('relation')}>
                      {['Parent', 'Spouse', 'Grandparent', 'Child', 'Myself', 'Other'].map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </label>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <Field id="date" label="Start date" error={errors.date}>
                  <input id="date" type="date" min={today()} value={f.date} onChange={set('date')} aria-invalid={!!errors.date} />
                </Field>
                <fieldset className="option-group">
                  <legend>Preferred time</legend>
                  {TIMES.map((t) => (
                    <label key={t} className={`option${f.time === t ? ' selected' : ''}`}>
                      <input type="radio" name="time" value={t} checked={f.time === t} onChange={set('time')} />
                      <span><strong>{t}</strong></span>
                    </label>
                  ))}
                </fieldset>
              </>
            )}
            {step === 2 && (
              <>
                <Field id="area" label="Address or area" error={errors.area}>
                  <input id="area" autoComplete="street-address" value={f.area} onChange={set('area')} aria-invalid={!!errors.area} />
                </Field>
                <Field id="pincode" label="Pincode" error={errors.pincode}>
                  <input id="pincode" inputMode="numeric" maxLength={6} value={f.pincode} onChange={(e) => setF((x) => ({ ...x, pincode: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.pincode} />
                </Field>
                <Field id="notes" label="Anything we should know? (optional)" hint="For example: recent surgery, medicines, or mobility needs.">
                  <textarea id="notes" rows={3} value={f.notes} onChange={set('notes')} />
                </Field>
              </>
            )}
            {step === 3 && (
              <>
                <Field id="name" label="Your name" error={errors.name}>
                  <input id="name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} />
                </Field>
                <Field id="phone" label="Your mobile number" error={errors.phone}>
                  <input id="phone" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={f.phone} onChange={(e) => setF((x) => ({ ...x, phone: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.phone} />
                </Field>
                <fieldset className="option-group">
                  <legend>How should we confirm?</legend>
                  {[['call', 'Phone call'], ['whatsapp', 'WhatsApp']].map(([v, l]) => (
                    <label key={v} className={`option${f.contactBy === v ? ' selected' : ''}`}>
                      <input type="radio" name="contactBy" value={v} checked={f.contactBy === v} onChange={set('contactBy')} />
                      <span><strong>{l}</strong></span>
                    </label>
                  ))}
                </fieldset>
              </>
            )}
            <div className="form-actions">
              {step > 0 && <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>}
              <button type="submit" className={`btn grow ${step === 3 ? 'btn-urgent' : 'btn-primary'}`}>
                {step === 3 ? 'Request booking' : 'Continue'}
              </button>
            </div>
          </form>

          <aside className="stack">
            <div className="card card-edge-top included" style={{ '--edge': service.edge }}>
              <h2 className="h3">What is included</h2>
              <ul className="check-list">
                {service.includes.map((i) => <li key={i}><Icon name="check" /> {i}</li>)}
              </ul>
              <p><Icon name="clock" size={18} /> <strong>Typical duration:</strong> {service.duration}</p>
              <p className="small muted">Price is shared on the confirmation call, after we understand the patient's needs.</p>
            </div>
            {service.specialised && (
              <InfoBand icon="stethoscope">
                <strong>Doctor-led care plan.</strong> Suitability is assessed by the treating doctor before care begins.
              </InfoBand>
            )}
            <HelpBox />
          </aside>
        </div>
      </div>
    </>
  );
}
