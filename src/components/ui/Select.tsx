import {
  Children, isValidElement, useEffect, useId, useLayoutEffect, useRef, useState,
  type ChangeEvent, type KeyboardEvent, type ReactElement, type ReactNode,
} from 'react';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../Icon';

// The site's dropdown. Written like a native <select> (same props, <option> children, and an
// onChange that receives `e.target.value`), but drawn by us so the open list matches the site:
// a rounded white panel with a soft shadow, a highlighted row and a crimson tick on the choice.
// Accessibility follows the WAI-ARIA "select-only combobox" pattern: the button has
// role="combobox" and points at the highlighted option with aria-activedescendant.
// Keys: Down/Up/Enter/Space open; Up/Down/Home/End move; Enter/Space/Tab choose; Escape closes;
// typing a letter jumps to the next option that starts with it.

interface Opt { value: string; label: ReactNode; text: string; disabled?: boolean }

type OptionProps = { value?: string | number; children?: ReactNode; disabled?: boolean };

const textOf = (n: ReactNode): string =>
  typeof n === 'string' || typeof n === 'number' ? String(n) : Array.isArray(n) ? n.map(textOf).join('') : '';

function readOptions(children: ReactNode): Opt[] {
  return Children.toArray(children)
    .filter((c): c is ReactElement<OptionProps> => isValidElement(c) && c.type === 'option')
    .map((c) => {
      const text = textOf(c.props.children);
      return { value: c.props.value != null ? String(c.props.value) : text, label: c.props.children, text, disabled: c.props.disabled };
    });
}

export interface SelectProps {
  id?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  invalid?: boolean;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  'aria-describedby'?: string;
  'aria-label'?: string;
}

export default function Select({
  id, value, defaultValue, onChange, invalid, className = '', disabled, children,
  'aria-describedby': describedBy, 'aria-label': ariaLabel,
}: SelectProps) {
  const opts = readOptions(children);
  const auto = useId();
  const baseId = id ?? auto;
  const listId = `${baseId}-list`;
  const [inner, setInner] = useState(String(defaultValue ?? opts[0]?.value ?? ''));
  const current = value != null ? String(value) : inner;
  const selectedIndex = Math.max(0, opts.findIndex((o) => o.value === current));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selectedIndex);
  const [up, setUp] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: '', at: 0 });

  const choose = (i: number) => {
    const o = opts[i];
    if (!o || o.disabled) return;
    if (value == null) setInner(o.value);
    if (o.value !== current) onChange?.({ target: { value: o.value }, currentTarget: { value: o.value } } as unknown as ChangeEvent<HTMLSelectElement>);
    setOpen(false);
  };

  const openList = () => {
    if (disabled) return;
    // Open upwards when there is not enough room below
    const r = btn.current?.getBoundingClientRect();
    if (r) setUp(window.innerHeight - r.bottom < Math.min(300, opts.length * 48 + 24) && r.top > window.innerHeight - r.bottom);
    setActive(selectedIndex);
    setOpen(true);
  };

  // Close on a click or tap outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Keep the highlighted option in view
  useLayoutEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const move = (to: number) => {
    let i = Math.min(opts.length - 1, Math.max(0, to));
    const step = to > active ? 1 : -1;
    while (opts[i]?.disabled && i + step >= 0 && i + step < opts.length) i += step;
    setActive(i);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(k)) { e.preventDefault(); openList(); }
      return;
    }
    if (k === 'ArrowDown') { e.preventDefault(); move(active + 1); }
    else if (k === 'ArrowUp') { e.preventDefault(); move(active - 1); }
    else if (k === 'Home') { e.preventDefault(); move(0); }
    else if (k === 'End') { e.preventDefault(); move(opts.length - 1); }
    else if (k === 'Enter' || k === ' ') { e.preventDefault(); choose(active); }
    else if (k === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (k === 'Tab') choose(active);
    else if (k.length === 1) {
      const now = Date.now();
      typed.current = { text: now - typed.current.at > 700 ? k.toLowerCase() : typed.current.text + k.toLowerCase(), at: now };
      const q = typed.current.text;
      const order = [...opts.keys()].map((n) => (active + (q.length === 1 ? 1 : 0) + n) % opts.length);
      const hit = order.find((n) => opts[n].text.toLowerCase().startsWith(q));
      if (hit != null) setActive(hit);
    }
  };

  const shown = opts[selectedIndex];

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        ref={btn}
        id={baseId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${baseId}-o${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKey}
        className={[
          'group flex min-h-tap w-full items-center justify-between gap-3 rounded-xl border-2 bg-white py-2 pl-4 pr-2 text-left text-body text-ink',
          'shadow-[0_1px_2px_rgb(38_52_69/0.05)] transition-[border-color,box-shadow] duration-micro',
          'disabled:cursor-not-allowed disabled:bg-mist disabled:text-grey',
          invalid
            ? 'border-terracotta-deep'
            : open
              ? 'border-green shadow-[0_0_0_4px_rgb(var(--c-sage)/0.15)]'
              : 'border-mint hover:border-sage',
        ].join(' ')}
      >
        <span className="min-w-0 truncate">{shown?.label}</span>
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-[transform,background-color,color] duration-micro ${
            open ? 'rotate-180 bg-green text-white' : 'bg-mist text-green group-hover:bg-sage-tint'
          }`}
        >
          <Icon name="chevronDown" size={18} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            ref={list}
            id={listId}
            role="listbox"
            aria-labelledby={baseId}
            initial={{ opacity: 0, y: up ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: up ? 6 : -6, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute left-0 z-40 m-0 max-h-72 min-w-full list-none overflow-auto rounded-2xl border border-line bg-white p-1.5 shadow-float ${
              up ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top'
            }`}
          >
            {opts.map((o, i) => {
              const sel = i === selectedIndex;
              return (
                <li
                  key={o.value}
                  id={`${baseId}-o${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={sel}
                  aria-disabled={o.disabled || undefined}
                  onPointerEnter={() => !o.disabled && setActive(i)}
                  onPointerDown={(e) => e.preventDefault() /* keep focus on the button */}
                  onClick={() => choose(i)}
                  className={[
                    'flex min-h-[2.75rem] cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-base transition-colors duration-micro',
                    i === active ? 'bg-mist' : '',
                    sel ? 'font-bold text-green' : 'text-ink',
                    o.disabled ? 'cursor-not-allowed opacity-50' : '',
                  ].join(' ')}
                >
                  <span>{o.label}</span>
                  {sel && <Icon name="check" size={18} className="shrink-0 text-terracotta-deep" />}
                </li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
