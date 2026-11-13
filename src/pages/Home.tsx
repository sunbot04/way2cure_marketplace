import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import Icon from '../components/Icon';
import ShopByNeed from '../components/home/ShopByNeed';
import Button from '../components/ui/Button';
import Accent from '../components/ui/Accent';
import HomeFaq from '../components/home/HomeFaq';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import CountUp from '../components/motion/CountUp';
import HeroVisual from '../components/home/HeroVisual';
import ProblemCard, { type Art } from '../components/home/ProblemCard';
import RxStory, { RxBackdrop } from '../components/home/RxStory';
import CareByNeed from '../components/home/CareByNeed';
import SachetExplorer from '../components/brand/SachetExplorer';
import AppBadges from '../components/commerce/AppBadges';
import Seo, { medicalBusinessLd } from '../components/layout/Seo';
import { RX_STEPS } from '../data/rxSteps';
import { useLang, useLoc, useT, type Dict } from '../i18n/LangContext';
import { SITE } from '../config/site';
import { subscriptionPlans } from '../data';
import { COPY } from '../components/copy';
import { fadeRise, lineMask, stagger } from '../lib/motion';

// Landing page (references: REO360 layout and device mockup, DawaTime sachet and problem cards,
// ProCare stat card and care cards), following the 9-part homepage blueprint on guidelines p.9.
// Section backgrounds alternate white and mist, with one charcoal band, so sections read as distinct.


