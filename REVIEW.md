# Way2Cure Marketplace: build review

Branch `rebuild-ts-tailwind`. React 18, Vite, TypeScript (strict), Tailwind, lucide icons, `motion` (Framer Motion) and typed JSON data.

This version covers the brief "Upgrade the Way2Cure site to a polished, production-quality design with professional motion". It follows `docs/REFERENCE_NOTES.md`: references, audit and plan, approved by the client.

## Contents

1. Screenshots
2. Lighthouse
3. How it was checked
4. Motion system
5. What changed in this upgrade
6. Where it could still look generic
7. Deviations from the brand PDF
8. Needs content from the client
9. Needs a backend

## 1. Screenshots

The screenshots are taken with Playwright driving the installed Microsoft Edge (`npm run screenshots`, against `npx vite preview --port 4173`).

They are full-page captures, taken after scrolling once so every scroll reveal has played. They are saved in `docs/screenshots/`.

| Page | Desktop 1440 | Mobile 390 |
|---|---|---|
| Home (landing) | [home-desktop](docs/screenshots/home-desktop.webp) | [home-mobile](docs/screenshots/home-mobile.webp) |
| Shop | [shop-desktop](docs/screenshots/shop-desktop.webp) | [shop-mobile](docs/screenshots/shop-mobile.webp) |
| Product | [product-desktop](docs/screenshots/product-desktop.webp) | [product-mobile](docs/screenshots/product-mobile.webp) |
| Cart (empty state) | [cart-desktop](docs/screenshots/cart-desktop.webp) | [cart-mobile](docs/screenshots/cart-mobile.webp) |
| Care services | [care-desktop](docs/screenshots/care-desktop.webp) | [care-mobile](docs/screenshots/care-mobile.webp) |
| Care booking (dementia) | [care-booking-desktop](docs/screenshots/care-booking-desktop.webp) | [care-booking-mobile](docs/screenshots/care-booking-mobile.webp) |
| Subscriptions | [subscriptions-desktop](docs/screenshots/subscriptions-desktop.webp) | [subscriptions-mobile](docs/screenshots/subscriptions-mobile.webp) |
| Dose sachets | [dose-sachets-desktop](docs/screenshots/dose-sachets-desktop.webp) | [dose-sachets-mobile](docs/screenshots/dose-sachets-mobile.webp) |
| Upload prescription | [prescription-desktop](docs/screenshots/prescription-desktop.webp) | [prescription-mobile](docs/screenshots/prescription-mobile.webp) |
| About | [about-desktop](docs/screenshots/about-desktop.webp) | [about-mobile](docs/screenshots/about-mobile.webp) |
| Contact | [contact-desktop](docs/screenshots/contact-desktop.webp) | [contact-mobile](docs/screenshots/contact-mobile.webp) |
| Log in | [login-desktop](docs/screenshots/login-desktop.webp) | [login-mobile](docs/screenshots/login-mobile.webp) |
| Sign up | [signup-desktop](docs/screenshots/signup-desktop.webp) | [signup-mobile](docs/screenshots/signup-mobile.webp) |
| Notifications | [notifications-desktop](docs/screenshots/notifications-desktop.webp) | [notifications-mobile](docs/screenshots/notifications-mobile.webp) |

## 2. Lighthouse (mobile, simulated slow 4G and 4× CPU)

Run with `node scripts/lighthouse.mjs` against the production build. The JSON reports are in `docs/lighthouse/`.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Home | 83 | 100 | 100 | 100 | 3.8 s | 190 ms | 0 |
| Shop | 89 | 100 | 100 | 100 | 3.2 s | 120 ms | 0 |
| Product | 90 | 100 | 100 | 100 | 3.1 s | 30 ms | 0 |
| Cart | 91 | 100 | 100 | 66* | 3.0 s | 40 ms | 0 |
| Care services | 89 | 100 | 100 | 100 | 3.3 s | 60 ms | 0 |
| Care booking | 90 | 100 | 100 | 100 | 3.3 s | 30 ms | 0 |
| Subscriptions | 89 | 100 | 100 | 100 | 3.6 s | 70 ms | 0 |
| Upload prescription | 91 | 100 | 100 | 100 | 3.3 s | 90 ms | 0 |
| About | 89 | 100 | 100 | 100 | 3.6 s | 60 ms | 0 |
| Contact | 89 | 100 | 100 | 100 | 3.2 s | 110 ms | 0 |
| Log in | 92 | 100 | 100 | 66* | 3.1 s | 70 ms | 0 |

