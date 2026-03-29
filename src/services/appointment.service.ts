import { prisma } from '@/lib/prisma';
import { Appointment, Patient, TriageResponse } from '@prisma/client';

export type AppointmentWithPatient = Appointment & {
  patient: Patient;
  triageResponses: TriageResponse[];
};

export async function getTodaysAppointments(): Promise<AppointmentWithPatient[]> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return prisma.appointment.findMany({
    where: {
      startTime: {
        gte: today,
        lt: tomorrow,
      },
      status: {
        not: 'CANCELLED',
      },
    },
    include: {
      patient: true,
      triageResponses: true,
    },
    orderBy: {
      startTime: 'asc',
    },
  });
}

export function isCurrentAppointment(startTime: Date, endTime: Date): boolean {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const MARGIN_MS = 15 * 60 * 1000;
  return now >= (start - MARGIN_MS) && now <= end;
}

export function getAppointmentStatus(startTime: Date, endTime: Date): "now" | "upcoming" | "past" {
  if (isCurrentAppointment(startTime, endTime)) {
    return "now";
  }
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  if (now > end) {
    return "past";
  }
  return "upcoming";
}
