import Icon from '../Icon';
import { Eyebrow } from '../ui/Accent';
import CountUp from '../motion/CountUp';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';
import { useT, type Dict } from '../../i18n/LangContext';
import { SITE } from '../../config/site';
import { COPY } from '../copy';

// Trust elements (guidelines p.9 item 7 and p.11). Real numbers only: 15K+ is confirmed.
// band = deep green section like the homepage trust block (count-up + five trust tiles).
// list = plain list for use inside another section.

const T: Dict = {
  en: { eyebrow: 'Why families trust Way2Cure', big: 'patients cared for across Mumbai, Navi Mumbai and Thane.', text: 'Real nurses, licensed pharmacies and a real person on the phone, day or night.' },
  hi: { eyebrow: 'परिवार Way2Cure पर भरोसा क्यों करते हैं', big: 'मरीज़ों की देखभाल, मुंबई, नवी मुंबई और ठाणे में।', text: 'असली नर्स, लाइसेंस वाली फ़ार्मेसी और फ़ोन पर एक असली इंसान, दिन हो या रात।' },
  mr: { eyebrow: 'कुटुंबे Way2Cure वर विश्वास का ठेवतात', big: 'रुग्णांची काळजी, मुंबई, नवी मुंबई आणि ठाणे येथे.', text: 'खऱ्या नर्स, परवानाधारक फार्मसी आणि फोनवर एक खरी व्यक्ती, दिवस असो वा रात्र.' },
};

export default function TrustStrip({ variant = 'band' }: { variant?: 'band' | 'list' }) {
  const tr = useT(COPY);
  const tx = useT(T);
  const items = [
    { icon: 'userCheck', title: tr('nurses'), text: tr('nursesText') },
    { icon: 'verified', title: tr('pharmacies'), text: tr('pharmaciesText') },
    { icon: 'lock', title: tr('payments'), text: tr('paymentsText') },
    { icon: 'shield', title: tr('privacy'), text: tr('privacyText') },
    { icon: 'support', title: tr('support'), text: tr('supportText', { phone: SITE.phone }) },
  ];

  if (variant === 'list') {
    return (
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {[{ icon: 'users', title: tr('happy', { n: SITE.happyPatients }), text: tr('happyText') }, ...items].map((i) => (
          <li key={i.icon} className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name={i.icon} size={24} /></span>
            <span className="grid leading-snug">
              <strong className="text-green">{i.title}</strong>
              <span className="text-base text-grey">{i.text}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section aria-label={tr('trustAria')} className="section bg-green text-white">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
        <Reveal>
          <Eyebrow light>{tx('eyebrow')}</Eyebrow>
          <p className="m-0 font-head text-[clamp(3.5rem,2rem+6vw,6.5rem)] font-bold leading-none text-mustard">
            <CountUp to={15000} suffix="+" />
          </p>
          <p className="mb-4 mt-3 font-head text-h2m font-bold leading-snug text-white">{tx('big')}</p>
          <p className="m-0 text-mint">{tx('text')}</p>
        </Reveal>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
          {items.map((i) => (
            <StaggerItem as="li" key={i.icon} className="flex items-start gap-4 rounded-tile border border-white/10 bg-white/5 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-white/10 text-mustard"><Icon name={i.icon} size={22} /></span>
              <span className="grid gap-0.5"><strong className="text-white">{i.title}</strong><span className="text-base text-mint">{i.text}</span></span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
