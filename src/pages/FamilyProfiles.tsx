import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import InfoBand from '../components/ui/InfoBand';
import { Field, Input, Select, Textarea, describedBy } from '../components/ui/Field';
import { HelpBox } from '../components/commerce/AppPanel';
import useStoredList from '../hooks/useStoredList';
import { useT, type Dict } from '../i18n/LangContext';

// Relations are saved as stable ids and shown in the reader's language.
const RELATIONS = ['mother', 'father', 'grandmother', 'grandfather', 'spouse', 'myself', 'other'];
interface Member { name: string; relation: string; age: string; phone: string; notes: string }
const EMPTY: Member = { name: '', relation: 'mother', age: '', phone: '', notes: '' };
type Errors = Partial<Record<'name' | 'age' | 'phone', string>>;

const T: Dict = {
  en: {
    eyebrow: 'Account',
    title: 'Family profiles',
    intro: 'Order medicines and book care for your parents or relatives. Each person keeps their own details, so the right order reaches the right home.',
    added: '{name} has been added.',
    years: '{age} years',
    phone: 'Phone {phone}',
    noDetails: 'No age or phone added',
    remove: 'Remove {name}',
    emptyTitle: 'No family members added yet.',
    emptyText: 'Add a parent or relative to order for them with their own address and medicines.',
    add: 'Add a family member',
    theirName: 'Their name',
    relation: 'They are your',
    age: 'Age (optional)',
    theirPhone: 'Their mobile (optional)',
    notes: 'Anything we should know (optional)',
    notesHint: 'For example: hard of hearing, please call me instead.',
    save: 'Save family member',
    cancel: 'Cancel',
    privateTitle: "Your family's details stay private.",
    privateText: 'We use them only for their orders and care, and never share them without consent.',
    addAddress: 'Add their delivery address',
    errName: 'Please add their name.',
    errAge: 'Please enter the age in years, for example 72.',
    errPhone: 'Please enter a 10-digit mobile number, or leave it empty.',
    'rel.mother': 'Mother', 'rel.father': 'Father', 'rel.grandmother': 'Grandmother', 'rel.grandfather': 'Grandfather',
    'rel.spouse': 'Spouse', 'rel.myself': 'Myself', 'rel.other': 'Other',
  },
  hi: {
    eyebrow: 'खाता',
    title: 'परिवार के सदस्य',
    intro: 'अपने माता-पिता या रिश्तेदारों के लिए दवाइयाँ मँगाएँ और देखभाल बुक करें। हर व्यक्ति की अपनी जानकारी अलग रहती है, ताकि सही ऑर्डर सही घर पहुँचे।',
    added: '{name} को जोड़ दिया गया है।',
    years: '{age} साल',
    phone: 'फ़ोन {phone}',
    noDetails: 'उम्र या फ़ोन नहीं जोड़ा गया',
    remove: '{name} को हटाएँ',
    emptyTitle: 'अभी तक परिवार का कोई सदस्य नहीं जोड़ा गया।',
    emptyText: 'माता-पिता या किसी रिश्तेदार को जोड़ें, ताकि उनके अपने पते और दवाइयों के साथ उनके लिए ऑर्डर कर सकें।',
    add: 'परिवार का सदस्य जोड़ें',
    theirName: 'उनका नाम',
    relation: 'आपसे उनका रिश्ता',
    age: 'उम्र (ज़रूरी नहीं)',
    theirPhone: 'उनका मोबाइल (ज़रूरी नहीं)',
    notes: 'कुछ और जो हमें पता होना चाहिए (ज़रूरी नहीं)',
    notesHint: 'जैसे: ऊँचा सुनते हैं, कृपया मुझे कॉल करें।',
    save: 'सदस्य सेव करें',
    cancel: 'रद्द करें',
    privateTitle: 'आपके परिवार की जानकारी निजी रहती है।',
    privateText: 'हम इसे सिर्फ़ उनके ऑर्डर और देखभाल के लिए इस्तेमाल करते हैं, और मंज़ूरी के बिना कभी किसी से शेयर नहीं करते।',
    addAddress: 'उनका डिलिवरी पता जोड़ें',
    errName: 'कृपया उनका नाम लिखें।',
    errAge: 'कृपया उम्र सालों में लिखें, जैसे 72।',
    errPhone: 'कृपया 10 अंकों का मोबाइल नंबर लिखें, या इसे खाली छोड़ दें।',
    'rel.mother': 'माँ', 'rel.father': 'पिता', 'rel.grandmother': 'दादी-नानी', 'rel.grandfather': 'दादा-नाना',
    'rel.spouse': 'पति-पत्नी', 'rel.myself': 'मैं खुद', 'rel.other': 'अन्य',
  },
  mr: {
    eyebrow: 'खाते',
    title: 'कुटुंबातील सदस्य',
    intro: 'तुमच्या आई-वडिलांसाठी किंवा नातेवाइकांसाठी औषधे मागवा आणि काळजी बुक करा. प्रत्येकाची माहिती वेगळी राहते, त्यामुळे योग्य ऑर्डर योग्य घरी पोहोचते.',
    added: '{name} यांना जोडले आहे.',
    years: '{age} वर्षे',
    phone: 'फोन {phone}',
    noDetails: 'वय किंवा फोन जोडलेला नाही',
    remove: '{name} यांना काढा',
    emptyTitle: 'अजून कुटुंबातील कोणताही सदस्य जोडलेला नाही.',
    emptyText: 'आई-वडील किंवा नातेवाइकांना जोडा, म्हणजे त्यांच्या स्वतःच्या पत्त्यासह आणि औषधांसह त्यांच्यासाठी ऑर्डर करता येईल.',
    add: 'कुटुंबातील सदस्य जोडा',
    theirName: 'त्यांचे नाव',
    relation: 'ते तुमचे कोण आहेत',
    age: 'वय (ऐच्छिक)',
    theirPhone: 'त्यांचा मोबाइल (ऐच्छिक)',
    notes: 'आम्हाला आणखी काही माहीत असावे का (ऐच्छिक)',
    notesHint: 'उदा.: कमी ऐकू येते, कृपया मला कॉल करा.',
    save: 'सदस्य सेव्ह करा',
    cancel: 'रद्द करा',
    privateTitle: 'तुमच्या कुटुंबाची माहिती खाजगी राहते.',
    privateText: 'आम्ही ती फक्त त्यांच्या ऑर्डर आणि काळजीसाठी वापरतो, आणि संमतीशिवाय कधीही कोणाला देत नाही.',
    addAddress: 'त्यांचा डिलिव्हरी पत्ता जोडा',
    errName: 'कृपया त्यांचे नाव लिहा.',
    errAge: 'कृपया वय वर्षांमध्ये लिहा, उदा. 72.',
    errPhone: 'कृपया 10 अंकी मोबाइल नंबर लिहा, किंवा रिकामे ठेवा.',
    'rel.mother': 'आई', 'rel.father': 'वडील', 'rel.grandmother': 'आजी', 'rel.grandfather': 'आजोबा',
    'rel.spouse': 'पती-पत्नी', 'rel.myself': 'मी स्वतः', 'rel.other': 'इतर',
  },
};

