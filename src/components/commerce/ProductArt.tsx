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

export default function ProductArt({ product, className }: { product: Product; className?: string }) {
  const Drawing = BY_ID[product.id] ?? BY_CATEGORY[product.cat] ?? DailyArt;
  return <Drawing className={className} />;
}
