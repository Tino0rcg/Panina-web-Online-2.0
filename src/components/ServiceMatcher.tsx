
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, CheckCircle2, ArrowRight, RotateCcw, MessageSquareCode } from "lucide-react";
import { receiveServiceRecommendations, type ReceiveServiceRecommendationsOutput } from "@/ai/flows/receive-service-recommendations";
import { BookingModal } from "@/components/BookingModal";

export function ServiceMatcher() {
  const [needs, setNeeds] = useState("");
  const [results, setResults] = useState<ReceiveServiceRecommendationsOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleMatch = async () => {
    if (!needs.trim()) return;
    startTransition(async () => {
      try {
        const res = await receiveServiceRecommendations({ clientNeeds: needs });
        setResults(res);
      } catch (error) {
        console.error("Failed to match services:", error);
      }
    });
  };

  return (
    <section id="matcher" className="py-32 relative bg-slate-50/50 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(17,122,151,0.03),transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto glass-morphism rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl">
          <div className="grid md:grid-cols-5 h-full min-h-[600px]">
            <div className="md:col-span-2 bg-primary/5 p-12 flex flex-col justify-center space-y-8 relative overflow-hidden backdrop-blur-3xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              
              <div className="bg-primary/10 p-4 rounded-2xl w-fit border border-primary/20">
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-4xl font-headline font-bold text-slate-900 tracking-tight leading-tight">
                  Consultoría <br />
                  <span className="text-primary underline decoration-primary/30 underline-offset-8">Estratégica.</span>
                </h3>
                <p className="text-slate-600 text-lg font-light leading-relaxed">
                  Describa sus desafíos comerciales en nuestra consola y obtenga una recomendación estratégica de nuestras 9 líneas de especialización en segundos.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                {[
                  "Análisis en tiempo real",
                  "Precisión de ingeniería",
                  "Expertiz ONLINE System"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-500 text-sm font-semibold tracking-widest uppercase">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 p-12 bg-white flex flex-col justify-center">
              {!results ? (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                      <MessageSquareCode className="w-4 h-4" />
                      Diagnóstico de Desafíos
                    </label>
                    <p className="text-sm text-slate-400 font-light">Escriba una breve descripción del problema técnico o meta organizacional.</p>
                  </div>
                  <Textarea
                    placeholder="Ej. Estamos buscando optimizar nuestra logística mediante RFID y necesitamos centralizar los datos en un sistema de Business Intelligence..."
                    className="min-h-[250px] bg-slate-50 border-slate-200 focus:border-primary text-lg rounded-3xl p-8 resize-none transition-all shadow-inner focus:ring-0 text-slate-900 placeholder:text-slate-300"
                    value={needs}
                    onChange={(e) => setNeeds(e.target.value)}
                  />
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white text-xl font-bold h-20 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group"
                    disabled={isPending || !needs.trim()}
                    onClick={handleMatch}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-3 h-7 w-7 animate-spin" />
                        Analizando Desafíos...
                      </>
                    ) : (
                      <>
                        Iniciar Análisis
                        <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-10 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                    <h4 className="text-2xl font-headline font-bold text-slate-900 tracking-tight">Análisis Recomendado</h4>
                    <span className="text-xs font-bold px-4 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 uppercase tracking-widest">Análisis Listo</span>
                  </div>
                  
                  <div className="space-y-4">
                    {results.recommendations.map((rec, idx) => (
                      <Card key={idx} className="bg-slate-50 border-slate-100 hover:border-primary/20 transition-all group overflow-hidden rounded-2xl">
                        <CardHeader className="p-6 pb-2">
                          <CardTitle className="text-xl font-bold flex items-center gap-3 text-slate-900 group-hover:text-primary transition-colors">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            {rec.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <p className="text-slate-600 text-base leading-relaxed font-light">{rec.reason}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex gap-6 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 h-16 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 group font-bold tracking-widest text-sm uppercase"
                      onClick={() => {
                        setResults(null);
                        setNeeds("");
                      }}
                    >
                      <RotateCcw className="mr-2 w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                      Reiniciar Consola
                    </Button>
                    <BookingModal>
                      <Button className="flex-1 bg-primary hover:bg-primary/90 text-white h-16 rounded-xl shadow-lg shadow-primary/20 font-bold tracking-widest text-sm uppercase">
                        Agendar Consultoría
                      </Button>
                    </BookingModal>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
