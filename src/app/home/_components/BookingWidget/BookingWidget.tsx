'use client';

import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

interface BookingWidgetProps {
  calLink?: string; // Por ejemplo: dra-apellido/consulta-virtual
}

export default function BookingWidget({ calLink = 'rick/15min' }: BookingWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#2b5a59' } },
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    })();
  }, []);

  if (!mounted) {
    return (
      <section
        className="py-24 px-8 bg-surface flex justify-center items-center relative overflow-hidden max-md:py-16 max-md:px-6 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(162,189,156,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(162,189,156,0.05),transparent_50%)] before:pointer-events-none"
        id="booking"
      >
        <div className="max-w-[1000px] w-full mx-auto relative z-[1] flex flex-col gap-12">
          <div className="text-center max-w-[600px] mx-auto flex flex-col gap-4 items-center">
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-landing-fg leading-[1.2]">
              Da el primer paso hacia tu bienestar
            </h2>
            <p className="text-lg text-text-muted-warm leading-relaxed">
              Cargando calendario de reservas...
            </p>
          </div>
          <div className="w-full h-[600px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 px-8 bg-surface flex justify-center items-center relative overflow-hidden max-md:py-16 max-md:px-6 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(162,189,156,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(162,189,156,0.05),transparent_50%)] before:pointer-events-none"
      id="booking"
    >
      <div className="max-w-[1000px] w-full mx-auto relative z-[1] flex flex-col gap-12">
        <div className="text-center max-w-[600px] mx-auto flex flex-col gap-4 items-center">
          <span className="inline-block py-1 px-4 bg-[rgba(162,189,156,0.2)] text-primary rounded-full text-xs font-semibold tracking-wide uppercase">
            RESERVA TU TURNO
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-landing-fg leading-[1.2]">
            Da el primer paso hacia tu bienestar
          </h2>
          <p className="text-lg text-text-muted-warm leading-relaxed">
            Elige el horario que mejor se adapte a ti. Al confirmar tu reserva,
            te enviaremos un cuestionario previo para llegar con contexto a nuestra consulta.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] p-4 min-h-[600px] flex items-center justify-center border border-black/[0.04] max-md:p-0 max-md:shadow-none max-md:border-0 max-md:bg-transparent">
          <Cal
            calLink={calLink}
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            config={{ layout: 'month_view' }}
          />
        </div>
      </div>
    </section>
  );
}
