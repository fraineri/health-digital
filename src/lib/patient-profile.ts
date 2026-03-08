import { prisma } from './prisma';
import { decrypt } from './encryption';
import { Patient } from '@prisma/client';

export interface PatientLifestyle {
  dietType?: string;
  exerciseFrequency?: string;
  sleepQuality?: string;
  smokingStatus?: string;
  alcoholConsumption?: string;
  stressLevel?: string;
}

export type DecryptedPatientProfile = Omit<
  Patient,
  'encryptedMedicalHistory' | 'encryptedAllergies' | 'lifestyle'
> & {
  medicalHistory: string | null;
  allergies: string | null;
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

  return {
    id: patient.id,
    name: patient.name,
    email: patient.email,
    phone: patient.phone,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    vulnerableGroup: patient.vulnerableGroup,
    occupation: patient.occupation,
    address: patient.address,
    bloodType: patient.bloodType,
    bloodType: patient.bloodType,
    profileSource: patient.profileSource,
    lastProfileUpdate: patient.lastProfileUpdate,
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
    // Tipamos explícitamente el Json a nuestra interface
    lifestyle: patient.lifestyle as unknown as PatientLifestyle | null,
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
