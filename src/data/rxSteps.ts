import type { Step } from '../components/ui/StepList';

// The four prescription steps (guidelines p.9 item 4), shared by Home, Upload Prescription and the styleguide.
// `tag` is the short time label the prescription story shows beside each title (optional elsewhere).
export const RX_STEPS: Step[] = [
  { title: 'Upload', text: 'Snap your prescription in the Way2Cure app.', tag: '1 minute',
    hi: { title: 'अपलोड', text: 'Way2Cure ऐप में पर्चे की फ़ोटो लें।', tag: '1 मिनट' }, mr: { title: 'अपलोड', text: 'Way2Cure ॲपमध्ये प्रिस्क्रिप्शनचा फोटो घ्या.', tag: '1 मिनिट' } },
  { title: 'AI reads', text: 'The medicines are listed for you to check and edit.', tag: 'Instant',
    hi: { title: 'AI पढ़ता है', text: 'दवाइयों की लिस्ट बनती है, जिसे आप जाँच और बदल सकते हैं।', tag: 'तुरंत' }, mr: { title: 'AI वाचते', text: 'औषधांची यादी तयार होते, जी तुम्ही तपासू आणि बदलू शकता.', tag: 'लगेच' } },
  { title: 'Pharmacist verifies', text: 'A registered pharmacist checks every order before packing.', tag: 'Before packing',
    hi: { title: 'फ़ार्मासिस्ट जाँचते हैं', text: 'पैक करने से पहले रजिस्टर्ड फ़ार्मासिस्ट हर ऑर्डर जाँचते हैं।', tag: 'पैकिंग से पहले' }, mr: { title: 'फार्मासिस्ट तपासतात', text: 'पॅक करण्यापूर्वी नोंदणीकृत फार्मासिस्ट प्रत्येक ऑर्डर तपासतात.', tag: 'पॅकिंगपूर्वी' } },
  { title: 'Delivered', text: 'To your door. Share the OTP with the rider.', tag: 'Same day',
    hi: { title: 'डिलिवरी', text: 'आपके दरवाज़े तक। राइडर को OTP बताएँ।', tag: 'उसी दिन' }, mr: { title: 'डिलिव्हरी', text: 'तुमच्या दारात. रायडरला OTP सांगा.', tag: 'त्याच दिवशी' } },
];
