import type { Metadata } from 'next';
import Link from '@/components/app-link';
import { PageIntro } from '@/components/page-intro';
import { Badge } from '@/components/ui/badge';
import { content } from '@/lib/content/data';
import { adjectiveSurfaceTable, type AdjectiveClass } from '@/lib/morphology';

export const metadata: Metadata = {
  title: '形容詞活用',
  description: 'い形容詞、ナ形容詞與 いい 特殊活用的一覽。',
};

export default function AdjectivesPage() {
  const adjectives = content.vocabulary.filter(
    (item) => item.part_of_speech === 'adjective',
  );
  return (
    <main id="main-content" className="page-shell pb-28">
      <div className="content-shell">
        <PageIntro
          eyebrow="ADJECTIVE MORPHOLOGY"
          title="好き不是「好きい」，いい也不是「いくない」。"
          description="い形容詞與ナ形容詞使用不同連接；いい顯示維持日常形式，但活用時回到よい。"
        />
        <div className="overflow-x-auto rounded-2xl bg-card shadow-sm ring-1 ring-border">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-secondary/70 text-xs text-muted-foreground">
              <tr>
                <th className="p-4">形容詞</th>
                <th className="p-4">分類</th>
                <th className="p-4">名詞前</th>
                <th className="p-4">否定</th>
                <th className="p-4">過去</th>
                <th className="p-4">～なる</th>
                <th className="p-4">條件</th>
              </tr>
            </thead>
            <tbody>
              {adjectives.map((adjective) => {
                const base =
                  typeof adjective.metadata.conjugation_base === 'string'
                    ? adjective.metadata.conjugation_base
                    : undefined;
                const forms = adjectiveSurfaceTable({
                  display: adjective.surface,
                  reading: adjective.reading_hiragana,
                  class: adjective.subclass as AdjectiveClass,
                  conjugationBase: base,
                });
                return (
                  <tr
                    key={adjective.id}
                    className="border-t border-border/70 hover:bg-secondary/30"
                  >
                    <td className="p-4">
                      <Link
                        href={`/vocabulary/${adjective.id}`}
                        className="font-bold text-primary hover:underline"
                      >
                        {adjective.surface}
                      </Link>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {adjective.reading_hiragana}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{adjective.subclass}</Badge>
                    </td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.attributive}＋名詞
                    </td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.negative}
                    </td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.past}
                    </td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.naru}
                    </td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.conditional}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
