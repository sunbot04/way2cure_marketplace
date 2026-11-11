import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useLang, useLoc, useT } from '../context/LangContext.jsx';
import { SITE } from '../config/site.js';
import { categories } from '../data/products.js';
import { services } from '../data/services.js';
import { subscriptionPlans, faqs } from '../data/content.js';
import { FaqList, SectionHead, ServiceCard, Steps, TrustStrip, rxSteps, InfoBand } from '../components/ui.jsx';

// Homepage, following the blueprint in the brand guidelines (p.9):
// header · hero · quick paths · how prescriptions work · care at home · subscribe & save ·
// trust · reviews & FAQ · footer.
const T = {
  en: {
    heroAlt: 'A Way2Cure nurse caring for an elderly man at home',
    eyebrow: 'Mumbai, Navi Mumbai & Thane',
    app: '(app)',
    callBefore: 'Prefer to talk? Call',
    callAfter: ', any time.',
    point1: 'Pharmacist-verified orders',
    point2: 'Background-checked nurses',
    point3: 'Same-city delivery, OTP handover',
    badgePatients: 'happy patients',
    badgeNurses: 'Verified nurses',
    badgeNursesText: 'Trained & background-checked',
    nurseText: 'Qualified nurses at home, day or night',
    pathsEyebrow: 'Shop by need',
    needToday: 'What do you need today?',
    pathsLead: 'Medicines, devices and daily care, delivered to your door. Or a nurse at home, the same day.',
    rxEyebrow: 'Prescriptions',
    rxTitle: 'How prescription orders work',
    rxLead: 'Four simple steps. A registered pharmacist checks every prescription before we pack it.',
    aiDecides: 'AI assists, pharmacist decides.',
    aiText: 'If anything on the prescription is unclear, the pharmacist will call you.',
    seeHow: 'See how it works',
    aiPicks: 'What the AI picks out',
    illustrative: 'Example',
    twiceDaily: 'Twice daily · 30 days',
    onceDaily: 'Once daily · 30 days',
    onceWeekly: 'Once weekly · 8 weeks',
    chipConfirm: 'You confirm the list',
    chipVerify: 'Pharmacist verifies',
    chipCall: 'Unclear? We call you',
    careEyebrow: 'Care services',
    careTitle: 'Care at home',
    careLead: 'Trained, background-checked nurses and doctors, sent to your home.',
    careNote: 'Specialised care: suitability is assessed by the treating doctor before care begins.',
    allCare: 'See all care services',
    subEyebrow: 'Subscribe & save',
    subTitle: 'Never run out. Subscribe to regular care.',
    subLead: 'We schedule it, deliver or visit, and remind you before each order. Pause or change anytime.',
    seePlans: 'See plans',
    trustEyebrow: 'Why Way2Cure',
    trustTitle: 'Care your family can trust',
    trustLead: 'Way2Cure began as home healthcare in Mumbai. Every nurse, pharmacy and seller on the marketplace meets the same standard.',
    families: 'Families we care for',
    familiesEyebrow: 'Stories',
    stories: 'Real stories from families will appear here, shared with their written permission.',
    shareStory: 'Have a story to share? Tell us on WhatsApp.',
    questions: 'Common questions',
    allQuestions: 'All questions',
    ctaTitle: 'Not sure what you need?',
    ctaText: 'Talk to a care advisor. We can place an order or book a nurse for you over the phone.',
    ctaWhatsApp: 'Chat on WhatsApp',
  },
  hi: {
    heroAlt: 'घर पर एक बुज़ुर्ग की देखभाल करती Way2Cure नर्स',
    eyebrow: 'मुंबई, नवी मुंबई और ठाणे',
    app: '(ऐप)',
    callBefore: 'बात करना चाहते हैं? कभी भी',
    callAfter: ' पर कॉल करें।',
    point1: 'फ़ार्मासिस्ट द्वारा जाँचे गए ऑर्डर',
    point2: 'जाँचे-परखे नर्स',
    point3: 'शहर के अंदर डिलिवरी, OTP से',
    badgePatients: 'संतुष्ट मरीज़',
    badgeNurses: 'सत्यापित नर्स',
    badgeNursesText: 'प्रशिक्षित और जाँचे-परखे',
    nurseText: 'घर पर योग्य नर्स, दिन हो या रात',
    pathsEyebrow: 'ज़रूरत के अनुसार ख़रीदें',
    needToday: 'आज आपको क्या चाहिए?',
    pathsLead: 'दवाइयाँ, उपकरण और रोज़ की देखभाल का सामान, आपके दरवाज़े तक। या उसी दिन घर पर नर्स।',
    rxEyebrow: 'पर्चे',
    rxTitle: 'पर्चे वाले ऑर्डर कैसे काम करते हैं',
    rxLead: 'चार आसान कदम। पैक करने से पहले हर पर्चे को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    aiDecides: 'AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।',
    aiText: 'अगर पर्चे में कुछ भी साफ़ न हो, तो फ़ार्मासिस्ट आपको कॉल करेंगे।',
    seeHow: 'देखें यह कैसे काम करता है',
    aiPicks: 'AI ने पर्चे से क्या पढ़ा',
    illustrative: 'उदाहरण',
    twiceDaily: 'दिन में दो बार · 30 दिन',
    onceDaily: 'दिन में एक बार · 30 दिन',
    onceWeekly: 'हफ़्ते में एक बार · 8 हफ़्ते',
    chipConfirm: 'आप लिस्ट कन्फ़र्म करते हैं',
    chipVerify: 'फ़ार्मासिस्ट जाँचते हैं',
    chipCall: 'कुछ साफ़ नहीं? हम कॉल करेंगे',
    careEyebrow: 'देखभाल सेवाएँ',
    careTitle: 'घर पर देखभाल',
    careLead: 'प्रशिक्षित और जाँचे-परखे नर्स और डॉक्टर, आपके घर पर।',
    careNote: 'खास देखभाल: देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।',
    allCare: 'सभी देखभाल सेवाएँ देखें',
    subEyebrow: 'सब्सक्राइब करें और बचाएँ',
    subTitle: 'कभी कमी न हो। नियमित देखभाल का सब्सक्रिप्शन लें।',
    subLead: 'हम समय तय करते हैं, डिलिवरी या विज़िट करते हैं, और हर ऑर्डर से पहले आपको याद दिलाते हैं। जब चाहें रोकें या बदलें।',
    seePlans: 'प्लान देखें',
    trustEyebrow: 'Way2Cure क्यों',
    trustTitle: 'ऐसी देखभाल, जिस पर आपका परिवार भरोसा कर सके',
    trustLead: 'Way2Cure की शुरुआत मुंबई में घर पर देखभाल से हुई। मार्केटप्लेस पर हर नर्स, फ़ार्मेसी और विक्रेता एक ही मानक पर खरे उतरते हैं।',
    families: 'जिन परिवारों की हम देखभाल करते हैं',
    familiesEyebrow: 'कहानियाँ',
    stories: 'परिवारों की सच्ची कहानियाँ यहाँ आएँगी, उनकी लिखित अनुमति के साथ।',
    shareStory: 'आपके पास कोई कहानी है? हमें व्हाट्सऐप पर बताएँ।',
    questions: 'आम सवाल',
    allQuestions: 'सभी सवाल',
    ctaTitle: 'समझ नहीं आ रहा कि क्या चाहिए?',
    ctaText: 'हमारे केयर सलाहकार से बात करें। हम फ़ोन पर ही आपके लिए ऑर्डर दे सकते हैं या नर्स बुक कर सकते हैं।',
    ctaWhatsApp: 'व्हाट्सऐप पर बात करें',
  },
  mr: {
    heroAlt: 'घरी एका ज्येष्ठ व्यक्तीची काळजी घेणारी Way2Cure नर्स',
    eyebrow: 'मुंबई, नवी मुंबई आणि ठाणे',
    app: '(ॲप)',
    callBefore: 'बोलायचे आहे? कधीही',
    callAfter: ' वर कॉल करा.',
    point1: 'फार्मासिस्टने तपासलेल्या ऑर्डर',
    point2: 'पार्श्वभूमी तपासलेल्या नर्स',
    point3: 'शहरातच डिलिव्हरी, OTP सह',
    badgePatients: 'समाधानी रुग्ण',
    badgeNurses: 'पडताळलेल्या नर्स',
    badgeNursesText: 'प्रशिक्षित आणि पार्श्वभूमी तपासलेल्या',
    nurseText: 'घरी पात्र नर्स, दिवस असो वा रात्र',
    pathsEyebrow: 'गरजेनुसार खरेदी करा',
    needToday: 'आज तुम्हाला काय हवे आहे?',
    pathsLead: 'औषधे, उपकरणे आणि दैनंदिन काळजीच्या वस्तू, तुमच्या दारात. किंवा त्याच दिवशी घरी नर्स.',
    rxEyebrow: 'प्रिस्क्रिप्शन',
    rxTitle: 'प्रिस्क्रिप्शन ऑर्डर कशी होते',
    rxLead: 'चार सोप्या पायऱ्या. पॅक करण्यापूर्वी प्रत्येक प्रिस्क्रिप्शन नोंदणीकृत फार्मासिस्ट तपासतात.',
    aiDecides: 'AI मदत करते, निर्णय फार्मासिस्ट घेतात.',
    aiText: 'प्रिस्क्रिप्शनमध्ये काही स्पष्ट नसल्यास, फार्मासिस्ट तुम्हाला कॉल करतील.',
    seeHow: 'हे कसे होते ते पाहा',
    aiPicks: 'AI ने प्रिस्क्रिप्शनमधून काय वाचले',
    illustrative: 'उदाहरण',
    twiceDaily: 'दिवसातून दोनदा · 30 दिवस',
    onceDaily: 'दिवसातून एकदा · 30 दिवस',
    onceWeekly: 'आठवड्यातून एकदा · 8 आठवडे',
    chipConfirm: 'तुम्ही यादी निश्चित करता',
    chipVerify: 'फार्मासिस्ट तपासतात',
    chipCall: 'काही स्पष्ट नाही? आम्ही कॉल करू',
    careEyebrow: 'काळजी सेवा',
    careTitle: 'घरी काळजी',
    careLead: 'प्रशिक्षित, पार्श्वभूमी तपासलेल्या नर्स आणि डॉक्टर, तुमच्या घरी.',
    careNote: 'विशेष काळजी: काळजी सुरू होण्यापूर्वी, उपचार करणारे डॉक्टर ती रुग्णासाठी योग्य आहे का ते ठरवतात.',
    allCare: 'सर्व काळजी सेवा पाहा',
    subEyebrow: 'सदस्यता घ्या आणि बचत करा',
    subTitle: 'औषधे कधीही संपू देऊ नका. नियमित काळजीची सदस्यता घ्या.',
    subLead: 'आम्ही वेळ ठरवतो, डिलिव्हरी किंवा भेट देतो, आणि प्रत्येक ऑर्डरपूर्वी तुम्हाला आठवण करून देतो. कधीही थांबवा किंवा बदला.',
    seePlans: 'प्लॅन पाहा',
    trustEyebrow: 'Way2Cure का',
    trustTitle: 'तुमचे कुटुंब विश्वास ठेवू शकेल अशी काळजी',
    trustLead: 'Way2Cure ची सुरुवात मुंबईत घरी काळजी सेवेपासून झाली. मार्केटप्लेसवरील प्रत्येक नर्स, फार्मसी आणि विक्रेता त्याच दर्जाचे पालन करतात.',
    families: 'आम्ही काळजी घेत असलेली कुटुंबे',
    familiesEyebrow: 'अनुभव',
    stories: 'कुटुंबांच्या खऱ्या गोष्टी इथे दिसतील, त्यांच्या लेखी परवानगीने.',
    shareStory: 'तुमच्याकडे सांगण्यासारखी गोष्ट आहे? आम्हाला व्हॉट्सॲपवर सांगा.',
    questions: 'नेहमीचे प्रश्न',
    allQuestions: 'सर्व प्रश्न',
    ctaTitle: 'काय हवे आहे ते नक्की नाही?',
    ctaText: 'आमच्या केअर सल्लागारांशी बोला. आम्ही फोनवरच तुमच्यासाठी ऑर्डर देऊ शकतो किंवा नर्स बुक करू शकतो.',
    ctaWhatsApp: 'व्हॉट्सॲपवर बोला',
  },
};

