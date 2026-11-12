import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent, { Eyebrow } from '../components/ui/Accent';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import CareCard from '../components/care/CareCard';
import TrustStrip from '../components/trust/TrustStrip';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { services } from '../data';
import { SITE } from '../config/site';
import { useLang, useT, type Dict } from '../i18n/LangContext';

// Care services (guidelines p.8). Booking is a request; the care team calls back to agree
// the nurse or doctor, the timing and the price. TODO: API: services list from the care backend.
// Sections step cream -> white -> mist -> green (trust) -> cream, separated by space, not borders.

const T: Dict = {
  en: {
    seoTitle: 'Nurses, doctors and ICU care at home',
    seoDesc: 'Book qualified nurses, doctors, caretakers and ICU care at home in Mumbai, Navi Mumbai and Thane. Background-checked staff. Call 7400400908, 24/7.',
    crumb: 'Care services',
    eyebrow: 'Care at home in Mumbai, Navi Mumbai & Thane',
    title: 'Care at home, by people *you can trust.*',
    intro: 'Qualified nurses, doctors and caretakers. Book online, or call us and we will plan it with you.',
    everydayEyebrow: 'Everyday care', everydayTitle: 'Help at home, *day or night.*', everydayLead: 'Single visits, 12-hour or 24-hour shifts, planned around your family.',
    howEyebrow: 'How booking works', howTitle: 'Four simple steps. *No payment online.*',
    h1t: 'Choose a service', h1d: 'Pick the care you need, or call us if you are not sure.',
    h2t: 'Tell us when and where', h2d: 'Start date, preferred time and your area.',
    h3t: 'We call to plan', h3d: 'Our care team agrees the nurse or doctor, the timing and the price with you.',
    h4t: 'Care begins', h4d: 'A trained, background-checked person arrives at your home.',
    specialEyebrow: 'Specialised care', specialTitle: 'Serious illness, *cared for at home.*',
    plan: 'One doctor-led care plan for every patient, reviewed as needs change.',
    suitability: 'Suitability is assessed by the treating doctor before care begins.',
    ctaTitle: 'Not sure which care you need? *Talk to us.*', ctaText: 'Tell us about your parent. Our care team will suggest the right help and plan it with you.',
    callNow: 'Call {phone}',
  },
  hi: {
    seoTitle: 'घर पर नर्स, डॉक्टर और ICU देखभाल',
    seoDesc: 'मुंबई, नवी मुंबई और ठाणे में प्रशिक्षित नर्स, डॉक्टर, केयरटेकर और घर पर ICU देखभाल बुक करें। बैकग्राउंड-जाँचे हुए स्टाफ़। 24/7 कॉल करें: 7400400908।',
    crumb: 'देखभाल सेवाएँ',
    eyebrow: 'मुंबई, नवी मुंबई और ठाणे में घर पर देखभाल',
    title: 'घर पर देखभाल, ऐसे लोगों से *जिन पर आप भरोसा कर सकें।*',
    intro: 'प्रशिक्षित नर्स, डॉक्टर और केयरटेकर। ऑनलाइन बुक करें, या हमें कॉल करें, हम आपके साथ मिलकर योजना बनाएँगे।',
    everydayEyebrow: 'रोज़ की देखभाल', everydayTitle: 'घर पर मदद, *दिन हो या रात।*', everydayLead: 'एक विज़िट, 12 घंटे या 24 घंटे की शिफ़्ट, आपके परिवार के हिसाब से।',
    howEyebrow: 'बुकिंग कैसे होती है', howTitle: 'चार आसान कदम। *ऑनलाइन कोई भुगतान नहीं।*',
    h1t: 'सेवा चुनें', h1d: 'जिस देखभाल की ज़रूरत है उसे चुनें, या पक्का न हो तो हमें कॉल करें।',
    h2t: 'कब और कहाँ बताएँ', h2d: 'शुरू करने की तारीख, सही समय और आपका इलाका।',
    h3t: 'हम कॉल करके योजना बनाते हैं', h3d: 'हमारी केयर टीम आपके साथ नर्स या डॉक्टर, समय और कीमत तय करती है।',
    h4t: 'देखभाल शुरू', h4d: 'एक प्रशिक्षित, जाँचा-परखा व्यक्ति आपके घर आता है।',
    specialEyebrow: 'खास देखभाल', specialTitle: 'गंभीर बीमारी, *घर पर देखभाल।*',
    plan: 'हर मरीज़ के लिए डॉक्टर की बनाई एक केयर योजना, ज़रूरत बदलने पर दोबारा देखी जाती है।',
    suitability: 'देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।',
    ctaTitle: 'पक्का नहीं कि कौन-सी देखभाल चाहिए? *हमसे बात करें।*', ctaText: 'अपने माता-पिता के बारे में बताएँ। हमारी केयर टीम सही मदद सुझाएगी और आपके साथ योजना बनाएगी।',
    callNow: 'कॉल करें {phone}',
  },
  mr: {
    seoTitle: 'घरी नर्स, डॉक्टर आणि ICU काळजी',
    seoDesc: 'मुंबई, नवी मुंबई आणि ठाणे येथे प्रशिक्षित नर्स, डॉक्टर, केअरटेकर आणि घरी ICU काळजी बुक करा. पार्श्वभूमी तपासलेले कर्मचारी. 24/7 कॉल करा: 7400400908.',
    crumb: 'काळजी सेवा',
    eyebrow: 'मुंबई, नवी मुंबई आणि ठाणे येथे घरी काळजी',
    title: 'घरी काळजी, *विश्वास ठेवता येईल अशा लोकांकडून.*',
    intro: 'प्रशिक्षित नर्स, डॉक्टर आणि केअरटेकर. ऑनलाइन बुक करा, किंवा आम्हाला कॉल करा, आम्ही तुमच्यासोबत नियोजन करू.',
    everydayEyebrow: 'रोजची काळजी', everydayTitle: 'घरी मदत, *दिवस असो वा रात्र.*', everydayLead: 'एक भेट, 12 तास किंवा 24 तासांची शिफ्ट, तुमच्या कुटुंबाच्या सोयीनुसार.',
    howEyebrow: 'बुकिंग कसे होते', howTitle: 'चार सोप्या पायऱ्या. *ऑनलाइन कोणतेही पैसे नाहीत.*',
    h1t: 'सेवा निवडा', h1d: 'हवी असलेली काळजी निवडा, किंवा खात्री नसल्यास आम्हाला कॉल करा.',
    h2t: 'कधी आणि कुठे ते सांगा', h2d: 'सुरू करण्याची तारीख, सोयीची वेळ आणि तुमचा परिसर.',
    h3t: 'आम्ही कॉल करून नियोजन करतो', h3d: 'आमची केअर टीम तुमच्यासोबत नर्स किंवा डॉक्टर, वेळ आणि किंमत ठरवते.',
    h4t: 'काळजी सुरू', h4d: 'प्रशिक्षित, पार्श्वभूमी तपासलेली व्यक्ती तुमच्या घरी येते.',
    specialEyebrow: 'विशेष काळजी', specialTitle: 'गंभीर आजार, *घरीच काळजी.*',
    plan: 'प्रत्येक रुग्णासाठी डॉक्टरांनी आखलेली एक काळजी योजना, गरज बदलल्यास पुन्हा तपासली जाते.',
    suitability: 'काळजी सुरू होण्यापूर्वी, उपचार करणारे डॉक्टर ती रुग्णासाठी योग्य आहे का ते ठरवतात.',
    ctaTitle: 'कोणती काळजी हवी याची खात्री नाही? *आमच्याशी बोला.*', ctaText: 'तुमच्या आई-वडिलांबद्दल सांगा. आमची केअर टीम योग्य मदत सुचवेल आणि तुमच्यासोबत नियोजन करेल.',
    callNow: 'कॉल करा {phone}',
  },
};

