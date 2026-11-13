import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import Icon from '../Icon';
import { Reveal } from '../motion/Reveal';
import { crossfade } from '../../lib/motion';
import { useT, type Dict } from '../../i18n/LangContext';

// "How prescriptions work": Upload -> AI reads -> Pharmacist verifies -> Delivered.
// Desktop: the heading and a visual stay pinned while the steps scroll past. A line fills with
// scroll progress and each step lights up in turn. Phones: a plain vertical stepper that reveals.
// Scroll-linked (not auto-playing), so it only moves when the reader scrolls.

export interface StoryStep { title: string; text?: string }

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

function Visual({ step }: { step: number }) {
  const tr = useT(V);
  const meds = [['Metformin 500 mg', '1-0-1'], ['Amlodipine 5 mg', '1-0-0'], ['Atorvastatin 10 mg', '0-0-1']];
  return (
    <div aria-hidden="true" className="relative h-[21rem] max-w-md overflow-hidden rounded-panel bg-white p-7 shadow-float">
      <AnimatePresence mode="wait" initial={false}>
        <m.div key={step} {...crossfade} className="h-full">
          {step === 0 && (
            <div className="grid h-full content-center justify-items-center gap-4">
              <div className="relative w-56 rotate-[-3deg] rounded-btn border border-line bg-cream p-4 shadow-card">
                <div className="mb-3 flex items-center gap-2"><span className="font-head text-h2m font-bold text-green">Rx</span><span className="h-2 flex-1 rounded-full bg-mint" /></div>
                {[80, 64, 72, 52].map((w, i) => <span key={i} className="mb-2 block h-2 rounded-full bg-ink/15" style={{ width: `${w}%` }} />)}
                <span className="absolute inset-2 rounded-btn border-2 border-dashed border-sage/70" />
              </div>
              <p className="m-0 flex items-center gap-2 text-base font-bold text-green"><Icon name="check" size={18} className="text-sage" /> {tr('uploaded')}</p>
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-3">
              <p className="m-0 font-bold text-green">{tr('found')}</p>
              {meds.map(([n, d]) => (
                <div key={n} className="flex items-center justify-between rounded-btn bg-mist px-4 py-3">
                  <span className="grid leading-tight"><strong className="text-base text-ink">{n}</strong><span className="text-small text-grey">{d}</span></span>
                  <span className="flex items-center gap-1 text-small font-bold text-terracotta-deep"><Icon name="edit" size={14} /> {tr('edit')}</span>
                </div>
              ))}
              <p className="m-0 flex items-center gap-2 text-small font-semibold text-grey"><Icon name="sparkles" size={16} className="text-mustard" /> {tr('aiNote')}</p>
            </div>
          )}
          {step === 2 && (
            <div className="grid h-full content-center gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-tint text-green"><Icon name="userCheck" size={26} /></span>
                <strong className="text-body leading-snug text-green">{tr('checked')}</strong>
              </div>
              {['c1', 'c2', 'c3'].map((k) => (
                <p key={k} className="m-0 flex items-center gap-3 text-base"><span className="grid h-7 w-7 place-items-center rounded-full bg-sage text-white"><Icon name="check" size={15} /></span>{tr(k)}</p>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="grid h-full content-center justify-items-start gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-mustard text-green"><Icon name="truck" size={26} /></span>
              <strong className="font-head text-h2m text-green">{tr('arriving')}</strong>
              <div className="flex gap-2">
                {['4', '8', '2', '1'].map((d, i) => <span key={i} className="grid h-14 w-12 place-items-center rounded-btn border-2 border-green bg-cream font-head text-h2m font-bold text-green">{d}</span>)}
              </div>
              <p className="m-0 text-base text-grey">{tr('otp')}</p>
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
  { shape: 'capsule', cls: '-left-[1%] top-[22%] h-7 w-16 -rotate-[28deg]', delay: '0s' },
  { shape: 'rx', cls: 'right-[3%] top-[6%] h-20 w-16 rotate-12', delay: '-3s' },
  { shape: 'tablet', cls: 'right-[9%] top-[19%] h-10 w-10', delay: '-1.5s' },
  { shape: 'plus', cls: 'left-[2%] top-[4%] h-6 w-6 rotate-12', delay: '-4s' },
  { shape: 'blister', cls: '-left-[2.5%] top-[56%] h-14 w-20 rotate-[14deg]', delay: '-2s' },
  { shape: 'capsuleSky', cls: 'right-[2%] top-[40%] h-8 w-20 rotate-[32deg]', delay: '-5s' },
  { shape: 'drop', cls: 'right-[7%] top-[58%] h-12 w-9 -rotate-12', delay: '-2.5s' },
  { shape: 'tablet', cls: 'left-[4%] top-[68%] h-12 w-12', delay: '-3.5s' },
  { shape: 'plus', cls: 'right-[4%] top-[76%] h-7 w-7', delay: '-1s' },
  { shape: 'capsule', cls: 'left-[2%] bottom-[8%] h-8 w-20 rotate-[20deg]', delay: '-4.5s' },
    // The gutter between the two columns
  { shape: 'capsuleSky', cls: 'left-[46%] top-[34%] h-7 w-16 -rotate-45', delay: '-2s' },
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

export default function RxStory({ steps, heading, footer }: { steps: StoryStep[]; heading: ReactNode; footer?: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);
  // Steps advance as the list passes the upper third of the screen, by which time the illustration
  // beside it is pinned and fully in view.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 35%', 'end 55%'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <div>
      {/* Heading above the story, like the other sections */}
      <div className="mb-8 max-w-2xl md:mb-12">{heading}</div>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Desktop: the illustration starts beside step 1 and stays pinned just below the header while
            the steps scroll by. Only the illustration is pinned, so it always fits on screen (pinning
            the heading with it made the column taller than shorter screens and cut it off). */}
        <div className="hidden lg:block">
          <div className="relative lg:sticky lg:top-28">
            {/* Glowing rings that travel with the pinned panel, then layered cards behind it */}
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage/20" />
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-sage/25" />
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--c-sage)/0.22),transparent_70%)]" />
            <span aria-hidden="true" className="absolute -left-6 top-8 h-[21rem] w-full max-w-md -rotate-6 rounded-panel bg-sage-tint" />
            <span aria-hidden="true" className="absolute -left-3 top-4 h-[21rem] w-full max-w-md -rotate-3 rounded-panel border-2 border-dashed border-sage/40" />
            <span aria-hidden="true" className="absolute -right-2 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(rgb(var(--c-terracotta-deep)/0.35)_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
            <div className="relative"><Visual step={active} /></div>
          </div>
        </div>
        <div>
        <ol ref={listRef} className="relative m-0 list-none p-0">
          <span aria-hidden="true" className="absolute bottom-10 left-[1.45rem] top-4 w-0.5 rounded-full bg-mint" />
          <m.span aria-hidden="true" style={{ scaleY: scrollYProgress }} className="absolute bottom-10 left-[1.45rem] top-4 w-0.5 origin-top rounded-full bg-terracotta-deep" />
          {steps.map((s, i) => {
            const on = i <= active;
            return (
              <Reveal as="li" key={i} className="relative flex gap-6 pb-12 last:pb-0 lg:min-h-[15rem] lg:pb-0 lg:last:min-h-0">
                <span
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 font-head text-h3 font-bold transition-colors duration-slow ${
                    on ? 'border-green bg-green text-white' : 'border-mint bg-white text-grey'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`grid content-start pt-1.5 transition-opacity duration-slow ${on ? 'opacity-100' : 'lg:opacity-50'}`}>
                  <strong className="mb-1 font-head text-h2m text-green">{s.title}</strong>
                  {s.text && <span className="max-w-[28rem] text-body text-ink/80">{s.text}</span>}
                </span>
              </Reveal>
            );
          })}
        </ol>
        {footer}
        </div>
      </div>
    </div>
  );
}
