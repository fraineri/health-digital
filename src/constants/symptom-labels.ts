/**
 * Labels y categorías de síntomas para la UI.
 * Extraídos de symptom-catalog.ts para separar presentación de lógica de scoring.
 * Los IDs deben coincidir 1:1 con los de SYMPTOM_WEIGHTS en symptom-catalog.ts.
 */
export const SYMPTOM_LABELS: Record<string, { label: string; category: string }> = {
  // --- Constitución Física ---
  complexion_thin:     { label: "Complexión delgada, difícil de ganar peso", category: "Constitución Física" },
  complexion_medium:   { label: "Complexión media, musculatura definida", category: "Constitución Física" },
  complexion_robust:   { label: "Complexión robusta, tendencia a retener", category: "Constitución Física" },
  dry_skin:            { label: "Piel seca, fría, rugosa (o agrietada)", category: "Constitución Física" },
  red_skin:            { label: "Piel cálida, sensible, rojiza (o acné)", category: "Constitución Física" },
  oily_skin:           { label: "Piel grasa, suave, fría y húmeda", category: "Constitución Física" },
  hair_thin_dry:       { label: "Cabello fino, seco, ondulado", category: "Constitución Física" },
  hair_thin_straight:  { label: "Cabello fino, liso, tendencia a canicie temprana", category: "Constitución Física" },
  hair_thick_oily:     { label: "Cabello grueso, oleoso, abundante", category: "Constitución Física" },
  eyes_small_dry:      { label: "Ojos pequeños, inquietos, secos", category: "Constitución Física" },
  eyes_medium_sharp:   { label: "Ojos medianos, penetrantes, sensibles a la luz", category: "Constitución Física" },
  eyes_large_calm:     { label: "Ojos grandes, calmos, húmedos", category: "Constitución Física" },
  runs_cold:           { label: "Prefiere calor (le molesta el frío)", category: "Constitución Física" },
  runs_hot:            { label: "Prefiere frío (le molesta el calor)", category: "Constitución Física" },
  moderate_temp:       { label: "Prefiere calor moderado (tolera ambos bien)", category: "Constitución Física" },
  cold_hands:          { label: "Manos y pies frecuentemente fríos", category: "Constitución Física" },

  // --- Digestión y Metabolismo ---
  variable_appetite:   { label: "Apetito irregular, se olvida de comer", category: "Digestión y Metabolismo" },
  sharp_appetite:      { label: "Apetito intenso, no tolera saltear comidas", category: "Digestión y Metabolismo" },
  low_appetite:        { label: "Apetito lento, puede saltear sin molestia", category: "Digestión y Metabolismo" },
  gas_bloating:        { label: "Digestión irregular, gases, distensión", category: "Digestión y Metabolismo" },
  acid_reflux:         { label: "Digestión rápida, acidez, reflujo", category: "Digestión y Metabolismo" },
  slow_digestion:      { label: "Digestión lenta, pesadez post-comida", category: "Digestión y Metabolismo" },
  constipation:        { label: "Evacuación irregular, tendencia al estreñimiento", category: "Digestión y Metabolismo" },
  loose_stools:        { label: "Evacuación regular, tendencia a heces blandas", category: "Digestión y Metabolismo" },
  heavy_stools:        { label: "Evacuación regular, lenta, voluminosa", category: "Digestión y Metabolismo" },
  cold_food_discomfort:{ label: "Malestar al consumir alimentos/bebidas frías", category: "Digestión y Metabolismo" },
  cold_food_relief:    { label: "Alivio al consumir alimentos/bebidas frías", category: "Digestión y Metabolismo" },
  thirst_irregular:    { label: "Sed irregular, se olvida de tomar agua", category: "Digestión y Metabolismo" },
  thirst_high:         { label: "Sed alta, toma mucha agua", category: "Digestión y Metabolismo" },
  thirst_low:          { label: "Sed baja natural", category: "Digestión y Metabolismo" },

  // --- Sueño y Energía ---
  insomnia_waking:     { label: "Sueño liviano, interrumpido, insomnio", category: "Sueño y Energía" },
  intense_dreams:      { label: "Sueño moderado, sueños vívidos e intensos", category: "Sueño y Energía" },
  heavy_sleep:         { label: "Sueño profundo, le cuesta despertarse", category: "Sueño y Energía" },
  sleep_under_7h:      { label: "Duerme menos de 7 horas (no por elección)", category: "Sueño y Energía" },
  sleep_6_8h:          { label: "Duerme 6-8 horas, es suficiente", category: "Sueño y Energía" },
  sleep_over_8h:       { label: "Duerme 8+ horas y aún se siente cansado", category: "Sueño y Energía" },
  variable_energy:     { label: "Ráfagas de energía y caídas bruscas en el día", category: "Sueño y Energía" },
  steady_energy_drop:  { label: "Energía sostenida hasta la tarde, caída nocturna", category: "Sueño y Energía" },
  steady_low_energy:   { label: "Energía lenta al inicio, mejora al moverse", category: "Sueño y Energía" },
  exercise_low:        { label: "Baja resistencia al ejercicio, se agota rápido", category: "Sueño y Energía" },
  exercise_high_comp:  { label: "Alta tolerancia al ejercicio, competitivo", category: "Sueño y Energía" },
  exercise_high_slow:  { label: "Alta resistencia, pero le cuesta empezar", category: "Sueño y Energía" },

  // --- Mente y Emociones ---
  anxiety_erratic:     { label: "Bajo estrés: Ansioso, errático, miedoso", category: "Mente y Emociones" },
  anger_critical:      { label: "Bajo estrés: Irritable, crítico, perfeccionista", category: "Mente y Emociones" },
  lethargy_withdrawn:  { label: "Bajo estrés: Retraído, lento, apático", category: "Mente y Emociones" },
  memory_fast_forget:  { label: "Aprende rápido, olvida rápido", category: "Mente y Emociones" },
  memory_sharp:        { label: "Retención aguda y duradera", category: "Mente y Emociones" },
  memory_slow_retain:  { label: "Aprende lento, retiene para siempre", category: "Mente y Emociones" },
  decision_indecisive: { label: "Cambia de opinión, indeciso", category: "Mente y Emociones" },
  decision_decisive:   { label: "Decidido, a veces rígido", category: "Mente y Emociones" },
  decision_slow_consistent: { label: "Toma de decisiones lenta pero consistente", category: "Mente y Emociones" },
  emotion_fear:        { label: "Patrón dominante: Miedo / Ansiedad (incl. pensamientos acelerados)", category: "Mente y Emociones" },
  emotion_anger:       { label: "Patrón dominante: Enojo / Frustración", category: "Mente y Emociones" },
  emotion_attachment:  { label: "Patrón dominante: Apego / Melancolía", category: "Mente y Emociones" },

  // --- Musculoesquelético y Otros ---
  joint_cracking:      { label: "Articulaciones que crujen, dolor migratorio", category: "Musculoesquelético y Otros" },
  sharp_pain:          { label: "Dolor agudo, inflamatorio, quemante", category: "Musculoesquelético y Otros" },
  heavy_dull_pain:     { label: "Dolor sordo, pesadez corporal o rigidez", category: "Musculoesquelético y Otros" },
  water_retention:     { label: "Retención de líquidos o edema", category: "Musculoesquelético y Otros" },
};
