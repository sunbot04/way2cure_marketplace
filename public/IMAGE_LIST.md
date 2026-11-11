# Photos for the Way2Cure marketplace

The site currently uses the photos from the existing way2cure.com site (WebP files in
`public/images/`). They look professional but appear to be AI-generated. The healthcare
guidelines (p.11 and p.13) ask for real photography, with written consent from everyone
shown. Plan to replace them with a real shoot using the brief below. Keep the file names
and proportions, or update the paths in `src/data/services.json`, `src/pages/Home.tsx`,
`src/pages/Care.tsx` and `src/pages/About.tsx`.

Current files: `hero-care.webp` (home hero) · `nurse-portrait.webp`, `care-doctor.webp`,
`care-elder.webp` (home "About" collage) · `team-group.webp` (About header) ·
`care-nurse.webp` (Care header and nurse card) · one `care-*.webp` per care service.
The ventilator service has no photo of its own yet and reuses `care-icu.webp`.

## Brief for the photographer (Brand guidelines p.9 and p.13)
- Real seniors, caregivers and families in Indian homes in Mumbai, Navi Mumbai and Thane.
- Warm daylight, natural smiles. Show dignity and independence, not illness.
- No hospital stock photos, no illustrations of people, no AI-generated images.
- Nurses and caretakers in the Way2Cure uniform.
- **Written consent from every person photographed** (and from a parent/guardian for children).
- Export as WebP or JPG, longest side 1600 px (hero: 2000 px), about 150 KB or less, so the home page stays under 3 seconds on 4G.

## Shot list
| File | Size | Used on | Shot |
|---|---|---|---|
| `hero-caregiver-with-senior.jpg` | 1600×1200 | Home page hero | A Way2Cure nurse in uniform with a senior (70s) at home in Mumbai, both relaxed and smiling, natural window light, living room or bedroom. Landscape 4:3. Leave space on one side. |
| `trust-family-with-parent.jpg` | 1600×1200 | Home page trust section, About page | An adult son or daughter sitting with an elderly parent at home, reviewing a medicine box or phone together. Warm daylight. Shows dignity and independence, not illness. |
| `care-nurse-at-home.jpg` | 1200×800 | Nurse at home card and page | Nurse checking blood pressure of a senior seated in their own chair at home. |
| `care-doctor-home-visit.jpg` | 1200×800 | Doctor at home card and page | Doctor with a stethoscope talking to an elderly couple at their dining table. |
| `care-icu-at-home.jpg` | 1200×800 | ICU at home card and page | Critical-care nurse beside a home hospital bed with a monitor, family member nearby. Calm, not alarming. |
| `care-ventilator-care.jpg` | 1200×800 | Ventilator care page | Respiratory nurse adjusting a BiPAP mask for a patient resting at home. Calm, well-lit room. |
| `care-stroke-recovery.jpg` | 1200×800 | Stroke care card and page | Physiotherapist helping a senior walk with a walker in their home corridor. |
| `care-cancer-care.jpg` | 1200×800 | Cancer care page | Nurse sitting and talking with a patient wrapped in a shawl, holding hands. Gentle, supportive. |
| `care-elder-care.jpg` | 1200×800 | Elder care page | Caretaker serving breakfast to an elderly woman at home, both smiling. |
| `care-baby-care.jpg` | 1200×800 | Baby care page | Caregiver bathing or feeding a newborn with the mother watching. |
| `care-bedridden-care.jpg` | 1200×800 | Bedridden patient care page | Caregiver helping a bedridden senior change position, clean bright room. |
| `care-post-operative.jpg` | 1200×800 | Post-operative care page | Nurse changing a wound dressing on a patient seated at home after surgery. |

## Product photos
Product cards and product pages show a neutral placeholder tile until real pack shots arrive.
Needed: one photo per product on a plain white background, square, 1200×1200 px, named
`products/<product-id>.jpg` (ids are in `src/data/products.json`).

## Already real
- `team/*.webp`: headshots of Dr. Ramesh R. Khandare, Dr. Samidha Patil, Dr. Pratik Biswas and
  Dr. Nishikant Rokade, taken from way2cure.com. Confirm the team is happy for them to be used.
- `/logo.png`: the official Way2Cure logo from way2cure.com.
