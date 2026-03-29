"use client";

import { useOptimistic, useTransition, useActionState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { AgniType, AmaLevel } from "@prisma/client";
import { Beaker, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { AgniSelector } from "../ayurveda/AgniSelector";
import { AmaIndicator } from "../ayurveda/AmaIndicator";
import { ClinicalNotesArea } from "./ClinicalNotes";
import {
  saveAgniTypeAction,
  saveAmaLevelAction,
  type ClinicalActionState
} from "@/app/portal/(admin)/pacientes/[id]/_actions/clinical";
import type { WorkspaceFormValues } from "@/domain/ayurveda/consultation-schema";

interface ClinicalSynthesisBlockProps {
  activeSymptomLabels?: string[];
}

export function ClinicalSynthesisBlock({ activeSymptomLabels = [] }: ClinicalSynthesisBlockProps) {
  const { watch, setValue } = useFormContext<WorkspaceFormValues>();

  const agniType = watch("agniType");
  const amaLevel = watch("amaLevel");
  const diagnosis = watch("diagnosis");
  const appointmentId = watch("appointmentId");

  const [, startTransition] = useTransition();

  const [agniState, agniAction] = useActionState<
    ClinicalActionState,
    { appointmentId: string; agniType: AgniType }
  >(saveAgniTypeAction, null);

  const [amaState, amaAction] = useActionState<
    ClinicalActionState,
    { appointmentId: string; amaLevel: AmaLevel }
  >(saveAmaLevelAction, null);

  const [optimisticAgni, setOptimisticAgni] = useOptimistic(agniType);
  const [optimisticAma, setOptimisticAma] = useOptimistic(amaLevel);

  useEffect(() => {
    if (!agniState) return;
    if (agniState.success) toast.success(agniState.message);
    else toast.error(agniState.error ?? agniState.message);
  }, [agniState]);

  useEffect(() => {
    if (!amaState) return;
    if (amaState.success) toast.success(amaState.message);
    else toast.error(amaState.error ?? amaState.message);
  }, [amaState]);

  const handleAgniChange = (value: AgniType) => {
    setValue("agniType", value, { shouldDirty: true });
    if (!appointmentId) return;
    startTransition(async () => {
      setOptimisticAgni(value);
      await agniAction({ appointmentId, agniType: value });
    });
  };

  const handleAmaChange = (value: AmaLevel) => {
    setValue("amaLevel", value, { shouldDirty: true });
    if (!appointmentId) return;
    startTransition(async () => {
      setOptimisticAma(value);
      await amaAction({ appointmentId, amaLevel: value });
    });
  };

  const handleDiagnosisChange = (value: string) => {
    setValue("diagnosis", value, { shouldDirty: true });
  };

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
          <AgniSelector value={optimisticAgni} onChange={handleAgniChange} />

          {/* 2. Ama Indicator */}
          <AmaIndicator value={optimisticAma} onChange={handleAmaChange} />
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
                value={diagnosis ?? ""}
                onChange={handleDiagnosisChange}
                smartTags={activeSymptomLabels}
              />
           </div>
        </div>
      </div>
    </section>
  );
}
