"use server";

import { saveConsultationData } from "@/services/consultation.service";
import type { SaveConsultationInput } from "@/services/consultation.service";

export type ConsultationActionState = { success: boolean; message: string; error?: string } | null;

export async function saveConsultation(
  input: SaveConsultationInput
): Promise<ConsultationActionState> {
  const result = await saveConsultationData(input);
  return {
    ...result,
    message: result.success ? "Consulta guardada con éxito" : (result.error ?? "Error al guardar la consulta"),
  };
}

export async function saveConsultationAction(
  _prevState: ConsultationActionState,
  input: SaveConsultationInput
): Promise<ConsultationActionState> {
  const result = await saveConsultationData(input);
  return {
    ...result,
    message: result.success ? "Consulta guardada con éxito" : (result.error ?? "Error al guardar la consulta"),
  };
}
