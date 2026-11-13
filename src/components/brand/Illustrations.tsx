import type { ReactNode } from 'react';

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
// Each care drawing now has a person in it (nurse, doctor, caretaker or patient), drawn in the same
// flat, faceless-but-friendly style as the objects: rounded shapes, the site palette, soft gradients.

const SKIN = '#C68660';
const HAIR = '#2B211C';
const GREY_HAIR = '#E4E8ED';
const SCRUBS = '#5BA3E0';

type PersonProps = {
  x: number; y: number; s?: number;
  /** Shirt / scrubs colour */
  top: string;
  pants?: string;
  hair?: string;
  /** Hair tied in a bun (and a little longer at the sides) */
  bun?: boolean;
  /** Nurse's cap with a red cross */
  cap?: boolean;
  /** Doctor's white coat over the shirt, with a stethoscope */
  coat?: boolean;
  glasses?: boolean;
  /** Sitting, seen from the front: a lap, then the shins */
  seated?: boolean;
  /** Something held in the right hand, drawn in the figure's own coordinates */
  holding?: ReactNode;
  /** Something on the left wrist (e.g. the Safe-zone band) */
  wrist?: ReactNode;
};

/** A flat, standing (or sitting) person. Feet at (x, y); about 168 units tall before scaling. */
function Person({ x, y, s = 1, top, pants = MAIN, hair = HAIR, bun, cap, coat, glasses, seated, holding, wrist }: PersonProps) {
  const body = coat ? '#FFFFFF' : top;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Legs and shoes */}
      {seated ? (
        <>
          <rect x="-15" y="-50" width="13" height="48" rx="6" fill={pants} />
          <rect x="2" y="-50" width="13" height="48" rx="6" fill={pants} />
          <rect x="-28" y="-66" width="56" height="20" rx="10" fill={pants} />
        </>
      ) : (
        <>
          <rect x="-15" y="-66" width="13" height="64" rx="6" fill={pants} />
          <rect x="2" y="-66" width="13" height="64" rx="6" fill={pants} />
        </>
      )}
      <rect x="-19" y="-7" width="17" height="8" rx="4" fill="#121A24" />
      <rect x="2" y="-7" width="17" height="8" rx="4" fill="#121A24" />

      {/* Arms (behind the body), hands */}
      <rect x="-34" y="-118" width="13" height={seated ? 48 : 56} rx="6.5" fill={body} />
      <rect x="21" y="-118" width="13" height={seated ? 48 : 56} rx="6.5" fill={body} />
      <circle cx="-27.5" cy={seated ? -68 : -60} r="6.5" fill={SKIN} />
      <circle cx="27.5" cy={seated ? -68 : -60} r="6.5" fill={SKIN} />

      {/* Neck and body */}
      <rect x="-5.5" y="-134" width="11" height="14" rx="3" fill={SKIN} />
      <path d={`M-27 ${seated ? -62 : -58} V-104 a20 20 0 0 1 20 -20 h14 a20 20 0 0 1 20 20 V${seated ? -62 : -58} a6 6 0 0 1 -6 6 h-42 a6 6 0 0 1 -6 -6z`} fill={body} />
      {coat ? (
        <>
          <path d="M-9 -124 L0 -104 L9 -124z" fill={top} />
          <path d="M0 -104 V-56" stroke={PALE} strokeWidth="2" />
          <rect x="-20" y="-80" width="12" height="9" rx="2" fill="none" stroke={PALE} strokeWidth="2" />
          <path d="M-12 -122 C -15 -98, -5 -88, 0 -88 C 5 -88, 15 -98, 12 -122" stroke={SLATE} strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="-86" r="5" fill={G} /><circle cx="0" cy="-86" r="2" fill={R} />
        </>
      ) : (
        <path d="M-8 -124 L0 -113 L8 -124z" fill={SKIN} />
      )}
      {cap && <rect x="10" y="-112" width="11" height="7" rx="2" fill={R} />}
      {wrist}

      {/* Head, hair and a calm face */}
      <circle cx="0" cy="-146" r="17" fill={SKIN} />
      {bun && <circle cx="0" cy="-165" r="8" fill={hair} />}
      <path d="M-17.5 -143 A17.5 17.5 0 0 1 17.5 -143 C 12 -153, -4 -156, -17.5 -143z" fill={hair} />
      {bun && <path d="M-17.5 -143 q-2 10 2 16 l3 -2 q-3 -7 -1 -14z M17.5 -143 q2 10 -2 16 l-3 -2 q3 -7 1 -14z" fill={hair} />}
      {cap && (
        <g>
          <path d="M-13 -158 h26 l-3 -11 h-20z" fill="#FFFFFF" />
          <rect x="-1.5" y="-167" width="3" height="7" rx="1" fill={R} />
          <rect x="-3.5" y="-165" width="7" height="3" rx="1" fill={R} />
        </g>
      )}
      <circle cx="-6" cy="-145" r="1.8" fill={HAIR} />
      <circle cx="6" cy="-145" r="1.8" fill={HAIR} />
      <path d="M-4.5 -138 q4.5 3.5 9 0" stroke={HAIR} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {glasses && (
        <g stroke={SLATE} strokeWidth="1.6" fill="none">
          <circle cx="-6" cy="-145" r="5" /><circle cx="6" cy="-145" r="5" /><path d="M-1 -145h2" />
        </g>
      )}
      {holding}
    </g>
  );
}

