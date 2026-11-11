import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import InfoBand from '../components/ui/InfoBand';
import StepList, { type Step } from '../components/ui/StepList';
import FAQAccordion from '../components/ui/FAQAccordion';
import TrustStrip from '../components/trust/TrustStrip';
import Seo, { medicalBusinessLd } from '../components/layout/Seo';
import { useLang, useLoc, useT, type Dict } from '../i18n/LangContext';
import { SITE } from '../config/site';
import { categories, faqs, services, subscriptionPlans, testimonials } from '../data';
import { COPY } from '../components/copy';

// Homepage: the 9-section blueprint from guidelines p.9. Header (1) and footer (9) come from the layout.
// Layouts vary on purpose: text + photo, tiles, numbered steps, cards beside a photo, a plain list,
// a single band, and two columns.

export const RX_STEPS: Step[] = [
  { title: 'Upload', text: 'Snap your prescription in the Way2Cure app', colour: 'green',
    hi: { title: 'अपलोड', text: 'Way2Cure ऐप में पर्चे की फ़ोटो लें' }, mr: { title: 'अपलोड', text: 'Way2Cure ॲपमध्ये प्रिस्क्रिप्शनचा फोटो घ्या' } },
  { title: 'AI reads', text: 'The medicines are listed for you to check', colour: 'sage',
    hi: { title: 'AI पढ़ता है', text: 'दवाइयों की लिस्ट आपके जाँचने के लिए बनती है' }, mr: { title: 'AI वाचते', text: 'औषधांची यादी तुम्ही तपासण्यासाठी तयार होते' } },
  { title: 'Pharmacist verifies', text: 'A registered pharmacist checks every order', colour: 'mustard',
    hi: { title: 'फ़ार्मासिस्ट जाँचते हैं', text: 'हर ऑर्डर को रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं' }, mr: { title: 'फार्मासिस्ट तपासतात', text: 'प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात' } },
  { title: 'Delivered', text: 'To your door. Share the OTP with the rider', colour: 'terracotta-deep',
    hi: { title: 'डिलिवरी', text: 'आपके दरवाज़े तक। राइडर को OTP बताएँ' }, mr: { title: 'डिलिव्हरी', text: 'तुमच्या दारात. रायडरला OTP सांगा' } },
];

