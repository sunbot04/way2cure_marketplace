import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import Accent from '../components/ui/Accent';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { SITE } from '../config/site';
import { useLang, useT, type Dict } from '../i18n/LangContext';

// Safe-zone band (pitch deck, launch item). Not on sale yet, so the actions are "tell me when
// ready" and booking dementia care at home, which is available today.

const STEPS = ['s1', 's2', 's3', 's4'];

const T: Dict = {
  en: {
    bookDementia: 'Book dementia care at home',
    seoDesc: 'A safe-zone band for people living with dementia, coming soon from Way2Cure. Family gets an alert when the wearer leaves the safe zone. Used only with consent.',
    soon: 'Coming soon',
    title: 'Safe-zone band',
    h1: 'The Safe-zone band. *Peace of mind at home.*',
    intro: 'For families caring for a loved one with dementia. Inside the safe zone: no alert. If they walk out: an instant alert on family phones.',
    artLabel: 'A dashed safe zone circle around a home. A dot outside the circle triggers an alert to family.',
    artZone: 'Safe zone',
    artAlert: 'Alert to family',
    howTitle: 'Simple for them. *Reassuring for you.*',
    s1t: 'Set the safe zone', s1d: 'Family marks the boundary around home in the app.',
    s2t: 'Wear the band', s2d: 'A light arm band with built-in location tracking.',
    s3t: 'Instant alert', s3d: 'Family phones are alerted when the boundary is crossed.',
    s4t: 'Find quickly', s4d: 'Live location is shown on the map.',
    privacyTitle: 'Consent first, always',
    privacy: "Used only with the family's consent. Location data is private and never shared. Band features will be finalised with the device supplier.",
    readyTitle: 'Want to know *when it is ready?*',
    readyText: 'Send us a WhatsApp message and we will tell you as soon as the band is available in your area. Dementia care at home is available today.',
    readyBtn: 'Tell me when it is ready',
  },
  hi: {
    bookDementia: 'घर पर डिमेंशिया केयर बुक करें',
    seoDesc: 'डिमेंशिया से जूझ रहे लोगों के लिए सेफ़-ज़ोन बैंड, जल्द ही Way2Cure पर। पहनने वाला सेफ़ ज़ोन से बाहर जाए तो परिवार को अलर्ट मिलता है। सिर्फ़ सहमति से इस्तेमाल।',
    soon: 'जल्द आ रहा है',
    title: 'सेफ़-ज़ोन बैंड',
    h1: 'सेफ़-ज़ोन बैंड। *घर पर सुकून।*',
    intro: 'डिमेंशिया से जूझ रहे अपनों की देखभाल करने वाले परिवारों के लिए। सेफ़ ज़ोन के अंदर: कोई अलर्ट नहीं। बाहर जाते ही: परिवार के फ़ोन पर तुरंत अलर्ट।',
    artLabel: 'घर के चारों ओर सेफ़ ज़ोन का बिंदीदार घेरा। घेरे से बाहर का बिंदु परिवार को अलर्ट भेजता है।',
    artZone: 'सेफ़ ज़ोन',
    artAlert: 'परिवार को अलर्ट',
    howTitle: 'उनके लिए आसान। *आपके लिए भरोसा।*',
    s1t: 'सेफ़ ज़ोन तय करें', s1d: 'परिवार ऐप में घर के आसपास की सीमा तय करता है।',
    s2t: 'बैंड पहनें', s2d: 'बाँह पर पहनने वाला हल्का बैंड, जिसमें लोकेशन ट्रैकिंग पहले से है।',
    s3t: 'तुरंत अलर्ट', s3d: 'सीमा पार होते ही परिवार के फ़ोन पर अलर्ट आता है।',
    s4t: 'जल्दी ढूँढें', s4d: 'मैप पर लाइव लोकेशन दिखती है।',
    privacyTitle: 'हमेशा पहले सहमति',
    privacy: 'सिर्फ़ परिवार की सहमति से इस्तेमाल होता है। लोकेशन की जानकारी निजी रहती है और कभी किसी से साझा नहीं की जाती। बैंड की सुविधाएँ डिवाइस सप्लायर के साथ तय की जाएँगी।',
    readyTitle: 'जानना चाहते हैं *कि यह कब तैयार होगा?*',
    readyText: 'हमें व्हाट्सऐप पर मैसेज भेजें। आपके इलाके में बैंड मिलते ही हम आपको बता देंगे। घर पर डिमेंशिया केयर आज ही उपलब्ध है।',
    readyBtn: 'तैयार होने पर मुझे बताएँ',
  },
  mr: {
    bookDementia: 'घरी डिमेन्शिया काळजी बुक करा',
    seoDesc: 'डिमेन्शिया असलेल्या व्यक्तींसाठी सेफ-झोन बँड, लवकरच Way2Cure वर. बँड घालणारी व्यक्ती सेफ झोनबाहेर गेल्यास कुटुंबाला अलर्ट मिळतो. फक्त संमतीनेच वापर.',
    soon: 'लवकरच येत आहे',
    title: 'सेफ-झोन बँड',
    h1: 'सेफ-झोन बँड. *घरी मनःशांती.*',
    intro: 'डिमेन्शिया असलेल्या प्रियजनांची काळजी घेणाऱ्या कुटुंबांसाठी. सेफ झोनच्या आत: अलर्ट नाही. बाहेर गेल्यावर: कुटुंबाच्या फोनवर लगेच अलर्ट.',
    artLabel: 'घराभोवती सेफ झोनचे तुटक रेषेचे वर्तुळ. वर्तुळाबाहेरील ठिपका कुटुंबाला अलर्ट पाठवतो.',
    artZone: 'सेफ झोन',
    artAlert: 'कुटुंबाला अलर्ट',
    howTitle: 'त्यांच्यासाठी सोपे. *तुमच्यासाठी दिलासा.*',
    s1t: 'सेफ झोन ठरवा', s1d: 'कुटुंब ॲपमध्ये घराभोवतीची सीमा ठरवते.',
    s2t: 'बँड घाला', s2d: 'हलका दंडावर घालायचा बँड, ज्यात लोकेशन ट्रॅकिंग आधीपासून आहे.',
    s3t: 'लगेच अलर्ट', s3d: 'सीमा ओलांडताच कुटुंबाच्या फोनवर अलर्ट येतो.',
    s4t: 'पटकन शोधा', s4d: 'नकाशावर लाइव्ह लोकेशन दिसते.',
    privacyTitle: 'नेहमी आधी संमती',
    privacy: 'फक्त कुटुंबाच्या संमतीनेच वापरला जातो. लोकेशनची माहिती खाजगी राहते आणि कधीही कोणाशी शेअर केली जात नाही. बँडची वैशिष्ट्ये डिव्हाइस पुरवठादारासोबत निश्चित केली जातील.',
    readyTitle: 'हे कधी तयार होईल *ते जाणून घ्यायचे आहे?*',
    readyText: 'आम्हाला व्हॉट्सॲपवर मेसेज पाठवा. तुमच्या भागात बँड उपलब्ध होताच आम्ही तुम्हाला कळवू. घरी डिमेन्शिया काळजी आजच उपलब्ध आहे.',
    readyBtn: 'तयार झाल्यावर मला कळवा',
  },
};

