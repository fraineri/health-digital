import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/encryption';
import type { AgniType, AmaLevel } from '@prisma/client';
import { SymptomSnapshot } from '@/domain/ayurveda/dosha-scoring';
import { PhysicalExamData } from '@/domain/ayurveda/physical-exam';
import { fromPhysicalExamDB } from '@/lib/physical-exam-serialization';
import { SymptomSnapshotSchema } from '@/domain/ayurveda/validation-schemas';

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

/**
 * Obtiene una consulta por ID de turno (appointmentId) y descifra
 * sus campos sensibles (notes, anamnesis, diagnosis) on-the-fly.
 */
export async function getConsultationByAppointmentId(
  appointmentId: string
): Promise<DecryptedConsultation | null> {
  const consultation = await prisma.consultation.findUnique({
    where: { appointmentId },
  });

  if (!consultation) {
    return null;
  }

  // Descifrar campos just-in-time
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

/**
 * Obtiene todas las consultas históricas de un paciente, ordenadas de más reciente a más antigua.
 * Útil para la pestaña de "Notas de Consulta" (modo solo lectura).
 */
export async function getConsultationsByPatientId(
  patientId: string
): Promise<DecryptedConsultation[]> {
  const consultations = await prisma.consultation.findMany({
    where: { patientId },
    orderBy: { createdAt: 'desc' },
  });

  return consultations.map(consultation => {
    // Descifrar campos just-in-time
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
