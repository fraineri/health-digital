export default function Authority() {
  return (
    <section className="w-full py-12 md:py-16 bg-landing-bg border-b border-border">
      <div className="container flex flex-col items-center">
        <h2 className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-muted-cool mb-8 text-center">
          Nuestras Acreditaciones
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 flex-wrap w-full">

          <div className="flex items-center justify-center md:justify-start gap-3 text-landing-fg font-semibold text-base opacity-80 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>UBA Medicina</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 text-landing-fg font-semibold text-base opacity-80 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
               <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>Especialista Ayurveda</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 text-landing-fg font-semibold text-base opacity-80 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
               <circle cx="12" cy="12" r="10"/>
               <path d="M12 16v-4"/>
               <path d="M12 8h.01"/>
            </svg>
            <span>Certificación Int.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
