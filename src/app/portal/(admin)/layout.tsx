import { auth } from "@/auth";
import { NavigationDrawer } from "./_components/NavigationDrawer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen bg-workspace overflow-hidden font-sans">
      {/* Hidden Navigation Drawer with absolute hamburger trigger */}
      <NavigationDrawer userName={session?.user?.name} />
      
      {/* Full Screen Area for Triptych Content */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
