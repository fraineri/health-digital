import { Gender, BloodType } from "@prisma/client";

export type GenderLabel = typeof GENDER_LABELS;
export type BloodTypeLabel = typeof BLOOD_TYPE_LABELS;

export const GENDER_LABELS: Record<Gender, string> = {
  FEMENINO:       "Femenino",
  MASCULINO:      "Masculino",
  OTRO:           "Otro",
  NO_ESPECIFICADO: "Prefiero no decirlo",
};

export const BLOOD_TYPE_LABELS: Record<BloodType, string> = {
  A_POS:  "A+",
  A_NEG:  "A-",
  B_POS:  "B+",
  B_NEG:  "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS:  "O+",
  O_NEG:  "O-",
};
