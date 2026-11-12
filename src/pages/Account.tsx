import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import Icon from '../components/Icon';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { HelpBox } from '../components/commerce/AppPanel';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';
import { useToast } from '../context/ToastContext';
import { getProduct } from '../data';
import { resetDemoData } from '../data/demoAccount';
import { formatPrice } from '../config/site';
import { VIEWPORT, tReveal } from '../lib/motion';
import { formatDate, useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
  en: {
    seoTitle: 'My account',
    titleIn: 'Hello, *{name}.*',
    titleOut: 'My orders & *tracking*',
    intro: "See your orders, reorder in one tap, and manage your family's care.",
    since: 'With Way2Cure since {date}',
    signOut: 'Log out', signedOut: 'You are logged out. Orders placed in this browser are still shown here.',
    outTitle: 'Log in to see your orders on any phone',
    outText: 'Log in with your mobile number and a one-time code. Orders you placed in this browser stay here either way.',
    logIn: 'Log in', signUp: 'Create an account',
    ordersTitle: 'Your orders',
    order: 'Order {id}',
    items: '{n} items',
    reorder: 'Reorder',
    reordered: 'Added to cart', viewCart: 'View cart',
    emptyTitle: 'No orders yet.',
    emptyText: 'When you place an order, it shows here with live tracking. Next time, reorder in one tap.',
    orderMedicines: 'Order medicines',
    yourAccount: 'Manage',
    progress: 'Order progress',
    'status:awaiting-pharmacist': 'Waiting for pharmacist check',
    'status:packed': 'Packed, arriving today',
    'status:delivered': 'Delivered',
    demoNote: 'This is the demo account. Anything you change stays in this browser.', demoReset: 'Reset demo data',
    stepPlaced: 'Placed', stepChecked: 'Pharmacist check', stepPacked: 'Packed', stepDelivered: 'Delivered',
    'rx.title': 'Prescriptions', 'rx.text': 'Upload and see past prescriptions in the app',
    'subs.title': 'Subscriptions', 'subs.text': 'Pause, change or cancel your plans',
    'notif.title': 'Notifications', 'notif.text': 'Refill reminders and order updates',
    'family.title': 'Family profiles', 'family.text': 'Order for parents with their own address and medicines',
    'addr.title': 'Addresses & payments', 'addr.text': 'Saved addresses, UPI and cards',
    'help.title': 'Help centre', 'help.text': 'Answers and support, 24/7',
    'safe.title': 'Safe-zone band', 'safe.text': 'For dementia care (coming soon)',
    newCount: '{n} new',
  },
  hi: {
    seoTitle: 'मेरा खाता',
    titleIn: 'नमस्ते, *{name}।*',
    titleOut: 'मेरे ऑर्डर और *ट्रैकिंग*',
    intro: 'अपने ऑर्डर देखें, एक टैप में फिर से ऑर्डर करें, और अपने परिवार की देखभाल संभालें।',
    since: '{date} से Way2Cure के साथ',
    signOut: 'लॉग आउट', signedOut: 'आप लॉग आउट हो गए हैं। इस ब्राउज़र से किए गए ऑर्डर यहाँ अब भी दिखेंगे।',
    outTitle: 'किसी भी फ़ोन पर अपने ऑर्डर देखने के लिए लॉग इन करें',
    outText: 'अपने मोबाइल नंबर और एक बार के कोड से लॉग इन करें। इस ब्राउज़र से किए गए ऑर्डर यहाँ वैसे भी रहेंगे।',
    logIn: 'लॉग इन करें', signUp: 'खाता बनाएँ',
    ordersTitle: 'आपके ऑर्डर',
    order: 'ऑर्डर {id}',
    items: '{n} सामान',
    reorder: 'फिर से ऑर्डर करें',
    reordered: 'कार्ट में डाला', viewCart: 'कार्ट देखें',
    emptyTitle: 'अभी तक कोई ऑर्डर नहीं।',
    emptyText: 'ऑर्डर करने पर वह यहाँ लाइव ट्रैकिंग के साथ दिखेगा। अगली बार एक टैप में फिर से ऑर्डर करें।',
    orderMedicines: 'दवाइयाँ मँगाएँ',
    yourAccount: 'संभालें',
    progress: 'ऑर्डर की स्थिति',
    'status:awaiting-pharmacist': 'फ़ार्मासिस्ट की जाँच बाकी है',
    'status:packed': 'पैक हो गया, आज पहुँचेगा',
    'status:delivered': 'पहुँच गया',
    demoNote: 'यह डेमो खाता है। आप जो भी बदलेंगे, वह सिर्फ़ इस ब्राउज़र में रहेगा।', demoReset: 'डेमो डेटा रीसेट करें',
    stepPlaced: 'ऑर्डर हुआ', stepChecked: 'फ़ार्मासिस्ट जाँच', stepPacked: 'पैक हुआ', stepDelivered: 'पहुँच गया',
    'rx.title': 'पर्चे', 'rx.text': 'ऐप में पर्चा अपलोड करें और पुराने पर्चे देखें',
    'subs.title': 'सब्सक्रिप्शन', 'subs.text': 'अपने प्लान रोकें, बदलें या रद्द करें',
    'notif.title': 'सूचनाएँ', 'notif.text': 'रीफ़िल रिमाइंडर और ऑर्डर अपडेट',
    'family.title': 'परिवार के सदस्य', 'family.text': 'माता-पिता के लिए उनके अपने पते और दवाइयों के साथ ऑर्डर करें',
    'addr.title': 'पते और भुगतान', 'addr.text': 'सेव किए गए पते, यूपीआई और कार्ड',
    'help.title': 'मदद केंद्र', 'help.text': 'जवाब और मदद, 24/7',
    'safe.title': 'सेफ़-ज़ोन बैंड', 'safe.text': 'डिमेंशिया की देखभाल के लिए (जल्द आ रहा है)',
    newCount: '{n} नई',
  },
  mr: {
    seoTitle: 'माझे खाते',
    titleIn: 'नमस्कार, *{name}.*',
    titleOut: 'माझ्या ऑर्डर आणि *ट्रॅकिंग*',
    intro: 'तुमच्या ऑर्डर पाहा, एका टॅपमध्ये पुन्हा ऑर्डर करा, आणि तुमच्या कुटुंबाची काळजी सांभाळा.',
    since: '{date} पासून Way2Cure सोबत',
    signOut: 'लॉग आउट', signedOut: 'तुम्ही लॉग आउट झाला आहात. या ब्राउझरमधून केलेल्या ऑर्डर इथे अजूनही दिसतील.',
    outTitle: 'कोणत्याही फोनवर तुमच्या ऑर्डर पाहण्यासाठी लॉग इन करा',
    outText: 'तुमच्या मोबाइल नंबर आणि एकदाच वापरायच्या कोडने लॉग इन करा. या ब्राउझरमधून केलेल्या ऑर्डर इथे तशाही राहतील.',
    logIn: 'लॉग इन करा', signUp: 'खाते तयार करा',
    ordersTitle: 'तुमच्या ऑर्डर',
    order: 'ऑर्डर {id}',
    items: '{n} वस्तू',
    reorder: 'पुन्हा ऑर्डर करा',
    reordered: 'कार्टमध्ये टाकले', viewCart: 'कार्ट पाहा',
    emptyTitle: 'अजून कोणतीही ऑर्डर नाही.',
    emptyText: 'तुम्ही ऑर्डर केल्यावर ती इथे लाइव्ह ट्रॅकिंगसह दिसेल. पुढच्या वेळी एका टॅपमध्ये पुन्हा ऑर्डर करा.',
    orderMedicines: 'औषधे मागवा',
    yourAccount: 'व्यवस्थापन',
    progress: 'ऑर्डरची स्थिती',
    'status:awaiting-pharmacist': 'फार्मासिस्टची तपासणी बाकी',
    'status:packed': 'पॅक झाले, आज पोहोचेल',
    'status:delivered': 'पोहोचले',
    demoNote: 'हे डेमो खाते आहे. तुम्ही जे बदलाल ते फक्त या ब्राउझरमध्ये राहील.', demoReset: 'डेमो डेटा रीसेट करा',
    stepPlaced: 'ऑर्डर झाली', stepChecked: 'फार्मासिस्ट तपासणी', stepPacked: 'पॅक झाले', stepDelivered: 'पोहोचले',
    'rx.title': 'प्रिस्क्रिप्शन', 'rx.text': 'ॲपमध्ये प्रिस्क्रिप्शन अपलोड करा आणि जुनी प्रिस्क्रिप्शन पाहा',
    'subs.title': 'सदस्यता', 'subs.text': 'तुमच्या योजना थांबवा, बदला किंवा रद्द करा',
    'notif.title': 'सूचना', 'notif.text': 'रिफिलची आठवण आणि ऑर्डर अपडेट',
    'family.title': 'कुटुंबातील सदस्य', 'family.text': 'आई-वडिलांसाठी त्यांच्या स्वतःच्या पत्त्यासह आणि औषधांसह ऑर्डर करा',
    'addr.title': 'पत्ते आणि पेमेंट', 'addr.text': 'सेव्ह केलेले पत्ते, यूपीआय आणि कार्ड',
    'help.title': 'मदत केंद्र', 'help.text': 'उत्तरे आणि मदत, 24/7',
    'safe.title': 'सेफ-झोन बँड', 'safe.text': 'डिमेन्शियाच्या काळजीसाठी (लवकरच येत आहे)',
    newCount: '{n} नवीन',
  },
};

