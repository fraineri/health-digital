"use client";

import { ChevronDown } from "lucide-react";

interface TreatmentPlanFormProps {
  nutritionPlan: string | null;
  phytotherapy: string | null;
  dailyRoutine: string | null;
  onChange: (field: "nutritionPlan" | "phytotherapy" | "dailyRoutine", value: string) => void;
}

// Opciones hardcodeadas (MVP) - A iterar en futuros sprints
const NUTRITION_OPTIONS = [
  "No especificado",
  "Dieta Anti-Vata (Pacificadora) - Caliente, untuosa, nutritiva",
  "Dieta Anti-Pitta (Pacificadora) - Fresca, dulce, amarga",
  "Dieta Anti-Kapha (Pacificadora) - Ligera, seca, picante",
  "Dieta Tridoshica - Equilibrada, sátvica",
  "Ayuno Intermitente Suave (12/12)",
  "Monodieta de Kitchari (3 días)"
];

const PHYTO_OPTIONS = [
  "No especificado",
  "Triphala (Noche, regularidad)",
  "Ashwagandha (Noche, estrés/Vata)",
  "Brahmi / Gotu Kola (Día, enfoque/mente)",
  "Shatavari (Nutrición femenina/Pitta)",
  "Tulsi / Holy Basil (Inmunidad/Kapha)",
  "Guggulu (Articulaciones/Colesterol)",
  "Cúrcuma + Pimienta Negra (Antiinflamatorio)"
];

const ROUTINE_OPTIONS = [
  "No especificado",
  "Dinacharya Vata: Abhyanga con aceite sésamo + Yoga suave",
  "Dinacharya Pitta: Abhyanga con aceite coco + Meditación lunar",
  "Dinacharya Kapha: Cepillado en seco (Garshana) + Ejercicio vigoroso",
  "Raspado de lengua (Jihwa Prakshalana) diario",
  "Oil Pulling (Gandusha) 10 min mañana",
  "Pranayama: Nadi Shodhana (Respiración Alterna)",
  "Higiene del sueño: Desconectar pantallas 21h"
];

export function TreatmentPlanForm({
  nutritionPlan,
  phytotherapy,
  dailyRoutine,
  onChange,
}: TreatmentPlanFormProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Enfoque Nutricional</label>
        <div className="relative">
          <select 
            value={nutritionPlan || "No especificado"}
            onChange={(e) => onChange("nutritionPlan", e.target.value)}
            className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer"
          >
            {NUTRITION_OPTIONS.map(opt => (
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
            onChange={(e) => onChange("phytotherapy", e.target.value)}
            className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer"
          >
            {PHYTO_OPTIONS.map(opt => (
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
            onChange={(e) => onChange("dailyRoutine", e.target.value)}
            className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm cursor-pointer"
          >
            {ROUTINE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
