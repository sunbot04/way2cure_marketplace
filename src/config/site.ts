// Site-wide settings. Every brand value lives here (colours live in styles/index.css), so a
// white-label partner can swap them in one place later (guidelines p.14, phase 4).
export const SITE = {
  brand: 'Way2Cure',
  label: 'Marketplace',
  url: 'https://way2cure.com',
  tagline: 'Care at home, now with everything seniors need.',
  promise: 'Your Health, Our Mission. Your Comfort, Our Vision.',
  phone: '7400400908',
  phoneDisplay: '+91 74004 00908',
  phoneHref: 'tel:+917400400908',
  // TODO: client: confirm the WhatsApp business number. The current site lists none, so we use the main line.
  whatsappHref: 'https://wa.me/917400400908',
  email: 'support@way2cure.com',
  // The existing Way2Cure home care website, linked from the header and footer so it stays one brand.
  homeCareUrl: 'https://way2cure.com/',
  homeCareLocations: [
    { name: 'Vashi', href: 'https://way2cure.com/home-care-services-in-vashi/' },
    { name: 'Thane', href: 'https://way2cure.com/home-care-services-in-thane/' },
    { name: 'Airoli', href: 'https://way2cure.com/home-care-services-in-airoli/' },
  ],
  cities: 'Mumbai, Navi Mumbai & Thane',
  // TODO: client: real app links once the Way2Cure app is live (prescription upload is app-only).
  appUrl: 'https://way2cure.com/app',
  appStores: {
    android: 'https://play.google.com/store', // TODO: client: Play Store listing URL
    ios: 'https://apps.apple.com', // TODO: client: App Store listing URL
  },
  // TODO: client: partner pharmacy names and drug licence numbers (shown in the footer, guidelines p.11).
  pharmacyLicence: 'Partner pharmacy licence numbers will be listed here before launch.',
  address: {
    street: 'Plot No. 88, 8th Floor, Proxima, Arunachal Bhavan, Sector 30A',
    locality: 'Vashi',
    city: 'Navi Mumbai',
    region: 'Maharashtra',
    postalCode: '400703',
    country: 'IN',
  },
  offices: [
    {
      name: 'Head office (Vashi)',
      address: 'Plot No. 88, 8th Floor, Proxima, Arunachal Bhavan, Sector 30A, Vashi, Navi Mumbai 400703',
    },
    {
      name: 'Mumbai branch (Malad East)',
      address:
        'Ground Floor, Carefull Hospital, Triveni Nagar Rd, behind Jyoti Hotel, Vaishet Pada, Kokanipada, Malad East, Mumbai 400097',
    },
  ],
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61585961143755',
    instagram: 'https://www.instagram.com/way2cure_official/',
    youtube: 'https://www.youtube.com/channel/UClLKa2xG55Y9ZWVSRK2ZKtA',
    linkedin: 'https://www.linkedin.com/company/way2cure-com/',
  },
  // Confirmed figure (brief). Other numbers on the old site (10K, 50K+) are not used.
  happyPatients: '15K+',
  // Sample delivery policy. TODO: client: confirm. Always shown as its own line before payment.
  delivery: { freeAbove: 499, fee: 40 },
} as const;

export const formatPrice = (n: number) => `Rs. ${Number(n).toLocaleString('en-IN')}`;

// Mumbai, Navi Mumbai and Thane pincodes start with these prefixes.
export const isServiceablePincode = (pin: string) => /^(400|401|410|421)\d{3}$/.test(pin.trim());
