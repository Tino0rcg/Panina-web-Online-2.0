import { MetadataRoute } from 'next';
import { servicesData } from '@/lib/data-services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://onlinesystem.cl';

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic service routes
  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...serviceRoutes];
}
