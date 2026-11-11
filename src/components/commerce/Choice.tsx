import type { ReactNode } from 'react';
import Icon from '../Icon';

// Choice rows and quantity stepper, used by Product, Cart and Checkout (shown on /styleguide).

export interface Choice { id: string; label: ReactNode; detail?: ReactNode }

/** Radio options as large tappable rows (48px+), with the selected one marked by border and a tick, not colour alone. */
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
              className={`flex min-h-tap cursor-pointer items-center gap-3 rounded-btn border-2 bg-white px-4 py-3 ${
                on ? 'border-green bg-sage-tint' : 'border-mint'
              }`}
            >
              <input type="radio" name={name} value={c.id} checked={on} onChange={() => onChange(c.id)} className="h-5 w-5 shrink-0 accent-green" />
              <span className="grid flex-1">
                <strong className="text-green">{c.label}</strong>
                {c.detail && <span className="text-base text-grey">{c.detail}</span>}
              </span>
              {on && <Icon name="check" size={20} className="shrink-0 text-green" />}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** − qty + stepper with 48px buttons. */
export function QtyStepper({ value, label, lessLabel, moreLabel, onLess, onMore }: {
  value: number;
  label: string;
  lessLabel: string;
  moreLabel: string;
  onLess: () => void;
  onMore: () => void;
}) {
  const btn = 'grid h-12 w-12 place-items-center text-green hover:bg-sage-tint';
  return (
    <div role="group" aria-label={label} className="inline-flex items-center overflow-hidden rounded-btn border-2 border-green bg-white">
      <button type="button" className={btn} onClick={onLess} aria-label={lessLabel}><Icon name="minus" /></button>
      <span aria-live="polite" className="min-w-[2.5rem] text-center text-body font-bold">{value}</span>
      <button type="button" className={btn} onClick={onMore} aria-label={moreLabel}><Icon name="plus" /></button>
    </div>
  );
}
