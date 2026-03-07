import { SYMPTOM_CATALOG } from "./symptom-catalog";

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

/**
 * Motor de Scoring Dóshico puro.
 * Calcula los puntajes de Vata, Pitta y Kapha basados en los síntomas seleccionados.
 *
 * Fórmula: S_d = Σ (checked_i × W_d_i)
 * Normalización: Score_d% = (S_d / Σ S_all) × 100
 *
 * @param checkedSymptomIds Array de IDs de los síntomas macados
 * @returns Score normalizado para Vata, Pitta y Kapha (0-100)
 */
export function calculateDoshaScores(checkedSymptomIds: string[]): DoshaScores {
  // Edge case: if nothing is checked, distribute equally
  if (!checkedSymptomIds || checkedSymptomIds.length === 0) {
    return { vata: 33.3, pitta: 33.3, kapha: 33.3 };
  }

  // Filter catalog to get only checked symptoms
  const selectedSymptoms = SYMPTOM_CATALOG.filter((symptom) =>
    checkedSymptomIds.includes(symptom.id)
  );

  // Still handle edge case if none of the IDs match somehow
  if (selectedSymptoms.length === 0) {
    return { vata: 33.3, pitta: 33.3, kapha: 33.3 };
  }

  // Sum raw weights
  let rawVata = 0;
  let rawPitta = 0;
  let rawKapha = 0;

  for (const symptom of selectedSymptoms) {
    rawVata += symptom.weights.vata;
    rawPitta += symptom.weights.pitta;
    rawKapha += symptom.weights.kapha;
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
