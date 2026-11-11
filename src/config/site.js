// Site-wide settings. Keep every brand value here (and colours in styles/tokens.css)
// so a white-label partner can swap them in one place later.
export const SITE = {
  brand: 'Way2Cure',
  label: 'Marketplace',
  tagline: 'Care at home, now with everything seniors need.',
  promise: 'Your Health, Our Mission. Your Comfort, Our Vision.',
  phone: '7400400908',
  phoneDisplay: '+91 74004 00908',
  phoneHref: 'tel:+917400400908',
  // TODO: confirm the WhatsApp business number. The current site lists none, so we use the main line.
  whatsappHref: 'https://wa.me/917400400908',
  email: 'support@way2cure.com',
  // The existing Way2Cure home care website. Linked from the marketplace header and footer.
  homeCareUrl: 'https://way2cure.com/',
  cities: 'Mumbai, Navi Mumbai & Thane',
  // TODO: replace with the real app store / deep link once the app is live.
  appUrl: 'https://way2cure.com/app',
  // TODO: add partner pharmacy licence numbers before launch (shown in the footer).
  pharmacyLicence: 'Partner pharmacy licence numbers will be listed here before launch.',
  offices: [
    {
      name: 'Head office (Vashi)',
      address:
        '(WeGrow) Plot No. 88, 8th Floor, Proxima, Arunachal Bhavan, 19, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400703',
    },
    {
      name: 'Mumbai branch (Malad East)',
      address:
        'Ground Floor, Carefull Hospital, Triveni Nagar Rd, behind Jyoti Hotel, Vaishet Pada, Kokanipada, Malad East, Mumbai, Maharashtra 400097',
    },
  ],
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61585961143755',
    instagram: 'https://www.instagram.com/way2cure_official/',
    youtube: 'https://www.youtube.com/channel/UClLKa2xG55Y9ZWVSRK2ZKtA',
    linkedin: 'https://www.linkedin.com/company/way2cure-com/',
  },
  // TODO: confirm the real figure. The current site shows 15K+, 10K and 50K+ in different places.
  happyPatients: '15K+',
  // Sample delivery policy. Always shown as its own line before payment (no hidden fees).
  delivery: { freeAbove: 499, fee: 40 },
};

export const formatPrice = (n) => `Rs. ${Number(n).toLocaleString('en-IN')}`;

// Mumbai, Navi Mumbai and Thane pincodes start with these prefixes.
export const isServiceablePincode = (pin) => /^(400|401|410|421)\d{3}$/.test(pin.trim());
