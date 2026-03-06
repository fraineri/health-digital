export function ClinicalNotesArea() {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 flex items-center gap-2 text-primary font-medium text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
        Notas del Profesional
      </div>
      <textarea
        className="w-full min-h-[300px] bg-sidebar/5 rounded-xl border border-border/40 p-12 text-sm text-foreground/80 resize-y focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-slate-400/60"
        placeholder="Escribe observaciones adicionales para el paciente..."
        defaultValue=""
      />
      
      {/* Smart Tags Array (Absolute to bottom left) */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        <span className="text-[10px] font-bold tracking-wider text-slate-500 bg-white border border-border px-2 py-1 rounded-sm uppercase">
          Digestión Lenta
        </span>
        <span className="text-[10px] font-bold tracking-wider text-slate-500 bg-white border border-border px-2 py-1 rounded-sm uppercase">
          Ansiedad
        </span>
      </div>
      
      {/* Resize indicator mock */}
      <div className="absolute bottom-4 right-4 text-slate-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15l-6 6"/><path d="M21 8l-13 13"/></svg>
      </div>
    </div>
  );
}
