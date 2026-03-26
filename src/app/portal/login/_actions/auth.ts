"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData, { redirectTo: "/portal" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas. Por favor intenta de nuevo.";
        default:
          return "Ocurrió un error. Por favor intenta de nuevo.";
      }
    }
    throw error;
  }
}
