import { Navbar } from "@/components/Navbar";
import { ROICalculator } from "@/components/ROICalculator";
import { Footer } from "@/components/Footer";
import { Diagnostic360 } from "@/components/Diagnostic360";

export const metadata = {
  title: "Calculadora de ROI de Infraestructura TI | ONLINE System",
  description: "Descubre cuánto puede ahorrar y optimizar tu empresa al implementar soluciones tecnológicas profesionales con ONLINE System.",
};

export default function ROIPage() {
  return (
    <main className="relative bg-slate-950 min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ROICalculator />
      </div>
      <Diagnostic360 />
      <Footer />
    </main>
  );
}
