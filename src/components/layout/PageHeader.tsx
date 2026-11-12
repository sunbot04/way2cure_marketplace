import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import Icon from '../Icon';
import Accent from '../ui/Accent';
import { fadeRise, stagger } from '../../lib/motion';

// Top of every inner page: breadcrumb, the one H1 (a string title may carry ONE
// *italic* or _underlined_ accent, see ui/Accent), a lead line and optional actions. Enters on load
// with the shared fade-rise. Tone "green" (the charcoal main colour) is for pages that open on one strong message.
// With `image`, the header becomes a full-width split: text on the left, the photo fading in from
// the right edge of the screen.
export interface Crumb { label: string; to?: string }

interface Props {
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  tone?: 'cream' | 'white' | 'green' | 'mist';
  image?: { src: string; alt?: string; position?: string };
}

const tones = {
  cream: 'bg-cream text-ink',
  white: 'bg-white text-ink',
  mist: 'bg-mist text-ink',
  green: 'bg-green text-white',
};

export default function PageHeader({ title, lead, crumbs, children, tone = 'cream', image }: Props) {
  const onGreen = tone === 'green';
  const text = (
    <m.div initial="hidden" animate="show" variants={stagger()}>
      {crumbs && crumbs.length > 0 && (
        <m.nav variants={fadeRise} aria-label="Breadcrumb" className="mb-2">
          <ol className="flex flex-wrap items-center gap-1 text-small">
            {crumbs.map((c, i) => (
              <li key={i} className="inline-flex items-center gap-1">
                {i > 0 && <Icon name="chevron" size={14} className={onGreen ? 'text-mint' : 'text-grey'} />}
                {c.to ? (
                  <Link to={c.to} className={`inline-flex min-h-[2.75rem] items-center ${onGreen ? 'text-white' : ''}`}>{c.label}</Link>
                ) : (
                  <span aria-current="page" className={onGreen ? 'text-mint' : 'text-grey'}>{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </m.nav>
      )}
      {/* The H1 paints at once (it is the page's main content); breadcrumb, lead and actions fade in */}
      <h1 className={`mb-4 text-section md:text-[3rem] md:leading-[1.08] ${onGreen ? 'text-white' : ''}`}>
        {typeof title === 'string' ? <Accent text={title} onLoad underlineDelay={0.5} /> : title}
      </h1>
      {lead && <m.p variants={fadeRise} className={`m-0 max-w-[40rem] text-lead ${onGreen ? 'text-mint' : 'text-ink/80'}`}>{lead}</m.p>}
      {children && <m.div variants={fadeRise} className="mt-7">{children}</m.div>}
    </m.div>
  );

  if (image) {
    return (
      <section className={`relative overflow-hidden ${tones[tone]}`}>
        <img
          src={image.src}
          alt={image.alt ?? ''}
          width={1200}
          height={800}
          fetchPriority="high"
          className="fade-b h-60 w-full object-cover sm:h-80 lg:fade-l lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[56%]"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
        <div className="container relative -mt-14 flex items-center pb-12 lg:mt-0 lg:min-h-[30rem] lg:py-16">
          <div className="max-w-[36rem]">{text}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${tones[tone]} pb-12 pt-8 md:pb-16 md:pt-12`}>
      <div className="container">{text}</div>
    </section>
  );
}
