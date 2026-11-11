import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { useCart } from '../context/CartContext';
import { getProduct } from '../data';
import { formatPrice } from '../config/site';
import { formatDate, useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
  en: {
    eyebrow: 'Account',
    title: 'My orders & tracking',
    intro: "See your orders, reorder in one tap, and manage your family's care.",
    order: 'Order {id}',
    reorder: 'Reorder',
    emptyTitle: 'No orders yet.',
    emptyText: 'When you place an order, it shows here with live tracking. Next time, reorder in one tap.',
    orderMedicines: 'Order medicines',
    yourAccount: 'Your account',
    // Order status text saved by CartContext (English) mapped to the reader's language.
    'status:awaiting-pharmacist': 'Waiting for pharmacist check',
    'status:packed': 'Packed, arriving today',
    'rx.title': 'Prescriptions', 'rx.text': 'Upload and see past prescriptions in the app',
    'subs.title': 'Subscriptions', 'subs.text': 'Pause, change or cancel your plans',
    'family.title': 'Family profiles', 'family.text': 'Order for parents with their own address and medicines',
    'addr.title': 'Addresses & payments', 'addr.text': 'Saved addresses, UPI and cards',
    'help.title': 'Help centre / FAQ', 'help.text': 'Answers and support, 24/7',
    'safe.title': 'Safe-zone band', 'safe.text': 'For dementia care (coming soon)',
  },
  hi: {
    eyebrow: 'खाता',
    title: 'मेरे ऑर्डर और ट्रैकिंग',
    intro: 'अपने ऑर्डर देखें, एक टैप में फिर से ऑर्डर करें, और अपने परिवार की देखभाल संभालें।',
    order: 'ऑर्डर {id}',
    reorder: 'फिर से ऑर्डर करें',
    emptyTitle: 'अभी तक कोई ऑर्डर नहीं।',
    emptyText: 'ऑर्डर करने पर वह यहाँ लाइव ट्रैकिंग के साथ दिखेगा। अगली बार एक टैप में फिर से ऑर्डर करें।',
    orderMedicines: 'दवाइयाँ मँगाएँ',
    yourAccount: 'आपका खाता',
    'status:awaiting-pharmacist': 'फ़ार्मासिस्ट की जाँच बाकी है',
    'status:packed': 'पैक हो गया, आज पहुँचेगा',
    'rx.title': 'पर्चे', 'rx.text': 'ऐप में पर्चा अपलोड करें और पुराने पर्चे देखें',
    'subs.title': 'सब्सक्रिप्शन', 'subs.text': 'अपने प्लान रोकें, बदलें या रद्द करें',
    'family.title': 'परिवार के सदस्य', 'family.text': 'माता-पिता के लिए उनके अपने पते और दवाइयों के साथ ऑर्डर करें',
    'addr.title': 'पते और भुगतान', 'addr.text': 'सेव किए गए पते, यूपीआई और कार्ड',
    'help.title': 'मदद केंद्र / अक्सर पूछे जाने वाले सवाल', 'help.text': 'जवाब और मदद, 24/7',
    'safe.title': 'सेफ़-ज़ोन बैंड', 'safe.text': 'डिमेंशिया की देखभाल के लिए (जल्द आ रहा है)',
  },
  mr: {
    eyebrow: 'खाते',
    title: 'माझ्या ऑर्डर आणि ट्रॅकिंग',
    intro: 'तुमच्या ऑर्डर पाहा, एका टॅपमध्ये पुन्हा ऑर्डर करा, आणि तुमच्या कुटुंबाची काळजी सांभाळा.',
    order: 'ऑर्डर {id}',
    reorder: 'पुन्हा ऑर्डर करा',
    emptyTitle: 'अजून कोणतीही ऑर्डर नाही.',
    emptyText: 'तुम्ही ऑर्डर केल्यावर ती इथे लाइव्ह ट्रॅकिंगसह दिसेल. पुढच्या वेळी एका टॅपमध्ये पुन्हा ऑर्डर करा.',
    orderMedicines: 'औषधे मागवा',
    yourAccount: 'तुमचे खाते',
    'status:awaiting-pharmacist': 'फार्मासिस्टची तपासणी बाकी',
    'status:packed': 'पॅक झाले, आज पोहोचेल',
    'rx.title': 'प्रिस्क्रिप्शन', 'rx.text': 'ॲपमध्ये प्रिस्क्रिप्शन अपलोड करा आणि जुनी प्रिस्क्रिप्शन पाहा',
    'subs.title': 'सदस्यता', 'subs.text': 'तुमच्या योजना थांबवा, बदला किंवा रद्द करा',
    'family.title': 'कुटुंबातील सदस्य', 'family.text': 'आई-वडिलांसाठी त्यांच्या स्वतःच्या पत्त्यासह आणि औषधांसह ऑर्डर करा',
    'addr.title': 'पत्ते आणि पेमेंट', 'addr.text': 'सेव्ह केलेले पत्ते, यूपीआय आणि कार्ड',
    'help.title': 'मदत केंद्र / नेहमीचे प्रश्न', 'help.text': 'उत्तरे आणि मदत, 24/7',
    'safe.title': 'सेफ-झोन बँड', 'safe.text': 'डिमेन्शियाच्या काळजीसाठी (लवकरच येत आहे)',
  },
};

