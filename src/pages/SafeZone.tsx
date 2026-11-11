import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import InfoBand from '../components/ui/InfoBand';
import Tag from '../components/ui/Tag';
import StepList, { type Step } from '../components/ui/StepList';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { SITE } from '../config/site';
import { useLang, useT, type Dict } from '../i18n/LangContext';

// Safe-zone band (pitch deck, launch item). Not on sale yet, so the only action is "tell me when ready".

const STEPS = ['s1', 's2', 's3', 's4'];
const COLOURS: Step['colour'][] = ['green', 'sage', 'terracotta-deep', 'mustard'];

const T: Dict = {
  en: {
    bookDementia: 'Book dementia care at home',
    seoDesc: 'A safe-zone band for people living with dementia, coming soon from Way2Cure. Family gets an alert when the wearer leaves the safe zone. Used only with consent.',
    eyebrow: 'Coming soon · Dementia care',
    title: 'Safe-zone band',
    intro: 'Peace of mind for families caring for a loved one with dementia. Inside the zone: no alert. Outside: an instant alert.',
    artLabel: 'A dashed safe zone circle around a home. A dot outside the circle triggers an alert to family.',
    artZone: 'Safe zone',
    artAlert: 'Alert to family',
    s1t: 'Set the safe zone', s1d: 'Family marks the boundary around home in the app.',
    s2t: 'Wear the band', s2d: 'A light arm band with built-in location tracking.',
    s3t: 'Instant alert', s3d: 'Family phones are alerted when the boundary is crossed.',
    s4t: 'Find quickly', s4d: 'Live location is shown on the map.',
    privacy: "Used only with the family's consent. Location data is private and never shared. Band features will be finalised with the device supplier.",
    readyTitle: 'Want to know when it is ready?',
    readyText: 'Send us a WhatsApp message and we will tell you as soon as the band is available in your area.',
    readyBtn: 'Tell me when it is ready',
  },
  hi: {
    bookDementia: 'घर पर डिमेंशिया केयर बुक करें',
    seoDesc: 'डिमेंशिया से जूझ रहे लोगों के लिए सेफ़-ज़ोन बैंड, जल्द ही Way2Cure पर। पहनने वाला सेफ़ ज़ोन से बाहर जाए तो परिवार को अलर्ट मिलता है। सिर्फ़ सहमति से इस्तेमाल।',
    eyebrow: 'जल्द आ रहा है · डिमेंशिया (भूलने की बीमारी) में देखभाल',
    title: 'सेफ़-ज़ोन बैंड',
    intro: 'डिमेंशिया (भूलने की बीमारी) से जूझ रहे अपनों की देखभाल करने वाले परिवारों के लिए सुकून। ज़ोन के अंदर: कोई अलर्ट नहीं। बाहर जाने पर: तुरंत अलर्ट।',
    artLabel: 'घर के चारों ओर सेफ़ ज़ोन का बिंदीदार घेरा। घेरे से बाहर का बिंदु परिवार को अलर्ट भेजता है।',
    artZone: 'सेफ़ ज़ोन',
    artAlert: 'परिवार को अलर्ट',
    s1t: 'सेफ़ ज़ोन तय करें', s1d: 'परिवार ऐप में घर के आसपास की सीमा तय करता है।',
    s2t: 'बैंड पहनें', s2d: 'बाँह पर पहनने वाला हल्का बैंड, जिसमें लोकेशन ट्रैकिंग पहले से है।',
    s3t: 'तुरंत अलर्ट', s3d: 'सीमा पार होते ही परिवार के फ़ोन पर अलर्ट आता है।',
    s4t: 'जल्दी ढूँढें', s4d: 'मैप पर लाइव लोकेशन दिखती है।',
    privacy: 'सिर्फ़ परिवार की सहमति से इस्तेमाल होता है। लोकेशन की जानकारी निजी रहती है और कभी किसी से साझा नहीं की जाती। बैंड की सुविधाएँ डिवाइस सप्लायर के साथ तय की जाएँगी।',
    readyTitle: 'जानना चाहते हैं कि यह कब तैयार होगा?',
    readyText: 'हमें व्हाट्सऐप पर मैसेज भेजें। आपके इलाके में बैंड मिलते ही हम आपको बता देंगे।',
    readyBtn: 'तैयार होने पर मुझे बताएँ',
  },
  mr: {
    bookDementia: 'घरी डिमेन्शिया काळजी बुक करा',
    seoDesc: 'डिमेन्शिया असलेल्या व्यक्तींसाठी सेफ-झोन बँड, लवकरच Way2Cure वर. बँड घालणारी व्यक्ती सेफ झोनबाहेर गेल्यास कुटुंबाला अलर्ट मिळतो. फक्त संमतीनेच वापर.',
    eyebrow: 'लवकरच येत आहे · डिमेन्शिया (विस्मरणाचा आजार) काळजी',
    title: 'सेफ-झोन बँड',
    intro: 'डिमेन्शिया (विस्मरणाचा आजार) असलेल्या प्रियजनांची काळजी घेणाऱ्या कुटुंबांसाठी मनःशांती. झोनच्या आत: अलर्ट नाही. बाहेर गेल्यावर: लगेच अलर्ट.',
    artLabel: 'घराभोवती सेफ झोनचे तुटक रेषेचे वर्तुळ. वर्तुळाबाहेरील ठिपका कुटुंबाला अलर्ट पाठवतो.',
    artZone: 'सेफ झोन',
    artAlert: 'कुटुंबाला अलर्ट',
    s1t: 'सेफ झोन ठरवा', s1d: 'कुटुंब ॲपमध्ये घराभोवतीची सीमा ठरवते.',
    s2t: 'बँड घाला', s2d: 'हलका दंडावर घालायचा बँड, ज्यात लोकेशन ट्रॅकिंग आधीपासून आहे.',
    s3t: 'लगेच अलर्ट', s3d: 'सीमा ओलांडताच कुटुंबाच्या फोनवर अलर्ट येतो.',
    s4t: 'पटकन शोधा', s4d: 'नकाशावर लाइव्ह लोकेशन दिसते.',
    privacy: 'फक्त कुटुंबाच्या संमतीनेच वापरला जातो. लोकेशनची माहिती खाजगी राहते आणि कधीही कोणाशी शेअर केली जात नाही. बँडची वैशिष्ट्ये डिव्हाइस पुरवठादारासोबत निश्चित केली जातील.',
    readyTitle: 'हे कधी तयार होईल ते जाणून घ्यायचे आहे?',
    readyText: 'आम्हाला व्हॉट्सॲपवर मेसेज पाठवा. तुमच्या भागात बँड उपलब्ध होताच आम्ही तुम्हाला कळवू.',
    readyBtn: 'तयार झाल्यावर मला कळवा',
  },
};

