import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import Sachet, { SLOTS, SLOT_STYLE, SLOT_TEXT, type Slot } from './Sachet';
import { crossfade } from '../../lib/motion';
import { useT } from '../../i18n/LangContext';

// Morning / Afternoon / Evening / Night tabs. The sachet (content + colour stripe) crossfades in
// 250ms. Keyboard: arrow keys move between tabs, Home/End jump (WAI-ARIA tabs pattern).
export default function SachetExplorer({ label }: { label: string }) {
  const tr = useT(SLOT_TEXT);
  const [slot, setSlot] = useState<Slot>('morning');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = SLOTS.length - 1;
    const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setSlot(SLOTS[next]);
    refs.current[next]?.focus();
  };

  return (
    <div className="grid justify-items-center gap-8">
      <div role="tablist" aria-label={label} className="grid w-full max-w-md grid-cols-2 gap-2 sm:grid-cols-4">
        {SLOTS.map((s, i) => {
          const on = s === slot;
          return (
            <button
              key={s}
              ref={(el) => { refs.current[i] = el; }}
              id={`tab-${s}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="sachet-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setSlot(s)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex min-h-tap flex-col items-center justify-center rounded-btn border-2 px-2 py-1.5 text-base font-bold transition-colors duration-micro ${
                on ? 'border-green bg-white text-green shadow-card' : 'border-transparent bg-white/60 text-grey hover:bg-white hover:text-green'
              }`}
            >
              <span className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-full ${SLOT_STYLE[s].dot}`} />{tr(s)}</span>
              <span className="text-small font-semibold text-grey">{tr(`t${s[0].toUpperCase()}${s.slice(1)}`)}</span>
            </button>
          );
        })}
      </div>
      <div id="sachet-panel" role="tabpanel" aria-labelledby={`tab-${slot}`} className="grid min-h-[27rem] place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={slot} {...crossfade}>
            <Sachet slot={slot} />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
