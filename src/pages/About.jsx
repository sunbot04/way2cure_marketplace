import { team } from '../data/content.js';
import { PageHead, TrustStrip } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { SITE } from '../config/site.js';

export default function About() {
  return (
    <>
      <PageHead eyebrow="About Way2Cure" title="We bring the heart of healthcare home">
        <p>Way2Cure was founded to bridge the gap between hospitals and home care. Today we are growing into one place for care, medicines and everything seniors need.</p>
      </PageHead>
      <section className="section-sm">
        <div className="container grid grid-2">
          <div className="card card-edge-top" style={{ '--edge': 'var(--green)' }}>
            <h2 className="h3">Our mission</h2>
            <p className="quote">Your Health, Our Mission.</p>
            <p>Professional nursing, elder care and doctor visits, delivered at home by trained, background-checked people.</p>
          </div>
          <div className="card card-edge-top" style={{ '--edge': 'var(--terracotta)' }}>
            <h2 className="h3">Our vision</h2>
            <p className="quote">Your Comfort, Our Vision.</p>
            <p>Care that respects the dignity and independence of seniors, with simple ordering for the families who look after them.</p>
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <h2>What makes us different</h2>
          <div className="grid grid-3">
            {[
              ['userCheck', 'Experienced, certified professionals', 'Nurses and caretakers with home healthcare and hospital experience.'],
              ['support', '24/7 support', `Call ${SITE.phone} any time. A real person answers.`],
              ['stethoscope', 'Personalised care plans', 'Every plan starts with what the patient and family need.'],
            ].map(([i, t, d]) => (
              <div key={t} className="feature-plain">
                <Icon name={i} size={32} />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Our team</h2>
          <div className="grid grid-4">
            {team.map((m) => (
              <div key={m.name} className="card team-card">
                <span className="avatar" aria-hidden="true">{m.name.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                <h3>{m.name}</h3>
                <p className="small">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TrustStrip />
    </>
  );
}
