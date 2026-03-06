import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { handleBookingCreated, handleBookingCancelled, handleBookingRescheduled } from '@/lib/webhook-handlers';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-cal-signature-256') || req.headers.get('cal-signature') || '';
    const secret = process.env.CAL_WEBHOOK_SECRET;

    console.log('--- NUEVO WEBHOOK DE CAL.COM ---');
    console.log('Body length:', rawBody.length);
    console.log('Tiene signature?:', !!signature);
    
    // Strict HMAC validation (T2.1)
    if (!secret) {
      console.error('❌ ERROR: CAL_WEBHOOK_SECRET no configurado. Abortando por seguridad.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

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

    const payload = JSON.parse(rawBody);
    const { triggerEvent, payload: eventData } = payload;
    
    console.log('Evento recibido:', triggerEvent);
    console.log('UID del evento:', eventData?.uid);

    // Route by trigger event
    switch (triggerEvent) {
      case 'BOOKING_CREATED': {
        const result = await handleBookingCreated(eventData);
        return NextResponse.json(result);
      }
      case 'BOOKING_RESCHEDULED': {
        const result = await handleBookingRescheduled(eventData);
        return NextResponse.json(result);
      }
      case 'BOOKING_CANCELLED': {
        const result = await handleBookingCancelled(eventData);
        return NextResponse.json(result);
      }
      default:
        // Acknowledge other events without action
        return NextResponse.json({ success: true, message: 'Event ignored' });
    }

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

