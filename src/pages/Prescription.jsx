import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { AppQR, InfoBand, PageHead, Steps, rxSteps, HelpBox } from '../components/ui.jsx';

// Illustrative example from the proposal. The real list comes from the app after upload.
const SAMPLE = [
  { id: 1, name: 'Metformin 500 mg', dose: 'Twice daily', days: '30 days' },
  { id: 2, name: 'Amlodipine 5 mg', dose: 'Once daily', days: '30 days' },
  { id: 3, name: 'Vitamin D3', dose: 'Once weekly', days: '8 weeks' },
];

const STATUS = ['Uploaded', 'List confirmed', 'Pharmacist checked', 'Out for delivery', 'Delivered'];

export default function Prescription() {
  const [list, setList] = useState(SAMPLE);
  const [editing, setEditing] = useState(null);

  const update = (id, key, value) => setList((l) => l.map((m) => (m.id === id ? { ...m, [key]: value } : m)));

  return (
    <>
      <PageHead eyebrow="Prescription orders" title="Upload your prescription in the app" tone="green">
        <p>Snap a photo of your prescription. We list the medicines, you confirm, and a registered pharmacist checks every order before it leaves the pharmacy.</p>
      </PageHead>

      <div className="container section-sm two-col">
        <AppQR />
        <div className="stack">
          <InfoBand icon="sparkles">
            <strong>AI assists, pharmacist decides.</strong> Our system reads the prescription to save you typing. A registered pharmacist always makes the final check.
          </InfoBand>
          <HelpBox />
        </div>
      </div>

      <section className="section section-white">
        <div className="container">
          <h2>How it works</h2>
          <Steps steps={rxSteps} />
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>You check the list first</h2>
            <p>After you upload, the app shows the medicines it found. Fix anything that looks wrong before you confirm. This example shows how the list looks.</p>
            <div className="card rx-list">
              <div className="rx-list-head">
                <strong>Medicines found</strong>
                <span className="small">Example</span>
              </div>
              <ul>
                {list.map((m) => (
                  <li key={m.id} className="rx-item">
                    {editing === m.id ? (
                      <div className="rx-edit">
                        <label>Medicine<input value={m.name} onChange={(e) => update(m.id, 'name', e.target.value)} /></label>
                        <label>How often<input value={m.dose} onChange={(e) => update(m.id, 'dose', e.target.value)} /></label>
                        <label>For how long<input value={m.days} onChange={(e) => update(m.id, 'days', e.target.value)} /></label>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => setEditing(null)}>Done</button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <strong>{m.name}</strong>
                          <span>{m.dose} · {m.days}</span>
                        </div>
                        <div className="rx-actions">
                          <button type="button" className="link-btn" onClick={() => setEditing(m.id)}><Icon name="edit" size={18} /> Edit</button>
                          <button type="button" className="link-btn" onClick={() => setList((l) => l.filter((x) => x.id !== m.id))}><Icon name="trash" size={18} /> Remove</button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <p className="small muted">Unclear? The pharmacist will call you before packing.</p>
            </div>
          </div>
          <div>
            <h2>Follow every step</h2>
            <p>You get SMS and WhatsApp updates at each stage. Family members can follow the same order.</p>
            <div className="card status-card">
              <p><strong>Order W2C204518</strong> · Example</p>
              <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={STATUS.length - 1} aria-valuenow={2} aria-valuetext="Pharmacist checked">
                <span style={{ width: '50%' }} />
              </div>
              <ol className="status-list">
                {STATUS.map((s, i) => (
                  <li key={s} className={i <= 2 ? 'done' : ''}>
                    <Icon name={i <= 2 ? 'check' : 'clock'} size={18} /> {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-mint">
        <div className="container">
          <h2>Good to know</h2>
          <ul className="check-list">
            <li><Icon name="check" /> Prescription medicines are sold only with a valid prescription.</li>
            <li><Icon name="check" /> Schedule H and H1 medicines need a valid doctor's prescription.</li>
            <li><Icon name="check" /> We do not sell Schedule X drugs or narcotics.</li>
            <li><Icon name="check" /> Your prescription is used only for your order. We never share it without your consent.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
