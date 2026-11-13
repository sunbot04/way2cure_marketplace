import { useState, type ReactNode } from 'react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Tag from '../components/ui/Tag';
import InfoBand from '../components/ui/InfoBand';
import SectionHeading from '../components/ui/SectionHeading';
import StepList from '../components/ui/StepList';
import FAQAccordion from '../components/ui/FAQAccordion';
import { Field, Input, Select, describedBy } from '../components/ui/Field';
import ProductCard from '../components/commerce/ProductCard';
import RxNotice from '../components/commerce/RxNotice';
import { ChoiceList, QtyStepper } from '../components/commerce/Choice';
import AppPanel from '../components/commerce/AppPanel';
import ServiceCard from '../components/care/ServiceCard';
import PlanCard from '../components/plans/PlanCard';
import DoseDay from '../components/plans/DoseDay';
import TrustStrip from '../components/trust/TrustStrip';
import Seo from '../components/layout/Seo';
import { RX_STEPS } from '../data/rxSteps';
import StyleguideMotion from './StyleguideMotion';
import { faqs, getProduct, getService } from '../data';

// Internal design-system review page (not linked from the site, not indexed).
// Everything here is built from the brand tokens in tailwind.config.ts / styles/index.css.

const COLOURS = [
  { name: 'Charcoal', token: 'green', hex: '#263445', use: 'Main colour: headings, header, footer, primary buttons, dark bands', note: 'White on it 12.7:1', cls: 'bg-green text-white' },
  { name: 'Light crimson', token: 'terracotta', hex: '#FF5A6E', use: 'Decoration only: underlines, lines, small shapes', note: 'Never text; never white text on it (3.0:1)', cls: 'bg-terracotta text-green' },
  { name: 'Crimson', token: 'terracotta-deep', hex: '#C8102E', use: 'Secondary colour: links, accent words, Rx tags, call / urgent buttons', note: 'White on it 5.9:1', cls: 'bg-terracotta-deep text-white' },
  { name: 'Yellow', token: 'mustard', hex: '#FFC83D', use: 'Highlight: badges, offers, big numbers on charcoal', note: 'Charcoal text on it 8.2:1', cls: 'bg-mustard text-green' },
  { name: 'Sky blue', token: 'sage', hex: '#3A8FD6', use: 'Soft colour: icons, success ticks, afternoon dose', note: 'Dark text on it 4.5:1; white icons 3.5:1', cls: 'bg-sage text-ink' },
  { name: 'Soft blue-grey', token: 'mint', hex: '#D3DFEC', use: 'Soft panels, borders; light text on charcoal', note: 'Charcoal text on it 9.4:1', cls: 'bg-mint text-green' },
  { name: 'Mist', token: 'mist', hex: '#F1F5F9', use: 'Section background', note: 'Charcoal text on it 11.6:1', cls: 'bg-mist text-ink ring-1 ring-inset ring-mint' },
  { name: 'White', token: 'cream', hex: '#FFFFFF', use: 'Page background (token: cream)', note: '', cls: 'bg-cream text-ink ring-1 ring-inset ring-mint' },
  { name: 'White', token: 'white', hex: '#FFFFFF', use: 'Cards', note: '', cls: 'bg-white text-ink ring-1 ring-inset ring-mint' },
  { name: 'Ink', token: 'ink', hex: '#1B2430', use: 'Body text', note: '15.7:1 on white', cls: 'bg-ink text-white' },
  { name: 'Soft grey', token: 'grey', hex: '#556170', use: 'Secondary text', note: '6.3:1 on white', cls: 'bg-grey text-white' },
];

function Block({ title, children, note }: { title: string; children: ReactNode; note?: string }) {
  return (
    <section className="border-t border-mint py-10">
      <h2 className="mb-2">{title}</h2>
      {note && <p className="mb-6 text-base text-grey">{note}</p>}
      {children}
    </section>
  );
}

