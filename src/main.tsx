import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { LangProvider } from './i18n/LangContext';
// Legacy stylesheet for pages not yet moved to Tailwind; loaded first so Tailwind utilities win.
import './styles/global.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
