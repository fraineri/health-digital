"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { Wind, Flame, Droplets, Sparkles, Activity, FileText, History, Share2, ClipboardList, BookOpen, Leaf, User, FileEdit } from "lucide-react";
import { SaveButton } from "./SaveButton";
import { AgniType } from "./AgniSelector";
import { ConsultationHistory } from "./ConsultationHistory";
import { calculateDoshaScores } from "@/lib/dosha-scoring";
import { saveConsultation, SaveConsultationInput } from "@/app/portal/(admin)/pacientes/[id]/actions";
import { DecryptedConsultation } from "@/lib/consultations";
import { DecryptedPatientProfile } from "@/lib/patient-profile";
import { SYMPTOM_CATALOG } from "@/lib/symptom-catalog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileCompletionBadge } from "./ProfileCompletionBadge";

// Extracted Tabs
import { HistoriaClinicaTab } from "./tabs/HistoriaClinicaTab";
import { EvaluacionDiagnosticoTab } from "./tabs/EvaluacionDiagnosticoTab";
import { PrescripcionIntegralTab } from "./tabs/PrescripcionIntegralTab";
import { CuadernilloTab } from "./tabs/CuadernilloTab";
import { NotasConsultaTab } from "./tabs/NotasConsultaTab";

interface PatientWorkspaceTabsProps {
  patientId: string;
  appointmentId?: string;
  initialData: DecryptedConsultation | null;
  patient: DecryptedPatientProfile;
  profileScore: number;
  reasonForVisit?: string;
  historicalConsultations?: DecryptedConsultation[];
}