const T: Dict = {
  en: {
    seoTitle: 'Way2Cure | Care at home and everything seniors need, Mumbai',
    seoDesc: 'Nurses, doctors and ICU care at home, plus medicines, medical devices and daily care delivered in Mumbai, Navi Mumbai and Thane. Pharmacist-verified orders. Call 7400400908, 24/7.',
    h1a: 'Care at home,', h1b: 'now with', h1c: '*everything seniors need.*',
    heroSub: 'Nurses, doctors and ICU care at home. Medicines, devices and daily care delivered to your door.',
    trust1: 'Pharmacist verified', trust2: 'Verified nurses', trust3: '24/7 support {phone}',
    quickTitle: 'Everything for care at home, *in one place.*', quickLead: 'Delivered across Mumbai, Navi Mumbai and Thane.', allProducts: 'All products',
    probTitle: "Looking after a parent's medicines can feel like *a second job.*", howWeHelp: 'How Way2Cure helps',
    p1a: 'Ten strips. Three doctors.', p1b: 'One confused morning.', p1s: 'Every doctor adds a strip, and nobody writes one simple schedule.', p1f: 'One pharmacist-checked schedule, sorted by time of day.',
    p2a: 'Did Papa take', p2b: 'his evening dose?', p2s: "You're at work across town. He says yes. You're never quite sure.", p2f: 'Each dose sealed in its own labelled sachet, so a missed one is easy to spot.',
    p3a: 'Pharmacy runs', p3b: 'every other day.', p3s: 'Every strip runs out on a different date, so the trips never stop.', p3f: 'Refills arrive together, with a reminder 3 days before they run out.',
    rxTitle: 'AI assists, _pharmacist decides._',
    rxLead: 'Four steps from your prescription to your door. If anything is unclear, the pharmacist calls you before packing.',
    appOnly: 'Prescription upload is in the Way2Cure app.', seeHow: 'See how it works',
    careTitle: "Trained people, *at your parent's side.*", careLead: 'Nurses, doctors and caretakers, background-checked and sent to your home.',
    careNote: 'Suitability is assessed by the treating doctor before care begins.', allCare: 'See all care services',
    sachetTitle: 'Every dose, *in its own sachet.*',
    sachetText: 'We sort your medicines by time of day and seal each dose in a sachet labelled with the name, the time and what is inside.', sachetTabs: 'Choose a time of day', sachetCta: 'How dose sachets work',
    subTitle: 'Subscribe once. We remember for you.', subLead: 'We schedule each delivery and remind you before it. Pause or change anytime, with no fee.', seePlans: 'See plans',
    trustBig: 'patients cared for across Mumbai, Navi Mumbai and Thane.',
    trustText: 'Real nurses, licensed pharmacies and a real person on the phone, day or night.', questions: 'Common questions', allQuestions: 'See all questions', faqLead: 'Quick answers about delivery, prescriptions and care at home.', helpTitle: 'Still have a question?', helpText: 'Our help centre covers orders, payments, care visits and more.',
  },
  hi: {
    seoTitle: 'Way2Cure | घर पर देखभाल और बुज़ुर्गों की हर ज़रूरत, मुंबई',
    seoDesc: 'घर पर नर्स, डॉक्टर और आईसीयू देखभाल, साथ ही मुंबई, नवी मुंबई और ठाणे में दवाइयाँ, मेडिकल उपकरण और रोज़ की देखभाल का सामान। फ़ार्मासिस्ट द्वारा जाँचे गए ऑर्डर। 24/7 कॉल करें 7400400908।',
    h1a: 'घर पर देखभाल, अब', h1b: '*बुज़ुर्गों की हर ज़रूरत*', h1c: 'के साथ।',
    heroSub: 'घर पर नर्स, डॉक्टर और आईसीयू देखभाल। दवाइयाँ, उपकरण और रोज़ की ज़रूरतें आपके दरवाज़े तक।',
    trust1: 'फ़ार्मासिस्ट द्वारा जाँचा गया', trust2: 'जाँचे-परखे नर्स', trust3: '24/7 मदद {phone}',
    quickTitle: 'घर पर देखभाल की हर चीज़, *एक ही जगह।*', quickLead: 'मुंबई, नवी मुंबई और ठाणे में डिलिवरी।', allProducts: 'सभी प्रोडक्ट',
    probTitle: 'माता-पिता की दवाइयाँ सँभालना *एक दूसरी नौकरी* जैसा लगता है।', howWeHelp: 'Way2Cure कैसे मदद करता है',
    p1a: 'दस पत्ते। तीन डॉक्टर।', p1b: 'एक उलझी हुई सुबह।', p1s: 'हर डॉक्टर एक नया पत्ता जोड़ देता है, पर कोई एक आसान समय-सारणी नहीं लिखता।', p1f: 'फ़ार्मासिस्ट द्वारा जाँची गई एक समय-सारणी, दिन के समय के अनुसार।',
    p2a: 'क्या पापा ने', p2b: 'शाम की दवा ली?', p2s: 'आप शहर के दूसरे छोर पर काम पर हैं। वे कहते हैं हाँ। पर आप कभी पक्का नहीं जानते।', p2f: 'हर डोज़ अपने लेबल वाले सैशे में बंद, ताकि छूटी डोज़ आसानी से दिखे।',
    p3a: 'हर दूसरे दिन', p3b: 'फ़ार्मेसी के चक्कर।', p3s: 'हर पत्ता अलग तारीख़ पर ख़त्म होता है, इसलिए चक्कर कभी रुकते नहीं।', p3f: 'रीफ़िल एक साथ आते हैं, ख़त्म होने से 3 दिन पहले रिमाइंडर के साथ।',
    rxTitle: 'AI मदद करता है, _फ़ैसला फ़ार्मासिस्ट करते हैं।_',
    rxLead: 'आपके पर्चे से आपके दरवाज़े तक चार कदम। कुछ भी साफ़ न हो तो पैक करने से पहले फ़ार्मासिस्ट आपको कॉल करते हैं।',
    appOnly: 'पर्चा Way2Cure ऐप में अपलोड होता है।', seeHow: 'देखें यह कैसे काम करता है',
    careTitle: 'प्रशिक्षित लोग, *आपके अपनों के साथ।*', careLead: 'नर्स, डॉक्टर और केयरटेकर, जाँचे-परखे और आपके घर भेजे गए।',
    careNote: 'देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।', allCare: 'सभी देखभाल सेवाएँ देखें',
    sachetTitle: 'हर डोज़, *उसके अपने सैशे में।*',
    sachetText: 'हम आपकी दवाइयों को दिन के समय के अनुसार छाँटते हैं और हर डोज़ को एक सैशे में बंद करते हैं, जिस पर नाम, समय और अंदर की दवाएँ लिखी होती हैं।', sachetTabs: 'दिन का समय चुनें', sachetCta: 'डोज़ सैशे कैसे काम करते हैं',
    subTitle: 'एक बार सब्सक्राइब करें। याद हम रखेंगे।', subLead: 'हम हर डिलिवरी तय करते हैं और उससे पहले याद दिलाते हैं। जब चाहें रोकें या बदलें, कोई शुल्क नहीं।', seePlans: 'प्लान देखें',
    trustBig: 'मरीज़ों की देखभाल, मुंबई, नवी मुंबई और ठाणे में।',
    trustText: 'असली नर्स, लाइसेंस वाली फ़ार्मेसी और फ़ोन पर एक असली इंसान, दिन हो या रात।', questions: 'आम सवाल', allQuestions: 'सभी सवाल देखें', faqLead: 'डिलिवरी, पर्चे और घर पर देखभाल के बारे में झटपट जवाब।', helpTitle: 'अब भी कोई सवाल है?', helpText: 'हमारे सहायता केंद्र में ऑर्डर, भुगतान, देखभाल विज़िट और बहुत कुछ है।',
  },
  mr: {
    seoTitle: 'Way2Cure | घरी काळजी आणि ज्येष्ठांना लागणारे सर्व काही, मुंबई',
    seoDesc: 'घरी नर्स, डॉक्टर आणि आयसीयू काळजी, तसेच मुंबई, नवी मुंबई आणि ठाणे येथे औषधे, वैद्यकीय उपकरणे आणि दैनंदिन काळजीच्या वस्तू. फार्मासिस्टने तपासलेल्या ऑर्डर. 24/7 कॉल करा 7400400908.',
    h1a: 'घरी काळजी, आता', h1b: '*ज्येष्ठांना लागणाऱ्या*', h1c: '*सर्व गोष्टींसह.*',
    heroSub: 'घरी नर्स, डॉक्टर आणि आयसीयू काळजी. औषधे, उपकरणे आणि रोजच्या गरजा तुमच्या दारात.',
    trust1: 'फार्मासिस्टने तपासलेले', trust2: 'पडताळलेल्या नर्स', trust3: '24/7 मदत {phone}',
    quickTitle: 'घरच्या काळजीसाठी सर्व काही, *एकाच ठिकाणी.*', quickLead: 'मुंबई, नवी मुंबई आणि ठाणे येथे डिलिव्हरी.', allProducts: 'सर्व उत्पादने',
    probTitle: 'आई-वडिलांची औषधे सांभाळणे *दुसऱ्या नोकरीसारखे* वाटू शकते.', howWeHelp: 'Way2Cure कशी मदत करते',
    p1a: 'दहा पट्ट्या. तीन डॉक्टर.', p1b: 'एक गोंधळलेली सकाळ.', p1s: 'प्रत्येक डॉक्टर एक नवी पट्टी जोडतात, पण कोणीही एक सोपे वेळापत्रक लिहीत नाही.', p1f: 'फार्मासिस्टने तपासलेले एकच वेळापत्रक, दिवसाच्या वेळेनुसार.',
    p2a: 'बाबांनी संध्याकाळचा', p2b: 'डोस घेतला का?', p2s: 'तुम्ही शहराच्या दुसऱ्या टोकाला कामावर आहात. ते हो म्हणतात. पण तुम्हाला कधीच खात्री नसते.', p2f: 'प्रत्येक डोस स्वतःच्या लेबल लावलेल्या सॅशेमध्ये, म्हणजे राहिलेला डोस सहज दिसतो.',
    p3a: 'दर दुसऱ्या दिवशी', p3b: 'फार्मसीच्या फेऱ्या.', p3s: 'प्रत्येक पट्टी वेगळ्या तारखेला संपते, म्हणून फेऱ्या कधीच थांबत नाहीत.', p3f: 'रिफिल एकत्र येतात, संपण्याच्या 3 दिवस आधी आठवणीसह.',
    rxTitle: 'AI मदत करते, _निर्णय फार्मासिस्ट घेतात._',
    rxLead: 'तुमच्या प्रिस्क्रिप्शनपासून तुमच्या दारापर्यंत चार पायऱ्या. काही अस्पष्ट असल्यास पॅक करण्यापूर्वी फार्मासिस्ट तुम्हाला कॉल करतात.',
    appOnly: 'प्रिस्क्रिप्शन Way2Cure ॲपमध्ये अपलोड करता येते.', seeHow: 'हे कसे होते ते पाहा',
    careTitle: 'प्रशिक्षित माणसे, *तुमच्या प्रियजनांच्या सोबत.*', careLead: 'नर्स, डॉक्टर आणि केअरटेकर, पार्श्वभूमी तपासलेले आणि तुमच्या घरी पाठवलेले.',
    careNote: 'काळजी सुरू होण्यापूर्वी, उपचार करणारे डॉक्टर ती रुग्णासाठी योग्य आहे का ते ठरवतात.', allCare: 'सर्व काळजी सेवा पाहा',
    sachetTitle: 'प्रत्येक डोस, *त्याच्या स्वतःच्या सॅशेमध्ये.*',
    sachetText: 'आम्ही तुमची औषधे दिवसाच्या वेळेनुसार लावतो आणि प्रत्येक डोस एका सॅशेमध्ये बंद करतो, ज्यावर नाव, वेळ आणि आतील औषधे लिहिलेली असतात.', sachetTabs: 'दिवसाची वेळ निवडा', sachetCta: 'डोस सॅशे कसे काम करतात',
    subTitle: 'एकदा सदस्यता घ्या. आठवण आम्ही ठेवू.', subLead: 'आम्ही प्रत्येक डिलिव्हरी ठरवतो आणि त्याआधी आठवण करून देतो. कधीही थांबवा किंवा बदला, कोणतेही शुल्क नाही.', seePlans: 'प्लॅन पाहा',
    trustBig: 'रुग्णांची काळजी, मुंबई, नवी मुंबई आणि ठाणे येथे.',
    trustText: 'खऱ्या नर्स, परवानाधारक फार्मसी आणि फोनवर एक खरी व्यक्ती, दिवस असो वा रात्र.', questions: 'नेहमीचे प्रश्न', allQuestions: 'सर्व प्रश्न पाहा', faqLead: 'डिलिव्हरी, प्रिस्क्रिप्शन आणि घरच्या काळजीबद्दल झटपट उत्तरे.', helpTitle: 'अजून काही प्रश्न आहे?', helpText: 'आमच्या मदत केंद्रात ऑर्डर, पेमेंट, काळजी भेटी आणि बरेच काही आहे.',
  },
};