/** Nurse at home (large, for the dark card): a nurse beside an IV stand, with her kit bag and a syringe. */
export function NurseArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 380 340" {...svgProps}>
      <ellipse cx="200" cy="328" rx="170" ry="12" fill="#111821" opacity=".5" />
      {/* IV stand and drip */}
      <path d="M70 44v262" stroke={PALE} strokeWidth="8" strokeLinecap="round" />
      <path d="M40 48h60" stroke={PALE} strokeWidth="7" strokeLinecap="round" />
      <path d="M70 306l-34 16M70 306l34 16" stroke={PALE} strokeWidth="7" strokeLinecap="round" />
      <path d="M96 48v12" stroke={PALE} strokeWidth="4" strokeLinecap="round" />
      <path d="M96 172 C 96 214, 130 200, 150 214" stroke={SKY} strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="64" y="58" width="64" height="102" rx="18" fill={W} />
      <rect x="73" y="98" width="46" height="52" rx="10" fill={TINT} />
      <rect x="80" y="72" width="32" height="16" rx="4" fill={R} />
      <rect x="90" y="158" width="12" height="16" rx="3" fill={PALE} />

      {/* The nurse, holding a clipboard */}
      <Person
        x={200} y={322} s={1.62} top={SCRUBS} pants="#3F7FBF" bun cap
        holding={
          <g>
            <rect x="20" y="-92" width="30" height="40" rx="5" fill={G} />
            <rect x="24" y="-86" width="22" height="30" rx="3" fill={W} />
            <rect x="29" y="-96" width="12" height="7" rx="2" fill={R} />
            <rect x="28" y="-79" width="14" height="3" rx="1.5" fill={PALE} />
            <rect x="28" y="-72" width="10" height="3" rx="1.5" fill={PALE} />
            <circle cx="27.5" cy="-62" r="6.5" fill={SKIN} />
          </g>
        }
      />

      {/* Kit bag */}
      <g>
        <path d="M296 252v-12a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v12" stroke={PALE} strokeWidth="8" fill="none" strokeLinecap="round" />
        <rect x="270" y="250" width="100" height="72" rx="18" fill={W} />
        <rect x="270" y="268" width="100" height="7" fill={PALE} />
        <circle cx="320" cy="298" r="16" fill={R} />
        <path d="M320 289v18M311 298h18" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Syringe */}
      <g transform="rotate(-18 60 312)">
        <rect x="14" y="304" width="8" height="18" rx="3" fill={PALE} />
        <rect x="22" y="306" width="64" height="14" rx="4" fill={W} />
        <rect x="48" y="309" width="34" height="8" rx="2" fill={SKY} />
        <path d="M86 313h22" stroke={PALE} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Doctor at home (wide card): a doctor in a white coat with a stethoscope, beside a check-up clipboard. */
