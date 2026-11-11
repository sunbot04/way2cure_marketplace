import Icon from '../components/Icon';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import SectionHeading from '../components/ui/SectionHeading';
import TrustStrip from '../components/trust/TrustStrip';
import { team } from '../data';
import { SITE } from '../config/site';
import { useLoc, useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
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
    seoDesc: 'Way2Cure brings nursing, elder care, doctor visits and medicines home across Mumbai, Navi Mumbai and Thane. Meet the team.',
    teamLead: 'Doctors and care managers who run Way2Cure day to day.',
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
    seoDesc: 'Way2Cure मुंबई, नवी मुंबई और ठाणे में नर्सिंग, बुज़ुर्गों की देखभाल, डॉक्टर विज़िट और दवाइयाँ घर तक लाता है। हमारी टीम से मिलें।',
    teamLead: 'डॉक्टर और केयर मैनेजर जो रोज़ Way2Cure चलाते हैं।',
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
    seoDesc: 'Way2Cure मुंबई, नवी मुंबई आणि ठाण्यात नर्सिंग, ज्येष्ठांची काळजी, डॉक्टर व्हिजिट आणि औषधे घरपोच देते. आमच्या टीमला भेटा.',
    teamLead: 'Way2Cure रोज चालवणारे डॉक्टर आणि केअर मॅनेजर.',
  },
};

const initials = (name: string) => name.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('');

export default function About() {
  const tr = useT(T);
  const loc = useLoc();
  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} />
      <PageHeader image={{ src: '/images/team-group.webp', position: 'center 30%' }} title={tr('title')} lead={tr('intro')} />

      {/* Mission and vision side by side as two statements, not two matching cards */}
      <section className="py-14 md:py-20">
        <div className="container grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-mint">
          {(['mission', 'vision'] as const).map((k, i) => (
            <div key={k} className={i === 0 ? 'md:pr-10' : 'md:pl-10'}>
              <h2 className="mb-3">{tr(`${k}Quote`)}</h2>
              <p className="m-0"><strong className="text-green">{tr(k)}:</strong> {tr(`${k}Text`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2>{tr('different')}</h2>
          <ul className="grid gap-6">
            {[
              ['userCheck', 'f1'],
              ['support', 'f2'],
              ['stethoscope', 'f3'],
            ].map(([icon, k]) => (
              <li key={k} className="flex items-start gap-4 border-b border-mint pb-6 last:border-0 last:pb-0">
                <Icon name={icon} size={32} className="mt-1 shrink-0 text-terracotta-deep" />
                <div>
                  <h3>{tr(`${k}Title`)}</h3>
                  <p className="m-0">{tr(`${k}Text`, { phone: SITE.phone })}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <SectionHeading title={tr('team')} lead={tr('teamLead')} />
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {team.map((member) => {
              const m = loc(member);
              return (
                <li key={member.name}>
                  {member.photo ? (
                    <img src={member.photo} alt="" loading="lazy" width={240} height={300}
                      className="mb-3 aspect-[4/5] w-full rounded-card bg-cream object-cover" />
                  ) : (
                    <span aria-hidden="true" className="mb-3 grid aspect-[4/5] w-full place-items-center rounded-card bg-mint font-head text-h2 font-bold text-green">
                      {initials(member.name)}
                    </span>
                  )}
                  <h3 className="mb-1">{member.name}</h3>
                  <p className="m-0 text-base text-grey">{m.role}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
