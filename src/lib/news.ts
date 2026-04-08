import { isToday, parseISO, differenceInHours } from "date-fns";

export interface NewsItem {
  title: string;
  source: string;
  link: string;
  tag: string;
  color: string;
  publishedAt: string;
  description: string;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "IA y Ciberseguridad 2026",
    source: "Wired",
    link: "https://www.wired.com",
    tag: "Ciberseguridad",
    color: "bg-blue-500",
    publishedAt: new Date().toISOString(),
    description: "La convergencia de la Inteligencia Artificial y la ciberseguridad corporativa está redefiniendo los paradigmas de defensa digital en el 2026."
  },
  {
    title: "Nodos Cloud en Santiago",
    source: "TechCrunch",
    link: "https://techcrunch.com",
    tag: "Infraestructura",
    color: "bg-emerald-500",
    publishedAt: new Date().toISOString(),
    description: "Nuevos despliegues de nodos cloud en Santiago fortalecen la infraestructura TI para empresas locales y regionales."
  },
  {
    title: "Cuántica en Logística",
    source: "MIT Tech Review",
    link: "https://www.technologyreview.com",
    tag: "Innovación",
    color: "bg-purple-500",
    publishedAt: new Date().toISOString(),
    description: "Cómo el cómputo cuántico está transformando la eficiencia en las cadenas de suministro y la logística avanzada."
  }
];

const categoryColors: Record<string, string> = {
  "IA & Algoritmos": "bg-blue-600",
  "Infraestructura": "bg-emerald-600",
  "Innovación": "bg-purple-600",
  "Ciberseguridad": "bg-rose-600",
  "General": "bg-slate-500"
};

export async function getLatestTechNews(): Promise<NewsItem[]> {
  const apiKey = process.env.GNEWS_API_KEY;
  
  if (!apiKey) {
    console.warn("GNEWS_API_KEY not found. Using fallback news.");
    return FALLBACK_NEWS;
  }

  try {
    // Refinamiento máximo: Computación e Informática pura
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const fromDate = yesterdayDate.toISOString().split('T')[0] + 'T00:00:00Z';
    
    // Búsqueda más amplia para asegurar volumen de noticias en 48h
    const query = encodeURIComponent('"inteligencia artificial" OR "ciberseguridad" OR "nube" OR "transformación digital" OR "infraestructura TI" OR "software corporativo"');
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${query}&lang=es&max=15&from=${fromDate}&apikey=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news from GNews");
    }

    const data = await response.json();
    
    if (!data.articles || data.articles.length === 0) {
      return FALLBACK_NEWS;
    }

    // Lista negra de consumo/gadgets/social media para mantener el nivel corporativo
    const BLOCKLIST = [
      "deporte", "fútbol", "futbol", "liga", "estadio", "partido", "mercado de pases",
      "smartphone", "teléfono", "celular", "iphone", "xiaomi", "samsung galaxy", 
      "red social", "instagram", "tiktok", "whatsapp", "influencer",
      "criptomoneda", "bitcoin", "trading", "bolsa", "videojuego", "ps5", "xbox"
    ];

    const filteredArticles = data.articles.filter((article: any) => {
      const titleLower = article.title.toLowerCase();
      // Descartar si contiene términos de la lista negra
      return !BLOCKLIST.some(term => titleLower.includes(term));
    });

    if (filteredArticles.length === 0) return FALLBACK_NEWS;

    // Filter to show news from today AND yesterday (last 48 hours)
    let finalArticles = filteredArticles.filter((article: any) => {
      const pubDate = parseISO(article.publishedAt);
      return differenceInHours(new Date(), pubDate) <= 48;
    });

    // If we have fewer than 3 news items, add fallback news to ensure the carousel moves
    if (finalArticles.length < 3) {
      return [
        ...finalArticles.map((article: any) => {
          const title = article.title.toLowerCase();
          let tag = "Tecnología";
          if (title.includes("ia") || title.includes("inteligencia artificial") || title.includes("gpt") || title.includes("algoritmo")) tag = "IA & Algoritmos";
          else if (title.includes("seguridad") || title.includes("cyber") || title.includes("hack") || title.includes("ciber")) tag = "Ciberseguridad";
          else if (title.includes("cloud") || title.includes("nube") || title.includes("servidor") || title.includes("infraestructura") || title.includes("ti")) tag = "Infraestructura";
          else if (title.includes("cuántica") || title.includes("quantum") || title.includes("innovación") || title.includes("digital")) tag = "Innovación";

          return {
            title: article.title,
            source: article.source.name,
            link: article.url,
            tag: tag,
            color: categoryColors[tag] || categoryColors["General"],
            publishedAt: article.publishedAt,
            description: article.description
          };
        }),
        ...FALLBACK_NEWS.slice(0, 3 - finalArticles.length)
      ];
    }

    return finalArticles.slice(0, 10).map((article: any) => {
      const title = article.title.toLowerCase();
      let tag = "Tecnología";
      
      if (title.includes("ia") || title.includes("inteligencia artificial") || title.includes("gpt") || title.includes("algoritmo")) tag = "IA & Algoritmos";
      else if (title.includes("seguridad") || title.includes("cyber") || title.includes("hack") || title.includes("ciber")) tag = "Ciberseguridad";
      else if (title.includes("cloud") || title.includes("nube") || title.includes("servidor") || title.includes("infraestructura") || title.includes("ti")) tag = "Infraestructura";
      else if (title.includes("cuántica") || title.includes("quantum") || title.includes("innovación") || title.includes("digital")) tag = "Innovación";

      return {
        title: article.title,
        source: article.source.name,
        link: article.url,
        tag: tag,
        color: categoryColors[tag] || categoryColors["General"],
        publishedAt: article.publishedAt,
        description: article.description
      };
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return FALLBACK_NEWS;
  }
}
