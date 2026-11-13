import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';

// "Are you sure?" before something is removed (cart items, addresses, family profiles).
//   const confirm = useConfirm();
//   if (await confirm({ title, message, confirmLabel, cancelLabel })) remove();
// A small centred card over a softly dimmed page (role="alertdialog"). Focus starts on the safe
// choice (cancel) and stays inside the dialog; Escape or a click outside cancels; focus goes back
// to the button that opened it. Callers pass the words, already in the reader's language.

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  icon?: string;
}

type Ask = (o: ConfirmOptions) => Promise<boolean>;
const Ctx = createContext<Ask>(() => Promise.resolve(false));

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const textId = useId();

  const ask = useCallback<Ask>((o) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpts(o);
    return new Promise<boolean>((resolve) => { resolver.current = resolve; });
  }, []);

  const close = (answer: boolean) => {
    resolver.current?.(answer);
    resolver.current = null;
    setOpts(null);
    // Back to where the reader was (if that button still exists after the removal)
    window.setTimeout(() => { if (opener.current?.isConnected) opener.current.focus(); }, 0);
  };

  // While open: focus the safe button and stop the page behind from scrolling
  useEffect(() => {
    if (!opts) return;
    // Focus the safe choice (the first button: cancel) once the dialog has rendered
    const id = window.setTimeout(() => boxRef.current?.querySelector<HTMLElement>('button')?.focus(), 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.clearTimeout(id); document.body.style.overflow = prev; };
  }, [opts]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); close(false); return; }
    if (e.key !== 'Tab') return;
    // Keep keyboard focus inside the dialog
    const items = boxRef.current?.querySelectorAll<HTMLElement>('button');
    if (!items?.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <Ctx.Provider value={ask}>
      {children}
      <AnimatePresence>
        {opts && (
          <m.div
            key="confirm"
            className="fixed inset-0 z-[60] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onKey}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={() => close(false)} />
            <m.div
              ref={boxRef}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={textId}
              className="relative w-full max-w-[30rem] rounded-[1.5rem] bg-white p-6 text-center shadow-float sm:p-8"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#FDF2F4] text-terracotta-deep">
                <Icon name={opts.icon ?? 'trash'} size={28} />
              </span>
              <h2 id={titleId} className="mb-2 font-body text-h3m font-extrabold text-green md:text-h3">{opts.title}</h2>
              <p id={textId} className="mx-auto mb-7 max-w-[22rem] text-base text-ink/75">{opts.message}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" onClick={() => close(false)}>{opts.cancelLabel}</Button>
                <Button variant="urgent" onClick={() => close(true)}><Icon name="trash" size={18} /> {opts.confirmLabel}</Button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export const useConfirm = () => useContext(Ctx);