export default function SafeZone() {
  const { t } = useLang();
  const tr = useT(T);
  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} />
      <PageHeader
        tone="mist"
        image={{ src: '/images/people/hands-elderly-couple.webp', position: '50% 58%' }}
        title={tr('h1')}
        lead={tr('intro')}
        crumbs={[{ label: t('home'), to: '/' }, { label: tr('title') }]}
      >
        <div className="mb-5"><Tag kind="launch">{tr('soon')}</Tag></div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={SITE.whatsappHref} external><Icon name="whatsapp" size={20} /> {tr('readyBtn')}</Button>
          <Button to="/care/dementia" variant="outline"><Icon name="memory" size={20} /> {tr('bookDementia')}</Button>
        </div>
      </PageHeader>

      {/* How it works: diagram + steps */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mb-8 md:mb-12 max-w-2xl">
            <h2 className="m-0 text-section"><Accent text={tr('howTitle')} /></h2>
          </Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Simple flat diagram in brand colours; the words carry the meaning, not the colours. */}
            <Reveal className="rounded-panel bg-mist p-6 md:p-10">
              <svg viewBox="0 0 360 300" className="mx-auto w-full max-w-md" role="img" aria-label={tr('artLabel')}>
                <circle cx="150" cy="150" r="120" className="fill-white stroke-sage" strokeWidth="4" strokeDasharray="14 10" />
                <text x="150" y="70" textAnchor="middle" className="fill-green" fontWeight="700" fontSize="18">{tr('artZone')}</text>
                <path d="M120 150 L150 122 L180 150 V190 H120 Z" className="fill-green" />
                <circle cx="105" cy="215" r="12" className="fill-sage stroke-white" strokeWidth="3" />
                <circle cx="310" cy="190" r="12" className="fill-terracotta-deep stroke-white" strokeWidth="3" />
                <rect x="250" y="120" width="104" height="32" rx="6" className="fill-terracotta-deep" />
                <text x="302" y="141" textAnchor="middle" className="fill-white" fontWeight="700" fontSize="14">{tr('artAlert')}</text>
              </svg>
            </Reveal>
            <Stagger as="ol" className="relative grid gap-7">
              <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 rounded-full bg-mint" />
              {STEPS.map((k, i) => (
                <StaggerItem as="li" key={k} className="relative flex items-start gap-5">
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green font-head text-h3 font-bold text-white ring-8 ring-white">{i + 1}</span>
                  <span className="grid gap-1 pt-1.5">
                    <strong className="font-head text-h3m text-green">{tr(`${k}t`)}</strong>
                    <span className="text-base text-ink/75">{tr(`${k}d`)}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Consent */}
      <section className="section bg-mist">
        <div className="container">
          <Reveal className="flex max-w-3xl items-start gap-5 rounded-panel bg-white p-6 shadow-card md:p-8">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sage-tint text-green"><Icon name="lock" size={26} /></span>
            <span>
              <h2 className="mb-2 text-h3m md:text-h3">{tr('privacyTitle')}</h2>
              <p className="m-0 text-base text-ink/80">{tr('privacy')}</p>
            </span>
          </Reveal>
        </div>
      </section>

      {/* Tell me when it is ready */}
      <section className="section">
        <div className="container">
          <Reveal className="grid gap-8 rounded-panel bg-green p-8 text-white md:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2 className="mb-3 text-section text-white"><Accent text={tr('readyTitle')} /></h2>
              <p className="m-0 text-lead text-mint">{tr('readyText')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row lg:justify-end">
              <Button href={SITE.whatsappHref} external variant="light"><Icon name="whatsapp" size={20} /> {tr('readyBtn')}</Button>
              <Button to="/care/dementia" variant="outline-light">{tr('bookDementia')} <Icon name="arrow" size={18} /></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
