import { useState, type FormEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import CardArrow from '../components/ui/CardArrow';
import PageHeader from '../components/layout/PageHeader';
import Seo, { medicalBusinessLd } from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Accent from '../components/ui/Accent';
import { Field, Input, Select, describedBy } from '../components/ui/Field';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { SITE } from '../config/site';
import { crossfade } from '../lib/motion';
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
    areasText: "Our nurses and caretakers visit homes across Mumbai, Navi Mumbai and Thane, including Vashi and Airoli.",
    callLabel: 'Call us', callSub: 'Talk to a care advisor now', chip247: 'Open 24/7', chipEmail: 'Reply in 1 working day',
    callCta: 'Call now', waCta: 'Open WhatsApp', mailCta: 'Write to us',
    eyebrow: 'Contact',
    title: "We're family, *not just care.*",
    open247: 'Phone and WhatsApp are answered 24/7, every day of the year.',
    emailText: 'We reply within one working day.',
    directions: 'Get directions',
    checkOne: 'Please check the field marked below.',
    checkMany: 'Please check the {n} fields marked below.',
    another: 'Send another request',
    formNote: 'We use your number only to call you back about this request.',
    whatsappNow: 'Prefer to chat? Message us on WhatsApp',
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
    areasText: "हमारी नर्स और केयरटेकर पूरे मुंबई, नवी मुंबई और ठाणे में घरों पर आते हैं, वाशी और ऐरोली सहित।",
    callLabel: 'कॉल करें', callSub: 'अभी केयर सलाहकार से बात करें', chip247: '24/7 खुला', chipEmail: '1 कामकाजी दिन में जवाब',
    callCta: 'अभी कॉल करें', waCta: 'व्हाट्सऐप खोलें', mailCta: 'हमें लिखें',
    eyebrow: 'संपर्क',
    title: 'हम सिर्फ़ देखभाल नहीं, *परिवार हैं।*',
    open247: 'फ़ोन और व्हाट्सऐप पर 24/7, साल के हर दिन जवाब मिलता है।',
    emailText: 'हम एक कामकाजी दिन में जवाब देते हैं।',
    directions: 'रास्ता देखें',
    checkOne: 'कृपया नीचे निशान लगी जानकारी जाँचें।',
    checkMany: 'कृपया नीचे निशान लगी {n} जानकारियाँ जाँचें।',
    another: 'एक और अनुरोध भेजें',
    formNote: 'हम आपका नंबर सिर्फ़ इसी अनुरोध के बारे में वापस कॉल करने के लिए इस्तेमाल करते हैं।',
    whatsappNow: 'चैट करना पसंद है? हमें व्हाट्सऐप पर मैसेज करें',
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
    areasText: "आमच्या नर्स आणि केअरटेकर संपूर्ण मुंबई, नवी मुंबई आणि ठाणे येथे घरी येतात, वाशी आणि ऐरोलीसह.",
    callLabel: 'कॉल करा', callSub: 'आत्ताच केअर सल्लागाराशी बोला', chip247: '24/7 सुरू', chipEmail: '1 कामकाजाच्या दिवसात उत्तर',
    callCta: 'आत्ता कॉल करा', waCta: 'व्हॉट्सॲप उघडा', mailCta: 'आम्हाला लिहा',
    eyebrow: 'संपर्क',
    title: 'आम्ही फक्त काळजी नाही, *कुटुंब आहोत.*',
    open247: 'फोन आणि व्हॉट्सॲपवर 24/7, वर्षाच्या प्रत्येक दिवशी उत्तर मिळते.',
    emailText: 'आम्ही एका कामकाजाच्या दिवसात उत्तर देतो.',
    directions: 'रस्ता पाहा',
    checkOne: 'कृपया खाली खूण केलेली माहिती तपासा.',
    checkMany: 'कृपया खाली खूण केलेल्या {n} माहिती तपासा.',
    another: 'आणखी एक विनंती पाठवा',
    formNote: 'आम्ही तुमचा नंबर फक्त या विनंतीबद्दल परत कॉल करण्यासाठी वापरतो.',
    whatsappNow: 'चॅट करायला आवडते? आम्हाला व्हॉट्सॲपवर मेसेज करा',
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

const channel =
  'group flex w-full flex-col rounded-[1.75rem] border border-line bg-white p-2.5 text-ink no-underline shadow-card transition-[transform,box-shadow,border-color] duration-slow ease-soft hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_44px_-24px_rgb(38_52_69/0.5)]';

// The three ways to reach us. Phone and WhatsApp are answered 24/7 (see open247).
const CHANNELS = [
  { id: 'call', href: SITE.phoneHref, external: false, icon: 'phone', value: SITE.phoneDisplay, label: 'callLabel', sub: 'callSub', chip: 'chip247', cta: 'callCta',
    stage: 'bg-[linear-gradient(160deg,#FDF0F2,#FFF8F9)]', ring: 'border-terracotta-deep/15', tile: 'bg-terracotta-deep', dot: 'bg-terracotta-deep' },
  { id: 'whatsapp', href: SITE.whatsappHref, external: true, icon: 'whatsapp', value: SITE.phoneDisplay, label: 'whatsapp', sub: 'whatsappText', chip: 'chip247', cta: 'waCta',
    stage: 'bg-[linear-gradient(160deg,#E6F6EC,#F5FBF7)]', ring: 'border-whatsapp/20', tile: 'bg-whatsapp', dot: 'bg-whatsapp' },
  { id: 'email', href: `mailto:${SITE.email}`, external: false, icon: 'mail', value: SITE.email, label: 'email', sub: 'emailText', chip: 'chipEmail', cta: 'mailCta',
    stage: 'bg-[linear-gradient(160deg,#E7F0FA,#F5F9FD)]', ring: 'border-sage/20', tile: 'bg-sage', dot: 'bg-sage' },
] as const;

const mapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function Contact() {
  const tr = useT(T);
  const empty = { name: '', phone: '', topic: 'medicines', time: 'asap' };
  const [f, setF] = useState(empty);
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
  const nErrors = Object.keys(errors).length;

  return (
    <>
      <Seo title={tr('eyebrow')} description={tr('seoDesc')} jsonLd={medicalBusinessLd} />
      <PageHeader title={tr('title')} lead={tr('intro')}>
        <p className="m-0 flex items-center gap-2 text-base font-semibold text-green">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sage-tint"><Icon name="clock" size={15} /></span>
          {tr('open247')}
        </p>
      </PageHeader>

      {/* Three ways to reach us */}
      <section className="bg-white py-8 lg:py-12">
        <div className="container">
          <h2 className="sr-only">{tr('reach')}</h2>
          <Stagger as="ul" className="grid gap-4 md:grid-cols-3 md:gap-5">
            {CHANNELS.map((c) => (
              <StaggerItem as="li" key={c.id} className="flex">
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})} className={channel}>
                  {/* Colour stage: the channel's icon on a white tile, with rings and its availability */}
                  <span aria-hidden="true" className={`relative grid h-40 place-items-center overflow-hidden rounded-[1.375rem] ${c.stage}`}>
                    <span className={`absolute h-56 w-56 rounded-full border ${c.ring}`} />
                    <span className={`absolute h-40 w-40 rounded-full border border-dashed ${c.ring}`} />
                    <span className={`relative -mt-7 grid h-16 w-16 place-items-center rounded-2xl text-white shadow-raised transition-transform duration-slow ease-soft group-hover:scale-105 ${c.tile}`}>
                      <Icon name={c.icon} size={30} />
                    </span>
                    <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-small font-bold text-green shadow-card">
                      <span className={`h-2 w-2 rounded-full ${c.dot}`} /> {tr(c.chip)}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <strong className="mb-1 text-base text-grey">{tr(c.label)}</strong>
                    <span className={c.id === 'email' ? 'break-all font-head text-h3m font-bold text-ink md:text-[1.35rem]' : 'font-head text-h2m font-bold text-ink'}>{c.value}</span>
                    <span className="mt-1 text-base text-grey">{tr(c.sub)}</span>
                    <span className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                      <span className="font-bold text-green">{tr(c.cta)}</span>
                      <CardArrow size="sm" />
                    </span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="grid gap-14">
            {/* Offices */}
            <div>
              <Reveal>
                <h2 className="mb-6 text-section">{tr('offices')}</h2>
              </Reveal>
              <Stagger as="ul" className="grid gap-4">
                {SITE.offices.map((o) => (
                  <StaggerItem as="li" key={o.name} className="flex items-start gap-4 rounded-panel bg-white p-5 shadow-card">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name="pin" size={22} /></span>
                    <div className="grid gap-1">
                      <address className="not-italic">
                        <strong className="block text-green">{tr(`office:${o.name}`)}</strong>
                        <span className="text-ink/80">{o.address}</span>
                      </address>
                      <a href={mapsUrl(o.address)} target="_blank" rel="noreferrer" className="group inline-flex min-h-[2.75rem] items-center gap-1.5 self-start font-bold">
                        {tr('directions')} <Icon name="external" size={16} />
                      </a>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Home care areas: the areas named in one line (no buttons: they all led to the same page) */}
            <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-line bg-[linear-gradient(120deg,#FFFFFF_0%,#F1F5F9_55%,#E7F0FA_100%)] p-6 shadow-card md:p-8">
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-8 text-sage/10"><Icon name="pin" size={180} /></span>
              <h2 className="relative mb-3 text-h2m md:text-h2">{tr('areas')}</h2>
              <p className="relative m-0 text-lead text-ink/75">{tr('areasText')}</p>
            </Reveal>
          </div>

          {/* Call-back form */}
          <Reveal className="rounded-panel bg-white p-6 shadow-raised md:p-8 lg:sticky lg:top-28">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <m.div key="sent" {...crossfade} role="status" className="grid justify-items-start gap-4 py-4">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-sage text-white"><Icon name="check" size={28} /></span>
                  <h2 className="m-0 text-section"><Accent text={`*${tr('thanks', { name: f.name.trim().split(' ')[0] })}*`} /></h2>
                  <p className="m-0 text-lead text-ink/80">{tr('willCall', { phone: f.phone, time: tr(`when.${f.time}`) })}</p>
                  <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="group inline-flex min-h-tap items-center gap-2 font-bold">
                    <Icon name="whatsapp" size={20} /> {tr('whatsappNow')} <Icon name="arrow" size={16} />
                  </a>
                  <Button variant="outline" compact onClick={() => { setF(empty); setSent(false); }}>{tr('another')}</Button>
                </m.div>
              ) : (
                <m.form key="form" {...crossfade} onSubmit={submit} noValidate className="grid gap-5">
                  <div>
                    <h2 className="mb-2 text-section">{tr('formTitle')}</h2>
                    <p className="m-0 text-ink/80">{tr('formText')}</p>
                  </div>
                  <p aria-live="polite" className="m-0 empty:hidden">
                    {nErrors > 0 && (
                      <span className="flex items-center gap-2 rounded-btn bg-terracotta-deep/10 px-4 py-3 font-bold text-terracotta-deep">
                        <Icon name="warning" size={18} /> {nErrors === 1 ? tr('checkOne') : tr('checkMany', { n: nErrors })}
                      </span>
                    )}
                  </p>
                  <Field id="c-name" label={tr('name')} error={err('name')}>
                    <Input id="c-name" autoComplete="name" value={f.name} invalid={!!errors.name}
                      aria-describedby={describedBy('c-name', { error: errors.name })}
                      onChange={(e) => setF({ ...f, name: e.target.value })} />
                  </Field>
                  <Field id="c-phone" label={tr('phone')} error={err('phone')}>
                    <div className="flex items-stretch">
                      <span aria-hidden="true" className="grid min-h-tap place-items-center rounded-l-xl border-2 border-r-0 border-mint bg-mist px-3.5 font-bold text-green">+91</span>
                      <Input id="c-phone" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={f.phone} invalid={!!errors.phone}
                        className="rounded-l-none"
                        aria-describedby={describedBy('c-phone', { error: errors.phone })}
                        onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '') })} />
                    </div>
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
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
                  </div>
                  <Button type="submit" variant="urgent" block><Icon name="phone" size={20} /> {tr('submit')}</Button>
                  <p className="m-0 flex items-start gap-2 text-small text-grey">
                    <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-sage" /> {tr('formNote')}
                  </p>
                </m.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>
    </>
  );
}
