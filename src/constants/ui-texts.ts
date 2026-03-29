// Centralización de textos y opciones de UI para el módulo de consulta Ayurveda.
// Usar "as const" para tipado estricto de las opciones.

export const TREATMENT_PLAN_OPTIONS = {
  NUTRITION: [
    "No especificado",
    "Dieta Anti-Vata (Pacificadora) - Caliente, untuosa, nutritiva",
    "Dieta Anti-Pitta (Pacificadora) - Fresca, dulce, amarga",
    "Dieta Anti-Kapha (Pacificadora) - Ligera, seca, picante",
    "Dieta Tridoshica - Equilibrada, sátvica",
    "Ayuno Intermitente Suave (12/12)",
    "Monodieta de Kitchari (3 días)"
  ],
  PHYTOTHERAPY: [
    "No especificado",
    "Triphala (Noche, regularidad)",
    "Ashwagandha (Noche, estrés/Vata)",
    "Brahmi / Gotu Kola (Día, enfoque/mente)",
    "Shatavari (Nutrición femenina/Pitta)",
    "Tulsi / Holy Basil (Inmunidad/Kapha)",
    "Guggulu (Articulaciones/Colesterol)",
    "Cúrcuma + Pimienta Negra (Antiinflamatorio)"
  ],
  DAILY_ROUTINE: [
    "No especificado",
    "Dinacharya Vata: Abhyanga con aceite sésamo + Yoga suave",
    "Dinacharya Pitta: Abhyanga con aceite coco + Meditación lunar",
    "Dinacharya Kapha: Cepillado en seco (Garshana) + Ejercicio vigoroso",
    "Raspado de lengua (Jihwa Prakshalana) diario",
    "Oil Pulling (Gandusha) 10 min mañana",
    "Pranayama: Nadi Shodhana (Respiración Alterna)",
    "Higiene del sueño: Desconectar pantallas 21h"
  ]
} as const;
