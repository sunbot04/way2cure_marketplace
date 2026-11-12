import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent, { Eyebrow } from '../components/ui/Accent';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import DoseDay, { type DoseSlot } from '../components/plans/DoseDay';
import SachetExplorer from '../components/brand/SachetExplorer';
import AppPanel from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { useLang, useT, type Dict } from '../i18n/LangContext';

// Dose sachets (pitch deck p.8). Time-of-day colours and labels are the same as in the app and on
// printed sachets (guidelines p.13), always with a word. Medicine names stay as printed on the sachet.
const EXAMPLE_DAY: Record<DoseSlot, string[]> = {
  morning: ['Metformin 500 mg', 'Amlodipine 5 mg', 'Vitamin B12'],
  afternoon: ['Calcium', 'Multivitamin'],
  evening: ['Metformin 500 mg', 'Telmisartan 40 mg'],
  night: ['Atorvastatin 10 mg', 'Vitamin D3', 'Magnesium'],
};

const FEATURES: [string, string][] = [['f1', 'clock'], ['f2', 'package'], ['f3', 'check'], ['f4', 'refresh']];

const KEY: { cls: string; k: DoseSlot }[] = [
  { cls: 'bg-dose-morning text-green', k: 'morning' },
  { cls: 'bg-dose-afternoon text-green', k: 'afternoon' },
  { cls: 'bg-dose-evening text-white', k: 'evening' },
  { cls: 'bg-dose-night text-white', k: 'night' },
];

