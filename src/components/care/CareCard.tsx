import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { useLoc, useT, type Dict } from '../../i18n/LangContext';
import type { Service } from '../../data';
import {
  BabyArt, BedriddenArt, CancerArt, DementiaArt, DoctorArt, ElderArt, IcuArt, NurseArt, PostOpArt, StrokeArt, VentilatorArt,
} from '../brand/Illustrations';
import '../home/ShopByNeed.css';

// Care service card, in the same design as the homepage care cards (ShopByNeed.css): a light card
// with the service's drawing on a soft round stage, a round arrow in the corner that grows into a
// "View" pill on hover, and a "New" ribbon where it applies. The whole card opens the care plan.
// Put cards inside `<ul className="sbn-grid sbn-grid--page">` for the page grid.
const T: Dict = {
  en: { view: 'View', viewPlan: 'View care plan', isNew: 'New' },
  hi: { view: 'देखें', viewPlan: 'केयर प्लान देखें', isNew: 'नया' },
  mr: { view: 'पाहा', viewPlan: 'काळजी योजना पाहा', isNew: 'नवीन' },
};

const ART: Record<string, ComponentType<{ className?: string }>> = {
  nurse: NurseArt,
  doctor: DoctorArt,
  elder: ElderArt,
  bedridden: BedriddenArt,
  'post-op': PostOpArt,
  baby: BabyArt,
  dementia: DementiaArt,
  icu: IcuArt,
  ventilator: VentilatorArt,
  stroke: StrokeArt,
  cancer: CancerArt,
};

export default function CareCard({ service, alt = false }: { service: Service; alt?: boolean }) {
  const tr = useT(T);
  const s = useLoc()(service);
  const Art = ART[service.id];
  return (
    <Link to={`/care/${service.id}`} className={`sbn-card sbn-cat sbn-care${alt ? ' sbn-card--alt' : ''}`}>
      <span className="sbn-go" aria-hidden="true">
        <span className="sbn-go__label">{tr('view')}</span>
        <Icon name="arrow" size={16} />
      </span>
      <h3 className="sbn-cat__title">{s.name}</h3>
      <span className="sbn-cat__sub">
        {s.short}
        <span className="sbn-more" aria-hidden="true">{tr('viewPlan')} →</span>
      </span>
      {service.isNew && <span className="sbn-ribbon sbn-ribbon--new">{tr('isNew')}</span>}
      {Art ? (
        <span className="sbn-art"><Art /></span>
      ) : (
        <span className="sbn-icon-art" aria-hidden="true"><Icon name={service.icon} size={40} /></span>
      )}
    </Link>
  );
}
