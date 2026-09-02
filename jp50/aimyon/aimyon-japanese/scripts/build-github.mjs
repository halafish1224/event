import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const buildOutput = path.join(projectRoot, 'dist', 'client');
const exportOutput = path.join(projectRoot, 'out');
const vinextCli = path.join(
  projectRoot,
  'node_modules',
  'vinext',
  'dist',
  'cli.js',
);
const basePath = '/jp50/aimyon/aimyon-japanese';
const siteUrl = `https://event.itigre.com${basePath}`;

const build = spawnSync(process.execPath, [vinextCli, 'build'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    AIMYON_GITHUB_EXPORT: '1',
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
});

if (build.error) {
  throw build.error;
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

if (!existsSync(path.join(buildOutput, 'index.html'))) {
  throw new Error('Static export did not create dist/client/index.html.');
}

rmSync(exportOutput, { recursive: true, force: true });
mkdirSync(exportOutput, { recursive: true });
cpSync(buildOutput, exportOutput, { recursive: true });

function listFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const entryPath = path.join(directory, entry);
    return statSync(entryPath).isDirectory() ? listFiles(entryPath) : entryPath;
  });
}

const basePathSegments = basePath.split('/').filter(Boolean);
const nestedAssetRoot = path.join(exportOutput, ...basePathSegments);
const nestedAssetDirectory = path.join(nestedAssetRoot, '_next');

if (!existsSync(nestedAssetDirectory)) {
  throw new Error('Static export did not create the prefixed _next assets.');
}

cpSync(nestedAssetDirectory, path.join(exportOutput, '_next'), {
  recursive: true,
});
rmSync(path.join(exportOutput, basePathSegments[0]), {
  recursive: true,
  force: true,
});
rmSync(path.join(exportOutput, '.vite'), { recursive: true, force: true });

for (const htmlPath of listFiles(exportOutput).filter((filePath) =>
  filePath.endsWith('.html'),
)) {
  const relativePath = path.relative(exportOutput, htmlPath);

  if (relativePath === 'index.html' || relativePath === '404.html') {
    continue;
  }

  const routeDirectory = path.join(
    path.dirname(htmlPath),
    path.basename(htmlPath, '.html'),
  );
  mkdirSync(routeDirectory, { recursive: true });
  renameSync(htmlPath, path.join(routeDirectory, 'index.html'));
}

function prefixDocumentUrls(document) {
  return document.replace(
    /\b(href|src|action)=(['"])(\/(?!\/)[^'"]*)\2/g,
    (match, attribute, quote, value) => {
      if (value === basePath || value.startsWith(`${basePath}/`)) {
        return match;
      }

      return `${attribute}=${quote}${basePath}${value}${quote}`;
    },
  );
}

const htmlFiles = listFiles(exportOutput).filter((filePath) =>
  filePath.endsWith('.html'),
);

for (const htmlPath of htmlFiles) {
  const html = readFileSync(htmlPath, 'utf8');
  writeFileSync(htmlPath, prefixDocumentUrls(html), 'utf8');
}

writeFileSync(
  path.join(exportOutput, 'manifest.webmanifest'),
  `${JSON.stringify(
    {
      name: 'AIMYON Japanese',
      short_name: 'AIMYON JP',
      description: '用語境、對比與自適應複習學會真正能說的日文。',
      start_url: `${basePath}/`,
      scope: `${basePath}/`,
      display: 'standalone',
      background_color: '#fbf8ef',
      theme_color: '#234b38',
      lang: 'zh-Hant',
      icons: [
        {
          src: `${basePath}/icon.svg`,
          sizes: 'any',
          type: 'image/svg+xml',
        },
      ],
    },
    null,
    2,
  )}\n`,
  'utf8',
);

writeFileSync(
  path.join(exportOutput, 'robots.txt'),
  [
    'User-agent: *',
    `Allow: ${basePath}/`,
    `Disallow: ${basePath}/settings/`,
    `Disallow: ${basePath}/progress/`,
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n'),
  'utf8',
);

const sitemapExcludedRoutes = new Set([
  'progress',
  'settings',
  'review/daily',
  'review/quick',
]);
const sitemapRoutes = htmlFiles
  .map((htmlPath) => {
    const relativePath = path
      .relative(exportOutput, htmlPath)
      .split(path.sep)
      .join('/');

    if (relativePath === 'index.html') {
      return '';
    }

    return relativePath.replace(/\/index\.html$/, '');
  })
  .filter((route) => route !== '404.html' && !sitemapExcludedRoutes.has(route))
  .sort((left, right) => left.localeCompare(right));
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.map((route) => {
    const location = `${siteUrl}/${route ? `${route}/` : ''}`;
    const frequency = route ? 'monthly' : 'weekly';
    const priority = route ? '0.7' : '1.0';
    return `  <url><loc>${location}</loc><changefreq>${frequency}</changefreq><priority>${priority}</priority></url>`;
  }),
  '</urlset>',
  '',
].join('\n');

writeFileSync(path.join(exportOutput, 'sitemap.xml'), sitemapXml, 'utf8');
writeFileSync(path.join(exportOutput, '.nojekyll'), '', 'utf8');

const requiredPaths = [
  'index.html',
  'learn/index.html',
  'review/index.html',
  'review/daily/index.html',
  'vocabulary/index.html',
  'grammar/index.html',
  'contrasts/index.html',
  'songs/index.html',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'og-aimyon-japanese.png',
  '_next',
];

for (const relativePath of requiredPaths) {
  if (!existsSync(path.join(exportOutput, relativePath))) {
    throw new Error(`Static export is missing ${relativePath}.`);
  }
}

const indexHtml = readFileSync(path.join(exportOutput, 'index.html'), 'utf8');

if (!indexHtml.includes(`${basePath}/_next/`)) {
  throw new Error(
    'The homepage does not use the required GitHub Pages asset path.',
  );
}

if (!indexHtml.includes(`${basePath}/learn/`)) {
  throw new Error(
    'The homepage does not use the required GitHub Pages route path.',
  );
}

if (!indexHtml.includes(siteUrl)) {
  throw new Error('The homepage metadata does not use the production URL.');
}

const invalidRootUrl =
  /\b(?:href|src|action)=["']\/(?!\/|jp50\/aimyon\/aimyon-japanese(?:\/|["']))/;

for (const htmlPath of htmlFiles) {
  const html = readFileSync(htmlPath, 'utf8');

  if (invalidRootUrl.test(html)) {
    throw new Error(
      `${path.relative(exportOutput, htmlPath)} contains an unprefixed root URL.`,
    );
  }
}

if (htmlFiles.length < 160) {
  throw new Error(
    `Expected at least 160 HTML pages, found ${htmlFiles.length}.`,
  );
}

console.log(`\nGitHub Pages export ready: ${exportOutput}`);
console.log(`Public URL: ${siteUrl}/`);
console.log(`Generated pages: ${htmlFiles.length}`);
console.log(`Generated files: ${listFiles(exportOutput).length}\n`);
