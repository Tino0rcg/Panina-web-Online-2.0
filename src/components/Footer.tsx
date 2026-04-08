
import Link from "next/link";
import Image from "next/image";
import { Linkedin, ExternalLink, ShieldCheck, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-6 group">
            <Link href="/" className="flex items-center group shrink-0 relative">
              <div className="relative -ml-4 -mt-2">
                <Image 
                  src="/logo.png" 
                  alt="ONLINE System Premium Logo" 
                  width={340} 
                  height={110} 
                  className="h-20 w-auto object-contain transition-all hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-slate-500 max-w-sm text-lg leading-relaxed font-light italic">
              “Tecnología que asegura la continuidad de tu negocio.”
            </p>
            <div className="flex gap-6 pt-4">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-primary" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  aria-label={social.label}
                  className={`p-4 bg-white rounded-[1.25rem] text-slate-400 hover:text-white transition-all transform hover:-translate-y-2 ${social.color} border border-slate-100 hover:border-transparent shadow-sm group/social`}
                >
                  <social.icon size={22} className="group-hover/social:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="font-headline font-bold text-slate-900 text-sm uppercase tracking-[0.5em] flex items-center gap-3">
              <span className="w-8 h-px bg-primary/30"></span>
              Gobernanza
            </h4>
            <ul className="space-y-6">
              {[
                { name: "Soluciones TI para Modernizar y Asegurar tu Operación", href: "#services" },
                { name: "Diagnóstico TI 360°", href: "#diagnostico" },
                { name: "Trayectoria", href: "/#about" },
                { name: "Calculadora de ROI", href: "/calculadora-roi" },
                { name: "Casa Matriz", href: "/#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-primary transition-all font-bold uppercase text-[11px] tracking-widest flex items-center group">
                    <span className="w-0 group-hover:w-6 h-px bg-primary mr-0 group-hover:mr-4 transition-all duration-500"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="font-headline font-bold text-slate-900 text-sm uppercase tracking-[0.5em] flex items-center gap-3">
              <span className="w-8 h-px bg-primary/30"></span>
              Expertiz
            </h4>
            <ul className="space-y-6">
              {[
                { name: "Metodología de Ingeniería", href: "#methodology" },
                { name: "Modernización ERP", href: "/servicios/partner-softland" },
                { name: "Seguridad Industrial", href: "/servicios" }
              ].map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-slate-500 hover:text-primary transition-all font-bold uppercase text-[11px] tracking-widest flex items-center justify-between group">
                    {service.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              © 2026 ONLINE System derechos reservados
            </p>
            <div className="flex gap-4 items-center">
              <ShieldCheck className="w-4 h-4 text-primary/50" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISO 27001 Concept Compliance</span>
            </div>
          </div>
          
          <div className="flex gap-12 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
              <Globe className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />
              Santiago <span className="text-slate-200">|</span> Chile
            </a>
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Normativa</a>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Blur */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
    </footer>
  );
}
