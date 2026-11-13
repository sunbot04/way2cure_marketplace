import type { ComponentType } from 'react';
import type { Product } from '../../data';
import { DailyArt, DevicesArt, MedArt, MobilityArt, NutritionArt, PillBoxArt, SafetyArt, UnderpadsArt } from '../brand/Illustrations';

// The illustration shown for a product until real pack shots arrive (public/IMAGE_LIST.md): a drawing
// of the product itself where there is one, otherwise its category's drawing.
type Art = ComponentType<{ className?: string }>;

const BY_ID: Record<string, Art> = { 'pill-box': PillBoxArt, underpads: UnderpadsArt };
const BY_CATEGORY: Record<string, Art> = {
  medicines: MedArt,
  devices: DevicesArt,
  'daily-care': DailyArt,
  mobility: MobilityArt,
  nutrition: NutritionArt,
  safety: SafetyArt,
};

/** The product's photo, filling its frame, with a gentle zoom when the card is hovered. */
export function ProductPhoto({ product, alt = '', sizes, eager = false }: { product: Product & { image: string }; alt?: string; sizes: string; eager?: boolean }) {
  return (
    <img
      src={product.image}
      srcSet={`${product.image.replace('.webp', '-sm.webp')} 400w, ${product.image} 800w`}
      sizes={sizes}
      alt={alt}
      width={800}
      height={800}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-slow ease-soft group-hover:scale-105"
    />
  );
}

export default function ProductArt({ product, className }: { product: Product; className?: string }) {
  const Drawing = BY_ID[product.id] ?? BY_CATEGORY[product.cat] ?? DailyArt;
  return <Drawing className={className} />;
}
