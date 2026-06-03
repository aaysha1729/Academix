import SkeletonCard from '@/components/ui/SkeletonCard';

export default function CoursesLoading() {
  return (
    <div>
      {/* TopBar skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-7 w-28 rounded-lg bg-white/5 animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-56 rounded-xl bg-white/5 animate-pulse hidden sm:block" />
          <div className="h-9 w-9 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-9 w-9 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>

      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="h-8 w-44 rounded-lg bg-white/5 animate-pulse" />
          <div className="h-4 w-72 rounded bg-white/5 animate-pulse mt-2" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-28 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-9 w-32 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton — 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
