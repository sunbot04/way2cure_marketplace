import { Link } from 'react-router-dom';
import Icon from '../Icon';
import CardArrow from '../ui/CardArrow';

// Shop-page category card with a real photo (stock until the product shoot, see
// public/images/categories/CREDITS.md). Compact, so the products below stay near the top. Phones: a
// picture tile with the name under it, in a row you swipe; from 640px: photo thumbnail beside the
// name. The whole card is one link; the photo zooms a little and the round arrow fills crimson on hover.

export interface CategoryCardData { slug: string; name: string; blurb: string; icon: string; image?: string }

const smaller = (src: string) => src.replace(/\.webp$/, '-sm.webp');

export default function CategoryCard({ c }: { c: CategoryCardData }) {
  const photo = (sizes: string, className: string) =>
    c.image ? (
      <img
        src={c.image}
        srcSet={`${smaller(c.image)} 320w, ${c.image} 640w`}
        sizes={sizes}
        width={640}
        height={480}
        alt=""
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-slow ease-soft group-hover:scale-105 ${className}`}
      />
    ) : (
      <span className="grid h-full w-full place-items-center text-green"><Icon name={c.icon} size={32} /></span>
    );

  return (
    <Link
      to={`/shop/${c.slug}`}
      className="group flex h-full flex-col gap-2 rounded-tile border border-line bg-white p-2 pb-3 text-ink no-underline shadow-card transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-0.5 hover:shadow-raised sm:flex-row sm:items-center sm:gap-3 sm:pb-2 sm:pr-3"
    >
      <span className="block aspect-[4/3] w-full overflow-hidden rounded-card bg-mist sm:aspect-square sm:h-16 sm:w-16 sm:shrink-0">{photo('(min-width: 640px) 4rem, 8.5rem', '')}</span>
      <span className="grid min-w-0 flex-1 gap-0.5 px-1 sm:px-0">
        <strong className="text-base leading-snug text-green md:text-body">{c.name}</strong>
        <span className="hidden text-small leading-snug text-grey xl:block">{c.blurb}</span>
      </span>
      <CardArrow size="sm" className="hidden xl:grid" />
    </Link>
  );
}
