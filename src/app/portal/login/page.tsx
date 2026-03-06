"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Portal Clínico</h1>
          <p className="text-sm text-slate-500 mt-2">Ingresa tus credenciales para continuar</p>
        </div>
        
        <form
          action={formAction}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-slate-700" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@portal.com"
              required
              className="flex h-10 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-slate-700" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="flex h-10 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Ingresando..." : "Ingresar al Portal"}
          </button>
          
          {errorMessage && (
            <div className="text-sm text-red-500 font-medium text-center p-2 rounded bg-red-50 border border-red-100">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
