"use client";

import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import type { WorkspaceFormValues } from "@/domain/ayurveda/consultation-schema";
import { TREATMENT_PLAN_OPTIONS } from "@/constants/ui-texts";

export function TreatmentPlanForm() {
  const { watch, setValue } = useFormContext<WorkspaceFormValues>();

  const nutritionPlan = watch("nutritionPlan");
  const phytotherapy = watch("phytotherapy");
  const dailyRoutine = watch("dailyRoutine");

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Enfoque Nutricional</label>
        <div className="relative">
          <select
            value={nutritionPlan || "No especificado"}
            onChange={(e) => setValue("nutritionPlan", e.target.value, { shouldDirty: true })}
            className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer"
          >
            {TREATMENT_PLAN_OPTIONS.NUTRITION.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Fitoterapia & Suplementos</label>
        <div className="relative">
          <select
            value={phytotherapy || "No especificado"}
            onChange={(e) => setValue("phytotherapy", e.target.value, { shouldDirty: true })}
            className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer"
          >
            {TREATMENT_PLAN_OPTIONS.PHYTOTHERAPY.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Rutina Sugerida (Dinacharya)</label>
        <div className="relative">
          <select
            value={dailyRoutine || "No especificado"}
            onChange={(e) => setValue("dailyRoutine", e.target.value, { shouldDirty: true })}
            className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer"
          >
            {TREATMENT_PLAN_OPTIONS.DAILY_ROUTINE.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
