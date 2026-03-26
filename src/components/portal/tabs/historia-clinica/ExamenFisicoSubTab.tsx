"use client";

import { useMemo } from "react";
import { Ruler, Heart, Leaf, Stethoscope } from "lucide-react";
import { PhysicalExamData, calculateBMI } from "@/domain/ayurveda/physical-exam";

interface ExamenFisicoSubTabProps {
  physicalExam: PhysicalExamData;
  onPhysicalExamChange: (exam: PhysicalExamData) => void;
  previousExam?: PhysicalExamData | null;
}

// ── Componente auxiliar: campo numerico ──────────────────────────────────────

interface NumericFieldProps {
  label: string;
  unit: string;
  value: number | null;
  previousValue?: number | null;
  onChange: (value: number | null) => void;
  step?: number;
}

function NumericField({ label, unit, value, previousValue, onChange, step = 1 }: NumericFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label} <span className="text-slate-400 font-normal normal-case">({unit})</span>
      </label>
      <input
        type="number"
        step={step}
        value={value ?? ""}
        placeholder="—"
        className="bg-stone-50/50 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none w-full transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === "" ? null : parseFloat(raw));
        }}
      />
      {previousValue !== undefined && previousValue !== null && (
        <p className="mt-1 pl-1 text-xs text-slate-400 font-mono">
          Anterior: <span className="text-slate-500">{previousValue} {unit}</span>
        </p>
      )}
    </div>
  );
}

// ── Componente auxiliar: textarea auto-redimensionable ───────────────────────

interface AutoResizeTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