const T: Dict = {
  en: {
    seoDesc: 'Every dose packed in its own sachet, sorted morning to night by partner pharmacies under pharmacist supervision. Pay only for the doses you take.',
    crumb: 'Subscriptions',
    title: 'Medicines in dose sachets',
    h1: 'Every dose, *in its own sachet.*',
    eyebrow: 'Dose sachets',
    intro: 'Your medicines sorted from morning to night and sealed one dose to a sachet. Tear one, take the dose.',
    startApp: 'Start in the app',
    tear: 'Tear one, take the dose.',
    exploreEyebrow: 'Look inside', exploreTitle: 'One day, *four sachets.*',
    exploreText: 'Each sachet is printed with the name, the time and every medicine inside, so a missed dose is easy to spot.',
    colours: 'The same four colours on the app, the website and the printed sachet, always with the word:',
    morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', night: 'Night',
    sachetTabs: 'Choose a time of day',
    oneDay: 'A full day, at a glance',
    example: 'Example only. Your sachets follow your own prescription.',
    whyEyebrow: 'Why families choose sachets', whyTitle: 'No more *counting tablets.*',
    f1t: 'Sorted by time', f1d: 'Morning to night, in the order you take them.',
    f2t: 'Ready to take', f2d: 'Tear one, take the dose. Nothing to cut or count.',
    f3t: 'Pay per dose', f3d: 'Only the doses you take, not full strips.',
    f4t: 'Refills on time', f4d: 'We remind you 3 days before your sachets run out.',
    packed: 'Packed by partner pharmacies under pharmacist supervision, from a verified prescription.',
    available: 'Available for suitable medicines. Subject to regulatory and labelling requirements.',
    howEyebrow: 'Getting started', howStart: 'How to *start.*',
    s1a: 'Upload your prescription in the app and choose', s1b: 'Dose sachets', s1c: '.',
    s2: 'The pharmacist checks it and calls you to agree the timings.',
    s3: 'Your first month of sachets arrives at your door.',
    s4: 'We remind you before every refill. Pause or change anytime.',
    seeAll: 'See all subscriptions',
  },
  hi: {
    seoDesc: 'हर डोज़ अपने अलग सैशे में, सुबह से रात तक क्रम से, फ़ार्मासिस्ट की देखरेख में पार्टनर फ़ार्मेसी द्वारा पैक। सिर्फ़ उन्हीं डोज़ का भुगतान जो आप लेते हैं।',
    crumb: 'सब्सक्रिप्शन',
    title: 'डोज़ सैशे में दवाइयाँ',
    h1: 'हर डोज़, *उसके अपने सैशे में।*',
    eyebrow: 'डोज़ सैशे',
    intro: 'आपकी दवाइयाँ सुबह से रात तक क्रम से, हर डोज़ एक सैशे में बंद। एक फाड़ें, डोज़ लें।',
    startApp: 'ऐप में शुरू करें',
    tear: 'एक फाड़ें, डोज़ लें।',
    exploreEyebrow: 'अंदर देखें', exploreTitle: 'एक दिन, *चार सैशे।*',
    exploreText: 'हर सैशे पर नाम, समय और अंदर की हर दवा छपी होती है, ताकि छूटी डोज़ आसानी से दिखे।',
    colours: 'ऐप, वेबसाइट और छपे सैशे पर वही चार रंग, हमेशा शब्द के साथ:',
    morning: 'सुबह', afternoon: 'दोपहर', evening: 'शाम', night: 'रात',
    sachetTabs: 'दिन का समय चुनें',
    oneDay: 'पूरा दिन, एक नज़र में',
    example: 'यह सिर्फ़ उदाहरण है। आपके सैशे आपके अपने पर्चे के हिसाब से बनेंगे।',
    whyEyebrow: 'परिवार सैशे क्यों चुनते हैं', whyTitle: 'अब *गोलियाँ गिनना नहीं।*',
    f1t: 'समय के हिसाब से', f1d: 'सुबह से रात तक, उसी क्रम में जिसमें आप लेते हैं।',
    f2t: 'लेने के लिए तैयार', f2d: 'एक फाड़ें, डोज़ लें। काटना या गिनना नहीं।',
    f3t: 'हर डोज़ का भुगतान', f3d: 'सिर्फ़ उन्हीं डोज़ का जो आप लेते हैं, पूरी स्ट्रिप का नहीं।',
    f4t: 'समय पर रीफ़िल', f4d: 'सैशे ख़त्म होने से 3 दिन पहले हम याद दिलाते हैं।',
    packed: 'हमारी पार्टनर फ़ार्मेसी, फ़ार्मासिस्ट की देखरेख में, जाँचे हुए पर्चे से पैक करती हैं।',
    available: 'उपयुक्त दवाइयों के लिए उपलब्ध। नियमों और लेबलिंग की शर्तों के अनुसार।',
    howEyebrow: 'शुरुआत', howStart: 'कैसे *शुरू करें।*',
    s1a: 'ऐप में अपना पर्चा अपलोड करें और', s1b: 'डोज़ सैशे', s1c: ' चुनें।',
    s2: 'फ़ार्मासिस्ट पर्चा जाँचते हैं और समय तय करने के लिए आपको कॉल करते हैं।',
    s3: 'पहले महीने के सैशे आपके दरवाज़े तक पहुँचते हैं।',
    s4: 'हर रीफ़िल से पहले हम याद दिलाते हैं। जब चाहें रोकें या बदलें।',
    seeAll: 'सभी सब्सक्रिप्शन देखें',
  },
  mr: {
    seoDesc: 'प्रत्येक डोस स्वतंत्र सॅशेमध्ये, सकाळपासून रात्रीपर्यंत क्रमाने, फार्मासिस्टच्या देखरेखीखाली भागीदार फार्मसीकडून पॅक. फक्त तुम्ही घेता त्या डोसचे पैसे.',
    crumb: 'सदस्यता',
    title: 'डोस सॅशेमध्ये औषधे',
    h1: 'प्रत्येक डोस, *त्याच्या स्वतःच्या सॅशेमध्ये.*',
    eyebrow: 'डोस सॅशे',
    intro: 'तुमची औषधे सकाळपासून रात्रीपर्यंत क्रमाने, प्रत्येक डोस एका सॅशेमध्ये बंद. एक फाडा, डोस घ्या.',
    startApp: 'ॲपमध्ये सुरू करा',
    tear: 'एक फाडा, डोस घ्या.',
    exploreEyebrow: 'आत पाहा', exploreTitle: 'एक दिवस, *चार सॅशे.*',
    exploreText: 'प्रत्येक सॅशेवर नाव, वेळ आणि आतील प्रत्येक औषध छापलेले असते, म्हणजे राहिलेला डोस सहज दिसतो.',
    colours: 'ॲप, वेबसाइट आणि छापील सॅशेवर तेच चार रंग, नेहमी शब्दासोबत:',
    morning: 'सकाळ', afternoon: 'दुपार', evening: 'संध्याकाळ', night: 'रात्र',
    sachetTabs: 'दिवसाची वेळ निवडा',
    oneDay: 'संपूर्ण दिवस, एका नजरेत',
    example: 'हे फक्त उदाहरण आहे. तुमचे सॅशे तुमच्या स्वतःच्या प्रिस्क्रिप्शननुसार बनतील.',
    whyEyebrow: 'कुटुंबे सॅशे का निवडतात', whyTitle: 'आता *गोळ्या मोजायच्या नाहीत.*',
    f1t: 'वेळेनुसार लावलेले', f1d: 'सकाळपासून रात्रीपर्यंत, तुम्ही घेता त्याच क्रमाने.',
    f2t: 'घ्यायला तयार', f2d: 'एक फाडा, डोस घ्या. कापणे किंवा मोजणे नाही.',
    f3t: 'प्रत्येक डोसचे पैसे', f3d: 'फक्त तुम्ही घेता त्या डोसचे, पूर्ण स्ट्रिपचे नाही.',
    f4t: 'वेळेवर रिफिल', f4d: 'सॅशे संपण्याच्या 3 दिवस आधी आम्ही आठवण करून देतो.',
    packed: 'आमच्या भागीदार फार्मसी, फार्मासिस्टच्या देखरेखीखाली, तपासलेल्या प्रिस्क्रिप्शनवरून पॅक करतात.',
    available: 'योग्य औषधांसाठी उपलब्ध. नियम आणि लेबलिंगच्या अटींनुसार.',
    howEyebrow: 'सुरुवात', howStart: 'सुरुवात *कशी करायची.*',
    s1a: 'ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा आणि', s1b: 'डोस सॅशे', s1c: ' निवडा.',
    s2: 'फार्मासिस्ट ते तपासतात आणि वेळा ठरवण्यासाठी तुम्हाला कॉल करतात.',
    s3: 'पहिल्या महिन्याचे सॅशे तुमच्या दारात येतात.',
    s4: 'प्रत्येक रिफिलआधी आम्ही आठवण करून देतो. कधीही थांबवा किंवा बदला.',
    seeAll: 'सर्व सदस्यता पाहा',
  },
};

