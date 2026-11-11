import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useLang, useT, languages } from '../context/LangContext.jsx';
import { SITE } from '../config/site.js';

const T = {
  en: {
    support: '24/7 support · Mumbai, Navi Mumbai & Thane',
    homeAria: 'Way2Cure Marketplace, home',
    cartAria: '{label}, {count} items',
    mainNav: 'Main',
  },
  hi: {
    support: '24/7 मदद · मुंबई, नवी मुंबई और ठाणे',
    homeAria: 'Way2Cure मार्केटप्लेस, होम पेज',
    cartAria: '{label}, {count} सामान',
    mainNav: 'मुख्य मेनू',
  },
  mr: {
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

export default function Header() {
  const { count } = useCart();
  const { t } = useLang();
  const tr = useT(T);
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { to: '/', label: t('home'), end: true },
    { to: '/shop', label: t('shop') },
    { to: '/care', label: t('care') },
    { to: '/subscriptions', label: t('subscriptions') },
  ];

  return (
    <header className="site-header">
      <TopBar />
      <div className="container header-main">
        <Link to="/" className="brand" aria-label={tr('homeAria')}>
          <img src="/logo.png" alt="Way2Cure" className="brand-logo" width="132" height="44" />
          <span className="brand-label">{SITE.label}</span>
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
          <Link to="/account" className="icon-link hide-mobile">
            <Icon name="user" /> <span>{t('login')}</span>
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
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/prescription" className="btn btn-urgent nav-rx">
            <Icon name="rx" size={20} /> {t('uploadRx')}
          </NavLink>
          <NavLink to="/about" className="nav-link">{t('about')}</NavLink>
          <NavLink to="/contact" className="nav-link">{t('contact')}</NavLink>
        </div>
      </nav>
    </header>
  );
}
