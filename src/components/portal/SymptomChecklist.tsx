"use client";

import { useMemo } from "react";
import { SYMPTOM_CATALOG, Symptom } from "@/lib/symptom-catalog";

interface SymptomChecklistProps {
  checkedIds: string[];
  onChange: (ids: string[]) => void;
}

export function SymptomChecklist({ checkedIds, onChange }: SymptomChecklistProps) {
  // Agragupamos síntomas por categoría
  const groupedSymptoms = useMemo(() => {
    return SYMPTOM_CATALOG.reduce((acc, symptom) => {
      if (!acc[symptom.category]) {
        acc[symptom.category] = [];
      }
      acc[symptom.category].push(symptom);
      return acc;
    }, {} as Record<string, Symptom[]>);
  }, []);

  const handleToggle = (id: string) => {
    if (checkedIds.includes(id)) {
      onChange(checkedIds.filter((checkedId) => checkedId !== id));
    } else {
      onChange([...checkedIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedSymptoms).map(([category, symptoms]) => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-bold tracking-wider text-slate-800 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 block" />
            {category}
          </h4>
          <div className="space-y-2.5">
            {symptoms.map((symptom) => {
              const checked = checkedIds.includes(symptom.id);
              
              return (
                <label 
                  key={symptom.id} 
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    checked 
                      ? "bg-primary/5 border-primary/30 shadow-sm" 
                      : "bg-white border-border/40 hover:bg-slate-50 hover:border-border/80"
                  }`}
                >
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-5 h-5 rounded-[4px] border-2 border-slate-300 checked:bg-primary checked:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1 cursor-pointer"
                      checked={checked}
                      onChange={() => handleToggle(symptom.id)}
                    />
                    <svg
                      className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className={`text-sm tracking-tight ${checked ? "text-slate-800 font-medium" : "text-slate-600"}`}>
                    {symptom.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
