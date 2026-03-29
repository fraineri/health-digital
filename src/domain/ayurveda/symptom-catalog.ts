export interface SymptomWeights {
  id: string;
  weights: { vata: number; pitta: number; kapha: number };
}

export const SYMPTOM_WEIGHTS: SymptomWeights[] = [
  // --- Constitución Física ---
  { id: "complexion_thin",    weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "complexion_medium",  weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "complexion_robust",  weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "dry_skin",           weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "red_skin",           weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "oily_skin",          weights: { vata: 0.0, pitta: 0.2, kapha: 0.8 } },
  { id: "hair_thin_dry",      weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "hair_thin_straight", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "hair_thick_oily",    weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "eyes_small_dry",     weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "eyes_medium_sharp",  weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "eyes_large_calm",    weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "runs_cold",          weights: { vata: 0.9, pitta: 0.0, kapha: 0.1 } },
  { id: "runs_hot",           weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "moderate_temp",      weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "cold_hands",         weights: { vata: 0.8, pitta: 0.0, kapha: 0.2 } },

  // --- Digestión y Metabolismo ---
  { id: "variable_appetite",    weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sharp_appetite",       weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "low_appetite",         weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "gas_bloating",         weights: { vata: 0.8, pitta: 0.1, kapha: 0.1 } },
  { id: "acid_reflux",          weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "slow_digestion",       weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "constipation",         weights: { vata: 0.9, pitta: 0.0, kapha: 0.1 } },
  { id: "loose_stools",         weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_stools",         weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "cold_food_discomfort", weights: { vata: 0.6, pitta: 0.0, kapha: 0.4 } },
  { id: "cold_food_relief",     weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "thirst_irregular",     weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "thirst_high",          weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "thirst_low",           weights: { vata: 0.1, pitta: 0.0, kapha: 0.9 } },

  // --- Sueño y Energía ---
  { id: "insomnia_waking",     weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "intense_dreams",      weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_sleep",         weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "sleep_under_7h",      weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sleep_6_8h",          weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "sleep_over_8h",       weights: { vata: 0.1, pitta: 0.0, kapha: 0.9 } },
  { id: "variable_energy",     weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "steady_energy_drop",  weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "steady_low_energy",   weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "exercise_low",        weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "exercise_high_comp",  weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "exercise_high_slow",  weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },

  // --- Mente y Emociones ---
  { id: "anxiety_erratic",          weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "anger_critical",           weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "lethargy_withdrawn",       weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "memory_fast_forget",       weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "memory_sharp",             weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "memory_slow_retain",       weights: { vata: 0.1, pitta: 0.0, kapha: 0.9 } },
  { id: "decision_indecisive",      weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "decision_decisive",        weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "decision_slow_consistent", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "emotion_fear",             weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "emotion_anger",            weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "emotion_attachment",       weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },

  // --- Musculoesquelético y Otros ---
  { id: "joint_cracking",  weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sharp_pain",      weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_dull_pain", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "water_retention", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
];
