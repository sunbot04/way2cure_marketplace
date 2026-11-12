import { useLang, type Dict, useT } from '../../i18n/LangContext';

// A Way2Cure dose sachet, built in HTML/CSS (no image): cream pouch, zig-zag heat-sealed top and
// bottom, crimped seal bands, paper grain, a time-of-day colour stripe with the word (p.13: the
// same four colours as the app and the printed sachets, always with a word label), patient,
// medicine lines, a QR block and the Way2Cure logo. Illustration only: sample medicines.

export type Slot = 'morning' | 'afternoon' | 'evening' | 'night';
export const SLOTS: Slot[] = ['morning', 'afternoon', 'evening', 'night'];

export const SLOT_STYLE: Record<Slot, { stripe: string; text: string; dot: string }> = {
  morning: { stripe: 'bg-dose-morning', text: 'text-green', dot: 'bg-dose-morning' },
  afternoon: { stripe: 'bg-dose-afternoon', text: 'text-ink', dot: 'bg-dose-afternoon' },
  evening: { stripe: 'bg-dose-evening', text: 'text-white', dot: 'bg-dose-evening' },
  night: { stripe: 'bg-dose-night', text: 'text-white', dot: 'bg-dose-night' },
};

export const SLOT_TEXT: Dict = {
  en: { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', night: 'Night',
        tMorning: '8:00 am', tAfternoon: '1:30 pm', tEvening: '6:30 pm', tNight: '9:30 pm',
        tablet: '1 tablet', capsule: '1 capsule', afterFood: 'after food', beforeFood: 'before food', withWater: 'with water',
        tear: 'Tear here', date: 'Thu, 12 Nov', aria: 'Illustration of a Way2Cure {slot} dose sachet for {name}' },
  hi: { morning: 'सुबह', afternoon: 'दोपहर', evening: 'शाम', night: 'रात',
        tMorning: 'सुबह 8:00', tAfternoon: 'दोपहर 1:30', tEvening: 'शाम 6:30', tNight: 'रात 9:30',
        tablet: '1 गोली', capsule: '1 कैप्सूल', afterFood: 'खाने के बाद', beforeFood: 'खाने से पहले', withWater: 'पानी के साथ',
        tear: 'यहाँ से फाड़ें', date: 'गुरु, 12 नवं', aria: '{name} के लिए Way2Cure {slot} डोज़ सैशे का चित्र' },
  mr: { morning: 'सकाळ', afternoon: 'दुपार', evening: 'संध्याकाळ', night: 'रात्र',
        tMorning: 'सकाळी 8:00', tAfternoon: 'दुपारी 1:30', tEvening: 'संध्याकाळी 6:30', tNight: 'रात्री 9:30',
        tablet: '1 गोळी', capsule: '1 कॅप्सूल', afterFood: 'जेवणानंतर', beforeFood: 'जेवणापूर्वी', withWater: 'पाण्यासोबत',
        tear: 'इथे फाडा', date: 'गुरु, 12 नोव्हें', aria: '{name} साठी Way2Cure {slot} डोस सॅशेचे चित्र' },
};

type Med = { name: string; dose: 'tablet' | 'capsule'; note: 'afterFood' | 'beforeFood' | 'withWater' };
// Illustrative sample doses only, not medical advice.
const MEDS: Record<Slot, Med[]> = {
  morning: [
    { name: 'Metformin 500 mg', dose: 'tablet', note: 'afterFood' },
    { name: 'Amlodipine 5 mg', dose: 'tablet', note: 'afterFood' },
    { name: 'Telmisartan 40 mg', dose: 'tablet', note: 'afterFood' },
    { name: 'Vitamin D3 1000 IU', dose: 'capsule', note: 'withWater' },
  ],
  afternoon: [
    { name: 'Calcium 500 mg', dose: 'tablet', note: 'afterFood' },
    { name: 'Multivitamin', dose: 'tablet', note: 'afterFood' },
  ],
  evening: [
    { name: 'Metformin 500 mg', dose: 'tablet', note: 'afterFood' },
    { name: 'Aspirin 75 mg', dose: 'tablet', note: 'afterFood' },
    { name: 'Omega-3 1000 mg', dose: 'capsule', note: 'afterFood' },
  ],
  night: [
    { name: 'Atorvastatin 10 mg', dose: 'tablet', note: 'withWater' },
    { name: 'Vitamin B12 1500 mcg', dose: 'tablet', note: 'withWater' },
  ],
};

const timeKey = (s: Slot) => `t${s[0].toUpperCase()}${s.slice(1)}`;

