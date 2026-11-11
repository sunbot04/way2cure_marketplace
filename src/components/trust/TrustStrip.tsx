import Icon from '../Icon';
import { useT } from '../../i18n/LangContext';
import { SITE } from '../../config/site';
import { COPY } from '../copy';

// Trust elements (guidelines p.9 item 7 and p.11). Real numbers only: 15K+ is confirmed.
// band = the mustard strip from the homepage blueprint · list = for use inside another section.
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
        <li key={i.icon} className="flex items-start gap-3">
          <Icon name={i.icon} size={28} className="mt-0.5 shrink-0 text-green" />
          <span className="grid leading-snug">
            <strong className="text-green">{i.title}</strong>
            <span className={`text-base ${variant === 'band' ? 'text-green' : 'text-grey'}`}>{i.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
  if (variant === 'list') return list;
  return (
    <section aria-label={tr('trustAria')} className="bg-mustard py-8 text-green">
      <div className="container">{list}</div>
    </section>
  );
}
