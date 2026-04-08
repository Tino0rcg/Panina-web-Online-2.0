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
import { getLatestTechNews } from "@/lib/news";
import { TechNews } from "@/components/TechNews";
import { ClientCarousel } from "@/components/ClientCarousel";
import { Diagnostic360 } from "@/components/Diagnostic360";


export default async function Home() {
  const news = await getLatestTechNews();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ServicesSection />
      <Diagnostic360 />
      <MethodologySection />
      <IndustriesSection />
      <ClientCarousel />
      <AboutSection />
      <ValueProposition />
      <TeamSection />

      <TechNews initialNews={news} />
      <ContactSection />
      <Footer />
    </main>
  );
}
