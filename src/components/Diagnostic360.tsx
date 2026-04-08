"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Network, Settings, Target, AlertTriangle, Briefcase, FileSearch, ArrowRight, Zap, TrendingDown, RefreshCcw } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { Button } from "./ui/button";
import Image from "next/image";

const EVALUATION_POINTS = [
  {
    icon: <Network className="w-6 h-6 text-primary" />,
    title: "Evaluación de infraestructura",
    description: "Revisión exhaustiva de redes, servidores y entornos cloud."
  },
  {
    icon: <Settings className="w-6 h-6 text-primary" />,
    title: "Revisión de sistemas",
    description: "Análisis del estado de ERP, CRM e integraciones actuales."
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-primary" />,
    title: "Seguridad y vulnerabilidades",
    description: "Detección de brechas de seguridad y evaluación de riesgos."
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-primary" />,
    title: "Procesos operativos TI",
    description: "Mapeo y evaluación de la eficiencia en flujos de trabajo."
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-primary" />,
    title: "Riesgos y puntos críticos",
    description: "Identificación proactiva de fallas potenciales críticas."
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Recomendaciones priorizadas",
    description: "Plan de acción enfocado en quick wins y roadmap a largo plazo."
  }
];

const PAIN_POINTS = [
  { text: "Sistemas no integrados", icon: <Network className="w-4 h-4 text-rose-400" /> },
  { text: "Costos ocultos en infraestructura", icon: <TrendingDown className="w-4 h-4 text-rose-400" /> },
  { text: "Riesgos de ciberseguridad", icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
  { text: "Procesos manuales ineficientes", icon: <Zap className="w-4 h-4 text-rose-400" /> }
];

const DELIVERABLES = [
  "Informe ejecutivo con hallazgos clave",
  "Evaluación técnica detallada",
  "Riesgos identificados",
  "Recomendaciones priorizadas",
  "Roadmap de mejoras",
  "Propuesta de soporte o implementación (opcional)"
];

export function Diagnostic360() {
  return (
    <section id="diagnostico" className="py-24 relative bg-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/360.png"
          alt="TI 360 Background"
          fill
          className="object-cover opacity-65 transition-opacity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-slate-950/85"></div>
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[160px] opacity-50"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-accent/30 rounded-full blur-[160px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Optimiza tu operación tecnológica</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-headline font-bold text-white leading-tight tracking-tighter"
          >
            Diagnóstico{" "}
            <span className="relative inline-block">
              <span className="text-gradient animate-gradient-fast">TI 360°</span>
              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-primary/20 rounded-full pointer-events-none opacity-40"
              />
              <motion.span 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-2 bg-primary/10 rounded-full blur-xl pointer-events-none -z-10"
              />
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 font-light max-w-3xl mx-auto"
          >
            Es una evaluación integral de tu entorno tecnológico que nos permite identificar oportunidades de mejora, riesgos operativos, reducción de costos y eficiencias ocultas.
            <br/><br/>
            <span className="font-semibold text-white bg-primary/20 px-4 py-1 rounded-lg border border-primary/30">No es solo un análisis técnico, es una visión estratégica para alinear tu tecnología con los objetivos del negocio.</span>
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Evaluation Points & Result */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {EVALUATION_POINTS.map((point, idx) => (
                <div key={idx} className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="mb-4 p-3 inline-flex rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    {point.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">{point.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Main Result Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/30 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                <Target className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-primary rounded-xl shrink-0">
                  <FileSearch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Resultado Final</h4>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Un plan claro para mejorar <span className="text-white font-semibold">eficiencia, seguridad y continuidad operacional</span> adaptado a su negocio.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Why, Investment, Deliverables */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Why section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-4">¿Por qué realizar este diagnóstico?</h3>
              <p className="text-slate-400 text-sm mb-6 font-light">Muchas empresas operan con vulnerabilidades sin saberlo:</p>
              
              <ul className="space-y-4 mb-6">
                {PAIN_POINTS.map((pain, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-rose-500/10 border border-rose-500/20 shadow-sm shrink-0">
                      {pain.icon}
                    </div>
                    <span className="text-slate-300 font-medium text-sm">{pain.text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary-50">
                <p className="font-light text-slate-300">
                  <strong className="text-white font-semibold">Nuestro diagnóstico permite detectar estos problemas</strong> antes de que impacten el negocio.
                </p>
              </div>
            </motion.div>

            {/* ROI Analysis section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-primary/5 backdrop-blur-md border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-primary" />
                <h3 className="text-2xl font-bold text-white">Análisis de ROI</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Maximice su rentabilidad mediante el análisis de ROI: Un <span className="text-white font-semibold">Diagnóstico TI 360°</span> es una inversión estratégica con retornos medibles. Al transformar gastos reactivos imprevistos en un modelo de mantenimiento preventivo bajo contrato, las empresas logran reducir hasta un <span className="text-primary font-bold">85% los tiempos de inactividad crítica</span>.
              </p>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed font-light">
                La conveniencia es clara: el costo de prevención es significativamente menor al impacto financiero de una falla mayor, asegurando que cada recurso tecnológico esté alineado con la rentabilidad y escalabilidad de su negocio.
              </p>
            </motion.div>

            {/* Investment & Deliverables */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10"
            >
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <h3 className="text-2xl font-bold text-white">Inversión Estratégica</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-light mb-4">
                  Ofrecemos este diagnóstico a un costo preferencial, muy por debajo del valor de mercado, con el objetivo de generar una relación de largo plazo.
                </p>
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 border-l-4 border-l-accent">
                  <p className="text-sm font-medium text-slate-200">
                    Si decides avanzar con nosotros en un contrato de soporte o implementación, el costo del diagnóstico puede ser descontado del proyecto.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">¿Qué obtienes al finalizar?</h4>
                <ul className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center mb-6">Sin compromiso de continuidad.</p>
                
                <BookingModal>
                  <Button size="lg" className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group">
                    Agendar Diagnóstico
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </BookingModal>
              </div>

            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
