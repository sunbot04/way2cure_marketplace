import Icon from '../Icon';
import Button from '../ui/Button';
import FAQAccordion from '../ui/FAQAccordion';
import { Reveal } from '../motion/Reveal';
import { faqs } from '../../data';

// Homepage "Common questions": heading and a help card on the left (pinned on desktop while the
// list scrolls), numbered questions on the right. Soft speech-bubble shapes sit behind it.
export default function HomeFaq({ title, lead, allLabel, helpTitle, helpText }: {
  title: string; lead: string; allLabel: string; helpTitle: string; helpText: string;
}) {
  return (
    <section className="cv-auto section relative overflow-clip bg-mist">
      {/* Decoration: two blurred colour pools and a large outlined question mark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-sage/15 blur-3xl" />
        <span className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
        <svg viewBox="0 0 200 240" className="absolute -bottom-10 left-[38%] hidden h-72 w-60 text-green/[0.05] lg:block">
          <path d="M60 80a40 40 0 1 1 64 32c-14 10-24 18-24 38v10" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
          <circle cx="100" cy="206" r="14" fill="currentColor" />
        </svg>
      </div>

      <div className="container relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Reveal className="lg:sticky lg:top-28">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-small font-bold text-green shadow-card">
              <Icon name="info" size={16} className="text-terracotta-deep" /> FAQ
            </span>
            <h2 className="mb-4 text-section">{title}</h2>
            <p className="mb-8 text-lead text-ink/75">{lead}</p>

            {/* Help card */}
            <div className="relative overflow-hidden rounded-panel bg-green p-7 text-white shadow-float">
              <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sage/25 blur-2xl" />
              <svg aria-hidden="true" viewBox="0 0 120 100" className="absolute -right-3 bottom-3 h-24 w-28 opacity-90">
                <path d="M14 10h56a10 10 0 0 1 10 10v28a10 10 0 0 1-10 10H40l-14 12V58H14A10 10 0 0 1 4 48V20a10 10 0 0 1 10-10z" fill="rgb(255 255 255 / 0.1)" />
                <path d="M54 36h52a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10h-8v12l-14-12H54a10 10 0 0 1-10-10V46a10 10 0 0 1 10-10z" fill="rgb(var(--c-terracotta-deep))" />
                <circle cx="66" cy="59" r="3.5" fill="#fff" /><circle cx="80" cy="59" r="3.5" fill="#fff" /><circle cx="94" cy="59" r="3.5" fill="#fff" />
              </svg>
              <span className="relative mb-4 grid h-12 w-12 place-items-center rounded-btn bg-white/10 text-mustard"><Icon name="support" size={24} /></span>
              <p className="relative mb-2 font-head text-h3m font-bold text-white md:text-h3">{helpTitle}</p>
              <p className="relative mb-6 max-w-[17rem] text-base text-mint">{helpText}</p>
              <Button to="/help" variant="urgent" className="relative">{allLabel} <Icon name="arrow" size={18} /></Button>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <FAQAccordion items={faqs.slice(0, 6)} numbered />
        </Reveal>
      </div>
    </section>
  );
}
