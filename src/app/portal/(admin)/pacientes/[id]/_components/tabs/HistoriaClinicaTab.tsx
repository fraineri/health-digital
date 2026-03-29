"use client";

import { useState, lazy, Suspense } from "react";
import { User, FileText, Stethoscope } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { DecryptedPatientProfile } from "@/services/patient.service";
import { PhysicalExamData } from "@/domain/ayurveda/physical-exam";
import { DatosPerfilSubTab } from "./historia-clinica/DatosPerfilSubTab";
import { SubTabSkeleton } from "../shared/SubTabSkeleton";

const EstudiosComplementariosSubTab = lazy(() =>
  import('./historia-clinica/EstudiosComplementariosSubTab').then(m => ({
    default: m.EstudiosComplementariosSubTab
  }))
);
const ExamenFisicoSubTab = lazy(() =>
  import('./historia-clinica/ExamenFisicoSubTab').then(m => ({
    default: m.ExamenFisicoSubTab
  }))
);

interface HistoriaClinicaTabProps {
  patient: DecryptedPatientProfile;
  studyCatalog: string[];
  previousExam?: PhysicalExamData | null;
}

const triggerClassName =
  "rounded-none px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-400 border-b-2 border-transparent transition-all duration-200 hover:text-slate-600 data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent";

const contentClassName =
  "h-full m-0 p-0 outline-none ring-0 data-[state=inactive]:hidden data-[state=active]:animate-subtab-in";

export function HistoriaClinicaTab({ patient, studyCatalog, previousExam }: HistoriaClinicaTabProps) {
  const [activeSubTab, setActiveSubTab] = useState("perfil");

  return (
    <Tabs
      value={activeSubTab}
      onValueChange={setActiveSubTab}
      className="h-full flex flex-col"
    >
      {/* Sub-Tab Bar — sticky, compacto, underline style */}
      <div className="px-10 pt-4 shrink-0 bg-workspace border-b border-border/30">
        <TabsList className="bg-transparent h-auto p-0 gap-0 w-auto inline-flex">
          <TabsTrigger value="perfil" className={triggerClassName}>
            <User className="w-3.5 h-3.5 mr-1.5" />
            Datos del Perfil
          </TabsTrigger>
          <TabsTrigger value="estudios" className={triggerClassName}>
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Estudios Complementarios
          </TabsTrigger>
          <TabsTrigger value="examen" className={triggerClassName}>
            <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
            Examen Físico
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Sub-Tab Content — scrollable independiente */}
      <div className="flex-1 overflow-hidden">
        <TabsContent value="perfil" forceMount className={contentClassName}>
          <DatosPerfilSubTab patient={patient} />
        </TabsContent>
        <TabsContent value="estudios" forceMount className={contentClassName}>
          <Suspense fallback={<SubTabSkeleton />}>
            <EstudiosComplementariosSubTab studyCatalog={studyCatalog} />
          </Suspense>
        </TabsContent>
        <TabsContent value="examen" forceMount className={contentClassName}>
          <Suspense fallback={<SubTabSkeleton />}>
            <ExamenFisicoSubTab previousExam={previousExam} />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  );
}
