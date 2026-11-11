import Icon from '../Icon';
import { useT } from '../../i18n/LangContext';
import { SITE } from '../../config/site';
import { COPY } from '../copy';

// Trust elements (guidelines p.9 item 7 and p.11). Real numbers only: 15K+ is confirmed.
// band = soft full-width row between hairlines (homepage blueprint item 7) · list = for use inside another section.
export default function TrustStrip({ variant = 'band' }: { variant?: 'band' | 'list' }) {
  const tr = useT(COPY);
  const items = [
    { icon: 'users', title: tr('happy', { n: SITE.happyPatients }), text: tr('happyText') },
    { icon: 'userCheck', title: tr('nurses'), text: tr('nursesText') },
    { icon: 'verified', title: tr('pharmacies'), text: tr('pharmaciesText') },
    { icon: 'lock', title: tr('payments'), text: tr('paymentsText') },
    { icon: 'shield', title: tr('privacy'), text: tr('privacyText') },
    { icon: 'support', title: tr('support'), text: tr('supportText', { phone: SITE.phone }) },
  ];
  const list = (
    <ul className={`grid gap-x-8 gap-y-5 sm:grid-cols-2 ${variant === 'band' ? 'lg:grid-cols-3' : ''}`}>
      {items.map((i) => (
        <li key={i.icon} className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-tint text-green"><Icon name={i.icon} size={24} /></span>
          <span className="grid leading-snug">
            <strong className="text-green">{i.title}</strong>
            <span className={`text-base text-grey`}>{i.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
  if (variant === 'list') return list;
  return (
    <section aria-label={tr('trustAria')} className="py-10 md:py-14">
      <div className="container"><div className="border-y border-line py-8 md:py-10">{list}</div></div>
    </section>
  );
}
