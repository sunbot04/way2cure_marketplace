import { QRCodeSVG } from 'qrcode.react';
import Icon from '../Icon';
import AppBadges from './AppBadges';
import { buttonClass } from '../ui/Button';
import { useT } from '../../i18n/LangContext';
import { SITE } from '../../config/site';
import { COPY } from '../copy';

// Prescription upload is in the mobile app only (pitch deck p.10). On the web we show
// "Open in the app" with a QR code (desktop), the store badges, and the phone line for people
// without a smartphone.
export default function AppPanel({ title, text, className = '', headingLevel = 3 }: { title?: string; text?: string; className?: string; headingLevel?: 2 | 3 }) {
  const tr = useT(COPY);
  return (
    <div className={`grid items-center gap-7 rounded-panel bg-white p-6 shadow-card md:p-8 lg:grid-cols-[auto_1fr] ${className}`}>
      <div className="hidden justify-self-start rounded-tile bg-mist p-4 lg:block">
        <div className="rounded-btn bg-white p-3 shadow-card">
          {/* TODO: client: point SITE.appUrl at the real app link so this code opens the app */}
          <QRCodeSVG value={SITE.appUrl} size={140} fgColor="rgb(17 77 74)" bgColor="rgb(255 255 255)" level="M" title={tr('qrTitle')} />
        </div>
      </div>
      <div>
        <p className="mb-3 flex items-center gap-2 text-small font-semibold text-terracotta-deep">
          <Icon name="phoneApp" size={16} /> Way2Cure app
        </p>
        {(() => { const H = headingLevel === 2 ? 'h2' : 'h3'; return <H className="mb-2 font-head text-h2m md:text-h2">{title ?? tr('openInApp')}</H>; })()}
        <p className="text-ink/80">{text ?? tr('qrText')}</p>
        <div className="my-5"><AppBadges /></div>
        <p className="m-0 flex items-start gap-2 border-t border-line pt-4 text-base text-ink/80">
          <Icon name="phone" size={18} className="mt-1 shrink-0 text-terracotta-deep" />
          <a href={SITE.phoneHref} className="text-ink no-underline hover:underline">{tr('preferTalk', { phone: SITE.phone })}</a>
        </p>
      </div>
    </div>
  );
}

export function HelpBox({ className = '' }: { className?: string }) {
  const tr = useT(COPY);
  return (
    <aside className={`rounded-panel bg-white p-6 shadow-card ${className}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name="support" size={22} /></span>
        <h3 className="m-0">{tr('needHelp')}</h3>
      </div>
      <p className="text-ink/80">{tr('helpText')}</p>
      <div className="flex flex-wrap gap-3">
        <a className={buttonClass('urgent', { compact: true })} href={SITE.phoneHref}><Icon name="phone" size={20} /> {tr('call', { phone: SITE.phone })}</a>
        <a className={buttonClass('outline', { compact: true })} href={SITE.whatsappHref} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={20} /> {tr('whatsapp')}</a>
      </div>
    </aside>
  );
}
