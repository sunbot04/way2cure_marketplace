import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import FAQAccordion from '../components/ui/FAQAccordion';
import { HelpBox } from '../components/commerce/AppPanel';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { faqs } from '../data';
import { SITE } from '../config/site';
import { useLang, useT, type Dict } from '../i18n/LangContext';

const T: Dict = {
  en: {
    eyebrow: 'Help centre',
    title: 'How can we *help?*',
    intro: "Answers to what families ask us most. Can't find yours? Call or WhatsApp us. A real person will help, day or night.",
    seoTitle: 'Help centre and questions',
    seoDesc: 'Answers about ordering medicines, prescriptions, delivery, home nurses and subscriptions at Way2Cure.',
    topics: 'Jump to a topic',
    'g.start': 'Getting started', 'g.orders': 'Medicines & orders', 'g.care': 'Care at home',
    quickTitle: 'Do it yourself',
    q1: 'Track my order', q2: 'Upload a prescription', q3: 'Book a nurse', q4: 'Pause a subscription',
    stillTitle: 'Still have a question?', stillText: 'Ask for a call back and a care advisor will ring you at a time that suits you.',
    callBack: 'Ask for a call back',
  },
  hi: {
    eyebrow: 'मदद केंद्र',
    title: 'हम आपकी कैसे *मदद करें?*',
    intro: 'परिवार हमसे सबसे ज़्यादा जो पूछते हैं, उनके जवाब। आपका सवाल नहीं मिला? हमें कॉल या व्हाट्सऐप करें। दिन हो या रात, एक असली इंसान मदद करेगा।',
    seoTitle: 'मदद केंद्र और सवाल',
    seoDesc: 'Way2Cure पर दवाइयाँ ऑर्डर करने, पर्चे, डिलिवरी, घर पर नर्स और सब्सक्रिप्शन से जुड़े जवाब।',
    topics: 'विषय पर जाएँ',
    'g.start': 'शुरुआत', 'g.orders': 'दवाइयाँ और ऑर्डर', 'g.care': 'घर पर देखभाल',
    quickTitle: 'ख़ुद करें',
    q1: 'मेरा ऑर्डर ट्रैक करें', q2: 'पर्चा अपलोड करें', q3: 'नर्स बुक करें', q4: 'सब्सक्रिप्शन रोकें',
    stillTitle: 'अब भी कोई सवाल है?', stillText: 'कॉल बैक माँगें, हमारे केयर सलाहकार आपके सुविधा के समय पर कॉल करेंगे।',
    callBack: 'कॉल बैक माँगें',
  },
  mr: {
    eyebrow: 'मदत केंद्र',
    title: 'आम्ही कशी *मदत करू?*',
    intro: 'कुटुंबे आम्हाला सर्वात जास्त जे विचारतात त्याची उत्तरे. तुमचा प्रश्न सापडला नाही? आम्हाला कॉल किंवा व्हॉट्सॲप करा. दिवस असो वा रात्र, खरी व्यक्ती मदत करेल.',
    seoTitle: 'मदत केंद्र आणि प्रश्न',
    seoDesc: 'Way2Cure वर औषधे ऑर्डर करणे, प्रिस्क्रिप्शन, डिलिव्हरी, घरी नर्स आणि सबस्क्रिप्शनबद्दल उत्तरे.',
    topics: 'विषयावर जा',
    'g.start': 'सुरुवात', 'g.orders': 'औषधे आणि ऑर्डर', 'g.care': 'घरी काळजी',
    quickTitle: 'स्वतः करा',
    q1: 'माझी ऑर्डर ट्रॅक करा', q2: 'प्रिस्क्रिप्शन अपलोड करा', q3: 'नर्स बुक करा', q4: 'सदस्यता थांबवा',
    stillTitle: 'अजूनही प्रश्न आहे?', stillText: 'कॉल बॅक मागा, आमचे केअर सल्लागार तुमच्या सोयीच्या वेळी कॉल करतील.',
    callBack: 'कॉल बॅक मागा',
  },
};

// FAQ groups by position in src/data/faqs.json
const GROUPS = [
  { id: 'start', icon: 'home', items: [0, 1, 8] },
  { id: 'orders', icon: 'pill', items: [2, 4, 9] },
  { id: 'care', icon: 'stethoscope', items: [3, 5, 6, 7] },
];

const QUICK = [
  { to: '/account', icon: 'truck', key: 'q1' },
  { to: '/prescription', icon: 'rx', key: 'q2' },
  { to: '/care/nurse', icon: 'stethoscope', key: 'q3' },
  { to: '/subscriptions#manage', icon: 'refresh', key: 'q4' },
];

export default function Help() {
  const tr = useT(T);
  const { t } = useLang();
  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} />
      <PageHeader tone="mist" eyebrow={tr('eyebrow')} title={tr('title')} lead={tr('intro')}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={SITE.phoneHref} variant="urgent"><Icon name="phone" size={20} /> {t('callUs')} {SITE.phone}</Button>
          <Button href={SITE.whatsappHref} external variant="outline"><Icon name="whatsapp" size={20} /> {t('whatsapp')}</Button>
        </div>
      </PageHeader>

      <section className="section pt-12 lg:pt-16">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="grid gap-14">
            <Reveal>
              <nav aria-label={tr('topics')} className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-small font-semibold text-grey">{tr('topics')}</span>
              {GROUPS.map((g) => (
                <a key={g.id} href={`#faq-${g.id}`} className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-line bg-white px-4 text-base font-semibold text-green no-underline transition-colors duration-micro hover:border-green">
                  <Icon name={g.icon} size={16} className="text-sage" /> {tr(`g.${g.id}`)}
                </a>
              ))}
              </nav>
            </Reveal>
            {GROUPS.map((g) => (
              <Reveal as="section" key={g.id} id={`faq-${g.id}`}>
                <h2 className="mb-5 flex items-center gap-3 font-head text-h2m md:text-h2">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name={g.icon} size={22} /></span>
                  {tr(`g.${g.id}`)}
                </h2>
                <FAQAccordion items={g.items.map((i) => faqs[i]).filter(Boolean)} />
              </Reveal>
            ))}
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-28">
            <Reveal className="rounded-panel bg-white p-6 shadow-card">
              <h2 className="mb-3 font-body text-h3m md:text-h3">{tr('quickTitle')}</h2>
              <Stagger as="ul" className="grid">
                {QUICK.map((q) => (
                  <StaggerItem as="li" key={q.key}>
                    <Link to={q.to} className="group flex min-h-tap items-center gap-3 rounded-btn px-2 font-semibold text-green no-underline transition-colors duration-micro hover:bg-mist">
                      <Icon name={q.icon} size={20} className="shrink-0 text-sage" />
                      <span className="flex-1">{tr(q.key)}</span>
                      <Icon name="arrow" size={16} />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
            <Reveal><HelpBox /></Reveal>
            <Reveal className="rounded-panel bg-green p-6 text-white">
              <h2 className="mb-2 font-body text-h3m text-white md:text-h3">{tr('stillTitle')}</h2>
              <p className="text-mint">{tr('stillText')}</p>
              <Button to="/contact" variant="light" compact>{tr('callBack')} <Icon name="arrow" size={18} /></Button>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
