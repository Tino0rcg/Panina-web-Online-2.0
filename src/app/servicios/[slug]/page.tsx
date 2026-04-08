import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { servicesData } from "@/lib/data-services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Rocket, ShieldCheck, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  return {
    title: `${service?.name || 'Servicio'} | ONLINE System`,
    description: service?.description,
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

    return (
      <main className="min-h-screen bg-white">
        <Navbar />
  
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -mr-64 -mt-64"></div>
          <div className="container mx-auto px-6 relative z-10">
            <Link 
              href="/servicios" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 font-bold uppercase text-xs tracking-widest group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
              Volver al Catálogo
            </Link>
            
            <div className="max-w-4xl space-y-8">
              <div className={`p-4 rounded-2xl bg-white border border-slate-100 shadow-xl inline-block ${service.glow}`}>
                <service.icon className={`w-12 h-12 ${service.color}`} />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-slate-900 tracking-tighter leading-none">
                {service.nameHighlight ? (
                  <>
                    {service.name.split(service.nameHighlight)[0]}
                    <span className="text-gradient">{service.nameHighlight}</span>
                    {service.name.split(service.nameHighlight)[1]}
                  </>
                ) : service.name}
              </h1>
            </div>
          </div>
        </section>
  
        {/* Main Intro Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image Container */}
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[400px] lg:h-[600px] group">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
              </div>
  
              {/* Content Column */}
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="prose prose-slate prose-xl max-w-none font-light text-slate-600 leading-relaxed border-l-4 border-primary pl-8">
                    <p>
                      {service.description}
                    </p>
                  </div>
                </div>
  
                {service.concludingText && (
                  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors"></div>
                    <p className="text-slate-800 text-2xl italic font-semibold leading-snug relative z-10">
                      "{service.concludingText}"
                    </p>
                  </div>
                )}
  
                <div className="pt-4">
                  <BookingModal>
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-2xl shadow-primary/20 px-12 h-20 text-xl w-full sm:w-auto transition-all hover:scale-105 active:scale-95 group">
                      Agendar Consultoría Técnica
                      <Rocket className="ml-3 w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </BookingModal>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Plans Section (Wide) */}
        {service.plans && (
          <section className="py-32 bg-slate-50 relative overflow-hidden text-slate-900">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl mb-16 space-y-4">
                <h2 className="text-4xl font-headline font-bold text-slate-900 tracking-tight">
                  Modelos de <span className="text-gradient">Contratación.</span>
                </h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed">
                  Estructuras de servicio adaptadas a la escala y criticidad de su entorno corporativo.
                </p>
              </div>
  
              <div className="grid md:grid-cols-3 gap-8">
                {service.plans.map((plan, i) => (
                  <div 
                    key={i} 
                    className={`p-10 rounded-[3rem] border transition-all duration-500 relative flex flex-col group/plan ${
                      plan.highlight 
                        ? 'bg-white border-primary shadow-2xl shadow-primary/10 scale-105 z-10' 
                        : 'bg-white/80 backdrop-blur-md border-slate-100 hover:shadow-2xl hover:bg-white'
                    }`}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        Recomendado
                      </div>
                    )}
                    
                    <div className="space-y-4 flex-grow">
                      <div className="space-y-1">
                        <h4 className={`text-3xl font-headline font-bold ${plan.highlight ? 'text-primary' : 'text-slate-900'}`}>
                          {plan.name}
                        </h4>
                        <p className="text-primary font-medium text-sm">{plan.subtitle}</p>
                      </div>
                      
                      <div className="space-y-4 py-8 border-y border-slate-50 my-4">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                              <ShieldCheck className="w-3 h-3" strokeWidth={3} />
                            </div>
                            <span className="text-slate-600 text-sm font-light leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
  
                    <div className="mt-8 pt-8 space-y-8">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] text-center italic leading-relaxed">
                        {plan.summary}
                      </p>
                      <Button asChild className={`w-full h-16 rounded-2xl text-base font-bold transition-all shadow-xl group ${
                        plan.highlight ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                      }`}>
                        <Link href={`/?service=${service.slug}&plan=${encodeURIComponent(plan.name)}#contact`}>
                          Solicitar Cotización
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
  
        {/* Features Grid Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="space-y-20">
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h3 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tight">
                  {service.featuresTitle ? (
                    <>
                      {service.featuresTitleHighlight ? (
                        <>
                          {service.featuresTitle.split(service.featuresTitleHighlight)[0]}
                          <span className="text-gradient">{service.featuresTitleHighlight}</span>
                          {service.featuresTitle.split(service.featuresTitleHighlight)[1]}
                        </>
                      ) : service.featuresTitle}
                    </>
                  ) : (
                    <>Servicios <span className="text-gradient">Incluidos.</span></>
                  )}
                </h3>
  
                {(service.featuresSubtitle !== "") && (
                  <p className="text-slate-500 text-lg font-light leading-relaxed">
                    {service.featuresSubtitle || "Puedes agregar estos servicios al plan que elijas."}
                  </p>
                )}
              </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, i) => {
                const [title, ...rest] = feature.split(": ");
                return (
                  <div 
                    key={i} 
                    className="flex flex-col gap-6 p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all group/item relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 group-hover/item:bg-primary transition-colors"></div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500">
                      <ShieldCheck className="w-8 h-8 shrink-0" />
                    </div>
                    <div className="flex flex-col gap-4">
                      <span className="text-2xl font-bold text-slate-900 tracking-tight group-hover/item:text-primary transition-colors">
                        {title}
                      </span>
                      {rest.length > 0 && (
                        <span className="text-slate-500 text-base font-light leading-relaxed">
                          {rest.join(": ")}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
