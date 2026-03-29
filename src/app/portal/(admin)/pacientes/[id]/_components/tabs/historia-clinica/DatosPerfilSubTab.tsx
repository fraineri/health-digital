import type { DecryptedPatientProfile } from "@/services/patient.service";
import { PatientProfileForm } from "../../PatientProfileForm";

interface DatosPerfilSubTabProps {
  patient: DecryptedPatientProfile;
}

export function DatosPerfilSubTab({ patient }: DatosPerfilSubTabProps) {
  return (
    <div className="h-full m-0 p-10 overflow-y-auto !custom-scrollbar pb-40">
      <div className="w-full max-w-4xl mx-auto">
        <PatientProfileForm patient={patient} />
      </div>
    </div>
  );
}