const sections = [
  { to: '/prescription', icon: 'rx', key: 'rx' },
  { to: '/subscriptions#manage', icon: 'refresh', key: 'subs' },
  { to: '/account/family', icon: 'users', key: 'family' },
  { to: '/account/addresses', icon: 'pin', key: 'addr' },
  { to: '/help', icon: 'support', key: 'help' },
  { to: '/safe-zone', icon: 'watch', key: 'safe' },
];

export default function Account() {
  // TODO: API: GET /orders for the signed-in user (orders are kept in this browser for now).
  const { orders, reorder } = useCart();
  const { lang } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const statusText = (s: string) => {
    const k = `status:${s}`;
    const out = tr(k);
    return out === k ? s : out;
  };

  return (
    <>
      <Seo title={tr('title')} description={tr('intro')} noindex />
      <PageHeader title={tr('title')} lead={tr('intro')} />

      <div className="container grid gap-12 py-10 md:py-14 lg:grid-cols-[1.5fr_1fr]">
        <section aria-labelledby="orders-h">
          <h2 id="orders-h" className="sr-only">{tr('title')}</h2>
          {orders.length ? (
            <ul className="grid gap-4">
              {orders.map((o) => (
                <li key={o.id} className="rounded-card bg-white p-5 shadow-card md:p-6"
                  style={{ borderLeft: `5px solid ${o.status === 'awaiting-pharmacist' ? 'var(--mustard)' : 'var(--sage)'}` }}>
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="mb-0">{tr('order', { id: o.id })}</h3>
                      <span className="text-base text-grey">{formatDate(o.date, lang)}</span>
                    </div>
                    <Tag kind={o.status === 'awaiting-pharmacist' ? 'pharmacist' : 'status'}>{statusText(o.status)}</Tag>
                  </div>
                  <p className="text-base">
                    {o.items.map((i) => { const p = getProduct(i.id); return `${p ? loc(p).name : i.id} × ${i.qty}`; }).join(', ')}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mint pt-4">
                    <strong className="text-lead text-green">{formatPrice(o.total)}</strong>
                    <Button to="/cart" compact onClick={() => reorder(o)}>
                      <Icon name="refresh" size={18} /> {tr('reorder')}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-card bg-white p-8 shadow-card">
              <Icon name="package" size={40} className="mb-3 text-sage" />
              <h3>{tr('emptyTitle')}</h3>
              <p>{tr('emptyText')}</p>
              <Button to="/shop/medicines">{tr('orderMedicines')}</Button>
            </div>
          )}
        </section>

        <section aria-labelledby="acct-h">
          <h2 id="acct-h">{tr('yourAccount')}</h2>
          <ul className="divide-y divide-mint overflow-hidden rounded-card bg-white shadow-card">
            {sections.map((s) => (
              <li key={s.key}>
                <Link to={s.to} className="flex min-h-[72px] items-center gap-4 px-5 py-4 text-ink no-underline transition-colors hover:bg-cream">
                  <Icon name={s.icon} size={26} className="shrink-0 text-terracotta-deep" />
                  <span className="grid flex-1 leading-snug">
                    <strong className="text-green">{tr(`${s.key}.title`)}</strong>
                    <span className="text-base text-grey">{tr(`${s.key}.text`)}</span>
                  </span>
                  <Icon name="chevron" size={20} className="shrink-0 text-grey" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
