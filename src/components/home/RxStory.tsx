import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence, m, useMotionValue, useMotionValueEvent, useReducedMotionConfig, useScroll, useTransform,
  type MotionProps, type Transition,
} from 'motion/react';
import Icon from '../Icon';
import { Reveal } from '../motion/Reveal';
import { crossfade } from '../../lib/motion';
import { useT, type Dict } from '../../i18n/LangContext';

// "How prescriptions work": Upload -> AI reads -> Pharmacist verifies -> Delivered.
// Desktop (lg+): the picture and all four steps are pinned together inside a tall (220vh) outer
// block; scrolling through that block moves the red progress line (and a capsule riding on it) and
// lights up each step in turn, and the picture plays a short animation for the step that is on.
// Phones, and anyone who asks for reduced motion: a plain vertical stepper, nothing pinned.
// Scroll-linked (not auto-playing), so the steps only change when the reader scrolls.

export interface StoryStep { title: string; text?: string; tag?: string }

const V: Dict = {
  en: { photo: 'Prescription photo', uploaded: 'Uploaded · 9:14 am', found: 'Medicines found', aiNote: 'Read by AI. Please check the list.', edit: 'Edit',
        checked: 'Checked by your Way2Cure pharmacist', c1: 'Matches your prescription', c2: 'Doses and timings confirmed', c3: 'We call you if anything is unclear',
        arriving: 'Arriving today by 6 pm', otp: 'Share this OTP with the rider' },
  hi: { photo: 'पर्चे की फ़ोटो', uploaded: 'अपलोड हुआ · सुबह 9:14', found: 'मिली दवाइयाँ', aiNote: 'AI ने पढ़ा। कृपया लिस्ट जाँचें।', edit: 'बदलें',
        checked: 'आपके Way2Cure फ़ार्मासिस्ट ने जाँचा', c1: 'पर्चे से मेल खाता है', c2: 'डोज़ और समय की पुष्टि', c3: 'कुछ साफ़ न हो तो हम कॉल करेंगे',
        arriving: 'आज शाम 6 बजे तक पहुँचेगा', otp: 'राइडर को यह OTP बताएँ' },
  mr: { photo: 'प्रिस्क्रिप्शनचा फोटो', uploaded: 'अपलोड झाले · सकाळी 9:14', found: 'सापडलेली औषधे', aiNote: 'AI ने वाचले. कृपया यादी तपासा.', edit: 'बदला',
        checked: 'तुमच्या Way2Cure फार्मासिस्टने तपासले', c1: 'प्रिस्क्रिप्शनशी जुळते', c2: 'डोस आणि वेळा निश्चित', c3: 'काही अस्पष्ट असल्यास आम्ही कॉल करू',
        arriving: 'आज संध्याकाळी 6 पर्यंत पोहोचेल', otp: 'रायडरला हा OTP सांगा' },
};

/** Per-step look: icon before the title, and the colours of the time tag after it. */
const STEP_ICON = ['camera', 'sparkles', 'shield', 'truck'];
const STEP_TAG = [
  'bg-sage-tint text-sage-deep', // 1 minute
  'bg-[#FFF2CF] text-[#6B4A00]', // Instant (mustard tint, dark brown)
  'bg-[#E3F1EA] text-green-dark', // Before packing
  'bg-[#FBE7EA] text-terracotta-deep', // Same day
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** One-time entrance for a piece of the picture. `still` (reduced motion) shows the end state at once. */
type Values = Record<string, number | string | number[]>;
function play(still: boolean, from: Values, to: Values, transition: Transition): MotionProps {
  return (still ? { initial: false, animate: to } : { initial: from, animate: to, transition }) as MotionProps;
}

/** A small outline scooter in the icon set's style (lucide has none). */
function Scooter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <path d="M8 17.5h7.5l2-7.5H20" />
      <path d="M15 6h2.5l-2 11.5" />
      <path d="M4 13h6.5l1.5 4" />
    </svg>
  );
}

