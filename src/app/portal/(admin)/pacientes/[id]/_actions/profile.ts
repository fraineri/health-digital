"use server";

import { savePatientProfileData } from "@/services/patient.service";
import { PatientProfileSchema, type SavePatientProfileInput } from "../_schemas/profile";

export type ProfileActionState = { success: boolean; error?: string } | null;

export async function savePatientProfile(
  rawInput: SavePatientProfileInput
): Promise<{ success: boolean; error?: string }> {
  const parsed = PatientProfileSchema.safeParse(rawInput);
  if (!parsed.success) {
    console.error("[savePatientProfile] Validation error:", parsed.error.format());
    return { success: false, error: "Datos de formulario inválidos" };
  }
  return savePatientProfileData(parsed.data);
}

export async function savePatientProfileAction(
  _prevState: ProfileActionState,
  data: SavePatientProfileInput
): Promise<ProfileActionState> {
  return savePatientProfile(data);
}
