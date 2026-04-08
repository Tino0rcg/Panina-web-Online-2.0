
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consultoría TI y Transformación Digital | ONLINE System',
  description: 'Lideramos la transformación digital de tu empresa en Chile. Especialistas en ciberseguridad, cloud computing y arquitecturas TI de alta resiliencia.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground scroll-smooth">
        {children}
        <Toaster />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
