import { AppointmentType } from '@prisma/client';

/**
 * Mapeo de keys del payload de Cal.com a los campos del modelo TriageResponse en Prisma.
 * Actualmente Cal.com solo envía 'motivoconsulta'. El mapeo es extensible a futuro.
 */
export const TRIAGE_FIELD_MAP: Record<string, string> = {
  motivoconsulta:   'reasonForVisit',
  reason_for_visit: 'reasonForVisit',
  motivo:           'reasonForVisit',
};

/**
 * Normaliza las respuestas recibidas en el webhook de Cal.com a un formato
 * aplicable a la base de datos, usando el diccionario configurable.
 */
export function normalizeTriageResponses(responses: Record<string, unknown> | undefined | null) {
  const result: Record<string, string> = {};

  if (!responses || typeof responses !== 'object') {
    return result;
  }

  // Iteramos sobre las keys de 'responses' (ej: { "motivoconsulta": { value: "Dolor..." } })
  for (const key of Object.keys(responses)) {
    const fieldName = TRIAGE_FIELD_MAP[key.toLowerCase()];
    if (fieldName) {
      // Extraemos el valor del objeto. Algunos payloads envían { value: "..." }
      const typedResponses = responses as Record<string, { value?: unknown } | unknown>;
      const value = (typedResponses[key] as { value?: unknown })?.value ?? typedResponses[key];
      if (value && typeof value === 'string') {
        result[fieldName] = value;
      }
    }
  }

  return result;
}

/**
 * Mapeo estático de los slugs configurados en Cal.com a los Enums de la DB.
 */
export const EVENT_TYPE_MAP: Record<string, AppointmentType> = {
  'primera-consulta': 'FIRST_CONSULTATION',
  'seguimiento':      'FOLLOW_UP',
};

/**
 * Devuelve el `AppointmentType` correspondiente al slug recibido o un valor por defecto.
 */
export function resolveAppointmentType(slug: string | undefined | null): AppointmentType {
  if (!slug) return 'FIRST_CONSULTATION';
  
  const type = EVENT_TYPE_MAP[slug];
  return type || 'FIRST_CONSULTATION';
}
