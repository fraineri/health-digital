"use client";

import { Check, FileText, Loader2, ArrowRight } from "lucide-react";

interface SaveButtonProps {
  isPending: boolean;
  isSuccess: boolean;
  onClick: () => void;
}

export function SaveButton({ isPending, isSuccess, onClick }: SaveButtonProps) {
  // If we just saved successfully, show a green check state briefly
  if (isSuccess) {
    return (
      <button 
        disabled
        className="bg-emerald-600/90 text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3 transition-all pointer-events-none"
      >
        <Check className="w-5 h-5" />
        <span className="text-sm tracking-wider font-bold">GUARDADO CON ÉXITO</span>
      </button>
    );
  }

  return (
    <button 
      onClick={onClick}
      disabled={isPending}
      className="bg-[#8d9f85] hover:bg-[#7a8c72] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3 pointer-events-auto transition-transform hover:scale-105 active:scale-95"
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <FileText className="w-5 h-5" />
      )}
      
      <span className="text-sm tracking-wider font-bold">
        {isPending ? "GUARDANDO..." : "GUARDAR CONSULTA"}
      </span>
      
      {!isPending && <ArrowRight className="w-5 h-5 ml-2" />}
    </button>
  );
}
