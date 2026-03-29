"use client";

import type { AgniType } from "@prisma/client";
import { Scale, Wind, Flame, Droplets, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgniOption {
  id: AgniType;
  label: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  activeColorClass: string;
}

const AGNI_OPTIONS: AgniOption[] = [
  {
    id: "SAMA",
    label: "Sama",
    description: "Equilibrado",
    icon: Scale,
    colorClass: "text-primary",
    activeColorClass: "bg-primary/10 border-primary text-primary",
  },
  {
    id: "VISHAMA",
    label: "Vishama",
    description: "Variable (Vata)",
    icon: Wind,
    colorClass: "text-vata",
    activeColorClass: "bg-vata/10 border-vata text-vata",
  },
  {
    id: "TIKSHNA",
    label: "Tikshna",
    description: "Fuerte (Pitta)",
    icon: Flame,
    colorClass: "text-pitta",
    activeColorClass: "bg-pitta/10 border-pitta text-pitta",
  },
  {
    id: "MANDA",
    label: "Manda",
    description: "Lento (Kapha)",
    icon: Droplets,
    colorClass: "text-kapha",
    activeColorClass: "bg-kapha/10 border-kapha text-kapha",
  },
];

interface AgniSelectorProps {
  value: AgniType | null;
  onChange: (value: AgniType) => void;
}

export function AgniSelector({ value, onChange }: AgniSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Agni (Fuego Digestivo)
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {AGNI_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.id)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4 rounded-xl border border-border/60 bg-white transition-all hover:shadow-md group",
                isActive ? option.activeColorClass : "hover:border-slate-300"
              )}
            >
              <div className={cn(
                "p-2 rounded-full mb-2 transition-colors",
                isActive ? "bg-white/50" : "bg-slate-50 group-hover:bg-slate-100"
              )}>
                <Icon className={cn("w-5 h-5", isActive ? option.colorClass : "text-slate-400")} />
              </div>
              <span className="text-sm font-bold block">{option.label}</span>
              <span className="text-[10px] text-slate-500 font-medium">{option.description}</span>
              
              {isActive && (
                <div className="absolute top-2 right-2">
                   <div className={cn("rounded-full p-0.5", option.colorClass)}>
                      <Check className="w-3 h-3 stroke-[3]" />
                   </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
