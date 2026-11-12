import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../Icon';
import { buttonClass } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { languages, useLang, useLoc, useT } from '../../i18n/LangContext';
import { categories, services, shopViews, subscriptionPlans } from '../../data';
import { SITE } from '../../config/site';
import { crossfade, pulse } from '../../lib/motion';
import { LAYOUT } from './copy';

// Header (guidelines p.8, references: DawaTime floating header).
// A slim utility strip (helpline, WhatsApp, home care site, language), then a floating rounded
// bar inset from the screen edges. Transparent over the page at the top; white with a soft shadow
// once you scroll, when the strip slides away and the bar gets a little shorter.
// The bar's right side keeps only search, cart and account. Calling is the floating button on every
// page; "Upload a prescription" is the first option in the Shop menu (and a row in the mobile menu);
// notifications live inside the signed-in account.
// Height is fixed and matched by --header-space in index.css.

function Utility() {
  const { lang, setLang, t } = useLang();
  const tr = useT(LAYOUT);
  const link = 'inline-flex min-h-[2.75rem] items-center gap-1.5 font-semibold text-green no-underline hover:underline';
  return (
    <div className="container flex h-11 items-center justify-between gap-4 text-small">
      <div className="flex items-center gap-5">
        <a href={SITE.phoneHref} className={link}>
          <Icon name="phone" size={15} /> <span className="hidden sm:inline">{tr('helpline')}</span> <strong>{SITE.phone}</strong>
        </a>
        <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className={`${link} hidden sm:inline-flex`}>
          <Icon name="whatsapp" size={15} /> {t('whatsapp')}
        </a>
      </div>
      <div className="flex items-center gap-5">
        <a href={SITE.homeCareUrl} className={`${link} hidden md:inline-flex`}>{t('homeCareSite')} <Icon name="external" size={13} /></a>
        {/* Language switch stays visible in the header, never hidden in a menu (p.12) */}
        <div role="group" aria-label={t('language')} className="flex items-center">
          {languages.map((l, i) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              aria-pressed={lang === l.code}
              onClick={() => setLang(l.code)}
              className={`min-h-[2.75rem] px-2 ${i > 0 ? 'border-l border-green/20' : ''} ${
                lang === l.code ? 'font-bold text-green underline decoration-terracotta decoration-2 underline-offset-4' : 'text-grey hover:text-green'
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

function NavMenu({ to, label, children, wide = false, also = [] }: { to: string; label: string; children: ReactNode; wide?: boolean; also?: string[] }) {
  // Also underlined on related pages that live in this menu (e.g. Shop on the prescription page)
  const { pathname } = useLocation();
  const related = also.some((p) => pathname.startsWith(p));
  return (
    <div className="group relative">
      <NavLink to={to} className={({ isActive }) => navLinkClass(isActive || related)}>
        {label} <Icon name="chevronDown" size={15} className="text-grey transition-transform duration-micro group-hover:rotate-180" />
      </NavLink>
      {/* Opens from the left edge of the menu item, so it never runs off the screen */}
      <div
        className={`invisible absolute -left-3 top-full z-50 translate-y-1 pt-2 opacity-0 transition-[opacity,transform] duration-micro ease-soft group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
          wide ? 'w-[27rem]' : 'w-max min-w-[15rem] max-w-[32rem]'
        }`}
      >
        <div className="rounded-tile border border-line bg-white p-3 shadow-float">{children}</div>
      </div>
    </div>
  );
}

const navLinkClass = (active: boolean) =>
  `relative flex min-h-tap items-center gap-1 whitespace-nowrap text-base font-semibold no-underline transition-colors duration-micro after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:rounded-full after:bg-terracotta after:transition-transform after:duration-micro ${
    active ? 'text-green after:scale-x-100' : 'text-ink hover:text-green after:scale-x-0 hover:after:scale-x-100'
  }`;

const panelTitle = 'mb-1 px-2 pt-1 text-small font-semibold text-grey';
const panelLink = 'flex min-h-[2.75rem] items-center gap-2 rounded-btn px-2 text-base font-semibold text-green no-underline hover:bg-mist';
const panelAll = 'group/all mx-2 mt-2 flex min-h-[2.75rem] items-center gap-1.5 border-t border-line pt-2 text-base font-bold no-underline hover:underline';
const iconBtn = 'relative grid h-11 w-11 place-items-center rounded-full text-green no-underline transition-colors duration-micro hover:bg-mist';
const badge = 'absolute -right-0.5 -top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full border-2 border-white bg-terracotta-deep px-1 text-[0.7rem] font-bold leading-none text-white';

export default function Header() {
  const { count } = useCart();
  const { user } = useAuth();
  const { t } = useLang();
  const tr = useT(LAYOUT);
  const loc = useLoc();
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus after navigating.
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [location.pathname]);

  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  const solid = scrolled || open || searchOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={`transition-transform duration-slow ease-soft ${scrolled ? '-translate-y-11' : ''}`}>
        <Utility />
        <div className="px-2 pt-2 lg:px-3 lg:pt-3">
          <div
            className={`mx-auto max-w-[86rem] rounded-tile transition-[background-color,box-shadow] duration-slow ease-soft ${
              solid ? 'bg-white shadow-header' : 'bg-transparent'
            }`}
          >
            <div className={`flex items-center gap-2 px-3 transition-[height] duration-slow ease-soft lg:gap-4 lg:px-5 ${scrolled ? 'h-16' : 'h-[4.5rem] lg:h-20'}`}>
              <Link to="/" aria-label={tr('homeAria')} className="mr-2 flex min-h-tap shrink-0 items-center no-underline xl:mr-6">
                {/* Official logo: 36px high on mobile, 44px on desktop (p.4) */}
                <img src="/logo.png" alt="Way2Cure" width={132} height={44} className={`w-auto transition-[height] duration-slow ${scrolled ? 'h-9' : 'h-9 lg:h-11'}`} />
              </Link>

              {/* Desktop navigation (p.8). Below 1280px it lives in the menu. The logo links home. */}
              <nav aria-label={tr('mainNav')} className="hidden items-center gap-6 xl:flex">
                <NavMenu to="/shop" label={t('shop')} wide also={['/prescription']}>
                  {/* Ordering with a prescription: the first, highlighted option of the Shop menu */}
                  <Link to="/prescription" className="group/rx mb-3 flex items-center gap-3 rounded-btn bg-mist px-3 py-2.5 no-underline transition-colors duration-micro hover:bg-mint/60">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terracotta-deep text-white"><Icon name="rx" size={17} /></span>
                    <span className="grid flex-1 leading-snug">
                      <strong className="text-base text-green">{tr('rxTitle')}</strong>
                      <span className="text-small text-grey">{tr('rxSub')}</span>
                    </span>
                    <Icon name="arrow" size={16} className="shrink-0 text-green transition-transform duration-micro group-hover/rx:translate-x-[3px]" />
                  </Link>
                  <p className={panelTitle}>{tr('shopBy')}</p>
                  <ul className="grid grid-cols-2 gap-x-1">
                    {[...categories, ...shopViews].map(loc).map((c) => (
                      <li key={c.slug}>
                        <Link to={`/shop/${c.slug}`} className="flex min-h-[2.75rem] items-center gap-2.5 rounded-btn px-2 py-1 text-base font-semibold text-green no-underline hover:bg-mist">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-btn bg-mist"><Icon name={c.icon} size={16} /></span>
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/shop" className={panelAll}>{tr('allProducts')} <Icon name="arrow" size={16} className="transition-transform duration-micro group-hover/all:translate-x-[3px]" /></Link>
                </NavMenu>
                <NavMenu to="/care" label={t('care')}>
                  <div className="grid grid-cols-2 gap-2">
                    {[false, true].map((special) => (
                      <div key={String(special)}>
                        <p className={panelTitle}>{special ? tr('careSpecial') : tr('careHome')}</p>
                        <ul className="grid gap-0.5">
                          {services.filter((s) => !!s.specialised === special).map(loc).map((s) => (
                            <li key={s.id}>
                              <Link to={`/care/${s.id}`} className={`${panelLink} whitespace-nowrap`}>
                                <Icon name={s.icon} size={16} className="shrink-0 text-sage" /> {s.name}
                                {s.isNew && <span className="rounded-full bg-mustard px-1.5 py-px text-[0.7rem] font-bold text-green">{tr('newTag')}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link to="/care" className={panelAll}>{tr('allCare')} <Icon name="arrow" size={16} className="transition-transform duration-micro group-hover/all:translate-x-[3px]" /></Link>
                </NavMenu>
                <NavMenu to="/subscriptions" label={t('subscriptions')}>
                  <p className={panelTitle}>{tr('plans')}</p>
                  <ul className="grid gap-0.5">
                    {subscriptionPlans.map(loc).map((p) => (
                      <li key={p.id}>
                        <Link to={p.id === 'sachets' ? '/subscriptions/dose-sachets' : '/subscriptions'} className={panelLink}>
                          <Icon name={p.icon} size={16} className="shrink-0 text-sage" /> {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/subscriptions#manage" className={panelAll}>{tr('managePlan')} <Icon name="arrow" size={16} className="transition-transform duration-micro group-hover/all:translate-x-[3px]" /></Link>
                </NavMenu>
                <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>{t('about')}</NavLink>
                <NavLink to="/contact" className={({ isActive }) => navLinkClass(isActive)}>{t('contact')}</NavLink>
              </nav>

              <div className="ml-auto flex items-center gap-1">
                <button type="button" aria-expanded={searchOpen} aria-controls="site-search-panel" onClick={() => setSearchOpen((s) => !s)} className={iconBtn} aria-label={t('search')}>
                  <Icon name={searchOpen ? 'close' : 'search'} size={21} />
                </button>
                <Link to="/cart" aria-label={tr('cartAria', { count })} className={iconBtn}>
                  <Icon name="cart" size={21} />
                  {count > 0 && <m.span key={count} {...pulse} aria-hidden="true" className={badge}>{count}</m.span>}
                </Link>
                {/* Signed in: account. Signed out: login (OTP). */}
                <Link to={user ? '/account' : '/login'} aria-label={user ? t('account') : t('login')} title={user ? t('account') : t('login')} className={`${iconBtn} hidden sm:grid`}>
                  <Icon name="user" size={21} />
                  {user && <span aria-hidden="true" className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-sage" />}
                </Link>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={t('menu')}
                  onClick={() => setOpen((o) => !o)}
                  className="ml-1 flex min-h-[2.75rem] items-center gap-1.5 rounded-full border-2 border-green px-3 text-base font-bold text-green xl:hidden"
                >
                  <Icon name={open ? 'close' : 'menu'} size={20} /> <span className="hidden sm:inline">{t('menu')}</span>
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {searchOpen && (
                <m.div id="site-search-panel" {...crossfade} className="px-3 pb-3 lg:px-5 lg:pb-4">
                  <form
                    role="search"
                    className="flex items-center gap-2 rounded-btn border-2 border-green bg-cream py-1 pl-4 pr-1"
                    onSubmit={(e) => { e.preventDefault(); navigate(`/shop?q=${encodeURIComponent(q.trim())}`); }}
                  >
                    <label htmlFor="site-search" className="sr-only">{t('search')}</label>
                    <Icon name="search" className="shrink-0 text-grey" />
                    <input
                      ref={searchRef}
                      id="site-search"
                      type="search"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={t('searchPlaceholder')}
                      className="min-h-[2.75rem] min-w-0 flex-1 border-0 bg-transparent p-0 text-body text-ink focus:outline-none"
                    />
                    <button type="submit" className={buttonClass('primary', { compact: true })}>{t('search')}</button>
                  </form>
                </m.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {open && (
                <m.nav id="mobile-menu" aria-label={tr('mainNav')} {...crossfade} className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-line px-3 pb-4 pt-2 xl:hidden">
                  <ul className="grid gap-0.5">
                    {[
                      ['/', t('home'), 'home'],
                      ['/shop', t('shop'), 'pill'],
                      ['/prescription', t('uploadRx'), 'rx'],
                      ['/care', t('care'), 'stethoscope'],
                      ['/subscriptions', t('subscriptions'), 'refresh'],
                      ['/about', t('about'), 'users'],
                      ['/contact', t('contact'), 'phone'],
                      [user ? '/account' : '/login', user ? t('account') : t('login'), 'user'],
                    ].map(([to, label, icon]) => (
                      <li key={to}>
                        <NavLink to={to} end={to === '/'} className={({ isActive }) => `flex min-h-tap items-center gap-3 rounded-btn px-3 text-body font-semibold no-underline ${isActive ? 'bg-mist text-green' : 'text-ink hover:bg-mist'}`}>
                          <Icon name={icon} size={20} className="text-sage" /> {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </m.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
