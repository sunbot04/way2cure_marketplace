import Icon from '../Icon';
import Tag from '../ui/Tag';
import Button from '../ui/Button';
import { useT } from '../../i18n/LangContext';
import { COPY } from '../copy';

// Plan card (guidelines p.10): what, how often, next date, and pause / change clearly visible.
interface Props {
  what: string;
  often: string;
  /** Already formatted in the reader's language. */
  nextDate: string;
  paused: boolean;
  edge?: string;
  onTogglePause: () => void;
  changeHref?: string;
}

export default function PlanCard({ what, often, nextDate, paused, edge = 'var(--sage)', onTogglePause, changeHref = '/contact' }: Props) {
  const tr = useT(COPY);
  return (
    <article className={`rounded-card p-6 shadow-card ${paused ? 'bg-cream' : 'bg-white'}`} style={{ borderLeft: `5px solid ${edge}` }}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0">{what}</h3>
        <Tag kind={paused ? 'rent' : 'status'}>{paused ? tr('paused') : tr('active')}</Tag>
      </div>
      <dl className="my-4 grid grid-cols-2 gap-3">
        <div>
          <dt className="text-small text-grey">{tr('howOften')}</dt>
          <dd className="m-0 font-bold text-green">{often}</dd>
        </div>
        <div>
          <dt className="text-small text-grey">{tr('nextDate')}</dt>
          <dd className="m-0 font-bold text-green">{paused ? tr('onHold') : nextDate}</dd>
        </div>
      </dl>
      <p className="mb-4 flex items-center gap-2 text-base text-grey">
        <Icon name="bell" size={18} className="shrink-0 text-sage" /> {tr('reminder')}
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onTogglePause}>{paused ? tr('resume') : tr('pause')}</Button>
        <Button variant="outline" to={changeHref}>{tr('change')}</Button>
      </div>
    </article>
  );
}
