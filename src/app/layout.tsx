
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consultoría TI y Transformación Digital | ONLINE System',
  description: 'Lideramos la transformación digital de tu empresa en Chile. Especialistas en ciberseguridad, cloud computing y arquitecturas TI de alta resiliencia.',
  keywords: [
    "Softland", "Automatización", "Servicios TI", "Soporte TI", "Outsourcing TI", 
    "optimización de procesos TI", "Integración de sistemas", "Infraestructura TI", 
    "BCP DRP", "sistemas para corredoras de seguros", "automatización seguros Chile",
    "integración aseguradoras APIs", "CRM inmobiliario Chile", "empresa TI Región Metropolitana", 
    "soporte informático", "solución para procesos manuales empresas", "ONLINE System"
  ],
  metadataBase: new URL('https://onlinesystem.cl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://onlinesystem.cl',
    siteName: 'ONLINE System',
    title: 'Consultoría TI y Transformación Digital | ONLINE System',
    description: 'Lideramos la transformación digital de tu empresa en Chile. Especialistas en ciberseguridad, cloud computing y arquitecturas TI de alta resiliencia.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'ONLINE System - Consultoría TI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría TI y Transformación Digital | ONLINE System',
    description: 'Lideramos la transformación digital de tu empresa en Chile. Especialistas en ciberseguridad, cloud computing y arquitecturas TI de alta resiliencia.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
};

import { Toaster } from "@/components/ui/toaster";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light overflow-x-hidden">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground scroll-smooth">
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-NESD0XL7EQ" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NESD0XL7EQ');
          `}
        </Script>
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "ONLINE System",
              "url": "https://onlinesystem.cl/",
              "logo": "https://onlinesystem.cl/favicon.png",
              "description": "Lideramos la transformación digital de tu empresa en Chile. Especialistas en ciberseguridad, cloud computing y arquitecturas TI de alta resiliencia.",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Región Metropolitana",
                "addressCountry": "CL"
              },
              "areaServed": "CL",
              "sameAs": []
            }
          `}
        </Script>
        {children}
        <Toaster />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
