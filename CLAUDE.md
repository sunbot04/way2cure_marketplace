# Way2Cure website (marketplace)

See `../CLAUDE.md` for how this fits with the customer and provider apps.

## Stack and commands

- Vite + React 18 + TypeScript + Tailwind. Motion via `motion/react` (`m` components, `LazyMotion`, `MotionConfig reducedMotion="user"`).
- `npm run dev` (localhost:5173), `npm run typecheck`, `npm run build`. Run typecheck and build before calling a change done.
- Colours are CSS variables in `src/styles/index.css` (green = forest #1E5B47, terracotta-deep = crimson). Brand values live in `src/config/site.ts`.

## Conventions

- Copy is per-component dictionaries: `useT(Dict)` with `en`, `hi`, `mr`. Data items carry `hi`/`mr` overrides, applied with `useLoc`/`localize`.
- Dropdowns are the custom `Select` (button `role=combobox` + listbox), not native `<select>`.
- Shop: prescription-only medicines are never listed (they come through `/prescription`). Ayurvedic items have `ayurvedic: true`. The Buy/Rent filter and the Rent button on cards appear only on `/shop/rent`.
- Website login OTP is 6 digits, `123456` (the app's is different).

## Shared with the customer app

`src/data/catalog.ts`, `checkout.ts`, `demoSeed.ts`, `types.ts`, the `src/data/*.json` files, `src/config/site.ts` and `public/images` are copied into `../customer-app/shared/`. Keep them free of React and browser code. After changing them, run `npm run sync-shared` in `../customer-app`.

## Git

Work on `rebuild-ts-tailwind`; when asked to push, push to both `main` and `dev` (`git push origin HEAD:main HEAD:dev`).

## Open items

- Homepage redesign: hero done (banner carousel, `src/components/home/Hero.tsx`). Remaining ideas, in order: trim "Shop by need" on phones, real photos instead of cartoon characters, calmer backgrounds, warmer photos, testimonials and partner logos, a compact "How it works", one floating help pill, consistent card styling.
- "AI assists, pharmacist decides" (`RxStory.tsx`): the user found the pinned 220vh version too large but said to leave it for now.
- Contact page grievance section: needs the Grievance Officer's name and email (`SITE.grievance`).
- Site-wide rename Way2Cure → Way2Senior (only the logo is done).
