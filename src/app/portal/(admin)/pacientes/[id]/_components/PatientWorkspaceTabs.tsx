"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Wind, Flame, Droplets, Sparkles, Activity, FileText, History, Share2, ClipboardList, BookOpen, Leaf, User, FileEdit } from "lucide-react";
import { SaveButton } from "./SaveButton";
import { ConsultationHistory } from "./ConsultationHistory";
import { calculateDoshaScoresV2, isV2Snapshot } from "@/domain/ayurveda/dosha-scoring";
import { saveConsultation, SaveConsultationInput } from "@/app/portal/(admin)/pacientes/[id]/_actions/consultation";
import { DecryptedConsultation } from "@/queries/consultations";
import { DecryptedPatientProfile } from "@/queries/patient-profile";
import { DEFAULT_PHYSICAL_EXAM } from "@/domain/ayurveda/physical-exam";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileCompletionBadge } from "./ProfileCompletionBadge";
import { WorkspaceFormValues } from "@/domain/ayurveda/consultation-schema";

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
  studyCatalog: string[];
  initialStudies: import("@/domain/ayurveda/study-types").DecryptedStudyEntry[];
}

export function PatientWorkspaceTabs({
  patientId,
  appointmentId,
  initialData,
  historicalConsultations = [],
  patient,
  profileScore,
  reasonForVisit,
  studyCatalog,
  initialStudies
}: PatientWorkspaceTabsProps) {
  // --- UI-only state (not form data) ---
  const [activeTab, setActiveTab] = useState("historia");
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // --- Form initialization ---
  const initialDistributions = (() => {
    const raw = initialData?.symptomSnapshot;
    if (!raw) return {};
    if (isV2Snapshot(raw)) return raw.distributions;
    return {};
  })();

  const methods = useForm<WorkspaceFormValues>({
    defaultValues: {
      patientId,
      appointmentId,
      symptomSnapshot: { version: 2, distributions: initialDistributions },
      vataFinal: initialData?.vataFinal ?? null,
      pittaFinal: initialData?.pittaFinal ?? null,
      kaphaFinal: initialData?.kaphaFinal ?? null,
      nutritionPlan: initialData?.nutritionPlan || null,
      phytotherapy: initialData?.phytotherapy || null,
      dailyRoutine: initialData?.dailyRoutine || null,
      agniType: initialData?.agniType || null,
      amaLevel: initialData?.amaLevel ?? null,
      notes: initialData?.notes || "",
      anamnesis: initialData?.anamnesis || "",
      diagnosis: initialData?.diagnosis || "",
      studies: initialStudies.map(s => ({
        id: crypto.randomUUID(),
        studyName: s.studyName,
        value: s.value,
        previousValue: s.value,
        previousDate: s.createdAt,
        isNew: false,
      })),
      physicalExam: initialData?.physicalExam ?? DEFAULT_PHYSICAL_EXAM,
    },
  });

  const { watch, formState: { isDirty } } = methods;

  // --- Derived state needed for submit ---
  const distributions = watch("symptomSnapshot.distributions");
  const suggestedScores = useMemo(() => calculateDoshaScoresV2(distributions), [distributions]);

  const physicalExam = watch("physicalExam");
  const hasPhysicalExamChanges = useMemo(() => {
    const e = physicalExam;
    return (
      e.weight !== null || e.height !== null ||
      e.systolicBP !== null || e.diastolicBP !== null ||
      e.heartRate !== null || e.oxygenSaturation !== null ||
      e.temperature !== null || e.respiratoryRate !== null ||
      e.tongue !== "" || e.pulse !== "" ||
      e.skinNailsEyes !== "" || e.findings !== ""
    );
  }, [physicalExam]);

  const previousExam = useMemo(() => {
    const prev = historicalConsultations.find(c => c.id !== initialData?.id);
    return prev?.physicalExam ?? null;
  }, [historicalConsultations, initialData?.id]);

  // --- Unsaved changes protection ---
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

  // --- Save handler ---
  const handleSave = () => {
    setErrorMsg(null);
    setIsSuccess(false);
    const data = methods.getValues();

    const vataFinal = data.vataFinal !== null ? data.vataFinal : suggestedScores.vata;
    const pittaFinal = data.pittaFinal !== null ? data.pittaFinal : suggestedScores.pitta;
    const kaphaFinal = data.kaphaFinal !== null ? data.kaphaFinal : suggestedScores.kapha;

    startTransition(async () => {
      const input: SaveConsultationInput = {
        patientId: data.patientId,
        appointmentId: data.appointmentId,
        symptomSnapshot: { version: 2 as const, distributions: data.symptomSnapshot.distributions },
        vataFinal,
        pittaFinal,
        kaphaFinal,
        nutritionPlan: data.nutritionPlan,
        phytotherapy: data.phytotherapy,
        dailyRoutine: data.dailyRoutine,
        agniType: data.agniType,
        amaLevel: data.amaLevel,
        notes: data.notes,
        anamnesis: null,
        diagnosis: data.diagnosis,
        studies: data.studies
          .filter(s => s.value.trim() !== "")
          .map(s => ({ studyName: s.studyName, value: s.value })),
        physicalExam: hasPhysicalExamChanges ? data.physicalExam : null,
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
    <FormProvider {...methods}>
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
               <HistoriaClinicaTab
                 patient={patient}
                 studyCatalog={studyCatalog}
                 previousExam={previousExam}
               />
             </TabsContent>

             <TabsContent value="evaluacion" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
               <EvaluacionDiagnosticoTab />
             </TabsContent>

             <TabsContent value="prescripcion" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
               <PrescripcionIntegralTab />
             </TabsContent>

             <TabsContent value="cuadernillo" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
               <CuadernilloTab />
             </TabsContent>

             <TabsContent value="notas" forceMount className="h-full m-0 p-0 outline-none data-[state=inactive]:hidden">
               <NotasConsultaTab
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
    </FormProvider>
  );
}
