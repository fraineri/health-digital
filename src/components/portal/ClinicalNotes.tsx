"use client";

import { FileText } from "lucide-react";

interface ClinicalNotesAreaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  smartTags?: string[];
}

export function ClinicalNotesArea({
  label,
  placeholder,
  value,
  onChange,
  smartTags = [],
}: ClinicalNotesAreaProps) {
  return (
    <div className="relative h-full flex flex-col group">
      <div className="absolute top-4 left-4 flex items-center gap-2 text-primary font-medium text-sm pointer-events-none z-10 transition-colors group-focus-within:text-slate-800">
        <FileText className="w-4 h-4" />
        {label}
      </div>
      
      <textarea
        className="w-full flex-1 min-h-[160px] bg-sidebar/5 rounded-xl border border-border/40 pt-12 pb-14 px-5 text-sm leading-relaxed text-foreground/80 resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-slate-400/60 shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      {/* Smart Tags Array (Absolute to bottom left) */}
      {smartTags.length > 0 && (
        <div className="absolute bottom-4 left-4 right-10 flex flex-wrap gap-2 pointer-events-none overflow-hidden h-7">
          {smartTags.map((tag) => (
            <span 
              key={tag}
              className="text-[9px] font-bold tracking-wider text-slate-500 bg-white shadow-sm border border-border/60 px-2 py-1 rounded-sm uppercase whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Resize indicator static corner */}
      <div className="absolute bottom-4 right-4 text-slate-300 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15l-6 6"/><path d="M21 8l-13 13"/></svg>
      </div>
    </div>
  );
}
