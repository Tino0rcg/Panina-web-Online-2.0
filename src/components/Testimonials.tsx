
import { Quote, Star, Verified } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    content: "ONLINE System transformó nuestro servicio de ingeniería, redes y telecomunicaciones en un ecosistema de alta disponibilidad. Su enfoque profesional nos permitió escalar nuestras operaciones logísticas sin interrupciones bajo estándares internacionales.",
    author: "Ricardo Alarcón",
    position: "Gerente TI, Logística Austral",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  },
  {
    content: "La implementación del Dashboard de BI y la integración ERP nos permitió visualizar cuellos de botella en tiempo real. Un socio tecnológico de confianza con dominio técnico excepcional en el mercado chileno.",
    author: "Mariana Soto",
    position: "Directora de Operaciones, Retail Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    content: "Como consultora senior, puedo afirmar que su expertiz en ciberseguridad elevó nuestros estándares de cumplimiento y nos brindó la infraestructura robusta necesaria para el manejo de datos sensibles.",
    author: "Héctor Valdevieso",
    position: "Socio Principal, V&M Consultores",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] animate-pulse pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <h2 className="text-primary font-headline font-bold tracking-[0.4em] uppercase text-[10px] flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-primary/30"></span>
            Casos de Éxito
            <span className="w-12 h-px bg-primary/30"></span>
          </h2>
          <h3 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter">Impacto Estratégico.</h3>
          <p className="text-slate-500 text-xl font-light leading-relaxed">
            Acompañamos a las empresas líderes del país en sus desafíos tecnológicos más complejos y críticos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-12 rounded-[3.5rem] flex flex-col justify-between border border-slate-100 relative group hover-lift card-shadow transition-all backdrop-blur-3xl overflow-hidden hover:border-primary/20 group">
              <Quote className="absolute top-12 right-12 w-20 h-20 text-primary/5 group-hover:text-primary/10 transition-colors duration-700" />
              
              <div className="relative z-10">
                <div className="flex gap-1.5 mb-10 translate-y-2 opacity-60 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed italic font-light border-l-4 border-primary pl-8 group-hover:text-slate-900 transition-colors">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-6 pt-10 border-t border-slate-50 relative z-10">
                <div className="relative w-16 h-16 rounded-[1.25rem] overflow-hidden shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-primary transition-colors">{t.author}</h4>
                    <Verified className="w-4 h-4 text-primary/50" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t.position}</p>
                </div>
              </div>
              
              {/* Animated bottom bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
