"use server";

import { savePatientProfileData } from "@/services/patient.service";
import { PatientProfileSchema, type SavePatientProfileInput } from "../_schemas/profile";

export type ProfileActionState = { success: boolean; message: string; error?: string } | null;

export async function savePatientProfile(
  rawInput: SavePatientProfileInput
): Promise<ProfileActionState> {
  const parsed = PatientProfileSchema.safeParse(rawInput);
  if (!parsed.success) {
    console.error("[savePatientProfile] Validation error:", parsed.error.format());
    return { success: false, message: "Datos de formulario inválidos", error: "Datos de formulario inválidos" };
  }
  const result = await savePatientProfileData(parsed.data);
  return {
    ...result,
    message: result.success ? "Perfil guardado con éxito" : (result.error ?? "Error al guardar el perfil"),
  };
}

export async function savePatientProfileAction(
  _prevState: ProfileActionState,
  data: SavePatientProfileInput
): Promise<ProfileActionState> {
  return savePatientProfile(data);
}