\* Cart and Log in are deliberately `noindex`, and Lighthouse's SEO score counts that against them.

Scores move about ±5 between runs on the same machine.

**Accessibility 90+:** met on every page (100).

**Performance 90+:** met on Product, Cart, Care booking, Upload prescription and Log in. The other pages score 83–89.

### What was fixed during the audit

These fixes were made during the audit. The starting point was Home 80 and inner pages 62–68, which had a 0.7 layout shift.

- **Layout shift:**
  - The loading placeholder for each page is now full height, so the footer no longer jumps.
  - The homepage hero no longer uses a negative margin.
- **Bundle size:** the homepage code is now its own chunk, so inner pages don't download it. The main bundle went from 143 KB to 119 KB gzipped.
- **Fonts:** self-hosted, with Latin, Latin Extended and Devanagari only, and the two main ones preloaded. There is no connection to Google Fonts any more.
- **Images:**
  - The hero photo is cropped to the arch and preloaded on `/` only.
  - Every homepage photo has a phone-sized variant (`srcSet`).
  - Below-the-fold photos load lazily.
- **Rendering work:** the browser skips style and layout for homepage sections far below the screen (`content-visibility`).
- **Page titles:** the H1 on inner pages now paints straight away, and the rest of the header fades in.
- **Accessibility:**
  - Contrast on two elements.
  - Hidden floating buttons are now `inert`.
  - The progress bar has a name.
  - A heading skipped a level.
- **SEO:** added `robots.txt` and `sitemap.xml`.

### What still holds Performance below 90

The site is drawn entirely in the browser. Nothing paints until about 119 KB of gzipped JavaScript has downloaded and run, which takes about 3 s on simulated slow 4G.

**Recommended next step:** pre-render each page to static HTML at build time and hydrate it. Options are a small Vite SSR prerender step, or moving the site to a framework that does this by default. That would put the first paint and LCP well under 2.5 s.

## 3. How it was checked

- `npm run typecheck` shows no errors, and `npm run build` passes.
- An automated pass in headless Edge covered 31 routes at 360, 768 and 1280 px, including Hindi and Marathi spot checks. It found:
  - no sideways scrolling;
  - exactly one H1 per page;
  - no images without alt text;
  - no script errors.
- `noindex` is set on account, cart, checkout, login, notifications and 404. MedicalBusiness JSON-LD is on Home and Contact.
- The dropdown menus were hover-tested at 1280, 1536 and 1880 px. All three open fully on screen, from the left edge of their menu item.
- **Tap targets:** buttons and fields are 48 px, and links are at least 44 px. Two exceptions remain:
  - product-card title links, which sit above a full-width 48 px button that goes to the same page;
  - native radio and checkbox dots, which are inside 48 px rows.
- Reduced motion is checked with the toggle on `/styleguide` and via the operating-system setting. With it on, only instant opacity changes happen.

## 4. Motion system

- **Where it lives:** all values are in `src/lib/motion.ts`, and the matching CSS timings are in `tailwind.config.ts` (`duration-micro` 180 ms, `duration-slow` 300 ms, `ease-soft`). No component uses one-off animation numbers.

  | Token | Value |
  |---|---|
  | `micro` | 180 ms |
  | `reveal` | 500 ms on `cubic-bezier(0.22, 1, 0.36, 1)` |
  | stagger | 70 ms |
  | rise | 20 px |
  | float | ±6 px over 6 s |
  | crossfade | 250 ms |
  | page fade | 200 ms |
  | count-up | 1.2 s |

- **Reduced motion:** `<LazyMotion features={domAnimation}>` and `<MotionConfig reducedMotion="user">` wrap the whole app.
- **What it does:**
  - **Homepage hero:** the H1 lines rising out of a clip, then the lead, buttons and proof points.
  - **Hero visual:** it arrives after the copy, with the floating cards last. The sachet then floats gently.
  - **Drawn underlines:** they draw on via `pathLength`.
  - **Scroll reveals:** play once, as soon as a block scrolls into view (its top 10% up from the bottom of the screen). This works for blocks of any height; the earlier "20% in view" rule left the 28-product shop grid invisible on phones and zoomed screens. Shop cards reveal one by one.
  - **Prescription steps:** a pinned scroll story on desktop, and a stepper on phones.
  - **Sachet tabs:** crossfade between Morning, Afternoon, Evening and Night.
  - **The 15,000+ figure:** counts up (real number only).
  - **Cards:** lift 4 px, the shadow deepens and the image zooms to 1.03. Arrows nudge 3 px.
  - **Buttons:** scale to 0.98 on press.
  - **Interface feedback:**
    - the FAQ opens with an animated height and a rotating chevron;
    - pages fade on route change;
    - a short "Added to cart · View cart" toast appears and the cart badge pulses;
    - skeleton grids show while the Shop "loads".