const sections = [
  { to: '/notifications', icon: 'bell', key: 'notif' },
  { to: '/prescription', icon: 'rx', key: 'rx' },
  { to: '/subscriptions#manage', icon: 'refresh', key: 'subs' },
  { to: '/account/family', icon: 'users', key: 'family' },
  { to: '/account/addresses', icon: 'pin', key: 'addr' },
  { to: '/help', icon: 'support', key: 'help' },
  { to: '/safe-zone', icon: 'watch', key: 'safe' },
];

const STEPS = ['stepPlaced', 'stepChecked', 'stepPacked', 'stepDelivered'];
// How far along each stored status is (0-based index of the last completed step).
const PROGRESS: Record<string, number> = { 'awaiting-pharmacist': 0, packed: 2, delivered: 3 };

const initials = (name: string) => name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export default function Account() {
  // TODO: API: GET /orders for the signed-in user (orders are kept in this browser for now).
  const { orders, reorder } = useCart();
  const { user, isDemo, signOut } = useAuth();
  const { unread } = useNotifications();
  const toast = useToast();
  const { lang } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const statusText = (s: string) => {
    const k = `status:${s}`;
    const out = tr(k);
    return out === k ? s : out;
  };
  const firstName = user?.name.trim().split(/\s+/)[0] ?? '';

  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('intro')} noindex />
      <PageHeader
        tone="mist"
        title={firstName ? tr('titleIn', { name: firstName }) : tr('titleOut')}
        lead={tr('intro')}
      />

      <section className="section pt-12 lg:pt-16">
        <div className="container grid items-start gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <div className="grid gap-8">
            {/* Who is signed in, or a friendly prompt to log in */}
            <Reveal>
              {user ? (
                <div className="flex flex-wrap items-center gap-5 rounded-panel bg-white p-6 shadow-card">
                  <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-green font-head text-h2m font-bold text-white">
                    {user.name ? initials(user.name) : <Icon name="user" size={28} />}
                  </span>
                  <div className="grid flex-1 gap-0.5">
                    {user.name && <strong className="text-lead text-green">{user.name}</strong>}
                    <span className="text-base text-ink">+91 {user.phone}</span>
                    <span className="text-small text-grey">{tr('since', { date: formatDate(user.since, lang) })}</span>
                  </div>
                  <Button variant="outline" compact onClick={() => { signOut(); toast({ message: tr('signedOut') }); }}>
                    <Icon name="close" size={18} /> {tr('signOut')}
                  </Button>
                  {/* Demo account: say so, and let testers put the sample data back */}
                  {isDemo && (
                    <div className="flex w-full flex-wrap items-center gap-x-3 border-t border-line pt-3 text-small text-grey">
                      <span className="inline-flex items-center gap-2"><Icon name="info" size={16} className="shrink-0 text-sage" /> {tr('demoNote')}</span>
                      <button type="button" onClick={() => { resetDemoData(); window.location.reload(); }} className="inline-flex min-h-[2.75rem] items-center gap-1.5 font-bold text-terracotta-deep underline underline-offset-[3px]">
                        <Icon name="refresh" size={15} /> {tr('demoReset')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-5 rounded-panel bg-white p-6 shadow-card md:grid-cols-[auto_1fr] md:items-center md:p-8">
                  <span className="grid h-14 w-14 place-items-center rounded-tile bg-mist text-green"><Icon name="lock" size={26} /></span>
                  <div>
                    <h2 className="mb-1 font-body text-h3m md:text-h3">{tr('outTitle')}</h2>
                    <p className="mb-4 text-ink/80">{tr('outText')}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button to="/login?next=/account">{tr('logIn')} <Icon name="arrow" size={18} /></Button>
                      <Button to="/signup?next=/account" variant="outline">{tr('signUp')}</Button>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>

            <section aria-labelledby="orders-h">
              <Reveal><h2 id="orders-h" className="mb-5 font-head text-h2m md:text-h2">{tr('ordersTitle')}</h2></Reveal>
              {orders.length ? (
                <Stagger as="ul" className="grid gap-4">
                  {orders.map((o) => {
                    const done = PROGRESS[o.status] ?? 0;
                    const count = o.items.reduce((s, i) => s + i.qty, 0);
                    return (
                      <StaggerItem as="li" key={o.id} className="rounded-panel bg-white p-5 shadow-card md:p-6">
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="mb-0">{tr('order', { id: o.id })}</h3>
                            <span className="text-base text-grey">{formatDate(o.date, lang)} · {tr('items', { n: count })}</span>
                          </div>
                          <Tag kind={o.status === 'awaiting-pharmacist' ? 'pharmacist' : 'status'}>{statusText(o.status)}</Tag>
                        </div>
                        <p className="mb-4 text-base text-ink/80">
                          {o.items.map((i) => { const p = getProduct(i.id); return `${p ? loc(p).name : i.id} × ${i.qty}`; }).join(', ')}
                        </p>
                        {/* Progress: a line that fills to the current step, with words for each step */}
                        <div className="mb-5" role="group" aria-label={tr('progress')}>
                          <div className="relative mb-2 h-1.5 overflow-hidden rounded-full bg-mint" aria-hidden="true">
                            <m.span
                              className="absolute inset-0 origin-left rounded-full bg-sage"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: (done + 1) / STEPS.length }}
                              viewport={VIEWPORT}
                              transition={tReveal}
                            />
                          </div>
                          <ol className="grid grid-cols-4 gap-2 text-small">
                            {STEPS.map((s, i) => (
                              <li key={s} className={`flex items-center gap-1 ${i <= done ? 'font-bold text-green' : 'text-grey'}`} aria-current={i === done ? 'step' : undefined}>
                                {i <= done && <Icon name="check" size={14} className="shrink-0" />}
                                <span>{tr(s)}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                          <strong className="text-lead text-green">{formatPrice(o.total)}</strong>
                          <Button compact onClick={() => { reorder(o); toast({ message: tr('reordered'), action: { label: tr('viewCart'), to: '/cart' } }); }}>
                            <Icon name="refresh" size={18} /> {tr('reorder')}
                          </Button>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              ) : (
                <Reveal className="rounded-panel bg-white p-8 shadow-card">
                  <span className="mb-4 grid h-14 w-14 place-items-center rounded-tile bg-mist text-green"><Icon name="package" size={26} /></span>
                  <h3>{tr('emptyTitle')}</h3>
                  <p className="text-ink/80">{tr('emptyText')}</p>
                  <Button to="/shop/medicines">{tr('orderMedicines')} <Icon name="arrow" size={18} /></Button>
                </Reveal>
              )}
            </section>
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-28">
            <Reveal>
              <h2 className="mb-4 font-head text-h2m md:text-h2">{tr('yourAccount')}</h2>
              <ul className="divide-y divide-line overflow-hidden rounded-panel bg-white shadow-card">
                {sections.filter((s) => user || s.key !== 'notif').map((s) => (
                  <li key={s.key}>
                    <Link to={s.to} className="group flex min-h-[4.5rem] items-center gap-4 px-5 py-4 text-ink no-underline transition-colors duration-micro hover:bg-mist">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-mist text-green transition-colors duration-micro group-hover:bg-white">
                        <Icon name={s.icon} size={20} />
                      </span>
                      <span className="grid flex-1 leading-snug">
                        <strong className="flex items-center gap-2 text-green">
                          {tr(`${s.key}.title`)}
                          {s.key === 'notif' && unread > 0 && (
                            <span className="rounded-full bg-terracotta-deep px-2 py-0.5 text-small font-bold text-white">{tr('newCount', { n: unread })}</span>
                          )}
                        </strong>
                        <span className="text-base text-grey">{tr(`${s.key}.text`)}</span>
                      </span>
                      <Icon name="arrow" size={18} className="text-grey" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal><HelpBox /></Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
