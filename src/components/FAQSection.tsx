"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Qué tipos de industrias atienden en Chile?",
    answer: "Trabajamos de forma transversal con diversas industrias, incluyendo manufactura, logística, minería, y servicios corporativos. Nuestra metodología nos permite adaptar las soluciones TI a las demandas críticas de cualquier sector operativo."
  },
  {
    question: "¿Tienen cobertura técnica en regiones o solo en Santiago?",
    answer: "Nuestra oficina central se encuentra en Santiago, pero contamos con la capacidad logística y tecnológica para implementar proyectos y brindar soporte remoto (y presencial programado) a lo largo de todo el territorio nacional."
  },
  {
    question: "¿Cuáles son sus tiempos de respuesta ante incidencias críticas?",
    answer: "Manejamos Acuerdos de Nivel de Servicio (SLA) estrictos. Para incidentes catalogados como críticos (Prioridad 1) que afecten la continuidad operativa, los tiempos de respuesta inicial se gestionan típicamente en menos de 2 a 4 horas, dependiendo del contrato."
  },
  {
    question: "¿Desarrollan software a medida o solo integran hardware?",
    answer: "Ambos. Proveemos infraestructura tecnológica (hardware, networking, servidores) y también contamos con un área experta en desarrollo de software para crear soluciones empresariales exclusivas y arquitecturas Cloud."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 w-full max-w-4xl relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-white text-primary font-bold text-[9px] tracking-[0.2em] uppercase">
            Soporte y Consultas
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 tracking-tighter">
            Preguntas <span className="text-gradient">Frecuentes</span>
          </h2>
          <p className="text-slate-500 font-light text-lg">
            Transparencia y claridad sobre cómo fortalecemos el área tecnológica de su empresa.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 font-headline">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-500 font-light leading-relaxed border-t border-slate-100 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
