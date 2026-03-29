"use server";

import type { AgniType, AmaLevel } from "@prisma/client";
import { saveAgniType, saveAmaLevel } from "@/services/consultation.service";

export type ClinicalActionState = {
  success: boolean;
  message: string;
  error?: string;
} | null;

export async function saveAgniTypeAction(
  _prevState: ClinicalActionState,
  input: { appointmentId: string; agniType: AgniType }
): Promise<ClinicalActionState> {
  return saveAgniType(input.appointmentId, input.agniType);
}

export async function saveAmaLevelAction(
  _prevState: ClinicalActionState,
  input: { appointmentId: string; amaLevel: AmaLevel }
): Promise<ClinicalActionState> {
  return saveAmaLevel(input.appointmentId, input.amaLevel);
}
