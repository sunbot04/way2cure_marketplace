// Flat product illustrations (from the client's designs shop-by-need-v4.html and products.html,
// recoloured to the site palette: charcoal, crimson, sky blue, white). Used by the "Shop by need"
// cards, the homepage care cards, product cards, the product page and the cart until real pack shots
// arrive. Decorative only.
// <ArtDefs /> is rendered once for the whole app (App.tsx): it holds the gradients the drawings use.

const G = 'url(#art-gG)'; // charcoal-slate
const D = 'url(#art-gD)'; // deep charcoal
const R = 'url(#art-gR)'; // crimson
const W = 'url(#art-gW)'; // white to pale blue-grey
const SKY = '#3A8FD6';
const SLATE = '#34475D';
const MAIN = '#263445';
const PALE = '#D3DFEC';
const TINT = '#E7F0FA';
const BLUSH = '#F8D3DA';
const LEAF = '#2E9E6E';
const font = "'Nunito Sans', system-ui, sans-serif";

type ArtProps = { className?: string };
const svgProps = { 'aria-hidden': true, focusable: 'false' } as const;

export function ArtDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} {...svgProps}>
      <defs>
        <linearGradient id="art-gG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3D5168" /><stop offset="1" stopColor="#1E2A38" /></linearGradient>
        <linearGradient id="art-gD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2E3E52" /><stop offset="1" stopColor="#121A24" /></linearGradient>
        <linearGradient id="art-gR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E0344C" /><stop offset="1" stopColor="#A00C24" /></linearGradient>
        <linearGradient id="art-gW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E8EEF5" /></linearGradient>
        <radialGradient id="art-glow"><stop offset="0" stopColor={SKY} stopOpacity=".55" /><stop offset="1" stopColor={SKY} stopOpacity="0" /></radialGradient>
      </defs>
    </svg>
  );
}

/** Medicines: blister pack, pill bottle and loose capsules. */
export function MedArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 380 340" {...svgProps}>
      <ellipse cx="200" cy="328" rx="170" ry="12" fill="#111821" opacity=".5" />
      <g transform="rotate(-14 110 250)">
        <rect x="20" y="190" width="170" height="110" rx="16" fill={TINT} />
        <rect x="20" y="190" width="170" height="110" rx="16" fill="none" stroke={PALE} strokeWidth="3" />
        <g fill="#fff" stroke={PALE} strokeWidth="2">
          <rect x="38" y="206" width="56" height="30" rx="15" /><rect x="116" y="206" width="56" height="30" rx="15" />
          <rect x="38" y="252" width="56" height="30" rx="15" /><rect x="116" y="252" width="56" height="30" rx="15" />
        </g>
        <g><rect x="46" y="212" width="40" height="18" rx="9" fill={R} /><rect x="66" y="212" width="20" height="18" fill={BLUSH} /><rect x="76" y="212" width="10" height="18" rx="5" fill={BLUSH} /></g>
        <g><rect x="124" y="212" width="40" height="18" rx="9" fill={R} /><rect x="144" y="212" width="20" height="18" fill={BLUSH} /></g>
        <g><rect x="46" y="258" width="40" height="18" rx="9" fill={R} /><rect x="66" y="258" width="20" height="18" fill={BLUSH} /></g>
        <rect x="116" y="252" width="56" height="30" rx="15" fill={TINT} stroke={PALE} strokeWidth="2" strokeDasharray="4 4" />
      </g>
      <g>
        <rect x="196" y="60" width="128" height="44" rx="10" fill={R} />
        <path d="M212 66v32M228 66v32M244 66v32M260 66v32M276 66v32M292 66v32M308 66v32" stroke="#8E0A20" strokeWidth="3" />
        <rect x="186" y="100" width="148" height="222" rx="26" fill={W} />
        <rect x="186" y="100" width="22" height="222" rx="11" fill="#000" opacity=".04" />
        <rect x="186" y="150" width="148" height="112" fill={TINT} />
        <circle cx="260" cy="190" r="24" fill={G} />
        <path d="M260 178v24M248 190h24" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <rect x="222" y="226" width="76" height="8" rx="4" fill={PALE} />
        <rect x="236" y="242" width="48" height="8" rx="4" fill={PALE} />
        <rect x="300" y="116" width="12" height="190" rx="6" fill="#fff" opacity=".7" />
      </g>
      <g transform="rotate(32 120 316)"><rect x="96" y="304" width="52" height="22" rx="11" fill={W} /><path d="M96 315a11 11 0 0 1 11-11h15v22h-15a11 11 0 0 1-11-11z" fill={R} /></g>
      <g transform="rotate(-20 350 310)"><rect x="326" y="300" width="46" height="20" rx="10" fill={W} /><path d="M326 310a10 10 0 0 1 10-10h13v20h-13a10 10 0 0 1-10-10z" fill={SKY} /></g>
      <circle cx="170" cy="318" r="9" fill={BLUSH} />
    </svg>
  );
}

