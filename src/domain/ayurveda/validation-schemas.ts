import { z } from "zod";

// ─── Schema para PhysicalExamSnapshotDB ────────────────────────────────────
// Valida el JSON almacenado en Consultation.physicalExamSnapshot al leer desde DB.
// Los campos numéricos se guardan en plano; los de texto se guardan encriptados.
export const PhysicalExamSnapshotDBSchema = z.object({
  // A. Antropometría (plain)
  weight:           z.number().nullable(),
  height:           z.number().nullable(),
  // B. Signos Vitales (plain)
  systolicBP:       z.number().int().nullable(),
  diastolicBP:      z.number().int().nullable(),
  heartRate:        z.number().int().nullable(),
  oxygenSaturation: z.number().int().nullable(),
  temperature:      z.number().nullable(),
  respiratoryRate:  z.number().int().nullable(),
  // C. Examen Integrativo Ayurveda (encriptado)
  encryptedTongue:        z.string().nullable(),
  encryptedPulse:         z.string().nullable(),
  encryptedSkinNailsEyes: z.string().nullable(),
  // D. Hallazgos Clínicos (encriptado)
  encryptedFindings:      z.string().nullable(),
});

export type PhysicalExamSnapshotDB = z.infer<typeof PhysicalExamSnapshotDBSchema>;

// ─── Schema para SymptomSnapshot (union V1 / V2) ────────────────────────────
// Valida el JSON almacenado en Consultation.symptomSnapshot.
// V1 (legado): Record plano de symptomId → intensidad (number)
// V2 (actual): { version: 2, distributions: { attrId: { vata, pitta, kapha } } }
const SymptomSnapshotV1Schema = z.record(z.string(), z.number());

const SymptomSnapshotV2Schema = z.object({
  version: z.literal(2),
  distributions: z.record(
    z.string(),
    z.object({
      vata:  z.number(),
      pitta: z.number(),
      kapha: z.number(),
    })
  ),
});

// Intentar V2 primero (más restrictivo), luego V1 como fallback
export const SymptomSnapshotSchema = z.union([
  SymptomSnapshotV2Schema,
  SymptomSnapshotV1Schema,
]);

export type SymptomSnapshotParsed = z.infer<typeof SymptomSnapshotSchema>;

// ─── Schema para Patient.lifestyle JSON ────────────────────────────────────
// Valida el campo lifestyle al leer un Patient desde DB.
// Todos los campos son opcionales; el objeto completo puede ser null.
export const LifestyleSchema = z
  .object({
    dietType:           z.string().optional(),
    exerciseFrequency:  z.string().optional(),
    sleepQuality:       z.string().optional(),
    smokingStatus:      z.string().optional(),
    alcoholConsumption: z.string().optional(),
    stressLevel:        z.string().optional(),
    anxietyLevel:       z.string().optional(),
  })
  .nullable();

export type LifestyleParsed = z.infer<typeof LifestyleSchema>;
