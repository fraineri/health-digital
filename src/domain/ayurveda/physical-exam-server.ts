import { encrypt, decrypt } from "@/lib/encryption";
import {
  PhysicalExamData,
  PhysicalExamSnapshotDB,
  PhysicalExamPayload,
  DEFAULT_PHYSICAL_EXAM,
} from "./physical-exam";

/**
 * Encripta un string solo si tiene contenido real (no vacio).
 * Evita errores criptograficos con strings vacios y desperdicio de espacio en BD.
 */
function encryptIfPresent(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return encrypt(trimmed);
}

/**
 * Desencripta un string con fallback seguro a string vacio.
 * Maneja null, undefined, y errores de desencriptacion graciosamente.
 */
function decryptToString(value: string | null | undefined): string {
  if (!value) return "";
  return decrypt(value) ?? "";
}

/**
 * Transforma datos del cliente (texto plano) al formato de BD (texto encriptado).
 * SOLO llamar desde Server Actions (server-side).
 */
export function toPhysicalExamDB(data: PhysicalExamPayload): PhysicalExamSnapshotDB {
  return {
    weight: data.weight,
    height: data.height,
    systolicBP: data.systolicBP,
    diastolicBP: data.diastolicBP,
    heartRate: data.heartRate,
    oxygenSaturation: data.oxygenSaturation,
    temperature: data.temperature,
    respiratoryRate: data.respiratoryRate,
    encryptedTongue: encryptIfPresent(data.tongue),
    encryptedPulse: encryptIfPresent(data.pulse),
    encryptedSkinNailsEyes: encryptIfPresent(data.skinNailsEyes),
    encryptedFindings: encryptIfPresent(data.findings),
  };
}

/**
 * Transforma datos de la BD (texto encriptado) al formato del cliente (texto plano).
 * SOLO llamar desde funciones de lectura server-side (getConsultation...).
 */
export function fromPhysicalExamDB(snapshot: unknown): PhysicalExamData {
  if (!snapshot || typeof snapshot !== "object") {
    return { ...DEFAULT_PHYSICAL_EXAM };
  }

  const s = snapshot as PhysicalExamSnapshotDB;

  return {
    weight: s.weight ?? null,
    height: s.height ?? null,
    systolicBP: s.systolicBP ?? null,
    diastolicBP: s.diastolicBP ?? null,
    heartRate: s.heartRate ?? null,
    oxygenSaturation: s.oxygenSaturation ?? null,
    temperature: s.temperature ?? null,
    respiratoryRate: s.respiratoryRate ?? null,
    tongue: decryptToString(s.encryptedTongue),
    pulse: decryptToString(s.encryptedPulse),
    skinNailsEyes: decryptToString(s.encryptedSkinNailsEyes),
    findings: decryptToString(s.encryptedFindings),
  };
}