/** Medical devices: BP monitor with cuff, and a finger oximeter. */
export function DevicesArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 260 200" {...svgProps}>
      <ellipse cx="130" cy="188" rx="110" ry="8" fill={D} opacity=".12" />
      <path d="M150 120 C 175 120, 170 60, 200 70" stroke={SLATE} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="186" y="56" width="62" height="128" rx="18" fill={G} />
      <rect x="186" y="96" width="62" height="34" fill={R} />
      <rect x="196" y="66" width="42" height="18" rx="6" fill={SKY} />
      <rect x="20" y="52" width="150" height="132" rx="24" fill={W} />
      <rect x="36" y="68" width="118" height="64" rx="12" fill={D} />
      <text x="95" y="104" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="26" fill={PALE}>120/80</text>
      <path d="M44 120h22l5-8 6 14 5-10 3 4h26l5-8 6 14 5-10 3 4h14" stroke="#FF5A6E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="95" cy="158" r="14" fill={R} />
      <circle cx="58" cy="158" r="7" fill={TINT} /><circle cx="132" cy="158" r="7" fill={TINT} />
      <g transform="translate(6 14) rotate(-10 40 30)">
        <rect x="10" y="10" width="64" height="40" rx="14" fill={R} />
        <rect x="20" y="18" width="34" height="18" rx="5" fill={D} />
        <text x="37" y="32" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="12" fill={BLUSH}>98%</text>
      </g>
    </svg>
  );
}

/** Daily care: a pack of adult diapers, a bandage roll and a plaster. */
export function DailyArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <rect x="40" y="20" width="96" height="132" rx="16" fill={G} />
      <path d="M40 36a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v6H40z" fill={D} />
      <rect x="54" y="60" width="68" height="56" rx="12" fill={W} />
      <path d="M88 101s-16-9-16-19a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 10-16 19-16 19z" fill={R} />
      <rect x="62" y="126" width="52" height="7" rx="3.5" fill={SKY} />
      <circle cx="160" cy="122" r="30" fill={W} />
      <circle cx="160" cy="122" r="30" fill="none" stroke={TINT} strokeWidth="3" />
      <circle cx="160" cy="122" r="18" fill="none" stroke={BLUSH} strokeWidth="2" />
      <circle cx="160" cy="122" r="9" fill={BLUSH} />
      <path d="M186 138 h20 v14 h-30" fill={W} />
      <g transform="rotate(-28 34 128)"><rect x="6" y="116" width="58" height="22" rx="11" fill={BLUSH} /><rect x="25" y="119" width="20" height="16" rx="3" fill={R} opacity=".55" /></g>
    </svg>
  );
}

/** Mobility & recovery: a wheelchair. */
export function MobilityArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 170" {...svgProps}>
      <ellipse cx="110" cy="162" rx="90" ry="7" fill={D} opacity=".12" />
      <path d="M62 20 v78 h86 l18 46" stroke={MAIN} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 20 h18" stroke={MAIN} strokeWidth="7" strokeLinecap="round" />
      <rect x="66" y="30" width="18" height="64" rx="6" fill={R} />
      <rect x="66" y="84" width="88" height="18" rx="8" fill={R} />
      <path d="M70 62 h60 v22" stroke={SLATE} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="96" cy="112" r="46" fill="none" stroke={SLATE} strokeWidth="9" />
      <circle cx="96" cy="112" r="35" fill="none" stroke={SKY} strokeWidth="2.5" />
      <path d="M96 77v70M61 112h70M71 87l50 50M121 87l-50 50" stroke={SKY} strokeWidth="2.5" />
      <circle cx="96" cy="112" r="8" fill={D} />
      <circle cx="168" cy="148" r="12" fill={D} /><circle cx="168" cy="148" r="4" fill={TINT} />
      <path d="M150 128 h26" stroke={MAIN} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/** Nutrition & wellness: a protein tin, a vitamin bottle and an apple. */
