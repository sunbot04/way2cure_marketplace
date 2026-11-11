import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { LangProvider } from './i18n/LangContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <CartProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </CartProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
