import { Suspense, lazy, useEffect, type ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingHelp from './components/layout/FloatingHelp';
import { ArtDefs } from './components/brand/Illustrations';
import { m } from 'motion/react';
import { pageFade } from './lib/motion';
import { LAYOUT } from './components/layout/copy';
import { useT } from './i18n/LangContext';
import { useAuth } from './context/AuthContext';
// Every page, the homepage included, loads its own code, so no page downloads another's.
const Home = lazy(() => import('./pages/Home'));
const Styleguide = lazy(() => import('./pages/Styleguide'));
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Prescription = lazy(() => import('./pages/Prescription'));
const Care = lazy(() => import('./pages/Care'));
const CareBooking = lazy(() => import('./pages/CareBooking'));
const Subscriptions = lazy(() => import('./pages/Subscriptions'));
const DoseSachets = lazy(() => import('./pages/DoseSachets'));
const SafeZone = lazy(() => import('./pages/SafeZone'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Help = lazy(() => import('./pages/Help'));
const Account = lazy(() => import('./pages/Account'));
const FamilyProfiles = lazy(() => import('./pages/FamilyProfiles'));
const Addresses = lazy(() => import('./pages/Addresses'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Pages that belong to the signed-in account (inner pages). Signed out, they send you to log in
// and bring you back afterwards.
function RequireLogin({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  return user ? <>{children}</> : <Navigate to={`/login?next=${encodeURIComponent(pathname)}`} replace />;
}

// New page: start at the top. A link with a #section (e.g. /subscriptions#plan-refills) scrolls to
// that section instead, even when you are already on the page, and gives it a short highlight.
// Pages load lazily, so it waits (up to ~2 s) for the section to appear.
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer = 0;
    let clear = 0;
    const find = () => {
      const el = document.getElementById(id);
      if (el) {
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
        el.classList.remove('is-target');
        void el.offsetWidth; // restart the highlight when the same link is used again
        el.classList.add('is-target');
        clear = window.setTimeout(() => el.classList.remove('is-target'), 2000);
      } else if (tries++ < 40) {
        timer = window.setTimeout(find, 50);
      }
    };
    find();
    return () => { window.clearTimeout(timer); window.clearTimeout(clear); };
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  const tr = useT(LAYOUT);
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-50 rounded-btn bg-green px-4 py-3 font-bold text-white">{tr('skip')}</a>
      <ScrollToTop />
      <Header />
      {/* Room for the fixed floating header (same height as --header-space). The homepage hero
          makes its own room so it can run up under the transparent header. */}
      {pathname !== '/' && <div aria-hidden="true" className="h-[var(--header-space)]" />}
      <main id="main" tabIndex={-1}>
        {/* Full-height fallback: keeps the footer below the fold while a page loads, so nothing jumps (CLS) */}
        <Suspense fallback={<div className="container min-h-screen py-12" role="status"><span className="sr-only">Loading…</span></div>}>
        <m.div key={pathname} {...pageFade}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/care" element={<Care />} />
          <Route path="/care/:serviceId" element={<CareBooking />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subscriptions/dose-sachets" element={<DoseSachets />} />
          <Route path="/safe-zone" element={<SafeZone />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login mode="login" />} />
          <Route path="/signup" element={<Login mode="signup" />} />
          <Route path="/notifications" element={<RequireLogin><Notifications /></RequireLogin>} />
          <Route path="/account/family" element={<FamilyProfiles />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/legal" element={<Navigate to="/terms" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </m.div>
        </Suspense>
      </main>
      <Footer />
      <FloatingHelp />
      {/* Gradients shared by every product illustration (components/brand/Illustrations) */}
      <ArtDefs />
    </>
  );
}
