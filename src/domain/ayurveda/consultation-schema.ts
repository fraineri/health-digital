import { z } from "zod";
import { AgniType, AmaLevel } from "@prisma/client";

import { PhysicalExamPayloadSchema, PhysicalExamData } from "./physical-exam";
import { AttributeDistributions } from "./attribute-catalog";
import { StudyEntry } from "./study-types";

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
  agniType: z.nativeEnum(AgniType).nullable(),
  amaLevel: z.nativeEnum(AmaLevel).nullable(),

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

// ---------------------------------------------------------------------------
// WorkspaceFormValues — internal form state for PatientWorkspaceTabs.
// Superset of ConsultationFormValues: includes UI-only fields (StudyEntry
// metadata, nullable dosha overrides, PhysicalExamData always present).
// Transformed to SaveConsultationInput at submit time.
// ---------------------------------------------------------------------------

export interface WorkspaceFormValues {
  patientId: string;
  appointmentId?: string;
  symptomSnapshot: { version: 2; distributions: AttributeDistributions };
  vataFinal: number | null;
  pittaFinal: number | null;
  kaphaFinal: number | null;
  nutritionPlan: string | null;
  phytotherapy: string | null;
  dailyRoutine: string | null;
  agniType: AgniType | null;
  amaLevel: AmaLevel | null;
  notes: string;
  anamnesis: string;
  diagnosis: string;
  studies: StudyEntry[];
  physicalExam: PhysicalExamData;
}