export function DoctorArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 260 200" {...svgProps}>
      <ellipse cx="130" cy="192" rx="110" ry="8" fill={D} opacity=".12" />
      <g transform="translate(8 34) scale(.86)">
        <rect x="26" y="40" width="112" height="146" rx="14" fill={G} />
        <rect x="37" y="58" width="90" height="118" rx="8" fill={W} />
        <rect x="61" y="30" width="42" height="20" rx="6" fill={R} />
        <rect x="51" y="76" width="62" height="7" rx="3.5" fill={PALE} />
        <rect x="51" y="92" width="44" height="7" rx="3.5" fill={PALE} />
        <circle cx="56" cy="122" r="6" fill={SKY} /><rect x="68" y="119" width="44" height="6" rx="3" fill={PALE} />
        <circle cx="56" cy="144" r="6" fill={SKY} /><rect x="68" y="141" width="34" height="6" rx="3" fill={PALE} />
        <path d="M53 122l2 2 4-4M53 144l2 2 4-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Person x={180} y={190} s={1.04} top={SKY} coat glasses />
      <path d="M222 70a20 20 0 0 1 0 26M230 62a32 32 0 0 1 0 42" stroke={R} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

/** Elder care: a grandmother resting in her armchair, with a caretaker at her side. */
export function ElderArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      {/* Chair back and seat */}
      <rect x="40" y="34" width="96" height="86" rx="24" fill={G} />
      <rect x="34" y="102" width="108" height="26" rx="12" fill={R} />
      <Person x={88} y={150} s={0.6} top={SKY} hair={GREY_HAIR} bun glasses seated pants={SLATE} />
      {/* Chair arms and legs */}
      <rect x="20" y="74" width="26" height="60" rx="12" fill={D} />
      <rect x="130" y="74" width="26" height="60" rx="12" fill={D} />
      <rect x="36" y="132" width="9" height="18" rx="3" fill={SLATE} />
      <rect x="131" y="132" width="9" height="18" rx="3" fill={SLATE} />
      {/* Caretaker, holding a cup of tea */}
      <Person
        x={186} y={152} s={0.84} top={R} pants={MAIN} bun
        holding={<g><rect x="17" y="-72" width="18" height="16" rx="4" fill={W} /><path d="M35 -68a5 5 0 0 1 0 9" stroke={W} strokeWidth="3" fill="none" /><circle cx="22" cy="-62" r="6.5" fill={SKIN} /></g>}
      />
      <path d="M22 40s-12-7-12-15a6 6 0 0 1 12-2.3 6 6 0 0 1 12 2.3c0 8-12 15-12 15z" fill={R} />
    </svg>
  );
}

/** Dementia care: a grandfather walking safely inside his safe zone, wearing the band, which sends
 *  his location to a family member's phone. */
export function DementiaArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="96" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <ellipse cx="80" cy="146" rx="66" ry="14" fill={SKY} opacity=".12" />
      <circle cx="80" cy="84" r="66" fill="none" stroke={SKY} strokeWidth="2.5" strokeDasharray="6 7" opacity=".8" />
      <Person
        x={80} y={150} s={0.8} top={SLATE} pants={MAIN} hair={GREY_HAIR} glasses
        wrist={<g><rect x="-35" y="-78" width="15" height="11" rx="3" fill={D} /><circle cx="-27.5" cy="-72.5" r="2.6" fill={R} /></g>}
      />
      {/* Location pin above, signal to the phone */}
      <path d="M128 52s-11-11-11-19a11 11 0 0 1 22 0c0 8-11 19-11 19z" fill={R} />
      <circle cx="128" cy="33" r="4" fill="#fff" />
      <path d="M150 74a20 20 0 0 1 0 26M158 66a32 32 0 0 1 0 42" stroke={R} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
      <rect x="172" y="88" width="38" height="60" rx="8" fill={D} />
      <rect x="176" y="95" width="30" height="44" rx="4" fill={W} />
      <circle cx="191" cy="111" r="7" fill={R} />
      <rect x="181" y="124" width="20" height="4" rx="2" fill={PALE} />
      <rect x="184" y="131" width="14" height="4" rx="2" fill={PALE} />
    </svg>
  );
}

