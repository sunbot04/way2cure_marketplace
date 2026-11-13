import type { Config } from 'tailwindcss';

// Way2Cure design tokens (Brand & Website Guidelines v1.0, pp. 5-7; colours: the client's
// "Charcoal & Crimson" palette). Colours come from CSS variables in src/styles/index.css so the whole
// site can be recoloured in one place (guidelines p.14, phase 4). Colour names are roles kept from the
// first palette: green = main colour (charcoal), terracotta-deep = secondary (crimson), and so on.
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  corePlugins: { container: false }, // .container is defined in index.css
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: v('white'),
      green: { DEFAULT: v('green'), dark: v('green-dark') }, // main colour, charcoal: headings, header, footer, primary buttons
      terracotta: { DEFAULT: v('terracotta'), deep: v('terracotta-deep'), darker: v('terracotta-darker') }, // secondary, crimson: decoration / links, Rx, urgent
      mustard: v('mustard'), // highlight, yellow: badges, offers, ratings (dark text on it)
      sage: { DEFAULT: v('sage'), tint: v('sage-tint'), deep: v('sage-deep') }, // soft colour, sky blue: icons, success (dark text on it)
      mint: v('mint'), // soft panels, borders, light text on charcoal
      cream: v('cream'), // page background (white)
      mist: v('mist'), // #F1F5F9 light grey-blue section background
      ink: v('ink'), // body text
      grey: v('grey'), // secondary text
      line: v('line'), // hairline borders on white
      whatsapp: { DEFAULT: v('whatsapp'), dark: v('whatsapp-dark') }, // WhatsApp buttons only (white logo on it)
      // Time-of-day dose colours (guidelines p.13). Always paired with a word label.
      dose: { morning: v('mustard'), afternoon: v('sage'), evening: v('terracotta-deep'), night: v('green') },
    },
    fontFamily: {
      head: ['Lora', '"Noto Sans Devanagari"', 'Georgia', 'serif'],
      body: ['"Nunito Sans"', '"Noto Sans Devanagari"', 'Arial', 'sans-serif'],
    },
    fontSize: {
      // Seniors first, so bigger than usual on phones (p.6). In rem: desktop scales them down a little
      // through the root font size in index.css.
      small: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.6' }],
      body: ['1.125rem', { lineHeight: '1.6' }],
      lead: ['1.25rem', { lineHeight: '1.6' }],
      h3m: ['1.25rem', { lineHeight: '1.3' }],
      h3: ['1.375rem', { lineHeight: '1.3' }],
      h2m: ['1.5rem', { lineHeight: '1.25' }],
      h2: ['1.875rem', { lineHeight: '1.2' }],
      h1m: ['2rem', { lineHeight: '1.2' }],
      h1: ['2.5rem', { lineHeight: '1.15' }],
      // Display sizes for the landing page only (hero 56–64px desktop / 36–40px mobile,
      // section headings ~44px). Inner pages keep the guideline scale above.
      display: ['clamp(2.25rem, 1.35rem + 3.6vw, 4rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
      section: ['clamp(1.75rem, 1.25rem + 1.9vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
    },
    extend: {
      borderRadius: { btn: '8px', card: '12px', tile: '16px', panel: '20px' },
      boxShadow: {
        // Soft shadows tinted with the charcoal main colour (--c-green)
        card: '0 1px 2px rgb(38 52 69 / 0.06), 0 4px 16px rgb(38 52 69 / 0.06)',
        raised: '0 12px 32px rgb(38 52 69 / 0.14)',
        float: '0 18px 48px -12px rgb(38 52 69 / 0.28), 0 2px 6px rgb(38 52 69 / 0.06)',
        header: '0 8px 30px -10px rgb(38 52 69 / 0.22)',
      },
      maxWidth: { prose: '70ch', page: '84rem' }, // 1344px box = 1280px of content inside the 32px gutters
      transitionDuration: { DEFAULT: '180ms', micro: '180ms', slow: '300ms' }, // = DURATION.micro in src/lib/motion.ts
      transitionTimingFunction: { soft: 'cubic-bezier(0.22, 1, 0.36, 1)' }, // = EASE in src/lib/motion.ts
      minHeight: { tap: '3rem' },
      borderWidth: { edge: '5px' },
    },
  },
  plugins: [],
} satisfies Config;
