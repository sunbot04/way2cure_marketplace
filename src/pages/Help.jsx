import { faqs } from '../data';
import { FaqList, HelpBox, PageHead } from '../components/legacy-ui';
import { useT } from '../i18n/LangContext';

const T = {
  en: {
    eyebrow: 'Help centre',
    title: 'Questions and answers',
    intro: "Can't find what you need? Call or WhatsApp us. A real person will help.",
  },
  hi: {
    eyebrow: 'मदद केंद्र',
    title: 'अक्सर पूछे जाने वाले सवाल',
    intro: 'जो चाहिए वह नहीं मिला? हमें कॉल या व्हाट्सऐप करें। एक असली इंसान आपकी मदद करेगा।',
  },
  mr: {
    eyebrow: 'मदत केंद्र',
    title: 'नेहमीचे प्रश्न',
    intro: 'हवे ते सापडले नाही? आम्हाला कॉल किंवा व्हॉट्सॲप करा. खरी व्यक्ती तुम्हाला मदत करेल.',
  },
};

export default function Help() {
  const tr = useT(T);
  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')}>
        <p>{tr('intro')}</p>
      </PageHead>
      <div className="container section-sm two-col">
        <FaqList items={faqs} />
        <HelpBox />
      </div>
    </>
  );
}
