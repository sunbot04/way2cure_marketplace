import Icon from '../Icon';
import { useLoc } from '../../i18n/LangContext';
import type { Faq } from '../../data';

// Native <details> so it works with the keyboard and screen readers without extra code.
export default function FAQAccordion({ items }: { items: Faq[] }) {
  const loc = useLoc();
  return (
    <div className="grid gap-2">
      {items.map(loc).map((f) => (
        <details key={f.q} className="group rounded-card bg-white shadow-card">
          <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-bold text-green [&::-webkit-details-marker]:hidden">
            {f.q}
            <Icon name="plus" className="shrink-0 text-terracotta-deep transition-transform group-open:rotate-45" />
          </summary>
          <p className="m-0 px-5 pb-5">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
