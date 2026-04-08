"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  children: React.ReactNode;
}

export function BookingModal({ children }: BookingModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) setIsLoading(true);
  };
  const CALENDLY_URL = "https://calendly.com/onlinesystemchile/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=117a97&text_color=0f172a";

  if (!isMounted) return <>{children}</>;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] sm:max-w-[950px] p-0 border-0 rounded-[2.5rem] md:rounded-[3rem] bg-white max-h-[96vh] flex flex-col shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* Compact Corporate Header */}
        <div className="px-8 py-6 md:px-10 md:py-7 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100/80 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
          
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-1 w-6 bg-primary rounded-full"></div>
                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em]">Protocolo de Agendamiento</span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-headline font-bold text-slate-900 tracking-tighter leading-none">
                Programar <span className="text-gradient">Consultoría.</span>
              </DialogTitle>
            </div>
            <DialogDescription className="hidden md:block text-slate-400 font-light text-sm max-w-[280px] text-right leading-tight">
              Sincronización oficial con ingeniería ONLINE System.
            </DialogDescription>
          </div>
        </div>

        {/* Optimized Fixed Container */}
        <div className="flex-grow w-full bg-white relative h-[660px]">
          {/* Spinner Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white"
              >
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  />
                </div>
                <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] animate-pulse">
                  Estableciendo Conexión
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <iframe
            src={`${CALENDLY_URL}&hide_landing_page_details=1`}
            width="100%"
            height="100%"
            frameBorder="0"
            className={cn("w-full h-full bg-white transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")}
            style={{ border: 'none' }}
            onLoad={() => setIsLoading(false)}
            title="Calendly Scheduling"
          ></iframe>
        </div>
        
        {/* Minimal Footer */}
        <div className="px-10 py-4 bg-slate-50/30 flex items-center justify-between border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Conexión Segura v3.4</span>
          </div>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
            © 2026 ONLINE System
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
