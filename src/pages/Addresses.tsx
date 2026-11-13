import { useState, type ChangeEvent, type FormEvent } from 'react';
import Icon from '../components/Icon';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import InfoBand from '../components/ui/InfoBand';
import { Field, Input, Select, describedBy } from '../components/ui/Field';
import useStoredList from '../hooks/useStoredList';
import { useConfirm } from '../context/ConfirmContext';
import { isServiceablePincode, SITE } from '../config/site';
import { useLoc, useT, type Dict } from '../i18n/LangContext';

// Address labels are saved as stable ids and shown in the reader's language.
const LABELS = ['home', 'parents', 'work', 'other'];
// Older saves stored the English label; map those to ids.
const LEGACY: Record<string, string> = { Home: 'home', "Parents' home": 'parents', Work: 'work', Other: 'other' };
interface Address { label: string; forWhom: string; house: string; area: string; pincode: string }
const EMPTY: Address = { label: 'home', forWhom: '', house: '', area: '', pincode: '' };
type Errors = Partial<Record<'house' | 'area' | 'pincode', string>>;

interface PayText { title: string; text: string }
const PAYMENTS: (PayText & { icon: string; hi?: Partial<PayText>; mr?: Partial<PayText> })[] = [
  { icon: 'phoneApp', title: 'UPI', text: 'GPay, PhonePe, Paytm or any UPI app',
    hi: { title: 'यूपीआई', text: 'GPay, PhonePe, Paytm या कोई भी यूपीआई ऐप' },
    mr: { title: 'यूपीआय', text: 'GPay, PhonePe, Paytm किंवा कोणतेही यूपीआय ॲप' } },
  { icon: 'lock', title: 'Credit and debit cards', text: 'Visa, Mastercard, RuPay',
    hi: { title: 'क्रेडिट और डेबिट कार्ड' },
    mr: { title: 'क्रेडिट आणि डेबिट कार्ड' } },
  { icon: 'verified', title: 'Net banking', text: 'All major Indian banks',
    hi: { title: 'नेट बैंकिंग', text: 'सभी बड़े भारतीय बैंक' },
    mr: { title: 'नेट बँकिंग', text: 'सर्व प्रमुख भारतीय बँका' } },
];

