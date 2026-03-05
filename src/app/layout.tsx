import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

// Fuente para lectura y botones (Sans-serif)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Fuente para títulos (Serif elegante)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Integrative Medicine | Medicina Clínica y Ayurveda',
  description: 'Un enfoque holístico para tu bienestar combinando ciencia moderna rigurosa y la sabiduría milenaria del Ayurveda para un equilibrio real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
