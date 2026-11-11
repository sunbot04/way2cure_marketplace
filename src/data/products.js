// Sample catalogue for the frontend. Prices are illustrative; the final launch range
// is to be agreed with pharmacy partners. Prescription (Rx) items never carry offer badges.
// Text fields carry `hi` / `mr` translations; render them through loc(item) / localize(item, lang).
import { localize } from '../context/LangContext.jsx';

export const categories = [
  { slug: 'medicines', name: 'Medicines', blurb: 'Prescription, over-the-counter and regular refills', icon: 'pill', edge: 'var(--terracotta)', launch: true,
    hi: { name: 'दवाइयाँ', blurb: 'पर्चे वाली, बिना पर्चे वाली और नियमित रीफ़िल' },
    mr: { name: 'औषधे', blurb: 'प्रिस्क्रिप्शनची, विना-प्रिस्क्रिप्शन आणि नियमित रिफिल' } },
  { slug: 'devices', name: 'Medical devices', blurb: 'BP monitors, glucometers, oximeters', icon: 'heartPulse', edge: 'var(--green)', launch: true,
    hi: { name: 'मेडिकल उपकरण', blurb: 'बीपी मॉनिटर, ग्लूकोमीटर, ऑक्सीमीटर' },
    mr: { name: 'वैद्यकीय उपकरणे', blurb: 'बीपी मॉनिटर, ग्लुकोमीटर, ऑक्सिमीटर' } },
  { slug: 'daily-care', name: 'Daily care', blurb: 'Adult diapers, underpads, wound care', icon: 'handHeart', edge: 'var(--sage)', launch: true,
    hi: { name: 'रोज़ की देखभाल', blurb: 'एडल्ट डायपर, अंडरपैड, घाव की देखभाल' },
    mr: { name: 'दैनंदिन काळजी', blurb: 'प्रौढांसाठी डायपर, अंडरपॅड, जखमेची काळजी' } },
  { slug: 'mobility', name: 'Mobility & recovery', blurb: 'Walkers, wheelchairs, hospital beds', icon: 'mobility', edge: 'var(--mustard)',
    hi: { name: 'चलना-फिरना और रिकवरी', blurb: 'वॉकर, व्हीलचेयर, हॉस्पिटल बेड' },
    mr: { name: 'हालचाल आणि रिकव्हरी', blurb: 'वॉकर, व्हीलचेअर, हॉस्पिटल बेड' } },
  { slug: 'nutrition', name: 'Nutrition & wellness', blurb: 'Protein drinks, diabetic-friendly foods, vitamins', icon: 'apple', edge: 'var(--terracotta)',
    hi: { name: 'पोषण और सेहत', blurb: 'प्रोटीन ड्रिंक, डायबिटीज़ में ठीक रहने वाला खाना, विटामिन' },
    mr: { name: 'पोषण आणि आरोग्य', blurb: 'प्रोटीन ड्रिंक, मधुमेहींसाठी योग्य पदार्थ, व्हिटॅमिन' } },
  { slug: 'safety', name: 'Safety & smart tech', blurb: 'Pill boxes, fall alerts, oxygen on rent', icon: 'shield', edge: 'var(--green)',
    hi: { name: 'सुरक्षा और स्मार्ट उपकरण', blurb: 'पिल बॉक्स, गिरने पर अलर्ट, किराये पर ऑक्सीजन' },
    mr: { name: 'सुरक्षा आणि स्मार्ट उपकरणे', blurb: 'पिल बॉक्स, पडल्यास अलर्ट, भाड्याने ऑक्सिजन' } },
];

// Extra shop views from the site map
export const shopViews = [
  { slug: 'rent', name: 'Rent equipment', blurb: 'Beds, wheelchairs and oxygen by the month', icon: 'refresh', edge: 'var(--sage)',
    hi: { name: 'किराये पर उपकरण', blurb: 'बेड, व्हीलचेयर और ऑक्सीजन, महीने के हिसाब से' },
    mr: { name: 'भाड्याने उपकरणे', blurb: 'बेड, व्हीलचेअर आणि ऑक्सिजन, दरमहा भाड्याने' } },
  { slug: 'sellers', name: 'Marketplace sellers', blurb: 'Products from verified partner sellers', icon: 'store', edge: 'var(--mustard)',
    hi: { name: 'मार्केटप्लेस विक्रेता', blurb: 'सत्यापित पार्टनर विक्रेताओं के प्रोडक्ट' },
    mr: { name: 'मार्केटप्लेस विक्रेते', blurb: 'पडताळलेल्या भागीदार विक्रेत्यांची उत्पादने' } },
];

