import { useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../Icon';
import { useLoc } from '../../i18n/LangContext';
import { accordion } from '../../lib/motion';
import type { Faq } from '../../data';

// Questions open with a smooth height animation and the chevron turns. Buttons with
// aria-expanded / aria-controls, so it works with the keyboard and screen readers.
export default function FAQAccordion({ items }: { items: Faq[] }) {
  const loc = useLoc();
  const base = useId();
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <div className="grid gap-3">
      {items.map(loc).map((f, i) => {
        const isOpen = open.includes(i);
        const id = `${base}-${i}`;
        return (
          <div key={f.q} className={`rounded-tile bg-white transition-shadow duration-micro ${isOpen ? 'shadow-raised' : 'shadow-card'}`}>
            <h3 className="m-0 text-body">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => toggle(i)}
                className="flex min-h-[3.75rem] w-full items-center justify-between gap-4 rounded-tile px-5 py-4 text-left font-bold text-green"
              >
                {f.q}
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-micro ${isOpen ? 'rotate-180 bg-green text-white' : 'bg-mist text-green'}`}>
                  <Icon name="chevronDown" size={18} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div id={id} {...accordion} className="overflow-hidden">
                  <p className="m-0 px-5 pb-5 text-ink/85">{f.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
