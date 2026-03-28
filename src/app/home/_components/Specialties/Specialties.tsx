export default function Specialties() {
  const specialties = [
    {
      id: 1,
      title: 'Salud Digestiva',
      description: 'Inflamación, SIBO, celiaquía, gastritis y síndrome de intestino irritable tratados desde la microbiota.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Balance Hormonal',
      description: 'Abordaje integral del SOP, hipotiroidismo, amenorrea y transición a la menopausia (Climaterio).',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Estrés y Ansiedad',
      description: 'Regulación del cortisol y sistema nervioso a través de adaptógenos, rutinas ayurvédicas y suplementación.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12A9 9 0 0 0 3 12a9 9 0 0 0 18 0Z"/>
          <path d="M12 8v4l3 3"/>
          <path d="M12 3v1"/>
          <path d="M12 20v1"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Trastornos Metabólicos',
      description: 'Resistencia a la insulina, sobrepeso y diabetes tipo 2 con enfoque nutricional y estilo de vida.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <path d="m12 11-2-2m0 0-2 2m2-2v4"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-background" id="especialidades">
      <div className="container flex flex-col gap-16">

        <div className="text-center max-w-[600px] mx-auto flex flex-col items-center gap-4">
          <span className="inline-block py-1.5 px-4 bg-primary/10 text-primary-hover rounded-full text-xs font-semibold tracking-wide uppercase">
            ÁREAS DE ENFOQUE
          </span>
          <h2 className="text-[2.4rem] text-foreground">Especialidades Clínicas</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Tratamientos diseñados para devolverle al cuerpo su capacidad innata de regularse.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-surface border border-border rounded-2xl p-10 px-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-landing-md hover:border-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-primary before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                {item.icon}
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mt-2">{item.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
