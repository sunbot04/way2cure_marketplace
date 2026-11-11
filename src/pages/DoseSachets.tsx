import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Card from '../components/ui/Card';
import InfoBand from '../components/ui/InfoBand';
import SectionHeading from '../components/ui/SectionHeading';
import DoseDay, { type DoseSlot } from '../components/plans/DoseDay';
import AppPanel from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import { useLang, useT, type Dict } from '../i18n/LangContext';

// Dose sachets (pitch deck p.8). Time-of-day colours and labels come from DoseDay, the same
// as in the app and on printed sachets. Medicine names stay in English, as printed on the sachet.
const EXAMPLE_DAY: Record<DoseSlot, string[]> = {
  morning: ['Metformin 500 mg', 'Amlodipine 5 mg', 'Vitamin B12'],
  afternoon: ['Calcium', 'Multivitamin'],
  evening: ['Metformin 500 mg', 'Telmisartan 40 mg'],
  night: ['Atorvastatin 10 mg', 'Vitamin D3', 'Magnesium'],
};

const FEATURES: [string, string][] = [
  ['f1', 'var(--green)'],
  ['f2', 'var(--terracotta)'],
  ['f3', 'var(--mustard)'],
  ['f4', 'var(--sage)'],
];

const T: Dict = {
  en: {
    seoDesc: 'Every dose packed in its own sachet, sorted morning to night by partner pharmacies under pharmacist supervision. Pay only for the doses you take.',
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
    seoDesc: 'हर डोज़ अपने अलग सैशे में, सुबह से रात तक क्रम से, फ़ार्मासिस्ट की देखरेख में पार्टनर फ़ार्मेसी द्वारा पैक। सिर्फ़ उन्हीं डोज़ का भुगतान जो आप लेते हैं।',
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
    seoDesc: 'प्रत्येक डोस स्वतंत्र सॅशेमध्ये, सकाळपासून रात्रीपर्यंत क्रमाने, फार्मासिस्टच्या देखरेखीखाली भागीदार फार्मसीकडून पॅक. फक्त तुम्ही घेता त्या डोसचे पैसे.',
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
  const { t } = useLang();
  const tr = useT(T);
  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} />
      <PageHeader
        title={tr('title')}
        lead={tr('intro')}
        crumbs={[{ label: t('home'), to: '/' }, { label: tr('eyebrow'), to: '/subscriptions' }, { label: tr('title') }]}
      />

      <section className="py-10 md:py-12">
        <div className="container">
          <SectionHeading title={tr('oneDay')} lead={tr('example')} />
          <DoseDay day={EXAMPLE_DAY} />
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(([k, c]) => (
              <Card key={k} edge={c}>
                <h3 className="mb-1">{tr(`${k}t`)}</h3>
                <p className="m-0 text-grey">{tr(`${k}d`)}</p>
              </Card>
            ))}
          </div>
          <InfoBand icon="verified" className="mt-8">{tr('packed')}</InfoBand>
          <p className="mt-3 text-small text-grey">{tr('available')}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2>{tr('howStart')}</h2>
            <ol className="mb-6 grid gap-4">
              {[
                <>{tr('s1a')} <strong>{tr('s1b')}</strong>{tr('s1c')}</>,
                tr('s2'),
                tr('s3'),
                tr('s4'),
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green font-head text-h3m font-bold text-white">{i + 1}</span>
                  <span className="pt-1.5">{text}</span>
                </li>
              ))}
            </ol>
            <Link to="/subscriptions" className="inline-flex min-h-tap items-center gap-2 font-bold">
              {tr('seeAll')} <Icon name="arrow" size={18} />
            </Link>
          </div>
          <AppPanel title={tr('startApp')} />
        </div>
      </section>
    </>
  );
}
