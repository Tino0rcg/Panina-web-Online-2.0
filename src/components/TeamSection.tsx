
import Image from "next/image";
import { BadgeCheck, Globe, Mail } from "lucide-react";

const team = [
  {
    name: "Ramiro Contreras G.",
    role: "Ingeniero de Implementación Especialista en IA y Automatización",
    email: "Rcontreras@onlinesystem.cl",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/mapachito.jpeg",
    bio: "Especialista en integración de soluciones de automatización e Inteligencia Artificial. Enfocado en optimizar la eficiencia operativa y liderar la transformación digital mediante la adopción de tecnologías escalables y orientadas a resultados reales para el negocio."
  },
  {
    name: "Alejandro Contreras D.",
    role: "Fundador y Consultor Senior de Transformación Digital",
    email: "Acontreras@onlinesystem.cl",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/alejandro%20c.jpeg",
    bio: "Más de 25 años de experiencia liderando la implementación de soluciones tecnológicas críticas en Chile. Como fundador de ONLINE System, se enfoca en la continuidad operativa, modernización estratégica y el desarrollo de relaciones de largo plazo con cada socio corporativo."
  },
  {
    name: "Rodrigo Hernández V.",
    role: "Gerente Comercial de Infraestructura y Data Center",
    email: "Rhernandez@onlinesystem.cl",
    image: "https://raw.githubusercontent.com/Tino0rcg/imagenes-pagina-online-2.0/main/Rodrigo%20H.jpeg",
    bio: "Especialista en soluciones de infraestructura crítica y Data Center. Con un enfoque estratégico en la continuidad operativa, lidera el desarrollo de negocios de alto impacto alineando la tecnología con los objetivos reales de cada cliente."
  }
];

export function TeamSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] animate-pulse"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto mb-24 space-y-6">
          <h2 className="text-primary font-headline font-bold tracking-[0.4em] uppercase text-[10px] flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-primary/30"></span>
            Staff de Ingeniería
            <span className="w-12 h-px bg-primary/30"></span>
          </h2>
          <h3 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter">Liderazgo de <span className="text-gradient">Alto Nivel.</span></h3>
          <p className="text-slate-500 text-xl font-light leading-relaxed">
            Nuestro equipo combina décadas de expertiz técnica con una visión estratégica para resolver los desafíos más exigentes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {team.map((member, i) => (
            <div key={i} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 border border-slate-100 shadow-xl transition-all group-hover:scale-[1.02] duration-700 bg-slate-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-80 group-hover:opacity-100"
                />
                
                {/* Floating Role Badge */}
                <div className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-xl rounded-xl border border-slate-100 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
                
                {/* Email Overlay - Bottom Center */}
                {member.email && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-fit opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl hover:bg-primary transition-all group/email"
                    >
                      <Mail className="w-4 h-4 text-primary group-hover/email:text-white" />
                      <span className="text-[11px] font-bold text-slate-900 group-hover/email:text-white tracking-wider lowercase">
                        {member.email}
                      </span>
                    </a>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-3xl font-headline font-bold text-slate-900 mb-2 tracking-tight group-hover:text-primary transition-colors">{member.name}</h4>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Globe className="w-3 h-3 text-primary/50" />
                    <p className="text-primary font-bold uppercase text-[9px] tracking-[0.4em]">{member.role}</p>
                  </div>
                </div>
                
                <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-700 ease-in-out"></div>
                
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
