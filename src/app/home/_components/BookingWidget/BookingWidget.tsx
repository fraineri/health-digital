'use client';

import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import styles from './BookingWidget.module.css';

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
      <section className={styles.bookingSection} id="booking">
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Da el primer paso hacia tu bienestar</h2>
            <p className={styles.subtitle}>Cargando calendario de reservas...</p>
          </div>
          <div className={styles.skeleton}></div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.bookingSection} id="booking">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>RESERVA TU TURNO</span>
          <h2 className={styles.title}>Da el primer paso hacia tu bienestar</h2>
          <p className={styles.subtitle}>
            Elige el horario que mejor se adapte a ti. Al confirmar tu reserva,
            te enviaremos un cuestionario previo para llegar con contexto a nuestra consulta.
          </p>
        </div>
        
        <div className={styles.calWrapper}>
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