const T: Dict = {
  en: {
    eyebrow: 'Account',
    title: 'Addresses & payments',
    intro: "Save the addresses you order to, including your parents' home, so checkout takes one tap.",
    savedTitle: 'Saved addresses',
    savedNote: 'Address saved.',
    forWhom: 'For {name}',
    remove: 'Remove this address',
    confirmTitle: 'Remove this address?', confirmText: 'Are you sure you want to remove this address? You can add it again at any time.', confirmYes: 'Yes, remove', confirmNo: 'Keep it',
    emptyTitle: 'No saved addresses yet.',
    emptyText: 'Add one now, or we will save it the first time you check out.',
    add: 'Add an address',
    saveAs: 'Save as',
    forWhomLabel: 'For whom (optional)',
    forWhomPlaceholder: 'e.g. Mother',
    house: 'Flat / house no. and building',
    area: 'Area and street',
    pincode: 'Pincode',
    save: 'Save address',
    cancel: 'Cancel',
    payTitle: 'How you can pay',
    safeTitle: 'We never store your card or UPI PIN.',
    safeText: 'Payments go through a secure payment partner. You see the full price, including delivery, before you pay.',
    errHouse: 'Please add the flat or house number and building.',
    errArea: 'Please add the area or street.',
    errPin: 'Please enter a 6-digit pincode.',
    errPinArea: 'We do not deliver to this pincode yet. We serve {cities}.',
    'label.home': 'Home', 'label.parents': "Parents' home", 'label.work': 'Work', 'label.other': 'Other',
  },
  hi: {
    eyebrow: 'खाता',
    title: 'पते और भुगतान',
    intro: 'जिन पतों पर आप ऑर्डर भेजते हैं, उन्हें सेव कर लें, माता-पिता का घर भी। फिर चेकआउट एक टैप में हो जाएगा।',
    savedTitle: 'सेव किए गए पते',
    savedNote: 'पता सेव हो गया।',
    forWhom: '{name} के लिए',
    remove: 'यह पता हटाएँ',
    confirmTitle: 'यह पता हटाएँ?', confirmText: 'क्या आप सच में यह पता हटाना चाहते हैं? आप इसे कभी भी फिर से जोड़ सकते हैं।', confirmYes: 'हाँ, हटाएँ', confirmNo: 'रहने दें',
    emptyTitle: 'अभी तक कोई पता सेव नहीं है।',
    emptyText: 'अभी जोड़ें, या पहली बार चेकआउट करने पर हम इसे सेव कर लेंगे।',
    add: 'पता जोड़ें',
    saveAs: 'इस नाम से सेव करें',
    forWhomLabel: 'किसके लिए (ज़रूरी नहीं)',
    forWhomPlaceholder: 'जैसे माँ',
    house: 'फ़्लैट / घर नंबर और बिल्डिंग',
    area: 'इलाका और गली',
    pincode: 'पिनकोड',
    save: 'पता सेव करें',
    cancel: 'रद्द करें',
    payTitle: 'आप कैसे भुगतान कर सकते हैं',
    safeTitle: 'हम आपका कार्ड या यूपीआई पिन कभी सेव नहीं करते।',
    safeText: 'भुगतान एक सुरक्षित पेमेंट पार्टनर के ज़रिए होता है। भुगतान से पहले आपको डिलिवरी समेत पूरी कीमत दिखती है।',
    errHouse: 'कृपया फ़्लैट या घर नंबर और बिल्डिंग लिखें।',
    errArea: 'कृपया इलाका या गली लिखें।',
    errPin: 'कृपया 6 अंकों का पिनकोड लिखें।',
    errPinArea: 'अभी हम इस पिनकोड पर डिलिवरी नहीं करते। हम मुंबई, नवी मुंबई और ठाणे में सेवा देते हैं।',
    'label.home': 'घर', 'label.parents': 'माता-पिता का घर', 'label.work': 'ऑफ़िस', 'label.other': 'अन्य',
  },
  mr: {
    eyebrow: 'खाते',
    title: 'पत्ते आणि पेमेंट',
    intro: 'तुम्ही ज्या पत्त्यांवर ऑर्डर पाठवता ते सेव्ह करा, आई-वडिलांचे घरही. मग चेकआउट एका टॅपमध्ये होईल.',
    savedTitle: 'सेव्ह केलेले पत्ते',
    savedNote: 'पत्ता सेव्ह झाला.',
    forWhom: '{name} यांच्यासाठी',
    remove: 'हा पत्ता काढा',
    confirmTitle: 'हा पत्ता काढायचा?', confirmText: 'तुम्हाला खरंच हा पत्ता काढायचा आहे का? तुम्ही तो कधीही पुन्हा जोडू शकता.', confirmYes: 'हो, काढा', confirmNo: 'राहू द्या',
    emptyTitle: 'अजून कोणताही पत्ता सेव्ह केलेला नाही.',
    emptyText: 'आत्ता जोडा, किंवा पहिल्यांदा चेकआउट करताना आम्ही तो सेव्ह करू.',
    add: 'पत्ता जोडा',
    saveAs: 'या नावाने सेव्ह करा',
    forWhomLabel: 'कोणासाठी (ऐच्छिक)',
    forWhomPlaceholder: 'उदा. आई',
    house: 'फ्लॅट / घर क्रमांक आणि बिल्डिंग',
    area: 'परिसर आणि रस्ता',
    pincode: 'पिनकोड',
    save: 'पत्ता सेव्ह करा',
    cancel: 'रद्द करा',
    payTitle: 'तुम्ही कसे पेमेंट करू शकता',
    safeTitle: 'आम्ही तुमचे कार्ड किंवा यूपीआय पिन कधीही सेव्ह करत नाही.',
    safeText: 'पेमेंट सुरक्षित पेमेंट पार्टनरमार्फत होते. पेमेंट करण्यापूर्वी तुम्हाला डिलिव्हरीसह पूर्ण किंमत दिसते.',
    errHouse: 'कृपया फ्लॅट किंवा घर क्रमांक आणि बिल्डिंग लिहा.',
    errArea: 'कृपया परिसर किंवा रस्ता लिहा.',
    errPin: 'कृपया 6 अंकी पिनकोड लिहा.',
    errPinArea: 'आम्ही अजून या पिनकोडवर डिलिव्हरी करत नाही. आम्ही मुंबई, नवी मुंबई आणि ठाणे येथे सेवा देतो.',
    'label.home': 'घर', 'label.parents': 'आई-वडिलांचे घर', 'label.work': 'ऑफिस', 'label.other': 'इतर',
  },
};