const W2C = 'Way2Cure';

// Repeated copy for prescription medicines and common pack sizes.
const RX_HI = 'सिर्फ़ वैध पर्चे पर मिलती है, जिसे रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।';
const RX_MR = 'फक्त वैध प्रिस्क्रिप्शनवरच मिळते, जे नोंदणीकृत फार्मासिस्ट तपासतात.';
const STRIP_HI = '15 गोलियों की स्ट्रिप';
const STRIP_MR = '15 गोळ्यांची स्ट्रिप';
const UNIT_HI = '1 यूनिट';
const UNIT_MR = '1 नग';

export const products = [
  // Medicines
  { id: 'metformin-500', name: 'Metformin 500 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 32, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 98,
    desc: 'Commonly prescribed for type 2 diabetes. Sold only against a valid prescription, checked by a registered pharmacist.',
    hi: { name: 'Metformin 500 mg गोलियाँ', pack: STRIP_HI, desc: `आमतौर पर टाइप 2 डायबिटीज़ के लिए दी जाती है। ${RX_HI}` },
    mr: { name: 'Metformin 500 mg गोळ्या', pack: STRIP_MR, desc: `सहसा टाइप 2 मधुमेहासाठी दिली जाते. ${RX_MR}` } },
  { id: 'amlodipine-5', name: 'Amlodipine 5 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 28, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 95,
    desc: 'Commonly prescribed for blood pressure. Sold only against a valid prescription, checked by a registered pharmacist.',
    hi: { name: 'Amlodipine 5 mg गोलियाँ', pack: STRIP_HI, desc: `आमतौर पर ब्लड प्रेशर के लिए दी जाती है। ${RX_HI}` },
    mr: { name: 'Amlodipine 5 mg गोळ्या', pack: STRIP_MR, desc: `सहसा रक्तदाबासाठी (बीपी) दिली जाते. ${RX_MR}` } },
  { id: 'telmisartan-40', name: 'Telmisartan 40 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 64, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 90,
    desc: 'Commonly prescribed for blood pressure. Sold only against a valid prescription, checked by a registered pharmacist.',
    hi: { name: 'Telmisartan 40 mg गोलियाँ', pack: STRIP_HI, desc: `आमतौर पर ब्लड प्रेशर के लिए दी जाती है। ${RX_HI}` },
    mr: { name: 'Telmisartan 40 mg गोळ्या', pack: STRIP_MR, desc: `सहसा रक्तदाबासाठी (बीपी) दिली जाते. ${RX_MR}` } },
  { id: 'atorvastatin-10', name: 'Atorvastatin 10 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 72, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 86,
    desc: 'Commonly prescribed for cholesterol. Sold only against a valid prescription, checked by a registered pharmacist.',
    hi: { name: 'Atorvastatin 10 mg गोलियाँ', pack: STRIP_HI, desc: `आमतौर पर कोलेस्ट्रॉल के लिए दी जाती है। ${RX_HI}` },
    mr: { name: 'Atorvastatin 10 mg गोळ्या', pack: STRIP_MR, desc: `सहसा कोलेस्टेरॉलसाठी दिली जाते. ${RX_MR}` } },
  { id: 'paracetamol-650', name: 'Paracetamol 650 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 30, rx: false, seller: W2C, deliveryHours: 6, popular: 92,
    desc: 'For fever and mild pain. Read the label and follow the dose your doctor or pharmacist advises.',
    hi: { name: 'Paracetamol 650 mg गोलियाँ', pack: STRIP_HI, desc: 'बुखार और हल्के दर्द के लिए। लेबल पढ़ें और डॉक्टर या फ़ार्मासिस्ट की बताई खुराक ही लें।' },
    mr: { name: 'Paracetamol 650 mg गोळ्या', pack: STRIP_MR, desc: 'ताप आणि हलक्या दुखण्यासाठी. लेबल वाचा आणि डॉक्टर किंवा फार्मासिस्ट सांगतील तेवढाच डोस घ्या.' } },
  { id: 'ors-sachet', name: 'ORS powder sachets', cat: 'medicines', brand: 'Generic', pack: 'Box of 10 sachets', price: 210, rx: false, seller: W2C, deliveryHours: 6, popular: 70,
    desc: 'Oral rehydration salts. Mix one sachet in clean drinking water as shown on the pack.',
    hi: { name: 'ORS पाउडर सैशे', pack: '10 सैशे का डिब्बा', desc: 'शरीर में पानी की कमी के लिए घोल। पैक पर बताए तरीके से एक सैशे साफ़ पीने के पानी में घोलें।' },
    mr: { name: 'ORS पावडर सॅशे', pack: '10 सॅशेचा बॉक्स', desc: 'शरीरातील पाण्याची कमतरता भरून काढण्यासाठी. पाकिटावर दाखवल्याप्रमाणे एक सॅशे स्वच्छ पिण्याच्या पाण्यात मिसळा.' } },

  // Devices
  { id: 'bp-monitor', name: 'Digital BP Monitor', cat: 'devices', brand: 'CareCheck', pack: 'Upper-arm cuff, 1 unit', price: 1499, rx: false, launch: true, seller: W2C, deliveryHours: 24, popular: 99,
    desc: 'Large, clear display and one-button start. Stores past readings so your family and doctor can see the trend.',
    hi: { name: 'डिजिटल बीपी मॉनिटर', pack: 'बाँह पर बाँधने वाला कफ़, 1 यूनिट', desc: 'बड़ी, साफ़ स्क्रीन और एक बटन से चालू। पुरानी रीडिंग सेव रहती हैं, ताकि आपका परिवार और डॉक्टर बदलाव देख सकें।' },
    mr: { name: 'डिजिटल बीपी मॉनिटर', pack: 'दंडावर बांधायचा कफ, 1 नग', desc: 'मोठी, स्पष्ट स्क्रीन आणि एका बटणाने सुरू. आधीची रीडिंग जतन राहतात, त्यामुळे तुमचे कुटुंब आणि डॉक्टर बदल पाहू शकतात.' } },
  { id: 'glucometer-kit', name: 'Glucometer kit with 25 strips', cat: 'devices', brand: 'SugarSure', pack: '1 meter, 25 strips, lancets', price: 899, rx: false, seller: W2C, deliveryHours: 24, popular: 94, chronic: true, subscribe: true,
    desc: 'Simple blood sugar checks at home. Refill strips can be added to a monthly plan.',
    hi: { name: 'ग्लूकोमीटर किट, 25 स्ट्रिप के साथ', pack: '1 मीटर, 25 स्ट्रिप, लैंसेट', desc: 'घर पर ही आसानी से शुगर जाँचें। रीफ़िल स्ट्रिप मासिक प्लान में जोड़ सकते हैं।' },
    mr: { name: 'ग्लुकोमीटर किट, 25 स्ट्रिपसह', pack: '1 मीटर, 25 स्ट्रिप, लॅन्सेट', desc: 'घरीच सहज शुगर तपासा. रिफिल स्ट्रिप मासिक प्लॅनमध्ये जोडता येतात.' } },
  { id: 'pulse-oximeter', name: 'Fingertip pulse oximeter', cat: 'devices', brand: 'CareCheck', pack: '1 unit', price: 799, rx: false, seller: W2C, deliveryHours: 24, popular: 88,
    desc: 'Shows oxygen level and pulse in a few seconds, with a bright, large display.',
    hi: { name: 'फ़िंगरटिप पल्स ऑक्सीमीटर', pack: UNIT_HI, desc: 'कुछ ही सेकंड में ऑक्सीजन लेवल और पल्स दिखाता है, बड़ी और चमकदार स्क्रीन पर।' },
    mr: { name: 'फिंगरटिप पल्स ऑक्सिमीटर', pack: UNIT_MR, desc: 'काही सेकंदांत ऑक्सिजन लेव्हल आणि पल्स दाखवतो, मोठ्या आणि उजळ स्क्रीनवर.' } },
  { id: 'thermometer', name: 'Digital thermometer', cat: 'devices', brand: 'CareCheck', pack: '1 unit', price: 249, rx: false, seller: W2C, deliveryHours: 6, popular: 80,
    desc: 'Beeps when the reading is ready. Easy-to-read numbers.',
    hi: { name: 'डिजिटल थर्मामीटर', pack: UNIT_HI, desc: 'रीडिंग तैयार होने पर बीप करता है। अंक पढ़ने में आसान।' },
    mr: { name: 'डिजिटल थर्मामीटर', pack: UNIT_MR, desc: 'रीडिंग तयार झाल्यावर बीप करतो. आकडे वाचायला सोपे.' } },
  { id: 'nebuliser', name: 'Compressor nebuliser', cat: 'devices', brand: 'BreatheEasy', pack: '1 unit with masks', price: 1899, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 72,
    desc: 'For inhaled medicines prescribed by your doctor. Comes with adult and child masks.',
    hi: { name: 'कंप्रेसर नेबुलाइज़र', pack: 'मास्क के साथ 1 यूनिट', desc: 'डॉक्टर की लिखी, साँस से लेने वाली दवाइयों के लिए। बड़ों और बच्चों, दोनों के मास्क साथ आते हैं।' },
    mr: { name: 'कॉम्प्रेसर नेब्युलायझर', pack: 'मास्कसह 1 नग', desc: 'डॉक्टरांनी लिहून दिलेल्या, श्वासावाटे घ्यायच्या औषधांसाठी. मोठ्यांचे आणि लहान मुलांचे मास्क सोबत मिळतात.' } },
  { id: 'weighing-scale', name: 'Digital weighing scale', cat: 'devices', brand: 'FitHome', pack: '1 unit', price: 999, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 60,
    desc: 'Wide, anti-slip platform with large digits.',
    hi: { name: 'डिजिटल वज़न मशीन', pack: UNIT_HI, desc: 'चौड़ा, न फिसलने वाला प्लेटफ़ॉर्म और बड़े अंक।' },
    mr: { name: 'डिजिटल वजनकाटा', pack: UNIT_MR, desc: 'रुंद, न घसरणारा प्लॅटफॉर्म आणि मोठे आकडे.' } },

  // Daily care
  { id: 'adult-diapers-m', name: 'Adult diapers, medium', cat: 'daily-care', brand: 'DryComfort', pack: 'Pack of 10', price: 449, rx: false, subscribe: true, chronic: true, seller: W2C, deliveryHours: 6, popular: 97,
    desc: 'Soft, high-absorbency diapers for day and night. Add to a monthly plan so you never run short.',
    hi: { name: 'एडल्ट डायपर, मीडियम', pack: '10 का पैक', desc: 'दिन और रात के लिए मुलायम, ज़्यादा सोखने वाले डायपर। मासिक प्लान में जोड़ें, ताकि कभी कमी न हो।' },
    mr: { name: 'प्रौढांसाठी डायपर, मीडियम', pack: '10 चा पॅक', desc: 'दिवस आणि रात्रीसाठी मऊ, जास्त शोषून घेणारे डायपर. मासिक प्लॅनमध्ये जोडा, म्हणजे कधीच कमी पडणार नाहीत.' } },
  { id: 'underpads', name: 'Disposable underpads', cat: 'daily-care', brand: 'DryComfort', pack: 'Pack of 10', price: 299, rx: false, subscribe: true, seller: W2C, deliveryHours: 6, popular: 85,
    desc: 'Protects beds and chairs. Useful for bedridden care and after surgery.',
    hi: { name: 'डिस्पोज़ेबल अंडरपैड', pack: '10 का पैक', desc: 'बिस्तर और कुर्सी को गीला होने से बचाते हैं। बिस्तर पर रहने वाले मरीज़ों और सर्जरी के बाद काम आते हैं।' },
    mr: { name: 'डिस्पोजेबल अंडरपॅड', pack: '10 चा पॅक', desc: 'बेड आणि खुर्ची ओली होण्यापासून वाचवतात. अंथरुणावर असलेल्या रुग्णांसाठी आणि सर्जरीनंतर उपयोगी.' } },
  { id: 'wound-dressing-kit', name: 'Wound dressing kit', cat: 'daily-care', brand: 'CarePlus', pack: '1 kit', price: 349, rx: false, seller: W2C, deliveryHours: 6, popular: 75,
    desc: 'Sterile gauze, tape, gloves and saline. Use as your nurse or doctor shows you.',
    hi: { name: 'घाव की ड्रेसिंग किट', pack: '1 किट', desc: 'कीटाणु-रहित गॉज़, टेप, दस्ताने और सलाइन। जैसे आपकी नर्स या डॉक्टर बताएँ, वैसे इस्तेमाल करें।' },
    mr: { name: 'जखमेची ड्रेसिंग किट', pack: '1 किट', desc: 'निर्जंतुक गॉज, टेप, हातमोजे आणि सलाईन. तुमच्या नर्स किंवा डॉक्टरांनी दाखवल्याप्रमाणे वापरा.' } },
  { id: 'hand-sanitiser', name: 'Hand sanitiser, 500 ml', cat: 'daily-care', brand: 'CarePlus', pack: '500 ml pump bottle', price: 199, rx: false, seller: W2C, deliveryHours: 6, popular: 65,
    desc: 'For carers and visitors before touching the patient.',
    hi: { name: 'हैंड सैनिटाइज़र, 500 ml', pack: '500 ml पंप बोतल', desc: 'मरीज़ को छूने से पहले, देखभाल करने वालों और मिलने आने वालों के लिए।' },
    mr: { name: 'हँड सॅनिटायझर, 500 ml', pack: '500 ml पंप बाटली', desc: 'रुग्णाला हात लावण्यापूर्वी, काळजी घेणाऱ्यांसाठी आणि भेटायला येणाऱ्यांसाठी.' } },

  // Mobility & recovery
  { id: 'walker', name: 'Foldable walker', cat: 'mobility', brand: 'StepSafe', pack: '1 unit, height adjustable', price: 1599, rentPerMonth: 349, rx: false, seller: W2C, deliveryHours: 24, popular: 90,
    desc: 'Light aluminium frame with rubber feet. Buy it, or rent it while you recover.',
    hi: { name: 'फ़ोल्ड होने वाला वॉकर', pack: '1 यूनिट, ऊँचाई कम-ज़्यादा कर सकते हैं', desc: 'हल्का एल्युमिनियम फ़्रेम, रबर के पैर। ख़रीदें, या ठीक होने तक किराये पर लें।' },
    mr: { name: 'घडी करता येणारा वॉकर', pack: '1 नग, उंची कमी-जास्त करता येते', desc: 'हलकी ॲल्युमिनियम फ्रेम, रबरी पाय. विकत घ्या, किंवा बरे होईपर्यंत भाड्याने घ्या.' } },
  { id: 'wheelchair', name: 'Foldable wheelchair', cat: 'mobility', brand: 'StepSafe', pack: '1 unit', price: 6499, rentPerMonth: 999, rx: false, seller: W2C, deliveryHours: 24, popular: 88,
    desc: 'Folds to fit in a car boot. Buy it, or rent by the month.',
    hi: { name: 'फ़ोल्ड होने वाली व्हीलचेयर', pack: UNIT_HI, desc: 'मोड़कर कार की डिक्की में आ जाती है। ख़रीदें, या महीने के हिसाब से किराये पर लें।' },
    mr: { name: 'घडी करता येणारी व्हीलचेअर', pack: UNIT_MR, desc: 'घडी करून गाडीच्या डिकीत मावते. विकत घ्या, किंवा दरमहा भाड्याने घ्या.' } },
  { id: 'walking-stick', name: 'Walking stick with 4-leg base', cat: 'mobility', brand: 'StepSafe', pack: '1 unit', price: 649, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 70,
    desc: 'Stands on its own, so it does not fall when you let go.',
    hi: { name: 'चार पैरों वाली छड़ी', pack: UNIT_HI, desc: 'अपने आप खड़ी रहती है, इसलिए हाथ छोड़ने पर गिरती नहीं।' },
    mr: { name: 'चार पायांची काठी', pack: UNIT_MR, desc: 'आपोआप उभी राहते, त्यामुळे हात सोडला तरी पडत नाही.' } },
  { id: 'hospital-bed', name: 'Hospital bed, 2 function', cat: 'mobility', brand: 'HomeCare Beds', pack: 'Bed with mattress', price: 28000, rentPerMonth: 3500, rx: false, seller: W2C, deliveryHours: 48, popular: 82,
    desc: 'Raise the back and legs with hand cranks. Delivery and setup at home included.',
    hi: { name: 'हॉस्पिटल बेड, 2 फ़ंक्शन', pack: 'गद्दे के साथ बेड', desc: 'हैंडल घुमाकर पीठ और पैरों का हिस्सा ऊपर करें। घर पर डिलिवरी और सेटअप शामिल है।' },
    mr: { name: 'हॉस्पिटल बेड, 2 फंक्शन', pack: 'गादीसह बेड', desc: 'हँडल फिरवून पाठीचा आणि पायांचा भाग वर करा. घरी डिलिव्हरी आणि सेटअप समाविष्ट आहे.' } },
  { id: 'commode-chair', name: 'Commode & shower chair', cat: 'mobility', brand: 'SafeBath', pack: '1 unit', price: 2199, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 68,
    desc: 'Rust-proof frame with armrests for safe bathing.',
    hi: { name: 'कमोड और शावर चेयर', pack: UNIT_HI, desc: 'जंग न लगने वाला फ़्रेम और हाथ टिकाने की जगह, ताकि नहाना सुरक्षित रहे।' },
    mr: { name: 'कमोड आणि शॉवर खुर्ची', pack: UNIT_MR, desc: 'गंज न लागणारी फ्रेम आणि हात ठेवायला आधार, सुरक्षित अंघोळीसाठी.' } },

  // Nutrition & wellness
  { id: 'protein-drink', name: 'Diabetic-friendly protein drink', cat: 'nutrition', brand: 'NutriCare', pack: '400 g tin, vanilla', price: 799, rx: false, subscribe: true, seller: W2C, deliveryHours: 24, popular: 84,
    desc: 'Nutrition drink with no added sugar. Talk to your doctor if you have kidney problems.',
    hi: { name: 'डायबिटीज़ में ठीक रहने वाला प्रोटीन ड्रिंक', pack: '400 g डिब्बा, वनीला', desc: 'बिना अलग से चीनी मिलाया पोषण ड्रिंक। अगर किडनी की कोई तकलीफ़ है, तो अपने डॉक्टर से बात करें।' },
    mr: { name: 'मधुमेहींसाठी योग्य प्रोटीन ड्रिंक', pack: '400 g डबा, व्हॅनिला', desc: 'वेगळी साखर न घातलेले पोषण ड्रिंक. किडनीचा काही त्रास असल्यास तुमच्या डॉक्टरांशी बोला.' } },
  { id: 'multivitamin', name: 'Multivitamin for adults 50+', cat: 'nutrition', brand: 'NutriCare', pack: '60 tablets', price: 549, rx: false, subscribe: true, seller: W2C, deliveryHours: 24, popular: 76,
    desc: 'A daily supplement. Not a replacement for a balanced diet.',
    hi: { name: '50+ उम्र वालों के लिए मल्टीविटामिन', pack: '60 गोलियाँ', desc: 'रोज़ लेने वाला सप्लीमेंट। यह संतुलित खाने की जगह नहीं लेता।' },
    mr: { name: '50+ वयाच्या व्यक्तींसाठी मल्टिव्हिटॅमिन', pack: '60 गोळ्या', desc: 'रोज घ्यायचे सप्लिमेंट. हे संतुलित आहाराची जागा घेत नाही.' } },
  { id: 'diabetic-atta', name: 'High-fibre atta', cat: 'nutrition', brand: 'GoodGrain', pack: '1 kg', price: 189, rx: false, subscribe: true, seller: 'Annapurna Foods', sellerVerified: true, deliveryHours: 48, popular: 58,
    desc: 'Multigrain flour with added fibre for everyday rotis.',
    hi: { name: 'हाई-फ़ाइबर आटा', pack: '1 kg', desc: 'रोज़ की रोटियों के लिए, ज़्यादा फ़ाइबर वाला मल्टीग्रेन आटा।' },
    mr: { name: 'हाय-फायबर पीठ', pack: '1 kg', desc: 'रोजच्या पोळ्यांसाठी, जास्त फायबर असलेले मल्टिग्रेन पीठ.' } },

  // Safety & smart tech
  { id: 'pill-box', name: 'Weekly pill box, 4 times a day', cat: 'safety', brand: 'DoseRight', pack: '1 unit', price: 299, rx: false, seller: W2C, deliveryHours: 24, popular: 87,
    desc: 'Big lids marked Morning, Afternoon, Evening and Night for each day of the week.',
    hi: { name: 'हफ़्ते भर का पिल बॉक्स, दिन में 4 बार', pack: UNIT_HI, desc: 'हफ़्ते के हर दिन के लिए बड़े ढक्कन, जिन पर सुबह, दोपहर, शाम और रात लिखा है।' },
    mr: { name: 'आठवड्याचा पिल बॉक्स, दिवसातून 4 वेळा', pack: UNIT_MR, desc: 'आठवड्याच्या प्रत्येक दिवसासाठी मोठी झाकणे, त्यावर सकाळ, दुपार, संध्याकाळ आणि रात्र लिहिलेले.' } },
  { id: 'fall-watch', name: 'Fall-detection watch', cat: 'safety', brand: 'GuardianTime', pack: '1 watch', price: 4999, rx: false, seller: 'SmartCare Devices', sellerVerified: true, deliveryHours: 48, popular: 73,
    desc: 'Calls saved family numbers if a fall is detected or the button is pressed.',
    hi: { name: 'गिरने का पता लगाने वाली घड़ी', pack: '1 घड़ी', desc: 'गिरने का पता चलने पर या बटन दबाने पर, परिवार के सेव किए नंबरों पर कॉल करती है।' },
    mr: { name: 'पडल्याचे ओळखणारे घड्याळ', pack: '1 घड्याळ', desc: 'पडल्याचे लक्षात आल्यावर किंवा बटण दाबल्यावर, कुटुंबाच्या सेव्ह केलेल्या नंबरांवर कॉल करते.' } },
  { id: 'alert-pendant', name: 'Emergency alert pendant', cat: 'safety', brand: 'GuardianTime', pack: '1 pendant', price: 2499, rx: false, seller: 'SmartCare Devices', sellerVerified: true, deliveryHours: 48, popular: 66,
    desc: 'One press sends an alert to family phones.',
    hi: { name: 'इमरजेंसी अलर्ट पेंडेंट', pack: '1 पेंडेंट', desc: 'एक बार दबाते ही परिवार के फ़ोन पर अलर्ट चला जाता है।' },
    mr: { name: 'इमर्जन्सी अलर्ट पेंडंट', pack: '1 पेंडंट', desc: 'एकदा दाबताच कुटुंबाच्या फोनवर अलर्ट जातो.' } },
  { id: 'oxygen-concentrator', name: 'Oxygen concentrator, 5 litre', cat: 'safety', brand: 'BreatheEasy', pack: '1 unit, with tubing', rentPerMonth: 4500, rentOnly: true, rx: true, seller: W2C, deliveryHours: 24, popular: 80,
    desc: 'Rent only. Needs a doctor\'s prescription stating the oxygen flow. Our team sets it up at home.',
    hi: { name: 'ऑक्सीजन कंसंट्रेटर, 5 लीटर', pack: 'ट्यूब के साथ 1 यूनिट', desc: 'सिर्फ़ किराये पर। डॉक्टर का पर्चा ज़रूरी है, जिसमें ऑक्सीजन फ़्लो लिखा हो। हमारी टीम इसे घर पर लगाकर देती है।' },
    mr: { name: 'ऑक्सिजन कॉन्सन्ट्रेटर, 5 लिटर', pack: 'ट्यूबसह 1 नग', desc: 'फक्त भाड्याने. ऑक्सिजन फ्लो लिहिलेले डॉक्टरांचे प्रिस्क्रिप्शन आवश्यक. आमची टीम घरी बसवून देते.' } },
];

