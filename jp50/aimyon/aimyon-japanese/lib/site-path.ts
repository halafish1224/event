export function withSiteBasePath(href: string, basePath: string): string {
  if (!basePath || !href.startsWith('/') || href.startsWith('//')) {
    return href;
  }

  const normalizedBasePath = `/${basePath.replace(/^\/+|\/+$/g, '')}`;

  if (
    href === normalizedBasePath ||
    href.startsWith(`${normalizedBasePath}/`)
  ) {
    return href;
  }

  const suffixIndex = href.search(/[?#]/);
  const pathname = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : href.slice(suffixIndex);
  const pathnameWithSlash =
    pathname === '/' ? '/' : `${pathname.replace(/\/+$/g, '')}/`;

  return `${normalizedBasePath}${pathnameWithSlash}${suffix}`;
}
