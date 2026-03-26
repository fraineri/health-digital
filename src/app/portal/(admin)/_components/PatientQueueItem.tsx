"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppointmentType } from "@prisma/client";

interface PatientQueueItemProps {
  id: string;        // Appointment ID
  patientId: string; // Patient ID
  time: string;
  name: string;
  reasonForVisit?: string | null;
  bookingStatus?: string; // e.g. "DONE"
  status: "now" | "upcoming" | "past";
  active?: boolean;
}

const TYPE_TRANSLATIONS: Record<AppointmentType, string> = {
  FIRST_CONSULTATION: "Primera Consulta",
  FOLLOW_UP: "Seguimiento",
};

export function PatientQueueItem({ 
  patientId,
  time, 
  name, 
  reasonForVisit,
  bookingStatus,
  status, 
  active 
}: PatientQueueItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOpenRecord = () => {
    // Optimistically show feedback or transition immediately
    startTransition(() => {
      router.push(`/pacientes/${patientId}`);
    });
  };

  const displayType = reasonForVisit || "Consulta General";

  return (
    <div
      onClick={handleOpenRecord}
      className={`p-4 border-b border-border/40 cursor-pointer transition-colors ${
        active || isPending
          ? "bg-workspace relative after:absolute after:top-0 after:bottom-0 after:-left-px after:w-1 after:bg-primary"
          : "hover:bg-workspace/50"
      } ${isPending ? "opacity-70 animate-pulse" : ""}`}
    >
      <div className="flex justify-between items-start mb-2">
        {status === "now" ? (
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
            Ahora
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-400">{time}</span>
        )}
        
        {bookingStatus === "DONE" && (
           <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
             COMPLETADA
           </span>
        )}
      </div>
      
      <h3 className={`text-base font-semibold mb-1 ${active || isPending ? "text-foreground" : "text-slate-700"}`}>
        {name}
      </h3>
      <p className="text-xs text-slate-500 mb-3 line-clamp-1" title={displayType}>
        {displayType}
      </p>
      
      {active || isPending ? (
        <button 
          className="w-full bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-medium py-2 rounded-md transition-colors shadow-sm"
        >
          {isPending ? "Cargando..." : (bookingStatus === "DONE" ? "Ver Consulta" : "Abrir Ficha")}
        </button>
      ) : (
        <span className="text-xs font-medium text-primary cursor-pointer hover:underline">
          Ver detalles
        </span>
      )}
    </div>
  );
}
