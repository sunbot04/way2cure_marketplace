import { PageHead, InfoBand } from '../components/ui.jsx';

// Placeholder structure. Final wording must be confirmed by a lawyer and pharmacy partners
// (labels, Schedule H/H1 handling, device rules, DPDP privacy wording) before launch.
export default function Legal() {
  return (
    <>
      <PageHead eyebrow="Legal" title="Terms, privacy and pharmacy rules" />
      <div className="container section-sm narrow prose">
        <InfoBand icon="warning">Draft page. Final legal wording is being reviewed and will be published before launch.</InfoBand>
        <h2>Prescription medicines</h2>
        <p>Prescription medicines are sold only with a valid prescription from a registered doctor. A registered pharmacist at a licensed partner pharmacy checks every prescription order before it is packed. Schedule H and H1 medicines need a valid prescription. We do not sell Schedule X drugs or narcotics.</p>
        <h2>Marketplace sellers</h2>
        <p>Third-party sellers are verified before they can list on Way2Cure. Each product page shows who is selling it.</p>
        <h2>Care services</h2>
        <p>Suitability for specialised care at home (such as ICU, ventilator, stroke and cancer care) is assessed by the treating doctor before care begins.</p>
        <h2 id="privacy">Privacy</h2>
        <p>We collect only what we need to deliver your order or care. Health information, including prescriptions and location data from the safe-zone band, is used only with your consent and never sold. You can ask us to delete your data at any time.</p>
        <h2>Payments and refunds</h2>
        <p>We show the full price, including delivery, before you pay. If a payment fails, your money is safe and any amount taken is returned to the same account.</p>
      </div>
    </>
  );
}
