import { z } from "zod";

/**
 * Forma que maneja el Cliente (UI) — texto plano.
 * Los campos de texto (tongue, pulse, skinNailsEyes, findings) se muestran
 * como strings legibles en la interfaz; se encriptan solo en el Server Action.
 */
export interface PhysicalExamData {
  // A. Antropometria
  weight: number | null;
  height: number | null;

  // B. Signos Vitales
  systolicBP: number | null;
  diastolicBP: number | null;
  heartRate: number | null;
  oxygenSaturation: number | null;
  temperature: number | null;
  respiratoryRate: number | null;

  // C. Examen Integrativo Ayurveda (texto plano en UI)
  tongue: string;
  pulse: string;
  skinNailsEyes: string;

  // D. Hallazgos Clinicos Generales (texto plano en UI)
  findings: string;
}

/**
 * Forma almacenada en BD (con campos de texto encriptados).
 * Los campos numericos se guardan en claro para analytics.
 * Los campos de texto se guardan encriptados con AES-256-GCM.
 */
export interface PhysicalExamSnapshotDB {
  // A. Antropometria (plano)
  weight: number | null;
  height: number | null;

  // B. Signos Vitales (plano)
  systolicBP: number | null;
  diastolicBP: number | null;
  heartRate: number | null;
  oxygenSaturation: number | null;
  temperature: number | null;
  respiratoryRate: number | null;

  // C. Examen Integrativo Ayurveda (ENCRIPTADO)
  encryptedTongue: string | null;
  encryptedPulse: string | null;
  encryptedSkinNailsEyes: string | null;

  // D. Hallazgos Clinicos Generales (ENCRIPTADO)
  encryptedFindings: string | null;
}

export const DEFAULT_PHYSICAL_EXAM: PhysicalExamData = {
  weight: null,
  height: null,
  systolicBP: null,
  diastolicBP: null,
  heartRate: null,
  oxygenSaturation: null,
  temperature: null,
  respiratoryRate: null,
  tongue: "",
  pulse: "",
  skinNailsEyes: "",
  findings: "",
};

export const PhysicalExamPayloadSchema = z.object({
  // A. Antropometria
  weight: z.number().min(0.5).max(500).nullable(),
  height: z.number().min(20).max(300).nullable(),

  // B. Signos Vitales — rangos biologicamente razonables
  systolicBP: z.number().int().min(40).max(300).nullable(),
  diastolicBP: z.number().int().min(20).max(200).nullable(),
  heartRate: z.number().int().min(20).max(300).nullable(),
  oxygenSaturation: z.number().int().min(50).max(100).nullable(),
  temperature: z.number().min(30).max(45).nullable(),
  respiratoryRate: z.number().int().min(4).max(60).nullable(),

  // C. Examen Integrativo (texto plano, se encripta server-side)
  tongue: z.string().max(1000).default(""),
  pulse: z.string().max(1000).default(""),
  skinNailsEyes: z.string().max(1000).default(""),

  // D. Hallazgos Clinicos
  findings: z.string().max(5000).default(""),
});

export type PhysicalExamPayload = z.infer<typeof PhysicalExamPayloadSchema>;

/**
 * Calcula el IMC y su categoria OMS. Funcion pura, usable en cliente.
 * Retorna null si faltan peso o altura.
 */
export function calculateBMI(
  weightKg: number | null,
  heightCm: number | null
): { value: number; category: string; color: string } | null {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) return null;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const value = Math.round(bmi * 10) / 10;

  if (value < 18.5) return { value, category: "Bajo peso", color: "text-blue-600" };
  if (value < 25)   return { value, category: "Normopeso", color: "text-emerald-600" };
  if (value < 30)   return { value, category: "Sobrepeso", color: "text-amber-600" };
  return { value, category: "Obesidad", color: "text-red-600" };
}