export function NutritionArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <rect x="54" y="34" width="92" height="118" rx="10" fill={G} />
      <ellipse cx="100" cy="34" rx="46" ry="12" fill={D} />
      <rect x="50" y="22" width="100" height="14" rx="6" fill={R} />
      <rect x="54" y="66" width="92" height="56" fill={W} />
      <path d="M100 78c10 0 16 8 14 20-12 0-18-8-14-20z" fill={LEAF} />
      <path d="M100 78c-8 4-10 14-6 20" stroke={SLATE} strokeWidth="2" fill="none" />
      <rect x="76" y="106" width="48" height="6" rx="3" fill={BLUSH} />
      <rect x="150" y="96" width="44" height="56" rx="10" fill={W} />
      <rect x="154" y="84" width="36" height="16" rx="5" fill={R} />
      <rect x="150" y="112" width="44" height="22" fill={BLUSH} />
      <circle cx="36" cy="132" r="20" fill={R} />
      <path d="M36 112c0-6 3-9 7-10" stroke={MAIN} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M38 110c6-6 14-4 16 0-6 4-12 4-16 0z" fill={LEAF} />
      <circle cx="29" cy="126" r="5" fill={W} opacity=".35" />
    </svg>
  );
}

/** Safety & smart tech: an oxygen cylinder, a weekly pill organiser and an alert pendant. */
export function SafetyArt({ className }: ArtProps) {
  const lids = [22, 41, 60, 79, 98, 117];
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <rect x="150" y="34" width="44" height="118" rx="20" fill={G} />
      <rect x="150" y="70" width="44" height="14" fill={W} />
      <rect x="162" y="16" width="20" height="22" rx="4" fill={D} />
      <rect x="156" y="10" width="32" height="10" rx="5" fill={R} />
      <rect x="158" y="46" width="8" height="90" rx="4" fill={W} opacity=".15" />
      <rect x="14" y="100" width="140" height="52" rx="12" fill={W} />
      {lids.map((x, i) => <rect key={x} x={x} y="88" width="16" height="22" rx="5" fill={i % 2 ? SKY : R} />)}
      <rect x="136" y="88" width="12" height="22" rx="5" fill={R} />
      <g fill={PALE}>{lids.map((x) => <circle key={x} cx={x + 8} cy="132" r="4" />)}</g>
      <path d="M58 22 q20 30 40 0" stroke={SKY} strokeWidth="2.5" fill="none" />
      <circle cx="78" cy="56" r="20" fill={W} />
      <circle cx="78" cy="56" r="11" fill={R} />
      <path d="M100 42a26 26 0 0 1 0 28M106 36a34 34 0 0 1 0 40" stroke="#C8102E" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

/** "Not sure what to buy?": two chat bubbles and a tick. */
export function HelpArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 170" {...svgProps}>
      <path d="M20 30a18 18 0 0 1 18-18h104a18 18 0 0 1 18 18v40a18 18 0 0 1-18 18H64l-22 18v-18h-4a18 18 0 0 1-18-18z" fill={D} />
      <rect x="40" y="34" width="96" height="8" rx="4" fill={PALE} />
      <rect x="40" y="52" width="64" height="8" rx="4" fill={SKY} />
      <path d="M200 92a16 16 0 0 0-16-16H92a16 16 0 0 0-16 16v34a16 16 0 0 0 16 16h70l20 16v-16h2a16 16 0 0 0 16-16z" fill={W} />
      <circle cx="112" cy="109" r="6" fill={R} /><circle cx="138" cy="109" r="6" fill={R} opacity=".6" /><circle cx="164" cy="109" r="6" fill={R} opacity=".3" />
      <circle cx="190" cy="34" r="16" fill={R} />
      <path d="M183 34l5 5 9-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Weekly pill organiser: seven days, four doses a day. */
export function PillBoxArt({ className }: ArtProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const xs = [23, 48, 73, 98, 123, 148, 173];
  return (
    <svg className={className} viewBox="0 0 220 170" {...svgProps}>
      <ellipse cx="110" cy="160" rx="96" ry="7" fill={MAIN} opacity=".12" />
      <rect x="12" y="44" width="196" height="112" rx="16" fill={W} />
      <rect x="12" y="44" width="196" height="16" rx="8" fill={G} />
      <g fontFamily={font} fontWeight="800" fontSize="9" fill="#fff" textAnchor="middle">
        {days.map((d, i) => <text key={i} x={xs[i] + 10} y="56">{d}</text>)}
      </g>
      {[66, 88, 110, 132].map((y, row) =>
        xs.map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="20" height="18" rx="5" fill={row % 2 ? SKY : R} />),
      )}
      <rect x="148" y="66" width="20" height="18" rx="5" fill={TINT} />
      <circle cx="158" cy="75" r="4" fill="#C8102E" />
    </svg>
  );
}

