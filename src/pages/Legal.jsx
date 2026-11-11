import { PageHead, InfoBand } from '../components/legacy-ui';
import { useLang, useT } from '../i18n/LangContext';

// Placeholder structure. Final wording must be confirmed by a lawyer and pharmacy partners
// (labels, Schedule H/H1 handling, device rules, DPDP privacy wording) before launch.
// Hindi and Marathi are courtesy translations; the English text is the one that applies.
const T = {
  en: {
    eyebrow: 'Legal',
    title: 'Terms, privacy and pharmacy rules',
    englishPrevails: 'If there is any difference between a translation and this English text, the English text applies.',
    draft: 'Draft page. Final legal wording is being reviewed and will be published before launch.',
    rxTitle: 'Prescription medicines',
    rxText: 'Prescription medicines are sold only with a valid prescription from a registered doctor. A registered pharmacist at a licensed partner pharmacy checks every prescription order before it is packed. Schedule H and H1 medicines need a valid prescription. We do not sell Schedule X drugs or narcotics.',
    sellersTitle: 'Marketplace sellers',
    sellersText: 'Third-party sellers are verified before they can list on Way2Cure. Each product page shows who is selling it.',
    careTitle: 'Care services',
    careText: 'Suitability for specialised care at home (such as ICU, ventilator, stroke and cancer care) is assessed by the treating doctor before care begins.',
    privacyTitle: 'Privacy',
    privacyText: 'We collect only what we need to deliver your order or care. Health information, including prescriptions and location data from the safe-zone band, is used only with your consent and never sold. You can ask us to delete your data at any time.',
    payTitle: 'Payments and refunds',
    payText: 'We show the full price, including delivery, before you pay. If a payment fails, your money is safe and any amount taken is returned to the same account.',
  },
  hi: {
    eyebrow: 'कानूनी जानकारी',
    title: 'शर्तें, प्राइवेसी और फ़ार्मेसी के नियम',
    englishPrevails: 'यह अनुवाद आपकी सुविधा के लिए है। अगर हिन्दी और अंग्रेज़ी में कोई फ़र्क हो, तो अंग्रेज़ी वाला पाठ ही मान्य होगा।',
    draft: 'यह ड्राफ़्ट पेज है। आख़िरी कानूनी शब्दों की जाँच चल रही है, और लॉन्च से पहले इन्हें पब्लिश किया जाएगा।',
    rxTitle: 'पर्चे वाली दवाइयाँ',
    rxText: 'पर्चे वाली दवाइयाँ सिर्फ़ किसी रजिस्टर्ड डॉक्टर के वैध पर्चे पर ही मिलती हैं। लाइसेंस वाली पार्टनर फ़ार्मेसी के रजिस्टर्ड फ़ार्मासिस्ट हर पर्चे वाले ऑर्डर को पैक होने से पहले जाँचते हैं। शेड्यूल H और H1 दवाइयों के लिए वैध पर्चा ज़रूरी है। हम शेड्यूल X दवाइयाँ या नशीली दवाइयाँ नहीं बेचते।',
    sellersTitle: 'मार्केटप्लेस के विक्रेता',
    sellersText: 'दूसरे विक्रेता Way2Cure पर सामान लिस्ट करने से पहले जाँचे जाते हैं। हर प्रोडक्ट के पेज पर लिखा होता है कि उसे कौन बेच रहा है।',
    careTitle: 'देखभाल सेवाएँ',
    careText: 'घर पर ख़ास देखभाल (जैसे आईसीयू, वेंटिलेटर, स्ट्रोक और कैंसर की देखभाल) सही रहेगी या नहीं, यह देखभाल शुरू होने से पहले इलाज करने वाले डॉक्टर तय करते हैं।',
    privacyTitle: 'प्राइवेसी',
    privacyText: 'हम सिर्फ़ उतनी ही जानकारी लेते हैं जितनी आपका ऑर्डर या देखभाल पहुँचाने के लिए ज़रूरी है। सेहत से जुड़ी जानकारी, जैसे पर्चे और सेफ़-ज़ोन बैंड का लोकेशन डेटा, सिर्फ़ आपकी मंज़ूरी से इस्तेमाल होती है और कभी बेची नहीं जाती। आप कभी भी हमसे अपना डेटा हटाने को कह सकते हैं।',
    payTitle: 'भुगतान और रिफ़ंड',
    payText: 'भुगतान से पहले हम डिलिवरी समेत पूरी कीमत दिखाते हैं। अगर भुगतान फ़ेल हो जाए, तो आपका पैसा सुरक्षित है और जो भी रकम कटी हो, वह उसी खाते में वापस आ जाती है।',
  },
  mr: {
    eyebrow: 'कायदेशीर माहिती',
    title: 'अटी, गोपनीयता आणि फार्मसीचे नियम',
    englishPrevails: 'हा अनुवाद तुमच्या सोयीसाठी आहे. मराठी आणि इंग्रजी मजकुरात काही फरक असल्यास इंग्रजी मजकूरच ग्राह्य धरला जाईल.',
    draft: 'हे ड्राफ्ट पेज आहे. अंतिम कायदेशीर मजकुराची तपासणी सुरू आहे, आणि तो लॉन्चपूर्वी प्रसिद्ध केला जाईल.',
    rxTitle: 'प्रिस्क्रिप्शनची औषधे',
    rxText: 'प्रिस्क्रिप्शनची औषधे फक्त नोंदणीकृत डॉक्टरांच्या वैध प्रिस्क्रिप्शनवरच मिळतात. परवानाधारक पार्टनर फार्मसीतील नोंदणीकृत फार्मासिस्ट प्रत्येक प्रिस्क्रिप्शन ऑर्डर पॅक होण्यापूर्वी तपासतात. शेड्यूल H आणि H1 औषधांसाठी वैध प्रिस्क्रिप्शन लागते. आम्ही शेड्यूल X औषधे किंवा अंमली पदार्थ विकत नाही.',
    sellersTitle: 'मार्केटप्लेसवरील विक्रेते',
    sellersText: 'इतर विक्रेत्यांना Way2Cure वर वस्तू लिस्ट करण्यापूर्वी तपासले जाते. प्रत्येक उत्पादनाच्या पेजवर ते कोण विकत आहे हे दिसते.',
    careTitle: 'काळजी सेवा',
    careText: 'घरी विशेष काळजी (जसे आयसीयू, व्हेंटिलेटर, स्ट्रोक आणि कॅन्सरची काळजी) योग्य आहे का, हे काळजी सुरू होण्यापूर्वी उपचार करणारे डॉक्टर ठरवतात.',
    privacyTitle: 'गोपनीयता',
    privacyText: 'तुमची ऑर्डर किंवा काळजी पोहोचवण्यासाठी आवश्यक तेवढीच माहिती आम्ही घेतो. आरोग्याविषयी माहिती, जसे प्रिस्क्रिप्शन आणि सेफ-झोन बँडचा लोकेशन डेटा, फक्त तुमच्या संमतीने वापरली जाते आणि कधीही विकली जात नाही. तुम्ही कधीही आम्हाला तुमचा डेटा काढून टाकायला सांगू शकता.',
    payTitle: 'पेमेंट आणि रिफंड',
    payText: 'पेमेंट करण्यापूर्वी आम्ही डिलिव्हरीसह पूर्ण किंमत दाखवतो. पेमेंट अयशस्वी झाले तरी तुमचे पैसे सुरक्षित आहेत, आणि कापलेली रक्कम त्याच खात्यात परत येते.',
  },
};

export default function Legal() {
  const tr = useT(T);
  const { lang } = useLang();
  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')} />
      <div className="container section-sm narrow prose">
        {lang !== 'en' && <InfoBand icon="info">{tr('englishPrevails')}</InfoBand>}
        <InfoBand icon="warning">{tr('draft')}</InfoBand>
        <h2>{tr('rxTitle')}</h2>
        <p>{tr('rxText')}</p>
        <h2>{tr('sellersTitle')}</h2>
        <p>{tr('sellersText')}</p>
        <h2>{tr('careTitle')}</h2>
        <p>{tr('careText')}</p>
        <h2 id="privacy">{tr('privacyTitle')}</h2>
        <p>{tr('privacyText')}</p>
        <h2>{tr('payTitle')}</h2>
        <p>{tr('payText')}</p>
      </div>
    </>
  );
}
