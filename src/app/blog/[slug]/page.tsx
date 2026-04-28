import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Artículo no encontrado" };

  const title = `${post.title} | ONLINE System Blog`;
  const description = post.excerpt;
  const url = `https://onlinesystem.cl/blog/${post.slug}`;
  const imageUrl = post.coverImage || '/logo.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['ONLINE System'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      
      <article className="pt-32 pb-24 md:pt-40">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a todos los artículos
          </Link>

          {/* Article Header */}
          <header className="mb-12 pb-12 border-b border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                <Tag className="w-4 h-4 mr-2" />
                {post.tag}
              </span>
              <span className="flex items-center text-sm font-medium text-slate-400">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-headline prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
