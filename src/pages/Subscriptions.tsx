import { useState } from 'react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InfoBand from '../components/ui/InfoBand';
import SectionHeading from '../components/ui/SectionHeading';
import StepList, { type Step } from '../components/ui/StepList';
import PlanCard from '../components/plans/PlanCard';
import { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { subscriptionPlans } from '../data';
import { formatDate, useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

// Subscriptions (guidelines p.8, p.10): what you get, how it runs, and manage / pause in plain view.

// Example plans so families can see how "manage / pause" works.
// TODO: API: the signed-in family's plans from the account API.
interface SamplePlanText { what: string; often: string }
type SamplePlan = SamplePlanText & { id: string; next: string; paused: boolean; hi?: Partial<SamplePlanText>; mr?: Partial<SamplePlanText> };
const SAMPLE_PLANS: SamplePlan[] = [
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

const EDGES = ['var(--sage)', 'var(--terracotta)'];
const FLOW_COLOURS: Step['colour'][] = ['green', 'sage', 'mustard', 'terracotta-deep'];

const T: Dict = {
  en: {
    seoTitle: 'Medicine and care subscriptions',
    seoDesc: 'Monthly medicines, adult diapers, dose sachets and regular home health checks, scheduled for you with a reminder before every order. Pause or change anytime.',
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
    seoTitle: 'दवाइयों और देखभाल के सब्सक्रिप्शन',
    seoDesc: 'हर महीने की दवाइयाँ, बड़ों के डायपर, डोज़ सैशे और घर पर नियमित स्वास्थ्य जाँच, आपके लिए तय समय पर, हर ऑर्डर से पहले रिमाइंडर के साथ। जब चाहें रोकें या बदलें।',
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
    seoTitle: 'औषधे आणि काळजीची सदस्यता',
    seoDesc: 'दरमहा औषधे, प्रौढांसाठी डायपर, डोस सॅशे आणि घरी नियमित आरोग्य तपासणी, तुमच्यासाठी ठरलेल्या वेळी, प्रत्येक ऑर्डरआधी आठवणीसह. कधीही थांबवा किंवा बदला.',
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
  const { lang, t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const [plans, setPlans] = useState<SamplePlan[]>(SAMPLE_PLANS);
  const toggle = (id: string) => setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, paused: !p.paused } : p)));
  const nice = (d: string) => formatDate(d, lang, { day: 'numeric', month: 'long', year: 'numeric' });
  const flow: Step[] = ['flow1', 'flow2', 'flow3', 'flow4'].map((k, i) => ({ title: tr(k), colour: FLOW_COLOURS[i] }));

  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} />
      <PageHeader tone="green" title={tr('title')} lead={tr('intro')} crumbs={[{ label: t('home'), to: '/' }, { label: tr('eyebrow') }]}>
        <Button variant="light" href="#manage">{tr('manageTitle')}</Button>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container">
          <SectionHeading title={tr('flowLabel')} />
          <StepList steps={flow} />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subscriptionPlans.map((plan) => {
              const p = loc(plan);
              return (
                <Card key={p.id} as="article" edge={p.edge} edgeSide="top" className="flex flex-col">
                  <Icon name={p.icon} size={32} className="mb-3 text-terracotta-deep" />
                  <h3 className="mb-1">{p.name}</h3>
                  <p className="mb-4 text-base text-grey">{p.often}</p>
                  <ul className="mb-6 grid flex-1 content-start gap-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-base"><Icon name="check" size={18} className="mt-1 shrink-0 text-sage" /> {pt}</li>
                    ))}
                  </ul>
                  {p.id === 'sachets' ? (
                    <Button to="/subscriptions/dose-sachets" variant="outline" block>{tr('howSachets')}</Button>
                  ) : p.id === 'health-checks' ? (
                    <Button to="/care/nurse" variant="urgent" block>{tr('bookCheck')}</Button>
                  ) : (
                    <Button to={p.id === 'diapers' ? '/product/adult-diapers-m' : '/shop/medicines'} block>{tr('startPlan')}</Button>
                  )}
                </Card>
              );
            })}
          </div>
          <p className="mt-4 text-small text-grey">{tr('freqNote')}</p>
        </div>
      </section>

      <section className="scroll-mt-28 bg-white py-12 md:py-16" id="manage">
        <div className="container">
          <SectionHeading title={tr('manageTitle')} lead={tr('manageLead')} />
          <div className="grid gap-5 md:grid-cols-2">
            {plans.map((plan, i) => {
              const p = loc(plan);
              return (
                <PlanCard key={p.id} what={p.what} often={p.often} nextDate={nice(p.next)} paused={p.paused}
                  edge={EDGES[i % EDGES.length]} onTogglePause={() => toggle(p.id)} />
              );
            })}
          </div>
          <div role="status" aria-live="polite" className="sr-only">
            {plans.map((p) => `${loc(p).what}: ${p.paused ? tr('paused') : tr('active')}`).join('. ')}
          </div>
          <InfoBand className="mt-6">{tr('info')}</InfoBand>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container"><div className="max-w-3xl"><HelpBox /></div></div>
      </section>
    </>
  );
}
