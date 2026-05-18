"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MessageSquare } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export function HybridSecurity() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: "s0",
      type: "portada",
      tag: "",
      title: "",
      titleAccent: "",
      sub: "Plataforma integral de control de visitantes, seguridad perimetral y trazabilidad operativa para sus instalaciones.",
    },
    {
      id: "s1",
      type: "grid3",
      tag: "Contexto",
      title: "¿Por qué un sistema",
      titleAccent: "de control de accesos?",
      cards: [
        { icon: "⚠", iconColor: "text-red-500", iconBg: "bg-red-500/15", title: "Riesgo de Seguridad", desc: "Sin registro digital, no hay trazabilidad de quién ingresa o sale de las instalaciones en tiempo real." },
        { icon: "📋", iconColor: "text-yellow-500", iconBg: "bg-yellow-500/15", title: "Registros Manuales", desc: "Bitácoras en papel se pierden, son ilegibles y no permiten generar reportes ni auditorías automatizadas." },
        { icon: "🔒", iconColor: "text-[#00A9E0]", iconBg: "bg-[#00A9E0]/15", title: "Cumplimiento Normativo", desc: "Regulaciones exigen un control verificable de personas en instalaciones industriales y plantas operativas." }
      ]
    },
    {
      id: "s2",
      type: "split_right_img",
      tag: "La Solución",
      title: "Plataforma",
      titleAccent: "100% Offline",
      sub: "Sistema de escritorio autónomo que no requiere internet. Opera en la red local de la planta con base de datos propia, escáner móvil y modo kiosco de seguridad.",
      list: [
        "Funciona sin conexión a internet",
        "Base de datos local SQLite (sin costos de servidor)",
        "Interfaz táctil para guardias de seguridad",
        "Escaneo de cédula desde celular Samsung",
        "Reportes exportables a Excel"
      ],
      image: "/images/hero.png"
    },
    {
      id: "s3",
      type: "grid4",
      tag: "Funcionalidades Clave",
      title: "Módulos del",
      titleAccent: "Sistema",
      cards: [
        { icon: "📷", iconColor: "text-[#00A9E0]", iconBg: "bg-[#00A9E0]/15", title: "Registro de Ingreso", desc: "Escaneo de cédula (PDF417) o ingreso manual. Autocompletado para visitantes recurrentes." },
        { icon: "🚪", iconColor: "text-green-500", iconBg: "bg-green-500/15", title: "Registro de Salida", desc: "Cierre de visita con cálculo automático de tiempo de permanencia en planta." },
        { icon: "🔺", iconColor: "text-red-500", iconBg: "bg-red-500/15", title: "Alerta Conflictivos", desc: "Marcado de visitantes conflictivos con bloqueo automático de ingreso y registro de observaciones." },
        { icon: "📊", iconColor: "text-purple-500", iconBg: "bg-purple-500/15", title: "Reportes y Auditoría", desc: "Estadísticas en tiempo real, historial completo filtrable y exportación a Excel." }
      ]
    },
    {
      id: "s4",
      type: "split_left_img",
      tag: "Innovación",
      title: "Escaneo",
      titleAccent: "Móvil",
      sub: "El guardia usa su celular Samsung como escáner de cédulas. La información se sincroniza instantáneamente al PC principal vía red Wi-Fi local.",
      image: "/images/mobile.png",
      timeline: [
        { num: "1", title: "Escaneo", desc: "La cámara del celular lee el código PDF417 del reverso de la cédula." },
        { num: "2", title: "Sincronización", desc: "Los datos se envían al PC por Wi-Fi en menos de 1 segundo vía bridge en puerto 3001." },
        { num: "3", title: "Registro", desc: "El PC autocompleta el formulario y el guardia solo confirma e indica destino." }
      ]
    },
    {
      id: "s5",
      type: "split_right_img",
      tag: "Visibilidad Total",
      title: "Dashboard",
      titleAccent: "en Tiempo Real",
      sub: "Panel de control con KPIs de seguridad, gráficos de frecuencia y métricas operativas que permiten tomar decisiones informadas.",
      image: "/images/dashboard.png",
      stats: [
        { value: "5.038", label: "Visitas registradas" },
        { value: "45m", label: "Duración promedio" },
        { value: "3", label: "Puertas activas" },
        { value: "24/7", label: "Operación continua" }
      ]
    },
    {
      id: "s6",
      type: "grid3_tech",
      tag: "Arquitectura",
      title: "Componentes del",
      titleAccent: "Sistema",
      cards: [
        { icon: "🖥️", iconColor: "text-[#00A9E0]", iconBg: "bg-[#00A9E0]/15", title: "Aplicación de Escritorio", desc: "Electron + Next.js en modo kiosco. Pantalla completa, auto-ajuste de zoom según resolución del monitor.", port: "Puerto 3000" },
        { icon: "📱", iconColor: "text-green-500", iconBg: "bg-green-500/15", title: "Bridge Móvil", desc: "Servidor Node.js que recibe datos del celular Samsung y los envía al PC principal en tiempo real.", port: "Puerto 3001" },
        { icon: "💾", iconColor: "text-purple-500", iconBg: "bg-purple-500/15", title: "Base de Datos", desc: "SQLite con Prisma ORM. Almacenamiento local sin dependencias externas ni costos de hosting cloud.", port: "Archivo local .db" }
      ]
    },
    {
      id: "s7",
      type: "timeline_card",
      tag: "Seguridad y Control",
      title: "Gestión de",
      titleAccent: "Visitantes Conflictivos",
      timeline: [
        { num: "!", bg: "from-red-500 to-red-600", title: "Marcado de Conflictivo", desc: "Desde el Historial, el guardia marca a un visitante como conflictivo e ingresa el motivo en una ventana dedicada." },
        { num: "✕", bg: "from-red-500 to-red-600", title: "Bloqueo Automático", desc: "Al ingresar el RUT de una persona conflictiva, el sistema muestra una alerta roja prominente y bloquea el botón de ingreso." },
        { num: "✓", bg: "from-green-500 to-green-600", title: "Rehabilitación", desc: "Un administrador puede quitar la marca de conflictivo y restaurar el acceso cuando lo considere apropiado." }
      ],
      alertCard: {
        icon: "🔺",
        title: "ALERTA: VISITANTE CONFLICTIVO",
        desc: "El sistema previene el ingreso de personas marcadas, protegiendo al personal y las instalaciones."
      }
    },
    {
      id: "s8",
      type: "grid3",
      tag: "Valor Agregado",
      title: "Beneficios de la",
      titleAccent: "Plataforma",
      cards: [
        { icon: "🛡️", iconColor: "text-[#00A9E0]", iconBg: "bg-[#00A9E0]/15", title: "Seguridad Reforzada", desc: "Control total de quién entra y sale, con alertas automáticas para visitantes de riesgo. Trazabilidad completa." },
        { icon: "⚡", iconColor: "text-green-500", iconBg: "bg-green-500/15", title: "Eficiencia Operativa", desc: "Registro en menos de 15 segundos con escaneo de cédula. Eliminación total del papel y la bitácora manual." },
        { icon: "📈", iconColor: "text-purple-500", iconBg: "bg-purple-500/15", title: "Reportes Ejecutivos", desc: "Exportación a Excel, filtros por fecha, puerta y área. Datos listos para auditorías y compliance." },
        { icon: "💰", iconColor: "text-yellow-500", iconBg: "bg-yellow-500/15", title: "Cero Costo Recurrente", desc: "Sin servidores cloud, sin licencias mensuales, sin internet. La inversión es única y el sistema es autosuficiente." },
        { icon: "🔄", iconColor: "text-red-500", iconBg: "bg-red-500/15", title: "Escalable", desc: "Soporte multi-empresa, multi-puerta y multi-guardia. Preparado para crecer con sus operaciones." },
        { icon: "📱", iconColor: "text-cyan-500", iconBg: "bg-cyan-500/15", title: "Movilidad", desc: "El guardia opera desde su celular Samsung en terreno. Sin hardware adicional, sin lectores externos costosos." }
      ]
    },
    {
      id: "s9",
      type: "cierre",
      tag: "Desarrollado por ONLINE System",
      title: "Seguridad",
      titleAccent: "Inteligente",
      sub: "ONLINE Access System transforma el control de accesos en una ventaja competitiva: más seguro, más rápido y sin costos recurrentes.",
    }
  ];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handleEspecialistaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent("select-service", {
      detail: {
        service: "Sistema de Control de Accesos",
        message: "Especialista Sistema Gestión de Acceso"
      }
    });
    window.dispatchEvent(event);

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="plataforma-offline" className="py-10 md:py-16 bg-[#0a1628] relative overflow-hidden flex flex-col justify-center min-h-screen">
      {/* Elementos de diseño global (Glows y marcas de agua) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
        <span className="text-[120px] md:text-[150px] font-black text-[#00A9E0] rotate-[-15deg] whitespace-nowrap tracking-[-5px]">
          ONLINE System
        </span>
      </div>

      {/* Contenedor Principal */}
      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">

        {/* Contenedor de la Presentación con altura estable y controles fijos para evitar saltos de pantalla */}
        <div className="relative w-full min-h-[580px] md:min-h-[520px] pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex items-center min-h-[460px] md:min-h-[400px]"
            >
              <div className="w-full">
                {/* LAYOUT: PORTADA */}
                {slides[current].type === "portada" && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="h-[1px] w-12 md:w-20 bg-[#00A9E0]/20"></div>
                      <span className="text-[#00A9E0] font-bold text-[10px] tracking-[0.3em] uppercase">
                        Sistema de Control de Accesos
                      </span>
                      <div className="h-[1px] w-12 md:w-20 bg-[#00A9E0]/20"></div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-white tracking-tighter leading-[1] mb-6">
                      Seguridad <span className="text-[#00A9E0] italic">Inteligente.</span>
                    </h2>

                    <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-4xl mx-auto mb-8">
                      Transforma el control de accesos en una ventaja competitiva: <br className="hidden md:block" />
                      <span className="text-white/80 font-normal">más seguro, más eficiente, más rápido y sin costos recurrentes.</span>
                    </p>

                    <p className="text-[12px] text-white/30 tracking-[3px] uppercase mt-12 animate-pulse">
                      Presione → o haga clic para avanzar
                    </p>
                  </div>
                )}

              {/* LAYOUT: CIERRE */}
              {slides[current].type === "cierre" && (
                <div className="text-center flex flex-col items-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A9E0]/15 border border-[#00A9E0]/30 text-[#00A9E0] font-bold text-[11px] tracking-[2px] uppercase mb-5">
                    {slides[current].tag}
                  </span>
                  <h1 className="text-[clamp(36px,5vw,64px)] font-black leading-[1.1] mb-4 bg-gradient-to-br from-white to-[#00A9E0] bg-clip-text text-transparent">
                    {slides[current].title}<br />{slides[current].titleAccent}
                  </h1>
                  <p className="text-[clamp(14px,1.5vw,20px)] text-white/60 max-w-[700px] mx-auto leading-[1.7] mb-10">
                    {slides[current].sub}
                  </p>
                  <div className="flex gap-5 justify-center flex-wrap">
                    <BookingModal>
                      <button className="px-8 py-4 bg-gradient-to-br from-[#00A9E0] to-[#0082b3] hover:shadow-[0_0_25px_rgba(0,169,224,0.4)] text-white font-bold text-sm rounded-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] cursor-pointer">
                        <Calendar className="w-4 h-4" />
                        Agenda tu Demo
                      </button>
                    </BookingModal>
                    
                    <a 
                      href="/?service=Sistema de Control de Accesos&message=Especialista%20Sistema%20Gestión%20de%20Acceso#contact"
                      onClick={handleEspecialistaClick}
                      className="px-8 py-4 bg-white/5 border border-white/15 hover:border-[#00A9E0]/40 hover:bg-white/10 text-white font-semibold text-sm rounded-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03]"
                    >
                      <MessageSquare className="w-4 h-4 text-[#00A9E0]" />
                      Hablar con Especialista
                    </a>
                  </div>
                </div>
              )}

              {/* LAYOUT: GRIDS (3 y 4) */}
              {(slides[current].type === "grid3" || slides[current].type === "grid4" || slides[current].type === "grid3_tech") && (
                <div className="w-full">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A9E0]/15 border border-[#00A9E0]/30 text-[#00A9E0] font-bold text-[11px] tracking-[2px] uppercase mb-5">
                    {slides[current].tag}
                  </span>
                  <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold mb-8">
                    {slides[current].title}<br />
                    <span className="text-[#00A9E0]">{slides[current].titleAccent}</span>
                  </h2>
                  <div className={`grid gap-6 w-full max-w-[1100px] ${slides[current].type === "grid4" ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
                    {slides[current].cards?.map((card, idx) => (
                      <div key={idx} className="bg-[#111e35]/80 border border-[#00A9E0]/10 rounded-[20px] p-8 transition-transform duration-300 hover:border-[#00A9E0]/40 hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-4 ${card.iconBg} ${card.iconColor}`}>
                          {card.icon}
                        </div>
                        <h3 className="text-[16px] font-bold mb-2">{card.title}</h3>
                        <p className="text-[13px] text-white/50 leading-[1.6]">{card.desc}</p>
                        {card.port && (
                          <p className={`mt-3 text-[11px] font-bold ${card.iconColor}`}>{card.port}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LAYOUT: SPLIT RIGHT IMG */}
              {slides[current].type === "split_right_img" && (
                <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-[1100px]">
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A9E0]/15 border border-[#00A9E0]/30 text-[#00A9E0] font-bold text-[11px] tracking-[2px] uppercase mb-5">
                      {slides[current].tag}
                    </span>
                    <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold mb-3">
                      {slides[current].title}<br />
                      <span className="text-[#00A9E0]">{slides[current].titleAccent}</span>
                    </h2>
                    <p className="text-[clamp(14px,1.5vw,20px)] text-white/60 leading-[1.7] text-left">
                      {slides[current].sub}
                    </p>

                    {/* Lista (Hoja 3) */}
                    {slides[current].list && (
                      <ul className="flex flex-col gap-3 mt-6">
                        {slides[current].list.map((item, idx) => (
                          <li key={idx} className="text-[14px] text-white/70 pl-7 relative leading-[1.6]">
                            <span className="absolute left-0 text-[#00A9E0] font-extrabold">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Stats (Hoja 6) */}
                    {slides[current].stats && (
                      <div className="grid grid-cols-2 gap-3 mt-6 max-w-[400px]">
                        {slides[current].stats.map((stat, idx) => (
                          <div key={idx} className="bg-[#111e35]/80 border border-[#00A9E0]/10 rounded-[20px] p-5 text-center">
                            <div className="text-[clamp(28px,3vw,42px)] font-black text-[#00A9E0]">{stat.value}</div>
                            <div className="text-[12px] text-white/45 font-semibold uppercase tracking-[1px] mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="rounded-[20px] overflow-hidden border-2 border-[#00A9E0]/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <img src={slides[current].image} alt="Imagen" className="w-full block" />
                  </div>
                </div>
              )}

              {/* LAYOUT: SPLIT LEFT IMG */}
              {slides[current].type === "split_left_img" && (
                <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-[1100px]">
                  <div className="rounded-[20px] overflow-hidden border-2 border-[#00A9E0]/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative">
                    {/* Zoom y corrección CSS para ocultar el logo de la empresa original de la pantalla del celular */}
                    <img src={slides[current].image} alt="Imagen" className="w-full block scale-125 object-cover origin-center" />
                    {/* Un pequeño div absoluto para tapar el logo del celular si el scale no es suficiente */}
                    <div className="absolute top-[10%] left-[20%] w-[40%] h-[15%] bg-[#1a2333]/90 blur-md rounded-lg"></div>
                  </div>
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A9E0]/15 border border-[#00A9E0]/30 text-[#00A9E0] font-bold text-[11px] tracking-[2px] uppercase mb-5">
                      {slides[current].tag}
                    </span>
                    <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold mb-3">
                      {slides[current].title} <span className="text-[#00A9E0]">{slides[current].titleAccent}</span>
                    </h2>
                    <p className="text-[clamp(14px,1.5vw,20px)] text-white/60 leading-[1.7] text-left">
                      {slides[current].sub}
                    </p>

                    {/* Timeline (Hoja 5) */}
                    {slides[current].timeline && (
                      <div className="flex flex-col gap-5 max-w-[800px] w-full mt-7">
                        {slides[current].timeline.map((step, idx) => (
                          <div key={idx} className="flex gap-5 items-start">
                            <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#00A9E0] to-[#0082b3] flex items-center justify-center font-extrabold text-[16px] shrink-0">
                              {step.num}
                            </div>
                            <div>
                              <h4 className="text-[16px] font-bold mb-1">{step.title}</h4>
                              <p className="text-[13px] text-white/50 leading-[1.5]">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LAYOUT: TIMELINE CARD (Seguridad) */}
              {slides[current].type === "timeline_card" && (
                <div className="w-full">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A9E0]/15 border border-[#00A9E0]/30 text-[#00A9E0] font-bold text-[11px] tracking-[2px] uppercase mb-5">
                    {slides[current].tag}
                  </span>
                  <h2 className="text-[clamp(28px,3.5vw,48px)] font-extrabold mb-8">
                    {slides[current].title} <span className="text-[#00A9E0]">{slides[current].titleAccent}</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-10 max-w-[900px]">
                    <div className="flex flex-col gap-5">
                      {slides[current].timeline?.map((step, idx) => (
                        <div key={idx} className="flex gap-5 items-start">
                          <div className={`w-[44px] h-[44px] rounded-full bg-gradient-to-br ${step.bg} flex items-center justify-center font-extrabold text-[16px] shrink-0`}>
                            {step.num}
                          </div>
                          <div>
                            <h4 className="text-[16px] font-bold mb-1">{step.title}</h4>
                            <p className="text-[13px] text-white/50 leading-[1.5]">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-red-500/10 border border-red-500/25 rounded-[20px] text-center p-10 flex flex-col justify-center items-center">
                      <div className="text-[64px] mb-4 leading-none">{slides[current].alertCard?.icon}</div>
                      <h3 className="text-red-500 text-[20px] font-bold">{slides[current].alertCard?.title}</h3>
                      <p className="mt-3 text-white/70 text-[14px] leading-relaxed">{slides[current].alertCard?.desc}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles de Navegación Abajo */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2.5 z-50">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${current === idx ? "w-8 h-2.5 bg-[#00A9E0]" : "w-2.5 h-2.5 bg-white/20"
                }`}
            />
          ))}
        </div>

        {/* Flechas de Navegación Flotantes */}
        <div className="absolute right-0 -bottom-16 flex gap-2 z-50">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 text-white flex items-center justify-center hover:bg-[#00A9E0] hover:border-[#00A9E0] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 text-white flex items-center justify-center hover:bg-[#00A9E0] hover:border-[#00A9E0] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Contador */}
        <div className="absolute left-0 -bottom-14 text-[12px] text-white/30 font-semibold tracking-[2px] z-50">
          {current + 1} / {slides.length}
        </div>
      </div>
    </div>
  </section>
  );
}
