import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useLang, useT } from '../context/LangContext.jsx';
import { SITE } from '../config/site.js';

const T = {
  en: { quickLinks: 'Quick links' },
  hi: { quickLinks: 'ज़रूरी लिंक' },
  mr: { quickLinks: 'महत्त्वाच्या लिंक' },
};

// Mobile only: bottom bar (Home · Shop · Rx · Care · Account) and a sticky "Call us" button.
export default function MobileBar() {
  const { t } = useLang();
  const tr = useT(T);
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
      <nav className="mobile-bar" aria-label={tr('quickLinks')}>
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
