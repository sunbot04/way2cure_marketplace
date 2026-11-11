import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { InfoBand, PageHead, AppQR } from '../components/ui.jsx';

// Time-of-day colours are the same in the app, website and printed sachets.
// Each one always has a word label, so it also works for colour-blind users.
const TIMES = [
  { key: 'morning', label: 'Morning', time: '8 am', icon: 'sunrise', pills: ['Metformin 500 mg', 'Amlodipine 5 mg', 'Vitamin B12'] },
  { key: 'afternoon', label: 'Afternoon', time: '1 pm', icon: 'sun', pills: ['Calcium', 'Multivitamin'] },
  { key: 'evening', label: 'Evening', time: '7 pm', icon: 'sunset', pills: ['Metformin 500 mg', 'Telmisartan 40 mg'] },
  { key: 'night', label: 'Night', time: '10 pm', icon: 'moon', pills: ['Atorvastatin 10 mg', 'Vitamin D3', 'Magnesium'] },
];

export default function DoseSachets() {
  return (
    <>
      <PageHead eyebrow="Subscriptions" title="Medicines in dose sachets">
        <p>Every dose packed in its own sachet, sorted from morning to night. Tear one, take the dose.</p>
      </PageHead>

      <section className="section-sm">
        <div className="container">
          <h2>One day of sachets</h2>
          <p className="small muted">Example only. Your sachets follow your own prescription.</p>
          <div className="grid grid-4 dose-grid">
            {TIMES.map((t) => (
              <article key={t.key} className={`card dose dose-${t.key}`}>
                <header className="dose-head">
                  <Icon name={t.icon} />
                  <strong>{t.label}</strong>
                  <span>{t.time}</span>
                </header>
                <ul>
                  {t.pills.map((p) => <li key={p}><Icon name="pill" size={18} /> {p}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="grid grid-4">
            {[
              ['Sorted by time', 'Morning to night', 'var(--green)'],
              ['Ready to take', 'Tear one, take the dose', 'var(--terracotta)'],
              ['Pay per dose', 'Only the doses you take', 'var(--mustard)'],
              ['No full strips', 'No leftover medicine', 'var(--sage)'],
            ].map(([t, d, c]) => (
              <div key={t} className="card card-edge-left feature" style={{ '--edge': c }}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <InfoBand icon="verified">
            Packed by partner pharmacies under pharmacist supervision, from a verified prescription.
          </InfoBand>
          <p className="small muted">Available for suitable medicines. Subject to regulatory and labelling requirements.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>How to start</h2>
            <ol className="number-list">
              <li>Upload your prescription in the app and choose <strong>Dose sachets</strong>.</li>
              <li>The pharmacist checks it and calls you to agree the timings.</li>
              <li>Your first month of sachets arrives at your door.</li>
              <li>We remind you before every refill. Pause or change anytime.</li>
            </ol>
            <Link to="/subscriptions" className="text-link">See all subscriptions <Icon name="arrow" size={18} /></Link>
          </div>
          <AppQR title="Start in the app" />
        </div>
      </section>
    </>
  );
}
