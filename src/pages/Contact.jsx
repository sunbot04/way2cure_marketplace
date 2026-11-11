import { useState } from 'react';
import Icon from '../components/Icon';
import { Field, PageHead } from '../components/legacy-ui';
import { SITE } from '../config/site';
import { useT } from '../i18n/LangContext';

// Select options are stored by id so a language switch never breaks the form.
const TOPICS = ['medicines', 'nurse', 'icu', 'equipment', 'subscriptions', 'other'];
const TIMES = ['asap', 'morning', 'afternoon', 'evening'];

const T = {
  en: {
    eyebrow: 'Contact',
    title: "We're family, not just care",
    intro: 'Call, WhatsApp or ask us to call you. We can place an order or book care for you over the phone.',
    callUs: 'Call us, 24/7',
    whatsapp: 'WhatsApp',
    whatsappText: 'Message us any time',
    email: 'Email',
    'office:Head office (Vashi)': 'Head office (Vashi)',
    'office:Mumbai branch (Malad East)': 'Mumbai branch (Malad East)',
    thanks: 'Thank you, {name}.',
    willCall: 'We will call you on {phone} ({time}).',
    formTitle: 'Call me back',
    formText: 'Leave your number. A care advisor will call you.',
    name: 'Your name',
    phone: 'Mobile number',
    topicLabel: 'How can we help?',
    timeLabel: 'When should we call?',
    submit: 'Call me back',
    errName: 'Please add your name.',
    errPhone: 'Please enter a 10-digit mobile number.',
    'topic.medicines': 'Order medicines for me',
    'topic.nurse': 'Book a nurse or doctor',
    'topic.icu': 'ICU or specialised care',
    'topic.equipment': 'Rent equipment',
    'topic.subscriptions': 'Subscriptions',
    'topic.other': 'Something else',
    'time.asap': 'As soon as possible',
    'time.morning': 'Morning',
    'time.afternoon': 'Afternoon',
    'time.evening': 'Evening',
    'when.asap': 'as soon as possible',
    'when.morning': 'in the morning',
    'when.afternoon': 'in the afternoon',
    'when.evening': 'in the evening',
  },
  hi: {
    eyebrow: 'संपर्क',
    title: 'हम सिर्फ़ देखभाल नहीं, परिवार हैं',
    intro: 'कॉल करें, व्हाट्सऐप करें या हमें कॉल करने को कहें। हम फ़ोन पर ही आपके लिए ऑर्डर कर सकते हैं या देखभाल बुक कर सकते हैं।',
    callUs: 'कॉल करें, 24/7',
    whatsapp: 'व्हाट्सऐप',
    whatsappText: 'कभी भी मैसेज करें',
    email: 'ईमेल',
    'office:Head office (Vashi)': 'मुख्य ऑफ़िस (वाशी)',
    'office:Mumbai branch (Malad East)': 'मुंबई ब्रांच (मालाड ईस्ट)',
    thanks: 'धन्यवाद, {name}।',
    willCall: 'हम आपको {phone} पर {time} कॉल करेंगे।',
    formTitle: 'मुझे वापस कॉल करें',
    formText: 'अपना नंबर दें। हमारे केयर सलाहकार आपको कॉल करेंगे।',
    name: 'आपका नाम',
    phone: 'मोबाइल नंबर',
    topicLabel: 'हम आपकी क्या मदद करें?',
    timeLabel: 'हम कब कॉल करें?',
    submit: 'मुझे वापस कॉल करें',
    errName: 'कृपया अपना नाम लिखें।',
    errPhone: 'कृपया 10 अंकों का मोबाइल नंबर लिखें।',
    'topic.medicines': 'मेरे लिए दवाइयाँ मँगाएँ',
    'topic.nurse': 'नर्स या डॉक्टर बुक करें',
    'topic.icu': 'आईसीयू या ख़ास देखभाल',
    'topic.equipment': 'उपकरण किराए पर लें',
    'topic.subscriptions': 'सब्सक्रिप्शन',
    'topic.other': 'कुछ और',
    'time.asap': 'जितनी जल्दी हो सके',
    'time.morning': 'सुबह',
    'time.afternoon': 'दोपहर',
    'time.evening': 'शाम',
    'when.asap': 'जितनी जल्दी हो सके',
    'when.morning': 'सुबह',
    'when.afternoon': 'दोपहर में',
    'when.evening': 'शाम को',
  },
  mr: {
    eyebrow: 'संपर्क',
    title: 'आम्ही फक्त काळजी नाही, कुटुंब आहोत',
    intro: 'कॉल करा, व्हॉट्सॲप करा किंवा आम्हाला कॉल करायला सांगा. आम्ही फोनवरच तुमच्यासाठी ऑर्डर करू शकतो किंवा काळजी बुक करू शकतो.',
    callUs: 'कॉल करा, 24/7',
    whatsapp: 'व्हॉट्सॲप',
    whatsappText: 'कधीही मेसेज करा',
    email: 'ईमेल',
    'office:Head office (Vashi)': 'मुख्य ऑफिस (वाशी)',
    'office:Mumbai branch (Malad East)': 'मुंबई शाखा (मालाड पूर्व)',
    thanks: 'धन्यवाद, {name}.',
    willCall: 'आम्ही तुम्हाला {phone} वर {time} कॉल करू.',
    formTitle: 'मला परत कॉल करा',
    formText: 'तुमचा नंबर द्या. आमचे केअर सल्लागार तुम्हाला कॉल करतील.',
    name: 'तुमचे नाव',
    phone: 'मोबाइल नंबर',
    topicLabel: 'आम्ही कशी मदत करू?',
    timeLabel: 'आम्ही कधी कॉल करू?',
    submit: 'मला परत कॉल करा',
    errName: 'कृपया तुमचे नाव लिहा.',
    errPhone: 'कृपया 10 अंकी मोबाइल नंबर लिहा.',
    'topic.medicines': 'माझ्यासाठी औषधे मागवा',
    'topic.nurse': 'नर्स किंवा डॉक्टर बुक करा',
    'topic.icu': 'आयसीयू किंवा विशेष काळजी',
    'topic.equipment': 'उपकरणे भाड्याने घ्या',
    'topic.subscriptions': 'सदस्यता',
    'topic.other': 'आणखी काही',
    'time.asap': 'शक्य तितक्या लवकर',
    'time.morning': 'सकाळ',
    'time.afternoon': 'दुपार',
    'time.evening': 'संध्याकाळ',
    'when.asap': 'शक्य तितक्या लवकर',
    'when.morning': 'सकाळी',
    'when.afternoon': 'दुपारी',
    'when.evening': 'संध्याकाळी',
  },
};

