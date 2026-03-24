"use client";

import React, { useMemo, useCallback } from "react";
import {
  ATTRIBUTE_CATALOG,
  AttributeDistributions,
  DoshaDistribution,
  DoshaKey,
  PrakrutiAttribute,
  POINTS_PER_ROW,
} from "@/lib/attribute-catalog";

// ─── Dosha Configuration ─────────────────────────────────────────────────────
const DOSHA_CONFIG = {
  vata:  { textColor: "text-blue-600"   },
  pitta: { textColor: "text-orange-600" },
  kapha: { textColor: "text-green-600"  },
} as const;

// ─── PointStepper ─────────────────────────────────────────────────────────────
interface PointStepperProps {
  value: number;
  maxReached: boolean;
  textColor: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

function PointStepper({
  value,
  maxReached,
  textColor,
  onIncrement,
  onDecrement,
}: PointStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value === 0}
        className={`w-6 h-6 rounded-md flex items-center justify-center text-sm font-bold transition-all
          ${value === 0
            ? "opacity-30 cursor-not-allowed text-slate-300"
            : "hover:bg-slate-100 text-slate-500 active:scale-95"
          }`}
      >
        −
      </button>

      <span className={`text-xl font-bold tabular-nums w-6 text-center ${textColor}`}>
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={maxReached}
        className={`w-6 h-6 rounded-md flex items-center justify-center text-sm font-bold transition-all
          ${maxReached
            ? "opacity-30 cursor-not-allowed text-slate-300"
            : "hover:bg-slate-100 text-slate-500 active:scale-95"
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
  value: number;
  maxReached: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

function DoshaColumn({
  doshaKey,
  value,
  maxReached,
  onIncrement,
  onDecrement,
}: DoshaColumnProps) {
  const { textColor } = DOSHA_CONFIG[doshaKey];

  return (
    <div className="flex items-center justify-center py-2 px-1">
      <PointStepper
        value={value}
        maxReached={maxReached}
        textColor={textColor}
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
      <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
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
      <div className="px-2 pb-2 grid grid-cols-3 divide-x divide-border/20">
        {(["vata", "pitta", "kapha"] as DoshaKey[]).map((dosha) => (
          <DoshaColumn
            key={dosha}
            doshaKey={dosha}
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
  const groupedAttributes = useMemo(() => {
    return ATTRIBUTE_CATALOG.reduce((acc, attr) => {
      if (!acc[attr.category]) acc[attr.category] = [];
      acc[attr.category].push(attr);
      return acc;
    }, {} as Record<string, PrakrutiAttribute[]>);
  }, []);

  const completedCount = useMemo(() => {
    return ATTRIBUTE_CATALOG.filter((attr) => {
      const d = distributions[attr.id];
      return d && d.vata + d.pitta + d.kapha === POINTS_PER_ROW;
    }).length;
  }, [distributions]);

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
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 block" />
              <span className="text-[11px] font-bold tracking-[0.12em] text-slate-400 uppercase">
                {category}
              </span>
            </div>

            <div className="space-y-2">
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
