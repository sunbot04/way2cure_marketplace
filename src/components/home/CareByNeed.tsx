import { useRef, type ComponentType, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import Accent from '../ui/Accent';
import { Stagger, StaggerItem } from '../motion/Reveal';
import { services } from '../../data';
import { SITE } from '../../config/site';
import { useLoc, useT, type Dict } from '../../i18n/LangContext';
import { CancerArt, DementiaArt, DoctorArt, ElderArt, IcuArt, NurseArt, StrokeArt, VentilatorArt } from '../brand/Illustrations';
import './ShopByNeed.css';

// Care-at-home cards on the homepage, in the same design as "Shop by need" (client file
// shop-by-need-v4.html), sharing its styles (ShopByNeed.css).
//  · Desktop: Nurse at home is the tall dark card (book a nurse, two floating notes), Doctor at home
//    the wide card, then Elder care, Dementia care (New) and the four specialised services.
//    Tablet: two columns. Phones: compact rows, text on the left and the drawing on the right.
//  · On hover a card lifts, its drawing rises and the round button grows into a "View" pill.
//    Service names come from the data; each card opens its care plan (/care/:id).

const T: Dict = {
  en: {
    badge: 'Background-checked',
    nurseTitle: 'Nurses at home,\n*day or night.*',
    toast1: 'Vital signs checked', toast1Sub: 'by a qualified nurse',
    toast2: '12 or 24-hour shifts', toast2Sub: 'or single visits',
    book: 'Book a nurse', orCall: 'or call {phone}',
    docTagline: "A doctor's visit, without the trip to the clinic.",
    elder: 'Walking · Bathing · Meals · Company',
    dementia: 'Trained caretakers · Safe-zone band',
    icu: 'Monitors · Oxygen · Doctor supervision',
    ventilator: 'Ventilator or BiPAP · Tracheostomy care',
    stroke: 'Physiotherapy · Speech therapy · Nursing',
    cancer: 'Oncology nursing · Pain and palliative care',
    isNew: 'New', view: 'View', viewPlan: 'View care plan',
  },
  hi: {
    badge: 'बैकग्राउंड जाँचे हुए',
    nurseTitle: 'घर पर नर्स,\n*दिन हो या रात।*',
    toast1: 'वाइटल्स की जाँच', toast1Sub: 'योग्य नर्स द्वारा',
    toast2: '12 या 24 घंटे की शिफ़्ट', toast2Sub: 'या एक बार की विज़िट',
    book: 'नर्स बुक करें', orCall: 'या {phone} पर कॉल करें',
    docTagline: 'क्लिनिक जाए बिना, डॉक्टर घर पर।',
    elder: 'चलना-फिरना · नहाना · खाना · साथ',
    dementia: 'प्रशिक्षित केयरटेकर · सेफ़-ज़ोन बैंड',
    icu: 'मॉनिटर · ऑक्सीजन · डॉक्टर की निगरानी',
    ventilator: 'वेंटिलेटर या BiPAP · ट्रेकियोस्टॉमी देखभाल',
    stroke: 'फ़िज़ियोथेरेपी · स्पीच थेरेपी · नर्सिंग',
    cancer: 'कैंसर नर्सिंग · दर्द और पैलिएटिव देखभाल',
    isNew: 'नया', view: 'देखें', viewPlan: 'केयर प्लान देखें',
  },
  mr: {
    badge: 'पार्श्वभूमी तपासलेले',
    nurseTitle: 'घरी नर्स,\n*दिवस असो वा रात्र.*',
    toast1: 'व्हायटल्सची तपासणी', toast1Sub: 'पात्र नर्सकडून',
    toast2: '12 किंवा 24 तासांची शिफ्ट', toast2Sub: 'किंवा एकदाची भेट',
    book: 'नर्स बुक करा', orCall: 'किंवा {phone} वर कॉल करा',
    docTagline: 'क्लिनिकला न जाता, डॉक्टर घरी.',
    elder: 'चालणे · आंघोळ · जेवण · सोबत',
    dementia: 'प्रशिक्षित केअरटेकर · सेफ-झोन बँड',
    icu: 'मॉनिटर · ऑक्सिजन · डॉक्टरांची देखरेख',
    ventilator: 'व्हेंटिलेटर किंवा BiPAP · ट्रेकिओस्टॉमी काळजी',
    stroke: 'फिजिओथेरपी · स्पीच थेरपी · नर्सिंग',
    cancer: 'कर्करोग नर्सिंग · वेदना व पॅलिएटिव्ह काळजी',
    isNew: 'नवीन', view: 'पाहा', viewPlan: 'काळजी योजना पाहा',
  },
};

const service = (id: string) => services.find((s) => s.id === id)!;

/** The round button in a card's corner; grows into a "View" pill when the card is hovered or focused. */
function Go({ label }: { label: string }) {
  return (
    <span className="sbn-go" aria-hidden="true">
      <span className="sbn-go__label">{label}</span>
      <Icon name="arrow" size={16} />
    </span>
  );
}

const SMALL: { id: string; alt: boolean; Art: ComponentType<{ className?: string }> }[] = [
  { id: 'elder', alt: false, Art: ElderArt },
  { id: 'dementia', alt: true, Art: DementiaArt },
  { id: 'icu', alt: true, Art: IcuArt },
  { id: 'ventilator', alt: false, Art: VentilatorArt },
  { id: 'stroke', alt: true, Art: StrokeArt },
  { id: 'cancer', alt: false, Art: CancerArt },
];

export default function CareByNeed() {
  const tr = useT(T);
  const loc = useLoc();
  const heroRef = useRef<HTMLDivElement>(null);
  const nurse = loc(service('nurse'));
  const doctor = loc(service('doctor'));

  // Nurse card: the drawing and its two notes drift a little with the mouse (not on touch screens,
  // and not when the visitor asks for reduced motion).
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    heroRef.current?.style.setProperty('--mx', '0');
    heroRef.current?.style.setProperty('--my', '0');
  };

  return (
    <Stagger as="ul" className="sbn-grid sbn-grid--care">
      {/* Nurse at home */}
      <StaggerItem as="li" className="sbn-cell sbn-cell--med">
        <div ref={heroRef} className="sbn-card sbn-med" onMouseMove={onMove} onMouseLeave={onLeave}>
          <span className="sbn-badge">{tr('badge')}</span>
          <h3 className="sbn-med__title"><Accent text={tr('nurseTitle')} /></h3>
          <p className="sbn-med__lead">{nurse.short}</p>
          <svg className="sbn-glow" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="50" r="50" fill="url(#art-glow)" /></svg>
          <NurseArt className="sbn-med__art" />
          <div className="sbn-toast sbn-toast--1" aria-hidden="true">
            <span className="sbn-toast__icon sbn-toast__icon--ok"><Icon name="check" size={16} /></span>
            <span><b>{tr('toast1')}</b><small>{tr('toast1Sub')}</small></span>
          </div>
          <div className="sbn-toast sbn-toast--2" aria-hidden="true">
            <span className="sbn-toast__icon sbn-toast__icon--refill"><Icon name="clock" size={16} /></span>
            <span><b>{tr('toast2')}</b><small>{tr('toast2Sub')}</small></span>
          </div>
          <div className="sbn-med__cta">
            <Link to="/care/nurse" className="sbn-btn sbn-btn--crimson"><Icon name="stethoscope" size={18} /> {tr('book')}</Link>
            <a href={SITE.phoneHref} className="sbn-btn sbn-btn--link">{tr('orCall', { phone: SITE.phone })} <Icon name="arrow" size={16} /></a>
          </div>
        </div>
      </StaggerItem>

      {/* Doctor at home (wide) */}
      <StaggerItem as="li" className="sbn-cell sbn-cell--dev">
        <Link to="/care/doctor" className="sbn-card sbn-cat sbn-dev sbn-card--alt">
          <Go label={tr('view')} />
          <span className="sbn-dev__copy">
            <h3 className="sbn-cat__title">{doctor.name}</h3>
            <span className="sbn-cat__sub">{tr('docTagline')}<span className="sbn-more" aria-hidden="true">{tr('viewPlan')} →</span></span>
            <ul className="sbn-chips">{doctor.includes.slice(0, 3).map((c) => <li key={c}>{c}</li>)}</ul>
          </span>
          <span className="sbn-art"><DoctorArt /></span>
        </Link>
      </StaggerItem>

      {/* Elder, Dementia (New), ICU, Ventilator, Stroke, Cancer */}
      {SMALL.map(({ id, alt, Art }) => {
        const raw = service(id);
        const s = loc(raw);
        return (
          <StaggerItem as="li" key={id} className={`sbn-cell sbn-cell--${id}`}>
            <Link to={`/care/${id}`} className={`sbn-card sbn-cat${alt ? ' sbn-card--alt' : ''}`}>
              <Go label={tr('view')} />
              <h3 className="sbn-cat__title">{s.name}</h3>
              <span className="sbn-cat__sub">
                {tr(id)}
                {!raw.isNew && <span className="sbn-more" aria-hidden="true">{tr('viewPlan')} →</span>}
              </span>
              {raw.isNew && <span className="sbn-ribbon sbn-ribbon--new">{tr('isNew')}</span>}
              <span className="sbn-art"><Art /></span>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
