"use client";

import { useState } from "react";
import type { DecryptedConsultation } from "@/services/consultation.service";
import { isV2Snapshot } from "@/domain/ayurveda/dosha-scoring";
import { Calendar, ChevronDown, ChevronUp, FileText, Activity } from "lucide-react";

interface ConsultationHistoryProps {
  consultations: DecryptedConsultation[];
  currentAppointmentId?: string;
}

export function ConsultationHistory({ consultations, currentAppointmentId }: ConsultationHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter out the current appointment so we don't show what they are currently editing
  const history = consultations.filter(c => c.appointmentId !== currentAppointmentId);

  if (history.length === 0) {
    return (
      <div className="bg-slate-50 border border-border/40 rounded-2xl p-8 text-center text-slate-500">
        <FileText className="w-8 h-8 mx-auto opacity-30 mb-2" />
        <p className="text-sm font-medium">No hay consultas previas registradas para este paciente.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 uppercase flex items-center gap-2 px-2">
        <HistoryIcon className="w-4 h-4" /> Historial de Consultas
      </h3>
      
      <div className="flex flex-col gap-3">
        {history.map((consultation) => {
          const isExpanded = expandedId === consultation.id;
          const date = new Date(consultation.createdAt).toLocaleDateString("es-AR", {
            day: 'numeric', month: 'long', year: 'numeric'
          });

          return (
            <div key={consultation.id} className="bg-white border text-left border-border/60 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-primary/30 group">
              <button 
                onClick={() => setExpandedId(isExpanded ? null : consultation.id)}
                className="w-full px-6 py-5 flex items-start justify-between bg-white focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">{date}</p>
                    {consultation.diagnosis ? (
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 max-w-sm">
                        {consultation.diagnosis}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-0.5 italic">Sin diagnóstico registrado</p>
                    )}
                  </div>
                </div>
                <div className="text-slate-400 pt-2">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-border/20 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    {/* Left Column: Notes & Symptoms */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                          <FileText className="w-3 h-3 text-slate-400" /> Notas de Sesión
                        </h4>
                        <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                          {consultation.notes || <span className="text-slate-400 italic">No hay notas registradas.</span>}
                        </p>
                      </div>

                      {consultation.symptomSnapshot && (
                        <div>
                          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <Activity className="w-3 h-3 text-slate-400" /> Evaluación Registrada
                          </h4>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {isV2Snapshot(consultation.symptomSnapshot) ? (
                              <span className="bg-white border border-border/50 px-2 py-1 rounded text-slate-500">
                                {Object.keys(consultation.symptomSnapshot.distributions).length} atributos evaluados
                              </span>
                            ) : (
                              <span className="bg-white border border-border/50 px-2 py-1 rounded text-slate-500">
                                {Object.values(consultation.symptomSnapshot).filter((v: unknown) => typeof v === 'number' && v > 0).length} síntomas (evaluación anterior)
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Diagnosis & Treatment Snippet */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-slate-700 mb-2">Diagnóstico</h4>
                        <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                          {consultation.diagnosis || <span className="text-slate-400 italic">No especificado.</span>}
                        </p>
                      </div>
                      
                      {(consultation.nutritionPlan || consultation.phytotherapy || consultation.dailyRoutine) && (
                         <div>
                           <h4 className="font-bold text-slate-700 mb-2">Tratamiento Indicado</h4>
                           <ul className="space-y-2 text-slate-600">
                             {consultation.nutritionPlan && <li><strong className="text-slate-700">Nutrición:</strong> {consultation.nutritionPlan.substring(0, 50)}...</li>}
                             {consultation.phytotherapy && <li><strong className="text-slate-700">Fitoterapia:</strong> {consultation.phytotherapy.substring(0, 50)}...</li>}
                             {consultation.dailyRoutine && <li><strong className="text-slate-700">Rutina:</strong> {consultation.dailyRoutine.substring(0, 50)}...</li>}
                           </ul>
                         </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Inline helper for the icon
function HistoryIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  )
}