- **What it never does:** no bounce, spin, auto-play, marquee, carousel, parallax on text, cursor-follower, confetti, typing effect or glassmorphism. Only transform and opacity are animated. The FAQ panel height is the one exception, and only on the panel the user opens.
- **If JavaScript fails:** content is in the DOM from the start and only fades in. Inner-page H1s paint immediately.

## 5. What changed in this upgrade

- **Removed:**
  - the mobile bottom tab bar (client request);
  - the floating Call and WhatsApp buttons on the hero itself.
- **Added:**
  - floating Call and WhatsApp buttons on every page. On phones they appear after the first screen and respect safe-area insets.
- **Header:**
  - A floating rounded bar, inset from the edges. It is transparent at the top and turns white with a shadow on scroll, when it also gets slightly shorter.
  - The right side has only search, cart and account. Calling is the floating button, "Upload a prescription" is the first, highlighted option in the Shop menu, and notifications sit inside the signed-in account (`/notifications` asks you to log in first).
  - The dropdowns are compact and open from the left edge of their item.
- **Landing page** (REO360-style structure):
  - Hero: a real photo of a smiling Indian elderly couple in an arch, the code-built dose sachet, the app on a phone, a 15,000+ card and a "Pharmacist verified" card.
  - Then, in order:
    - quick paths;
    - "Sound familiar?" photo cards;
    - the pinned prescription story;
    - ProCare-style care cards;
    - the dose-sachet explorer and plans;
    - the trust section;
    - stories and FAQ;
    - a "Talk to a real person" card with a photo.
- **All other pages:** rebuilt with the same system: one accent per heading, section rhythm and alternating backgrounds, and empty, loading and error states in the brand voice.
- **New pages:** Login and Signup, using phone and OTP, no passwords, with `?next=` redirect (demo: any 6 digits). The Account page shows a signed-in or signed-out state.
- **Footer:** charcoal, with 4 columns, the logo in white, app-store badges, social icons, the licence line and a language switch.
- **Removed from layout:** the 90% desktop scale from the previous round. Body text is back to the 18 px minimum, as the client approved.

## 6. Where it could still look generic

- **Product images:** the shop grid shows a category icon on a tinted tile. Real 1:1 pack shots are the biggest remaining gap on Shop and Product.
- **Photos:** the homepage uses Pexels stock photos of Indian elders, credited in `public/images/people/CREDITS.md`. The care, team and dementia photos still come from the existing site and look AI-generated. A consented Way2Cure photo shoot is the most valuable next step (`public/IMAGE_LIST.md`).
- **Testimonials:** the section shows an honest "we will share real stories with permission" card until real, consented stories exist.
- **Repeated step strips:** Care, Subscriptions and Dose sachets each have their own copy of the same step strip. It could become one shared component.

## 7. Deviations from the brand PDF (and why)

