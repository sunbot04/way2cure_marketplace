import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { useCart } from '../../context/CartContext';
import { useT } from '../../i18n/LangContext';
import { formatPrice } from '../../config/site';
import { COPY } from '../copy';

// Shop page: once something is in the cart, a bar slides up from the bottom with the total and
// "View cart" (client design products.html). While it shows, the floating Call/WhatsApp buttons move
// up above it (--fab-lift, read by FloatingHelp).
export default function CartBar() {
  const tr = useT(COPY);
  const { count, subtotal } = useCart();
  const show = count > 0;

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--fab-lift', show ? '4.75rem' : '0px');
    return () => root.setProperty('--fab-lift', '0px');
  }, [show]);

  return (
    <div
      className={`fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 mx-auto w-[min(35rem,calc(100%-1.5rem))] transition-transform duration-slow ease-soft ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-[140%]'
      }`}
      // Hidden: out of the tab order and the accessibility tree
      {...(show ? {} : { inert: '', 'aria-hidden': true })}
    >
      <div className="flex items-center justify-between gap-3 rounded-[1.125rem] bg-green py-3 pl-[1.125rem] pr-3 text-white shadow-[0_20px_40px_-16px_rgb(0_0_0/0.45)]">
        <p role="status" className="m-0 grid leading-tight">
          <b className="text-base font-extrabold">{formatPrice(subtotal)}</b>
          <small className="text-[0.8125rem] font-semibold text-white/75">{count === 1 ? tr('cartOne') : tr('cartMany', { n: count })}</small>
        </p>
        <Link to="/cart" className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-xl bg-terracotta-deep px-4 text-[0.875rem] font-extrabold text-white no-underline transition-colors duration-micro hover:bg-terracotta-darker">
          {tr('viewCart')} <Icon name="arrow" size={16} />
        </Link>
      </div>
    </div>
  );
}
