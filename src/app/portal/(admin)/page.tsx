export default function PortalDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard General</h1>
        <p className="text-slate-500 mt-1">Resumen de actividad y pacientes recientes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="font-medium text-sm text-slate-500">Pacientes Totales</div>
          <div className="mt-2 text-3xl font-bold">128</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="font-medium text-sm text-slate-500">Consultas Mes</div>
          <div className="mt-2 text-3xl font-bold">45</div>
        </div>
      </div>
    </div>
  );
}
