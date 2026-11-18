import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import CardArrow from '../components/ui/CardArrow';
import PageHeader from '../components/layout/PageHeader';
import Seo, { medicalBusinessLd } from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Accent from '../components/ui/Accent';
import { Field, Input, Select, Textarea, describedBy } from '../components/ui/Field';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import { SITE } from '../config/site';
import { crossfade } from '../lib/motion';
import { useT, type Dict } from '../i18n/LangContext';

// Contact page, top to bottom:
//  1. Three ways to reach us (call, WhatsApp, email)
//  2. Write to us: a message form (with how we should reply) next to our hours and lines
//  3. "Prefer to talk?" call band
//  4. Offices and home-care areas
//  5. Grievance redressal (#grievance): the officer, the timelines, and a grievance form
// Select options are stored by id so a language switch never breaks a form.
const TOPICS = ['medicines', 'nurse', 'icu', 'equipment', 'subscriptions', 'feedback', 'other'];
const REPLY = ['call', 'whatsapp', 'email'] as const;
const GRIEVANCE = ['order', 'quality', 'visit', 'rental', 'payment', 'privacy', 'other'];

const T: Dict = {
  en: {
    seoDesc: "Call Way2Cure 24/7 on +91 74004 00908, WhatsApp us or write to us. Grievance redressal, and offices in Vashi, Navi Mumbai and Malad East, Mumbai.",
    eyebrow: 'Contact',
    title: "We're family, *not just care.*",
    intro: 'Call, WhatsApp or write to us. We can place an order or book care for you over the phone.',
    open247: 'Phone and WhatsApp are answered 24/7, every day of the year.',
    reach: 'Talk to us',
    callLabel: 'Call us', callSub: 'Talk to a care advisor now', chip247: 'Open 24/7', chipEmail: 'Reply in 1 working day',
    callCta: 'Call now', waCta: 'Open WhatsApp', mailCta: 'Write to us',
    whatsapp: 'WhatsApp', whatsappText: 'Message us any time', email: 'Email', emailText: 'We reply within one working day.',

    writeTitle: 'Write to *us*',
    writeLead: 'A question, a request or a suggestion: send it here and the right person will get back to you.',
    hoursTitle: 'When we answer',
    hoursPhone: 'Phone and WhatsApp: 24 hours, every day',
    hoursMail: 'Messages and email: within one working day',
    lineTitle: 'Our lines',
    name: 'Your name', phone: 'Mobile number', emailField: 'Email', optional: '(optional)',
    topicLabel: 'What is it about?', message: 'Your message', messageHint: 'Tell us a little about what you need.',
    replyLabel: 'How should we reply?', 'reply.call': 'Call me', 'reply.whatsapp': 'WhatsApp', 'reply.email': 'Email',
    send: 'Send message',
    formNote: 'We use your details only to reply to this message.',
    thanks: 'Thank you, {name}.',
    'sent.call': 'We will call you on {phone} soon.',
    'sent.whatsapp': 'We will message you on WhatsApp at {phone} soon.',
    'sent.email': 'We will reply to {email} within one working day.',
    refLabel: 'Your reference', another: 'Send another message',
    checkOne: 'Please check the field marked below.', checkMany: 'Please check the {n} fields marked below.',
    errName: 'Please add your name.', errPhone: 'Please enter a 10-digit mobile number.',
    errEmail: 'Please enter a valid email address.', errEmailNeeded: 'Add your email so we can reply by email.',
    errMessage: 'Please write a few words (at least 10 letters).',
    'topic.medicines': 'Medicines and orders', 'topic.nurse': 'Nurse or doctor at home', 'topic.icu': 'ICU or specialised care',
    'topic.equipment': 'Renting equipment', 'topic.subscriptions': 'Subscriptions', 'topic.feedback': 'Feedback or a suggestion', 'topic.other': 'Something else',

    bandTitle: 'Prefer to *talk?*',
    bandText: 'A care advisor picks up day and night. We can order medicines, book a nurse or arrange equipment while you are on the call.',
    callNow: 'Call {phone}', chatNow: 'Chat on WhatsApp',

    offices: 'Our offices', directions: 'Get directions',
    'office:Head office (Vashi)': 'Head office (Vashi)', 'office:Mumbai branch (Malad East)': 'Mumbai branch (Malad East)',
    areas: 'Home care near you',
    areasText: 'Our nurses and caretakers visit homes across Mumbai, Navi Mumbai and Thane, including Vashi and Airoli.',

    gTitle: 'Grievance *redressal*',
    gLead: 'If something went wrong with an order, a visit, a rental or a payment, and our support team has not put it right, raise a grievance here. It goes straight to our Grievance Officer.',
    officer: 'Grievance Officer', officerOf: '{brand}',
    howTitle: 'What happens next',
    g1: 'We acknowledge it', g1t: 'Within 48 hours, with your grievance number.',
    g2: 'We look into it', g2t: 'The officer checks the order, visit or payment and keeps you updated.',
    g3: 'We resolve it', g3t: 'Within one month of receiving it, as the e-commerce rules require.',
    escalate: 'Still not happy with the outcome? You can contact the National Consumer Helpline on 1915 or at consumerhelpline.gov.in.',
    gFormTitle: 'Raise a grievance',
    orderId: 'Order or booking number', orderHint: 'You will find it in My orders or in your confirmation message.',
    gType: 'What went wrong?', gDetails: 'What happened?', gDetailsHint: 'Dates, names and amounts help us sort it out faster.',
    gSubmit: 'Submit grievance',
    gThanks: 'We have your grievance, {name}.',
    gSent: 'We will acknowledge it within 48 hours and call you on {phone}. Keep this number for any follow-up.',
    gRef: 'Grievance number', gAnother: 'Raise another grievance',
    'g.order': 'Order or delivery', 'g.quality': 'Product or medicine quality', 'g.visit': 'Nurse, caretaker or doctor visit',
    'g.rental': 'Equipment rental', 'g.payment': 'Payment or refund', 'g.privacy': 'My data or privacy', 'g.other': 'Something else',
    errDetails: 'Please describe what happened (at least 20 letters).',
  },
  hi: {
    seoDesc: "Way2Cure को 24/7 +91 74004 00908 पर कॉल करें, व्हाट्सऐप करें या हमें लिखें। शिकायत निवारण, और वाशी, नवी मुंबई व मालाड ईस्ट, मुंबई में ऑफ़िस।",
    eyebrow: 'संपर्क',
    title: 'हम सिर्फ़ देखभाल नहीं, *परिवार हैं।*',
    intro: 'कॉल करें, व्हाट्सऐप करें या हमें लिखें। हम फ़ोन पर ही आपके लिए ऑर्डर कर सकते हैं या देखभाल बुक कर सकते हैं।',
    open247: 'फ़ोन और व्हाट्सऐप पर 24/7, साल के हर दिन जवाब मिलता है।',
    reach: 'हमसे बात करें',
    callLabel: 'कॉल करें', callSub: 'अभी केयर सलाहकार से बात करें', chip247: '24/7 खुला', chipEmail: '1 कामकाजी दिन में जवाब',
    callCta: 'अभी कॉल करें', waCta: 'व्हाट्सऐप खोलें', mailCta: 'हमें लिखें',
    whatsapp: 'व्हाट्सऐप', whatsappText: 'कभी भी मैसेज करें', email: 'ईमेल', emailText: 'हम एक कामकाजी दिन में जवाब देते हैं।',

    writeTitle: 'हमें *लिखें*',
    writeLead: 'कोई सवाल, अनुरोध या सुझाव हो, यहाँ भेजें। सही व्यक्ति आपसे संपर्क करेगा।',
    hoursTitle: 'हम कब जवाब देते हैं',
    hoursPhone: 'फ़ोन और व्हाट्सऐप: 24 घंटे, हर दिन',
    hoursMail: 'मैसेज और ईमेल: एक कामकाजी दिन में',
    lineTitle: 'हमारे नंबर',
    name: 'आपका नाम', phone: 'मोबाइल नंबर', emailField: 'ईमेल', optional: '(ज़रूरी नहीं)',
    topicLabel: 'किस बारे में है?', message: 'आपका संदेश', messageHint: 'थोड़ा बताएँ कि आपको क्या चाहिए।',
    replyLabel: 'हम जवाब कैसे दें?', 'reply.call': 'कॉल करें', 'reply.whatsapp': 'व्हाट्सऐप', 'reply.email': 'ईमेल',
    send: 'संदेश भेजें',
    formNote: 'हम आपकी जानकारी सिर्फ़ इस संदेश का जवाब देने के लिए इस्तेमाल करते हैं।',
    thanks: 'धन्यवाद, {name}।',
    'sent.call': 'हम जल्द ही आपको {phone} पर कॉल करेंगे।',
    'sent.whatsapp': 'हम जल्द ही आपको {phone} पर व्हाट्सऐप करेंगे।',
    'sent.email': 'हम एक कामकाजी दिन में {email} पर जवाब देंगे।',
    refLabel: 'आपका रेफ़रेंस', another: 'एक और संदेश भेजें',
    checkOne: 'कृपया नीचे निशान लगी जानकारी जाँचें।', checkMany: 'कृपया नीचे निशान लगी {n} जानकारियाँ जाँचें।',
    errName: 'कृपया अपना नाम लिखें।', errPhone: 'कृपया 10 अंकों का मोबाइल नंबर लिखें।',
    errEmail: 'कृपया सही ईमेल पता लिखें।', errEmailNeeded: 'ईमेल से जवाब के लिए अपना ईमेल लिखें।',
    errMessage: 'कृपया कुछ शब्द लिखें (कम से कम 10 अक्षर)।',
    'topic.medicines': 'दवाइयाँ और ऑर्डर', 'topic.nurse': 'घर पर नर्स या डॉक्टर', 'topic.icu': 'आईसीयू या ख़ास देखभाल',
    'topic.equipment': 'उपकरण किराये पर', 'topic.subscriptions': 'सब्सक्रिप्शन', 'topic.feedback': 'राय या सुझाव', 'topic.other': 'कुछ और',

    bandTitle: 'बात करना *पसंद है?*',
    bandText: 'हमारे केयर सलाहकार दिन-रात फ़ोन उठाते हैं। कॉल पर ही हम दवाइयाँ मँगा सकते हैं, नर्स बुक कर सकते हैं या उपकरण का इंतज़ाम कर सकते हैं।',
    callNow: '{phone} पर कॉल करें', chatNow: 'व्हाट्सऐप पर चैट करें',

    offices: 'हमारे ऑफ़िस', directions: 'रास्ता देखें',
    'office:Head office (Vashi)': 'मुख्य ऑफ़िस (वाशी)', 'office:Mumbai branch (Malad East)': 'मुंबई ब्रांच (मालाड ईस्ट)',
    areas: 'आपके पास घर पर देखभाल',
    areasText: 'हमारी नर्स और केयरटेकर पूरे मुंबई, नवी मुंबई और ठाणे में घरों पर आते हैं, वाशी और ऐरोली सहित।',

    gTitle: 'शिकायत *निवारण*',
    gLead: 'अगर किसी ऑर्डर, विज़िट, किराये या भुगतान में कुछ गड़बड़ हुई और हमारी सपोर्ट टीम उसे ठीक नहीं कर पाई, तो यहाँ शिकायत दर्ज करें। यह सीधे हमारे शिकायत अधिकारी के पास जाती है।',
    officer: 'शिकायत अधिकारी', officerOf: '{brand}',
    howTitle: 'आगे क्या होता है',
    g1: 'हम पुष्टि करते हैं', g1t: '48 घंटों में, आपके शिकायत नंबर के साथ।',
    g2: 'हम जाँच करते हैं', g2t: 'अधिकारी ऑर्डर, विज़िट या भुगतान जाँचते हैं और आपको जानकारी देते रहते हैं।',
    g3: 'हम हल करते हैं', g3t: 'शिकायत मिलने के एक महीने के भीतर, ई-कॉमर्स नियमों के अनुसार।',
    escalate: 'नतीजे से अब भी संतुष्ट नहीं? आप राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 पर या consumerhelpline.gov.in पर संपर्क कर सकते हैं।',
    gFormTitle: 'शिकायत दर्ज करें',
    orderId: 'ऑर्डर या बुकिंग नंबर', orderHint: 'यह "मेरे ऑर्डर" में या आपके पुष्टि संदेश में मिलेगा।',
    gType: 'क्या गड़बड़ हुई?', gDetails: 'क्या हुआ?', gDetailsHint: 'तारीख़, नाम और रक़म बताने से हम जल्दी हल कर पाते हैं।',
    gSubmit: 'शिकायत भेजें',
    gThanks: 'आपकी शिकायत मिल गई, {name}।',
    gSent: 'हम 48 घंटों में पुष्टि करेंगे और आपको {phone} पर कॉल करेंगे। आगे की बात के लिए यह नंबर संभालकर रखें।',
    gRef: 'शिकायत नंबर', gAnother: 'एक और शिकायत दर्ज करें',
    'g.order': 'ऑर्डर या डिलीवरी', 'g.quality': 'सामान या दवा की गुणवत्ता', 'g.visit': 'नर्स, केयरटेकर या डॉक्टर की विज़िट',
    'g.rental': 'उपकरण किराया', 'g.payment': 'भुगतान या रिफ़ंड', 'g.privacy': 'मेरा डेटा या निजता', 'g.other': 'कुछ और',
    errDetails: 'कृपया बताएँ कि क्या हुआ (कम से कम 20 अक्षर)।',
  },
  mr: {
    seoDesc: "Way2Cure ला 24/7 +91 74004 00908 वर कॉल करा, व्हॉट्सॲप करा किंवा आम्हाला लिहा. तक्रार निवारण, आणि वाशी, नवी मुंबई व मालाड पूर्व, मुंबई येथे ऑफिस.",
    eyebrow: 'संपर्क',
    title: 'आम्ही फक्त काळजी नाही, *कुटुंब आहोत.*',
    intro: 'कॉल करा, व्हॉट्सॲप करा किंवा आम्हाला लिहा. आम्ही फोनवरच तुमच्यासाठी ऑर्डर करू शकतो किंवा काळजी बुक करू शकतो.',
    open247: 'फोन आणि व्हॉट्सॲपवर 24/7, वर्षाच्या प्रत्येक दिवशी उत्तर मिळते.',
    reach: 'आमच्याशी बोला',
    callLabel: 'कॉल करा', callSub: 'आत्ताच केअर सल्लागाराशी बोला', chip247: '24/7 सुरू', chipEmail: '1 कामकाजाच्या दिवसात उत्तर',
    callCta: 'आत्ता कॉल करा', waCta: 'व्हॉट्सॲप उघडा', mailCta: 'आम्हाला लिहा',
    whatsapp: 'व्हॉट्सॲप', whatsappText: 'कधीही मेसेज करा', email: 'ईमेल', emailText: 'आम्ही एका कामकाजाच्या दिवसात उत्तर देतो.',

    writeTitle: 'आम्हाला *लिहा*',
    writeLead: 'प्रश्न, विनंती किंवा सूचना असो, इथे पाठवा. योग्य व्यक्ती तुमच्याशी संपर्क करेल.',
    hoursTitle: 'आम्ही कधी उत्तर देतो',
    hoursPhone: 'फोन आणि व्हॉट्सॲप: 24 तास, दररोज',
    hoursMail: 'मेसेज आणि ईमेल: एका कामकाजाच्या दिवसात',
    lineTitle: 'आमचे नंबर',
    name: 'तुमचे नाव', phone: 'मोबाइल नंबर', emailField: 'ईमेल', optional: '(आवश्यक नाही)',
    topicLabel: 'कशाबद्दल आहे?', message: 'तुमचा संदेश', messageHint: 'तुम्हाला काय हवे आहे ते थोडक्यात सांगा.',
    replyLabel: 'आम्ही उत्तर कसे देऊ?', 'reply.call': 'कॉल करा', 'reply.whatsapp': 'व्हॉट्सॲप', 'reply.email': 'ईमेल',
    send: 'संदेश पाठवा',
    formNote: 'आम्ही तुमची माहिती फक्त या संदेशाला उत्तर देण्यासाठी वापरतो.',
    thanks: 'धन्यवाद, {name}.',
    'sent.call': 'आम्ही लवकरच तुम्हाला {phone} वर कॉल करू.',
    'sent.whatsapp': 'आम्ही लवकरच तुम्हाला {phone} वर व्हॉट्सॲप करू.',
    'sent.email': 'आम्ही एका कामकाजाच्या दिवसात {email} वर उत्तर देऊ.',
    refLabel: 'तुमचा संदर्भ क्रमांक', another: 'आणखी एक संदेश पाठवा',
    checkOne: 'कृपया खाली खूण केलेली माहिती तपासा.', checkMany: 'कृपया खाली खूण केलेल्या {n} माहिती तपासा.',
    errName: 'कृपया तुमचे नाव लिहा.', errPhone: 'कृपया 10 अंकी मोबाइल नंबर लिहा.',
    errEmail: 'कृपया योग्य ईमेल पत्ता लिहा.', errEmailNeeded: 'ईमेलने उत्तरासाठी तुमचा ईमेल लिहा.',
    errMessage: 'कृपया काही शब्द लिहा (किमान 10 अक्षरे).',
    'topic.medicines': 'औषधे आणि ऑर्डर', 'topic.nurse': 'घरी नर्स किंवा डॉक्टर', 'topic.icu': 'आयसीयू किंवा विशेष काळजी',
    'topic.equipment': 'उपकरणे भाड्याने', 'topic.subscriptions': 'सदस्यता', 'topic.feedback': 'अभिप्राय किंवा सूचना', 'topic.other': 'आणखी काही',

    bandTitle: 'बोलायला *आवडते?*',
    bandText: 'आमचे केअर सल्लागार दिवस-रात्र फोन उचलतात. कॉलवरच आम्ही औषधे मागवू शकतो, नर्स बुक करू शकतो किंवा उपकरणांची व्यवस्था करू शकतो.',
    callNow: '{phone} वर कॉल करा', chatNow: 'व्हॉट्सॲपवर चॅट करा',

    offices: 'आमची ऑफिस', directions: 'रस्ता पाहा',
    'office:Head office (Vashi)': 'मुख्य ऑफिस (वाशी)', 'office:Mumbai branch (Malad East)': 'मुंबई शाखा (मालाड पूर्व)',
    areas: 'तुमच्या जवळ घरी काळजी',
    areasText: 'आमच्या नर्स आणि केअरटेकर संपूर्ण मुंबई, नवी मुंबई आणि ठाणे येथे घरी येतात, वाशी आणि ऐरोलीसह.',

    gTitle: 'तक्रार *निवारण*',
    gLead: 'एखादी ऑर्डर, भेट, भाडे किंवा पेमेंट यात काही चूक झाली आणि आमच्या सपोर्ट टीमने ती दुरुस्त केली नाही, तर इथे तक्रार नोंदवा. ती थेट आमच्या तक्रार अधिकाऱ्याकडे जाते.',
    officer: 'तक्रार अधिकारी', officerOf: '{brand}',
    howTitle: 'पुढे काय होते',
    g1: 'आम्ही पोच देतो', g1t: '48 तासांत, तुमच्या तक्रार क्रमांकासह.',
    g2: 'आम्ही तपासतो', g2t: 'अधिकारी ऑर्डर, भेट किंवा पेमेंट तपासतात आणि तुम्हाला माहिती देत राहतात.',
    g3: 'आम्ही सोडवतो', g3t: 'तक्रार मिळाल्यापासून एका महिन्यात, ई-कॉमर्स नियमांनुसार.',
    escalate: 'निकालाने अजूनही समाधान नाही? तुम्ही राष्ट्रीय ग्राहक हेल्पलाइन 1915 वर किंवा consumerhelpline.gov.in वर संपर्क करू शकता.',
    gFormTitle: 'तक्रार नोंदवा',
    orderId: 'ऑर्डर किंवा बुकिंग क्रमांक', orderHint: 'तो "माझ्या ऑर्डर" मध्ये किंवा तुमच्या पुष्टी संदेशात मिळेल.',
    gType: 'काय चुकले?', gDetails: 'काय झाले?', gDetailsHint: 'तारखा, नावे आणि रक्कम सांगितल्यास आम्ही लवकर सोडवू शकतो.',
    gSubmit: 'तक्रार पाठवा',
    gThanks: 'तुमची तक्रार मिळाली, {name}.',
    gSent: 'आम्ही 48 तासांत पोच देऊ आणि तुम्हाला {phone} वर कॉल करू. पुढील पाठपुराव्यासाठी हा क्रमांक जपून ठेवा.',
    gRef: 'तक्रार क्रमांक', gAnother: 'आणखी एक तक्रार नोंदवा',
    'g.order': 'ऑर्डर किंवा डिलिव्हरी', 'g.quality': 'वस्तू किंवा औषधाची गुणवत्ता', 'g.visit': 'नर्स, केअरटेकर किंवा डॉक्टरची भेट',
    'g.rental': 'उपकरण भाडे', 'g.payment': 'पेमेंट किंवा परतावा', 'g.privacy': 'माझा डेटा किंवा गोपनीयता', 'g.other': 'आणखी काही',
    errDetails: 'कृपया काय झाले ते सांगा (किमान 20 अक्षरे).',
  },
};

