import Image from 'next/image';

export default function AboutMe() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="filosofia">
      <div className="container grid grid-cols-1 gap-16 items-center lg:grid-cols-[5fr_7fr] lg:gap-24">

        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-xl bg-border z-[2]">
            {/* Usamos un placeholder ilustrativo, el usuario lo puede cambiar luego */}
            <Image
              src="/doctora-retrato.png" /* Idealmente el usuario sube su propia foto aquí */
              alt="Dra. especialista en medicina integrativa"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Elemento de diseño orgánico detrás de la imagen */}
            <div className="absolute -top-5 -left-5 md:-top-[30px] md:-left-10 w-full h-full rounded-[20px_100px_30px_80px] bg-primary/15 -z-10 -rotate-[5deg]"></div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="inline-block self-start py-1.5 px-4 bg-primary/10 text-primary-hover rounded-full text-xs font-semibold tracking-wide uppercase">
            SOBRE MÍ
          </span>
          <h2 className="text-[2.2rem] md:text-[2.8rem] text-foreground mb-2">
            Integrando la ciencia y la sabiduría milenaria
          </h2>

          <div className="flex flex-col gap-5 text-lg text-[#4b5563] leading-[1.7] [&_strong]:text-foreground [&_strong]:font-semibold">
            <p>
              Mi enfoque nace de una convicción profunda: el cuerpo humano no es
              un conjunto de partes aisladas, sino un ecosistema donde todo está conectado.
              Como médica, mi compromiso es ir más allá del síntoma y comprender
              la raíz de tu malestar.
            </p>
            <p>
              Combinando la precisión diagnóstica de la <strong>medicina alopática tradicional</strong> con
              la visión holística y preventiva del <strong>Ayurveda</strong>, diseñamos estrategias
              médicas que respetan tu ritmo natural y fomentan una sanación real
              y duradera.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-serif text-[1.4rem] text-foreground mb-1">Dra. Nombre Apellido</h4>
            <span className="block text-[0.95rem] text-primary">MD, Especialista en Medicina Integrativa</span>
          </div>
        </div>

      </div>
    </section>
  );
}
