import { QRCodeSVG } from 'qrcode.react';
import Icon from '../Icon';
import { buttonClass } from '../ui/Button';
import { useT } from '../../i18n/LangContext';
import { SITE } from '../../config/site';
import { COPY } from '../copy';

// Prescription upload is in the mobile app only (pitch deck p.10). On the web we show
// "Open in the app" with a QR code, store links, and the phone line for people without a smartphone.
export default function AppPanel({ title }: { title?: string }) {
  const tr = useT(COPY);
  return (
    <div className="grid items-center gap-6 rounded-card bg-white p-6 shadow-card sm:grid-cols-[auto_1fr]">
      <div className="hidden justify-self-start rounded-card border-2 border-mint bg-white p-3 lg:block">
        {/* TODO: client: point SITE.appUrl at the real app link so this code opens the app */}
        <QRCodeSVG value={SITE.appUrl} size={148} fgColor="#114D4A" bgColor="#FFFFFF" level="M" title={tr('qrTitle')} />
      </div>
      <div>
        <h3>{title ?? tr('openInApp')}</h3>
        <p>{tr('qrText')}</p>
        <div className="my-4 flex flex-wrap gap-3">
          <a href={SITE.appStores.android} className={buttonClass('primary', { compact: true })} target="_blank" rel="noreferrer">
            <Icon name="phoneApp" size={20} /> {tr('playStore')}
          </a>
          <a href={SITE.appStores.ios} className={buttonClass('outline', { compact: true })} target="_blank" rel="noreferrer">
            <Icon name="phoneApp" size={20} /> {tr('appStore')}
          </a>
        </div>
        <p className="m-0 text-base">
          <Icon name="phone" size={18} className="mr-1 inline align-[-3px] text-terracotta-deep" />
          {tr('preferTalk', { phone: SITE.phone })}
        </p>
      </div>
    </div>
  );
}

export function HelpBox() {
  const tr = useT(COPY);
  return (
    <aside className="rounded-card bg-white p-6 shadow-card" style={{ borderLeft: '5px solid var(--green)' }}>
      <h3>{tr('needHelp')}</h3>
      <p>{tr('helpText')}</p>
      <div className="flex flex-wrap gap-3">
        <a className={buttonClass('outline', { compact: true })} href={SITE.phoneHref}><Icon name="phone" size={20} /> {tr('call', { phone: SITE.phone })}</a>
        <a className={buttonClass('outline', { compact: true })} href={SITE.whatsappHref} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={20} /> {tr('whatsapp')}</a>
      </div>
    </aside>
  );
}
