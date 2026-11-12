import { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useLang } from '../../i18n/LangContext';
import { SITE } from '../../config/site';

// Call and WhatsApp on every page (guidelines p.12): two round buttons stacked at the bottom right,
// with their label sliding out on hover/focus (desktop). Respects the phone's safe-area insets.
// This replaces the old mobile bottom tab bar.
const btn =
  'group relative grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full text-white no-underline shadow-float transition-transform duration-micro ease-soft hover:-translate-y-0.5 active:scale-[0.97] lg:h-14 lg:w-14';
const label =
  'pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-btn bg-ink px-3 py-1.5 text-base font-bold text-white opacity-0 transition-[opacity,transform] duration-micro group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:block';

export default function FloatingHelp() {
  const { t } = useLang();
  // Phones: appear after the first screen, so they never sit on the hero's own call-to-actions
  // (the phone number is already in the header strip there). Desktop: always shown.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const on = () => setShown(window.innerWidth >= 1024 || window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 grid gap-3 transition-[opacity,transform] duration-slow ease-soft ${
        shown ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      // Hidden: also out of the tab order and the accessibility tree (inert)
      {...(shown ? {} : { inert: '' })}
    >
      <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" aria-label={t('whatsapp')} className={`${btn} bg-green`}>
        <Icon name="whatsapp" size={24} />
        <span className={label}>{t('whatsapp')}</span>
      </a>
      <a href={SITE.phoneHref} aria-label={`${t('callUs')} ${SITE.phone}`} className={`${btn} bg-terracotta-deep`}>
        <Icon name="phone" size={24} />
        <span className={label}>{t('callUs')} {SITE.phone}</span>
      </a>
    </div>
  );
}
