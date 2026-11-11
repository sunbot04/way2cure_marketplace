import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { AppQR, InfoBand, PageHead, Steps, rxSteps, HelpBox } from '../components/ui.jsx';
import { useLoc, useT } from '../context/LangContext.jsx';

const T = {
  en: {
    eyebrow: 'Prescription orders',
    title: 'Upload your prescription in the app',
    intro: 'Snap a photo of your prescription. We list the medicines, you confirm, and a registered pharmacist checks every order before it leaves the pharmacy.',
    aiTitle: 'AI assists, pharmacist decides.',
    aiText: 'Our system reads the prescription to save you typing. A registered pharmacist always makes the final check.',
    howItWorks: 'How it works',
    checkTitle: 'You check the list first',
    checkText: 'After you upload, the app shows the medicines it found. Fix anything that looks wrong before you confirm. This example shows how the list looks.',
    medicinesFound: 'Medicines found',
    example: 'Example',
    medicine: 'Medicine',
    howOften: 'How often',
    howLong: 'For how long',
    done: 'Done',
    edit: 'Edit',
    remove: 'Remove',
    editAria: 'Edit {name}',
    removeAria: 'Remove {name}',
    unclear: 'Unclear? The pharmacist will call you before packing.',
    followTitle: 'Follow every step',
    followText: 'You get SMS and WhatsApp updates at each stage. Family members can follow the same order.',
    order: 'Order {id}',
    goodToKnow: 'Good to know',
    know1: 'Prescription medicines are sold only with a valid prescription.',
    know2: "Schedule H and H1 medicines need a valid doctor's prescription.",
    know3: 'We do not sell Schedule X drugs or narcotics.',
    know4: 'Your prescription is used only for your order. We never share it without your consent.',
    s0: 'Uploaded', s1: 'List confirmed', s2: 'Pharmacist checked', s3: 'Out for delivery', s4: 'Delivered',
  },
  hi: {
    eyebrow: 'पर्चे वाले ऑर्डर',
    title: 'ऐप में अपना पर्चा अपलोड करें',
    intro: 'अपने पर्चे की फ़ोटो लें। हम दवाइयों की लिस्ट बनाते हैं, आप उसे कन्फ़र्म करते हैं, और फ़ार्मेसी से निकलने से पहले हर ऑर्डर को एक रजिस्टर्ड फ़ार्मासिस्ट जाँचते हैं।',
    aiTitle: 'AI मदद करता है, फ़ैसला फ़ार्मासिस्ट करते हैं।',
    aiText: 'हमारा सिस्टम पर्चा पढ़ लेता है, ताकि आपको टाइप न करना पड़े। आख़िरी जाँच हमेशा एक रजिस्टर्ड फ़ार्मासिस्ट ही करते हैं।',
    howItWorks: 'यह कैसे काम करता है',
    checkTitle: 'पहले आप लिस्ट देख लें',
    checkText: 'अपलोड के बाद ऐप पर्चे में मिली दवाइयाँ दिखाता है। कन्फ़र्म करने से पहले जो भी गलत लगे, उसे ठीक कर दें। यह उदाहरण दिखाता है कि लिस्ट कैसी दिखती है।',
    medicinesFound: 'मिली हुई दवाइयाँ',
    example: 'उदाहरण',
    medicine: 'दवा',
    howOften: 'कितनी बार',
    howLong: 'कितने दिन',
    done: 'हो गया',
    edit: 'बदलें',
    remove: 'हटाएँ',
    editAria: '{name} बदलें',
    removeAria: '{name} हटाएँ',
    unclear: 'कुछ साफ़ नहीं है? पैक करने से पहले फ़ार्मासिस्ट आपको कॉल करेंगे।',
    followTitle: 'हर कदम पर नज़र रखें',
    followText: 'हर चरण पर आपको SMS और व्हाट्सऐप पर अपडेट मिलते हैं। परिवार के सदस्य भी वही ऑर्डर देख सकते हैं।',
    order: 'ऑर्डर {id}',
    goodToKnow: 'ये बातें जान लें',
    know1: 'पर्चे वाली दवाइयाँ सिर्फ़ वैध पर्चे पर ही मिलती हैं।',
    know2: 'शेड्यूल H और H1 दवाइयों के लिए डॉक्टर का वैध पर्चा ज़रूरी है।',
    know3: 'हम शेड्यूल X दवाइयाँ या नशीली दवाइयाँ नहीं बेचते।',
    know4: 'आपका पर्चा सिर्फ़ आपके ऑर्डर के लिए इस्तेमाल होता है। आपकी मंज़ूरी के बिना हम इसे कभी किसी से शेयर नहीं करते।',
    s0: 'अपलोड हुआ', s1: 'लिस्ट कन्फ़र्म', s2: 'फ़ार्मासिस्ट ने जाँचा', s3: 'डिलिवरी के लिए निकला', s4: 'पहुँच गया',
  },
  mr: {
    eyebrow: 'प्रिस्क्रिप्शनच्या ऑर्डर',
    title: 'ॲपमध्ये तुमचे प्रिस्क्रिप्शन अपलोड करा',
    intro: 'तुमच्या प्रिस्क्रिप्शनचा फोटो काढा. आम्ही औषधांची यादी करतो, तुम्ही ती निश्चित करता, आणि फार्मसीमधून निघण्यापूर्वी प्रत्येक ऑर्डर नोंदणीकृत फार्मासिस्ट तपासतात.',
    aiTitle: 'AI मदत करते, निर्णय फार्मासिस्ट घेतात.',
    aiText: 'तुम्हाला टाइप करावे लागू नये म्हणून आमची सिस्टम प्रिस्क्रिप्शन वाचते. शेवटची तपासणी नेहमी नोंदणीकृत फार्मासिस्टच करतात.',
    howItWorks: 'हे कसे चालते',
    checkTitle: 'आधी तुम्ही यादी तपासा',
    checkText: 'अपलोड केल्यावर ॲप सापडलेली औषधे दाखवते. निश्चित करण्यापूर्वी काही चुकीचे वाटले तर ते दुरुस्त करा. यादी कशी दिसते ते हे उदाहरण दाखवते.',
    medicinesFound: 'सापडलेली औषधे',
    example: 'उदाहरण',
    medicine: 'औषध',
    howOften: 'किती वेळा',
    howLong: 'किती दिवस',
    done: 'झाले',
    edit: 'बदला',
    remove: 'काढा',
    editAria: '{name} बदला',
    removeAria: '{name} काढा',
    unclear: 'काही स्पष्ट नाही? पॅक करण्यापूर्वी फार्मासिस्ट तुम्हाला कॉल करतील.',
    followTitle: 'प्रत्येक टप्पा पाहा',
    followText: 'प्रत्येक टप्प्यावर तुम्हाला SMS आणि व्हॉट्सॲपवर अपडेट मिळतात. कुटुंबातील सदस्यही तीच ऑर्डर पाहू शकतात.',
    order: 'ऑर्डर {id}',
    goodToKnow: 'हे लक्षात ठेवा',
    know1: 'प्रिस्क्रिप्शनची औषधे फक्त वैध प्रिस्क्रिप्शनवरच मिळतात.',
    know2: 'शेड्यूल H आणि H1 औषधांसाठी डॉक्टरांचे वैध प्रिस्क्रिप्शन लागते.',
    know3: 'आम्ही शेड्यूल X औषधे किंवा अंमली पदार्थ विकत नाही.',
    know4: 'तुमचे प्रिस्क्रिप्शन फक्त तुमच्या ऑर्डरसाठी वापरले जाते. तुमच्या संमतीशिवाय आम्ही ते कधीही कोणाला देत नाही.',
    s0: 'अपलोड झाले', s1: 'यादी निश्चित', s2: 'फार्मासिस्टने तपासले', s3: 'डिलिव्हरीसाठी निघाले', s4: 'पोहोचले',
  },
};

