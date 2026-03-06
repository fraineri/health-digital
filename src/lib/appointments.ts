import { prisma } from '@/lib/prisma';
import { Appointment, Patient, TriageResponse } from '@prisma/client';

export type AppointmentWithPatient = Appointment & {
  patient: Patient;
  triageResponses: TriageResponse[];
};

/**
 * Obtiene todas las citas para el día de hoy, ordenadas cronológicamente,
 * excluyendo explícitamente las canceladas.
 */
export async function getTodaysAppointments(): Promise<AppointmentWithPatient[]> {
  const now = new Date();
  
  // Establecemos el inicio y fin del día actual en la zona horaria local del servidor
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

/**
 * Determina si una cita está ocurriendo AHORA mismo utilizando un margen.
 * El margen por defecto es ±15 minutos (900,000 ms).
 */
export function isCurrentAppointment(startTime: Date, endTime: Date): boolean {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  
  const MARGIN_MS = 15 * 60 * 1000; // 15 minutos en ms
  
  // Está en curso si es mayor al inicio menos el margen,
  // y es menor al final.
  return now >= (start - MARGIN_MS) && now <= end;
}

/**
 * Determina el estado de la cita respecto a "ahora" para la UI.
 */
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