/** Disposable underpads: a stack of three, pack of 10. */
export function UnderpadsArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 170" {...svgProps}>
      <ellipse cx="110" cy="160" rx="92" ry="7" fill={MAIN} opacity=".12" />
      <rect x="30" y="112" width="160" height="42" rx="10" fill={W} />
      <rect x="38" y="120" width="144" height="26" rx="6" fill={TINT} />
      <rect x="36" y="76" width="150" height="42" rx="10" fill={W} />
      <rect x="44" y="84" width="134" height="26" rx="6" fill={PALE} />
      <rect x="42" y="40" width="140" height="42" rx="10" fill={W} />
      <rect x="50" y="48" width="124" height="26" rx="6" fill={TINT} />
      <path d="M50 61 h124" stroke="#fff" strokeWidth="2" strokeDasharray="6 6" />
      <rect x="132" y="18" width="62" height="34" rx="10" fill={R} />
      <text x="163" y="40" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="14" fill="#fff">×10</text>
    </svg>
  );
}

/* ---------- Care at home (homepage care cards) ---------- */

/** Nurse at home (large, for the dark card): IV stand with a drip, a nurse's kit bag, a syringe and a vial. */
export function NurseArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 380 340" {...svgProps}>
      <ellipse cx="200" cy="328" rx="170" ry="12" fill="#111821" opacity=".5" />
      <path d="M110 44v262" stroke={PALE} strokeWidth="8" strokeLinecap="round" />
      <path d="M80 48h60" stroke={PALE} strokeWidth="7" strokeLinecap="round" />
      <path d="M110 306l-38 16M110 306l38 16" stroke={PALE} strokeWidth="7" strokeLinecap="round" />
      <path d="M136 48v12" stroke={PALE} strokeWidth="4" strokeLinecap="round" />
      <path d="M136 172 C 136 224, 186 206, 190 236" stroke={SKY} strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="104" y="58" width="64" height="102" rx="18" fill={W} />
      <rect x="113" y="98" width="46" height="52" rx="10" fill={TINT} />
      <rect x="120" y="72" width="32" height="16" rx="4" fill={R} />
      <rect x="130" y="158" width="12" height="16" rx="3" fill={PALE} />
      <g>
        <path d="M222 166v-20a16 16 0 0 1 16-16h44a16 16 0 0 1 16 16v20" stroke={PALE} strokeWidth="10" fill="none" strokeLinecap="round" />
        <rect x="180" y="164" width="160" height="158" rx="26" fill={W} />
        <rect x="180" y="164" width="22" height="158" rx="11" fill="#000" opacity=".04" />
        <rect x="180" y="200" width="160" height="10" fill={PALE} />
        <circle cx="260" cy="262" r="34" fill={R} />
        <path d="M260 244v36M242 262h36" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
        <rect x="314" y="220" width="10" height="90" rx="5" fill="#fff" opacity=".7" />
      </g>
      <g transform="rotate(-22 112 300)">
        <rect x="44" y="296" width="12" height="10" fill={PALE} />
        <rect x="36" y="288" width="8" height="26" rx="3" fill={PALE} />
        <rect x="56" y="290" width="92" height="22" rx="6" fill={W} />
        <rect x="92" y="294" width="52" height="14" rx="3" fill={SKY} />
        <path d="M100 290v6M112 290v6M124 290v6M136 290v6" stroke={PALE} strokeWidth="2" />
        <rect x="148" y="296" width="10" height="10" rx="2" fill={PALE} />
        <path d="M158 301h28" stroke={PALE} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <rect x="346" y="282" width="24" height="40" rx="6" fill={W} />
      <rect x="344" y="272" width="28" height="12" rx="4" fill={R} />
      <rect x="346" y="298" width="24" height="12" fill={SKY} />
    </svg>
  );
}

