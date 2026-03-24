import { FileText } from "lucide-react";
import { PatientProfileForm } from "../PatientProfileForm";
import { DecryptedPatientProfile } from "@/lib/patient-profile";

interface HistoriaClinicaTabProps {
  patient: DecryptedPatientProfile;
}

export function HistoriaClinicaTab({ patient }: HistoriaClinicaTabProps) {
  return (
    <div className="h-full m-0 p-10 overflow-y-auto !custom-scrollbar flex flex-col gap-8 pb-40">
      <div className="w-full max-w-4xl mx-auto">
        <PatientProfileForm patient={patient} />
      </div>

      {/* Studies Placeholder */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-border/40 p-12 flex flex-col items-center justify-center text-center gap-4 text-slate-400 shadow-sm">
        <FileText className="w-10 h-10 opacity-30 mb-2" />
        <div>
          <h3 className="text-base font-bold text-slate-600 mb-1">
            Estudios Complementarios
          </h3>
          <p className="text-sm font-medium">
            Visualización de laboratorios e imágenes médicas (Próximamente)
          </p>
        </div>
      </div>
    </div>
  );
}
