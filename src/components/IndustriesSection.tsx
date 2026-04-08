"use client";

import { motion } from "framer-motion";
import { 
  Factory, 
  ShoppingBag, 
  Truck, 
  Building2, 
  HeartPulse, 
  Cpu, 
  Signal, 
  GraduationCap, 
  Landmark, 
  Home, 
  Plane,
  Grape
} from "lucide-react";

export function IndustriesSection() {
  const industries = [
    {
      title: "Minería y Energía",
      description: "Infraestructuras críticas, conectividad en faenas remotas y sistemas de automatización industrial de alta resiliencia.",
      icon: Factory,
      gradient: "from-amber-500/10 to-orange-600/5",
      iconColor: "text-amber-600",
      delay: 0.1
    },
    {
      title: "Retail y Comercio",
      description: "Sistemas de alta disponibilidad, integración de bases de datos y seguridad en transacciones corporativas.",
      icon: ShoppingBag,
      gradient: "from-blue-500/10 to-indigo-600/5",
      iconColor: "text-blue-600",
      delay: 0.2
    },
    {
      title: "Logística Operativa",
      description: "Trazabilidad, redes inalámbricas para centros de distribución y arquitectura de control de flotas.",
      icon: Truck,
      gradient: "from-emerald-500/10 to-teal-600/5",
      iconColor: "text-emerald-600",
      delay: 0.3
    },
    {
      title: "Sector Corporativo",
      description: "Transformación digital integral, migraciones a la nube corporativa e inteligencia de negocios.",
      icon: Building2,
      gradient: "from-primary/10 to-accent/5",
      iconColor: "text-primary",
      delay: 0.4
    },
    {
      title: "Inmobiliaria",
      description: "Conectividad robusta para complejos habitacionales y soluciones de automatización en edificios inteligentes.",
      icon: Home,
      gradient: "from-slate-500/10 to-slate-700/5",
      iconColor: "text-slate-600",
      delay: 0.5
    },
    {
      title: "Salud",
      description: "Continuidad operativa en clínicas y hospitales, redes de telemedicina y seguridad en datos médicos sensibles.",
      icon: HeartPulse,
      gradient: "from-rose-500/10 to-red-600/5",
      iconColor: "text-rose-600",
      delay: 0.6
    },
    {
      title: "Tecnología",
      description: "Integración de arquitecturas Cloud, desarrollo de software escalable y soporte avanzado para empresas tech.",
      icon: Cpu,
      gradient: "from-cyan-500/10 to-blue-600/5",
      iconColor: "text-cyan-600",
      delay: 0.1
    },
    {
      title: "Telecomunicaciones",
      description: "Diseño y despliegue de redes WAN/LAN, enlaces de fibra óptica y sistemas críticos de comunicación.",
      icon: Signal,
      gradient: "from-violet-500/10 to-purple-600/5",
      iconColor: "text-violet-600",
      delay: 0.2
    },
    {
      title: "Transporte",
      description: "Infraestructura de comunicación para terminales, puertos y sistemas de control de tráfico en tiempo real.",
      icon: Plane,
      gradient: "from-sky-500/10 to-blue-700/5",
      iconColor: "text-sky-600",
      delay: 0.3
    },
    {
      title: "Viñedos",
      description: "Transformación digital en el agro, redes IoT para monitoreo de cultivos y conectividad en zonas rurales.",
      icon: Grape,
      gradient: "from-purple-500/10 to-fuchsia-600/5",
      iconColor: "text-purple-700",
      delay: 0.4
    },
    {
      title: "Educacional",
      description: "Redes inalámbricas de alta densidad para campus, soluciones de aprendizaje híbrido y gestión académica.",
      icon: GraduationCap,
      gradient: "from-indigo-500/10 to-primary/5",
      iconColor: "text-indigo-600",
      delay: 0.5
    },
    {
      title: "Financieras y Bancos",
      description: "Ciberseguridad de grado bancario, redundancia de centros de datos y alta disponibilidad transaccional.",
      icon: Landmark,
      gradient: "from-zinc-500/10 to-stone-600/5",
      iconColor: "text-zinc-700",
      delay: 0.6
    }
  ];

  return (
    <section 
      className="py-24 relative overflow-hidden bg-center bg-cover bg-fixed"
      style={{ backgroundImage: 'url("https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/edificio.png")' }}
    >
      {/* Light overlay just to blend, letting the building shine */}
      <div className="absolute inset-0 bg-slate-900/20 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <div className="glass-morphism !bg-white/20 px-8 py-10 rounded-3xl max-w-4xl mx-auto flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-white/70 text-primary font-bold text-[9px] tracking-[0.2em] uppercase mb-6 shadow-sm"
            >
              Sectores de Operación
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tighter"
            >
              Presencia en Industrias <span className="text-gradient">Críticas.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-700 font-medium mt-6 max-w-2xl leading-relaxed"
            >
              Nuestra expertiz cruza transversalmente los rubros más exigentes del país, adaptando la arquitectura tecnológica a la dureza y velocidad de cada sector.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ind.delay, duration: 0.6 }}
              className="group relative"
            >
              {/* Card Container - Translucent Glass */}
              <div className="h-full glass-morphism !bg-white/20 p-8 rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col border border-white/40">
                
                {/* Background Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${ind.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6 bg-white/30 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-white transition-all duration-500 shadow-sm">
                  <ind.icon className={`w-8 h-8 ${ind.iconColor}`} />
                </div>
                
                {/* Text Content */}
                <div className="relative z-10 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {ind.description}
                  </p>
                </div>

                {/* Bottom Deco Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
