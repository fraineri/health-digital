import { BookOpen } from "lucide-react";

export function CuadernilloTab() {
  return (
    <div className="h-full m-0 p-10 overflow-y-auto !custom-scrollbar pb-40">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-dashed border-border/60 p-16 flex flex-col items-center justify-center text-center gap-6 shadow-sm">
        <div className="bg-primary/5 p-6 rounded-full">
          <BookOpen className="w-12 h-12 text-primary/40" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">
            Cuadernillo del Paciente
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Módulo en desarrollo. Aquí podrás asignar trackers de hábitos, visualizar los registros diarios del paciente y compartir recursos educativos de forma interactiva.
          </p>
        </div>
        <button className="mt-4 px-6 py-2.5 bg-slate-100 text-slate-500 rounded-full text-sm font-bold border border-slate-200 cursor-not-allowed">
          Próximamente
        </button>
      </div>
    </div>
  );
}
