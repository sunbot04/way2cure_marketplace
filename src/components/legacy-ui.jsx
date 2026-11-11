import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import Icon from './Icon';
import { SITE } from '../config/site';
import { useLoc, useT } from '../i18n/LangContext';

// Copy for the shared building blocks below (English, Hindi, Marathi).
const T = {
  en: {
    soldByUs: 'Sold by Way2Cure',
    soldBy: 'Sold by {seller} · Verified seller',
    rxNotice: 'Prescription medicines sold only with a valid prescription. A registered pharmacist checks every prescription order.',
    trustAria: 'Why families trust Way2Cure',
    happy: '{n} happy patients', happyText: 'Across Mumbai, Navi Mumbai & Thane',
    nurses: 'Verified nurses', nursesText: 'Background-checked',
    pharmacies: 'Licensed pharmacies', pharmaciesText: 'Mumbai partners',
    payments: 'Secure payments', paymentsText: 'UPI · cards · net banking',
    privacy: 'Private data', privacyText: 'Consent-based, DPDP-ready',
    support: '24/7 support', supportText: 'Call {phone}',
    openInApp: 'Open in the app',
    qrTitle: 'QR code to open the Way2Cure app',
    qrText: 'Prescription upload works in the Way2Cure mobile app. Scan this code with your phone camera to open it.',
    openApp: 'Open the app',
    noPhone: 'No smartphone? Call',
    noPhoneEnd: 'and we will take your order.',
    bookNow: 'Book now',
    needHelp: 'Need help?',
    helpText: 'Talk to a real person. We can place the order for you.',
    call: 'Call {phone}',
    whatsapp: 'WhatsApp',
  },
  hi: {
    soldByUs: 'Way2Cure द्वारा बेचा गया',
    soldBy: '{seller} द्वारा बेचा गया · सत्यापित विक्रेता',
    rxNotice: 'पर्चे वाली दवाइयाँ सिर्फ़ वैध पर्चे पर ही मिलती हैं। पर्चे वाले हर ऑर्डर को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    trustAria: 'परिवार Way2Cure पर भरोसा क्यों करते हैं',
    happy: '{n} संतुष्ट मरीज़', happyText: 'मुंबई, नवी मुंबई और ठाणे में',
    nurses: 'जाँचे-परखे नर्स', nursesText: 'बैकग्राउंड की जाँच की गई',
    pharmacies: 'लाइसेंस वाली फ़ार्मेसी', pharmaciesText: 'मुंबई के पार्टनर',
    payments: 'सुरक्षित भुगतान', paymentsText: 'यूपीआई · कार्ड · नेट बैंकिंग',
    privacy: 'आपकी जानकारी निजी', privacyText: 'आपकी सहमति से, DPDP के अनुसार',
    support: '24/7 मदद', supportText: '{phone} पर कॉल करें',
    openInApp: 'ऐप में खोलें',
    qrTitle: 'Way2Cure ऐप खोलने के लिए QR कोड',
    qrText: 'पर्चा Way2Cure मोबाइल ऐप में अपलोड होता है। ऐप खोलने के लिए अपने फ़ोन के कैमरे से यह कोड स्कैन करें।',
    openApp: 'ऐप खोलें',
    noPhone: 'स्मार्टफ़ोन नहीं है? कॉल करें',
    noPhoneEnd: '— हम आपका ऑर्डर ले लेंगे।',
    bookNow: 'अभी बुक करें',
    needHelp: 'मदद चाहिए?',
    helpText: 'किसी असली व्यक्ति से बात करें। हम आपके लिए ऑर्डर कर सकते हैं।',
    call: '{phone} पर कॉल करें',
    whatsapp: 'व्हाट्सऐप',
  },
  mr: {
    soldByUs: 'Way2Cure कडून विक्री',
    soldBy: '{seller} कडून विक्री · पडताळलेले विक्रेते',
    rxNotice: 'प्रिस्क्रिप्शनची औषधे फक्त वैध प्रिस्क्रिप्शनवरच मिळतात. प्रिस्क्रिप्शनची प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात.',
    trustAria: 'कुटुंबे Way2Cure वर विश्वास का ठेवतात',
    happy: '{n} समाधानी रुग्ण', happyText: 'मुंबई, नवी मुंबई आणि ठाणे येथे',
    nurses: 'पडताळलेल्या नर्स', nursesText: 'पार्श्वभूमी तपासलेली',
    pharmacies: 'परवानाधारक फार्मसी', pharmaciesText: 'मुंबईतील भागीदार',
    payments: 'सुरक्षित पेमेंट', paymentsText: 'यूपीआय · कार्ड · नेट बँकिंग',
    privacy: 'तुमची माहिती खाजगी', privacyText: 'तुमच्या संमतीने, DPDP नुसार',
    support: '24/7 मदत', supportText: '{phone} वर कॉल करा',
    openInApp: 'ॲपमध्ये उघडा',
    qrTitle: 'Way2Cure ॲप उघडण्यासाठी QR कोड',
    qrText: 'प्रिस्क्रिप्शन Way2Cure मोबाइल ॲपमध्ये अपलोड करता येते. ॲप उघडण्यासाठी तुमच्या फोनच्या कॅमेऱ्याने हा कोड स्कॅन करा.',
    openApp: 'ॲप उघडा',
    noPhone: 'स्मार्टफोन नाही? कॉल करा',
    noPhoneEnd: '— आम्ही तुमची ऑर्डर घेऊ.',
    bookNow: 'आता बुक करा',
    needHelp: 'मदत हवी आहे?',
    helpText: 'खऱ्या व्यक्तीशी बोला. आम्ही तुमच्यासाठी ऑर्डर देऊ शकतो.',
    call: '{phone} वर कॉल करा',
    whatsapp: 'व्हॉट्सॲप',
  },
};

