export function SubTabSkeleton() {
  return (
    <div className="animate-pulse p-10 space-y-6">
      <div className="h-5 w-40 bg-slate-200 rounded-lg" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-5/6 bg-slate-100 rounded" />
        <div className="h-4 w-4/6 bg-slate-100 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 bg-slate-100 rounded-xl" />
        <div className="h-32 bg-slate-100 rounded-xl" />
      </div>
      <div className="h-4 w-3/6 bg-slate-100 rounded" />
      <div className="h-4 w-4/6 bg-slate-100 rounded" />
    </div>
  );
}
