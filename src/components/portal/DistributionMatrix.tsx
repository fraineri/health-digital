"use client";

import React, { useMemo, useCallback } from "react";
import { Wind, Flame, Droplets } from "lucide-react";
import {
  ATTRIBUTE_CATALOG,
  AttributeDistributions,
  DoshaDistribution,
  DoshaKey,
  PrakrutiAttribute,
  POINTS_PER_ROW,
} from "@/lib/attribute-catalog";

// ─── Dosha Configuration ─────────────────────────────────────────────────────
// Colors aligned with --color-vata, --color-pitta, --color-kapha in portal.css
const DOSHA_CONFIG = {
  vata: {
    label: "Vata",
    Icon: Wind,
    dotColor: "bg-vata",
    textColor: "text-vata",
    headerBg: "bg-vata/10",
  },
  pitta: {
    label: "Pitta",
    Icon: Flame,
    dotColor: "bg-pitta",
    textColor: "text-pitta",
    headerBg: "bg-pitta/10",
  },
  kapha: {
    label: "Kapha",
    Icon: Droplets,
    dotColor: "bg-kapha",
    textColor: "text-kapha",
    headerBg: "bg-kapha/10",
  },
} as const;

// ─── PointStepper ─────────────────────────────────────────────────────────────
interface PointStepperProps {
  value: number;
  maxReached: boolean;
  dotColor: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

function PointStepper({
  value,
  maxReached,
  dotColor,
  onIncrement,
  onDecrement,
}: PointStepperProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value === 0}
        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-all
          ${value === 0
            ? "opacity-30 cursor-not-allowed text-slate-400"
            : "hover:bg-slate-200 text-slate-600 active:scale-95"
          }`}
      >
        −
      </button>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: POINTS_PER_ROW }).map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i < value ? dotColor : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <span className="text-xs font-bold tabular-nums w-3 text-center text-slate-700">
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={maxReached}
        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-all
          ${maxReached
            ? "opacity-30 cursor-not-allowed text-slate-400"
            : "hover:bg-slate-200 text-slate-600 active:scale-95"
          }`}
      >
        +
      </button>
    </div>
  );
}

// ─── DoshaColumn ─────────────────────────────────────────────────────────────
interface DoshaColumnProps {
  doshaKey: DoshaKey;
  expressionLabel: string;
  value: number;
  maxReached: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

function DoshaColumn({
  doshaKey,
  expressionLabel,
  value,
  maxReached,
  onIncrement,
  onDecrement,
}: DoshaColumnProps) {
  const config = DOSHA_CONFIG[doshaKey];
  const { Icon, label, textColor, dotColor } = config;

  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0 px-2 py-1">
      {/* Dosha Header */}
      <div className="flex items-center gap-1 mb-1">
        <Icon className={`w-3 h-3 ${textColor} shrink-0`} />
        <span className={`text-[10px] font-bold uppercase tracking-wide ${textColor}`}>
          {label}
        </span>
      </div>

      {/* Expression Text */}
      <p className="text-[11px] leading-tight text-center text-slate-500 min-h-[2.5rem] px-1">
        {expressionLabel}
      </p>

      {/* Stepper */}
      <PointStepper
        value={value}
        maxReached={maxReached}
        dotColor={dotColor}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
}

// ─── AttributeCard ────────────────────────────────────────────────────────────
interface AttributeCardProps {
  attribute: PrakrutiAttribute;
  distribution: DoshaDistribution;
  onChange: (attributeId: string, dosha: DoshaKey, delta: number) => void;
}

const AttributeCard = React.memo(function AttributeCard({
  attribute,
  distribution,
  onChange,
}: AttributeCardProps) {
  const rowTotal = distribution.vata + distribution.pitta + distribution.kapha;
  const isComplete = rowTotal === POINTS_PER_ROW;
  const maxReached = rowTotal >= POINTS_PER_ROW;

  const cardClass = `rounded-xl border transition-colors duration-300 overflow-hidden ${
    isComplete
      ? "border-primary/20 bg-white shadow-sm"
      : rowTotal > 0
      ? "border-amber-200/60 bg-amber-50/20"
      : "border-border/40 bg-white"
  }`;

  return (
    <div className={cardClass}>
      {/* Card Header */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-slate-800">
          {attribute.name}
        </span>
        {isComplete ? (
          <span className="text-primary text-sm leading-none">✓</span>
        ) : (
          <span className="text-[10px] text-slate-400 tabular-nums">
            {rowTotal}/5
          </span>
        )}
      </div>

      {/* Card Body: 3 Dosha Columns */}
      <div className="px-2 pb-3 grid grid-cols-3 divide-x divide-border/20">
        {(["vata", "pitta", "kapha"] as DoshaKey[]).map((dosha) => (
          <DoshaColumn
            key={dosha}
            doshaKey={dosha}
            expressionLabel={attribute.expressions[dosha].label}
            value={distribution[dosha]}
            maxReached={maxReached}
            onIncrement={() => onChange(attribute.id, dosha, 1)}
            onDecrement={() => onChange(attribute.id, dosha, -1)}
          />
        ))}
      </div>
    </div>
  );
});

// ─── DistributionMatrix (Main Export) ────────────────────────────────────────
interface DistributionMatrixProps {
  distributions: AttributeDistributions;
  onChange: (distributions: AttributeDistributions) => void;
}

export function DistributionMatrix({
  distributions,
  onChange,
}: DistributionMatrixProps) {
  // Group attributes by category
  const groupedAttributes = useMemo(() => {
    return ATTRIBUTE_CATALOG.reduce((acc, attr) => {
      if (!acc[attr.category]) acc[attr.category] = [];
      acc[attr.category].push(attr);
      return acc;
    }, {} as Record<string, PrakrutiAttribute[]>);
  }, []);

  // Count completed rows
  const completedCount = useMemo(() => {
    return ATTRIBUTE_CATALOG.filter((attr) => {
      const d = distributions[attr.id];
      return d && d.vata + d.pitta + d.kapha === POINTS_PER_ROW;
    }).length;
  }, [distributions]);

  // Point change handler with constraint enforcement
  const handlePointChange = useCallback(
    (attributeId: string, dosha: DoshaKey, delta: number) => {
      const current = distributions[attributeId] ?? { vata: 0, pitta: 0, kapha: 0 };
      const newValue = current[dosha] + delta;
      if (newValue < 0) return;
      const rowTotal = current.vata + current.pitta + current.kapha + delta;
      if (rowTotal > POINTS_PER_ROW) return;
      const updated = { ...current, [dosha]: newValue };
      onChange({ ...distributions, [attributeId]: updated });
    },
    [distributions, onChange]
  );

  return (
    <div>
      {/* Global Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-400 uppercase">
          Evaluación Prakriti
        </h3>
        <span className="text-xs text-slate-400 tabular-nums">
          {completedCount} / {ATTRIBUTE_CATALOG.length} atributos
        </span>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {Object.entries(groupedAttributes).map(([category, attributes]) => (
          <div key={category}>
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 block" />
              <span className="text-[11px] font-bold tracking-[0.12em] text-slate-400 uppercase">
                {category}
              </span>
            </div>

            {/* Attribute Cards */}
            <div className="space-y-2.5">
              {attributes.map((attribute) => (
                <AttributeCard
                  key={attribute.id}
                  attribute={attribute}
                  distribution={
                    distributions[attribute.id] ?? { vata: 0, pitta: 0, kapha: 0 }
                  }
                  onChange={handlePointChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
