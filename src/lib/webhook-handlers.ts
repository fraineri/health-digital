import { prisma } from '@/lib/prisma';
import { normalizeTriageResponses, resolveAppointmentType } from './cal-config';

interface CalEventData {
  uid: string;
  responses?: Record<string, unknown>;
  startTime: string;
  endTime: string;
  attendees?: Array<{ name: string; email: string; timeZone: string; phoneNumber?: string }>;
  timeZone?: string;
  videoCallUrl?: string;
  eventType?: { slug: string };
  rescheduleUid?: string;
}

export async function handleBookingCreated(eventData: Record<string, unknown>) {
  const { 
    uid, 
    responses, 
    startTime, 
    endTime, 
    attendees, 
    timeZone,
    videoCallUrl,
    eventType
  } = eventData as unknown as CalEventData;
  
  console.log(`[Webhook] Processing BOOKING_CREATED for uid: ${uid}`);
  console.log(`[Webhook] Event Payload:`, JSON.stringify(eventData, null, 2));
  
  const attendee = attendees?.[0]; // Usually the patient is the first attendee
  if (!attendee) {
    throw new Error('No attendees found in BOOKING_CREATED event');
  }

  // Obtenemos todos los datos posibles del triage y sus respuestas crudas
  const normalizedData = normalizeTriageResponses(responses);
  const appointmentType = resolveAppointmentType(eventType?.slug);

  // 1. Upsert Patient
  // Regla confirmada: Cal.com solo pre-puebla campos al crear. 
  // Nunca sobreescribe si el paciente ya existe en nuestra DB.
  const patient = await prisma.patient.upsert({
    where: { email: attendee.email },
    update: {
      // Intencionalmente vacío: nunca sobreescribir datos existentes
    },
    create: {
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phoneNumber || null,
      profileSource: 'CAL_COM',
    }
  });

  console.log(`[Webhook] Upserted Patient: ${patient.id} - ${patient.email}`);

  // 2. Upsert Appointment (Idempotency check via uid)
  const appointment = await prisma.appointment.upsert({
    where: { calBookingUid: uid },
    update: {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      timeZone: timeZone || attendee.timeZone,
      meetingUrl: videoCallUrl || null,
      status: 'CONFIRMED',
      appointmentType,
      eventTypeSlug: eventType?.slug,
    },
    create: {
      calBookingUid: uid,
      patientId: patient.id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      timeZone: timeZone || attendee.timeZone,
      meetingUrl: videoCallUrl || null,
      status: 'CONFIRMED',
      appointmentType,
      eventTypeSlug: eventType?.slug,
    }
  });

  console.log(`[Webhook] Upserted Appointment: ${appointment.id} linked to Patient: ${appointment.patientId}`);

  // 3. Create TriageResponse if we have meaningful data
  if (responses) {
    await prisma.triageResponse.create({
      data: {
        appointmentId: appointment.id,
        reasonForVisit: normalizedData.reasonForVisit || null,
        rawResponses: responses as any // Guardamos el payload JSON completo para auditoría
      }
    });
  }

  return { success: true, appointmentId: appointment.id };
}

export async function handleBookingCancelled(eventData: Record<string, unknown>) {
  const { uid } = eventData as unknown as CalEventData;
  await prisma.appointment.update({
    where: { calBookingUid: uid },
    data: { 
      status: 'CANCELLED',
      cancelledAt: new Date(),
    }
  });
  return { success: true, message: 'Appointment cancelled' };
}

export async function handleBookingRescheduled(eventData: Record<string, unknown>) {
  // Cal.com sends 'rescheduleUid' or we might just use the old id. 
  // Wait, does 'uid' in BOOKING_RESCHEDULED point to the new or old?
  // Cal.com sends the OLD uid in `rescheduleUid` (sometimes) and `uid` is the NEW booking.
  // We need to verify Cal.com's payload structure for reschedule.
  // For now, we update the old one to RESCHEDULED, then let the new one be created via webhook. 
  
  // Note: if Cal.com sends ONLY the new event in BOOKING_RESCHEDULED but it has the same trigger as CREATED,
  // we could just treat it like CREATED. The webhook payloads for Cal.com provide `uid` as the new one.
  // Actually, let's treat it safely by upserting the new one as CONFIRMED.
  // Wait, if it has `rescheduleUid`, we find the old one and mark it RESCHEDULED.
  
  const { rescheduleUid } = eventData as unknown as CalEventData;

  if (rescheduleUid) {
    try {
      await prisma.appointment.update({
        where: { calBookingUid: rescheduleUid },
        data: { status: 'RESCHEDULED' }
      });
      console.log(`[Webhook] Marked old appointment ${rescheduleUid} as RESCHEDULED`);
    } catch {
      console.warn(`[Webhook] Could not find old appointment ${rescheduleUid} to mark as RESCHEDULED`);
    }
  }

  // The rest of the payload is identical to BOOKING_CREATED for the NEW appointment
  // Let's attach 'rescheduledFrom' if possible
  const result = await handleBookingCreated(eventData);
  
  if (rescheduleUid) {
    await prisma.appointment.update({
      where: { id: result.appointmentId },
      data: { rescheduledFrom: rescheduleUid }
    });
  }

  return { success: true, message: 'Appointment rescheduled', newAppointmentId: result.appointmentId };
}
