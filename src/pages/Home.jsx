import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useLang } from '../context/LangContext.jsx';
import { SITE } from '../config/site.js';
import { categories } from '../data/products.js';
import { services } from '../data/services.js';
import { subscriptionPlans, faqs } from '../data/content.js';
import { FaqList, ServiceCard, Steps, TrustStrip, rxSteps, InfoBand } from '../components/ui.jsx';

function HeroArt() {
  // Brand illustration (circles, home, pill, sachet). Replace or pair with real photos of
  // caregivers and families in Indian homes once photo consent is in place.
  return (
    <svg className="hero-art" viewBox="0 0 420 360" role="img" aria-label="Illustration of a home with medicines and care">
      <circle cx="300" cy="110" r="96" fill="#EAB34B" />
      <circle cx="120" cy="250" r="62" fill="#E07B5F" />
      <circle cx="350" cy="280" r="54" fill="#70A9A1" />
      <path d="M150 190 L230 120 L310 190 V300 H150 Z" fill="#F6F1E9" />
      <path d="M140 196 L230 116 L320 196" fill="none" stroke="#F6F1E9" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="208" y="236" width="44" height="64" rx="6" fill="#114D4A" />
      <rect x="170" y="210" width="28" height="28" rx="4" fill="#C8D8D5" />
      <rect x="262" y="210" width="28" height="28" rx="4" fill="#C8D8D5" />
      <g transform="rotate(-30 70 110)">
        <rect x="30" y="92" width="84" height="36" rx="18" fill="#FFFFFF" />
        <path d="M72 92 h24 a18 18 0 0 1 0 36 h-24 z" fill="#E07B5F" />
      </g>
      <g>
        <rect x="330" y="186" width="70" height="56" rx="8" fill="#FFFFFF" />
        <rect x="330" y="186" width="70" height="14" rx="6" fill="#EAB34B" />
        <circle cx="350" cy="222" r="7" fill="#E07B5F" />
        <circle cx="370" cy="222" r="7" fill="#114D4A" />
        <circle cx="390" cy="222" r="5" fill="#70A9A1" />
      </g>
    </svg>
  );
}

export default function Home() {
  const { t } = useLang();
  const quickPaths = [
    ...categories.filter((c) => c.slug !== 'safety').map((c) => ({ to: `/shop/${c.slug}`, icon: c.icon, title: c.name, text: c.blurb, edge: c.edge })),
    { to: '/care/nurse', icon: 'stethoscope', title: t('bookNurse'), text: 'Qualified nurses at home, day or night', edge: 'var(--terracotta-deep)' },
  ];
  const homeServices = ['nurse', 'doctor', 'icu', 'stroke'].map((id) => services.find((s) => s.id === id));

  return (
    <>
      {/* 2 · Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">Way2Cure Marketplace · {SITE.cities}</p>
            <h1>{t('heroTitle')}</h1>
            <p className="hero-text">{t('heroText')}</p>
            <div className="btn-row">
              <Link to="/shop/medicines" className="btn btn-light">
                <Icon name="pill" /> {t('orderMedicines')}
              </Link>
              <Link to="/prescription" className="btn btn-urgent">
                <Icon name="rx" /> {t('uploadRx')} <span className="btn-note">(app)</span>
              </Link>
            </div>
            <p className="hero-call">
              Prefer to talk? Call <a href={SITE.phoneHref}>{SITE.phone}</a>, any time.
            </p>
          </div>
          <HeroArt />
        </div>
      </section>

      {/* 3 · Quick paths */}
      <section className="section">
        <div className="container">
          <h2>What do you need today?</h2>
          <div className="grid grid-tiles">
            {quickPaths.map((p) => (
              <Link key={p.to} to={p.to} className="card card-edge-left tile" style={{ '--edge': p.edge }}>
                <span className="tile-icon"><Icon name={p.icon} size={32} /></span>
                <span className="tile-text">
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </span>
                <Icon name="chevron" className="tile-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · How prescriptions work */}
      <section className="section section-white">
        <div className="container">
          <h2>How prescription orders work</h2>
          <p className="lead">Four simple steps. A registered pharmacist checks every prescription before we pack it.</p>
          <Steps steps={rxSteps} />
          <InfoBand icon="sparkles">
            <strong>AI assists, pharmacist decides.</strong> If anything on the prescription is unclear, the pharmacist will call you.
          </InfoBand>
          <div className="btn-row center-mobile">
            <Link to="/prescription" className="btn btn-primary">See how it works</Link>
          </div>
        </div>
      </section>

      {/* 5 · Care at home */}
      <section className="section">
        <div className="container">
          <h2>Care at home</h2>
          <p className="lead">Trained, background-checked nurses and doctors, sent to your home.</p>
          <div className="grid grid-4">
            {homeServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <p className="small muted">Specialised care: suitability is assessed by the treating doctor before care begins.</p>
          <Link to="/care" className="text-link">See all care services <Icon name="arrow" size={18} /></Link>
        </div>
      </section>

      {/* 6 · Subscribe & save */}
      <section className="section section-mint">
        <div className="container">
          <h2>Never run out. Subscribe to regular care.</h2>
          <p className="lead">We schedule it, deliver or visit, and remind you before each order. Pause or change anytime.</p>
          <div className="grid grid-4">
            {subscriptionPlans.map((p) => (
              <Link key={p.id} to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'} className="card card-edge-top plan-mini" style={{ '--edge': p.edge }}>
                <Icon name={p.icon} size={28} />
                <h3>{p.name}</h3>
                <p>{p.often}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Trust strip */}
      <TrustStrip />

      {/* 8 · Reviews & FAQ */}
      <section className="section">
        <div className="container two-col">
          <div>
            <h2>Families we care for</h2>
            <div className="card story-placeholder">
              <Icon name="users" size={32} />
              <p>
                Real stories from families will appear here, shared with their written permission.
              </p>
              <p className="small muted">Have a story to share? Tell us on WhatsApp.</p>
            </div>
          </div>
          <div>
            <h2>Common questions</h2>
            <FaqList items={faqs.slice(0, 5)} />
            <Link to="/help" className="text-link">All questions <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
