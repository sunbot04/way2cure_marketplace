export const subscriptionPlans = [
  {
    id: 'refills', name: 'Medicine refills', icon: 'pill', edge: 'var(--sage)', often: 'Suggested: monthly',
    points: ['Your regular BP, sugar and heart medicines', 'Pharmacist-verified every time', 'Reminder before each order'],
    hi: {
      name: 'दवाइयों की रीफ़िल', often: 'सुझाव: हर महीने',
      points: ['आपकी रोज़ की बीपी, शुगर और दिल की दवाइयाँ', 'हर बार फ़ार्मासिस्ट द्वारा जाँचा गया', 'हर ऑर्डर से पहले याद दिलाते हैं'],
    },
    mr: {
      name: 'औषधांचे रिफिल', often: 'सुचवलेले: दर महिन्याला',
      points: ['तुमची नेहमीची बीपी, शुगर आणि हृदयाची औषधे', 'प्रत्येक वेळी फार्मासिस्टने तपासलेले', 'प्रत्येक ऑर्डरपूर्वी आठवण'],
    },
  },
  {
    id: 'diapers', name: 'Diaper delivery', icon: 'package', edge: 'var(--terracotta)', often: 'Suggested: monthly or fortnightly',
    points: ['Right size and quantity', 'Delivered on schedule', 'Pause or change anytime'],
    hi: {
      name: 'डायपर डिलिवरी', often: 'सुझाव: हर महीने या हर 15 दिन',
      points: ['सही साइज़ और सही मात्रा', 'तय समय पर डिलिवरी', 'जब चाहें रोकें या बदलें'],
    },
    mr: {
      name: 'डायपर डिलिव्हरी', often: 'सुचवलेले: दर महिन्याला किंवा दर 15 दिवसांनी',
      points: ['योग्य साइझ आणि योग्य प्रमाण', 'ठरलेल्या वेळी डिलिव्हरी', 'कधीही थांबवा किंवा बदला'],
    },
  },
  {
    id: 'health-checks', name: 'Health checks at home', icon: 'heartPulse', edge: 'var(--green)', often: 'Suggested: monthly',
    points: ['Nurse BP and sugar check', 'Blood tests at home', 'Reports in the app'],
    hi: {
      name: 'घर पर हेल्थ चेक', often: 'सुझाव: हर महीने',
      points: ['नर्स बीपी और शुगर जाँचती हैं', 'घर पर ब्लड टेस्ट', 'रिपोर्ट ऐप में'],
    },
    mr: {
      name: 'घरी आरोग्य तपासणी', often: 'सुचवलेले: दर महिन्याला',
      points: ['नर्सकडून बीपी आणि शुगर तपासणी', 'घरी रक्त तपासणी', 'रिपोर्ट ॲपमध्ये'],
    },
  },
  {
    id: 'sachets', name: 'Dose sachets (pill packs)', icon: 'sun', edge: 'var(--mustard)', often: 'Suggested: monthly',
    points: ['Medicines sorted by time of day', 'Tear one, take the dose', 'No full strips, no leftovers'],
    hi: {
      name: 'डोज़ सैशे (गोलियों के पैक)', often: 'सुझाव: हर महीने',
      points: ['दवाइयाँ दिन के समय के हिसाब से अलग-अलग', 'एक पैकेट फाड़ें, खुराक लें', 'पूरी स्ट्रिप नहीं, कुछ बचता नहीं'],
    },
    mr: {
      name: 'डोस सॅशे (गोळ्यांचे पॅक)', often: 'सुचवलेले: दर महिन्याला',
      points: ['औषधे दिवसाच्या वेळेनुसार वेगळी केलेली', 'एक पाकीट फाडा, डोस घ्या', 'पूर्ण स्ट्रिप नाही, काही उरत नाही'],
    },
  },
];

