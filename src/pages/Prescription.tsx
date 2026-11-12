import { useState } from 'react';
import { m } from 'motion/react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent, { Eyebrow } from '../components/ui/Accent';
import { Field, Input } from '../components/ui/Field';
import AppPanel, { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import RxStory from '../components/home/RxStory';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { RX_STEPS } from '../data/rxSteps';
import { SITE } from '../config/site';
import { VIEWPORT, tReveal } from '../lib/motion';
import { useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

// Prescription orders (guidelines p.8, p.10, p.11). Upload happens in the app only (pitch deck
// p.10); this page explains the flow (scroll-linked story, as on the homepage) and shows how the
// AI-read list and order tracking look. "AI assists, pharmacist decides" wherever AI reads a
// prescription.

const T: Dict = {
  en: {
    titleAccent: 'Upload your prescription. *A pharmacist checks it.*',
    aiTitleAccent: 'AI assists, _pharmacist decides._',
    howLead: 'Four steps from your prescription to your door. If anything is unclear, the pharmacist calls you before packing.',
    getApp: 'Get the app', callOrder: 'Call {phone} to order',
    appTitle: 'Upload in the Way2Cure app',
    tryEyebrow: 'Inside the app', tryTitle: 'You check the list. *We keep you posted.*',
    knowEyebrow: 'Rules we follow',
    emptyList: 'You removed every medicine from the example.', resetList: 'Show the example again',
    seoTitle: 'Upload a prescription',
    seoDesc: 'Upload your prescription in the Way2Cure app. AI lists the medicines, a registered pharmacist verifies every order, and we deliver in Mumbai, Navi Mumbai and Thane.',
    eyebrow: 'Prescription orders',
    title: 'Upload your prescription in the app',
    intro: 'Snap a photo of your prescription. We list the medicines, you confirm, and a registered pharmacist checks every order before it leaves the pharmacy.',
    aiTitle: 'AI assists, pharmacist decides.',
    aiText: 'Our system reads the prescription to save you typing. A registered pharmacist always makes the final check.',
    howItWorks: 'How it works',
    checkTitle: 'You check the list first',
    checkText: 'After you upload, the app shows the medicines it found. Fix anything that looks wrong before you confirm. This example shows how the list looks.',
    medicinesFound: 'Medicines found',
    example: 'Example',
    medicine: 'Medicine',
    howOften: 'How often',
    howLong: 'For how long',
    done: 'Done',
    edit: 'Edit',
    remove: 'Remove',
    editAria: 'Edit {name}',
    removeAria: 'Remove {name}',
    unclear: 'Unclear? The pharmacist will call you before packing.',
    followTitle: 'Follow every step',
    followText: 'You get SMS and WhatsApp updates at each stage. Family members can follow the same order.',
    order: 'Order {id}',
    goodToKnow: 'Good to know',
    know1: 'Prescription medicines are sold only with a valid prescription.',
    know2: "Schedule H and H1 medicines need a valid doctor's prescription.",
    know3: 'We do not sell Schedule X drugs or narcotics.',
    know4: 'Your prescription is used only for your order. We never share it without your consent.',
    s0: 'Uploaded', s1: 'List confirmed', s2: 'Pharmacist checked', s3: 'Out for delivery', s4: 'Delivered',
  },
  hi: {
    titleAccent: 'अपना पर्चा अपलोड करें। *फ़ार्मासिस्ट उसे जाँचेंगे।*',
    aiTitleAccent: 'AI मदद करता है, _फ़ैसला फ़ार्मासिस्ट करते हैं।_',
    howLead: 'आपके पर्चे से आपके दरवाज़े तक चार कदम। कुछ भी साफ़ न हो तो पैक करने से पहले फ़ार्मासिस्ट आपको कॉल करते हैं।',
    getApp: 'ऐप पाएँ', callOrder: 'ऑर्डर के लिए {phone} पर कॉल करें',
    appTitle: 'Way2Cure ऐप में अपलोड करें',
    tryEyebrow: 'ऐप के अंदर', tryTitle: 'लिस्ट आप जाँचते हैं। *हर अपडेट हम देते हैं।*',
    knowEyebrow: 'हम ये नियम मानते हैं',
    emptyList: 'आपने उदाहरण से सभी दवाइयाँ हटा दीं।', resetList: 'उदाहरण फिर से दिखाएँ',
    seoTitle: 'पर्चा अपलोड करें',
    seoDesc: 'Way2Cure ऐप में अपना पर्चा अपलोड करें। AI दवाइयों की लिस्ट बनाता है, हर ऑर्डर को रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं, और हम मुंबई, नवी मुंबई और ठाणे में डिलिवरी करते हैं।',
    eyebrow: 'पर्चे वाले ऑर्डर',
    title: 'ऐप में अपना पर्चा अपलोड करें',
    intro: 'अपने पर्चे की फ़ोटो लें। हम दवाइयों की लिस्ट बनाते हैं, आप उसे कन्फ़र्म करते हैं, और फ़ार्मेसी से निकलने से पहले हर ऑर्डर को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    aiTitle: 'AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।',
    aiText: 'हमारा सिस्टम पर्चा पढ़ लेता है, ताकि आपको टाइप न करना पड़े। आख़िरी जाँच हमेशा एक रजिस्टर्ड फ़ार्मासिस्ट ही करते हैं।',
    howItWorks: 'यह कैसे काम करता है',
    checkTitle: 'पहले आप लिस्ट देख लें',
    checkText: 'अपलोड के बाद ऐप पर्चे में मिली दवाइयाँ दिखाता है। कन्फ़र्म करने से पहले जो भी गलत लगे, उसे ठीक कर दें। यह उदाहरण दिखाता है कि लिस्ट कैसी दिखती है।',
    medicinesFound: 'मिली हुई दवाइयाँ',
    example: 'उदाहरण',
    medicine: 'दवा',
    howOften: 'कितनी बार',
    howLong: 'कितने दिन',
    done: 'हो गया',
    edit: 'बदलें',
    remove: 'हटाएँ',
    editAria: '{name} बदलें',
    removeAria: '{name} हटाएँ',
    unclear: 'कुछ साफ़ नहीं है? पैक करने से पहले फ़ार्मासिस्ट आपको कॉल करेंगे।',
    followTitle: 'हर कदम पर नज़र रखें',
    followText: 'हर चरण पर आपको SMS और व्हाट्सऐप पर अपडेट मिलते हैं। परिवार के सदस्य भी वही ऑर्डर देख सकते हैं।',
    order: 'ऑर्डर {id}',
    goodToKnow: 'ये बातें जान लें',
    know1: 'पर्चे वाली दवाइयाँ सिर्फ़ वैध पर्चे पर ही मिलती हैं।',
    know2: 'शेड्यूल H और H1 दवाइयों के लिए डॉक्टर का वैध पर्चा ज़रूरी है।',
    know3: 'हम शेड्यूल X दवाइयाँ या नशीली दवाइयाँ नहीं बेचते।',
    know4: 'आपका पर्चा सिर्फ़ आपके ऑर्डर के लिए इस्तेमाल होता है। आपकी मंज़ूरी के बिना हम इसे कभी किसी से शेयर नहीं करते।',
    s0: 'अपलोड हुआ', s1: 'लिस्ट कन्फ़र्म', s2: 'फ़ार्मासिस्ट ने जाँचा', s3: 'डिलिवरी के लिए निकला', s4: 'पहुँच गया',
  },
  mr: {
    titleAccent: 'तुमचे प्रिस्क्रिप्शन अपलोड करा. *फार्मासिस्ट ते तपासतील.*',
    aiTitleAccent: 'AI मदत करते, _निर्णय फार्मासिस्ट घेतात._',
    howLead: 'तुमच्या प्रिस्क्रिप्शनपासून तुमच्या दारापर्यंत चार पायऱ्या. काही अस्पष्ट असल्यास पॅक करण्यापूर्वी फार्मासिस्ट तुम्हाला कॉल करतात.',
    getApp: 'ॲप मिळवा', callOrder: 'ऑर्डरसाठी {phone} वर कॉल करा',
    appTitle: 'Way2Cure ॲपमध्ये अपलोड करा',
    tryEyebrow: 'ॲपच्या आत', tryTitle: 'यादी तुम्ही तपासता. *प्रत्येक अपडेट आम्ही देतो.*',
    knowEyebrow: 'आम्ही हे नियम पाळतो',
    emptyList: 'तुम्ही उदाहरणातील सर्व औषधे काढली.', resetList: 'उदाहरण पुन्हा दाखवा',
    seoTitle: 'प्रिस्क्रिप्शन अपलोड करा',
    seoDesc: 'Way2Cure ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा. AI औषधांची यादी करते, प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात, आणि आम्ही मुंबई, नवी मुंबई आणि ठाणे येथे डिलिव्हरी करतो.',
    eyebrow: 'प्रिस्क्रिप्शनच्या ऑर्डर',
    title: 'ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा',
    intro: 'तुमच्या प्रिस्क्रिप्शनचा फोटो काढा. आम्ही औषधांची यादी करतो, तुम्ही ती निश्चित करता, आणि फार्मसीमधून निघण्यापूर्वी प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात.',
    aiTitle: 'AI मदत करते, निर्णय फार्मासिस्ट घेतात.',
    aiText: 'तुम्हाला टाइप करावे लागू नये म्हणून आमची सिस्टम प्रिस्क्रिप्शन वाचते. शेवटची तपासणी नेहमी नोंदणीकृत फार्मासिस्टच करतात.',
    howItWorks: 'हे कसे चालते',
    checkTitle: 'आधी तुम्ही यादी तपासा',
    checkText: 'अपलोड केल्यावर ॲप सापडलेली औषधे दाखवते. निश्चित करण्यापूर्वी काही चुकीचे वाटले तर ते दुरुस्त करा. यादी कशी दिसते ते हे उदाहरण दाखवते.',
    medicinesFound: 'सापडलेली औषधे',
    example: 'उदाहरण',
    medicine: 'औषध',
    howOften: 'किती वेळा',
    howLong: 'किती दिवस',
    done: 'झाले',
    edit: 'बदला',
    remove: 'काढा',
    editAria: '{name} बदला',
    removeAria: '{name} काढा',
    unclear: 'काही स्पष्ट नाही? पॅक करण्यापूर्वी फार्मासिस्ट तुम्हाला कॉल करतील.',
    followTitle: 'प्रत्येक टप्पा पाहा',
    followText: 'प्रत्येक टप्प्यावर तुम्हाला SMS आणि व्हॉट्सॲपवर अपडेट मिळतात. कुटुंबातील सदस्यही तीच ऑर्डर पाहू शकतात.',
    order: 'ऑर्डर {id}',
    goodToKnow: 'हे लक्षात ठेवा',
    know1: 'प्रिस्क्रिप्शनची औषधे फक्त वैध प्रिस्क्रिप्शनवरच मिळतात.',
    know2: 'शेड्यूल H आणि H1 औषधांसाठी डॉक्टरांचे वैध प्रिस्क्रिप्शन लागते.',
    know3: 'आम्ही शेड्यूल X औषधे किंवा अंमली पदार्थ विकत नाही.',
    know4: 'तुमचे प्रिस्क्रिप्शन फक्त तुमच्या ऑर्डरसाठी वापरले जाते. तुमच्या संमतीशिवाय आम्ही ते कधीही कोणाला देत नाही.',
    s0: 'अपलोड झाले', s1: 'यादी निश्चित', s2: 'फार्मासिस्टने तपासले', s3: 'डिलिव्हरीसाठी निघाले', s4: 'पोहोचले',
  },
};

// Illustrative example from the proposal. The real list comes from the app after upload.
// TODO: API: medicines read from the uploaded prescription.
// Drug names stay as written on the prescription; dose and duration are localised.
interface RxLineText { name: string; dose: string; days: string }
type RxLine = RxLineText & { id: number; hi?: Partial<RxLineText>; mr?: Partial<RxLineText> };
const SAMPLE: RxLine[] = [
  { id: 1, name: 'Metformin 500 mg', dose: 'Twice daily', days: '30 days',
    hi: { dose: 'दिन में दो बार', days: '30 दिन' }, mr: { dose: 'दिवसातून दोनदा', days: '30 दिवस' } },
  { id: 2, name: 'Amlodipine 5 mg', dose: 'Once daily', days: '30 days',
    hi: { dose: 'दिन में एक बार', days: '30 दिन' }, mr: { dose: 'दिवसातून एकदा', days: '30 दिवस' } },
  { id: 3, name: 'Vitamin D3', dose: 'Once weekly', days: '8 weeks',
    hi: { dose: 'हफ़्ते में एक बार', days: '8 हफ़्ते' }, mr: { dose: 'आठवड्यातून एकदा', days: '8 आठवडे' } },
];

const STATUS = ['s0', 's1', 's2', 's3', 's4'];
const CURRENT = 2;

const KNOW = [['rx', 'know1'], ['verified', 'know2'], ['warning', 'know3'], ['lock', 'know4']] as const;

export default function Prescription() {
  const { t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const [list, setList] = useState<RxLine[]>(SAMPLE);
  const [editing, setEditing] = useState<number | null>(null);

  // Once a field is edited by hand, the typed text replaces the translations in every language.
  const update = (id: number, key: keyof RxLineText, value: string) =>
    setList((l) => l.map((x) => (x.id === id ? { ...x, [key]: value, hi: { ...x.hi, [key]: value }, mr: { ...x.mr, [key]: value } } : x)));

  const actionBtn = 'inline-flex min-h-tap items-center gap-1.5 rounded-btn px-3 font-bold text-terracotta-deep transition-colors duration-micro hover:bg-mist';

  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} />
      <PageHeader
        eyebrow={tr('eyebrow')}
        title={tr('titleAccent')}
        lead={tr('intro')}
        crumbs={[{ label: t('home'), to: '/' }, { label: tr('eyebrow') }]}
      >
        <div className="grid gap-5">
          <p className="m-0 flex items-start gap-2 text-base font-semibold text-terracotta-deep">
            <Icon name="rx" size={18} className="mt-0.5 shrink-0" /> {tr('know1')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#get-app"><Icon name="phoneApp" size={20} /> {tr('getApp')}</Button>
            <Button href={SITE.phoneHref} variant="outline"><Icon name="phone" size={20} /> {tr('callOrder', { phone: SITE.phone })}</Button>
          </div>
        </div>
      </PageHeader>

      {/* App-only upload */}
      <section id="get-app" className="bg-white py-14 lg:py-20">
        <div className="container grid items-start gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <Reveal><AppPanel title={tr('appTitle')} headingLevel={2} /></Reveal>
          <div className="grid gap-6">
            <Reveal className="rounded-panel bg-mist p-6">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-btn bg-white text-green"><Icon name="sparkles" size={22} /></span>
              <h2 className="mb-2 font-body text-h3m md:text-h3">{tr('aiTitle')}</h2>
              <p className="m-0 text-ink/80">{tr('aiText')}</p>
            </Reveal>
            <Reveal><HelpBox /></Reveal>
          </div>
        </div>
      </section>

      {/* How it works: pinned scroll story on desktop, stepper on phones */}
      <section className="section bg-mist">
        <div className="container">
          <RxStory
            steps={RX_STEPS.map(loc)}
            heading={
              <Reveal>
                <Eyebrow>{tr('howItWorks')}</Eyebrow>
                <h2 className="mb-4 text-section"><Accent text={tr('aiTitleAccent')} /></h2>
                <p className="m-0 text-lead text-ink/75">{tr('howLead')}</p>
              </Reveal>
            }
          />
        </div>
      </section>

      {/* Inside the app: the editable AI-read list and the order tracker */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow>{tr('tryEyebrow')}</Eyebrow>
            <h2 className="m-0 text-section"><Accent text={tr('tryTitle')} /></h2>
          </Reveal>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <Reveal className="grid gap-4">
              <div>
                <h3 className="mb-1">{tr('checkTitle')}</h3>
                <p className="m-0 text-ink/80">{tr('checkText')}</p>
              </div>
              <div className="overflow-hidden rounded-panel bg-white shadow-card">
                <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <strong className="flex items-center gap-2 text-green"><Icon name="sparkles" size={18} className="text-mustard" /> {tr('medicinesFound')}</strong>
                  <span className="rounded-full bg-mist px-2.5 py-0.5 text-small font-semibold text-grey">{tr('example')}</span>
                </div>
                {list.length ? (
                  <ul className="divide-y divide-line" aria-live="polite">
                    {list.map((item) => {
                      const x = loc(item);
                      return (
                        <li key={x.id} className="px-5 py-4">
                          {editing === x.id ? (
                            <div className="grid gap-3">
                              <Field id={`rx-${x.id}-name`} label={tr('medicine')}>
                                <Input id={`rx-${x.id}-name`} value={x.name} onChange={(e) => update(x.id, 'name', e.target.value)} />
                              </Field>
                              <div className="grid gap-3 sm:grid-cols-2">
                                <Field id={`rx-${x.id}-dose`} label={tr('howOften')}>
                                  <Input id={`rx-${x.id}-dose`} value={x.dose} onChange={(e) => update(x.id, 'dose', e.target.value)} />
                                </Field>
                                <Field id={`rx-${x.id}-days`} label={tr('howLong')}>
                                  <Input id={`rx-${x.id}-days`} value={x.days} onChange={(e) => update(x.id, 'days', e.target.value)} />
                                </Field>
                              </div>
                              <div><Button compact onClick={() => setEditing(null)}><Icon name="check" size={18} /> {tr('done')}</Button></div>
                            </div>
                          ) : (
                            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                              <div className="flex items-center gap-3">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name="pill" size={18} /></span>
                                <span className="grid">
                                  <strong className="text-green">{x.name}</strong>
                                  <span className="text-base text-grey">{x.dose} · {x.days}</span>
                                </span>
                              </div>
                              <div className="flex gap-1">
                                <button type="button" className={actionBtn} aria-label={tr('editAria', { name: x.name })} onClick={() => setEditing(x.id)}>
                                  <Icon name="edit" size={18} /> {tr('edit')}
                                </button>
                                <button type="button" className={actionBtn} aria-label={tr('removeAria', { name: x.name })} onClick={() => setList((l) => l.filter((y) => y.id !== x.id))}>
                                  <Icon name="trash" size={18} /> {tr('remove')}
                                </button>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="grid justify-items-start gap-3 px-5 py-6" aria-live="polite">
                    <p className="m-0 text-ink/80">{tr('emptyList')}</p>
                    <Button compact variant="outline" onClick={() => setList(SAMPLE)}><Icon name="refresh" size={18} /> {tr('resetList')}</Button>
                  </div>
                )}
                <p className="m-0 flex items-start gap-2 border-t border-line bg-cream/60 px-5 py-4 text-base text-ink/80">
                  <Icon name="phone" size={18} className="mt-1 shrink-0 text-terracotta-deep" /> {tr('unclear')}
                </p>
              </div>
            </Reveal>

            <Reveal className="grid gap-4">
              <div>
                <h3 className="mb-1">{tr('followTitle')}</h3>
                <p className="m-0 text-ink/80">{tr('followText')}</p>
              </div>
              <div className="rounded-panel bg-white p-6 shadow-card">
                <p className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-green">{tr('order', { id: 'W2C204518' })}</strong>
                  <span className="rounded-full bg-mist px-2.5 py-0.5 text-small font-semibold text-grey">{tr('example')}</span>
                </p>
                <div
                  className="relative mb-6 h-2 overflow-hidden rounded-full bg-mint"
                  role="progressbar" aria-label={tr('order', { id: 'W2C204518' })} aria-valuemin={0} aria-valuemax={STATUS.length - 1} aria-valuenow={CURRENT} aria-valuetext={tr(STATUS[CURRENT])}
                >
                  <m.span
                    className="absolute inset-0 origin-left rounded-full bg-sage"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: CURRENT / (STATUS.length - 1) }}
                    viewport={VIEWPORT}
                    transition={tReveal}
                  />
                </div>
                <Stagger as="ol" className="grid gap-3">
                  {STATUS.map((st, i) => (
                    <StaggerItem as="li" key={st} className={`flex items-center gap-3 ${i <= CURRENT ? 'font-bold text-green' : 'text-grey'}`}>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${i < CURRENT ? 'bg-sage text-white' : i === CURRENT ? 'bg-green text-white' : 'bg-mist text-grey'}`}>
                        <Icon name={i <= CURRENT ? 'check' : 'clock'} size={18} />
                      </span>
                      {tr(st)}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rules we follow (guidelines p.11) */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mb-10 max-w-2xl">
            <Eyebrow>{tr('knowEyebrow')}</Eyebrow>
            <h2 className="m-0 text-section">{tr('goodToKnow')}</h2>
          </Reveal>
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {KNOW.map(([icon, k]) => (
              <StaggerItem as="li" key={k} className="rounded-tile border border-mint bg-white p-6">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-btn bg-mist text-green"><Icon name={icon} size={22} /></span>
                <p className="m-0 text-base text-ink">{tr(k)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
