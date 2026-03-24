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
  // --- Dominio A: Constitución Física ---
  { id: "complexion_thin", label: "Complexión delgada, difícil de ganar peso", category: "Constitución Física", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "complexion_medium", label: "Complexión media, musculatura definida", category: "Constitución Física", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "complexion_robust", label: "Complexión robusta, tendencia a retener", category: "Constitución Física", weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "dry_skin", label: "Piel seca, fría, rugosa (o agrietada)", category: "Constitución Física", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "red_skin", label: "Piel cálida, sensible, rojiza (o acné)", category: "Constitución Física", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "oily_skin", label: "Piel grasa, suave, fría y húmeda", category: "Constitución Física", weights: { vata: 0.0, pitta: 0.2, kapha: 0.8 } },
  { id: "hair_thin_dry", label: "Cabello fino, seco, ondulado", category: "Constitución Física", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "hair_thin_straight", label: "Cabello fino, liso, tendencia a canicie temprana", category: "Constitución Física", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "hair_thick_oily", label: "Cabello grueso, oleoso, abundante", category: "Constitución Física", weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "eyes_small_dry", label: "Ojos pequeños, inquietos, secos", category: "Constitución Física", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "eyes_medium_sharp", label: "Ojos medianos, penetrantes, sensibles a la luz", category: "Constitución Física", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "eyes_large_calm", label: "Ojos grandes, calmos, húmedos", category: "Constitución Física", weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "runs_cold", label: "Prefiere calor (le molesta el frío)", category: "Constitución Física", weights: { vata: 0.9, pitta: 0.0, kapha: 0.1 } },
  { id: "runs_hot", label: "Prefiere frío (le molesta el calor)", category: "Constitución Física", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "moderate_temp", label: "Prefiere calor moderado (tolera ambos bien)", category: "Constitución Física", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "cold_hands", label: "Manos y pies frecuentemente fríos", category: "Constitución Física", weights: { vata: 0.8, pitta: 0.0, kapha: 0.2 } },

  // --- Dominio B: Digestión y Metabolismo ---
  { id: "variable_appetite", label: "Apetito irregular, se olvida de comer", category: "Digestión y Metabolismo", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sharp_appetite", label: "Apetito intenso, no tolera saltear comidas", category: "Digestión y Metabolismo", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "low_appetite", label: "Apetito lento, puede saltear sin molestia", category: "Digestión y Metabolismo", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "gas_bloating", label: "Digestión irregular, gases, distensión", category: "Digestión y Metabolismo", weights: { vata: 0.8, pitta: 0.1, kapha: 0.1 } },
  { id: "acid_reflux", label: "Digestión rápida, acidez, reflujo", category: "Digestión y Metabolismo", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "slow_digestion", label: "Digestión lenta, pesadez post-comida", category: "Digestión y Metabolismo", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "constipation", label: "Evacuación irregular, tendencia al estreñimiento", category: "Digestión y Metabolismo", weights: { vata: 0.9, pitta: 0.0, kapha: 0.1 } },
  { id: "loose_stools", label: "Evacuación regular, tendencia a heces blandas", category: "Digestión y Metabolismo", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_stools", label: "Evacuación regular, lenta, voluminosa", category: "Digestión y Metabolismo", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "cold_food_discomfort", label: "Malestar al consumir alimentos/bebidas frías", category: "Digestión y Metabolismo", weights: { vata: 0.6, pitta: 0.0, kapha: 0.4 } },
  { id: "cold_food_relief", label: "Alivio al consumir alimentos/bebidas frías", category: "Digestión y Metabolismo", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "thirst_irregular", label: "Sed irregular, se olvida de tomar agua", category: "Digestión y Metabolismo", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "thirst_high", label: "Sed alta, toma mucha agua", category: "Digestión y Metabolismo", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "thirst_low", label: "Sed baja natural", category: "Digestión y Metabolismo", weights: { vata: 0.1, pitta: 0.0, kapha: 0.9 } },

  // --- Dominio C: Sueño y Energía ---
  { id: "insomnia_waking", label: "Sueño liviano, interrumpido, insomnio", category: "Sueño y Energía", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "intense_dreams", label: "Sueño moderado, sueños vívidos e intensos", category: "Sueño y Energía", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_sleep", label: "Sueño profundo, le cuesta despertarse", category: "Sueño y Energía", weights: { vata: 0.0, pitta: 0.1, kapha: 0.9 } },
  { id: "sleep_under_7h", label: "Duerme menos de 7 horas (no por elección)", category: "Sueño y Energía", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sleep_6_8h", label: "Duerme 6-8 horas, es suficiente", category: "Sueño y Energía", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "sleep_over_8h", label: "Duerme 8+ horas y aún se siente cansado", category: "Sueño y Energía", weights: { vata: 0.1, pitta: 0.0, kapha: 0.9 } },
  { id: "variable_energy", label: "Ráfagas de energía y caídas bruscas en el día", category: "Sueño y Energía", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "steady_energy_drop", label: "Energía sostenida hasta la tarde, caída nocturna", category: "Sueño y Energía", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "steady_low_energy", label: "Energía lenta al inicio, mejora al moverse", category: "Sueño y Energía", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "exercise_low", label: "Baja resistencia al ejercicio, se agota rápido", category: "Sueño y Energía", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "exercise_high_comp", label: "Alta tolerancia al ejercicio, competitivo", category: "Sueño y Energía", weights: { vata: 0.0, pitta: 1.0, kapha: 0.0 } },
  { id: "exercise_high_slow", label: "Alta resistencia, pero le cuesta empezar", category: "Sueño y Energía", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },

  // --- Dominio D: Mente y Emociones ---
  { id: "anxiety_erratic", label: "Bajo estrés: Ansioso, errático, miedoso", category: "Mente y Emociones", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "anger_critical", label: "Bajo estrés: Irritable, crítico, perfeccionista", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "lethargy_withdrawn", label: "Bajo estrés: Retraído, lento, apático", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "memory_fast_forget", label: "Aprende rápido, olvida rápido", category: "Mente y Emociones", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "memory_sharp", label: "Retención aguda y duradera", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "memory_slow_retain", label: "Aprende lento, retiene para siempre", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.0, kapha: 0.9 } },
  { id: "decision_indecisive", label: "Cambia de opinión, indeciso", category: "Mente y Emociones", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "decision_decisive", label: "Decidido, a veces rígido", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "decision_slow_consistent", label: "Toma de decisiones lenta pero consistente", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "emotion_fear", label: "Patrón dominante: Miedo / Ansiedad (incl. pensamientos acelerados)", category: "Mente y Emociones", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "emotion_anger", label: "Patrón dominante: Enojo / Frustración", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "emotion_attachment", label: "Patrón dominante: Apego / Melancolía", category: "Mente y Emociones", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },

  // --- Musculoesquelético y Otros (Síntomas Clínicos Duros) ---
  { id: "joint_cracking", label: "Articulaciones que crujen, dolor migratorio", category: "Musculoesquelético y Otros", weights: { vata: 0.9, pitta: 0.1, kapha: 0.0 } },
  { id: "sharp_pain", label: "Dolor agudo, inflamatorio, quemante", category: "Musculoesquelético y Otros", weights: { vata: 0.1, pitta: 0.9, kapha: 0.0 } },
  { id: "heavy_dull_pain", label: "Dolor sordo, pesadez corporal o rigidez", category: "Musculoesquelético y Otros", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
  { id: "water_retention", label: "Retención de líquidos o edema", category: "Musculoesquelético y Otros", weights: { vata: 0.1, pitta: 0.1, kapha: 0.8 } },
];
