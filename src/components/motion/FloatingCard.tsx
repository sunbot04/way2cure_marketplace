import type { ReactNode } from 'react';
import { m } from 'motion/react';
import { VIEWPORT, slideIn } from '../../lib/motion';

// A small white card that overlaps a visual (stat card, "Pharmacist verified").
// Arrives last with an 8px slide. `onLoad` plays on page load (hero); otherwise on scroll.
export default function FloatingCard({
  children,
  from = 'right',
  delay = 0,
  onLoad = false,
  className = '',
}: {
  children: ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  onLoad?: boolean;
  className?: string;
}) {
  const trigger = onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT };
  return (
    <m.div
      initial="hidden"
      {...trigger}
      variants={slideIn(from, delay)}
      className={`rounded-tile bg-white p-4 shadow-float ${className}`}
    >
      {children}
    </m.div>
  );
}
