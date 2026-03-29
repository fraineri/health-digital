import { prisma } from '@/lib/prisma';
import { decrypt, encrypt } from '@/lib/encryption';
import { Prisma, AgniType, AmaLevel } from '@prisma/client';
import { calculateDoshaScoresV2, SymptomSnapshotV2 } from '@/domain/ayurveda/dosha-scoring';
import { SymptomSnapshot } from '@/domain/ayurveda/dosha-scoring';
import { PhysicalExamData, PhysicalExamPayload, PhysicalExamPayloadSchema } from '@/domain/ayurveda/physical-exam';
import { fromPhysicalExamDB, toPhysicalExamDB } from '@/lib/physical-exam-serialization';
import { SymptomSnapshotSchema } from '@/domain/ayurveda/validation-schemas';
import { StudyPayloadEntry, DecryptedStudyEntry } from '@/domain/ayurveda/study-types';
import { revalidatePath } from 'next/cache';

export interface DecryptedConsultation {
  id: string;
  patientId: string;
  appointmentId: string | null;
  vataSuggested: number | null;
  pittaSuggested: number | null;
  kaphaSuggested: number | null;
  vataFinal: number | null;
  pittaFinal: number | null;
  kaphaFinal: number | null;
  nutritionPlan: string | null;
  phytotherapy: string | null;
  dailyRoutine: string | null;
  agniType: AgniType | null;
  amaLevel: AmaLevel | null;
  notes: string | null;
  anamnesis: string | null;
  diagnosis: string | null;
  symptomSnapshot: SymptomSnapshot | null;
  physicalExam: PhysicalExamData | null;
  createdAt: Date;
  updatedAt: Date;
}

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
  agniType: AgniType | null;
  amaLevel: AmaLevel | null;
  notes: string | null;
  anamnesis: string | null;
  diagnosis: string | null;
  studies?: StudyPayloadEntry[];
  physicalExam?: PhysicalExamPayload | null;
}

export async function getConsultationByAppointmentId(
  appointmentId: string
): Promise<DecryptedConsultation | null> {
  const consultation = await prisma.consultation.findUnique({
    where: { appointmentId },
  });

  if (!consultation) {
    return null;
  }

  const notes = consultation.encryptedNotes
    ? decrypt(consultation.encryptedNotes)
    : null;
  const anamnesis = consultation.encryptedAnamnesis
    ? decrypt(consultation.encryptedAnamnesis)
    : null;
  const diagnosis = consultation.encryptedDiagnosis
    ? decrypt(consultation.encryptedDiagnosis)
    : null;

  const physicalExam = consultation.physicalExamSnapshot
    ? fromPhysicalExamDB(consultation.physicalExamSnapshot)
    : null;

  return {
    id: consultation.id,
    patientId: consultation.patientId,
    appointmentId: consultation.appointmentId,
    vataSuggested: consultation.vataSuggested,
    pittaSuggested: consultation.pittaSuggested,
    kaphaSuggested: consultation.kaphaSuggested,
    vataFinal: consultation.vataFinal,
    pittaFinal: consultation.pittaFinal,
    kaphaFinal: consultation.kaphaFinal,
    nutritionPlan: consultation.nutritionPlan,
    phytotherapy: consultation.phytotherapy,
    dailyRoutine: consultation.dailyRoutine,
    agniType: consultation.agniType,
    amaLevel: consultation.amaLevel,
    symptomSnapshot: (() => {
      if (!consultation.symptomSnapshot) return null;
      const r = SymptomSnapshotSchema.safeParse(consultation.symptomSnapshot);
      if (!r.success) {
        console.error(
          "[getConsultationByAppointmentId] symptomSnapshot inválido:",
          r.error.format()
        );
        return null;
      }
      return r.data as SymptomSnapshot;
    })(),
    physicalExam,
    notes,
    anamnesis,
    diagnosis,
    createdAt: consultation.createdAt,
    updatedAt: consultation.updatedAt,
  };
}

export async function getConsultationsByPatientId(
  patientId: string
): Promise<DecryptedConsultation[]> {
  const consultations = await prisma.consultation.findMany({
    where: { patientId },
    orderBy: { createdAt: 'desc' },
  });

  return consultations.map(consultation => {
    const notes = consultation.encryptedNotes ? decrypt(consultation.encryptedNotes) : null;
    const anamnesis = consultation.encryptedAnamnesis ? decrypt(consultation.encryptedAnamnesis) : null;
    const diagnosis = consultation.encryptedDiagnosis ? decrypt(consultation.encryptedDiagnosis) : null;

    const physicalExam = consultation.physicalExamSnapshot
      ? fromPhysicalExamDB(consultation.physicalExamSnapshot)
      : null;

    return {
      id: consultation.id,
      patientId: consultation.patientId,
      appointmentId: consultation.appointmentId,
      vataSuggested: consultation.vataSuggested,
      pittaSuggested: consultation.pittaSuggested,
      kaphaSuggested: consultation.kaphaSuggested,
      vataFinal: consultation.vataFinal,
      pittaFinal: consultation.pittaFinal,
      kaphaFinal: consultation.kaphaFinal,
      nutritionPlan: consultation.nutritionPlan,
      phytotherapy: consultation.phytotherapy,
      dailyRoutine: consultation.dailyRoutine,
      agniType: consultation.agniType,
      amaLevel: consultation.amaLevel,
      symptomSnapshot: (() => {
        if (!consultation.symptomSnapshot) return null;
        const r = SymptomSnapshotSchema.safeParse(consultation.symptomSnapshot);
        if (!r.success) {
          console.error(
            "[getConsultationsByPatientId] symptomSnapshot inválido (id:",
            consultation.id, "):",
            r.error.format()
          );
          return null;
        }
        return r.data as SymptomSnapshot;
      })(),
      physicalExam,
      notes,
      anamnesis,
      diagnosis,
      createdAt: consultation.createdAt,
      updatedAt: consultation.updatedAt,
    };
  });
}

