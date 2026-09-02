import type { Metadata } from 'next';
import {
  BookOpenText,
  Contrast,
  House,
  Settings2,
  TimerReset,
  TrendingUp,
} from 'lucide-react';

import Link from '@/components/app-link';
import { ReviewProvider } from '@/components/review/review-provider';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://aimyon-japanese.wow-themepark.chatgpt.site';
const socialImageUrl = `${siteUrl}/og-aimyon-japanese.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AIMYON Japanese｜用語境學會真正能說的日文',
    template: '%s｜AIMYON Japanese',
  },
  description:
    '以檢索練習、語意對比與自適應複習，從 AIMYON 歌曲語境學會能理解、能分辨、也能主動說出的日文。',
  applicationName: 'AIMYON Japanese',
  keywords: ['日文學習', '日語動詞活用', '近義詞對比', '自適應複習', 'AIMYON'],
  authors: [{ name: 'AIMYON Japanese Learning Project' }],
  category: 'education',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: siteUrl,
    locale: 'zh_TW',
    siteName: 'AIMYON Japanese',
    title: 'AIMYON Japanese｜用語境學會真正能說的日文',
    description:
      '以檢索練習、語意對比與自適應複習，練出能理解、能分辨、也能主動說出的日文。',
    images: [
      {
        url: socialImageUrl,
        width: 1731,
        height: 909,
        alt: '以學習卡片、對比節點與記憶路徑構成的日文學習視覺',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIMYON Japanese｜用語境學會真正能說的日文',
    description: '以檢索練習、語意對比與自適應複習建立可主動使用的日文能力。',
    images: [socialImageUrl],
  },
};

const navigation = [
  { href: '/', label: '今天', icon: House },
  { href: '/learn', label: '課程', icon: BookOpenText },
  { href: '/review', label: '複習', icon: TimerReset },
  { href: '/contrasts', label: '對比', icon: Contrast },
  { href: '/progress', label: '進度', icon: TrendingUp },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <a href="#main-content" className="skip-link">
          跳至主要內容
        </a>
        <header className="site-header">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span aria-hidden="true" className="brand-mark">
                あ
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-sm tracking-[0.04em]">
                  AIMYON JAPANESE
                </strong>
                <span className="block truncate text-[11px] text-muted-foreground">
                  聽見語境，也說得出來
                </span>
              </span>
            </Link>
            <nav
              aria-label="主要導覽"
              className="hidden items-center gap-1 md:flex"
            >
              {navigation.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="nav-link">
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/settings" aria-label="設定" className="icon-link">
              <Settings2 aria-hidden="true" className="size-5" />
            </Link>
          </div>
        </header>
        <ReviewProvider>
          {children}
          <footer className="mb-20 border-t border-border/70 bg-card/55 md:mb-0">
            <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 text-sm sm:grid-cols-[1fr_auto] sm:px-6 lg:px-8">
              <div>
                <strong>AIMYON Japanese</strong>
                <p className="mt-2 max-w-xl text-xs leading-5 text-muted-foreground">
                  以原創教學句、語意對比與本機優先複習建立可主動使用的日文能力。歌曲頁不收錄完整或大段歌詞。
                </p>
              </div>
              <nav
                aria-label="學習資源"
                className="flex flex-wrap gap-x-4 gap-y-2 font-semibold text-muted-foreground"
              >
                <Link href="/vocabulary" className="hover:text-foreground">
                  詞彙
                </Link>
                <Link href="/verbs" className="hover:text-foreground">
                  動詞
                </Link>
                <Link href="/adjectives" className="hover:text-foreground">
                  形容詞
                </Link>
                <Link href="/grammar" className="hover:text-foreground">
                  文法
                </Link>
                <Link href="/songs" className="hover:text-foreground">
                  歌曲
                </Link>
              </nav>
            </div>
          </footer>
          <nav aria-label="行動版主要導覽" className="mobile-nav md:hidden">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="mobile-nav-link">
                <Icon aria-hidden="true" className="size-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </ReviewProvider>
      </body>
    </html>
  );
}
