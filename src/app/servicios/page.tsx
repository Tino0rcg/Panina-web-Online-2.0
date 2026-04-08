
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Cloud, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  BarChart3, 
  Settings2, 
  BrainCircuit, 
  Rocket,
  Shield,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/lib/data-services";
import { BookingModal } from "@/components/BookingModal";


export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -mr-64 -mt-64"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 font-bold uppercase text-xs tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            Volver al Inicio
          </Link>
          
          <div className="max-w-4xl space-y-8">
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-slate-900 tracking-tighter leading-none">
              Catálogo de <br />
              <span className="text-gradient">servicios.</span>
            </h1>
            <div className="max-w-4xl space-y-6 border-l-4 border-primary pl-8">
              <p className="text-2xl text-slate-500 font-light leading-relaxed">
                En <span className="text-slate-900 font-medium">ONLINE System</span> desplegamos ingeniería de alto nivel en múltiples áreas estratégicas, integrando tecnología, infraestructura y gestión TI para garantizar la continuidad operativa, eficiencia y competitividad de su negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesData.map((service, idx) => (
              <div key={idx} className="animate-fade-in group h-full">
                <Link href={`/servicios/${service.slug}`} className="block h-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-[2.5rem]">
                  <Card className="bg-white border-slate-100 hover:border-primary/20 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden rounded-[2.5rem] h-full flex flex-col relative z-20">
                    {/* Visual Header Image */}
                    <div className="relative w-full h-56 overflow-hidden bg-slate-100">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>

                    <CardHeader className="px-10 pt-10 pb-6 relative">
                      <div className={`absolute -top-10 right-8 p-4 rounded-2xl bg-white border border-slate-100 shadow-xl transition-transform duration-500 group-hover:-translate-y-2 ${service.glow}`}>
                        <service.icon className={`w-8 h-8 ${service.color}`} />
                      </div>
                      <CardTitle className="text-2xl font-headline font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight pr-6">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-10 pb-10 flex-grow flex flex-col">
                      <CardDescription className="text-slate-500 text-lg leading-relaxed font-light mb-4">
                        {service.cardDescription || service.description}
                      </CardDescription>
                      <div className="mt-auto text-primary font-semibold flex items-center gap-2 text-sm uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                        Ver Detalles <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                    <div className="h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-700"></div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/cta-bg.jpg" 
            alt="Modernizar Infraestructura" 
            className="w-full h-full object-cover"
          />
          {/* Overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-slate-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse opacity-20 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white">¿Listo para modernizar su infraestructura?</h2>
          <BookingModal>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 h-20 rounded-2xl text-2xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 group border-0">
              Agendar Consultoría Técnica
              <Rocket className="ml-3 w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            </Button>
          </BookingModal>
          <div className="flex justify-center items-center gap-4 text-xs font-bold text-white/50 uppercase tracking-[0.4em]">
            <Shield className="w-5 h-5 text-primary" />
            <span>Soporte Crítico 24/7 Garantizado</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
