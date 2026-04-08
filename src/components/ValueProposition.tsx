"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Activity, TrendingUp, CheckCircle2 } from "lucide-react";

export function ValueProposition() {
  const values = [
    {
      icon: MapPin,
      title: "Respaldo Local Especializado",
      description: "Contamos con un equipo de ingenieros en Chile listo para brindar soporte rápido presencial o remoto, entendiendo la dinámica corporativa local.",
      color: "text-blue-500",
      bgHover: "hover:bg-blue-50"
    },
    {
      icon: ShieldCheck,
      title: "Cumplimiento Normativo",
      description: "Desarrollamos e implementamos sistemas bajo estrictos estándares que cumplen con las normativas y regulaciones del mercado chileno.",
      color: "text-emerald-500",
      bgHover: "hover:bg-emerald-50"
    },
    {
      icon: Activity,
      title: "Continuidad Operativa",
      description: "Nuestro principal objetivo es garantizar herramientas y soluciones que prevengan caídas, asegurando que su negocio nunca se detenga.",
      color: "text-rose-500",
      bgHover: "hover:bg-rose-50"
    },
    {
      icon: TrendingUp,
      title: "Arquitectura Escalable",
      description: "Creamos ecosistemas digitales pensados para crecer a la par con sus necesidades, optimizando el retorno de inversión a largo plazo.",
      color: "text-violet-500",
      bgHover: "hover:bg-violet-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
    }
  };

  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50">
      {/* Background Image with Frosted Light Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="/hero-slide-2.png" 
          alt="Background Texture" 
          className="w-full h-full object-cover opacity-70"
        />
        {/* Soft overlay to ensure text readability but keep the image highly visible */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[3px]"></div>
      </div>

      {/* Animated Subtle Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"
      />

      <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="space-y-8 bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/80 shadow-2xl shadow-slate-200/50"
          >
            <motion.div variants={listVariants} className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-bold text-[9px] tracking-[0.2em] uppercase shadow-sm">
                Propuesta de Valor
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tighter">
                Por qué confiar en <br/>
                <span className="text-gradient">ONLINE System</span>
              </h2>
              <p className="text-slate-500 font-light text-lg leading-relaxed">
                <span className="font-bold text-slate-900 block mb-2 underline decoration-primary/30 decoration-4 underline-offset-4">Tu operación no puede fallar. Nosotros lo aseguramos.</span>
                Trabajamos como tu socio tecnológico para garantizar continuidad, eficiencia y control total de su infraestructura TI.
              </p>
            </motion.div>

            <div className="space-y-4 pt-2">
              {[
                "Trato directo sin intermediarios ni demoras.",
                "Ingeniería enfocada en resultados técnicos medibles.",
                "Total transparencia y acuerdos SLA garantizados."
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={listVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 text-slate-700 font-medium bg-white p-4 rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 hover:border-primary/30 hover:shadow-primary/10 transition-all cursor-default relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent w-0 group-hover:w-full transition-all duration-500 z-0"></div>
                  <CheckCircle2 className="w-5 h-5 text-accent relative z-10 drop-shadow-sm" />
                  <span className="relative z-10">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {values.map((val, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group bg-white p-7 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl transition-all duration-500 relative overflow-hidden cursor-default`}
              >
                {/* Hover gradient background mask */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${val.bgHover} mix-blend-multiply`}></div>

                <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-sm`}>
                  <val.icon className={`w-7 h-7 ${val.color} drop-shadow-sm`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-headline mb-3 relative z-10 group-hover:text-primary transition-colors">{val.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed relative z-10">
                  {val.description}
                </p>
                
                {/* Decorative minimal border bottom */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-700"></div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
