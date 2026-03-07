"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";
import { calculateDoshaScores } from "@/lib/dosha-scoring";
import { revalidatePath } from "next/cache";

export interface SaveConsultationInput {
  patientId: string;
  appointmentId?: string;
  symptomIntensities: Record<string, number>;
  vataFinal: number;
  pittaFinal: number;
  kaphaFinal: number;
  nutritionPlan: string | null;
  phytotherapy: string | null;
  dailyRoutine: string | null;
  notes: string | null;          // Plain text
  anamnesis: string | null;      // Plain text
  diagnosis: string | null;      // Plain text
}

export async function saveConsultation(
  input: SaveConsultationInput
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Recalcular scores sugeridos usando la función pura
    const suggestedScores = calculateDoshaScores(input.symptomIntensities);

    // 2. Encriptar notas y campos clínicos
    const encryptedNotes = input.notes ? encrypt(input.notes) : null;
    const encryptedAnamnesis = input.anamnesis ? encrypt(input.anamnesis) : null;
    const encryptedDiagnosis = input.diagnosis ? encrypt(input.diagnosis) : null;

    // 3. Crear o actualizar la consulta
    // Si tenemos appointmentId, lo usamos para el upsert (ya que la relación es unívoca / 1:1 conceptualmente)
    // Prisma tipifica el unqiue en el schema para appointmentId
    
    // Determinamos si vamos a actualizar o crear
    let existingConsultation = null;
    
    if (input.appointmentId) {
       existingConsultation = await prisma.consultation.findUnique({
          where: { appointmentId: input.appointmentId }
       });
    }

    const data = {
      patientId: input.patientId,
      appointmentId: input.appointmentId || undefined,
      vataSuggested: suggestedScores.vata,
      pittaSuggested: suggestedScores.pitta,
      kaphaSuggested: suggestedScores.kapha,
      vataFinal: input.vataFinal,
      pittaFinal: input.pittaFinal,
      kaphaFinal: input.kaphaFinal,
      nutritionPlan: input.nutritionPlan,
      phytotherapy: input.phytotherapy,
      dailyRoutine: input.dailyRoutine,
      symptomSnapshot: input.symptomIntensities, // JSON mapping for audit tracking
      encryptedNotes,
      encryptedAnamnesis,
      encryptedDiagnosis,
    };

    // Usamos una transacción para guardar la consulta y actualizar el turno a DONE atómicamente
    await prisma.$transaction(async (tx) => {
      if (existingConsultation) {
        await tx.consultation.update({
          where: { id: existingConsultation.id },
          data
        });
      } else {
        await tx.consultation.create({
          data
        });
      }

      // 4. Marcar Cita como Terminada ("DONE")
      if (input.appointmentId) {
        await tx.appointment.update({
          where: { id: input.appointmentId },
          data: { status: "DONE" }
        });
      }
    });

    // 5. Invalidar caché del inbox y detail page para refrescar los datos
    revalidatePath("/portal"); 
    revalidatePath(`/portal/pacientes/${input.patientId}`);

    return { success: true };
    
  } catch (error) {
    console.error("[saveConsultation] Error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Error desconocido al guardar la consulta" 
    };
  }
}
