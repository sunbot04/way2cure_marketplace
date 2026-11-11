import InfoBand from '../ui/InfoBand';
import { useT } from '../../i18n/LangContext';
import { COPY } from '../copy';

/** Shown near every Rx item (guidelines p.11). */
export default function RxNotice({ className = '' }: { className?: string }) {
  const tr = useT(COPY);
  return <InfoBand icon="rx" className={className}>{tr('rxNotice')}</InfoBand>;
}
