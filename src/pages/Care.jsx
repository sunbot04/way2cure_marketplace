import { services } from '../data/services.js';
import { InfoBand, PageHead, ServiceCard, TrustStrip, HelpBox } from '../components/ui.jsx';
import { useLoc, useT } from '../context/LangContext.jsx';

const T = {
  en: {
    eyebrow: 'Care services',
    title: 'Care at home, by people you can trust',
    intro: 'Qualified nurses, doctors and caretakers in Mumbai, Navi Mumbai and Thane. Book online, or call us and we will plan it with you.',
    everyday: 'Everyday care',
    specialised: 'Specialised care at home',
    plan: 'One doctor-led care plan for every patient.',
    suitability: 'Suitability is assessed by the treating doctor before care begins.',
  },
  hi: {
    eyebrow: 'देखभाल सेवाएँ',
    title: 'घर पर देखभाल, ऐसे लोगों से जिन पर आप भरोसा कर सकें',
    intro: 'मुंबई, नवी मुंबई और ठाणे में प्रशिक्षित नर्स, डॉक्टर और केयरटेकर। ऑनलाइन बुक करें, या हमें कॉल करें, हम आपके साथ मिलकर योजना बनाएँगे।',
    everyday: 'रोज़ की देखभाल',
    specialised: 'घर पर खास देखभाल',
    plan: 'हर मरीज़ के लिए डॉक्टर की बनाई एक केयर योजना।',
    suitability: 'देखभाल शुरू होने से पहले, इलाज करने वाले डॉक्टर तय करते हैं कि यह मरीज़ के लिए सही है या नहीं।',
  },
  mr: {
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
  const tr = useT(T);
  const loc = useLoc();
  const everyday = services.filter((s) => !s.specialised);
  const specialised = services.filter((s) => s.specialised);
  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>

      <section className="section-sm">
        <div className="container">
          <h2>{tr('everyday')}</h2>
          <div className="grid grid-3">
            {everyday.map((s) => <ServiceCard key={s.id} service={loc(s)} />)}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <h2>{tr('specialised')}</h2>
          <p className="lead">{tr('plan')}</p>
          <div className="grid grid-4">
            {specialised.map((s) => <ServiceCard key={s.id} service={loc(s)} />)}
          </div>
          <InfoBand icon="stethoscope">{tr('suitability')}</InfoBand>
        </div>
      </section>

      <TrustStrip />

      <section className="section">
        <div className="container narrow">
          <HelpBox />
        </div>
      </section>
    </>
  );
}
