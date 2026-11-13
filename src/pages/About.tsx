import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent from '../components/ui/Accent';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import CountUp from '../components/motion/CountUp';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { team } from '../data';
import { SITE } from '../config/site';
import { useLoc, useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
  en: {
    eyebrow: 'About Way2Cure',
    title: 'We bring the heart of healthcare *home.*',
    intro: 'Way2Cure was founded to bridge the gap between hospitals and home care. Today we are growing into one place for care, medicines and everything seniors need.',
    missionQuote: 'Your Health, Our Mission.',
    missionText: 'Professional nursing, elder care and doctor visits, delivered at home by trained, background-checked people.',
    visionQuote: 'Your Comfort, Our Vision.',
    visionText: 'Care that respects the dignity and independence of seniors, with simple ordering for the families who look after them.',
    statText: 'patients cared for at home across Mumbai, Navi Mumbai and Thane.',
    statNote: 'Every one of them looked after by a real nurse, caretaker or doctor, not an app.',
    diffTitle: 'Hospital-trained people, *at home.*',
    diffLead: 'Care at home works when the people are right. That is where we start.',
    f1Title: 'Experienced, certified professionals',
    f1Text: 'Nurses and caretakers with home healthcare and hospital experience.',
    f2Title: '24/7 support',
    f2Text: 'Call {phone} any time. A real person answers.',
    f3Title: 'Personalised care plans',
    f3Text: 'Every plan starts with what the patient and family need.',
    photoAlt: 'A Way2Cure nurse at work',
    valuesTitle: 'Four promises we *keep.*',
    v1Title: 'Caring', v1Text: 'Warm and human, never clinical or cold.',
    v2Title: 'Trustworthy', v2Text: 'Verified people, licensed pharmacies, honest prices.',
    v3Title: 'Simple', v3Text: 'One tap, one step, plain words. Or just call us.',
    v4Title: 'Dignified', v4Text: 'We respect the independence of every senior we care for.',
    team: 'The people *behind* Way2Cure',
    teamLead: 'Doctors and care managers who run Way2Cure day to day.',
    areasTitle: 'Home care near *you.*',
    areasText: 'Our nursing and elder care teams work across these areas. Each has its own page on the Way2Cure home care site.',
    homeCareIn: 'Home care in {place}',
    areaCta: 'Talk to our care team',
    seoDesc: 'Way2Cure brings nursing, elder care, doctor visits and medicines home across Mumbai, Navi Mumbai and Thane. Meet the team.',
  },
  hi: {
    eyebrow: 'Way2Cure के बारे में',
    title: 'हम अच्छी देखभाल को *आपके घर* तक लाते हैं',
    intro: 'Way2Cure की शुरुआत अस्पताल और घर की देखभाल के बीच की दूरी कम करने के लिए हुई थी। आज हम देखभाल, दवाइयों और बुज़ुर्गों की हर ज़रूरत के लिए एक ही जगह बन रहे हैं।',
    missionQuote: 'आपकी सेहत, हमारा मिशन।',
    missionText: 'प्रशिक्षित और जाँचे-परखे लोगों द्वारा घर पर प्रोफ़ेशनल नर्सिंग, बुज़ुर्गों की देखभाल और डॉक्टर विज़िट।',
    visionQuote: 'आपका आराम, हमारा सपना।',
    visionText: 'ऐसी देखभाल जो बुज़ुर्गों के सम्मान और आत्मनिर्भरता का ख़याल रखे, और उनकी देखभाल करने वाले परिवारों के लिए ऑर्डर करना आसान बनाए।',
    statText: 'मरीज़ों की घर पर देखभाल, मुंबई, नवी मुंबई और ठाणे में।',
    statNote: 'हर एक की देखभाल किसी असली नर्स, केयरटेकर या डॉक्टर ने की, किसी ऐप ने नहीं।',
    diffTitle: 'अस्पताल में प्रशिक्षित लोग, *घर पर।*',
    diffLead: 'घर पर देखभाल तभी अच्छी होती है जब लोग सही हों। हम वहीं से शुरू करते हैं।',
    f1Title: 'अनुभवी, सर्टिफ़ाइड प्रोफ़ेशनल',
    f1Text: 'होम हेल्थकेयर और अस्पताल का अनुभव रखने वाली नर्सें और केयरटेकर।',
    f2Title: '24/7 मदद',
    f2Text: 'कभी भी {phone} पर कॉल करें। आपसे एक असली इंसान बात करेगा।',
    f3Title: 'आपके हिसाब से देखभाल प्लान',
    f3Text: 'हर प्लान मरीज़ और परिवार की ज़रूरत से शुरू होता है।',
    photoAlt: 'काम पर Way2Cure की एक नर्स',
    valuesTitle: 'चार वादे जो हम *निभाते हैं।*',
    v1Title: 'परवाह', v1Text: 'अपनापन और इंसानियत, कभी रूखापन नहीं।',
    v2Title: 'भरोसा', v2Text: 'जाँचे-परखे लोग, लाइसेंस वाली फ़ार्मेसी, साफ़ दाम।',
    v3Title: 'आसान', v3Text: 'एक टैप, एक कदम, सीधे शब्द। या बस हमें कॉल करें।',
    v4Title: 'सम्मान', v4Text: 'हम हर बुज़ुर्ग की आत्मनिर्भरता का सम्मान करते हैं।',
    team: 'Way2Cure के *पीछे* के लोग',
    teamLead: 'डॉक्टर और केयर मैनेजर जो रोज़ Way2Cure चलाते हैं।',
    areasTitle: 'आपके पास *घर पर देखभाल।*',
    areasText: 'हमारी नर्सिंग और बुज़ुर्ग देखभाल टीमें इन इलाकों में काम करती हैं। हर इलाके का Way2Cure होम केयर साइट पर अपना पेज है।',
    homeCareIn: '{place} में घर पर देखभाल',
    areaCta: 'हमारी केयर टीम से बात करें',
    seoDesc: 'Way2Cure मुंबई, नवी मुंबई और ठाणे में नर्सिंग, बुज़ुर्गों की देखभाल, डॉक्टर विज़िट और दवाइयाँ घर तक लाता है। हमारी टीम से मिलें।',
  },
  mr: {
    eyebrow: 'Way2Cure बद्दल',
    title: 'आम्ही चांगली काळजी *तुमच्या घरापर्यंत* आणतो',
    intro: 'हॉस्पिटल आणि घरची काळजी यांच्यातील अंतर कमी करण्यासाठी Way2Cure ची सुरुवात झाली. आज आम्ही काळजी, औषधे आणि ज्येष्ठांना लागणाऱ्या सर्व गोष्टींसाठी एकच ठिकाण बनत आहोत.',
    missionQuote: 'तुमचे आरोग्य, आमचे ध्येय.',
    missionText: 'प्रशिक्षित आणि पार्श्वभूमी तपासलेल्या लोकांकडून घरी प्रोफेशनल नर्सिंग, ज्येष्ठांची काळजी आणि डॉक्टर व्हिजिट.',
    visionQuote: 'तुमचा आराम, आमचे स्वप्न.',
    visionText: 'ज्येष्ठांचा सन्मान आणि स्वावलंबन जपणारी काळजी, आणि त्यांची काळजी घेणाऱ्या कुटुंबांसाठी सोपी ऑर्डर.',
    statText: 'रुग्णांची घरी काळजी, मुंबई, नवी मुंबई आणि ठाणे येथे.',
    statNote: 'प्रत्येकाची काळजी खऱ्या नर्स, केअरटेकर किंवा डॉक्टरने घेतली, ॲपने नाही.',
    diffTitle: 'हॉस्पिटलमध्ये प्रशिक्षित माणसे, *घरी.*',
    diffLead: 'माणसे योग्य असतील तरच घरची काळजी चांगली होते. आम्ही तिथूनच सुरुवात करतो.',
    f1Title: 'अनुभवी, प्रमाणित प्रोफेशनल',
    f1Text: 'होम हेल्थकेअर आणि हॉस्पिटलचा अनुभव असलेल्या नर्स आणि केअरटेकर.',
    f2Title: '24/7 मदत',
    f2Text: 'कधीही {phone} वर कॉल करा. तुमच्याशी खरी व्यक्ती बोलेल.',
    f3Title: 'तुमच्या गरजेनुसार काळजी योजना',
    f3Text: 'प्रत्येक योजना रुग्ण आणि कुटुंबाच्या गरजेपासून सुरू होते.',
    photoAlt: 'कामावर असलेली Way2Cure ची नर्स',
    valuesTitle: 'चार वचने जी आम्ही *पाळतो.*',
    v1Title: 'आपुलकी', v1Text: 'माणुसकी आणि जिव्हाळा, कधीही कोरडेपणा नाही.',
    v2Title: 'विश्वास', v2Text: 'पडताळलेली माणसे, परवानाधारक फार्मसी, स्पष्ट किंमती.',
    v3Title: 'सोपे', v3Text: 'एक टॅप, एक पायरी, साधे शब्द. किंवा फक्त आम्हाला कॉल करा.',
    v4Title: 'सन्मान', v4Text: 'आम्ही प्रत्येक ज्येष्ठ व्यक्तीच्या स्वावलंबनाचा आदर करतो.',
    team: 'Way2Cure *मागची* माणसे',
    teamLead: 'Way2Cure रोज चालवणारे डॉक्टर आणि केअर मॅनेजर.',
    areasTitle: 'तुमच्या जवळ *घरी काळजी.*',
    areasText: 'आमच्या नर्सिंग आणि ज्येष्ठ काळजी टीम या भागांत काम करतात. प्रत्येक भागाचे Way2Cure होम केअर साइटवर स्वतंत्र पान आहे.',
    homeCareIn: '{place} मध्ये घरी काळजी',
    areaCta: 'आमच्या केअर टीमशी बोला',
    seoDesc: 'Way2Cure मुंबई, नवी मुंबई आणि ठाण्यात नर्सिंग, ज्येष्ठांची काळजी, डॉक्टर व्हिजिट आणि औषधे घरपोच देते. आमच्या टीमला भेटा.',
  },
};