/** Doctor at home (wide card): a clipboard with a check-up list and a stethoscope. */
export function DoctorArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 260 200" {...svgProps}>
      <ellipse cx="130" cy="190" rx="110" ry="8" fill={D} opacity=".12" />
      <rect x="26" y="40" width="112" height="146" rx="14" fill={G} />
      <rect x="37" y="58" width="90" height="118" rx="8" fill={W} />
      <rect x="61" y="30" width="42" height="20" rx="6" fill={R} />
      <rect x="51" y="76" width="62" height="7" rx="3.5" fill={PALE} />
      <rect x="51" y="92" width="44" height="7" rx="3.5" fill={PALE} />
      <circle cx="56" cy="122" r="6" fill={SKY} /><rect x="68" y="119" width="44" height="6" rx="3" fill={PALE} />
      <circle cx="56" cy="144" r="6" fill={SKY} /><rect x="68" y="141" width="34" height="6" rx="3" fill={PALE} />
      <path d="M53 122l2 2 4-4M53 144l2 2 4-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M170 38v42a34 34 0 0 0 68 0v-42" stroke={SLATE} strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="170" cy="34" r="7" fill={D} /><circle cx="238" cy="34" r="7" fill={D} />
      <path d="M204 114 C 204 150, 176 146, 178 166" stroke={SLATE} strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="178" cy="172" r="20" fill={G} />
      <circle cx="178" cy="172" r="12" fill={W} />
      <circle cx="178" cy="172" r="5" fill={R} />
      <path d="M214 136a26 26 0 0 1 0 30M222 128a38 38 0 0 1 0 46" stroke={R} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

/** Elder care: an armchair with a cushion, a walking stick and a heart. */
export function ElderArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <rect x="44" y="26" width="96" height="86" rx="24" fill={G} />
      <rect x="62" y="44" width="60" height="38" rx="14" fill={W} />
      <rect x="38" y="96" width="108" height="30" rx="12" fill={R} />
      <rect x="24" y="68" width="26" height="64" rx="12" fill={D} />
      <rect x="134" y="68" width="26" height="64" rx="12" fill={D} />
      <rect x="40" y="130" width="9" height="20" rx="3" fill={SLATE} />
      <rect x="135" y="130" width="9" height="20" rx="3" fill={SLATE} />
      <path d="M182 60v88" stroke={SLATE} strokeWidth="6" strokeLinecap="round" />
      <path d="M182 60a12 12 0 0 1 24 0v4" stroke={SLATE} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M24 46s-13-7.5-13-16a6.5 6.5 0 0 1 13-2.5 6.5 6.5 0 0 1 13 2.5c0 8.5-13 16-13 16z" fill={R} />
    </svg>
  );
}

/** Dementia care: the Safe-zone band inside a dashed safe area, sending an alert to a family phone. */
export function DementiaArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <circle cx="96" cy="84" r="64" fill="none" stroke={SKY} strokeWidth="2.5" strokeDasharray="6 7" opacity=".8" />
      <rect x="72" y="16" width="48" height="136" rx="18" fill={G} />
      <rect x="56" y="48" width="80" height="72" rx="22" fill={W} />
      <rect x="66" y="58" width="60" height="52" rx="14" fill={D} />
      <path d="M96 100s-13-13-13-22a13 13 0 0 1 26 0c0 9-13 22-13 22z" fill={R} />
      <circle cx="96" cy="78" r="5" fill="#fff" />
      <path d="M146 70a22 22 0 0 1 0 28M154 62a34 34 0 0 1 0 44" stroke={R} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
      <rect x="166" y="96" width="36" height="54" rx="8" fill={D} />
      <rect x="170" y="103" width="28" height="38" rx="4" fill={W} />
      <circle cx="184" cy="117" r="7" fill={R} />
      <rect x="175" y="129" width="18" height="4" rx="2" fill={PALE} />
    </svg>
  );
}

/** ICU at home: a patient monitor with a heart trace, and an oxygen cylinder. */
export function IcuArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <rect x="88" y="108" width="14" height="28" fill={SLATE} />
      <rect x="60" y="134" width="70" height="12" rx="6" fill={D} />
      <rect x="26" y="18" width="138" height="94" rx="14" fill={G} />
      <rect x="36" y="28" width="118" height="68" rx="8" fill={D} />
      <path d="M44 66h20l6-14 8 28 6-18 4 4h18l6-12 7 22 5-10h22" stroke={R} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="148" y="44" textAnchor="end" fontFamily={font} fontWeight="800" fontSize="12" fill={PALE}>98%</text>
      <circle cx="48" cy="104" r="3.5" fill={SKY} /><circle cx="60" cy="104" r="3.5" fill={R} />
      <rect x="170" y="56" width="34" height="94" rx="16" fill={W} />
      <rect x="170" y="84" width="34" height="12" fill={SKY} />
      <rect x="180" y="40" width="14" height="18" rx="3" fill={D} />
      <rect x="176" y="33" width="22" height="9" rx="4.5" fill={R} />
      <rect x="176" y="66" width="6" height="74" rx="3" fill="#fff" opacity=".7" />
    </svg>
  );
}

