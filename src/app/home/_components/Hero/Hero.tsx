import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="w-full pt-16 pb-24 max-md:pt-8 max-md:pb-16 bg-landing-bg relative overflow-hidden before:content-[''] before:absolute before:-top-[10%] before:-right-[5%] before:w-[600px] before:h-[600px] before:bg-[radial-gradient(circle,rgba(134,150,113,0.05)_0%,transparent_70%)] before:rounded-full before:pointer-events-none"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-[1]">

        {/* Left Column: Image wrapper with aesthetic styling */}
        <div className="relative w-full h-full min-h-[350px] md:min-h-[500px] lg:min-h-[500px] max-md:order-2">
          <div className="relative w-full h-full rounded-[2rem_4rem_2rem_4rem] max-md:rounded-[1.5rem_2.5rem_1.5rem_2.5rem] overflow-hidden shadow-[var(--shadow-landing-lg)] animate-float-up">
            <Image
              src="/hero-doctor.png"
              alt="Dra. en consultorio de medicina integrativa"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Soft organic overlay/shadow for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,17,40,0.1)] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Hero copy and CTAs */}
        <div className="flex flex-col justify-center opacity-0 max-md:order-1 max-md:animate-float-up max-md:transform-none md:translate-x-5 md:animate-slide-in">
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.1] text-landing-fg mb-6 tracking-tight">
            Medicina Integrativa: Lo mejor de Occidente y Ayurveda
          </h1>
          <p className="text-lg leading-[1.7] text-[#4a4a4a] mb-10 max-w-full md:max-w-[90%]">
            Un enfoque holístico para tu bienestar combinando ciencia médica moderna rigurosa y la sabiduría milenaria del Ayurveda para un equilibrio real.
          </p>

          <div className="flex gap-4 items-center flex-wrap">
            <Link
              href="#booking"
              className="bg-primary text-white py-4 px-8 rounded-full text-base font-medium no-underline transition-all shadow-[0_4px_14px_rgba(134,150,113,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(134,150,113,0.4)]"
            >
              Reservar Consulta
            </Link>
            <Link
              href="#como-funciona"
              className="bg-transparent text-landing-fg py-4 px-8 rounded-full text-base font-medium no-underline border border-gray-300 transition-all hover:border-primary hover:text-primary hover:bg-primary/5"
            >
              Saber más
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
