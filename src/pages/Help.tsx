import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import FAQAccordion from '../components/ui/FAQAccordion';
import { HelpBox } from '../components/commerce/AppPanel';
import { faqs } from '../data';
import { useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
  en: {
    title: 'Questions and answers',
    intro: "Can't find what you need? Call or WhatsApp us. A real person will help.",
    seoDesc: 'Answers about ordering medicines, prescriptions, delivery, home nurses and subscriptions at Way2Cure.',
  },
  hi: {
    title: 'अक्सर पूछे जाने वाले सवाल',
    intro: 'जो चाहिए वह नहीं मिला? हमें कॉल या व्हाट्सऐप करें। एक असली इंसान आपकी मदद करेगा।',
    seoDesc: 'Way2Cure पर दवाइयाँ ऑर्डर करने, पर्चे, डिलिवरी, घर पर नर्स और सब्सक्रिप्शन से जुड़े जवाब।',
  },
  mr: {
    title: 'नेहमीचे प्रश्न',
    intro: 'हवे ते सापडले नाही? आम्हाला कॉल किंवा व्हॉट्सॲप करा. खरी व्यक्ती तुम्हाला मदत करेल.',
    seoDesc: 'Way2Cure वर औषधे ऑर्डर करणे, प्रिस्क्रिप्शन, डिलिव्हरी, घरी नर्स आणि सबस्क्रिप्शनबद्दल उत्तरे.',
  },
};

export default function Help() {
  const tr = useT(T);
  return (
    <>
      <Seo title={tr('title')} description={tr('seoDesc')} />
      <PageHeader title={tr('title')} lead={tr('intro')} />
      <div className="container grid items-start gap-8 py-10 md:py-14 lg:grid-cols-[1fr_340px]">
        <FAQAccordion items={faqs} />
        <div className="lg:sticky lg:top-24"><HelpBox /></div>
      </div>
    </>
  );
}
