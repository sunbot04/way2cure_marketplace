// Checkout choices shared by the website (pages/Checkout.tsx) and the customer app (../customer-app, which copies it with npm run sync-shared).
// No React or browser code here.
import type { Lang } from './types';

// The chosen slot is saved by its stable id (form state, sessionStorage, order record);
// only the label shown on screen changes with the language.
export const SLOTS: ({ id: string } & Record<Lang, string>)[] = [
  { id: 'today-6pm', en: 'Today, by 6 pm', hi: 'आज, शाम 6 बजे तक', mr: 'आज, संध्याकाळी 6 पर्यंत' },
  { id: 'today-6-9pm', en: 'Today, 6 pm to 9 pm', hi: 'आज, शाम 6 से रात 9 बजे', mr: 'आज, संध्याकाळी 6 ते रात्री 9' },
  { id: 'tomorrow-9am-1pm', en: 'Tomorrow, 9 am to 1 pm', hi: 'कल, सुबह 9 से दोपहर 1 बजे', mr: 'उद्या, सकाळी 9 ते दुपारी 1' },
  { id: 'tomorrow-2-6pm', en: 'Tomorrow, 2 pm to 6 pm', hi: 'कल, दोपहर 2 से शाम 6 बजे', mr: 'उद्या, दुपारी 2 ते संध्याकाळी 6' },
];
export const slotById = (id: string) => SLOTS.find((s) => s.id === id) || SLOTS[0];
export const slotLabel = (id: string, lang: Lang) => slotById(id)[lang] || slotById(id).en;

export const PAY: ({ id: string } & Record<Lang, [string, string]>)[] = [
  { id: 'upi', en: ['UPI', 'GPay, PhonePe, Paytm or any UPI app'], hi: ['UPI', 'GPay, PhonePe, Paytm या कोई भी UPI ऐप'], mr: ['UPI', 'GPay, PhonePe, Paytm किंवा कोणतेही UPI ॲप'] },
  { id: 'card', en: ['Debit or credit card', 'Visa, Mastercard, RuPay'], hi: ['डेबिट या क्रेडिट कार्ड', 'Visa, Mastercard, RuPay'], mr: ['डेबिट किंवा क्रेडिट कार्ड', 'Visa, Mastercard, RuPay'] },
  { id: 'netbanking', en: ['Net banking', 'All major Indian banks'], hi: ['नेट बैंकिंग', 'सभी बड़े भारतीय बैंक'], mr: ['नेट बँकिंग', 'सर्व प्रमुख भारतीय बँका'] },
];

/** Care visit times (pages/CareBooking.tsx). Labels live with each app's copy. */
export const CARE_TIMES = ['morning', 'afternoon', 'evening', 'night'] as const;
