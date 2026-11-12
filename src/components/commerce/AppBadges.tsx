import { SITE } from '../../config/site';
import { useT, type Dict } from '../../i18n/LangContext';

// App Store and Google Play badges (prescription upload is in the app only, p.8).
// TODO: client: point SITE.appStores at the real listings.
const T: Dict = {
  en: { ios1: 'Download on the', ios2: 'App Store', and1: 'Get it on', and2: 'Google Play' },
  hi: { ios1: 'डाउनलोड करें', ios2: 'App Store', and1: 'पाएँ', and2: 'Google Play' },
  mr: { ios1: 'डाउनलोड करा', ios2: 'App Store', and1: 'मिळवा', and2: 'Google Play' },
};

const Apple = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true" fill="currentColor">
    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2-1.6-.2-3.1.9-3.9.9-.8 0-2.1-.9-3.4-.9-1.7 0-3.3 1-4.3 2.6-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.4-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.9 1.4-2.9s-2.7-1-2.6-4.2zM13.8 5c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.2.1 2.3-.6 3-1.5z" />
  </svg>
);
const Play = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
    <path d="M4 2.6 13.6 12 4 21.4c-.3-.2-.5-.6-.5-1V3.6c0-.4.2-.8.5-1z" className="fill-sage" />
    <path d="m16.7 8.9-3.1 3.1L4 2.6c.2-.1.6-.1 1 .1l11.7 6.2z" className="fill-mustard" />
    <path d="m16.7 15.1-11.7 6.2c-.4.2-.8.2-1 .1l9.6-9.4 3.1 3.1z" className="fill-terracotta" />
    <path d="m20.3 10.9-3.6-2-3.1 3.1 3.1 3.1 3.6-2c.8-.5.8-1.7 0-2.2z" className="fill-mint" />
  </svg>
);

export default function AppBadges({ dark = false }: { dark?: boolean }) {
  const tr = useT(T);
  const cls = `inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-btn border px-4 no-underline transition-colors duration-micro ${
    dark ? 'border-white/40 text-white hover:bg-white/10' : 'border-ink bg-ink text-white hover:bg-green'
  }`;
  return (
    <div className="flex flex-wrap gap-3">
      <a href={SITE.appStores.ios} target="_blank" rel="noreferrer" className={cls}>
        <Apple />
        <span className="grid leading-tight"><span className="text-[0.7rem]">{tr('ios1')}</span><span className="text-base font-bold">{tr('ios2')}</span></span>
      </a>
      <a href={SITE.appStores.android} target="_blank" rel="noreferrer" className={cls}>
        <Play />
        <span className="grid leading-tight"><span className="text-[0.7rem]">{tr('and1')}</span><span className="text-base font-bold">{tr('and2')}</span></span>
      </a>
    </div>
  );
}
