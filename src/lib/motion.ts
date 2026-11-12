import type { Transition, Variants } from 'motion/react';

/*
  Way2Cure motion system. Every animation in the app uses these values; no one-off numbers
  in components.

  Principles: calm, purposeful, fast. Motion explains what appeared, what changed or what to
  do next. It never decorates. Our users are seniors, so nothing bounces, spins, auto-plays
  or moves continuously in a distracting way. Only transform and opacity are animated.
  <MotionConfig reducedMotion="user"> (App.tsx) turns every transform off for people who ask
  for reduced motion. They get instant opacity changes only.

  CSS equivalents for hover/press states live in tailwind.config.ts:
  duration-micro (180ms) and ease-out-soft (the reveal curve).
*/

/** The one easing curve for things entering: a soft ease-out with no overshoot. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  /** hover, press, colour: 150–200ms */
  micro: 0.18,
  /** elements entering: 450–550ms */
  reveal: 0.5,
  /** tab content swapping (dose sachet explorer) */
  crossfade: 0.25,
  /** route change fade */
  page: 0.2,
  /** count-up of real numbers (15,000+) */
  count: 1.2,
  /** hand-drawn underline drawing on */
  draw: 0.8,
  /** one full idle float cycle on the sachet */
  float: 6,
} as const;

/** Gap between siblings in a staggered group: 60–80ms */
export const STAGGER = 0.07;
/** How far things rise when they enter: 16–24px max */
export const RISE = 20;
/** Floating cards slide in from the side by this much */
export const SLIDE = 8;
/** Idle float amplitude on the hero sachet */
export const FLOAT_Y = 6;

/** Hero entrance timeline (seconds after load) */
export const HERO = { visual: 0.55, cards: 0.95, underline: 0.9 } as const;

/** Scroll reveals: once, when 20% of the element is in view */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const tReveal: Transition = { duration: DURATION.reveal, ease: EASE };
export const tMicro: Transition = { duration: DURATION.micro, ease: 'easeOut' };

/** Fade + rise: the default entrance for headings, paragraphs and cards. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: tReveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tReveal },
};

/** A parent that reveals its children one after another. */
export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren } },
});

/** Heading lines rising out of a clipping mask (the parent line has overflow:hidden). */
export const lineMask: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: tReveal },
};

/** Floating cards arrive last with a slight sideways slide. */
export const slideIn = (from: 'left' | 'right' = 'right', delay = 0): Variants => ({
  hidden: { opacity: 0, x: from === 'right' ? SLIDE : -SLIDE },
  show: { opacity: 1, x: 0, transition: { ...tReveal, delay } },
});

/** The hero visual composition, after the copy. */
export const heroVisual: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: { ...tReveal, delay: HERO.visual } },
};

/** Gentle idle float, used on the hero sachet only. Disabled under reduced motion. */
export const floatIdle = {
  animate: { y: [-FLOAT_Y, FLOAT_Y] },
  transition: { duration: DURATION.float / 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' } as Transition,
};

/** Tab content swaps (AnimatePresence mode="wait"). */
export const crossfade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DURATION.crossfade, ease: 'easeOut' } as Transition,
};

/** Route change: a quick fade in of the new page. */
export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.page, ease: 'easeOut' } as Transition,
};

/** Toast sliding in from the bottom. */
export const toastMotion = {
  initial: { opacity: 0, y: RISE },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: RISE / 2 },
  transition: tReveal,
};

/** Accordion panel open/close. Height is the one non-transform property we animate. It only
    happens on a single small panel the user asked to open, so it never shifts the page on its own. */
export const accordion = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: DURATION.crossfade, ease: EASE } as Transition,
};

/** Badge pulse once when the cart count goes up. */
export const pulse = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.18, 1] },
  transition: { duration: 0.4, ease: 'easeOut' } as Transition,
};
