import Icon from '../Icon';
import type { Lang } from '../../data';
import { useLang } from '../../i18n/LangContext';

// Dose sachets view (pitch deck p.8). Time-of-day colours from guidelines p.13, always with a word
// label so it works for colour-blind readers. Light fills (mustard, sage) take green text.
export type DoseSlot = 'morning' | 'afternoon' | 'evening' | 'night';

const SLOTS: Record<DoseSlot, { icon: string; head: string; label: Record<Lang, string>; time: Record<Lang, string> }> = {
  morning: { icon: 'sunrise', head: 'bg-dose-morning text-green', label: { en: 'Morning', hi: 'सुबह', mr: 'सकाळ' }, time: { en: '8 am', hi: 'सुबह 8 बजे', mr: 'सकाळी 8 वाजता' } },
  afternoon: { icon: 'sun', head: 'bg-dose-afternoon text-green', label: { en: 'Afternoon', hi: 'दोपहर', mr: 'दुपार' }, time: { en: '1 pm', hi: 'दोपहर 1 बजे', mr: 'दुपारी 1 वाजता' } },
  evening: { icon: 'sunset', head: 'bg-dose-evening text-white', label: { en: 'Evening', hi: 'शाम', mr: 'संध्याकाळ' }, time: { en: '7 pm', hi: 'शाम 7 बजे', mr: 'संध्याकाळी 7 वाजता' } },
  night: { icon: 'moon', head: 'bg-dose-night text-white', label: { en: 'Night', hi: 'रात', mr: 'रात्र' }, time: { en: '10 pm', hi: 'रात 10 बजे', mr: 'रात्री 10 वाजता' } },
};

export function DoseColumn({ slot, pills }: { slot: DoseSlot; pills: string[] }) {
  const { lang } = useLang();
  const s = SLOTS[slot];
  return (
    <section className="overflow-hidden rounded-card bg-white shadow-card" aria-label={s.label[lang]}>
      <h3 className={`m-0 flex items-center gap-2 px-4 py-3 text-h3m ${s.head}`}>
        <Icon name={s.icon} /> {s.label[lang]}
        <span className="ml-auto text-base font-semibold">{s.time[lang]}</span>
      </h3>
      <ul className="grid gap-2 p-4">
        {pills.map((p, i) => (
          <li key={`${p}-${i}`} className="flex items-center gap-2">
            <Icon name="pill" size={18} className="shrink-0 text-terracotta-deep" /> {p}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** One day of sachets, morning to night. Medicine names stay as printed on the pack. */
export default function DoseDay({ day }: { day: Record<DoseSlot, string[]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {(Object.keys(SLOTS) as DoseSlot[]).map((slot) => <DoseColumn key={slot} slot={slot} pills={day[slot]} />)}
    </div>
  );
}