/** A home bed with a patient resting under a blanket. Pillow end on the left unless `flip`. */
function BedPatient({ flip = false, mask = false }: { flip?: boolean; mask?: boolean }) {
  return (
    <g transform={flip ? 'translate(220 0) scale(-1 1)' : undefined}>
      <rect x="14" y="74" width="12" height="76" rx="5" fill={D} />
      <rect x="22" y="112" width="128" height="16" rx="6" fill={G} />
      <rect x="140" y="104" width="10" height="46" rx="4" fill={D} />
      <rect x="28" y="128" width="7" height="20" rx="3" fill={SLATE} />
      <rect x="22" y="100" width="124" height="14" rx="7" fill={W} />
      <ellipse cx="44" cy="96" rx="20" ry="10" fill={W} stroke={PALE} strokeWidth="2" />
      <circle cx="48" cy="86" r="11" fill={SKIN} />
      <path d="M37 85a11 11 0 0 1 14 -10c-6 2-10 6-14 10z" fill={GREY_HAIR} />
      <path d="M44 87q2 2 4 0" stroke={HAIR} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {mask && <ellipse cx="57" cy="88" rx="6" ry="7.5" fill={TINT} stroke={SKY} strokeWidth="2" />}
      <path d="M58 92h82a8 8 0 0 1 8 8v4H58z" fill={SKY} />
      <path d="M58 92h20v12H58z" fill="#fff" opacity=".55" />
      <path d="M96 96q12 4 24 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".5" />
    </g>
  );
}

/** ICU at home: a patient resting in bed, watched by a heart monitor, with an oxygen cylinder. */
export function IcuArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      {/* Monitor on a stand */}
      <path d="M176 64v80" stroke={SLATE} strokeWidth="5" strokeLinecap="round" />
      <path d="M162 148h28" stroke={SLATE} strokeWidth="5" strokeLinecap="round" />
      <rect x="126" y="10" width="88" height="58" rx="10" fill={G} />
      <rect x="132" y="16" width="76" height="42" rx="6" fill={D} />
      <path d="M137 40h12l4-9 5 18 4-12 3 3h11l4-8 4 14 3-6h13" stroke={R} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="204" y="27" textAnchor="end" fontFamily={font} fontWeight="800" fontSize="8" fill={PALE}>98%</text>
      <BedPatient />
      {/* Oxygen line from the cylinder */}
      <path d="M60 90 C 90 70, 170 70, 196 96" stroke={SKY} strokeWidth="2" fill="none" strokeDasharray="3 4" strokeLinecap="round" opacity=".8" />
      <rect x="190" y="96" width="22" height="54" rx="10" fill={W} />
      <rect x="190" y="112" width="22" height="8" fill={SKY} />
      <rect x="195" y="86" width="12" height="11" rx="3" fill={R} />
    </svg>
  );
}

/** Ventilator care: a patient resting with a mask, connected to a BiPAP machine on a trolley. */
export function VentilatorArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      <BedPatient flip mask />
      {/* Hose from the machine to the mask */}
      <path d="M74 52 C 120 46, 150 60, 163 86" stroke={SLATE} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M74 52 C 120 46, 150 60, 163 86" stroke={PALE} strokeWidth="2.5" fill="none" strokeDasharray="2 5" strokeLinecap="round" />
      {/* Ventilator on a trolley */}
      <g transform="translate(0 6) scale(.62)">
        <path d="M48 134v8M120 134v8" stroke={SLATE} strokeWidth="5" strokeLinecap="round" />
        <path d="M84 126v104" stroke={SLATE} strokeWidth="7" strokeLinecap="round" />
        <rect x="40" y="226" width="88" height="10" rx="5" fill={SLATE} />
        <circle cx="50" cy="240" r="7" fill={D} /><circle cx="118" cy="240" r="7" fill={D} />
        <rect x="24" y="36" width="122" height="90" rx="16" fill={W} />
        <rect x="36" y="48" width="68" height="48" rx="8" fill={D} />
        <path d="M43 78q8-22 16 0t16 0t16 0" stroke={SKY} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <text x="98" y="62" textAnchor="end" fontFamily={font} fontWeight="800" fontSize="9" fill={PALE}>BiPAP</text>
        <circle cx="125" cy="66" r="13" fill={G} /><circle cx="125" cy="66" r="4.5" fill="#fff" />
        <rect x="36" y="106" width="20" height="8" rx="4" fill={R} />
        <rect x="62" y="106" width="20" height="8" rx="4" fill={PALE} />
        <rect x="88" y="106" width="20" height="8" rx="4" fill={PALE} />
      </g>
    </svg>
  );
}

