import Icon from '../Icon';
import Button from '../ui/Button';
import { useLoc, useT } from '../../i18n/LangContext';
import type { Service } from '../../data';
import { COPY } from '../copy';

// Care service card: photo, what it is, how long it usually takes, one booking action.
export default function ServiceCard({ service, showDuration = false }: { service: Service; showDuration?: boolean }) {
  const tr = useT(COPY);
  const loc = useLoc();
  const s = loc(service);
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-card bg-white shadow-card">
      {service.image && (
        <img src={service.image} alt="" loading="lazy" width={1200} height={800} className="fade-card aspect-[3/2] w-full object-cover" />
      )}
      <div className="relative -mt-8 flex flex-1 flex-col p-5 pt-0 md:p-6 md:pt-0">
        <h3 className="mb-2 flex items-center gap-2">
          <Icon name={service.icon} className="shrink-0 text-sage" />
          {s.name}
        </h3>
        <p className="mb-4 flex-1 text-grey">{s.short}</p>
        {showDuration && (
          <p className="mb-4 flex gap-2 text-base">
            <Icon name="clock" size={18} className="mt-1 shrink-0 text-sage" />
            <span><strong className="text-green">{tr('typicalDuration')}:</strong> {s.duration}</span>
          </p>
        )}
        <Button to={`/care/${service.id}`} variant="urgent" block>{tr('bookNow')}</Button>
      </div>
    </article>
  );
}
