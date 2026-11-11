import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { SITE } from '../config/site.js';
import { categories } from '../data/products.js';
import { useLoc, useT } from '../context/LangContext.jsx';

const T = {
  en: {
    promise: 'Your Health, Our Mission. Your Comfort, Our Vision.',
    about: 'Care at home and everything seniors need, in Mumbai, Navi Mumbai & Thane.',
    shop: 'Shop', rent: 'Rent equipment',
    support: 'Support', help: 'Help centre & FAQ', orders: 'My orders & tracking',
    manageSubs: 'Manage subscriptions', bookCare: 'Book care at home', contact: 'Contact us',
    company: 'Company', homeCare: 'Way2Cure home care', aboutUs: 'About us', safeZone: 'Safe-zone band',
    terms: 'Terms of use', privacy: 'Privacy policy',
    visit: 'Visit us',
    pharmacy: 'Pharmacy:',
    pharmacyText: 'Prescription medicines are sold only with a valid prescription and dispensed by licensed partner pharmacies.',
    licence: 'Partner pharmacy licence numbers will be listed here before launch.',
    noScheduleX: 'Way2Cure does not sell Schedule X drugs or narcotics. Information on this site does not replace advice from your doctor.',
    rights: '© {year} Way2Cure. All rights reserved.',
  },
  hi: {
    promise: 'आपकी सेहत, हमारा मिशन। आपका आराम, हमारा सपना।',
    about: 'घर पर देखभाल और बुज़ुर्गों की हर ज़रूरत, मुंबई, नवी मुंबई और ठाणे में।',
    shop: 'खरीदारी', rent: 'किराये पर उपकरण',
    support: 'मदद', help: 'मदद केंद्र और सवाल-जवाब', orders: 'मेरे ऑर्डर और ट्रैकिंग',
    manageSubs: 'सब्सक्रिप्शन संभालें', bookCare: 'घर पर देखभाल बुक करें', contact: 'हमसे संपर्क करें',
    company: 'कंपनी', homeCare: 'Way2Cure होम केयर', aboutUs: 'हमारे बारे में', safeZone: 'सेफ़-ज़ोन बैंड',
    terms: 'इस्तेमाल की शर्तें', privacy: 'प्राइवेसी पॉलिसी',
    visit: 'हमसे मिलें',
    pharmacy: 'फ़ार्मेसी:',
    pharmacyText: 'पर्चे वाली दवाइयाँ सिर्फ़ वैध पर्चे पर ही मिलती हैं, और लाइसेंस वाली पार्टनर फ़ार्मेसी ही इन्हें देती हैं।',
    licence: 'पार्टनर फ़ार्मेसी के लाइसेंस नंबर लॉन्च से पहले यहाँ दिए जाएँगे।',
    noScheduleX: 'Way2Cure शेड्यूल X दवाइयाँ या नशीले पदार्थ नहीं बेचता। इस साइट की जानकारी आपके डॉक्टर की सलाह की जगह नहीं लेती।',
    rights: '© {year} Way2Cure. सर्वाधिकार सुरक्षित।',
  },
  mr: {
    promise: 'तुमचे आरोग्य, आमचे ध्येय. तुमचा आराम, आमचे स्वप्न.',
    about: 'घरी काळजी आणि ज्येष्ठांना लागणारे सर्व काही, मुंबई, नवी मुंबई आणि ठाणे येथे.',
    shop: 'खरेदी', rent: 'भाड्याने उपकरणे',
    support: 'मदत', help: 'मदत केंद्र आणि प्रश्नोत्तरे', orders: 'माझ्या ऑर्डर आणि ट्रॅकिंग',
    manageSubs: 'सदस्यता व्यवस्थापित करा', bookCare: 'घरी काळजी बुक करा', contact: 'आमच्याशी संपर्क साधा',
    company: 'कंपनी', homeCare: 'Way2Cure होम केअर', aboutUs: 'आमच्याबद्दल', safeZone: 'सेफ-झोन बँड',
    terms: 'वापराच्या अटी', privacy: 'गोपनीयता धोरण',
    visit: 'आम्हाला भेट द्या',
    pharmacy: 'फार्मसी:',
    pharmacyText: 'प्रिस्क्रिप्शनची औषधे फक्त वैध प्रिस्क्रिप्शनवरच मिळतात, आणि परवानाधारक भागीदार फार्मसीच ती देतात.',
    licence: 'भागीदार फार्मसींचे परवाना क्रमांक लाँचपूर्वी येथे दिले जातील.',
    noScheduleX: 'Way2Cure शेड्यूल X औषधे किंवा अमली पदार्थ विकत नाही. या साइटवरील माहिती तुमच्या डॉक्टरांच्या सल्ल्याची जागा घेत नाही.',
    rights: '© {year} Way2Cure. सर्व हक्क राखीव.',
  },
};

export default function Footer() {
  const tr = useT(T);
  const loc = useLoc();
  // Show the translated placeholder until real licence numbers are set in config/site.js.
  const licence = SITE.pharmacyLicence.startsWith('Partner pharmacy licence numbers will')
    ? tr('licence')
    : SITE.pharmacyLicence;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {/* No reversed logo file exists yet, so the official logo sits on a white panel. */}
          <span className="footer-logo-panel">
            <img src="/logo.png" alt="Way2Cure" width="132" height="44" />
          </span>
          <p className="footer-promise">{tr('promise')}</p>
          <p>{tr('about')}</p>
          <div className="footer-social">
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
            <a href={SITE.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <div>
          <h2 className="footer-title">{tr('shop')}</h2>
          <ul className="footer-list">
            {categories.map((c) => (
              <li key={c.slug}><Link to={`/shop/${c.slug}`}>{loc(c).name}</Link></li>
            ))}
            <li><Link to="/shop/rent">{tr('rent')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">{tr('support')}</h2>
          <ul className="footer-list">
            <li><Link to="/help">{tr('help')}</Link></li>
            <li><Link to="/account">{tr('orders')}</Link></li>
            <li><Link to="/subscriptions">{tr('manageSubs')}</Link></li>
            <li><Link to="/care">{tr('bookCare')}</Link></li>
            <li><Link to="/contact">{tr('contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">{tr('company')}</h2>
          <ul className="footer-list">
            <li><a href={SITE.homeCareUrl}>{tr('homeCare')}</a></li>
            <li><Link to="/about">{tr('aboutUs')}</Link></li>
            <li><Link to="/safe-zone">{tr('safeZone')}</Link></li>
            <li><Link to="/legal">{tr('terms')}</Link></li>
            <li><Link to="/legal#privacy">{tr('privacy')}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">{tr('visit')}</h2>
          <p className="footer-address">{SITE.offices[0].address}</p>
          <p className="footer-contact">
            <a href={SITE.phoneHref}><Icon name="phone" size={18} /> {SITE.phoneDisplay}</a>
            <a href={`mailto:${SITE.email}`}><Icon name="mail" size={18} /> {SITE.email}</a>
          </p>
        </div>
      </div>

      <div className="container footer-legal">
        <p><strong>{tr('pharmacy')}</strong> {tr('pharmacyText')} {licence}</p>
        <p>{tr('noScheduleX')}</p>
        <p>{tr('rights', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
