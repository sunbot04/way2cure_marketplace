import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getProduct } from '../data/products.js';
import { formatPrice } from '../config/site.js';
import { PageHead } from '../components/ui.jsx';
import { formatDate, useLang, useLoc, useT } from '../context/LangContext.jsx';

const T = {
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
    'status:Waiting for pharmacist check': 'Waiting for pharmacist check',
    'status:Packed, arriving today': 'Packed, arriving today',
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
    'status:Waiting for pharmacist check': 'फ़ार्मासिस्ट की जाँच बाकी है',
    'status:Packed, arriving today': 'पैक हो गया, आज पहुँचेगा',
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
    'status:Waiting for pharmacist check': 'फार्मासिस्टची तपासणी बाकी',
    'status:Packed, arriving today': 'पॅक झाले, आज पोहोचेल',
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
  const { orders, reorder } = useCart();
  const { lang } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const statusText = (s) => {
    const k = `status:${s}`;
    const out = tr(k);
    return out === k ? s : out;
  };

  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>
      <div className="container section-sm">
        {orders.length ? (
          <ul className="order-list">
            {orders.map((o) => (
              <li key={o.id} className="card order">
                <div className="order-head">
                  <div>
                    <strong>{tr('order', { id: o.id })}</strong>
                    <span className="small muted"> · {formatDate(o.date, lang)}</span>
                  </div>
                  <span className="tag tag-pharm">{statusText(o.status)}</span>
                </div>
                <p className="small">{o.items.map((i) => `${loc(getProduct(i.id))?.name ?? i.id} × ${i.qty}`).join(', ')}</p>
                <div className="order-foot">
                  <strong>{formatPrice(o.total)}</strong>
                  <Link to="/cart" className="btn btn-primary btn-sm" onClick={() => reorder(o)}>
                    <Icon name="refresh" size={18} /> {tr('reorder')}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty card">
            <Icon name="package" size={40} />
            <h2 className="h3">{tr('emptyTitle')}</h2>
            <p>{tr('emptyText')}</p>
            <Link to="/shop/medicines" className="btn btn-primary">{tr('orderMedicines')}</Link>
          </div>
        )}

        <h2 className="section-title">{tr('yourAccount')}</h2>
        <div className="grid grid-3">
          {sections.map((s) => (
            <Link key={s.key} to={s.to} className="card tile">
              <span className="tile-icon"><Icon name={s.icon} size={28} /></span>
              <span className="tile-text"><strong>{tr(`${s.key}.title`)}</strong><span>{tr(`${s.key}.text`)}</span></span>
              <Icon name="chevron" className="tile-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
