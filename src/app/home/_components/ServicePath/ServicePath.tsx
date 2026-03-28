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
    <section className="w-full py-24 bg-background md:py-16" id="como-funciona">
      <div className="container flex flex-col items-center">

        <div className="text-center mb-16">
          <h2 className="text-[2.25rem] text-foreground mb-4">Tu camino al bienestar</h2>
          <div className="w-[60px] h-0.5 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full lg:gap-6 md:grid-cols-1 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group bg-surface px-8 py-12 lg:px-6 lg:py-8 rounded-2xl shadow-landing-sm flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-landing-md"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-8 transition-all duration-300 ease-in-out group-hover:bg-primary group-hover:text-white group-hover:scale-105">
                {step.icon}
              </div>
              <div className="font-sans font-bold text-lg text-foreground mb-4">{step.id}. {step.title}</div>
              <p className="text-gray-500 leading-relaxed text-[0.95rem]">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
