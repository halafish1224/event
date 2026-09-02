import type { ComponentPropsWithoutRef } from 'react';
import NextLink from 'next/link';

import { withSiteBasePath } from '@/lib/site-path';

type AppLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
};

export default function AppLink({ children, href, ...props }: AppLinkProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  if (basePath) {
    return (
      <a {...props} href={withSiteBasePath(href, basePath)}>
        {children}
      </a>
    );
  }

  return (
    <NextLink {...props} href={href}>
      {children}
    </NextLink>
  );
}
