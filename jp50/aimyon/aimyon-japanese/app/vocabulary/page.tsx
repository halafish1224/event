import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { VocabularyBrowser } from '@/components/vocabulary/vocabulary-browser';

export const metadata: Metadata = {
  title: '核心詞彙',
  description:
    '以讀音、詞性、語意粒度、搭配、助詞、活用與近義對比瀏覽核心日文詞彙。',
};

export default function VocabularyPage() {
  return (
    <main id="main-content" className="page-shell pb-28">
      <div className="content-shell">
        <PageIntro
          eyebrow="VOCABULARY NETWORK"
          title="一個詞，不只是一張中日翻譯卡。"
          description="每個詞都連到讀音、語意焦點、常用搭配、助詞、形態與容易混淆的鄰近詞。搜尋結果只使用已人工整理的核心教材資料。"
        >
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link
              href="/verbs"
              className="text-primary underline-offset-4 hover:underline"
            >
              查看動詞活用 →
            </Link>
            <Link
              href="/adjectives"
              className="text-primary underline-offset-4 hover:underline"
            >
              查看形容詞活用 →
            </Link>
          </div>
        </PageIntro>
        <VocabularyBrowser />
      </div>
    </main>
  );
}
