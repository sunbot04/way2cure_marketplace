import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import InfoBand from '../components/ui/InfoBand';
import StepList, { type Step } from '../components/ui/StepList';
import FAQAccordion from '../components/ui/FAQAccordion';
import TrustStrip from '../components/trust/TrustStrip';
import ServiceCard from '../components/care/ServiceCard';
import Seo, { medicalBusinessLd } from '../components/layout/Seo';
import { useLang, useLoc, useT, type Dict } from '../i18n/LangContext';
import { SITE } from '../config/site';
import { categories, faqs, services, subscriptionPlans, testimonials } from '../data';

// Homepage: the 9-section blueprint from guidelines p.9. Header (1) and footer (9) come from the layout.
// Layouts vary on purpose: text + photo, tiles, numbered steps, cards beside a photo, a plain list,
// a single band, and two columns.

export const RX_STEPS: Step[] = [
  { title: 'Upload', text: 'Snap your prescription in the Way2Cure app',
    hi: { title: 'अपलोड', text: 'Way2Cure ऐप में पर्चे की फ़ोटो लें' }, mr: { title: 'अपलोड', text: 'Way2Cure ॲपमध्ये प्रिस्क्रिप्शनचा फोटो घ्या' } },
  { title: 'AI reads', text: 'The medicines are listed for you to check',
    hi: { title: 'AI पढ़ता है', text: 'दवाइयों की लिस्ट आपके जाँचने के लिए बनती है' }, mr: { title: 'AI वाचते', text: 'औषधांची यादी तुम्ही तपासण्यासाठी तयार होते' } },
  { title: 'Pharmacist verifies', text: 'A registered pharmacist checks every order',
    hi: { title: 'फ़ार्मासिस्ट जाँचते हैं', text: 'हर ऑर्डर को रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं' }, mr: { title: 'फार्मासिस्ट तपासतात', text: 'प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात' } },
  { title: 'Delivered', text: 'To your door. Share the OTP with the rider',
    hi: { title: 'डिलिवरी', text: 'आपके दरवाज़े तक। राइडर को OTP बताएँ' }, mr: { title: 'डिलिव्हरी', text: 'तुमच्या दारात. रायडरला OTP सांगा' } },
];

