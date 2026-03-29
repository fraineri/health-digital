export function PatientSkeleton() {
  return (
    <div className="flex flex-col h-full w-full bg-workspace animate-pulse">
      {/* Header */}
      <div className="px-10 py-8 border-b border-border/40 flex items-start justify-between shrink-0">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="h-10 w-64 bg-slate-200 rounded-xl" />
            <div className="h-6 w-24 bg-slate-200 rounded-full" />
          </div>
          <div className="h-4 w-80 bg-slate-200 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-9 w-9 bg-slate-200 rounded-full" />
          <div className="h-9 w-9 bg-slate-200 rounded-full" />
        </div>
      </div>

      {/* Tab Bar */}
      <div className="px-10 pt-6 pb-4 border-b border-border/40 shrink-0">
        <div className="flex gap-2">
          {[140, 180, 160, 120, 160].map((w, i) => (
            <div key={i} className="h-10 bg-slate-200 rounded-full" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10 space-y-6">
        <div className="bg-white rounded-3xl border border-border/40 p-8 space-y-5">
          <div className="h-6 w-48 bg-slate-200 rounded-lg" />
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-5/6 bg-slate-100 rounded" />
          <div className="h-4 w-4/6 bg-slate-100 rounded" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="h-11 bg-slate-100 rounded-xl" />
            <div className="h-11 bg-slate-100 rounded-xl" />
            <div className="h-11 bg-slate-100 rounded-xl" />
            <div className="h-11 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
