import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useLang, useLoc, useT, languages } from '../context/LangContext.jsx';
import { categories, shopViews } from '../data/products.js';
import { services } from '../data/services.js';
import { subscriptionPlans } from '../data/content.js';
import { SITE } from '../config/site.js';

const T = {
  en: {
    label: 'Marketplace',
    support247: '24/7 support',
    shopBy: 'Shop by category',
    allProducts: 'See all products',
    careHome: 'Care at home',
    careSpecial: 'Specialised care',
    allCare: 'See all care services',
    plans: 'Subscription plans',
    managePlan: 'Manage or pause a plan',
    rxNote: 'A registered pharmacist checks every prescription order.',
    support: '24/7 support · Mumbai, Navi Mumbai & Thane',
    homeAria: 'Way2Cure Marketplace, home',
    cartAria: '{label}, {count} items',
    mainNav: 'Main',
  },
  hi: {
    label: 'मार्केटप्लेस',
    support247: '24/7 मदद',
    shopBy: 'श्रेणी के अनुसार ख़रीदें',
    allProducts: 'सभी सामान देखें',
    careHome: 'घर पर देखभाल',
    careSpecial: 'खास देखभाल',
    allCare: 'सभी देखभाल सेवाएँ देखें',
    plans: 'सब्सक्रिप्शन प्लान',
    managePlan: 'प्लान बदलें या रोकें',
    rxNote: 'हर पर्चे वाले ऑर्डर को रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    support: '24/7 मदद · मुंबई, नवी मुंबई और ठाणे',
    homeAria: 'Way2Cure मार्केटप्लेस, होम पेज',
    cartAria: '{label}, {count} सामान',
    mainNav: 'मुख्य मेनू',
  },
  mr: {
    label: 'मार्केटप्लेस',
    support247: '24/7 मदत',
    shopBy: 'श्रेणीनुसार खरेदी करा',
    allProducts: 'सर्व वस्तू पाहा',
    careHome: 'घरी काळजी',
    careSpecial: 'विशेष काळजी',
    allCare: 'सर्व काळजी सेवा पाहा',
    plans: 'सदस्यता प्लॅन',
    managePlan: 'प्लॅन बदला किंवा थांबवा',
    rxNote: 'प्रत्येक प्रिस्क्रिप्शन ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात.',
    support: '24/7 मदत · मुंबई, नवी मुंबई आणि ठाणे',
    homeAria: 'Way2Cure मार्केटप्लेस, मुख्यपृष्ठ',
    cartAria: '{label}, {count} वस्तू',
    mainNav: 'मुख्य मेनू',
  },
};

