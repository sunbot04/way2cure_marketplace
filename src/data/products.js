// Sample catalogue for the frontend. Prices are illustrative; the final launch range
// is to be agreed with pharmacy partners. Prescription (Rx) items never carry offer badges.

export const categories = [
  { slug: 'medicines', name: 'Medicines', blurb: 'Prescription, over-the-counter and regular refills', icon: 'pill', edge: 'var(--terracotta)', launch: true },
  { slug: 'devices', name: 'Medical devices', blurb: 'BP monitors, glucometers, oximeters', icon: 'heartPulse', edge: 'var(--green)', launch: true },
  { slug: 'daily-care', name: 'Daily care', blurb: 'Adult diapers, underpads, wound care', icon: 'handHeart', edge: 'var(--sage)', launch: true },
  { slug: 'mobility', name: 'Mobility & recovery', blurb: 'Walkers, wheelchairs, hospital beds', icon: 'mobility', edge: 'var(--mustard)' },
  { slug: 'nutrition', name: 'Nutrition & wellness', blurb: 'Protein drinks, diabetic-friendly foods, vitamins', icon: 'apple', edge: 'var(--terracotta)' },
  { slug: 'safety', name: 'Safety & smart tech', blurb: 'Pill boxes, fall alerts, oxygen on rent', icon: 'shield', edge: 'var(--green)' },
];

// Extra shop views from the site map
export const shopViews = [
  { slug: 'rent', name: 'Rent equipment', blurb: 'Beds, wheelchairs and oxygen by the month', icon: 'refresh', edge: 'var(--sage)' },
  { slug: 'sellers', name: 'Marketplace sellers', blurb: 'Products from verified partner sellers', icon: 'store', edge: 'var(--mustard)' },
];

const W2C = 'Way2Cure';

