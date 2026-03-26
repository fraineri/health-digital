import styles from './FAQ.module.css';

export default function FAQ() {
  const faqs = [
    {
      question: '¿Qué es la medicina integrativa?',
      answer: 'La medicina integrativa es un enfoque que combina los métodos convencionales de la medicina occidental con terapias basadas en la evidencia científica de la medicina Ayurveda y otras disciplinas ancestrales. Su objetivo es tratar no solo los síntomas, sino la raíz del desequilibrio físico y emocional.'
    },
    {
      question: '¿Qué métodos de pago aceptas?',
      answer: 'Aceptamos transferencias bancarias locales, tarjetas de crédito mediante plataformas seguras y métodos de pago internacionales (como PayPal o criptomonedas) para consultas virtuales desde el exterior.'
    },
    {
      question: '¿Atiendes por obra social o prepaga?',
      answer: 'Por el momento, la atención es exclusivamente particular (privada). Esto nos permite dedicar el tiempo necesario (generalmente 60 a 90 minutos) para una evaluación integral exhaustiva que los modelos tradicionales no contemplan. Emitimos factura médica para solicitar reintegro si tu plan lo permite.'
    },
    {
      question: '¿Necesito conocimientos previos de Ayurveda?',
      answer: 'No, en absoluto. Durante la consulta, la doctora te explicará de manera sencilla y clara los conceptos relacionados con tu biotipo (Dosha) y el tratamiento propuesto. El objetivo es que la sabiduría del Ayurveda se adapte a ti, de manera simple y práctica, guiada por un profesional médico clásico.'
    },
    {
      question: '¿Las consultas son presenciales u online?',
      answer: 'Ambas modalidades están disponibles. Ofrecemos atención presencial en nuestro consultorio ubicado en la ciudad de Córdoba (Argentina), y consultas online para pacientes de todo el país y el mundo, manteniendo el mismo nivel de personalización y seguimiento.'
    }
  ];

  return (
    <section className={styles.faqSection} id="faq">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Preguntas Frecuentes</h2>
          <p className={styles.subtitle}>Resolvemos tus dudas sobre nuestra metodología de atención.</p>
        </div>

        <div className={styles.accordionContainer}>
          {faqs.map((faq, index) => (
            <details key={index} className={styles.details} name="faq-accordion">
              <summary className={styles.summary}>
                {faq.question}
                <span className={styles.iconWrapper}>
                  <svg className={styles.iconPlus} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <svg className={styles.iconMinus} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </summary>
              <div className={styles.content}>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
