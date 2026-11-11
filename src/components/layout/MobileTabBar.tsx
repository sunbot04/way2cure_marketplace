import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import { useLang, useT } from '../../i18n/LangContext';
import { SITE } from '../../config/site';
import { LAYOUT } from './copy';

// Mobile only (p.8, p.9): bottom bar Home · Shop · Rx · Care, with "Call us" as the last tab
// so the phone line is always one tap away without a floating button covering the page.
// Account sits in the header on mobile.
const item = 'grid min-h-[64px] content-center justify-items-center gap-0.5 px-0.5 py-2 text-center text-small font-bold no-underline';

export default function MobileTabBar() {
  const { t } = useLang();
  const tr = useT(LAYOUT);
  const items = [
    { to: '/', icon: 'home', label: t('home'), end: true },
    { to: '/shop', icon: 'pill', label: t('shop') },
    { to: '/prescription', icon: 'rx', label: t('rx') },
    { to: '/care', icon: 'stethoscope', label: tr('careShort') },
  ];
  return (
    <nav aria-label={tr('quickLinks')} className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      {items.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          end={i.end}
          className={({ isActive }) =>
            `${item} ${isActive ? 'text-green shadow-[inset_0_3px_0_rgb(var(--c-terracotta))]' : 'text-grey'}`
          }
        >
          <Icon name={i.icon} />
          <span>{i.label}</span>
        </NavLink>
      ))}
      <a href={SITE.phoneHref} className={`${item} bg-terracotta-deep text-white`}>
        <Icon name="phone" />
        <span>{t('callUs')}</span>
      </a>
    </nav>
  );
}
