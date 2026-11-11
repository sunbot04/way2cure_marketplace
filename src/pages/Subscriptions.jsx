import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { subscriptionPlans } from '../data';
import { InfoBand, PageHead, HelpBox } from '../components/legacy-ui';
import { formatDate, useLang, useLoc, useT } from '../i18n/LangContext';

// Example plans so families can see how "manage / pause" works. Real plans come from the account API.
const SAMPLE_PLANS = [
  {
    id: 'p1', what: 'BP & sugar medicines (3 items)', often: 'Every month', next: '2026-12-02', paused: false,
    hi: { what: 'बीपी और शुगर की दवाइयाँ (3 चीज़ें)', often: 'हर महीने' },
    mr: { what: 'बीपी आणि शुगरची औषधे (3 वस्तू)', often: 'दर महिन्याला' },
  },
  {
    id: 'p2', what: 'Adult diapers, medium × 3 packs', often: 'Every 2 weeks', next: '2026-11-20', paused: false,
    hi: { what: 'बड़ों के डायपर, मीडियम × 3 पैक', often: 'हर 2 हफ़्ते' },
    mr: { what: 'प्रौढांसाठी डायपर, मीडियम × 3 पॅक', often: 'दर 2 आठवड्यांनी' },
  },
];

const T = {
  en: {
    eyebrow: 'Subscriptions',
    title: 'Regular care, on schedule',
    intro: 'Subscribe once. We schedule each delivery or visit and remind you before every order. Pause or change anytime.',
    flowLabel: 'How subscriptions work',
    flow1: 'Subscribe', flow2: 'We schedule', flow3: 'Visit or delivery', flow4: 'Reminders & reports',
    howSachets: 'How sachets work',
    bookCheck: 'Book a home check',
    startPlan: 'Start a plan',
    freqNote: 'Frequencies are suggestions. You confirm the price before the first order.',
    manageTitle: 'Manage / pause plan',
    manageLead: 'Your plans. Example shown until you log in.',
    paused: 'Paused', active: 'Active',
    howOften: 'How often', nextOrder: 'Next order', onHold: 'On hold',
    reminder: 'We send a reminder 2 days before each order.',
    pause: 'Pause plan', resume: 'Resume plan', change: 'Change plan',
    info: 'Nothing is charged while a plan is paused. You can cancel anytime, with no fee.',
  },
  hi: {
    eyebrow: 'सब्सक्रिप्शन',
    title: 'नियमित देखभाल, तय समय पर',
    intro: 'एक बार सब्सक्राइब करें। हम हर डिलीवरी या विज़िट का समय तय करते हैं और हर ऑर्डर से पहले आपको याद दिलाते हैं। जब चाहें रोकें या बदलें।',
    flowLabel: 'सब्सक्रिप्शन कैसे काम करता है',
    flow1: 'सब्सक्राइब करें', flow2: 'हम समय तय करते हैं', flow3: 'विज़िट या डिलीवरी', flow4: 'रिमाइंडर और रिपोर्ट',
    howSachets: 'सैशे कैसे काम करते हैं',
    bookCheck: 'घर पर जाँच बुक करें',
    startPlan: 'प्लान शुरू करें',
    freqNote: 'कितनी बार, यह सिर्फ़ सुझाव है। पहले ऑर्डर से पहले आप कीमत पक्की करते हैं।',
    manageTitle: 'प्लान बदलें / रोकें',
    manageLead: 'आपके प्लान। लॉग इन करने तक उदाहरण दिखाया गया है।',
    paused: 'रुका हुआ', active: 'चालू',
    howOften: 'कितनी बार', nextOrder: 'अगला ऑर्डर', onHold: 'अभी रुका है',
    reminder: 'हर ऑर्डर से 2 दिन पहले हम आपको याद दिलाते हैं।',
    pause: 'प्लान रोकें', resume: 'प्लान फिर शुरू करें', change: 'प्लान बदलें',
    info: 'प्लान रुके रहने तक कोई पैसा नहीं लिया जाता। आप कभी भी, बिना किसी फ़ीस के, रद्द कर सकते हैं।',
  },
  mr: {
    eyebrow: 'सदस्यता',
    title: 'नियमित काळजी, ठरलेल्या वेळेवर',
    intro: 'एकदा सदस्यता घ्या. आम्ही प्रत्येक डिलिव्हरी किंवा भेटीची वेळ ठरवतो आणि प्रत्येक ऑर्डरआधी तुम्हाला आठवण करून देतो. कधीही थांबवा किंवा बदला.',
    flowLabel: 'सदस्यता कशी काम करते',
    flow1: 'सदस्यता घ्या', flow2: 'आम्ही वेळ ठरवतो', flow3: 'भेट किंवा डिलिव्हरी', flow4: 'आठवण आणि रिपोर्ट',
    howSachets: 'सॅशे कसे काम करतात',
    bookCheck: 'घरी तपासणी बुक करा',
    startPlan: 'प्लॅन सुरू करा',
    freqNote: 'किती वेळा, हे फक्त सुचवलेले आहे. पहिल्या ऑर्डरआधी तुम्ही किंमत निश्चित करता.',
    manageTitle: 'प्लॅन बदला / थांबवा',
    manageLead: 'तुमचे प्लॅन. लॉग इन करेपर्यंत उदाहरण दाखवले आहे.',
    paused: 'थांबवलेला', active: 'सुरू',
    howOften: 'किती वेळा', nextOrder: 'पुढील ऑर्डर', onHold: 'सध्या थांबवलेला',
    reminder: 'प्रत्येक ऑर्डरच्या 2 दिवस आधी आम्ही आठवण करून देतो.',
    pause: 'प्लॅन थांबवा', resume: 'प्लॅन पुन्हा सुरू करा', change: 'प्लॅन बदला',
    info: 'प्लॅन थांबवलेला असताना कोणतेही पैसे घेतले जात नाहीत. तुम्ही कधीही, कोणत्याही शुल्काशिवाय, रद्द करू शकता.',
  },
};

