import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Portal Clínico</h1>
          <p className="text-sm text-slate-500 mt-2">Ingresa tus credenciales para continuar</p>
        </div>
        
        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData, { redirectTo: "/" });
          }}
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
            className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors"
          >
            Ingresar al Portal
          </button>
        </form>
      </div>
    </div>
  );
}
