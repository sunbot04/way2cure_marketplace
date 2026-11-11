// Care services. Descriptions adapted from the current way2cure.com and the marketplace proposal.

export const services = [
  {
    id: 'nurse', name: 'Nurse at home', icon: 'stethoscope', edge: 'var(--sage)',
    short: 'Injections, IV care, wound dressing and post-surgery care by qualified nurses.',
    includes: ['Injections & IV care', 'Wound dressing', 'Vital sign checks', 'Medicine given on time', 'Post-surgery care'],
    duration: 'Single visits of about 1 hour, or 12 / 24-hour shifts',
  },
  {
    id: 'doctor', name: 'Doctor at home', icon: 'userDoctor', edge: 'var(--green)',
    short: 'Home consultations, check-ups and follow-up visits.',
    includes: ['Home consultation', 'General check-up', 'Follow-up visits', 'Prescriptions and referrals'],
    duration: 'About 30 to 45 minutes per visit',
  },
  {
    id: 'elder', name: 'Elder care', icon: 'handHeart', edge: 'var(--mustard)',
    short: 'Daily living support with comfort, dignity and independence.',
    includes: ['Help with walking and moving', 'Bathing and hygiene', 'Meals and medicines on time', 'Companionship'],
    duration: '12 or 24-hour caretaker, daily or long term',
  },
  {
    id: 'bedridden', name: 'Bedridden patient care', icon: 'bed', edge: 'var(--terracotta)',
    short: 'Hygiene, feeding, turning and close watch to prevent bedsores and complications.',
    includes: ['Turning every 2 hours', 'Hygiene and diaper care', 'Feeding support', 'Bedsore prevention'],
    duration: '12 or 24-hour shifts',
  },
  {
    id: 'post-op', name: 'Post-operative care', icon: 'bandage', edge: 'var(--sage)',
    short: 'Wound care, medicines, physiotherapy support and regular checks after surgery.',
    includes: ['Wound and drain care', 'Medicine management', 'Physiotherapy support', 'Regular health checks'],
    duration: 'Daily visits or shifts, usually 1 to 4 weeks',
  },
  {
    id: 'baby', name: 'Baby care', icon: 'baby', edge: 'var(--mustard)',
    short: 'Gentle care for newborns, including feeding support and hygiene.',
    includes: ['Feeding support', 'Bathing and hygiene', 'Sleep routine help', 'Support for the mother'],
    duration: '12 or 24-hour shifts',
  },
  {
    id: 'icu', name: 'ICU at home', icon: 'activity', edge: 'var(--terracotta)', specialised: true,
    short: 'Critical-care setup with monitors, oxygen support and a trained team on call.',
    includes: ['Critical-care nurse', 'Monitors & oxygen', 'Doctor supervision', 'Equipment setup at home'],
    duration: 'Planned with the treating doctor, often 1 to 4 weeks',
  },
  {
    id: 'ventilator', name: 'Ventilator care', icon: 'wind', edge: 'var(--green)', specialised: true,
    short: 'Ventilator or BiPAP support with tracheostomy and respiratory care.',
    includes: ['Ventilator or BiPAP', 'Tracheostomy care', 'Respiratory support', 'Trained respiratory nurse'],
    duration: 'Planned with the treating doctor',
  },
  {
    id: 'stroke', name: 'Stroke care', icon: 'brain', edge: 'var(--sage)', specialised: true,
    short: 'Nursing, physiotherapy and speech therapy with a recovery plan at home.',
    includes: ['Nursing & physiotherapy', 'Speech & mobility therapy', 'Recovery plan at home', 'Family training'],
    duration: 'Usually weeks to months, reviewed every 2 weeks',
  },
  {
    id: 'cancer', name: 'Cancer care', icon: 'ribbon', edge: 'var(--mustard)', specialised: true,
    short: 'Oncology nursing, line and wound care, and pain and palliative support.',
    includes: ['Oncology nursing', 'Line & wound care', 'Pain & palliative support', 'Support for the family'],
    duration: 'Planned with the treating oncologist',
  },
];

export const getService = (id) => services.find((s) => s.id === id);
