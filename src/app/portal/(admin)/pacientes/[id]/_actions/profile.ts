"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";
import { revalidatePath } from "next/cache";
import { PatientProfileSchema, type SavePatientProfileInput } from "../_schemas/profile";

export async function savePatientProfile(
  rawInput: SavePatientProfileInput
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Validar input
    const parsed = PatientProfileSchema.safeParse(rawInput);
    
    if (!parsed.success) {
      console.error("[savePatientProfile] Validation error:", parsed.error.format());
      return { success: false, error: "Datos de formulario inválidos" };
    }

    const data = parsed.data;

    // 2. Encriptar campos de privacidad médica
    const encryptedMedicalHistory = data.medicalHistory ? encrypt(data.medicalHistory) : null;
    const encryptedAllergies = data.allergies ? encrypt(data.allergies) : null;
    
    // Parse Date Si viene como string
    let dateOfBirth: Date | null = null;
    if (data.dateOfBirth) {
      const parsedDate = new Date(data.dateOfBirth);
      if (!isNaN(parsedDate.getTime())) {
        dateOfBirth = parsedDate;
      }
    }

    // 3. Upsert en base de datos.
    // Marcamos profileSource como 'PORTAL' para que el webhook de Cal.com
    // NO sobreescriba en el futuro.
    await prisma.patient.upsert({
      where: { id: data.patientId },
      update: {
        name: data.name,
        email: data.email, // Aunque sea unique, actualizamos si cambiase
        phone: data.phone,
        dateOfBirth,
        gender: data.gender,
        bloodType: data.bloodType,
        occupation: data.occupation,
        address: data.address,
        encryptedMedicalHistory,
        encryptedAllergies,
        lifestyle: data.lifestyle ?? undefined,
        profileSource: 'PORTAL',
        lastProfileUpdate: new Date(),
      },
      create: {
        // En un caso normal el patient siempre existe (porque vino de cal.com o se listó)
        // pero Prisma requiere el `create` en un `upsert`.
        id: data.patientId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth,
        gender: data.gender,
        bloodType: data.bloodType,
        occupation: data.occupation,
        address: data.address,
        encryptedMedicalHistory,
        encryptedAllergies,
        lifestyle: data.lifestyle ?? undefined,
        profileSource: 'PORTAL',
        lastProfileUpdate: new Date(),
      }
    });

    // 4. Revalidar UI de Next.js
    revalidatePath("/portal"); 
    revalidatePath(`/portal/pacientes/${data.patientId}`);
    
    return { success: true };
    
  } catch (error) {
    console.error("[savePatientProfile] Error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Error desconocido al guardar el perfil" 
    };
  }
}
