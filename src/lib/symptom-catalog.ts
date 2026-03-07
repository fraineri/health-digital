export interface Symptom {
  id: string;
  label: string;
  category: string;
  weights: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export const SYMPTOM_CATALOG: Symptom[] = [
  // --- Digestivo ---
  { id: "gas_bloating", label: "Gases o distensión abdominal", category: "Digestivo", weights: { vata: 0.8, pitta: 0.1, kapha: 0.1 } },
  { id: "acid_reflux", label: "Reflujo ácido / Acidez", category: "Digestivo", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "slow_digestion", label: "Digestión lenta / Pesadez", category: "Digestivo", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "constipation", label: "Estreñimiento crónico o intermitente", category: "Digestivo", weights: { vata: 0.9, pitta: 0.0, kapha: 0.1 } },
  { id: "loose_stools", label: "Heces sueltas / Diarrea frecuente", category: "Digestivo", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },

  // --- Dermatológico ---
  { id: "dry_skin", label: "Piel seca, áspera o agrietada", category: "Dermatológico", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "red_skin", label: "Piel con rojeces, acné o picazón", category: "Dermatológico", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "oily_skin", label: "Piel muy brillante, oleosa o quistes", category: "Dermatológico", weights: { vata: 0.0, pitta: 0.2, kapha: 0.8 } },

  // --- Circulatorio / Termorregulación ---
  { id: "cold_hands", label: "Manos y pies frecuentemente fríos", category: "Termorregulación", weights: { vata: 0.8, pitta: 0.0, kapha: 0.2 } },
  { id: "runs_hot", label: "Suele tener mucho calor / transpira fácil", category: "Termorregulación", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "water_retention", label: "Retención de líquidos o edema", category: "Circulatorio", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },

  // --- Emocional / Mental ---
  { id: "anxiety_worry", label: "Ansiedad, preocupación excesiva, miedo", category: "Mental/Emocional", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "anger_irritability", label: "Irritabilidad, enojo fácil, impaciencia", category: "Mental/Emocional", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "lethargy_sadness", label: "Letargo, desmotivación, apego excesivo", category: "Mental/Emocional", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "racing_thoughts", label: "Pensamientos acelerados, mente dispersa", category: "Mental/Emocional", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sharp_focus", label: "Foco muy agudo, exceso de perfeccionismo", category: "Mental/Emocional", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },

  // --- Sueño & Energía ---
  { id: "insomnia_waking", label: "Dificultad para dormir o despertares (2-4am)", category: "Sueño/Energía", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "intense_dreams", label: "Sueño interrumpido por calor o sueños intensos", category: "Sueño/Energía", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_sleep", label: "Sueño muy pesado, dificultad para levantarse", category: "Sueño/Energía", weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "variable_energy", label: "Picos de energía seguidos de agotamiento", category: "Sueño/Energía", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "steady_low_energy", label: "Energía estable pero baja o pesada", category: "Sueño/Energía", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },

  // --- Musculoesquelético / Dolor ---
  { id: "joint_cracking", label: "Articulaciones que crujen, dolor migratorio", category: "Musculoesquelético", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sharp_pain", label: "Dolor agudo, inflamatorio, quemante", category: "Musculoesquelético", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_dull_pain", label: "Dolor sordo, pesadez corporal o rigidez", category: "Musculoesquelético", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  
  // --- Apetito / Sed ---
  { id: "variable_appetite", label: "Apetito irregular, se olvida de comer", category: "Apetito", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sharp_appetite", label: "Apetito voraz, se enoja si no come a horario", category: "Apetito", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "low_appetite", label: "Apetito bajo, puede saltar comidas fácilmente", category: "Apetito", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
];
