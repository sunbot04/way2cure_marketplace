import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { InfoBand, PageHead, AppQR } from '../components/legacy-ui';
import { useLoc, useT } from '../i18n/LangContext';

// Time-of-day colours are the same in the app, website and printed sachets.
// Each one always has a word label, so it also works for colour-blind users.
// Medicine names stay in English, as printed on the sachet.
const TIMES = [
  {
    key: 'morning', label: 'Morning', time: '8 am', icon: 'sunrise', pills: ['Metformin 500 mg', 'Amlodipine 5 mg', 'Vitamin B12'],
    hi: { label: 'सुबह', time: 'सुबह 8 बजे' }, mr: { label: 'सकाळ', time: 'सकाळी 8 वाजता' },
  },
  {
    key: 'afternoon', label: 'Afternoon', time: '1 pm', icon: 'sun', pills: ['Calcium', 'Multivitamin'],
    hi: { label: 'दोपहर', time: 'दोपहर 1 बजे' }, mr: { label: 'दुपार', time: 'दुपारी 1 वाजता' },
  },
  {
    key: 'evening', label: 'Evening', time: '7 pm', icon: 'sunset', pills: ['Metformin 500 mg', 'Telmisartan 40 mg'],
    hi: { label: 'शाम', time: 'शाम 7 बजे' }, mr: { label: 'संध्याकाळ', time: 'संध्याकाळी 7 वाजता' },
  },
  {
    key: 'night', label: 'Night', time: '10 pm', icon: 'moon', pills: ['Atorvastatin 10 mg', 'Vitamin D3', 'Magnesium'],
    hi: { label: 'रात', time: 'रात 10 बजे' }, mr: { label: 'रात्र', time: 'रात्री 10 वाजता' },
  },
];

const FEATURES = [
  ['f1', 'var(--green)'],
  ['f2', 'var(--terracotta)'],
  ['f3', 'var(--mustard)'],
  ['f4', 'var(--sage)'],
];

