"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, TrendingUp, TrendingDown, DollarSign, Clock, ArrowUpRight, 
  CheckCircle2, Users, Monitor, AlertCircle, Building2,
  ChevronRight, Zap, Target, ShieldCheck, Activity, Settings
} from "lucide-react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const PAIN_POINTS = [
  { id: "falls", label: "Caídas frecuentes de sistemas", icon: <AlertCircle className="w-4 h-4" /> },
  { id: "slowness", label: "Lentitud en aplicaciones", icon: <Activity className="w-4 h-4" /> },
  { id: "support", label: "Falta de soporte oportuno", icon: <Clock className="w-4 h-4" /> },
  { id: "security", label: "Riesgos de ciberseguridad", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "obsolete", label: "Infraestructura obsoleta", icon: <Building2 className="w-4 h-4" /> },
  { id: "manual", label: "Procesos manuales", icon: <Settings className="w-4 h-4" /> },
];

const OBJECTIVES = [
  { id: "costs", label: "Reducir costos", icon: <TrendingDown className="w-4 h-4" /> },
  { id: "continuity", label: "Mejorar continuidad operativa", icon: <Activity className="w-4 h-4" /> },
  { id: "scale", label: "Escalar infraestructura", icon: <ArrowUpRight className="w-4 h-4" /> },
  { id: "modernize", label: "Modernizar sistemas", icon: <Zap className="w-4 h-4" /> },
  { id: "cloud", label: "Migrar a Cloud", icon: <Target className="w-4 h-4" /> },
];

