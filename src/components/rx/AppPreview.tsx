import type { ReactNode } from 'react';
import Icon from '../Icon';
import Accent from '../ui/Accent';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';
import { useT, type Dict } from '../../i18n/LangContext';

// "Inside the app" on the Prescription page: two still phone screens (not working controls) with
// numbered call-outs, each explained in the list beside it. It shows what the app does after an
// upload, without suggesting that anything can be edited on this website.

const T: Dict = {
  en: {
    chip: 'A preview of the Way2Cure app',
    note: 'These screens show what you will see in the app after you upload a prescription. They are an illustration, not a working form.',
    step1: 'After you upload', step2: 'After you confirm',
    checkTitle: 'You check the list first',
    checkText: 'The app shows the medicines it found on your prescription. Fix anything that looks wrong before you confirm.',
    followTitle: 'Follow every step',
    followText: 'Once you confirm, we keep you posted until the order reaches your door.',
    a1: 'AI reads the photo and lists the medicines it finds.',
    a2: 'Tap the pencil to fix a name, dose or duration.',
    a3: 'Tap the bin to remove anything you do not need.',
    a4: 'Confirm the list. A registered pharmacist then checks the order.',
    b1: 'An SMS and WhatsApp message at every stage.',
    b2: 'See exactly where your order is.',
    b3: 'Family members can follow the same order.',
    yourRx: 'Your prescription', uploaded: 'Uploaded · 9:14 am', found: '3 medicines found',
    confirm: 'Confirm list', unclear: 'Unclear? The pharmacist will call you.',
    notifFrom: 'Way2Cure · now', notif: 'Your order has been checked by the pharmacist.',
    order: 'Order {id}', following: 'Also following', s0: 'Uploaded', s1: 'List confirmed', s2: 'Pharmacist checked', s3: 'Out for delivery', s4: 'Delivered',
    alt1: 'Illustration: the medicines list in the Way2Cure app', alt2: 'Illustration: order tracking in the Way2Cure app',
    m1: 'Twice daily · 30 days', m2: 'Once daily · 30 days', m3: 'Once weekly · 8 weeks',
  },
  hi: {
    chip: 'Way2Cure ऐप की एक झलक',
    note: 'ये स्क्रीन दिखाती हैं कि पर्चा अपलोड करने के बाद ऐप में आपको क्या दिखेगा। यह सिर्फ़ एक उदाहरण है, भरने वाला फ़ॉर्म नहीं।',
    step1: 'अपलोड करने के बाद', step2: 'कन्फ़र्म करने के बाद',
    checkTitle: 'पहले आप लिस्ट देख लें',
    checkText: 'ऐप आपके पर्चे में मिली दवाइयाँ दिखाता है। कन्फ़र्म करने से पहले जो भी गलत लगे, उसे ठीक कर दें।',
    followTitle: 'हर कदम पर नज़र रखें',
    followText: 'कन्फ़र्म करने के बाद, ऑर्डर आपके दरवाज़े तक पहुँचने तक हम आपको बताते रहते हैं।',
    a1: 'AI फ़ोटो पढ़कर उसमें मिली दवाइयों की लिस्ट बनाता है।',
    a2: 'नाम, डोज़ या अवधि ठीक करने के लिए पेंसिल दबाएँ।',
    a3: 'जो नहीं चाहिए, उसे हटाने के लिए बिन दबाएँ।',
    a4: 'लिस्ट कन्फ़र्म करें। फिर एक रजिस्टर्ड फ़ार्मासिस्ट ऑर्डर जाँचते हैं।',
    b1: 'हर चरण पर SMS और व्हाट्सऐप मैसेज।',
    b2: 'देखें कि आपका ऑर्डर ठीक कहाँ है।',
    b3: 'परिवार के सदस्य भी वही ऑर्डर देख सकते हैं।',
    yourRx: 'आपका पर्चा', uploaded: 'अपलोड हुआ · सुबह 9:14', found: '3 दवाइयाँ मिलीं',
    confirm: 'लिस्ट कन्फ़र्म करें', unclear: 'कुछ साफ़ नहीं? फ़ार्मासिस्ट कॉल करेंगे।',
    notifFrom: 'Way2Cure · अभी', notif: 'फ़ार्मासिस्ट ने आपका ऑर्डर जाँच लिया है।',
    order: 'ऑर्डर {id}', following: 'ये भी देख रहे हैं', s0: 'अपलोड हुआ', s1: 'लिस्ट कन्फ़र्म', s2: 'फ़ार्मासिस्ट ने जाँचा', s3: 'डिलिवरी के लिए निकला', s4: 'डिलिवर हुआ',
    alt1: 'उदाहरण: Way2Cure ऐप में दवाइयों की लिस्ट', alt2: 'उदाहरण: Way2Cure ऐप में ऑर्डर ट्रैकिंग',
    m1: 'दिन में दो बार · 30 दिन', m2: 'दिन में एक बार · 30 दिन', m3: 'हफ़्ते में एक बार · 8 हफ़्ते',
  },
  mr: {
    chip: 'Way2Cure ॲपची एक झलक',
    note: 'प्रिस्क्रिप्शन अपलोड केल्यावर ॲपमध्ये तुम्हाला काय दिसेल ते या स्क्रीन दाखवतात. हे फक्त एक उदाहरण आहे, भरायचा फॉर्म नाही.',
    step1: 'अपलोड केल्यावर', step2: 'निश्चित केल्यावर',
    checkTitle: 'आधी तुम्ही यादी तपासा',
    checkText: 'तुमच्या प्रिस्क्रिप्शनमध्ये सापडलेली औषधे ॲप दाखवते. निश्चित करण्यापूर्वी काही चुकीचे वाटले तर ते दुरुस्त करा.',
    followTitle: 'प्रत्येक टप्पा पाहा',
    followText: 'निश्चित केल्यावर, ऑर्डर तुमच्या दारात पोहोचेपर्यंत आम्ही तुम्हाला कळवत राहतो.',
    a1: 'AI फोटो वाचून त्यात सापडलेल्या औषधांची यादी करते.',
    a2: 'नाव, डोस किंवा कालावधी दुरुस्त करण्यासाठी पेन्सिल दाबा.',
    a3: 'जे नको आहे ते काढण्यासाठी बिन दाबा.',
    a4: 'यादी निश्चित करा. मग नोंदणीकृत फार्मासिस्ट ऑर्डर तपासतात.',
    b1: 'प्रत्येक टप्प्यावर SMS आणि व्हॉट्सॲप मेसेज.',
    b2: 'तुमची ऑर्डर नेमकी कुठे आहे ते पाहा.',
    b3: 'कुटुंबातील सदस्यही तीच ऑर्डर पाहू शकतात.',
    yourRx: 'तुमचे प्रिस्क्रिप्शन', uploaded: 'अपलोड झाले · सकाळी 9:14', found: '3 औषधे सापडली',
    confirm: 'यादी निश्चित करा', unclear: 'काही अस्पष्ट? फार्मासिस्ट कॉल करतील.',
    notifFrom: 'Way2Cure · आत्ता', notif: 'फार्मासिस्टने तुमची ऑर्डर तपासली आहे.',
    order: 'ऑर्डर {id}', following: 'हेही पाहत आहेत', s0: 'अपलोड झाले', s1: 'यादी निश्चित', s2: 'फार्मासिस्टने तपासले', s3: 'डिलिव्हरीसाठी निघाले', s4: 'पोहोचले',
    alt1: 'उदाहरण: Way2Cure ॲपमधील औषधांची यादी', alt2: 'उदाहरण: Way2Cure ॲपमधील ऑर्डर ट्रॅकिंग',
    m1: 'दिवसातून दोनदा · 30 दिवस', m2: 'दिवसातून एकदा · 30 दिवस', m3: 'आठवड्यातून एकदा · 8 आठवडे',
  },
};