export default function SafeZone() {
  const { t } = useLang();
  const tr = useT(T);
  const steps: Step[] = STEPS.map((k, i) => ({ title: tr(`${k}t`), text: tr(`${k}d`), colour: COLOURS[i] }));
  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} />
      <PageHeader title={tr('title')} lead={tr('intro')} crumbs={[{ label: t('home'), to: '/' }, { label: tr('title') }]}>
        <div className="flex flex-wrap items-center gap-4">
          <Tag kind="launch">{tr('eyebrow')}</Tag>
          <Button to="/care/dementia" variant="outline" compact><Icon name="memory" size={18} /> {tr('bookDementia')}</Button>
        </div>
      </PageHeader>

      <section className="py-10 md:py-14">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          {/* Simple flat diagram in brand colours; the words carry the meaning, not the colours. */}
          <svg viewBox="0 0 360 300" className="mx-auto w-full max-w-md" role="img" aria-label={tr('artLabel')}>
            <circle cx="150" cy="150" r="120" className="fill-mint stroke-sage" strokeWidth="4" strokeDasharray="14 10" />
            <text x="150" y="70" textAnchor="middle" className="fill-green" fontWeight="700" fontSize="18">{tr('artZone')}</text>
            <path d="M120 150 L150 122 L180 150 V190 H120 Z" className="fill-green" />
            <circle cx="105" cy="215" r="12" className="fill-sage stroke-white" strokeWidth="3" />
            <circle cx="310" cy="190" r="12" className="fill-terracotta-deep stroke-white" strokeWidth="3" />
            <rect x="250" y="120" width="104" height="32" rx="6" className="fill-terracotta-deep" />
            <text x="302" y="141" textAnchor="middle" className="fill-white" fontWeight="700" fontSize="14">{tr('artAlert')}</text>
          </svg>
          <StepList steps={steps} layout="column" />
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <InfoBand icon="lock" className="mb-10">{tr('privacy')}</InfoBand>
            <h2>{tr('readyTitle')}</h2>
            <p>{tr('readyText')}</p>
            <Button href={SITE.whatsappHref} external><Icon name="whatsapp" /> {tr('readyBtn')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
