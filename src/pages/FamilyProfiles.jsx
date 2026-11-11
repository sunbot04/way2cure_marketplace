import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Field, HelpBox, InfoBand, PageHead } from '../components/ui.jsx';
import useStoredList from '../hooks/useStoredList.js';

const RELATIONS = ['Mother', 'Father', 'Grandmother', 'Grandfather', 'Spouse', 'Myself', 'Other'];
const EMPTY = { name: '', relation: 'Mother', age: '', phone: '', notes: '' };

export default function FamilyProfiles() {
  const { list, add, remove } = useStoredList('w2c-family');
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState('');

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Please add their name.';
    if (f.age && !/^\d{1,3}$/.test(f.age)) er.age = 'Please enter the age in years, for example 72.';
    if (f.phone && !/^[6-9]\d{9}$/.test(f.phone)) er.phone = 'Please enter a 10-digit mobile number, or leave it empty.';
    setErrors(er);
    if (Object.keys(er).length) return;
    add({ ...f, name: f.name.trim() });
    setSaved(f.name.trim());
    setF(EMPTY);
    setOpen(false);
  };

  return (
    <>
      <PageHead eyebrow="Account" title="Family profiles">
        <p>Order medicines and book care for your parents or relatives. Each person keeps their own details, so the right order reaches the right home.</p>
      </PageHead>

      <div className="container section-sm two-col">
        <div className="stack">
          {saved && (
            <p className="added-note" role="status">
              <Icon name="check" size={18} /> {saved} has been added.
            </p>
          )}

          {list.length ? (
            <ul className="stack">
              {list.map((p) => (
                <li key={p.id} className="card card-edge-left" style={{ '--edge': 'var(--sage)' }}>
                  <div className="order-head">
                    <h2 className="h3">{p.name}</h2>
                    <span className="tag tag-rent">{p.relation}</span>
                  </div>
                  <p className="small">
                    {[p.age && `${p.age} years`, p.phone && `Phone ${p.phone}`].filter(Boolean).join(' · ') || 'No age or phone added'}
                  </p>
                  {p.notes && <p className="small">{p.notes}</p>}
                  <button type="button" className="link-btn" onClick={() => remove(p.id)}>
                    <Icon name="trash" size={18} /> Remove {p.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty card">
              <Icon name="users" size={40} />
              <h2 className="h3">No family members added yet.</h2>
              <p>Add a parent or relative to order for them with their own address and medicines.</p>
            </div>
          )}

          {!open && (
            <button type="button" className="btn btn-primary" onClick={() => { setOpen(true); setSaved(''); }}>
              <Icon name="plus" /> Add a family member
            </button>
          )}

          {open && (
            <div className="card form-card">
              <form onSubmit={submit} noValidate>
                <h2 className="h3">Add a family member</h2>
                <Field id="fm-name" label="Their name" error={errors.name}>
                  <input id="fm-name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} />
                </Field>
                <label className="select-label">They are your
                  <select value={f.relation} onChange={set('relation')}>
                    {RELATIONS.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </label>
                <div className="field-row">
                  <Field id="fm-age" label="Age (optional)" error={errors.age}>
                    <input id="fm-age" inputMode="numeric" maxLength={3} value={f.age} onChange={(e) => setF({ ...f, age: e.target.value.replace(/\D/g, '') })} aria-invalid={!!errors.age} />
                  </Field>
                  <Field id="fm-phone" label="Their mobile (optional)" error={errors.phone}>
                    <input id="fm-phone" inputMode="numeric" maxLength={10} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, '') })} aria-invalid={!!errors.phone} />
                  </Field>
                </div>
                <Field id="fm-notes" label="Anything we should know (optional)" hint="For example: hard of hearing, please call me instead.">
                  <textarea id="fm-notes" rows={3} value={f.notes} onChange={set('notes')} aria-describedby="fm-notes-hint" />
                </Field>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Save family member</button>
                  <button type="button" className="btn btn-outline" onClick={() => { setOpen(false); setErrors({}); }}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="stack">
          <InfoBand icon="lock">
            <strong>Your family's details stay private.</strong> We use them only for their orders and care, and never share them without consent.
          </InfoBand>
          <p><Link to="/account/addresses" className="text-link">Add their delivery address <Icon name="arrow" size={18} /></Link></p>
          <HelpBox />
        </div>
      </div>
    </>
  );
}