function AutoResizeTextarea({ label, value, onChange, placeholder, minHeight = "80px" }: AutoResizeTextareaProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        placeholder={placeholder}
        style={{ minHeight }}
        className="bg-stone-50/50 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none w-full transition-colors resize-none"
        onChange={(e) => {
          const el = e.target;
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
          onChange(el.value);
        }}
      />
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────

export function ExamenFisicoSubTab({ physicalExam, onPhysicalExamChange, previousExam }: ExamenFisicoSubTabProps) {
  const updateField = <K extends keyof PhysicalExamData>(field: K, value: PhysicalExamData[K]) => {
    onPhysicalExamChange({ ...physicalExam, [field]: value });
  };

  const bmi = useMemo(
    () => calculateBMI(physicalExam.weight, physicalExam.height),
    [physicalExam.weight, physicalExam.height]
  );

  const bmiClasses = bmi
    ? bmi.color === "text-blue-600"
      ? "bg-blue-50 border-blue-200 text-blue-600"
      : bmi.color === "text-emerald-600"
      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
      : bmi.color === "text-amber-600"
      ? "bg-amber-50 border-amber-200 text-amber-600"
      : "bg-red-50 border-red-200 text-red-600"
    : "bg-stone-50/50 border-border/40 text-slate-400";

  return (
    <div className="h-full overflow-y-auto pb-40 custom-scrollbar">
      <div className="w-full max-w-4xl mx-auto p-10 space-y-6">

        {/* ── CARD: ANTROPOMETRIA ── */}
        <div className="bg-white rounded-3xl border border-border/40 shadow-sm p-8 animate-subtab-in">
          <p className="flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-slate-400 uppercase mb-6">
            <Ruler className="w-4 h-4" />
            Antropometría
          </p>
          <div className="grid grid-cols-3 gap-6">
            <NumericField
              label="Peso"
              unit="kg"
              step={0.1}
              value={physicalExam.weight}
              previousValue={previousExam?.weight}
              onChange={(v) => updateField("weight", v)}
            />
            <NumericField
              label="Altura"
              unit="cm"
              value={physicalExam.height}
              previousValue={previousExam?.height}
              onChange={(v) => updateField("height", v)}
            />
            {/* IMC — Solo lectura */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                IMC
              </label>
              <div className={`rounded-xl px-4 py-2.5 text-sm font-semibold border ${bmiClasses}`}>
                {bmi ? `${bmi.value} — ${bmi.category}` : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD: SIGNOS VITALES ── */}
        <div className="bg-white rounded-3xl border border-border/40 shadow-sm p-8 animate-subtab-in">
          <p className="flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-slate-400 uppercase mb-6">
            <Heart className="w-4 h-4" />
            Signos Vitales
          </p>
          <div className="grid grid-cols-2 gap-6">
            <NumericField
              label="Presión Arterial Sistólica"
              unit="mmHg"
              value={physicalExam.systolicBP}
              previousValue={previousExam?.systolicBP}
              onChange={(v) => updateField("systolicBP", v)}
            />
            <NumericField
              label="Presión Arterial Diastólica"
              unit="mmHg"
              value={physicalExam.diastolicBP}
              previousValue={previousExam?.diastolicBP}
              onChange={(v) => updateField("diastolicBP", v)}
            />
            <NumericField
              label="Frecuencia Cardíaca"
              unit="lpm"
              value={physicalExam.heartRate}
              previousValue={previousExam?.heartRate}
              onChange={(v) => updateField("heartRate", v)}
            />
            <NumericField
              label="Saturación de Oxígeno (SpO2)"
              unit="%"
              value={physicalExam.oxygenSaturation}
              previousValue={previousExam?.oxygenSaturation}
              onChange={(v) => updateField("oxygenSaturation", v)}
            />
            <NumericField
              label="Temperatura Corporal"
              unit="°C"
              step={0.1}
              value={physicalExam.temperature}
              previousValue={previousExam?.temperature}
              onChange={(v) => updateField("temperature", v)}
            />
            <NumericField
              label="Frecuencia Respiratoria"
              unit="rpm"
              value={physicalExam.respiratoryRate}
              previousValue={previousExam?.respiratoryRate}
              onChange={(v) => updateField("respiratoryRate", v)}
            />
          </div>
        </div>

        {/* ── CARD: EXAMEN INTEGRATIVO AYURVEDA ── */}
        <div className="bg-white rounded-3xl border border-border/40 shadow-sm p-8 animate-subtab-in">
          <div className="mb-6">
            <p className="flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-slate-400 uppercase">
              <Leaf className="w-4 h-4" />
              Examen Integrativo Ayurveda
            </p>
            <p className="text-xs text-slate-400 mt-1">Opcional — completar según relevancia clínica</p>
          </div>
          <div className="space-y-5">
            <AutoResizeTextarea
              label="Lengua (saburra, color, marcas)"
              value={physicalExam.tongue}
              onChange={(v) => updateField("tongue", v)}
              placeholder="Ej: Saburra blanca gruesa, bordes dentados, color pálido..."
            />
            <AutoResizeTextarea
              label="Pulso / Nadi Pariksha"
              value={physicalExam.pulse}
              onChange={(v) => updateField("pulse", v)}
              placeholder="Ej: Pulso Vata — irregular, débil, rápido. Se percibe en índice..."
            />
            <AutoResizeTextarea
              label="Piel, Uñas y Ojos"
              value={physicalExam.skinNailsEyes}
              onChange={(v) => updateField("skinNailsEyes", v)}
              placeholder="Ej: Piel seca, uñas quebradizas, esclerótica clara..."
            />
          </div>
        </div>

        {/* ── CARD: HALLAZGOS CLINICOS GENERALES ── */}
        <div className="bg-white rounded-3xl border border-border/40 shadow-sm p-8 animate-subtab-in">
          <p className="flex items-center gap-2 text-xs font-extrabold tracking-[0.15em] text-slate-400 uppercase mb-6">
            <Stethoscope className="w-4 h-4" />
            Hallazgos Clínicos Generales
          </p>
          <AutoResizeTextarea
            label="Inspección, Palpación, Percusión, Auscultación"
            value={physicalExam.findings}
            onChange={(v) => updateField("findings", v)}
            placeholder="Descripción libre de los hallazgos del examen físico..."
            minHeight="120px"
          />
        </div>

      </div>
    </div>
  );
}
