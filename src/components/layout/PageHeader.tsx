import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

// Top of every inner page: optional breadcrumb, the one H1, a lead line, optional actions.
// Left-aligned, no label above the heading. Tone "green" is for pages that open on one strong
// message (Care, Subscriptions). With `image`, the header becomes a full-width split like the
// homepage hero: text on the left, the photo running to the right edge of the screen.
export interface Crumb { label: string; to?: string }

interface Props {
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  tone?: 'cream' | 'white' | 'green';
  image?: { src: string; alt?: string; position?: string };
}

const tones = {
  cream: 'bg-cream text-ink',
  white: 'bg-white text-ink border-b border-mint',
  green: 'bg-green text-white',
};

export default function PageHeader({ title, lead, crumbs, children, tone = 'cream', image }: Props) {
  const onGreen = tone === 'green';
  const text = (
    <>
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex flex-wrap items-center gap-1 text-small">
            {crumbs.map((c, i) => (
              <li key={i} className="inline-flex items-center gap-1">
                {i > 0 && <Icon name="chevron" size={14} className={onGreen ? 'text-mint' : 'text-grey'} />}
                {c.to ? (
                  <Link to={c.to} className={`inline-flex min-h-[44px] items-center ${onGreen ? 'text-white' : ''}`}>{c.label}</Link>
                ) : (
                  <span aria-current="page" className={onGreen ? 'text-mint' : 'text-grey'}>{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className={`mb-3 ${image ? 'md:text-[48px] md:leading-tight' : ''} ${onGreen ? 'text-white' : ''}`}>{title}</h1>
      {lead && <p className={`m-0 text-lead ${onGreen ? 'text-mint' : 'text-ink/80'}`}>{lead}</p>}
      {children && <div className="mt-6">{children}</div>}
    </>
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
          className="fade-b h-60 w-full object-cover sm:h-80 lg:fade-l lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[58%]"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
        <div className="container relative -mt-14 flex items-center pb-10 lg:mt-0 lg:min-h-[460px] lg:py-14">
          <div className="max-w-[560px] 2xl:max-w-[640px]">{text}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${tones[tone]} pb-8 pt-6 md:pb-12 md:pt-8`}>
      <div className="container">{text}</div>
    </section>
  );
}