const channel =
  'group flex w-full flex-col rounded-[1.75rem] border border-line bg-white p-2.5 text-ink no-underline shadow-card transition-[transform,box-shadow,border-color] duration-slow ease-soft hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_44px_-24px_rgb(38_52_69/0.5)]';

// The three ways to reach us. Phone and WhatsApp are answered 24/7 (see open247).
const CHANNELS = [
  { id: 'call', href: SITE.phoneHref, external: false, icon: 'phone', value: SITE.phoneDisplay, label: 'callLabel', sub: 'callSub', chip: 'chip247', cta: 'callCta',
    stage: 'bg-[linear-gradient(160deg,#FDF0F2,#FFF8F9)]', ring: 'border-terracotta-deep/15', tile: 'bg-terracotta-deep', dot: 'bg-terracotta-deep' },
  { id: 'whatsapp', href: SITE.whatsappHref, external: true, icon: 'whatsapp', value: SITE.phoneDisplay, label: 'whatsapp', sub: 'whatsappText', chip: 'chip247', cta: 'waCta',
    stage: 'bg-[linear-gradient(160deg,#E6F6EC,#F5FBF7)]', ring: 'border-whatsapp/20', tile: 'bg-whatsapp', dot: 'bg-whatsapp' },
  { id: 'email', href: '#write', external: false, icon: 'mail', value: SITE.email, label: 'email', sub: 'emailText', chip: 'chipEmail', cta: 'mailCta',
    stage: 'bg-[linear-gradient(160deg,#E7F0FA,#F5F9FD)]', ring: 'border-sage/20', tile: 'bg-sage', dot: 'bg-sage' },
] as const;

const mapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;
/** Demo reference numbers until the API issues real ones. */
const refNo = (prefix: string) => `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

type Tr = ReturnType<typeof useT>;

/** Red bar + heading, the small accent used by the section headings on this page. */
function Heading({ id, text, lead }: { id: string; text: string; lead?: string }) {
  return (
    <div>
      <span aria-hidden="true" className="mb-4 block h-1 w-12 rounded-full bg-terracotta-deep" />
      <h2 id={id} className="mb-3 text-section"><Accent text={text} /></h2>
      {lead && <p className="m-0 text-lead text-ink/75">{lead}</p>}
    </div>
  );
}

/** The "please check N fields" line at the top of a form. */
function ErrorSummary({ n, tr }: { n: number; tr: Tr }) {
  return (
    <p aria-live="polite" className="m-0 empty:hidden">
      {n > 0 && (
        <span className="flex items-center gap-2 rounded-btn bg-terracotta-deep/10 px-4 py-3 font-bold text-terracotta-deep">
          <Icon name="warning" size={18} /> {n === 1 ? tr('checkOne') : tr('checkMany', { n })}
        </span>
      )}
    </p>
  );
}

/** Mobile number input with the +91 prefix. */
function PhoneInput({ id, value, invalid, error, onChange }: { id: string; value: string; invalid: boolean; error?: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-stretch">
      <span aria-hidden="true" className="grid min-h-tap place-items-center rounded-l-xl border-2 border-r-0 border-mint bg-mist px-3.5 font-bold text-green">+91</span>
      <Input id={id} type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={value} invalid={invalid}
        className="rounded-l-none" aria-describedby={describedBy(id, { error })}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))} />
    </div>
  );
}

/** Success panel shared by both forms. */
function Done({ title, text, refLabel, refValue, again, onAgain }: { title: string; text: string; refLabel: string; refValue: string; again: string; onAgain: () => void }) {
  return (
    <m.div key="sent" {...crossfade} role="status" className="grid justify-items-start gap-4 py-4">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-green text-white"><Icon name="check" size={28} /></span>
      <h3 className="m-0 font-head text-h2m font-bold text-green md:text-h2">{title}</h3>
      <p className="m-0 text-lead text-ink/80">{text}</p>
      <p className="m-0 rounded-btn bg-mist px-4 py-3 text-base">
        <span className="text-grey">{refLabel}: </span><strong className="font-head text-green">{refValue}</strong>
      </p>
      <Button variant="outline" compact onClick={onAgain}>{again}</Button>
    </m.div>
  );
}

function InfoRow({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-green shadow-card"><Icon name={icon} size={20} /></span>
      <div className="grid gap-0.5 pt-0.5">
        <strong className="text-green">{title}</strong>
        {children}
      </div>
    </li>
  );
}

// ---------------------------------------------------------------- Write to us

type WriteErrors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>;

function WriteToUs({ tr }: { tr: Tr }) {
  const empty = { name: '', phone: '', email: '', topic: 'medicines', message: '', reply: 'call' as (typeof REPLY)[number] };
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<WriteErrors>({});
  const [ref, setRef] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: WriteErrors = {};
    if (!f.name.trim()) er.name = 'errName';
    if (!PHONE_RE.test(f.phone)) er.phone = 'errPhone';
    if (f.email.trim() && !EMAIL_RE.test(f.email.trim())) er.email = 'errEmail';
    else if (f.reply === 'email' && !f.email.trim()) er.email = 'errEmailNeeded';
    if (f.message.trim().length < 10) er.message = 'errMessage';
    setErrors(er);
    // TODO: API: POST /messages { name, phone, email, topic, message, reply }
    if (!Object.keys(er).length) setRef(refNo('MSG'));
  };
  const err = (k: keyof WriteErrors) => (errors[k] ? tr(errors[k]!) : undefined);

  return (
    <section id="write" aria-labelledby="write-h" className="section bg-mist">
      <div className="container grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="grid gap-8 lg:pt-4">
          <Heading id="write-h" text={tr('writeTitle')} lead={tr('writeLead')} />
          <ul className="m-0 grid list-none gap-5 p-0">
            <InfoRow icon="clock" title={tr('hoursTitle')}>
              <span className="text-ink/80">{tr('hoursPhone')}</span>
              <span className="text-ink/80">{tr('hoursMail')}</span>
            </InfoRow>
            <InfoRow icon="phone" title={tr('lineTitle')}>
              <a href={SITE.phoneHref} className="font-bold">{SITE.phoneDisplay}</a>
              <a href={`mailto:${SITE.email}`} className="break-all font-bold">{SITE.email}</a>
            </InfoRow>
          </ul>
        </Reveal>

        <Reveal className="rounded-panel bg-white p-6 shadow-raised md:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {ref ? (
              <Done
                title={tr('thanks', { name: f.name.trim().split(' ')[0] })}
                text={tr(`sent.${f.reply}`, { phone: `+91 ${f.phone}`, email: f.email.trim() })}
                refLabel={tr('refLabel')} refValue={ref}
                again={tr('another')} onAgain={() => { setF(empty); setRef(''); }}
              />
            ) : (
              <m.form key="form" {...crossfade} onSubmit={submit} noValidate className="grid gap-5">
                <ErrorSummary n={Object.keys(errors).length} tr={tr} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="w-name" label={tr('name')} error={err('name')}>
                    <Input id="w-name" autoComplete="name" value={f.name} invalid={!!errors.name}
                      aria-describedby={describedBy('w-name', { error: errors.name })}
                      onChange={(e) => setF({ ...f, name: e.target.value })} />
                  </Field>
                  <Field id="w-phone" label={tr('phone')} error={err('phone')}>
                    <PhoneInput id="w-phone" value={f.phone} invalid={!!errors.phone} error={errors.phone} onChange={(phone) => setF({ ...f, phone })} />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="w-email" label={<>{tr('emailField')} {f.reply !== 'email' && <span className="font-semibold text-grey">{tr('optional')}</span>}</>} error={err('email')}>
                    <Input id="w-email" type="email" autoComplete="email" value={f.email} invalid={!!errors.email}
                      aria-describedby={describedBy('w-email', { error: errors.email })}
                      onChange={(e) => setF({ ...f, email: e.target.value })} />
                  </Field>
                  <Field id="w-topic" label={tr('topicLabel')}>
                    <Select id="w-topic" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
                      {TOPICS.map((o) => <option key={o} value={o}>{tr(`topic.${o}`)}</option>)}
                    </Select>
                  </Field>
                </div>
                <Field id="w-msg" label={tr('message')} hint={tr('messageHint')} error={err('message')}>
                  <Textarea id="w-msg" rows={5} value={f.message} invalid={!!errors.message} className="resize-y"
                    aria-describedby={describedBy('w-msg', { hint: true, error: errors.message })}
                    onChange={(e) => setF({ ...f, message: e.target.value })} />
                </Field>
                <fieldset className="m-0 grid gap-2 border-0 p-0">
                  <legend className="mb-1.5 p-0 font-bold text-green">{tr('replyLabel')}</legend>
                  <div className="flex flex-wrap gap-2">
                    {REPLY.map((r) => (
                      <label key={r} className={`inline-flex min-h-tap cursor-pointer items-center gap-2 rounded-full border-2 px-4 font-bold transition-colors duration-micro has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green ${
                        f.reply === r ? 'border-green bg-green text-white' : 'border-mint bg-white text-green hover:border-green/50'
                      }`}>
                        <input type="radio" name="w-reply" value={r} checked={f.reply === r} onChange={() => setF({ ...f, reply: r })} className="sr-only" />
                        <Icon name={r === 'call' ? 'phone' : r === 'whatsapp' ? 'whatsapp' : 'mail'} size={17} /> {tr(`reply.${r}`)}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Button type="submit" variant="urgent" block><Icon name="arrow" size={20} /> {tr('send')}</Button>
                <p className="m-0 flex items-start gap-2 text-small text-grey">
                  <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-sage" /> {tr('formNote')}
                </p>
              </m.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Call band

function CallBand({ tr }: { tr: Tr }) {
  return (
    <section aria-labelledby="band-h" className="relative overflow-hidden bg-green py-14 text-white lg:py-20">
      {/* Soft rings and a dot grid, so the band is not a flat block of colour */}
      <span aria-hidden="true" className="absolute -left-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
      <span aria-hidden="true" className="absolute -left-10 -top-10 h-52 w-52 rounded-full border border-dashed border-white/15" />
      <span aria-hidden="true" className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.08),transparent_70%)]" />
      <span aria-hidden="true" className="absolute bottom-8 right-10 hidden h-24 w-36 bg-[radial-gradient(rgb(255_255_255/0.25)_1.5px,transparent_1.5px)] [background-size:12px_12px] md:block" />
      <Reveal className="container relative grid justify-items-center gap-5 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"><Icon name="phone" size={28} /></span>
        <h2 id="band-h" className="m-0 text-section text-white [&_em]:text-mustard"><Accent text={tr('bandTitle')} /></h2>
        <span aria-hidden="true" className="h-1 w-24 rounded-full bg-terracotta-deep" />
        <p className="m-0 max-w-2xl text-lead text-white/85">{tr('bandText')}</p>
        <a href={SITE.phoneHref} className="font-head text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-bold tracking-[-0.01em] text-white no-underline hover:underline">{SITE.phoneDisplay}</a>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={SITE.phoneHref} variant="urgent"><Icon name="phone" size={20} /> {tr('callNow', { phone: SITE.phoneDisplay })}</Button>
          <Button href={SITE.whatsappHref} external variant="outline-light"><Icon name="whatsapp" size={20} /> {tr('chatNow')}</Button>
        </div>
      </Reveal>
    </section>
  );
}

// ---------------------------------------------------------------- Grievance

type GErrors = Partial<Record<'name' | 'phone' | 'email' | 'details', string>>;

function Grievance({ tr }: { tr: Tr }) {
  const empty = { name: '', phone: '', email: '', order: '', type: 'order', details: '' };
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<GErrors>({});
  const [ref, setRef] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: GErrors = {};
    if (!f.name.trim()) er.name = 'errName';
    if (!PHONE_RE.test(f.phone)) er.phone = 'errPhone';
    if (f.email.trim() && !EMAIL_RE.test(f.email.trim())) er.email = 'errEmail';
    if (f.details.trim().length < 20) er.details = 'errDetails';
    setErrors(er);
    // TODO: API: POST /grievances { name, phone, email, order, type, details } (returns the grievance number)
    if (!Object.keys(er).length) setRef(refNo('GRV'));
  };
  const err = (k: keyof GErrors) => (errors[k] ? tr(errors[k]!) : undefined);
  const steps = [
    { t: 'g1', d: 'g1t', icon: 'bell' },
    { t: 'g2', d: 'g2t', icon: 'search' },
    { t: 'g3', d: 'g3t', icon: 'verified' },
  ];

  return (
    <section id="grievance" aria-labelledby="grievance-h" className="section bg-white">
      <div className="container grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid gap-8">
          <Reveal><Heading id="grievance-h" text={tr('gTitle')} lead={tr('gLead')} /></Reveal>

          {/* Grievance Officer */}
          <Reveal className="flex items-start gap-4 rounded-panel border border-line bg-mist p-5 md:p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green text-white"><Icon name="userCheck" size={22} /></span>
            <div className="grid min-w-0 gap-1">
              <strong className="font-head text-h3m text-green">{tr('officer')}</strong>
              <span className="text-grey">{tr('officerOf', { brand: SITE.brand })}, {SITE.offices[0].address}</span>
              <span className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                <a href={`mailto:${SITE.grievance.email}`} className="inline-flex items-center gap-1.5 break-all font-bold"><Icon name="mail" size={16} /> {SITE.grievance.email}</a>
                <a href={SITE.phoneHref} className="inline-flex items-center gap-1.5 font-bold"><Icon name="phone" size={16} /> {SITE.phoneDisplay}</a>
              </span>
            </div>
          </Reveal>

          {/* Timeline */}
          <div>
            <h3 className="mb-4 font-head text-h3m font-bold text-green">{tr('howTitle')}</h3>
            <Stagger as="ol" className="relative m-0 grid list-none gap-5 p-0">
              <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-0.5 bg-mint" />
              {steps.map((s, i) => (
                <StaggerItem as="li" key={s.t} className="relative flex items-start gap-4">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-green bg-white text-green">
                    <Icon name={s.icon} size={19} />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-terracotta-deep text-[0.6875rem] font-bold text-white">{i + 1}</span>
                  </span>
                  <span className="grid gap-0.5 pt-1">
                    <strong className="text-green">{tr(s.t)}</strong>
                    <span className="text-ink/80">{tr(s.d)}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <p className="m-0 flex items-start gap-2.5 rounded-btn bg-[#FFF8E6] px-4 py-3 text-base text-ink/85">
            <Icon name="info" size={18} className="mt-0.5 shrink-0 text-[#8A6100]" />
            <span>{tr('escalate')}</span>
          </p>
        </div>

        {/* Grievance form */}
        <Reveal className="rounded-panel border-t-4 border-terracotta-deep bg-white p-6 shadow-raised md:p-8 lg:sticky lg:top-28">
          <AnimatePresence mode="wait" initial={false}>
            {ref ? (
              <Done
                title={tr('gThanks', { name: f.name.trim().split(' ')[0] })}
                text={tr('gSent', { phone: `+91 ${f.phone}` })}
                refLabel={tr('gRef')} refValue={ref}
                again={tr('gAnother')} onAgain={() => { setF(empty); setRef(''); }}
              />
            ) : (
              <m.form key="form" {...crossfade} onSubmit={submit} noValidate className="grid gap-5">
                <h3 className="m-0 font-head text-h2m font-bold text-green">{tr('gFormTitle')}</h3>
                <ErrorSummary n={Object.keys(errors).length} tr={tr} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="g-name" label={tr('name')} error={err('name')}>
                    <Input id="g-name" autoComplete="name" value={f.name} invalid={!!errors.name}
                      aria-describedby={describedBy('g-name', { error: errors.name })}
                      onChange={(e) => setF({ ...f, name: e.target.value })} />
                  </Field>
                  <Field id="g-phone" label={tr('phone')} error={err('phone')}>
                    <PhoneInput id="g-phone" value={f.phone} invalid={!!errors.phone} error={errors.phone} onChange={(phone) => setF({ ...f, phone })} />
                  </Field>
                </div>
                <Field id="g-email" label={<>{tr('emailField')} <span className="font-semibold text-grey">{tr('optional')}</span></>} error={err('email')}>
                  <Input id="g-email" type="email" autoComplete="email" value={f.email} invalid={!!errors.email}
                    aria-describedby={describedBy('g-email', { error: errors.email })}
                    onChange={(e) => setF({ ...f, email: e.target.value })} />
                </Field>
                <Field id="g-type" label={tr('gType')}>
                  <Select id="g-type" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
                    {GRIEVANCE.map((o) => <option key={o} value={o}>{tr(`g.${o}`)}</option>)}
                  </Select>
                </Field>
                <Field id="g-order" label={<>{tr('orderId')} <span className="font-semibold text-grey">{tr('optional')}</span></>} hint={tr('orderHint')}>
                  <Input id="g-order" value={f.order} aria-describedby={describedBy('g-order', { hint: true })} onChange={(e) => setF({ ...f, order: e.target.value })} />
                </Field>
                <Field id="g-details" label={tr('gDetails')} hint={tr('gDetailsHint')} error={err('details')}>
                  <Textarea id="g-details" rows={5} value={f.details} invalid={!!errors.details} className="resize-y"
                    aria-describedby={describedBy('g-details', { hint: true, error: errors.details })}
                    onChange={(e) => setF({ ...f, details: e.target.value })} />
                </Field>
                <Button type="submit" variant="primary" block><Icon name="check" size={20} /> {tr('gSubmit')}</Button>
              </m.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Page

export default function Contact() {
  const tr = useT(T);

  return (
    <>
      <Seo title={tr('eyebrow')} description={tr('seoDesc')} jsonLd={medicalBusinessLd} />
      <PageHeader title={tr('title')} lead={tr('intro')}>
        <p className="m-0 flex items-center gap-2 text-base font-semibold text-green">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sage-tint"><Icon name="clock" size={15} /></span>
          {tr('open247')}
        </p>
      </PageHeader>

      {/* Three ways to reach us */}
      <section className="bg-white py-8 lg:py-12">
        <div className="container">
          <h2 className="sr-only">{tr('reach')}</h2>
          <Stagger as="ul" className="grid gap-4 md:grid-cols-3 md:gap-5">
            {CHANNELS.map((c) => (
              <StaggerItem as="li" key={c.id} className="flex">
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})} className={channel}>
                  {/* Colour stage: the channel's icon on a white tile, with rings and its availability */}
                  <span aria-hidden="true" className={`relative grid h-40 place-items-center overflow-hidden rounded-[1.375rem] ${c.stage}`}>
                    <span className={`absolute h-56 w-56 rounded-full border ${c.ring}`} />
                    <span className={`absolute h-40 w-40 rounded-full border border-dashed ${c.ring}`} />
                    <span className={`relative -mt-7 grid h-16 w-16 place-items-center rounded-2xl text-white shadow-raised transition-transform duration-slow ease-soft group-hover:scale-105 ${c.tile}`}>
                      <Icon name={c.icon} size={30} />
                    </span>
                    <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-small font-bold text-green shadow-card">
                      <span className={`h-2 w-2 rounded-full ${c.dot}`} /> {tr(c.chip)}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <strong className="mb-1 text-base text-grey">{tr(c.label)}</strong>
                    <span className={c.id === 'email' ? 'break-all font-head text-h3m font-bold text-ink md:text-[1.35rem]' : 'font-head text-h2m font-bold text-ink'}>{c.value}</span>
                    <span className="mt-1 text-base text-grey">{tr(c.sub)}</span>
                    <span className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                      <span className="font-bold text-green">{tr(c.cta)}</span>
                      <CardArrow size="sm" />
                    </span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <WriteToUs tr={tr} />
      <CallBand tr={tr} />

      {/* Offices and home-care areas */}
      <section className="section bg-mist">
        <div className="container grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <Reveal><h2 className="mb-6 text-section">{tr('offices')}</h2></Reveal>
            <Stagger as="ul" className="grid gap-4 md:grid-cols-2">
              {SITE.offices.map((o) => (
                <StaggerItem as="li" key={o.name} className="flex items-start gap-4 rounded-panel bg-white p-5 shadow-card">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-mist text-green"><Icon name="pin" size={22} /></span>
                  <div className="grid gap-1">
                    <address className="not-italic">
                      <strong className="block text-green">{tr(`office:${o.name}`)}</strong>
                      <span className="text-ink/80">{o.address}</span>
                    </address>
                    <a href={mapsUrl(o.address)} target="_blank" rel="noreferrer" className="group inline-flex min-h-[2.75rem] items-center gap-1.5 self-start font-bold">
                      {tr('directions')} <Icon name="external" size={16} />
                    </a>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-line bg-[linear-gradient(120deg,#FFFFFF_0%,#F1F5F9_55%,#E7F0FA_100%)] p-6 shadow-card md:p-8 lg:mt-[4.75rem]">
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-8 text-sage/10"><Icon name="pin" size={180} /></span>
            <h2 className="relative mb-3 text-h2m md:text-h2">{tr('areas')}</h2>
            <p className="relative m-0 text-lead text-ink/75">{tr('areasText')}</p>
          </Reveal>
        </div>
      </section>

      <Grievance tr={tr} />
    </>
  );
}
