"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, useCallback } from "react";
import { RefreshCw } from "lucide-react";

export function InboxRefresher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
      setLastRefreshed(new Date());
    });
  }, [router]);

  // Polling cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [handleRefresh]);

  const minutesAgo = Math.floor((new Date().getTime() - lastRefreshed.getTime()) / 60000);

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
      <button 
        onClick={handleRefresh}
        disabled={isPending}
        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors shadow-sm"
        title="Refrescar agenda"
      >
        <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin text-primary' : ''}`} />
      </button>
      {minutesAgo > 0 && (
        <span className="text-[10px] text-slate-400 font-medium px-1 bg-white/80 rounded backdrop-blur">
          Act. hace {minutesAgo}m
        </span>
      )}
    </div>
  );
}
