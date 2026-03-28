import { z } from "zod";

export const PatientProfileSchema = z.object({
  patientId: z.string().uuid(),
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  bloodType: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  medicalHistory: z.string().optional().nullable(),
  allergies: z.string().optional().nullable(),
  lifestyle: z.object({
    dietType: z.string().optional(),
    exerciseFrequency: z.string().optional(),
    sleepQuality: z.string().optional(),
    smokingStatus: z.string().optional(),
    alcoholConsumption: z.string().optional(),
    stressLevel: z.string().optional(),
    anxietyLevel: z.string().optional(),
  }).optional().nullable(),
});

export type SavePatientProfileInput = z.infer<typeof PatientProfileSchema>;