// Illustrative example from the proposal. The real list comes from the app after upload.
// Drug names stay as written on the prescription; dose and duration are localised.
const SAMPLE = [
  { id: 1, name: 'Metformin 500 mg', dose: 'Twice daily', days: '30 days',
    hi: { dose: 'दिन में दो बार', days: '30 दिन' }, mr: { dose: 'दिवसातून दोनदा', days: '30 दिवस' } },
  { id: 2, name: 'Amlodipine 5 mg', dose: 'Once daily', days: '30 days',
    hi: { dose: 'दिन में एक बार', days: '30 दिन' }, mr: { dose: 'दिवसातून एकदा', days: '30 दिवस' } },
  { id: 3, name: 'Vitamin D3', dose: 'Once weekly', days: '8 weeks',
    hi: { dose: 'हफ़्ते में एक बार', days: '8 हफ़्ते' }, mr: { dose: 'आठवड्यातून एकदा', days: '8 आठवडे' } },
];

const STATUS = ['s0', 's1', 's2', 's3', 's4'];

export default function Prescription() {
  const tr = useT(T);
  const loc = useLoc();
  const [list, setList] = useState(SAMPLE);
  const [editing, setEditing] = useState(null);

  // Once a field is edited by hand, drop the translations so the typed text shows in every language.
  const update = (id, key, value) =>
    setList((l) => l.map((m) => (m.id === id ? { ...m, [key]: value, hi: { ...m.hi, [key]: value }, mr: { ...m.mr, [key]: value } } : m)));

  return (
    <>
      <PageHead eyebrow={tr('eyebrow')} title={tr('title')} tone="green">
        <p>{tr('intro')}</p>
      </PageHead>

      <div className="container section-sm two-col">
        <AppQR />
        <div className="stack">
          <InfoBand icon="sparkles">
            <strong>{tr('aiTitle')}</strong> {tr('aiText')}
          </InfoBand>
          <HelpBox />
        </div>
      </div>

      <section className="section section-white">
        <div className="container">
          <h2>{tr('howItWorks')}</h2>
          <Steps steps={rxSteps} />
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>{tr('checkTitle')}</h2>
            <p>{tr('checkText')}</p>
            <div className="card rx-list">
              <div className="rx-list-head">
                <strong>{tr('medicinesFound')}</strong>
                <span className="small">{tr('example')}</span>
              </div>
              <ul>
                {list.map((item) => {
                  const m = loc(item);
                  return (
                    <li key={m.id} className="rx-item">
                      {editing === m.id ? (
                        <div className="rx-edit">
                          <label>{tr('medicine')}<input value={m.name} onChange={(e) => update(m.id, 'name', e.target.value)} /></label>
                          <label>{tr('howOften')}<input value={m.dose} onChange={(e) => update(m.id, 'dose', e.target.value)} /></label>
                          <label>{tr('howLong')}<input value={m.days} onChange={(e) => update(m.id, 'days', e.target.value)} /></label>
                          <button type="button" className="btn btn-primary btn-sm" onClick={() => setEditing(null)}>{tr('done')}</button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <strong>{m.name}</strong>
                            <span>{m.dose} · {m.days}</span>
                          </div>
                          <div className="rx-actions">
                            <button type="button" className="link-btn" aria-label={tr('editAria', { name: m.name })} onClick={() => setEditing(m.id)}><Icon name="edit" size={18} /> {tr('edit')}</button>
                            <button type="button" className="link-btn" aria-label={tr('removeAria', { name: m.name })} onClick={() => setList((l) => l.filter((x) => x.id !== m.id))}><Icon name="trash" size={18} /> {tr('remove')}</button>
                          </div>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="small muted">{tr('unclear')}</p>
            </div>
          </div>
          <div>
            <h2>{tr('followTitle')}</h2>
            <p>{tr('followText')}</p>
            <div className="card status-card">
              <p><strong>{tr('order', { id: 'W2C204518' })}</strong> · {tr('example')}</p>
              <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={STATUS.length - 1} aria-valuenow={2} aria-valuetext={tr('s2')}>
                <span style={{ width: '50%' }} />
              </div>
              <ol className="status-list">
                {STATUS.map((s, i) => (
                  <li key={s} className={i <= 2 ? 'done' : ''}>
                    <Icon name={i <= 2 ? 'check' : 'clock'} size={18} /> {tr(s)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-mint">
        <div className="container">
          <h2>{tr('goodToKnow')}</h2>
          <ul className="check-list">
            <li><Icon name="check" /> {tr('know1')}</li>
            <li><Icon name="check" /> {tr('know2')}</li>
            <li><Icon name="check" /> {tr('know3')}</li>
            <li><Icon name="check" /> {tr('know4')}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
