"use server";

import type { AgniType, AmaLevel } from "@prisma/client";
import { auth } from "@/auth";
import { type ActionState } from "@/lib/action-wrapper";
import { saveAgniType, saveAmaLevel } from "@/services/consultation.service";

export async function saveAgniTypeAction(
  _prevState: ActionState,
  input: { appointmentId: string; agniType: AgniType }
): Promise<ActionState> {
  const session = await auth();
  const userId = session?.user?.id ?? session?.user?.email ?? "UNKNOWN";
  return saveAgniType(input.appointmentId, input.agniType, userId);
}

export async function saveAmaLevelAction(
  _prevState: ActionState,
  input: { appointmentId: string; amaLevel: AmaLevel }
): Promise<ActionState> {
  const session = await auth();
  const userId = session?.user?.id ?? session?.user?.email ?? "UNKNOWN";
  return saveAmaLevel(input.appointmentId, input.amaLevel, userId);
}
