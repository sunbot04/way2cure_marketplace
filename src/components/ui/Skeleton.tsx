// Loading placeholders. A soft opacity pulse (no moving gradient), switched off under reduced motion.
export function Skeleton({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`block animate-[w2c-pulse_1.4s_ease-in-out_infinite] rounded-btn bg-mint/60 ${className}`} />;
}

/** Same footprint as a ProductCard, so the grid does not jump when products arrive. */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-tile bg-white shadow-card">
      <Skeleton className="aspect-square rounded-none" />
      <div className="grid gap-2.5 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="mt-2 h-12 w-full" />
      </div>
    </div>
  );
}
