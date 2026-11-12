import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotionConfig } from 'motion/react';
import { DURATION, EASE } from '../../lib/motion';

// Count-up for REAL numbers only (guidelines p.9): runs once, when in view, in 1.2s.
// Screen readers get the final number straight away; the moving digits are hidden from them.
export default function CountUp({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotionConfig();
  const [value, setValue] = useState(0);
  const fmt = (n: number) => n.toLocaleString('en-IN');

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setValue(to); return; }
    const controls = animate(0, to, { duration: DURATION.count, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{fmt(to)}{suffix}</span>
      <span aria-hidden="true" className="tabular-nums">{fmt(value)}{suffix}</span>
    </span>
  );
}
