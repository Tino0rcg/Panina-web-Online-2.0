"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network, Shield, ChevronRight, ChevronLeft, Target, BarChart3, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BookingModal } from "./BookingModal";

const SLIDES = [
  {
    id: 1,
    tag: "Infraestructura & Continuidad",
    title: "Tecnología para empresas <br /> <span className='text-gradient'>que no pueden detenerse.</span>",
    subtitle: "<strong>Evita caídas, reduce riesgos y asegura la continuidad de tu operación.</strong>",
    description: "",
    features: [
      "Soporte TI 24/7 con SLA",
      "Cloud AWS, Azure y Google Cloud",
      "Integración de sistemas (ERP, APIs)",
      "Ciberseguridad y continuidad operacional"
    ],
    statValue: "99.9%",
    statLabel: "Target SLA",
    secondaryStatValue: "24/7",
    secondaryStatLabel: "Soporte Crítico",
    primaryButtonText: "Ver Soluciones",
    primaryButtonHref: "#services",
    isBooking: false,
    secondaryButtonText: "Hablar con un Experto",
    secondaryButtonHref: "/?service=transformacion-digital-y-soluciones#contact"
  },
  {
    id: 2,
    tag: "Optimización Estratégica",
    title: "Diagnóstico <br /> <span className='text-gradient'>TI 360°.</span>",
    description: "Diagnóstico TI Estratégico para Optimizar Costos, Seguridad y Operación de su infraestructura tecnológica.",
    statValue: "360°",
    statLabel: "Visión Operativa",
    secondaryStatValue: "ROI",
    secondaryStatLabel: "Optimización de Costos",
    primaryButtonText: "Descubre Más",
    primaryButtonHref: "#diagnostico",
    isBooking: false,
    secondaryButtonText: "Hablar con un Experto",
    secondaryButtonHref: "/?service=Solicitar Diagnóstico 360°#contact"
  },
  {
    id: 3,
    tag: "Seguridad Corporativa",
    title: "Ciberseguridad <br /> <span className='text-gradient'>Proactiva y Resiliente.</span>",
    description: "Protegemos sus activos digitales más críticos con auditorías de vulnerabilidades, firewalls de última generación y protocolos de respuesta proactiva.",
    statValue: "SLA",
    statLabel: "Continuidad",
    secondaryStatValue: "ISO 27001",
    secondaryStatLabel: "Concept Compliance",
    primaryButtonText: "Ver Soluciones",
    primaryButtonHref: "/servicios/ciberseguridad",
    secondaryButtonText: "Hablar con un Experto",
    secondaryButtonHref: "/?service=ciberseguridad#contact",
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
    <section className="relative min-h-screen pt-16 md:pt-20 overflow-hidden bg-slate-950">
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

      <div className="container mx-auto px-6 relative z-10 pt-4 md:pt-10">
        <div className="max-w-4xl space-y-6 md:space-y-10 relative min-h-[400px] md:min-h-[450px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 md:space-y-10"
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
                      className="text-4xl sm:text-6xl md:text-7xl font-headline font-bold leading-[0.95] tracking-tighter text-white relative z-10"
                      dangerouslySetInnerHTML={{ __html: currentSlide.title }}
                    />
                  </div>
                  {currentSlide.subtitle && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      className="text-primary text-base md:text-xl font-medium"
                      dangerouslySetInnerHTML={{ __html: currentSlide.subtitle }}
                    />
                  )}
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-base md:text-xl text-slate-200/80 max-w-2xl leading-relaxed font-light"
                  >
                    {currentSlide.description}
                  </motion.p>

                  {currentSlide.features && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-6 max-w-3xl pt-2 border-l-2 border-primary/20 pl-4 sm:pl-6"
                    >
                      {currentSlide.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-200/90 text-sm md:text-base">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                            <ShieldCheck className="w-3 h-3 text-primary" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-2"
                >
                  {/* Action 1: Booking or Link */}
                  {currentSlide.isBooking ? (
                    <BookingModal>
                      <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden">
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
                      <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group">
                        {currentSlide.primaryButtonText}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  )}

                  {/* Action 2: Secondary Info */}
                  <Link href={currentSlide.secondaryButtonHref} passHref>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 glass-morphism hover:bg-white/10 text-white px-8 h-14 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95">
                      {currentSlide.secondaryButtonText}
                    </Button>
                  </Link>
                </motion.div>

                {/* Performance Stats */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.7 }}
                   className="flex flex-wrap items-center gap-6 md:gap-10 pt-6 md:pt-8 border-t border-white/10"
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
