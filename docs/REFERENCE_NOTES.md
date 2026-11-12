# Reference notes, audit and plan

This document covers three things for the Way2Cure upgrade:

1. what each reference site does and how Way2Cure will adapt it;
2. what makes the current site look basic;
3. the build plan.

The references are DawaTime, ProCare and REO360, in `docs/References/` (7 screenshots). We borrow their techniques only, not their colours, copy or exact layouts.

Brand tokens and the healthcare and legal rules stay exactly as in `Way2Cure_Marketplace_Brand_Guidelines.pdf`:

- **Colours:** deep green #114D4A, terracotta #E07B5F, terracotta deep #B8472A, mustard #EAB34B, sage #70A9A1, mint #C8D8D5, cream #F6F1E9.
- **Type:** Lora and Nunito Sans.
- **Layout and controls:** 8px grid, 48px buttons, AA contrast.
- **Healthcare rules:** the Rx rules, "AI assists, pharmacist decides", and real numbers only.

---

## 1. Techniques seen, and how Way2Cure adapts them

### DawaTime: hero (`141235`)
| Technique | Way2Cure adaptation |
|---|---|
| **Floating header:** rounded and translucent, inset about 12px from the screen edges, so it reads as an object rather than a bar. | A 16px-radius header inset 12px. It is transparent over the cream hero and turns solid white with a soft shadow once you scroll. The phone number and the "Upload prescription" button stay visible. |
| **Two-weight heading:** a regular-weight lead-in line ("We turn prescriptions into"), then a huge bold payoff ("Peace Of Mind."). | Lora throughout. The one phrase that matters gets the accent instead of a weight change: "Care at home, now with *everything seniors need.*", where the italic phrase is Lora Italic in deep green. |
| **Product render as the hero:** a photoreal dose sachet with a paper texture, zig-zag heat-sealed edges and a typographic label (time, date, patient, medicine list with batch and expiry, QR code, a vertical side label and the wordmark). | Our own sachet, built in HTML/SVG rather than as an image, so it stays crisp, translates and loads instantly. It has a cream pouch, zig-zag seals, a CSS paper grain and inner shadow, and a **time-of-day colour stripe** (morning mustard, afternoon sage, evening terracotta deep, night green, always with the word). The label shows "Morning · 8:00 am", a patient first name, 4–5 illustrative medicine lines with doses, a small QR block and the Way2Cure wordmark. |
| **Pill CTA with a circular arrow chip** | We keep the brand's 8px-radius buttons (guideline p.7). We borrow only the **arrow that nudges 3px right on hover**. |
| **Multi-colour gradient background** | **Not adopted.** We use cream plus one very soft, large mint radial shape behind the composition. |

### DawaTime: "problem" cards (`141302`)
| Technique | Way2Cure adaptation |
|---|---|
| **Centred display heading with an italic serif phrase** ("feel like *a daily test.*") | "Sound familiar?" is a section heading with one Lora Italic phrase. It stays left-aligned, as guideline p.6 asks. |
| **Three tall photo cards:** about 32px radius, a dark-to-transparent overlay at the bottom, a two-line bold statement and a one-line sub | 3 cards at 4:5 ratio and 20px radius, with a green-black bottom overlay and white text: "Ten strips. Three doctors. *One confused morning.*" / "Did Papa take his evening dose?" / "Pharmacy runs every other day." Each card is followed by how Way2Cure solves it. |
| **Problems in the family's own words** | This copy follows the brand voice (p.3): plain, kind, no fear tactics. |

