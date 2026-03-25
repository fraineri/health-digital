"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";
import { calculateDoshaScoresV2, SymptomSnapshotV2 } from "@/lib/dosha-scoring";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { StudyPayloadEntry } from "@/lib/study-catalog";

export interface SaveConsultationInput {
  patientId: string;
  appointmentId?: string;
  symptomSnapshot: SymptomSnapshotV2;
  vataFinal: number;
  pittaFinal: number;
  kaphaFinal: number;
  nutritionPlan: string | null;
  phytotherapy: string | null;
  dailyRoutine: string | null;
  agniType: string | null;
  amaLevel: number | null;
  notes: string | null;          // Plain text
  anamnesis: string | null;      // Plain text
  diagnosis: string | null;      // Plain text
  studies?: StudyPayloadEntry[];  // Estudios complementarios (opcional)
}

export async function saveConsultation(
  input: SaveConsultationInput
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Recalcular scores sugeridos usando la función pura
    const suggestedScores = calculateDoshaScoresV2(input.symptomSnapshot.distributions);

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
      agniType: input.agniType,
      amaLevel: input.amaLevel,
      symptomSnapshot: input.symptomSnapshot as unknown as Prisma.InputJsonValue,
      encryptedNotes,
      encryptedAnamnesis,
      encryptedDiagnosis,
    };

    // 4. Upsert StudyCatalog para nombres nuevos ANTES de la transaccion
    // (operacion idempotente, no necesita ser atomica con el guardado clinico)
    if (input.studies && input.studies.length > 0) {
      for (const study of input.studies) {
        await prisma.studyCatalog.upsert({
          where: { name: study.studyName },
          update: {},
          create: { name: study.studyName }
        });
      }
    }

    // Usamos una transacción para guardar la consulta y actualizar el turno a DONE atómicamente
    await prisma.$transaction(async (tx) => {
      let consultationId: string;

      if (existingConsultation) {
        await tx.consultation.update({
          where: { id: existingConsultation.id },
          data
        });
        consultationId = existingConsultation.id;
      } else {
        const newConsultation = await tx.consultation.create({
          data
        });
        consultationId = newConsultation.id;
      }

      // 5. Marcar Cita como Terminada ("DONE")
      if (input.appointmentId) {
        await tx.appointment.update({
          where: { id: input.appointmentId },
          data: { status: "DONE" }
        });
      }

      // 6. Persistir Estudios Complementarios con valores encriptados
      if (input.studies && input.studies.length > 0) {
        const studiesWithValues = input.studies.filter(s => s.value.trim() !== "");

        if (studiesWithValues.length > 0) {
          await tx.complementaryStudy.createMany({
            data: studiesWithValues.map(s => ({
              patientId: input.patientId,
              consultationId,
              studyName: s.studyName,
              encryptedValue: encrypt(s.value)
            }))
          });
        }
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
