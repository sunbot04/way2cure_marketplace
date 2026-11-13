import type { ReactNode } from 'react';
import Icon from '../Icon';

// Choice rows and quantity stepper, used by Product, Cart and Checkout (shown on /styleguide).

export interface Choice { id: string; label: ReactNode; detail?: ReactNode }

/**
 * Radio options as large tappable rows (48px+). The chosen one gets a green border, a tinted
 * background and a tick, so it never relies on colour alone. The real radio stays visible for
 * keyboard users (arrow keys move between options).
 */
export function ChoiceList({ name, legend, choices, value, onChange, legendClass = 'mb-3 font-bold text-green' }: {
  name: string;
  legend: ReactNode;
  choices: Choice[];
  value: string;
  onChange: (id: string) => void;
  legendClass?: string;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className={legendClass}>{legend}</legend>
      <div className="grid gap-2">
        {choices.map((c) => {
          const on = value === c.id;
          return (
            <label
              key={c.id}
              className={`flex min-h-tap cursor-pointer items-center gap-3 rounded-tile border-2 px-4 py-3 transition-colors duration-micro ${
                on ? 'border-green bg-mist' : 'border-line bg-white hover:border-sage'
              }`}
            >
              <input type="radio" name={name} value={c.id} checked={on} onChange={() => onChange(c.id)} className="h-5 w-5 shrink-0 accent-green" />
              <span className="grid flex-1">
                <strong className="text-green">{c.label}</strong>
                {c.detail && <span className="text-base text-grey">{c.detail}</span>}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-opacity duration-micro ${on ? 'bg-green text-white opacity-100' : 'opacity-0'}`}
              >
                <Icon name="check" size={16} />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** − qty + stepper with 48px buttons and a press state. */
/**
 * A two-option Yes / No question as a pair of large toggle buttons (real radios underneath, so
 * arrow keys and screen readers work). The chosen one is filled charcoal with a tick.
 */
export function YesNo({ name, legend, value, onChange, yes, no }: {
  name: string;
  legend: ReactNode;
  value: boolean;
  onChange: (v: boolean) => void;
  yes: ReactNode;
  no: ReactNode;
}) {
  const opts: [boolean, ReactNode][] = [[true, yes], [false, no]];
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-3 font-bold text-green">{legend}</legend>
      <div className="grid grid-cols-2 gap-2 rounded-tile bg-mist p-1.5">
        {opts.map(([v, label]) => {
          const on = value === v;
          return (
            <label
              key={String(v)}
              className={`relative flex min-h-tap cursor-pointer items-center justify-center gap-2 rounded-btn px-4 py-2 font-bold transition-[background-color,color,box-shadow] duration-micro has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta-deep ${
                on ? 'bg-green text-white shadow-raised' : 'text-green hover:bg-white'
              }`}
            >
              <input type="radio" name={name} checked={on} onChange={() => onChange(v)} className="sr-only" />
              {on && <Icon name="check" size={16} />}
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function QtyStepper({ value, label, lessLabel, moreLabel, onLess, onMore }: {
  value: number;
  label: string;
  lessLabel: string;
  moreLabel: string;
  onLess: () => void;
  onMore: () => void;
}) {
  const btn = 'grid h-12 w-12 place-items-center text-green transition-[background-color,transform] duration-micro hover:bg-mist active:scale-[0.94]';
  return (
    <div role="group" aria-label={label} className="inline-flex items-center overflow-hidden rounded-btn border-2 border-green bg-white">
      <button type="button" className={btn} onClick={onLess} aria-label={lessLabel}><Icon name="minus" /></button>
      <span aria-live="polite" className="min-w-[2.5rem] text-center text-body font-bold tabular-nums">{value}</span>
      <button type="button" className={btn} onClick={onMore} aria-label={moreLabel}><Icon name="plus" /></button>
    </div>
  );
}