const STEPS = ['h1', 'h2', 'h3', 'h4'];

export default function Care() {
  const { t } = useLang();
  const tr = useT(T);
  const everyday = services.filter((s) => !s.specialised);
  const specialised = services.filter((s) => s.specialised);
  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} />
      <PageHeader
        tone="green"
        image={{ src: '/images/care-nurse.webp', position: 'center 15%' }}
        eyebrow={tr('eyebrow')}
        title={tr('title')}
        lead={tr('intro')}
        crumbs={[{ label: t('home'), to: '/' }, { label: tr('crumb') }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="light" to="/care/nurse"><Icon name="stethoscope" size={20} /> {t('bookNurse')} <Icon name="arrow" size={18} /></Button>
          <Button variant="outline-light" href={SITE.phoneHref}><Icon name="phone" size={20} /> {t('callUs')} {SITE.phone}</Button>
        </div>
      </PageHeader>

      {/* Everyday care */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow>{tr('everydayEyebrow')}</Eyebrow>
            <h2 className="mb-4 text-section"><Accent text={tr('everydayTitle')} /></h2>
            <p className="m-0 text-lead text-ink/75">{tr('everydayLead')}</p>
          </Reveal>
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {everyday.map((s) => <StaggerItem as="li" key={s.id}><CareCard service={s} /></StaggerItem>)}
          </Stagger>
        </div>
      </section>

      {/* How booking works */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow>{tr('howEyebrow')}</Eyebrow>
            <h2 className="m-0 text-section"><Accent text={tr('howTitle')} /></h2>
          </Reveal>
          <Stagger as="ol" className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-0.5 rounded-full bg-mint md:block" />
            {STEPS.map((k, i) => (
              <StaggerItem as="li" key={k} className="relative flex gap-5 md:block">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green font-head text-h3 font-bold text-white ring-8 ring-white md:mb-5">
                  {i + 1}
                </span>
                <span className="grid gap-1">
                  <strong className="font-head text-h3m text-green">{tr(`${k}t`)}</strong>
                  <span className="text-base text-ink/75">{tr(`${k}d`)}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Specialised care: heading stays in view while the cards scroll on desktop */}
      <section id="specialised" className="section scroll-mt-28 bg-mist">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-36 lg:self-start">
            <Eyebrow>{tr('specialEyebrow')}</Eyebrow>
            <h2 className="mb-4 text-section"><Accent text={tr('specialTitle')} /></h2>
            <p className="text-lead text-ink/75">{tr('plan')}</p>
            <p className="mt-6 flex items-start gap-3 rounded-tile bg-white p-5 text-base shadow-card">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name="stethoscope" size={20} /></span>
              <span className="pt-1.5">{tr('suitability')}</span>
            </p>
          </Reveal>
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2">
            {specialised.map((s) => <StaggerItem as="li" key={s.id}><CareCard service={s} /></StaggerItem>)}
          </Stagger>
        </div>
      </section>

      <TrustStrip />

      {/* Closing: talk to a real person */}
      <section className="section">
        <div className="container">
          <Reveal className="grid overflow-hidden rounded-panel bg-white shadow-card md:grid-cols-[0.8fr_1.2fr]">
            <div className="relative h-56 md:h-auto">
              <img src="/images/nurse-portrait.webp" alt="" width={900} height={600} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
            </div>
            <div className="grid content-center gap-8 p-8 md:p-12">
              <div>
                <h2 className="mb-3 text-section"><Accent text={tr('ctaTitle')} /></h2>
                <p className="m-0 text-lead text-ink/75">{tr('ctaText')}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={SITE.phoneHref} variant="urgent"><Icon name="phone" size={20} /> {tr('callNow', { phone: SITE.phone })}</Button>
                <Button href={SITE.whatsappHref} external variant="outline"><Icon name="whatsapp" size={20} /> {t('whatsapp')}</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
