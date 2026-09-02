import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://aimyon-japanese.wow-themepark.chatgpt.site';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/settings', '/progress'] },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
