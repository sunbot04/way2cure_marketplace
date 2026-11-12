import { Fragment, type ReactNode } from 'react';
import { m } from 'motion/react';
import { DURATION, EASE, VIEWPORT } from '../../lib/motion';

// Headings with ONE emphasised phrase (max one accent per section):
//   *phrase*  -> Lora Italic in terracotta deep
//   _phrase_  -> a hand-drawn terracotta underline that draws on (SVG pathLength)
// Copy stays a plain string in the translation files, e.g. 'Care at home, *now with everything*'.

export function HandUnderline({ children, delay = 0, onLoad = false }: { children: ReactNode; delay?: number; onLoad?: boolean }) {
  const trigger = onLoad ? { animate: { pathLength: 1 } } : { whileInView: { pathLength: 1 }, viewport: VIEWPORT };
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible text-terracotta"
      >
        <m.path
          d="M4 11 C 52 4, 112 3, 168 6 S 258 12, 296 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          {...trigger}
          transition={{ duration: DURATION.draw, ease: EASE, delay }}
        />
      </svg>
    </span>
  );
}

/** Renders *italic accent* and _underline accent_ markers inside a heading string. */
export default function Accent({ text, underlineDelay = 0, onLoad = false }: { text: string; underlineDelay?: number; onLoad?: boolean }) {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('*') && p.endsWith('*')) return <em key={i} className="accent text-terracotta-deep">{p.slice(1, -1)}</em>;
        if (p.startsWith('_') && p.endsWith('_')) return <HandUnderline key={i} delay={underlineDelay} onLoad={onLoad}>{p.slice(1, -1)}</HandUnderline>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

/** Small section label: a short line + text, terracotta deep, 14px semibold. Not a pill. */
export function Eyebrow({ children, light = false, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`mb-4 flex items-center gap-3 text-small font-semibold ${light ? 'text-mustard' : 'text-terracotta-deep'} ${className}`}>
      <span aria-hidden="true" className="h-0.5 w-8 shrink-0 rounded-full bg-current" />
      {children}
    </p>
  );
}