export default function Addresses() {
  const tr = useT(T);
  const loc = useLoc();
  // TODO: API: saved addresses belong to the account (GET/POST/DELETE /addresses).
  const { list, add, remove } = useStoredList<Address>('w2c-addresses');
  const confirm = useConfirm();
  // "Are you sure?" before an address is removed
  const askRemove = async (id: string) => {
    if (await confirm({ title: tr('confirmTitle'), message: tr('confirmText'), confirmLabel: tr('confirmYes'), cancelLabel: tr('confirmNo') })) remove(id);
  };
  const [f, setF] = useState<Address>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof Address) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const labelText = (l: string) => {
    const id = LEGACY[l] ?? l;
    return LABELS.includes(id) ? tr(`label.${id}`) : l;
  };
  const err = (k: keyof Errors) => (errors[k] ? tr(errors[k]!, { cities: SITE.cities }) : undefined);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!f.house.trim()) er.house = 'errHouse';
    if (!f.area.trim()) er.area = 'errArea';
    if (!/^\d{6}$/.test(f.pincode)) er.pincode = 'errPin';
    else if (!isServiceablePincode(f.pincode)) er.pincode = 'errPinArea';
    setErrors(er);
    if (Object.keys(er).length) return;
    add(f);
    setSaved(true);
    setF(EMPTY);
    setOpen(false);
  };

  return (
    <>
      <Seo title={tr('title')} description={tr('intro')} noindex />
      <PageHeader title={tr('title')} lead={tr('intro')} crumbs={[{ label: tr('eyebrow'), to: '/account' }, { label: tr('title') }]} />

      <div className="container grid items-start gap-12 py-8 md:py-10 lg:grid-cols-[1.5fr_1fr]">
        <section className="grid gap-5" aria-labelledby="saved-h">
          <h2 id="saved-h" className="mb-0">{tr('savedTitle')}</h2>
          <div aria-live="polite">
            {saved && (
              <p className="m-0 flex items-center gap-2 rounded-card bg-sage-tint px-4 py-3 font-bold text-green">
                <Icon name="check" size={20} /> {tr('savedNote')}
              </p>
            )}
          </div>

          {list.length ? (
            <ul className="grid gap-4">
              {list.map((a) => (
                <li key={a.id} className="rounded-card bg-white p-5 shadow-card md:p-6" style={{ borderLeft: '5px solid var(--green)' }}>
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="mb-0">{labelText(a.label)}</h3>
                    {a.forWhom && <Tag kind="rent">{tr('forWhom', { name: a.forWhom })}</Tag>}
                  </div>
                  <p className="mb-2 text-base">{a.house}, {a.area}, {a.pincode}</p>
                  <button type="button" onClick={() => askRemove(a.id)}
                    className="inline-flex min-h-tap items-center gap-2 font-bold text-terracotta-deep underline-offset-2 hover:underline">
                    <Icon name="trash" size={18} /> {tr('remove')}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-card bg-white p-8 shadow-card">
              <Icon name="pin" size={40} className="mb-3 text-sage" />
              <h3>{tr('emptyTitle')}</h3>
              <p className="m-0">{tr('emptyText')}</p>
            </div>
          )}

          {!open && (
            <div>
              <Button onClick={() => { setOpen(true); setSaved(false); }}>
                <Icon name="plus" /> {tr('add')}
              </Button>
            </div>
          )}

          {open && (
            <form onSubmit={submit} noValidate className="grid gap-5 rounded-card bg-white p-6 shadow-card md:p-8">
              <h3 className="mb-0">{tr('add')}</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="ad-label" label={tr('saveAs')}>
                  <Select id="ad-label" value={f.label} onChange={set('label')}>
                    {LABELS.map((o) => <option key={o} value={o}>{tr(`label.${o}`)}</option>)}
                  </Select>
                </Field>
                <Field id="ad-for" label={tr('forWhomLabel')}>
                  <Input id="ad-for" value={f.forWhom} onChange={set('forWhom')} placeholder={tr('forWhomPlaceholder')} />
                </Field>
              </div>
              <Field id="ad-house" label={tr('house')} error={err('house')}>
                <Input id="ad-house" autoComplete="address-line1" value={f.house} onChange={set('house')} invalid={!!errors.house}
                  aria-describedby={describedBy('ad-house', { error: errors.house })} />
              </Field>
              <Field id="ad-area" label={tr('area')} error={err('area')}>
                <Input id="ad-area" autoComplete="address-line2" value={f.area} onChange={set('area')} invalid={!!errors.area}
                  aria-describedby={describedBy('ad-area', { error: errors.area })} />
              </Field>
              <Field id="ad-pin" label={tr('pincode')} error={err('pincode')} className="sm:max-w-[15rem]">
                <Input id="ad-pin" inputMode="numeric" maxLength={6} autoComplete="postal-code" value={f.pincode} invalid={!!errors.pincode}
                  aria-describedby={describedBy('ad-pin', { error: errors.pincode })}
                  onChange={(e) => setF({ ...f, pincode: e.target.value.replace(/\D/g, '') })} />
              </Field>
              <div className="flex flex-wrap gap-3">
                <Button type="submit">{tr('save')}</Button>
                <Button variant="outline" onClick={() => { setOpen(false); setErrors({}); }}>{tr('cancel')}</Button>
              </div>
            </form>
          )}
        </section>

        <aside className="grid gap-5" aria-labelledby="pay-h">
          <h2 id="pay-h" className="mb-0">{tr('payTitle')}</h2>
          <ul className="divide-y divide-mint overflow-hidden rounded-card bg-white shadow-card">
            {PAYMENTS.map((item) => {
              const p = loc(item);
              return (
                <li key={item.title} className="flex items-center gap-4 px-5 py-4">
                  <Icon name={p.icon} size={26} className="shrink-0 text-green" />
                  <span className="grid leading-snug">
                    <strong className="text-green">{p.title}</strong>
                    <span className="text-base text-grey">{p.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <InfoBand icon="lock">
            <strong>{tr('safeTitle')}</strong> {tr('safeText')}
          </InfoBand>
        </aside>
      </div>
    </>
  );
}
