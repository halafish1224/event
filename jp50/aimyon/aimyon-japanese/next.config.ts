import type { NextConfig } from 'next';

const isGitHubPagesExport = process.env.AIMYON_GITHUB_EXPORT === '1';

const nextConfig: NextConfig = isGitHubPagesExport
  ? {
      output: 'export',
      assetPrefix: '/jp50/aimyon/aimyon-japanese',
    }
  : {};

export default nextConfig;