export const products = [
  // Medicines
  { id: 'metformin-500', name: 'Metformin 500 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 32, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 98,
    desc: 'Commonly prescribed for type 2 diabetes. Sold only against a valid prescription, checked by a registered pharmacist.' },
  { id: 'amlodipine-5', name: 'Amlodipine 5 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 28, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 95,
    desc: 'Commonly prescribed for blood pressure. Sold only against a valid prescription, checked by a registered pharmacist.' },
  { id: 'telmisartan-40', name: 'Telmisartan 40 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 64, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 90,
    desc: 'Commonly prescribed for blood pressure. Sold only against a valid prescription, checked by a registered pharmacist.' },
  { id: 'atorvastatin-10', name: 'Atorvastatin 10 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 72, rx: true, chronic: true, subscribe: true, seller: W2C, deliveryHours: 6, popular: 86,
    desc: 'Commonly prescribed for cholesterol. Sold only against a valid prescription, checked by a registered pharmacist.' },
  { id: 'paracetamol-650', name: 'Paracetamol 650 mg tablets', cat: 'medicines', brand: 'Generic', pack: 'Strip of 15 tablets', price: 30, rx: false, seller: W2C, deliveryHours: 6, popular: 92,
    desc: 'For fever and mild pain. Read the label and follow the dose your doctor or pharmacist advises.' },
  { id: 'ors-sachet', name: 'ORS powder sachets', cat: 'medicines', brand: 'Generic', pack: 'Box of 10 sachets', price: 210, rx: false, seller: W2C, deliveryHours: 6, popular: 70,
    desc: 'Oral rehydration salts. Mix one sachet in clean drinking water as shown on the pack.' },

  // Devices
  { id: 'bp-monitor', name: 'Digital BP Monitor', cat: 'devices', brand: 'CareCheck', pack: 'Upper-arm cuff, 1 unit', price: 1499, rx: false, launch: true, seller: W2C, deliveryHours: 24, popular: 99,
    desc: 'Large, clear display and one-button start. Stores past readings so your family and doctor can see the trend.' },
  { id: 'glucometer-kit', name: 'Glucometer kit with 25 strips', cat: 'devices', brand: 'SugarSure', pack: '1 meter, 25 strips, lancets', price: 899, rx: false, seller: W2C, deliveryHours: 24, popular: 94, chronic: true, subscribe: true,
    desc: 'Simple blood sugar checks at home. Refill strips can be added to a monthly plan.' },
  { id: 'pulse-oximeter', name: 'Fingertip pulse oximeter', cat: 'devices', brand: 'CareCheck', pack: '1 unit', price: 799, rx: false, seller: W2C, deliveryHours: 24, popular: 88,
    desc: 'Shows oxygen level and pulse in a few seconds, with a bright, large display.' },
  { id: 'thermometer', name: 'Digital thermometer', cat: 'devices', brand: 'CareCheck', pack: '1 unit', price: 249, rx: false, seller: W2C, deliveryHours: 6, popular: 80,
    desc: 'Beeps when the reading is ready. Easy-to-read numbers.' },
  { id: 'nebuliser', name: 'Compressor nebuliser', cat: 'devices', brand: 'BreatheEasy', pack: '1 unit with masks', price: 1899, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 72,
    desc: 'For inhaled medicines prescribed by your doctor. Comes with adult and child masks.' },
  { id: 'weighing-scale', name: 'Digital weighing scale', cat: 'devices', brand: 'FitHome', pack: '1 unit', price: 999, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 60,
    desc: 'Wide, anti-slip platform with large digits.' },

  // Daily care
  { id: 'adult-diapers-m', name: 'Adult diapers, medium', cat: 'daily-care', brand: 'DryComfort', pack: 'Pack of 10', price: 449, rx: false, subscribe: true, chronic: true, seller: W2C, deliveryHours: 6, popular: 97,
    desc: 'Soft, high-absorbency diapers for day and night. Add to a monthly plan so you never run short.' },
  { id: 'underpads', name: 'Disposable underpads', cat: 'daily-care', brand: 'DryComfort', pack: 'Pack of 10', price: 299, rx: false, subscribe: true, seller: W2C, deliveryHours: 6, popular: 85,
    desc: 'Protects beds and chairs. Useful for bedridden care and after surgery.' },
  { id: 'wound-dressing-kit', name: 'Wound dressing kit', cat: 'daily-care', brand: 'CarePlus', pack: '1 kit', price: 349, rx: false, seller: W2C, deliveryHours: 6, popular: 75,
    desc: 'Sterile gauze, tape, gloves and saline. Use as your nurse or doctor shows you.' },
  { id: 'hand-sanitiser', name: 'Hand sanitiser, 500 ml', cat: 'daily-care', brand: 'CarePlus', pack: '500 ml pump bottle', price: 199, rx: false, seller: W2C, deliveryHours: 6, popular: 65,
    desc: 'For carers and visitors before touching the patient.' },

  // Mobility & recovery
  { id: 'walker', name: 'Foldable walker', cat: 'mobility', brand: 'StepSafe', pack: '1 unit, height adjustable', price: 1599, rentPerMonth: 349, rx: false, seller: W2C, deliveryHours: 24, popular: 90,
    desc: 'Light aluminium frame with rubber feet. Buy it, or rent it while you recover.' },
  { id: 'wheelchair', name: 'Foldable wheelchair', cat: 'mobility', brand: 'StepSafe', pack: '1 unit', price: 6499, rentPerMonth: 999, rx: false, seller: W2C, deliveryHours: 24, popular: 88,
    desc: 'Folds to fit in a car boot. Buy it, or rent by the month.' },
  { id: 'walking-stick', name: 'Walking stick with 4-leg base', cat: 'mobility', brand: 'StepSafe', pack: '1 unit', price: 649, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 70,
    desc: 'Stands on its own, so it does not fall when you let go.' },
  { id: 'hospital-bed', name: 'Hospital bed, 2 function', cat: 'mobility', brand: 'HomeCare Beds', pack: 'Bed with mattress', price: 28000, rentPerMonth: 3500, rx: false, seller: W2C, deliveryHours: 48, popular: 82,
    desc: 'Raise the back and legs with hand cranks. Delivery and setup at home included.' },
  { id: 'commode-chair', name: 'Commode & shower chair', cat: 'mobility', brand: 'SafeBath', pack: '1 unit', price: 2199, rx: false, seller: 'MediHome Supplies', sellerVerified: true, deliveryHours: 48, popular: 68,
    desc: 'Rust-proof frame with armrests for safe bathing.' },

  // Nutrition & wellness
  { id: 'protein-drink', name: 'Diabetic-friendly protein drink', cat: 'nutrition', brand: 'NutriCare', pack: '400 g tin, vanilla', price: 799, rx: false, subscribe: true, seller: W2C, deliveryHours: 24, popular: 84,
    desc: 'Nutrition drink with no added sugar. Talk to your doctor if you have kidney problems.' },
  { id: 'multivitamin', name: 'Multivitamin for adults 50+', cat: 'nutrition', brand: 'NutriCare', pack: '60 tablets', price: 549, rx: false, subscribe: true, seller: W2C, deliveryHours: 24, popular: 76,
    desc: 'A daily supplement. Not a replacement for a balanced diet.' },
  { id: 'diabetic-atta', name: 'High-fibre atta', cat: 'nutrition', brand: 'GoodGrain', pack: '1 kg', price: 189, rx: false, subscribe: true, seller: 'Annapurna Foods', sellerVerified: true, deliveryHours: 48, popular: 58,
    desc: 'Multigrain flour with added fibre for everyday rotis.' },

  // Safety & smart tech
  { id: 'pill-box', name: 'Weekly pill box, 4 times a day', cat: 'safety', brand: 'DoseRight', pack: '1 unit', price: 299, rx: false, seller: W2C, deliveryHours: 24, popular: 87,
    desc: 'Big lids marked Morning, Afternoon, Evening and Night for each day of the week.' },
  { id: 'fall-watch', name: 'Fall-detection watch', cat: 'safety', brand: 'GuardianTime', pack: '1 watch', price: 4999, rx: false, seller: 'SmartCare Devices', sellerVerified: true, deliveryHours: 48, popular: 73,
    desc: 'Calls saved family numbers if a fall is detected or the button is pressed.' },
  { id: 'alert-pendant', name: 'Emergency alert pendant', cat: 'safety', brand: 'GuardianTime', pack: '1 pendant', price: 2499, rx: false, seller: 'SmartCare Devices', sellerVerified: true, deliveryHours: 48, popular: 66,
    desc: 'One press sends an alert to family phones.' },
  { id: 'oxygen-concentrator', name: 'Oxygen concentrator, 5 litre', cat: 'safety', brand: 'BreatheEasy', pack: '1 unit, with tubing', rentPerMonth: 4500, rentOnly: true, rx: true, seller: W2C, deliveryHours: 24, popular: 80,
    desc: 'Rent only. Needs a doctor\'s prescription stating the oxygen flow. Our team sets it up at home.' },
];

