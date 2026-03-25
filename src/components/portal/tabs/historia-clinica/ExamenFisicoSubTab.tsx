import { Stethoscope } from "lucide-react";

export function ExamenFisicoSubTab() {
  return (
    <div className="h-full m-0 p-10 overflow-y-auto !custom-scrollbar pb-40">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-border/40 p-12 flex flex-col items-center justify-center text-center gap-4 text-slate-400 shadow-sm min-h-[300px]">
          <Stethoscope className="w-10 h-10 opacity-30 mb-2" />
          <div>
            <h3 className="text-base font-bold text-slate-600 mb-1">
              Examen Físico
            </h3>
            <p className="text-sm font-medium">
              Registro de signos vitales y hallazgos del examen clínico (Próximamente)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
