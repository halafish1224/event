import type { MetadataRoute } from 'next';
import { content } from '@/lib/content/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://aimyon-japanese.wow-themepark.chatgpt.site';
  const staticRoutes = [
    '',
    '/learn',
    '/review',
    '/vocabulary',
    '/verbs',
    '/adjectives',
    '/grammar',
    '/contrasts',
    '/songs',
  ];
  const dynamicRoutes = [
    ...content.lessons.map((item) => `/learn/${item.id}`),
    ...content.vocabulary.map((item) => `/vocabulary/${item.id}`),
    ...content.grammar.map((item) => `/grammar/${item.id}`),
    ...content.contrasts.map((item) => `/contrasts/${item.id}`),
    ...content.songs.map((item) => `/songs/${item.id}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${baseUrl}${route}/`,
    changeFrequency: route ? 'monthly' : 'weekly',
    priority: route ? 0.7 : 1,
  }));
}
