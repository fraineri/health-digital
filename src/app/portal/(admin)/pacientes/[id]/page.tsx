import { AppointmentInbox } from "@/app/portal/(admin)/_components/AppointmentInbox";
import { PatientWorkspaceTabs } from "./_components/PatientWorkspaceTabs";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getConsultationByAppointmentId, getConsultationsByPatientId } from "@/queries/consultations";
import { getPatientProfile, calculateProfileScore } from "@/queries/patient-profile";
import { getStudyCatalogNames, getLatestStudiesForPatient } from "@/queries/studies";

export const dynamic = 'force-dynamic';

export default async function SelectedPatientPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Retrieve the base patient with appointments for the workspace
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

  // Retrieve the decrypted profile and calculate score
  const profile = await getPatientProfile(id);
  const profileScore = profile ? calculateProfileScore(profile) : 0;

  console.log(`[SelectedPatientPage] Patient FOUND: ${patient.id} - ${patient.name}`);

  const latestAppointment = patient.appointments[0];
  const triage = latestAppointment?.triageResponses?.[0];
  
  let initialConsultationData = null;
  if (latestAppointment) {
    initialConsultationData = await getConsultationByAppointmentId(latestAppointment.id);
  }

  // Fetch consultation history for the read-only Notes tab
  const historicalConsultations = await getConsultationsByPatientId(id);

  // Fetch study catalog and patient's latest study values
  const studyCatalog = await getStudyCatalogNames();
  const latestStudies = await getLatestStudiesForPatient(id);

  return (
    <>
      {/* Column 2: Inbox/Queue (Real Data Server Component) */}
      <AppointmentInbox activePatientId={id} />

      {/* Column 3: Clinical Workspace */}
      <div className="flex-1 bg-workspace relative flex flex-col h-full overflow-hidden">
        {profile && (
          <PatientWorkspaceTabs
            patientId={id}
            appointmentId={latestAppointment?.id}
            initialData={initialConsultationData}
            historicalConsultations={historicalConsultations}
            patient={profile}
            profileScore={profileScore}
            reasonForVisit={triage?.reasonForVisit || undefined}
            studyCatalog={studyCatalog}
            initialStudies={latestStudies}
          />
        )}
      </div>
    </>
  );
}