export const getProduct = (id) => products.find((p) => p.id === id);

export const unitPrice = (p, mode) => (mode === 'rent' ? p.rentPerMonth : p.price);

export const deliveryLabel = (hours) =>
  hours <= 6 ? 'Today by 6 pm' : hours <= 24 ? 'Tomorrow' : 'In 2 days';

export const productFaq = (p) => {
  const faq = [
    { q: 'When will it arrive?', a: `${deliveryLabel(p.deliveryHours)} in ${'Mumbai, Navi Mumbai and Thane'}. Share the OTP with the rider at the door.` },
    { q: 'Can I return it?', a: 'Unopened items can be returned within 7 days. Medicines cannot be returned once delivered, for your safety.' },
  ];
  if (p.rx) faq.unshift({ q: 'Why do I need a prescription?', a: 'By law this medicine is sold only with a valid doctor\'s prescription. A registered pharmacist checks it before we pack your order. If anything is unclear, the pharmacist will call you.' });
  if (p.rentPerMonth) faq.push({ q: 'How does renting work?', a: 'Pay month by month. We deliver, set it up and pick it up when you are done. A refundable deposit may apply.' });
  if (p.subscribe) faq.push({ q: 'How does subscribe work?', a: 'We deliver every month on the same date. You get a reminder before each order and can pause or change anytime.' });
  return faq;
};
