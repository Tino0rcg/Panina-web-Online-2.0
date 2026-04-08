"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network, Shield, ChevronRight, ChevronLeft, Target, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BookingModal } from "./BookingModal";

const SLIDES = [
  {
    id: 1,
    tag: "Optimización Estratégica",
    title: "Diagnóstico <br /> <span className='text-gradient'>TI 360°.</span>",
    description: "Diagnóstico TI Estratégico para Optimizar Costos, Seguridad y Operación de su infraestructura tecnológica.",
    statValue: "360°",
    statLabel: "Visión Operativa",
    secondaryStatValue: "ROI",
    secondaryStatLabel: "Optimización de Costos",
    primaryButtonText: "Agendar una reunión",
    primaryButtonHref: "#contact",
    isBooking: true,
    secondaryButtonText: "Descubra más",
    secondaryButtonHref: "#diagnostico"
  },
  {
    id: 2,
    tag: "Liderazgo Tecnológico Premium",
    title: "Reinventando la <br /> <span className='text-gradient'>Ingeniería Digital.</span>",
    description: "ONLINE System es la consultora estratégica líder en Chile, diseñando soluciones críticas que aceleran la evolución de las empresas más exigentes.",
    statValue: "20+ Años",
    statLabel: "Trayectoria Local",
    secondaryStatValue: "100+",
    secondaryStatLabel: "Clientes Corporativos",
    primaryButtonText: "Descubra Más",
    primaryButtonHref: "#services",
    secondaryButtonText: "Asesoría",
    secondaryButtonHref: "#contact",
    isBooking: false
  },
  {
    id: 3,
    tag: "Ingeniería, Redes y Telecomunicaciones",
    title: "Liderazgo en <br /> <span className='text-gradient'>Infraestructura TI.</span>",
    description: "Diseñamos y operamos ecosistemas digitales de alta disponibilidad para las industrias más complejas de la región.",
    statValue: "24/7",
    statLabel: "Soporte Tecnológico",
    secondaryStatValue: "Chile",
    secondaryStatLabel: "Respaldo Local",
    primaryButtonText: "Explorar Soluciones",
    primaryButtonHref: "#services",
    secondaryButtonText: "Contacto",
    secondaryButtonHref: "#contact",
    isBooking: false
  },
  {
    id: 4,
    tag: "Transformación Estratégica",
    title: "Estrategia con <br /> <span className='text-gradient'>Inteligencia de Negocios.</span>",
    description: "Transformamos la complejidad de sus datos en ventajas competitivas reales mediante modelos predictivos y analítica senior.",
    statValue: "BI & IA",
    statLabel: "Modelos Predictivos",
    secondaryStatValue: "SLA",
    secondaryStatLabel: "Acuerdos Garantizados",
    primaryButtonText: "Nuestros Servicios",
    primaryButtonHref: "#services",
    secondaryButtonText: "Ver Más",
    secondaryButtonHref: "#about",
    isBooking: false
  }
];

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Handle Hash Navigation to Slide 1 (Diagnostic)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#diagnostico-banner") {
        setCurrent(0); // Now Slide 1
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const currentSlide = SLIDES[current];

  if (!isMounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-slate-950">
      {/* Full Background Video */}
      <video
        src="https://cdn.jsdelivr.net/gh/Tino0rcg/imagenes-pagina-online-2.0@main/Video%20para%20pag%20online%20(1).mp4"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-slate-900/60 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      
      {/* Brand Texture Overlay */}
      <div className="absolute inset-0 z-0 brand-texture opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="max-w-4xl space-y-10 relative min-h-[450px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                
                <div className="space-y-6">
                  {/* Semantic H1 for SEO */}
                  <h1 className="sr-only">Consultoría en Ingeniería TI y Transformación Digital | ONLINE System</h1>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">{currentSlide.tag}</span>
                    {currentSlide.id === 1 && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-[9px] font-bold text-accent uppercase tracking-widest"
                      >
                        Evaluación Prioritaria
                      </motion.span>
                    )}
                  </div>

                  {/* Header Title with Radar Effect for Slide 1 */}
                  <div className="relative">
                    {currentSlide.id === 1 && (
                      <div className="absolute -inset-10 z-0 flex items-center justify-center opacity-40 pointer-events-none">
                        <motion.div 
                          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute w-40 h-40 border border-primary/40 rounded-full"
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                          className="absolute w-40 h-40 border border-primary/20 rounded-full"
                        />
                        <motion.div 
                          animate={{ scale: [1, 2.2], opacity: [0.2, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                          className="absolute w-40 h-40 border border-primary/10 rounded-full"
                        />
                      </div>
                    )}
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="text-6xl md:text-7xl font-headline font-bold leading-[0.95] tracking-tighter text-white relative z-10"
                      dangerouslySetInnerHTML={{ __html: currentSlide.title }}
                    />
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed font-light"
                  >
                    {currentSlide.description}
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-5 pt-2"
                >
                  {/* Action 1: Booking or Link */}
                  {currentSlide.isBooking ? (
                    <BookingModal>
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden">
                        <span className="relative z-10 flex items-center">
                          {currentSlide.primaryButtonText}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                        
                        {/* Shimmer Effect for Slide 1 */}
                        {currentSlide.id === 1 && (
                          <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                          />
                        )}
                      </Button>
                    </BookingModal>
                  ) : (
                    <Link href={currentSlide.primaryButtonHref} passHref>
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group">
                        {currentSlide.primaryButtonText}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  )}

                  {/* Action 2: Secondary Info */}
                  <Link href={currentSlide.secondaryButtonHref} passHref>
                    <Button variant="outline" size="lg" className="border-white/20 glass-morphism hover:bg-white/10 text-white px-8 h-14 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95">
                      {currentSlide.secondaryButtonText}
                    </Button>
                  </Link>
                </motion.div>

                {/* Performance Stats */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.7 }}
                   className="flex items-center gap-10 pt-8 border-t border-white/10"
                >
                  <div className="flex flex-col gap-0.5 group">
                    <div className="flex items-center gap-2">
                      {currentSlide.id === 4 ? <Target className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> : <Shield className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />}
                      <span className="text-xl font-bold text-white tracking-tight">{currentSlide.statValue}</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{currentSlide.statLabel}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col gap-0.5 group">
                    <div className="flex items-center gap-2">
                      {currentSlide.id === 4 ? <BarChart3 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> : <Network className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />}
                      <span className="text-xl font-bold text-white tracking-tight">{currentSlide.secondaryStatValue}</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{currentSlide.secondaryStatLabel}</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 pt-8">
              <button 
                onClick={prevSlide} 
                className="p-2.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md hover:bg-primary text-white transition-all shadow-sm"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5 items-center">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 transition-all rounded-full ${current === i ? "w-6 bg-primary" : "w-1.5 bg-white/30 hover:bg-white/50"}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide} 
                className="p-2.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md hover:bg-primary text-white transition-all shadow-sm"
                aria-label="Next Slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
        </div>
      </div>
    </section>
  );
}
