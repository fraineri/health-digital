"use server";

import { z } from "zod";

/**
 * Tipo unificado de respuesta para todas las Server Actions.
 * Reemplaza ProfileActionState, ConsultationActionState y ClinicalActionState.
 */
export type ActionState = {
  success: boolean;
  message: string;
  error?: string;
} | null;

/**
 * HOF para server actions que necesitan validación Zod antes de ejecutar.
 * Uso: acciones que reciben input de formularios (profile, consultation).
 *
 * @param schema - Schema Zod para validar el input
 * @param handler - Función async que recibe los datos validados y retorna {success, error?}
 * @param messages - Mensajes de éxito, error de validación, y error de servidor
 */
export function createValidatedAction<TSchema extends z.ZodType>(
  schema: TSchema,
  handler: (data: z.infer<TSchema>) => Promise<{ success: boolean; error?: string }>,
  messages: { success: string; validationError: string; serverError: string }
): (input: z.infer<TSchema>) => Promise<ActionState> {
  return async (input) => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      console.error("[action-wrapper] Validation error:", parsed.error.format());
      return { success: false, message: messages.validationError, error: messages.validationError };
    }

    try {
      const result = await handler(parsed.data);
      if (result.success) {
        return { success: true, message: messages.success };
      }
      return { success: false, message: result.error ?? messages.serverError, error: result.error ?? messages.serverError };
    } catch (error) {
      console.error("[action-wrapper] Unhandled error:", error);
      return {
        success: false,
        message: messages.serverError,
        error: error instanceof Error ? error.message : messages.serverError,
      };
    }
  };
}

/**
 * HOF para server actions simples que no requieren validación Zod.
 * Uso: acciones que delegan directamente a un servicio (clinical actions).
 *
 * @param handler - Función async que recibe el input y retorna {success, message, error?}
 */
export function createAction<TInput>(
  handler: (input: TInput) => Promise<{ success: boolean; message: string; error?: string }>
): (input: TInput) => Promise<ActionState> {
  return async (input) => {
    try {
      return await handler(input);
    } catch (error) {
      console.error("[action-wrapper] Unhandled error:", error);
      return {
        success: false,
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error interno del servidor",
      };
    }
  };
}

/**
 * Adaptador para hacer una acción compatible con useActionState de React 19.
 * useActionState requiere la firma: (prevState, input) => Promise<State>
 *
 * @param action - Función que recibe input y retorna ActionState
 * @returns Función compatible con useActionState (ignora prevState)
 */
export function toActionStateHandler<TInput>(
  action: (input: TInput) => Promise<ActionState>
): (prevState: ActionState, input: TInput) => Promise<ActionState> {
  return async (_prevState, input) => action(input);
}
