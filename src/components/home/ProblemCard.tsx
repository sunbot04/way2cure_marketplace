import Icon from '../Icon';
import { StaggerItem } from '../motion/Reveal';

// "Sound familiar?" card (reference: DawaTime problem cards): tall 4:5 card, dark bottom overlay,
// the family's problem in white, then how Way2Cure solves it underneath.
// No photo yet, so each card carries a simple line drawing in brand colours. To use a photo,
// pass `image` (see public/IMAGE_LIST.md: problem-*.webp).

export type Art = 'strips' | 'dose' | 'runs';

function Drawing({ art }: { art: Art }) {
  const stroke = { fill: 'none', stroke: 'rgb(var(--c-mint))', strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (art === 'strips') {
    return (
      <svg viewBox="0 0 320 300" className="h-full w-full" aria-hidden="true">
        {[
          { x: 40, y: 70, r: -14, a: 0.9 },
          { x: 120, y: 40, r: 9, a: 0.55 },
          { x: 70, y: 150, r: 4, a: 0.75 },
          { x: 170, y: 130, r: -20, a: 0.45 },
        ].map((s, i) => (
          <g key={i} transform={`rotate(${s.r} ${s.x + 60} ${s.y + 40})`} opacity={s.a}>
            <rect x={s.x} y={s.y} width="128" height="78" rx="12" {...stroke} />
            {[0, 1, 2, 3].map((c) => [0, 1].map((r) => (
              <ellipse key={`${c}${r}`} cx={s.x + 22 + c * 28} cy={s.y + 24 + r * 30} rx="9" ry="7" {...stroke} />
            )))}
          </g>
        ))}
        <circle cx="262" cy="70" r="7" fill="rgb(var(--c-mustard))" />
        <circle cx="244" cy="96" r="5" fill="rgb(var(--c-terracotta))" />
      </svg>
    );
  }
  if (art === 'dose') {
    return (
      <svg viewBox="0 0 320 300" className="h-full w-full" aria-hidden="true">
        <circle cx="150" cy="140" r="92" {...stroke} opacity="0.8" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={150 + Math.sin(a) * 78} y1={140 - Math.cos(a) * 78} x2={150 + Math.sin(a) * 86} y2={140 - Math.cos(a) * 86} {...stroke} opacity="0.6" />;
        })}
        <line x1="150" y1="140" x2="150" y2="84" {...stroke} strokeWidth="4" />
        <line x1="150" y1="140" x2="128" y2="176" {...stroke} strokeWidth="4" />
        <path d="M262 52a26 26 0 1 0 22 40 22 22 0 0 1-22-40z" fill="rgb(var(--c-mustard))" opacity="0.9" />
        <text x="236" y="210" fontSize="64" fontFamily="Lora, Georgia, serif" fontWeight="700" fill="rgb(var(--c-terracotta))" opacity="0.9">?</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full" aria-hidden="true">
      <rect x="36" y="46" width="168" height="150" rx="14" {...stroke} opacity="0.8" />
      <line x1="36" y1="80" x2="204" y2="80" {...stroke} opacity="0.8" />
      {Array.from({ length: 15 }).map((_, i) => (
        <circle key={i} cx={58 + (i % 5) * 31} cy={102 + Math.floor(i / 5) * 30} r="4" fill="rgb(var(--c-mint))" opacity={[2, 6, 9, 13].includes(i) ? 0 : 0.5} />
      ))}
      {[2, 6, 9, 13].map((i) => (
        <circle key={`m${i}`} cx={58 + (i % 5) * 31} cy={102 + Math.floor(i / 5) * 30} r="9" fill="none" stroke="rgb(var(--c-terracotta))" strokeWidth="2.5" />
      ))}
      <path d="M204 170 C 240 190, 236 230, 268 236" {...stroke} strokeDasharray="2 9" />
      <rect x="250" y="214" width="44" height="44" rx="10" fill="rgb(var(--c-mustard))" opacity="0.9" />
      <path d="M272 226v20M262 236h20" stroke="rgb(var(--c-green))" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

const BG: Record<Art, string> = { strips: 'bg-green', dose: 'bg-ink', runs: 'bg-green-dark' };

export default function ProblemCard({ art, line1, line2, sub, fix, fixLabel, image, position = 'center' }: {
  art: Art; line1: string; line2: string; sub: string; fix: string; fixLabel: string; image?: string; position?: string;
}) {
  return (
    <StaggerItem as="li" className="group grid w-[82%] shrink-0 snap-start content-start gap-4 md:w-auto">
      <div className={`relative aspect-[4/5] overflow-hidden rounded-panel ${BG[art]} transition-[transform,box-shadow] duration-micro ease-soft group-hover:-translate-y-1 group-hover:shadow-float`}>
        {image ? (
          <img
            src={image}
            srcSet={`${image.replace('.webp', '-sm.webp')} 400w, ${image} 800w`}
            sizes="(min-width: 768px) 30vw, 82vw"
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-soft group-hover:scale-[1.03]"
            style={{ objectPosition: position }}
          />
        ) : (
          <div className="absolute inset-x-0 top-0 h-[68%] p-6 transition-transform duration-slow ease-soft group-hover:scale-[1.03]">
            <Drawing art={art} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 via-40% to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <h3 className="mb-2 text-h3m leading-tight text-white md:text-h3">{line1}<br />{line2}</h3>
          <p className="m-0 text-base text-white/85">{sub}</p>
        </div>
      </div>
      <p className="m-0 flex items-start gap-3 text-base">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-white"><Icon name="check" size={16} /></span>
        <span><strong className="block text-small text-sage">{fixLabel}</strong>{fix}</span>
      </p>
    </StaggerItem>
  );
}
