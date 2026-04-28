
"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 md:space-x-4">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest group"
          >
            <Home className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span className="hidden md:inline">Inicio</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-slate-600 mx-1 md:mx-2 shrink-0" />
            {item.active ? (
              <span className="text-primary font-bold text-xs uppercase tracking-widest">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