| Deviation | Reason |
|---|---|
| Hero H1 56–64 px desktop, section headings about 44 px, inner-page H1 48 px | The brief treats the PDF's 40 px H1 as a minimum, for a landing page with a voice. |
| Lora Italic accent phrase (one per section), and a hand-drawn light-crimson underline | From the brief (DawaTime and REO360 references). Devanagari has no italic, so in Hindi and Marathi the accent is colour only. |
| Colour palette "Charcoal & Crimson" instead of the PDF's deep green, terracotta and cream (p.5): charcoal `#263445` main colour, crimson `#C8102E` secondary, yellow `#FFC83D` highlight, sky blue `#3A8FD6` soft colour, white pages with `#F1F5F9` sections | Client request: the green and beige looked dull. Chosen from screenshots of the real site in eleven palettes. Every text pairing passes WCAG AA; Lighthouse accessibility is 100 with the colour-contrast audit passing on all 13 pages checked. Built from the logo's own grey and red. The colour tokens keep their role names (`green` = main colour, `terracotta-deep` = secondary), see `src/styles/index.css`. |
| Accent phrases turn yellow on charcoal bands | Crimson on charcoal is 2.2:1 and fails AA. Yellow on charcoal is 9.6:1. |
| No eyebrows (the short line plus a small label) above page titles or section headings | The brief asked for them; removed at the client's request. The headings already say what each page and section is about, and the site reads cleaner and less template-like without them. |
| Soft single-colour radial shape behind the hero; dark-to-transparent overlay on photo cards; masked photo edges on page headers | Used only for depth and blending, never as multi-colour decoration. |
| 16–20 px radii on cards and panels (PDF: 12 px) | The brief's polish spec: soft 16–20 px radii. Buttons keep 8 px. |
| Floating Call and WhatsApp buttons instead of a sticky bottom bar on mobile | Client request: no app-style bottom navigation on the website. |
| Mobile bottom tab bar (Home, Shop, Rx, Care, Account) removed | Same client request. These links are in the header menu. |
| "Upload a prescription" is the first, highlighted option in the Shop menu and a link in the hero, not a header button (PDF p.8: always-visible button) | Client request: fewer calls to action in the header, and a main bar of plain, consistent items. It sits with the medicines, is in the mobile menu, and Shop stays underlined on the prescription page. |
| No phone number in the header bar; no notification bell | Client request. Calling is the floating button on every page (and the helpline in the top strip); notifications belong to the signed-in account. |
| Stat wording "15,000+ patients cared for" (brief: "families") | The PDF only confirms "15K+ happy patients". There are no unconfirmed numbers. |
| Hindi and Marathi translations kept | Client request. They are flagged for native review. |
| Dose colours: morning yellow, afternoon sky blue, evening crimson, night charcoal | The PDF's four time-of-day colours (p.13) moved to the new palette. Always paired with the word; dark text on yellow and sky blue, white text on crimson and charcoal. |
| Stock photography (Pexels) on the landing page | Client request for photos of elders before the shoot. Credited, and to be replaced (see section 6). |

## 8. Needs content from the client

| What | Where |
|---|---|
| Consented photo shoot: elders, nurses, dementia care, team, plus product pack shots | `public/IMAGE_LIST.md`, `public/images/` |
| Partner pharmacy names and drug licence numbers (footer, p.11) | `src/config/site.ts` → `pharmacyLicence` |
| App store links and the app deep link (prescription upload is app-only) | `src/config/site.ts` → `appUrl`, `appStores` |
| WhatsApp business number | `src/config/site.ts` |
| Final prices, catalogue and delivery policy (the current data is sample) | `src/data/products.json`, `site.ts` → `delivery` |
| Testimonials with written consent | `src/data/testimonials.json` |
| Official reversed (white) logo file. The footer currently inverts the colour logo. | `public/` |
| Legal review of Privacy and Terms | `src/pages/copy/legal.ts` |
| Native review of all Hindi and Marathi text, including the new pages | every `hi` / `mr` block |

## 9. Needs a backend (`// TODO: API` in code)

These features work in this browser only for now:
- OTP sign-in, orders, cart, family profiles, addresses, plans and notifications (saved in browser storage);
- payment, pincode serviceability, catalogue search;
- callback requests, care bookings and prescription reading.

Refill reminders should also go out by SMS and WhatsApp from a server, so families are reminded even when the site is closed.

### Demo account (until the backend exists)

- **Log in:** mobile **98765 43210**, code **123456**, or the **Use demo account** button on `/login` and `/signup`.
- **Who it is:** Rohan Patil, who looks after his parents in Thane. The account comes with sample data:
  - 6 orders (one waiting for the pharmacist, one packed, four delivered);
  - a refill reminder that is already due (adult diapers and underpads);
  - a monthly plan;
  - 2 family members and 2 addresses.
- **How it behaves:**
  - Log in only works for the demo account and for numbers signed up in the same browser. The code is always 123456.
  - Each account keeps its own orders, family members, addresses and read reminders in that browser.
  - "Reset demo data" on the account page puts the sample data back.
- **Where it lives:** `src/data/demoAccount.ts`.
- **Before launch:** set `VITE_DEMO_ACCOUNT=off` to remove the account and the button, then replace the sign-in with the real OTP API.
