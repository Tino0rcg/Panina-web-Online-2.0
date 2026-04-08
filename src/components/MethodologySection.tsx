"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Rocket, Headset, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Diagnóstico y Auditoría",
    description: "Análisis exhaustivo de su infraestructura actual para detectar vulnerabilidades y oportunidades de optimización en su operación TI.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    color: "text-blue-500",
    glow: "shadow-blue-500/20"
  },
  {
    icon: PenTool,
    title: "Diseño de Arquitectura",
    description: "Planificación estratégica de soluciones a medida, enfocadas en escalabilidad, seguridad corporativa y alta disponibilidad.",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/arquitectura%20TI.jpeg",
    color: "text-emerald-500",
    glow: "shadow-emerald-500/20"
  },
  {
    icon: Rocket,
    title: "Implementación y Migración",
    description: "Despliegue ágil y seguro de sistemas minimizando el impacto en la continuidad operativa de su empresa.",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/inplementacion%20TI.jpeg",
    color: "text-purple-500",
    glow: "shadow-purple-500/20"
  },
  {
    icon: Headset,
    title: "Soporte Continuo 24/7",
    description: "Monitoreo proactivo y asistencia técnica permanente con ingenieros locales para resolver incidentes críticos.",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/SoporteTI.png",
    color: "text-rose-500",
    glow: "shadow-rose-500/20"
  }
];

export function MethodologySection() {
  return (
    <section id="methodology" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Micro-Texturing: Dotted Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none brand-texture"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>

      {/* Decorative Floating Soft Glows (Light Mode) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        
        <div className="text-center w-full max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-white text-primary font-bold text-[9px] tracking-[0.2em] uppercase shadow-sm"
          >
            Metodología de Ingeniería
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter leading-none">
            Cómo <span className="text-gradient">Trabajamos</span>
          </h2>
          <p className="text-slate-500 font-light text-xl max-w-2xl mx-auto leading-relaxed">
            Un flujo estratégico diseñado para garantizar la solidez, escalabilidad y resiliencia de su arquitectura tecnológica nacional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          
          {/* Animated Connecting Path for Desktop */}
          <div className="hidden lg:block absolute top-[11.5rem] left-[15%] right-[15%] h-px z-0 pointer-events-none">
            <div className="w-full h-full border-t-2 border-dashed border-slate-200 relative">
               <motion.div 
                 animate={{ x: ["0%", "100%"] }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute -top-1 left-0 w-20 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm"
               ></motion.div>
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="relative group "
            >
              <div className="flex flex-col items-center text-center">
                
                {/* Visual Card Image Hub */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full aspect-[4/3] mb-12 z-10"
                >
                  {/* Decorative Number */}
                  <div className="absolute -top-8 -right-4 text-7xl font-bold font-headline text-slate-100 select-none pointer-events-none italic group-hover:text-primary/10 transition-colors z-20">
                    0{index + 1}
                  </div>

                  {/* Main Image Container */}
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-xl transition-all duration-700 group-hover:border-primary/30 group-hover:shadow-2xl relative shadow-blue-900/5">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-80 group-hover:opacity-20 transition-opacity duration-700"></div>
                  </div>

                  {/* Floating Icon Hub */}
                  <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-2xl ${step.glow} z-30`}>
                    <step.icon className={`w-7 h-7 ${step.color} transition-transform duration-500 group-hover:scale-110`} />
                  </div>
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="space-y-4 px-2 mt-4"
                >
                  <h3 className="text-2xl font-bold font-headline text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <div className="w-8 h-1 bg-slate-200 mx-auto rounded-full group-hover:w-16 group-hover:bg-primary transition-all duration-500"></div>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Mobile/Tablet Arrow */}
                {index !== steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-slate-200">
                    <ChevronRight className="w-8 h-8 rotate-90" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
