import { SYMPTOM_WEIGHTS } from "./symptom-catalog";
import { AttributeDistributions } from "./attribute-catalog";

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

/**
 * Motor de Scoring Dóshico puro.
 * Calcula los puntajes de Vata, Pitta y Kapha basados en los síntomas seleccionados.
 *
 * Fórmula: S_d = Σ (checked_i × W_d_i × Intensidad_i)
 * Normalización: Score_d% = (S_d / Σ S_all) × 100
 *
 * @param symptomIntensities Record mapeando ID del síntoma a su intensidad (0=Ausente, 1=Leve, 2=Moderado, 3=Severo)
 * @returns Score normalizado para Vata, Pitta y Kapha (0-100)
 */
export function calculateDoshaScores(symptomIntensities: Record<string, number>): DoshaScores {
  // Edge case: if nothing is checked, distribute equally
  if (!symptomIntensities || Object.keys(symptomIntensities).length === 0) {
    return { vata: 33.3, pitta: 33.3, kapha: 33.3 };
  }

  // Filter catalog to get only checked symptoms (intensity > 0)
  const activeSymptomIds = Object.keys(symptomIntensities).filter(id => symptomIntensities[id] > 0);
  
  const selectedSymptoms = SYMPTOM_WEIGHTS.filter((symptom) =>
    activeSymptomIds.includes(symptom.id)
  );

  // Still handle edge case if none of the IDs match somehow or all intensities are 0
  if (selectedSymptoms.length === 0) {
    return { vata: 33.3, pitta: 33.3, kapha: 33.3 };
  }

  // Sum raw weights multiplied by intensity
  let rawVata = 0;
  let rawPitta = 0;
  let rawKapha = 0;

  for (const symptom of selectedSymptoms) {
    const intensity = symptomIntensities[symptom.id] || 0;
    
    rawVata += symptom.weights.vata * intensity;
    rawPitta += symptom.weights.pitta * intensity;
    rawKapha += symptom.weights.kapha * intensity;
  }

  const totalRaw = rawVata + rawPitta + rawKapha;

  // Prevent division by zero if all weights were 0 (shouldn't happen with valid catalog)
  if (totalRaw === 0) {
    return { vata: 33.3, pitta: 33.3, kapha: 33.3 };
  }

  // Normalize to percentage and round to 1 decimal
  return {
    vata: Math.round((rawVata / totalRaw) * 1000) / 10,
    pitta: Math.round((rawPitta / totalRaw) * 1000) / 10,
    kapha: Math.round((rawKapha / totalRaw) * 1000) / 10,
  };
}

// --- V2: Distribución Proporcional ---

/** V1: Formato legado del checklist plano */
export type SymptomSnapshotV1 = Record<string, number>;

/** V2: Formato nuevo de la matriz de distribución */
export interface SymptomSnapshotV2 {
  version: 2;
  distributions: AttributeDistributions;
}

/** Union type para el campo JSON de la DB */
export type SymptomSnapshot = SymptomSnapshotV1 | SymptomSnapshotV2;

/** Type guard para discriminar formato V1 vs V2 */
export function isV2Snapshot(snapshot: unknown): snapshot is SymptomSnapshotV2 {
  return (
    typeof snapshot === 'object' &&
    snapshot !== null &&
    'version' in snapshot &&
    (snapshot as Record<string, unknown>).version === 2
  );
}

/**
 * Motor de Scoring Dóshico V2 — Distribución Proporcional.
 * Calcula los puntajes de Vata, Pitta y Kapha sumando los puntos asignados
 * por la médica a cada columna dóshica a lo largo de toda la matriz.
 *
 * @param distributions Record mapeando attributeId a distribución {vata, pitta, kapha}
 * @returns Score normalizado para Vata, Pitta y Kapha (0-100)
 */
export function calculateDoshaScoresV2(distributions: AttributeDistributions): DoshaScores {
  const entries = Object.values(distributions);

  if (entries.length === 0) {
    return { vata: 33.3, pitta: 33.3, kapha: 33.3 };
  }

  let totalVata = 0;
  let totalPitta = 0;
  let totalKapha = 0;

  for (const dist of entries) {
    totalVata += dist.vata;
    totalPitta += dist.pitta;
    totalKapha += dist.kapha;
  }

  const grandTotal = totalVata + totalPitta + totalKapha;

  if (grandTotal === 0) {
    return { vata: 33.3, pitta: 33.3, kapha: 33.3 };
  }

  return {
    vata: Math.round((totalVata / grandTotal) * 1000) / 10,
    pitta: Math.round((totalPitta / grandTotal) * 1000) / 10,
    kapha: Math.round((totalKapha / grandTotal) * 1000) / 10,
  };
}