// Zig-zag sealed edge, top and bottom (clip-path polygon, so the drop-shadow follows the teeth).
function zigzag(teeth = 30, depth = '7px') {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= teeth * 2; i++) {
    const x = ((i / (teeth * 2)) * 100).toFixed(3) + '%';
    top.push(`${x} ${i % 2 ? '0' : depth}`);
    bottom.unshift(`${x} ${i % 2 ? '100%' : `calc(100% - ${depth})`}`);
  }
  return `polygon(${[...top, ...bottom].join(', ')})`;
}
const ZIGZAG = zigzag();

// A QR-like block (decorative, not scannable): three finder squares and a fixed module pattern.
function QrBlock() {
  const cells = '1011010011100101011010110100110101101001110010101101';
  return (
    <svg viewBox="0 0 21 21" className="h-12 w-12 shrink-0" aria-hidden="true">
      {[[0, 0], [14, 0], [0, 14]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="rgb(27 36 48)" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fbf8f1" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="rgb(27 36 48)" />
        </g>
      ))}
      {Array.from(cells).map((c, i) => {
        if (c !== '1') return null;
        const x = 8 + (i % 6) * 2;
        const y = Math.floor(i / 6) * 2 + (i % 2);
        return y < 21 ? <rect key={i} x={x % 21} y={y} width="1.6" height="1.6" fill="rgb(27 36 48)" /> : null;
      })}
      {Array.from(cells.slice(0, 24)).map((c, i) =>
        c === '1' ? <rect key={`b${i}`} x={9 + (i % 6) * 2} y={9 + Math.floor(i / 6) * 3} width="1.6" height="1.6" fill="rgb(27 36 48)" /> : null,
      )}
    </svg>
  );
}

export default function Sachet({ slot = 'morning', name = 'Asha P.', className = '' }: { slot?: Slot; name?: string; className?: string }) {
  const tr = useT(SLOT_TEXT);
  const { lang } = useLang();
  const style = SLOT_STYLE[slot];
  const meds = MEDS[slot];
  return (
    <figure
      role="img"
      aria-label={tr('aria', { slot: tr(slot), name })}
      className={`relative m-0 w-[19rem] select-none [filter:drop-shadow(0_28px_32px_rgb(38_52_69/0.22))_drop-shadow(0_3px_6px_rgb(38_52_69/0.12))] ${className}`}
      lang={lang}
    >
      <div className="paper relative overflow-hidden" style={{ clipPath: ZIGZAG }}>
        <div className="crimp h-7 border-b border-black/5" />
        <div className="flex">
          <div className="crimp-y w-3 shrink-0 border-r border-black/5" />
          {/* Time-of-day colour stripe, with the word */}
          <div className={`flex w-9 shrink-0 items-center justify-center ${style.stripe}`}>
            <span className={`whitespace-nowrap text-small font-extrabold [writing-mode:vertical-rl] rotate-180 ${style.text}`}>{tr(slot)}</span>
          </div>
          <div className="min-w-0 flex-1 px-4 pb-3 pt-4 shadow-[inset_0_0_22px_rgb(60_45_20/0.06)]">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="m-0 font-body text-[1.3rem] font-extrabold leading-tight text-ink">{tr(slot)}</p>
                <p className="m-0 text-[0.8rem] font-semibold text-ink/70">{tr(timeKey(slot))} · {tr('date')}</p>
                <p className="m-0 mt-2 text-[0.95rem] font-extrabold text-ink">{name}</p>
              </div>
              <QrBlock />
            </div>
            <ol className="m-0 mt-2.5 grid list-none gap-1.5 border-t border-dashed border-ink/20 p-0 pt-2.5">
              {meds.map((m, i) => (
                <li key={m.name + i} className="grid grid-cols-[1rem_1fr] text-[0.78rem] leading-tight text-ink">
                  <span className="font-extrabold">{String.fromCharCode(65 + i)}</span>
                  <span>
                    <span className="font-bold">{m.name}</span>
                    <span className="block text-[0.66rem] text-ink/60">{tr(m.dose)} · {tr(m.note)}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-2">
              <span className="text-[0.62rem] font-semibold text-ink/50">✂ {tr('tear')}</span>
              <img src="/logo.png" alt="" width={66} height={22} className="h-4 w-auto opacity-90" />
            </div>
          </div>
          <div className="crimp-y w-3 shrink-0 border-l border-black/5" />
        </div>
        <div className="crimp h-7 border-t border-black/5" />
      </div>
    </figure>
  );
}