export default function DoseSachets() {
  const { t } = useLang();
  const tr = useT(T);
  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} />
      <PageHeader
        eyebrow={tr('eyebrow')}
        title={tr('h1')}
        lead={tr('intro')}
        crumbs={[{ label: t('home'), to: '/' }, { label: tr('crumb'), to: '/subscriptions' }, { label: tr('eyebrow') }]}
      >
        <Button href="#start"><Icon name="phoneApp" size={20} /> {tr('startApp')} <Icon name="arrow" size={18} /></Button>
      </PageHeader>

      {/* The sachet itself: tabs Morning / Afternoon / Evening / Night */}
      <section className="section bg-white">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{tr('exploreEyebrow')}</Eyebrow>
            <h2 className="mb-4 text-section"><Accent text={tr('exploreTitle')} /></h2>
            <p className="text-lead text-ink/75">{tr('exploreText')}</p>
            <p className="mb-3 mt-6 text-base font-semibold text-green">{tr('colours')}</p>
            <ul className="flex flex-wrap gap-2" aria-label={tr('colours')}>
              {KEY.map((d) => (
                <li key={d.k} className={`rounded-btn px-3.5 py-1.5 text-base font-bold ${d.cls}`}>{tr(d.k)}</li>
              ))}
            </ul>
            <p className="mb-0 mt-8 font-head text-h2m font-bold text-terracotta-deep">{tr('tear')}</p>
          </Reveal>
          <Reveal><SachetExplorer label={tr('sachetTabs')} /></Reveal>
        </div>
      </section>

      {/* A full day */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="mb-3 text-section">{tr('oneDay')}</h2>
            <p className="m-0 text-base text-grey">{tr('example')}</p>
          </Reveal>
          <DoseDay day={EXAMPLE_DAY} />
        </div>
      </section>

      {/* Why sachets */}
      <section className="section bg-mist">
        <div className="container">
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow>{tr('whyEyebrow')}</Eyebrow>
            <h2 className="m-0 text-section"><Accent text={tr('whyTitle')} /></h2>
          </Reveal>
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(([k, icon]) => (
              <StaggerItem as="li" key={k} className="rounded-tile border border-mint bg-white p-6">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-btn bg-mist text-green"><Icon name={icon} size={24} /></span>
                <h3 className="mb-1 text-h3m">{tr(`${k}t`)}</h3>
                <p className="m-0 text-base text-grey">{tr(`${k}d`)}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex items-start gap-3 rounded-tile bg-white p-5 text-base shadow-card">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-sage-tint text-green"><Icon name="verified" size={20} /></span>
            <span className="pt-1.5">{tr('packed')}</span>
          </Reveal>
          <p className="mb-0 mt-3 text-small text-grey">{tr('available')}</p>
        </div>
      </section>

      {/* How to start (prescription upload is in the app, guidelines p.8) */}
      <section id="start" className="section scroll-mt-28 bg-white">
        <div className="container grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{tr('howEyebrow')}</Eyebrow>
            <h2 className="mb-8 text-section"><Accent text={tr('howStart')} /></h2>
            <ol className="relative mb-8 grid gap-6">
              <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 rounded-full bg-mint" />
              {[
                <>{tr('s1a')} <strong>{tr('s1b')}</strong>{tr('s1c')}</>,
                tr('s2'),
                tr('s3'),
                tr('s4'),
              ].map((text, i) => (
                <li key={i} className="relative flex items-start gap-5">
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green font-head text-h3 font-bold text-white ring-8 ring-white">{i + 1}</span>
                  <span className="pt-2.5">{text}</span>
                </li>
              ))}
            </ol>
            <Link to="/subscriptions" className="group inline-flex min-h-tap items-center gap-2 font-bold">
              {tr('seeAll')} <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
          <Reveal><AppPanel title={tr('startApp')} /></Reveal>
        </div>
      </section>
    </>
  );
}
