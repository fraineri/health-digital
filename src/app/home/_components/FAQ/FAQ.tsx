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
    <section className="w-full py-24 bg-surface max-md:py-16" id="faq">
      <div className="container flex flex-col items-center max-w-[800px]">

        <div className="text-center mb-16">
          <h2 className="text-[2.25rem] text-foreground mb-2 max-md:text-[2rem]">Preguntas Frecuentes</h2>
          <p className="text-[#6b7280] text-lg">Resolvemos tus dudas sobre nuestra metodología de atención.</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-transparent border-b border-border transition-all" name="faq-accordion">
              <summary className="list-none [&::-webkit-details-marker]:hidden py-6 cursor-pointer flex justify-between items-center text-lg font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 group-open:text-primary max-md:text-base max-md:py-5">
                {faq.question}
                <span className="flex items-center justify-center w-6 h-6 text-[#9ca3af] transition-colors group-hover:text-primary">
                  <svg className="block group-open:hidden transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <svg className="hidden group-open:block transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </summary>
              <div className="pb-8 text-[#4b5563] leading-[1.7] text-base animate-slide-down">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