/** Stroke care: a physiotherapist helping a grandfather with light exercises, and a speech-therapy bubble. */
export function StrokeArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      <circle cx="186" cy="128" r="22" fill={R} />
      <path d="M166 132q20 10 40 0" stroke="#8E0A20" strokeWidth="2.5" fill="none" opacity=".45" />
      <path d="M172 118a18 18 0 0 1 12-10" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".45" />
      {/* Grandfather, holding a small dumbbell */}
      <Person
        x={66} y={150} s={0.8} top={G} pants={SLATE} hair={GREY_HAIR} glasses
        holding={<g><rect x="16" y="-64" width="24" height="5" rx="2.5" fill={SLATE} /><rect x="12" y="-70" width="8" height="17" rx="3" fill={G} /><rect x="36" y="-70" width="8" height="17" rx="3" fill={G} /><circle cx="27.5" cy="-61" r="6.5" fill={SKIN} /></g>}
      />
      {/* Physiotherapist */}
      <Person x={128} y={150} s={0.84} top={SCRUBS} pants="#3F7FBF" />
      <path d="M146 14h44a12 12 0 0 1 12 12v20a12 12 0 0 1-12 12h-28l-14 11v-11a12 12 0 0 1-12-12v-20a12 12 0 0 1 12-12z" fill={W} />
      <circle cx="154" cy="36" r="4.5" fill={SKY} /><circle cx="168" cy="36" r="4.5" fill={SKY} opacity=".7" /><circle cx="182" cy="36" r="4.5" fill={SKY} opacity=".4" />
    </svg>
  );
}

/** Cancer care: an oncology nurse with a heart, beside the awareness ribbon. */
export function CancerArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      <g transform="translate(-58 6) scale(.92)">
        <path d="M84 140L118 82C134 56 128 24 110 24S86 56 102 82" stroke={R} strokeWidth="16" fill="none" strokeLinejoin="round" />
        <path d="M102 82L136 140" stroke={R} strokeWidth="16" fill="none" />
        <path d="M104 34c-6 6-6 20 2 34" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".45" />
      </g>
      <Person
        x={132} y={150} s={0.84} top={SCRUBS} pants="#3F7FBF" bun cap
        holding={<g><path d="M30 -52s-16-9-16-20a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 11-16 20-16 20z" fill={W} /><path d="M30 -73v10M25 -68h10" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" /></g>}
      />
      <rect x="178" y="92" width="14" height="22" rx="7" fill={G} />
      <rect x="176" y="112" width="18" height="10" fill={PALE} />
      <rect x="170" y="120" width="30" height="30" rx="9" fill={W} />
      <rect x="170" y="130" width="30" height="10" fill={SKY} />
    </svg>
  );
}

/* ---------- Prescription rules ("Good to know" cards) ---------- */

