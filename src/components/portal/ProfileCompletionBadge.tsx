"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";

interface ProfileCompletionBadgeProps {
  score: number;
  onClick: () => void;
  className?: string;
}

export function ProfileCompletionBadge({
  score,
  onClick,
  className = "",
}: ProfileCompletionBadgeProps) {
  
  if (score === 100) {
    return (
      <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 hover:bg-emerald-100 transition-colors shadow-sm ${className}`}
        title="Perfil Completo"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span className="text-xs font-bold tracking-wide">Perfil Completo</span>
      </button>
    );
  }

  if (score >= 50) {
    return (
      <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/50 text-amber-600 hover:bg-amber-100 transition-colors shadow-sm ${className}`}
        title="Completar perfil"
      >
        {/* Usamos un ícono custom importado (ajustable) o fallback */}
        <div className="w-4 h-4 rounded-full border-[2px] border-amber-500 relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
        </div>
        <span className="text-xs font-bold tracking-wide">Perfil al {score}%</span>
      </button>
    );
  }

  // < 50%
  return (
    <button 
      onClick={onClick}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-200/50 text-red-600 transition-colors shadow-sm relative ${className}`}
    >
      <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 group-hover:animate-ping mix-blend-multiply" />
      <AlertTriangle className="w-4 h-4 relative z-10" />
      <span className="text-xs font-bold tracking-wide relative z-10">Perfil Incompleto ({score}%)</span>
    </button>
  );
}
