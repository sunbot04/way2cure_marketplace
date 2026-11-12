import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { useLoc, useT, type Dict } from '../../i18n/LangContext';
import type { Service } from '../../data';

// Clean care card (services only): white, 16px radius, 1px mint border, icon in a 48px mint
// square, title, two lines, and a "View care plan →" link. The whole card is clickable.
const T: Dict = {
  en: { view: 'View care plan', isNew: 'New' },
  hi: { view: 'केयर प्लान देखें', isNew: 'नया' },
  mr: { view: 'काळजी योजना पाहा', isNew: 'नवीन' },
};

export default function CareCard({ service }: { service: Service }) {
  const tr = useT(T);
  const s = useLoc()(service);
  return (
    <article
      className={`group relative flex h-full flex-col rounded-tile border bg-white p-6 transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-1 hover:shadow-raised ${
        service.isNew ? 'border-mustard ring-1 ring-mustard' : 'border-mint'
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-btn bg-mist text-green">
          <Icon name={service.icon} size={24} />
        </span>
        {service.isNew && <span className="rounded-full bg-mustard px-2.5 py-0.5 text-small font-bold text-green">{tr('isNew')}</span>}
      </div>
      <h3 className="mb-2 text-h3m">{s.name}</h3>
      <p className="mb-5 line-clamp-2 flex-1 text-base text-grey">{s.short}</p>
      <Link
        to={`/care/${service.id}`}
        className="inline-flex min-h-[2.75rem] items-center gap-1.5 self-start font-bold no-underline after:absolute after:inset-0 after:rounded-tile hover:underline"
      >
        {tr('view')} <Icon name="arrow" size={18} className="transition-transform duration-micro group-hover:translate-x-[3px]" />
      </Link>
    </article>
  );
}
