import { InfoBand, PageHead } from '../components/legacy-ui';
import Icon from '../components/Icon';
import { SITE } from '../config/site';
import { useT } from '../i18n/LangContext';

const STEPS = ['s1', 's2', 's3', 's4'];

const T = {
  en: {
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
  const tr = useT(T);
  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>
      <section className="section-sm">
        <div className="container two-col">
          <svg viewBox="0 0 360 300" className="safezone-art" role="img" aria-label={tr('artLabel')}>
            <circle cx="150" cy="150" r="120" fill="#C8D8D5" stroke="#70A9A1" strokeWidth="4" strokeDasharray="14 10" />
            <text x="150" y="70" textAnchor="middle" fill="#114D4A" fontWeight="700" fontSize="18">{tr('artZone')}</text>
            <path d="M120 150 L150 122 L180 150 V190 H120 Z" fill="#114D4A" />
            <circle cx="105" cy="215" r="12" fill="#70A9A1" stroke="#fff" strokeWidth="3" />
            <circle cx="310" cy="190" r="12" fill="#B8472A" stroke="#fff" strokeWidth="3" />
            <rect x="250" y="120" width="104" height="32" rx="6" fill="#B8472A" />
            <text x="302" y="141" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">{tr('artAlert')}</text>
          </svg>
          <ol className="number-list big">
            {STEPS.map((k) => (
              <li key={k}><strong>{tr(`${k}t`)}</strong><span>{tr(`${k}d`)}</span></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section-white">
        <div className="container narrow">
          <InfoBand icon="lock">{tr('privacy')}</InfoBand>
          <h2>{tr('readyTitle')}</h2>
          <p>{tr('readyText')}</p>
          <a className="btn btn-primary" href={SITE.whatsappHref} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> {tr('readyBtn')}</a>
        </div>
      </section>
    </>
  );
}