export default function Contact() {
  const tr = useT(T);
  const [f, setF] = useState({ name: '', phone: '', topic: 'medicines', time: 'asap' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'errName';
    if (!/^[6-9]\d{9}$/.test(f.phone)) er.phone = 'errPhone';
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  };

  // Errors are stored as keys so they show in the current language.
  const err = (k) => (errors[k] ? tr(errors[k]) : undefined);

  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>
      <div className="container section-sm two-col">
        <div className="stack">
          <a href={SITE.phoneHref} className="card contact-card">
            <Icon name="phone" size={32} />
            <span><strong>{tr('callUs')}</strong><span>{SITE.phoneDisplay}</span></span>
          </a>
          <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="card contact-card">
            <Icon name="whatsapp" size={32} />
            <span><strong>{tr('whatsapp')}</strong><span>{tr('whatsappText')}</span></span>
          </a>
          <a href={`mailto:${SITE.email}`} className="card contact-card">
            <Icon name="mail" size={32} />
            <span><strong>{tr('email')}</strong><span>{SITE.email}</span></span>
          </a>
          {SITE.offices.map((o) => (
            <div key={o.name} className="card contact-card">
              <Icon name="pin" size={32} />
              <span><strong>{tr(`office:${o.name}`)}</strong><span>{o.address}</span></span>
            </div>
          ))}
        </div>

        <div className="card form-card">
          {sent ? (
            <div role="status">
              <h2 className="h3"><Icon name="check" /> {tr('thanks', { name: f.name.trim().split(' ')[0] })}</h2>
              <p>{tr('willCall', { phone: f.phone, time: tr(`when.${f.time}`) })}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 className="h3">{tr('formTitle')}</h2>
              <p>{tr('formText')}</p>
              <Field id="c-name" label={tr('name')} error={err('name')}>
                <input id="c-name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-invalid={!!errors.name} />
              </Field>
              <Field id="c-phone" label={tr('phone')} error={err('phone')}>
                <input id="c-phone" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '') })} aria-invalid={!!errors.phone} />
              </Field>
              <label className="select-label">{tr('topicLabel')}
                <select value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
                  {TOPICS.map((o) => <option key={o} value={o}>{tr(`topic.${o}`)}</option>)}
                </select>
              </label>
              <label className="select-label">{tr('timeLabel')}
                <select value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}>
                  {TIMES.map((o) => <option key={o} value={o}>{tr(`time.${o}`)}</option>)}
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-block">{tr('submit')}</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
