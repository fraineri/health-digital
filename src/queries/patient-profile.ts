import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/encryption';
import { Patient } from '@prisma/client';
import { LifestyleSchema } from '@/domain/ayurveda/validation-schemas';

export interface PatientLifestyle {
  dietType?: string;
  exerciseFrequency?: string;
  sleepQuality?: string;
  smokingStatus?: string;
  alcoholConsumption?: string;
  stressLevel?: string;
  anxietyLevel?: string;
}

export type DecryptedPatientProfile = Omit<
  Patient,
  | 'encryptedMedicalHistory'
  | 'encryptedAllergies'
  | 'encryptedPhone'
  | 'encryptedAddress'
  | 'encryptedDni'
  | 'lifestyle'
> & {
  medicalHistory: string | null;
  allergies: string | null;
  // phone sigue en el tipo base Patient pero su valor se fusiona:
  // encryptedPhone descifrado OR phone plain (fallback Cal.com/legacy)
  address: string | null;   // sobreescrito con valor descifrado
  dni: string | null;       // nuevo campo desencriptado
  lifestyle: PatientLifestyle | null;
};

/**
 * Recupera un paciente por su ID y desencripta sus campos sensibles on-the-fly.
 */
export async function getPatientProfile(patientId: string): Promise<DecryptedPatientProfile | null> {
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  if (!patient) {
    return null;
  }

  // Desencriptar campos si existen
  const medicalHistory = patient.encryptedMedicalHistory
    ? decrypt(patient.encryptedMedicalHistory)
    : null;

  const allergies = patient.encryptedAllergies
    ? decrypt(patient.encryptedAllergies)
    : null;

  // Descifrar datos de contacto con fallback para registros pre-migración y Cal.com
  const phone = patient.encryptedPhone
    ? decrypt(patient.encryptedPhone)
    : patient.phone;

  const address = patient.encryptedAddress
    ? decrypt(patient.encryptedAddress)
    : patient.address;

  const dni = patient.encryptedDni
    ? decrypt(patient.encryptedDni)
    : null;

  // Validar lifestyle con Zod al leer
  const lifestyleResult = LifestyleSchema.safeParse(patient.lifestyle);
  const lifestyle = lifestyleResult.success ? lifestyleResult.data : null;
  if (!lifestyleResult.success) {
    console.error(
      "[getPatientProfile] lifestyle inválido para paciente",
      patientId,
      ":",
      lifestyleResult.error.format()
    );
  }

  return {
    id: patient.id,
    name: patient.name,
    email: patient.email,
    phone,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    vulnerableGroup: patient.vulnerableGroup,
    occupation: patient.occupation,
    address,
    dni,
    bloodType: patient.bloodType,
    profileSource: patient.profileSource,
    lastProfileUpdate: patient.lastProfileUpdate,
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
    lifestyle,
    // Valores desencriptados
    medicalHistory,
    allergies,
  };
}

/**
 * Calcula el "Health Score" o porcentaje de completitud del perfil.
 * Utilizado para mostrar el badge de alerta a la médica.
 */
export function calculateProfileScore(patient: DecryptedPatientProfile | Patient): number {
  let score = 0;

  // Puntos basados en la importancia del dato (Total = 100%)
  if (patient.phone) score += 15;
  if (patient.dateOfBirth) score += 15;
  if (patient.gender) score += 15;
  
  // Verificamos de forma segura si el campo está encriptado (tipo Prisma) o en texto plano (tipo Decrypted)
  const hasMedicalHistory = 'encryptedMedicalHistory' in patient 
    ? !!patient.encryptedMedicalHistory 
    : !!patient.medicalHistory;
  if (hasMedicalHistory) score += 30;
  
  const hasAllergies = 'encryptedAllergies' in patient 
    ? !!patient.encryptedAllergies 
    : !!patient.allergies;
  if (hasAllergies) score += 25;

  return score;
}
