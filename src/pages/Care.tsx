import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import InfoBand from '../components/ui/InfoBand';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/care/ServiceCard';
import TrustStrip from '../components/trust/TrustStrip';
import { HelpBox } from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { services } from '../data';
import { SITE } from '../config/site';
import { useLang, useT, type Dict } from '../i18n/LangContext';

// Care services (guidelines p.8). Booking is a request; the care team calls back to agree
// the nurse or doctor, the timing and the price. TODO: API: services list from the care backend.

const T: Dict = {
  en: {
    seoTitle: 'Nurses, doctors and ICU care at home',
    seoDesc: 'Book qualified nurses, doctors, caretakers and ICU care at home in Mumbai, Navi Mumbai and Thane. Background-checked staff. Call 7400400908, 24/7.',
    howBook: 'Book online or call. Our care team calls you back to agree the nurse or doctor, the timing and the price. Every nurse and caretaker is background-checked.',
    eyebrow: 'Care services',
    title: 'Care at home, by people you can trust',
    intro: 'Qualified nurses, doctors and caretakers in Mumbai, Navi Mumbai and Thane. Book online, or call us and we will plan it with you.',
    everyday: 'Everyday care',
    specialised: 'Specialised care at home',
    plan: 'One doctor-led care plan for every patient.',
    suitability: 'Suitability is assessed by the treating doctor before care begins.',
  },
  hi: {
    seoTitle: 'घर पर नर्स, डॉक्टर और ICU देखभाल',
    seoDesc: 'मुंबई, नवी मुंबई और ठाणे में प्रशिक्षित नर्स, डॉक्टर, केयरटेकर और घर पर ICU देखभाल बुक करें। बैकग्राउंड-जाँचे हुए स्टाफ़। 24/7 कॉल करें: 7400400908।',
    howBook: 'ऑनलाइन बुक करें या कॉल करें। हमारी केयर टीम आपको वापस कॉल करके नर्स या डॉक्टर, समय और कीमत तय करती है। हर नर्स और केयरटेकर की बैकग्राउंड जाँच होती है।',
    eyebrow: 'देखभाल सेवाएँ',
    title: 'घर पर देखभाल, ऐसे लोगों से जिन पर आप भरोसा कर सकें',
    intro: 'मुंबई, नवी मुंबई और ठाणे में प्रशिक्षित नर्स, डॉक्टर और केयरटेकर। ऑनलाइन बुक करें, या हमें कॉल करें, हम आपके साथ मिलकर योजना बनाएँगे।',
    everyday: 'रोज़ की देखभाल',
    specialised: 'घर पर खास देखभाल',
    plan: 'हर मरीज़ के लिए डॉक्टर की बनाई एक केयर योजना।',
    suitability: 'देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।',
  },
  mr: {
    seoTitle: 'घरी नर्स, डॉक्टर आणि ICU काळजी',
    seoDesc: 'मुंबई, नवी मुंबई आणि ठाणे येथे प्रशिक्षित नर्स, डॉक्टर, केअरटेकर आणि घरी ICU काळजी बुक करा. पार्श्वभूमी तपासलेले कर्मचारी. 24/7 कॉल करा: 7400400908.',
    howBook: 'ऑनलाइन बुक करा किंवा कॉल करा. आमची केअर टीम तुम्हाला परत कॉल करून नर्स किंवा डॉक्टर, वेळ आणि किंमत ठरवते. प्रत्येक नर्स आणि केअरटेकरची पार्श्वभूमी तपासलेली असते.',
    eyebrow: 'काळजी सेवा',
    title: 'घरी काळजी, विश्वास ठेवता येईल अशा लोकांकडून',
    intro: 'मुंबई, नवी मुंबई आणि ठाणे येथे प्रशिक्षित नर्स, डॉक्टर आणि केअरटेकर. ऑनलाइन बुक करा, किंवा आम्हाला कॉल करा, आम्ही तुमच्यासोबत नियोजन करू.',
    everyday: 'रोजची काळजी',
    specialised: 'घरी विशेष काळजी',
    plan: 'प्रत्येक रुग्णासाठी डॉक्टरांनी आखलेली एक काळजी योजना.',
    suitability: 'काळजी सुरू होण्यापूर्वी, उपचार करणारे डॉक्टर ती रुग्णासाठी योग्य आहे का ते ठरवतात.',
  },
};

export default function Care() {
  const { t } = useLang();
  const tr = useT(T);
  const everyday = services.filter((s) => !s.specialised);
  const specialised = services.filter((s) => s.specialised);
  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} />
      <PageHeader tone="green" image={{ src: '/images/care-nurse.webp', position: 'center 15%' }} title={tr('title')} lead={tr('intro')} crumbs={[{ label: t('home'), to: '/' }, { label: tr('eyebrow') }]}>
        <div className="flex flex-wrap gap-3">
          <Button variant="light" href={SITE.phoneHref}><Icon name="phone" size={20} /> {t('callUs')} {SITE.phone}</Button>
          <Button variant="outline-light" href={SITE.whatsappHref} external><Icon name="whatsapp" size={20} /> {t('whatsapp')}</Button>
        </div>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container">
          <SectionHeading title={tr('everyday')} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {everyday.map((s) => <ServiceCard key={s.id} service={s} showDuration />)}
          </div>
          <InfoBand icon="userCheck" className="mt-8">{tr('howBook')}</InfoBand>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2>{tr('specialised')}</h2>
            <p className="text-lead text-grey">{tr('plan')}</p>
            <InfoBand icon="stethoscope">{tr('suitability')}</InfoBand>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {specialised.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl"><HelpBox /></div>
        </div>
      </section>
    </>
  );
}