/** Valid prescription: an Rx sheet with a doctor's signature and a sky "approved" tick. */
export function RxValidArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <g transform="rotate(-6 100 84)">
        <rect x="52" y="14" width="104" height="134" rx="12" fill={W} />
        <rect x="52" y="14" width="104" height="26" rx="12" fill={G} />
        <rect x="52" y="30" width="104" height="10" fill={G} />
        <text x="66" y="68" fontFamily="Lora, Georgia, serif" fontWeight="700" fontSize="24" fill="#C8102E">Rx</text>
        <rect x="100" y="54" width="42" height="6" rx="3" fill={PALE} />
        <rect x="66" y="80" width="76" height="6" rx="3" fill={PALE} />
        <rect x="66" y="94" width="58" height="6" rx="3" fill={PALE} />
        <rect x="66" y="108" width="68" height="6" rx="3" fill={PALE} />
        <path d="M70 132c8-10 14 4 20-4s10 6 18-2" stroke={SLATE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      <circle cx="160" cy="112" r="26" fill={SKY} />
      <circle cx="160" cy="112" r="26" fill="none" stroke="#fff" strokeWidth="4" opacity=".5" />
      <path d="M148 112l8 8 16-16" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Schedule H and H1: a doctor's prescription pad with an "H1" tag and a stethoscope. */
export function ScheduleHArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <rect x="40" y="26" width="96" height="124" rx="12" fill={G} />
      <rect x="49" y="40" width="78" height="100" rx="7" fill={W} />
      <rect x="68" y="18" width="40" height="18" rx="6" fill={SLATE} />
      <rect x="60" y="54" width="40" height="6" rx="3" fill={PALE} />
      <rect x="60" y="68" width="56" height="6" rx="3" fill={PALE} />
      <rect x="60" y="82" width="48" height="6" rx="3" fill={PALE} />
      <rect x="60" y="96" width="52" height="6" rx="3" fill={PALE} />
      <g transform="rotate(10 118 118)">
        <rect x="92" y="104" width="54" height="30" rx="9" fill={R} />
        <text x="119" y="125" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="16" fill="#fff">H1</text>
      </g>
      <path d="M160 30v30a22 22 0 0 0 44 0V30" stroke={SLATE} strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="160" cy="27" r="5" fill={D} /><circle cx="204" cy="27" r="5" fill={D} />
      <path d="M182 82c0 26-20 22-20 40" stroke={SLATE} strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="162" cy="128" r="15" fill={G} /><circle cx="162" cy="128" r="8" fill={W} /><circle cx="162" cy="128" r="3.5" fill={R} />
    </svg>
  );
}

/** No Schedule X: a medicine bottle marked X, behind a crimson "not allowed" sign. */
export function NoScheduleXArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <rect x="82" y="22" width="56" height="20" rx="6" fill={G} />
      <rect x="74" y="40" width="72" height="110" rx="18" fill={W} />
      <rect x="74" y="70" width="72" height="50" fill={TINT} />
      <text x="110" y="106" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="28" fill={SLATE}>X</text>
      <rect x="132" y="50" width="7" height="90" rx="3.5" fill="#fff" opacity=".7" />
      <circle cx="110" cy="88" r="58" fill="none" stroke={R} strokeWidth="11" />
      <path d="M69 47l82 82" stroke={R} strokeWidth="11" strokeLinecap="round" />
      <circle cx="40" cy="132" r="8" fill={BLUSH} /><circle cx="186" cy="38" r="6" fill={SKY} opacity=".6" />
    </svg>
  );
}

/** Privacy: a shield with a lock, guarding a prescription. */
export function PrivacyArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="90" ry="7" fill={D} opacity=".12" />
      <g transform="rotate(-10 70 90)">
        <rect x="30" y="40" width="70" height="92" rx="10" fill={W} />
        <text x="42" y="66" fontFamily="Lora, Georgia, serif" fontWeight="700" fontSize="16" fill="#C8102E">Rx</text>
        <rect x="42" y="78" width="44" height="5" rx="2.5" fill={PALE} />
        <rect x="42" y="90" width="34" height="5" rx="2.5" fill={PALE} />
        <rect x="42" y="102" width="40" height="5" rx="2.5" fill={PALE} />
      </g>
      <path d="M140 14l52 18v40c0 36-24 58-52 72-28-14-52-36-52-72V32z" fill={G} />
      <path d="M140 26l40 14v32c0 28-18 46-40 58z" fill="#fff" opacity=".08" />
      <rect x="118" y="74" width="44" height="36" rx="8" fill={W} />
      <path d="M126 74v-10a14 14 0 0 1 28 0v10" stroke={W} strokeWidth="7" fill="none" />
      <circle cx="140" cy="88" r="5" fill={R} />
      <rect x="138" y="90" width="4" height="10" rx="2" fill={R} />
      <path d="M196 104l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" fill={SKY} />
    </svg>
  );
}

