"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 bg-gradient-to-br from-[#f5f0eb] via-[#eef1ec] to-[#e8ebe5]">
      {/* Decorative background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-kapha/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo / Brand Mark */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sidebar shadow-lg shadow-sidebar/20">
            <Leaf className="h-7 w-7 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Portal Clínico
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Medicina Integrativa & Ayurveda
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/60 bg-white/80 p-8 shadow-xl shadow-black/[0.03] backdrop-blur-sm">
          <form action={formAction} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                htmlFor="login-email"
              >
                Correo electrónico
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="doctora@clinica.com"
                required
                autoComplete="email"
                className="flex h-11 w-full rounded-xl border border-input bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                htmlFor="login-password"
              >
                Contraseña
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="flex h-11 w-full rounded-xl border border-input bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Ingresando…
                </span>
              ) : (
                "Ingresar al Portal"
              )}
            </button>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errorMessage}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          Acceso exclusivo para profesionales autorizados
        </p>
      </div>
    </div>
  );
}
