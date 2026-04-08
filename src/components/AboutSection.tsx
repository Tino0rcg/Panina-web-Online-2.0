
"use client";

import Image from "next/image";
import { CheckCircle2, Award, Users2, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  const stats = [
    { icon: Award, value: "20+", label: "Años de Trayectoria", color: "text-primary" },
    { icon: Building2, value: "100+", label: "Clientes Corporativos", color: "text-primary" },
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      {/* Background Mesh - sin overflow-hidden para no cortar la imagen */}
      <div className="absolute inset-x-0 bottom-0 h-[400px] mesh-gradient opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
          
          {/* Columna de Texto */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12 w-full relative"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-slate-50 text-primary font-bold text-[9px] tracking-[0.2em] uppercase">
                Sobre ONLINE System
              </div>
              <h2 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter leading-none">
                Ingeniería con <br />
                <span className="text-gradient">Propósito Humano.</span>
              </h2>
              <div className="space-y-6 text-xl text-slate-500 font-light leading-relaxed border-l-4 border-primary pl-8 text-left">
                <p>
                  En <strong className="font-semibold text-slate-700">ONLINE System</strong> no solo implementamos tecnología: diseñamos <strong className="font-semibold text-slate-700">soluciones integrales</strong> que conectan <strong className="font-semibold text-slate-700">infraestructura, sistemas y personas</strong> para asegurar la <strong className="font-semibold text-slate-700">continuidad real</strong> de tu negocio. A diferencia de proveedores tradicionales, integramos <strong className="font-semibold text-slate-700">transformación digital, redes, energía y ciberseguridad</strong> en una sola estrategia, con acompañamiento experto y <strong className="font-semibold text-slate-700">soporte 24/7</strong>, garantizando <strong className="font-semibold text-slate-700">operaciones seguras, eficientes y sin interrupciones</strong>.
                </p>
                <p>
                  Nuestro compromiso va más allá de un proyecto puntual. En <strong className="font-semibold text-slate-700">ONLINE System</strong> construimos <strong className="font-semibold text-slate-700">relaciones de largo plazo</strong> con nuestros clientes, enfocándonos en la continuidad, evolución y mejora constante de sus operaciones tecnológicas. Más que un proveedor, somos un <strong className="font-semibold text-slate-700">socio estratégico</strong> que acompaña el crecimiento sostenido de tu negocio.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 w-fit`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Columna de Imagen: PURE HTML */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center w-full lg:w-auto mt-10 lg:mt-0"
          >
            {/* Contenedor fluido, sin alturas fijas, sin overflow: hidden */}
            <div className="w-full max-w-[800px] shadow-2xl rounded-3xl bg-white border border-slate-100">
              <img 
                src="https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/hombre%20con%20pc.png" 
                alt="Ingeniería Humana ONLINE System" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
                className="rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
