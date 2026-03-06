import styles from './Testimonials.module.css';

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
    <section className={styles.testimonialsSection} id="testimonios">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <span className={styles.badge}>MÁS DE 500 PACIENTES ATENDIDOS</span>
          <h2 className={styles.title}>Historias de Transformación</h2>
          <p className={styles.subtitle}>
            El verdadero éxito de la medicina integrativa se mide en cómo mejora
            la calidad de vida de quienes confían en nosotros.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className={styles.star} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <blockquote className={styles.quote}>&quot;{testimonial.quote}&quot;</blockquote>
              <div className={styles.author}>
                <div className={styles.avatarPlaceholder}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className={styles.authorName}>{testimonial.name}</h4>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
