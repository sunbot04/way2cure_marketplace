import { Link } from 'react-router-dom';
import Icon from '../Icon';
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import { useLoc, useT } from '../../i18n/LangContext';
import type { Service } from '../../data';
import { COPY } from '../copy';

// Photo care card (used where a picture helps: styleguide, related services): photo with a soft
// zoom on hover, what it is, how long it usually takes, one booking action.
// Grids of care services use the cleaner CareCard (components/care/CareCard.tsx).
export default function ServiceCard({ service, showDuration = false }: { service: Service; showDuration?: boolean }) {
  const tr = useT(COPY);
  const loc = useLoc();
  const s = loc(service);
  return (
    <article
      className={`group relative flex w-full flex-col overflow-hidden rounded-tile bg-white shadow-card transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-1 hover:shadow-raised ${
        service.isNew ? 'ring-2 ring-mustard' : ''
      }`}
    >
      {service.isNew && (
        <span className="absolute left-4 top-4 z-10"><Tag kind="launch">{tr('newTag')}</Tag></span>
      )}
      {service.image && (
        <div className="overflow-hidden">
          <img
            src={service.image}
            alt=""
            loading="lazy"
            width={1200}
            height={800}
            className="fade-card aspect-[3/2] w-full object-cover transition-transform duration-slow ease-soft group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="relative -mt-8 flex flex-1 flex-col p-5 pt-0 md:p-6 md:pt-0">
        <h3 className="mb-2 flex items-center gap-2">
          <Icon name={service.icon} className="shrink-0 text-sage" />
          {s.name}
        </h3>
        <p className="mb-4 flex-1 text-base text-grey">{s.short}</p>
        {showDuration && (
          <p className="mb-4 flex gap-2 text-base">
            <Icon name="clock" size={18} className="mt-1 shrink-0 text-sage" />
            <span><strong className="text-green">{tr('typicalDuration')}:</strong> {s.duration}</span>
          </p>
        )}
        {service.related && (
          <Link to={service.related} className="group/rel mb-4 inline-flex min-h-[2.75rem] items-center gap-2 self-start font-bold">
            <Icon name="watch" size={18} /> {tr('bandLink')} <Icon name="arrow" size={16} />
          </Link>
        )}
        <Button to={`/care/${service.id}`} variant="outline" block>{tr('bookNow')} <Icon name="arrow" size={18} /></Button>
      </div>
    </article>
  );
}
