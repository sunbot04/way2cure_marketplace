import { m } from 'motion/react';
import Icon from '../Icon';
import Sachet from '../brand/Sachet';
import PhoneMockup from '../brand/PhoneMockup';
import FloatingCard from '../motion/FloatingCard';
import CountUp from '../motion/CountUp';
import { HERO, floatIdle, heroVisual } from '../../lib/motion';
import { useT, type Dict } from '../../i18n/LangContext';

// Hero composition: a smiling elderly couple in an arch frame (who the service is for), the dose
// sachet in front (what we make), the app on a phone at the side (how families keep track), plus a
// stat card and a "Pharmacist verified" card. Built on a fixed 36 x 38rem stage that scales down.
// The photo shows straight away (it is the largest thing on screen); the rest arrives after it.

const T: Dict = {
  en: { stat: 'patients cared for', verified: 'Pharmacist verified', verifiedSub: 'Every prescription order', photo: 'A smiling elderly couple standing together in their garden' },
  hi: { stat: 'मरीज़ों की देखभाल', verified: 'फ़ार्मासिस्ट द्वारा जाँचा गया', verifiedSub: 'हर पर्चे वाला ऑर्डर', photo: 'अपने बगीचे में साथ खड़े मुस्कुराते हुए बुज़ुर्ग दंपति' },
  mr: { stat: 'रुग्णांची काळजी', verified: 'फार्मासिस्टने तपासलेले', verifiedSub: 'प्रत्येक प्रिस्क्रिप्शन ऑर्डर', photo: 'बागेत एकत्र उभे असलेले हसतमुख वृद्ध जोडपे' },
};

// Initials only: these stand for families in general, not real customers.
const AVATARS = [
  { i: 'AP', c: 'bg-mustard text-green' },
  { i: 'RK', c: 'bg-mint text-green' },
  { i: 'SM', c: 'bg-terracotta-deep text-white' },
];

export default function HeroVisual() {
  const tr = useT(T);
  return (
    <div className="relative mx-auto h-[24rem] w-full max-w-[36rem] sm:h-[33rem] lg:h-[38rem]">
      {/* Positioning/scaling wrapper (CSS transform), kept apart from animated layers because
          motion writes its own inline transform. */}
      <div className="absolute left-1/2 top-0 h-[38rem] w-[36rem] origin-top -translate-x-1/2 scale-[0.62] sm:scale-[0.86] lg:scale-100">
        {/* One very soft, single-colour mint shape behind the composition (no multi-colour gradients) */}
        <span aria-hidden="true" className="absolute -left-16 -top-8 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--c-mint)/0.85),rgb(var(--c-mint)/0))]" />
        {/* Stock photo (Pexels licence) until the Way2Cure photo shoot: see public/IMAGE_LIST.md */}
        <img
          src="/images/people/elderly-couple-smiling.webp"
          srcSet="/images/people/elderly-couple-smiling-sm.webp 440w, /images/people/elderly-couple-smiling.webp 720w"
          sizes="(min-width: 1024px) 424px, 270px"
          alt={tr('photo')}
          width={720}
          height={900}
          fetchPriority="high"
          className="absolute left-[6.5rem] top-0 h-[33rem] w-[26.5rem] rounded-b-panel rounded-t-[11rem] object-cover object-[50%_30%] shadow-float"
        />
        <m.div initial="hidden" animate="show" variants={heroVisual} className="absolute inset-0">
          {/* Sachet and phone overlap only the lower corners of the photo, never a face */}
          <div className="absolute right-0 top-[18.5rem] z-10 origin-top-right scale-[0.56]"><PhoneMockup /></div>
          <div className="absolute left-0 top-[20.5rem] z-20 origin-top-left scale-[0.7]">
            <m.div animate={floatIdle.animate} transition={{ ...floatIdle.transition, delay: HERO.cards + 0.6 }}>
              <Sachet slot="morning" name="Asha P." />
            </m.div>
          </div>
        </m.div>
      </div>

      {/* Top right, over the leaves above the grandmother: clear of both faces */}
      <FloatingCard onLoad from="right" delay={HERO.cards} className="absolute bottom-0 left-[5rem] z-30 flex items-center gap-3 sm:bottom-auto sm:left-auto sm:right-0 sm:top-4 lg:right-[-1rem] lg:top-6">
        <span className="flex -space-x-2.5" aria-hidden="true">
          {AVATARS.map((a) => (
            <span key={a.i} className={`grid h-10 w-10 place-items-center rounded-full border-2 border-white text-small font-bold ${a.c}`}>{a.i}</span>
          ))}
        </span>
        <span className="grid leading-tight">
          <CountUp to={15000} suffix="+" className="font-head text-h3 font-bold text-green" />
          <span className="text-small font-semibold text-grey">{tr('stat')}</span>
        </span>
      </FloatingCard>

      {/* Phones: hidden, the same promise is in the check-mark row just above */}
      <FloatingCard onLoad from="left" delay={HERO.cards + 0.15} className="absolute bottom-0 left-[6.5rem] z-30 hidden items-center gap-3 border border-sage/40 bg-sage-tint sm:left-[11rem] sm:flex lg:bottom-[-0.5rem] lg:left-[11.5rem]">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-white"><Icon name="check" size={20} /></span>
        <span className="grid leading-tight">
          <strong className="text-base text-green">{tr('verified')}</strong>
          <span className="text-small text-green/80">{tr('verifiedSub')}</span>
        </span>
      </FloatingCard>
    </div>
  );
}
