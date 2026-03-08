"use client";

import { useState } from "react";
import { ProfileCompletionBadge } from "./ProfileCompletionBadge";
import { PatientProfileSheet } from "./PatientProfileSheet";
import { DecryptedPatientProfile } from "@/lib/patient-profile";

interface PatientProfileTriggerProps {
  patient: DecryptedPatientProfile;
  score: number;
}

export function PatientProfileTrigger({ patient, score }: PatientProfileTriggerProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <ProfileCompletionBadge 
        score={score} 
        onClick={() => setIsSheetOpen(true)} 
      />
      
      <PatientProfileSheet 
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        patient={patient}
      />
    </>
  );
}
