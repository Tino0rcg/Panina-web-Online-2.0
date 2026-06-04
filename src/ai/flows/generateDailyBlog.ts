import { genkit, z } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { getLatestTechNews } from "@/lib/news";
import fs from "fs";
import path from "path";
import { Resend } from "resend";

const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

export const generateDailyBlogFlow = ai.defineFlow(
  {
    name: "generateDailyBlog",
    inputSchema: z.object({
      trigger: z.string().optional(),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
      slug: z.string().optional(),
    }),
  },
  async (input) => {
    try {
      // 1. Fetch latest news
      const news = await getLatestTechNews();
      if (!news || news.length === 0) {
        return { success: false, message: "No se encontraron noticias para hoy." };
      }

      // 2. Select the top 3 news to summarize
      const topNews = news.slice(0, 3);
      const newsContext = topNews.map(n => `- ${n.title}: ${n.description}`).join("\n");

      // 3. Generate Blog Post with Gemini
      const prompt = `
        Eres un experto redactor tecnológico y consultor de TI para "ONLINE System" en Chile.
        Escribe un artículo de blog original y muy profesional analizando las siguientes noticias de hoy:
        ${newsContext}

        Reglas:
        - El artículo debe estar en formato Markdown.
        - NO incluyas un título # al principio del texto, empezaremos directamente con el primer párrafo.
        - Escribe al menos 3 párrafos de desarrollo.
        - Usa títulos ## para separar secciones.
        - El tono debe ser corporativo, analítico y enfocado al mercado B2B chileno (Gerentes TI, Directores).
        - Al final del artículo, haz un pequeño llamado a la acción invitando a conocer los servicios de ONLINE System, específicamente el Diagnóstico TI 360.
      `;

      const response = await ai.generate({
        prompt: prompt,
      });

      const blogContent = response.text;

      // 4. Generate Metadata
      const titlePrompt = `Genera un título corto, SEO optimizado y atractivo (máximo 60 caracteres) para el siguiente artículo. Devuelve SOLO el título, sin comillas: \n${blogContent.substring(0, 500)}`;
      const titleResponse = await ai.generate({ prompt: titlePrompt });
      const title = titleResponse.text.trim().replace(/"/g, '');

      const slug = title.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
        .replace(/(^-|-$)+/g, ""); // Remove leading/trailing dashes

      const dateStr = new Date().toISOString();
      const excerpt = blogContent.substring(0, 150).replace(/\n/g, ' ').replace(/"/g, "'") + '...';
      const tag = topNews[0]?.tag || "Actualidad";

      const markdownFile = `---
title: "${title}"
date: "${dateStr}"
excerpt: "${excerpt}"
tag: "${tag}"
---

${blogContent}
`;

      // 5. Save file
      const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
      if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
      }
      fs.writeFileSync(path.join(blogDir, `${slug}.md`), markdownFile);

      // 5b. Push to GitHub if GITHUB_TOKEN is available (for serverless environments like Vercel)
      if (process.env.GITHUB_TOKEN) {
        try {
          const owner = process.env.GITHUB_OWNER || 'Tino0rcg';
          const repo = process.env.GITHUB_REPO || 'Panina-web-Online-2.0';
          const branch = process.env.GITHUB_BRANCH || 'main';
          const filePath = `src/content/blog/${slug}.md`;
          const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

          console.log(`Intentando subir post a GitHub: ${filePath}`);

          // Check if file already exists to get its SHA (needed for updates)
          let sha: string | undefined;
          const getRes = await fetch(githubUrl, {
            headers: {
              'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
            }
          });

          if (getRes.status === 200) {
            const fileData = await getRes.json();
            sha = fileData.sha;
            console.log(`El archivo ya existe en GitHub (sha: ${sha}). Se actualizará.`);
          }

          const contentBase64 = Buffer.from(markdownFile).toString('base64');
          const putRes = await fetch(githubUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Añadir artículo de blog generado por IA: ${title}`,
              content: contentBase64,
              branch,
              ...(sha ? { sha } : {})
            }),
          });

          if (!putRes.ok) {
            const errText = await putRes.text();
            console.error(`Error al subir a GitHub: ${putRes.status} - ${errText}`);
          } else {
            console.log(`Archivo subido exitosamente a GitHub en la rama ${branch}.`);
          }
        } catch (gitError) {
          console.error("Error inesperado al intentar subir a GitHub:", gitError);
        }
      } else {
        console.log("No se detectó GITHUB_TOKEN. Saltando subida a GitHub.");
      }

      // 6. Send Email using Resend
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const emailHtml = `
          <h2>¡Tu nuevo artículo de blog está publicado!</h2>
          <p>La inteligencia artificial ha generado y publicado un nuevo artículo basado en las noticias de hoy.</p>
          <h3>${title}</h3>
          <p>${excerpt}</p>
          <p><a href="https://onlinesystem.cl/blog/${slug}">Leer artículo completo</a></p>
          <br/>
          <p>Este es un mensaje automático de tu sistema ONLINE System.</p>
        `;

        await resend.emails.send({
          from: 'ONLINE System AI <onboarding@resend.dev>',
          to: 'contacto@onlinesystem.cl',
          subject: `Nuevo Artículo Publicado: ${title}`,
          html: emailHtml,
        });
      }

      return { success: true, message: "Blog generado exitosamente.", slug };
    } catch (error: any) {
      console.error("Error generating blog:", error);
      return { success: false, message: error.message };
    }
  }
);
