import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { subscriptionPlans } from '../data/content.js';
import { InfoBand, PageHead, HelpBox } from '../components/ui.jsx';

// Example plans so families can see how "manage / pause" works. Real plans come from the account API.
const SAMPLE_PLANS = [
  { id: 'p1', what: 'BP & sugar medicines (3 items)', often: 'Every month', next: '2026-12-02', paused: false },
  { id: 'p2', what: 'Adult diapers, medium × 3 packs', often: 'Every 2 weeks', next: '2026-11-20', paused: false },
];

const nice = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Subscriptions() {
  const [plans, setPlans] = useState(SAMPLE_PLANS);
  const toggle = (id) => setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, paused: !p.paused } : p)));

  return (
    <>
      <PageHead eyebrow="Subscriptions" title="Regular care, on schedule">
        <p>Subscribe once. We schedule each delivery or visit and remind you before every order. Pause or change anytime.</p>
      </PageHead>

      <section className="section-sm">
        <div className="container">
          <ol className="flow" aria-label="How subscriptions work">
            {['Subscribe', 'We schedule', 'Visit or delivery', 'Reminders & reports'].map((s, i) => (
              <li key={s}><span>{i + 1}</span> {s}</li>
            ))}
          </ol>
          <div className="grid grid-4">
            {subscriptionPlans.map((p) => (
              <article key={p.id} className="card card-edge-top plan-card" style={{ '--edge': p.edge }}>
                <Icon name={p.icon} size={32} />
                <h3>{p.name}</h3>
                <p className="small muted">{p.often}</p>
                <ul className="check-list">
                  {p.points.map((pt) => <li key={pt}><Icon name="check" size={18} /> {pt}</li>)}
                </ul>
                {p.id === 'sachets' ? (
                  <Link to="/subscriptions/dose-sachets" className="btn btn-outline btn-block">How sachets work</Link>
                ) : p.id === 'health-checks' ? (
                  <Link to="/care/nurse" className="btn btn-primary btn-block">Book a home check</Link>
                ) : (
                  <Link to={p.id === 'diapers' ? '/product/adult-diapers-m' : '/shop/medicines'} className="btn btn-primary btn-block">Start a plan</Link>
                )}
              </article>
            ))}
          </div>
          <p className="small muted">Frequencies are suggestions. You confirm the price before the first order.</p>
        </div>
      </section>

      <section className="section section-white" id="manage">
        <div className="container">
          <h2>Manage / pause plan</h2>
          <p className="lead">Your plans. Example shown until you log in.</p>
          <div className="grid grid-2">
            {plans.map((p) => (
              <article key={p.id} className={`card plan-manage${p.paused ? ' paused' : ''}`}>
                <div className="plan-manage-head">
                  <h3>{p.what}</h3>
                  <span className={`tag ${p.paused ? 'tag-rent' : 'tag-pharm'}`}>{p.paused ? 'Paused' : 'Active'}</span>
                </div>
                <dl className="plan-facts">
                  <div><dt>How often</dt><dd>{p.often}</dd></div>
                  <div><dt>Next order</dt><dd>{p.paused ? 'On hold' : nice(p.next)}</dd></div>
                </dl>
                <p className="small"><Icon name="bell" size={16} /> We send a reminder 2 days before each order.</p>
                <div className="btn-row">
                  <button type="button" className="btn btn-outline" onClick={() => toggle(p.id)}>{p.paused ? 'Resume plan' : 'Pause plan'}</button>
                  <Link to="/contact" className="btn btn-outline">Change plan</Link>
                </div>
              </article>
            ))}
          </div>
          <InfoBand icon="info">Nothing is charged while a plan is paused. You can cancel anytime, with no fee.</InfoBand>
        </div>
      </section>

      <section className="section">
        <div className="container narrow"><HelpBox /></div>
      </section>
    </>
  );
}