export function ROICalculator() {
  const [employees, setEmployees] = useState([50]);
  const [equipments, setEquipments] = useState([45]);
  const [downtimeHours, setDowntimeHours] = useState([5]);
  const [costPerHour, setCostPerHour] = useState(150);
  const [monthlySupportCost, setMonthlySupportCost] = useState(500);
  
  const [results, setResults] = useState({
    monthlyLoss: 0,
    savingsMin: 0,
    savingsMax: 0,
    roiMin: 0,
    roiMax: 0,
    recoveryTimeMin: 3,
    recoveryTimeMax: 6
  });
  const router = useRouter();

  const handleGetReport = () => {
    const message = `Hola equipo de ONLINE System,\n\nHe utilizado la calculadora de ROI y me gustaría recibir el reporte detallado para mi empresa.\n\nDatos ingresados:\n- Empleados: ${employees[0]}\n- Equipos TI: ${equipments[0]}\n- Inactividad: ${downtimeHours[0]}h/mes\n- Pérdida mensual estimada: $${results.monthlyLoss.toLocaleString()}\n- Ahorro potencial: 30%-60%\n\nQuedo atento.`;
    const encodedMessage = encodeURIComponent(message);
    router.push(`/#contact?service=Solicitar Diagnóstico 360°&message=${encodedMessage}`);
  };

  useEffect(() => {
    const monthlyLoss = (downtimeHours[0] * costPerHour) + monthlySupportCost;
    const savingsMin = Math.round(monthlyLoss * 0.3);
    const savingsMax = Math.round(monthlyLoss * 0.6);
    
    // Simulated ROI based on loss reduction
    const roiMin = 120 + (downtimeHours[0] * 5);
    const roiMax = 300 + (downtimeHours[0] * 10);

    setResults({
      monthlyLoss,
      savingsMin,
      savingsMax,
      roiMin: Math.min(roiMin, 250),
      roiMax: Math.min(roiMax, 450),
      recoveryTimeMin: 3,
      recoveryTimeMax: 6
    });
  }, [employees, equipments, downtimeHours, costPerHour, monthlySupportCost]);

  return (
    <section id="roi-calculator" className="py-24 relative bg-slate-950 overflow-hidden">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/ROI1.png" 
          alt="ROI Background" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-slate-950/40 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950"></div>
      </div>

      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest"
          >
            <Calculator className="w-4 h-4" />
            Herramienta de Diagnóstico Financiero
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight">
            Calcula el ROI de tu <span className="text-gradient">infraestructura</span>
          </h2>
          <p className="text-lg text-slate-400 font-light">
            Descubre cuánto puede ahorrar y optimizar tu empresa al implementar soluciones tecnológicas profesionales con ONLINE System.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Step 1: Operations Data */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Datos de Operación
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-slate-300">Cantidad de empleados</Label>
                          <span className="text-primary font-bold">{employees[0]}</span>
                        </div>
                        <Slider 
                          value={employees} 
                          onValueChange={setEmployees} 
                          max={500} 
                          step={1} 
                          className="py-4"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-slate-300">Equipos / Usuarios TI</Label>
                          <span className="text-primary font-bold">{equipments[0]}</span>
                        </div>
                        <Slider 
                          value={equipments} 
                          onValueChange={setEquipments} 
                          max={500} 
                          step={1} 
                          className="py-4"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-slate-300">Inactividad mensual (horas)</Label>
                          <span className="text-rose-400 font-bold">{downtimeHours[0]}h</span>
                        </div>
                        <Slider 
                          value={downtimeHours} 
                          onValueChange={setDowntimeHours} 
                          max={40} 
                          step={1} 
                          className="py-4"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Costs */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Costos Estimados
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Costo por hora de inactividad</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <Input 
                            type="number" 
                            value={costPerHour} 
                            onChange={(e) => setCostPerHour(Number(e.target.value))}
                            className="pl-10 bg-white/5 border-white/10 text-white focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-300">Costo mensual soporte actual</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <Input 
                            type="number" 
                            value={monthlySupportCost} 
                            onChange={(e) => setMonthlySupportCost(Number(e.target.value))}
                            className="pl-10 bg-white/5 border-white/10 text-white focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-8 grid md:grid-cols-2 gap-8">
                  {/* Pain Points */}
                  <div className="space-y-4">
                    <Label className="text-white font-bold text-lg">Problemas actuales</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {PAIN_POINTS.map((point) => (
                        <div key={point.id} className="flex items-center space-x-3 group cursor-pointer">
                          <Checkbox id={point.id} className="border-white/20 data-[state=checked]:bg-primary" />
                          <label htmlFor={point.id} className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-2 pointer-events-none">
                            {point.icon}
                            {point.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Objectives */}
                  <div className="space-y-4">
                    <Label className="text-white font-bold text-lg">Objetivos estratégicos</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {OBJECTIVES.map((obj) => (
                        <div key={obj.id} className="flex items-center space-x-3 group cursor-pointer">
                          <Checkbox id={obj.id} className="border-white/20 data-[state=checked]:bg-primary" />
                          <label htmlFor={obj.id} className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-2 pointer-events-none">
                            {obj.icon}
                            {obj.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 h-full">
            <motion.div 
              layout
              className="sticky top-24 p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-slate-900 to-accent/10 border border-primary/30 shadow-2xl space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Resultado de Estimación</h3>
                <p className="text-slate-400 text-sm">Basado en tu operación actual y retos identificados.</p>
              </div>

              <div className="grid gap-6">
                {/* Monthly Loss Card */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Pérdida mensual estimada</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-rose-400 transition-all duration-500">
                      ${results.monthlyLoss.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm">/ mes</span>
                  </div>
                  <p className="text-xs text-rose-400/60 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Impacto directo en rentabilidad
                  </p>
                </div>

                {/* Savings & ROI Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ahorro potencial</p>
                    <p className="text-2xl font-bold text-emerald-400 transition-all duration-500">30% – 60%</p>
                    <p className="text-[10px] text-emerald-400/60 uppercase font-bold tracking-tighter">Optimización operativa</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-1">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">ROI Estimado</p>
                    <p className="text-2xl font-bold text-primary transition-all duration-500">
                      {results.roiMin}% – {results.roiMax}%
                    </p>
                    <p className="text-[10px] text-primary/60 uppercase font-bold tracking-tighter">Retorno Anual</p>
                  </div>
                </div>

                {/* Recovery Time */}
                <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tiempo de recuperación</p>
                    <p className="text-xl font-bold text-white">3 a 6 meses</p>
                  </div>
                  <div className="p-3 bg-accent/20 rounded-xl">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-bold shadow-2xl shadow-primary/30 group transition-all hover:scale-105 active:scale-95"
                  onClick={handleGetReport}
                >
                  Obtener Reporte Detallado
                  <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold">
                  * Estimación basada en promedios industriales y diagnóstico inicial.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
