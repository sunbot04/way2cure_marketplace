import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import { buttonClass } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { languages, useLang, useLoc, useT } from '../../i18n/LangContext';
import { categories, services, shopViews, subscriptionPlans } from '../../data';
import { SITE } from '../../config/site';
import { LAYOUT } from './copy';

// Top bar (guidelines p.8): phone, WhatsApp, link back to the home care site, language switch.
function TopBar() {
  const { lang, setLang, t } = useLang();
  const link = 'inline-flex min-h-[44px] items-center gap-1.5 font-bold text-white no-underline hover:underline';
  return (
    <div className="bg-green text-base text-white">
      <div className="container flex min-h-[48px] flex-wrap items-center justify-center gap-x-6 gap-y-1 py-1 sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5">
          <a href={SITE.phoneHref} className={link}><Icon name="phone" size={18} /> {SITE.phone}</a>
          <a href={SITE.whatsappHref} className={link} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> {t('whatsapp')}</a>
          <a href={SITE.homeCareUrl} className={`${link} hidden sm:inline-flex`}><Icon name="stethoscope" size={18} /> {t('homeCareSite')}</a>
        </div>
        {/* Language switch stays visible in the header, never hidden in a menu (p.12) */}
        <div className="flex items-center gap-1" role="group" aria-label={t('language')}>
          <Icon name="globe" size={18} />
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              aria-pressed={lang === l.code}
              onClick={() => setLang(l.code)}
              className={`min-h-[40px] rounded-btn px-3 text-base transition-colors ${
                lang === l.code ? 'bg-white font-bold text-green' : 'text-white hover:bg-white/10'
              }`}
            >
              {l.label}
            </button>
          ))}
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
  `flex min-h-tap items-center gap-1 whitespace-nowrap rounded-btn px-3 font-bold text-green no-underline hover:bg-cream ${
    active ? 'bg-sage-tint lg:bg-transparent lg:underline lg:decoration-terracotta lg:decoration-[3px] lg:underline-offset-[10px]' : ''
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
    <header className="relative z-40 bg-white lg:sticky lg:top-[-48px]">
      <TopBar />
      <div className="border-b border-line bg-white">
        <div className="container grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 py-3 [grid-template-areas:'brand_._actions''search_search_search'] lg:gap-x-6 lg:[grid-template-areas:'brand_search_actions']">
          <Link to="/" aria-label={tr('homeAria')} className="flex items-center gap-3 no-underline [grid-area:brand]">
            {/* Official logo: 36px high on mobile, 44px on desktop (p.4) */}
            <img src="/logo.png" alt="Way2Cure" width={132} height={44} className="h-9 w-auto lg:h-11" />
            <span className="border-l-2 border-mint pl-3 text-small font-bold tracking-wide text-terracotta-deep">{tr('label')}</span>
          </Link>

          <form
            role="search"
            className="flex w-full max-w-[640px] items-center gap-2 justify-self-center rounded-btn border-2 border-green bg-white py-0.5 pl-3 pr-0.5 [grid-area:search] focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-terracotta-deep"
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
            <a href={SITE.phoneHref} className="mr-2 hidden items-center gap-2.5 rounded-btn px-2 py-1 no-underline hover:bg-cream xl:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-terracotta-deep text-white"><Icon name="phone" size={20} /></span>
              <span className="grid leading-tight">
                <small className="text-small font-semibold text-grey">{tr('support247')}</small>
                <strong className="whitespace-nowrap text-base text-green">{SITE.phoneDisplay}</strong>
              </span>
            </a>
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
          <div className="container grid gap-1 pb-4 pt-2 lg:flex lg:items-center lg:gap-1 lg:py-1">
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

            {/* Prescription upload stays a bright button for everyone (p.8) */}
            <NavLink to="/prescription" className={`${buttonClass('urgent', { compact: true })} my-2 whitespace-nowrap lg:mx-2 lg:my-0`}>
              <Icon name="rx" size={20} /> {t('uploadRx')}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>{t('about')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => navLinkClass(isActive)}>{t('contact')}</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
