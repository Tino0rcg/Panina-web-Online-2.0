
"use client";

import { useActionState, useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servicesData } from "@/lib/data-services";
import { sendContactEmail } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

function ContactForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);

  // States for pre-filling with default service
  const [selectedService, setSelectedService] = useState("Contrato y Soporte de Mantenimiento Preventivo");
  const [initialMessage, setInitialMessage] = useState("");

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const planParam = searchParams.get("plan");

    if (serviceParam) {
      // Find a match in our data or set it directly for the special "Diagnóstico 360°" case
      const match = servicesData.find(s => 
        s.slug === serviceParam || 
        s.name.toLowerCase() === serviceParam.toLowerCase() ||
        s.name.toLowerCase().includes(serviceParam.toLowerCase())
      );

      if (match) {
        setSelectedService(match.name);
        if (planParam) {
          setInitialMessage(`Hola equipo de ONLINE System,\n\nSolicito una cotización formal para el "${planParam}" del servicio de "${match.name}".\n\nQuedo atento a su respuesta.`);
        }
      } else if (serviceParam === "Solicitar Diagnóstico 360°" || serviceParam.includes("Diagnóstico")) {
        setSelectedService("Solicitar Diagnóstico 360°");
      }

      const messageParam = searchParams.get("message");
      if (messageParam) {
        setInitialMessage(messageParam);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Mensaje Enviado",
        description: state.message,
        className: "bg-emerald-50 border-emerald-200 text-emerald-900",
      });
      formRef.current?.reset();
      setSelectedService("");
      setInitialMessage("");
    } else if (state?.error) {
      toast({
        title: "Error de Envío",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto glass-morphism rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-200"
    >
      <div className="grid md:grid-cols-2">
        <div className="p-16 bg-primary/5 text-slate-900 flex flex-col justify-between space-y-16 relative overflow-hidden backdrop-blur-3xl border-r border-slate-100">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-40 -mt-40 blur-[100px] animate-pulse"></div>
          
          <div className="space-y-10 relative z-10">
            <div className="space-y-6">
              <h2 className="text-5xl font-headline font-bold tracking-tighter leading-none">
                Hablemos de su <br />
                <span className="text-gradient">Estrategia TI.</span>
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed">
                Nuestro equipo de ingeniería está listo para analizar sus desafíos y proponer una hoja de ruta escalable.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Canal Ejecutivo", value: "contacto@onlinesystem.cl", href: "mailto:contacto@onlinesystem.cl" },
                { icon: Phone, label: "Línea Directa", value: "+56 9 9607 0383", href: "tel:+56996070383" },
                { icon: MapPin, label: "Casa Matriz", value: "Ábel González 0324", subValue: "La Cisterna, Santiago-Chile" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-default"
                >
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-lg font-bold text-slate-900 hover:text-primary transition-colors block">
                        {item.value}
                      </a>
                    ) : (
                      <div className="flex flex-col">
                        <p className="text-lg font-bold text-slate-900">{item.value}</p>
                        {item.subValue && <p className="text-sm text-slate-500 font-medium">{item.subValue}</p>}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-primary/10 flex items-center gap-8 relative z-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">ISO 27001 Protocol</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Santiago | Chile</span>
            </div>
          </div>
        </div>

        <div className="p-16 bg-white relative">
          <form 
            action={formAction}
            ref={formRef}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</Label>
                <Input name="name" placeholder="Ej: Juan Pérez" className="h-14 rounded-xl border-slate-100 focus:border-primary/30 focus:ring-0 text-slate-900 bg-slate-50/50" required />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Correo Corporativo</Label>
                <Input name="email" type="email" placeholder="juan@empresa.cl" className="h-14 rounded-xl border-slate-100 focus:border-primary/30 focus:ring-0 text-slate-900 bg-slate-50/50" required />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Servicio de Interés</Label>
              <input type="hidden" name="service" value={selectedService} />
              <Select 
                value={selectedService} 
                onValueChange={setSelectedService}
                required
              >
                <SelectTrigger className="h-14 rounded-xl border-slate-100 focus:border-primary/30 focus:ring-0 text-slate-900 bg-slate-50/50">
                  <SelectValue placeholder="Seleccione un servicio profesional" />
                </SelectTrigger>
                <SelectContent>
                  {[...servicesData]
                    .sort((a, b) => (a.name === selectedService ? -1 : b.name === selectedService ? 1 : 0))
                    .map((service) => (
                      <SelectItem key={service.slug} value={service.name}>
                        {service.name}
                      </SelectItem>
                    ))}
                  <SelectItem value="Solicitar Diagnóstico 360°">Solicitar Diagnóstico 360°</SelectItem>
                  <SelectItem value="otros">Otro / Consultoría General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mensaje Técnico</Label>
              <Textarea 
                name="message" 
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                placeholder="Describa brevemente su requerimiento..." 
                className="min-h-[160px] rounded-xl border-slate-100 focus:border-primary/30 focus:ring-0 text-slate-900 bg-slate-50/50 resize-none pt-4" 
                required 
              />
            </div>

            <Button 
              className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 group transition-all"
              disabled={isPending}
            >
              {isPending ? "Procesando Solicitud..." : "Enviar Requerimiento Estratégico"}
              <Send className={`ml-3 w-5 h-5 transition-transform ${isPending ? "translate-x-10 opacity-0" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
            </Button>

            <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Privacidad Garantizada bajo NDA Profesional
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-32 relative bg-white overflow-hidden">
      {/* Personality Layer: Mesh Background */}
      <div className="absolute inset-0 z-0 mesh-gradient opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Suspense fallback={<div className="h-[600px] bg-slate-50 animate-pulse rounded-[3.5rem]"></div>}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
