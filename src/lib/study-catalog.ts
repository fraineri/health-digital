import { prisma } from './prisma';
import { decrypt } from './encryption';

// --- Tipo para datos desencriptados desde la BD ---
export interface DecryptedStudyEntry {
  id: string;
  studyName: string;
  value: string;          // Valor desencriptado
  consultationId: string;
  createdAt: Date;
}

// --- Tipo para el estado editable en el cliente ---
export interface StudyEntry {
  id: string;             // UUID temporal para key de React (crypto.randomUUID)
  studyName: string;      // Nombre del estudio (del catalogo o nuevo)
  value: string;          // Valor en texto plano (se encripta al guardar)
  previousValue?: string; // Valor anterior (de consulta previa, read-only)
  previousDate?: Date;    // Fecha del valor anterior
  isNew: boolean;         // true si el estudio no existia previamente para este paciente
}

// --- Tipo para el payload de guardado ---
export interface StudyPayloadEntry {
  studyName: string;      // Nombre del estudio
  value: string;          // Valor en texto plano (se encriptara server-side)
}

/**
 * Obtiene todos los nombres de estudios del catalogo global, ordenados alfabeticamente.
 * Se usa para alimentar el combobox de la UI.
 */
export async function getStudyCatalogNames(): Promise<string[]> {
  const catalog = await prisma.studyCatalog.findMany({
    select: { name: true },
    orderBy: { name: 'asc' }
  });
  return catalog.map(c => c.name);
}

/**
 * Obtiene el ULTIMO valor de cada estudio complementario para un paciente.
 * Agrupa por studyName y retorna solo el mas reciente de cada uno.
 * Los valores se desencriptan just-in-time.
 */
export async function getLatestStudiesForPatient(
  patientId: string
): Promise<DecryptedStudyEntry[]> {
  const allStudies = await prisma.complementaryStudy.findMany({
    where: { patientId },
    orderBy: { createdAt: 'desc' }
  });

  // Agrupar por studyName, quedarse solo con el mas reciente
  const latestByName = new Map<string, typeof allStudies[0]>();
  for (const study of allStudies) {
    if (!latestByName.has(study.studyName)) {
      latestByName.set(study.studyName, study);
    }
  }

  // Desencriptar valores just-in-time
  return Array.from(latestByName.values()).map(s => ({
    id: s.id,
    studyName: s.studyName,
    value: decrypt(s.encryptedValue) || "",
    consultationId: s.consultationId,
    createdAt: s.createdAt
  }));
}
