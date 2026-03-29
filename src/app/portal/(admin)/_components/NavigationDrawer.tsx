"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Calendar, Users, Settings, User as UserIcon, LogOut, X } from "lucide-react";
import { signOutUser } from "@/app/portal/(admin)/_actions/session";
import Link from "next/link";

interface NavigationDrawerProps {
  userName?: string | null;
}

export function NavigationDrawer({ userName }: NavigationDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="fixed top-5 left-5 z-[45] p-2.5 rounded-xl bg-sidebar hover:bg-[#202634] shadow-md border border-sidebar-foreground/10 transition-all flex items-center justify-center group"
          aria-label="Toggle Menu"
          suppressHydrationWarning
        >
          <Menu className="w-5 h-5 text-sidebar-foreground group-hover:text-white transition-transform group-hover:scale-110" />
        </button>
      </SheetTrigger>
      
      {/* We use a custom overlay alpha for earthy aesthetic in portal.css if needed, but default SheetOverlay is fine */}
      <SheetContent side="left" className="w-[280px] sm:w-[280px] p-0 bg-sidebar border-r-0 text-sidebar-foreground flex flex-col [&>button]:hidden">
        
        {/* Header / Brand */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/20 rounded-xl flex border border-primary/30 items-center justify-center shrink-0">
              <span className="text-primary font-bold text-lg">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{userName ?? "Doctor"}</span>
              <span className="text-xs text-sidebar-foreground/60">Medicina Integrativa</span>
            </div>
          </div>
          
          {/* Custom Close Button to match aesthetic */}
          <button 
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto !custom-scrollbar">
          {/* Note: In a real app we'd use usePathname to highlight active link */}
          {/* Defaulting to Home active for now */}
          <Link 
            href="/portal" 
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Agenda de Hoy</span>
          </Link>
          <Link 
            href="/portal" 
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm">Pacientes</span>
          </Link>
          <Link 
            href="/portal" 
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Configuración</span>
          </Link>
        </nav>

        {/* User Profile Footer + Sign Out */}
        <div className="p-6 border-t border-white/10 space-y-4 bg-black/10 mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none mb-1">{userName ?? "Doctor"}</span>
              <span className="text-xs text-sidebar-foreground/50">Sesión activa</span>
            </div>
          </div>
          <form action={signOutUser} className="w-full">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors text-sm font-medium border border-white/5 hover:border-white/10"
            >
              <LogOut className="w-4 h-4 text-white/60" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>

        {/* Accessibility Title (Visually Hidden) */}
        <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>

      </SheetContent>
    </Sheet>
  );
}