/** Ventilator care: a ventilator on a trolley, its hose and a mask. */
export function VentilatorArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <path d="M144 92 C 178 92, 166 44, 186 50" stroke={SLATE} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M144 92 C 178 92, 166 44, 186 50" stroke={PALE} strokeWidth="3" fill="none" strokeDasharray="2 5" strokeLinecap="round" />
      <ellipse cx="196" cy="52" rx="16" ry="19" fill={R} />
      <ellipse cx="196" cy="52" rx="8" ry="10" fill={BLUSH} />
      <path d="M48 134v8M120 134v8" stroke={SLATE} strokeWidth="5" strokeLinecap="round" />
      <rect x="36" y="124" width="96" height="10" rx="5" fill={SLATE} />
      <circle cx="48" cy="146" r="7" fill={D} /><circle cx="120" cy="146" r="7" fill={D} />
      <rect x="24" y="36" width="122" height="90" rx="16" fill={W} />
      <rect x="36" y="48" width="68" height="48" rx="8" fill={D} />
      <path d="M43 78q8-22 16 0t16 0t16 0" stroke={SKY} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <text x="98" y="62" textAnchor="end" fontFamily={font} fontWeight="800" fontSize="9" fill={PALE}>BiPAP</text>
      <circle cx="125" cy="66" r="13" fill={G} /><circle cx="125" cy="66" r="4.5" fill="#fff" />
      <rect x="36" y="106" width="20" height="8" rx="4" fill={R} />
      <rect x="62" y="106" width="20" height="8" rx="4" fill={PALE} />
      <rect x="88" y="106" width="20" height="8" rx="4" fill={PALE} />
    </svg>
  );
}

/** Stroke care: a therapy ball, a dumbbell and a speech bubble (physiotherapy and speech therapy). */
export function StrokeArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <circle cx="78" cy="98" r="52" fill={R} />
      <path d="M30 104q48 20 96 0" stroke="#8E0A20" strokeWidth="3" fill="none" opacity=".45" />
      <path d="M42 82a42 42 0 0 1 30-32" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".45" />
      <path d="M146 16h42a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12h-28l-14 12v-12a12 12 0 0 1-12-12v-22a12 12 0 0 1 12-12z" fill={W} />
      <circle cx="153" cy="39" r="4.5" fill={SKY} /><circle cx="167" cy="39" r="4.5" fill={SKY} opacity=".7" /><circle cx="181" cy="39" r="4.5" fill={SKY} opacity=".4" />
      <rect x="132" y="132" width="52" height="8" rx="4" fill={SLATE} />
      <rect x="122" y="118" width="16" height="36" rx="5" fill={G} />
      <rect x="178" y="118" width="16" height="36" rx="5" fill={G} />
    </svg>
  );
}

/** Cancer care: an awareness ribbon, a heart-shaped cushion and a dropper bottle. */
export function CancerArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <path d="M44 148s-28-16-28-34a14 14 0 0 1 28-6 14 14 0 0 1 28 6c0 18-28 34-28 34z" fill={W} />
      <path d="M44 116v12M38 122h12" stroke={SKY} strokeWidth="3" strokeLinecap="round" />
      <path d="M84 140L118 82C134 56 128 24 110 24S86 56 102 82" stroke={R} strokeWidth="16" fill="none" strokeLinejoin="round" />
      <path d="M102 82L136 140" stroke={R} strokeWidth="16" fill="none" />
      <path d="M104 34c-6 6-6 20 2 34" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".45" />
      <rect x="172" y="62" width="14" height="24" rx="7" fill={G} />
      <rect x="170" y="84" width="18" height="14" fill={PALE} />
      <rect x="162" y="96" width="34" height="52" rx="10" fill={W} />
      <rect x="162" y="112" width="34" height="16" fill={SKY} />
    </svg>
  );
}