const T = {
  en: {
    eyebrow: 'Subscriptions',
    title: 'Medicines in dose sachets',
    intro: 'Every dose packed in its own sachet, sorted from morning to night. Tear one, take the dose.',
    oneDay: 'One day of sachets',
    example: 'Example only. Your sachets follow your own prescription.',
    f1t: 'Sorted by time', f1d: 'Morning to night',
    f2t: 'Ready to take', f2d: 'Tear one, take the dose',
    f3t: 'Pay per dose', f3d: 'Only the doses you take',
    f4t: 'No full strips', f4d: 'No leftover medicine',
    packed: 'Packed by partner pharmacies under pharmacist supervision, from a verified prescription.',
    available: 'Available for suitable medicines. Subject to regulatory and labelling requirements.',
    howStart: 'How to start',
    s1a: 'Upload your prescription in the app and choose', s1b: 'Dose sachets', s1c: '.',
    s2: 'The pharmacist checks it and calls you to agree the timings.',
    s3: 'Your first month of sachets arrives at your door.',
    s4: 'We remind you before every refill. Pause or change anytime.',
    seeAll: 'See all subscriptions',
    startApp: 'Start in the app',
  },
  hi: {
    eyebrow: 'सब्सक्रिप्शन',
    title: 'डोज़ सैशे (दवा के पैकेट) में दवाइयाँ',
    intro: 'हर डोज़ अपने अलग सैशे में, सुबह से रात तक क्रम से। एक फाड़ें, दवा लें।',
    oneDay: 'एक दिन के सैशे',
    example: 'यह सिर्फ़ उदाहरण है। आपके सैशे आपके अपने पर्चे के हिसाब से बनेंगे।',
    f1t: 'समय के हिसाब से', f1d: 'सुबह से रात तक',
    f2t: 'लेने के लिए तैयार', f2d: 'एक फाड़ें, दवा लें',
    f3t: 'हर डोज़ का भुगतान', f3d: 'सिर्फ़ उन्हीं डोज़ का जो आप लेते हैं',
    f4t: 'पूरी स्ट्रिप नहीं', f4d: 'कोई दवा बेकार नहीं बचती',
    packed: 'हमारी पार्टनर फ़ार्मेसी, फ़ार्मासिस्ट की देखरेख में, जाँचे हुए पर्चे से पैक करती हैं।',
    available: 'उपयुक्त दवाइयों के लिए उपलब्ध। नियमों और लेबलिंग की शर्तों के अनुसार।',
    howStart: 'कैसे शुरू करें',
    s1a: 'ऐप में अपना पर्चा अपलोड करें और', s1b: 'डोज़ सैशे', s1c: ' चुनें।',
    s2: 'फ़ार्मासिस्ट पर्चा जाँचते हैं और समय तय करने के लिए आपको कॉल करते हैं।',
    s3: 'पहले महीने के सैशे आपके दरवाज़े तक पहुँचते हैं।',
    s4: 'हर रीफ़िल से पहले हम याद दिलाते हैं। जब चाहें रोकें या बदलें।',
    seeAll: 'सभी सब्सक्रिप्शन देखें',
    startApp: 'ऐप में शुरू करें',
  },
  mr: {
    eyebrow: 'सदस्यता',
    title: 'डोस सॅशे (औषधांची पाकिटे) मध्ये औषधे',
    intro: 'प्रत्येक डोस त्याच्या स्वतंत्र सॅशेमध्ये, सकाळपासून रात्रीपर्यंत क्रमाने. एक फाडा, डोस घ्या.',
    oneDay: 'एका दिवसाचे सॅशे',
    example: 'हे फक्त उदाहरण आहे. तुमचे सॅशे तुमच्या स्वतःच्या प्रिस्क्रिप्शननुसार बनतील.',
    f1t: 'वेळेनुसार लावलेले', f1d: 'सकाळपासून रात्रीपर्यंत',
    f2t: 'घ्यायला तयार', f2d: 'एक फाडा, डोस घ्या',
    f3t: 'प्रत्येक डोसचे पैसे', f3d: 'फक्त तुम्ही घेता त्या डोसचे',
    f4t: 'पूर्ण स्ट्रिप नाही', f4d: 'औषध वाया जात नाही',
    packed: 'आमच्या भागीदार फार्मसी, फार्मासिस्टच्या देखरेखीखाली, तपासलेल्या प्रिस्क्रिप्शनवरून पॅक करतात.',
    available: 'योग्य औषधांसाठी उपलब्ध. नियम आणि लेबलिंगच्या अटींनुसार.',
    howStart: 'सुरुवात कशी करायची',
    s1a: 'ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा आणि', s1b: 'डोस सॅशे', s1c: ' निवडा.',
    s2: 'फार्मासिस्ट ते तपासतात आणि वेळा ठरवण्यासाठी तुम्हाला कॉल करतात.',
    s3: 'पहिल्या महिन्याचे सॅशे तुमच्या दारात येतात.',
    s4: 'प्रत्येक रिफिलआधी आम्ही आठवण करून देतो. कधीही थांबवा किंवा बदला.',
    seeAll: 'सर्व सदस्यता पाहा',
    startApp: 'ॲपमध्ये सुरू करा',
  },
};

export default function DoseSachets() {
  const tr = useT(T);
  const loc = useLoc();
  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>

      <section className="section-sm">
        <div className="container">
          <h2>{tr('oneDay')}</h2>
          <p className="small muted">{tr('example')}</p>
          <div className="grid grid-4 dose-grid">
            {TIMES.map((slot) => {
              const t = loc(slot);
              return (
                <article key={t.key} className={`card dose dose-${t.key}`}>
                  <header className="dose-head">
                    <Icon name={t.icon} />
                    <strong>{t.label}</strong>
                    <span>{t.time}</span>
                  </header>
                  <ul>
                    {t.pills.map((p) => <li key={p}><Icon name="pill" size={18} /> {p}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="grid grid-4">
            {FEATURES.map(([k, c]) => (
              <div key={k} className="card card-edge-left feature" style={{ '--edge': c }}>
                <h3>{tr(`${k}t`)}</h3>
                <p>{tr(`${k}d`)}</p>
              </div>
            ))}
          </div>
          <InfoBand icon="verified">{tr('packed')}</InfoBand>
          <p className="small muted">{tr('available')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>{tr('howStart')}</h2>
            <ol className="number-list">
              <li>{tr('s1a')} <strong>{tr('s1b')}</strong>{tr('s1c')}</li>
              <li>{tr('s2')}</li>
              <li>{tr('s3')}</li>
              <li>{tr('s4')}</li>
            </ol>
            <Link to="/subscriptions" className="text-link">{tr('seeAll')} <Icon name="arrow" size={18} /></Link>
          </div>
          <AppQR title={tr('startApp')} />
        </div>
      </section>
    </>
  );
}