export const getProduct = (id) => products.find((p) => p.id === id);

export const unitPrice = (p, mode) => (mode === 'rent' ? p.rentPerMonth : p.price);

const DELIVERY = {
  en: ['Today by 6 pm', 'Tomorrow', 'In 2 days'],
  hi: ['आज शाम 6 बजे तक', 'कल', '2 दिन में'],
  mr: ['आज संध्याकाळी 6 पर्यंत', 'उद्या', '2 दिवसांत'],
};

export const deliveryLabel = (hours, lang = 'en') =>
  (DELIVERY[lang] || DELIVERY.en)[hours <= 6 ? 0 : hours <= 24 ? 1 : 2];

const FAQ = {
  en: {
    whenQ: 'When will it arrive?',
    whenA: '{when} in Mumbai, Navi Mumbai and Thane. Share the OTP with the rider at the door.',
    returnQ: 'Can I return it?',
    returnA: 'Unopened items can be returned within 7 days. Medicines cannot be returned once delivered, for your safety.',
    rxQ: 'Why do I need a prescription?',
    rxA: 'By law this medicine is sold only with a valid doctor\'s prescription. A registered pharmacist checks it before we pack your order. If anything is unclear, the pharmacist will call you.',
    rentQ: 'How does renting work?',
    rentA: 'Pay month by month. We deliver, set it up and pick it up when you are done. A refundable deposit may apply.',
    subQ: 'How does subscribe work?',
    subA: 'We deliver every month on the same date. You get a reminder before each order and can pause or change anytime.',
  },
  hi: {
    whenQ: 'यह कब पहुँचेगा?',
    whenA: 'मुंबई, नवी मुंबई और ठाणे में {when} पहुँचेगा। दरवाज़े पर राइडर को OTP बताएँ।',
    returnQ: 'क्या मैं इसे लौटा सकता/सकती हूँ?',
    returnA: 'बिना खोला सामान 7 दिनों के अंदर लौटाया जा सकता है। आपकी सुरक्षा के लिए, डिलिवरी के बाद दवाइयाँ वापस नहीं ली जातीं।',
    rxQ: 'मुझे पर्चे की ज़रूरत क्यों है?',
    rxA: 'क़ानून के अनुसार यह दवा सिर्फ़ डॉक्टर के वैध पर्चे पर ही मिलती है। आपका ऑर्डर पैक करने से पहले रजिस्टर्ड फ़ार्मासिस्ट पर्चा जाँचते हैं। कुछ भी साफ़ न हो, तो फ़ार्मासिस्ट आपको कॉल करेंगे।',
    rentQ: 'किराये पर लेना कैसे काम करता है?',
    rentA: 'किराया हर महीने भरें। हम पहुँचाते हैं, लगाकर देते हैं, और आपका काम पूरा होने पर वापस ले जाते हैं। वापस मिलने वाली डिपॉज़िट राशि लग सकती है।',
    subQ: 'सब्सक्रिप्शन कैसे काम करता है?',
    subA: 'हम हर महीने उसी तारीख़ को डिलिवरी करते हैं। हर ऑर्डर से पहले आपको याद दिलाया जाता है, और आप कभी भी रोक या बदल सकते हैं।',
  },
  mr: {
    whenQ: 'हे कधी पोहोचेल?',
    whenA: 'मुंबई, नवी मुंबई आणि ठाणे येथे {when} पोहोचेल. दारात रायडरला OTP सांगा.',
    returnQ: 'मी हे परत करू शकतो/शकते का?',
    returnA: 'न उघडलेल्या वस्तू 7 दिवसांच्या आत परत करता येतात. तुमच्या सुरक्षिततेसाठी, डिलिव्हरीनंतर औषधे परत घेतली जात नाहीत.',
    rxQ: 'मला प्रिस्क्रिप्शन का लागेल?',
    rxA: 'कायद्यानुसार हे औषध फक्त डॉक्टरांच्या वैध प्रिस्क्रिप्शनवरच मिळते. तुमची ऑर्डर पॅक करण्यापूर्वी नोंदणीकृत फार्मासिस्ट ते तपासतात. काही स्पष्ट नसल्यास, फार्मासिस्ट तुम्हाला कॉल करतील.',
    rentQ: 'भाड्याने घेणे कसे चालते?',
    rentA: 'भाडे दर महिन्याला भरा. आम्ही पोहोचवतो, बसवून देतो आणि तुमचे काम झाल्यावर परत घेऊन जातो. परत मिळणारी अनामत रक्कम लागू शकते.',
    subQ: 'सदस्यता कशी चालते?',
    subA: 'आम्ही दर महिन्याला त्याच तारखेला डिलिव्हरी करतो. प्रत्येक ऑर्डरपूर्वी तुम्हाला आठवण करून दिली जाते, आणि तुम्ही कधीही थांबवू किंवा बदलू शकता.',
  },
};

export const productFaq = (p, lang = 'en') => {
  const item = localize(p, lang);
  const f = FAQ[lang] || FAQ.en;
  const faq = [
    { q: f.whenQ, a: f.whenA.replace('{when}', deliveryLabel(item.deliveryHours, lang)) },
    { q: f.returnQ, a: f.returnA },
  ];
  if (item.rx) faq.unshift({ q: f.rxQ, a: f.rxA });
  if (item.rentPerMonth) faq.push({ q: f.rentQ, a: f.rentA });
  if (item.subscribe) faq.push({ q: f.subQ, a: f.subA });
  return faq;
};
