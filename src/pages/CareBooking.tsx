import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import { COPY } from '../components/copy';
import Tag from '../components/ui/Tag';
import Button from '../components/ui/Button';
import { type Step } from '../components/ui/StepList';
import { Field, Input, Select, Textarea, describedBy } from '../components/ui/Field';
import { Reveal } from '../components/motion/Reveal';
import { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { getService, services } from '../data';
import { isServiceablePincode, SITE } from '../config/site';
import { formatDate, useLang, useLoc, useT, type Dict } from '../i18n/LangContext';
import { crossfade, fadeRise } from '../lib/motion';
import NotFound from './NotFound';

// Care booking (guidelines p.8, p.12): four steps, then a request. Nothing is charged online;
// the care team calls or messages back to confirm the staff member, timing and price.

const STEPS: Step[] = [
  {
    title: 'Service', text: 'Who needs care', colour: 'green',
    hi: { title: 'सेवा', text: 'किसे देखभाल चाहिए' },
    mr: { title: 'सेवा', text: 'कोणाला काळजी हवी आहे' },
  },
  {
    title: 'Date & time', text: 'When to start', colour: 'sage',
    hi: { title: 'तारीख और समय', text: 'कब शुरू करें' },
    mr: { title: 'तारीख आणि वेळ', text: 'कधी सुरू करायचे' },
  },
  {
    title: 'Location', text: 'Where to come', colour: 'mustard',
    hi: { title: 'पता', text: 'कहाँ आना है' },
    mr: { title: 'पत्ता', text: 'कुठे यायचे' },
  },
  {
    title: 'Confirm', text: 'We call to confirm', colour: 'terracotta-deep',
    hi: { title: 'पक्का करें', text: 'हम कॉल करके पक्का करेंगे' },
    mr: { title: 'निश्चित करा', text: 'आम्ही कॉल करून निश्चित करू' },
  },
];

// Stored by id so the choice survives a language switch; the label is looked up per language.
const TIMES = ['morning', 'afternoon', 'evening', 'night'];
const RELATIONS = ['parent', 'spouse', 'grandparent', 'child', 'myself', 'other'];

const T: Dict = {
  en: {
    stepOf: 'Step {n} of 4',
    progress: 'Booking steps',
    sending: 'Sending…',
    errSend: 'That did not go through. Nothing was booked. Please try again, or call us on {phone}.',
    summary: 'Your request',
    sPatient: 'Patient', sStart: 'Starts', sWhere: 'Where', sContact: 'We will contact',
    whatNext: 'What happens next',
    next1: 'A care coordinator calls or messages you, usually within 30 minutes during the day.',
    next2: 'You agree the nurse or doctor, the timing and the price together.',
    next3: 'Care begins on the date you chose.',
    seoTitle: 'Book {service}',
    seoDesc: 'Request {service} at home in Mumbai, Navi Mumbai or Thane. Our care team calls you back to confirm the nurse or doctor, timing and price. Nothing is charged until you confirm.',
    bgCheck: 'Every nurse and caretaker is trained and background-checked.',
    eyebrow: 'Book care at home',
    service: 'Service',
    patient: "Patient's name",
    age: 'Age (optional)',
    relationLabel: 'The patient is my',
    parent: 'Parent', spouse: 'Spouse', grandparent: 'Grandparent', child: 'Child', myself: 'Myself', other: 'Other',
    date: 'Start date',
    timeLegend: 'Preferred time',
    morning: 'Morning (8 am to 12 pm)',
    afternoon: 'Afternoon (12 pm to 4 pm)',
    evening: 'Evening (4 pm to 8 pm)',
    night: 'Night shift (8 pm to 8 am)',
    area: 'Address or area',
    pincode: 'Pincode',
    notes: 'Anything we should know? (optional)',
    notesHint: 'For example: recent surgery, medicines, or mobility needs.',
    name: 'Your name',
    phone: 'Your mobile number',
    contactLegend: 'How should we confirm?',
    call: 'Phone call',
    whatsapp: 'WhatsApp',
    back: 'Back',
    continue: 'Continue',
    request: 'Request booking',
    errPatient: "Please add the patient's name.",
    errDate: 'Please choose today or a later date.',
    errArea: 'Please add the area or address.',
    errPincode: 'We serve Mumbai, Navi Mumbai and Thane. Please check the 6-digit pincode.',
    errName: 'Please add your name.',
    errPhone: 'Please enter a 10-digit mobile number.',
    doneTitle: 'Request received for {service}.',
    doneCall: 'Our care team will call you at {phone} to confirm the nurse or doctor, the timing and the price.',
    doneWhatsapp: 'Our care team will message you on WhatsApp at {phone} to confirm the nurse or doctor, the timing and the price.',
    doneCharge: 'Nothing is charged until you confirm. Need us sooner? Call',
    backHome: 'Back to home',
    included: 'What is included',
    duration: 'Typical duration:',
    price: "Price is shared on the confirmation call, after we understand the patient's needs.",
    doctorLed: 'Doctor-led care plan.',
    suitability: 'Suitability is assessed by the treating doctor before care begins.',
  },
  hi: {
    stepOf: 'कदम {n} / 4',
    progress: 'बुकिंग के कदम',
    sending: 'भेज रहे हैं…',
    errSend: 'यह नहीं हो पाया। कोई बुकिंग नहीं हुई। कृपया फिर से कोशिश करें, या हमें {phone} पर कॉल करें।',
    summary: 'आपका अनुरोध',
    sPatient: 'मरीज़', sStart: 'शुरुआत', sWhere: 'कहाँ', sContact: 'हम संपर्क करेंगे',
    whatNext: 'आगे क्या होगा',
    next1: 'केयर कोऑर्डिनेटर आपको कॉल या मैसेज करेंगे, दिन में आमतौर पर 30 मिनट के अंदर।',
    next2: 'आप साथ मिलकर नर्स या डॉक्टर, समय और कीमत तय करते हैं।',
    next3: 'आपकी चुनी तारीख पर देखभाल शुरू होती है।',
    seoTitle: '{service} बुक करें',
    seoDesc: 'मुंबई, नवी मुंबई या ठाणे में घर पर {service} के लिए अनुरोध भेजें। हमारी केयर टीम आपको कॉल करके नर्स या डॉक्टर, समय और कीमत पक्की करती है। पक्का करने तक कोई पैसा नहीं लिया जाता।',
    bgCheck: 'हर नर्स और केयरटेकर प्रशिक्षित है और उसकी बैकग्राउंड जाँच हुई है।',
    eyebrow: 'घर पर देखभाल बुक करें',
    service: 'सेवा',
    patient: 'मरीज़ का नाम',
    age: 'उम्र (ज़रूरी नहीं)',
    relationLabel: 'मरीज़ से आपका रिश्ता',
    parent: 'माता/पिता', spouse: 'पति/पत्नी', grandparent: 'दादा/दादी या नाना/नानी', child: 'बेटा/बेटी', myself: 'मैं खुद', other: 'कोई और',
    date: 'शुरू करने की तारीख',
    timeLegend: 'आपके लिए सही समय',
    morning: 'सुबह (8 बजे से 12 बजे तक)',
    afternoon: 'दोपहर (12 बजे से 4 बजे तक)',
    evening: 'शाम (4 बजे से 8 बजे तक)',
    night: 'रात की शिफ़्ट (रात 8 बजे से सुबह 8 बजे तक)',
    area: 'पता या इलाका',
    pincode: 'पिनकोड',
    notes: 'कुछ और जो हमें पता होना चाहिए? (ज़रूरी नहीं)',
    notesHint: 'जैसे: हाल का ऑपरेशन, दवाइयाँ, या चलने-फिरने में दिक्कत।',
    name: 'आपका नाम',
    phone: 'आपका मोबाइल नंबर',
    contactLegend: 'हम कैसे पक्का करें?',
    call: 'फ़ोन कॉल',
    whatsapp: 'व्हाट्सऐप',
    back: 'पीछे',
    continue: 'आगे बढ़ें',
    request: 'बुकिंग का अनुरोध भेजें',
    errPatient: 'कृपया मरीज़ का नाम लिखें।',
    errDate: 'कृपया आज की या आगे की कोई तारीख चुनें।',
    errArea: 'कृपया इलाका या पता लिखें।',
    errPincode: 'हम मुंबई, नवी मुंबई और ठाणे में सेवा देते हैं। कृपया 6 अंकों का पिनकोड जाँच लें।',
    errName: 'कृपया अपना नाम लिखें।',
    errPhone: 'कृपया 10 अंकों का मोबाइल नंबर लिखें।',
    doneTitle: '{service} के लिए आपका अनुरोध मिल गया है।',
    doneCall: 'हमारी केयर टीम आपको {phone} पर कॉल करेगी और नर्स या डॉक्टर, समय और कीमत पक्की करेगी।',
    doneWhatsapp: 'हमारी केयर टीम आपको {phone} पर व्हाट्सऐप मैसेज करेगी और नर्स या डॉक्टर, समय और कीमत पक्की करेगी।',
    doneCharge: 'आपके पक्का करने तक कोई पैसा नहीं लिया जाएगा। जल्दी चाहिए? कॉल करें',
    backHome: 'होम पर वापस जाएँ',
    included: 'इसमें क्या शामिल है',
    duration: 'आमतौर पर कितना समय:',
    price: 'मरीज़ की ज़रूरत समझने के बाद, कीमत कन्फ़र्मेशन कॉल पर बताई जाती है।',
    doctorLed: 'डॉक्टर की बनाई केयर योजना।',
    suitability: 'देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।',
  },
  mr: {
    stepOf: 'पायरी {n} / 4',
    progress: 'बुकिंगच्या पायऱ्या',
    sending: 'पाठवत आहोत…',
    errSend: 'हे झाले नाही. कोणतेही बुकिंग झालेले नाही. कृपया पुन्हा प्रयत्न करा, किंवा आम्हाला {phone} वर कॉल करा.',
    summary: 'तुमची विनंती',
    sPatient: 'रुग्ण', sStart: 'सुरुवात', sWhere: 'कुठे', sContact: 'आम्ही संपर्क करू',
    whatNext: 'पुढे काय होईल',
    next1: 'केअर कोऑर्डिनेटर तुम्हाला कॉल किंवा मेसेज करतील, दिवसा साधारण 30 मिनिटांत.',
    next2: 'तुम्ही मिळून नर्स किंवा डॉक्टर, वेळ आणि किंमत ठरवता.',
    next3: 'तुम्ही निवडलेल्या तारखेला काळजी सुरू होते.',
    seoTitle: '{service} बुक करा',
    seoDesc: 'मुंबई, नवी मुंबई किंवा ठाणे येथे घरी {service} साठी विनंती पाठवा. आमची केअर टीम तुम्हाला कॉल करून नर्स किंवा डॉक्टर, वेळ आणि किंमत निश्चित करते. तुम्ही निश्चित करेपर्यंत कोणतेही पैसे घेतले जात नाहीत.',
    bgCheck: 'प्रत्येक नर्स आणि केअरटेकर प्रशिक्षित आहे आणि त्यांची पार्श्वभूमी तपासलेली आहे.',
    eyebrow: 'घरी काळजी बुक करा',
    service: 'सेवा',
    patient: 'रुग्णाचे नाव',
    age: 'वय (आवश्यक नाही)',
    relationLabel: 'रुग्णाशी तुमचे नाते',
    parent: 'आई/वडील', spouse: 'पती/पत्नी', grandparent: 'आजी/आजोबा', child: 'मुलगा/मुलगी', myself: 'मी स्वतः', other: 'इतर',
    date: 'सुरू करण्याची तारीख',
    timeLegend: 'तुमच्यासाठी सोयीची वेळ',
    morning: 'सकाळ (8 ते 12)',
    afternoon: 'दुपार (12 ते 4)',
    evening: 'संध्याकाळ (4 ते 8)',
    night: 'रात्रीची शिफ्ट (रात्री 8 ते सकाळी 8)',
    area: 'पत्ता किंवा परिसर',
    pincode: 'पिनकोड',
    notes: 'आम्हाला आणखी काही माहीत असावे का? (आवश्यक नाही)',
    notesHint: 'उदा.: नुकतीच झालेली शस्त्रक्रिया, औषधे, किंवा चालण्या-फिरण्यातील अडचण.',
    name: 'तुमचे नाव',
    phone: 'तुमचा मोबाइल नंबर',
    contactLegend: 'आम्ही कसे निश्चित करू?',
    call: 'फोन कॉल',
    whatsapp: 'व्हॉट्सॲप',
    back: 'मागे',
    continue: 'पुढे चला',
    request: 'बुकिंगची विनंती पाठवा',
    errPatient: 'कृपया रुग्णाचे नाव लिहा.',
    errDate: 'कृपया आजची किंवा पुढची तारीख निवडा.',
    errArea: 'कृपया परिसर किंवा पत्ता लिहा.',
    errPincode: 'आम्ही मुंबई, नवी मुंबई आणि ठाणे येथे सेवा देतो. कृपया 6 अंकी पिनकोड तपासा.',
    errName: 'कृपया तुमचे नाव लिहा.',
    errPhone: 'कृपया 10 अंकी मोबाइल नंबर लिहा.',
    doneTitle: '{service} साठी तुमची विनंती मिळाली आहे.',
    doneCall: 'आमची केअर टीम तुम्हाला {phone} वर कॉल करेल आणि नर्स किंवा डॉक्टर, वेळ आणि किंमत निश्चित करेल.',
    doneWhatsapp: 'आमची केअर टीम तुम्हाला {phone} वर व्हॉट्सॲप मेसेज करेल आणि नर्स किंवा डॉक्टर, वेळ आणि किंमत निश्चित करेल.',
    doneCharge: 'तुम्ही निश्चित करेपर्यंत कोणतेही पैसे घेतले जाणार नाहीत. लवकर हवे आहे? कॉल करा',
    backHome: 'मुख्यपृष्ठावर परत जा',
    included: 'यात काय समाविष्ट आहे',
    duration: 'साधारण कालावधी:',
    price: 'रुग्णाची गरज समजून घेतल्यानंतर, किंमत निश्चितीच्या कॉलवर सांगितली जाते.',
    doctorLed: 'डॉक्टरांनी आखलेली काळजी योजना.',
    suitability: 'काळजी सुरू होण्यापूर्वी, उपचार करणारे डॉक्टर ती रुग्णासाठी योग्य आहे का ते ठरवतात.',
  },
};

const today = () => new Date().toISOString().slice(0, 10);

interface Form {
  service: string; patient: string; age: string; relation: string; date: string; time: string;
  area: string; pincode: string; name: string; phone: string; contactBy: string; notes: string;
}

// Large radio "option" rows: whole row is the tap target, selection shown by border and tick, not colour alone.
function Options({ name, legend, values, value, label, onChange }: {
  name: keyof Form; legend: string; values: string[]; value: string; label: (v: string) => string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1.5 font-bold text-green">{legend}</legend>
      {values.map((v) => {
        const on = value === v;
        return (
          <label key={v} className={`flex min-h-tap cursor-pointer items-center gap-3 rounded-tile border-2 px-4 py-3 transition-colors duration-micro ${on ? 'border-green bg-mist' : 'border-line bg-white hover:border-sage'}`}>
            <input type="radio" name={name} value={v} checked={on} onChange={onChange} className="h-5 w-5 shrink-0 accent-green" />
            <span className={on ? 'font-bold text-green' : ''}>{label(v)}</span>
            {on && <Icon name="check" size={20} className="ml-auto text-green" />}
          </label>
        );
      })}
    </fieldset>
  );
}

export default function CareBooking() {
  const { serviceId = '' } = useParams();
  const { lang, t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const initial = getService(serviceId);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [f, setF] = useState<Form>({
    service: serviceId, patient: '', age: '', relation: 'parent', date: today(), time: TIMES[0],
    area: '', pincode: '', name: '', phone: '', contactBy: 'call', notes: '',
  });

  if (!initial) return <NotFound />;
  const service = loc(getService(f.service) ?? initial);
  const set = (k: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((x) => ({ ...x, [k]: e.target.value }));
  const digits = (k: keyof Form) => (e: ChangeEvent<HTMLInputElement>) =>
    setF((x) => ({ ...x, [k]: e.target.value.replace(/\D/g, '') }));

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (step === 0 && !f.patient.trim()) e.patient = 'errPatient';
    if (step === 1 && f.date < today()) e.date = 'errDate';
    if (step === 2) {
      if (!f.area.trim()) e.area = 'errArea';
      if (!isServiceablePincode(f.pincode)) e.pincode = 'errPincode';
    }
    if (step === 3) {
      if (!f.name.trim()) e.name = 'errName';
      if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'errPhone';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };
  // Errors are stored as keys, so they show in the current language even after a switch.
  const err = (k: keyof Form) => (errors[k] ? tr(errors[k]!) : undefined);
  const aria = (k: keyof Form, hint = false) => ({ 'aria-describedby': describedBy(k, { hint, error: errors[k] }), invalid: !!errors[k] });

  const next = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (step < 3) { setStep(step + 1); return; }
    setSending(true);
    setSendError(false);
    try {
      await sendRequest(f);
      setDone(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const seo = <Seo title={tr('seoTitle', { service: service.name })} description={tr('seoDesc', { service: service.name })} />;

  if (done) {
    const rows: [string, string][] = [
      [tr('service'), service.name],
      [tr('sPatient'), f.patient + (f.age ? `, ${f.age}` : '')],
      [tr('sStart'), `${formatDate(f.date, lang, { day: 'numeric', month: 'long' })} · ${tr(f.time)}`],
      [tr('sWhere'), `${f.area}, ${f.pincode}`],
      [tr('sContact'), `${f.contactBy === 'whatsapp' ? tr('whatsapp') : tr('call')} · ${f.phone}`],
    ];
    return (
      <section className="section">
        {seo}
        <div className="container grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <m.div initial="hidden" animate="show" variants={fadeRise} role="status" aria-live="polite">
            <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-sage text-white shadow-raised">
              <Icon name="check" size={34} />
            </span>
            <h1 className="mb-4 text-section">{tr('doneTitle', { service: lang === 'en' ? service.name.toLowerCase() : service.name })}</h1>
            <p className="text-lead text-ink/80">{tr(f.contactBy === 'whatsapp' ? 'doneWhatsapp' : 'doneCall', { phone: f.phone })}</p>
            <h2 className="mb-4 mt-10 text-h3m md:text-h3">{tr('whatNext')}</h2>
            <ol className="mb-8 grid gap-4">
              {['next1', 'next2', 'next3'].map((k, i) => (
                <li key={k} className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green font-bold text-white">{i + 1}</span>
                  <span className="pt-1">{tr(k)}</span>
                </li>
              ))}
            </ol>
            <p>{tr('doneCharge')} <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
            <Button to="/">{tr('backHome')} <Icon name="arrow" size={18} /></Button>
          </m.div>
          <Reveal className="rounded-panel bg-white p-6 shadow-card md:p-8">
            <h2 className="mb-4 text-h3m md:text-h3">{tr('summary')}</h2>
            <dl className="m-0 grid gap-3">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-0.5 border-b border-line pb-3 last:border-0 last:pb-0">
                  <dt className="text-small text-grey">{k}</dt>
                  <dd className="m-0 font-bold text-green">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      {seo}
      <PageHeader
        tone="mist"
        title={service.name}
        lead={service.short}
        crumbs={[{ label: t('home'), to: '/' }, { label: t('care'), to: '/care' }, { label: tr('eyebrow') }]}
      />
      <section className="pb-20 pt-10 md:pb-28">
        <div className="container grid items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <Reveal className="rounded-panel bg-white p-6 shadow-card md:p-9">
            {/* Step indicator: four labelled steps and a line that fills as you go */}
            <nav aria-label={tr('progress')} className="mb-8">
              <ol className="relative grid grid-cols-4 gap-2">
                <span aria-hidden="true" className="absolute left-5 right-5 top-5 h-0.5 rounded-full bg-mint sm:left-[12.5%] sm:right-[12.5%]" />
                <span
                  aria-hidden="true"
                  className="absolute left-5 right-5 top-5 h-0.5 origin-left rounded-full bg-terracotta-deep transition-transform duration-slow ease-soft sm:left-[12.5%] sm:right-[12.5%]"
                  style={{ transform: `scaleX(${step / (STEPS.length - 1)})` }}
                />
                {STEPS.map(loc).map((st, i) => {
                  const state = i < step ? 'done' : i === step ? 'current' : 'todo';
                  return (
                    <li key={i} aria-current={state === 'current' ? 'step' : undefined} className="relative grid justify-items-start gap-2 sm:justify-items-center">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full border-2 font-bold transition-colors duration-slow ${
                          state === 'todo' ? 'border-mint bg-white text-grey' : 'border-green bg-green text-white'
                        }`}
                      >
                        {state === 'done' ? <Icon name="check" size={18} /> : i + 1}
                      </span>
                      <span className={`hidden text-center text-small font-bold sm:block ${state === 'todo' ? 'text-grey' : 'text-green'}`}>{st.title}</span>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <form onSubmit={next} noValidate className="grid gap-5">
              <div>
                <p className="mb-1 text-small font-semibold text-terracotta-deep">{tr('stepOf', { n: step + 1 })}</p>
                <h2 className="m-0 text-h3m md:text-h3">{loc(STEPS[step]).title} <span className="font-normal text-grey">· {loc(STEPS[step]).text}</span></h2>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={step} {...crossfade} className="grid gap-5">
                  {step === 0 && (
                    <>
                      <Field id="service" label={tr('service')}>
                        <Select id="service" value={f.service} onChange={set('service')}>
                          {services.map((s) => <option key={s.id} value={s.id}>{loc(s).name}</option>)}
                        </Select>
                      </Field>
                      <Field id="patient" label={tr('patient')} error={err('patient')}>
                        <Input id="patient" value={f.patient} onChange={set('patient')} {...aria('patient')} />
                      </Field>
                      <div className="grid gap-5 sm:grid-cols-[1fr_2fr]">
                        <Field id="age" label={tr('age')}>
                          <Input id="age" inputMode="numeric" maxLength={3} value={f.age} onChange={digits('age')} />
                        </Field>
                        <Field id="relation" label={tr('relationLabel')}>
                          <Select id="relation" value={f.relation} onChange={set('relation')}>
                            {RELATIONS.map((r) => <option key={r} value={r}>{tr(r)}</option>)}
                          </Select>
                        </Field>
                      </div>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <Field id="date" label={tr('date')} error={err('date')}>
                        <Input id="date" type="date" min={today()} value={f.date} onChange={set('date')} {...aria('date')} />
                      </Field>
                      <Options name="time" legend={tr('timeLegend')} values={TIMES} value={f.time} label={tr} onChange={set('time')} />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <Field id="area" label={tr('area')} error={err('area')}>
                        <Input id="area" autoComplete="street-address" value={f.area} onChange={set('area')} {...aria('area')} />
                      </Field>
                      <Field id="pincode" label={tr('pincode')} error={err('pincode')}>
                        <Input id="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={f.pincode} onChange={digits('pincode')} {...aria('pincode')} />
                      </Field>
                      <Field id="notes" label={tr('notes')} hint={tr('notesHint')}>
                        <Textarea id="notes" rows={3} value={f.notes} onChange={set('notes')} aria-describedby={describedBy('notes', { hint: true })} />
                      </Field>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <Field id="name" label={tr('name')} error={err('name')}>
                        <Input id="name" autoComplete="name" value={f.name} onChange={set('name')} {...aria('name')} />
                      </Field>
                      <Field id="phone" label={tr('phone')} error={err('phone')}>
                        <Input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={f.phone} onChange={digits('phone')} {...aria('phone')} />
                      </Field>
                      <Options name="contactBy" legend={tr('contactLegend')} values={['call', 'whatsapp']} value={f.contactBy} label={tr} onChange={set('contactBy')} />
                    </>
                  )}
                </m.div>
              </AnimatePresence>
              {sendError && (
                <p role="alert" className="m-0 flex items-start gap-2 rounded-tile bg-terracotta-deep/10 p-4 text-base font-bold text-terracotta-deep">
                  <Icon name="warning" size={20} className="mt-0.5 shrink-0" /> {tr('errSend', { phone: SITE.phone })}
                </p>
              )}
              <div className="flex flex-wrap gap-3 border-t border-line pt-6">
                {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)} disabled={sending}>{tr('back')}</Button>}
                <Button type="submit" variant={step === 3 ? 'urgent' : 'primary'} className="flex-1" disabled={sending} aria-busy={sending}>
                  {sending ? tr('sending') : step === 3 ? tr('request') : tr('continue')}
                  {!sending && <Icon name="arrow" size={18} />}
                </Button>
              </div>
            </form>
          </Reveal>

          <aside className="grid gap-5">
            <Reveal className="overflow-hidden rounded-panel bg-white shadow-card">
              {service.image && (
                <img src={service.image} alt="" width={1200} height={800} loading="lazy" className="fade-card aspect-[16/9] w-full object-cover" />
              )}
              <div className={`p-6 ${service.image ? '-mt-6 pt-0' : ''}`}>
                <h2 className="relative mb-3 text-h3m md:text-h3">{tr('included')}</h2>
                <ul className="mb-5 grid gap-2.5">
                  {service.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-tint text-green"><Icon name="check" size={14} /></span> {i}
                    </li>
                  ))}
                </ul>
                <div className="grid gap-2 rounded-tile bg-mist/70 p-4 text-base">
                  <p className="m-0 flex items-start gap-2">
                    <Icon name="clock" size={18} className="mt-1 shrink-0 text-green" />
                    <span><strong className="text-green">{tr('duration')}</strong> {service.duration}</span>
                  </p>
                  <p className="m-0 flex items-start gap-2">
                    <Icon name="userCheck" size={18} className="mt-1 shrink-0 text-green" /> {tr('bgCheck')}
                  </p>
                </div>
                <p className="mb-0 mt-4 text-small text-grey">{tr('price')}</p>
              </div>
            </Reveal>
            {service.related === '/safe-zone' && <Reveal><BandPanel /></Reveal>}
            {service.specialised && (
              <Reveal className="flex items-start gap-3 rounded-tile border border-mint bg-white p-5 text-base">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name="stethoscope" size={20} /></span>
                <span className="pt-1"><strong className="text-green">{tr('doctorLed')}</strong> {tr('suitability')}</span>
              </Reveal>
            )}
            <Reveal><HelpBox /></Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

/** TODO: API: POST the booking request to the care team queue. Throws if it does not go through. */
async function sendRequest(_form: Form): Promise<void> {
  return Promise.resolve();
}

/** Dementia care: the Safe-zone band, explained where families book. */
function BandPanel() {
  const tc = useT(COPY);
  return (
    <section aria-labelledby="band" className="rounded-panel bg-green p-6 text-white shadow-card">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-mustard"><Icon name="watch" size={22} /></span>
        <h2 id="band" className="m-0 font-body text-h3m text-white md:text-h3">{tc('bandTitle')}</h2>
        <Tag kind="launch">{tc('bandSoon')}</Tag>
      </div>
      <p className="text-base text-mint">{tc('bandText')}</p>
      <ul className="mb-5 grid gap-2 text-base">
        {(['bandP1', 'bandP2', 'bandP3', 'bandP4'] as const).map((k) => (
          <li key={k} className="flex items-start gap-2"><Icon name="check" size={18} className="mt-1 shrink-0 text-mustard" /> {tc(k)}</li>
        ))}
      </ul>
      <Link to="/safe-zone" className="group inline-flex min-h-[2.75rem] items-center gap-2 font-bold text-white">
        {tc('bandMore')} <Icon name="arrow" size={18} />
      </Link>
    </section>
  );
}
