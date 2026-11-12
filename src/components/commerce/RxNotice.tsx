import Icon from '../Icon';
import { useT } from '../../i18n/LangContext';
import { COPY } from '../copy';

/** Shown near every Rx item (guidelines p.11): "sold only with a valid prescription". */
export default function RxNotice({ className = '', light = false }: { className?: string; /** white panel, for use on a mist background */ light?: boolean }) {
  const tr = useT(COPY);
  return (
    <div className={`flex items-start gap-4 rounded-tile border border-mint px-5 py-4 ${light ? 'bg-white' : 'bg-mist'} ${className}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-terracotta-deep shadow-card">
        <Icon name="rx" size={20} />
      </span>
      <p className="m-0 self-center font-semibold text-green">{tr('rxNotice')}</p>
    </div>
  );
}
