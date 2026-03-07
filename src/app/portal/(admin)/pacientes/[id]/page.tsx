import { AppointmentInbox } from "@/components/portal/AppointmentInbox";
import { ConsultationWorkspace } from "@/components/portal/ConsultationWorkspace";
import { FileText, History, Share2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getConsultationByAppointmentId } from "@/lib/consultations";

export const dynamic = 'force-dynamic';

export default async function SelectedPatientPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Retrieve the patient
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        orderBy: { startTime: 'desc' },
        take: 1,
        include: { triageResponses: true }
      }
    }
  });

  if (!patient) {
    console.error(`[SelectedPatientPage] Patient NOT FOUND for ID: "${id}"`);
    return notFound();
  }

  console.log(`[SelectedPatientPage] Patient FOUND: ${patient.id} - ${patient.name}`);

  const latestAppointment = patient.appointments[0];
  const triage = latestAppointment?.triageResponses?.[0];
  
  let initialConsultationData = null;
  if (latestAppointment) {
    initialConsultationData = await getConsultationByAppointmentId(latestAppointment.id);
  }

  return (
    <>
      {/* Column 2: Inbox/Queue (Real Data Server Component) */}
      <AppointmentInbox activePatientId={id} />

      {/* Column 3: Clinical Workspace */}
      <div className="flex-1 bg-workspace relative flex flex-col h-full overflow-hidden">
        {/* Sticky Header with Actions */}
        <header className="px-10 py-8 shrink-0 flex items-start justify-between border-b border-border/40">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">{patient.name}</h1>
              {/* Optional: we could calculate age if we had dateOfBirth, using a mocked tag for aesthetics */}
              <span className="px-3 py-1 rounded-full bg-slate-200/50 text-slate-600 text-sm font-medium">Paciente</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <FileText className="w-4 h-4" />
              <span>Motivo de consulta: {triage?.reasonForVisit || "No especificado en el cuestionario previo."}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-slate-400">
            <button className="p-2 hover:bg-slate-200 hover:text-slate-600 rounded-full transition-colors"><History className="w-5 h-5"/></button>
            <button className="p-2 hover:bg-slate-200 hover:text-slate-600 rounded-full transition-colors"><Share2 className="w-5 h-5"/></button>
          </div>
        </header>

        {/* Dynamic Workspace powered by React Client Component */}
        <ConsultationWorkspace 
          patientId={id}
          appointmentId={latestAppointment?.id}
          initialData={initialConsultationData}
        />
      </div>
    </>
  );
}
