import { useState } from 'react';
import Icon from '../components/Icon';
import { Field, HelpBox, InfoBand, PageHead } from '../components/legacy-ui';
import useStoredList from '../hooks/useStoredList';
import { isServiceablePincode, SITE } from '../config/site';
import { useLoc, useT } from '../i18n/LangContext';

// Address labels are saved as stable ids and shown in the reader's language.
const LABELS = ['home', 'parents', 'work', 'other'];
// Older saves stored the English label; map those to ids.
const LEGACY = { Home: 'home', "Parents' home": 'parents', Work: 'work', Other: 'other' };
const EMPTY = { label: 'home', forWhom: '', house: '', area: '', pincode: '' };

const PAYMENTS = [
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

const T = {
  en: {
    eyebrow: 'Account',
    title: 'Addresses & payments',
    intro: "Save the addresses you order to, including your parents' home, so checkout takes one tap.",
    savedTitle: 'Saved addresses',
    savedNote: 'Address saved.',
    forWhom: 'For {name}',
    remove: 'Remove this address',
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
  const { list, add, remove } = useStoredList('w2c-addresses');
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const labelText = (l) => {
    const id = LEGACY[l] ?? l;
    return LABELS.includes(id) ? tr(`label.${id}`) : l;
  };
  const err = (k) => (errors[k] ? tr(errors[k], { cities: SITE.cities }) : undefined);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
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
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>

      <div className="container section-sm two-col">
        <div className="stack">
          <h2>{tr('savedTitle')}</h2>
          {saved && (
            <p className="added-note" role="status"><Icon name="check" size={18} /> {tr('savedNote')}</p>
          )}

          {list.length ? (
            <ul className="stack">
              {list.map((a) => (
                <li key={a.id} className="card card-edge-left" style={{ '--edge': 'var(--green)' }}>
                  <div className="order-head">
                    <h3>{labelText(a.label)}</h3>
                    {a.forWhom && <span className="tag tag-rent">{tr('forWhom', { name: a.forWhom })}</span>}
                  </div>
                  <p className="small">{a.house}, {a.area}, {a.pincode}</p>
                  <button type="button" className="link-btn" onClick={() => remove(a.id)}>
                    <Icon name="trash" size={18} /> {tr('remove')}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty card">
              <Icon name="pin" size={40} />
              <h3>{tr('emptyTitle')}</h3>
              <p>{tr('emptyText')}</p>
            </div>
          )}

          {!open && (
            <button type="button" className="btn btn-primary" onClick={() => { setOpen(true); setSaved(false); }}>
              <Icon name="plus" /> {tr('add')}
            </button>
          )}

          {open && (
            <div className="card form-card">
              <form onSubmit={submit} noValidate>
                <h3>{tr('add')}</h3>
                <div className="field-row">
                  <label className="select-label">{tr('saveAs')}
                    <select value={f.label} onChange={set('label')}>
                      {LABELS.map((o) => <option key={o} value={o}>{tr(`label.${o}`)}</option>)}
                    </select>
                  </label>
                  <Field id="ad-for" label={tr('forWhomLabel')}>
                    <input id="ad-for" value={f.forWhom} onChange={set('forWhom')} placeholder={tr('forWhomPlaceholder')} />
                  </Field>
                </div>
                <Field id="ad-house" label={tr('house')} error={err('house')}>
                  <input id="ad-house" autoComplete="address-line1" value={f.house} onChange={set('house')} aria-invalid={!!errors.house} />
                </Field>
                <Field id="ad-area" label={tr('area')} error={err('area')}>
                  <input id="ad-area" autoComplete="address-line2" value={f.area} onChange={set('area')} aria-invalid={!!errors.area} />
                </Field>
                <Field id="ad-pin" label={tr('pincode')} error={err('pincode')}>
                  <input id="ad-pin" inputMode="numeric" maxLength={6} autoComplete="postal-code" value={f.pincode}
                    onChange={(e) => setF({ ...f, pincode: e.target.value.replace(/\D/g, '') })} aria-invalid={!!errors.pincode} />
                </Field>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">{tr('save')}</button>
                  <button type="button" className="btn btn-outline" onClick={() => { setOpen(false); setErrors({}); }}>{tr('cancel')}</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="stack">
          <h2>{tr('payTitle')}</h2>
          <ul className="stack">
            {PAYMENTS.map((item) => {
              const p = loc(item);
              return (
                <li key={item.title} className="card tile">
                  <span className="tile-icon"><Icon name={p.icon} size={28} /></span>
                  <span className="tile-text"><strong>{p.title}</strong><span>{p.text}</span></span>
                </li>
              );
            })}
          </ul>
          <InfoBand icon="lock">
            <strong>{tr('safeTitle')}</strong> {tr('safeText')}
          </InfoBand>
          <HelpBox />
        </div>
      </div>
    </>
  );
}
