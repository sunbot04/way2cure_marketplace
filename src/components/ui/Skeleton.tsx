// Loading placeholders. A soft opacity pulse (no moving gradient), switched off under reduced motion.
export function Skeleton({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`block animate-[w2c-pulse_1.4s_ease-in-out_infinite] rounded-btn bg-mint/60 ${className}`} />;
}

/** Same footprint as a ProductCard, so nothing jumps when products arrive. */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-[1.125rem] border border-line bg-white p-1.5 md:rounded-[1.375rem] md:p-2.5">
      <Skeleton className="h-[8.75rem] rounded-[0.875rem] md:h-[12.5rem] md:rounded-tile" />
      <div className="grid gap-2 px-1 pb-1 pt-3 md:px-1.5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-1/2" />
        <div className="mt-2 flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-10 w-10 rounded-xl md:w-20" />
        </div>
      </div>
    </div>
  );
}