export default function FamilyProfiles() {
  const tr = useT(T);
  // TODO: API: family members belong to the account (GET/POST/DELETE /family).
  const { list, add, remove } = useStoredList<Member>('w2c-family');
  const [f, setF] = useState<Member>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState('');

  const set = (k: keyof Member) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });
  // Older saves stored the English word ("Mother"), so match on the lower-cased value too.
  const relLabel = (r = '') => {
    const k = `rel.${r.toLowerCase()}`;
    const out = tr(k);
    return out === k ? r : out;
  };
  const err = (k: keyof Errors) => (errors[k] ? tr(errors[k]!) : undefined);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!f.name.trim()) er.name = 'errName';
    if (f.age && !/^\d{1,3}$/.test(f.age)) er.age = 'errAge';
    if (f.phone && !/^[6-9]\d{9}$/.test(f.phone)) er.phone = 'errPhone';
    setErrors(er);
    if (Object.keys(er).length) return;
    add({ ...f, name: f.name.trim() });
    setSaved(f.name.trim());
    setF(EMPTY);
    setOpen(false);
  };

  return (
    <>
      <Seo title={tr('title')} description={tr('intro')} noindex />
      <PageHeader title={tr('title')} lead={tr('intro')} crumbs={[{ label: tr('eyebrow'), to: '/account' }, { label: tr('title') }]} />

      <div className="container grid items-start gap-10 py-8 md:py-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-5">
          <div aria-live="polite">
            {saved && (
              <p className="m-0 flex items-center gap-2 rounded-card bg-sage-tint px-4 py-3 font-bold text-green">
                <Icon name="check" size={20} /> {tr('added', { name: saved })}
              </p>
            )}
          </div>

          {list.length ? (
            <ul className="grid gap-4">
              {list.map((p) => (
                <li key={p.id} className="rounded-card bg-white p-5 shadow-card md:p-6" style={{ borderLeft: '5px solid var(--sage)' }}>
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <h2 className="mb-0 font-body text-h3m md:text-h3">{p.name}</h2>
                    <Tag kind="rent">{relLabel(p.relation)}</Tag>
                  </div>
                  <p className="mb-2 text-base text-grey">
                    {[p.age && tr('years', { age: p.age }), p.phone && tr('phone', { phone: p.phone })].filter(Boolean).join(' · ') || tr('noDetails')}
                  </p>
                  {p.notes && <p className="mb-2 text-base">{p.notes}</p>}
                  <button type="button" onClick={() => remove(p.id)}
                    className="inline-flex min-h-tap items-center gap-2 font-bold text-terracotta-deep underline-offset-2 hover:underline">
                    <Icon name="trash" size={18} /> {tr('remove', { name: p.name })}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-card bg-white p-8 shadow-card">
              <Icon name="users" size={40} className="mb-3 text-sage" />
              <h2 className="font-body text-h3m md:text-h3">{tr('emptyTitle')}</h2>
              <p className="m-0">{tr('emptyText')}</p>
            </div>
          )}

          {!open && (
            <div>
              <Button onClick={() => { setOpen(true); setSaved(''); }}>
                <Icon name="plus" /> {tr('add')}
              </Button>
            </div>
          )}

          {open && (
            <form onSubmit={submit} noValidate className="grid gap-5 rounded-card bg-white p-6 shadow-card md:p-8">
              <h2 className="mb-0 font-body text-h3m md:text-h3">{tr('add')}</h2>
              <Field id="fm-name" label={tr('theirName')} error={err('name')}>
                <Input id="fm-name" value={f.name} onChange={set('name')} invalid={!!errors.name}
                  aria-describedby={describedBy('fm-name', { error: errors.name })} />
              </Field>
              <Field id="fm-rel" label={tr('relation')}>
                <Select id="fm-rel" value={f.relation} onChange={set('relation')}>
                  {RELATIONS.map((r) => <option key={r} value={r}>{tr(`rel.${r}`)}</option>)}
                </Select>
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="fm-age" label={tr('age')} error={err('age')}>
                  <Input id="fm-age" inputMode="numeric" maxLength={3} value={f.age} invalid={!!errors.age}
                    aria-describedby={describedBy('fm-age', { error: errors.age })}
                    onChange={(e) => setF({ ...f, age: e.target.value.replace(/\D/g, '') })} />
                </Field>
                <Field id="fm-phone" label={tr('theirPhone')} error={err('phone')}>
                  <Input id="fm-phone" type="tel" inputMode="numeric" maxLength={10} value={f.phone} invalid={!!errors.phone}
                    aria-describedby={describedBy('fm-phone', { error: errors.phone })}
                    onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '') })} />
                </Field>
              </div>
              <Field id="fm-notes" label={tr('notes')} hint={tr('notesHint')}>
                <Textarea id="fm-notes" rows={3} value={f.notes} onChange={set('notes')}
                  aria-describedby={describedBy('fm-notes', { hint: true })} />
              </Field>
              <div className="flex flex-wrap gap-3">
                <Button type="submit">{tr('save')}</Button>
                <Button variant="outline" onClick={() => { setOpen(false); setErrors({}); }}>{tr('cancel')}</Button>
              </div>
            </form>
          )}
        </div>

        <aside className="grid gap-5">
          <InfoBand icon="lock">
            <strong>{tr('privateTitle')}</strong> {tr('privateText')}
          </InfoBand>
          <Link to="/account/addresses" className="inline-flex min-h-tap items-center gap-2 font-bold">
            {tr('addAddress')} <Icon name="arrow" size={18} />
          </Link>
          <HelpBox />
        </aside>
      </div>
    </>
  );
}