function TopBar() {
  const { lang, setLang, t } = useLang();
  const tr = useT(T);
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-contact">
          <a href={SITE.phoneHref} className="topbar-link">
            <Icon name="phone" size={18} /> <span>{SITE.phone}</span>
          </a>
          <a href={SITE.whatsappHref} className="topbar-link" target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={18} /> <span>{t('whatsapp')}</span>
          </a>
          <a href={SITE.homeCareUrl} className="topbar-link">
            <Icon name="stethoscope" size={18} /> <span>{t('homeCareSite')}</span>
          </a>
          <span className="topbar-note">{tr('support')}</span>
        </div>
        <div className="lang-switch" role="group" aria-label={t('language')}>
          <Icon name="globe" size={18} />
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              className={lang === l.code ? 'active' : ''}
              aria-pressed={lang === l.code}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dropdown panel for a top-level menu item. Opens on hover or keyboard focus (desktop only);
// on mobile the item is a plain link to the section page.
function NavMenu({ to, label, children }) {
  return (
    <div className="nav-item has-menu">
      <NavLink to={to} className="nav-link">
        {label} <Icon name="chevron" size={16} className="nav-caret" />
      </NavLink>
      <div className="nav-panel">{children}</div>
    </div>
  );
}

export default function Header() {
  const { count } = useCart();
  const { t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  // Close the mobile menu and any open dropdown after navigating.
  useEffect(() => {
    setOpen(false);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [location.pathname]);

  const homeCare = services.filter((s) => !s.specialised).map(loc);
  const specialised = services.filter((s) => s.specialised).map(loc);

  return (
    <header className="site-header">
      <TopBar />
      <div className="header-bar">
        <div className="container header-main">
          <Link to="/" className="brand" aria-label={tr('homeAria')}>
            <img src="/logo.png" alt="Way2Cure" className="brand-logo" width="132" height="44" />
            <span className="brand-label">{tr('label')}</span>
          </Link>

          <form
            className="header-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
            }}
          >
            <label htmlFor="site-search" className="sr-only">{t('search')}</label>
            <Icon name="search" className="search-icon" />
            <input
              id="site-search"
              type="search"
              placeholder={t('searchPlaceholder')}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">{t('search')}</button>
          </form>

          <div className="header-actions">
            <a href={SITE.phoneHref} className="header-call">
              <span className="header-call-icon"><Icon name="phone" size={20} /></span>
              <span className="header-call-text"><small>{tr('support247')}</small><strong>{SITE.phoneDisplay}</strong></span>
            </a>
            <Link to="/account" className="icon-link">
              <Icon name="user" /> <span className="hide-mobile">{t('login')}</span>
            </Link>
            <Link to="/cart" className="icon-link" aria-label={tr('cartAria', { label: t('cart'), count })}>
              <Icon name="cart" />
              <span className="hide-mobile">{t('cart')}</span>
              {count > 0 && <span className="cart-count" aria-hidden="true">{count}</span>}
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="main-nav"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} /> <span>{t('menu')}</span>
            </button>
          </div>
        </div>

        <nav id="main-nav" className={`main-nav${open ? ' open' : ''}`} aria-label={tr('mainNav')}>
          <div className="container nav-inner">
            <div className="nav-item"><NavLink to="/" end className="nav-link">{t('home')}</NavLink></div>

            <NavMenu to="/shop" label={t('shop')}>
              <p className="nav-panel-title">{tr('shopBy')}</p>
              <ul className="nav-panel-grid">
                {[...categories, ...shopViews].map(loc).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/shop/${c.slug}`} className="nav-panel-link">
                      <span className="nav-panel-icon" style={{ '--edge': c.edge }}><Icon name={c.icon} size={20} /></span>
                      <span><strong>{c.name}</strong><small>{c.blurb}</small></span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="nav-panel-all">{tr('allProducts')} <Icon name="arrow" size={18} /></Link>
            </NavMenu>

            <NavMenu to="/care" label={t('care')}>
              <div className="nav-panel-cols">
                <div>
                  <p className="nav-panel-title">{tr('careHome')}</p>
                  <ul className="nav-panel-list">
                    {homeCare.map((s) => (
                      <li key={s.id}><Link to={`/care/${s.id}`}><Icon name={s.icon} size={18} /> {s.name}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="nav-panel-title">{tr('careSpecial')}</p>
                  <ul className="nav-panel-list">
                    {specialised.map((s) => (
                      <li key={s.id}><Link to={`/care/${s.id}`}><Icon name={s.icon} size={18} /> {s.name}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link to="/care" className="nav-panel-all">{tr('allCare')} <Icon name="arrow" size={18} /></Link>
            </NavMenu>

            <NavMenu to="/subscriptions" label={t('subscriptions')}>
              <p className="nav-panel-title">{tr('plans')}</p>
              <ul className="nav-panel-list">
                {subscriptionPlans.map(loc).map((p) => (
                  <li key={p.id}>
                    <Link to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'}>
                      <Icon name={p.icon} size={18} /> {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/subscriptions#manage" className="nav-panel-all">{tr('managePlan')} <Icon name="arrow" size={18} /></Link>
            </NavMenu>

            <div className="nav-item nav-item-rx">
              <NavLink to="/prescription" className="btn btn-urgent nav-rx">
                <Icon name="rx" size={20} /> {t('uploadRx')}
              </NavLink>
            </div>
            <div className="nav-item"><NavLink to="/about" className="nav-link">{t('about')}</NavLink></div>
            <div className="nav-item"><NavLink to="/contact" className="nav-link">{t('contact')}</NavLink></div>
            <p className="nav-note"><Icon name="verified" size={18} /> {tr('rxNote')}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
