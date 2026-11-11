import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useLang, useLoc, useT } from '../context/LangContext.jsx';
import { SITE } from '../config/site.js';
import { categories } from '../data/products.js';
import { services } from '../data/services.js';
import { subscriptionPlans, faqs } from '../data/content.js';
import { FaqList, ServiceCard, Steps, TrustStrip, rxSteps, InfoBand } from '../components/ui.jsx';

const T = {
  en: {
    heroArt: 'Illustration of a home with medicines and care',
    eyebrow: 'Way2Cure Marketplace · Mumbai, Navi Mumbai & Thane',
    app: '(app)',
    callBefore: 'Prefer to talk? Call',
    callAfter: ', any time.',
    nurseText: 'Qualified nurses at home, day or night',
    needToday: 'What do you need today?',
    rxTitle: 'How prescription orders work',
    rxLead: 'Four simple steps. A registered pharmacist checks every prescription before we pack it.',
    aiDecides: 'AI assists, pharmacist decides.',
    aiText: 'If anything on the prescription is unclear, the pharmacist will call you.',
    seeHow: 'See how it works',
    careTitle: 'Care at home',
    careLead: 'Trained, background-checked nurses and doctors, sent to your home.',
    careNote: 'Specialised care: suitability is assessed by the treating doctor before care begins.',
    allCare: 'See all care services',
    subTitle: 'Never run out. Subscribe to regular care.',
    subLead: 'We schedule it, deliver or visit, and remind you before each order. Pause or change anytime.',
    families: 'Families we care for',
    stories: 'Real stories from families will appear here, shared with their written permission.',
    shareStory: 'Have a story to share? Tell us on WhatsApp.',
    questions: 'Common questions',
    allQuestions: 'All questions',
  },
  hi: {
    heroArt: 'दवाइयों और देखभाल के साथ एक घर का चित्र',
    eyebrow: 'Way2Cure मार्केटप्लेस · मुंबई, नवी मुंबई और ठाणे',
    app: '(ऐप)',
    callBefore: 'बात करना चाहते हैं? कभी भी',
    callAfter: ' पर कॉल करें।',
    nurseText: 'घर पर योग्य नर्स, दिन हो या रात',
    needToday: 'आज आपको क्या चाहिए?',
    rxTitle: 'पर्चे वाले ऑर्डर कैसे काम करते हैं',
    rxLead: 'चार आसान कदम। पैक करने से पहले हर पर्चे को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    aiDecides: 'AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।',
    aiText: 'अगर पर्चे में कुछ भी साफ़ न हो, तो फ़ार्मासिस्ट आपको कॉल करेंगे।',
    seeHow: 'देखें यह कैसे काम करता है',
    careTitle: 'घर पर देखभाल',
    careLead: 'प्रशिक्षित और जाँचे-परखे नर्स और डॉक्टर, आपके घर पर।',
    careNote: 'खास देखभाल: देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।',
    allCare: 'सभी देखभाल सेवाएँ देखें',
    subTitle: 'कभी कमी न हो। नियमित देखभाल का सब्सक्रिप्शन लें।',
    subLead: 'हम समय तय करते हैं, डिलिवरी या विज़िट करते हैं, और हर ऑर्डर से पहले आपको याद दिलाते हैं। जब चाहें रोकें या बदलें।',
    families: 'जिन परिवारों की हम देखभाल करते हैं',
    stories: 'परिवारों की सच्ची कहानियाँ यहाँ आएँगी, उनकी लिखित अनुमति के साथ।',
    shareStory: 'आपके पास कोई कहानी है? हमें व्हाट्सऐप पर बताएँ।',
    questions: 'आम सवाल',
    allQuestions: 'सभी सवाल',
  },
  mr: {
    heroArt: 'औषधे आणि काळजीसह एका घराचे चित्र',
    eyebrow: 'Way2Cure मार्केटप्लेस · मुंबई, नवी मुंबई आणि ठाणे',
    app: '(ॲप)',
    callBefore: 'बोलायचे आहे? कधीही',
    callAfter: ' वर कॉल करा.',
    nurseText: 'घरी पात्र नर्स, दिवस असो वा रात्र',
    needToday: 'आज तुम्हाला काय हवे आहे?',
    rxTitle: 'प्रिस्क्रिप्शन ऑर्डर कशी होते',
    rxLead: 'चार सोप्या पायऱ्या. पॅक करण्यापूर्वी प्रत्येक प्रिस्क्रिप्शन नोंदणीकृत फार्मासिस्ट तपासतात.',
    aiDecides: 'AI मदत करते, निर्णय फार्मासिस्ट घेतात.',
    aiText: 'प्रिस्क्रिप्शनमध्ये काही स्पष्ट नसल्यास, फार्मासिस्ट तुम्हाला कॉल करतील.',
    seeHow: 'हे कसे होते ते पाहा',
    careTitle: 'घरी काळजी',
    careLead: 'प्रशिक्षित, पार्श्वभूमी तपासलेल्या नर्स आणि डॉक्टर, तुमच्या घरी.',
    careNote: 'विशेष काळजी: काळजी सुरू होण्यापूर्वी, उपचार करणारे डॉक्टर ती रुग्णासाठी योग्य आहे का ते ठरवतात.',
    allCare: 'सर्व काळजी सेवा पाहा',
    subTitle: 'औषधे कधीही संपू देऊ नका. नियमित काळजीची सदस्यता घ्या.',
    subLead: 'आम्ही वेळ ठरवतो, डिलिव्हरी किंवा भेट देतो, आणि प्रत्येक ऑर्डरपूर्वी तुम्हाला आठवण करून देतो. कधीही थांबवा किंवा बदला.',
    families: 'आम्ही काळजी घेत असलेली कुटुंबे',
    stories: 'कुटुंबांच्या खऱ्या गोष्टी इथे दिसतील, त्यांच्या लेखी परवानगीने.',
    shareStory: 'तुमच्याकडे सांगण्यासारखी गोष्ट आहे? आम्हाला व्हॉट्सॲपवर सांगा.',
    questions: 'नेहमीचे प्रश्न',
    allQuestions: 'सर्व प्रश्न',
  },
};

