import { PatientSkeleton } from "./_components/shared/PatientSkeleton";

export default function PatientLoading() {
  return (
    <>
      {/* Columna 2: Inbox skeleton */}
      <div className="w-80 shrink-0 h-full bg-slate-100 border-r border-border/40 animate-pulse" />

      {/* Columna 3: Workspace skeleton */}
      <div className="flex-1 bg-workspace relative flex flex-col h-full overflow-hidden">
        <PatientSkeleton />
      </div>
    </>
  );
}
