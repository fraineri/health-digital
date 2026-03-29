"use server";

import { auth } from "@/auth";
import { type ActionState } from "@/lib/action-wrapper";
import { saveConsultationData, type SaveConsultationInput } from "@/services/consultation.service";

export async function saveConsultationAction(
  _prevState: ActionState,
  input: SaveConsultationInput
): Promise<ActionState> {
  const session = await auth();
  const userId = session?.user?.id ?? session?.user?.email ?? "UNKNOWN";

  try {
    const result = await saveConsultationData(input, userId);
    return result.success
      ? { success: true, message: "Consulta guardada con éxito" }
      : { success: false, message: result.error ?? "Error al guardar la consulta", error: result.error };
  } catch (error) {
    console.error("[saveConsultationAction]", error);
    return {
      success: false,
      message: "Error al guardar la consulta",
      error: error instanceof Error ? error.message : "Error interno del servidor",
    };
  }
}
