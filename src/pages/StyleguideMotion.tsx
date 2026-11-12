import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent, { Eyebrow } from '../components/ui/Accent';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import CountUp from '../components/motion/CountUp';
import FloatingCard from '../components/motion/FloatingCard';
import Sachet, { SLOTS } from '../components/brand/Sachet';
import PhoneMockup from '../components/brand/PhoneMockup';
import SachetExplorer from '../components/brand/SachetExplorer';
import CareCard from '../components/care/CareCard';
import AppBadges from '../components/commerce/AppBadges';
import { useToast } from '../context/ToastContext';
import { DURATION, EASE, RISE, STAGGER } from '../lib/motion';
import { getService } from '../data';

// /styleguide: the motion system and the new brand components, with a reduced-motion preview.
export default function StyleguideMotion() {
  const [reduce, setReduce] = useState(false);
  const [run, setRun] = useState(0);
  const toast = useToast();

  return (
    <section className="border-t border-mint py-10">
      <h2 className="mb-2">Motion & brand components</h2>
      <p className="mb-6 text-base text-grey">
        Timings from <code>src/lib/motion.ts</code>: micro {DURATION.micro * 1000}ms, reveal {DURATION.reveal * 1000}ms on
        cubic-bezier({EASE.join(', ')}), stagger {STAGGER * 1000}ms, rise {RISE}px. Only transform and opacity animate.
      </p>
      <div className="mb-8 flex flex-wrap gap-3">
        <Button variant={reduce ? 'primary' : 'outline'} compact onClick={() => { setReduce((r) => !r); setRun((n) => n + 1); }} aria-pressed={reduce}>
          <Icon name={reduce ? 'check' : 'clock'} size={18} /> Reduced motion: {reduce ? 'on' : 'off'}
        </Button>
        <Button variant="outline" compact onClick={() => setRun((n) => n + 1)}><Icon name="refresh" size={18} /> Replay</Button>
        <Button variant="outline" compact onClick={() => toast({ message: 'Added to cart', action: { label: 'View cart', to: '/cart' } })}>
          <Icon name="cart" size={18} /> Show a toast
        </Button>
      </div>

      <MotionConfig reducedMotion={reduce ? 'always' : 'user'}>
        <div key={run} className="grid gap-12">
          <div>
            <h3>Eyebrow and accents (one per section)</h3>
            <Eyebrow>How it works</Eyebrow>
            <p className="m-0 font-head text-section font-bold text-green"><Accent text="Every dose, *in its own sachet.*" /></p>
            <p className="m-0 mt-4 font-head text-section font-bold text-green"><Accent text="AI assists, _pharmacist decides._" /></p>
          </div>

          <div>
            <h3>Reveal, Stagger and CountUp</h3>
            <Reveal className="mb-4 rounded-tile bg-white p-5 shadow-card">Reveal: fades and rises 20px once, when 20% in view.</Reveal>
            <Stagger as="ul" className="grid gap-3 sm:grid-cols-3">
              {['First', 'Second', 'Third'].map((x) => <StaggerItem as="li" key={x} className="rounded-tile bg-white p-5 shadow-card">{x}, 70ms apart</StaggerItem>)}
            </Stagger>
            <p className="mt-6 font-head text-[3.5rem] font-bold leading-none text-terracotta-deep"><CountUp to={15000} suffix="+" /></p>
            <p className="text-small text-grey">Real numbers only (15K+ is confirmed). Runs once, 1.2s.</p>
          </div>

          <div>
            <h3>Floating cards</h3>
            <div className="relative h-40 rounded-panel bg-mist p-6">
              <FloatingCard from="left" className="absolute left-6 top-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-mustard font-bold text-green">AP</span>
                <span className="grid leading-tight"><strong className="font-head text-h3 text-green">15,000+</strong><span className="text-small text-grey">patients cared for</span></span>
              </FloatingCard>
              <FloatingCard from="right" delay={0.15} className="absolute bottom-6 right-6 flex items-center gap-3 bg-sage-tint">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-white"><Icon name="check" size={20} /></span>
                <strong className="text-green">Pharmacist verified</strong>
              </FloatingCard>
            </div>
          </div>

          <div>
            <h3>Dose sachet (all four times of day)</h3>
            <div className="grid justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-4">
              {SLOTS.map((s) => <Sachet key={s} slot={s} className="scale-90" />)}
            </div>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h3>Phone mockup</h3>
              <PhoneMockup />
            </div>
            <div>
              <h3>Sachet explorer (arrow keys move between tabs)</h3>
              <SachetExplorer label="Choose a time of day" />
            </div>
          </div>

          <div>
            <h3>Care card, store badges, skeleton</h3>
            <div className="grid items-start gap-6 md:grid-cols-3">
              {getService('dementia') && <CareCard service={getService('dementia')!} />}
              {getService('nurse') && <CareCard service={getService('nurse')!} />}
              <ProductCardSkeleton />
            </div>
            <div className="mt-6"><AppBadges /></div>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
