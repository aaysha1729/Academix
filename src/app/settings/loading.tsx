import SkeletonCard from '@/components/ui/SkeletonCard';

export default function SettingsLoading() {
  return (
    <div>
      {/* TopBar skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-7 w-28 rounded-lg bg-white/5 animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-56 rounded-xl bg-white/5 animate-pulse hidden sm:block" />
          <div className="h-9 w-20 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-9 w-28 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-9 w-9 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-9 w-9 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>

      {/* Header skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-8 w-36 rounded-lg bg-white/5 animate-pulse" />
        <div className="h-4 w-72 rounded bg-white/5 animate-pulse" />
      </div>

      {/* 2×2 grid of cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        <SkeletonCard className="h-56" />
        <SkeletonCard className="h-56" />
        <SkeletonCard className="h-56" />
        <SkeletonCard className="h-56" />
      </div>
    </div>
  );
}