const initials = (name: string) => name.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('');

const DIFF = [['userCheck', 'f1'], ['support', 'f2'], ['stethoscope', 'f3']] as const;
const VALUES = [['handHeart', 'v1'], ['verified', 'v2'], ['check', 'v3'], ['users', 'v4']] as const;

function Heading({ title, lead, className = '' }: { title: string; lead?: string; className?: string }) {
  return (
    <Reveal className={className}>
      <h2 className="mb-4 text-section"><Accent text={title} /></h2>
      {lead && <p className="m-0 text-lead text-ink/75">{lead}</p>}
    </Reveal>
  );
}

export default function About() {
  const tr = useT(T);
  const loc = useLoc();
  return (
    <>
      <Seo title={tr('eyebrow')} description={tr('seoDesc')} />
      <PageHeader
        image={{ src: '/images/team-group.webp', position: 'center 30%' }}
        title={tr('title')}
        lead={tr('intro')}
      />

      {/* Mission & vision beside the one confirmed number */}
      <section className="section bg-white">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Stagger className="grid gap-10">
            {(['mission', 'vision'] as const).map((k) => (
              <StaggerItem key={k}>
                <p className="mb-3 font-head text-h2m font-bold leading-tight text-green md:text-h2">{tr(`${k}Quote`)}</p>
                <p className="m-0 text-ink/80">{tr(`${k}Text`)}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="rounded-panel bg-green p-8 text-white md:p-10">
            <p className="m-0 font-head text-[clamp(3.25rem,2rem+4vw,5rem)] font-bold leading-none text-mustard">
              <CountUp to={15000} suffix="+" />
            </p>
            <p className="mb-4 mt-3 font-head text-h3m font-bold leading-snug text-white md:text-h3">{tr('statText')}</p>
            <p className="m-0 text-base text-mint">{tr('statNote')}</p>
          </Reveal>
        </div>
      </section>

      {/* What makes us different, beside a real photo */}
      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="group overflow-hidden rounded-panel shadow-card">
            <img
              src="/images/nurse-portrait.webp"
              alt={tr('photoAlt')}
              width={900}
              height={600}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover object-[60%_center] transition-transform duration-slow ease-soft group-hover:scale-[1.03]"
            />
          </Reveal>
          <div>
            <Heading title={tr('diffTitle')} lead={tr('diffLead')} className="mb-8" />
            <Stagger as="ul" className="grid gap-5">
              {DIFF.map(([icon, k]) => (
                <StaggerItem as="li" key={k} className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name={icon} size={24} /></span>
                  <span className="grid gap-1">
                    <strong className="text-body text-green">{tr(`${k}Title`)}</strong>
                    <span className="text-base text-ink/80">{tr(`${k}Text`, { phone: SITE.phone })}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Values (brand personality, guidelines p.2) */}
      <section className="section bg-mist">
        <div className="container">
          <Heading title={tr('valuesTitle')} className="mb-8 md:mb-12 max-w-2xl" />
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([icon, k]) => (
              <StaggerItem as="li" key={k} className="rounded-tile border border-mint bg-white p-6 transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-1 hover:shadow-raised">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-btn bg-mist text-green"><Icon name={icon} size={24} /></span>
                <h3 className="mb-2 text-h3m">{tr(`${k}Title`)}</h3>
                <p className="m-0 text-base text-grey">{tr(`${k}Text`)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team: real headshots */}
      <section className="section bg-white">
        <div className="container">
          <Heading title={tr('team')} lead={tr('teamLead')} className="mb-8 md:mb-12 max-w-2xl" />
          <Stagger as="ul" className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {team.map((member) => {
              const mem = loc(member);
              return (
                <StaggerItem as="li" key={member.name} className="group">
                  <div className="mb-4 overflow-hidden rounded-panel bg-cream shadow-card transition-[transform,box-shadow] duration-micro ease-soft group-hover:-translate-y-1 group-hover:shadow-raised">
                    {member.photo ? (
                      <img src={member.photo} alt="" loading="lazy" width={240} height={300}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-slow ease-soft group-hover:scale-[1.03]" />
                    ) : (
                      <span aria-hidden="true" className="grid aspect-[4/5] w-full place-items-center bg-mint font-head text-h2 font-bold text-green">
                        {initials(member.name)}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1 text-h3m">{member.name}</h3>
                  <p className="m-0 text-base text-grey">{mem.role}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Home care areas: links to the existing location pages */}
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Heading title={tr('areasTitle')} lead={tr('areasText')} className="mb-8" />
            <Reveal><Button to="/contact">{tr('areaCta')} <Icon name="arrow" size={18} /></Button></Reveal>
          </div>
          <Stagger as="ul" className="grid gap-3">
            {SITE.homeCareLocations.map((l) => (
              <StaggerItem as="li" key={l.name}>
                <a href={l.href} className="group flex min-h-[4.5rem] items-center gap-4 rounded-tile border border-line bg-white px-5 py-4 text-ink no-underline transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-0.5 hover:shadow-raised">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name="pin" size={22} /></span>
                  <strong className="flex-1 text-body text-green">{tr('homeCareIn', { place: l.name })}</strong>
                  <Icon name="external" size={18} className="text-terracotta-deep" />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