export function Tag({ kind, children }) {
  return <span className={`tag tag-${kind}`}>{children}</span>;
}

export function SellerTag({ product }) {
  const tr = useT(T);
  return product.seller === 'Way2Cure' ? (
    <p className="seller-line"><Icon name="verified" size={18} /> {tr('soldByUs')}</p>
  ) : (
    <p className="seller-line"><Icon name="verified" size={18} /> {tr('soldBy', { seller: product.seller })}</p>
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
  const tr = useT(T);
  return <InfoBand icon="rx">{tr('rxNotice')}</InfoBand>;
}

export function Steps({ steps, current }) {
  const loc = useLoc();
  return (
    <ol className="steps">
      {steps.map(loc).map((s, i) => (
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
  {
    title: 'Upload', text: 'Snap your prescription in the app', color: 'var(--green)',
    hi: { title: 'अपलोड करें', text: 'ऐप में अपने पर्चे की फ़ोटो लें' },
    mr: { title: 'अपलोड करा', text: 'ॲपमध्ये तुमच्या प्रिस्क्रिप्शनचा फोटो काढा' },
  },
  {
    title: 'AI reads', text: 'Medicines are listed for you to confirm', color: 'var(--sage)',
    hi: { title: 'AI पढ़ता है', text: 'दवाइयों की सूची बनती है, आप उसे पक्का करें' },
    mr: { title: 'AI वाचते', text: 'औषधांची यादी तयार होते, तुम्ही ती निश्चित करा' },
  },
  {
    title: 'Pharmacist verifies', text: 'A registered pharmacist checks it', color: 'var(--mustard)',
    hi: { title: 'फ़ार्मासिस्ट जाँचते हैं', text: 'एक रजिस्टर्ड फ़ार्मासिस्ट इसे जाँचते हैं' },
    mr: { title: 'फार्मासिस्ट तपासतात', text: 'नोंदणीकृत फार्मासिस्ट ते तपासतात' },
  },
  {
    title: 'Delivered', text: 'To your door. Share the OTP with the rider', color: 'var(--terracotta-deep)',
    hi: { title: 'पहुँच गया', text: 'आपके दरवाज़े तक। राइडर को OTP बताएँ' },
    mr: { title: 'पोहोचले', text: 'तुमच्या दारापर्यंत. रायडरला OTP सांगा' },
  },
];

// Section heading: small eyebrow, H2, optional lead paragraph and an optional link on the right.
export function SectionHead({ eyebrow, title, lead, action }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action && <div className="section-head-action">{action}</div>}
    </div>
  );
}

// Trust elements (guidelines p.11). `bare` renders just the list, for use inside another section.
export function TrustStrip({ bare = false }) {
  const tr = useT(T);
  const items = [
    { icon: 'users', title: tr('happy', { n: SITE.happyPatients }), text: tr('happyText') },
    { icon: 'userCheck', title: tr('nurses'), text: tr('nursesText') },
    { icon: 'verified', title: tr('pharmacies'), text: tr('pharmaciesText') },
    { icon: 'lock', title: tr('payments'), text: tr('paymentsText') },
    { icon: 'shield', title: tr('privacy'), text: tr('privacyText') },
    { icon: 'support', title: tr('support'), text: tr('supportText', { phone: SITE.phone }) },
  ];
  const list = (
    <ul className={bare ? 'trust-list' : 'container trust-grid'}>
      {items.map((i) => (
        <li key={i.icon} className="trust-item">
          <span className="trust-icon"><Icon name={i.icon} size={24} /></span>
          <div>
            <strong>{i.title}</strong>
            <span>{i.text}</span>
          </div>
        </li>
      ))}
    </ul>
  );
  if (bare) return list;
  return (
    <section className="trust-strip" aria-label={tr('trustAria')}>
      {list}
    </section>
  );
}

export function AppQR({ title, text }) {
  const tr = useT(T);
  return (
    <div className="app-qr card">
      <div className="qr-box">
        <QRCodeSVG value={SITE.appUrl} size={148} fgColor="#114D4A" bgColor="#FFFFFF" level="M" title={tr('qrTitle')} />
      </div>
      <div>
        <h3>{title || tr('openInApp')}</h3>
        <p>{text || tr('qrText')}</p>
        <a className="btn btn-urgent show-mobile-inline" href={SITE.appUrl}>
          <Icon name="phoneApp" /> {tr('openApp')}
        </a>
        <p className="small">{tr('noPhone')} <a href={SITE.phoneHref}>{SITE.phone}</a> {tr('noPhoneEnd')}</p>
      </div>
    </div>
  );
}

export function FaqList({ items }) {
  const loc = useLoc();
  return (
    <div className="faq">
      {items.map((item, i) => {
        const f = loc(item);
        return (
          <details key={item.q || i} className="faq-item">
            <summary>{f.q}<Icon name="plus" className="faq-icon" /></summary>
            <p>{f.a}</p>
          </details>
        );
      })}
    </div>
  );
}

export function ServiceCard({ service }) {
  const tr = useT(T);
  const loc = useLoc();
  const s = loc(service);
  return (
    <article className="service-card" style={{ '--edge': service.edge }}>
      <div className="service-media">
        {service.image && <img src={service.image} alt="" loading="lazy" width="800" height="533" />}
        <span className="service-icon"><Icon name={service.icon} size={26} /></span>
      </div>
      <div className="service-body">
        <h3>{s.name}</h3>
        <p>{s.short}</p>
        <Link to={`/care/${service.id}`} className="btn btn-urgent">
          {tr('bookNow')} <Icon name="arrow" size={18} />
        </Link>
      </div>
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
  const tr = useT(T);
  return (
    <aside className="help-box">
      <h3>{tr('needHelp')}</h3>
      <p>{tr('helpText')}</p>
      <div className="btn-row">
        <a className="btn btn-outline" href={SITE.phoneHref}><Icon name="phone" /> {tr('call', { phone: SITE.phone })}</a>
        <a className="btn btn-outline" href={SITE.whatsappHref} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> {tr('whatsapp')}</a>
      </div>
    </aside>
  );
}
