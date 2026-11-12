import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import { toastMotion } from '../lib/motion';

// Small confirmations ("Added to cart") that slide in at the bottom and leave on their own after
// 4.5 seconds: a slim pill with one short line and at most one link. Announced to screen readers
// through a polite live region.

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
            <m.div key={toast.id} {...toastMotion} className={`pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-3xl bg-green py-1 pl-2 text-base text-white shadow-float ${toast.action ? 'pr-2' : 'pr-5'}`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15"><Icon name="check" size={15} /></span>
              <span className="py-2.5 font-semibold leading-snug">{toast.message}</span>
              {toast.action && (
                <Link to={toast.action.to} onClick={() => setToast(null)} className="group inline-flex min-h-[2.75rem] items-center gap-1 whitespace-nowrap border-l border-white/20 pl-3 pr-2 font-bold text-mustard no-underline hover:underline">
                  {toast.action.label} <Icon name="arrow" size={15} className="transition-transform duration-micro group-hover:translate-x-[3px]" />
                </Link>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);
