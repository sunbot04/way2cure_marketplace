import type { Config } from 'tailwindcss';

// Way2Cure design tokens (Brand & Website Guidelines v1.0, pp. 5-7).
// Colours come from CSS variables in src/styles/index.css so a white-label partner
// can recolour the whole site in one place (guidelines p.14, phase 4).
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  corePlugins: { container: false }, // .container is defined in index.css
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: v('white'),
      green: { DEFAULT: v('green'), dark: v('green-dark') }, // headings, header, footer, primary buttons
      terracotta: { DEFAULT: v('terracotta'), deep: v('terracotta-deep'), darker: v('terracotta-darker') }, // accents only / links, Rx, urgent
      mustard: v('mustard'), // badges, offers, ratings: green text on it
      sage: { DEFAULT: v('sage'), tint: v('sage-tint') }, // illustrations, dividers, success
      mint: v('mint'), // info bands, soft panels, borders
      cream: v('cream'), // page background
      ink: v('ink'), // body text
      grey: v('grey'), // secondary text
      line: v('line'), // hairline borders on white
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
    },
    extend: {
      borderRadius: { btn: '8px', card: '12px' },
      boxShadow: {
        card: '0 1px 2px rgb(17 77 74 / 0.06), 0 4px 16px rgb(17 77 74 / 0.06)',
        raised: '0 12px 32px rgb(17 77 74 / 0.14)',
      },
      maxWidth: { prose: '70ch', page: '1920px' },
      transitionDuration: { DEFAULT: '200ms' },
      minHeight: { tap: '3rem' },
      borderWidth: { edge: '5px' },
    },
  },
  plugins: [],
} satisfies Config;
