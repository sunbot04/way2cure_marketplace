# Way2Cure Marketplace: build review

Branch `rebuild-ts-tailwind`. React 18 + Vite + TypeScript (strict) + Tailwind, lucide icons, typed JSON data.
Every page is built from the components shown on `/styleguide`, which is internal and not indexed.

## How it was checked

- `npm run typecheck` reports no errors, and `npm run build` passes. The main bundle is about 96 KB gzipped, and each page loads its own code separately.
- An automated pass in headless Edge covered all 23 routes at 360, 768 and 1280 px, plus Hindi and Marathi spot checks:
  - no sideways scrolling on any route;
  - exactly one H1 on each page;
  - no images without alt text;
  - no script errors;
  - noindex on account, cart, checkout and 404 pages;
  - MedicalBusiness JSON-LD on Home and Contact.
- Tap targets are 48 px for buttons and fields, and 44 px for breadcrumb and top-bar links. Two exceptions remain:
  - product-card title links, which sit above a full-width 48 px "View details" button to the same page;
  - native radio and checkbox dots, which are inside 48 px clickable rows.
- Guideline final test, counted by clicks rather than timed with users:
  - **Medicine to cart:** Home → Shop → "Add to cart" on the card takes 2 clicks. Rx items go Home → Shop → product → "Add to cart".
  - **Nurse booked:** Home → Care → "Book now" leads to 4 short steps (who, when, where, confirm), with a callback from the care team.
  - Both are well inside 2 and 3 minutes. **Still to do:** a real test with 3–5 seniors or family caregivers.

## Needs content from the client

| What | Where |
|---|---|
| Real photography with consent. The site uses the existing way2cure.com photos, which look AI-generated. Shot list and brief: `public/IMAGE_LIST.md`. | `public/images/` |
| Partner pharmacy names and drug licence numbers (required in the footer, guidelines p.11) | `src/config/site.ts` → `pharmacyLicence` |
| App store links and the app deep link (prescription upload is app-only) | `src/config/site.ts` → `appUrl`, `appStores` |
| WhatsApp business number (currently the main line 7400400908) | `src/config/site.ts` |
| Final prices and delivery policy (free above ₹499, else ₹40 is a sample) | `src/data/products.json`, `site.ts` → `delivery` |
| Testimonials collected with written consent. The section shows a WhatsApp invite until then. | `src/data/testimonials.json` |
| A reversed (white) logo for the footer. The colour logo currently sits on a white panel. | `public/` |
| Legal review of Privacy and Terms, which are marked as drafts on the pages | `src/pages/copy/legal.ts` |
| Native review of Hindi and Marathi, including SEO titles and descriptions and the newer lines on Care, Booking, About, Contact, Privacy and Terms | every `hi` / `mr` block |

## Needs a backend (`// TODO: API` in code)

These features work in this browser only for now:
- orders, cart, family profiles, addresses and plans (saved in browser storage);
- OTP, payment, pincode serviceability, catalogue search;
- callback requests, care bookings and prescription reading.

Each place is marked `// TODO: API`.

## Where it could still look generic

- **Photos:** the current photos come from the existing site and look AI-generated, which is the biggest risk to trust. A real shoot is the most valuable next step. The ventilator card reuses the ICU photo.
- **Shop grid:** product imagery is icons on cream. Real pack shots would make it look much more like a pharmacy.
- **Help box:** the "Need help?" box closes many pages. It is useful, but repetitive on long journeys.
- **Trust strip:** it appears on Home, Care and About. Consider keeping it on Home and Care only.

## Deviations from the PDFs and brief

- **Hindi and Marathi:** the deck says "English only for now". Translations were kept at the client's request and are flagged for native review.
- **Evening dose colour:** this uses Terracotta Deep (#B8472A) rather than Terracotta, so white text on it passes contrast. The guidelines (p.13) allow it.
- **Hover colour for urgent buttons:** I added a darker terracotta token (`terracotta-darker`, #9C3A21). The palette gives no hover shade.
- **Old /legal URL:** it redirects to `/terms`. Privacy and Terms are now separate pages, as in the sitemap.
- **Calmer header and homepage** (the client asked for a less cluttered, more professional top of page):
  - **Header:** a slim utility bar (helpline, WhatsApp, home care site, language), then logo, search, login and cart.
  - **Nav row:** "Upload Prescription" is an outlined button at the right end, where the brief has a bright filled button.
  - **Removed from the header:** the second phone box and the "Marketplace" label beside the logo.
  - **Hero:** on cream rather than green, with two actions and three proof lines. The decorative mustard circle is gone.
  - **Quick paths:** the six shop categories as even cards with one accent colour, not a different coloured edge each. "Book a nurse" moved to the hero.
  - **Home step numbers and care cards:** one colour, not four, with outline "Book now" buttons.
  - **Full-width layout and photo-led pages** (client request, matching way2cure.com): the page runs to 1920 px with 64 px side margins on large screens. The homepage hero and the Care and About headers are a split with the photo running to the screen edge. Home has care services as photo cards and an About block with a photo collage and the confirmed 15K+ badge. The hero photo sits beside a solid deep green panel, with no gradient.
  - **Blended photos and sections** (client request: "make it smooth"):
    - **Photo edges:** photos fade softly into their background through CSS masks (`fade-l`, `fade-b`, `fade-card`, `fade-all` in `src/styles/index.css`). The hero and page-header photos fade into the panel, care-card photos fade into the white card, and the About photo fades out on all sides.
    - **Section backgrounds:** homepage sections share one cream background, and the mint subscriptions area fades in and out. These soft fades depart from the brief's "no gradients" rule. They are used only to blend edges, never as decoration.
    - **Trust strip:** a soft row between hairlines instead of a solid band.
  - **Phones:** "Call us" is the last tab of the bottom bar, not a floating button over the content. Account is in the header.
- **Mission and vision on About:** these are now headings with no label above, per the anti-template rule. The words "Our mission" and "Our vision" open the paragraph text instead.
