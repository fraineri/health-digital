"use server";

import { auth } from "@/auth";
import { type ActionState } from "@/lib/action-wrapper";
import { savePatientProfileData } from "@/services/patient.service";
import { PatientProfileSchema, type SavePatientProfileInput } from "../_schemas/profile";

export type { ActionState };

export async function savePatientProfileAction(
  _prevState: ActionState,
  data: SavePatientProfileInput
): Promise<ActionState> {
  const parsed = PatientProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Datos de formulario inválidos", error: "Datos de formulario inválidos" };
  }

  const session = await auth();
  const userId = session?.user?.id ?? session?.user?.email ?? "UNKNOWN";

  try {
    const result = await savePatientProfileData(parsed.data, userId);
    return result.success
      ? { success: true, message: "Perfil guardado con éxito" }
      : { success: false, message: result.error ?? "Error al guardar el perfil", error: result.error };
  } catch (error) {
    console.error("[savePatientProfileAction]", error);
    return {
      success: false,
      message: "Error al guardar el perfil",
      error: error instanceof Error ? error.message : "Error interno del servidor",
    };
  }
}
