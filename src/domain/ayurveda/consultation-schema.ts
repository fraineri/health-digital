import { z } from "zod";

import { PhysicalExamPayloadSchema } from "./physical-exam";

// ---------------------------------------------------------------------------
// ConsultationSchema — single source of truth for workspace form validation.
// Matches the SaveConsultationInput interface consumed by the server action.
// ---------------------------------------------------------------------------

export const ConsultationSchema = z.object({
  patientId: z.string().uuid(),
  appointmentId: z.string().uuid().optional(),

  // Dosha evaluation (SymptomSnapshotV2)
  symptomSnapshot: z.object({
    version: z.literal(2),
    distributions: z.record(
      z.string(),
      z.object({
        vata: z.number().min(0).max(5),
        pitta: z.number().min(0).max(5),
        kapha: z.number().min(0).max(5),
      }),
    ),
  }),

  // Final dosha scores (0-100)
  vataFinal: z.number().min(0).max(100),
  pittaFinal: z.number().min(0).max(100),
  kaphaFinal: z.number().min(0).max(100),

  // Treatment plan
  nutritionPlan: z.string().nullable(),
  phytotherapy: z.string().nullable(),
  dailyRoutine: z.string().nullable(),

  // Ayurvedic indicators
  agniType: z.enum(["SAMA", "VISHAMA", "TIKSHNA", "MANDA"]).nullable(),
  amaLevel: z.number().int().min(0).max(3).nullable(),

  // Clinical notes (encrypted server-side)
  notes: z.string().nullable(),
  anamnesis: z.string().nullable(),
  diagnosis: z.string().nullable(),

  // Complementary studies
  studies: z
    .array(
      z.object({
        studyName: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .optional(),

  // Physical exam — reuses the canonical schema from physical-exam.ts
  physicalExam: PhysicalExamPayloadSchema.nullable().optional(),
});

export type ConsultationFormValues = z.infer<typeof ConsultationSchema>;
