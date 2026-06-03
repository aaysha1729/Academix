export default function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-[#151820] border border-white/5 p-6 animate-pulse ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-xl bg-white/5" />
        <div className="h-5 w-20 rounded-md bg-white/5" />
      </div>
      <div className="space-y-3 mt-6">
        <div className="h-4 w-3/4 rounded bg-white/5" />
        <div className="h-3 w-1/2 rounded bg-white/5" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-white/5" />
        <div className="h-3 w-8 rounded bg-white/5" />
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-white/5" />
    </div>
  );
}
