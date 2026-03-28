export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Llevaba años de médico en médico por mis problemas digestivos. Con el enfoque integrativo y los cambios en mi alimentación, mi inflamación desapareció en meses. Increíble.",
      name: "María Fernández",
      role: "Paciente de Salud Digestiva",
      rating: 5
    },
    {
      id: 2,
      quote: "Entender mi biotipo (Dosha) y cómo el estrés afectaba mi ciclo hormonal fue revelador. No solo me recetó suplementos, me enseñó a vivir de una manera más balanceada.",
      name: "Lucía Gómez",
      role: "Paciente de Balance Hormonal",
      rating: 5
    },
    {
      id: 3,
      quote: "Me sentía agotado todo el tiempo. Gracias al plan personalizado logré recuperar mi energía y mejorar mi calidad de sueño usando métodos naturales combinados con ciencia.",
      name: "Javier Ruiz",
      role: "Paciente de Estrés y Ansiedad",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-surface" id="testimonios">
      <div className="container flex flex-col gap-16">

        <div className="text-center max-w-[600px] mx-auto flex flex-col items-center gap-4">
          <span className="inline-block py-1.5 px-4 bg-primary/10 text-primary-hover rounded-full text-xs font-semibold tracking-wide uppercase">MÁS DE 500 PACIENTES ATENDIDOS</span>
          <h2 className="text-[2.4rem] text-foreground">Historias de Transformación</h2>
          <p className="text-lg text-[#4b5563] leading-relaxed">
            El verdadero éxito de la medicina integrativa se mide en cómo mejora
            la calidad de vida de quienes confían en nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-landing-bg rounded-2xl p-10 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-landing-sm">
              <div className="flex gap-1 text-star">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-sans italic text-lg text-foreground leading-relaxed grow">&quot;{testimonial.quote}&quot;</blockquote>
              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif text-xl font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-[1.05rem]">{testimonial.name}</h4>
                  <span className="block text-sm text-[#6b7280] mt-0.5">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
