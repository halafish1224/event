import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://aimyon-japanese.wow-themepark.chatgpt.site';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return {
    rules: {
      userAgent: '*',
      allow: `${basePath}/`,
      disallow: [`${basePath}/settings/`, `${basePath}/progress/`],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: new URL(baseUrl).origin,
  };
}