export function PatientWorkspaceTabs({ 
  patientId, 
  appointmentId, 
  initialData,
  historicalConsultations = [],
  patient,
  profileScore,
  reasonForVisit
}: PatientWorkspaceTabsProps) {
  // --- 0. Tab State ---
  const [activeTab, setActiveTab] = useState("historia");

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
  
  const [agniType, setAgniType] = useState<AgniType | null>((initialData?.agniType as AgniType) || null);
  const [amaLevel, setAmaLevel] = useState<number>(initialData?.amaLevel ?? 0);

  const [notes, setNotes] = useState(initialData?.notes || "");
  const [anamnesis, setAnamnesis] = useState(initialData?.anamnesis || "");
  const [diagnosis, setDiagnosis] = useState(initialData?.diagnosis || "");

  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // --- 2. Derived State ---
  
  // Calculate engine suggestions based on current symptom intensities
  const suggestedScores = useMemo(() => calculateDoshaScores(symptomIntensities), [symptomIntensities]);
  
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
     return hasSymptoms || notes !== "" || diagnosis !== "" || vataFinal !== null || agniType !== null || amaLevel !== 0;
  }, [symptomIntensities, notes, diagnosis, vataFinal, agniType, amaLevel]);

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
        agniType,
        amaLevel,
        notes,
        anamnesis: null, // As decided, removing anamnesis from UI but maintaining in API
        diagnosis
      };

      const result = await saveConsultation(input);
      
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setErrorMsg(result.error || "Algo falló al guardar.");
      }
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-workspace">
      
      {/* Sticky Header with Actions */}
      <header className="px-10 py-8 shrink-0 flex items-start justify-between border-b border-border/40">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">{patient.name}</h1>
            <ProfileCompletionBadge 
              score={profileScore} 
              onClick={() => setActiveTab("historia")} 
            />
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <ClipboardList className="w-4 h-4" />
            <span>Motivo de consulta: {reasonForVisit || "No especificado en el cuestionario previo."}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <button className="p-2 hover:bg-slate-200 hover:text-slate-600 rounded-full transition-colors"><History className="w-5 h-5"/></button>
          <button className="p-2 hover:bg-slate-200 hover:text-slate-600 rounded-full transition-colors"><Share2 className="w-5 h-5"/></button>
        </div>
      </header>

      {/* Tabs Orchestrator */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 overflow-hidden">
        
        {/* Error Notification if any */}
        {errorMsg && (
          <div className="mx-10 mt-6 mb-2 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium shrink-0">
             Error: {errorMsg}
          </div>
        )}

        {/* Tab Bar */}
        <div className="px-10 pt-6 border-b border-border/40 bg-white/60 backdrop-blur sticky top-0 z-10 shrink-0">
          <TabsList className="bg-transparent space-x-2 h-auto p-0 flex flex-wrap gap-y-2">
             <TabsTrigger value="historia" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold rounded-full px-5 py-2.5 text-sm transition-all border border-transparent data-[state=active]:border-primary/20">
               <User className="w-4 h-4 mr-2" /> Historia Clínica
             </TabsTrigger>
             <TabsTrigger value="evaluacion" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold rounded-full px-5 py-2.5 text-sm transition-all border border-transparent data-[state=active]:border-primary/20">
               <Activity className="w-4 h-4 mr-2" /> Evaluación y Diagnóstico
             </TabsTrigger>
             <TabsTrigger value="prescripcion" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold rounded-full px-5 py-2.5 text-sm transition-all border border-transparent data-[state=active]:border-primary/20">
               <Leaf className="w-4 h-4 mr-2" /> Prescripción Integral
             </TabsTrigger>
             <TabsTrigger value="cuadernillo" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold rounded-full px-5 py-2.5 text-sm transition-all border border-transparent data-[state=active]:border-primary/20">
               <BookOpen className="w-4 h-4 mr-2" /> Cuadernillo
             </TabsTrigger>
             <TabsTrigger value="notas" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-bold rounded-full px-5 py-2.5 text-sm transition-all border border-transparent data-[state=active]:border-primary/20">
               <FileEdit className="w-4 h-4 mr-2" /> Notas de Consulta
             </TabsTrigger>
          </TabsList>
        </div>

           {/* Tab Contents Content Area */}
        <div className="flex-1 overflow-hidden relative">
           
           <TabsContent value="historia" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
             <HistoriaClinicaTab patient={patient} />
           </TabsContent>

           <TabsContent value="evaluacion" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden overflow-hidden">
             <EvaluacionDiagnosticoTab
                symptomIntensities={symptomIntensities}
                setSymptomIntensities={setSymptomIntensities}
                suggestedScores={suggestedScores}
                displayVata={displayVata}
                displayPitta={displayPitta}
                displayKapha={displayKapha}
                setVataFinal={setVataFinal}
                setPittaFinal={setPittaFinal}
                setKaphaFinal={setKaphaFinal}
                agniType={agniType}
                setAgniType={setAgniType}
                amaLevel={amaLevel}
                setAmaLevel={setAmaLevel}
                diagnosis={diagnosis}
                setDiagnosis={setDiagnosis}
                activeSymptomLabels={activeSymptomLabels}
             />
           </TabsContent>
           
           <TabsContent value="prescripcion" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
             <PrescripcionIntegralTab
               nutritionPlan={nutritionPlan}
               phytotherapy={phytotherapy}
               dailyRoutine={dailyRoutine}
               onChange={(field, val) => {
                 if (field === "nutritionPlan") setNutritionPlan(val);
                 if (field === "phytotherapy") setPhytotherapy(val);
                 if (field === "dailyRoutine") setDailyRoutine(val);
               }}
             />
           </TabsContent>

           <TabsContent value="cuadernillo" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
             <CuadernilloTab />
           </TabsContent>

           <TabsContent value="notas" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
             <NotasConsultaTab
               notes={notes}
               onNotesChange={setNotes}
               historicalConsultations={historicalConsultations}
               currentAppointmentId={appointmentId}
             />
           </TabsContent>

           {/* Floating Actions Overlay */}
           <div className="absolute bottom-8 right-10 flex flex-col items-end gap-4 pointer-events-none z-50">
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
      </Tabs>
      
    </div>
  );
}
