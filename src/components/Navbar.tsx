
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/#diagnostico-banner" },
    { name: "Servicios", href: "/servicios" },
    { name: "Sobre Nosotros", href: "/#about" },
    { name: "Calcula tu ROI", href: "/calculadora-roi" },
    { name: "Contacto", href: "/#contact" },
  ];

  // Helper function to determine if we should use white text
  const isHomePage = pathname === "/";
  const isROIPage = pathname === "/calculadora-roi";
  const useWhiteText = (isHomePage || isROIPage) && !isScrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center",
        isScrolled ? "glass-morphism shadow-lg" : "bg-transparent"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent origin-left"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/#diagnostico-banner" className="flex items-center group relative z-50 mr-8">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className={cn(
            "relative transition-transform duration-500 origin-left",
            isScrolled ? "scale-110 md:scale-125 -translate-y-1 hover:scale-[1.15] md:hover:scale-[1.3]" : "scale-[1.5] md:scale-[1.8] hover:scale-[1.55] md:hover:scale-[1.85]"
          )}>
            <Image 
              src="/logo.png" 
              alt="ONLINE System Premium Logo" 
              width={380} 
              height={130} 
              className={cn(
                "h-20 w-auto object-contain transition-all",
                useWhiteText ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
              )}
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-colors flex flex-col group",
                  useWhiteText ? "text-white" : "text-slate-900"
                )}
              >
                {link.name}
                <span className="h-px w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("md:hidden transition-colors", useWhiteText ? "text-white" : "text-slate-900")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-morphism absolute top-full left-0 right-0 p-6 flex flex-col gap-4 animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-900 hover:text-primary transition-colors flex items-center justify-between group"
            >
              {link.name}
              <span className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