function HeroArt({ label }) {
  // Brand illustration (circles, home, pill, sachet). Replace or pair with real photos of
  // caregivers and families in Indian homes once photo consent is in place.
  return (
    <svg className="hero-art" viewBox="0 0 420 360" role="img" aria-label={label}>
      <circle cx="300" cy="110" r="96" fill="#EAB34B" />
      <circle cx="120" cy="250" r="62" fill="#E07B5F" />
      <circle cx="350" cy="280" r="54" fill="#70A9A1" />
      <path d="M150 190 L230 120 L310 190 V300 H150 Z" fill="#F6F1E9" />
      <path d="M140 196 L230 116 L320 196" fill="none" stroke="#F6F1E9" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="208" y="236" width="44" height="64" rx="6" fill="#114D4A" />
      <rect x="170" y="210" width="28" height="28" rx="4" fill="#C8D8D5" />
      <rect x="262" y="210" width="28" height="28" rx="4" fill="#C8D8D5" />
      <g transform="rotate(-30 70 110)">
        <rect x="30" y="92" width="84" height="36" rx="18" fill="#FFFFFF" />
        <path d="M72 92 h24 a18 18 0 0 1 0 36 h-24 z" fill="#E07B5F" />
      </g>
      <g>
        <rect x="330" y="186" width="70" height="56" rx="8" fill="#FFFFFF" />
        <rect x="330" y="186" width="70" height="14" rx="6" fill="#EAB34B" />
        <circle cx="350" cy="222" r="7" fill="#E07B5F" />
        <circle cx="370" cy="222" r="7" fill="#114D4A" />
        <circle cx="390" cy="222" r="5" fill="#70A9A1" />
      </g>
    </svg>
  );
}

