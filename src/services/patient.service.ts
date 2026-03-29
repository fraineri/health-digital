import { prisma } from '@/lib/prisma';
import { decrypt, encrypt } from '@/lib/encryption';
import { Patient } from '@prisma/client';
import { LifestyleSchema } from '@/domain/ayurveda/validation-schemas';
import { revalidatePath } from 'next/cache';
import type { SavePatientProfileInput } from '@/app/portal/(admin)/pacientes/[id]/_schemas/profile';
import { createAuditLog } from './audit.service';

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
  address: string | null;
  dni: string | null;
  lifestyle: PatientLifestyle | null;
};

export async function getPatientProfile(patientId: string, userId = "SYSTEM"): Promise<DecryptedPatientProfile | null> {
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  if (!patient) {
    return null;
  }

  // Fire-and-forget: registra acceso a datos del paciente (incluye PII desencriptado)
  createAuditLog({
    userId,
    action: 'READ',
    entityType: 'Patient',
    entityId: patientId,
    metadata: { decryptedFields: ['phone', 'address', 'dni', 'medicalHistory', 'allergies'] },
  });

  const medicalHistory = patient.encryptedMedicalHistory
    ? decrypt(patient.encryptedMedicalHistory)
    : null;

  const allergies = patient.encryptedAllergies
    ? decrypt(patient.encryptedAllergies)
    : null;

  const phone = patient.encryptedPhone
    ? decrypt(patient.encryptedPhone)
    : patient.phone;

  const address = patient.encryptedAddress
    ? decrypt(patient.encryptedAddress)
    : patient.address;

  const dni = patient.encryptedDni
    ? decrypt(patient.encryptedDni)
    : null;

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
    medicalHistory,
    allergies,
  };
}

export function calculateProfileScore(patient: DecryptedPatientProfile | Patient): number {
  let score = 0;

  if (patient.phone) score += 15;
  if (patient.dateOfBirth) score += 15;
  if (patient.gender) score += 15;

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

export async function savePatientProfileData(
  data: SavePatientProfileInput,
  userId = "SYSTEM"
): Promise<{ success: boolean; error?: string }> {
  try {
    const encryptedMedicalHistory = data.medicalHistory ? encrypt(data.medicalHistory) : null;
    const encryptedAllergies = data.allergies ? encrypt(data.allergies) : null;
    const encryptedPhone   = data.phone   ? encrypt(data.phone)   : null;
    const encryptedAddress = data.address ? encrypt(data.address) : null;
    const encryptedDni     = data.dni     ? encrypt(data.dni)     : null;

    let dateOfBirth: Date | null = null;
    if (data.dateOfBirth) {
      const parsedDate = new Date(data.dateOfBirth);
      if (!isNaN(parsedDate.getTime())) {
        dateOfBirth = parsedDate;
      }
    }

    await prisma.patient.upsert({
      where: { id: data.patientId },
      update: {
        name: data.name,
        email: data.email,
        encryptedPhone,
        encryptedAddress,
        encryptedDni,
        dateOfBirth,
        gender: data.gender,
        bloodType: data.bloodType,
        occupation: data.occupation,
        encryptedMedicalHistory,
        encryptedAllergies,
        lifestyle: data.lifestyle ?? undefined,
        profileSource: 'PORTAL',
        lastProfileUpdate: new Date(),
      },
      create: {
        id: data.patientId,
        name: data.name,
        email: data.email,
        encryptedPhone,
        encryptedAddress,
        encryptedDni,
        dateOfBirth,
        gender: data.gender,
        bloodType: data.bloodType,
        occupation: data.occupation,
        encryptedMedicalHistory,
        encryptedAllergies,
        lifestyle: data.lifestyle ?? undefined,
        profileSource: 'PORTAL',
        lastProfileUpdate: new Date(),
      },
    });

    revalidatePath("/portal");
    revalidatePath(`/portal/pacientes/${data.patientId}`);

    // Fire-and-forget: registra modificación del perfil del paciente
    createAuditLog({
      userId,
      action: 'WRITE',
      entityType: 'Patient',
      entityId: data.patientId,
    });

    return { success: true };
  } catch (error) {
    console.error("[savePatientProfileData] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al guardar el perfil",
    };
  }
}