// Stock photos (Pexels licence) until the Way2Cure photo shoot: see public/IMAGE_LIST.md.
const PROBLEMS: { art: Art; k: string; image: string; position: string }[] = [
  { art: 'strips', k: 'p1', image: '/images/people/grandmother-glasses.webp', position: 'center 30%' },
  { art: 'dose', k: 'p2', image: '/images/people/grandfather-turban.webp', position: 'center 30%' },
  { art: 'runs', k: 'p3', image: '/images/people/grandmother-errand.webp', position: '58% center' },
];
/** Section heading block: H2 with one accent, optional lead. */
function Heading({ title, lead, light = false, className = '' }: { title: string; lead?: string; light?: boolean; className?: string }) {
  return (
    <Reveal className={className}>
      <h2 className={`mb-4 text-section ${light ? 'text-white' : ''}`}><Accent text={title} /></h2>
      {lead && <p className={`m-0 text-lead ${light ? 'text-mint' : 'text-ink/75'}`}>{lead}</p>}
    </Reveal>
  );
}

export default function Home() {
  const { t } = useLang();
  const tr = useT(T);
  const tc = useT(COPY);
  const loc = useLoc();
  const trustItems = [
    { icon: 'userCheck', title: tc('nurses'), text: tc('nursesText') },
    { icon: 'verified', title: tc('pharmacies'), text: tc('pharmaciesText') },
    { icon: 'lock', title: tc('payments'), text: tc('paymentsText') },
    { icon: 'shield', title: tc('privacy'), text: tc('privacyText') },
    { icon: 'support', title: tc('support'), text: tc('supportText', { phone: SITE.phone }) },
  ];

  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} jsonLd={medicalBusinessLd} />

      {/* 1-2 · Hero. Runs up under the transparent floating header. */}
      <section className="relative overflow-hidden pt-[var(--header-space)]">
        <div className="container grid items-center gap-10 pb-10 pt-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pb-16 lg:pt-10">
          <m.div initial="hidden" animate="show" variants={stagger(0.05)}>
            <m.h1 variants={stagger()} className="mb-6 text-display">
              {/* Each line slides up inside a mask; the mask has room above for Hindi/Marathi vowel signs (matras) */}
              {(['h1a', 'h1b', 'h1c'] as const).map((k) => (
                <span key={k} className="-mt-[0.25em] block overflow-hidden pb-[0.1em] pt-[0.25em]">
                  <m.span variants={lineMask} className="block"><Accent text={tr(k)} /></m.span>
                </span>
              ))}
            </m.h1>
            <m.p variants={fadeRise} className="mb-8 max-w-[34rem] text-lead text-ink/80">{tr('heroSub')}</m.p>
            <m.div variants={fadeRise} className="flex flex-col gap-3 sm:flex-row">
              <Button to="/shop/medicines"><Icon name="pill" size={20} /> {t('orderMedicines')} <Icon name="arrow" size={18} /></Button>
              <Button to="/care/nurse" variant="outline"><Icon name="stethoscope" size={20} /> {t('bookNurse')}</Button>
            </m.div>
            <m.ul variants={fadeRise} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-green/10 pt-6 text-base font-semibold text-ink">
              {[tr('trust1'), tr('trust2'), tr('trust3', { phone: SITE.phone })].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-sage-tint text-green"><Icon name="check" size={14} /></span> {x}
                </li>
              ))}
            </m.ul>
          </m.div>
          <HeroVisual />
        </div>
      </section>

      {/* 3 · Shop by need: the client's card design (components/home/ShopByNeed) */}
      <section className="cv-auto section bg-white">
        <div className="container">
          <div className="mb-8 md:mb-12 flex flex-wrap items-end justify-between gap-6">
            <Heading title={tr('quickTitle')} lead={tr('quickLead')} className="max-w-2xl" />
            <Reveal><Link to="/shop" className="group inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('allProducts')} <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <ShopByNeed />
        </div>
      </section>

      {/* "Sound familiar?": the family's problems, then how we solve each */}
      <section className="cv-auto section">
        <div className="container">
          <Heading title={tr('probTitle')} className="mb-8 md:mb-12 max-w-3xl" />
          {/* Phones: swipe sideways through the cards; tablet and up: a grid */}
          <Stagger as="ul" className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {PROBLEMS.map(({ art, k, image, position }) => (
              <ProblemCard key={k} art={art} image={image} position={position} line1={tr(`${k}a`)} line2={tr(`${k}b`)} sub={tr(`${k}s`)} fix={tr(`${k}f`)} fixLabel={tr('howWeHelp')} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* 4 · How prescriptions work: pinned story on desktop, stepper on phones */}
      <section className="cv-auto section relative overflow-clip bg-mist">
        <RxBackdrop />
        <div className="container relative">
          <RxStory
            steps={RX_STEPS.map(loc)}
            heading={<Heading title={tr('rxTitle')} lead={tr('rxLead')} />}
            footer={
              <Reveal className="mt-4 rounded-panel bg-white p-6 shadow-card lg:ml-[4.5rem]">
                <p className="mb-4 flex items-center gap-2 font-bold text-green"><Icon name="phoneApp" size={20} /> {tr('appOnly')}</p>
                <AppBadges />
                <Link to="/prescription" className="group mt-4 inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('seeHow')} <Icon name="arrow" size={18} /></Link>
              </Reveal>
            }
          />
        </div>
      </section>

      {/* 5 · Care at home: same card design as Shop by need (components/home/CareByNeed) */}
      <section className="cv-auto section bg-white">
        <div className="container">
          <div className="mb-8 md:mb-12 flex flex-wrap items-end justify-between gap-6">
            <Heading title={tr('careTitle')} lead={tr('careLead')} className="max-w-2xl" />
            <Reveal><Link to="/care" className="group inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('allCare')} <Icon name="arrow" size={18} /></Link></Reveal>
          </div>
          <CareByNeed />
          <p className="mt-8 flex items-center gap-2 text-base text-grey"><Icon name="stethoscope" size={18} className="text-sage" /> {tr('careNote')}</p>
        </div>
      </section>

      {/* 6 · Dose sachets + subscribe & save */}
      <section className="cv-auto section bg-mist">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Heading title={tr('sachetTitle')} lead={tr('sachetText')} />
              <Reveal>
                <Link to="/subscriptions/dose-sachets" className="group mt-6 inline-flex min-h-tap items-center gap-2 font-head text-h2m font-bold text-terracotta-deep">{tr('sachetCta')} <Icon name="arrow" size={24} /></Link>
              </Reveal>
            </div>
            <Reveal><SachetExplorer /></Reveal>
          </div>

          <div className="mt-20 grid gap-10 rounded-panel bg-white p-6 shadow-card md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <h3 className="mb-3 font-head text-h2m md:text-h2">{tr('subTitle')}</h3>
              <p className="text-ink/80">{tr('subLead')}</p>
              <Button to="/subscriptions">{tr('seePlans')} <Icon name="arrow" size={18} /></Button>
            </Reveal>
            <Stagger as="ul" className="grid gap-3 sm:grid-cols-2">
              {subscriptionPlans.map(loc).map((p) => (
                <StaggerItem as="li" key={p.id}>
                  <Link
                    to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'}
                    className="group flex h-full items-start gap-3 rounded-tile border border-line p-4 text-ink no-underline transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-0.5 hover:shadow-raised"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name={p.icon} size={20} /></span>
                    <span className="grid gap-0.5">
                      <strong className="text-green">{p.name}</strong>
                      <span className="text-small text-grey">{p.often}</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* 7 · Trust, with the one confirmed number */}
      <section aria-label={tc('trustAria')} className="cv-auto section bg-green text-white">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="m-0 font-head text-[clamp(3.5rem,2rem+6vw,6.5rem)] font-bold leading-none text-mustard">
              <CountUp to={15000} suffix="+" />
            </p>
            <p className="mb-4 mt-3 font-head text-h2m font-bold leading-snug text-white">{tr('trustBig')}</p>
            <p className="m-0 text-mint">{tr('trustText')}</p>
          </Reveal>
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((i) => (
              <StaggerItem as="li" key={i.icon} className="flex items-start gap-4 rounded-tile border border-white/10 bg-white/5 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-white/10 text-mustard"><Icon name={i.icon} size={22} /></span>
                <span className="grid gap-0.5"><strong className="text-white">{i.title}</strong><span className="text-base text-mint">{i.text}</span></span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 8 · Common questions */}
      <HomeFaq title={tr('questions')} lead={tr('faqLead')} allLabel={tr('allQuestions')} helpTitle={tr('helpTitle')} helpText={tr('helpText')} />
    </>
  );
}
