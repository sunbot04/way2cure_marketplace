import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { SITE } from '../config/site.js';
import { categories } from '../data/products.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {/* No reversed logo file exists yet, so the official logo sits on a white panel. */}
          <span className="footer-logo-panel">
            <img src="/logo.png" alt="Way2Cure" width="132" height="44" />
          </span>
          <p className="footer-promise">{SITE.promise}</p>
          <p>Care at home and everything seniors need, in {SITE.cities}.</p>
          <div className="footer-social">
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
            <a href={SITE.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <div>
          <h2 className="footer-title">Shop</h2>
          <ul className="footer-list">
            {categories.map((c) => (
              <li key={c.slug}><Link to={`/shop/${c.slug}`}>{c.name}</Link></li>
            ))}
            <li><Link to="/shop/rent">Rent equipment</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Support</h2>
          <ul className="footer-list">
            <li><Link to="/help">Help centre & FAQ</Link></li>
            <li><Link to="/account">My orders & tracking</Link></li>
            <li><Link to="/subscriptions">Manage subscriptions</Link></li>
            <li><Link to="/care">Book care at home</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Company</h2>
          <ul className="footer-list">
            <li><a href={SITE.homeCareUrl}>Way2Cure home care</a></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/safe-zone">Safe-zone band</Link></li>
            <li><Link to="/legal">Terms of use</Link></li>
            <li><Link to="/legal#privacy">Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Visit us</h2>
          <p className="footer-address">{SITE.offices[0].address}</p>
          <p className="footer-contact">
            <a href={SITE.phoneHref}><Icon name="phone" size={18} /> {SITE.phoneDisplay}</a>
            <a href={`mailto:${SITE.email}`}><Icon name="mail" size={18} /> {SITE.email}</a>
          </p>
        </div>
      </div>

      <div className="container footer-legal">
        <p><strong>Pharmacy:</strong> Prescription medicines are sold only with a valid prescription and dispensed by licensed partner pharmacies. {SITE.pharmacyLicence}</p>
        <p>Way2Cure does not sell Schedule X drugs or narcotics. Information on this site does not replace advice from your doctor.</p>
        <p>© {new Date().getFullYear()} Way2Cure. All rights reserved.</p>
      </div>
    </footer>
  );
}