const MEDS = [['Metformin 500 mg', 'm1'], ['Amlodipine 5 mg', 'm2'], ['Vitamin D3', 'm3']] as const;
const STATUS = ['s0', 's1', 's2', 's3', 's4'];
const CURRENT = 2;

/** Numbered call-out that sits just outside the phone, joined to its element by a dashed line. */
function Marker({ n, side }: { n: number; side: 'left' | 'right' }) {
  const pos = side === 'right' ? '-right-9 sm:-right-12' : '-left-9 sm:-left-12';
  const line = side === 'right' ? 'right-full' : 'left-full';
  return (
    <span className={`absolute top-1/2 z-10 -translate-y-1/2 ${pos}`}>
      <span className={`absolute top-1/2 hidden w-5 border-t-2 border-dashed border-terracotta-deep/50 sm:block ${line}`} />
      <span className="absolute inset-0 animate-ping rounded-full bg-terracotta-deep/30 [animation-duration:2.4s]" />
      <span className="relative grid h-7 w-7 place-items-center rounded-full bg-terracotta-deep text-[13px] font-bold text-white shadow-raised ring-4 ring-white">{n}</span>
    </span>
  );
}

/** A phone frame. The screen is decoration; its meaning is in the numbered list beside it. */
function Phone({ alt, children }: { alt: string; children: ReactNode }) {
  return (
    <figure className="relative mx-auto w-[16rem] sm:w-[19rem]">
      {/* Soft stage behind the phone */}
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--c-sage)/0.18),transparent_65%)]" />
      <span aria-hidden="true" className="absolute -right-6 -top-4 h-24 w-24 rounded-full bg-[radial-gradient(rgb(var(--c-terracotta-deep)/0.3)_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
      <div aria-hidden="true" className="relative rounded-[2.4rem] bg-green p-2.5 shadow-float">
        <div className="relative rounded-[1.9rem] bg-mist pb-4">
          {/* Status bar and notch */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-bold text-green">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-green" />
            <span className="flex items-end gap-0.5">
              {[4, 6, 8, 10].map((h) => <span key={h} className="w-[3px] rounded-sm bg-green" style={{ height: h }} />)}
            </span>
          </div>
          {children}
        </div>
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}

