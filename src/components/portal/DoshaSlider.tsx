"use client";

import { LucideIcon } from "lucide-react";

interface DoshaSliderProps {
  name: string;
  element: string;
  icon: LucideIcon;
  bgClass: string;
  suggestedLevel: number;
  level: number;
  onChange: (newLevel: number) => void;
  active?: boolean;
}

export function DoshaSlider({ 
  name, 
  element, 
  icon: Icon, 
  bgClass, 
  suggestedLevel, 
  level, 
  onChange,
  active 
}: DoshaSliderProps) {
  
  const isManuallyAdjusted = Math.abs(suggestedLevel - level) > 0.1; // Float tolerance

  return (
    <div
      className={`relative flex flex-col items-center p-6 rounded-2xl border transition-all ${
        active 
          ? `border-[var(--color-${name.toLowerCase()})] bg-[var(--color-${name.toLowerCase()})]/5 shadow-sm` 
          : "border-border/60 bg-white"
      }`}
    >
      {isManuallyAdjusted && (
        <div className="absolute top-3 right-3 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border border-slate-200">
          Ajustado
        </div>
      )}

      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white ${bgClass} shadow-sm transition-transform ${active ? "scale-110" : ""}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      
      <h4 className={`text-lg font-bold mb-1 transition-colors ${active ? "text-foreground" : "text-slate-600"}`}>
        {name}
      </h4>
      <span className="text-xs text-slate-400 italic mb-5">
        {element}
      </span>
      
      {/* Interactive Level Slider */}
      <div className="w-full relative flex flex-col items-center group mt-auto">
        <span className="text-3xl font-black tracking-tighter text-slate-800 mb-2 font-mono">
          {level.toFixed(1)}<span className="text-lg text-slate-400 font-medium">%</span>
        </span>
        
        {/* Progress Bar Track & Input */}
        <div className="relative w-full h-2 bg-slate-100 rounded-full flex items-center">
          {/* Active Progress Fill */}
          <div 
            className={`absolute left-0 h-full ${bgClass} rounded-full transition-[width,background-color] duration-500 ease-in-out`}
            style={{ width: `${level}%` }}
          />
          
          {/* Range Input (Invisible, overlaid) */}
          <input 
            type="range"
            title={`Ajustar nivel de ${name}`}
            min="0"
            max="100"
            step="0.1"
            value={level}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
          />
          
          {/* Thumb Indicator (Visual only, driven by value) */}
          <div 
            className={`absolute h-4 w-4 bg-white border-2 border-slate-300 rounded-full shadow-md z-0 transition-[left,box-shadow] duration-500 ease-in-out group-hover:scale-110 group-hover:border-[var(--color-${name.toLowerCase()})]`}
            style={{ left: `calc(${level}% - 8px)` }}
          />

          {/* Suggested Level Marker (If Adjusted) */}
          {isManuallyAdjusted && (
            <div 
              className="absolute w-1 h-3 bg-slate-300/80 -top-0.5 rounded-full z-0 pointer-events-none transition-all duration-300"
              style={{ left: `calc(${suggestedLevel}% - 2px)` }}
              title={`Sugerencia motor: ${suggestedLevel}%`}
            />
          )}
        </div>
        
        {isManuallyAdjusted && (
           <span className="text-[10px] text-slate-400 mt-2">
             Sugerido IA: <span className="font-semibold">{suggestedLevel.toFixed(1)}%</span>
           </span>
        )}
      </div>
    </div>
  );
}
