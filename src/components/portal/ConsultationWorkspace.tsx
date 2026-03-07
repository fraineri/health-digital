"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { Wind, Flame, Droplets, Sparkles, Activity } from "lucide-react";
import { DoshaSlider } from "./DoshaSlider";
import { SymptomChecklist } from "./SymptomChecklist";
import { TreatmentPlanForm } from "./TreatmentPlanForm";
import { ClinicalNotesArea } from "./ClinicalNotes";
import { SaveButton } from "./SaveButton";
import { calculateDoshaScores } from "@/lib/dosha-scoring";
import { saveConsultation, SaveConsultationInput } from "@/app/portal/(admin)/pacientes/[id]/actions";
import { DecryptedConsultation } from "@/lib/consultations";
import { SYMPTOM_CATALOG } from "@/lib/symptom-catalog";

interface ConsultationWorkspaceProps {
  patientId: string;
  appointmentId?: string;
  initialData: DecryptedConsultation | null;
}

export function ConsultationWorkspace({ 
  patientId, 
  appointmentId, 
  initialData 
}: ConsultationWorkspaceProps) {
  // --- 1. State Initialization ---
  
  // Mapping of symptom ID to its intensity (0-3)
  const rawIntensities = initialData?.symptomSnapshot;
  const initialIntensities = (typeof rawIntensities === 'object' && rawIntensities !== null && !Array.isArray(rawIntensities)) 
    ? (rawIntensities as Record<string, number>)
    : {};
  
  const [symptomIntensities, setSymptomIntensities] = useState<Record<string, number>>(initialIntensities);
  
  // Dosha manual overrides. Null means "use suggested"
  const [vataFinal, setVataFinal] = useState<number | null>(initialData?.vataFinal ?? null);
  const [pittaFinal, setPittaFinal] = useState<number | null>(initialData?.pittaFinal ?? null);
  const [kaphaFinal, setKaphaFinal] = useState<number | null>(initialData?.kaphaFinal ?? null);
  
  const [nutritionPlan, setNutritionPlan] = useState<string | null>(initialData?.nutritionPlan || null);
  const [phytotherapy, setPhytotherapy] = useState<string | null>(initialData?.phytotherapy || null);
  const [dailyRoutine, setDailyRoutine] = useState<string | null>(initialData?.dailyRoutine || null);
  
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [anamnesis, setAnamnesis] = useState(initialData?.anamnesis || "");
  const [diagnosis, setDiagnosis] = useState(initialData?.diagnosis || "");

  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // --- 2. Derived State ---
  
  // Calculate engine suggestions based on current symptom intensities
  const suggestedScores = useMemo(() => calculateDoshaScores(symptomIntensities), [symptomIntensities]);
  
  // Which values to display on the sliders (fallback to suggestion if no final override)
  // If it's a new consultation, fallback to suggestion. If we loaded existing data, and they didn't have an override, fallback to suggestion.
  // We make sure the user's manual slide adjustment is captured in Final State.
  const displayVata = vataFinal !== null ? vataFinal : suggestedScores.vata;
  const displayPitta = pittaFinal !== null ? pittaFinal : suggestedScores.pitta;
  const displayKapha = kaphaFinal !== null ? kaphaFinal : suggestedScores.kapha;

  // Extract labels for smart tags inside notes, based on selected symptoms (intensity > 0)
  const activeSymptomLabels = useMemo(() => {
    return SYMPTOM_CATALOG
      .filter(s => symptomIntensities[s.id] > 0)
      .map(s => {
        const baseLabel = s.label.split(" / ")[0];
        const intensity = symptomIntensities[s.id];
        const suffix = intensity === 3 ? " (Agudo)" : intensity === 2 ? " (Mod)" : " (Leve)";
        return `${baseLabel}${suffix}`;
      });
  }, [symptomIntensities]);

  // Protect against accidental closure if dirty
  const isDirty = useMemo(() => {
     const hasSymptoms = Object.values(symptomIntensities).some(val => val > 0);
     return hasSymptoms || notes !== "" || vataFinal !== null;
  }, [symptomIntensities, notes, vataFinal]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSuccess) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isSuccess]);

  // --- 3. Handlers ---
  
  const handleSave = () => {
    setErrorMsg(null);
    setIsSuccess(false);
    
    startTransition(async () => {
      const input: SaveConsultationInput = {
        patientId,
        appointmentId,
        symptomIntensities,
        vataFinal: displayVata,
        pittaFinal: displayPitta,
        kaphaFinal: displayKapha,
        nutritionPlan,
        phytotherapy,
        dailyRoutine,
        notes,
        anamnesis,
        diagnosis
      };

      const result = await saveConsultation(input);
      
      if (result.success) {
        setIsSuccess(true);
        // Toast notification effect implicitly handled by the SaveButton state briefly
        setTimeout(() => setIsSuccess(false), 3000); // revert button to normal after 3s
      } else {
        setErrorMsg(result.error || "Algo falló al guardar.");
      }
    });
  };

  return (
    // We render the scrollable content here so we can share the floating Save button across columns if needed
    // But as per design, Workspace lives in column 3.
    <div className="flex flex-1 overflow-hidden">
      
      {/* Split-Pane Work Area */}
      <div className="flex-1 overflow-hidden h-full w-full">
        
        {/* Error Notification if any */}
        {errorMsg && (
          <div className="mx-10 mt-6 mb-2 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium shrink-0">
             Error: {errorMsg}
          </div>
        )}

        {/* Global Grid container occupying full height */}
        <div className="grid grid-cols-12 h-full w-full">
          
          {/* ---- Left Area: Symptoms (Scrollable) ---- */}
          <div className="col-span-12 lg:col-span-4 border-r border-border/40 h-full overflow-y-auto pl-10 pr-6 pt-6 pb-40 !custom-scrollbar scroll-smooth">
            <section>
              <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase flex items-center gap-2">
                <Activity className="w-4 h-4" /> Checklist Activo
              </h3>
              <SymptomChecklist 
                intensities={symptomIntensities} 
                onChange={setSymptomIntensities} 
              />
            </section>
          </div>

          {/* ---- Right Area: Sliders & Treatment (Scrollable) ---- */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-12 h-full overflow-y-auto pl-10 pr-10 pt-6 pb-40 !custom-scrollbar scroll-smooth">
            
            {/* 1. Diagnostic */}
            <section>
              <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase">Diagnóstico Doshas (Interactivo)</h3>
              <div className="grid grid-cols-3 gap-6">
                <DoshaSlider 
                  name="Vata" 
                  element="Aire y Espacio"
                  icon={Wind}
                  bgClass="bg-vata"
                  suggestedLevel={suggestedScores.vata}
                  level={displayVata}
                  onChange={setVataFinal}
                  onReset={() => setVataFinal(null)}
                  active={displayVata > displayPitta && displayVata > displayKapha}
                />
                <DoshaSlider 
                  name="Pitta" 
                  element="Fuego y Agua"
                  icon={Flame}
                  bgClass="bg-pitta"
                  suggestedLevel={suggestedScores.pitta}
                  level={displayPitta}
                  onChange={setPittaFinal}
                  onReset={() => setPittaFinal(null)}
                  active={displayPitta > displayVata && displayPitta > displayKapha}
                />
                <DoshaSlider 
                  name="Kapha" 
                  element="Tierra y Agua"
                  icon={Droplets}
                  bgClass="bg-kapha"
                  suggestedLevel={suggestedScores.kapha}
                  level={displayKapha}
                  onChange={setKaphaFinal}
                  onReset={() => setKaphaFinal(null)}
                  active={displayKapha > displayVata && displayKapha > displayPitta}
                />
              </div>
            </section>

            {/* 2. Notes & Treatment Grid */}
            <section className="flex-1 pb-10">
              <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase">Evaluación y Plan</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Notes Column */}
                <div className="space-y-6 flex flex-col h-full">
                  <div className="flex-1 flex flex-col gap-6">
                     <ClinicalNotesArea 
                       label="Anamnesis"
                       placeholder="Síntomas iniciales, historial general..."
                       value={anamnesis}
                       onChange={setAnamnesis}
                       smartTags={activeSymptomLabels}
                     />
                     <ClinicalNotesArea 
                       label="Diagnóstico / Conclusión"
                       placeholder="Resumen del desequilibrio y enfoque terapéutico principal..."
                       value={diagnosis}
                       onChange={setDiagnosis}
                     />
                  </div>
                </div>

                {/* Treatment Column */}
                <div className="flex flex-col h-full gap-8">
                  <TreatmentPlanForm 
                    nutritionPlan={nutritionPlan}
                    phytotherapy={phytotherapy}
                    dailyRoutine={dailyRoutine}
                    onChange={(field, val) => {
                      if (field === 'nutritionPlan') setNutritionPlan(val);
                      if (field === 'phytotherapy') setPhytotherapy(val);
                      if (field === 'dailyRoutine') setDailyRoutine(val);
                    }}
                  />

                  <div className="flex-1 min-h-[160px]">
                     <ClinicalNotesArea 
                       label="Notas Adicionales"
                       placeholder="Recomendaciones extra, próximos pasos..."
                       value={notes}
                       onChange={setNotes}
                     />
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Floating Actions Overlay */}
      <div className="absolute bottom-8 right-10 flex flex-col items-end gap-4 pointer-events-none z-50">
        
        {/* Helper Pill pointing to suggested features */}
        {initialData && initialData.vataFinal !== null && (
          <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border border-border/60 shadow-sm flex items-center gap-3 pointer-events-auto">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-slate-600">Editando consulta previa</span>
          </div>
        )}
        
        <SaveButton 
          isPending={isPending} 
          isSuccess={isSuccess} 
          onClick={handleSave} 
        />
      </div>

    </div>
  );
}
