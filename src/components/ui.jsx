import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import Icon from './Icon.jsx';
import { SITE } from '../config/site.js';

export function Tag({ kind, children }) {
  return <span className={`tag tag-${kind}`}>{children}</span>;
}

export function SellerTag({ product }) {
  return product.seller === 'Way2Cure' ? (
    <p className="seller-line"><Icon name="verified" size={18} /> Sold by Way2Cure</p>
  ) : (
    <p className="seller-line"><Icon name="verified" size={18} /> Sold by {product.seller} · Verified seller</p>
  );
}

export function PageHead({ eyebrow, title, children, tone = 'cream' }) {
  return (
    <section className={`page-head page-head-${tone}`}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children && <div className="page-head-text">{children}</div>}
      </div>
    </section>
  );
}

export function InfoBand({ children, icon = 'info' }) {
  return (
    <div className="info-band">
      <Icon name={icon} />
      <div>{children}</div>
    </div>
  );
}

export function RxNotice() {
  return (
    <InfoBand icon="rx">
      Prescription medicines sold only with a valid prescription. A registered pharmacist checks every
      prescription order.
    </InfoBand>
  );
}

export function Steps({ steps, current }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={`step${current === i ? ' current' : ''}${current > i ? ' done' : ''}`}
          aria-current={current === i ? 'step' : undefined}
          style={{ '--step': s.color }}
        >
          <span className="step-num">{current > i ? <Icon name="check" size={20} /> : i + 1}</span>
          <span className="step-text">
            <strong>{s.title}</strong>
            {s.text && <span>{s.text}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

export const rxSteps = [
  { title: 'Upload', text: 'Snap your prescription in the app', color: 'var(--green)' },
  { title: 'AI reads', text: 'Medicines are listed for you to confirm', color: 'var(--sage)' },
  { title: 'Pharmacist verifies', text: 'A registered pharmacist checks it', color: 'var(--mustard)' },
  { title: 'Delivered', text: 'To your door. Share the OTP with the rider', color: 'var(--terracotta-deep)' },
];

export function TrustStrip() {
  const items = [
    { icon: 'users', title: `${SITE.happyPatients} happy patients`, text: 'Across Mumbai, Navi Mumbai & Thane' },
    { icon: 'userCheck', title: 'Verified nurses', text: 'Background-checked' },
    { icon: 'verified', title: 'Licensed pharmacies', text: 'Mumbai partners' },
    { icon: 'lock', title: 'Secure payments', text: 'UPI · cards · net banking' },
    { icon: 'support', title: '24/7 support', text: `Call ${SITE.phone}` },
  ];
  return (
    <section className="trust-strip" aria-label="Why families trust Way2Cure">
      <div className="container trust-grid">
        {items.map((i) => (
          <div key={i.title} className="trust-item">
            <Icon name={i.icon} size={28} />
            <div>
              <strong>{i.title}</strong>
              <span>{i.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AppQR({ title = 'Open in the app', text }) {
  return (
    <div className="app-qr card">
      <div className="qr-box">
        <QRCodeSVG value={SITE.appUrl} size={148} fgColor="#114D4A" bgColor="#FFFFFF" level="M" title="QR code to open the Way2Cure app" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text || 'Prescription upload works in the Way2Cure mobile app. Scan this code with your phone camera to open it.'}</p>
        <a className="btn btn-urgent show-mobile-inline" href={SITE.appUrl}>
          <Icon name="phoneApp" /> Open the app
        </a>
        <p className="small">No smartphone? Call <a href={SITE.phoneHref}>{SITE.phone}</a> and we will take your order.</p>
      </div>
    </div>
  );
}

export function FaqList({ items }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q} className="faq-item">
          <summary>{f.q}<Icon name="plus" className="faq-icon" /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ServiceCard({ service }) {
  return (
    <article className="card card-edge-top service-card" style={{ '--edge': service.edge }}>
      <span className="service-icon"><Icon name={service.icon} size={28} /></span>
      <h3>{service.name}</h3>
      <p>{service.short}</p>
      <Link to={`/care/${service.id}`} className="btn btn-urgent">
        Book now
      </Link>
    </article>
  );
}

export function Field({ id, label, hint, error, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      {children}
      {error && (
        <p className="field-error" id={`${id}-error`} role="alert">
          <Icon name="warning" size={18} /> {error}
        </p>
      )}
    </div>
  );
}

export function HelpBox() {
  return (
    <aside className="help-box">
      <h3>Need help?</h3>
      <p>Talk to a real person. We can place the order for you.</p>
      <div className="btn-row">
        <a className="btn btn-outline" href={SITE.phoneHref}><Icon name="phone" /> Call {SITE.phone}</a>
        <a className="btn btn-outline" href={SITE.whatsappHref} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> WhatsApp</a>
      </div>
    </aside>
  );
}