/* ---------- Care page: the everyday services without a homepage drawing ---------- */

/** Bedridden patient care: a patient resting in bed, with a caretaker bringing water. */
export function BedriddenArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      <BedPatient />
      <Person
        x={184} y={152} s={0.8} top={SCRUBS} pants="#3F7FBF" bun
        holding={<g><rect x="18" y="-76" width="14" height="20" rx="3" fill={W} /><rect x="18" y="-68" width="14" height="10" rx="2" fill={SKY} opacity=".6" /><circle cx="22" cy="-62" r="6.5" fill={SKIN} /></g>}
      />
    </svg>
  );
}

/** Post-operative care: a nurse checking a grandfather's bandaged arm. */
export function PostOpArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      {/* Chair */}
      <rect x="36" y="58" width="72" height="66" rx="18" fill={G} />
      <rect x="30" y="104" width="84" height="20" rx="9" fill={SLATE} />
      <Person
        x={72} y={150} s={0.6} top={TINT} pants={SLATE} hair={GREY_HAIR} glasses seated
        wrist={<g><rect x="-36" y="-92" width="16" height="22" rx="4" fill="#fff" stroke={PALE} strokeWidth="2" /><path d="M-28 -86v10M-33 -81h10" stroke={R} strokeWidth="2.5" strokeLinecap="round" /></g>}
      />
      <rect x="40" y="132" width="7" height="18" rx="3" fill={SLATE} />
      <rect x="97" y="132" width="7" height="18" rx="3" fill={SLATE} />
      <Person
        x={160} y={152} s={0.84} top={SCRUBS} pants="#3F7FBF" bun cap
        holding={<g><rect x="16" y="-90" width="26" height="34" rx="4" fill={G} /><rect x="19" y="-85" width="20" height="25" rx="2" fill={W} /><path d="M23 -78h12M23 -71h8" stroke={PALE} strokeWidth="2.5" strokeLinecap="round" /><circle cx="27.5" cy="-60" r="6.5" fill={SKIN} /></g>}
      />
      <path d="M200 40s-9-5-9-11a4.5 4.5 0 0 1 9-1.8 4.5 4.5 0 0 1 9 1.8c0 6-9 11-9 11z" fill={R} />
    </svg>
  );
}

/** Baby care: a caretaker cradling a newborn, with a feeding bottle. */
export function BabyArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      <circle cx="104" cy="80" r="62" fill={TINT} opacity=".7" />
      <Person
        x={104} y={152} s={0.86} top={R} pants={MAIN} bun
        holding={
          <g>
            <ellipse cx="4" cy="-82" rx="26" ry="15" fill={W} />
            <path d="M-20 -86q24 -10 48 2" stroke={PALE} strokeWidth="2" fill="none" />
            <circle cx="-14" cy="-88" r="10" fill="#E2A47E" />
            <path d="M-23 -91a10 10 0 0 1 16 -5" stroke="#8A5A3C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M-17 -86q3 2 5 0" stroke={HAIR} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <circle cx="-26" cy="-76" r="6.5" fill={SKIN} />
            <circle cx="30" cy="-76" r="6.5" fill={SKIN} />
          </g>
        }
      />
      {/* Feeding bottle */}
      <g transform="rotate(12 182 118)">
        <path d="M176 82h12l3 10h-18z" fill={BLUSH} />
        <rect x="171" y="90" width="22" height="8" rx="3" fill={R} />
        <rect x="170" y="97" width="24" height="50" rx="9" fill={W} />
        <rect x="170" y="118" width="24" height="22" fill={SKY} opacity=".35" />
        <path d="M176 106h8M176 112h5" stroke={PALE} strokeWidth="2" strokeLinecap="round" />
      </g>
      <path d="M36 44s-9-5-9-11a4.5 4.5 0 0 1 9-1.8 4.5 4.5 0 0 1 9 1.8c0 6-9 11-9 11z" fill={R} />
      <circle cx="44" cy="120" r="5" fill={SKY} opacity=".6" />
    </svg>
  );
}

/* ---------- Subscriptions: plan cards ---------- */

