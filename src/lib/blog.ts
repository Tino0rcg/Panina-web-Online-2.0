import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tag: string;
  coverImage?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const markdownWithMeta = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
      const { data, content } = matter(markdownWithMeta);

      return {
        slug,
        title: data.title || 'Sin Título',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        tag: data.tag || 'Actualidad',
        coverImage: data.coverImage,
        content
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const markdownWithMeta = fs.readFileSync(path.join(blogDir, `${slug}.md`), 'utf-8');
    const { data, content } = matter(markdownWithMeta);
    return {
      slug,
      title: data.title || 'Sin Título',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tag: data.tag || 'Actualidad',
      coverImage: data.coverImage,
      content
    };
  } catch (error) {
    return null;
  }
}