export default function Styleguide() {
  const [paused, setPaused] = useState(false);
  const [phone, setPhone] = useState('98');
  const [mode, setMode] = useState('buy');
  const [qty, setQty] = useState(1);
  const phoneError = phone.length !== 10 ? 'Please enter a 10-digit mobile number.' : undefined;

  return (
    <div className="container py-10">
      <Seo title="Styleguide" description="Way2Cure design system review page." noindex />
      <h1>Way2Cure design system</h1>
      <p className="text-lead text-grey">
        Tokens and components from the Brand &amp; Website Guidelines v1.0. Every page is built only from these pieces.
      </p>

      <StyleguideMotion />

      <Block title="Colour" note="Charcoal & Crimson. Usage mix: about 65% white and mist, 20% charcoal, 10% sky blue and soft panels, 5% crimson and yellow.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {COLOURS.map((c) => (
            <li key={c.token} className="overflow-hidden rounded-card bg-white shadow-card">
              <div className={`flex h-24 items-end p-3 font-bold ${c.cls}`}>{c.name}</div>
              <div className="p-3 text-base">
                <code className="text-small">{c.hex} · {c.token}</code>
                <p className="m-0 text-small text-grey">{c.use}</p>
                {c.note && <p className="m-0 text-small font-bold text-green">{c.note}</p>}
              </div>
            </li>
          ))}
        </ul>
        <h3 className="mt-8">Time-of-day dose colours (p.13)</h3>
        <ul className="flex flex-wrap gap-2">
          <li className="rounded-btn bg-dose-morning px-4 py-2 font-bold text-green">Morning</li>
          <li className="rounded-btn bg-dose-afternoon px-4 py-2 font-bold text-green">Afternoon</li>
          <li className="rounded-btn bg-dose-evening px-4 py-2 font-bold text-white">Evening</li>
          <li className="rounded-btn bg-dose-night px-4 py-2 font-bold text-white">Night</li>
        </ul>
      </Block>

      <Block title="Type" note="Lora Bold for headings, Nunito Sans for body and UI. Sizes shown are desktop / mobile.">
        <div className="grid gap-4">
          <div><p className="m-0 font-head text-h1m font-bold text-green md:text-h1">H1 Lora Bold 40 / 32</p><span className="text-small text-grey">Page titles. One per page.</span></div>
          <div><h2 className="m-0">H2 Lora Bold 30 / 24</h2><span className="text-small text-grey">Sections</span></div>
          <div><h3 className="m-0">H3 Nunito Sans Bold 22 / 20</h3><span className="text-small text-grey">Card titles</span></div>
          <p className="m-0">Body Nunito Sans 18px, line height 1.6, never under 16. Left-aligned, at most 70 characters per line, so a long paragraph stays easy to follow for older eyes.</p>
          <p className="m-0 text-lead text-grey">Lead 20px for the one line under a heading.</p>
          <p className="m-0 text-small text-grey">Small 14px: legal notes and captions only.</p>
          <p className="m-0"><a href="#top">A text link in crimson</a></p>
        </div>
      </Block>

      <Block title="Buttons" note="Min height 48px, 8px radius. One primary button per section.">
        <div className="flex flex-wrap gap-3">
          <Button>Order medicines</Button>
          <Button variant="urgent">Book a nurse</Button>
          <Button variant="outline">View details</Button>
          <Button disabled>Disabled</Button>
          <Button compact>Compact (16px text)</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 rounded-card bg-green p-6">
          <Button variant="light">On charcoal</Button>
          <Button variant="outline-light">Secondary on charcoal</Button>
        </div>
      </Block>

      <Block title="Tags & badges" note="Always a word, never colour alone.">
        <div className="flex flex-wrap gap-3">
          <Tag kind="rx">Rx needed</Tag>
          <Tag kind="pharmacist">Pharmacist verified</Tag>
          <Tag kind="seller">Verified seller</Tag>
          <Tag kind="subscribe">Subscribe &amp; save</Tag>
          <Tag kind="rent">Rent</Tag>
          <Tag kind="launch">Launch</Tag>
          <Tag kind="status">Active</Tag>
        </div>
      </Block>

      <Block title="Form fields" note="Label above, 2px charcoal border, crimson message below on error.">
        <div className="grid max-w-xl gap-5">
          <Field id="sg-name" label="Your name" hint="As it appears on the prescription.">
            <Input id="sg-name" aria-describedby={describedBy('sg-name', { hint: true })} defaultValue="Asha Patil" />
          </Field>
          <Field id="sg-phone" label="Phone number" error={phoneError}>
            <Input id="sg-phone" inputMode="numeric" value={phone} invalid={!!phoneError} maxLength={10}
              aria-describedby={describedBy('sg-phone', { error: phoneError })}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} />
          </Field>
          <Field id="sg-slot" label="Delivery time">
            <Select id="sg-slot"><option>Today, by 6 pm</option><option>Tomorrow, 9 am to 1 pm</option></Select>
          </Field>
        </div>
      </Block>

      <Block title="Choices & quantity" note="Large radio rows: the chosen one gets a green border and a tick, not colour alone. Stepper buttons are 48px.">
        <div className="grid max-w-xl gap-6">
          <ChoiceList name="sg-mode" legend="How would you like it?" value={mode} onChange={setMode}
            choices={[{ id: 'buy', label: 'Buy', detail: '₹1,499.00' }, { id: 'rent', label: 'Rent', detail: '₹349.00 a month' }]} />
          <QtyStepper value={qty} label="Quantity" lessLabel="One less" moreLabel="One more"
            onLess={() => setQty((q) => Math.max(1, q - 1))} onMore={() => setQty((q) => q + 1)} />
        </div>
      </Block>

      <Block title="Cards" note="White, 12px radius, soft shadow, 5px colour edge showing the category.">
        <div className="grid gap-3 sm:grid-cols-3">
          <Card edge="var(--green)"><h3>Sorted by time</h3><p className="m-0 text-grey">Morning to night</p></Card>
          <Card edge="var(--terracotta)"><h3>Ready to take</h3><p className="m-0 text-grey">Tear one, take the dose</p></Card>
          <Card edge="var(--sage)" edgeSide="top"><h3>Top edge variant</h3><p className="m-0 text-grey">Used for products and services</p></Card>
        </div>
      </Block>

      <Block title="Info band, Rx notice, help">
        <div className="grid gap-4">
          <InfoBand>A registered pharmacist verifies every prescription order.</InfoBand>
          <RxNotice />
          <div className="grid gap-4 lg:grid-cols-2"><AppPanel /></div>
        </div>
      </Block>

      <Block title="Section heading">
        <SectionHeading title="Care at home" lead="Trained, background-checked nurses and doctors, sent to your home." action={<a href="#top" className="inline-flex min-h-tap items-center font-bold">See all care services</a>} />
      </Block>

      <Block title="Step list" note="Row on tablet and up; column with a connecting line; live flow with the current step.">
        <StepList steps={RX_STEPS} />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <StepList steps={RX_STEPS} layout="column" />
          <StepList steps={[{ title: 'Phone', text: 'Verify with OTP' }, { title: 'Address' }, { title: 'Delivery time' }, { title: 'Pay' }]} layout="column" current={2} />
        </div>
      </Block>

      <Block title="Product cards" note="Over-the-counter, Rx (no offer badge, valid-prescription line), and buy-or-rent.">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {['bp-monitor', 'metformin-500', 'wheelchair', 'pulse-oximeter'].map((id, i) => <ProductCard key={id} product={getProduct(id)!} alt={i % 2 === 1} />)}
        </div>
      </Block>

      <Block title="Service card">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard service={getService('nurse')!} showDuration />
          <ServiceCard service={getService('icu')!} />
        </div>
      </Block>

      <Block title="Plan card & dose sachets">
        <div className="grid max-w-3xl gap-4 md:grid-cols-2">
          <PlanCard what="BP & sugar medicines (3 items)" often="Every month" nextDate="2 Dec 2026" paused={paused} onTogglePause={() => setPaused((p) => !p)} />
          <PlanCard what="Adult diapers, medium × 3 packs" often="Every 2 weeks" nextDate="20 Nov 2026" paused edge="var(--terracotta)" onTogglePause={() => undefined} />
        </div>
        <div className="mt-6">
          <DoseDay day={{ morning: ['Metformin 500 mg', 'Amlodipine 5 mg'], afternoon: ['Calcium'], evening: ['Metformin 500 mg'], night: ['Atorvastatin 10 mg', 'Vitamin D3'] }} />
        </div>
      </Block>

      <Block title="FAQ accordion">
        <div className="max-w-3xl"><FAQAccordion items={faqs.slice(0, 3)} /></div>
      </Block>

      <Block title="Trust strip" note="Real numbers only: 15K+ is confirmed by the client.">
        <div className="-mx-4 md:-mx-6"><TrustStrip /></div>
      </Block>

      <Block title="Icons" note="lucide-react rounded line icons, 2px stroke, charcoal, sky blue or crimson, used sparingly.">
        <div className="flex flex-wrap gap-4 text-green">
          {['pill', 'heartPulse', 'handHeart', 'mobility', 'stethoscope', 'rx', 'phone', 'whatsapp', 'cart', 'verified', 'truck', 'clock'].map((n) => (
            <span key={n} className="grid justify-items-center gap-1 text-small text-grey"><Icon name={n} size={28} className="text-green" />{n}</span>
          ))}
        </div>
      </Block>
    </div>
  );
}
