import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent from '../components/ui/Accent';
import AppPanel from '../components/commerce/AppPanel';
import PageHeader from '../components/layout/PageHeader';
import Seo from '../components/layout/Seo';
import RxStory, { RxBackdrop } from '../components/home/RxStory';
import AppPreview from '../components/rx/AppPreview';
import '../components/home/ShopByNeed.css';
import { NoScheduleXArt, PrivacyArt, RxValidArt, ScheduleHArt } from '../components/brand/Illustrations';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { RX_STEPS } from '../data/rxSteps';
import { SITE } from '../config/site';
import { useLang, useLoc, useT, type Dict } from '../i18n/LangContext';

// Prescription orders (guidelines p.8, p.10, p.11). Upload happens in the app only (pitch deck
// p.10); this page explains the flow (scroll-linked story, as on the homepage) and shows how the
// AI-read list and order tracking look. "AI assists, pharmacist decides" wherever AI reads a
// prescription.

const T: Dict = {
  en: {
    titleAccent: 'Upload your prescription. *A pharmacist checks it.*',
    aiTitleAccent: 'AI assists, _pharmacist decides._',
    howLead: 'Four steps from your prescription to your door. If anything is unclear, the pharmacist calls you before packing.',
    getApp: 'Get the app', callOrder: 'Call {phone} to order',
    appTitle: 'Upload in the Way2Cure app',
    tryTitle: 'You check the list. *We keep you posted.*',
    seoTitle: 'Upload a prescription',
    seoDesc: 'Upload your prescription in the Way2Cure app. AI lists the medicines, a registered pharmacist verifies every order, and we deliver in Mumbai, Navi Mumbai and Thane.',
    eyebrow: 'Prescription orders',
    title: 'Upload your prescription in the app',
    intro: 'Snap a photo of your prescription. We list the medicines, you confirm, and a registered pharmacist checks every order before it leaves the pharmacy.',
    aiTitle: 'AI assists, pharmacist decides.',
    aiText: 'Our system reads the prescription to save you typing. A registered pharmacist always makes the final check.',
    ai1: 'AI reads the medicines', ai2: 'You confirm the list', ai3: 'A pharmacist checks every order',
    goodToKnow: 'Good to know, *before you order.*', knowLead: 'The rules every prescription order follows, for your safety.',
    know1t: 'Valid prescription only', know2t: 'Schedule H and H1', know3t: 'No Schedule X', know4t: 'Your prescription stays private',
    know1: 'Prescription medicines are sold only with a valid prescription.',
    know2: "Schedule H and H1 medicines need a valid doctor's prescription.",
    know3: 'We do not sell Schedule X drugs or narcotics.',
    know4: 'Your prescription is used only for your order. We never share it without your consent.',
  },
  hi: {
    titleAccent: 'अपना पर्चा अपलोड करें। *फ़ार्मासिस्ट उसे जाँचेंगे।*',
    aiTitleAccent: 'AI मदद करता है, _फ़ैसला फ़ार्मासिस्ट करते हैं।_',
    howLead: 'आपके पर्चे से आपके दरवाज़े तक चार कदम। कुछ भी साफ़ न हो तो पैक करने से पहले फ़ार्मासिस्ट आपको कॉल करते हैं।',
    getApp: 'ऐप पाएँ', callOrder: 'ऑर्डर के लिए {phone} पर कॉल करें',
    appTitle: 'Way2Cure ऐप में अपलोड करें',
    tryTitle: 'लिस्ट आप जाँचते हैं। *हर अपडेट हम देते हैं।*',
    seoTitle: 'पर्चा अपलोड करें',
    seoDesc: 'Way2Cure ऐप में अपना पर्चा अपलोड करें। AI दवाइयों की लिस्ट बनाता है, हर ऑर्डर को रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं, और हम मुंबई, नवी मुंबई और ठाणे में डिलिवरी करते हैं।',
    eyebrow: 'पर्चे वाले ऑर्डर',
    title: 'ऐप में अपना पर्चा अपलोड करें',
    intro: 'अपने पर्चे की फ़ोटो लें। हम दवाइयों की लिस्ट बनाते हैं, आप उसे कन्फ़र्म करते हैं, और फ़ार्मेसी से निकलने से पहले हर ऑर्डर को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    aiTitle: 'AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।',
    aiText: 'हमारा सिस्टम पर्चा पढ़ लेता है, ताकि आपको टाइप न करना पड़े। आख़िरी जाँच हमेशा एक रजिस्टर्ड फ़ार्मासिस्ट ही करते हैं।',
    ai1: 'AI दवाइयाँ पढ़ता है', ai2: 'आप लिस्ट कन्फ़र्म करते हैं', ai3: 'हर ऑर्डर फ़ार्मासिस्ट जाँचते हैं',
    goodToKnow: 'ऑर्डर से पहले *ये बातें जान लें।*', knowLead: 'आपकी सुरक्षा के लिए, हर पर्चे वाले ऑर्डर पर लागू नियम।',
    know1t: 'सिर्फ़ वैध पर्चे पर', know2t: 'शेड्यूल H और H1', know3t: 'शेड्यूल X नहीं', know4t: 'आपका पर्चा निजी रहता है',
    know1: 'पर्चे वाली दवाइयाँ सिर्फ़ वैध पर्चे पर ही मिलती हैं।',
    know2: 'शेड्यूल H और H1 दवाइयों के लिए डॉक्टर का वैध पर्चा ज़रूरी है।',
    know3: 'हम शेड्यूल X दवाइयाँ या नशीली दवाइयाँ नहीं बेचते।',
    know4: 'आपका पर्चा सिर्फ़ आपके ऑर्डर के लिए इस्तेमाल होता है। आपकी मंज़ूरी के बिना हम इसे कभी किसी से शेयर नहीं करते।',
  },
  mr: {
    titleAccent: 'तुमचे प्रिस्क्रिप्शन अपलोड करा. *फार्मासिस्ट ते तपासतील.*',
    aiTitleAccent: 'AI मदत करते, _निर्णय फार्मासिस्ट घेतात._',
    howLead: 'तुमच्या प्रिस्क्रिप्शनपासून तुमच्या दारापर्यंत चार पायऱ्या. काही अस्पष्ट असल्यास पॅक करण्यापूर्वी फार्मासिस्ट तुम्हाला कॉल करतात.',
    getApp: 'ॲप मिळवा', callOrder: 'ऑर्डरसाठी {phone} वर कॉल करा',
    appTitle: 'Way2Cure ॲपमध्ये अपलोड करा',
    tryTitle: 'यादी तुम्ही तपासता. *प्रत्येक अपडेट आम्ही देतो.*',
    seoTitle: 'प्रिस्क्रिप्शन अपलोड करा',
    seoDesc: 'Way2Cure ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा. AI औषधांची यादी करते, प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात, आणि आम्ही मुंबई, नवी मुंबई आणि ठाणे येथे डिलिव्हरी करतो.',
    eyebrow: 'प्रिस्क्रिप्शनच्या ऑर्डर',
    title: 'ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा',
    intro: 'तुमच्या प्रिस्क्रिप्शनचा फोटो काढा. आम्ही औषधांची यादी करतो, तुम्ही ती निश्चित करता, आणि फार्मसीमधून निघण्यापूर्वी प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात.',
    aiTitle: 'AI मदत करते, निर्णय फार्मासिस्ट घेतात.',
    aiText: 'तुम्हाला टाइप करावे लागू नये म्हणून आमची सिस्टम प्रिस्क्रिप्शन वाचते. शेवटची तपासणी नेहमी नोंदणीकृत फार्मासिस्टच करतात.',
    ai1: 'AI औषधे वाचते', ai2: 'तुम्ही यादी निश्चित करता', ai3: 'प्रत्येक ऑर्डर फार्मासिस्ट तपासतात',
    goodToKnow: 'ऑर्डर करण्यापूर्वी *हे लक्षात ठेवा.*', knowLead: 'तुमच्या सुरक्षिततेसाठी, प्रत्येक प्रिस्क्रिप्शन ऑर्डरचे नियम.',
    know1t: 'फक्त वैध प्रिस्क्रिप्शनवर', know2t: 'शेड्यूल H आणि H1', know3t: 'शेड्यूल X नाही', know4t: 'तुमचे प्रिस्क्रिप्शन खाजगी राहते',
    know1: 'प्रिस्क्रिप्शनची औषधे फक्त वैध प्रिस्क्रिप्शनवरच मिळतात.',
    know2: 'शेड्यूल H आणि H1 औषधांसाठी डॉक्टरांचे वैध प्रिस्क्रिप्शन लागते.',
    know3: 'आम्ही शेड्यूल X औषधे किंवा अंमली पदार्थ विकत नाही.',
    know4: 'तुमचे प्रिस्क्रिप्शन फक्त तुमच्या ऑर्डरसाठी वापरले जाते. तुमच्या संमतीशिवाय आम्ही ते कधीही कोणाला देत नाही.',
  },
};