// FAQ: cleaned up from the current way2cure.com (placeholder text removed) plus marketplace questions.
export const faqs = [
  {
    q: 'Where is Way2Cure available?', a: 'We serve Mumbai, Navi Mumbai and Thane.',
    hi: { q: 'Way2Cure कहाँ उपलब्ध है?', a: 'हम मुंबई, नवी मुंबई और ठाणे में सेवा देते हैं।' },
    mr: { q: 'Way2Cure कुठे उपलब्ध आहे?', a: 'आम्ही मुंबई, नवी मुंबई आणि ठाणे येथे सेवा देतो.' },
  },
  {
    q: 'What services does Way2Cure provide?', a: 'Nursing care at home, doctor visits, ICU at home, post-surgery care, elder and palliative care, bedridden patient care and baby care. You can also order medicines, medical devices, daily care items and equipment on rent.',
    hi: { q: 'Way2Cure कौन-सी सेवाएँ देता है?', a: 'घर पर नर्सिंग देखभाल, डॉक्टर विज़िट, घर पर आईसीयू, ऑपरेशन के बाद की देखभाल, बुज़ुर्गों और पैलिएटिव देखभाल, बिस्तर पर रहने वाले मरीज़ों की देखभाल और बच्चों की देखभाल। आप दवाइयाँ, मेडिकल उपकरण, रोज़ की देखभाल का सामान और किराये पर उपकरण भी मँगा सकते हैं।' },
    mr: { q: 'Way2Cure कोणत्या सेवा देते?', a: 'घरी नर्सिंग काळजी, डॉक्टरांची भेट, घरी आयसीयू, शस्त्रक्रियेनंतरची काळजी, ज्येष्ठांची आणि पॅलिएटिव्ह काळजी, अंथरुणाला खिळलेल्या रुग्णांची काळजी आणि बाळाची काळजी. तुम्ही औषधे, वैद्यकीय उपकरणे, दैनंदिन काळजीच्या वस्तू आणि भाड्याने उपकरणेही मागवू शकता.' },
  },
  {
    q: 'How do I order prescription medicines?', a: 'Upload a photo of your prescription in the Way2Cure app. Our system reads the medicines, you confirm the list, and a registered pharmacist checks it before we pack your order. AI assists, pharmacist decides.',
    hi: { q: 'पर्चे वाली दवाइयाँ कैसे मँगाएँ?', a: 'Way2Cure ऐप में अपने पर्चे की फ़ोटो अपलोड करें। हमारा सिस्टम दवाइयाँ पढ़ता है, आप सूची पक्की करते हैं, और ऑर्डर पैक करने से पहले एक रजिस्टर्ड फ़ार्मासिस्ट उसे जाँचते हैं। AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।' },
    mr: { q: 'प्रिस्क्रिप्शनची औषधे कशी मागवायची?', a: 'Way2Cure ॲपमध्ये तुमच्या प्रिस्क्रिप्शनचा फोटो अपलोड करा. आमची सिस्टम औषधे वाचते, तुम्ही यादी निश्चित करता, आणि ऑर्डर पॅक करण्यापूर्वी नोंदणीकृत फार्मासिस्ट ती तपासतात. AI मदत करते, निर्णय फार्मासिस्ट घेतात.' },
  },
  {
    q: 'Do you provide emergency services?', a: 'We mainly schedule planned care. For urgent needs, call 7400400908 and we will do our best to help. In a medical emergency, call 108 or go to the nearest hospital.',
    hi: { q: 'क्या आप इमरजेंसी सेवा देते हैं?', a: 'हम मुख्य रूप से पहले से तय देखभाल देते हैं। जल्दी ज़रूरत हो तो 7400400908 पर कॉल करें, हम पूरी कोशिश करेंगे। मेडिकल इमरजेंसी में 108 पर कॉल करें या सबसे पास के अस्पताल जाएँ।' },
    mr: { q: 'तुम्ही आपत्कालीन सेवा देता का?', a: 'आम्ही मुख्यतः आधी ठरवलेली काळजी देतो. तातडीची गरज असल्यास 7400400908 वर कॉल करा, आम्ही मदतीचा पूर्ण प्रयत्न करू. वैद्यकीय आणीबाणीत 108 वर कॉल करा किंवा जवळच्या रुग्णालयात जा.' },
  },
  {
    q: 'What are the payment options?', a: 'UPI, credit and debit cards, and net banking. You see the full price, including delivery, before you pay.',
    hi: { q: 'भुगतान के कौन-से तरीके हैं?', a: 'यूपीआई, क्रेडिट और डेबिट कार्ड, और नेट बैंकिंग। भुगतान से पहले आपको डिलिवरी समेत पूरी कीमत दिखती है।' },
    mr: { q: 'पैसे भरण्याचे कोणते पर्याय आहेत?', a: 'यूपीआय, क्रेडिट आणि डेबिट कार्ड, आणि नेट बँकिंग. पैसे भरण्यापूर्वी तुम्हाला डिलिव्हरीसह पूर्ण किंमत दिसते.' },
  },
  {
    q: 'Can I reschedule or cancel an appointment?', a: 'Yes. You can reschedule or cancel from the app or by calling us, subject to our cancellation policy. Please let us know at least 4 hours before the visit.',
    hi: { q: 'क्या मैं अपॉइंटमेंट का समय बदल सकता/सकती हूँ या रद्द कर सकता/सकती हूँ?', a: 'हाँ। हमारी कैंसलेशन पॉलिसी के अनुसार, आप ऐप से या हमें कॉल करके समय बदल सकते हैं या रद्द कर सकते हैं। कृपया विज़िट से कम से कम 4 घंटे पहले बताएँ।' },
    mr: { q: 'मी अपॉइंटमेंटची वेळ बदलू किंवा रद्द करू शकतो/शकते का?', a: 'हो. आमच्या रद्द करण्याच्या धोरणानुसार, तुम्ही ॲपमधून किंवा आम्हाला कॉल करून वेळ बदलू किंवा रद्द करू शकता. कृपया भेटीच्या किमान 4 तास आधी कळवा.' },
  },
  {
    q: 'How are the caretakers and nurses chosen?', a: 'Our caregivers and nurses are trained, certified professionals with home healthcare and hospital experience. Every one of them is background-checked.',
    hi: { q: 'केयरटेकर और नर्स कैसे चुने जाते हैं?', a: 'हमारे केयरगिवर और नर्स प्रशिक्षित और सर्टिफ़ाइड हैं, जिन्हें घर पर देखभाल और अस्पताल का अनुभव है। हर एक के बैकग्राउंड की जाँच की जाती है।' },
    mr: { q: 'केअरटेकर आणि नर्सची निवड कशी होते?', a: 'आमचे केअरगिव्हर आणि नर्स प्रशिक्षित, प्रमाणित आहेत आणि त्यांना घरी काळजी व रुग्णालयाचा अनुभव आहे. प्रत्येकाची पार्श्वभूमी तपासली जाते.' },
  },
  {
    q: 'Can I request a specific caretaker?', a: 'Yes. Based on availability, we will try to send the caretaker you ask for.',
    hi: { q: 'क्या मैं किसी खास केयरटेकर को माँग सकता/सकती हूँ?', a: 'हाँ। उपलब्धता के हिसाब से, हम आपके बताए केयरटेकर को भेजने की कोशिश करेंगे।' },
    mr: { q: 'मी एखाद्या ठरावीक केअरटेकरची मागणी करू शकतो/शकते का?', a: 'हो. उपलब्धतेनुसार, तुम्ही सांगितलेल्या केअरटेकरला पाठवण्याचा आम्ही प्रयत्न करू.' },
  },
  {
    q: 'Can I order for my parents from another city?', a: 'Yes. Add their address and a family profile, and pay online. They share the delivery OTP with the rider, and you get updates on SMS and WhatsApp.',
    hi: { q: 'क्या मैं दूसरे शहर से अपने माता-पिता के लिए ऑर्डर कर सकता/सकती हूँ?', a: 'हाँ। उनका पता और परिवार की प्रोफ़ाइल जोड़ें, और ऑनलाइन भुगतान करें। वे राइडर को डिलिवरी OTP बताते हैं, और आपको SMS और व्हाट्सऐप पर अपडेट मिलते हैं।' },
    mr: { q: 'मी दुसऱ्या शहरातून माझ्या आई-वडिलांसाठी ऑर्डर करू शकतो/शकते का?', a: 'हो. त्यांचा पत्ता आणि कुटुंबाची प्रोफाइल जोडा, आणि ऑनलाइन पैसे भरा. ते रायडरला डिलिव्हरी OTP सांगतात, आणि तुम्हाला SMS आणि व्हॉट्सॲपवर अपडेट मिळतात.' },
  },
  {
    q: 'How do I pause a subscription?', a: 'Go to Subscriptions, then Manage / pause plan. Tap Pause. Nothing is charged while a plan is paused.',
    hi: { q: 'सब्सक्रिप्शन कैसे रोकें?', a: 'सब्सक्रिप्शन में जाएँ, फिर "प्लान संभालें / रोकें" चुनें। "रोकें" दबाएँ। प्लान रुका रहने तक कोई पैसा नहीं कटता।' },
    mr: { q: 'सदस्यता कशी थांबवायची?', a: 'सदस्यता मध्ये जा, मग "प्लॅन व्यवस्थापित करा / थांबवा" निवडा. "थांबवा" वर टॅप करा. प्लॅन थांबलेला असताना कोणतेही पैसे कापले जात नाहीत.' },
  },
];

export const team = [
  { name: 'Dr. Ramesh R. Khandare', role: 'Director', hi: { role: 'डायरेक्टर' }, mr: { role: 'संचालक' } },
  { name: 'Dr. Samidha Patil', role: 'Chief Operating Officer', hi: { role: 'चीफ़ ऑपरेटिंग ऑफ़िसर' }, mr: { role: 'मुख्य परिचालन अधिकारी' } },
  { name: 'Dr. Pratik Biswas', role: 'Team Advisor · MS, DNB (General Surgeon)', hi: { role: 'टीम सलाहकार · MS, DNB (जनरल सर्जन)' }, mr: { role: 'टीम सल्लागार · MS, DNB (जनरल सर्जन)' } },
  { name: 'Dr. Nishikant Rokade', role: 'Team Advisor · MS, DNB, Senior Consultant', hi: { role: 'टीम सलाहकार · MS, DNB, सीनियर कंसल्टेंट' }, mr: { role: 'टीम सल्लागार · MS, DNB, वरिष्ठ सल्लागार' } },
];
