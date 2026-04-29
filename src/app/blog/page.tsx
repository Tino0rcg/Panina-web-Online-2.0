import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowRight, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Noticias TI y Tecnología para Empresas en Chile | ONLINE System Blog",
  description: "Artículos sobre ciberseguridad, soporte TI, cloud computing y transformación digital para empresas y gerentes TI en Chile. Actualización semanal.",
  openGraph: {
    title: "Noticias TI y Tecnología para Empresas en Chile | ONLINE System Blog",
    description: "Artículos sobre ciberseguridad, soporte TI, cloud computing y transformación digital para empresas y gerentes TI en Chile. Actualización semanal.",
    url: "https://onlinesystem.cl/blog",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ONLINE System Blog - Tecnología y Estrategia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights de Tecnología y Estrategia TI | ONLINE System Blog",
    description: "Análisis experto sobre transformación digital, ciberseguridad y automatización en Chile. Manténgase a la vanguardia con nuestra visión técnica corporativa.",
    images: ["/logo.png"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-6">
            Tecnología y <span className="text-gradient">Estrategia TI</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explora nuestros artículos y análisis profundo sobre los desafíos tecnológicos que enfrentan las empresas de hoy.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10">
              <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Aún no hay artículos</h3>
              <p className="text-slate-400">El motor de IA está procesando las últimas noticias para generar el primer análisis.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col h-full bg-white/[0.03] rounded-3xl border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden">
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                        {post.tag}
                      </span>
                      <time className="text-sm text-slate-500 font-medium">
                        {format(new Date(post.date), "dd MMM yyyy", { locale: es })}
                      </time>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center text-primary font-bold text-sm tracking-wide group/btn">
                      Leer artículo completo
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
