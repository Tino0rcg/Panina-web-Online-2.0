"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ExternalLink, ShieldAlert, Globe2, Zap, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface TechNewsProps {
  posts: BlogPost[];
}

export function TechNews({ posts }: TechNewsProps) {
  const newsToDisplay = posts && posts.length > 0 ? posts.slice(0, 10) : [];
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      align: "start",
      slidesToScroll: 1,
      loop: true,
      dragFree: true
    },
    [
      Autoplay({ 
        delay: 6000, 
        stopOnInteraction: false,
        stopOnMouseEnter: true 
      })
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (newsToDisplay.length === 0) return null;

  return (
    <section id="actualidad-tecnologica" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-80 transition-opacity">
          <img 
            src="https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/mundo.png"
            alt="World Background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">Intelligence Feed</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
              Actualidad <span className="text-gradient">Tecnológica Mundial</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 transition-all active:scale-95"
              aria-label="Noticia anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 transition-all active:scale-95"
              aria-label="Siguiente noticia"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8">
            {newsToDisplay.map((post, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0"
              >
                <div 
                  className="group relative h-[500px] flex flex-col items-start p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-xl bg-primary shadow-lg shadow-black/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {post.tags?.[0] === "Ciberseguridad" && <ShieldAlert className="w-5 h-5 text-white" />}
                      {post.tags?.[0] === "Infraestructura" && <Globe2 className="w-5 h-5 text-white" />}
                      {post.tags?.[0] === "IA & Algoritmos" && <Zap className="w-5 h-5 text-white" />}
                      {post.tags?.[0] === "Innovación" && <Clock className="w-5 h-5 text-white" />}
                      {(!post.tags || !["Ciberseguridad", "Infraestructura", "IA & Algoritmos", "Innovación"].includes(post.tags[0])) && <Zap className="w-5 h-5 text-white" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.tags?.[0] || 'TECNOLOGÍA'}</span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-8 right-8 flex flex-col items-end text-right">
                    <span className="text-[9px] font-bold text-primary/60 uppercase tracking-widest leading-none mb-1">Publicado</span>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                      {post.date ? formatDistanceToNow(new Date(post.date), { addSuffix: true, locale: es }) : ''}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow space-y-4">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors leading-tight line-clamp-3">
                      {post.title}
                    </h3>
                    
                    {/* Description/Content */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-5 font-light">
                      {post.description || post.content.substring(0, 150) + '...'}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="w-full flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Lectura Exclusiva</span>
                      <span className="text-primary font-bold text-xs uppercase tracking-wider">ONLINE System</span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl hover:bg-primary hover:text-white transition-all group/link"
                    >
                      <ArrowRight className="w-5 h-6 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
