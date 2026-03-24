import { Activity, Wind, Flame, Droplets } from "lucide-react";
import { SymptomChecklist } from "../SymptomChecklist";
import { DoshaSlider } from "../DoshaSlider";
import { ClinicalSynthesisBlock } from "../ClinicalSynthesisBlock";
import { AgniType } from "../AgniSelector";
import { DoshaScores } from "@/lib/dosha-scoring";

interface EvaluacionDiagnosticoTabProps {
  symptomIntensities: Record<string, number>;
  setSymptomIntensities: (intensities: Record<string, number>) => void;
  suggestedScores: DoshaScores;
  displayVata: number;
  displayPitta: number;
  displayKapha: number;
  setVataFinal: (val: number | null) => void;
  setPittaFinal: (val: number | null) => void;
  setKaphaFinal: (val: number | null) => void;
  agniType: AgniType | null;
  setAgniType: (val: AgniType) => void;
  amaLevel: number;
  setAmaLevel: (val: number) => void;
  diagnosis: string;
  setDiagnosis: (val: string) => void;
  activeSymptomLabels: string[];
}

export function EvaluacionDiagnosticoTab({
  symptomIntensities,
  setSymptomIntensities,
  suggestedScores,
  displayVata,
  displayPitta,
  displayKapha,
  setVataFinal,
  setPittaFinal,
  setKaphaFinal,
  agniType,
  setAgniType,
  amaLevel,
  setAmaLevel,
  diagnosis,
  setDiagnosis,
  activeSymptomLabels,
}: EvaluacionDiagnosticoTabProps) {
  return (
    <div className="grid grid-cols-12 h-full w-full">
      {/* Left Area: Symptoms (Scrollable) */}
      <div className="col-span-12 lg:col-span-4 border-r border-border/40 h-full overflow-y-auto pl-10 pr-6 pt-6 pb-40 !custom-scrollbar scroll-smooth">
        <section>
          <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase flex items-center gap-2">
            <Activity className="w-4 h-4" /> Checklist Activo
          </h3>
          <SymptomChecklist
            intensities={symptomIntensities}
            onChange={setSymptomIntensities}
          />
        </section>
      </div>

      {/* Right Area: Sliders & Treatment (Scrollable) */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-12 h-full overflow-y-auto pl-10 pr-10 pt-6 pb-40 !custom-scrollbar scroll-smooth">
        {/* 1. Diagnostic */}
        <section>
          <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase">
            Diagnóstico Doshas (Interactivo)
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <DoshaSlider
              name="Vata"
              element="Aire y Espacio"
              icon={Wind}
              bgClass="bg-vata"
              suggestedLevel={suggestedScores.vata}
              level={displayVata}
              onChange={setVataFinal}
              onReset={() => setVataFinal(null)}
              active={displayVata > displayPitta && displayVata > displayKapha}
            />
            <DoshaSlider
              name="Pitta"
              element="Fuego y Agua"
              icon={Flame}
              bgClass="bg-pitta"
              suggestedLevel={suggestedScores.pitta}
              level={displayPitta}
              onChange={setPittaFinal}
              onReset={() => setPittaFinal(null)}
              active={displayPitta > displayVata && displayPitta > displayKapha}
            />
            <DoshaSlider
              name="Kapha"
              element="Tierra y Agua"
              icon={Droplets}
              bgClass="bg-kapha"
              suggestedLevel={suggestedScores.kapha}
              level={displayKapha}
              onChange={setKaphaFinal}
              onReset={() => setKaphaFinal(null)}
              active={displayKapha > displayVata && displayKapha > displayPitta}
            />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-6 uppercase">
            Evaluación y Plan
          </h3>
          <ClinicalSynthesisBlock
            agniType={agniType}
            amaLevel={amaLevel}
            diagnosis={diagnosis}
            onAgniChange={setAgniType}
            onAmaChange={setAmaLevel}
            onDiagnosisChange={setDiagnosis}
            activeSymptomLabels={activeSymptomLabels}
          />
        </section>
      </div>
    </div>
  );
}
