import { useState, type ReactNode } from 'react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { useCart } from '../context/CartContext';
import { REMIND_DAYS_BEFORE, useNotifications, type Note, type OrderNote, type Reminder } from '../context/NotificationsContext';
import { getProduct } from '../data';
import { formatDate, useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
  en: {
    seoDesc: 'Refill reminders, upcoming deliveries and order updates from Way2Cure.',
    title: 'Notifications',
    lead: 'Refill reminders, upcoming deliveries and order updates.',
    home: 'Home',
    feed: 'Reminders and updates',
    markAll: 'Mark all as read',
    markRead: 'Mark as read',
    newLabel: 'New',
    refillTitle: 'Time to reorder {name}',
    refillText: 'Your {days}-day supply runs out on {date}. Reorder now so it arrives in time.',
    reorder: 'Reorder now',
    reordered: 'Added to cart',
    deliveryTitle: 'Next delivery: {name}',
    deliveryText: 'Your monthly plan delivers again on {date}. Need a change? Pause or edit before then.',
    managePlan: 'Manage plan',
    orderTitle: 'Order {id} placed',
    orderRx: 'A pharmacist is checking your prescription. We will call if anything is unclear.',
    orderPacked: 'Your order is packed and will be on its way soon.',
    orderDelivered: 'Your order was delivered.',
    viewOrder: 'View order',
    upcoming: 'Coming up',
    upcomingLead: 'We remind you {n} days before each supply runs out or each plan delivery.',
    upcomingItem: 'Reminder on {remind} · runs out on {date}',
    upcomingPlan: 'Reminder on {remind} · delivers on {date}',
    emptyTitle: 'No notifications yet',
    emptyText: 'When you order supplies like adult diapers or regular medicines, choose how long they should last. We remind you {n} days before they run out, so you never run short.',
    shopDaily: 'Shop daily care',
    allRead: 'You are all caught up.',
    howTitle: 'How you get reminders',
    howText: 'Reminders show here and on your account page. Turn on alerts to also get them on this device while the site is open.',
    smsSoon: 'SMS and WhatsApp reminders are coming soon.',
    enableAlerts: 'Turn on alerts',
    alertsOn: 'Alerts are on for this device.',
    alertsBlocked: 'Alerts are blocked in your browser settings.',
  },
  hi: {
    seoDesc: 'Way2Cure से रीफ़िल रिमाइंडर, आने वाली डिलिवरी और ऑर्डर की जानकारी।',
    title: 'सूचनाएँ',
    lead: 'रीफ़िल रिमाइंडर, आने वाली डिलिवरी और ऑर्डर की जानकारी।',
    home: 'होम',
    feed: 'रिमाइंडर और अपडेट',
    markAll: 'सभी को पढ़ा हुआ करें',
    markRead: 'पढ़ा हुआ करें',
    newLabel: 'नया',
    refillTitle: '{name} दोबारा मँगाने का समय',
    refillText: 'आपकी {days} दिन की सप्लाई {date} को ख़त्म होगी। अभी मँगाएँ ताकि समय पर पहुँचे।',
    reorder: 'अभी दोबारा मँगाएँ',
    reordered: 'कार्ट में डाला',
    deliveryTitle: 'अगली डिलिवरी: {name}',
    deliveryText: 'आपका मासिक प्लान {date} को फिर से डिलिवर करेगा। कुछ बदलना है? उससे पहले रोकें या बदलें।',
    managePlan: 'प्लान बदलें',
    orderTitle: 'ऑर्डर {id} हो गया',
    orderRx: 'फ़ार्मासिस्ट आपका पर्चा जाँच रहे हैं। कुछ साफ़ न हो तो हम कॉल करेंगे।',
    orderPacked: 'आपका ऑर्डर पैक हो गया है और जल्द ही रवाना होगा।',
    orderDelivered: 'आपका ऑर्डर पहुँच गया है।',
    viewOrder: 'ऑर्डर देखें',
    upcoming: 'आगे आने वाले',
    upcomingLead: 'हर सप्लाई ख़त्म होने या प्लान की डिलिवरी से {n} दिन पहले हम याद दिलाते हैं।',
    upcomingItem: '{remind} को रिमाइंडर · {date} को ख़त्म',
    upcomingPlan: '{remind} को रिमाइंडर · {date} को डिलिवरी',
    emptyTitle: 'अभी कोई सूचना नहीं',
    emptyText: 'जब आप एडल्ट डायपर या रोज़ की दवाइयाँ मँगाएँ, तो चुनें कि वे कितने दिन चलेंगी। ख़त्म होने से {n} दिन पहले हम याद दिलाएँगे, ताकि कभी कमी न पड़े।',
    shopDaily: 'रोज़ की देखभाल का सामान देखें',
    allRead: 'सब पढ़ लिया गया है।',
    howTitle: 'रिमाइंडर कैसे मिलते हैं',
    howText: 'रिमाइंडर यहाँ और आपके खाते के पेज पर दिखते हैं। अलर्ट चालू करें ताकि साइट खुली होने पर इस डिवाइस पर भी मिलें।',
    smsSoon: 'SMS और व्हाट्सऐप रिमाइंडर जल्द आ रहे हैं।',
    enableAlerts: 'अलर्ट चालू करें',
    alertsOn: 'इस डिवाइस पर अलर्ट चालू हैं।',
    alertsBlocked: 'आपके ब्राउज़र सेटिंग में अलर्ट बंद हैं।',
  },
  mr: {
    seoDesc: 'Way2Cure कडून रिफिल आठवण, येणाऱ्या डिलिव्हरी आणि ऑर्डरची माहिती.',
    title: 'सूचना',
    lead: 'रिफिल आठवण, येणाऱ्या डिलिव्हरी आणि ऑर्डरची माहिती.',
    home: 'मुख्यपृष्ठ',
    feed: 'आठवणी आणि अपडेट',
    markAll: 'सर्व वाचले म्हणून खूण करा',
    markRead: 'वाचले म्हणून खूण करा',
    newLabel: 'नवीन',
    refillTitle: '{name} पुन्हा मागवण्याची वेळ',
    refillText: 'तुमचा {days} दिवसांचा साठा {date} रोजी संपेल. वेळेत पोहोचण्यासाठी आत्ताच मागवा.',
    reorder: 'आत्ताच पुन्हा मागवा',
    reordered: 'कार्टमध्ये टाकले',
    deliveryTitle: 'पुढील डिलिव्हरी: {name}',
    deliveryText: 'तुमचा मासिक प्लॅन {date} रोजी पुन्हा डिलिव्हर करेल. काही बदलायचे आहे? त्याआधी थांबवा किंवा बदला.',
    managePlan: 'प्लॅन बदला',
    orderTitle: 'ऑर्डर {id} झाली',
    orderRx: 'फार्मासिस्ट तुमचे प्रिस्क्रिप्शन तपासत आहेत. काही अस्पष्ट असल्यास आम्ही कॉल करू.',
    orderPacked: 'तुमची ऑर्डर पॅक झाली आहे आणि लवकरच निघेल.',
    orderDelivered: 'तुमची ऑर्डर पोहोचली आहे.',
    viewOrder: 'ऑर्डर पाहा',
    upcoming: 'पुढे येणारे',
    upcomingLead: 'प्रत्येक साठा संपण्याच्या किंवा प्लॅनच्या डिलिव्हरीच्या {n} दिवस आधी आम्ही आठवण करून देतो.',
    upcomingItem: '{remind} रोजी आठवण · {date} रोजी संपेल',
    upcomingPlan: '{remind} रोजी आठवण · {date} रोजी डिलिव्हरी',
    emptyTitle: 'अजून कोणतीही सूचना नाही',
    emptyText: 'प्रौढ डायपर किंवा नेहमीची औषधे मागवताना ती किती दिवस पुरतील ते निवडा. संपण्याच्या {n} दिवस आधी आम्ही आठवण करून देऊ, म्हणजे कधीही तुटवडा पडणार नाही.',
    shopDaily: 'दैनंदिन काळजीच्या वस्तू पाहा',
    allRead: 'सर्व वाचून झाले आहे.',
    howTitle: 'आठवण कशी मिळते',
    howText: 'आठवणी इथे आणि तुमच्या खात्याच्या पानावर दिसतात. साइट उघडी असताना या डिव्हाइसवरही मिळवण्यासाठी अलर्ट चालू करा.',
    smsSoon: 'SMS आणि व्हॉट्सॲप आठवणी लवकरच येत आहेत.',
    enableAlerts: 'अलर्ट चालू करा',
    alertsOn: 'या डिव्हाइसवर अलर्ट चालू आहेत.',
    alertsBlocked: 'तुमच्या ब्राउझर सेटिंग्जमध्ये अलर्ट बंद आहेत.',
  },
};

