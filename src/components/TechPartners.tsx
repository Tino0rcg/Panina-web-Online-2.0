"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  "Microsoft Azure",
  "Amazon Web Services",
  "Cisco Systems",
  "Fortinet",
  "VMware",
  "Palo Alto Networks",
  "Veeam",
  "Dell EMC",
  "Lenovo Enterprise",
  "IBM Cloud",
];

export function TechPartners() {
  return (
    <section className="py-24 relative bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
          Ecosistema Funcional & Partners Estratégicos
        </h3>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-x-hidden w-full group">
        
        {/* Soft fading edges for the marquee */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex animate-slide group-hover:[animation-play-state:paused] whitespace-nowrap">
          {/* First set of logos */}
          {PARTNERS.map((partner, index) => (
            <div key={index} className="flex items-center justify-center min-w-[250px] px-8">
              <span className="text-3xl font-headline font-bold text-slate-300 hover:text-primary transition-colors cursor-default">
                {partner}
              </span>
            </div>
          ))}
          {/* Exact duplicate for seamless endless scroll */}
          {PARTNERS.map((partner, index) => (
            <div key={`dup-${index}`} className="flex items-center justify-center min-w-[250px] px-8">
              <span className="text-3xl font-headline font-bold text-slate-300 hover:text-primary transition-colors cursor-default">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
