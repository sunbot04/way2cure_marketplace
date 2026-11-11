import { useState, type FormEvent } from 'react';
import Icon from '../components/Icon';
import PageHeader from '../components/layout/PageHeader';
import Seo, { medicalBusinessLd } from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { Field, Input, Select, describedBy } from '../components/ui/Field';
import { SITE } from '../config/site';
import { useT, type Dict } from '../i18n/LangContext';

// Select options are stored by id so a language switch never breaks the form.
const TOPICS = ['medicines', 'nurse', 'icu', 'equipment', 'subscriptions', 'other'];
const TIMES = ['asap', 'morning', 'afternoon', 'evening'];

const T: Dict = {
  en: {
    seoDesc: "Call Way2Cure 24/7 on +91 74004 00908, WhatsApp us or ask for a call back. Offices in Vashi, Navi Mumbai and Malad East, Mumbai.",
    reach: "Talk to us",
    offices: "Our offices",
    areas: "Home care near you",
    areasText: "Nursing and elder care pages for each area we serve.",
    homeCareIn: "Home care in {place}",
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
    seoDesc: "Way2Cure को 24/7 +91 74004 00908 पर कॉल करें, व्हाट्सऐप करें या कॉल बैक माँगें। वाशी, नवी मुंबई और मालाड ईस्ट, मुंबई में ऑफ़िस।",
    reach: "हमसे बात करें",
    offices: "हमारे ऑफ़िस",
    areas: "आपके पास घर पर देखभाल",
    areasText: "हर इलाके के लिए नर्सिंग और बुज़ुर्गों की देखभाल के पेज।",
    homeCareIn: "{place} में घर पर देखभाल",
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
    seoDesc: "Way2Cure ला 24/7 +91 74004 00908 वर कॉल करा, व्हॉट्सॲप करा किंवा कॉल बॅक मागा. वाशी, नवी मुंबई आणि मालाड पूर्व, मुंबई येथे ऑफिस.",
    reach: "आमच्याशी बोला",
    offices: "आमची ऑफिस",
    areas: "तुमच्या जवळ घरी काळजी",
    areasText: "आम्ही सेवा देत असलेल्या प्रत्येक भागासाठी नर्सिंग आणि ज्येष्ठांच्या काळजीची पाने.",
    homeCareIn: "{place} मध्ये घरी काळजी",
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

type Errors = Partial<Record<'name' | 'phone', string>>;

const channel = 'flex min-h-[72px] items-center gap-4 rounded-card bg-white p-5 text-ink no-underline shadow-card transition-colors hover:bg-cream';

export default function Contact() {
  const tr = useT(T);
  const [f, setF] = useState({ name: '', phone: '', topic: 'medicines', time: 'asap' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!f.name.trim()) er.name = 'errName';
    if (!/^[6-9]\d{9}$/.test(f.phone)) er.phone = 'errPhone';
    setErrors(er);
    // TODO: API: POST /callbacks { name, phone, topic, time }
    if (!Object.keys(er).length) setSent(true);
  };

  // Errors are stored as keys so they show in the current language.
  const err = (k: keyof Errors) => (errors[k] ? tr(errors[k]!) : undefined);

  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} jsonLd={medicalBusinessLd} />
      <PageHeader title={tr('title')} lead={tr('intro')} />

      <div className="container grid items-start gap-10 py-10 md:py-14 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2>{tr('reach')}</h2>
          <ul className="grid gap-3">
            <li>
              <a href={SITE.phoneHref} className={channel}>
                <Icon name="phone" size={32} className="shrink-0 text-terracotta-deep" />
                <span className="grid"><strong className="text-green">{tr('callUs')}</strong><span className="text-lead font-bold">{SITE.phoneDisplay}</span></span>
              </a>
            </li>
            <li>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className={channel}>
                <Icon name="whatsapp" size={32} className="shrink-0 text-green" />
                <span className="grid"><strong className="text-green">{tr('whatsapp')}</strong><span>{tr('whatsappText')}</span></span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={channel}>
                <Icon name="mail" size={32} className="shrink-0 text-green" />
                <span className="grid"><strong className="text-green">{tr('email')}</strong><span className="break-all">{SITE.email}</span></span>
              </a>
            </li>
          </ul>

          <h2 className="mt-12">{tr('offices')}</h2>
          <ul className="grid gap-5">
            {SITE.offices.map((o) => (
              <li key={o.name} className="flex items-start gap-3">
                <Icon name="pin" size={24} className="mt-1 shrink-0 text-terracotta-deep" />
                <address className="not-italic">
                  <strong className="block text-green">{tr(`office:${o.name}`)}</strong>
                  {o.address}
                </address>
              </li>
            ))}
          </ul>

          <h2 className="mt-12">{tr('areas')}</h2>
          <p>{tr('areasText')}</p>
          <ul className="flex flex-wrap gap-x-6">
            {SITE.homeCareLocations.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="inline-flex min-h-tap items-center gap-1.5 font-bold">
                  {tr('homeCareIn', { place: l.name })} <Icon name="external" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card bg-white p-6 shadow-card md:p-8" style={{ borderTop: '5px solid var(--terracotta)' }}>
          <div aria-live="polite">
            {sent && (
              <>
                <h2 className="flex items-center gap-2">
                  <Icon name="check" size={28} className="shrink-0 text-sage" /> {tr('thanks', { name: f.name.trim().split(' ')[0] })}
                </h2>
                <p className="m-0">{tr('willCall', { phone: f.phone, time: tr(`when.${f.time}`) })}</p>
              </>
            )}
          </div>
          {!sent && (
            <form onSubmit={submit} noValidate className="grid gap-5">
              <div>
                <h2 className="mb-2">{tr('formTitle')}</h2>
                <p className="m-0">{tr('formText')}</p>
              </div>
              <Field id="c-name" label={tr('name')} error={err('name')}>
                <Input id="c-name" autoComplete="name" value={f.name} invalid={!!errors.name}
                  aria-describedby={describedBy('c-name', { error: errors.name })}
                  onChange={(e) => setF({ ...f, name: e.target.value })} />
              </Field>
              <Field id="c-phone" label={tr('phone')} error={err('phone')}>
                <Input id="c-phone" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={f.phone} invalid={!!errors.phone}
                  aria-describedby={describedBy('c-phone', { error: errors.phone })}
                  onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '') })} />
              </Field>
              <Field id="c-topic" label={tr('topicLabel')}>
                <Select id="c-topic" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
                  {TOPICS.map((o) => <option key={o} value={o}>{tr(`topic.${o}`)}</option>)}
                </Select>
              </Field>
              <Field id="c-time" label={tr('timeLabel')}>
                <Select id="c-time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}>
                  {TIMES.map((o) => <option key={o} value={o}>{tr(`time.${o}`)}</option>)}
                </Select>
              </Field>
              <Button type="submit" block>{tr('submit')}</Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
