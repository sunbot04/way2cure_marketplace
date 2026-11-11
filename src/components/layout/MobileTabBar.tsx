import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import { useLang, useT } from '../../i18n/LangContext';
import { SITE } from '../../config/site';
import { LAYOUT } from './copy';

// Mobile only (p.8, p.9): bottom bar Home · Shop · Rx · Care · Account, and a sticky "Call us" button.
export default function MobileTabBar() {
  const { t } = useLang();
  const tr = useT(LAYOUT);
  const items = [
    { to: '/', icon: 'home', label: t('home'), end: true },
    { to: '/shop', icon: 'pill', label: t('shop') },
    { to: '/prescription', icon: 'rx', label: t('rx') },
    { to: '/care', icon: 'stethoscope', label: tr('careShort') },
    { to: '/account', icon: 'user', label: t('account') },
  ];
  return (
    <>
      <a
        href={SITE.phoneHref}
        className="fixed bottom-[84px] right-4 z-30 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-terracotta-deep px-5 font-bold text-white no-underline shadow-raised lg:hidden"
      >
        <Icon name="phone" size={22} /> {t('callUs')}
      </a>
      <nav aria-label={tr('quickLinks')} className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-mint bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.end}
            className={({ isActive }) =>
              `grid min-h-[64px] justify-items-center gap-0.5 px-0.5 py-2 text-center text-small font-bold no-underline ${
                isActive ? 'text-green shadow-[inset_0_3px_0_rgb(var(--c-terracotta-deep))]' : 'text-grey'
              }`
            }
          >
            <Icon name={i.icon} />
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