### DawaTime: product detail (`141322`)
| Technique | Way2Cure adaptation |
|---|---|
| **Huge three-line heading with an italic contrast line** ("Cut from the strip. *Never opened.*") | This is the pattern for the dose-sachet explorer heading. |
| **Exploded product view:** a tilted sachet with the blister-cut pills laid out under it | The sachet explorer: Morning, Afternoon, Evening and Night tabs crossfade the sachet's content and colour stripe. |
| **An action phrase in the accent colour** ("Tear, pop & take.") | "*Tear one, take the dose.*" (this wording is from the guideline's own voice examples) in terracotta deep. |
| **App store badges as outline pills** | Real Play Store and App Store badges sit in the footer and on the prescription panels, because prescription upload is app-only (p.8). |

### ProCare: hero (`141343`)
| Technique | Way2Cure adaptation |
|---|---|
| **Trust eyebrow above the H1** ("India's Trusted Home Healthcare Provider") | "— Trusted home care across Mumbai, Navi Mumbai & Thane": a short line plus text in terracotta deep, 14px semibold. It is a line, not a pill and not an emoji. |
| **Huge bold heading with the last words in accent colour** | The italic accent phrase covers this, once per section at most. |
| **Floating stat card overlapping the photo corner** (an avatar stack plus "24k+ Families Served") | A white card with an avatar stack and "**15,000+** patients cared for". The number counts up once. It says *patients*, because the guideline only confirms "15K+ happy patients", so we don't turn it into "families". |
| **Floating Call and WhatsApp circles** | Desktop: stacked 56px buttons at the bottom right, with labels on hover, kept clear of content. Mobile: the existing sticky bottom bar, which respects safe-area insets. |

### ProCare: service grid (`141408`)
| Technique | Way2Cure adaptation |
|---|---|
| **4-column care cards:** a faint background, about 16px radius, a hairline border, the icon in a tinted square, title, two lines, and a "View Care Plan →" link | Care and service cards only: white, 16px radius, 1px mint border, the icon in a 48px mint square (deep-green 2px-stroke icon), a title, two lines and "View care plan →" in terracotta deep. We do **not** reuse this card for every section, which is part of what makes the current site look like a template. |
| **Centred section intro with a one-line lead** | Our section intros stay left-aligned (guideline p.6) but use the same short-lead discipline. |

### REO360: hero (`141431`)
| Technique | Way2Cure adaptation |
|---|---|
| **Tight display type** with negative letter-spacing | Hero H1 at 56–64px desktop and 36–40px mobile, letter-spacing -0.02em, line-height 1.05–1.1. Other pages keep the guideline scale. |
| **A hand-drawn underline swoosh** under the key phrase | An SVG brush underline in terracotta that **draws on** with pathLength. We use it in place of the italic accent in some sections, never both in the same section. |
| **Layered device mockups:** a browser window and a phone overlapping, with real-looking UI content (Indian names, ₹ amounts) | A phone mockup behind the sachet showing a simple Way2Cure app screen: "Today's doses" with four time-of-day rows, and an order status "Pharmacist verified ✓". It uses sample Indian names and ₹ prices. |
| **Floating info card** overlapping the composition | A second small card: "Pharmacist verified ✓" in sage. |
| **Check-mark trust list under the CTAs** | Pharmacist verified · Verified nurses · 24/7 support 7400400908. |
| **Primary CTA with an arrow plus a secondary outline CTA** | "Order medicines" (green) and "Book a nurse" (outline), both 48px tall with 8px radius. |

### REO360: module grid (`141500`)
| Technique | Way2Cure adaptation |
|---|---|
| **Short two-beat headings** ("Twelve modules. One school.") | Used in section headings and copy, e.g. "One order. Every medicine, sorted by time." |
| **Tinted section background** | Subtle rhythm: cream, then white, then mint-tint (#EEF4F2), then cream, so sections read as distinct without borders. |
| **Generous card padding, 24px radius** | Cards use 16–20px radius and 24–32px padding on the 8px grid. |

---

## 2. Why the current site looks basic

1. **The hero says nothing specific.** It is a stock-style photo beside a green panel. The one thing only Way2Cure has, the time-sorted dose sachet and the pharmacist-checked prescription, is invisible above the fold.
2. **The type is timid and monotonous.** Every H2 has the same size and weight, there is no accent phrase and no eyebrow structure, and leads are grey. Nothing gives the page a voice.
3. **Everything sits on one flat plane.** It is white cards on cream throughout, with no layering, overlap, device or product render, or depth.
4. **There is no motion or feedback.** The page is static. Add to cart only changes text, the FAQ snaps open, there are no page transitions and no hover states beyond colour.
5. **The same pattern repeats.** White card plus tinted icon square appears in quick paths, trust, plans and more. Orange "Book now" buttons stack up in every grid, and the "Need help?" box closes every page.
6. **Section rhythm is weak.** Padding varies from 56 to 96px. After the "blend" pass the whole homepage is one cream tone, so nothing marks where a section starts.
7. **The imagery feels generic.** The photos look AI-generated, and the hero photo is reused for dementia care. The product grid is icon-on-cream squares, which reads as a demo.
8. **The header is heavy.** Three stacked bars (utility, main and nav) take about 175px before any content.
9. **Trust is buried.** "15K+" is a line of small text. There is no stat card and nothing visual says "a pharmacist checked this".
10. **Key features are told, not shown.** The prescription flow is four generic numbered circles, and dose sachets appear only as four colour chips.
11. **The footer is unfinished.** Socials are text links, there are no app badges, and the logo sits on a white chip.
12. **States are missing.** There are no loading skeletons, the toast is plain, and empty and error states are only partly written in the brand voice.

---

## 3. Plan

**Step 0: approval.** This document, plus the decisions listed in the chat message.

**Step 1: motion foundation and components, shown on `/styleguide` with a reduced-motion toggle.**

- **Dependency:** add `motion` (Framer Motion for React).
- **`src/lib/motion.ts`:** timing tokens.

  | Token | Value |
  |---|---|
  | `micro` | 180ms, ease-out |
  | `reveal` | 500ms, `[0.22, 1, 0.36, 1]` |
  | `stagger` | 70ms |
  | rise distance | 20px |

  It also defines shared variants: `fadeRise`, `stagger`, `lineMask`, `floatIdle`, `crossfade`, `toast` and `pageFade`. No component uses one-off animation values.
- **`<MotionConfig reducedMotion="user">`** at the root. With reduced motion on, content appears instantly with opacity only.
- **Components:** `Reveal`, `Stagger`, `CountUp`, `FloatingCard`, `Sachet` (all four times of day), `PhoneMockup`, `Eyebrow`, `AccentText` (italic or drawn underline), `HandUnderline`, `SachetExplorer` (keyboard tabs), `ScrollSteps`, `Toast` and `Skeleton`.
- **Tokens:** section padding 120px desktop / 72px mobile, the 12-column content grid, 16–20px card radii, mint-tint #EEF4F2, and the H1 display scale.
- **Header:** floating, transparent, then solid, shrinking slightly on scroll.
- **Floating Call and WhatsApp buttons** on desktop.

**Step 2: rebuild the homepage, then stop for your review at 1440px and 390px.**

The sections, in order:

1. Floating header.
2. Hero: copy on the left; on the right the sachet, the phone behind it and two floating cards.
3. Quick paths.
4. "Sound familiar?" cards.
5. "How prescriptions work" as a sticky scroll story with a progress line. It becomes a simple stepper on mobile.
6. Care at home, using the ProCare-style care cards.
7. Dose sachet explorer and subscriptions.
8. Trust, with the 15,000+ count-up.
9. FAQ with animated height.
10. Footer: 4 columns, licence placeholder, app badges, social icons and the language switch.

**Step 3: apply the same system to the other pages.**

The pages are Shop, Product, Care Services, Subscriptions, Upload Prescription, About and Contact. Each gets:

- page transitions;
- the add-to-cart toast and badge pulse;
- skeleton loading for product grids;
- hover, focus, active and disabled states on everything;
- empty and error states in the brand voice.

**Step 4: `REVIEW.md`.**

- Playwright screenshots of every page at desktop and mobile.
- Lighthouse scores, mobile, aiming for 90 or more on Performance and Accessibility.
- Anything that still looks generic, fixed.
- A table of every deliberate deviation from the PDF, with the reason.

### Motion rules we will hold to
- Animate only transform and opacity.
- Use reveals once, at 20% in view. Nothing bounces, spins, auto-plays, or uses parallax on text.
- No marquees, carousels, confetti, typing effects or glassmorphism.
- Content stays readable and clickable even if JavaScript animations fail. Nothing is left stuck at opacity 0, because there is a CSS and in-view fallback.
