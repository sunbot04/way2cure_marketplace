import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import App from './App';
import { CartProvider } from './context/CartContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { SavedProvider } from './context/SavedContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { LangProvider } from './i18n/LangContext';
import './styles/fonts.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Motion for the whole app. reducedMotion="user": anyone who asks their device to reduce
          motion gets no movement, only instant opacity changes (see src/lib/motion.ts). */}
      <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
      <LangProvider>
        <AuthProvider>
        <CartProvider>
        <SavedProvider>
          <NotificationsProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </NotificationsProvider>
        </SavedProvider>
        </CartProvider>
        </AuthProvider>
      </LangProvider>
      </MotionConfig>
      </LazyMotion>
    </BrowserRouter>
  </React.StrictMode>,
);