const ICON: Record<Note['kind'], string> = { refill: 'refresh', delivery: 'truck', order: 'package' };

export default function Notifications() {
  const { lang, t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const { add } = useCart();
  const { due, upcoming, unread, isRead, markRead, markAllRead, demoDays, setDemoDays } = useNotifications();
  const [done, setDone] = useState<string | null>(null);
  const [perm, setPerm] = useState(() => (typeof Notification === 'undefined' ? 'unsupported' : Notification.permission));

  const date = (ms: number) => formatDate(ms, lang, { day: 'numeric', month: 'short' });
  const name = (id: string) => { const p = getProduct(id); return p ? loc(p).name : id; };

  const reorder = (n: Reminder) => {
    add(n.productId, 'buy', n.qty, n.supplyDays);
    markRead(n.id);
    setDone(n.id);
  };

  const askAlerts = async () => {
    if (typeof Notification === 'undefined') return;
    setPerm(await Notification.requestPermission());
  };

  // Demo controls: on the local dev server, or on any build when opened with ?demo=1.
  const showDemo = import.meta.env.DEV || new URLSearchParams(window.location.search).has('demo');

  const renderNote = (n: Note) => {
    const unreadNote = !isRead(n.id);
    let title = '', text = '', action: ReactNode = null;
    if (n.kind === 'refill') {
      title = tr('refillTitle', { name: name(n.productId) });
      text = tr('refillText', { days: n.supplyDays, date: date(n.dueAt) });
      action = done === n.id
        ? <span className="inline-flex min-h-tap items-center gap-1.5 font-bold text-green"><Icon name="check" size={18} /> {tr('reordered')}</span>
        : <Button compact onClick={() => reorder(n)}><Icon name="cart" size={18} /> {tr('reorder')}</Button>;
    } else if (n.kind === 'delivery') {
      title = tr('deliveryTitle', { name: name(n.productId) });
      text = tr('deliveryText', { date: date(n.dueAt) });
      action = <Button compact variant="outline" to="/subscriptions#manage">{tr('managePlan')}</Button>;
    } else {
      title = tr('orderTitle', { id: n.orderId });
      const status = (n as OrderNote).status;
      text = status === 'awaiting-pharmacist' ? tr('orderRx') : status === 'delivered' ? tr('orderDelivered') : tr('orderPacked');
      action = <Button compact variant="outline" to="/account">{tr('viewOrder')}</Button>;
    }
    return (
      <li key={n.id} className={`flex gap-4 rounded-card p-5 ${unreadNote ? 'bg-white shadow-card' : 'bg-white/60'}`}>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${n.kind === 'refill' ? 'bg-mustard/30 text-green' : 'bg-sage-tint text-green'}`}>
          <Icon name={ICON[n.kind]} size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="m-0 text-body">{title}</h3>
            {unreadNote && <span className="rounded-full bg-terracotta-deep px-2 py-0.5 text-small font-bold text-white">{tr('newLabel')}</span>}
            <span className="ml-auto text-small text-grey">{date(n.at)}</span>
          </div>
          <p className="mb-3 mt-1 text-base text-ink/80">{text}</p>
          <div className="flex flex-wrap items-center gap-3">
            {action}
            {unreadNote && (
              <button type="button" onClick={() => markRead(n.id)} className="inline-flex min-h-tap items-center px-1 text-base font-bold text-green underline-offset-4 hover:underline">
                {tr('markRead')}
              </button>
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} noindex />
      <PageHeader title={tr('title')} lead={tr('lead')} crumbs={[{ label: tr('home'), to: '/' }, { label: t('account'), to: '/account' }, { label: tr('title') }]} />

      <div className="container grid gap-10 pb-16 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <section aria-labelledby="feed">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 id="feed" className="m-0 text-h2m">{tr('feed')}</h2>
            {unread > 0 && (
              <button type="button" onClick={markAllRead} className="inline-flex min-h-tap items-center gap-1.5 font-bold text-green underline-offset-4 hover:underline">
                <Icon name="check" size={18} /> {tr('markAll')}
              </button>
            )}
          </div>

          {due.length === 0 ? (
            <div className="rounded-card bg-white p-8 shadow-card">
              <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-sage-tint text-green"><Icon name="bell" size={26} /></span>
              <h3>{tr('emptyTitle')}</h3>
              <p>{tr('emptyText', { n: REMIND_DAYS_BEFORE })}</p>
              <Button to="/shop/daily-care" variant="outline">{tr('shopDaily')}</Button>
            </div>
          ) : (
            <>
              {unread === 0 && <p className="text-base text-grey">{tr('allRead')}</p>}
              <ul className="grid gap-3" aria-live="polite">{due.map(renderNote)}</ul>
            </>
          )}
        </section>

        <aside className="grid content-start gap-6">
          {upcoming.length > 0 && (
            <section aria-labelledby="upcoming" className="rounded-card bg-white p-6 shadow-card">
              <h2 id="upcoming" className="mb-1 text-h3m md:text-h3">{tr('upcoming')}</h2>
              <p className="text-base text-grey">{tr('upcomingLead', { n: REMIND_DAYS_BEFORE })}</p>
              <ul className="grid gap-3">
                {upcoming.map((n) => (
                  <li key={n.id} className="flex items-start gap-3 border-t border-line pt-3">
                    <Icon name={n.kind === 'delivery' ? 'truck' : 'calendar'} size={20} className="mt-1 shrink-0 text-sage" />
                    <span className="grid">
                      <strong className="text-green">{name(n.productId)}</strong>
                      <span className="text-base text-grey">
                        {tr(n.kind === 'delivery' ? 'upcomingPlan' : 'upcomingItem', { remind: date(n.at), date: date(n.dueAt) })}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="how" className="rounded-card bg-white p-6 shadow-card">
            <h2 id="how" className="mb-2 text-h3m md:text-h3">{tr('howTitle')}</h2>
            <p className="text-base">{tr('howText')}</p>
            {perm === 'granted' && <p className="m-0 flex items-center gap-2 font-bold text-green"><Icon name="check" size={18} /> {tr('alertsOn')}</p>}
            {perm === 'denied' && <p className="m-0 text-base font-bold text-terracotta-deep">{tr('alertsBlocked')}</p>}
            {perm === 'default' && <Button variant="outline" compact onClick={askAlerts}><Icon name="bell" size={18} /> {tr('enableAlerts')}</Button>}
            <p className="mb-0 mt-4 text-small text-grey">{tr('smsSoon')}</p>
          </section>

          {showDemo && (
            <section aria-labelledby="demo" className="rounded-card border-2 border-dashed border-mint p-5">
              <h2 id="demo" className="mb-1 text-body">Demo: move time forward</h2>
              <p className="text-small text-grey">
                For testing only. Place an order for a supply (e.g. adult diapers, 30 days), then jump ahead to see the reminder.
              </p>
              <div className="flex flex-wrap gap-2">
                {[0, 12, 27, 57].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDemoDays(d)}
                    className={`min-h-[2.75rem] rounded-btn border-2 px-3 text-base font-bold ${demoDays === d ? 'border-green bg-green text-white' : 'border-mint text-green'}`}
                  >
                    {d === 0 ? 'Today' : `+${d} days`}
                  </button>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
