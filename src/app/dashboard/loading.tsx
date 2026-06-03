import SkeletonCard from "@/components/ui/SkeletonCard";

export default function DashboardLoading() {
  return (
    <div>
      {/* TopBar skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-7 w-32 rounded-lg bg-white/5 animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-56 rounded-xl bg-white/5 animate-pulse hidden sm:block" />
          <div className="h-9 w-9 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-9 w-9 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        <SkeletonCard className="col-span-1 md:col-span-2 h-48" />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard className="col-span-1 md:col-span-2 lg:col-span-3 h-44" />
      </div>
    </div>
  );
}
