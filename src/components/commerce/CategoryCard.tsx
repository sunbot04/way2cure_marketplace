import { Link } from 'react-router-dom';
import Icon from '../Icon';

// Shop-page category tile with a real photo (stock until the product shoot, see
// public/images/categories/CREDITS.md). Kept small, like a marketplace category strip, so the
// products stay near the top: photo above, name below. All eight sit in one row from 1024px;
// below that they form a row you swipe. The whole tile is one link; the photo zooms a little on
// hover. The blurb is the link's tooltip.

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
      title={c.blurb}
      className="group flex h-full flex-col gap-2 rounded-tile border border-line bg-white p-1.5 pb-2.5 text-center text-ink no-underline shadow-card transition-[transform,box-shadow] duration-micro ease-soft hover:-translate-y-0.5 hover:shadow-raised"
    >
      <span className="block h-[4.5rem] w-full overflow-hidden rounded-card bg-mist lg:h-20">{photo('(min-width: 1024px) 10rem, 7.5rem', '')}</span>
      <strong className="flex flex-1 items-center justify-center px-1 text-small font-bold leading-snug text-green">{c.name}</strong>
    </Link>
  );
}
