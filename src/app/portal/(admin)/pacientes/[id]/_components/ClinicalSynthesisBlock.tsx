"use client";

import type { AgniType, AmaLevel } from "@prisma/client";
import { Beaker, ClipboardList } from "lucide-react";
import { AgniSelector } from "./AgniSelector";
import { AmaIndicator } from "./AmaIndicator";
import { ClinicalNotesArea } from "./ClinicalNotes";

interface ClinicalSynthesisBlockProps {
  agniType: AgniType | null;
  amaLevel: AmaLevel | null;
  diagnosis: string;
  onAgniChange: (value: AgniType) => void;
  onAmaChange: (value: AmaLevel) => void;
  onDiagnosisChange: (value: string) => void;
  activeSymptomLabels?: string[];
}

export function ClinicalSynthesisBlock({
  agniType,
  amaLevel,
  diagnosis,
  onAgniChange,
  onAmaChange,
  onDiagnosisChange,
  activeSymptomLabels = [],
}: ClinicalSynthesisBlockProps) {
  return (
    <section className="bg-white rounded-3xl border border-border/40 shadow-sm overflow-hidden mb-8">
      {/* Header Section */}
      <div className="bg-sidebar/5 px-6 py-4 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Beaker className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
            Síntesis Clínica Integrativa
          </h3>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full border border-border/40">
           Justificación del Tratamiento
        </div>
      </div>

      <div className="p-8 space-y-10">
        
        {/* Controls Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* 1. Agni Selection */}
          <AgniSelector value={agniType} onChange={onAgniChange} />
          
          {/* 2. Ama Indicator */}
          <AmaIndicator value={amaLevel} onChange={onAmaChange} />
        </div>

        {/* Separator with icon */}
        <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-200">
               <ClipboardList className="w-4 h-4" />
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* 3. Integrative Diagnosis Textarea */}
        <div className="space-y-4">
           <div className="flex flex-col gap-1">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Diagnóstico Integrativo</h4>
              <p className="text-[11px] text-slate-400 font-medium">Combina hallazgos clínicos (occidental) y desequilibrios ayurvédicos.</p>
           </div>
           
           <div className="h-[220px]">
              <ClinicalNotesArea 
                label="Diagnóstico y Conclusión"
                placeholder="Ej. Gastritis erosiva leve con Pitta Vikriti agudo..."
                value={diagnosis}
                onChange={onDiagnosisChange}
                smartTags={activeSymptomLabels}
              />
           </div>
        </div>
      </div>
    </section>
  );
}
