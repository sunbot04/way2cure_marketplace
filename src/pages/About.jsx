import { team } from '../data/content.js';
import { PageHead, TrustStrip } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { SITE } from '../config/site.js';
import { useLoc, useT } from '../context/LangContext.jsx';

const T = {
  en: {
    eyebrow: 'About Way2Cure',
    title: 'We bring the heart of healthcare home',
    intro: 'Way2Cure was founded to bridge the gap between hospitals and home care. Today we are growing into one place for care, medicines and everything seniors need.',
    mission: 'Our mission',
    missionQuote: 'Your Health, Our Mission.',
    missionText: 'Professional nursing, elder care and doctor visits, delivered at home by trained, background-checked people.',
    vision: 'Our vision',
    visionQuote: 'Your Comfort, Our Vision.',
    visionText: 'Care that respects the dignity and independence of seniors, with simple ordering for the families who look after them.',
    different: 'What makes us different',
    f1Title: 'Experienced, certified professionals',
    f1Text: 'Nurses and caretakers with home healthcare and hospital experience.',
    f2Title: '24/7 support',
    f2Text: 'Call {phone} any time. A real person answers.',
    f3Title: 'Personalised care plans',
    f3Text: 'Every plan starts with what the patient and family need.',
    team: 'Our team',
  },
  hi: {
    eyebrow: 'Way2Cure के बारे में',
    title: 'हम अच्छी देखभाल को आपके घर तक लाते हैं',
    intro: 'Way2Cure की शुरुआत अस्पताल और घर की देखभाल के बीच की दूरी कम करने के लिए हुई थी। आज हम देखभाल, दवाइयों और बुज़ुर्गों की हर ज़रूरत के लिए एक ही जगह बन रहे हैं।',
    mission: 'हमारा मिशन',
    missionQuote: 'आपकी सेहत, हमारा मिशन।',
    missionText: 'प्रशिक्षित और जाँचे-परखे लोगों द्वारा घर पर प्रोफ़ेशनल नर्सिंग, बुज़ुर्गों की देखभाल और डॉक्टर विज़िट।',
    vision: 'हमारा सपना',
    visionQuote: 'आपका आराम, हमारा सपना।',
    visionText: 'ऐसी देखभाल जो बुज़ुर्गों के सम्मान और आत्मनिर्भरता का ख़याल रखे, और उनकी देखभाल करने वाले परिवारों के लिए ऑर्डर करना आसान बनाए।',
    different: 'हम अलग क्यों हैं',
    f1Title: 'अनुभवी, सर्टिफ़ाइड प्रोफ़ेशनल',
    f1Text: 'होम हेल्थकेयर और अस्पताल का अनुभव रखने वाली नर्सें और केयरटेकर।',
    f2Title: '24/7 मदद',
    f2Text: 'कभी भी {phone} पर कॉल करें। आपसे एक असली इंसान बात करेगा।',
    f3Title: 'आपके हिसाब से देखभाल प्लान',
    f3Text: 'हर प्लान मरीज़ और परिवार की ज़रूरत से शुरू होता है।',
    team: 'हमारी टीम',
  },
  mr: {
    eyebrow: 'Way2Cure बद्दल',
    title: 'आम्ही चांगली काळजी तुमच्या घरापर्यंत आणतो',
    intro: 'हॉस्पिटल आणि घरची काळजी यांच्यातील अंतर कमी करण्यासाठी Way2Cure ची सुरुवात झाली. आज आम्ही काळजी, औषधे आणि ज्येष्ठांना लागणाऱ्या सर्व गोष्टींसाठी एकच ठिकाण बनत आहोत.',
    mission: 'आमचे ध्येय',
    missionQuote: 'तुमचे आरोग्य, आमचे ध्येय.',
    missionText: 'प्रशिक्षित आणि पार्श्वभूमी तपासलेल्या लोकांकडून घरी प्रोफेशनल नर्सिंग, ज्येष्ठांची काळजी आणि डॉक्टर व्हिजिट.',
    vision: 'आमचे स्वप्न',
    visionQuote: 'तुमचा आराम, आमचे स्वप्न.',
    visionText: 'ज्येष्ठांचा सन्मान आणि स्वावलंबन जपणारी काळजी, आणि त्यांची काळजी घेणाऱ्या कुटुंबांसाठी सोपी ऑर्डर.',
    different: 'आम्ही वेगळे का आहोत',
    f1Title: 'अनुभवी, प्रमाणित प्रोफेशनल',
    f1Text: 'होम हेल्थकेअर आणि हॉस्पिटलचा अनुभव असलेल्या नर्स आणि केअरटेकर.',
    f2Title: '24/7 मदत',
    f2Text: 'कधीही {phone} वर कॉल करा. तुमच्याशी खरी व्यक्ती बोलेल.',
    f3Title: 'तुमच्या गरजेनुसार काळजी योजना',
    f3Text: 'प्रत्येक योजना रुग्ण आणि कुटुंबाच्या गरजेपासून सुरू होते.',
    team: 'आमची टीम',
  },
};

export default function About() {
  const tr = useT(T);
  const loc = useLoc();
  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>
      <section className="section-sm">
        <div className="container grid grid-2">
          <div className="card card-edge-top" style={{ '--edge': 'var(--green)' }}>
            <h2 className="h3">{tr('mission')}</h2>
            <p className="quote">{tr('missionQuote')}</p>
            <p>{tr('missionText')}</p>
          </div>
          <div className="card card-edge-top" style={{ '--edge': 'var(--terracotta)' }}>
            <h2 className="h3">{tr('vision')}</h2>
            <p className="quote">{tr('visionQuote')}</p>
            <p>{tr('visionText')}</p>
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <h2>{tr('different')}</h2>
          <div className="grid grid-3">
            {[
              ['userCheck', 'f1'],
              ['support', 'f2'],
              ['stethoscope', 'f3'],
            ].map(([i, k]) => (
              <div key={k} className="feature-plain">
                <Icon name={i} size={32} />
                <h3>{tr(`${k}Title`)}</h3>
                <p>{tr(`${k}Text`, { phone: SITE.phone })}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>{tr('team')}</h2>
          <div className="grid grid-4">
            {team.map((member) => {
              const m = loc(member);
              return (
                <div key={member.name} className="card team-card">
                  <span className="avatar" aria-hidden="true">{member.name.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  <h3>{member.name}</h3>
                  <p className="small">{m.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <TrustStrip />
    </>
  );
}
