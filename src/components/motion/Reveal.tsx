import type { ComponentType, ReactNode } from 'react';
import { m, type Variants } from 'motion/react';
import { VIEWPORT, fadeRise, stagger, tReveal } from '../../lib/motion';

// Scroll reveals: fade + rise once when 20% in view (VIEWPORT). Content is in the DOM from the
// start and only its opacity/transform animate, so it is always readable and clickable.

type Tag = 'div' | 'section' | 'ul' | 'ol' | 'li' | 'p' | 'span' | 'article' | 'header' | 'figure' | 'nav' | 'aside';
const tag = (as: Tag) => (m as unknown as Record<Tag, ComponentType<Record<string, unknown>>>)[as];

interface Base { as?: Tag; className?: string; children: ReactNode; id?: string }

/** One element that fades and rises into view. */
export function Reveal({ as = 'div', delay = 0, className, children, id }: Base & { delay?: number }) {
  const C = tag(as);
  const variants: Variants = delay
    ? { hidden: fadeRise.hidden, show: { opacity: 1, y: 0, transition: { ...tReveal, delay } } }
    : fadeRise;
  return (
    <C id={id} className={className} initial="hidden" whileInView="show" viewport={VIEWPORT} variants={variants}>
      {children}
    </C>
  );
}

/** A group whose StaggerItem children reveal one after another (60–80ms apart). */
export function Stagger({ as = 'div', delay = 0, className, children, id }: Base & { delay?: number }) {
  const C = tag(as);
  return (
    <C id={id} className={className} initial="hidden" whileInView="show" viewport={VIEWPORT} variants={stagger(delay)}>
      {children}
    </C>
  );
}

export function StaggerItem({ as = 'div', className, children }: Base) {
  const C = tag(as);
  return <C className={className} variants={fadeRise}>{children}</C>;
}
