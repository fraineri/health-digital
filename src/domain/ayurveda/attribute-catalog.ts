export const ATTRIBUTE_IDS = [
  "body_frame", "skin_type", "hair_type", "eye_type",
  "temp_tolerance", "peripheral_circulation",
  "appetite", "digestion_pattern", "bowel_pattern",
  "cold_food_reaction", "thirst",
  "sleep_quality", "sleep_duration", "energy_pattern", "exercise_tolerance",
  "stress_response", "memory", "decision_making", "emotional_pattern",
  "pain_type", "fluid_retention",
] as const;

export type AttributeId = typeof ATTRIBUTE_IDS[number];
export type DoshaDistribution = { vata: number; pitta: number; kapha: number };
export type AttributeDistributions = Record<string, DoshaDistribution>;

export const POINTS_PER_ROW = 5;
export const DOSHA_KEYS = ['vata', 'pitta', 'kapha'] as const;
export type DoshaKey = typeof DOSHA_KEYS[number];
