import { Calendar, Users, Settings, User as UserIcon, LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen bg-workspace overflow-hidden font-sans">
      
      {/* Column 1: Global Navigation Sidebar */}
      <aside className="w-[80px] md:w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
        <div className="h-20 px-4 md:px-6 flex items-center justify-center md:justify-start border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/20 rounded-xl flex border border-primary/30 items-center justify-center shrink-0">
              <span className="text-primary font-bold text-lg">M</span>
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-semibold text-sm">{session?.user?.name ?? "Doctor"}</span>
              <span className="text-xs text-sidebar-foreground/60">Medicina Integrativa</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {/* Navigation Items */}
          <a href="/" className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Agenda de Hoy</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground transition-colors">
            <Users className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Pacientes</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground transition-colors">
            <Settings className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Configuración</span>
          </a>
        </nav>

        {/* User Profile Footer + Sign Out */}
        <div className="p-4 md:p-6 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <UserIcon className="w-5 h-5 text-white/70" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-medium">{session?.user?.name ?? "Doctor"}</span>
              <span className="text-xs text-sidebar-foreground/50">Sesión activa</span>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground/50 hover:bg-white/5 hover:text-sidebar-foreground transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </aside>
      
      {/* Remaining Screen Area */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
