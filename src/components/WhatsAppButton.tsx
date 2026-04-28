"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappNumber = "569XXXXXXXX"; // Reemplazar con el número real
  const message = "Hola, me gustaría solicitar un diagnóstico TI para mi empresa.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl shadow-[#25D366]/30 group hover:bg-[#128C7E] transition-colors"
    >
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 leading-none mb-1">Soporte 24/7</span>
        <span className="text-sm font-bold leading-none">Contacto WhatsApp</span>
      </div>
      <div className="bg-white/20 p-1.5 rounded-full">
        <MessageCircle className="w-6 h-6 fill-current" />
      </div>
    </motion.a>
  );
}