export default function Home() {
  const { t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const quickPaths = [
    ...categories.filter((c) => c.slug !== 'safety').map(loc).map((c) => ({ to: `/shop/${c.slug}`, icon: c.icon, title: c.name, text: c.blurb, edge: c.edge })),
    { to: '/care/nurse', icon: 'stethoscope', title: t('bookNurse'), text: tr('nurseText'), edge: 'var(--terracotta-deep)' },
  ];
  const homeServices = ['nurse', 'doctor', 'icu', 'stroke'].map((id) => services.find((s) => s.id === id));

  return (
    <>
      {/* 2 · Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">{tr('eyebrow')}</p>
            <h1>{t('heroTitle')}</h1>
            <p className="hero-text">{t('heroText')}</p>
            <div className="btn-row">
              <Link to="/shop/medicines" className="btn btn-light">
                <Icon name="pill" /> {t('orderMedicines')}
              </Link>
              <Link to="/prescription" className="btn btn-urgent">
                <Icon name="rx" /> {t('uploadRx')} <span className="btn-note">{tr('app')}</span>
              </Link>
            </div>
            <p className="hero-call">
              {tr('callBefore')} <a href={SITE.phoneHref}>{SITE.phone}</a>{tr('callAfter')}
            </p>
          </div>
          <HeroArt label={tr('heroArt')} />
        </div>
      </section>

      {/* 3 · Quick paths */}
      <section className="section">
        <div className="container">
          <h2>{tr('needToday')}</h2>
          <div className="grid grid-tiles">
            {quickPaths.map((p) => (
              <Link key={p.to} to={p.to} className="card card-edge-left tile" style={{ '--edge': p.edge }}>
                <span className="tile-icon"><Icon name={p.icon} size={32} /></span>
                <span className="tile-text">
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </span>
                <Icon name="chevron" className="tile-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · How prescriptions work */}
      <section className="section section-white">
        <div className="container">
          <h2>{tr('rxTitle')}</h2>
          <p className="lead">{tr('rxLead')}</p>
          <Steps steps={rxSteps} />
          <InfoBand icon="sparkles">
            <strong>{tr('aiDecides')}</strong> {tr('aiText')}
          </InfoBand>
          <div className="btn-row center-mobile">
            <Link to="/prescription" className="btn btn-primary">{tr('seeHow')}</Link>
          </div>
        </div>
      </section>

      {/* 5 · Care at home */}
      <section className="section">
        <div className="container">
          <h2>{tr('careTitle')}</h2>
          <p className="lead">{tr('careLead')}</p>
          <div className="grid grid-4">
            {homeServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <p className="small muted">{tr('careNote')}</p>
          <Link to="/care" className="text-link">{tr('allCare')} <Icon name="arrow" size={18} /></Link>
        </div>
      </section>

      {/* 6 · Subscribe & save */}
      <section className="section section-mint">
        <div className="container">
          <h2>{tr('subTitle')}</h2>
          <p className="lead">{tr('subLead')}</p>
          <div className="grid grid-4">
            {subscriptionPlans.map(loc).map((p) => (
              <Link key={p.id} to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'} className="card card-edge-top plan-mini" style={{ '--edge': p.edge }}>
                <Icon name={p.icon} size={28} />
                <h3>{p.name}</h3>
                <p>{p.often}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Trust strip */}
      <TrustStrip />

      {/* 8 · Reviews & FAQ */}
      <section className="section">
        <div className="container two-col">
          <div>
            <h2>{tr('families')}</h2>
            <div className="card story-placeholder">
              <Icon name="users" size={32} />
              <p>{tr('stories')}</p>
              <p className="small muted">{tr('shareStory')}</p>
            </div>
          </div>
          <div>
            <h2>{tr('questions')}</h2>
            <FaqList items={faqs.slice(0, 5)} />
            <Link to="/help" className="text-link">{tr('allQuestions')} <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
