import { describe, expect, it } from 'vitest';

import { withSiteBasePath } from '@/lib/site-path';

const basePath = '/jp50/aimyon/aimyon-japanese';

describe('withSiteBasePath', () => {
  it('prefixes the homepage and adds a trailing slash', () => {
    expect(withSiteBasePath('/', basePath)).toBe(`${basePath}/`);
  });

  it('prefixes internal pages and adds a trailing slash', () => {
    expect(withSiteBasePath('/learn/lesson_01', basePath)).toBe(
      `${basePath}/learn/lesson_01/`,
    );
  });

  it('keeps query strings and fragments', () => {
    expect(withSiteBasePath('/learn?level=1#today', basePath)).toBe(
      `${basePath}/learn/?level=1#today`,
    );
  });

  it('does not duplicate an existing base path', () => {
    expect(withSiteBasePath(`${basePath}/learn/`, basePath)).toBe(
      `${basePath}/learn/`,
    );
  });

  it('leaves external and hash links unchanged', () => {
    expect(withSiteBasePath('https://example.com', basePath)).toBe(
      'https://example.com',
    );
    expect(withSiteBasePath('#main-content', basePath)).toBe('#main-content');
  });
});
