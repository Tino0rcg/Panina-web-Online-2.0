
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consultoría TI y Transformación Digital | ONLINE System',
  description: 'Lideramos la transformación digital de tu empresa en Chile. Especialistas en ciberseguridad, cloud computing y arquitecturas TI de alta resiliencia.',
  verification: {
    google: '30xR51TGMinJwO4tq7-KJ6_c7MfQiEgglqTu7OJ07_w',
  },
  keywords: [
    "Consultoría TI Chile", "Transformación Digital empresas", "Ingeniería Informática",
    "Softland ERP Chile", "Automatización de procesos", "Ciberseguridad corporativa",
    "Soporte TI 24/7", "Outsourcing TI Región Metropolitana", "Infraestructura Cloud AWS Azure",
    "Continuidad de Negocio BCP DRP", "Integración de sistemas APIs", "CRM Inmobiliario Chile",
    "Sistemas para corredoras de seguros", "Automatización seguros Chile",
    "Soluciones TI para empresas", "ONLINE System Chile"
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
    title: 'Ingeniería TI y Transformación Digital de Alto Nivel | ONLINE System',
    description: 'Lideramos la transformación tecnológica en Chile. Expertos en ciberseguridad, resiliencia Cloud, integración de sistemas y soporte TI crítico 24/7.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'ONLINE System - Consultoría en Ingeniería TI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ingeniería TI y Transformación Digital de Alto Nivel | ONLINE System',
    description: 'Lideramos la transformación tecnológica en Chile. Expertos en ciberseguridad, resiliencia Cloud, integración de sistemas y soporte TI crítico 24/7.',
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
              "@type": "ITService",
              "name": "ONLINE System",
              "image": "https://onlinesystem.cl/logo.png",
              "@id": "https://onlinesystem.cl/#organization",
              "url": "https://onlinesystem.cl/",
              "telephone": "+56996070383",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Providencia",
                "addressLocality": "Santiago",
                "addressRegion": "Región Metropolitana",
                "postalCode": "7500000",
                "addressCountry": "CL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -33.4256,
                "longitude": -70.6147
              },
              "logo": "https://onlinesystem.cl/logo.png",
              "description": "Expertos en Continuidad Operacional, Soporte TI y Transformación Digital para empresas en Chile. Soporte 24/7 y Ciberseguridad.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:30"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Santiago"
                },
                {
                  "@type": "Country",
                  "name": "Chile"
                }
              ],
              "priceRange": "$$$"
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