function Legend({ items, label, title, text }: { items: string[]; label: string; title: string; text: string }) {
  return (
    <div>
      <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-sage-tint px-3 py-1 text-small font-bold text-sage-deep">{label}</span>
      <h3 className="mb-2 font-head text-h2m md:text-h2">{title}</h3>
      <p className="mb-6 text-ink/80">{text}</p>
      <Stagger as="ol" className="grid gap-3">
        {items.map((x, i) => (
          <StaggerItem as="li" key={i} className="flex items-start gap-4 rounded-tile bg-white p-4 shadow-card">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-terracotta-deep text-small font-bold text-white">{i + 1}</span>
            <span className="pt-0.5 text-base text-ink">{x}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default function AppPreview({ title }: { title: string }) {
  const tr = useT(T);
  const iconBtn = 'grid h-7 w-7 shrink-0 place-items-center rounded-full sm:h-8 sm:w-8';

  return (
    <section className="section relative overflow-clip bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-sage/10 blur-3xl" />
        <span className="absolute -right-40 bottom-10 h-[30rem] w-[30rem] rounded-full bg-terracotta/10 blur-3xl" />
      </div>
      <div className="container relative">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-small font-bold text-green shadow-card">
            <Icon name="phoneApp" size={16} className="text-terracotta-deep" /> {tr('chip')}
          </span>
          <h2 className="mb-4 text-section"><Accent text={title} /></h2>
          <p className="m-0 flex items-start gap-2 text-base text-grey">
            <Icon name="info" size={18} className="mt-1 shrink-0 text-sage" /> {tr('note')}
          </p>
        </Reveal>

        {/* 1 · Check the list */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <Phone alt={tr('alt1')}>
              <div className="px-4">
                <div className="mb-3 mt-2">
                  <p className="m-0 text-[15px] font-bold text-green">{tr('yourRx')}</p>
                  <p className="m-0 text-[11px] text-grey">{tr('uploaded')}</p>
                </div>
                <div className="relative mb-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card">
                  <span className="grid h-10 w-8 shrink-0 rotate-[-4deg] place-items-center rounded-md border border-line bg-cream font-head text-[13px] font-bold text-terracotta-deep">Rx</span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-green"><Icon name="sparkles" size={14} className="text-mustard" /> {tr('found')}</span>
                  <Marker n={1} side="right" />
                </div>
                <ul className="m-0 grid list-none gap-2 p-0">
                  {MEDS.map(([name, k], i) => (
                    <li key={name} className={`relative flex items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-card ${i === 1 ? 'ring-2 ring-sage' : ''}`}>
                      <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-xl bg-mist text-green sm:grid"><Icon name="pill" size={15} /></span>
                      <span className="grid min-w-0 flex-1 leading-tight">
                        <strong className="text-[13px] text-green">{name}</strong>
                        <span className="text-[11px] text-grey">{tr(k)}</span>
                      </span>
                      <span className={`${iconBtn} ${i === 1 ? 'bg-sage text-white' : 'bg-sage-tint text-sage-deep'}`}><Icon name="edit" size={14} /></span>
                      <span className={`${iconBtn} ${i === 2 ? 'bg-terracotta-deep text-white' : 'bg-[#FDF0F2] text-terracotta-deep'}`}><Icon name="trash" size={14} /></span>
                      {i === 1 && <Marker n={2} side="right" />}
                      {i === 2 && <Marker n={3} side="right" />}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-4">
                  <span className="flex h-11 items-center justify-center gap-2 rounded-xl bg-terracotta-deep text-[14px] font-bold text-white"><Icon name="check" size={16} /> {tr('confirm')}</span>
                  <Marker n={4} side="right" />
                </div>
                <p className="m-0 mt-3 flex items-center justify-center gap-1.5 text-[11px] text-grey"><Icon name="phone" size={12} className="text-terracotta-deep" /> {tr('unclear')}</p>
              </div>
            </Phone>
          </Reveal>
          <Legend label={tr('step1')} title={tr('checkTitle')} text={tr('checkText')} items={[tr('a1'), tr('a2'), tr('a3'), tr('a4')]} />
        </div>

        {/* 2 · Follow the order */}
        <div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <Legend label={tr('step2')} title={tr('followTitle')} text={tr('followText')} items={[tr('b1'), tr('b2'), tr('b3')]} />
          </div>
          <Reveal className="order-1 lg:order-2">
            <Phone alt={tr('alt2')}>
              <div className="px-4">
                {/* Notification */}
                <div className="relative mb-4 mt-2 flex items-start gap-2.5 rounded-2xl bg-white/95 p-3 shadow-raised">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-whatsapp text-white"><Icon name="whatsapp" size={16} /></span>
                  <span className="grid leading-tight">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-grey">{tr('notifFrom')}</span>
                    <span className="text-[12px] font-semibold text-ink">{tr('notif')}</span>
                  </span>
                  <Marker n={1} side="left" />
                </div>
                {/* Tracker */}
                <div className="relative rounded-2xl bg-white p-4 shadow-card">
                  <p className="m-0 mb-3 text-[14px] font-bold text-green">{tr('order', { id: 'W2C204518' })}</p>
                  <div className="relative mb-4 h-1.5 overflow-hidden rounded-full bg-mint">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-sage" style={{ width: `${(CURRENT / (STATUS.length - 1)) * 100}%` }} />
                  </div>
                  <ol className="m-0 grid list-none gap-2.5 p-0">
                    {STATUS.map((st, i) => (
                      <li key={st} className={`flex items-center gap-2.5 text-[12px] ${i <= CURRENT ? 'font-bold text-green' : 'text-grey'}`}>
                        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${i < CURRENT ? 'bg-sage text-white' : i === CURRENT ? 'bg-green text-white' : 'bg-mist text-grey'}`}>
                          <Icon name={i <= CURRENT ? 'check' : 'clock'} size={12} />
                        </span>
                        {tr(st)}
                      </li>
                    ))}
                  </ol>
                  <Marker n={2} side="left" />
                </div>
                {/* Family */}
                <div className="relative mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card">
                  <span className="flex -space-x-2">
                    {[['R', 'bg-sage'], ['P', 'bg-terracotta-deep'], ['A', 'bg-mustard text-green']].map(([c, cls]) => (
                      <span key={c} className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold text-white ring-2 ring-white ${cls}`}>{c}</span>
                    ))}
                  </span>
                  <span className="text-[12px] font-semibold text-grey">{tr('following')}</span>
                  <Marker n={3} side="left" />
                </div>
              </div>
            </Phone>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
