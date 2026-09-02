import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return {
    name: 'AIMYON Japanese',
    short_name: 'AIMYON JP',
    description: '用語境、對比與自適應複習學會真正能說的日文。',
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: 'standalone',
    background_color: '#fbf8ef',
    theme_color: '#234b38',
    lang: 'zh-Hant',
  };
}
