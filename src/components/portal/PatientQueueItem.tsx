interface PatientQueueItemProps {
  time: string;
  name: string;
  type: string;
  status?: "now" | "upcoming" | "past";
  active?: boolean;
}

export function PatientQueueItem({ time, name, type, status, active }: PatientQueueItemProps) {
  return (
    <div
      className={`p-4 border-b border-border/40 cursor-pointer transition-colors ${
        active 
          ? "bg-workspace relative after:absolute after:top-0 after:bottom-0 after:-left-px after:w-1 after:bg-primary"
          : "hover:bg-workspace/50"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        {status === "now" ? (
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
            Ahora
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-400">{time}</span>
        )}
        
        {status === "now" && (
          <span className="text-xs font-medium text-slate-400">{time}</span>
        )}
      </div>
      
      <h3 className={`text-base font-semibold mb-1 ${active ? "text-foreground" : "text-slate-700"}`}>
        {name}
      </h3>
      <p className="text-xs text-slate-500 mb-3">{type}</p>
      
      {active ? (
        <button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-medium py-2 rounded-md transition-colors">
          Abrir Ficha
        </button>
      ) : (
        <span className="text-xs font-medium text-primary cursor-pointer hover:underline">
          Ver detalles
        </span>
      )}
    </div>
  );
}
