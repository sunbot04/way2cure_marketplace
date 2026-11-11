import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { getService, services } from '../data/services.js';
import { Field, InfoBand, PageHead, Steps, HelpBox } from '../components/ui.jsx';
import { isServiceablePincode, SITE } from '../config/site.js';
import { useLang, useLoc, useT } from '../context/LangContext.jsx';
import NotFound from './NotFound.jsx';

const STEPS = [
  {
    title: 'Service', text: 'Who needs care', color: 'var(--green)',
    hi: { title: 'सेवा', text: 'किसे देखभाल चाहिए' },
    mr: { title: 'सेवा', text: 'कोणाला काळजी हवी आहे' },
  },
  {
    title: 'Date & time', text: 'When to start', color: 'var(--sage)',
    hi: { title: 'तारीख और समय', text: 'कब शुरू करें' },
    mr: { title: 'तारीख आणि वेळ', text: 'कधी सुरू करायचे' },
  },
  {
    title: 'Location', text: 'Where to come', color: 'var(--mustard)',
    hi: { title: 'पता', text: 'कहाँ आना है' },
    mr: { title: 'पत्ता', text: 'कुठे यायचे' },
  },
  {
    title: 'Confirm', text: 'We call to confirm', color: 'var(--terracotta-deep)',
    hi: { title: 'पक्का करें', text: 'हम कॉल करके पक्का करेंगे' },
    mr: { title: 'निश्चित करा', text: 'आम्ही कॉल करून निश्चित करू' },
  },
];

// Stored by id so the choice survives a language switch; the label is looked up per language.
const TIMES = ['morning', 'afternoon', 'evening', 'night'];
const RELATIONS = ['parent', 'spouse', 'grandparent', 'child', 'myself', 'other'];

const T = {
  en: {
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

export default function CareBooking() {
  const { serviceId } = useParams();
  const { lang } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const initial = getService(serviceId);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [f, setF] = useState({
    service: serviceId, patient: '', age: '', relation: 'parent', date: today(), time: TIMES[0],
    area: '', pincode: '', name: '', phone: '', contactBy: 'call', notes: '',
  });

  if (!initial) return <NotFound />;
  const service = loc(getService(f.service));
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  const validate = () => {
    const e = {};
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
  const err = (k) => (errors[k] ? tr(errors[k]) : undefined);

  const next = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="container section">
        <div className="card confirm">
          <span className="confirm-icon"><Icon name="check" size={40} /></span>
          <h1>{tr('doneTitle', { service: lang === 'en' ? service.name.toLowerCase() : service.name })}</h1>
          <p className="lead">
            {tr(f.contactBy === 'whatsapp' ? 'doneWhatsapp' : 'doneCall', { phone: f.phone })}
          </p>
          <p>{tr('doneCharge')} <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
          <Link to="/" className="btn btn-primary">{tr('backHome')}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={service.name}>
        <p>{service.short}</p>
      </PageHead>
      <div className="container section-sm">
        <Steps steps={STEPS} current={step} />
        <div className="checkout-layout">
          <form className="card form-card" onSubmit={next} noValidate>
            {step === 0 && (
              <>
                <label className="select-label">{tr('service')}
                  <select value={f.service} onChange={set('service')}>
                    {services.map((s) => <option key={s.id} value={s.id}>{loc(s).name}</option>)}
                  </select>
                </label>
                <Field id="patient" label={tr('patient')} error={err('patient')}>
                  <input id="patient" value={f.patient} onChange={set('patient')} aria-invalid={!!errors.patient} />
                </Field>
                <div className="field-row">
                  <Field id="age" label={tr('age')}>
                    <input id="age" inputMode="numeric" maxLength={3} value={f.age} onChange={set('age')} />
                  </Field>
                  <label className="select-label">{tr('relationLabel')}
                    <select value={f.relation} onChange={set('relation')}>
                      {RELATIONS.map((r) => <option key={r} value={r}>{tr(r)}</option>)}
                    </select>
                  </label>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <Field id="date" label={tr('date')} error={err('date')}>
                  <input id="date" type="date" min={today()} value={f.date} onChange={set('date')} aria-invalid={!!errors.date} />
                </Field>
                <fieldset className="option-group">
                  <legend>{tr('timeLegend')}</legend>
                  {TIMES.map((t) => (
                    <label key={t} className={`option${f.time === t ? ' selected' : ''}`}>
                      <input type="radio" name="time" value={t} checked={f.time === t} onChange={set('time')} />
                      <span><strong>{tr(t)}</strong></span>
                    </label>
                  ))}
                </fieldset>
              </>
            )}
            {step === 2 && (
              <>
                <Field id="area" label={tr('area')} error={err('area')}>
                  <input id="area" autoComplete="street-address" value={f.area} onChange={set('area')} aria-invalid={!!errors.area} />
                </Field>
                <Field id="pincode" label={tr('pincode')} error={err('pincode')}>
                  <input id="pincode" inputMode="numeric" maxLength={6} value={f.pincode} onChange={(e) => setF((x) => ({ ...x, pincode: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.pincode} />
                </Field>
                <Field id="notes" label={tr('notes')} hint={tr('notesHint')}>
                  <textarea id="notes" rows={3} value={f.notes} onChange={set('notes')} />
                </Field>
              </>
            )}
            {step === 3 && (
              <>
                <Field id="name" label={tr('name')} error={err('name')}>
                  <input id="name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} />
                </Field>
                <Field id="phone" label={tr('phone')} error={err('phone')}>
                  <input id="phone" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={f.phone} onChange={(e) => setF((x) => ({ ...x, phone: e.target.value.replace(/\D/g, '') }))} aria-invalid={!!errors.phone} />
                </Field>
                <fieldset className="option-group">
                  <legend>{tr('contactLegend')}</legend>
                  {['call', 'whatsapp'].map((v) => (
                    <label key={v} className={`option${f.contactBy === v ? ' selected' : ''}`}>
                      <input type="radio" name="contactBy" value={v} checked={f.contactBy === v} onChange={set('contactBy')} />
                      <span><strong>{tr(v)}</strong></span>
                    </label>
                  ))}
                </fieldset>
              </>
            )}
            <div className="form-actions">
              {step > 0 && <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>{tr('back')}</button>}
              <button type="submit" className={`btn grow ${step === 3 ? 'btn-urgent' : 'btn-primary'}`}>
                {step === 3 ? tr('request') : tr('continue')}
              </button>
            </div>
          </form>

          <aside className="stack">
            <div className="card card-edge-top included" style={{ '--edge': service.edge }}>
              <h2 className="h3">{tr('included')}</h2>
              <ul className="check-list">
                {service.includes.map((i) => <li key={i}><Icon name="check" /> {i}</li>)}
              </ul>
              <p><Icon name="clock" size={18} /> <strong>{tr('duration')}</strong> {service.duration}</p>
              <p className="small muted">{tr('price')}</p>
            </div>
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
