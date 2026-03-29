"use client";

import { useFormContext } from "react-hook-form";
import { FileEdit } from "lucide-react";
import { ConsultationHistory } from "../medical-record/ConsultationHistory";
import type { DecryptedConsultation } from "@/services/consultation.service";
import type { WorkspaceFormValues } from "@/domain/ayurveda/consultation-schema";

interface NotasConsultaTabProps {
  historicalConsultations: DecryptedConsultation[];
  currentAppointmentId?: string;
}

export function NotasConsultaTab({
  historicalConsultations,
  currentAppointmentId,
}: NotasConsultaTabProps) {
  const { register } = useFormContext<WorkspaceFormValues>();

  return (
    <div className="w-full max-w-4xl mx-auto p-10 flex flex-col gap-12">
      <section className="bg-white rounded-3xl border border-border/40 shadow-sm p-10 flex flex-col">
        <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase flex items-center gap-2">
          <FileEdit className="w-4 h-4" /> Notas de la Sesión
        </h3>
        <textarea
          {...register("notes")}
          placeholder="Escribe tus notas libres aquí..."
          className="w-full flex-1 min-h-[300px] bg-slate-50/50 border border-border/40 rounded-2xl p-6 text-slate-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-y !custom-scrollbar"
        />
      </section>

      <section>
        <ConsultationHistory
          consultations={historicalConsultations}
          currentAppointmentId={currentAppointmentId}
        />
      </section>
    </div>
  );
}
