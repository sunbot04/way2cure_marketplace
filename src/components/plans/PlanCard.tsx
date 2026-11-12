import Icon from '../Icon';
import Button from '../ui/Button';
import { useT, type Dict } from '../../i18n/LangContext';
import { COPY } from '../copy';

// Plan card (guidelines p.10): what, how often, next date, and pause / change clearly visible.
// State is shown with a word and an icon, never colour alone. Pausing dims the card softly.
interface Props {
  what: string;
  often: string;
  /** Already formatted in the reader's language. */
  nextDate: string;
  paused: boolean;
  /** Kept for older callers; cards no longer use colour edges. */
  edge?: string;
  icon?: string;
  onTogglePause: () => void;
  changeHref?: string;
}

// Refill reminders go out 3 days before each order (NotificationsContext REMIND_DAYS_BEFORE).
const T: Dict = {
  en: { reminder: 'We remind you 3 days before each order, on the bell at the top of every page.' },
  hi: { reminder: 'हर ऑर्डर से 3 दिन पहले हम हर पेज के ऊपर घंटी पर याद दिलाते हैं।' },
  mr: { reminder: 'प्रत्येक ऑर्डरच्या 3 दिवस आधी आम्ही प्रत्येक पानाच्या वरच्या घंटीवर आठवण करून देतो.' },
};

export default function PlanCard({ what, often, nextDate, paused, icon = 'refresh', onTogglePause, changeHref = '/contact' }: Props) {
  const tr = useT(COPY);
  const tx = useT(T);
  return (
    <article
      className={`flex flex-col rounded-tile border p-6 transition-[background-color,box-shadow] duration-micro ease-soft ${
        paused ? 'border-line bg-cream' : 'border-mint bg-white shadow-card'
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-btn bg-mist text-green">
            <Icon name={icon} size={24} />
          </span>
          <h3 className="m-0 pt-2 text-h3m">{what}</h3>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-small font-bold ${
            paused ? 'bg-mint text-green' : 'bg-sage-tint text-green'
          }`}
        >
          <Icon name={paused ? 'clock' : 'check'} size={14} /> {paused ? tr('paused') : tr('active')}
        </span>
      </div>
      <dl className="mb-5 grid grid-cols-2 gap-3 rounded-btn bg-mist/60 p-4">
        <div>
          <dt className="text-small text-grey">{tr('howOften')}</dt>
          <dd className="m-0 font-bold text-green">{often}</dd>
        </div>
        <div>
          <dt className="text-small text-grey">{tr('nextDate')}</dt>
          <dd className="m-0 font-bold text-green">{paused ? tr('onHold') : nextDate}</dd>
        </div>
      </dl>
      <p className="mb-5 flex items-start gap-2 text-base text-grey">
        <Icon name="bell" size={18} className="mt-1 shrink-0 text-sage" /> {tx('reminder')}
      </p>
      <div className="mt-auto flex flex-wrap gap-3">
        <Button variant={paused ? 'primary' : 'outline'} onClick={onTogglePause} aria-pressed={paused}>
          <Icon name={paused ? 'refresh' : 'clock'} size={18} /> {paused ? tr('resume') : tr('pause')}
        </Button>
        <Button variant="outline" to={changeHref}>{tr('change')}</Button>
      </div>
    </article>
  );
}
