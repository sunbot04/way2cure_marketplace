import { services } from '../data/services.js';
import { InfoBand, PageHead, ServiceCard, TrustStrip, HelpBox } from '../components/ui.jsx';

export default function Care() {
  const everyday = services.filter((s) => !s.specialised);
  const specialised = services.filter((s) => s.specialised);
  return (
    <>
      <PageHead eyebrow="Care services" title="Care at home, by people you can trust">
        <p>Qualified nurses, doctors and caretakers in Mumbai, Navi Mumbai and Thane. Book online, or call us and we will plan it with you.</p>
      </PageHead>

      <section className="section-sm">
        <div className="container">
          <h2>Everyday care</h2>
          <div className="grid grid-3">
            {everyday.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <h2>Specialised care at home</h2>
          <p className="lead">One doctor-led care plan for every patient.</p>
          <div className="grid grid-4">
            {specialised.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <InfoBand icon="stethoscope">Suitability is assessed by the treating doctor before care begins.</InfoBand>
        </div>
      </section>

      <TrustStrip />

      <section className="section">
        <div className="container narrow">
          <HelpBox />
        </div>
      </section>
    </>
  );
}
