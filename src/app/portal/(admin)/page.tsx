import { PatientQueueItem } from "@/components/portal/PatientQueueItem";
import { DoshaCard } from "@/components/portal/DoshaCard";
import { ClinicalNotesArea } from "@/components/portal/ClinicalNotes";
import { Wind, Flame, Droplets, History, Share2, Sparkles, FileText, ArrowRight, ChevronDown } from "lucide-react";

export default function WorkspacePage() {
  return (
    <>
      {/* Column 2: Inbox/Queue */}
      <div className="w-80 md:w-96 border-r border-border/40 bg-white flex flex-col shrink-0 h-full">
        {/* Queue Header */}
        <div className="h-20 px-6 flex flex-col justify-center border-b border-border/40 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Pacientes de Hoy</h2>
          <span className="text-sm text-slate-500 font-medium">12 de Octubre, 2023</span>
        </div>
        
        {/* Queue List */}
        <div className="flex-1 overflow-y-auto">
          <PatientQueueItem 
            time="10:30 AM" 
            name="Juan Pérez" 
            type="Consulta General - Digestivo"
            status="now"
            active
          />
          <PatientQueueItem 
            time="11:15 AM" 
            name="María García" 
            type="Seguimiento Post-Tratamiento"
          />
          <PatientQueueItem 
            time="12:00 PM" 
            name="Carlos Ruiz" 
            type="Primera Visita - Estrés"
          />
          <PatientQueueItem 
            time="1:30 PM" 
            name="Elena Beltrán" 
            type="Revisión de Análisis"
          />
        </div>
      </div>

      {/* Column 3: Clinical Workspace */}
      <div className="flex-1 bg-workspace relative flex flex-col h-full overflow-hidden">
        {/* Sticky Header with Actions */}
        <header className="px-10 py-8 shrink-0 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">Juan Pérez</h1>
              <span className="px-3 py-1 rounded-full bg-slate-200/50 text-slate-600 text-sm font-medium">34 años</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <FileText className="w-4 h-4" />
              <span>Motivo de consulta: Reflujo crónico y fatiga estacional.</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-slate-400">
            <button className="p-2 hover:bg-slate-200 hover:text-slate-600 rounded-full transition-colors"><History className="w-5 h-5"/></button>
            <button className="p-2 hover:bg-slate-200 hover:text-slate-600 rounded-full transition-colors"><Share2 className="w-5 h-5"/></button>
          </div>
        </header>

        {/* Scrollable Work Area */}
        <div className="flex-1 overflow-y-auto px-10 pb-40">
          {/* Section: Diagnostic */}
          <section className="mb-12">
            <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase">Diagnóstico Constitucional (Ayurveda)</h3>
            <div className="grid grid-cols-3 gap-6">
              <DoshaCard 
                name="Vata" 
                element="Aire y Espacio"
                icon={Wind}
                colorClass="text-vata"
                bgClass="bg-vata"
                level={80}
                active
              />
              <DoshaCard 
                name="Pitta" 
                element="Fuego y Agua"
                icon={Flame}
                colorClass="text-pitta"
                bgClass="bg-pitta"
                level={40}
              />
              <DoshaCard 
                name="Kapha" 
                element="Tierra y Agua"
                icon={Droplets}
                colorClass="text-kapha"
                bgClass="bg-kapha"
                level={20}
              />
            </div>
          </section>

          {/* Section: Treatment Plan */}
          <section>
            <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase">Plan de Tratamiento</h3>
            
            <div className="grid grid-cols-12 gap-10">
              {/* Left Column: Form Fields */}
              <div className="col-span-5 space-y-8">
                
                {/* Simulated native selects to match UI */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700">Enfoque Nutricional</label>
                  <div className="relative">
                    <select className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm">
                      <option>Dieta Anti-Vata (Pacificadora)</option>
                      <option>Dieta Tridoshica</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700">Fitoterapia & Suplementos</label>
                  <div className="relative">
                    <select className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm">
                      <option>Triphala + Ashwagandha (PM)</option>
                      <option>Brahmi + Shatavari</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700">Rutina Sugerida (Dinacharya)</label>
                  <div className="relative">
                    <select className="w-full h-12 bg-white border border-border/60 rounded-xl px-4 appearance-none text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm">
                      <option>Rutina de Mañana Vata: Oleación</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Right Column: Notes Block */}
              <div className="col-span-7">
                <ClinicalNotesArea />
              </div>
            </div>
          </section>
        </div>

        {/* Floating Actions Overlays */}
        <div className="absolute bottom-8 right-10 flex flex-col items-end gap-4 pointer-events-none">
          {/* AI Pill */}
          <div className="bg-white px-5 py-3 rounded-full border border-border shadow-sm flex items-center gap-3 pointer-events-auto cursor-pointer hover:bg-slate-50 transition-colors">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-slate-700">IA sugiere: Reducir estimulantes</span>
          </div>
          
          {/* Primary Action Button */}
          <button className="bg-[#8d9f85] hover:bg-[#7a8c72] text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3 pointer-events-auto transition-transform hover:scale-105">
            <FileText className="w-5 h-5" />
            <span className="text-sm tracking-wider font-bold">GENERAR CUADERNILLO PDF</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </>
  );
}
