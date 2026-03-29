"use server";

import { saveConsultationData, SaveConsultationInput } from "@/services/consultation.service";

export type { SaveConsultationInput };

export type ConsultationActionState = { success: boolean; error?: string } | null;

export async function saveConsultation(
  input: SaveConsultationInput
): Promise<{ success: boolean; error?: string }> {
  return saveConsultationData(input);
}

export async function saveConsultationAction(
  _prevState: ConsultationActionState,
  input: SaveConsultationInput
): Promise<ConsultationActionState> {
  return saveConsultationData(input);
}
