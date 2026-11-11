import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MobileBar from './components/MobileBar.jsx';
import Home from './pages/Home.jsx';
const Shop = lazy(() => import('./pages/Shop.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const Prescription = lazy(() => import('./pages/Prescription.jsx'));
const Care = lazy(() => import('./pages/Care.jsx'));
const CareBooking = lazy(() => import('./pages/CareBooking.jsx'));
const Subscriptions = lazy(() => import('./pages/Subscriptions.jsx'));
const DoseSachets = lazy(() => import('./pages/DoseSachets.jsx'));
const SafeZone = lazy(() => import('./pages/SafeZone.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Help = lazy(() => import('./pages/Help.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const FamilyProfiles = lazy(() => import('./pages/FamilyProfiles.jsx'));
const Addresses = lazy(() => import('./pages/Addresses.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="container section" role="status">Loading…</div>}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
