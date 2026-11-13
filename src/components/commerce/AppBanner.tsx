import { QRCodeSVG } from 'qrcode.react';
import Icon from '../Icon';
import Accent from '../ui/Accent';
import AppBadges from './AppBadges';
import PhoneMockup from '../brand/PhoneMockup';
import { Reveal } from '../motion/Reveal';
import { SITE } from '../../config/site';
import { useT, type Dict } from '../../i18n/LangContext';

// "Get the app" banner (Subscriptions page): a charcoal panel saying what the Way2Cure app does,
// with the store badges and a QR code (desktop), and the app's phone screen on the right,
// cropped by the panel's edge. Phones: the text and badges only.

const T: Dict = {
  en: {
    chip: 'Way2Cure app',
    title: 'All of this, *in the app.*',
    lead: 'Set up and manage your plans from your phone, and follow every delivery and visit.',
    f1: 'Start, pause or change a plan', f2: 'Dose reminders for each sachet', f3: 'Refill reminders before medicines run out',
    f4: 'Track deliveries and nurse visits', f5: 'Upload prescriptions in a photo',
    qr: 'Scan to get the app', qrTitle: 'QR code to download the Way2Cure app',
  },
  hi: {
    chip: 'Way2Cure ऐप',
    title: 'यह सब, *ऐप में।*',
    lead: 'अपने फ़ोन से प्लान शुरू करें और सँभालें, और हर डिलिवरी और विज़िट पर नज़र रखें।',
    f1: 'प्लान शुरू करें, रोकें या बदलें', f2: 'हर सैशे के लिए डोज़ रिमाइंडर', f3: 'दवा ख़त्म होने से पहले रीफ़िल रिमाइंडर',
    f4: 'डिलिवरी और नर्स विज़िट ट्रैक करें', f5: 'फ़ोटो से पर्चा अपलोड करें',
    qr: 'ऐप पाने के लिए स्कैन करें', qrTitle: 'Way2Cure ऐप डाउनलोड करने का QR कोड',
  },
  mr: {
    chip: 'Way2Cure ॲप',
    title: 'हे सर्व, *ॲपमध्ये.*',
    lead: 'तुमच्या फोनवरून प्लॅन सुरू करा आणि सांभाळा, आणि प्रत्येक डिलिव्हरी व भेट पाहा.',
    f1: 'प्लॅन सुरू करा, थांबवा किंवा बदला', f2: 'प्रत्येक सॅशेसाठी डोस आठवण', f3: 'औषधे संपण्यापूर्वी रिफिल आठवण',
    f4: 'डिलिव्हरी आणि नर्स भेटी ट्रॅक करा', f5: 'फोटोने प्रिस्क्रिप्शन अपलोड करा',
    qr: 'ॲप मिळवण्यासाठी स्कॅन करा', qrTitle: 'Way2Cure ॲप डाउनलोड करण्यासाठी QR कोड',
  },
};

const FEATURES = [['refresh', 'f1'], ['bell', 'f2'], ['pill', 'f3'], ['truck', 'f4'], ['rx', 'f5']] as const;

export default function AppBanner() {
  const tr = useT(T);
  return (
    <Reveal className="relative isolate overflow-hidden rounded-[1.75rem] bg-green text-white shadow-float lg:min-h-[30rem]">
      {/* Soft colour pools */}
      <span aria-hidden="true" className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-sage/30 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-32 right-[18%] -z-10 h-96 w-96 rounded-full bg-terracotta-deep/25 blur-3xl" />

      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-14">
        <div className="relative">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-small font-bold text-mint">
            <Icon name="phoneApp" size={16} className="text-mustard" /> {tr('chip')}
          </span>
          <h2 className="mb-3 text-section text-white"><Accent text={tr('title')} /></h2>
          <p className="mb-7 max-w-[32rem] text-lead text-mint">{tr('lead')}</p>
          <ul className="mb-8 grid gap-3 sm:grid-cols-2">
            {FEATURES.map(([icon, k]) => (
              <li key={k} className="flex items-center gap-3 text-base font-semibold text-white">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-mustard"><Icon name={icon} size={18} /></span>
                {tr(k)}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-6">
            <AppBadges dark />
            <div className="hidden items-center gap-3 lg:flex">
              <span className="rounded-xl bg-white p-1.5">
                {/* TODO: client: point SITE.appStores at the real app listing so this code opens the app */}
                <QRCodeSVG value={SITE.appStores.android} size={64} fgColor="rgb(38 52 69)" bgColor="rgb(255 255 255)" level="M" title={tr('qrTitle')} />
              </span>
              <span className="max-w-[7rem] text-small font-semibold text-mint">{tr('qr')}</span>
            </div>
          </div>
        </div>

        {/* The app's screen, rising out of the panel's bottom edge (desktop) */}
        <div aria-hidden="true" className="relative hidden lg:block">
          <span className="absolute left-1/2 top-[52%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <span className="absolute left-1/2 top-[52%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 rotate-[4deg]">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
