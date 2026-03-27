import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/encryption';
import type { DecryptedStudyEntry } from '@/domain/ayurveda/study-types';

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