export default function Subscriptions() {
  const { lang } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const [plans, setPlans] = useState(SAMPLE_PLANS);
  const toggle = (id) => setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, paused: !p.paused } : p)));
  const nice = (d) => formatDate(d, lang, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>

      <section className="section-sm">
        <div className="container">
          <ol className="flow" aria-label={tr('flowLabel')}>
            {['flow1', 'flow2', 'flow3', 'flow4'].map((k, i) => (
              <li key={k}><span>{i + 1}</span> {tr(k)}</li>
            ))}
          </ol>
          <div className="grid grid-4">
            {subscriptionPlans.map((plan) => {
              const p = loc(plan);
              return (
                <article key={p.id} className="card card-edge-top plan-card" style={{ '--edge': p.edge }}>
                  <Icon name={p.icon} size={32} />
                  <h3>{p.name}</h3>
                  <p className="small muted">{p.often}</p>
                  <ul className="check-list">
                    {p.points.map((pt) => <li key={pt}><Icon name="check" size={18} /> {pt}</li>)}
                  </ul>
                  {p.id === 'sachets' ? (
                    <Link to="/subscriptions/dose-sachets" className="btn btn-outline btn-block">{tr('howSachets')}</Link>
                  ) : p.id === 'health-checks' ? (
                    <Link to="/care/nurse" className="btn btn-primary btn-block">{tr('bookCheck')}</Link>
                  ) : (
                    <Link to={p.id === 'diapers' ? '/product/adult-diapers-m' : '/shop/medicines'} className="btn btn-primary btn-block">{tr('startPlan')}</Link>
                  )}
                </article>
              );
            })}
          </div>
          <p className="small muted">{tr('freqNote')}</p>
        </div>
      </section>

      <section className="section section-white" id="manage">
        <div className="container">
          <h2>{tr('manageTitle')}</h2>
          <p className="lead">{tr('manageLead')}</p>
          <div className="grid grid-2">
            {plans.map((plan) => {
              const p = loc(plan);
              return (
                <article key={p.id} className={`card plan-manage${p.paused ? ' paused' : ''}`}>
                  <div className="plan-manage-head">
                    <h3>{p.what}</h3>
                    <span className={`tag ${p.paused ? 'tag-rent' : 'tag-pharm'}`}>{p.paused ? tr('paused') : tr('active')}</span>
                  </div>
                  <dl className="plan-facts">
                    <div><dt>{tr('howOften')}</dt><dd>{p.often}</dd></div>
                    <div><dt>{tr('nextOrder')}</dt><dd>{p.paused ? tr('onHold') : nice(p.next)}</dd></div>
                  </dl>
                  <p className="small"><Icon name="bell" size={16} /> {tr('reminder')}</p>
                  <div className="btn-row">
                    <button type="button" className="btn btn-outline" onClick={() => toggle(p.id)}>{p.paused ? tr('resume') : tr('pause')}</button>
                    <Link to="/contact" className="btn btn-outline">{tr('change')}</Link>
                  </div>
                </article>
              );
            })}
          </div>
          <InfoBand icon="info">{tr('info')}</InfoBand>
        </div>
      </section>

      <section className="section">
        <div className="container narrow"><HelpBox /></div>
      </section>
    </>
  );
}
