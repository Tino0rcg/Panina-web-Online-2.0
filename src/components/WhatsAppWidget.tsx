"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Building2, ChevronRight, CheckCircle2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Soporte Técnico Especializado",
  "Soluciones ERP Softland",
  "Consultoría Estratégica TI",
  "Proyectos de Ingeniería y Redes",
  "Otros Requerimientos"
];

const WHATSAPP_NUMBER = "+56996070383";

export function WhatsAppWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    category: ""
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setFormData({ name: "", company: "", category: "" });
    }, 300);
  };

  const handleNext = () => {
    if (step === 1 && formData.name && formData.company) {
      setStep(2);
    }
  };

  const handleSend = () => {
    if (!formData.category) return;

    const message = `Hola, mi nombre es ${formData.name} de la empresa ${formData.company}. Contacto a través del portal por el siguiente requerimiento: ${formData.category}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    handleClose();
  };

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Tooltip on hover */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white px-4 py-2 rounded-xl shadow-xl mb-4 border border-slate-100 hidden md:block"
        >
          <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Ingeniero Virtual Online
          </p>
        </motion.div>
      )}

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => isOpen ? handleClose() : handleOpen()}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative ring-4 ring-offset-2 ring-offset-white",
          isOpen ? "bg-slate-900 rotate-90 ring-slate-100" : "bg-[#25D366] ring-emerald-100"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <MessageCircle className="w-8 h-8 text-white fill-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status indicator bubble */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] overflow-hidden"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="bg-slate-900 p-8 text-white relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg border-2 border-white/20">
                      <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg leading-tight">Ingeniero Virtual</h3>
                    <p className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                      En línea • ONLINE System
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10"
                >
                  <X className="w-5 h-5 text-white/50" />
                </button>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -tr-1/4"></div>
              </div>

              {/* Chat Content */}
              <div className="p-8 space-y-6 max-h-[400px] overflow-y-auto bg-slate-50/50">
                
                {/* Bot welcome message */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "Hola, bienvenido a la comunicación directa de <strong>ONLINE System</strong>. Soy su asistente técnico virtual. Por favor, ayúdeme con la siguiente información para derivarlo con el equipo correcto."
                    </p>
                  </div>
                </motion.div>

                {/* Step 1: Data */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-2"
                  >
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <Input 
                        placeholder="Su nombre completo"
                        className="pl-12 h-14 rounded-xl border-slate-200 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <Input 
                        placeholder="Empresa / Organización"
                        className="pl-12 h-14 rounded-xl border-slate-200 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    
                    <Button 
                      disabled={!formData.name || !formData.company}
                      onClick={handleNext}
                      className="w-full h-14 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold group"
                    >
                      Siguiente
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Category selection */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">
                      ¿En qué área podemos apoyarle?
                    </label>
                    <div className="grid gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData({...formData, category: cat})}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-xl border transition-all text-left text-sm font-medium",
                            formData.category === cat 
                              ? "bg-primary/5 border-primary text-primary shadow-sm" 
                              : "bg-white border-slate-100 text-slate-600 hover:border-slate-300"
                          )}
                        >
                          {cat}
                          {formData.category === cat && (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>

                    <Button 
                      disabled={!formData.category}
                      onClick={handleSend}
                      className="w-full h-16 rounded-2xl bg-[#25D366] hover:bg-[#1fb355] text-white font-bold text-lg shadow-xl shadow-emerald-200/50 group border-0"
                    >
                      Iniciar Chat WhatsApp
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    
                    <button 
                      onClick={() => setStep(1)}
                      className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium underline underline-offset-4"
                    >
                      Cambié de opinión, volver atrás
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 bg-white border-t border-slate-50 text-center">
                <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                  Su solicitud será procesada por nuestro equipo de ingeniería senior.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
