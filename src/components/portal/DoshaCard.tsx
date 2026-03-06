import { LucideIcon } from "lucide-react";

interface DoshaCardProps {
  name: string;
  element: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  active?: boolean;
  level: number; // 0 to 100
}

export function DoshaCard({ name, element, icon: Icon, colorClass, bgClass, active, level }: DoshaCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center p-6 rounded-2xl border transition-all cursor-pointer ${
        active 
          ? `border-[var(--color-${name.toLowerCase()})] bg-[var(--color-${name.toLowerCase()})]/5 shadow-sm` 
          : "border-border/60 hover:border-border bg-white"
      }`}
    >
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white ${bgClass} shadow-sm`}
      >
        <Icon className="w-6 h-6" />
      </div>
      
      <h4 className={`text-lg font-bold mb-1 ${active ? "text-foreground" : "text-slate-600"}`}>
        {name}
      </h4>
      <span className="text-xs text-slate-400 italic mb-6">
        {element}
      </span>
      
      {/* Level Indicator Bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-auto">
        <div 
          className={`h-full ${bgClass} rounded-full`} 
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
