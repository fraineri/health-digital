import { getTodaysAppointments, getAppointmentStatus } from "@/lib/appointments";
import { PatientQueueItem } from "./PatientQueueItem";
import { Leaf } from "lucide-react";
import { InboxRefresher } from "./InboxRefresher";

export async function AppointmentInbox({ activePatientId }: { activePatientId?: string }) {
  const appointments = await getTodaysAppointments();
  
  const todayDate = new Intl.DateTimeFormat('es-AR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  const hasAppointments = appointments.length > 0;

  return (
    <div className="w-80 md:w-96 border-r border-border/40 bg-white flex flex-col shrink-0 h-full relative">
      <InboxRefresher />
      
      {/* Queue Header */}
      <div className="h-20 px-6 flex flex-col justify-center border-b border-border/40 shrink-0">
        <h2 className="text-xl font-bold text-slate-800">Pacientes de Hoy</h2>
        <span className="text-sm text-slate-500 font-medium capitalize">{todayDate}</span>
      </div>
      
      {/* Queue List / Empty State */}
      <div className="flex-1 overflow-y-auto">
        {!hasAppointments ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-600 mb-1">Día libre</h3>
            <p className="text-sm text-slate-400">Sin consultas programadas para hoy.</p>
          </div>
        ) : (
          appointments.map((apt) => {
            const status = getAppointmentStatus(apt.startTime, apt.endTime);
            const timeStr = new Intl.DateTimeFormat('es-AR', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: apt.timeZone
            }).format(new Date(apt.startTime));

            // Extraemos reasonForVisit explícitamente del TriageResponse más reciente
            // Si el webhook guarda más de uno (no debería), el primero basta
            const triage = apt.triageResponses?.[0];

            return (
              <PatientQueueItem 
                key={apt.id}
                id={apt.id}
                patientId={apt.patientId}
                time={timeStr}
                name={apt.patient.name}
                appointmentType={apt.appointmentType}
                reasonForVisit={triage?.reasonForVisit}
                status={status}
                active={activePatientId === apt.patientId}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