export async function getStudyCatalogNames(): Promise<string[]> {
  const catalog = await prisma.studyCatalog.findMany({
    select: { name: true },
    orderBy: { name: 'asc' },
  });
  return catalog.map(c => c.name);
}

export async function getLatestStudiesForPatient(
  patientId: string
): Promise<DecryptedStudyEntry[]> {
  const allStudies = await prisma.complementaryStudy.findMany({
    where: { patientId },
    orderBy: { createdAt: 'desc' },
  });

  const latestByName = new Map<string, typeof allStudies[0]>();
  for (const study of allStudies) {
    if (!latestByName.has(study.studyName)) {
      latestByName.set(study.studyName, study);
    }
  }

  return Array.from(latestByName.values()).map(s => ({
    id: s.id,
    studyName: s.studyName,
    value: decrypt(s.encryptedValue) || "",
    consultationId: s.consultationId,
    createdAt: s.createdAt,
  }));
}

export async function saveConsultationData(
  input: SaveConsultationInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const suggestedScores = calculateDoshaScoresV2(input.symptomSnapshot.distributions);

    const encryptedNotes = input.notes ? encrypt(input.notes) : null;
    const encryptedAnamnesis = input.anamnesis ? encrypt(input.anamnesis) : null;
    const encryptedDiagnosis = input.diagnosis ? encrypt(input.diagnosis) : null;

    let physicalExamSnapshot: Prisma.InputJsonValue | undefined = undefined;
    if (input.physicalExam) {
      const parsed = PhysicalExamPayloadSchema.safeParse(input.physicalExam);
      if (!parsed.success) {
        return {
          success: false,
          error: "Datos del examen físico inválidos: " + parsed.error.issues.map(i => i.message).join(", "),
        };
      }
      physicalExamSnapshot = toPhysicalExamDB(parsed.data) as unknown as Prisma.InputJsonValue;
    }

    let existingConsultation = null;
    if (input.appointmentId) {
      existingConsultation = await prisma.consultation.findUnique({
        where: { appointmentId: input.appointmentId },
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
      ...(physicalExamSnapshot !== undefined && { physicalExamSnapshot }),
    };

    if (input.studies && input.studies.length > 0) {
      for (const study of input.studies) {
        await prisma.studyCatalog.upsert({
          where: { name: study.studyName },
          update: {},
          create: { name: study.studyName },
        });
      }
    }

    await prisma.$transaction(async (tx) => {
      let consultationId: string;

      if (existingConsultation) {
        await tx.consultation.update({
          where: { id: existingConsultation.id },
          data,
        });
        consultationId = existingConsultation.id;
      } else {
        const newConsultation = await tx.consultation.create({ data });
        consultationId = newConsultation.id;
      }

      if (input.appointmentId) {
        await tx.appointment.update({
          where: { id: input.appointmentId },
          data: { status: "DONE" },
        });
      }

      if (input.studies && input.studies.length > 0) {
        const studiesWithValues = input.studies.filter(s => s.value.trim() !== "");
        if (studiesWithValues.length > 0) {
          await tx.complementaryStudy.createMany({
            data: studiesWithValues.map(s => ({
              patientId: input.patientId,
              consultationId,
              studyName: s.studyName,
              encryptedValue: encrypt(s.value),
            })),
          });
        }
      }
    });

    revalidatePath("/portal");
    revalidatePath(`/portal/pacientes/${input.patientId}`);

    return { success: true };
  } catch (error) {
    console.error("[saveConsultationData] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al guardar la consulta",
    };
  }
}

export async function saveAgniType(
  appointmentId: string,
  agniType: AgniType
): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { appointmentId },
    });

    if (!consultation) {
      return { success: true, message: "Agni registrado (pendiente de guardar consulta)" };
    }

    await prisma.consultation.update({
      where: { id: consultation.id },
      data: { agniType },
    });

    revalidatePath(`/portal/pacientes/${consultation.patientId}`);
    return { success: true, message: "Agni guardado" };
  } catch (e) {
    console.error("[saveAgniType]", e);
    return { success: false, message: "Error al guardar Agni", error: "Error interno del servidor" };
  }
}

export async function saveAmaLevel(
  appointmentId: string,
  amaLevel: AmaLevel
): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { appointmentId },
    });

    if (!consultation) {
      return { success: true, message: "Ama registrado (pendiente de guardar consulta)" };
    }

    await prisma.consultation.update({
      where: { id: consultation.id },
      data: { amaLevel },
    });

    revalidatePath(`/portal/pacientes/${consultation.patientId}`);
    return { success: true, message: "Ama guardado" };
  } catch (e) {
    console.error("[saveAmaLevel]", e);
    return { success: false, message: "Error al guardar Ama", error: "Error interno del servidor" };
  }
}
