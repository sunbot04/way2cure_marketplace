import Icon from '../Icon';
import { useT, type Dict } from '../../i18n/LangContext';
import { SLOTS, SLOT_STYLE, SLOT_TEXT } from './Sachet';

// A phone showing a simple Way2Cure app screen (today's doses + an order on its way).
// Built in HTML so it stays sharp and translates. Illustration only.

const T: Dict = {
  en: { hi: 'Good morning, Asha', day: 'Thursday, 12 Nov', today: "Today's doses", taken: 'Taken', due: 'Due now', later: 'Later',
        order: 'Order W2C4821', verified: 'Pharmacist verified', arriving: 'Arriving today by 6 pm', aria: 'The Way2Cure app showing today\'s doses and an order on its way',
        home: 'Home', doses: 'Doses', orders: 'Orders', care: 'Care' },
  hi: { hi: 'सुप्रभात, आशा', day: 'गुरुवार, 12 नवंबर', today: 'आज की डोज़', taken: 'ले ली', due: 'अभी लेनी है', later: 'बाद में',
        order: 'ऑर्डर W2C4821', verified: 'फ़ार्मासिस्ट ने जाँचा', arriving: 'आज शाम 6 बजे तक', aria: 'Way2Cure ऐप जिसमें आज की डोज़ और रास्ते में ऑर्डर दिख रहा है',
        home: 'होम', doses: 'डोज़', orders: 'ऑर्डर', care: 'देखभाल' },
  mr: { hi: 'सुप्रभात, आशा', day: 'गुरुवार, 12 नोव्हेंबर', today: 'आजचे डोस', taken: 'घेतले', due: 'आता घ्या', later: 'नंतर',
        order: 'ऑर्डर W2C4821', verified: 'फार्मासिस्टने तपासले', arriving: 'आज संध्याकाळी 6 पर्यंत', aria: 'आजचे डोस आणि वाटेवर असलेली ऑर्डर दाखवणारे Way2Cure ॲप',
        home: 'होम', doses: 'डोस', orders: 'ऑर्डर', care: 'काळजी' },
};

export default function PhoneMockup({ className = '' }: { className?: string }) {
  const tr = useT(T);
  const ts = useT(SLOT_TEXT);
  const status = ['taken', 'due', 'later', 'later'] as const;
  return (
    <div role="img" aria-label={tr('aria')} className={`relative w-[16.5rem] select-none rounded-[2.75rem] bg-ink p-[0.6rem] shadow-float ${className}`}>
      <div className="relative h-[33rem] overflow-hidden rounded-[2.2rem] bg-cream">
        {/* Status bar + island */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[0.7rem] font-bold text-ink">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
          <span className="flex items-center gap-1"><span className="h-2 w-3 rounded-sm border border-ink" /></span>
        </div>
        <div className="px-4 pt-3">
          <div className="flex items-center justify-between">
            <img src="/logo.png" alt="" width={70} height={24} className="h-5 w-auto" />
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-green shadow-card"><Icon name="bell" size={15} /></span>
          </div>
          <p className="m-0 mt-3 font-head text-[1.15rem] font-bold leading-tight text-green">{tr('hi')}</p>
          <p className="m-0 text-[0.7rem] text-grey">{tr('day')}</p>

          <div className="mt-3 rounded-2xl bg-white p-3 shadow-card">
            <p className="m-0 mb-2 text-[0.72rem] font-extrabold text-green">{tr('today')}</p>
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {SLOTS.map((s, i) => (
                <li key={s} className="flex items-center gap-2 rounded-lg bg-cream/70 px-2 py-1.5">
                  <span className={`h-6 w-1.5 shrink-0 rounded-full ${SLOT_STYLE[s].dot}`} />
                  <span className="grid flex-1 leading-tight">
                    <span className="text-[0.7rem] font-bold text-ink">{ts(s)}</span>
                    <span className="text-[0.6rem] text-grey">{ts(`t${s[0].toUpperCase()}${s.slice(1)}`)}</span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.58rem] font-bold ${
                      status[i] === 'taken' ? 'bg-sage-tint text-green' : status[i] === 'due' ? 'bg-mustard text-green' : 'bg-white text-grey ring-1 ring-line'
                    }`}
                  >
                    {status[i] === 'taken' && '✓ '}{tr(status[i])}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2.5 rounded-2xl bg-green p-3 text-white">
            <p className="m-0 text-[0.62rem] text-mint">{tr('order')}</p>
            <p className="m-0 flex items-center gap-1 text-[0.75rem] font-bold"><Icon name="verified" size={13} className="text-mustard" /> {tr('verified')}</p>
            <div className="mt-2 grid grid-cols-4 gap-1" aria-hidden="true">
              {[1, 1, 1, 0].map((on, i) => <span key={i} className={`h-1 rounded-full ${on ? 'bg-mustard' : 'bg-white/25'}`} />)}
            </div>
            <p className="m-0 mt-1.5 text-[0.62rem] text-mint">{tr('arriving')}</p>
          </div>
        </div>
        {/* App tab bar */}
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 border-t border-line bg-white px-2 pb-4 pt-2 text-center text-[0.55rem] font-bold text-grey">
          {[['home', 'home'], ['doses', 'pill'], ['orders', 'package'], ['care', 'stethoscope']].map(([k, ic], i) => (
            <span key={k} className={`grid justify-items-center gap-0.5 ${i === 1 ? 'text-green' : ''}`}><Icon name={ic} size={15} />{tr(k)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
