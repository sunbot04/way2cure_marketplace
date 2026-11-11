import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InfoBand from '../components/ui/InfoBand';
import StepList, { type Step } from '../components/ui/StepList';
import { Field, Input, Select, Textarea, describedBy } from '../components/ui/Field';
import { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { getService, services } from '../data';
import { isServiceablePincode, SITE } from '../config/site';
import { useLang, useLoc, useT, type Dict } from '../i18n/LangContext';
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
          <label key={v} className={`flex min-h-tap cursor-pointer items-center gap-3 rounded-btn border-2 px-4 py-3 ${on ? 'border-green bg-sage-tint' : 'border-mint bg-white hover:border-sage'}`}>
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

  const next = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // TODO: API: POST the booking request to the care team queue.
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };

  const seo = <Seo title={tr('seoTitle', { service: service.name })} description={tr('seoDesc', { service: service.name })} />;

  if (done) {
    return (
      <div className="container py-12 md:py-16">
        {seo}
        <Card className="max-w-2xl" edge="var(--sage)" edgeSide="top" role="status" aria-live="polite">
          <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-sage-tint text-green">
            <Icon name="check" size={36} />
          </span>
          <h1>{tr('doneTitle', { service: lang === 'en' ? service.name.toLowerCase() : service.name })}</h1>
          <p className="text-lead">{tr(f.contactBy === 'whatsapp' ? 'doneWhatsapp' : 'doneCall', { phone: f.phone })}</p>
          <p>{tr('doneCharge')} <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
          <Button to="/">{tr('backHome')}</Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      {seo}
      <PageHeader
        title={service.name}
        lead={service.short}
        crumbs={[{ label: t('home'), to: '/' }, { label: t('care'), to: '/care' }, { label: tr('eyebrow') }]}
      />
      <div className="container py-10">
        <StepList steps={STEPS} current={step} className="mb-10" />
        <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Card as="form" onSubmit={next} noValidate className="grid gap-5">
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
            <div className="flex flex-wrap gap-3 pt-2">
              {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>{tr('back')}</Button>}
              <Button type="submit" variant={step === 3 ? 'urgent' : 'primary'} className="flex-1">
                {step === 3 ? tr('request') : tr('continue')}
              </Button>
            </div>
          </Card>

          <aside className="grid gap-4">
            <Card edge={service.edge} edgeSide="top">
              <h2 className="mb-3 font-body text-h3m md:text-h3">{tr('included')}</h2>
              <ul className="mb-4 grid gap-2">
                {service.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2"><Icon name="check" size={20} className="mt-1 shrink-0 text-sage" /> {i}</li>
                ))}
              </ul>
              <p className="mb-2 flex items-start gap-2 text-base">
                <Icon name="clock" size={18} className="mt-1 shrink-0 text-sage" />
                <span><strong className="text-green">{tr('duration')}</strong> {service.duration}</span>
              </p>
              <p className="mb-2 flex items-start gap-2 text-base">
                <Icon name="userCheck" size={18} className="mt-1 shrink-0 text-sage" /> {tr('bgCheck')}
              </p>
              <p className="m-0 text-small text-grey">{tr('price')}</p>
            </Card>
            {service.specialised && (
              <InfoBand icon="stethoscope">
                <strong>{tr('doctorLed')}</strong> {tr('suitability')}
              </InfoBand>
            )}
            <HelpBox />
          </aside>
        </div>
      </div>
    </>
  );
}
