import Icon from '../Icon';
import { useLoc } from '../../i18n/LangContext';

// Numbered steps (prescription flow, checkout, booking, subscriptions). Max 4 steps in any flow (p.12).
export type StepColour = 'green' | 'sage' | 'mustard' | 'terracotta-deep';

export interface Step {
  title: string;
  text?: string;
  colour?: StepColour;
  hi?: { title?: string; text?: string };
  mr?: { title?: string; text?: string };
}

// Number circle colours; light fills (sky blue, yellow) take dark text for contrast.
const DOT: Record<StepColour, string> = {
  green: 'bg-green text-white',
  sage: 'bg-sage text-ink',
  mustard: 'bg-mustard text-green',
  'terracotta-deep': 'bg-terracotta-deep text-white',
};

interface Props {
  steps: Step[];
  /** row: across on tablet and up · column: always stacked with a connecting line */
  layout?: 'row' | 'column';
  /** Index of the current step in a live flow (checkout). Earlier steps show a tick. */
  current?: number;
  className?: string;
}

export default function StepList({ steps, layout = 'row', current, className = '' }: Props) {
  const loc = useLoc();
  const row = layout === 'row';
  return (
    <ol className={`grid gap-6 ${row ? 'md:grid-cols-4' : ''} ${className}`}>
      {steps.map(loc).map((s, i) => {
        const done = current !== undefined && i < current;
        const isCurrent = current === i;
        const muted = current !== undefined && i > current;
        return (
          <li
            key={i}
            aria-current={isCurrent ? 'step' : undefined}
            className={`relative flex items-start gap-4 ${row ? 'md:flex-col md:gap-3' : ''}`}
          >
            {!row && i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute left-[1.6875rem] top-14 h-[calc(100%-32px)] w-0.5 bg-mint" />
            )}
            <span
              className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full font-head text-h2m font-bold ${
                muted ? 'bg-mint text-grey' : DOT[s.colour ?? 'green']
              }`}
            >
              {done ? <Icon name="check" size={24} /> : i + 1}
            </span>
            <span className="grid pt-1.5">
              <strong className={`text-h3m text-green ${isCurrent ? 'underline decoration-terracotta decoration-[3px] underline-offset-[6px]' : ''}`}>
                {s.title}
              </strong>
              {s.text && <span className="text-base text-grey">{s.text}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