/** The capsule from the backdrop's decorations, small and upright, riding on the progress line. */
function Capsule() {
  return (
    <svg viewBox="0 0 32 80" className="h-[22px] w-[10px] drop-shadow-[0_2px_4px_rgb(38_52_69/0.25)]" aria-hidden="true">
      <rect x="2" y="2" width="28" height="76" rx="14" fill="#fff" stroke="rgb(var(--c-terracotta-deep))" strokeWidth="4" />
      <path d="M2 40V16A14 14 0 0 1 30 16v24z" fill="rgb(var(--c-terracotta-deep))" />
      <rect x="8" y="10" width="5" height="20" rx="2.5" fill="#fff" opacity=".45" />
    </svg>
  );
}

function Visual({ step, still }: { step: number; still: boolean }) {
  const tr = useT(V);
  const meds = [['Metformin 500 mg', '1-0-1'], ['Amlodipine 5 mg', '1-0-0'], ['Atorvastatin 10 mg', '0-0-1']];
  const fade = { opacity: 0 };
  const shown = { opacity: 1 };
  return (
    <div aria-hidden="true" className="relative h-[23rem] max-w-md overflow-hidden rounded-panel bg-white p-7 shadow-float">
      <AnimatePresence mode="wait" initial={false}>
        {/* key = step: each time a step becomes active its picture remounts and its animation plays once */}
        <m.div key={step} {...crossfade} className="h-full">
          {step === 0 && (
            <div className="grid h-full content-center justify-items-center gap-5">
              <m.div
                className="relative w-56 rounded-btn border border-line bg-cream p-4 shadow-card"
                {...play(still, { opacity: 0, y: 24, rotate: -8 }, { opacity: 1, y: 0, rotate: -3 }, { duration: 0.55, ease: EASE_OUT })}
              >
                <div className="mb-3 flex items-center gap-2"><span className="font-head text-h2m font-bold text-green">Rx</span><span className="h-2 flex-1 rounded-full bg-mint" /></div>
                {[80, 64, 72, 52].map((w, i) => <span key={i} className="mb-2 block h-2 rounded-full bg-ink/15" style={{ width: `${w}%` }} />)}
                <span className="absolute inset-2 rounded-btn border-2 border-dashed border-sage/70" />
                <m.span
                  className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-sage text-white shadow-raised"
                  {...play(still, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 }, { delay: 0.55, type: 'spring', stiffness: 420, damping: 16 })}
                >
                  <Icon name="check" size={18} />
                </m.span>
              </m.div>
              <m.p className="m-0 flex items-center gap-2 text-base font-bold text-green" {...play(still, fade, shown, { delay: 0.9, duration: 0.35 })}>
                <Icon name="check" size={18} className="text-sage" /> {tr('uploaded')}
              </m.p>
            </div>
          )}
          {step === 1 && (
            <div className="grid h-full content-center gap-2">
              {/* The prescription being read, with a soft scan beam passing over it twice */}
              <div className="relative mb-1 shrink-0 overflow-hidden rounded-btn border border-line bg-cream px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-head text-h3 font-bold text-green">Rx</span>
                  <span className="grid flex-1 gap-1.5">
                    {[86, 70, 78].map((w, i) => <span key={i} className="block h-1.5 rounded-full bg-ink/15" style={{ width: `${w}%` }} />)}
                  </span>
                </div>
                {!still && (
                  <m.span
                    className="absolute inset-x-0 top-0 h-6 bg-[linear-gradient(to_bottom,transparent,rgb(var(--c-mustard)/0.55),transparent)]"
                    initial={{ y: '-100%' }}
                    animate={{ y: '320%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut', repeat: 1 }}
                  />
                )}
              </div>
              <m.p className="m-0 text-small font-bold text-green" {...play(still, fade, shown, { delay: 1.55, duration: 0.3 })}>{tr('found')}</m.p>
              {meds.map(([n, d], i) => (
                <m.div
                  key={n}
                  className="flex items-center justify-between gap-3 rounded-btn bg-mist px-4 py-2"
                  {...play(still, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, { delay: 1.65 + i * 0.35, duration: 0.35, ease: EASE_OUT })}
                >
                  <span className="flex min-w-0 items-center gap-2 leading-tight">
                    <strong className="truncate text-base text-ink">{n}</strong>
                    <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-small font-semibold text-grey">{d}</span>
                  </span>
                  <span className="flex items-center gap-1 text-small font-bold text-terracotta-deep"><Icon name="edit" size={14} /> {tr('edit')}</span>
                </m.div>
              ))}
              <m.p className="m-0 mt-1 flex items-center gap-2 text-small font-semibold text-grey" {...play(still, fade, shown, { delay: 2.8, duration: 0.3 })}>
                <Icon name="sparkles" size={16} className="text-mustard" /> {tr('aiNote')}
              </m.p>
            </div>
          )}
          {step === 2 && (
            <div className="grid h-full content-center gap-4">
              <m.div className="flex items-center gap-3" {...play(still, fade, shown, { duration: 0.4 })}>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-tint text-green"><Icon name="userCheck" size={26} /></span>
                <strong className="text-body leading-snug text-green">{tr('checked')}</strong>
              </m.div>
              {['c1', 'c2', 'c3'].map((k, i) => (
                <m.p key={k} className="m-0 flex items-center gap-3 text-base" {...play(still, { opacity: 0, x: -8 }, { opacity: 1, x: 0 }, { delay: 0.45 + i * 0.35, duration: 0.3 })}>
                  <m.span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-white"
                    {...play(still, { scale: 0 }, { scale: [0, 1.25, 1] }, { delay: 0.5 + i * 0.35, duration: 0.4, times: [0, 0.6, 1] })}
                  >
                    <Icon name="check" size={15} />
                  </m.span>
                  {tr(k)}
                </m.p>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="grid h-full content-center gap-4">
              {/* Pharmacy to home: a dotted route with a scooter riding along it */}
              <div className="relative flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-tint text-sage-deep"><Icon name="pharmacy" size={22} /></span>
                <span className="relative h-10 flex-1">
                  <span className="absolute inset-x-0 top-1/2 border-t-[3px] border-dotted border-mint" />
                  {!still && (
                    <m.span
                      className="absolute top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-mustard text-green shadow-card"
                      initial={{ left: '0%' }}
                      animate={{ left: 'calc(100% - 2.25rem)' }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    >
                      <Scooter className="h-5 w-5" />
                    </m.span>
                  )}
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#FBE7EA] text-terracotta-deep"><Icon name="home" size={22} /></span>
              </div>
              <m.strong className="font-head text-h2m text-green" {...play(still, { opacity: 0, y: 8 }, { opacity: 1, y: 0 }, { delay: 1.5, duration: 0.35 })}>{tr('arriving')}</m.strong>
              <div className="flex gap-2 [perspective:600px]">
                {['4', '8', '2', '1'].map((d, i) => (
                  <m.span
                    key={i}
                    className="grid h-14 w-12 place-items-center rounded-btn border-2 border-green bg-cream font-head text-h2m font-bold text-green"
                    {...play(still, { rotateX: -90, opacity: 0 }, { rotateX: 0, opacity: 1 }, { delay: 1.8 + i * 0.15, duration: 0.35, ease: EASE_OUT })}
                  >
                    {d}
                  </m.span>
                ))}
              </div>
              <m.p className="m-0 text-base text-grey" {...play(still, fade, shown, { delay: 2.5, duration: 0.3 })}>{tr('otp')}</m.p>
            </div>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

/** Background for the prescription section: a sky-to-blush colour wash, two soft white waves, a
 *  dot grid, a large "Rx" watermark and colourful pills, capsules and prescriptions drifting slowly
 *  in the margins and the gutter between the columns. Decorative only. */
type Shape = 'capsule' | 'capsuleSky' | 'tablet' | 'blister' | 'rx' | 'plus' | 'drop';

function Deco({ shape }: { shape: Shape }) {
  const crimson = 'rgb(var(--c-terracotta-deep))';
  const sky = 'rgb(var(--c-sage))';
  const pale = 'rgb(var(--c-mint))';
  switch (shape) {
    case 'capsule':
    case 'capsuleSky':
      return (
        <svg viewBox="0 0 80 32" className="h-full w-full">
          <rect x="1" y="1" width="78" height="30" rx="15" fill="#fff" stroke={pale} strokeWidth="2" />
          <path d="M16 1h24v30H16A15 15 0 0 1 16 1z" fill={shape === 'capsule' ? crimson : sky} />
          <rect x="8" y="7" width="20" height="5" rx="2.5" fill="#fff" opacity=".45" />
        </svg>
      );
    case 'tablet':
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <circle cx="24" cy="24" r="22" fill="#fff" stroke={pale} strokeWidth="2" />
          <path d="M10 24h28" stroke={pale} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'blister':
      return (
        <svg viewBox="0 0 96 64" className="h-full w-full">
          <rect x="1" y="1" width="94" height="62" rx="12" fill="rgb(var(--c-sage-tint))" stroke={pale} strokeWidth="2" />
          {[0, 1, 2].map((c) => [0, 1].map((r) => (
            <g key={`${c}${r}`}>
              <rect x={12 + c * 26} y={10 + r * 24} width="20" height="18" rx="9" fill="#fff" stroke={pale} strokeWidth="1.5" />
              {!(c === 2 && r === 1) && <rect x={15 + c * 26} y={13 + r * 24} width="14" height="12" rx="6" fill={c === 1 ? sky : crimson} opacity=".85" />}
            </g>
          )))}
        </svg>
      );
    case 'rx':
      return (
        <svg viewBox="0 0 64 80" className="h-full w-full">
          <rect x="1" y="1" width="62" height="78" rx="8" fill="#fff" stroke={pale} strokeWidth="2" />
          <text x="10" y="28" fontFamily="Lora, Georgia, serif" fontWeight="700" fontSize="20" fill={crimson}>Rx</text>
          <rect x="10" y="38" width="44" height="4" rx="2" fill={pale} />
          <rect x="10" y="48" width="34" height="4" rx="2" fill={pale} />
          <rect x="10" y="58" width="40" height="4" rx="2" fill={pale} />
        </svg>
      );
    case 'drop':
      return (
        <svg viewBox="0 0 40 52" className="h-full w-full">
          <path d="M20 2C20 2 2 24 2 34a18 18 0 0 0 36 0C38 24 20 2 20 2z" fill={sky} opacity=".8" />
          <path d="M11 34a9 9 0 0 0 6 8" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" className="h-full w-full">
          <path d="M16 4v24M4 16h24" stroke={sky} strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
  }
}

const DECOS: { shape: Shape; cls: string; delay: string }[] = [
  // Left and right margins
  { shape: 'rx', cls: 'right-[3%] top-[6%] h-20 w-16 rotate-12', delay: '-3s' },
  { shape: 'tablet', cls: 'right-[9%] top-[19%] h-10 w-10', delay: '-1.5s' },
  { shape: 'plus', cls: 'left-[2%] top-[4%] h-6 w-6 rotate-12', delay: '-4s' },
  { shape: 'tablet', cls: 'left-[4%] top-[68%] h-12 w-12', delay: '-3.5s' },
  { shape: 'plus', cls: 'right-[4%] top-[76%] h-7 w-7', delay: '-1s' },
    // The gutter between the two columns
  { shape: 'plus', cls: 'left-[49%] top-[52%] h-5 w-5', delay: '-3s' },
  { shape: 'tablet', cls: 'left-[45%] top-[72%] h-9 w-9', delay: '-5.5s' },
  { shape: 'rx', cls: 'left-[30%] bottom-[5%] h-16 w-12 -rotate-12', delay: '-1.2s' },
];

export function RxBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Colour wash: light sky at the top left, through mist, to a blush at the bottom right */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(var(--c-sage-tint))_0%,rgb(var(--c-mist))_45%,#FBEFF1_100%)]" />
      {/* Colour pools */}
      <span className="absolute -left-40 top-[10%] h-[36rem] w-[36rem] rounded-full bg-sage/25 blur-3xl" />
      <span className="absolute -right-40 top-[42%] h-[32rem] w-[32rem] rounded-full bg-terracotta/15 blur-3xl" />
      <span className="absolute bottom-[-10rem] left-[25%] h-[26rem] w-[26rem] rounded-full bg-mustard/20 blur-3xl" />
      {/* Two soft white waves running across the section */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M0 330 C 220 250, 420 420, 640 330 S 900 250, 1000 300 V 470 C 820 520, 640 400, 420 480 S 120 520, 0 450 Z" fill="#fff" opacity=".55" />
        <path d="M0 760 C 200 700, 380 840, 620 760 S 880 690, 1000 740 V 860 C 800 900, 620 820, 400 880 S 140 900, 0 860 Z" fill="#fff" opacity=".45" />
      </svg>
      {/* Dot grid, strongest at the edges */}
      <div className="absolute inset-0 [background-image:radial-gradient(rgb(var(--c-green)/0.16)_1.3px,transparent_1.3px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />
      {/* Large "Rx" watermark */}
      <span className="absolute -bottom-16 -left-6 hidden select-none font-head text-[24rem] font-bold italic leading-none text-green/[0.04] lg:block">Rx</span>
      {/* A dashed route winding down the section: prescription to doorstep */}
      <svg className="absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M2 24 C 20 30, 4 36, 22 44 S 50 58, 30 72 S 60 96, 92 94"
          fill="none" stroke="rgb(var(--c-terracotta-deep))" strokeOpacity="0.3" strokeWidth="2.5" strokeDasharray="1 10" strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Pills, capsules and prescriptions */}
      {DECOS.map((d, i) => (
        <span key={i} className={`rx-float absolute hidden drop-shadow-[0_8px_12px_rgb(38_52_69/0.12)] md:block ${d.cls}`} style={{ animationDelay: d.delay }}>
          <Deco shape={d.shape} />
        </span>
      ))}
    </div>
  );
}

/** true from the lg breakpoint (1024px) up, kept in sync with the window size. */
function useIsLg() {
  const query = '(min-width: 1024px)';
  const [lg, setLg] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setLg(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return lg;
}

export default function RxStory({ steps, heading, footer }: { steps: StoryStep[]; heading: ReactNode; footer?: ReactNode }) {
  const reduce = !!useReducedMotionConfig();
  const lg = useIsLg();
  // Pinned story only on desktop with motion allowed; otherwise a plain stepper.
  const pinned = lg && !reduce;

  const outerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const circles = useRef<(HTMLSpanElement | null)[]>([]);

  // Pinned: progress through the tall outer block. Stepper: progress through the list itself,
  // as it passes the upper part of the screen.
  const { scrollYProgress: outerP } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: listP } = useScroll({ target: listRef, offset: ['start 35%', 'end 55%'] });
  const progress = useMotionValue(0);
  const [active, setActive] = useState(0);
  const update = (v: number) => {
    progress.set(v);
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive((cur) => (cur === next ? cur : next));
  };
  useMotionValueEvent(outerP, 'change', (v) => { if (pinned) update(v); });
  useMotionValueEvent(listP, 'change', (v) => { if (!pinned) update(v); });
  useEffect(() => { update((pinned ? outerP : listP).get()); }, [pinned]); // eslint-disable-line react-hooks/exhaustive-deps

  // The track and the red fill run exactly from the centre of circle 1 to the centre of the last
  // circle. Measured with offsets (not screen boxes), so the steps' reveal animation can't skew it.
  const lineTop = useMotionValue(0);
  const lineH = useMotionValue(0);
  const lineLeft = useMotionValue(0);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const centre = (el: HTMLSpanElement) => {
      const li = el.offsetParent as HTMLElement;
      return { x: li.offsetLeft + li.clientLeft + el.offsetLeft + el.offsetWidth / 2, y: li.offsetTop + li.clientTop + el.offsetTop + el.offsetHeight / 2 };
    };
    const measure = () => {
      const first = circles.current[0];
      const last = circles.current[steps.length - 1];
      if (!first || !last) return;
      const a = centre(first);
      const b = centre(last);
      lineTop.set(a.y);
      lineH.set(Math.max(0, b.y - a.y));
      lineLeft.set(a.x);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [steps.length, lineTop, lineH, lineLeft]);
  // Capsule centre rides on the fill's leading edge (it is 22px tall, so lift it by 11px).
  const capsuleY = useTransform([progress, lineTop, lineH], ([p, t, h]: number[]) => t + p * h - 11);

  const visual = (
    <div className="relative">
      {/* Glowing rings and layered cards behind the picture */}
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage/20" />
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-sage/25" />
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--c-sage)/0.22),transparent_70%)]" />
      <span aria-hidden="true" className="absolute -left-6 top-8 h-[23rem] w-full max-w-md -rotate-6 rounded-panel bg-sage-tint" />
      <span aria-hidden="true" className="absolute -left-3 top-4 h-[23rem] w-full max-w-md -rotate-3 rounded-panel border-2 border-dashed border-sage/40" />
      <span aria-hidden="true" className="absolute -right-2 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(rgb(var(--c-terracotta-deep)/0.35)_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
      <div className="relative"><Visual step={active} still={reduce} /></div>
    </div>
  );

  const list = (
    <ol ref={listRef} className="relative m-0 grid list-none gap-2 p-0">
      {/* Track, red fill and (desktop) the capsule: above the card backgrounds, below the number circles
          (the capsule slips behind each circle as it passes and shows on the line between them) */}
      <m.span aria-hidden="true" style={{ top: lineTop, height: lineH, left: lineLeft, x: '-50%' }} className="absolute z-[1] w-0.5 rounded-full bg-mint" />
      <m.span aria-hidden="true" style={{ top: lineTop, height: lineH, left: lineLeft, x: '-50%', scaleY: progress }} className="absolute z-[1] w-0.5 origin-top rounded-full bg-terracotta-deep" />
      {pinned && (
        <m.span aria-hidden="true" style={{ top: 0, left: lineLeft, x: '-50%', y: capsuleY }} className="absolute z-[1] block">
          <Capsule />
        </m.span>
      )}
      {steps.map((s, i) => {
        const done = i <= active;
        const on = i === active;
        return (
          <Reveal
            as="li"
            key={i}
            className={`relative flex gap-5 rounded-panel border-l-[3px] px-4 py-4 transition-[background-color,box-shadow,border-color] duration-slow ease-soft ${
              on ? 'border-terracotta-deep bg-white shadow-card' : 'border-transparent bg-transparent shadow-none'
            }`}
          >
            <span
              ref={(el) => { circles.current[i] = el; }}
              className={`relative z-[2] grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 font-head text-h3 font-bold transition-[background-color,border-color,color,box-shadow] duration-slow ${
                done ? 'border-green bg-green text-white' : 'border-mint bg-white text-grey'
              } ${on ? 'shadow-[0_0_0_5px_rgb(var(--c-terracotta-deep)/0.12)]' : ''}`}
            >
              {i + 1}
            </span>
            <span className="grid min-w-0 content-start pt-1">
              <span className="mb-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <Icon name={STEP_ICON[i] ?? 'check'} size={18} className={`shrink-0 transition-colors duration-slow ${on ? 'text-terracotta-deep' : 'text-grey'}`} />
                <strong className="font-head text-h2m leading-tight text-green">{s.title}</strong>
                {s.tag && <span className={`rounded-full px-2.5 py-0.5 text-small font-bold ${STEP_TAG[i] ?? STEP_TAG[0]}`}>{s.tag}</span>}
              </span>
              {s.text && <span className="max-w-[28rem] text-body text-ink/80">{s.text}</span>}
            </span>
          </Reveal>
        );
      })}
    </ol>
  );

  return (
    <div>
      {/* Heading above the story, like the other sections */}
      <div className="mb-8 max-w-2xl md:mb-12">{heading}</div>
      {/* Desktop: the outer block is ~220vh tall; the two columns inside it stay pinned below the header
          while the reader scrolls through it. Phones / reduced motion: normal height, nothing pinned. */}
      <div ref={outerRef} className={pinned ? 'h-[220vh]' : ''}>
        <div className={`grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20 ${pinned ? 'sticky top-28' : ''}`}>
          <div className="hidden lg:block">{visual}</div>
          {list}
        </div>
      </div>
      {/* The footer card (app badges) scrolls in after step 4, under the steps column */}
      {footer && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:block" />
          <div>{footer}</div>
        </div>
      )}
    </div>
  );
}
