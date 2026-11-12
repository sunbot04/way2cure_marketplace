import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accent from '../components/ui/Accent';
import { Field, Input, describedBy } from '../components/ui/Field';
import Seo from '../components/layout/Seo';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SITE } from '../config/site';
import { DEMO_CODE, DEMO_ENABLED, DEMO_PHONE, formatPhone } from '../data/demoAccount';
import { crossfade, fadeRise, stagger } from '../lib/motion';
import { useT, type Dict } from '../i18n/LangContext';

// Log in / sign up with a mobile number and a one-time code (guidelines p.10: phone OTP, no
// passwords). Two steps: number (and name, for sign up), then the 6-digit code.
// TODO: API: POST /auth/otp { phone } to send the SMS, POST /auth/verify { phone, code } to sign in.
// Until then (AuthContext): Log in works for the demo account and for numbers signed up in this
// browser, the code is always 123456, and the session lives in this browser. The demo account
// box below the form logs straight in to the sample account (data/demoAccount.ts).

const RESEND_SECONDS = 30;
const CODE_LENGTH = 6;

const T: Dict = {
  en: {
    seoLogin: 'Log in', seoSignup: 'Sign up',
    seoDesc: 'Log in to Way2Cure with your mobile number and a one-time code. No password needed.',
    titleLogin: 'Welcome *back.*', titleSignup: 'One account for *the whole family.*',
    leadLogin: 'Log in with your mobile number. We send you a one-time code, so there is no password to remember.',
    leadSignup: 'Sign up with your mobile number. Order for yourself or your parents, and follow every order and visit in one place.',
    name: 'Your name', phone: 'Mobile number', phoneHint: 'We send a 6-digit code to this number by SMS.',
    sendCode: 'Send code',
    otpTitle: 'Enter the 6-digit code', otpSent: 'We sent a code to +91 {phone}.', change: 'Change number',
    otpLabel: '6-digit code', digit: 'Digit {n} of 6',
    verifyLogin: 'Log in', verifySignup: 'Create my account',
    resendIn: 'You can ask for a new code in {s} seconds.', resend: 'Send a new code', resent: 'We sent a new code to +91 {phone}.',
    demo: 'Demo: the code is 123456 until SMS codes are switched on.',
    errNoAccount: 'There is no account with this number yet. Check the number, or create an account below.',
    errExists: 'There is already an account with this number. Please log in instead.',
    errOtpWrong: 'That code is not right. Please check it and try again.',
    demoTitle: 'Demo account', demoText: 'See the signed-in pages with sample orders, family members and reminders.',
    demoCreds: 'Mobile {phone} · Code {code}', demoButton: 'Use demo account',
    errName: 'Please add your name, so our team knows who to ask for.',
    errPhone: 'Please enter a 10-digit mobile number that starts with 6, 7, 8 or 9.',
    errOtp: 'Please enter all 6 digits of the code we sent.',
    haveAccount: 'Already have an account?', loginLink: 'Log in',
    noAccount: 'New to Way2Cure?', signupLink: 'Create an account',
    talk: 'Prefer to talk? Call {phone}. We can place the order for you.',
    privacy: 'We use your number only for your orders, visits and reminders. Health information stays private and is shared only with your consent.',
    privacyLink: 'Privacy policy',
    welcome: 'Welcome, {name}. You are signed in.', welcomeBack: 'You are signed in.',
    signedInAs: 'You are signed in as {name}.', signedInPhone: 'Mobile: +91 {phone}', goAccount: 'Go to my account', signOut: 'Log out', signedOut: 'You are logged out.',
    panelTitle: 'Look after your parents, even from another city.',
    p1: 'Order medicines and book nurses for your parents',
    p2: 'Refill reminders before supplies run out',
    p3: 'A pharmacist checks every prescription order',
    p4: 'A real person on the phone, 24/7',
    photoAlt: 'Three generations of a family together',
  },
  hi: {
    seoLogin: 'लॉग इन', seoSignup: 'साइन अप',
    seoDesc: 'अपने मोबाइल नंबर और एक बार के कोड से Way2Cure में लॉग इन करें। पासवर्ड की ज़रूरत नहीं।',
    titleLogin: 'फिर से *स्वागत है।*', titleSignup: 'पूरे परिवार के लिए *एक खाता।*',
    leadLogin: 'अपने मोबाइल नंबर से लॉग इन करें। हम आपको एक बार का कोड भेजते हैं, इसलिए कोई पासवर्ड याद रखने की ज़रूरत नहीं।',
    leadSignup: 'अपने मोबाइल नंबर से साइन अप करें। अपने लिए या माता-पिता के लिए ऑर्डर करें, और हर ऑर्डर और विज़िट एक ही जगह देखें।',
    name: 'आपका नाम', phone: 'मोबाइल नंबर', phoneHint: 'हम इस नंबर पर SMS से 6 अंकों का कोड भेजेंगे।',
    sendCode: 'कोड भेजें',
    otpTitle: '6 अंकों का कोड डालें', otpSent: 'हमने +91 {phone} पर कोड भेजा है।', change: 'नंबर बदलें',
    otpLabel: '6 अंकों का कोड', digit: '6 में से अंक {n}',
    verifyLogin: 'लॉग इन करें', verifySignup: 'मेरा खाता बनाएँ',
    resendIn: '{s} सेकंड बाद आप नया कोड माँग सकते हैं।', resend: 'नया कोड भेजें', resent: 'हमने +91 {phone} पर नया कोड भेजा है।',
    demo: 'डेमो: जब तक SMS कोड चालू नहीं होते, कोड 123456 है।',
    errNoAccount: 'इस नंबर से अभी कोई खाता नहीं है। नंबर जाँचें, या नीचे नया खाता बनाएँ।',
    errExists: 'इस नंबर से खाता पहले से बना हुआ है। कृपया लॉग इन करें।',
    errOtpWrong: 'यह कोड सही नहीं है। कृपया जाँचकर फिर से डालें।',
    demoTitle: 'डेमो खाता', demoText: 'सैंपल ऑर्डर, परिवार के सदस्यों और रिमाइंडर के साथ लॉग इन वाले पेज देखें।',
    demoCreds: 'मोबाइल {phone} · कोड {code}', demoButton: 'डेमो खाता इस्तेमाल करें',
    errName: 'कृपया अपना नाम लिखें, ताकि हमारी टीम जान सके कि किससे बात करनी है।',
    errPhone: 'कृपया 6, 7, 8 या 9 से शुरू होने वाला 10 अंकों का मोबाइल नंबर लिखें।',
    errOtp: 'कृपया हमारे भेजे कोड के सभी 6 अंक डालें।',
    haveAccount: 'पहले से खाता है?', loginLink: 'लॉग इन करें',
    noAccount: 'Way2Cure पर नए हैं?', signupLink: 'खाता बनाएँ',
    talk: 'बात करना चाहते हैं? {phone} पर कॉल करें। हम आपके लिए ऑर्डर कर सकते हैं।',
    privacy: 'हम आपका नंबर सिर्फ़ आपके ऑर्डर, विज़िट और रिमाइंडर के लिए इस्तेमाल करते हैं। सेहत की जानकारी निजी रहती है और सिर्फ़ आपकी मंज़ूरी से शेयर होती है।',
    privacyLink: 'प्राइवेसी पॉलिसी',
    welcome: 'स्वागत है, {name}। आप लॉग इन हो गए हैं।', welcomeBack: 'आप लॉग इन हो गए हैं।',
    signedInAs: 'आप {name} के रूप में लॉग इन हैं।', signedInPhone: 'मोबाइल: +91 {phone}', goAccount: 'मेरे खाते पर जाएँ', signOut: 'लॉग आउट', signedOut: 'आप लॉग आउट हो गए हैं।',
    panelTitle: 'दूसरे शहर से भी अपने माता-पिता का ख़याल रखें।',
    p1: 'माता-पिता के लिए दवाइयाँ मँगाएँ और नर्स बुक करें',
    p2: 'सामान ख़त्म होने से पहले रीफ़िल रिमाइंडर',
    p3: 'हर पर्चे वाले ऑर्डर को फ़ार्मासिस्ट जाँचते हैं',
    p4: 'फ़ोन पर एक असली इंसान, 24/7',
    photoAlt: 'एक परिवार की तीन पीढ़ियाँ साथ में',
  },
  mr: {
    seoLogin: 'लॉग इन', seoSignup: 'साइन अप',
    seoDesc: 'तुमच्या मोबाइल नंबर आणि एकदाच वापरायच्या कोडने Way2Cure मध्ये लॉग इन करा. पासवर्डची गरज नाही.',
    titleLogin: 'पुन्हा *स्वागत आहे.*', titleSignup: 'संपूर्ण कुटुंबासाठी *एकच खाते.*',
    leadLogin: 'तुमच्या मोबाइल नंबरने लॉग इन करा. आम्ही तुम्हाला एकदाच वापरायचा कोड पाठवतो, त्यामुळे पासवर्ड लक्षात ठेवायची गरज नाही.',
    leadSignup: 'तुमच्या मोबाइल नंबरने साइन अप करा. स्वतःसाठी किंवा आई-वडिलांसाठी ऑर्डर करा, आणि प्रत्येक ऑर्डर व भेट एकाच ठिकाणी पाहा.',
    name: 'तुमचे नाव', phone: 'मोबाइल नंबर', phoneHint: 'आम्ही या नंबरवर SMS ने 6 अंकी कोड पाठवू.',
    sendCode: 'कोड पाठवा',
    otpTitle: '6 अंकी कोड टाका', otpSent: 'आम्ही +91 {phone} वर कोड पाठवला आहे.', change: 'नंबर बदला',
    otpLabel: '6 अंकी कोड', digit: '6 पैकी अंक {n}',
    verifyLogin: 'लॉग इन करा', verifySignup: 'माझे खाते तयार करा',
    resendIn: '{s} सेकंदांनंतर तुम्ही नवा कोड मागू शकता.', resend: 'नवा कोड पाठवा', resent: 'आम्ही +91 {phone} वर नवा कोड पाठवला आहे.',
    demo: 'डेमो: SMS कोड सुरू होईपर्यंत कोड 123456 आहे.',
    errNoAccount: 'या नंबरने अजून खाते नाही. नंबर तपासा, किंवा खाली नवीन खाते तयार करा.',
    errExists: 'या नंबरने खाते आधीच आहे. कृपया लॉग इन करा.',
    errOtpWrong: 'हा कोड बरोबर नाही. कृपया तपासून पुन्हा टाका.',
    demoTitle: 'डेमो खाते', demoText: 'नमुना ऑर्डर, कुटुंबातील सदस्य आणि आठवणींसह लॉग इन नंतरची पाने पाहा.',
    demoCreds: 'मोबाइल {phone} · कोड {code}', demoButton: 'डेमो खाते वापरा',
    errName: 'कृपया तुमचे नाव लिहा, म्हणजे आमच्या टीमला कोणाशी बोलायचे ते कळेल.',
    errPhone: 'कृपया 6, 7, 8 किंवा 9 ने सुरू होणारा 10 अंकी मोबाइल नंबर लिहा.',
    errOtp: 'कृपया आम्ही पाठवलेल्या कोडचे सर्व 6 अंक टाका.',
    haveAccount: 'आधीच खाते आहे?', loginLink: 'लॉग इन करा',
    noAccount: 'Way2Cure वर नवीन आहात?', signupLink: 'खाते तयार करा',
    talk: 'बोलायचे आहे? {phone} वर कॉल करा. आम्ही तुमच्यासाठी ऑर्डर करू शकतो.',
    privacy: 'आम्ही तुमचा नंबर फक्त तुमच्या ऑर्डर, भेटी आणि आठवणींसाठी वापरतो. आरोग्याची माहिती खाजगी राहते आणि फक्त तुमच्या संमतीने शेअर होते.',
    privacyLink: 'गोपनीयता धोरण',
    welcome: 'स्वागत आहे, {name}. तुम्ही लॉग इन झाला आहात.', welcomeBack: 'तुम्ही लॉग इन झाला आहात.',
    signedInAs: 'तुम्ही {name} म्हणून लॉग इन आहात.', signedInPhone: 'मोबाइल: +91 {phone}', goAccount: 'माझ्या खात्यावर जा', signOut: 'लॉग आउट', signedOut: 'तुम्ही लॉग आउट झाला आहात.',
    panelTitle: 'दुसऱ्या शहरातूनही आई-वडिलांची काळजी घ्या.',
    p1: 'आई-वडिलांसाठी औषधे मागवा आणि नर्स बुक करा',
    p2: 'साठा संपण्यापूर्वी रिफिलची आठवण',
    p3: 'प्रत्येक प्रिस्क्रिप्शन ऑर्डर फार्मासिस्ट तपासतात',
    p4: 'फोनवर खरी व्यक्ती, 24/7',
    photoAlt: 'एका कुटुंबाच्या तीन पिढ्या एकत्र',
  },
};

