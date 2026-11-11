import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useLang } from '../context/LangContext.jsx';
import { SITE } from '../config/site.js';

// Mobile only: bottom bar (Home · Shop · Rx · Care · Account) and a sticky "Call us" button.
export default function MobileBar() {
  const { t } = useLang();
  const items = [
    { to: '/', icon: 'home', label: t('home'), end: true },
    { to: '/shop', icon: 'pill', label: t('shop') },
    { to: '/prescription', icon: 'rx', label: t('rx') },
    { to: '/care', icon: 'stethoscope', label: t('care') },
    { to: '/account', icon: 'user', label: t('account') },
  ];
  return (
    <>
      <a href={SITE.phoneHref} className="sticky-call">
        <Icon name="phone" size={22} /> {t('callUs')}
      </a>
      <nav className="mobile-bar" aria-label="Quick links">
        {items.map((i) => (
          <NavLink key={i.to} to={i.to} end={i.end} className="mobile-bar-item">
            <Icon name={i.icon} />
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
