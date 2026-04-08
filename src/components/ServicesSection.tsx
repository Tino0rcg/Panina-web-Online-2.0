
"use client";

import { useState } from "react";
import { 
  Cloud, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  BarChart3, 
  Settings2, 
  BrainCircuit, 
  Rocket,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData } from "@/lib/data-services";



export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 relative bg-white overflow-hidden">
      {/* Background Personality Mesh */}
      <div className="absolute inset-x-0 top-0 h-[500px] mesh-gradient opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-primary font-headline font-semibold tracking-widest uppercase text-xs flex items-center justify-center gap-3"
          >
            <span className="w-12 h-px bg-primary/20"></span>
            Moderniza tus sistemas y evita caídas que impacten tu negocio
            <span className="w-12 h-px bg-primary/20"></span>
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-headline font-bold text-slate-900 tracking-tight"
          >
            Soluciones TI para <span className="text-gradient">Modernizar y Asegurar</span> tu Operación
          </motion.h3>
          <p className="text-slate-500 text-xl font-light leading-relaxed">
            Mejoramos tu infraestructura, integramos tus sistemas y protegemos la continuidad de tu negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.slice(0, 6).map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group h-full"
            >
              <Link href={`/servicios/${service.slug}`} className="block h-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-[2.5rem]">
                <Card className={`bg-white border-slate-100 transition-all duration-500 card-hover-effect overflow-hidden rounded-[2.5rem] h-full flex flex-col relative z-20 ${hoveredIndex === idx ? 'border-primary/30 shadow-2xl' : ''}`}>
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
                    {/* Floating Icon Badge */}
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`absolute -top-10 right-8 p-4 rounded-2xl bg-white border border-slate-100 shadow-xl transition-all duration-500 ${service.glow}`}
                    >
                      <service.icon className={`w-8 h-8 ${service.color}`} />
                    </motion.div>

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
                  <div className="h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-in-out mt-auto"></div>
                </Card>
              </Link>
              
              {/* Personality: Floating Glow Accent */}
              {hoveredIndex === idx && (
                <motion.div 
                  layoutId="glow"
                  className="absolute -inset-2 bg-primary/5 rounded-[3rem] blur-2xl z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/servicios">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-white border-primary/20 text-primary hover:bg-primary hover:text-white px-12 h-16 rounded-2xl text-xl font-bold shadow-2xl transition-all group border-2"
              >
                Ver Catálogo Completo
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