export default function Home() {
  const { t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const quickPaths = [
    ...categories.filter((c) => c.slug !== 'safety').map(loc).map((c) => ({ to: `/shop/${c.slug}`, icon: c.icon, title: c.name, text: c.blurb, edge: c.edge })),
    { to: '/care/nurse', icon: 'stethoscope', title: t('bookNurse'), text: tr('nurseText'), edge: 'var(--terracotta-deep)' },
  ];
  const homeServices = ['nurse', 'doctor', 'icu', 'stroke'].map((id) => services.find((s) => s.id === id));
  const aiList = [
    { name: 'Metformin 500 mg', dose: tr('twiceDaily') },
    { name: 'Amlodipine 5 mg', dose: tr('onceDaily') },
    { name: 'Vitamin D3', dose: tr('onceWeekly') },
  ];

  return (
    <>
      {/* 2 · Hero: phone number and Upload Rx are visible without scrolling */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow"><Icon name="pin" size={18} /> {tr('eyebrow')}</p>
            <h1>{t('heroTitle')}</h1>
            <p className="hero-text">{t('heroText')}</p>
            <div className="btn-row">
              <Link to="/shop/medicines" className="btn btn-light btn-lg">
                <Icon name="pill" /> {t('orderMedicines')}
              </Link>
              <Link to="/prescription" className="btn btn-urgent btn-lg">
                <Icon name="rx" /> {t('uploadRx')} <span className="btn-note">{tr('app')}</span>
              </Link>
            </div>
            <ul className="hero-points">
              {['point1', 'point2', 'point3'].map((k) => (
                <li key={k}><Icon name="check" size={18} /> {tr(k)}</li>
              ))}
            </ul>
            <p className="hero-call">
              {tr('callBefore')} <a href={SITE.phoneHref}>{SITE.phone}</a>{tr('callAfter')}
            </p>
          </div>

          <div className="hero-visual">
            <span className="hero-shape hero-shape-1" aria-hidden="true" />
            <span className="hero-shape hero-shape-2" aria-hidden="true" />
            <span className="hero-shape hero-shape-3" aria-hidden="true" />
            <img
              className="hero-photo"
              src="/images/hero-care.webp"
              alt={tr('heroAlt')}
              width="1400"
              height="933"
              fetchpriority="high"
            />
            <div className="hero-badge hero-badge-a">
              <span className="hero-badge-icon"><Icon name="users" size={22} /></span>
              <span><strong>{SITE.happyPatients}</strong> {tr('badgePatients')}</span>
            </div>
            <div className="hero-badge hero-badge-b">
              <span className="hero-badge-icon"><Icon name="userCheck" size={22} /></span>
              <span><strong>{tr('badgeNurses')}</strong> {tr('badgeNursesText')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Quick paths */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow={tr('pathsEyebrow')} title={tr('needToday')} lead={tr('pathsLead')} />
          <div className="grid path-grid">
            {quickPaths.map((p) => (
              <Link key={p.to} to={p.to} className="path-card" style={{ '--edge': p.edge }}>
                <span className="path-icon"><Icon name={p.icon} size={30} /></span>
                <span className="path-text">
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </span>
                <span className="path-arrow"><Icon name="arrow" size={20} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · How prescriptions work */}
      <section className="section section-white">
        <div className="container split">
          <div>
            <SectionHead eyebrow={tr('rxEyebrow')} title={tr('rxTitle')} lead={tr('rxLead')} />
            <div className="steps-vertical"><Steps steps={rxSteps} /></div>
            <Link to="/prescription" className="btn btn-primary">{tr('seeHow')} <Icon name="arrow" size={18} /></Link>
          </div>
          <div className="rx-demo" aria-label={tr('aiPicks')}>
            <div className="rx-demo-card">
              <div className="rx-demo-head">
                <strong>{tr('aiPicks')}</strong>
                <span>{tr('illustrative')}</span>
              </div>
              <ul>
                {aiList.map((m) => (
                  <li key={m.name}><strong>{m.name}</strong><span>{m.dose}</span></li>
                ))}
              </ul>
              <div className="rx-demo-chips">
                <span><Icon name="check" size={16} /> {tr('chipConfirm')}</span>
                <span><Icon name="verified" size={16} /> {tr('chipVerify')}</span>
                <span><Icon name="phone" size={16} /> {tr('chipCall')}</span>
              </div>
            </div>
            <InfoBand icon="sparkles">
              <strong>{tr('aiDecides')}</strong> {tr('aiText')}
            </InfoBand>
          </div>
        </div>
      </section>

      {/* 5 · Care at home */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={tr('careEyebrow')}
            title={tr('careTitle')}
            lead={tr('careLead')}
            action={<Link to="/care" className="text-link">{tr('allCare')} <Icon name="arrow" size={18} /></Link>}
          />
          <div className="grid grid-4 service-grid">
            {homeServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <p className="small muted note-below">{tr('careNote')}</p>
        </div>
      </section>

      {/* 6 · Subscribe & save */}
      <section className="section section-mint">
        <div className="container">
          <SectionHead eyebrow={tr('subEyebrow')} title={tr('subTitle')} lead={tr('subLead')} />
          <div className="grid grid-4">
            {subscriptionPlans.map(loc).map((p) => (
              <Link key={p.id} to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'} className="plan-tile" style={{ '--edge': p.edge }}>
                <span className="plan-tile-icon"><Icon name={p.icon} size={26} /></span>
                <h3>{p.name}</h3>
                <p className="plan-tile-often">{p.often}</p>
                <ul>
                  {p.points.slice(0, 2).map((pt) => <li key={pt}><Icon name="check" size={16} /> {pt}</li>)}
                </ul>
                <span className="plan-tile-more">{tr('seePlans')} <Icon name="arrow" size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Trust */}
      <section className="section section-white">
        <div className="container split split-media">
          <div className="trust-media">
            <span className="trust-media-shape" aria-hidden="true" />
            <img src="/images/team-group.webp" alt="" loading="lazy" width="1200" height="800" />
          </div>
          <div>
            <SectionHead eyebrow={tr('trustEyebrow')} title={tr('trustTitle')} lead={tr('trustLead')} />
            <TrustStrip bare />
          </div>
        </div>
      </section>

      {/* 8 · Reviews & FAQ */}
      <section className="section">
        <div className="container two-col">
          <div>
            <SectionHead eyebrow={tr('familiesEyebrow')} title={tr('families')} />
            <figure className="story-card">
              <span className="story-quote" aria-hidden="true">“</span>
              <p>{tr('stories')}</p>
              <figcaption>
                <a href={SITE.whatsappHref} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> {tr('shareStory')}</a>
              </figcaption>
            </figure>
          </div>
          <div>
            <SectionHead eyebrow="FAQ" title={tr('questions')} />
            <FaqList items={faqs.slice(0, 5)} />
            <Link to="/help" className="text-link">{tr('allQuestions')} <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      {/* Help at hand: call and WhatsApp before the footer */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>{tr('ctaTitle')}</h2>
            <p>{tr('ctaText')}</p>
          </div>
          <div className="btn-row">
            <a href={SITE.phoneHref} className="btn btn-light btn-lg"><Icon name="phone" /> {SITE.phoneDisplay}</a>
            <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg"><Icon name="whatsapp" /> {tr('ctaWhatsApp')}</a>
          </div>
        </div>
      </section>
    </>
  );
}
