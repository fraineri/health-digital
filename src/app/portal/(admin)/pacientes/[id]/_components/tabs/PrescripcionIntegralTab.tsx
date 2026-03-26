import { Leaf } from "lucide-react";
import { TreatmentPlanForm } from "../TreatmentPlanForm";

interface PrescripcionIntegralTabProps {
  nutritionPlan: string | null;
  phytotherapy: string | null;
  dailyRoutine: string | null;
  onChange: (
    field: "nutritionPlan" | "phytotherapy" | "dailyRoutine",
    value: string
  ) => void;
}

export function PrescripcionIntegralTab({
  nutritionPlan,
  phytotherapy,
  dailyRoutine,
  onChange,
}: PrescripcionIntegralTabProps) {
  return (
    <div className="h-full m-0 p-10 overflow-y-auto !custom-scrollbar pb-40">
      <div className="w-full max-w-4xl mx-auto">
        <section className="bg-white rounded-3xl border border-border/40 shadow-sm p-10">
          <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-8 uppercase flex items-center gap-2">
            <Leaf className="w-4 h-4" /> Plan de Tratamiento
          </h3>
          <TreatmentPlanForm
            nutritionPlan={nutritionPlan}
            phytotherapy={phytotherapy}
            dailyRoutine={dailyRoutine}
            onChange={onChange}
          />
        </section>
      </div>
    </div>
  );
}
