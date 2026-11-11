export const subscriptionPlans = [
  {
    id: 'refills', name: 'Medicine refills', icon: 'pill', edge: 'var(--sage)', often: 'Suggested: monthly',
    points: ['Your regular BP, sugar and heart medicines', 'Pharmacist-verified every time', 'Reminder before each order'],
  },
  {
    id: 'diapers', name: 'Diaper delivery', icon: 'package', edge: 'var(--terracotta)', often: 'Suggested: monthly or fortnightly',
    points: ['Right size and quantity', 'Delivered on schedule', 'Pause or change anytime'],
  },
  {
    id: 'health-checks', name: 'Health checks at home', icon: 'heartPulse', edge: 'var(--green)', often: 'Suggested: monthly',
    points: ['Nurse BP and sugar check', 'Blood tests at home', 'Reports in the app'],
  },
  {
    id: 'sachets', name: 'Dose sachets (pill packs)', icon: 'sun', edge: 'var(--mustard)', often: 'Suggested: monthly',
    points: ['Medicines sorted by time of day', 'Tear one, take the dose', 'No full strips, no leftovers'],
  },
];

// FAQ: cleaned up from the current way2cure.com (placeholder text removed) plus marketplace questions.
export const faqs = [
  { q: 'Where is Way2Cure available?', a: 'We serve Mumbai, Navi Mumbai and Thane.' },
  { q: 'What services does Way2Cure provide?', a: 'Nursing care at home, doctor visits, ICU at home, post-surgery care, elder and palliative care, bedridden patient care and baby care. You can also order medicines, medical devices, daily care items and equipment on rent.' },
  { q: 'How do I order prescription medicines?', a: 'Upload a photo of your prescription in the Way2Cure app. Our system reads the medicines, you confirm the list, and a registered pharmacist checks it before we pack your order. AI assists, pharmacist decides.' },
  { q: 'Do you provide emergency services?', a: 'We mainly schedule planned care. For urgent needs, call 7400400908 and we will do our best to help. In a medical emergency, call 108 or go to the nearest hospital.' },
  { q: 'What are the payment options?', a: 'UPI, credit and debit cards, and net banking. You see the full price, including delivery, before you pay.' },
  { q: 'Can I reschedule or cancel an appointment?', a: 'Yes. You can reschedule or cancel from the app or by calling us, subject to our cancellation policy. Please let us know at least 4 hours before the visit.' },
  { q: 'How are the caretakers and nurses chosen?', a: 'Our caregivers and nurses are trained, certified professionals with home healthcare and hospital experience. Every one of them is background-checked.' },
  { q: 'Can I request a specific caretaker?', a: 'Yes. Based on availability, we will try to send the caretaker you ask for.' },
  { q: 'Can I order for my parents from another city?', a: 'Yes. Add their address and a family profile, and pay online. They share the delivery OTP with the rider, and you get updates on SMS and WhatsApp.' },
  { q: 'How do I pause a subscription?', a: 'Go to Subscriptions, then Manage / pause plan. Tap Pause. Nothing is charged while a plan is paused.' },
];

export const team = [
  { name: 'Dr. Ramesh R. Khandare', role: 'Director' },
  { name: 'Dr. Samidha Patil', role: 'Chief Operating Officer' },
  { name: 'Dr. Pratik Biswas', role: 'Team Advisor · MS, DNB (General Surgeon)' },
  { name: 'Dr. Nishikant Rokade', role: 'Team Advisor · MS, DNB, Senior Consultant' },
];
