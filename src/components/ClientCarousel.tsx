"use client";

import Image from "next/image";

const CLIENTS = [
  { name: "Aero", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Aero.png" },
  { name: "BBVA", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/BBVA.png" },
  { name: "Capel", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Capel.png" },
  { name: "Cintec", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Cintec.png" },
  { name: "Dakar", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Dakar.png" },
  { name: "Denin", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Denin.png" },
  { name: "El Mercurio", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Elmercurio.png" },
  { name: "Fiscalía Nacional", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Fiscalia.N.png" },
  { name: "GM", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/GM.png" },
  { name: "KAYSER", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/KAYSER.png" },
  { name: "Nikon", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Nikon.png" },
  { name: "PDI", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/PDI.png" },
  { name: "RyR", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/RyR.png" },
  { name: "U. Chile", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/U.Chile.png" },
  { name: "Coca Cola", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/cocacola.png" },
  { name: "Cool", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/cool.png" },
  { name: "Entel", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/entel.png" },
  { name: "Iron Mountain", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/iron_mountain.png" },
  { name: "Las Condes", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/lascondes.png" },
  { name: "Veramonte", logo: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/veramonte.png" },
];

export function ClientCarousel() {
  return (
    <section className="py-20 relative bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
          Trayectoria & Confianza
        </h3>
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900">
          Empresas que han <span className="text-gradient">confiado en nosotros</span>
        </h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-x-hidden w-full group">
        
        {/* Soft fading edges for the marquee */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex animate-slide group-hover:[animation-play-state:paused] whitespace-nowrap">
          {/* First set of logos */}
          {CLIENTS.map((client, index) => (
            <div key={index} className="flex items-center justify-center min-w-[200px] md:min-w-[250px] px-12">
              <div className="relative w-32 h-20 md:w-40 md:h-24 transition-all duration-500 hover:scale-110 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {CLIENTS.map((client, index) => (
            <div key={`dup-${index}`} className="flex items-center justify-center min-w-[200px] md:min-w-[250px] px-12">
              <div className="relative w-32 h-20 md:w-40 md:h-24 transition-all duration-500 hover:scale-110 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
