import styles from './ServicePath.module.css';

export default function ServicePath() {
  const steps = [
    {
      id: 1,
      title: 'Reserva',
      description: 'Selecciona el horario que mejor se adapte a tu rutina para tu primera consulta online o presencial.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Cuestionario',
      description: 'Completa un perfil detallado sobre tus hábitos, constitución física (Doshas) y objetivos médicos.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Plan Personalizado',
      description: 'Recibe una hoja de ruta única integrando nutrición, suplementos, rutinas y cambios de estilo de vida.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    }
  ];

  return (
    <section className={styles.serviceSection} id="como-funciona">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Tu camino al bienestar</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {step.icon}
              </div>
              <div className={styles.stepNumber}>{step.id}. {step.title}</div>
              <p className={styles.description}>{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
