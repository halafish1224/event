import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { Badge } from '@/components/ui/badge';
import { content } from '@/lib/content/data';
import { verbSurfaceTable, type VerbClass } from '@/lib/morphology';

export const metadata: Metadata = {
  title: '動詞活用',
  description: '明示五段、一段、する、来る分類的日文動詞活用表。',
};

export default function VerbsPage() {
  const verbs = content.vocabulary.filter(
    (item) => item.part_of_speech === 'verb',
  );
  return (
    <main id="main-content" className="page-shell pb-28">
      <div className="content-shell">
        <PageIntro
          eyebrow="VERB MORPHOLOGY"
          title="先分對類，再看聲音怎麼移動。"
          description="所有動詞都由教材明示分類；帰る、知る保留五段，見る則明示為一段。每個完整活用頁皆支援 17 種目標形式。"
        />
        <div className="overflow-x-auto rounded-2xl bg-card shadow-sm ring-1 ring-border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-secondary/70 text-xs text-muted-foreground">
              <tr>
                <th className="p-4">動詞</th>
                <th className="p-4">分類</th>
                <th className="p-4">ない形</th>
                <th className="p-4">て形</th>
                <th className="p-4">た形</th>
                <th className="p-4">可能形</th>
              </tr>
            </thead>
            <tbody>
              {verbs.map((verb) => {
                const metadataOverrides = verb.metadata.morphology_overrides;
                const overrides =
                  metadataOverrides && typeof metadataOverrides === 'object'
                    ? Object.fromEntries(
                        Object.entries(metadataOverrides).filter(
                          (entry): entry is [string, string] =>
                            typeof entry[1] === 'string',
                        ),
                      )
                    : undefined;
                const forms = verbSurfaceTable({
                  dictionary: verb.surface,
                  reading: verb.reading_hiragana,
                  class: verb.subclass as VerbClass,
                  overrides,
                });
                return (
                  <tr
                    key={verb.id}
                    className="border-t border-border/70 hover:bg-secondary/30"
                  >
                    <td className="p-4">
                      <Link
                        href={`/vocabulary/${verb.id}`}
                        className="font-bold text-primary hover:underline"
                      >
                        {verb.surface}
                      </Link>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {verb.reading_hiragana}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{verb.subclass}</Badge>
                    </td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.negative}
                    </td>
                    <td className="japanese-serif p-4 text-base">{forms.te}</td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.past}
                    </td>
                    <td className="japanese-serif p-4 text-base">
                      {forms.potential}
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