type Errors = Partial<Record<'name' | 'phone' | 'otp', string>>;

/** Only same-site paths are allowed as the place to go after signing in. */
const safeNext = (next: string | null) => (next && next.startsWith('/') && !next.startsWith('//') ? next : '/account');

export default function Login({ mode }: { mode: 'login' | 'signup' }) {
  const tr = useT(T);
  const { user, findAccount, checkCode, signIn, signUp, signInDemo, signOut } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const signup = mode === 'signup';

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [errors, setErrors] = useState<Errors>({});
  const [seconds, setSeconds] = useState(0);
  const [notice, setNotice] = useState('');
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  // Resend countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  // Switching between /login and /signup starts again
  useEffect(() => { setStep('phone'); setErrors({}); setNotice(''); }, [mode]);

  useEffect(() => { if (step === 'otp') boxes.current[0]?.focus(); }, [step]);

  const sendCode = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (signup && name.trim().length < 2) er.name = 'errName';
    if (!/^[6-9]\d{9}$/.test(phone)) er.phone = 'errPhone';
    else if (!signup && !findAccount(phone)) er.phone = 'errNoAccount';
    else if (signup && findAccount(phone)) er.phone = 'errExists';
    setErrors(er);
    if (Object.keys(er).length) return;
    // TODO: API: POST /auth/otp { phone }
    setCode(Array(CODE_LENGTH).fill(''));
    setSeconds(RESEND_SECONDS);
    setNotice(tr('otpSent', { phone }));
    setStep('otp');
  };

  const resend = () => {
    // TODO: API: POST /auth/otp { phone } (again)
    setSeconds(RESEND_SECONDS);
    setNotice(tr('resent', { phone }));
    setCode(Array(CODE_LENGTH).fill(''));
    boxes.current[0]?.focus();
  };

  const setDigit = (i: number, value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) { setCode((c) => c.map((d, j) => (j === i ? '' : d))); return; }
    // Typing or autofill may bring several digits at once: spread them across the boxes.
    setCode((c) => {
      const out = [...c];
      digits.slice(0, CODE_LENGTH - i).split('').forEach((d, k) => { out[i + k] = d; });
      return out;
    });
    const last = Math.min(CODE_LENGTH - 1, i + digits.length);
    boxes.current[last]?.focus();
    setErrors((er) => ({ ...er, otp: undefined }));
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < CODE_LENGTH - 1) boxes.current[i + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits) return;
    e.preventDefault();
    setDigit(0, digits);
  };

  const verify = (e: FormEvent) => {
    e.preventDefault();
    if (code.join('').length !== CODE_LENGTH) { setErrors({ otp: 'errOtp' }); return; }
    // TODO: API: POST /auth/verify { phone, code } -> session
    if (!checkCode(code.join(''))) { setErrors({ otp: 'errOtpWrong' }); return; }
    const u = signup ? signUp(phone, name) : signIn(phone);
    if (!u) { setStep('phone'); setErrors({ phone: 'errNoAccount' }); return; }
    welcome(u.name);
  };

  const welcome = (fullName: string) => {
    toast({ message: fullName ? tr('welcome', { name: fullName.split(' ')[0] }) : tr('welcomeBack') });
    navigate(next, { replace: true });
  };

  const logInDemo = () => welcome(signInDemo().name);

  const err = (k: keyof Errors) => (errors[k] ? tr(errors[k]!) : undefined);
  const other = signup
    ? { text: tr('haveAccount'), link: tr('loginLink'), to: `/login${next !== '/account' ? `?next=${encodeURIComponent(next)}` : ''}` }
    : { text: tr('noAccount'), link: tr('signupLink'), to: `/signup${next !== '/account' ? `?next=${encodeURIComponent(next)}` : ''}` };

  return (
    <>
      <Seo title={signup ? tr('seoSignup') : tr('seoLogin')} description={tr('seoDesc')} noindex />
      <section className="section pt-8 lg:pt-12">
        <div className="container grid items-stretch gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* Form */}
          <m.div initial="hidden" animate="show" variants={stagger()} className="grid content-start">
            <m.h1 variants={fadeRise} className="mb-4 text-section md:text-[3rem] md:leading-[1.08]">
              <Accent text={signup ? tr('titleSignup') : tr('titleLogin')} />
            </m.h1>
            <m.p variants={fadeRise} className="mb-8 max-w-[34rem] text-lead text-ink/80">{signup ? tr('leadSignup') : tr('leadLogin')}</m.p>

            <m.div variants={fadeRise} className="rounded-panel bg-white p-6 shadow-card md:p-8">
              {user ? (
                <div className="grid gap-5">
                  <p className="m-0 flex items-center gap-3 font-bold text-green">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-tint"><Icon name="userCheck" size={22} /></span>
                    <span className="grid">
                      <span>{tr('signedInAs', { name: user.name || `+91 ${user.phone}` })}</span>
                      {user.name && <span className="text-base font-semibold text-grey">{tr('signedInPhone', { phone: user.phone })}</span>}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button to={next}>{tr('goAccount')} <Icon name="arrow" size={18} /></Button>
                    <Button variant="outline" onClick={() => { signOut(); toast({ message: tr('signedOut') }); }}>{tr('signOut')}</Button>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  {step === 'phone' ? (
                    <m.form key="phone" {...crossfade} onSubmit={sendCode} noValidate className="grid gap-5">
                      {signup && (
                        <Field id="l-name" label={tr('name')} error={err('name')}>
                          <Input id="l-name" autoComplete="name" value={name} invalid={!!errors.name}
                            aria-describedby={describedBy('l-name', { error: errors.name })}
                            onChange={(e) => setName(e.target.value)} />
                        </Field>
                      )}
                      <Field id="l-phone" label={tr('phone')} hint={tr('phoneHint')} error={err('phone')}>
                        <div className="flex items-stretch">
                          <span className="grid min-h-tap place-items-center rounded-l-btn border-2 border-r-0 border-green bg-mist px-3 font-bold text-green" aria-hidden="true">+91</span>
                          <Input id="l-phone" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={phone}
                            invalid={!!errors.phone} className="rounded-l-none"
                            aria-describedby={describedBy('l-phone', { hint: true, error: errors.phone })}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} />
                        </div>
                      </Field>
                      <Button type="submit" block>{tr('sendCode')} <Icon name="arrow" size={18} /></Button>
                    </m.form>
                  ) : (
                    <m.form key="otp" {...crossfade} onSubmit={verify} noValidate className="grid gap-5">
                      <div>
                        <h2 className="mb-1 font-body text-h3m md:text-h3">{tr('otpTitle')}</h2>
                        <p className="m-0 flex flex-wrap items-center gap-x-3 text-base text-ink/80">
                          <span aria-live="polite">{notice}</span>
                          <button type="button" onClick={() => { setStep('phone'); setErrors({}); }} className="inline-flex min-h-[2.75rem] items-center font-bold text-terracotta-deep underline underline-offset-[3px]">
                            {tr('change')}
                          </button>
                        </p>
                      </div>
                      <fieldset className="m-0 border-0 p-0">
                        <legend className="mb-2 font-bold text-green">{tr('otpLabel')}</legend>
                        <div className="flex gap-2 sm:gap-3">
                          {code.map((d, i) => (
                            <input
                              key={i}
                              ref={(el) => { boxes.current[i] = el; }}
                              value={d}
                              onChange={(e) => setDigit(i, e.target.value)}
                              onKeyDown={(e) => onKey(e, i)}
                              onPaste={onPaste}
                              onFocus={(e) => e.target.select()}
                              inputMode="numeric"
                              autoComplete={i === 0 ? 'one-time-code' : 'off'}
                              maxLength={i === 0 ? CODE_LENGTH : 1}
                              aria-label={tr('digit', { n: i + 1 })}
                              aria-invalid={errors.otp ? true : undefined}
                              aria-describedby={errors.otp ? 'l-otp-error' : 'l-otp-demo'}
                              className={`h-14 w-full min-w-0 max-w-[3.5rem] rounded-btn border-2 bg-white text-center font-head text-h2m font-bold text-green transition-colors duration-micro focus:border-terracotta-deep ${
                                errors.otp ? 'border-terracotta-deep' : d ? 'border-green bg-mist' : 'border-green/50'
                              }`}
                            />
                          ))}
                        </div>
                        {errors.otp && (
                          <p id="l-otp-error" role="alert" className="m-0 mt-2 flex items-center gap-1.5 text-base font-bold text-terracotta-deep">
                            <Icon name="warning" size={18} /> {err('otp')}
                          </p>
                        )}
                        <p id="l-otp-demo" className="m-0 mt-2 text-small text-grey">{tr('demo')}</p>
                      </fieldset>
                      <Button type="submit" block>{signup ? tr('verifySignup') : tr('verifyLogin')} <Icon name="arrow" size={18} /></Button>
                      <p className="m-0 text-base" aria-live="polite">
                        {seconds > 0 ? (
                          <span className="text-grey">{tr('resendIn', { s: seconds })}</span>
                        ) : (
                          <button type="button" onClick={resend} className="inline-flex min-h-[2.75rem] items-center gap-1.5 font-bold text-terracotta-deep underline underline-offset-[3px]">
                            <Icon name="refresh" size={16} /> {tr('resend')}
                          </button>
                        )}
                      </p>
                    </m.form>
                  )}
                </AnimatePresence>
              )}

              {!user && (
                <p className="mb-0 mt-6 border-t border-line pt-5 text-base">
                  {other.text}{' '}
                  <Link to={other.to} className="group inline-flex min-h-[2.75rem] items-center gap-1 font-bold">{other.link} <Icon name="arrow" size={16} /></Link>
                </p>
              )}
            </m.div>

            {DEMO_ENABLED && !user && (
              <m.div variants={fadeRise} className="mt-5 flex gap-4 rounded-panel border-2 border-dashed border-sage/50 bg-sage-tint/60 p-5 md:p-6">
                <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-green"><Icon name="userCheck" size={22} /></span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 font-bold text-green">{tr('demoTitle')}</p>
                  <p className="m-0 text-base text-ink/80">{tr('demoText')}</p>
                  <p className="m-0 mt-1 text-small font-semibold text-green">{tr('demoCreds', { phone: formatPhone(DEMO_PHONE), code: DEMO_CODE })}</p>
                  <Button variant="outline" compact onClick={logInDemo} className="mt-4">{tr('demoButton')} <Icon name="arrow" size={18} /></Button>
                </div>
              </m.div>
            )}

            <m.div variants={fadeRise} className="mt-6 grid gap-3 text-base text-ink/80">
              <p className="m-0 flex items-start gap-2">
                <Icon name="phone" size={18} className="mt-1 shrink-0 text-terracotta-deep" />
                <a href={SITE.phoneHref} className="text-ink no-underline hover:underline">{tr('talk', { phone: SITE.phone })}</a>
              </p>
              <p className="m-0 flex items-start gap-2 text-small">
                <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-sage" />
                <span>{tr('privacy')} <Link to="/privacy">{tr('privacyLink')}</Link></span>
              </p>
            </m.div>
          </m.div>

          {/* Brand panel (desktop): a real family photo and why families sign up */}
          <m.aside
            initial="hidden"
            animate="show"
            variants={fadeRise}
            className="relative hidden min-h-[36rem] overflow-hidden rounded-panel bg-green lg:block"
          >
            {/* Stock photo (Pexels licence) until the Way2Cure photo shoot: see public/images/people/CREDITS.md */}
            <img
              src="/images/people/family-three-generations.webp"
              alt={tr('photoAlt')}
              width={900}
              height={1350}
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-green via-green/70 via-45% to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <p className="mb-5 font-head text-h2 font-bold leading-tight text-white">{tr('panelTitle')}</p>
              <ul className="grid gap-2.5">
                {(['p1', 'p2', 'p3', 'p4'] as const).map((k) => (
                  <li key={k} className="flex items-start gap-3 text-base text-white">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mustard text-green"><Icon name="check" size={14} /></span>
                    {tr(k)}
                  </li>
                ))}
              </ul>
            </div>
          </m.aside>
        </div>
      </section>
    </>
  );
}
