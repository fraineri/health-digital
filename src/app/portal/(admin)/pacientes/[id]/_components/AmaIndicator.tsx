"use client";

import { cn } from "@/lib/utils";

interface AmaIndicatorProps {
  value: number;
  onChange: (value: number) => void;
}

const AMA_LEVELS = [
  { id: 0, label: "Sin Ama", color: "bg-slate-100 text-slate-400 border-slate-200", active: "bg-slate-100 text-slate-500 border-slate-300" },
  { id: 1, label: "Leve", color: "bg-[#d1dacd]/20 text-[#4d5e4a] border-[#aabda4]/30", active: "bg-[#d1dacd] text-[#4d5e4a] border-[#aabda4]" },
  { id: 2, label: "Moderada", color: "bg-[#f2e1c9]/20 text-[#8c6738] border-[#e6c8a3]/30", active: "bg-[#f2e1c9] text-[#8c6738] border-[#e6c8a3]" },
  { id: 3, label: "Severa", color: "bg-[#e2c4c4]/20 text-[#8a4242] border-[#d6a5a5]/30", active: "bg-[#e2c4c4] text-[#8a4242] border-[#d6a5a5]" },
];

export function AmaIndicator({ value, onChange }: AmaIndicatorProps) {
  const currentLevel = AMA_LEVELS.find((l) => l.id === value) || AMA_LEVELS[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Indicador de Ama (Toxinas)
        </label>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter transition-all",
          currentLevel.color
        )}>
          {currentLevel.label}
        </span>
      </div>
      
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200/60 shadow-inner">
        {AMA_LEVELS.map((level) => {
          const isActive = value === level.id;
          return (
            <button
              key={level.id}
              onClick={() => onChange(level.id)}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all transform active:scale-95",
                isActive 
                  ? level.active + " shadow-sm scale-[1.02]" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
              )}
            >
              {level.id}
            </button>
          );
        })}
      </div>
      
      <p className="text-[10px] text-slate-400 font-medium italic pl-1">
        Carga observada en lengua, pulso o sintomatología.
      </p>
    </div>
  );
}