const T: Dict = {
  en: {
    seoTitle: 'Way2Cure | Care at home and everything seniors need, Mumbai',
    seoDesc: 'Nurses, doctors and ICU care at home, plus medicines, medical devices and daily care delivered in Mumbai, Navi Mumbai and Thane. Pharmacist-verified orders. Call 7400400908, 24/7.',
    heroAlt: 'A Way2Cure nurse with a senior at home',
    app: '(app)',
    heroTrust: '{n} happy patients · Pharmacist-verified orders · 24/7 support',
    callBefore: 'Prefer to talk? Call',
    callAfter: ', any time, day or night.',
    nurseText: 'Qualified nurses at home, day or night',
    needToday: 'What do you need today?',
    rxTitle: 'How prescription orders work',
    rxLead: 'Four steps. A registered pharmacist checks every prescription before we pack it.',
    aiDecides: 'AI assists, pharmacist decides.',
    aiText: 'If anything on the prescription is unclear, the pharmacist will call you before packing.',
    appOnly: 'Prescription upload is in the Way2Cure mobile app.',
    seeHow: 'See how it works',
    careTitle: 'Care at home',
    careLead: 'Trained, background-checked nurses and doctors, sent to your home.',
    careAlt: 'A Way2Cure nurse checking a senior\'s blood pressure at home',
    specialised: 'Specialised care',
    specialisedText: 'ICU, ventilator, stroke and cancer care, with one doctor-led care plan.',
    careNote: 'Suitability is assessed by the treating doctor before care begins.',
    allCare: 'See all care services',
    subTitle: 'Subscribe once. We remember for you.',
    subLead: 'We schedule each delivery or visit and remind you two days before. Pause or change anytime, with no fee.',
    seePlans: 'See plans',
    doseKey: 'Dose sachets are colour-coded by time of day:',
    families: 'Families we care for',
    storiesSoon: 'We will share real stories from families here, with their written permission.',
    shareStory: 'Have a story to share? Tell us on WhatsApp',
    questions: 'Common questions',
    allQuestions: 'All questions',
  },
  hi: {
    seoTitle: 'Way2Cure | घर पर देखभाल और बुज़ुर्गों की हर ज़रूरत, मुंबई',
    seoDesc: 'घर पर नर्स, डॉक्टर और आईसीयू देखभाल, साथ ही मुंबई, नवी मुंबई और ठाणे में दवाइयाँ, मेडिकल उपकरण और रोज़ की देखभाल का सामान। फ़ार्मासिस्ट द्वारा जाँचे गए ऑर्डर। 24/7 कॉल करें 7400400908।',
    heroAlt: 'घर पर एक बुज़ुर्ग के साथ Way2Cure नर्स',
    app: '(ऐप)',
    heroTrust: '{n} संतुष्ट मरीज़ · फ़ार्मासिस्ट द्वारा जाँचे गए ऑर्डर · 24/7 मदद',
    callBefore: 'बात करना चाहते हैं? दिन हो या रात, कभी भी',
    callAfter: ' पर कॉल करें।',
    nurseText: 'घर पर योग्य नर्स, दिन हो या रात',
    needToday: 'आज आपको क्या चाहिए?',
    rxTitle: 'पर्चे वाले ऑर्डर कैसे काम करते हैं',
    rxLead: 'चार कदम। पैक करने से पहले हर पर्चे को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    aiDecides: 'AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।',
    aiText: 'अगर पर्चे में कुछ भी साफ़ न हो, तो पैक करने से पहले फ़ार्मासिस्ट आपको कॉल करेंगे।',
    appOnly: 'पर्चा Way2Cure मोबाइल ऐप में अपलोड होता है।',
    seeHow: 'देखें यह कैसे काम करता है',
    careTitle: 'घर पर देखभाल',
    careLead: 'प्रशिक्षित और जाँचे-परखे नर्स और डॉक्टर, आपके घर पर।',
    careAlt: 'घर पर एक बुज़ुर्ग का बीपी जाँचती Way2Cure नर्स',
    specialised: 'खास देखभाल',
    specialisedText: 'आईसीयू, वेंटिलेटर, स्ट्रोक और कैंसर केयर, डॉक्टर की बनाई एक केयर योजना के साथ।',
    careNote: 'देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।',
    allCare: 'सभी देखभाल सेवाएँ देखें',
    subTitle: 'एक बार सब्सक्राइब करें। याद हम रखेंगे।',
    subLead: 'हम हर डिलिवरी या विज़िट तय करते हैं और दो दिन पहले याद दिलाते हैं। जब चाहें रोकें या बदलें, कोई शुल्क नहीं।',
    seePlans: 'प्लान देखें',
    doseKey: 'डोज़ सैशे दिन के समय के अनुसार रंग से पहचाने जाते हैं:',
    families: 'जिन परिवारों की हम देखभाल करते हैं',
    storiesSoon: 'परिवारों की सच्ची कहानियाँ हम यहाँ उनकी लिखित अनुमति से साझा करेंगे।',
    shareStory: 'आपके पास कोई कहानी है? हमें व्हाट्सऐप पर बताएँ',
    questions: 'आम सवाल',
    allQuestions: 'सभी सवाल',
  },
  mr: {
    seoTitle: 'Way2Cure | घरी काळजी आणि ज्येष्ठांना लागणारे सर्व काही, मुंबई',
    seoDesc: 'घरी नर्स, डॉक्टर आणि आयसीयू काळजी, तसेच मुंबई, नवी मुंबई आणि ठाणे येथे औषधे, वैद्यकीय उपकरणे आणि दैनंदिन काळजीच्या वस्तू. फार्मासिस्टने तपासलेल्या ऑर्डर. 24/7 कॉल करा 7400400908.',
    heroAlt: 'घरी एका ज्येष्ठ व्यक्तीसोबत Way2Cure नर्स',
    app: '(ॲप)',
    heroTrust: '{n} समाधानी रुग्ण · फार्मासिस्टने तपासलेल्या ऑर्डर · 24/7 मदत',
    callBefore: 'बोलायचे आहे? दिवस असो वा रात्र, कधीही',
    callAfter: ' वर कॉल करा.',
    nurseText: 'घरी पात्र नर्स, दिवस असो वा रात्र',
    needToday: 'आज तुम्हाला काय हवे आहे?',
    rxTitle: 'प्रिस्क्रिप्शन ऑर्डर कशी होते',
    rxLead: 'चार पायऱ्या. पॅक करण्यापूर्वी प्रत्येक प्रिस्क्रिप्शन नोंदणीकृत फार्मासिस्ट तपासतात.',
    aiDecides: 'AI मदत करते, निर्णय फार्मासिस्ट घेतात.',
    aiText: 'प्रिस्क्रिप्शनमध्ये काही स्पष्ट नसल्यास, पॅक करण्यापूर्वी फार्मासिस्ट तुम्हाला कॉल करतील.',
    appOnly: 'प्रिस्क्रिप्शन Way2Cure मोबाइल ॲपमध्ये अपलोड करता येते.',
    seeHow: 'हे कसे होते ते पाहा',
    careTitle: 'घरी काळजी',
    careLead: 'प्रशिक्षित, पार्श्वभूमी तपासलेल्या नर्स आणि डॉक्टर, तुमच्या घरी.',
    careAlt: 'घरी एका ज्येष्ठ व्यक्तीचा बीपी तपासणारी Way2Cure नर्स',
    specialised: 'विशेष काळजी',
    specialisedText: 'आयसीयू, व्हेंटिलेटर, स्ट्रोक आणि कर्करोग काळजी, डॉक्टरांनी आखलेल्या एका काळजी योजनेसह.',
    careNote: 'काळजी सुरू होण्यापूर्वी, उपचार करणारे डॉक्टर ती रुग्णासाठी योग्य आहे का ते ठरवतात.',
    allCare: 'सर्व काळजी सेवा पाहा',
    subTitle: 'एकदा सदस्यता घ्या. आठवण आम्ही ठेवू.',
    subLead: 'आम्ही प्रत्येक डिलिव्हरी किंवा भेट ठरवतो आणि दोन दिवस आधी आठवण करून देतो. कधीही थांबवा किंवा बदला, कोणतेही शुल्क नाही.',
    seePlans: 'प्लॅन पाहा',
    doseKey: 'डोस सॅशे दिवसाच्या वेळेनुसार रंगाने ओळखले जातात:',
    families: 'आम्ही काळजी घेत असलेली कुटुंबे',
    storiesSoon: 'कुटुंबांच्या खऱ्या गोष्टी आम्ही त्यांच्या लेखी परवानगीने इथे सांगू.',
    shareStory: 'तुमच्याकडे सांगण्यासारखी गोष्ट आहे? आम्हाला व्हॉट्सॲपवर सांगा',
    questions: 'नेहमीचे प्रश्न',
    allQuestions: 'सर्व प्रश्न',
  },
};

