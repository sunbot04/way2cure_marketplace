import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileTabBar from './components/layout/MobileTabBar';
import { LAYOUT } from './components/layout/copy';
import { useT } from './i18n/LangContext';
import Home from './pages/Home';
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
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const tr = useT(LAYOUT);
  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-50 rounded-btn bg-green px-4 py-3 font-bold text-white">{tr('skip')}</a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="container py-12" role="status">Loading…</div>}>
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
          <Route path="/account/family" element={<FamilyProfiles />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  );
}
