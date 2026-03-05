import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
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
  openGraph: {
    title: 'Integrative Medicine | Medicina Clínica y Ayurveda',
    description: 'Ciencia moderna rigurosa y la sabiduría milenaria del Ayurveda para un equilibrio real.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Integrative Medicine Clinic',
    image: 'https://www.medicinaintegrativa.com/hero-doctor.png',
    '@id': 'https://www.medicinaintegrativa.com',
    url: 'https://www.medicinaintegrativa.com',
    telephone: '+5491100000000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Córdoba',
      addressRegion: 'CBA',
      addressCountry: 'AR'
    },
    medicalSpecialty: [
      'Ayurvedic',
      'PrimaryCare'
    ],
    availableService: {
      '@type': 'MedicalTherapy',
      name: 'Consulta Integrativa'
    }
  };

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {/* Google Analytics 4 Injection */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* JSON-LD Schema defined for SEO (MedicalClinic/Physician) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