const KNOW = [
  { icon: 'rx', k: 'know1', Art: RxValidArt },
  { icon: 'verified', k: 'know2', Art: ScheduleHArt },
  { icon: 'warning', k: 'know3', Art: NoScheduleXArt },
  { icon: 'lock', k: 'know4', Art: PrivacyArt },
];

export default function Prescription() {
  const { t } = useLang();
  const tr = useT(T);
  const loc = useLoc();
  return (
    <>
      <Seo title={tr('seoTitle')} description={tr('seoDesc')} />
      <PageHeader
        title={tr('titleAccent')}
        lead={tr('intro')}
        crumbs={[{ label: t('home'), to: '/' }, { label: tr('eyebrow') }]}
      >
        <div className="grid gap-5">
          <p className="m-0 flex items-start gap-2 text-base font-semibold text-terracotta-deep">
            <Icon name="rx" size={18} className="mt-0.5 shrink-0" /> {tr('know1')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#get-app"><Icon name="phoneApp" size={20} /> {tr('getApp')}</Button>
            <Button href={SITE.phoneHref} variant="outline"><Icon name="phone" size={20} /> {tr('callOrder', { phone: SITE.phone })}</Button>
          </div>
        </div>
      </PageHeader>

      {/* App-only upload */}
      <section id="get-app" className="bg-white py-8 lg:py-12">
        <div className="container grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <Reveal className="h-full"><AppPanel title={tr('appTitle')} headingLevel={2} className="h-full content-center" /></Reveal>
          <Reveal className="relative flex h-full flex-col overflow-hidden rounded-panel bg-mist p-6 md:p-8">
            <span aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-sage/15 blur-2xl" />
            <span className="relative mb-4 grid h-11 w-11 place-items-center rounded-btn bg-white text-green shadow-card"><Icon name="sparkles" size={22} className="text-mustard" /></span>
            <h2 className="relative mb-2 font-body text-h3m md:text-h3">{tr('aiTitle')}</h2>
            <p className="relative mb-6 text-ink/80">{tr('aiText')}</p>
            <ul className="relative mt-auto grid gap-3">
              {(['ai1', 'ai2', 'ai3'] as const).map((k, i) => (
                <li key={k} className="flex items-center gap-3 rounded-tile bg-white p-3.5 shadow-card">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${i === 2 ? 'bg-green text-white' : 'bg-sage-tint text-sage-deep'}`}>
                    <Icon name={['scan', 'check', 'userCheck'][i]} size={18} />
                  </span>
                  <span className="text-base font-semibold text-green">{tr(k)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How it works: pinned scroll story on desktop, stepper on phones */}
      <section className="section relative overflow-clip bg-mist">
        <RxBackdrop />
        <div className="container relative">
          <RxStory
            steps={RX_STEPS.map(loc)}
            heading={
              <Reveal>
                <h2 className="mb-4 text-section"><Accent text={tr('aiTitleAccent')} /></h2>
                <p className="m-0 text-lead text-ink/75">{tr('howLead')}</p>
              </Reveal>
            }
          />
        </div>
      </section>

      {/* Inside the app: two still phone screens with numbered call-outs (components/rx/AppPreview) */}
      <AppPreview title={tr('tryTitle')} />

      {/* Rules we follow (guidelines p.11), in the homepage card design (ShopByNeed.css) */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mb-8 max-w-2xl md:mb-12">
            <h2 className="mb-4 text-section"><Accent text={tr('goodToKnow')} /></h2>
            <p className="m-0 text-lead text-ink/75">{tr('knowLead')}</p>
          </Reveal>
          <Stagger as="ul" className="sbn-grid sbn-grid--know">
            {KNOW.map(({ icon, k, Art }, i) => (
              <StaggerItem as="li" key={k} className="sbn-cell">
                <div className={`sbn-card sbn-cat${i % 2 ? ' sbn-card--alt' : ''}`}>
                  <span className="sbn-icon" aria-hidden="true"><Icon name={icon} size={20} /></span>
                  <h3 className="sbn-cat__title">{tr(`${k}t`)}</h3>
                  <p className="sbn-cat__sub">{tr(k)}</p>
                  <span className="sbn-art"><Art /></span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