/** Health checks at home: a nurse taking a grandmother's blood pressure with a home monitor. */
export function HealthCheckArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      <rect x="22" y="62" width="70" height="62" rx="18" fill={G} />
      <rect x="16" y="104" width="82" height="20" rx="9" fill={SLATE} />
      <Person
        x={56} y={150} s={0.58} top={R} pants={SLATE} hair={GREY_HAIR} bun glasses seated
        holding={<g><rect x="16" y="-104" width="22" height="18" rx="5" fill={SKY} /><path d="M27 -104v-6" stroke={SKY} strokeWidth="3" /></g>}
      />
      <rect x="24" y="132" width="7" height="18" rx="3" fill={SLATE} />
      <rect x="83" y="132" width="7" height="18" rx="3" fill={SLATE} />
      {/* Monitor on a side table, its tube to the cuff */}
      <path d="M78 92 C 96 84, 100 104, 112 100" stroke={SLATE} strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="100" y="112" width="40" height="6" rx="3" fill={SLATE} />
      <path d="M120 118v32" stroke={SLATE} strokeWidth="4" strokeLinecap="round" />
      <rect x="104" y="84" width="34" height="28" rx="6" fill={W} />
      <rect x="108" y="88" width="26" height="13" rx="3" fill={D} />
      <text x="121" y="98" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="8" fill={PALE}>120/80</text>
      <circle cx="121" cy="106" r="2.5" fill={R} />
      <Person x={172} y={152} s={0.84} top={SCRUBS} pants="#3F7FBF" bun cap
        holding={<g><rect x="17" y="-88" width="24" height="30" rx="4" fill={G} /><rect x="20" y="-84" width="18" height="22" rx="2" fill={W} /><path d="M23 -77h12M23 -71h8" stroke={PALE} strokeWidth="2.5" strokeLinecap="round" /><circle cx="27.5" cy="-60" r="6.5" fill={SKIN} /></g>}
      />
      <path d="M208 40s-8-4.5-8-10a4 4 0 0 1 8-1.6 4 4 0 0 1 8 1.6c0 5.5-8 10-8 10z" fill={R} />
    </svg>
  );
}

/** Dose sachets: a strip of sealed sachets, one per time of day, with a tear line. */
export function SachetStripArt({ className }: ArtProps) {
  const doses = [
    { label: 'AM', band: '#FFC83D', x: 22, r: -8 },
    { label: 'NOON', band: SKY, x: 82, r: -2 },
    { label: 'PM', band: '#C8102E', x: 142, r: 6 },
  ];
  return (
    <svg className={className} viewBox="0 0 220 160" {...svgProps}>
      <ellipse cx="110" cy="152" rx="96" ry="7" fill={D} opacity=".12" />
      {doses.map((d) => (
        <g key={d.label} transform={`rotate(${d.r} ${d.x + 28} 90)`}>
          <rect x={d.x} y="34" width="56" height="104" rx="6" fill={W} />
          <path d={`M${d.x} 40 h56 M${d.x} 132 h56`} stroke={PALE} strokeWidth="2" strokeDasharray="3 3" />
          <rect x={d.x} y="46" width="12" height="80" fill={d.band} />
          <text x={d.x + 8} y="86" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="7" fill={d.band === '#FFC83D' ? MAIN : '#fff'} transform={`rotate(-90 ${d.x + 8} 86)`}>{d.label}</text>
          <rect x={d.x + 18} y="52" width="30" height="5" rx="2.5" fill={MAIN} opacity=".75" />
          <rect x={d.x + 18} y="62" width="22" height="4" rx="2" fill={PALE} />
          <ellipse cx={d.x + 26} cy="88" rx="6" ry="4.5" fill="#fff" stroke={PALE} strokeWidth="1.5" />
          <rect x={d.x + 33} y="84" width="13" height="8" rx="4" fill={d.band} opacity=".85" />
          <circle cx={d.x + 30} cy="104" r="4.5" fill={BLUSH} />
          <rect x={d.x + 18} y="116" width="26" height="4" rx="2" fill={PALE} />
        </g>
      ))}
      <path d="M200 26l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill={SKY} />
    </svg>
  );
}
