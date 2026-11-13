import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent from '../components/ui/Accent';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import PlanCard from '../components/plans/PlanCard';
import SachetExplorer from '../components/brand/SachetExplorer';
import { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/layout/Seo';
import { subscriptionPlans } from '../data';
import { formatDate, useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

// Subscriptions (guidelines p.8, p.10): what you get, how it runs, the dose sachets, and
// manage / pause in plain view. Sections alternate white and mist.

// Example plans so families can see how "manage / pause" works.
// TODO: API: the signed-in family's plans from the account API.
interface SamplePlanText { what: string; often: string }
type SamplePlan = SamplePlanText & { id: string; icon: string; next: string; paused: boolean; hi?: Partial<SamplePlanText>; mr?: Partial<SamplePlanText> };
const SAMPLE_PLANS: SamplePlan[] = [
  {
    id: 'p1', icon: 'pill', what: 'BP & sugar medicines (3 items)', often: 'Every month', next: '2026-12-02', paused: false,
    hi: { what: 'बीपी और शुगर की दवाइयाँ (3 चीज़ें)', often: 'हर महीने' },
    mr: { what: 'बीपी आणि शुगरची औषधे (3 वस्तू)', often: 'दर महिन्याला' },
  },
  {
    id: 'p2', icon: 'package', what: 'Adult diapers, medium × 3 packs', often: 'Every 2 weeks', next: '2026-11-20', paused: false,
    hi: { what: 'बड़ों के डायपर, मीडियम × 3 पैक', often: 'हर 2 हफ़्ते' },
    mr: { what: 'प्रौढांसाठी डायपर, मीडियम × 3 पॅक', often: 'दर 2 आठवड्यांनी' },
  },
];

const FLOW = ['flow1', 'flow2', 'flow3', 'flow4'];

const T: Dict = {
  en: {
    seoTitle: 'Medicine and care subscriptions',
    seoDesc: 'Monthly medicines, adult diapers, dose sachets and regular home health checks, scheduled for you with a reminder before every order. Pause or change anytime.',
    crumb: 'Subscriptions',
    title: 'Regular care, *on schedule.*',
    intro: 'Subscribe once. We schedule each delivery or visit and remind you before every order. Pause or change anytime, with no fee.',
    seePlans: 'See plans',
    flowTitle: 'Set it up once. *We remember for you.*',
    flow1: 'Subscribe', flow1d: 'Choose a plan, or ask us to set one up on a call.',
    flow2: 'We schedule', flow2d: 'Every delivery or visit is planned ahead.',
    flow3: 'Reminder first', flow3d: 'You hear from us 3 days before each order.',
    flow4: 'Delivery or visit', flow4d: 'At your door, on time. Pause or change anytime.',
    plansTitle: 'Pick what your family *needs regularly.*',
    howSachets: 'How sachets work', bookCheck: 'Book a home check', startPlan: 'Start a plan',
    freqNote: 'Frequencies are suggestions. You confirm the price before the first order.',
    sachetTitle: 'Every dose, *in its own sachet.*',
    sachetText: 'Medicines sorted by time of day and sealed one dose to a sachet, labelled with the name, the time and what is inside.',
    tear: 'Tear one, take the dose.', sachetTabs: 'Choose a time of day',
    manageTitle: 'Manage or pause a plan',
    manageLead: 'Example shown until you log in. Pausing takes effect straight away.',
    paused: 'Paused', active: 'Active',
    info: 'Nothing is charged while a plan is paused. You can cancel anytime, with no fee.',
    reminders: 'See your reminders',
  },
  hi: {
    seoTitle: 'दवाइयों और देखभाल के सब्सक्रिप्शन',
    seoDesc: 'हर महीने की दवाइयाँ, बड़ों के डायपर, डोज़ सैशे और घर पर नियमित स्वास्थ्य जाँच, आपके लिए तय समय पर, हर ऑर्डर से पहले रिमाइंडर के साथ। जब चाहें रोकें या बदलें।',
    crumb: 'सब्सक्रिप्शन',
    title: 'नियमित देखभाल, *तय समय पर।*',
    intro: 'एक बार सब्सक्राइब करें। हम हर डिलीवरी या विज़िट का समय तय करते हैं और हर ऑर्डर से पहले याद दिलाते हैं। जब चाहें रोकें या बदलें, कोई शुल्क नहीं।',
    seePlans: 'प्लान देखें',
    flowTitle: 'एक बार सेट करें। *याद हम रखेंगे।*',
    flow1: 'सब्सक्राइब करें', flow1d: 'प्लान चुनें, या कॉल पर हमसे सेट करवाएँ।',
    flow2: 'हम समय तय करते हैं', flow2d: 'हर डिलीवरी या विज़िट पहले से तय होती है।',
    flow3: 'पहले रिमाइंडर', flow3d: 'हर ऑर्डर से 3 दिन पहले हम याद दिलाते हैं।',
    flow4: 'डिलीवरी या विज़िट', flow4d: 'आपके दरवाज़े पर, समय पर। जब चाहें रोकें या बदलें।',
    plansTitle: 'जो आपके परिवार को *नियमित रूप से चाहिए।*',
    howSachets: 'सैशे कैसे काम करते हैं', bookCheck: 'घर पर जाँच बुक करें', startPlan: 'प्लान शुरू करें',
    freqNote: 'कितनी बार, यह सिर्फ़ सुझाव है। पहले ऑर्डर से पहले आप कीमत पक्की करते हैं।',
    sachetTitle: 'हर डोज़, *उसके अपने सैशे में।*',
    sachetText: 'दवाइयाँ दिन के समय के अनुसार छाँटी जाती हैं और हर डोज़ एक सैशे में बंद होती है, जिस पर नाम, समय और अंदर की दवाएँ लिखी होती हैं।',
    tear: 'एक फाड़ें, डोज़ लें।', sachetTabs: 'दिन का समय चुनें',
    manageTitle: 'प्लान बदलें या रोकें',
    manageLead: 'लॉग इन करने तक उदाहरण दिखाया गया है। रोकना तुरंत लागू होता है।',
    paused: 'रुका हुआ', active: 'चालू',
    info: 'प्लान रुके रहने तक कोई पैसा नहीं लिया जाता। आप कभी भी, बिना किसी फ़ीस के, रद्द कर सकते हैं।',
    reminders: 'अपने रिमाइंडर देखें',
  },
  mr: {
    seoTitle: 'औषधे आणि काळजीची सदस्यता',
    seoDesc: 'दरमहा औषधे, प्रौढांसाठी डायपर, डोस सॅशे आणि घरी नियमित आरोग्य तपासणी, तुमच्यासाठी ठरलेल्या वेळी, प्रत्येक ऑर्डरआधी आठवणीसह. कधीही थांबवा किंवा बदला.',
    crumb: 'सदस्यता',
    title: 'नियमित काळजी, *ठरलेल्या वेळेवर.*',
    intro: 'एकदा सदस्यता घ्या. आम्ही प्रत्येक डिलिव्हरी किंवा भेटीची वेळ ठरवतो आणि प्रत्येक ऑर्डरआधी आठवण करून देतो. कधीही थांबवा किंवा बदला, कोणतेही शुल्क नाही.',
    seePlans: 'प्लॅन पाहा',
    flowTitle: 'एकदाच सेट करा. *आठवण आम्ही ठेवू.*',
    flow1: 'सदस्यता घ्या', flow1d: 'प्लॅन निवडा, किंवा कॉलवर आमच्याकडून सेट करून घ्या.',
    flow2: 'आम्ही वेळ ठरवतो', flow2d: 'प्रत्येक डिलिव्हरी किंवा भेट आधीच ठरलेली असते.',
    flow3: 'आधी आठवण', flow3d: 'प्रत्येक ऑर्डरच्या 3 दिवस आधी आम्ही आठवण करून देतो.',
    flow4: 'डिलिव्हरी किंवा भेट', flow4d: 'तुमच्या दारात, वेळेवर. कधीही थांबवा किंवा बदला.',
    plansTitle: 'तुमच्या कुटुंबाला *नियमित लागणारे.*',
    howSachets: 'सॅशे कसे काम करतात', bookCheck: 'घरी तपासणी बुक करा', startPlan: 'प्लॅन सुरू करा',
    freqNote: 'किती वेळा, हे फक्त सुचवलेले आहे. पहिल्या ऑर्डरआधी तुम्ही किंमत निश्चित करता.',
    sachetTitle: 'प्रत्येक डोस, *त्याच्या स्वतःच्या सॅशेमध्ये.*',
    sachetText: 'औषधे दिवसाच्या वेळेनुसार लावली जातात आणि प्रत्येक डोस एका सॅशेमध्ये बंद होतो, ज्यावर नाव, वेळ आणि आतील औषधे लिहिलेली असतात.',
    tear: 'एक फाडा, डोस घ्या.', sachetTabs: 'दिवसाची वेळ निवडा',
    manageTitle: 'प्लॅन बदला किंवा थांबवा',
    manageLead: 'लॉग इन करेपर्यंत उदाहरण दाखवले आहे. थांबवणे लगेच लागू होते.',
    paused: 'थांबवलेला', active: 'सुरू',
    info: 'प्लॅन थांबवलेला असताना कोणतेही पैसे घेतले जात नाहीत. तुम्ही कधीही, कोणत्याही शुल्काशिवाय, रद्द करू शकता.',
    reminders: 'तुमच्या आठवणी पाहा',
  },
};

export default function Subscriptions() {
  const { lang, t } = useLang();
  const { user } = useAuth();
  const tr = useT(T);
  const loc = useLoc();
  const [plans, setPlans] = useState<SamplePlan[]>(SAMPLE_PLANS);
  const toggle = (id: string) => setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, paused: !p.paused } : p)));
  const nice = (d: string) => formatDate(d, lang, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} />
      <PageHeader
        tone="cream"
        image={{ src: '/images/people/grandmother-errand.webp', position: '58% 30%' }}
        title={tr('title')}
        lead={tr('intro')}
        crumbs={[{ label: t('home'), to: '/' }, { label: tr('crumb') }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#plans">{tr('seePlans')} <Icon name="arrow" size={18} /></Button>
          <Button href="#manage" variant="outline">{tr('manageTitle')}</Button>
        </div>
      </PageHeader>

      {/* How it works */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mb-8 md:mb-12 max-w-2xl">
            <h2 className="m-0 text-section"><Accent text={tr('flowTitle')} /></h2>
          </Reveal>
          <Stagger as="ol" className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-0.5 rounded-full bg-mint md:block" />
            {FLOW.map((k, i) => (
              <StaggerItem as="li" key={k} className="relative flex gap-5 md:block">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green font-head text-h3 font-bold text-white ring-8 ring-white md:mb-5">
                  {i + 1}
                </span>
                <span className="grid gap-1">
                  <strong className="font-head text-h3m text-green">{tr(k)}</strong>
                  <span className="text-base text-ink/75">{tr(`${k}d`)}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="section scroll-mt-28">
        <div className="container">
          <Reveal className="mb-8 md:mb-12 max-w-2xl">
            <h2 className="m-0 text-section"><Accent text={tr('plansTitle')} /></h2>
          </Reveal>
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {subscriptionPlans.map((plan) => {
              const p = loc(plan);
              const cta = p.id === 'sachets'
                ? { to: '/subscriptions/dose-sachets', label: tr('howSachets'), variant: 'outline' as const }
                : p.id === 'health-checks'
                  ? { to: '/care/nurse', label: tr('bookCheck'), variant: 'outline' as const }
                  : { to: p.id === 'diapers' ? '/product/adult-diapers-m' : '/shop/medicines', label: tr('startPlan'), variant: 'primary' as const };
              return (
                <StaggerItem as="li" key={p.id}>
                  <article className="group flex h-full flex-col rounded-tile border border-mint bg-white p-6 transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-1 hover:shadow-raised">
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-btn bg-mist text-green"><Icon name={p.icon} size={24} /></span>
                    <h3 className="mb-1 text-h3m">{p.name}</h3>
                    <p className="mb-4 text-base text-grey">{p.often}</p>
                    <ul className="mb-6 grid flex-1 content-start gap-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-base">
                          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-tint text-green"><Icon name="check" size={12} /></span> {pt}
                        </li>
                      ))}
                    </ul>
                    <Button to={cta.to} variant={cta.variant} block>{cta.label} <Icon name="arrow" size={18} /></Button>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
          <p className="mt-6 text-small text-grey">{tr('freqNote')}</p>
        </div>
      </section>

      {/* Dose sachets */}
      <section className="section bg-mist">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="mb-4 text-section"><Accent text={tr('sachetTitle')} /></h2>
            <p className="text-lead text-ink/75">{tr('sachetText')}</p>
            <p className="mb-6 mt-6 font-head text-h2m font-bold text-terracotta-deep">{tr('tear')}</p>
            <Link to="/subscriptions/dose-sachets" className="group inline-flex min-h-tap items-center gap-1.5 font-bold">{tr('howSachets')} <Icon name="arrow" size={18} /></Link>
          </Reveal>
          <Reveal><SachetExplorer /></Reveal>
        </div>
      </section>

      {/* Manage / pause */}
      <section className="section scroll-mt-28 bg-white" id="manage">
        <div className="container">
          <div className="mb-8 md:mb-12 flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <h2 className="mb-4 text-section">{tr('manageTitle')}</h2>
              <p className="m-0 text-lead text-ink/75">{tr('manageLead')}</p>
            </Reveal>
            {/* Reminders belong to the signed-in account, so the link shows only after login */}
            {user && (
              <Reveal>
                <Link to="/notifications" className="group inline-flex min-h-tap items-center gap-2 font-bold">
                  <Icon name="bell" size={18} /> {tr('reminders')} <Icon name="arrow" size={18} />
                </Link>
              </Reveal>
            )}
          </div>
          <Stagger className="grid gap-5 md:grid-cols-2">
            {plans.map((plan) => {
              const p = loc(plan);
              return (
                <StaggerItem key={p.id}>
                  <PlanCard what={p.what} often={p.often} nextDate={nice(p.next)} paused={p.paused} icon={p.icon} onTogglePause={() => toggle(p.id)} />
                </StaggerItem>
              );
            })}
          </Stagger>
          <div role="status" aria-live="polite" className="sr-only">
            {plans.map((p) => `${loc(p).what}: ${p.paused ? tr('paused') : tr('active')}`).join('. ')}
          </div>
          <p className="mt-6 flex items-start gap-3 rounded-tile bg-mist p-5 text-base">
            <Icon name="info" size={20} className="mt-0.5 shrink-0 text-green" /> {tr('info')}
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container"><Reveal className="max-w-3xl"><HelpBox /></Reveal></div>
      </section>
    </>
  );
}
