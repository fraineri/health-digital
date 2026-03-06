export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="h-full px-4 py-6 overflow-y-auto">
          <span className="text-xl font-bold tracking-tight">Portal CRM</span>
          <nav className="mt-8 space-y-2">
            <div className="block px-3 py-2 rounded-md bg-slate-100 font-medium text-sm text-slate-900">Dashboard</div>
            <div className="block px-3 py-2 rounded-md hover:bg-slate-50 font-medium text-sm text-slate-600">Pacientes</div>
          </nav>
        </div>
      </aside>
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header Placeholder */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <span className="font-semibold text-lg md:hidden">Portal CRM</span>
          <div className="hidden md:block"></div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-200"></div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
