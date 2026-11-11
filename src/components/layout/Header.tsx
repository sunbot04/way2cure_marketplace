import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { buttonClass } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { languages, useLang, useLoc, useT } from '../../i18n/LangContext';
import { categories, services, shopViews, subscriptionPlans } from '../../data';
import { SITE } from '../../config/site';
import { LAYOUT } from './copy';

// Utility bar (guidelines p.8): helpline, WhatsApp, home care site, language switch, in one slim row.
function TopBar() {
  const { lang, setLang, t } = useLang();
  const tr = useT(LAYOUT);
  const link = 'inline-flex min-h-[44px] items-center gap-1.5 text-white no-underline hover:underline';
  return (
    <div className="bg-green text-small text-white">
      <div className="container flex h-11 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={SITE.phoneHref} className={link}>
            <Icon name="phone" size={16} /> <span className="hidden sm:inline">{tr('helpline')}</span> <strong>{SITE.phone}</strong>
          </a>
          <a href={SITE.whatsappHref} className={`${link} hidden sm:inline-flex`} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={16} /> {t('whatsapp')}</a>
        </div>
        <div className="flex items-center gap-5">
          <a href={SITE.homeCareUrl} className={`${link} hidden md:inline-flex`}>{t('homeCareSite')} <Icon name="external" size={14} /></a>
          {/* Language switch stays visible in the header, never hidden in a menu (p.12) */}
          <div className="flex items-center" role="group" aria-label={t('language')}>
            {languages.map((l, i) => (
              <button
                key={l.code}
                type="button"
                lang={l.code}
                aria-pressed={lang === l.code}
                onClick={() => setLang(l.code)}
                className={`min-h-[44px] px-2 ${i > 0 ? 'border-l border-white/30' : ''} ${
                  lang === l.code ? 'font-bold text-white underline decoration-2 underline-offset-4' : 'text-mint hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// A top-level menu item with a dropdown panel (desktop: opens on hover or keyboard focus).
// On mobile the item is a plain link to the section page.
function NavMenu({ to, label, children, wide = false }: { to: string; label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className="group relative">
      <NavLink to={to} className={({ isActive }) => navLinkClass(isActive)}>
        {label} <Icon name="chevronDown" size={16} className="hidden text-grey lg:block" />
      </NavLink>
      <div
        className={`invisible absolute left-0 top-full z-50 hidden rounded-card border border-line bg-white p-6 opacity-0 shadow-raised transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 lg:block ${
          wide ? 'w-[640px]' : 'w-max min-w-[300px]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

const navLinkClass = (active: boolean) =>
  `flex min-h-tap items-center gap-1 whitespace-nowrap rounded-btn px-3 font-semibold no-underline lg:rounded-none lg:border-b-[3px] lg:px-0 ${
    active ? 'bg-sage-tint text-green lg:border-terracotta lg:bg-transparent' : 'text-ink hover:text-green lg:border-transparent'
  }`;

const panelTitle = 'mb-3 text-small font-bold text-grey';
const panelLink = 'flex min-h-[44px] items-center gap-2.5 rounded-btn px-2.5 font-semibold text-green no-underline hover:bg-cream';
const panelAll = 'mt-4 flex items-center gap-1.5 border-t border-line pt-4 font-bold';

export default function Header() {
  const { count } = useCart();
  const { t } = useLang();
  const tr = useT(LAYOUT);
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

  return (
    <header className="relative z-40 bg-white lg:sticky lg:top-[-44px]">
      <TopBar />
      <div className="border-b border-line bg-white">
        <div className="container grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 py-3 [grid-template-areas:'brand_._actions''search_search_search'] lg:gap-x-10 lg:py-4 lg:[grid-template-areas:'brand_search_actions']">
          <Link to="/" aria-label={tr('homeAria')} className="flex min-h-tap items-center gap-3 no-underline [grid-area:brand]">
            {/* Official logo: 36px high on mobile, 44px on desktop (p.4) */}
            <img src="/logo.png" alt="Way2Cure" width={132} height={44} className="h-9 w-auto lg:h-11" />
          </Link>

          <form
            role="search"
            className="flex w-full max-w-[960px] items-center gap-2 justify-self-stretch rounded-btn border border-grey/40 bg-cream py-0.5 pl-3 pr-0.5 focus-within:border-green [grid-area:search] focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-terracotta-deep"
            onSubmit={(e) => { e.preventDefault(); navigate(`/shop?q=${encodeURIComponent(q.trim())}`); }}
          >
            <label htmlFor="site-search" className="sr-only">{t('search')}</label>
            <Icon name="search" className="shrink-0 text-grey" />
            <input
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="min-h-[44px] min-w-0 flex-1 border-0 bg-transparent p-0 text-body text-ink focus:outline-none"
            />
            <button type="submit" className={buttonClass('primary', { compact: true })}>{t('search')}</button>
          </form>

          <div className="flex items-center gap-1 [grid-area:actions]">
            <Link to="/account" className="flex min-h-tap min-w-[48px] items-center justify-center gap-1.5 rounded-btn px-2 font-bold text-green no-underline hover:bg-cream">
              <Icon name="user" /> <span className="hidden lg:inline">{t('login')}</span>
            </Link>
            <Link to="/cart" aria-label={tr('cartAria', { count })} className="relative flex min-h-tap min-w-[48px] items-center justify-center gap-1.5 rounded-btn px-2 font-bold text-green no-underline hover:bg-cream">
              <Icon name="cart" /> <span className="hidden lg:inline">{t('cart')}</span>
              {count > 0 && (
                <span aria-hidden="true" className="absolute left-7 top-0.5 grid h-[22px] min-w-[22px] place-items-center rounded-full border-2 border-white bg-terracotta-deep px-1.5 text-small font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="main-nav"
              onClick={() => setOpen((o) => !o)}
              className="flex min-h-tap items-center gap-1.5 rounded-btn border-2 border-green px-3 font-bold text-green lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} /> {t('menu')}
            </button>
          </div>
        </div>

        {/* Main nav (p.8): Home · Shop · Care Services · Subscriptions · Upload Prescription · About · Contact */}
        <nav id="main-nav" aria-label={tr('mainNav')} className={`border-t border-line ${open ? 'block' : 'hidden'} lg:block`}>
          <div className="container grid gap-1 pb-4 pt-2 lg:flex lg:items-center lg:gap-8 lg:py-0">
            <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>{t('home')}</NavLink>

            <NavMenu to="/shop" label={t('shop')} wide>
              <p className={panelTitle}>{tr('shopBy')}</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {[...categories, ...shopViews].map(loc).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/shop/${c.slug}`} className="flex items-start gap-3 rounded-btn p-2.5 no-underline hover:bg-cream">
                      <Icon name={c.icon} size={22} className="mt-0.5 shrink-0 text-terracotta-deep" />
                      <span className="grid leading-snug">
                        <strong className="text-green">{c.name}</strong>
                        <small className="text-small text-grey">{c.blurb}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/shop" className={panelAll}>{tr('allProducts')} <Icon name="arrow" size={18} /></Link>
            </NavMenu>

            <NavMenu to="/care" label={t('care')}>
              <div className="grid grid-cols-2 gap-6">
                {[false, true].map((special) => (
                  <div key={String(special)}>
                    <p className={panelTitle}>{special ? tr('careSpecial') : tr('careHome')}</p>
                    <ul className="grid gap-0.5">
                      {services.filter((s) => !!s.specialised === special).map(loc).map((s) => (
                        <li key={s.id}>
                          <Link to={`/care/${s.id}`} className={`${panelLink} whitespace-nowrap`}>
                            <Icon name={s.icon} size={18} className="shrink-0 text-terracotta-deep" /> {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link to="/care" className={panelAll}>{tr('allCare')} <Icon name="arrow" size={18} /></Link>
            </NavMenu>

            <NavMenu to="/subscriptions" label={t('subscriptions')}>
              <p className={panelTitle}>{tr('plans')}</p>
              <ul className="grid gap-0.5">
                {subscriptionPlans.map(loc).map((p) => (
                  <li key={p.id}>
                    <Link to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'} className={panelLink}>
                      <Icon name={p.icon} size={18} className="shrink-0 text-terracotta-deep" /> {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/subscriptions#manage" className={panelAll}>{tr('managePlan')} <Icon name="arrow" size={18} /></Link>
            </NavMenu>

            <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>{t('about')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => navLinkClass(isActive)}>{t('contact')}</NavLink>
            {/* Prescription upload: always visible, set apart at the end of the bar (p.8) */}
            <NavLink to="/prescription" className="mt-2 flex min-h-tap items-center gap-2 whitespace-nowrap rounded-btn border-2 border-terracotta-deep px-4 font-bold text-terracotta-deep no-underline hover:bg-terracotta-deep hover:text-white lg:my-1.5 lg:ml-auto lg:mt-1.5">
              <Icon name="rx" size={20} /> {t('uploadRx')}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
