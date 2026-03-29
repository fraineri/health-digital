"use client";

import { useMemo } from "react";
import { SYMPTOM_CATALOG, Symptom } from "@/domain/ayurveda/symptom-catalog";

interface SymptomChecklistProps {
  intensities: Record<string, number>;
  onChange: (intensities: Record<string, number>) => void;
}

const INTENSITY_LEVELS = [
  { value: 0, label: "0", tooltip: "Ausente", colorClass: "bg-slate-100 text-slate-400 hover:bg-slate-200" },
  { value: 1, label: "1", tooltip: "Leve", colorClass: "bg-[#d1dacd] text-[#4d5e4a] border border-[#aabda4]" },
  { value: 2, label: "2", tooltip: "Moderado", colorClass: "bg-[#f2e1c9] text-[#8c6738] border border-[#e6c8a3]" },
  { value: 3, label: "3", tooltip: "Agudo", colorClass: "bg-[#e2c4c4] text-[#8a4242] border border-[#d6a5a5]" },
];

export function SymptomChecklist({ intensities, onChange }: SymptomChecklistProps) {
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

  const handleIntensityChange = (id: string, value: number) => {
    const newIntensities = { ...intensities };
    if (value === 0) {
      delete newIntensities[id];
    } else {
      newIntensities[id] = value;
    }
    onChange(newIntensities);
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
              const currentIntensity = intensities[symptom.id] || 0;
              const isActive = currentIntensity > 0;
              
              return (
                <div 
                  key={symptom.id} 
                  className={`flex flex-col gap-2 p-3 rounded-xl border transition-all ${
                    isActive 
                      ? "bg-white border-primary/20 shadow-sm" 
                      : "bg-white border-border/40 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className={`text-sm tracking-tight ${isActive ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                      {symptom.label}
                    </span>
                    
                    {/* Segmented Control for Intensity */}
                    <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                       {INTENSITY_LEVELS.map((level) => (
                         <button
                           key={level.value}
                           type="button"
                           title={level.tooltip}
                           onClick={() => handleIntensityChange(symptom.id, level.value)}
                           className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-all ${
                             currentIntensity === level.value 
                               ? level.colorClass + " shadow-sm scale-[1.05] z-10" 
                               : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                           }`}
                         >
                           {level.label}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
