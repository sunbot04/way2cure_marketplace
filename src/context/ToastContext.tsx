import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import { toastMotion } from '../lib/motion';

// Small confirmations ("Added to your cart") that slide in at the bottom and leave on their own.
// Announced to screen readers through a polite live region.

interface Toast { id: number; message: string; action?: { label: string; to: string } }
const Ctx = createContext<(t: Omit<Toast, 'id'>) => void>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number>();

  const show = useCallback((t: Omit<Toast, 'id'>) => {
    window.clearTimeout(timer.current);
    setToast({ ...t, id: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), 4500);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <Ctx.Provider value={show}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-start pl-4 pr-20 sm:justify-center sm:pr-24 lg:bottom-8">
        <AnimatePresence>
          {toast && (
            <m.div key={toast.id} {...toastMotion} className="pointer-events-auto flex max-w-md items-center gap-3 rounded-tile bg-green px-4 py-3 text-white shadow-float">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15"><Icon name="check" size={18} /></span>
              <span className="font-bold">{toast.message}</span>
              {toast.action && (
                <Link to={toast.action.to} className="group ml-2 inline-flex min-h-[2.75rem] items-center gap-1 whitespace-nowrap font-bold text-mustard">
                  {toast.action.label} <Icon name="arrow" size={16} className="transition-transform duration-micro group-hover:translate-x-[3px]" />
                </Link>
              )}
              <button type="button" onClick={() => setToast(null)} className="ml-1 grid h-11 w-11 shrink-0 place-items-center rounded-full text-mint hover:bg-white/10" aria-label="Close">
                <Icon name="close" size={18} />
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);
