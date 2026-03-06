import type { Metadata } from 'next';
import './portal.css';

export const metadata: Metadata = {
  title: 'Portal Interno',
  description: 'CRM Clínico Privado',
};

export const dynamic = 'force-dynamic';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
