import { Wind, Flame, Droplets } from "lucide-react";
import { DistributionMatrix } from "../DistributionMatrix";
import { DoshaSlider } from "../DoshaSlider";
import { DoshaScores } from "@/domain/ayurveda/dosha-scoring";
import { AttributeDistributions } from "@/domain/ayurveda/attribute-catalog";

interface EvaluacionDiagnosticoTabProps {
  distributions: AttributeDistributions;
  setDistributions: (distributions: AttributeDistributions) => void;
  suggestedScores: DoshaScores;
  displayVata: number;
  displayPitta: number;
  displayKapha: number;
  setVataFinal: (val: number | null) => void;
  setPittaFinal: (val: number | null) => void;
  setKaphaFinal: (val: number | null) => void;
}

export function EvaluacionDiagnosticoTab({
  distributions,
  setDistributions,
  suggestedScores,
  displayVata,
  displayPitta,
  displayKapha,
  setVataFinal,
  setPittaFinal,
  setKaphaFinal,
}: EvaluacionDiagnosticoTabProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-10 pt-10 pb-40">

        {/* Card Header */}
        <div className="bg-white rounded-t-3xl border border-b-0 border-border/40 px-8 py-6 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Evaluación y Diagnóstico Prakriti
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Distribuya 5 puntos por atributo entre las expresiones dóshicas. Los porcentajes se actualizan en tiempo real.
          </p>
        </div>

        {/* Sticky Dosha Panel */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-x border-border/40 px-8 py-6 border-b border-border/30">
          <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 mb-4 uppercase">
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
        </div>

        {/* Matrix Content */}
        <div className="bg-white rounded-b-3xl border border-t-0 border-border/40 shadow-sm p-8">
          <DistributionMatrix
            distributions={distributions}
            onChange={setDistributions}
          />
        </div>

      </div>
    </div>
  );
}