const DOSE_KEY = [
  { cls: 'bg-dose-morning text-green', en: 'Morning', hi: 'सुबह', mr: 'सकाळ' },
  { cls: 'bg-dose-afternoon text-green', en: 'Afternoon', hi: 'दोपहर', mr: 'दुपार' },
  { cls: 'bg-dose-evening text-white', en: 'Evening', hi: 'शाम', mr: 'संध्याकाळ' },
  { cls: 'bg-dose-night text-white', en: 'Night', hi: 'रात', mr: 'रात्र' },
] as const;

export default function Home() {
  const { t, lang } = useLang();
  const tr = useT(T);
  const tc = useT(COPY);
  const loc = useLoc();

  // 6 quick paths (p.9 item 3): Medicines · Devices · Daily care · Mobility · Nutrition · Book a nurse
  const paths = [
    ...categories.filter((c) => c.slug !== 'safety').map(loc).map((c) => ({ to: `/shop/${c.slug}`, icon: c.icon, title: c.name, text: c.blurb, edge: c.edge })),
    { to: '/care/nurse', icon: 'stethoscope', title: t('bookNurse'), text: tr('nurseText'), edge: 'var(--terracotta-deep)' },
  ];
  const careCards = ['nurse', 'doctor', 'icu'].map((id) => loc(services.find((s) => s.id === id)!));

  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} jsonLd={medicalBusinessLd} />

      {/* 2 · Hero: the phone number and Upload Rx are visible without scrolling */}
      <section className="bg-green text-white">
        <div className="container grid items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-16">
          <div>
            <h1 className="text-white md:text-[48px]">{t('heroTitle')}</h1>
            <p className="text-lead text-[#e2ece9]">{t('heroText')}</p>
            <div className="my-6 flex flex-wrap gap-3">
              <Button to="/shop/medicines" variant="light"><Icon name="pill" /> {t('orderMedicines')}</Button>
              <Button to="/prescription" variant="urgent"><Icon name="rx" /> {t('uploadRx')} <span className="font-normal">{tr('app')}</span></Button>
            </div>
            <p className="mb-2 text-base font-semibold text-mint">{tr('heroTrust', { n: SITE.happyPatients })}</p>
            <p className="m-0 text-white">
              {tr('callBefore')} <a href={SITE.phoneHref} className="font-bold text-white">{SITE.phone}</a>{tr('callAfter')}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            {/* One flat brand circle behind the photo (pitch deck motif). No gradients. */}
            <span aria-hidden="true" className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-mustard md:h-52 md:w-52" />
            <img
              src="/images/hero-caregiver-with-senior.jpg"
              alt={tr('heroAlt')}
              width={1600}
              height={1200}
              fetchPriority="high"
              className="relative aspect-[4/3] w-full rounded-card bg-mint object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3 · Quick paths: 6 big tiles */}
      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="mb-8">{tr('needToday')}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {paths.map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="flex h-full min-h-[96px] items-center gap-4 rounded-card bg-white p-5 text-ink no-underline shadow-card transition-colors hover:bg-[#fbfaf7]"
                  style={{ borderLeft: `5px solid ${p.edge}` }}
                >
                  <Icon name={p.icon} size={32} className="shrink-0 text-green" />
                  <span className="grid flex-1">
                    <strong className="text-h3m text-green">{p.title}</strong>
                    <span className="text-base text-grey">{p.text}</span>
                  </span>
                  <Icon name="chevron" className="shrink-0 text-terracotta-deep" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · How prescriptions work: numbered steps + one info band */}
      <section className="bg-white py-14 md:py-20">
        <div className="container">
          <SectionHeading title={tr('rxTitle')} lead={tr('rxLead')} />
          <StepList steps={RX_STEPS} />
          <InfoBand icon="sparkles" className="mt-8">
            <strong>{tr('aiDecides')}</strong> {tr('aiText')}
          </InfoBand>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button to="/prescription">{tr('seeHow')}</Button>
            <span className="text-base text-grey">{tr('appOnly')}</span>
          </div>
        </div>
      </section>

      {/* 5 · Care at home: photo beside the service cards */}
      <section className="py-14 md:py-20">
        <div className="container">
          <SectionHeading
            title={tr('careTitle')}
            lead={tr('careLead')}
            action={<Link to="/care" className="inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('allCare')} <Icon name="arrow" size={18} /></Link>}
          />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <img src="/images/care-nurse-at-home.jpg" alt={tr('careAlt')} width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full self-start rounded-card bg-mint object-cover" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {careCards.map((s) => (
                <li key={s.id} className="flex flex-col rounded-card bg-white p-5 shadow-card" style={{ borderLeft: `5px solid ${s.edge}` }}>
                  <h3 className="mb-1 flex items-center gap-2"><Icon name={s.icon} className="shrink-0 text-terracotta-deep" /> {s.name}</h3>
                  <p className="mb-4 flex-1 text-base text-grey">{s.short}</p>
                  <Button to={`/care/${s.id}`} variant="urgent" compact>{tc('bookNow')}</Button>
                </li>
              ))}
              <li className="flex flex-col rounded-card bg-white p-5 shadow-card" style={{ borderLeft: '5px solid var(--mustard)' }}>
                <h3 className="mb-1 flex items-center gap-2"><Icon name="heartPulse" className="shrink-0 text-terracotta-deep" /> {tr('specialised')}</h3>
                <p className="mb-4 flex-1 text-base text-grey">{tr('specialisedText')}</p>
                <Button to="/care#specialised" variant="outline" compact>{tr('allCare')}</Button>
              </li>
            </ul>
          </div>
          <p className="mt-4 text-small text-grey">{tr('careNote')}</p>
        </div>
      </section>

      {/* 6 · Subscribe & save: text beside a plain list */}
      <section className="bg-mint py-14 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2>{tr('subTitle')}</h2>
            <p className="text-lead text-green">{tr('subLead')}</p>
            <Button to="/subscriptions" className="mt-2">{tr('seePlans')}</Button>
          </div>
          <div>
            <ul className="divide-y divide-mint overflow-hidden rounded-card bg-white shadow-card">
              {subscriptionPlans.map(loc).map((p) => (
                <li key={p.id}>
                  <Link
                    to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'}
                    className="flex items-center gap-4 px-5 py-4 text-ink no-underline hover:bg-[#fbfaf7]"
                  >
                    <Icon name={p.icon} size={28} className="shrink-0 text-terracotta-deep" />
                    <span className="grid flex-1">
                      <strong className="text-green">{p.name}</strong>
                      <span className="text-base text-grey">{p.points[0]} · {p.often}</span>
                    </span>
                    <Icon name="chevron" className="shrink-0 text-terracotta-deep" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-0 mt-4 text-base text-green">{tr('doseKey')}</p>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label={tr('doseKey')}>
              {DOSE_KEY.map((d) => (
                <li key={d.en} className={`rounded-btn px-3 py-1 text-base font-bold ${d.cls}`}>{d[lang]}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7 · Trust strip */}
      <TrustStrip />

      {/* 8 · Reviews & FAQ */}
      <section className="py-14 md:py-20">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="mb-6">{tr('families')}</h2>
            {testimonials.length ? (
              <ul className="grid gap-4">
                {testimonials.map(loc).map((s) => (
                  <li key={s.name}>
                    <figure className="m-0 rounded-card bg-white p-6 shadow-card" style={{ borderLeft: '5px solid var(--terracotta)' }}>
                      <blockquote className="m-0 font-head text-h3m text-green">“{s.quote}”</blockquote>
                      <figcaption className="mt-3 text-base text-grey">{s.name}, {s.relation}, {s.city}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-card bg-white p-6 shadow-card" style={{ borderLeft: '5px solid var(--terracotta)' }}>
                {/* TODO: client: add real family stories (with written consent) to src/data/testimonials.json */}
                <p>{tr('storiesSoon')}</p>
                <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-tap items-center gap-2 font-bold">
                  <Icon name="whatsapp" size={20} /> {tr('shareStory')}
                </a>
              </div>
            )}
          </div>
          <div>
            <h2 className="mb-6">{tr('questions')}</h2>
            <FAQAccordion items={faqs.slice(0, 5)} />
            <Link to="/help" className="mt-4 inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('allQuestions')} <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
