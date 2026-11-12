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

export default function RxStory({ steps, heading, footer }: { steps: StoryStep[]; heading: ReactNode; footer?: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="lg:sticky lg:top-36 lg:self-start">
        {heading}
        <div className="mt-10 hidden lg:block"><Visual step={active} /></div>
      </div>
      <div>
        <ol ref={listRef} className="relative m-0 list-none p-0">
          <span aria-hidden="true" className="absolute bottom-10 left-[1.45rem] top-4 w-0.5 rounded-full bg-mint" />
          <m.span aria-hidden="true" style={{ scaleY: scrollYProgress }} className="absolute bottom-10 left-[1.45rem] top-4 w-0.5 origin-top rounded-full bg-terracotta-deep" />
          {steps.map((s, i) => {
            const on = i <= active;
            return (
              <Reveal as="li" key={i} className="relative flex gap-6 pb-12 lg:min-h-[19rem] lg:pb-0">
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
  );
}