const T: Dict = {
  en: {
    seoTitle: 'Way2Cure | Care at home and everything seniors need, Mumbai',
    seoDesc: 'Nurses, doctors and ICU care at home, plus medicines, medical devices and daily care delivered in Mumbai, Navi Mumbai and Thane. Pharmacist-verified orders. Call 7400400908, 24/7.',
    heroAlt: 'A Way2Cure nurse with a senior at home',
    aboutTitle: 'Healthcare at your doorstep, any time',
    aboutText: 'Way2Cure provides home care across Mumbai, Navi Mumbai and Thane: nursing, elder care, bedridden patient care and ICU care at home. Now the same team also delivers the medicines, devices and daily care your family needs.',
    aboutP1: 'Trained, background-checked nurses and caretakers',
    aboutP2: 'Doctor-led care plans for serious illness',
    aboutP3: 'One number for care and medicines, 24/7',
    aboutCta: 'About Way2Cure',
    badgeText: 'patients cared for',
    needToday: 'Shop by need',
    needLead: 'Delivered across Mumbai, Navi Mumbai and Thane.',
    allProducts: 'All products',
    proofPatients: '{n} patients cared for',
    proofPharmacist: 'Every prescription checked by a pharmacist',
    proofHelpline: '24/7 helpline: {phone}',
    rxTitle: 'How prescription orders work',
    rxLead: 'Four steps. A registered pharmacist checks every prescription before we pack it.',
    aiDecides: 'AI assists, pharmacist decides.',
    aiText: 'If anything on the prescription is unclear, the pharmacist will call you before packing.',
    appOnly: 'Prescription upload is in the Way2Cure mobile app.',
    seeHow: 'See how it works',
    careTitle: 'Care at home',
    careLead: 'Trained, background-checked nurses and doctors, sent to your home.',
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
    aboutTitle: 'आपके दरवाज़े पर स्वास्थ्य सेवा, कभी भी',
    aboutText: 'Way2Cure मुंबई, नवी मुंबई और ठाणे में घर पर देखभाल देता है: नर्सिंग, बुज़ुर्गों की देखभाल, बिस्तर पर रहने वाले मरीज़ों की देखभाल और घर पर आईसीयू। अब वही टीम आपके परिवार के लिए दवाइयाँ, उपकरण और रोज़ की ज़रूरतें भी पहुँचाती है।',
    aboutP1: 'प्रशिक्षित और जाँचे-परखे नर्स और केयरटेकर',
    aboutP2: 'गंभीर बीमारी के लिए डॉक्टर की बनाई केयर योजना',
    aboutP3: 'देखभाल और दवाइयों के लिए एक नंबर, 24/7',
    aboutCta: 'Way2Cure के बारे में',
    badgeText: 'मरीज़ों की देखभाल',
    needToday: 'ज़रूरत के हिसाब से खरीदें',
    needLead: 'मुंबई, नवी मुंबई और ठाणे में डिलिवरी।',
    allProducts: 'सभी प्रोडक्ट',
    proofPatients: '{n} मरीज़ों की देखभाल',
    proofPharmacist: 'हर पर्चा फ़ार्मासिस्ट जाँचते हैं',
    proofHelpline: '24/7 हेल्पलाइन: {phone}',
    rxTitle: 'पर्चे वाले ऑर्डर कैसे काम करते हैं',
    rxLead: 'चार कदम। पैक करने से पहले हर पर्चे को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    aiDecides: 'AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।',
    aiText: 'अगर पर्चे में कुछ भी साफ़ न हो, तो पैक करने से पहले फ़ार्मासिस्ट आपको कॉल करेंगे।',
    appOnly: 'पर्चा Way2Cure मोबाइल ऐप में अपलोड होता है।',
    seeHow: 'देखें यह कैसे काम करता है',
    careTitle: 'घर पर देखभाल',
    careLead: 'प्रशिक्षित और जाँचे-परखे नर्स और डॉक्टर, आपके घर पर।',
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
    aboutTitle: 'तुमच्या दारात आरोग्यसेवा, कधीही',
    aboutText: 'Way2Cure मुंबई, नवी मुंबई आणि ठाणे येथे घरी काळजी देते: नर्सिंग, ज्येष्ठांची काळजी, अंथरुणाला खिळलेल्या रुग्णांची काळजी आणि घरी आयसीयू. आता तीच टीम तुमच्या कुटुंबाला लागणारी औषधे, उपकरणे आणि रोजच्या गरजाही पोहोचवते.',
    aboutP1: 'प्रशिक्षित, पार्श्वभूमी तपासलेल्या नर्स आणि केअरटेकर',
    aboutP2: 'गंभीर आजारासाठी डॉक्टरांनी आखलेली काळजी योजना',
    aboutP3: 'काळजी आणि औषधांसाठी एकच नंबर, 24/7',
    aboutCta: 'Way2Cure बद्दल',
    badgeText: 'रुग्णांची काळजी',
    needToday: 'गरजेनुसार खरेदी करा',
    needLead: 'मुंबई, नवी मुंबई आणि ठाणे येथे डिलिव्हरी.',
    allProducts: 'सर्व उत्पादने',
    proofPatients: '{n} रुग्णांची काळजी',
    proofPharmacist: 'प्रत्येक प्रिस्क्रिप्शन फार्मासिस्ट तपासतात',
    proofHelpline: '24/7 हेल्पलाइन: {phone}',
    rxTitle: 'प्रिस्क्रिप्शन ऑर्डर कशी होते',
    rxLead: 'चार पायऱ्या. पॅक करण्यापूर्वी प्रत्येक प्रिस्क्रिप्शन नोंदणीकृत फार्मासिस्ट तपासतात.',
    aiDecides: 'AI मदत करते, निर्णय फार्मासिस्ट घेतात.',
    aiText: 'प्रिस्क्रिप्शनमध्ये काही स्पष्ट नसल्यास, पॅक करण्यापूर्वी फार्मासिस्ट तुम्हाला कॉल करतील.',
    appOnly: 'प्रिस्क्रिप्शन Way2Cure मोबाइल ॲपमध्ये अपलोड करता येते.',
    seeHow: 'हे कसे होते ते पाहा',
    careTitle: 'घरी काळजी',
    careLead: 'प्रशिक्षित, पार्श्वभूमी तपासलेल्या नर्स आणि डॉक्टर, तुमच्या घरी.',
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
  const loc = useLoc();

  // Quick paths (p.9 item 3): the six shop categories. Booking a nurse is the hero's second button.
  const paths = categories.map(loc).map((c) => ({ to: `/shop/${c.slug}`, icon: c.icon, title: c.name, text: c.blurb }));
  const proof = [
    { icon: 'users', text: tr('proofPatients', { n: SITE.happyPatients }) },
    { icon: 'verified', text: tr('proofPharmacist') },
    { icon: 'phone', text: tr('proofHelpline', { phone: SITE.phone }) },
  ];
  const careCards = ['nurse', 'doctor', 'elder', 'icu'].map((id) => services.find((s) => s.id === id)!);

  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} jsonLd={medicalBusinessLd} />

      {/* 2 · Hero: the photo fades into the deep green, so text and image read as one scene. */}
      <section className="relative overflow-hidden bg-green text-white">
        <img
          src="/images/hero-care.webp"
          alt={tr('heroAlt')}
          width={1400}
          height={933}
          fetchPriority="high"
          className="fade-b h-72 w-full object-cover object-[65%_center] sm:h-96 lg:fade-l lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[60%]"
        />
        <div className="container relative -mt-16 flex items-center pb-14 sm:-mt-20 lg:mt-0 lg:min-h-[640px] lg:py-20 2xl:min-h-[700px]">
          <div className="max-w-[560px] 2xl:max-w-[640px]">
            <h1 className="mb-5 text-[34px] leading-[1.12] text-white md:text-[52px] 2xl:text-[60px]">{t('heroTitle')}</h1>
            <p className="mb-8 text-lead text-mint md:text-[22px] md:leading-relaxed">{t('heroText')}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/shop/medicines" variant="light"><Icon name="pill" /> {t('orderMedicines')}</Button>
              <Button to="/care/nurse" variant="outline-light"><Icon name="stethoscope" /> {t('bookNurse')}</Button>
            </div>
            <ul className="mt-10 flex flex-col gap-3 text-base xl:flex-row xl:flex-wrap xl:gap-x-8">
              {proof.map((x) => (
                <li key={x.icon} className="flex items-center gap-2.5 xl:whitespace-nowrap">
                  <Icon name={x.icon} size={20} className="shrink-0 text-mustard" /> <span>{x.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · Quick paths: six even cards, one accent colour */}
      <section className="pb-6 pt-14 md:pt-20">
        <div className="container">
          <SectionHeading
            title={tr('needToday')}
            lead={tr('needLead')}
            action={<Link to="/shop" className="inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('allProducts')} <Icon name="arrow" size={18} /></Link>}
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
            {paths.map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="flex h-full flex-col gap-3 rounded-card bg-white p-4 text-ink no-underline shadow-card transition-shadow hover:shadow-raised md:p-5"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-btn bg-sage-tint text-green">
                    <Icon name={p.icon} size={26} />
                  </span>
                  <strong className="text-body leading-snug text-green">{p.title}</strong>
                  <span className="hidden text-base text-grey md:block">{p.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · How prescriptions work: numbered steps + one info band */}
      <section className="py-14 md:py-20">
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

      {/* 5 · Care at home: the four most-booked services as photo cards */}
      <section className="py-14 md:py-20">
        <div className="container">
          <SectionHeading
            title={tr('careTitle')}
            lead={tr('careLead')}
            action={<Link to="/care" className="inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('allCare')} <Icon name="arrow" size={18} /></Link>}
          />
          {/* Phones: swipe sideways through the cards. Tablet and up: a grid. */}
          <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
            {careCards.map((c) => (
              <li key={c.id} className="flex w-[82%] shrink-0 snap-start sm:w-auto">
                <ServiceCard service={c} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-grey">{tr('careNote')}</p>
        </div>
      </section>

      {/* About Way2Cure: photo collage and the one confirmed number */}
      <section className="py-10 md:py-16">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <img src="/images/nurse-portrait.webp" alt="" width={900} height={600} loading="lazy" className="fade-all aspect-[4/3] w-full object-cover object-[60%_center]" />
            <div className="absolute bottom-4 right-2 grid h-32 w-32 place-content-center rounded-full bg-white text-center shadow-raised md:bottom-10 md:right-6 md:h-40 md:w-40">
              <strong className="font-head text-[36px] leading-none text-terracotta-deep md:text-[44px]">{SITE.happyPatients}</strong>
              <span className="mt-1 px-3 text-small font-bold leading-tight text-green">{tr('badgeText')}</span>
            </div>
          </div>
          <div>
            <h2 className="md:text-[40px] md:leading-tight">{tr('aboutTitle')}</h2>
            <p className="text-lead text-ink/80">{tr('aboutText')}</p>
            <ul className="my-8 grid gap-3">
              {(['aboutP1', 'aboutP2', 'aboutP3'] as const).map((k) => (
                <li key={k} className="flex items-start gap-3 text-body">
                  <Icon name="check" size={22} className="mt-1 shrink-0 text-sage" /> {tr(k)}
                </li>
              ))}
            </ul>
            <Button to="/about" variant="outline">{tr('aboutCta')}</Button>
          </div>
        </div>
      </section>

      {/* 6 · Subscribe & save: text beside a plain list */}
      <section className="bg-gradient-to-b from-cream via-mint/70 to-cream py-16 md:py-24">
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
                    className="flex items-center gap-4 px-5 py-4 text-ink no-underline hover:bg-cream"
                  >
                    <Icon name={p.icon} size={28} className="shrink-0 text-sage" />
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
              <div className="rounded-card border border-line bg-white p-6">
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
