import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Cal.com usually sends the responses as an object where keys are the questions or keys.
// We make a helper to extract responses from their generic payload.
const extractResponses = (responses: Record<string, any>) => {
  // Agregamos el identifier 'motivoconsulta' que definiste en Cal.com
  const reasonForVisit = responses?.['reason_for_visit']?.value || responses?.['Motivo']?.value || responses?.['motivoconsulta']?.value || '';
  
  return { reasonForVisit };
};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    // Cal.com usa x-cal-signature-256 por defecto en las versiones recientes
    const signature = req.headers.get('x-cal-signature-256') || req.headers.get('cal-signature') || '';
    const secret = process.env.CAL_WEBHOOK_SECRET;

    console.log('--- NUEVO WEBHOOK DE CAL.COM ---');
    console.log('Body length:', rawBody.length);
    console.log('Tiene signature?:', !!signature);
    console.log('Tiene secret configurado en .env?:', !!secret);

    if (secret) {
      // Validate signature if secret is provided in env
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('❌ ERROR: Firma inválida. Expected:', expectedSignature, 'Got:', signature);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      } else {
        console.log('✅ Firma validada correctamente');
      }
    } else {
      console.warn('⚠️ No hay CAL_WEBHOOK_SECRET configurado, omitiendo validación de firma.');
    }

    const payload = JSON.parse(rawBody);
    const { triggerEvent, payload: eventData } = payload;
    
    console.log('Evento recibido:', triggerEvent);
    console.log('UID del evento:', eventData?.uid);

    // We only care about BOOKING_CREATED or BOOKING_RESCHEDULED right now
    if (triggerEvent === 'BOOKING_CREATED' || triggerEvent === 'BOOKING_RESCHEDULED') {
      const { 
        uid, 
        responses, 
        startTime, 
        endTime, 
        attendees, 
        timeZone,
        videoCallUrl 
      } = eventData;
      
      const attendee = attendees?.[0]; // Usually the patient is the first attendee
      if (!attendee) {
        return NextResponse.json({ error: 'No attendees found' }, { status: 400 });
      }

      // 1. Upsert Patient
      const patient = await prisma.patient.upsert({
        where: { email: attendee.email },
        update: {
          name: attendee.name,
          phone: attendee.timeZone || null, // Cal.com might send phone in responses
        },
        create: {
          name: attendee.name,
          email: attendee.email,
        }
      });

      // 2. Upsert Appointment (Idempotency check via uid)
      const appointment = await prisma.appointment.upsert({
        where: { calBookingUid: uid },
        update: {
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          timeZone: timeZone || attendee.timeZone,
          meetingUrl: videoCallUrl || null,
          status: 'CONFIRMED'
        },
        create: {
          calBookingUid: uid,
          patientId: patient.id,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          timeZone: timeZone || attendee.timeZone,
          meetingUrl: videoCallUrl || null,
          status: 'CONFIRMED'
        }
      });

      // 3. Create TriageResponses if they exist
      if (responses) {
        const { reasonForVisit } = extractResponses(responses);
        
        // Use a simple create or we could try to upsert based on appointmentId if extending model
        await prisma.triageResponse.create({
          data: {
            appointmentId: appointment.id,
            reasonForVisit,
          }
        });
      }

      return NextResponse.json({ success: true, appointmentId: appointment.id });
    }
    
    // Handle Cancellations
    if (triggerEvent === 'BOOKING_CANCELLED') {
      const { uid } = eventData;
      await prisma.appointment.update({
        where: { calBookingUid: uid },
        data: { status: 'CANCELLED' }
      });
      return NextResponse.json({ success: true, message: 'Appointment cancelled' });
    }

    // Acknowledge other events without action
    return NextResponse.json({ success: true, message: 'Event ignored' });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
