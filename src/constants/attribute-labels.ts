/**
 * Labels de atributos prakruti para la UI.
 * Extraídos de attribute-catalog.ts para separar presentación de lógica de distribución.
 * Los IDs deben coincidir 1:1 con los de ATTRIBUTE_IDS en attribute-catalog.ts.
 */

export interface AttributeLabelExpressions {
  vata: { label: string; description?: string };
  pitta: { label: string; description?: string };
  kapha: { label: string; description?: string };
}

export interface AttributeLabel {
  name: string;
  category: string;
  expressions: AttributeLabelExpressions;
}

export const ATTRIBUTE_LABELS: Record<string, AttributeLabel> = {
  // --- Constitución Física (6) ---
  body_frame: {
    name: "Complexión corporal",
    category: "Constitución Física",
    expressions: {
      vata:  { label: "Delgada, difícil ganar peso" },
      pitta: { label: "Media, musculatura definida" },
      kapha: { label: "Robusta, tendencia a retener" },
    },
  },
  skin_type: {
    name: "Tipo de piel",
    category: "Constitución Física",
    expressions: {
      vata:  { label: "Seca, fría, rugosa" },
      pitta: { label: "Cálida, sensible, rojiza" },
      kapha: { label: "Grasa, suave, húmeda" },
    },
  },
  hair_type: {
    name: "Cabello",
    category: "Constitución Física",
    expressions: {
      vata:  { label: "Fino, seco, ondulado" },
      pitta: { label: "Fino, liso, canicie temprana" },
      kapha: { label: "Grueso, oleoso, abundante" },
    },
  },
  eye_type: {
    name: "Ojos",
    category: "Constitución Física",
    expressions: {
      vata:  { label: "Pequeños, inquietos, secos" },
      pitta: { label: "Medianos, penetrantes, fotosensibles" },
      kapha: { label: "Grandes, calmos, húmedos" },
    },
  },
  temp_tolerance: {
    name: "Tolerancia térmica",
    category: "Constitución Física",
    expressions: {
      vata:  { label: "Prefiere calor, le molesta el frío" },
      pitta: { label: "Prefiere frío, le molesta el calor" },
      kapha: { label: "Tolera ambos, prefiere calor moderado" },
    },
  },
  peripheral_circulation: {
    name: "Circulación periférica",
    category: "Constitución Física",
    expressions: {
      vata:  { label: "Manos/pies frecuentemente fríos" },
      pitta: { label: "Extremidades cálidas, buena circulación" },
      kapha: { label: "Extremidades frescas, pesadas, húmedas" },
    },
  },

  // --- Digestión y Metabolismo (5) ---
  appetite: {
    name: "Apetito",
    category: "Digestión y Metabolismo",
    expressions: {
      vata:  { label: "Irregular, se olvida de comer" },
      pitta: { label: "Intenso, no tolera saltear comidas" },
      kapha: { label: "Estable, puede saltear sin molestia" },
    },
  },
  digestion_pattern: {
    name: "Patrón digestivo",
    category: "Digestión y Metabolismo",
    expressions: {
      vata:  { label: "Irregular, gases, distensión" },
      pitta: { label: "Rápida, acidez, reflujo" },
      kapha: { label: "Lenta, pesadez post-comida" },
    },
  },
  bowel_pattern: {
    name: "Evacuación",
    category: "Digestión y Metabolismo",
    expressions: {
      vata:  { label: "Irregular, tendencia a estreñimiento" },
      pitta: { label: "Regular, heces blandas" },
      kapha: { label: "Regular, lenta, voluminosa" },
    },
  },
  cold_food_reaction: {
    name: "Reacción a alimentos fríos",
    category: "Digestión y Metabolismo",
    expressions: {
      vata:  { label: "Malestar con alimentos/bebidas frías" },
      pitta: { label: "Alivio con alimentos/bebidas frías" },
      kapha: { label: "Digestión más lenta con frío, sin malestar" },
    },
  },
  thirst: {
    name: "Sed",
    category: "Digestión y Metabolismo",
    expressions: {
      vata:  { label: "Irregular, se olvida de hidratarse" },
      pitta: { label: "Alta, toma mucha agua" },
      kapha: { label: "Baja, sed natural mínima" },
    },
  },

  // --- Sueño y Energía (4) ---
  sleep_quality: {
    name: "Calidad de sueño",
    category: "Sueño y Energía",
    expressions: {
      vata:  { label: "Liviano, interrumpido, insomnio" },
      pitta: { label: "Moderado, sueños vívidos e intensos" },
      kapha: { label: "Profundo, cuesta despertarse" },
    },
  },
  sleep_duration: {
    name: "Duración de sueño",
    category: "Sueño y Energía",
    expressions: {
      vata:  { label: "Menos de 7h (no por elección)" },
      pitta: { label: "6-8h, es suficiente" },
      kapha: { label: "8+ horas y aún se siente cansado" },
    },
  },
  energy_pattern: {
    name: "Patrón de energía",
    category: "Sueño y Energía",
    expressions: {
      vata:  { label: "Ráfagas y caídas bruscas" },
      pitta: { label: "Sostenida hasta la tarde, caída nocturna" },
      kapha: { label: "Lenta al inicio, mejora al moverse" },
    },
  },
  exercise_tolerance: {
    name: "Tolerancia al ejercicio",
    category: "Sueño y Energía",
    expressions: {
      vata:  { label: "Baja resistencia, se agota rápido" },
      pitta: { label: "Alta tolerancia, competitivo" },
      kapha: { label: "Alta resistencia, pero cuesta empezar" },
    },
  },

  // --- Mente y Emociones (4) ---
  stress_response: {
    name: "Respuesta al estrés",
    category: "Mente y Emociones",
    expressions: {
      vata:  { label: "Ansioso, errático, miedoso" },
      pitta: { label: "Irritable, crítico, perfeccionista" },
      kapha: { label: "Retraído, lento, apático" },
    },
  },
  memory: {
    name: "Memoria",
    category: "Mente y Emociones",
    expressions: {
      vata:  { label: "Aprende rápido, olvida rápido" },
      pitta: { label: "Retención aguda y duradera" },
      kapha: { label: "Aprende lento, retiene para siempre" },
    },
  },
  decision_making: {
    name: "Toma de decisiones",
    category: "Mente y Emociones",
    expressions: {
      vata:  { label: "Cambia de opinión, indeciso" },
      pitta: { label: "Decidido, a veces rígido" },
      kapha: { label: "Lenta pero consistente" },
    },
  },
  emotional_pattern: {
    name: "Patrón emocional",
    category: "Mente y Emociones",
    expressions: {
      vata:  { label: "Miedo, ansiedad, pensamientos acelerados" },
      pitta: { label: "Enojo, frustración" },
      kapha: { label: "Apego, melancolía" },
    },
  },

  // --- Musculoesquelético y Otros (2) ---
  pain_type: {
    name: "Tipo de dolor",
    category: "Musculoesquelético y Otros",
    expressions: {
      vata:  { label: "Articulaciones crujen, dolor migratorio" },
      pitta: { label: "Agudo, inflamatorio, quemante" },
      kapha: { label: "Sordo, pesadez corporal, rigidez" },
    },
  },
  fluid_retention: {
    name: "Retención de líquidos",
    category: "Musculoesquelético y Otros",
    expressions: {
      vata:  { label: "Sequedad, deshidratación frecuente" },
      pitta: { label: "Inflamación localizada, calor" },
      kapha: { label: "Edema, retención generalizada" },
    },
  },
};
