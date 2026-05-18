import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { TeamSection } from "@/components/TeamSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ValueProposition } from "@/components/ValueProposition";
import { MethodologySection } from "@/components/MethodologySection";
import { getAllPosts } from "@/lib/blog";
import { TechNews } from "@/components/TechNews";
import { ClientCarousel } from "@/components/ClientCarousel";
import { Diagnostic360 } from "@/components/Diagnostic360";
import { HybridSecurity } from "@/components/HybridSecurity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Consultoría TI y Transformación Digital | ONLINE System',
  description: 'Optimizamos la infraestructura tecnológica de su empresa. Especialistas en soporte TI 24/7, ciberseguridad, integración Softland y soluciones cloud en Chile.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const posts = getAllPosts();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ServicesSection />
      <Diagnostic360 />
      <MethodologySection />
      <IndustriesSection />
      <HybridSecurity />
      <ClientCarousel />
      <AboutSection />
      <ValueProposition />
      <TeamSection />

      <TechNews posts={posts} />
      <ContactSection />
      <Footer />
    </main>
  );
}
